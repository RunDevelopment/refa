import { Char, ReadonlyWord, Word } from "../core-types";
import { CharSet } from "../char-set";
import {
	Node,
	Element,
	Assertion,
	Alternation,
	Expression,
	Concatenation,
	Parent,
	SourceLocation,
	Quantifier,
	CharacterClass,
	setSource,
	setParent,
	NoParent,
} from "../ast";
import { RegExpParser, AST, visitRegExpAST } from "regexpp";
import { assertNever, flatConcatSequences, UnionIterable, unionSequences } from "../util";
import { createAssertion } from "./create-assertion";
import { createCharSet } from "./create-char-set";
import { UNICODE_MAXIMUM, UTF16_MAXIMUM } from "./util";
import { Literal } from "./literal";
import { TooManyNodesError } from "../finite-automaton";
import { isEmpty, isPotentiallyEmpty, MatchingDirection } from "../ast-analysis";
import {
	backreferenceAlwaysAfterGroup,
	hasSomeAncestor,
	inheritedMatchingDirection,
	somePathToBackreference,
} from "./regexpp-util";
import { wordSetsToWords } from "../char-util";

const DEFAULT_MAX_NODES = 100_000;
const DEFAULT_BACK_REF_MAX_WORDS = 100;

export interface ParseOptions {
	/**
	 * The maximum number of words a backreference can be replaced by.
	 *
	 * Set this to 0 to disable resolving backreferences.
	 *
	 * @default 100
	 */
	backreferenceMaximumWords?: number;
	/**
	 * How to the parser will handle unresolved backreferences.
	 *
	 * - `"disable"`
	 *
	 *   The parser will replace all backreferences with an empty character class. This will cause all paths containing
	 *   a backreference to be (effectively) removed.
	 *
	 *   E.g. `(a*)(\1|b)` will be parsed as `(a*)([]|b)` which is equivalent to `a*b`.
	 *
	 * - `"throw"`
	 *
	 *   The parser will throw an error when encountering a backreference that cannot be removed.
	 *
	 *   E.g. `(a*)b\1` will throw but `(a*)[^\s\S]\1` will not because the backreference will be removed anyway because
	 *   of the empty character class.
	 *
	 * Backreferences that have been resolved are not affected by this option.
	 *
	 * @default "throw"
	 */
	backreferences?: "disable" | "throw";

	/**
	 * How the parser will handle lookarounds.
	 *
	 * - `"parse"`
	 *
	 *   The parser will translate every lookaround literally to an equivalent RE AST representation. Builtin assertions
	 *   (e.g. `\b`, `$`) will be transformed into equivalent lookarounds.
	 *
	 * - `"disable"`
	 *
	 *   The parser will disable all lookarounds by replacing them with an empty character class. This will cause all
	 *   paths containing a lookaround to be (effectively) removed.
	 *
	 * - `"throw"`
	 *
	 *   The parser will throw an error when encountering a lookaround that cannot be removed.
	 *
	 *   E.g. `a\B` will throw but `a([]\b)(\b){0}` will not because none of the `\b`s can be reached.
	 *
	 * @default "parse"
	 */
	lookarounds?: "parse" | "disable" | "throw";

	/**
	 * By default, the parser will try to optimize the generated RE as much as possible.
	 *
	 * If set to `true`, all trivial optimizations will be disabled. This includes:
	 *
	 * - Removing alternatives where all paths go through an empty character class.
	 * - Removing constant 0 and constant 1 quantifiers.
	 * - Inlining single-alternative groups.
	 *
	 * These optimization might prevent that certain backreferences or lookarounds from throwing an error.
	 *
	 * @default false
	 */
	disableOptimizations?: boolean;

	/**
	 * The maximum number of nodes the parser is allowed to create.
	 *
	 * If the regexes requires more nodes, a {@link TooManyNodesError} will be thrown.
	 *
	 * @default 100000
	 */
	maximumNodes?: number;
}

export interface RegexppAst {
	readonly pattern: AST.Pattern;
	readonly flags: AST.Flags;
}

