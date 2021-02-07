import { CharRange, CharSet } from "../char-set";
import { assertNever } from "../util";
import { Flags } from "./js-flags";
import {
	DIGIT,
	LINE_TERMINATOR,
	SPACE,
	WORD,
	WORD_IU,
	withCaseVaryingCharacters,
	UNICODE_MAXIMUM,
	UTF16_MAXIMUM,
} from "./js-util";
import {
	Alias,
	Binary_Property,
	General_Category,
	Script,
	Script_Extensions,
	UnicodeCaseVarying,
	UnicodeCaseFolding,
} from "./unicode";
import { UTF16CaseVarying, UTF16CaseFolding } from "./utf16-case-folding";

export type PredefinedCharacterSet =
	| AnyCharacterSet
	| DigitCharacterSet
	| PropertyCharacterSet
	| SpaceCharacterSet
	| WordCharacterSet;
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

const DOT_UNICODE = CharSet.empty(UNICODE_MAXIMUM).union(LINE_TERMINATOR).negate();
const DOT_UTF16 = CharSet.empty(UTF16_MAXIMUM).union(LINE_TERMINATOR).negate();

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
	// https://tc39.es/ecma262/#sec-runtime-semantics-charactersetmatcher-abstract-operation

	// This works by first adding all characters and ranges to a single ranges array while keeping track of whether
	// added characters/ranges might vary in case (if ignoreCase).
	// If ignoreCase and the ranges might vary in case, the case variations of all characters will be added.

	const { unicode, ignoreCase, dotAll } = flags;
	const maximum = unicode ? UNICODE_MAXIMUM : UTF16_MAXIMUM;

	const caseFolding: Readonly<Record<number, readonly number[]>> = unicode ? UnicodeCaseFolding : UTF16CaseFolding;
	const caseVarying: CharSet = unicode ? UnicodeCaseVarying : UTF16CaseVarying;
	const caseVaryingMin = caseVarying.ranges[0].min;
	const caseVaryingMax = caseVarying.ranges[caseVarying.ranges.length - 1].max;

	const ranges: CharRange[] = [];
	let fullCaseCheck = false;

	function addChar(char: number): void {
		/**
		 * We will only add all case variation for the given character if:
		 *  1) the regexp has the i flag set.
		 *  2) we don't already do a full case check. Since the full case check will add all case variations of this
		 *     character anyway, there's no reason to do it here.
		 *  3) the given character actually varies in case.
		 */
		if (ignoreCase && !fullCaseCheck) {
			const fold: readonly number[] | undefined = caseFolding[char];
			if (fold) {
				// add all case variations
				for (let i = 0, l = fold.length; i < l; i++) {
					const variation = fold[i];
					ranges.push({ min: variation, max: variation });
				}
				// all case variations also include the given character, so we are done
				return;
			}
		}
		ranges.push({ min: char, max: char });
	}
	function addRange(range: CharRange): void {
		if (range.min === range.max) {
			addChar(range.min);
			return;
		}

		if (
			ignoreCase &&
			!fullCaseCheck &&
			// the given range do not include all case-varying characters
			!(range.min <= caseVaryingMin && range.max >= caseVaryingMax) &&
			// the given range contains case-varying characters
			!caseVarying.isDisjointWith(range)
		) {
			fullCaseCheck = true;
		}

		ranges.push(range);
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

	for (const char of chars) {
		if (typeof char == "number") {
			addChar(char);
		} else if ("kind" in char) {
			switch (char.kind) {
				case "any": {
					if (dotAll) {
						// since all character sets and ranges are combined using union, we can stop here
						return CharSet.all(maximum);
					} else {
						ranges.push(...(unicode ? DOT_UNICODE : DOT_UTF16).ranges);
					}
					break;
				}

				case "property": {
					if (!unicode) {
						throw new Error("Unicode property escapes cannot be used without the u flag.");
					}

					const { key, value, negate } = char;
					const setRanges = getProperty(key, value);

					if (ignoreCase && negate) {
						// there might be case-varying characters in the set, so we have to add all case variations
						// before negating
						let set = CharSet.empty(maximum).union(setRanges);
						set = withCaseVaryingCharacters(set, caseFolding, caseVarying);

						// we can directly push the ranges because we already handled all case-varying characters
						ranges.push(...negateRanges(set.ranges, maximum));
					} else {
						addRanges(setRanges, negate);
					}

					break;
				}

				case "digit":
				case "space": {
					// these character sets are always case invariant, so we can directly add them to the ranges list
					const setRanges = char.kind === "digit" ? DIGIT : SPACE;

					if (char.negate) {
						ranges.push(...negateRanges(setRanges, maximum));
					} else {
						ranges.push(...setRanges);
					}
					break;
				}

				case "word": {
					// \w and \W only case-varies in unicode mode.
					const setRanges = unicode && ignoreCase ? WORD_IU : WORD;

					if (char.negate) {
						ranges.push(...negateRanges(setRanges, maximum));
					} else {
						ranges.push(...setRanges);
					}
					break;
				}

				default:
					throw assertNever(char, "Invalid predefined character set type");
			}
		} else {
			addRange(char);
		}
	}

	const cs = CharSet.empty(maximum).union(ranges);
	if (!fullCaseCheck) {
		// no full case check, so we're done here.
		return cs;
	}

	return withCaseVaryingCharacters(cs, caseFolding, caseVarying);
}

function negateRanges(ranges: readonly CharRange[], maximum: number): readonly CharRange[] {
	return CharSet.empty(maximum).union(ranges).negate().ranges;
}

function getProperty(key: string, value: string | null): readonly CharRange[] {
	if (value == null) {
		if (key in Alias.Binary_Property) {
			// binary property
			const name = Alias.Binary_Property[key as keyof typeof Alias.Binary_Property];
			return Binary_Property[name as keyof typeof Binary_Property];
		} else if (key in Alias.General_Category) {
			// value from the general category
			const name = Alias.General_Category[key as keyof typeof Alias.General_Category];
			return General_Category[name as keyof typeof General_Category];
		} else {
			throw new Error(`Unknown lone Unicode property name or value ${key}.`);
		}
	} else {
		// key=value

		if (!(key in Alias.NonBinaryProperty)) {
			throw new Error(`Unknown Unicode property name ${key}.`);
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

		return categoryValues[valueName];
	}
}
