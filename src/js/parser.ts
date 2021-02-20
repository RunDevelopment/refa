import { Char, ReadonlyWord, Word } from "../core-types";
import { CharSet } from "../char-set";
import {
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
} from "../ast";
import { RegExpParser, AST } from "regexpp";
import { assertNever } from "../util";
import { createAssertion } from "./create-assertion";
import { createCharSet } from "./create-char-set";
import {
	somePathToBackreference,
	backreferenceAlwaysAfterGroup,
	removeLeadingLookbehinds,
	removeTrailingLookaheads,
	UNICODE_MAXIMUM,
	UTF16_MAXIMUM,
} from "./util";
import { Literal } from "./literal";
import { TooManyNodesError } from "../finite-automaton";

const DEFAULT_MAX_NODES = 100_000;

export interface ParseOptions {
	/**
	 * How to the parser will handle unresolved backreferences.
	 *
	 * - `"resolve"`
	 *
	 *   The parser will replace all non-resolvable backreferences with an empty character class. This will cause all
	 *   paths containing a non-resolvable backreference to be (effectively) removed. Backreferences which can be
	 *   resolved as one constant word, will be replaced with that word.
	 *
	 *   E.g. `(a*)(a|\1)(\1|\2)` will be parsed as `(a*)(a|[])([]|a)` which is equivalent to `a*aa`.
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
	 * @default "resolve"
	 */
	backreferences?: "resolve" | "disable" | "throw";

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
	 *   E.g. `a\b.` but not `a*([](\b){0})` because the `\b` cannot be reached.
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
	 * - Removing 0 quantifiers.
	 * - Inlining single-alternative groups.
	 * - Removing backreferences that always resolve to the empty string.
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
	readonly backreferences: NonNullable<ParseOptions["backreferences"]>;
	readonly lookarounds: NonNullable<ParseOptions["lookarounds"]>;
	readonly disableOptimizations: NonNullable<ParseOptions["disableOptimizations"]>;
	readonly maxCharacter: Char;
	readonly flags: AST.Flags;
	readonly nc: NodeCreator;
}

export class Parser {
	readonly literal: Literal;

	/**
	 * The parsed AST of the literal this parser works on.
	 *
	 * While not explicitly typed that way, the parser will assume that the AST is readonly and makes optimizations
	 * based on that assumption. It is not safe to change the AST in any way.
	 */
	readonly ast: RegexppAst;

	private readonly _charCache = new Map<string, CharSet>();
	private readonly _resolveCache = new Map<AST.CapturingGroup | AST.Backreference, ReadonlyWord | null>();

	private constructor(ast: RegexppAst) {
		this.literal = { source: ast.pattern.raw, flags: ast.flags.raw };
		this.ast = ast;
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
		const expression: Expression = {
			type: "Expression",
			parent: null,
			alternatives: [],
			source: copySource(element),
		};

		const maxCharacter: Char = this.ast.flags.unicode ? UNICODE_MAXIMUM : UTF16_MAXIMUM;

		const context: ParserContext = {
			backreferences: options?.backreferences ?? "resolve",
			lookarounds: options?.lookarounds ?? "parse",
			disableOptimizations: options?.disableOptimizations ?? false,
			flags: this.ast.flags,
			maxCharacter,
			nc: new NodeCreator(options?.maximumNodes ?? DEFAULT_MAX_NODES),
		};

		if (element.type === "Alternative") {
			this._addAlternatives([element], expression, context);
		} else {
			this._addAlternatives(element.alternatives, expression, context);
		}

		return { expression, maxCharacter };
	}

	private _addAlternatives(alternatives: readonly AST.Alternative[], parent: Parent, context: ParserContext): void {
		for (const alt of alternatives) {
			const concat = context.nc.addConcat(parent, alt);
			const { elements } = concat;

			if (context.disableOptimizations) {
				for (const e of alt.elements) {
					this._addElement(e, concat, context);
				}
			} else {
				// optimized version

				let error: Error | undefined = undefined;
				for (const e of alt.elements) {
					try {
						this._addElement(e, concat, context);
					} catch (err) {
						// we catch the error and only rethrow it if the alternative did not get removed
						// the only errors which can be thrown are not-supported errors, so if the alternative gets
						// removed anyway, we shouldn't throw the error
						// Note: For multiple errors, only the first one will be re-thrown
						if (error === undefined) {
							error = err;
						}
					}

					if (elements.length > 0) {
						const last = elements[elements.length - 1];
						if (last.type === "CharacterClass" && last.characters.isEmpty) {
							// remove the alternative
							parent.alternatives.pop();
							// don't throw any errors
							error = undefined;
							break;
						}
					}
				}

				if (error !== undefined) {
					// rethrow the error
					throw error;
				}
			}
		}

		// we might end up with zero alternatives which isn't valid.
		if (parent.alternatives.length === 0) {
			const concat = context.nc.addConcat(parent, parent.source!);
			this._addEmptyCharacterClass(concat.source!, concat, context);
		}
	}