export type ParsableElement = AST.Group | AST.CapturingGroup | AST.Pattern | AST.Alternative;

export interface ParseResult {
	expression: Expression;
	maxCharacter: Char;
}

interface ParserContext {
	readonly backreferenceMaximumWords: number;
	readonly backreferences: NonNullable<ParseOptions["backreferences"]>;
	readonly lookarounds: NonNullable<ParseOptions["lookarounds"]>;
	readonly disableSimplification: boolean;

	readonly nc: NodeCreator;
	readonly matchingDir: MatchingDirection;
	readonly variableResolved: ReadonlyMap<AST.CapturingGroup, ReadonlyWord>;
}

// Some helper constants and types to make the parser implementation more readable
const EMPTY_SET = 1;
const EMPTY_CONCAT = 2;
type EmptySet = typeof EMPTY_SET;
type EmptyConcat = typeof EMPTY_CONCAT;

export class Parser {
	readonly literal: Literal;

	/**
	 * The parsed AST of the literal this parser works on.
	 *
	 * While not explicitly typed that way, the parser will assume that the AST is readonly and makes optimizations
	 * based on that assumption. It is not safe to change the AST in any way.
	 */
	readonly ast: RegexppAst;
	readonly maxCharacter: Char;

	private readonly _charCache = new Map<string, CharSet>();
	private readonly _simpleCharCache = new Map<Char, CharSet>();

	private readonly _backRefCanReachGroupCache = new Map<AST.Backreference, boolean>();
	private readonly _backRefAlwaysAfterGroupCache = new Map<AST.Backreference, boolean>();
	private readonly _constantResolveCache = new Map<AST.CapturingGroup, ReadonlyWord | null>();
	private readonly _groupReferencesCache = new Map<AST.CapturingGroup, AST.Backreference[]>();

	private constructor(ast: RegexppAst) {
		this.literal = { source: ast.pattern.raw, flags: ast.flags.raw };
		this.ast = ast;
		this.maxCharacter = this.ast.flags.unicode ? UNICODE_MAXIMUM : UTF16_MAXIMUM;
	}

	/**
	 * Creates a new parser from the given literal.
	 *
	 * This function will throw a `SyntaxError` if the given literal is not a valid RegExp literal according to the
	 * given RegExp parser options.
	 *
	 * @param literal
	 * @param parserOptions
	 */
	static fromLiteral(literal: Literal, parserOptions?: RegExpParser.Options): Parser {
		const parser = new RegExpParser(parserOptions);
		const flags = parser.parseFlags(literal.flags);
		const pattern = parser.parsePattern(literal.source, undefined, undefined, flags.unicode);
		const ast = { pattern, flags };
		return new Parser(ast);
	}
	static fromAst(ast: RegexppAst): Parser {
		return new Parser(ast);
	}

	parse(options?: Readonly<ParseOptions>): ParseResult {
		return this.parseElement(this.ast.pattern, options);
	}
	parseElement(element: ParsableElement, options?: Readonly<ParseOptions>): ParseResult {
		const context: ParserContext = {
			backreferenceMaximumWords: Math.round(options?.backreferenceMaximumWords ?? DEFAULT_BACK_REF_MAX_WORDS),
			backreferences: options?.backreferences ?? "throw",
			lookarounds: options?.lookarounds ?? "parse",
			disableSimplification: options?.disableOptimizations ?? false,

			nc: new NodeCreator(options?.maximumNodes ?? DEFAULT_MAX_NODES),
			matchingDir: inheritedMatchingDirection(element),
			variableResolved: new Map(),
		};

		const expression = this._parseElement(element, context);
		setParent(expression, null);

		return { expression, maxCharacter: this.maxCharacter };
	}
	private _parseElement(element: ParsableElement, context: ParserContext): NoParent<Expression> {
		const expression: NoParent<Expression> = {
			type: "Expression",
			alternatives: [],
			source: copySource(element),
		};

		if (element.type === "Alternative") {
			this._addAlternatives([element], expression, context);
		} else {
			this._addAlternatives(element.alternatives, expression, context);
		}

		return expression;
	}

