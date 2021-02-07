import { CharRange, CharSet } from "./char-set";
import { wordSetToWords as wordSetToWordsImpl } from "./char-util";

/**
 * Converts the given array of UTF16 character codes into a string.
 *
 * All numbers in the given array must be between 0 (inclusive) and 65535 = 0xFFFF (inclusive).
 *
 * @param word
 */
export function fromUTF16ToString(word: Iterable<number>): string {
	return String.fromCharCode(...word);
}

/**
 * Converts the given array of Unicode code points into a string.
 *
 * All numbers in the given array must be between 0 (inclusive) and 1114111 = 0x10FFFF (inclusive).
 *
 * @param word
 */
export function fromUnicodeToString(word: Iterable<number>): string {
	return String.fromCodePoint(...word);
}

/**
 * Converts the given string into an array of UTF16 character codes.
 *
 * All numbers in the returned array are guaranteed to be between 0 (inclusive) and 65535 = 0xFFFF (inclusive).
 *
 * @param string
 */
export function fromStringToUTF16(string: string): number[] {
	const word: number[] = new Array<number>();

	for (let i = 0, l = string.length; i < l; i++) {
		word.push(string.charCodeAt(i));
	}

	return word;
}

/**
 * Converts the given string into an array of Unicode code points.
 *
 * All numbers in the returned array are guaranteed to be between 0 (inclusive) and 1114111 = 0x10FFFF (inclusive).
 *
 * @param string
 */
export function fromStringToUnicode(string: string): number[] {
	// https://stackoverflow.com/a/21409165/7595472

	const word: number[] = [];

	for (let i = 0, l = string.length; i < l; i++) {
		const c1 = string.charCodeAt(i);
		if (c1 >= 0xd800 && c1 < 0xdc00 && i + 1 < l) {
			const c2 = string.charCodeAt(i + 1);
			if (c2 >= 0xdc00 && c2 < 0xe000) {
				word.push(0x10000 + ((c1 - 0xd800) << 10) + (c2 - 0xdc00));
				i++;
				continue;
			}
		}
		word.push(c1);
	}

	return word;
}

/**
 * Iterates all words which can be constructed from the given word set (array of character sets).
 *
 * @param wordSet
 */
export function wordSetToWords(wordSet: readonly CharSet[]): IterableIterator<number[]> {
	return wordSetToWordsImpl(wordSet);
}

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
export function pickMostReadableCharacter(set: CharSet): number | undefined {
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
 * If at least one of the given character sets is empty, `undefined` will be returned.
 *
 * @param wordSet
 */
export function pickMostReadableWord(wordSet: Iterable<CharSet>): number[] | undefined {
	const word: number[] = [];
	for (const set of wordSet) {
		const c = pickMostReadableCharacter(set);
		if (c === undefined) {
			return undefined;
		} else {
			word.push(c);
		}
	}
	return word;
}
