import { CharRange, CharSet } from "../char-set";
import { CASE_VARIATIONS } from "../char-util";
import { AST } from "regexpp";
import { assertNever } from "../util";
import { DIGIT, LINE_TERMINATOR, SPACE, WORD } from "./js-util";


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
	flags: Readonly<AST.Flags>
): CharSet {
	// We just have to implement the ES spec
	// https://tc39.es/ecma262/#sec-runtime-semantics-charactersetmatcher-abstract-operation

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
