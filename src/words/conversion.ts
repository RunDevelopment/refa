import { ReadonlyWord, Word } from "../char-types";

/**
 * Converts the given array of UTF16 character codes into a string.
 *
 * All numbers in the given array must be between 0 (inclusive) and 65535 = 0xFFFF (inclusive).
 *
 * @param word
 */
export function fromUTF16ToString(word: ReadonlyWord): string {
	return String.fromCharCode(...word);
}

/**
 * Converts the given array of Unicode code points into a string.
 *
 * All numbers in the given array must be between 0 (inclusive) and 1114111 = 0x10FFFF (inclusive).
 *
 * @param word
 */
export function fromUnicodeToString(word: ReadonlyWord): string {
	return String.fromCodePoint(...word);
}

/**
 * Converts the given string into an array of UTF16 character codes.
 *
 * All numbers in the returned array are guaranteed to be between 0 (inclusive) and 65535 = 0xFFFF (inclusive).
 *
 * @param string
 */
export function fromStringToUTF16(string: string): Word {
	const word: Word = [];

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
export function fromStringToUnicode(string: string): Word {
	// https://stackoverflow.com/a/21409165/7595472

	const word: Word = [];

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
