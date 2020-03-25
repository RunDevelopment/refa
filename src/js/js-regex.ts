import { CharRange, CharSet } from "../char-set";
import { CASE_VARIATIONS } from "../char-util";
import { Element, Assertion, Simple, Alternation, Expression, Concatenation, Parent, SourceLocation, Quantifier, CharacterClass, desimplify } from "../ast";
import { RegExpParser } from "regexpp";
import * as Ast from "regexpp/ast";
import { assertNever } from "../util";
import { DIGIT, LINE_TERMINATOR, SPACE, WORD } from "./js-util";


export interface Flags {
	dotAll: boolean;
	ignoreCase: boolean;
	multiline: boolean;
	unicode: boolean;
}


export type PredefinedCharacterSet = AnyCharacterSet | DigitCharacterSet | PropertyCharacterSet | SpaceCharacterSet | WordCharacterSet;
export interface AnyCharacterSet {
	kind: "any";
}
export interface DigitCharacterSet {
	kind: "digit";
	negate: boolean;
}
export interface PropertyCharacterSet {
	kind: "property";
	key: string;
	negate: boolean;
}
export interface SpaceCharacterSet {
	kind: "space";
	negate: boolean;
}
export interface WordCharacterSet {
	kind: "word";
	negate: boolean;
}

/**
 * Creates a new character set with the characters equivalent to a JavaScript regular expression character set.
 *
 * @param chars The characters in the set.
 * @param flags The flags of the pattern.
 */
export function createCharSet(
	chars: Iterable<number | CharRange | Readonly<PredefinedCharacterSet>>,
	flags: Readonly<Flags>
): CharSet {
	const { unicode, ignoreCase, dotAll } = flags;
	const maximum = unicode ? 0x10FFFF : 0xFFFF;

	const ranges: CharRange[] = [];

	function addVariations(c: number): void {
		const variations = CASE_VARIATIONS.get(c);
		if (variations !== undefined) {
			for (let i = 0, l = variations.length; i < l; i++) {
				const variation = variations[i];
				if (variation <= maximum) {
					ranges.push({ min: variation, max: variation });
				}
			}
		}
	}
	function addVariationsRange(min: number, max: number): void {
		for (let c = min; c <= max; c++) {
			const variations = CASE_VARIATIONS.get(c);
			if (variations !== undefined) {
				for (let i = 0, l = variations.length; i < l; i++) {
					const variation = variations[i];
					if (variation <= maximum && !(min <= variation && variation <= max)) {
						// TODO: more efficient approach
						ranges.push({ min: variation, max: variation });
					}
				}
			}
		}
	}

	for (const char of chars) {
		if (typeof char == "number") {
			ranges.push({ min: char, max: char });
			if (ignoreCase) {
				addVariations(char);
			}
		} else if ("kind" in char) {
			switch (char.kind) {
				case "digit":
					if (char.negate) {
						// we just quickly negate it ourselves. No need for a new CharSet
						ranges.push({ min: 0, max: DIGIT.min - 1 }, { min: DIGIT.max + 1, max: maximum });
					} else {
						ranges.push(DIGIT);
					}
					break;

				case "any":
					if (dotAll) {
						// since all character sets and ranges are combined using union, we can stop here
						return CharSet.all(maximum);
					} else {
						ranges.push(...CharSet.all(maximum).without(LINE_TERMINATOR).ranges);
					}
					break;

				case "property":
					// TODO: implement
					throw new Error(`Not implemented yet.`);

				case "space":
				case "word": {
					const setRanges = char.kind === "space" ? SPACE : WORD;
					if (char.negate) {
						ranges.push(...CharSet.empty(maximum).union(setRanges).negate().ranges);
					} else {
						ranges.push(...setRanges);
					}
					break;
				}

				default:
					throw assertNever(char, 'Invalid predefined character set type');
			}
		} else {
			ranges.push(char);
			if (ignoreCase) {
				addVariationsRange(char.min, char.max);
			}
		}
	}

	return CharSet.empty(maximum).union(ranges);
}


type BoundaryAssertion = WordBoundaryAssertion | TextBoundaryAssertion;
interface WordBoundaryAssertion {
	kind: "word";
	negate: boolean;
}
interface TextBoundaryAssertion {
	kind: "end" | "start";
}

