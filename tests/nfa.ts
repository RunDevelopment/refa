import { NFA } from "../src/nfa";
import { assert } from "chai";
import { fromStringToUnicode, fromUnicodeToString } from "../src/words";
import { literalToDFA, literalToNFA, literalToString, reachableFinalStates, removeIndentation } from "./helper/fa";
import { EMPTY_LITERALS, FINITE_LITERALS, NON_EMPTY_LITERALS, NON_FINITE_LITERALS } from "./helper/regexp-literals";
import { Literal, Parser, toLiteral } from "../src/js";
import { RegExpParser } from "regexpp";
import { prefixes, suffixes } from "./helper/util";
import { DFA } from "../src/dfa";
import { testWordTestCases, wordTestData } from "./helper/word-test-data";

describe("NFA", function () {
	describe("fromRegex", function () {
		test([
			{
				literal: /a+/,
				expected: `
					(0) -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /(a|b)+c/,
				expected: `
					(0) -> (1) : 61..62

					(1) -> (1) : 61..62
					    -> [2] : 63

					[2] -> none`,
			},
			{
				literal: /a*b*c*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62
					    -> [3] : 63

					[1] -> [1] : 61
					    -> [2] : 62
					    -> [3] : 63

					[2] -> [2] : 62
					    -> [3] : 63

					[3] -> [3] : 63`,
			},
			{
				literal: /a{4}/,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 61

					(2) -> (3) : 61

					(3) -> [4] : 61

					[4] -> none`,
			},
			{
				literal: /(a|){4}/,
				expected: `
					[0] -> [1] : 61

					[1] -> [2] : 61

					[2] -> [3] : 61

					[3] -> [4] : 61

					[4] -> none`,
			},
			{
				literal: /a{2,4}/,
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> [3] : 61

					[3] -> [4] : 61

					[4] -> none`,
			},
			{
				literal: /a{2,6}/,
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> [3] : 61

					[3] -> [4] : 61

					[4] -> [5] : 61

					[5] -> [6] : 61

					[6] -> none`,
			},
			{
				literal: /(ab){0,3}/,
				expected: `
					[0] -> (1) : 61

					(1) -> [2] : 62

					[2] -> (3) : 61

					(3) -> [4] : 62

					[4] -> (5) : 61

					(5) -> [6] : 62

					[6] -> none`,
			},
			{
				literal: /(){100,1000}/,
				expected: `
					[0] -> none`,
			},
			{
				literal: /a+|/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /a*/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /(a|)+/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /(a*)+/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /(a*){4}/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /(a+|){4}/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /(a+)+/,
				expected: `
					(0) -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /(a+|){0,4}/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /(a+){4}/,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 61

					(2) -> (3) : 61

					(3) -> [4] : 61

					[4] -> [4] : 61`,
			},
			{
				literal: /(a*){4,}/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /((a*)+)?/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /(a|b)?c/,
				expected: `
					(0) -> (1) : 61..62
					    -> [2] : 63

					(1) -> [2] : 63

					[2] -> none`,
			},
			{
				literal: /(a+|b+)*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61
					    -> [2] : 62

					[2] -> [1] : 61
					    -> [2] : 62`,
			},
			{
				literal: /()*/,
				expected: `
					[0] -> none`,
			},
			{
				literal: /([^\s\S])*/,
				expected: `
					[0] -> none`,
			},
			{
				literal: /a*|b*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61

					[2] -> [2] : 62`,
			},
			{
				literal: /a+|b+|c+/,
				expected: `
					(0) -> [1] : 61
					    -> [2] : 62
					    -> [3] : 63

					[1] -> [1] : 61

					[2] -> [2] : 62

					[3] -> [3] : 63`,
			},
			{
				literal: /(a*|b*)+/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61
					    -> [2] : 62

					[2] -> [1] : 61
					    -> [2] : 62`,
			},
			{
				literal: /[^\s\S]/,
				expected: `
					(0) -> none`,
			},
			{
				literal: /ab[^\s\S]ba/,
				expected: `
					(0) -> none`,
			},
			{
				literal: /([^\s\S]|a|[^\s\S]|b[^\s\S]b|[^\s\S])a/,
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> none`,
			},
			{
				literal: /[^\s\S]+/,
				expected: `
					(0) -> none`,
			},
			{
				literal: /[^\s\S]*/,
				expected: `
					[0] -> none`,
			},
			{
				literal: /[^\s\S]?/,
				expected: `
					[0] -> none`,
			},
			{
				literal: /a+|aaab/,
				expected: `
					(0) -> [1] : 61
					    -> (2) : 61

					[1] -> [1] : 61

					(2) -> (3) : 61

					(3) -> (4) : 61

					(4) -> [5] : 62

					[5] -> none`,
			},
			{
				literal: /(?:a+){2,}/,
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> [2] : 61`,
			},
			{
				literal: /abc|ab|abd|abcd/,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 62
					    -> [3] : 62

					(2) -> [3] : 63..64
					    -> (4) : 63

					[3] -> none

					(4) -> [3] : 64`,
			},
			{
				literal: /abc?|abd|abcd/,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 62
					    -> [3] : 62

					(2) -> (4) : 63
					    -> [5] : 64

					[3] -> [5] : 63

					(4) -> [5] : 64

					[5] -> none`,
			},
			{
				literal: /food|fool|foot/,
				expected: `
					(0) -> (1) : 66

					(1) -> (2) : 6f

					(2) -> (3) : 6f

					(3) -> [4] : 64, 6c, 74

					[4] -> none`,
			},
			{
				literal: /fo(od|ol|ot)/,
				expected: `
					(0) -> (1) : 66

					(1) -> (2) : 6f

					(2) -> (3) : 6f

					(3) -> [4] : 64, 6c, 74

					[4] -> none`,
			},
			{
				literal: /bet|get|pet|set/,
				expected: `
					(0) -> (1) : 62, 67, 70, 73

					(1) -> (2) : 65

					(2) -> [3] : 74

					[3] -> none`,
			},
			{
				literal: /bet|bat|bit/,
				expected: `
					(0) -> (1) : 62

					(1) -> (2) : 61, 65, 69

					(2) -> [3] : 74

					[3] -> none`,
			},
			{
				literal: /a(?:bc)?|dbc/,
				expected: `
					(0) -> [1] : 61
					    -> (2) : 64

					[1] -> (3) : 62

					(2) -> (3) : 62

					(3) -> [4] : 63

					[4] -> none`,
			},
			{
				literal: /\d+(?:\.\d+)?(?:e[+-]?\d+)?/i,
				expected: `
					(0) -> [1] : 30..39

					[1] -> [1] : 30..39
					    -> (2) : 2e
					    -> (3) : 45, 65

					(2) -> [4] : 30..39

					(3) -> (5) : 2b, 2d
					    -> [6] : 30..39

					[4] -> (3) : 45, 65
					    -> [4] : 30..39

					(5) -> [6] : 30..39

					[6] -> [6] : 30..39`,
			},
			{
				literal: /<[=>]?|>=?|=>?|:=|\/=?/,
				expected: `
					(0) -> [1] : 2f, 3e
					    -> (2) : 3a
					    -> [3] : 3c
					    -> [4] : 3d

					[1] -> [5] : 3d

					(2) -> [5] : 3d

					[3] -> [5] : 3d..3e

					[4] -> [5] : 3e

					[5] -> none`,
			},
		]);

		interface TestCase {
			literal: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, expected } of cases) {
				it(literalToString(literal), function () {
					const nfa = literalToNFA(literal);
					assert.strictEqual(nfa.toString(), removeIndentation(expected));
					assert.strictEqual(nfa.nodes.finals.size, reachableFinalStates(nfa));
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
					[0] -> none`,
			},
			{
				words: "",
			},
			{
				words: "foo bar foo bar baz food",
				expected: `
					(0) -> (1) : 62
					    -> (2) : 66

					(1) -> (3) : 61

					(2) -> (4) : 6f

					(3) -> [5] : 72, 7a

					(4) -> [6] : 6f

					[5] -> none

					[6] -> [5] : 64`,
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
					const nfa = NFA.fromWords(chars, { maxCharacter: 0x10ffff });
					if (expected === undefined) {
						const unique = [...new Set<string>(persistentWords)];
						assert.sameMembers(getWords(nfa), unique);
					} else {
						assert.strictEqual(nfa.toString(), removeIndentation(expected));
					}
				});
			}
		}
	});

	describe("test", function () {
		for (const testCase of wordTestData) {
			it(literalToString(testCase.literal), function () {
				const nfa = literalToNFA(testCase.literal);
				testWordTestCases(nfa, testCase);
			});
		}
	});

	describe("union", function () {
		test([
			{
				literal: /a/,
				other: /b/,
				expected: `
					(0) -> [1] : 61..62

					[1] -> none`,
			},
			{
				literal: /ab|ba/,
				other: /aa|bb/,
				expected: `
					(0) -> (1) : 61..62

					(1) -> [2] : 61..62

					[2] -> none`,
			},
			{
				literal: /a/,
				other: /()/,
				expected: `
					[0] -> [1] : 61

					[1] -> none`,
			},
			{
				literal: /a/,
				other: /b*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> none

					[2] -> [2] : 62`,
			},
			{
				literal: /a+/,
				other: /b+/,
				expected: `
					(0) -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61

					[2] -> [2] : 62`,
			},
			{
				literal: /a+/,
				other: /()/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /a|b|c{2}/,
				other: /a{2}|b{2}|c/,
				expected: `
					(0) -> (1) : 61
					    -> [2] : 61..63
					    -> (3) : 62
					    -> (4) : 63

					(1) -> [2] : 61

					[2] -> none

					(3) -> [2] : 62

					(4) -> [2] : 63`,
			},
		]);

		interface TestCase {
			literal: Literal;
			other: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, other, expected } of cases) {
				it(`${literalToString(literal)} ∪ ${literalToString(other)}`, function () {
					const nfa = literalToNFA(literal);
					const nfaOther = literalToNFA(other);
					nfa.union(nfaOther);
					const actual = nfa.toString();
					assert.strictEqual(actual, removeIndentation(expected), "Actual:\n" + actual + "\n");
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

					(3) -> (4) : 62

					(4) -> (5) : 61

					(5) -> [6] : 72

					[6] -> none`,
			},
			{
				left: /a*/,
				right: /b*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61
					    -> [2] : 62

					[2] -> [2] : 62`,
			},
			{
				left: /a+/,
				right: /b*/,
				expected: `
					(0) -> [1] : 61

					[1] -> [1] : 61
					    -> [2] : 62

					[2] -> [2] : 62`,
			},
			{
				left: /a*/,
				right: /b+/,
				expected: `
					(0) -> (1) : 61
					    -> [2] : 62

					(1) -> (1) : 61
					    -> [2] : 62

					[2] -> [2] : 62`,
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
					const nfaLeft = literalToNFA(left);
					const nfaRight = literalToNFA(right);
					const nfaRightCopy = nfaRight.copy();
					nfaLeft.append(nfaRight);

					assert.strictEqual(nfaRight.toString(), nfaRightCopy.toString());

					const actual = nfaLeft.toString();
					assert.strictEqual(actual, removeIndentation(expected), "Actual:\n" + actual + "\n");
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

					(3) -> (4) : 66

					(4) -> (5) : 6f

					(5) -> [6] : 6f

					[6] -> none`,
			},
			{
				left: /a*/,
				right: /b*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61

					[2] -> [1] : 61
					    -> [2] : 62`,
			},
			{
				left: /a+/,
				right: /b*/,
				expected: `
					(0) -> [1] : 61
					    -> (2) : 62

					[1] -> [1] : 61

					(2) -> [1] : 61
					    -> (2) : 62`,
			},
			{
				left: /a*/,
				right: /b+/,
				expected: `
					(0) -> [1] : 62

					[1] -> [1] : 62
					    -> [2] : 61

					[2] -> [2] : 61`,
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
					const nfaLeft = literalToNFA(left);
					const nfaRight = literalToNFA(right);
					const nfaRightCopy = nfaRight.copy();
					nfaLeft.prepend(nfaRight);

					assert.strictEqual(nfaRight.toString(), nfaRightCopy.toString());

					const actual = nfaLeft.toString();
					assert.strictEqual(actual, removeIndentation(expected), "Actual:\n" + actual + "\n");
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
				expected: Error,
			},
			{
				literal: /a/,
				min: Infinity,
				max: Infinity,
				expected: Error,
			},
			{
				literal: /a/,
				min: NaN,
				max: NaN,
				expected: Error,
			},
			{
				literal: /a/,
				min: -1,
				max: 0,
				expected: Error,
			},
			{
				literal: /a/,
				min: 0.5,
				max: 1.5,
				expected: Error,
			},

			{
				literal: /a/,
				min: 1,
				max: 1,
				expected: `
					(0) -> [1] : 61

					[1] -> none`,
			},
			{
				literal: /a*/,
				min: 1,
				max: 1,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},

			{
				literal: /a/,
				min: 0,
				max: 1,
				expected: `
					[0] -> [1] : 61

					[1] -> none`,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: 1,
				expected: `
					[0] -> (1) : 61

					(1) -> [2] : 62

					[2] -> (1) : 61`,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: 1,
				expected: `
					[0] -> (1) : 61

					(1) -> [2] : 62

					[2] -> (1) : 61`,
			},

			{
				literal: /a/,
				min: 3,
				max: 3,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 61

					(2) -> [3] : 61

					[3] -> none`,
			},
			{
				literal: /(ab)*/,
				min: 3,
				max: 3,
				expected: `
					[0] -> (1) : 61

					(1) -> [2] : 62

					[2] -> (1) : 61`,
			},
			{
				literal: /(ab)+/,
				min: 3,
				max: 3,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 62

					(2) -> (3) : 61

					(3) -> (4) : 62

					(4) -> (5) : 61

					(5) -> [6] : 62

					[6] -> (5) : 61`,
			},

			{
				literal: /a/,
				min: 0,
				max: 3,
				expected: `
					[0] -> [1] : 61

					[1] -> [2] : 61

					[2] -> [3] : 61

					[3] -> none`,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: 3,
				expected: `
					[0] -> (1) : 61

					(1) -> [2] : 62

					[2] -> (1) : 61`,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: 3,
				expected: `
					[0] -> (1) : 61

					(1) -> [2] : 62

					[2] -> (1) : 61`,
			},

			{
				literal: /a/,
				min: 0,
				max: Infinity,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: Infinity,
				expected: `
					[0] -> (1) : 61

					(1) -> [2] : 62

					[2] -> (1) : 61`,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: Infinity,
				expected: `
					[0] -> (1) : 61

					(1) -> [2] : 62

					[2] -> (1) : 61`,
			},

			{
				literal: /a/,
				min: 3,
				max: Infinity,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 61

					(2) -> [3] : 61

					[3] -> [3] : 61`,
			},
			{
				literal: /(ab)*/,
				min: 3,
				max: Infinity,
				expected: `
					[0] -> (1) : 61

					(1) -> [2] : 62

					[2] -> (1) : 61`,
			},
			{
				literal: /(ab)+/,
				min: 3,
				max: Infinity,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 62

					(2) -> (3) : 61

					(3) -> (4) : 62

					(4) -> (5) : 61

					(5) -> [6] : 62

					[6] -> (5) : 61`,
			},
		]);

		interface TestCase {
			literal: Literal;
			min: number;
			max: number;
			expected: string | typeof Error;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, min, max, expected } of cases) {
				it(`${literalToString(literal)}{${min},${max === Infinity ? "" : max}}`, function () {
					const nfa = literalToNFA(literal);

					if (typeof expected === "string") {
						nfa.quantify(min, max);
						assert.strictEqual(nfa.toString(), removeIndentation(expected));
					} else {
						assert.throws(() => nfa.quantify(min, max));
					}
				});
			}
		}
	});

	describe("intersect", function () {
		test([
			{
				left: /a/,
				right: /b/,
				expected: `
					(0) -> none`,
			},
			{
				left: /a*/,
				right: /a/,
				expected: `
					(0) -> [1] : 61

					[1] -> none`,
			},
			{
				left: /b*(ab+)*a/,
				right: /a*(ba+)*/,
				// expected == /b?(ab)*a/
				expected: `
					(0) -> (1) : 61
					    -> [2] : 61
					    -> (3) : 62

					(1) -> (4) : 62

					[2] -> none

					(3) -> [2] : 61
					    -> (5) : 61

					(4) -> [2] : 61
					    -> (5) : 61

					(5) -> (4) : 62`,
			},
			{
				left: /a+/,
				right: /(?:a+){2,}/,
				// expected == /a{2,})/
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> [2] : 61`,
			},
			{
				left: /a*/,
				right: /b*/,
				// expected == /(?:)/
				expected: `
					[0] -> none`,
			},
		]);

		interface TestCase {
			left: Literal;
			right: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { left, right, expected } of cases) {
				it(`${literalToString(left)} ∩ ${literalToString(right)}`, function () {
					const nfaLeft = literalToNFA(left);
					const nfaRight = literalToNFA(right);
					const actual = NFA.fromIntersection(nfaLeft, nfaRight).toString();
					assert.strictEqual(actual, removeIndentation(expected), "Actual:\n" + actual + "\n");
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
					const nfaLeft = literalToNFA(left);
					const nfaRight = literalToNFA(right);

					const intersect = NFA.fromIntersection(nfaLeft, nfaRight);

					const expected = toArray(intersect.wordSets());
					const actual = toArray(nfaLeft.intersectionWordSets(nfaRight));

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
			assert.isTrue(NFA.fromWords([], { maxCharacter: 0xff }).isEmpty);
			assert.isTrue(NFA.fromWords([], { maxCharacter: 0xffff }).isEmpty);

			// language containing the empty word
			assert.isFalse(NFA.fromWords([[]], { maxCharacter: 0xff }).isEmpty);
			assert.isFalse(NFA.fromWords([[]], { maxCharacter: 0xffff }).isEmpty);
		});

		describe("true", function () {
			for (const literal of EMPTY_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isTrue(literalToNFA(literal).isEmpty);
				});
			}
		});

		describe("false", function () {
			for (const literal of NON_EMPTY_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isFalse(literalToNFA(literal).isEmpty);
				});
			}
		});
	});

	describe("isFinite", function () {
		describe("true", function () {
			for (const literal of FINITE_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isTrue(literalToNFA(literal).isFinite);
				});
			}
		});

		describe("false", function () {
			for (const literal of NON_FINITE_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isFalse(literalToNFA(literal).isFinite);
				});
			}
		});
	});

	describe("empty() & all()", function () {
		it("empty()", function () {
			assert.isTrue(NFA.empty({ maxCharacter: 0xff }).isEmpty);
			assert.isTrue(NFA.empty({ maxCharacter: 0xffff }).isEmpty);

			assert.isTrue(NFA.empty({ maxCharacter: 0xff }).isFinite);
			assert.isTrue(NFA.empty({ maxCharacter: 0xffff }).isFinite);
		});

		it("all()", function () {
			assert.isFalse(NFA.all({ maxCharacter: 0xff }).isEmpty);
			assert.isFalse(NFA.all({ maxCharacter: 0xffff }).isEmpty);

			assert.isFalse(NFA.all({ maxCharacter: 0xff }).isFinite);
			assert.isFalse(NFA.all({ maxCharacter: 0xffff }).isFinite);
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
					const nfa = NFA.fromWords(chars, { maxCharacter: 0x10ffff });
					nfa.prefixes();

					const acutal = [...new Set([...nfa.words()].map(fromUnicodeToString))];
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
					const nfa = NFA.fromWords(chars, { maxCharacter: 0x10ffff });
					nfa.suffixes();

					const acutal = [...new Set([...nfa.words()].map(fromUnicodeToString))];
					const expected = [...suffixes(words)];
					assert.sameMembers(acutal, expected);
				});
			}
		}
	});

	describe("reverse (words)", function () {
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
					const nfa = NFA.fromWords(chars, { maxCharacter: 0x10ffff });
					nfa.reverse();
					const nfaR = NFA.fromWords(
						chars.map(x => x.reverse()),
						{ maxCharacter: 0x10ffff }
					);

					const acutal = [...new Set([...nfa.words()].map(fromUnicodeToString))];
					const expected = [...new Set([...nfaR.words()].map(fromUnicodeToString))];
					assert.sameMembers(acutal, expected);
				});
			}
		}
	});

	describe("reverse", function () {
		test([
			{
				literal: /(?:)/,
				expected: /(?:)/,
			},
			{
				literal: /[^\s\S]/,
				expected: /[^\s\S]/,
			},
			{
				literal: /a/,
				expected: /a/,
			},
			{
				literal: /foo|bar/,
				expected: /rab|oof/,
			},
			{
				literal: /a?/,
				expected: /a?/,
			},
			{
				literal: /a?b?/,
				expected: /b?a?/,
			},
			{
				literal: /a+/,
				expected: /a+/,
			},
			{
				literal: /a*b*c*/,
				expected: /c*b*a*/,
			},
			{
				literal: /a+b*c*/,
				expected: /c*b*a+/,
			},
			{
				literal: /a*b+c*/,
				expected: /c*b+a*/,
			},
			{
				literal: /a*b*c+/,
				expected: /c+b*a*/,
			},
			{
				literal: /a+b+c*/,
				expected: /c*b+a+/,
			},
			{
				literal: /a+b*c+/,
				expected: /c+b*a+/,
			},
			{
				literal: /a*b+c+/,
				expected: /c+b+a*/,
			},
			{
				literal: /a+b+c+/,
				expected: /c+b+a+/,
			},
		]);

		interface TestCase {
			literal: Literal;
			expected: Literal;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, expected } of cases) {
				it(`reverse(${literalToString(literal)}) == ${literalToString(expected)}`, function () {
					const aNfa = literalToNFA(literal);
					aNfa.reverse();
					const a = DFA.fromFA(aNfa);
					a.minimize();

					const e = literalToDFA(expected);
					e.minimize();

					const actualRE = toLiteral(aNfa.toRegex());
					assert.isTrue(
						a.structurallyEqual(e),
						"Not equal.\n\n" +
							`Actual: reverse(${literalToString(literal)}) == ${literalToString(actualRE)}`
					);
				});
			}
		}
	});

	describe("Safe creation", function () {
		const testNfa = literalToNFA(/a{1000}/);

		it(NFA.fromFA.name, function () {
			assert.throws(() => {
				NFA.fromFA(testNfa, { maxNodes: 100 });
			});
		});
		it(NFA.fromIntersection.name, function () {
			assert.throws(() => {
				NFA.fromIntersection(testNfa, testNfa, { maxNodes: 100 });
			});
		});
		it(NFA.fromRegex.name, function () {
			assert.throws(() => {
				NFA.fromRegex(testNfa.toRegex(), testNfa.options, { maxNodes: 100 });
			});
		});
		it(NFA.fromTransitionIterator.name, function () {
			assert.throws(() => {
				NFA.fromTransitionIterator(testNfa.transitionIterator(), testNfa.options, { maxNodes: 100 });
			});
		});
		it(NFA.fromWords.name, function () {
			assert.throws(() => {
				NFA.fromWords(testNfa.words(), testNfa.options, { maxNodes: 100 });
			});
		});
	});

	it("issue #5", function () {
		const ast = new RegExpParser().parseLiteral(/<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/.toString());
		const parser = Parser.fromAst(ast);

		let total: NFA | undefined = undefined;
		for (const alt of ast.pattern.alternatives) {
			const nfa = NFA.fromRegex(parser.parseElement(alt).expression, { maxCharacter: 0xffff });
			nfa.withoutEmptyWord();

			if (!total) {
				total = nfa;
			} else {
				if (total.isDisjointWith(nfa)) {
					total.union(nfa);
				} else {
					// do something
				}
			}
		}
	});
});

function getWords(nfa: NFA): string[] {
	const words = new Set<string>();
	for (const word of nfa.words()) {
		words.add(word.map(i => String.fromCodePoint(i)).join(""));
	}
	return [...words];
}