	private _addAlternatives(
		alternatives: readonly AST.Alternative[],
		parent: NoParent<Parent>,
		context: ParserContext
	): void {
		for (const alternative of alternatives) {
			const concat = this._createConcatenation(alternative, context);
			if (concat !== EMPTY_SET) {
				if (context.disableSimplification) {
					parent.alternatives.push(concat);
				} else {
					if (isDead(concat)) {
						// do nothing
					} else if (concat.elements.length === 1 && concat.elements[0].type === "Alternation") {
						// add all alternatives
						parent.alternatives.push(...concat.elements[0].alternatives);
					} else {
						parent.alternatives.push(concat);
					}
				}
			}
		}
	}
	private _createConcatenation(
		alternative: AST.Alternative,
		context: ParserContext
	): NoParent<Concatenation> | EmptySet {
		const elements = context.matchingDir === "ltr" ? alternative.elements : [...alternative.elements].reverse();
		const result = this._createElements(elements, context);
		if (result === EMPTY_SET) {
			return EMPTY_SET;
		}
		if (result instanceof Error) {
			throw result;
		}

		if (context.matchingDir === "rtl") {
			result.reverse();
		}

		const concat = context.nc.newConcat(alternative);
		this._setConcatenationElements(concat, result, context);
		return concat;
	}
	private _setConcatenationElements(
		concat: NoParent<Concatenation>,
		elements: NoParent<Element>[],
		context: ParserContext
	): void {
		if (context.disableSimplification) {
			concat.elements = elements;
		} else {
			if (concat.elements.length > 0) {
				concat.elements = [];
			}
			for (const e of elements) {
				if (e.type === "Alternation" && e.alternatives.length === 1) {
					concat.elements.push(...e.alternatives[0].elements);
				} else {
					concat.elements.push(e);
				}
			}
		}
	}

