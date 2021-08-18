import { ENFA } from "../src/enfa";
import { assert } from "chai";
import { fromStringToUnicode, fromUnicodeToString } from "../src/words";
import { literalToENFA, literalToString, removeIndentation } from "./helper/fa";
import { EMPTY_LITERALS, FINITE_LITERALS, NON_EMPTY_LITERALS, NON_FINITE_LITERALS } from "./helper/regexp-literals";
import { Literal } from "../src/js";
import { prefixes, suffixes } from "./helper/util";
import { testWordTestCases, wordTestData } from "./helper/word-test-data";
import { CharSet } from "../src/char-set";
import { assertEqualSnapshot } from "./helper/snapshot";

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
			},
			{
				literal: /ab|ba/,
				other: /aa|bb/,
			},
			{
				literal: /a/,
				other: /()/,
			},
			{
				literal: /a/,
				other: /b*/,
			},
			{
				literal: /a+/,
				other: /b+/,
			},
		]);

		interface TestCase {
			literal: Literal;
			other: Literal;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, other } of cases) {
				it(`${literalToString(literal)} ∪ ${literalToString(other)} (left)`, function () {
					const enfa = literalToENFA(literal);
					const enfaOther = literalToENFA(other);
					enfa.union(enfaOther, "left");
					const actual = enfa.toString();
					assertEqualSnapshot(this, actual);
				});
				it(`${literalToString(literal)} ∪ ${literalToString(other)} (right)`, function () {
					const enfa = literalToENFA(literal);
					const enfaOther = literalToENFA(other);
					enfa.union(enfaOther, "right");
					const actual = enfa.toString();
					assertEqualSnapshot(this, actual);
				});
			}
		}
	});

	describe("append", function () {
		test([
			{
				left: /foo/,
				right: /bar/,
			},
			{
				left: /a*/,
				right: /b*/,
			},
			{
				left: /a*/,
				right: /b+/,
			},
		]);

		interface TestCase {
			left: Literal;
			right: Literal;
		}

		function test(cases: TestCase[]): void {
			for (const { left, right } of cases) {
				it(`${literalToString(left)} * ${literalToString(right)}`, function () {
					const enfaLeft = literalToENFA(left);
					const enfaRight = literalToENFA(right);
					const enfaRightCopy = enfaRight.copy();
					enfaLeft.append(enfaRight);

					assert.strictEqual(enfaRight.toString(), enfaRightCopy.toString());

					const actual = enfaLeft.toString();
					assertEqualSnapshot(this, actual);
				});
			}
		}
	});

	describe("prepend", function () {
		test([
			{
				left: /foo/,
				right: /bar/,
			},
			{
				left: /a*/,
				right: /b*/,
			},
			{
				left: /a*/,
				right: /b+/,
			},
		]);

		interface TestCase {
			left: Literal;
			right: Literal;
		}

		function test(cases: TestCase[]): void {
			for (const { left, right } of cases) {
				it(`${literalToString(right)} * ${literalToString(left)}`, function () {
					const enfaLeft = literalToENFA(left);
					const enfaRight = literalToENFA(right);
					const enfaRightCopy = enfaRight.copy();
					enfaLeft.prepend(enfaRight);

					assert.strictEqual(enfaRight.toString(), enfaRightCopy.toString());

					const actual = enfaLeft.toString();
					assertEqualSnapshot(this, actual);
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
			},
			{
				literal: /a*/,
				min: 1,
				max: 1,
				lazy: false,
			},

			{
				literal: /a/,
				min: 1,
				max: 1,
				lazy: true,
			},
			{
				literal: /a*/,
				min: 1,
				max: 1,
				lazy: true,
			},

			{
				literal: /a/,
				min: 0,
				max: 1,
				lazy: false,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: 1,
				lazy: false,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: 1,
				lazy: false,
			},

			{
				literal: /a/,
				min: 0,
				max: 1,
				lazy: true,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: 1,
				lazy: true,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: 1,
				lazy: true,
			},

			{
				literal: /a/,
				min: 3,
				max: 3,
				lazy: false,
			},
			{
				literal: /(ab)*/,
				min: 3,
				max: 3,
				lazy: false,
			},
			{
				literal: /(ab)+/,
				min: 3,
				max: 3,
				lazy: false,
			},

			{
				literal: /a/,
				min: 3,
				max: 3,
				lazy: true,
			},
			{
				literal: /(ab)*/,
				min: 3,
				max: 3,
				lazy: true,
			},
			{
				literal: /(ab)+/,
				min: 3,
				max: 3,
				lazy: true,
			},

			{
				literal: /a/,
				min: 0,
				max: 3,
				lazy: false,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: 3,
				lazy: false,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: 3,
				lazy: false,
			},

			{
				literal: /a/,
				min: 0,
				max: 3,
				lazy: true,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: 3,
				lazy: true,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: 3,
				lazy: true,
			},

			{
				literal: /a/,
				min: 0,
				max: Infinity,
				lazy: false,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: Infinity,
				lazy: false,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: Infinity,
				lazy: false,
			},

			{
				literal: /a/,
				min: 0,
				max: Infinity,
				lazy: true,
			},
			{
				literal: /(ab)*/,
				min: 0,
				max: Infinity,
				lazy: true,
			},
			{
				literal: /(ab)+/,
				min: 0,
				max: Infinity,
				lazy: true,
			},

			{
				literal: /a/,
				min: 3,
				max: Infinity,
				lazy: false,
			},
			{
				literal: /(ab)*/,
				min: 3,
				max: Infinity,
				lazy: false,
			},
			{
				literal: /(ab)+/,
				min: 3,
				max: Infinity,
				lazy: false,
			},

			{
				literal: /a/,
				min: 3,
				max: Infinity,
				lazy: true,
			},
			{
				literal: /(ab)*/,
				min: 3,
				max: Infinity,
				lazy: true,
			},
			{
				literal: /(ab)+/,
				min: 3,
				max: Infinity,
				lazy: true,
			},
		]);

		interface TestCase {
			literal: Literal;
			min: number;
			max: number;
			lazy: boolean;
			expected?: typeof Error;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, min, max, lazy, expected } of cases) {
				it(`${literalToString(literal)}{${min},${max === Infinity ? "" : max}}${lazy ? "?" : ""}`, function () {
					const enfa = literalToENFA(literal);

					if (!expected) {
						enfa.quantify(min, max, lazy);
						assertEqualSnapshot(this, enfa.toString());
					} else {
						assert.throws(() => enfa.quantify(min, max, lazy));
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
