import { CharRange, CharSet } from "../char-set";
import { CASE_VARIATIONS } from "../char-util";
import {
	Element, Assertion, Simple, Alternation, Expression, Concatenation, Parent, SourceLocation, Quantifier,
	CharacterClass, desimplify
} from "../ast";
import { RegExpParser, AST } from "regexpp";
import { assertNever } from "../util";
import { DIGIT, LINE_TERMINATOR, SPACE, WORD } from "./js-util";


export interface Flags {
	dotAll: boolean;
	ignoreCase: boolean;
	multiline: boolean;
	unicode: boolean;
}


export type PredefinedCharacterSet =
	AnyCharacterSet | DigitCharacterSet | PropertyCharacterSet | SpaceCharacterSet | WordCharacterSet;
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

function addEmptyCharacterSet(source: SourceLocation, parent: Concatenation, flags: Flags): void {
	const char: CharacterClass = {
		type: "CharacterClass",
		parent,
		characters: createCharSet([], flags),
		source
	};
	parent.elements.push(char);
}

function addAlternatives(alternatives: AST.Alternative[], parent: Parent, flags: Flags, options: ParseOptions): void {
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
				addElement(e, concat, flags, options);
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
					// remove this alternative because it can never be matched
					parent.alternatives.pop();
					// now we don't need to rethrow the error
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

		addEmptyCharacterSet(concat.source, concat, flags);
	}
}

function addElement(element: AST.Element, parent: Concatenation, flags: Flags, options: ParseOptions): void {
	const source: SourceLocation = getSource(element);

	function addEmpty(): void {
		addEmptyCharacterSet(source, parent, flags);
	}

	switch (element.type) {
		case "Assertion": {
			if (options.lookarounds === "throw") {
				throw new Error("Assertions are not supported.");
			}
			if (options.lookarounds === "disable") {
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

					addAlternatives(element.alternatives, assertion, flags, options);

					if (assertion.alternatives.length === 1) {
						const concat = assertion.alternatives[0];
						if (concat.elements.length === 0) {
							// remove the empty lookaround
							parent.elements.pop();
							// if it's (?!) or (?<!), it will trivially reject, so just add an empty character class to
							// simulate this behavior
							if (assertion.negate) {
								addEmpty();
							}
						}
						if (concat.elements.length === 1) {
							const first = concat.elements[0];
							if (first.type === "CharacterClass" && first.characters.isEmpty) {
								// the assertion can never match the empty character class
								// if it's a negative assertion, we can just remove it but if it's a positive one, we
								// have to replace it with an empty character class.
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
			const alteration: Alternation = {
				type: "Alternation",
				parent,
				alternatives: [],
				source
			};
			parent.elements.push(alteration);
			addAlternatives(element.alternatives, alteration, flags, options);

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
						// if the min of the quantifier is 0, we can just remove the quantifier otherwise it has to be
						// replaced with the empty character class
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

			if (options.backreferences === "throw") {
				throw new Error('Backreferences are not supported.');
			}
			addEmpty();

			break;
		}
		default:
			throw assertNever(element, 'Unsupported element');
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