	/**
	 * The order of elements depends on the current matching direction. If the current matching direction is "ltr", then
	 * the elements will be in order as they appear in AST. If the current matching direction is "rtl", then the order
	 * will be reversed.
	 *
	 * The function expects the given elements to be in that order and will returns the parsed elements in that order.
	 */
	private _createElements(
		elements: readonly AST.Element[],
		context: ParserContext
	): NoParent<Element>[] | EmptySet | Error {
		const concat: NoParent<Element>[] = [];
		let error: Error | undefined = undefined;

		for (let i = 0; i < elements.length; i++) {
			const currentElement = elements[i];
			const result = this._createConcatenationElement(currentElement, context);

			if (result === EMPTY_CONCAT) {
				// do nothing
			} else if (result instanceof Error) {
				// error

				if (context.disableSimplification) {
					return result;
				} else {
					// we catch the error and only rethrow it if the alternative did not get removed
					// the only errors which can be thrown are not-supported errors, so if the alternative gets
					// removed anyway, we shouldn't throw the error
					// Note: For multiple errors, only the first one will be re-thrown
					error ??= result;
				}
			} else {
				// an actual element

				if (!context.disableSimplification && isDead(result)) {
					return EMPTY_SET;
				}

				// TODO: refactor this hot piece of garbage
				if (currentElement.type === "CapturingGroup" && this._shouldResolveGroup(currentElement, context)) {
					// try to resolve all backreferences of this capturing group
					try {
						const words = atMostK(iterateWords(result), context.backreferenceMaximumWords);
						if (words.length === 0) {
							// ignore

							concat.push(result);
						} else if (words.length === 1) {
							// constant resolved
							// We just have to add the word and adjust the context

							const word = words[0];
							const wordElement = this._wordToElement(currentElement, word, context);
							if (wordElement !== EMPTY_CONCAT) {
								concat.push(wordElement);
							}
							context = withResolved(context, currentElement, word);
						} else {
							// variable resolved

							const affectedSlice = elements.slice(i + 1);
							this._trimAffectedSlice(currentElement, affectedSlice);

							const alternatives: NoParent<Concatenation>[] = [];
							for (const word of words) {
								const concatElements: NoParent<Element>[] = [];
								const wordElement = this._wordToElement(currentElement, word, context);
								if (wordElement !== EMPTY_CONCAT) {
									concatElements.push(wordElement);
								}

								const result = this._createElements(
									affectedSlice,
									withResolved(context, currentElement, word)
								);

								if (result === EMPTY_SET) {
									// do nothing
								} else if (result instanceof Error) {
									if (context.disableSimplification) {
										return result;
									} else {
										error ??= result;
									}
								} else {
									concatElements.push(...result);
								}

								if (context.matchingDir === "rtl") {
									concatElements.reverse();
								}

								const wordConcat = context.nc.newConcat(currentElement);
								this._setConcatenationElements(wordConcat, concatElements, context);
								alternatives.push(wordConcat);
							}

							const alternation = context.nc.newAlt(currentElement);
							alternation.alternatives = alternatives;
							concat.push(alternation);

							i += affectedSlice.length;
						}
					} catch (error) {
						// too many words -> cannot resolve
						concat.push(result);
					}
				} else {
					concat.push(result);
				}
			}
		}

		if (error !== undefined) {
			// rethrow the error
			return error;
		}

		return concat;
	}
	private _createConcatenationElement(
		element: AST.Element,
		context: ParserContext
	): NoParent<Element> | EmptyConcat | Error {
		try {
			return this._createElement(element, context);
		} catch (error: unknown) {
			if (error instanceof Error) {
				return error;
			}
			throw error;
		}
	}
	private _shouldResolveGroup(group: AST.CapturingGroup, context: ParserContext): boolean {
		// there has to be at least one resolvable backreference that is in the same alternative as the group
		return (
			context.backreferenceMaximumWords > 0 &&
			this._getResolvableGroupReferencesUnder(group, group.parent).length > 0
		);
	}
	private _trimAffectedSlice(group: AST.CapturingGroup, slice: AST.Element[]): void {
		const length = this._affectedSliceLength(group, slice);
		if (slice.length > length) {
			slice.splice(length, slice.length - length);
		}
	}
	private _affectedSliceLength(group: AST.CapturingGroup, slice: readonly AST.Element[]): number {
		function withParent(element: AST.Element): AST.Element {
			let p: AST.Element | AST.BranchNode = element;
			while (p) {
				if (p.parent === group.parent) {
					return p;
				}
				p = p.parent;
			}
			throw new Error();
		}
		function rightMostIndex(elements: ReadonlySet<AST.Element>): number {
			for (let i = slice.length - 1; i >= 0; i--) {
				if (elements.has(slice[i])) {
					return i;
				}
			}
			throw -1;
		}

		const end = rightMostIndex(
			new Set(this._getResolvableGroupReferencesUnder(group, group.parent).map(withParent))
		);

		const rights = [end];
		for (let i = 0; i <= end; i++) {
			const e = slice[i];
			if (e.type === "CapturingGroup") {
				rights.push(i + 1 + this._affectedSliceLength(e, slice.slice(i + 1)));
			}
		}

		return Math.max(...rights) + 1;
	}

	private _createElement(element: AST.Element, context: ParserContext): NoParent<Element> | EmptyConcat {
		switch (element.type) {
			case "Assertion":
				return this._createAssertion(element, context);

			case "CapturingGroup":
			case "Group":
				return this._createGroup(element, context);

			case "Character":
			case "CharacterClass":
			case "CharacterSet":
				return this._createCharacterClass(element, context);

			case "Quantifier":
				return this._createQuantifier(element, context);

			case "Backreference":
				return this._createBackreference(element, context);

			default:
				throw assertNever(element, "Unsupported element");
		}
	}

