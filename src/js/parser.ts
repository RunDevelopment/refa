import { CharSet } from "../char-set";
import {
	Element, Assertion, Alternation, Expression, Concatenation, Parent, SourceLocation, Quantifier, CharacterClass,
	desimplify
} from "../ast";
import { RegExpParser, AST } from "regexpp";
import { assertNever } from "../util";
import { createAssertion } from "./js-assertion";
import { createCharSet } from "./js-char-set";
import {
	somePathToBackreference, backreferenceAlwaysAfterGroup, removeLeadingLookbehinds, removeTrailingLookaheads
} from "./js-util";


export interface ParseOptions {
	/**
	 * How to the parser will handle backreferences.
	 *
	 * `"resolve"`: This is the default option. The parser will replace all non-resolvable backreferences with an empty
	 * character class. This will cause all path containing a non-resolvable backreference to be removed from
	 * constructed FA. Backreferences which can be resolved as one constant word, will be replaced with that word.
	 *
	 * E.g. `(a*)(a|\1)(\1|\2)` will be parsed as `(a*)(a|[])([]|a)` which is equivalent to `a*aa`.
	 *
	 * `"disable"`: The parser will replace all backreferences with an empty character class. This will cause all
	 * path containing a backreference to be removed from constructed FA.
	 *
	 * E.g. `(a*)(\1|b)` will be parsed as `(a*)([]|b)` which is equivalent to `a*b`.
	 *
	 * `"throw"`: The parser will throw an error when encountering an unresolvable backreference. Unresolvable
	 * backreferences are ones which references a capturing group which can match more than a small finite number of
	 * words.
	 *
	 * E.g. `(a*)b\1` will throw but `(a*)[^\s\S]\1` will not because the backreference will be removed anyway because
	 * of the empty character class.
	 */
	backreferences?: "resolve" | "disable" | "throw";
	/**
	 * How the parser will handle lookarounds.
	 *
	 * `"parse"`: This is the default option. The parser will literally translate every lookaround to a RE AST
	 * representation.
	 *
	 * `"disable"`: The parser will disable all lookarounds with an empty character class. This will cause all paths
	 * containing a lookaround to be removed from constructed FA.
	 *
	 * `"throw"`: The parser will throw an error when encountering a lookaround.
	 *
	 * E.g. `a\b.` but not `a*([](\b){0})` because the `\b` cannot be reached.
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
	 * - Removing backreferences which always resolve to the empty string.
	 *
	 * These optimization might prevent that certain backreferences or lookarounds get disabled (if configured) or throw
	 * an error (if configured).
	 */
	disableOptimizations?: boolean;
}

export type RegexppAst = {
	pattern: AST.Pattern;
	flags: AST.Flags;
};

export type ParsableElement = AST.Group | AST.CapturingGroup | AST.Pattern;

export interface ParseResult {
	expression: Expression;
	maxCharacter: number;
}


interface ParserContext extends ParseOptions {
	flags: AST.Flags;
}


export class Parser {

	readonly source: string;
	readonly flags: string;

	readonly ast: RegexppAst;

	private readonly _charCache = new Map<string, CharSet>();
	private readonly _resolveCache = new Map<AST.CapturingGroup | AST.Backreference, number[] | null>();


	constructor(literal: { source: string; flags: string }, parserOptions?: RegExpParser.Options) {
		this.source = literal.source;
		this.flags = literal.flags;

		const parser = new RegExpParser(parserOptions);
		const flags = parser.parseFlags(this.flags);
		const pattern = parser.parsePattern(this.source, undefined, undefined, flags.unicode);
		this.ast = { pattern, flags };
	}


	parse(options?: ParseOptions): ParseResult {
		return this.parseElement(this.ast.pattern, options);
	}
	parseElement(element: ParsableElement, options?: ParseOptions): ParseResult {
		const expression: Expression = {
			type: "Expression",
			parent: null,
			alternatives: [],
			source: getSource(element)
		};

		const context: ParserContext = { ...options, flags: this.ast.flags };

		this.addAlternatives(element.alternatives, expression, context);

		return {
			expression,
			maxCharacter: this.ast.flags.unicode ? 0x10FFFF : 0xFFFF
		};
	}