	private _addElement(element: AST.Element, parent: Concatenation, context: ParserContext): void {
		switch (element.type) {
			case "Assertion":
				return this._addAssertion(element, parent, context);

			case "CapturingGroup":
			case "Group":
				return this._addGroup(element, parent, context);

			case "Character":
			case "CharacterClass":
			case "CharacterSet":
				return this._addCharacterClass(element, parent, context);

			case "Quantifier":
				return this._addQuantifier(element, parent, context);

			case "Backreference":
				return this._addBackreference(element, parent, context);

			default:
				throw assertNever(element, "Unsupported element");
		}
	}

	private _addAssertion(element: AST.Assertion, parent: Concatenation, context: ParserContext): void {
		switch (element.kind) {
			case "lookahead":
			case "lookbehind": {
				if (context.disableOptimizations) {
					// we won't optimize, so there's no point in trying

					if (context.lookarounds === "throw") {
						throw new Error("Assertions are not supported.");
					}
					if (context.lookarounds === "disable") {
						this._addEmptyCharacterClass(element, parent, context);
						return;
					}
				}

				const assertion = context.nc.addAssertion(
					parent,
					element,
					element.kind === "lookahead" ? "ahead" : "behind",
					element.negate
				);

				try {
					this._addAlternatives(element.alternatives, assertion, context);
				} catch (e) {
					if (context.lookarounds === "throw") {
						// we tried to optimize and failed, so we ignore e and throw our own error
						throw new Error("Assertions are not supported.");
					}
					if (context.lookarounds === "disable") {
						// we tried to optimize and failed, so we ignore e and disable the assertion
						parent.elements.pop(); // remove the assertion
						this._addEmptyCharacterClass(element, parent, context);
						return;
					}

					// if the parsing fails, then rethrow
					throw e;
				}

				if (!context.disableOptimizations) {
					if (assertion.alternatives.length === 1) {
						const concat = assertion.alternatives[0];
						if (concat.elements.length === 0) {
							// remove the empty lookaround
							parent.elements.pop();
							// if it's (?!) or (?<!), it will trivially reject, so just add an empty character class
							// to simulate this behavior
							if (assertion.negate) {
								this._addEmptyCharacterClass(element, parent, context);
							}
							return;
						}
						if (concat.elements.length === 1) {
							const first = concat.elements[0];
							if (first.type === "CharacterClass" && first.characters.isEmpty) {
								// the assertion can never match the empty character class
								// if it's a negative assertion, we can just remove it but if it's a positive one,
								// we have to replace it with an empty character class.
								parent.elements.pop();
								if (!assertion.negate) {
									this._addEmptyCharacterClass(element, parent, context);
								}
								return;
							}
						}
					}
				}

				if (context.lookarounds === "throw") {
					// we tried to optimize and failed
					throw new Error("Assertions are not supported.");
				}
				if (context.lookarounds === "disable") {
					// we tried to optimize and failed
					parent.elements.pop(); // remove the assertion
					this._addEmptyCharacterClass(element, parent, context);
					return;
				}

				break;
			}
			case "end":
			case "start":
			case "word": {
				// there's no way to optimize this, so the logic is quite simple

				if (context.lookarounds === "throw") {
					throw new Error("Assertions are not supported.");
				}
				if (context.lookarounds === "disable") {
					this._addEmptyCharacterClass(element, parent, context);
					return;
				}

				// "parse" is the default

				const assertion = createAssertion(element, context.flags);
				setSource(assertion, copySource(element));
				setParent<Element>(assertion, parent);
				parent.elements.push(assertion);
				break;
			}
			default:
				throw assertNever(element, "Unsupported element");
		}
	}

	private _addBackreference(element: AST.Backreference, parent: Concatenation, context: ParserContext): void {
		if (context.disableOptimizations) {
			if (context.backreferences === "disable") {
				this._addEmptyCharacterClass(element, parent, context);
			}
			if (context.backreferences === "throw") {
				throw new Error("Backreferences are not supported.");
			}
		}

		// try resolve

		const result = this._resolveBackreference(element, context);

		if (result === null || result.length !== 0) {
			// could not optimize backreference away

			if (context.backreferences === "disable") {
				this._addEmptyCharacterClass(element, parent, context);
			}
			if (context.backreferences === "throw") {
				throw new Error("Backreferences are not supported.");
			}
		}

		if (result !== null) {
			// add all characters of the constant word

			for (const ch of result) {
				context.nc.addCharClass(
					parent,
					element,
					CharSet.empty(context.maxCharacter).union([{ min: ch, max: ch }])
				);
			}
		} else {
			// could not resolve

			this._addEmptyCharacterClass(element, parent, context);
		}
	}

	private _addCharacterClass(
		element: AST.Character | AST.CharacterClass | AST.CharacterSet,
		parent: Concatenation,
		context: ParserContext
	): void {
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
				characters = createCharSet([element.value], context.flags);
			} else if (element.type === "CharacterSet") {
				// e.g. \w
				characters = createCharSet([element], context.flags);
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
					context.flags
				);

