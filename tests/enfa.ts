import { ENFA } from "../src/enfa";
import { NFA } from "../src/nfa";
import { assert } from "chai";
import { fromStringToUnicode, fromUnicodeToString } from "../src/words";
import { literalToString, removeIndentation, literalToENFA } from "./helper/fa";
import { FINITE_LITERALS, NON_FINITE_LITERALS, NON_EMPTY_LITERALS, EMPTY_LITERALS } from "./helper/regexp-literals";
import { Literal } from "../src/js";
import { prefixes, suffixes } from "./helper/util";
import { wordTestData, testWordTestCases } from "./helper/word-test-data";
import { CharSet } from "../src/char-set";

describe("ENFA", function () {
	describe("fromRegex", function () {
		test([
			{
				literal: /a*/,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : 61

					[2] -> none

					(3) -> (1) : ε
					    -> [2] : ε`,
			},
			{
				literal: /a*?/,
				expected: `
					(0) -> [1] : ε
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : 61

					(3) -> [1] : ε
					    -> (2) : ε`,
			},
			{
				literal: /a+/,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : 61

					(2) -> (1) : ε
					    -> [3] : ε

					[3] -> none`,
			},
			{
				literal: /a+?/,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : 61

					(2) -> [3] : ε
					    -> (1) : ε

					[3] -> none`,
			},
			{
				literal: /a?/,
				expected: `
					(0) -> (1) : 61
					    -> [2] : ε

					(1) -> [2] : ε

					[2] -> none`,
			},
			{
				literal: /a??/,
				expected: `
					(0) -> [1] : ε
					    -> (2) : 61

					[1] -> none

					(2) -> [1] : ε`,
			},
			{
				literal: /a{2,4}/,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 61

					(2) -> (3) : 61
					    -> [4] : ε

					(3) -> (5) : 61
					    -> [4] : ε

					[4] -> none

					(5) -> [4] : ε`,
			},
			{
				literal: /a{2,4}?/,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 61

					(2) -> [3] : ε
					    -> (4) : 61

					[3] -> none

					(4) -> [3] : ε
					    -> (5) : 61

					(5) -> [3] : ε`,
			},
			{
				literal: /a{3}/,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 61

					(2) -> [3] : 61

					[3] -> none`,
			},
			{
				literal: /a{3}?/,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 61

					(2) -> [3] : 61

					[3] -> none`,
			},
			{
				literal: /(a|b)+c/,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : 61
					    -> (3) : 62

					(2) -> (4) : ε

					(3) -> (4) : ε

					(4) -> (1) : ε
					    -> (5) : ε

					(5) -> [6] : 63

					[6] -> none`,
			},
			{
				literal: /a*b*c*/,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 61

					(2) -> (4) : ε
					    -> (5) : ε

					(3) -> (1) : ε
					    -> (2) : ε

					(4) -> (6) : 62

					(5) -> (7) : ε
					    -> [8] : ε

					(6) -> (4) : ε
					    -> (5) : ε

					(7) -> (9) : 63

					[8] -> none

					(9) -> (7) : ε
					    -> [8] : ε`,
			},
			{
				literal: /a*b*?c*/,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 61

					(2) -> (4) : ε
					    -> (5) : ε

					(3) -> (1) : ε
					    -> (2) : ε

					(4) -> (6) : ε
					    -> [7] : ε

					(5) -> (8) : 62

					(6) -> (9) : 63

					[7] -> none

					(8) -> (4) : ε
					    -> (5) : ε

					(9) -> (6) : ε
					    -> [7] : ε`,
			},
			{
				literal: /a+b+?c+/,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : 61

					(2) -> (1) : ε
					    -> (3) : ε

					(3) -> (4) : ε

					(4) -> (5) : 62

					(5) -> (6) : ε
					    -> (4) : ε

					(6) -> (7) : ε

					(7) -> (8) : 63

					(8) -> (7) : ε
					    -> [9] : ε

					[9] -> none`,
			},
			{
				literal: /(a|){3}/,
				expected: `
					(0) -> (1) : 61
					    -> (2) : ε

					(1) -> (3) : ε

					(2) -> (3) : ε

					(3) -> (4) : 61
					    -> (5) : ε

					(4) -> (6) : ε

					(5) -> (6) : ε

					(6) -> (7) : 61
					    -> (8) : ε

					(7) -> [9] : ε

					(8) -> [9] : ε

					[9] -> none`,
			},
			{
				literal: /(|a){3}/,
				expected: `
					(0) -> (1) : ε
					    -> (2) : 61

					(1) -> (3) : ε

					(2) -> (3) : ε

					(3) -> (4) : ε
					    -> (5) : 61

					(4) -> (6) : ε

					(5) -> (6) : ε

					(6) -> (7) : ε
					    -> (8) : 61

					(7) -> [9] : ε

					(8) -> [9] : ε

					[9] -> none`,
			},
			{
				literal: /(|a|){3}/,
				expected: `
					(0) -> (1) : ε
					    -> (2) : 61
					    -> (3) : ε

					(1) -> (4) : ε

					(2) -> (4) : ε

					(3) -> (4) : ε

					(4) -> (5) : ε
					    -> (6) : 61
					    -> (7) : ε

					(5) -> (8) : ε

					(6) -> (8) : ε

					(7) -> (8) : ε

					(8) -> (9) : ε
					    -> (10) : 61
					    -> (11) : ε

					(9) -> [12] : ε

					(10) -> [12] : ε

					(11) -> [12] : ε

					[12] -> none`,
			},
			{
				literal: /(ab){0,3}/,
				expected: `
					(0) -> (1) : 61
					    -> [2] : ε

					(1) -> (3) : 62

					[2] -> none

					(3) -> (4) : 61
					    -> [2] : ε

					(4) -> (5) : 62

					(5) -> (6) : 61
					    -> [2] : ε

					(6) -> (7) : 62

					(7) -> [2] : ε`,
			},
			{
				literal: /a+|/,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 61

					(2) -> [4] : ε

					(3) -> (1) : ε
					    -> (5) : ε

					[4] -> none

					(5) -> [4] : ε`,
			},
			{
				literal: /(a|)+/,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : 61
					    -> (3) : ε

					(2) -> (4) : ε

					(3) -> (4) : ε

					(4) -> (1) : ε
					    -> [5] : ε

					[5] -> none`,
			},
			{
				literal: /(a+)+/,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : ε

					(2) -> (3) : 61

					(3) -> (2) : ε
					    -> (4) : ε

					(4) -> (1) : ε
					    -> [5] : ε

					[5] -> none`,
			},
			{
				literal: /((a*)+)?/,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : ε
					    -> (4) : ε

					[2] -> none

					(3) -> (5) : 61

					(4) -> (1) : ε
					    -> (6) : ε

					(5) -> (3) : ε
					    -> (4) : ε

					(6) -> [2] : ε`,
			},
			{
				literal: /(a|b)?c/,
				expected: `
					(0) -> (1) : 61
					    -> (2) : 62
					    -> (3) : ε

					(1) -> (4) : ε

					(2) -> (4) : ε

					(3) -> [5] : 63

					(4) -> (3) : ε

					[5] -> none`,
			},
			{
				literal: /(a+|b+)*/,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : ε
					    -> (4) : ε

					[2] -> none

					(3) -> (5) : 61

					(4) -> (6) : 62

					(5) -> (3) : ε
					    -> (7) : ε

					(6) -> (4) : ε
					    -> (8) : ε

					(7) -> (9) : ε

					(8) -> (9) : ε

					(9) -> (1) : ε
					    -> [2] : ε`,
			},
			{
				literal: /a*|b*/,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε
					    -> (3) : ε
					    -> (4) : ε

					(1) -> (5) : 61

					(2) -> [6] : ε

					(3) -> (7) : 62

					(4) -> [6] : ε

					(5) -> (1) : ε
					    -> (2) : ε

					[6] -> none

					(7) -> (3) : ε
					    -> (4) : ε`,
			},
			{
				literal: /a+|b+|c+/,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε
					    -> (3) : ε

					(1) -> (4) : 61

					(2) -> (5) : 62

					(3) -> (6) : 63

					(4) -> (1) : ε
					    -> (7) : ε

					(5) -> (2) : ε
					    -> (8) : ε

					(6) -> (3) : ε
					    -> (9) : ε

					(7) -> [10] : ε

					(8) -> [10] : ε

					(9) -> [10] : ε

					[10] -> none`,
			},
			{
				literal: /[^\s\S]+/,
				expected: `
					(0) -> none`,
			},
			{
				literal: /\d+(?:\.\d+)?(?:e[+-]?\d+)?/i,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : 30..39

					(2) -> (1) : ε
					    -> (3) : ε

					(3) -> (4) : 2e
					    -> (5) : ε

					(4) -> (6) : ε

					(5) -> (7) : 45, 65
					    -> [8] : ε

					(6) -> (9) : 30..39

					(7) -> (10) : 2b, 2d
					    -> (11) : ε

					[8] -> none

					(9) -> (6) : ε
					    -> (12) : ε

					(10) -> (11) : ε

					(11) -> (13) : ε

					(12) -> (5) : ε

					(13) -> (14) : 30..39

					(14) -> (13) : ε
					     -> (15) : ε

					(15) -> [8] : ε`,
			},
		]);

		interface TestCase {
			literal: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, expected } of cases) {
				it(literalToString(literal), function () {
					const enfa = literalToENFA(literal);
					assert.strictEqual(enfa.toString(), removeIndentation(expected));
				});
			}
		}
	});

	describe("fromWords", function () {
		test([
			{
				words: [],
				expected: `
					(0) -> none`,
			},
			{
				words: [],
			},
			{
				words: "",
				expected: `
					(0) -> [1] : ε

					[1] -> none`,
			},
			{
				words: "",
			},
			{
				words: "foo bar foo bar baz food",
				expected: `
					(0) -> (1) : 66
					    -> (2) : 62

					(1) -> (3) : 6f

					(2) -> (4) : 61

					(3) -> (5) : 6f

					(4) -> (6) : 72
					    -> (7) : 7a

					(5) -> [8] : ε
					    -> (9) : 64

					(6) -> [8] : ε

					(7) -> [8] : ε

					[8] -> none

					(9) -> [8] : ε`,
			},
			{
				words: "foo bar foo bar baz food",
			},
			{
				// the space at the beginning will include the empty word
				words: " a b c d e f g",
			},
			{
				// the space at the beginning will include the empty word
				words: "a b ab ba aa bb aaa aab aba abb baa bab bba bbb",
			},
		]);

		interface TestCase {
			words: Iterable<string> | string;
			expected?: string;
		}

		function test(cases: TestCase[]): void {
			for (const { words, expected } of cases) {
				const persistentWords = typeof words === "string" ? words.split(/\s+/g) : [...words];
				const title = persistentWords.map(w => JSON.stringify(w)).join(", ");
				const chars = persistentWords.map(w => fromStringToUnicode(w));
				it(title, function () {
					const enfa = ENFA.fromWords(chars, { maxCharacter: 0x10ffff });
					if (expected === undefined) {
						const unique = [...new Set<string>(persistentWords)];
						assert.sameMembers(getWords(enfa), unique);
					} else {
						assert.strictEqual(enfa.toString(), removeIndentation(expected));
					}
				});
			}
		}
	});

	describe("test", function () {
		for (const testCase of wordTestData) {
			it(literalToString(testCase.literal), function () {
				const enfa = literalToENFA(testCase.literal);
				testWordTestCases(enfa, testCase);
			});
		}
	});

	describe("union", function () {
		test([
			{
				literal: /a/,
				other: /b/,
				expectedLeft: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 62

					(2) -> (4) : 61

					(3) -> [5] : ε

					(4) -> [5] : ε

					[5] -> none`,
				expectedRight: `
					(0) -> [1] : 61
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : 62

					(3) -> [1] : ε`,
			},
			{
				literal: /ab|ba/,
				other: /aa|bb/,
				expectedLeft: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 61
					    -> (4) : 62

					(2) -> (5) : 61
					    -> (6) : 62

					(3) -> (7) : 61

					(4) -> (8) : 62

					(5) -> (9) : 62

					(6) -> (10) : 61

					(7) -> (11) : ε

					(8) -> (11) : ε

					(9) -> (12) : ε

					(10) -> (12) : ε

					(11) -> [13] : ε

					(12) -> [13] : ε

					[13] -> none`,
				expectedRight: `
					(0) -> (1) : 61
					    -> (2) : 62
					    -> (3) : ε

					(1) -> (4) : 62

					(2) -> (5) : 61

					(3) -> (6) : 61
					    -> (7) : 62

					(4) -> [8] : ε

					(5) -> [8] : ε

					(6) -> (9) : 61

					(7) -> (10) : 62

					[8] -> none

					(9) -> (11) : ε

					(10) -> (11) : ε

					(11) -> [8] : ε`,
			},
			{
				literal: /a/,
				other: /()/,
				expectedLeft: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : ε

					(2) -> (4) : 61

					(3) -> [5] : ε

					(4) -> [5] : ε

					[5] -> none`,
				expectedRight: `
					(0) -> [1] : 61
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : ε

					(3) -> [1] : ε`,
			},
			{
				literal: /a/,
				other: /b*/,
				expectedLeft: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : ε
					    -> (4) : ε

					(2) -> (5) : 61

					(3) -> (6) : 62

					(4) -> [7] : ε

					(5) -> [7] : ε

					(6) -> (3) : ε
					    -> (4) : ε

					[7] -> none`,
				expectedRight: `
					(0) -> [1] : 61
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : ε
					    -> (4) : ε

					(3) -> (5) : 62

					(4) -> [1] : ε

					(5) -> (3) : ε
					    -> (4) : ε`,
			},
			{
				literal: /a+/,
				other: /b+/,
				expectedLeft: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : ε

					(2) -> (4) : ε

					(3) -> (5) : 62

					(4) -> (6) : 61

					(5) -> (3) : ε
					    -> (7) : ε

					(6) -> (4) : ε
					    -> (8) : ε

					(7) -> [9] : ε

					(8) -> [9] : ε

					[9] -> none`,
				expectedRight: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 61

					(2) -> (4) : ε

					(3) -> (1) : ε
					    -> [5] : ε

					(4) -> (6) : 62

					[5] -> none

					(6) -> (4) : ε
					    -> (7) : ε

					(7) -> [5] : ε`,
			},
		]);

		interface TestCase {
			literal: Literal;
			other: Literal;
			expectedLeft: string;
			expectedRight: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, other, expectedLeft, expectedRight } of cases) {
				it(`${literalToString(literal)} ∪ ${literalToString(other)} (left)`, function () {
					const enfa = literalToENFA(literal);
					const enfaOther = literalToENFA(other);
					enfa.union(enfaOther, "left");
					const actual = enfa.toString();
					assert.strictEqual(actual, removeIndentation(expectedLeft), "Actual:\n" + actual + "\n");
				});
				it(`${literalToString(literal)} ∪ ${literalToString(other)} (right)`, function () {
					const enfa = literalToENFA(literal);
					const enfaOther = literalToENFA(other);
					enfa.union(enfaOther, "right");
					const actual = enfa.toString();
					assert.strictEqual(actual, removeIndentation(expectedRight), "Actual:\n" + actual + "\n");
				});
			}
		}
	});

	describe("append", function () {
		test([
			{
				left: /foo/,
				right: /bar/,
				expected: `
					(0) -> (1) : 66

					(1) -> (2) : 6f

					(2) -> (3) : 6f

					(3) -> (4) : ε

					(4) -> (5) : 62

					(5) -> (6) : 61

					(6) -> [7] : 72

					[7] -> none`,
			},
			{
				left: /a*/,
				right: /b*/,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 61

					(2) -> (4) : ε

					(3) -> (1) : ε
					    -> (2) : ε

					(4) -> (5) : ε
					    -> [6] : ε

					(5) -> (7) : 62

					[6] -> none

					(7) -> (5) : ε
					    -> [6] : ε`,
			},
			{
				left: /a*/,
				right: /b+/,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 61

					(2) -> (4) : ε

					(3) -> (1) : ε
					    -> (2) : ε

					(4) -> (5) : ε

					(5) -> (6) : 62

					(6) -> (5) : ε
					    -> [7] : ε

					[7] -> none`,
			},
		]);

		interface TestCase {
			left: Literal;
			right: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { left, right, expected } of cases) {
				it(`${literalToString(left)} * ${literalToString(right)}`, function () {
					const enfaLeft = literalToENFA(left);
					const enfaRight = literalToENFA(right);
					const enfaRightCopy = enfaRight.copy();
					enfaLeft.append(enfaRight);

					assert.strictEqual(enfaRight.toString(), enfaRightCopy.toString());

					const actual = enfaLeft.toString();
					assert.strictEqual(actual, removeIndentation(expected));
				});
			}
		}
	});

	describe("prepend", function () {
		test([
			{
				left: /foo/,
				right: /bar/,
				expected: `
					(0) -> (1) : 62

					(1) -> (2) : 61

					(2) -> (3) : 72

					(3) -> (4) : ε

					(4) -> (5) : 66

					(5) -> (6) : 6f

					(6) -> [7] : 6f

					[7] -> none`,
			},
			{
				left: /a*/,
				right: /b*/,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 62

					(2) -> (4) : ε

					(3) -> (1) : ε
					    -> (2) : ε

					(4) -> (5) : ε
					    -> [6] : ε

					(5) -> (7) : 61

					[6] -> none

					(7) -> (5) : ε
					    -> [6] : ε`,
			},
			{
				left: /a*/,
				right: /b+/,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : 62

					(2) -> (1) : ε
					    -> (3) : ε

					(3) -> (4) : ε

					(4) -> (5) : ε
					    -> [6] : ε

					(5) -> (7) : 61

					[6] -> none

					(7) -> (5) : ε
					    -> [6] : ε`,
			},
		]);

		interface TestCase {
			left: Literal;
			right: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { left, right, expected } of cases) {
				it(`${literalToString(right)} * ${literalToString(left)}`, function () {
					const enfaLeft = literalToENFA(left);
					const enfaRight = literalToENFA(right);
					const enfaRightCopy = enfaRight.copy();
					enfaLeft.prepend(enfaRight);

					assert.strictEqual(enfaRight.toString(), enfaRightCopy.toString());

					const actual = enfaLeft.toString();
					assert.strictEqual(actual, removeIndentation(expected));
				});
			}
		}
	});

	describe("quantify", function () {
		test([
			{
				literal: /a/,
				min: 1,
				max: 0,
				lazy: false,
				expected: Error,
			},
			{
				literal: /a/,
				min: Infinity,
				max: Infinity,
				lazy: false,
				expected: Error,
			},
			{
				literal: /a/,
				min: NaN,
				max: NaN,
				lazy: false,
				expected: Error,
			},
			{
				literal: /a/,
				min: -1,
				max: 0,
				lazy: false,
				expected: Error,
			},
			{
				literal: /a/,
				min: 0.5,
				max: 1.5,
				lazy: false,
				expected: Error,
			},

			{
				literal: /a/,
				min: 1,
				max: 1,
				lazy: false,
				expected: `
					(0) -> [1] : 61

					[1] -> none`,
			},
			{
				literal: /a*/,
				min: 1,
				max: 1,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : 61

					[2] -> none

					(3) -> (1) : ε
					    -> [2] : ε`,
			},

			{
				literal: /a/,
				min: 1,
				max: 1,
				lazy: true,
				expected: `
					(0) -> [1] : 61

					[1] -> none`,
			},
			{
				literal: /a*/,
				min: 1,
				max: 1,
				lazy: true,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : 61

					[2] -> none

					(3) -> (1) : ε
					    -> [2] : ε`,
			},

			{
				literal: /a/,
				min: 0,
				max: 1,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> [2] : 61

					[2] -> none`,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: 1,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : ε
					    -> [2] : ε

					[2] -> none

					(3) -> (4) : 61

					(4) -> (5) : 62

					(5) -> (3) : ε
					    -> [2] : ε`,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: 1,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : ε

					[2] -> none

					(3) -> (4) : 61

					(4) -> (5) : 62

					(5) -> (3) : ε
					    -> [2] : ε`,
			},

			{
				literal: /a/,
				min: 0,
				max: 1,
				lazy: true,
				expected: `
					(0) -> [1] : ε
					    -> (2) : ε

					[1] -> none

					(2) -> [1] : 61`,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: 1,
				lazy: true,
				expected: `
					(0) -> [1] : ε
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : ε
					    -> [1] : ε

					(3) -> (4) : 61

					(4) -> (5) : 62

					(5) -> (3) : ε
					    -> [1] : ε`,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: 1,
				lazy: true,
				expected: `
					(0) -> [1] : ε
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : ε

					(3) -> (4) : 61

					(4) -> (5) : 62

					(5) -> (3) : ε
					    -> [1] : ε`,
			},

			{
				literal: /a/,
				min: 3,
				max: 3,
				lazy: false,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : ε

					(2) -> (3) : 61

					(3) -> (4) : ε

					(4) -> [5] : 61

					[5] -> none`,
			},
			{
				literal: /(ab)*/,
				min: 3,
				max: 3,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 61

					(2) -> (4) : ε

					(3) -> (5) : 62

					(4) -> (6) : ε
					    -> (7) : ε

					(5) -> (1) : ε
					    -> (2) : ε

					(6) -> (8) : 61

					(7) -> (9) : ε

					(8) -> (10) : 62

					(9) -> (11) : ε
					    -> [12] : ε

					(10) -> (6) : ε
					     -> (7) : ε

					(11) -> (13) : 61

					[12] -> none

					(13) -> (14) : 62

					(14) -> (11) : ε
					     -> [12] : ε`,
			},
			{
				literal: /(ab)+/,
				min: 3,
				max: 3,
				lazy: false,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : 61

					(2) -> (3) : 62

					(3) -> (1) : ε
					    -> (4) : ε

					(4) -> (5) : ε

					(5) -> (6) : ε

					(6) -> (7) : 61

					(7) -> (8) : 62

					(8) -> (6) : ε
					    -> (9) : ε

					(9) -> (10) : ε

					(10) -> (11) : ε

					(11) -> (12) : 61

					(12) -> (13) : 62

					(13) -> (11) : ε
					     -> [14] : ε

					[14] -> none`,
			},

			{
				literal: /a/,
				min: 3,
				max: 3,
				lazy: true,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : ε

					(2) -> (3) : 61

					(3) -> (4) : ε

					(4) -> [5] : 61

					[5] -> none`,
			},
			{
				literal: /(ab)*/,
				min: 3,
				max: 3,
				lazy: true,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 61

					(2) -> (4) : ε

					(3) -> (5) : 62

					(4) -> (6) : ε
					    -> (7) : ε

					(5) -> (1) : ε
					    -> (2) : ε

					(6) -> (8) : 61

					(7) -> (9) : ε

					(8) -> (10) : 62

					(9) -> (11) : ε
					    -> [12] : ε

					(10) -> (6) : ε
					     -> (7) : ε

					(11) -> (13) : 61

					[12] -> none

					(13) -> (14) : 62

					(14) -> (11) : ε
					     -> [12] : ε`,
			},
			{
				literal: /(ab)+/,
				min: 3,
				max: 3,
				lazy: true,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : 61

					(2) -> (3) : 62

					(3) -> (1) : ε
					    -> (4) : ε

					(4) -> (5) : ε

					(5) -> (6) : ε

					(6) -> (7) : 61

					(7) -> (8) : 62

					(8) -> (6) : ε
					    -> (9) : ε

					(9) -> (10) : ε

					(10) -> (11) : ε

					(11) -> (12) : 61

					(12) -> (13) : 62

					(13) -> (11) : ε
					     -> [14] : ε

					[14] -> none`,
			},

			{
				literal: /a/,
				min: 0,
				max: 3,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : 61

					[2] -> none

					(3) -> (4) : ε
					    -> [2] : ε

					(4) -> (5) : 61

					(5) -> (6) : ε
					    -> [2] : ε

					(6) -> [2] : 61`,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: 3,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : ε
					    -> (4) : ε

					[2] -> none

					(3) -> (5) : 61

					(4) -> (6) : ε
					    -> [2] : ε

					(5) -> (7) : 62

					(6) -> (8) : ε
					    -> (9) : ε

					(7) -> (3) : ε
					    -> (4) : ε

					(8) -> (10) : 61

					(9) -> (11) : ε
					    -> [2] : ε

					(10) -> (12) : 62

					(11) -> (13) : ε
					     -> [2] : ε

					(12) -> (8) : ε
					     -> (9) : ε

					(13) -> (14) : 61

					(14) -> (15) : 62

					(15) -> (13) : ε
					     -> [2] : ε`,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: 3,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : ε

					[2] -> none

					(3) -> (4) : 61

					(4) -> (5) : 62

					(5) -> (3) : ε
					    -> (6) : ε

					(6) -> (7) : ε
					    -> [2] : ε

					(7) -> (8) : ε

					(8) -> (9) : 61

					(9) -> (10) : 62

					(10) -> (8) : ε
					     -> (11) : ε

					(11) -> (12) : ε
					     -> [2] : ε

					(12) -> (13) : ε

					(13) -> (14) : 61

					(14) -> (15) : 62

					(15) -> (13) : ε
					     -> [2] : ε`,
			},

			{
				literal: /a/,
				min: 0,
				max: 3,
				lazy: true,
				expected: `
					(0) -> [1] : ε
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : 61

					(3) -> [1] : ε
					    -> (4) : ε

					(4) -> (5) : 61

					(5) -> [1] : ε
					    -> (6) : ε

					(6) -> [1] : 61`,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: 3,
				lazy: true,
				expected: `
					(0) -> [1] : ε
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : ε
					    -> (4) : ε

					(3) -> (5) : 61

					(4) -> [1] : ε
					    -> (6) : ε

					(5) -> (7) : 62

					(6) -> (8) : ε
					    -> (9) : ε

					(7) -> (3) : ε
					    -> (4) : ε

					(8) -> (10) : 61

					(9) -> [1] : ε
					    -> (11) : ε

					(10) -> (12) : 62

					(11) -> (13) : ε
					     -> [1] : ε

					(12) -> (8) : ε
					     -> (9) : ε

					(13) -> (14) : 61

					(14) -> (15) : 62

					(15) -> (13) : ε
					     -> [1] : ε`,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: 3,
				lazy: true,
				expected: `
					(0) -> [1] : ε
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : ε

					(3) -> (4) : 61

					(4) -> (5) : 62

					(5) -> (3) : ε
					    -> (6) : ε

					(6) -> [1] : ε
					    -> (7) : ε

					(7) -> (8) : ε

					(8) -> (9) : 61

					(9) -> (10) : 62

					(10) -> (8) : ε
					     -> (11) : ε

					(11) -> [1] : ε
					     -> (12) : ε

					(12) -> (13) : ε

					(13) -> (14) : 61

					(14) -> (15) : 62

					(15) -> (13) : ε
					     -> [1] : ε`,
			},

			{
				literal: /a/,
				min: 0,
				max: Infinity,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : 61

					[2] -> none

					(3) -> (1) : ε
					    -> [2] : ε`,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: Infinity,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : ε
					    -> (4) : ε

					[2] -> none

					(3) -> (5) : 61

					(4) -> (1) : ε
					    -> [2] : ε

					(5) -> (6) : 62

					(6) -> (3) : ε
					    -> (4) : ε`,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: Infinity,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> [2] : ε

					(1) -> (3) : ε

					[2] -> none

					(3) -> (4) : 61

					(4) -> (5) : 62

					(5) -> (3) : ε
					    -> (6) : ε

					(6) -> (1) : ε
					    -> [2] : ε`,
			},

			{
				literal: /a/,
				min: 0,
				max: Infinity,
				lazy: true,
				expected: `
					(0) -> [1] : ε
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : 61

					(3) -> [1] : ε
					    -> (2) : ε`,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: Infinity,
				lazy: true,
				expected: `
					(0) -> [1] : ε
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : ε
					    -> (4) : ε

					(3) -> (5) : 61

					(4) -> [1] : ε
					    -> (2) : ε

					(5) -> (6) : 62

					(6) -> (3) : ε
					    -> (4) : ε`,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: Infinity,
				lazy: true,
				expected: `
					(0) -> [1] : ε
					    -> (2) : ε

					[1] -> none

					(2) -> (3) : ε

					(3) -> (4) : 61

					(4) -> (5) : 62

					(5) -> (3) : ε
					    -> (6) : ε

					(6) -> [1] : ε
					    -> (2) : ε`,
			},

			{
				literal: /a/,
				min: 3,
				max: Infinity,
				lazy: false,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : ε

					(2) -> (3) : 61

					(3) -> (4) : ε

					(4) -> (5) : 61

					(5) -> (4) : ε
					    -> [6] : ε

					[6] -> none`,
			},
			{
				literal: /(ab)*/,
				min: 3,
				max: Infinity,
				lazy: false,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 61

					(2) -> (4) : ε

					(3) -> (5) : 62

					(4) -> (6) : ε
					    -> (7) : ε

					(5) -> (1) : ε
					    -> (2) : ε

					(6) -> (8) : 61

					(7) -> (9) : ε

					(8) -> (10) : 62

					(9) -> (11) : ε
					    -> (12) : ε

					(10) -> (6) : ε
					     -> (7) : ε

					(11) -> (13) : 61

					(12) -> (9) : ε
					     -> [14] : ε

					(13) -> (15) : 62

					[14] -> none

					(15) -> (11) : ε
					     -> (12) : ε`,
			},
			{
				literal: /(ab)+/,
				min: 3,
				max: Infinity,
				lazy: false,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : 61

					(2) -> (3) : 62

					(3) -> (1) : ε
					    -> (4) : ε

					(4) -> (5) : ε

					(5) -> (6) : ε

					(6) -> (7) : 61

					(7) -> (8) : 62

					(8) -> (6) : ε
					    -> (9) : ε

					(9) -> (10) : ε

					(10) -> (11) : ε

					(11) -> (12) : 61

					(12) -> (13) : 62

					(13) -> (11) : ε
					     -> (14) : ε

					(14) -> (10) : ε
					     -> [15] : ε

					[15] -> none`,
			},

			{
				literal: /a/,
				min: 3,
				max: Infinity,
				lazy: true,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : ε

					(2) -> (3) : 61

					(3) -> (4) : ε

					(4) -> (5) : 61

					(5) -> [6] : ε
					    -> (4) : ε

					[6] -> none`,
			},
			{
				literal: /(ab)*/,
				min: 3,
				max: Infinity,
				lazy: true,
				expected: `
					(0) -> (1) : ε
					    -> (2) : ε

					(1) -> (3) : 61

					(2) -> (4) : ε

					(3) -> (5) : 62

					(4) -> (6) : ε
					    -> (7) : ε

					(5) -> (1) : ε
					    -> (2) : ε

					(6) -> (8) : 61

					(7) -> (9) : ε

					(8) -> (10) : 62

					(9) -> (11) : ε
					    -> (12) : ε

					(10) -> (6) : ε
					     -> (7) : ε

					(11) -> (13) : 61

					(12) -> [14] : ε
					     -> (9) : ε

					(13) -> (15) : 62

					[14] -> none

					(15) -> (11) : ε
					     -> (12) : ε`,
			},
			{
				literal: /(ab)+/,
				min: 3,
				max: Infinity,
				lazy: true,
				expected: `
					(0) -> (1) : ε

					(1) -> (2) : 61

					(2) -> (3) : 62

					(3) -> (1) : ε
					    -> (4) : ε

					(4) -> (5) : ε

					(5) -> (6) : ε

					(6) -> (7) : 61

					(7) -> (8) : 62

					(8) -> (6) : ε
					    -> (9) : ε

					(9) -> (10) : ε

					(10) -> (11) : ε

					(11) -> (12) : 61

					(12) -> (13) : 62

					(13) -> (11) : ε
					     -> (14) : ε

					(14) -> [15] : ε
					     -> (10) : ε

					[15] -> none`,
			},
		]);

		interface TestCase {
			literal: Literal;
			min: number;
			max: number;
			lazy: boolean;
			expected: string | typeof Error;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, min, max, lazy, expected } of cases) {
				it(`${literalToString(literal)}{${min},${max === Infinity ? "" : max}}${lazy ? "?" : ""}`, function () {
					const enfa = literalToENFA(literal);

					if (typeof expected === "string") {
						enfa.quantify(min, max, lazy);
						assert.strictEqual(enfa.toString(), removeIndentation(expected));
					} else {
						assert.throws(() => enfa.quantify(min, max, lazy));
					}
				});
			}
		}
	});

	describe("intersectionWordSets", function () {
		test([
			{
				left: /a/,
				right: /b/,
			},
			{
				left: /a*/,
				right: /a/,
			},
			{
				left: /b*(ab+)*a/,
				right: /a*(ba+)*/,
			},
			{
				left: /a+/,
				right: /(?:a+){2,}/,
			},
			{
				left: /(?:[^>"'[\]]|"[^"]*"|'[^']*')/,
				right: /(?:[^>"'[\]]|"[^"]*"|'[^']*'){2,}/,
			},
		]);

		interface TestCase {
			left: Literal;
			right: Literal;
		}

		function toArray<T>(iter: Iterable<T>, max: number = 100): T[] {
			const array: T[] = [];
			let i = 0;
			for (const item of iter) {
				if (i++ >= max) {
					break;
				}
				array.push(item);
			}
			return array;
		}

		function test(cases: TestCase[]): void {
			for (const { left, right } of cases) {
				it(`${literalToString(left)} ∩ ${literalToString(right)}`, function () {
					const enfaLeft = literalToENFA(left);
					const enfaRight = literalToENFA(right);

					const intersect = NFA.fromIntersection(enfaLeft, enfaRight);

					const expected = toArray(intersect.wordSets());
					const actual = toArray(enfaLeft.intersectionWordSets(enfaRight));

					assert.strictEqual(actual.length, expected.length, "Number of word sets");
					for (let i = 0; i < actual.length; i++) {
						const actualWordSet = actual[i];
						const expectedWordSet = expected[i];
						assert.strictEqual(
							actualWordSet.length,
							expectedWordSet.length,
							`Number of characters of word set ${i}.`
						);

						for (let j = 0; j < actualWordSet.length; j++) {
							const actualCharSet = actualWordSet[j];
							const expectedCharSet = expectedWordSet[j];
							assert.isTrue(actualCharSet.equals(expectedCharSet), "Char sets");
						}
					}
				});
			}
		}
	});

	describe("isEmpty", function () {
		it("constructed from 0 words", function () {
			// empty language
			assert.isTrue(ENFA.fromWords([], { maxCharacter: 0xff }).isEmpty);
			assert.isTrue(ENFA.fromWords([], { maxCharacter: 0xffff }).isEmpty);

			// language containing the empty word
			assert.isFalse(ENFA.fromWords([[]], { maxCharacter: 0xff }).isEmpty);
			assert.isFalse(ENFA.fromWords([[]], { maxCharacter: 0xffff }).isEmpty);
		});

		describe("true", function () {
			for (const literal of EMPTY_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isTrue(literalToENFA(literal).isEmpty);
				});
			}
		});

		describe("false", function () {
			for (const literal of NON_EMPTY_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isFalse(literalToENFA(literal).isEmpty);
				});
			}
		});
	});

	describe("isFinite", function () {
		describe("true", function () {
			for (const literal of FINITE_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isTrue(literalToENFA(literal).isFinite);
				});
			}
		});

		describe("false", function () {
			for (const literal of NON_FINITE_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isFalse(literalToENFA(literal).isFinite);
				});
			}
		});
	});

	describe("empty() & all()", function () {
		it("empty()", function () {
			assert.isTrue(ENFA.empty({ maxCharacter: 0xff }).isEmpty);
			assert.isTrue(ENFA.empty({ maxCharacter: 0xffff }).isEmpty);

			assert.isTrue(ENFA.empty({ maxCharacter: 0xff }).isFinite);
			assert.isTrue(ENFA.empty({ maxCharacter: 0xffff }).isFinite);
		});

		it("all()", function () {
			assert.isFalse(ENFA.all({ maxCharacter: 0xff }).isEmpty);
			assert.isFalse(ENFA.all({ maxCharacter: 0xffff }).isEmpty);

			assert.isFalse(ENFA.all({ maxCharacter: 0xff }).isFinite);
			assert.isFalse(ENFA.all({ maxCharacter: 0xffff }).isFinite);
		});
	});

	describe("prefixes", function () {
		test([
			{
				words: [],
			},
			{
				words: [""],
			},
			{
				words: ["", "a"],
			},
			{
				words: ["", "a", "aa", "aaa"],
			},
			{
				words: ["foobar", "foo", "bar"],
			},
			{
				words: ["bet", "let", "street", "sheet", "diet"],
			},
			{
				words: ["bet", "bat", "boot", "boat"],
			},
		]);

		interface TestCase {
			words: readonly string[];
		}

		function test(cases: TestCase[]): void {
			for (const { words } of cases) {
				const title = words.map(w => JSON.stringify(w)).join(", ");
				it(`${title}`, function () {
					const chars = words.map(w => fromStringToUnicode(w));
					const enfa = ENFA.fromWords(chars, { maxCharacter: 0x10ffff });
					enfa.prefixes();

					const acutal = [...new Set([...enfa.words()].map(fromUnicodeToString))];
					const expected = [...prefixes(words)];
					assert.sameMembers(acutal, expected);
				});
			}
		}
	});

	describe("suffixes", function () {
		test([
			{
				words: [],
			},
			{
				words: [""],
			},
			{
				words: ["", "a"],
			},
			{
				words: ["", "a", "aa", "aaa"],
			},
			{
				words: ["foobar", "foo", "bar"],
			},
			{
				words: ["bet", "let", "street", "sheet", "diet"],
			},
			{
				words: ["bet", "bat", "boot", "boat"],
			},
		]);

		interface TestCase {
			words: readonly string[];
		}

		function test(cases: TestCase[]): void {
			for (const { words } of cases) {
				const title = words.map(w => JSON.stringify(w)).join(", ");
				it(`${title}`, function () {
					const chars = words.map(w => fromStringToUnicode(w));
					const enfa = ENFA.fromWords(chars, { maxCharacter: 0x10ffff });
					enfa.suffixes();

					const acutal = [...new Set([...enfa.words()].map(fromUnicodeToString))];
					const expected = [...suffixes(words)];
					assert.sameMembers(acutal, expected);
				});
			}
		}
	});

	describe("Safe creation", function () {
		const testENFA = literalToENFA(/a{1000}/);

		it(ENFA.fromFA.name, function () {
			assert.throws(() => {
				ENFA.fromFA(testENFA, { maxNodes: 100 });
			});
		});
		it(ENFA.fromRegex.name, function () {
			assert.throws(() => {
				ENFA.fromRegex(testENFA.toRegex(), testENFA.options, { maxNodes: 100 });
			});
		});
		it(ENFA.fromTransitionIterator.name, function () {
			assert.throws(() => {
				ENFA.fromTransitionIterator(testENFA.transitionIterator(), testENFA.options, { maxNodes: 100 });
			});
		});
		it(ENFA.fromWords.name, function () {
			assert.throws(() => {
				ENFA.fromWords(testENFA.words(), testENFA.options, { maxNodes: 100 });
			});
		});
	});

	describe(ENFA.NodeList.name, function () {
		it(ENFA.NodeList.resolveEpsilon.name, function () {
			const nodeList = new ENFA.NodeList();

			/**
			 * This creates the graph.
			 *
			 * ```txt
			 * (0) -> (1) : "a"
			 *     -> (2) : epsilon
			 *     -> (3) : "b"
			 *
			 * (1) -> (3) : "c"
			 *
			 * (2) -> (4) : "d"
			 *     -> (1) : "e"
			 *     -> (2) : epsilon
			 *
			 * (3) -> (1) : epsilon
			 * ```
			 */

			const a = CharSet.empty(0xffff).union([{ min: 97, max: 97 }]);
			const b = CharSet.empty(0xffff).union([{ min: 98, max: 98 }]);
			const c = CharSet.empty(0xffff).union([{ min: 99, max: 99 }]);
			const d = CharSet.empty(0xffff).union([{ min: 100, max: 100 }]);
			const e = CharSet.empty(0xffff).union([{ min: 101, max: 101 }]);

			const n0 = nodeList.createNode();
			const n1 = nodeList.createNode();
			const n2 = nodeList.createNode();
			const n3 = nodeList.createNode();
			const n4 = nodeList.createNode();

			nodeList.linkNodes(n0, n1, a);
			nodeList.linkNodes(n0, n2, null);
			nodeList.linkNodes(n0, n3, b);

			nodeList.linkNodes(n1, n3, c);

			nodeList.linkNodes(n2, n4, d);
			nodeList.linkNodes(n2, n1, e);
			nodeList.linkNodes(n2, n2, null);

			nodeList.linkNodes(n3, n1, null);

			/**
			 * The node `(0)` will return the resolved list:
			 *
			 * ```txt
			 * [(1), "a"]
			 * [(4), "d"]
			 * [(1), "e"]
			 * [(3), "b"]
			 * ```
			 */

			const resolved: [ENFA.ReadonlyNode, CharSet][] = [];
			ENFA.NodeList.resolveEpsilon(n0, "out", (charSet, node) => resolved.push([node, charSet]));

			assert.deepEqual(resolved, [
				[n1, a],
				[n4, d],
				[n1, e],
				[n3, b],
			]);
		});
	});
});

function getWords(enfa: ENFA): string[] {
	const words = new Set<string>();
	for (const word of enfa.words()) {
		words.add(word.map(i => String.fromCodePoint(i)).join(""));
	}
	return [...words];
}
