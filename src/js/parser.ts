import { CharSet } from "../char-set";
import {
	Element, Assertion, Alternation, Expression, Concatenation, Parent, SourceLocation, Quantifier, CharacterClass,
	desimplify
} from "../ast";
import { RegExpParser, AST } from "regexpp";
import { assertNever } from "../util";
import { createAssertion } from "./js-assertion";
import { createCharSet } from "./js-char-set";


export interface ParseOptions {
	/**
	 * How to the parser will handle backreferences.
	 *
	 * `"disable"`: This is the default option. The parser will replace all backreferences with an empty character
	 * class. This will cause all path containing a backreference to be removed from constructed FA.
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
	backreferences?: "throw" | "disable";
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
	lookarounds?: "parse" | "throw" | "disable";
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

	private readonly charCache = new Map<string, CharSet>();


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


	private addAlternatives(alternatives: AST.Alternative[], parent: Parent, context: ParserContext): void {
		for (const alt of alternatives) {
			const elements: Element[] = [];
			const concat: Concatenation = {
				type: "Concatenation",
				parent,
				elements,
				source: getSource(alt)
			};
			parent.alternatives.push(concat);

			let error: Error | undefined = undefined;
			for (const e of alt.elements) {
				try {
					this.addElement(e, concat, context);
				} catch (err) {
					// we catch the error and only rethrow it if the alternative did not get removed
					// the only errors which can be thrown are not-supported errors, so if the alternative gets removed
					// anyway, we shouldn't throw the error
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
		const source: SourceLocation = getSource(element);

		const addEmpty = (): void => {
			this.addEmptyCharacterClass(source, parent, context);
		}

		switch (element.type) {
			case "Assertion": {
				if (context.lookarounds === "throw") {
					throw new Error("Assertions are not supported.");
				}
				if (context.lookarounds === "disable") {
					addEmpty();
					break;
				}

				// "parse" is the default

				switch (element.kind) {
					case "lookahead":
					case "lookbehind": {
						const assertion: Assertion = {
							type: "Assertion",
							kind: element.kind === "lookahead" ? "ahead" : "behind",
							parent,
							negate: element.negate,
							alternatives: [],
							source
						};
						parent.elements.push(assertion);

						this.addAlternatives(element.alternatives, assertion, context);

						if (assertion.alternatives.length === 1) {
							const concat = assertion.alternatives[0];
							if (concat.elements.length === 0) {
								// remove the empty lookaround
								parent.elements.pop();
								// if it's (?!) or (?<!), it will trivially reject, so just add an empty character class
								// to simulate this behavior
								if (assertion.negate) {
									addEmpty();
								}
							}
							if (concat.elements.length === 1) {
								const first = concat.elements[0];
								if (first.type === "CharacterClass" && first.characters.isEmpty) {
									// the assertion can never match the empty character class
									// if it's a negative assertion, we can just remove it but if it's a positive one,
									// we have to replace it with an empty character class.
									parent.elements.pop();
									if (!assertion.negate) {
										addEmpty();
									}
								}
							}
						}
						break;
					}
					case "end":
					case "start":
					case "word": {
						const simpleAssertion = createAssertion(element, context.flags);
						const assertion = desimplify(simpleAssertion, parent, source);
						parent.elements.push(assertion);
						break;
					}
					default:
						throw assertNever(element, 'Unsupported element');
				}

				break;
			}
			case "CapturingGroup":
			case "Group": {
				const alteration: Alternation = {
					type: "Alternation",
					parent,
					alternatives: [],
					source
				};
				parent.elements.push(alteration);
				this.addAlternatives(element.alternatives, alteration, context);

				if (alteration.alternatives.length === 1) {
					// just add the element of the alternative to the parent.
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

				break;
			}
			case "Character":
			case "CharacterClass":
			case "CharacterSet": {
				this.addCharacterClass(element, parent, context);

				break;
			}
			case "Quantifier": {
				const min: number = element.min;
				const max: number = element.max;

				if (max === 0) {
					return;
				}

				const quant: Quantifier = {
					type: "Quantifier",
					parent,
					min,
					max,
					alternatives: [],
					source
				};
				parent.elements.push(quant);

				const qElement = element.element;
				if (qElement.type === "CapturingGroup" || qElement.type === "Group") {
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
								addEmpty();
							}
						}
					}
				}

				break;
			}
			case "Backreference": {
				if (isEmptyStringBackreferences(element)) {
					break;
				}

				if (context.backreferences === "throw") {
					throw new Error('Backreferences are not supported.');
				}
				addEmpty();

				break;
			}
			default:
				throw assertNever(element, 'Unsupported element');
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

		const cached = this.charCache.get(cacheKey);
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

			this.charCache.set(cacheKey, characters);
		}

		const char: CharacterClass = {
			type: "CharacterClass",
			parent,
			characters,
			source: getSource(element)
		};
		parent.elements.push(char);
	}

	private addEmptyCharacterClass(source: SourceLocation, parent: Concatenation, context: ParserContext): void {
		const char: CharacterClass = {
			type: "CharacterClass",
			parent,
			characters: CharSet.empty(context.flags.unicode ? 0x10FFFF : 0xFFFF),
			source
		};
		parent.elements.push(char);
	}

}


function isEmptyStringBackreferences(backRef: AST.Backreference): boolean {
	const group = backRef.resolved;
	if (backRef.start < group.end) {
		// early or contained backreferences will always be replaced by the empty string in JS regex engines
		return true;
	}

	// the group only matches the empty string
	function isEmpty(element: AST.Element): boolean {
		switch (element.type) {
			case "Assertion":
				return true;
			case "Backreference":
				return isEmptyStringBackreferences(element);
			case "Quantifier":
				return element.max === 0 || isEmpty(element.element);
			case "CapturingGroup":
			case "Group":
				return element.alternatives.every(a => {
					return a.elements.every(e => isEmpty(e));
				});
			default:
				return false;
		}
	}

	return isEmpty(group);
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