function createAssertion(assertion: Readonly<BoundaryAssertion>, flags: Readonly<Flags>): Simple<Element> {
	const maximum = flags.unicode ? 0x10FFFF : 0xFFFF;

	const newAssertion = (negate: boolean, kind: "ahead" | "behind", characters: CharSet): Simple<Assertion> => {
		return {
			type: "Assertion",
			negate,
			kind,
			alternatives: [
				{
					type: "Concatenation",
					elements: [
						{
							type: "CharacterClass",
							characters
						}
					]
				}
			]
		};
	};

	switch (assertion.kind) {
		case "end":
		case "start": {
			// /$/m == /(?!.)/
			// /$/  == /(?![^])/
			// /^/m == /(?<!.)/
			// /^/  == /(?<![^])/

			const charSet: CharSet = flags.multiline ?
				CharSet.empty(maximum).union(LINE_TERMINATOR).negate() :
				CharSet.all(maximum);
			return newAssertion(true, assertion.kind === "start" ? "behind" : "ahead", charSet);
		}

		case "word": {
			// /\b/ == /(?:(?<!\w)(?=\w)|(?<=\w)(?!\w))/
			// /\B/ == /(?:(?<=\w)(?=\w)|(?<!\w)(?!\w))/

			const charSet: CharSet = CharSet.empty(maximum).union(WORD);
			return {
				type: "Alternation",
				alternatives: [
					{
						type: "Concatenation",
						elements: [
							newAssertion(!assertion.negate, "behind", charSet),
							newAssertion(false, "ahead", charSet)
						]
					},
					{
						type: "Concatenation",
						elements: [
							newAssertion(assertion.negate, "behind", charSet),
							newAssertion(true, "ahead", charSet)
						]
					}
				]
			}
		}

		default:
			throw assertNever(assertion, 'Unknown assertion type');
	}
}

export interface RegExpLiteral {
	pattern: Expression;
	flags: Flags;
	maxCharacter: number;
}

export interface ParseOptions extends RegExpParser.Options {
	backreferences?: "default" | "throw" | "disable";
	lookarounds?: "default" | "parse" | "throw" | "disable";
}

export function parse(literal: { source: string; flags: string }, options?: ParseOptions): RegExpLiteral {
	options = options || {};

	const parser = new RegExpParser(options);

	const parsedFlags = parser.parseFlags(literal.flags);
	const flags: Flags = {
		dotAll: parsedFlags.dotAll,
		ignoreCase: parsedFlags.ignoreCase,
		multiline: parsedFlags.multiline,
		unicode: parsedFlags.unicode,
	};

	const parsedPattern = parser.parsePattern(literal.source, undefined, undefined, parsedFlags.unicode);
	const pattern: Expression = {
		type: "Expression",
		parent: null,
		alternatives: [],
		source: getSource(parsedPattern)
	};
	addAlternatives(parsedPattern.alternatives, pattern, flags, options);

	return { pattern, flags, maxCharacter: flags.unicode ? 0x10FFFF : 0xFFFF };
}

function addAlternatives(alternatives: Ast.Alternative[], parent: Parent, flags: Flags, options: ParseOptions): void {
	for (const alt of alternatives) {
		const elements: Element[] = [];
		const concat: Concatenation = {
			type: "Concatenation",
			parent,
			elements,
			source: getSource(alt)
		};
		parent.alternatives.push(concat);

		alt.elements.forEach(e => addElement(e, concat, flags, options));
	}
}

function addElement(element: Ast.Element, parent: Concatenation, flags: Flags, options: ParseOptions): void {
	const source: SourceLocation = getSource(element);

	function addEmptyCharacterSet(): void {
		const char: CharacterClass = {
			type: "CharacterClass",
			parent,
			characters: createCharSet([], flags),
			source
		};
		parent.elements.push(char);
	}

	switch (element.type) {
		case "Assertion": {
			if (options.lookarounds === "throw") {
				throw new Error("Assertions are not supported.");
			}
			if (options.lookarounds === "disable") {
				addEmptyCharacterSet();
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

					addAlternatives(element.alternatives, assertion, flags, options);
					break;
				}
				case "end":
				case "start":
				case "word": {
					const simpleAssertion = createAssertion(element, flags);
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
			if (element.alternatives.length === 1) {
				element.alternatives[0].elements.forEach(e => addElement(e, parent, flags, options));
			} else if (element.alternatives.length > 1) {
				const alteration: Alternation = {
					type: "Alternation",
					parent,
					alternatives: [],
					source
				};
				parent.elements.push(alteration);
				addAlternatives(element.alternatives, alteration, flags, options);
			}
			break;
		}
		case "Character":
		case "CharacterClass":
		case "CharacterSet": {
			let characters: CharSet;
			if (element.type === "Character") {
				// e.g. a
				characters = createCharSet([element.value], flags);
			} else if (element.type === "CharacterSet") {
				// e.g. \w
				characters = createCharSet([element], flags);
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
				}), flags);

				if (element.negate) {
					characters = characters.negate();
				}
			}

			const char: CharacterClass = {
				type: "CharacterClass",
				parent,
				characters,
				source
			};
			parent.elements.push(char);

			break;
		}
		case "Quantifier": {
			const min: number = element.min;
			const max: number = element.max === null ? Infinity : element.max;

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
				addAlternatives(qElement.alternatives, quant, flags, options);
			} else {
				const concat: Concatenation = {
					type: "Concatenation",
					parent: quant,
					elements: [],
					source: getSource(qElement)
				}
				quant.alternatives.push(concat);

				addElement(qElement, concat, flags, options);
			}

			break;
		}
		case "Backreference":
			if (options.backreferences === "disable") {
				addEmptyCharacterSet();
				break;
			}

			// "throw" is the default
			throw new Error('Backreferences are not supported.');
		default:
			throw assertNever(element, 'Unsupported element');
	}
}

function getSource(node: Ast.Node): SourceLocation {
	return {
		start: node.start,
		end: node.end
	};
}
