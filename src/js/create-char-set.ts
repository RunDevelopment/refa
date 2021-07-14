import { Char } from "../char-types";
import { CharRange, CharSet } from "../char-set";
import { assertNever } from "../util";
import { Flags } from "./flags";
import { CharEnv, getCharEnv } from "./char-env";
import { getProperty } from "./property";

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

/**
 * Creates a new character set with the characters equivalent to a JavaScript regular expression character set.
 *
 * @param chars The characters in the set.
 * @param flags The flags of the pattern.
 */
export function createCharSet(
	chars: Iterable<Char | CharRange | Readonly<PredefinedCharacterSet>>,
	flags: Readonly<Flags>
): CharSet {
	// https://tc39.es/ecma262/#sec-runtime-semantics-charactersetmatcher-abstract-operation

	// This works by first adding all characters and ranges to a single ranges array while keeping track of whether
	// added characters/ranges might vary in case (if ignoreCase).
	// If ignoreCase and the ranges might vary in case, the case variations of all characters will be added.

	const env = getCharEnv(flags);

	const ranges: CharRange[] = [];
	let fullCaseCheck = false;

	function addChar(char: Char): void {
		/**
		 * We will only add all case variation for the given character if:
		 *  1) the regexp has the i flag set.
		 *  2) we don't already do a full case check. Since the full case check will add all case variations of this
		 *     character anyway, there's no reason to do it here.
		 *  3) the given character actually varies in case.
		 */
		if (env.ignoreCase && !fullCaseCheck) {
			const fold = env.caseFolding[char];
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

		if (env.ignoreCase && !fullCaseCheck && !env.caseVarying.isDisjointWith(range)) {
			fullCaseCheck = true;
		}

		ranges.push(range);
	}

	for (const char of chars) {
		if (isChar(char)) {
			addChar(char);
		} else if ("kind" in char) {
			const set = getPredefinedSet(char, flags, env);
			if (set.isAll) {
				// since all character sets and ranges are combined using union, we can stop here
				return set;
			}
			ranges.push(...set.ranges);
		} else {
			addRange(char);
		}
	}

	const cs = env.empty.union(ranges);
	if (!env.ignoreCase || !fullCaseCheck) {
		// no full case check, so we're done here.
		return cs;
	}

	return env.withCaseVaryingCharacters(cs);
}

function isChar(value: unknown): value is Char {
	return typeof value === "number";
}

function getPredefinedSet(char: Readonly<PredefinedCharacterSet>, flags: Readonly<Flags>, env: CharEnv): CharSet {
	switch (char.kind) {
		case "any":
			return flags.dotAll ? env.all : env.nonLineTerminator;

		case "digit":
			return char.negate ? env.nonDigit : env.digit;

		case "space":
			return char.negate ? env.nonSpace : env.space;

		case "word":
			return char.negate ? env.nonWord : env.word;

		case "property": {
			if (!env.unicode) {
				throw new Error("Unicode property escapes cannot be used without the u flag.");
			}

			const { key, value, negate } = char;
			return getProperty(key, value, negate, env);
		}

		default:
			throw assertNever(char, "Invalid predefined character set type");
	}
}
