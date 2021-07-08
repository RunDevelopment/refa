import { assert } from "chai";
import { FiniteAutomaton } from "../../src/fa-types";
import { Literal } from "../../src/js";
import { fromStringToUTF16, fromUTF16ToString, fromUnicodeToString } from "../../src/words";

export interface WordTestCaseData {
	accept: number[][];
	reject: number[][];
}
export interface WordTestCase extends WordTestCaseData {
	literal: Literal;
}

export const wordTestData: WordTestCase[] = [
	{
		literal: /abc/,
		accept: ["abc"].map(fromStringToUTF16),
		reject: ["", "a", "ab", "abca", "aabc", "ABC"].map(fromStringToUTF16),
	},
	{
		literal: /ab+c/,
		accept: ["abc", "abbbbbbbbbbbbbbbbbbbbbbbbbbbc"].map(fromStringToUTF16),
		reject: ["", "a", "ab", "abca", "aabc", "ABC"].map(fromStringToUTF16),
	},
	{
		literal: /a*b*c*/,
		accept: ["", "a", "b", "c", "aaaaaaa", "bbbbbbb", "ccccccc", "aaabbbbccc", "bccc", "aaaacccc"].map(
			fromStringToUTF16
		),
		reject: ["abca", "ABC", "cba", "d", "dd"].map(fromStringToUTF16),
	},
	{
		literal: /\w+\d+/,
		accept: ["abcabcabc000", "123", "00", "a0", "aaaaa00000", "a0a0a0a0a0a0a0a0a0a0a0"].map(fromStringToUTF16),
		reject: ["", "a", "0", "abc", "123a", "D"].map(fromStringToUTF16),
	},
];

export function testWordTestCases(fa: FiniteAutomaton, data: WordTestCaseData): void {
	type Outcome = "accepted" | "rejected";
	function fail(word: number[], expected: Outcome, actual: Outcome): void {
		let unicodeStr = "<error>";
		try {
			unicodeStr = JSON.stringify(fromUnicodeToString(word));
		} catch (e) {
			/* noop */
		}

		let utf16Str = "<error>";
		try {
			utf16Str = JSON.stringify(fromUTF16ToString(word));
		} catch (e) {
			/* noop */
		}

		assert.fail(
			`Expected word to be ${expected} but it was ${actual} instead.` +
				"\nWord:           " +
				JSON.stringify(word) +
				"\nWord (Unicode): " +
				unicodeStr +
				"\nWord (UTF16):   " +
				utf16Str
		);
	}

	for (const word of data.accept) {
		if (!fa.test(word)) {
			fail(word, "accepted", "rejected");
		}
	}
	for (const word of data.reject) {
		if (fa.test(word)) {
			fail(word, "rejected", "accepted");
		}
	}
}