	private _createAssertion(element: AST.Assertion, context: ParserContext): NoParent<Element> | EmptyConcat {
		if (context.lookarounds === "throw") {
			throw new Error("Assertions are not supported.");
		}
		if (context.lookarounds === "disable") {
			return this._createEmptyCharacterClass(element, context);
		}

		switch (element.kind) {
			case "lookahead":
			case "lookbehind": {
				const assertion = context.nc.newAssertion(
					element,
					element.kind === "lookahead" ? "ahead" : "behind",
					element.negate
				);

				const matchingDir: MatchingDirection = element.kind === "lookahead" ? "ltr" : "rtl";
				this._addAlternatives(
					element.alternatives,
					assertion,
					matchingDir === context.matchingDir ? context : { ...context, matchingDir }
				);

				if (!context.disableSimplification) {
					// check for trivially accepting/rejecting assertions
					const enum TrivialResult {
						REJECT,
						ACCEPT,
						UNKNOWN,
					}
					let result = TrivialResult.UNKNOWN;
					if (assertion.alternatives.every(isDead)) {
						result = assertion.negate ? TrivialResult.ACCEPT : TrivialResult.REJECT;
					} else if (isEmpty(assertion.alternatives)) {
						result = assertion.negate ? TrivialResult.REJECT : TrivialResult.ACCEPT;
					}

					if (result === TrivialResult.ACCEPT) {
						return EMPTY_CONCAT;
					} else if (result === TrivialResult.REJECT) {
						return this._createEmptyCharacterClass(element, context);
					}
				}

				return assertion;
			}

			case "end":
			case "start":
			case "word": {
				const assertion = createAssertion(element, this.ast.flags);
				setSource(assertion, copySource(element));

				return assertion;
			}

			default:
				throw assertNever(element, "Unsupported element");
		}
	}

	private _createCharacterClass(
		element: AST.Character | AST.CharacterClass | AST.CharacterSet,
		context: ParserContext
	): NoParent<CharacterClass> {
		let characters: CharSet;

		let cacheKey: string;
		if (element.type === "Character" || element.type === "CharacterSet") {
			cacheKey = getCharacterClassCacheKey([element]);
		} else {
			cacheKey = getCharacterClassCacheKey(element.elements, element.negate);
		}

		const cached = this._charCache.get(cacheKey);
		if (cached !== undefined) {
			// cache hit

			characters = cached;
		} else {
			// cache miss

			if (element.type === "Character") {
				// e.g. a
				characters = createCharSet([element.value], this.ast.flags);
			} else if (element.type === "CharacterSet") {
				// e.g. \w
				characters = createCharSet([element], this.ast.flags);
			} else {
				// e.g. [^a-f\s]
				characters = createCharSet(
					element.elements.map(e => {
						switch (e.type) {
							case "Character":
								return e.value;
							case "CharacterClassRange":
								return { min: e.min.value, max: e.max.value };
							case "CharacterSet":
								return e;
							default:
								throw assertNever(e, "Unsupported element");
						}
					}),
					this.ast.flags
				);

				if (element.negate) {
					characters = characters.negate();
				}
			}

			this._charCache.set(cacheKey, characters);
		}

		return context.nc.newCharClass(element, characters);
	}

	private _createGroup(
		element: AST.Group | AST.CapturingGroup,
		context: ParserContext
	): NoParent<Element> | EmptyConcat {
		const alternation = context.nc.newAlt(element);
		this._addAlternatives(element.alternatives, alternation, context);
		return alternation;
	}

	private _createQuantifier(element: AST.Quantifier, context: ParserContext): NoParent<Element> | EmptyConcat {
		const min: number = element.min;
		const max: number = element.max;

		if (!context.disableSimplification) {
			if (max === 0) {
				return EMPTY_CONCAT;
			}
			if (min === 1 && max === 1) {
				return this._createElement(element.element, context);
			}
		}

		const quant = context.nc.newQuant(element, min, max);

		const qElement = element.element;
		if (qElement.type === "CapturingGroup" || qElement.type === "Group") {
			this._addAlternatives(qElement.alternatives, quant, context);
		} else {
			const concat = context.nc.newConcat(qElement);
			quant.alternatives.push(concat);
			const newElement = this._createElement(qElement, context);
			if (newElement !== EMPTY_CONCAT) {
				concat.elements.push(newElement);
			}
		}

		if (!context.disableSimplification) {
			if (quant.alternatives.every(isDead)) {
				if (min === 0) {
					// empty
					return EMPTY_CONCAT;
				} else {
					return this._createEmptyCharacterClass(element, context);
				}
			}
			if (quant.alternatives.length === 1 && quant.alternatives[0].elements.length === 0) {
				return EMPTY_CONCAT;
			}
		}

		return quant;
	}