				if (element.negate) {
					characters = characters.negate();
				}
			}

			this._charCache.set(cacheKey, characters);
		}

		context.nc.addCharClass(parent, element, characters);
	}

	private _addGroup(element: AST.Group | AST.CapturingGroup, parent: Concatenation, context: ParserContext): void {
		const alternation = context.nc.addAlt(parent, element);
		this._addAlternatives(element.alternatives, alternation, context);

		if (!context.disableOptimizations) {
			if (alternation.alternatives.length === 1) {
				// just add the elements of the alternative to the parent.
				// This will make everything just work without any additional checks

				// remove this alternation
				parent.elements.pop();

				const concat = alternation.alternatives[0];
				for (const e of concat.elements) {
					// set new parent
					e.parent = parent;
					parent.elements.push(e);
				}
			}
		}
	}

	private _addQuantifier(element: AST.Quantifier, parent: Concatenation, context: ParserContext): void {
		const min: number = element.min;
		const max: number = element.max;

		if (!context.disableOptimizations) {
			if (max === 0) {
				return;
			}
			if (min === 1 && max === 1) {
				this._addElement(element.element, parent, context);
				return;
			}
		}

		const quant = context.nc.addQuant(parent, element, min, max);

		const qElement = element.element;

		if ((!context.disableOptimizations && qElement.type === "CapturingGroup") || qElement.type === "Group") {
			this._addAlternatives(qElement.alternatives, quant, context);
		} else {
			const concat = context.nc.addConcat(quant, qElement);
			this._addElement(qElement, concat, context);
		}

		if (!context.disableOptimizations) {
			if (quant.alternatives.length === 1) {
				const concat = quant.alternatives[0];
				if (concat.elements.length === 0) {
					// the quantified element can only match the empty string, so just remove the quantifier
					parent.elements.pop();
				}
				if (concat.elements.length === 1) {
					const first = concat.elements[0];
					if (first.type === "CharacterClass" && first.characters.isEmpty) {
						// the quantified element is the empty character class.
						// if the min of the quantifier is 0, we can just remove the quantifier otherwise it has to
						// be replaced with the empty character class
						parent.elements.pop();
						if (quant.min > 0) {
							this._addEmptyCharacterClass(element, parent, context);
						}
					}
				}
			}
		}
	}

	private _addEmptyCharacterClass(node: SourceLocation, parent: Concatenation, context: ParserContext): void {
		context.nc.addCharClass(parent, node, CharSet.empty(context.maxCharacter));
	}

	private _resolveBackreference(element: AST.Backreference, context: ParserContext): ReadonlyWord | null {
		const cached = this._resolveCache.get(element);
		if (cached !== undefined) {
			return cached;
		}

		let result: ReadonlyWord | null;
		if (!somePathToBackreference(element)) {
			result = [];
		} else {
			result = this._resolveConstantGroup(element.resolved, context);

			if (result !== null && result.length > 0) {
				if (!backreferenceAlwaysAfterGroup(element)) {
					// since there might be some path with which we could reach the backreference without matching the
					// the group, the backreference cannot be replaced with the constant word of the group
					result = null;
				}
			}
		}

		this._resolveCache.set(element, result);
		return result;
	}

	private _resolveConstantGroup(element: AST.CapturingGroup, context: ParserContext): ReadonlyWord | null {
		const cached = this._resolveCache.get(element);
		if (cached !== undefined) {
			return cached;
		}

		let result: Word | null;

		const { expression } = this.parseElement(element, {
			backreferences: "resolve",
			lookarounds: context.lookarounds === "throw" ? "parse" : context.lookarounds,
		});

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

		this._resolveCache.set(element, result);
		return result;
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

	addAlt(parent: Concatenation, source: Readonly<SourceLocation>): Alternation {
		this._checkLimit();

		const node: Alternation = {
			type: "Alternation",
			parent,
			alternatives: [],
			source: copySource(source),
		};
		parent.elements.push(node);
		return node;
	}
	addAssertion(
		parent: Concatenation,
		source: Readonly<SourceLocation>,
		kind: Assertion["kind"],
		negate: boolean
	): Assertion {
		this._checkLimit();

		const node: Assertion = {
			type: "Assertion",
			parent,
			alternatives: [],
			kind,
			negate,
			source: copySource(source),
		};
		parent.elements.push(node);
		return node;
	}
	addCharClass(parent: Concatenation, source: Readonly<SourceLocation>, characters: CharSet): CharacterClass {
		this._checkLimit();

		const node: CharacterClass = {
			type: "CharacterClass",
			parent,
			characters,
			source: copySource(source),
		};
		parent.elements.push(node);
		return node;
	}
	addConcat(parent: Parent, source: Readonly<SourceLocation>): Concatenation {
		this._checkLimit();

		const node: Concatenation = {
			type: "Concatenation",
			parent,
			elements: [],
			source: copySource(source),
		};
		parent.alternatives.push(node);
		return node;
	}
	addQuant(parent: Concatenation, source: Readonly<SourceLocation>, min: number, max: number): Quantifier {
		this._checkLimit();

		const node: Quantifier = {
			type: "Quantifier",
			parent,
			alternatives: [],
			min,
			max,
			source: copySource(source),
		};
		parent.elements.push(node);
		return node;
	}
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