	private addAlternatives(
		alternatives: readonly AST.Alternative[],
		parent: Parent, context: ParserContext
	): void {
		for (const alt of alternatives) {
			const elements: Element[] = [];
			const concat: Concatenation = {
				type: "Concatenation",
				parent,
				elements,
				source: getSource(alt)
			};
			parent.alternatives.push(concat);

			if (context.disableOptimizations) {
				for (const e of alt.elements) {
					this.addElement(e, concat, context);
				}
			} else {
				// optimized version

				let error: Error | undefined = undefined;
				for (const e of alt.elements) {
					try {
						this.addElement(e, concat, context);
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
			const elements: Element[] = [];
			const concat: Concatenation = {
				type: "Concatenation",
				parent,
				elements,
				source: getSource(parent.source)
			};
			parent.alternatives.push(concat);

			this.addEmptyCharacterClass(concat.source, concat, context);
		}
	}

	private addElement(element: AST.Element, parent: Concatenation, context: ParserContext): void {
		switch (element.type) {
			case "Assertion":
				return this.addAssertion(element, parent, context);

			case "CapturingGroup":
			case "Group":
				return this.addGroup(element, parent, context);

			case "Character":
			case "CharacterClass":
			case "CharacterSet":
				return this.addCharacterClass(element, parent, context);

			case "Quantifier":
				return this.addQuantifier(element, parent, context);

			case "Backreference":
				return this.addBackreference(element, parent, context);

			default:
				throw assertNever(element, 'Unsupported element');
		}
	}

	private addAssertion(
		element: AST.Assertion,
		parent: Concatenation, context: ParserContext
	): void {

		switch (element.kind) {
			case "lookahead":
			case "lookbehind": {
				if (context.disableOptimizations) {
					// we won't optimize, so there's no point in trying

					if (context.lookarounds === "throw") {
						throw new Error("Assertions are not supported.");
					}
					if (context.lookarounds === "disable") {
						this.addEmptyCharacterClass(element, parent, context);
						return;
					}
				}

				const assertion: Assertion = {
					type: "Assertion",
					kind: element.kind === "lookahead" ? "ahead" : "behind",
					parent,
					negate: element.negate,
					alternatives: [],
					source: getSource(element)
				};
				parent.elements.push(assertion);

				try {
					this.addAlternatives(element.alternatives, assertion, context);
				} catch (e) {

					if (context.lookarounds === "throw") {
						// we tried to optimize and failed, so we ignore e and throw our own error
						throw new Error("Assertions are not supported.");
					}
					if (context.lookarounds === "disable") {
						// we tried to optimize and failed, so we ignore e and disable the assertion
						parent.elements.pop(); // remove the assertion
						this.addEmptyCharacterClass(element, parent, context);
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
								this.addEmptyCharacterClass(element, parent, context);
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
									this.addEmptyCharacterClass(element, parent, context);
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
					this.addEmptyCharacterClass(element, parent, context);
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
					this.addEmptyCharacterClass(element, parent, context);
					return;
				}

				// "parse" is the default

				const simpleAssertion = createAssertion(element, context.flags);
				const assertion = desimplify(simpleAssertion, parent, getSource(element));
				parent.elements.push(assertion);
				break;
			}
			default:
				throw assertNever(element, 'Unsupported element');
		}
	}

	private addBackreference(
		element: AST.Backreference,
		parent: Concatenation, context: ParserContext
	): void {
		if (context.disableOptimizations) {
			if (context.backreferences === "disable") {
				this.addEmptyCharacterClass(element, parent, context);
			}
			if (context.backreferences === "throw") {
				throw new Error('Backreferences are not supported.');
			}
		}

		// try resolve

		const result = this.resolveBackreference(element, context);

		if (result === null || result.length !== 0) {
			// could not optimize backreference away

			if (context.backreferences === "disable") {
				this.addEmptyCharacterClass(element, parent, context);
			}
			if (context.backreferences === "throw") {
				throw new Error('Backreferences are not supported.');
			}
		}

		if (result !== null) {
			// add all characters of the constant word

			const maxCharacter = context.flags.unicode ? 0x10FFFF : 0xFFFF;
			for (const ch of result) {
				const char: CharacterClass = {
					type: "CharacterClass",
					parent,
					characters: CharSet.empty(maxCharacter).union([{ min: ch, max: ch }]),
					source: getSource(element)
				};
				parent.elements.push(char);
			}

		} else {
			// could not resolve

			this.addEmptyCharacterClass(element, parent, context);
		}
	}

	private addCharacterClass(
		element: AST.Character | AST.CharacterClass | AST.CharacterSet,
		parent: Concatenation, context: ParserContext
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
				characters = createCharSet(element.elements.map(e => {
					switch (e.type) {
						case "Character":
							return e.value;
						case "CharacterClassRange":
							return { min: e.min.value, max: e.max.value };
						case "CharacterSet":
							return e;
						default:
							throw assertNever(e, 'Unsupported element');
					}
				}), context.flags);

				if (element.negate) {
					characters = characters.negate();
				}
			}

			this._charCache.set(cacheKey, characters);
		}

		const char: CharacterClass = {
			type: "CharacterClass",
			parent,
			characters,
			source: getSource(element)
		};
		parent.elements.push(char);
	}

	private addGroup(
		element: AST.Group | AST.CapturingGroup,
		parent: Concatenation, context: ParserContext
	): void {
		const alteration: Alternation = {
			type: "Alternation",
			parent,
			alternatives: [],
			source: getSource(element)
		};
		parent.elements.push(alteration);
		this.addAlternatives(element.alternatives, alteration, context);

		if (!context.disableOptimizations) {
			if (alteration.alternatives.length === 1) {
				// just add the elements of the alternative to the parent.
				// This will make everything just work without any additional checks

				// remove this alternation
				parent.elements.pop();

				const concat = alteration.alternatives[0];
				for (const e of concat.elements) {
					// set new parent
					e.parent = parent;
					parent.elements.push(e);
				}
			}
		}
	}

	private addQuantifier(
		element: AST.Quantifier,
		parent: Concatenation, context: ParserContext
	): void {
		const min: number = element.min;
		const max: number = element.max;

		if (!context.disableOptimizations) {
			if (max === 0) {
				return;
			}
			if (min === 1 && max === 1) {
				this.addElement(element.element, parent, context);
				return;
			}
		}

		const quant: Quantifier = {
			type: "Quantifier",
			parent,
			min,
			max,
			alternatives: [],
			source: getSource(element)
		};
		parent.elements.push(quant);

		const qElement = element.element;

		if (!context.disableOptimizations && qElement.type === "CapturingGroup" || qElement.type === "Group") {
			this.addAlternatives(qElement.alternatives, quant, context);
		} else {
			const concat: Concatenation = {
				type: "Concatenation",
				parent: quant,
				elements: [],
				source: getSource(qElement)
			}
			quant.alternatives.push(concat);

			this.addElement(qElement, concat, context);
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
							this.addEmptyCharacterClass(element, parent, context);
						}
					}
				}
			}
		}
	}

	private addEmptyCharacterClass(node: SourceLocation, parent: Concatenation, context: ParserContext): void {
		const char: CharacterClass = {
			type: "CharacterClass",
			parent,
			characters: CharSet.empty(context.flags.unicode ? 0x10FFFF : 0xFFFF),
			source: getSource(node)
		};
		parent.elements.push(char);
	}

	private resolveBackreference(element: AST.Backreference, context: ParserContext): number[] | null {
		const cached = this._resolveCache.get(element);
		if (cached !== undefined) {
			return cached;
		}

		let result: number[] | null;
		if (!somePathToBackreference(element)) {
			result = [];
		} else {
			result = this.resolveConstantGroup(element.resolved, context);

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

	private resolveConstantGroup(element: AST.CapturingGroup, context: ParserContext): number[] | null {
		const cached = this._resolveCache.get(element);
		if (cached !== undefined) {
			return cached;
		}

		let result: number[] | null;

		const { expression } = this.parseElement(element, {
			backreferences: "resolve",
			lookarounds: context.lookarounds === "throw" ? "parse" : context.lookarounds
		});

		removeLeadingLookbehinds(expression);
		removeTrailingLookaheads(expression);

		// if the group is constant, then all that's left will be a single alternative of only single-character
		// character classes

		if (expression.alternatives.length === 1) {
			const concat = expression.alternatives[0];
			if (concat.elements.length === 1
				&& concat.elements[0].type === "CharacterClass" && concat.elements[0].characters.isEmpty) {
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



function getSource(node: SourceLocation): SourceLocation {
	return {
		start: node.start,
		end: node.end
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