	private _createEmptyCharacterClass(node: SourceLocation, context: ParserContext): NoParent<CharacterClass> {
		return context.nc.newCharClass(node, CharSet.empty(this.maxCharacter));
	}

	private _createBackreference(element: AST.Backreference, context: ParserContext): NoParent<Element> | EmptyConcat {
		if (context.backreferenceMaximumWords > 0) {
			// try resolve
			if (!this._backRefCanReachGroup(element)) {
				return EMPTY_CONCAT;
			}

			const group = element.resolved;
			const resolved = context.variableResolved.get(group) ?? this._constantResolveGroup(group, context);

			if (resolved !== null) {
				if (resolved.length === 0) {
					return EMPTY_CONCAT;
				}

				// since there might be some path with which we could reach the backreference without matching the
				// group, we have to make sure that we always match the group before the backreference.
				if (this._backRefAlwaysAfterGroup(element)) {
					return this._wordToElement(element, resolved, context);
				}
			}
		}

		if (context.backreferences === "throw") {
			throw new Error("Backreferences are not supported.");
		}
		// disable
		return this._createEmptyCharacterClass(element, context);
	}
	private _constantResolveGroup(element: AST.CapturingGroup, context: ParserContext): ReadonlyWord | null {
		const cached = this._constantResolveCache.get(element);
		if (cached !== undefined) {
			return cached;
		}

		let result: Word | null;

		const expression = this._parseElement(element, {
			...context,
			backreferences: "throw",
			disableSimplification: false,
		});

		// TODO: Use transformers to do that
		removeLeadingLookbehinds(expression);
		removeTrailingLookaheads(expression);

		// if the group is constant, then all that's left will be a single alternative of only single-character
		// character classes

		if (expression.alternatives.length === 1) {
			const concat = expression.alternatives[0];
			if (
				concat.elements.length === 1 &&
				concat.elements[0].type === "CharacterClass" &&
				concat.elements[0].characters.isEmpty
			) {
				// since the capturing can never be matched, all backreferences to it will always be replaced with the
				// empty string
				result = [];
			} else {
				result = [];

				for (const char of concat.elements) {
					if (char.type === "CharacterClass") {
						const charset = char.characters;
						if (charset.ranges.length === 1) {
							const { min, max } = charset.ranges[0];
							if (min === max) {
								result.push(min);
								continue;
							}
						}
					}

					result = null;
					break;
				}
			}
		} else {
			result = null;
		}

		this._constantResolveCache.set(element, result);
		return result;
	}

	private _backRefCanReachGroup(element: AST.Backreference): boolean {
		let cached = this._backRefCanReachGroupCache.get(element);
		if (cached === undefined) {
			cached = somePathToBackreference(element);
			this._backRefCanReachGroupCache.set(element, cached);
		}
		return cached;
	}
	private _backRefAlwaysAfterGroup(element: AST.Backreference): boolean {
		let cached = this._backRefAlwaysAfterGroupCache.get(element);
		if (cached === undefined) {
			cached = backreferenceAlwaysAfterGroup(element);
			this._backRefAlwaysAfterGroupCache.set(element, cached);
		}
		return cached;
	}
	private _wordToElement(
		source: Readonly<SourceLocation>,
		word: ReadonlyWord,
		context: ParserContext
	): NoParent<Element> | EmptyConcat {
		if (word.length === 0) {
			return EMPTY_CONCAT;
		} else if (word.length === 1) {
			return context.nc.newCharClass(source, this._charToCharSet(word[0]));
		} else {
			const concat = context.nc.newConcat(source);
			for (const char of word) {
				concat.elements.push(context.nc.newCharClass(source, this._charToCharSet(char)));
			}

			const alt = context.nc.newAlt(source);
			alt.alternatives.push(concat);
			return alt;
		}
	}
	private _charToCharSet(char: Char): CharSet {
		let cached = this._simpleCharCache.get(char);
		if (cached === undefined) {
			cached = CharSet.empty(this.maxCharacter).union([{ min: char, max: char }]);
			this._simpleCharCache.set(char, cached);
		}
		return cached;
	}

