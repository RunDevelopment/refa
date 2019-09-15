import { CharRange, CharSet } from "../char-set";
import { CASE_VARIATIONS } from "../char-util";
import { Element, Assertion, Simple, Alternation, Expression, Concatenation, Parent, SourceLocation, Quantifier, CharacterClass, desimplify } from "../ast";
import { RegExpParser } from "regexpp";
import * as Ast from "regexpp/ast";


export interface Flags {
	dotAll: boolean;
	ignoreCase: boolean;
	multiline: boolean;
	unicode: boolean;
}


const DIGIT: CharRange = { min: 0x30, max: 0x39 }; // 0-9
const SPACE: CharRange[] = [
	{ min: 0x09, max: 0x0d }, // \t \n \v \f \r
	{ min: 0x20, max: 0x20 }, // space
	{ min: 0xa0, max: 0xa0 }, // nbsp
	{ min: 0x1680, max: 0x1680 },
	{ min: 0x2000, max: 0x200a },
	{ min: 0x2028, max: 0x2029 },
	{ min: 0x202f, max: 0x202f },
	{ min: 0x205f, max: 0x205f },
	{ min: 0x3000, max: 0x3000 },
	{ min: 0xfeff, max: 0xfeff },
];
const WORD: CharRange[] = [
	{ min: 0x30, max: 0x39 }, // 0-9
	{ min: 0x41, max: 0x5A }, // A-Z
	{ min: 0x5f, max: 0x5f }, // _
	{ min: 0x61, max: 0x7A }, // a-z
];
const LINE_TERMINATOR: CharRange[] = [
	{ min: 0x0a, max: 0x0a }, // \n
	{ min: 0x0d, max: 0x0d }, // \r
	{ min: 0x2028, max: 0x2029 },
];


type PredefinedCharacterSet = AnyCharacterSet | DigitCharacterSet | PropertyCharacterSet | SpaceCharacterSet | WordCharacterSet;
interface AnyCharacterSet {
	kind: "any";
}
interface DigitCharacterSet {
	kind: "digit";
	negate: boolean;
}
interface PropertyCharacterSet {
	kind: "property";
	key: string;
	negate: boolean;
}
interface SpaceCharacterSet {
	kind: "space";
	negate: boolean;
}
interface WordCharacterSet {
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
	chars: Iterable<number | Readonly<CharRange> | Readonly<PredefinedCharacterSet>>,
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
					throw new Error(`Invalid predefined character set type '${(char as any).kind}'`);
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
			throw new Error(`Unknown assertion type '${(assertion as any).kind}'`);
	}
}

export interface RegExpLiteral {
	pattern: Expression;
	flags: Flags;
}
export function parse(literal: { source: string; flags: string }, options?: RegExpParser.Options): RegExpLiteral {
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
	addAlternatives(parsedPattern.alternatives, pattern, flags);

	return { pattern, flags };
}

function addAlternatives(alternatives: Ast.Alternative[], parent: Parent, flags: Flags): void {
	for (const alt of alternatives) {
		const elements: Element[] = [];
		const concat: Concatenation = {
			type: "Concatenation",
			parent,
			elements,
			source: getSource(alt)
		};
		parent.alternatives.push(concat);

		alt.elements.forEach(e => addElement(e, concat, flags));
	}
}

function addElement(element: Ast.Element, parent: Concatenation, flags: Flags): void {
	const source: SourceLocation = getSource(element);

	switch (element.type) {
		case "Assertion":
			{
				switch (element.kind) {
					case "lookahead":
					case "lookbehind":
						{
							const assertion: Assertion = {
								type: "Assertion",
								kind: element.kind === "lookahead" ? "ahead" : "behind",
								parent,
								negate: element.negate,
								alternatives: [],
								source
							};
							parent.elements.push(assertion);

							addAlternatives(element.alternatives, assertion, flags);
							break;
						}
					case "end":
					case "start":
					case "word":
						{
							const simpleAssertion = createAssertion(element, flags);
							const assertion = desimplify(simpleAssertion, parent, source);
							parent.elements.push(assertion);
							break;
						}
					default:
						throw new Error(`Unsupported element: ${element}`)
				}
				break;
			}
		case "CapturingGroup":
		case "Group":
			{
				if (element.alternatives.length === 1) {
					element.alternatives[0].elements.forEach(e => addElement(e, parent, flags));
				} else if (element.alternatives.length > 1) {
					const alteration: Alternation = {
						type: "Alternation",
						parent,
						alternatives: [],
						source
					};
					parent.elements.push(alteration);
					addAlternatives(element.alternatives, alteration, flags);
				}
				break;
			}
		case "Character":
		case "CharacterClass":
		case "CharacterSet":
			{
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
								throw new Error(`Unsupported element: ${e}`);
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
		case "Quantifier":
			{
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
					addAlternatives(qElement.alternatives, quant, flags);
				} else {
					const concat: Concatenation = {
						type: "Concatenation",
						parent: quant,
						elements: [],
						source: getSource(qElement)
					}
					quant.alternatives.push(concat);

					addElement(qElement, concat, flags);
				}

				break;
			}
		default:
			throw new Error(`Unsupported element '${element.type}'`);
	}
}

function getSource(node: Ast.Node): SourceLocation {
	return {
		start: node.start,
		end: node.end
	};
}
