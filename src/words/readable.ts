import { CharRange, CharSet } from "../char-set";
import { Char, Word } from "../char-types";
import { ReadonlyWordSet } from "../word-set";

const READABILITY_ASCII_PRIORITY: readonly CharRange[] = [
	// A-Z
	{ min: 0x41, max: 0x5a },
	// a-z
	{ min: 0x61, max: 0x7a },
	// 0-9
	{ min: 0x30, max: 0x39 },
	// -
	{ min: 0x2d, max: 0x2d },
	// _
	{ min: 0x5f, max: 0x5f },
	// space
	{ min: 0x20, max: 0x20 },
	// printable ASCII
	{ min: 0x20, max: 0x7e },
	// tab
	{ min: 0x09, max: 0x09 },
	// \n
	{ min: 0x0a, max: 0x0a },
	// \r
	{ min: 0x0d, max: 0x0d },
];

/**
 * Returns the most humanly readable character in the given character set. Which character is picked is entirely
 * implementation-defined but, generally, word characters will be picked over non-word characters and printable
 * characters will be picked over non-printable characters.
 *
 * If the given character set is empty, `undefined` will be returned.
 *
 * @param set
 */
export function pickMostReadableCharacter(set: CharSet): Char | undefined {
	if (set.ranges.length === 0) {
		// empty
		return undefined;
	} else if (set.ranges.length === 1) {
		const { min, max } = set.ranges[0];
		if (min === max) {
			// we don't have any choice
			return min;
		}
	}

	// search in ASCII range
	for (const range of READABILITY_ASCII_PRIORITY) {
		const c = set.commonCharacter(range);
		if (c !== undefined) {
			return c;
		}
	}

	// choose any character
	return set.ranges[0].min;
}

/**
 * Returns a word of the given word set that is the most humanly readable.
 *
 * @param wordSet
 */
export function pickMostReadableWord(wordSet: ReadonlyWordSet): Word {
	const word: Word = [];
	for (const set of wordSet) {
		const c = pickMostReadableCharacter(set);
		if (c === undefined) {
			throw new Error("Word sets are not allowed to contain empty character sets.");
		} else {
			word.push(c);
		}
	}
	return word;
}