	private _getGroupReferences(group: AST.CapturingGroup): readonly AST.Backreference[] {
		if (this._groupReferencesCache.size === 0) {
			const getList = (capGroup: AST.CapturingGroup): AST.Backreference[] => {
				let list = this._groupReferencesCache.get(capGroup);
				if (list === undefined) {
					list = [];
					this._groupReferencesCache.set(capGroup, list);
				}
				return list;
			};

			visitRegExpAST(this.ast.pattern, {
				onBackreferenceEnter(backRef) {
					getList(backRef.resolved).push(backRef);
				},
				onCapturingGroupEnter(capGroup) {
					getList(capGroup);
				},
			});
		}

		const references = this._groupReferencesCache.get(group);
		if (!references) {
			throw new Error("Unknown capturing group. The capturing group is not part of the AST of this parser.");
		}
		return references;
	}
	private _getResolvableGroupReferences(group: AST.CapturingGroup): readonly AST.Backreference[] {
		return this._getGroupReferences(group).filter(
			ref => this._backRefCanReachGroup(ref) && this._backRefAlwaysAfterGroup(ref)
		);
	}
	private _getResolvableGroupReferencesUnder(
		group: AST.CapturingGroup,
		under: AST.BranchNode
	): readonly AST.Backreference[] {
		return this._getResolvableGroupReferences(group).filter(ref => hasSomeAncestor(ref, a => a === under));
	}
}

class NodeCreator {
	private _nodeCounter = 0;
	private readonly _nodeLimit: number;

	constructor(nodeLimit: number) {
		this._nodeLimit = nodeLimit;
	}

	private _checkLimit(): void {
		if (++this._nodeCounter > this._nodeLimit) {
			throw new TooManyNodesError();
		}
	}

	newAlt(source: Readonly<SourceLocation>): NoParent<Alternation> {
		this._checkLimit();

		return {
			type: "Alternation",
			alternatives: [],
			source: copySource(source),
		};
	}
	newAssertion(source: Readonly<SourceLocation>, kind: Assertion["kind"], negate: boolean): NoParent<Assertion> {
		this._checkLimit();

		return {
			type: "Assertion",
			alternatives: [],
			kind,
			negate,
			source: copySource(source),
		};
	}
	newCharClass(source: Readonly<SourceLocation>, characters: CharSet): NoParent<CharacterClass> {
		this._checkLimit();

		return {
			type: "CharacterClass",
			characters,
			source: copySource(source),
		};
	}
	newConcat(source: Readonly<SourceLocation>): NoParent<Concatenation> {
		this._checkLimit();

		return {
			type: "Concatenation",
			elements: [],
			source: copySource(source),
		};
	}
	newQuant(source: Readonly<SourceLocation>, min: number, max: number): NoParent<Quantifier> {
		this._checkLimit();

		return {
			type: "Quantifier",
			alternatives: [],
			min,
			max,
			source: copySource(source),
		};
	}
}

function withResolved(context: ParserContext, group: AST.CapturingGroup, word: ReadonlyWord): ParserContext {
	const variableResolved = new Map(context.variableResolved);
	variableResolved.set(group, word);
	return { ...context, variableResolved };
}

function copySource(node: Readonly<SourceLocation>): SourceLocation {
	return {
		start: node.start,
		end: node.end,
	};
}

