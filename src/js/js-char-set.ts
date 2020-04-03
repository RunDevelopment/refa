/* eslint-disable @typescript-eslint/camelcase */

import { CharRange, CharSet, negateRanges } from "../char-set";
import { CASE_VARIATIONS } from "../char-util";
import { AST } from "regexpp";
import { assertNever } from "../util";
import { DIGIT, LINE_TERMINATOR, SPACE, WORD } from "./js-util";
import { Alias, Binary_Property, General_Category, Script, Script_Extensions } from "./unicode";


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
	value: string | null;
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

	function addChar(char: number): void {
		ranges.push({ min: char, max: char });
		if (ignoreCase) {
			addVariations(char);
		}
	}
	function addRange(range: CharRange): void {
		ranges.push(range);
		if (ignoreCase) {
			addVariationsRange(range.min, range.max);
		}
	}
	function addRanges(toAdd: readonly CharRange[], negate: boolean): void {
		if (negate) {
			for (const range of negateRanges(toAdd, maximum)) {
				addRange(range);
			}
		} else {
			toAdd.forEach(addRange);
		}
	}

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
			addChar(char);
		} else if ("kind" in char) {
			switch (char.kind) {
				case "any":
					if (dotAll) {
						// since all character sets and ranges are combined using union, we can stop here
						return CharSet.all(maximum);
					} else {
						ranges.push(...negateRanges(LINE_TERMINATOR, maximum));
					}
					break;

				case "property": {
					if (!unicode) {
						throw new Error("Unicode property escapes cannot be used without the u flag.");
					}

					const { key, value, negate } = char;

					if (value == null) {
						if (key in Alias.Binary_Property) {
							// binary property
							const name = Alias.Binary_Property[key as keyof typeof Alias.Binary_Property];
							addRanges(Binary_Property[name as keyof typeof Binary_Property], negate);
						} else if (key in Alias.General_Category) {
							// value from the general category
							const name = Alias.General_Category[key as keyof typeof Alias.General_Category];
							addRanges(General_Category[name as keyof typeof General_Category], negate);
						} else {
							throw new Error(`Unknown lone Unicode property name or value ${char.key}.`);
						}
					} else {
						// key=value

						if (!(key in Alias.NonBinaryProperty)) {
							throw new Error(`Unknown Unicode property name ${char.key}.`);
						}
						const keyName = Alias.NonBinaryProperty[key as keyof typeof Alias.NonBinaryProperty];

						let categoryAliases: Record<string, string>;
						let categoryValues: Record<string, readonly CharRange[]>;
						if (keyName === "General_Category") {
							categoryAliases = Alias.General_Category;
							categoryValues = General_Category;
						} else if (keyName === "Script") {
							categoryAliases = Alias.ScriptAndScript_Extensions;
							categoryValues = Script;
						} else if (keyName === "Script_Extensions") {
							categoryAliases = Alias.ScriptAndScript_Extensions;
							categoryValues = Script_Extensions;
						} else {
							throw assertNever(keyName);
						}

						if (!(value in categoryAliases)) {
							throw new Error(`Unknown Unicode property value ${value} for the name ${key}.`);
						}
						const valueName = categoryAliases[value];

						addRanges(categoryValues[valueName], negate);
					}

					break;
				}

				case "digit":
				case "space":
				case "word": {
					// these character sets are always case invariant, so we can directly add them to the ranges list
					const setRanges = char.kind === "digit" ? DIGIT : char.kind === "space" ? SPACE : WORD;
					if (char.negate) {
						ranges.push(...negateRanges(setRanges, maximum));
					} else {
						ranges.push(...setRanges);
					}
					break;
				}

				default:
					throw assertNever(char, 'Invalid predefined character set type');
			}
		} else {
			addRange(char);
		}
	}

	return CharSet.empty(maximum).union(ranges);
}