function getCharacterClassCacheKey(
	elements: readonly (AST.CharacterClassElement | AST.CharacterSet)[],
	negate?: boolean
): string {
	let s = negate ? "^" : "";
	for (const e of elements) {
		switch (e.type) {
			case "Character":
				s += "\\" + e.value.toString(16);
				break;
			case "CharacterClassRange":
				s += "\\" + e.min.value.toString(16) + "-\\" + e.max.value.toString(16);
				break;
			case "CharacterSet":
				s += e.raw;
				break;
			default:
				throw assertNever(e);
		}
	}
	return s;
}

function isDead(node: NoParent<Node>): boolean {
	switch (node.type) {
		case "Alternation":
		case "Expression":
			return node.alternatives.every(isDead);

		case "Assertion":
			return node.negate ? isPotentiallyEmpty(node.alternatives) : node.alternatives.every(isDead);

		case "CharacterClass":
			return node.characters.isEmpty;

		case "Concatenation":
			// this is an optimization
			// we will make sure that all dead concatenation have exactly one element, so we can ignore a lot of
			// non-dead branches without having to look at their contents
			return node.elements.length === 1 && isDead(node.elements[0]);

		case "Quantifier":
			return node.min > 0 && node.alternatives.every(isDead);

		default:
			assertNever(node);
	}
}

function removeLeadingLookbehinds(element: NoParent<Expression | Alternation | Quantifier>): void {
	for (const alt of element.alternatives) {
		while (alt.elements.length > 0) {
			const element = alt.elements[0];

			if (element.type === "Assertion" && element.kind === "behind") {
				alt.elements.splice(0, 1);
				continue;
			}

			if (element.type === "Alternation" || element.type === "Quantifier") {
				removeLeadingLookbehinds(element);
				if (element.alternatives.length === 1 && element.alternatives[0].elements.length === 0) {
					// empty quantifier or alternative that can only match the empty word
					alt.elements.splice(0, 1);
					continue;
				}
			}

			break;
		}
	}

	removeDuplicateEmptyAlternative(element);
}
function removeTrailingLookaheads(element: NoParent<Expression | Alternation | Quantifier>): void {
	for (const alt of element.alternatives) {
		while (alt.elements.length > 0) {
			const element = alt.elements[alt.elements.length - 1];

			if (element.type === "Assertion" && element.kind === "ahead") {
				alt.elements.pop();
				continue;
			}

			if (element.type === "Alternation" || element.type === "Quantifier") {
				removeTrailingLookaheads(element);
				if (element.alternatives.length === 1 && element.alternatives[0].elements.length === 0) {
					// empty quantifier or alternative that can only match the empty word
					alt.elements.pop();
					continue;
				}
			}

			break;
		}
	}

	removeDuplicateEmptyAlternative(element);
}
function removeDuplicateEmptyAlternative(element: NoParent<Expression | Alternation | Quantifier>): void {
	let hasEmpty = false;
	element.alternatives = element.alternatives.filter(alt => {
		if (alt.elements.length === 0) {
			if (hasEmpty) {
				return false;
			} else {
				hasEmpty = true;
				return true;
			}
		}
		// keep all non-empty
		return true;
	});
}

function iterateWords(node: NoParent<Node>): UnionIterable<Word> {
	return wordSetsToWords(iterateWordSets(node));
}
function iterateWordSets(node: NoParent<Node>): UnionIterable<CharSet[]> {
	switch (node.type) {
		case "Alternation":
		case "Expression":
			return unionSequences(node.alternatives.map(iterateWordSets));

		case "Assertion":
			throw new Error();

		case "CharacterClass":
			if (node.characters.isEmpty) {
				// empty set
				return [];
			} else {
				return [[node.characters]];
			}

		case "Concatenation":
			return flatConcatSequences(node.elements.map(iterateWordSets));

		case "Quantifier":
			throw new Error();

		default:
			assertNever(node);
	}
}

function atMostK<T>(iter: Iterable<T>, k: number): T[] {
	const result: T[] = [];
	for (const item of iter) {
		result.push(item);
		if (result.length > k) {
			throw new Error("Too many items.");
		}
	}
	return result;
}
