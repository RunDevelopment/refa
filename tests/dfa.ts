import { DFA } from "../src/dfa";
import { assert } from "chai";
import { literalToString, literalToDFA, removeIndentation } from "./helper/fa";
import { FINITE_LITERALS, NON_FINITE_LITERALS, EMPTY_LITERALS, NON_EMPTY_LITERALS } from "./helper/regexp-literals";
import { Literal } from "../src/js";
import { fromStringToUnicode, fromUnicodeToString } from "../src/words";
import { prefixes } from "./helper/util";

describe("DFA", function () {
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

					(3) -> [5] : 72
					    -> [6] : 7a

					(4) -> [7] : 6f

					[5] -> none

					[6] -> none

					[7] -> [8] : 64

					[8] -> none`,
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
				const chars = persistentWords.map(w => [...w].map(c => c.charCodeAt(0)));
				const dfa = DFA.fromWords(chars, { maxCharacter: 0x10ffff });
				it(title, function () {
					if (expected === undefined) {
						const unique = [...new Set<string>(persistentWords)];
						assert.sameMembers(getWords(dfa), unique);
					} else {
						assert.strictEqual(dfa.toString(), removeIndentation(expected));
					}
				});
			}
		}
	});

	describe("fromNFA", function () {
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
				literal: /()*/,
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

					[1] -> [2] : 61

					[2] -> [3] : 61

					[3] -> [4] : 61
					    -> [5] : 62

					[4] -> [4] : 61

					[5] -> none`,
			},
			{
				literal: /a+|a*aa*/,
				expected: `
					(0) -> [1] : 61

					[1] -> [2] : 61

					[2] -> [2] : 61`,
			},
			{
				literal: /\{[^\r\n}:]+\}/,
				expected: `
					(0) -> (1) : 7b

					(1) -> (2) : 0..9, b..c, e..39, 3b..7c, 7e..ffff

					(2) -> (2) : 0..9, b..c, e..39, 3b..7c, 7e..ffff
					    -> [3] : 7d

					[3] -> none`,
			},
			{
				literal: /'(?:%.|[^%'\r\n])+'/,
				expected: `
					(0) -> (1) : 27

					(1) -> (2) : 0..9, b..c, e..24, 26, 28..ffff
					    -> (3) : 25

					(2) -> (2) : 0..9, b..c, e..24, 26, 28..ffff
					    -> (3) : 25
					    -> [4] : 27

					(3) -> (2) : 0..9, b..c, e..2027, 202a..ffff

					[4] -> none`,
			},
			{
				literal: /&[bchou][a-z\d]+/i,
				expected: `
					(0) -> (1) : 26

					(1) -> (2) : 42..43, 48, 4f, 55, 62..63, 68, 6f, 75

					(2) -> [3] : 30..39, 41..5a, 61..7a

					[3] -> [3] : 30..39, 41..5a, 61..7a`,
			},
			{
				literal: /"(?:[^\\"]|\\.)*"|'[^']*'/,
				expected: `
					(0) -> (1) : 22
					    -> (2) : 27

					(1) -> (3) : 0..21, 23..5b, 5d..ffff
					    -> [4] : 22
					    -> (5) : 5c

					(2) -> [4] : 27
					    -> (6) : 0..26, 28..ffff

					(3) -> (3) : 0..21, 23..5b, 5d..ffff
					    -> [4] : 22
					    -> (5) : 5c

					[4] -> none

					(5) -> (3) : 0..9, b..c, e..2027, 202a..ffff

					(6) -> [4] : 27
					    -> (6) : 0..26, 28..ffff`,
			},
		]);

		interface TestCase {
			literal: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, expected } of cases) {
				it(literalToString(literal), function () {
					assert.strictEqual(literalToDFA(literal).toString(), removeIndentation(expected));
				});
			}
		}
	});

	describe("Minimize", function () {
		test([
			{
				literal: /[^\s\S]/,
				expected: `
					(0) -> none`,
			},
			{
				literal: /[^\s\S]*/,
				expected: `
					[0] -> none`,
			},
			{
				literal: /a*b*c*/,
				expected: `
					[0] -> [0] : 61
					    -> [1] : 62
					    -> [2] : 63

					[1] -> [1] : 62
					    -> [2] : 63

					[2] -> [2] : 63`,
			},
			{
				literal: /a+b+c+/,
				expected: `
					(0) -> (1) : 61

					(1) -> (1) : 61
					    -> (2) : 62

					(2) -> (2) : 62
					    -> [3] : 63

					[3] -> [3] : 63`,
			},
			{
				literal: /a+b+c+|a*/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61
					    -> (2) : 62

					(2) -> (2) : 62
					    -> [3] : 63

					[3] -> [3] : 63`,
			},
			{
				literal: /a*(a+b+c+)?/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61
					    -> (2) : 62

					(2) -> (2) : 62
					    -> [3] : 63

					[3] -> [3] : 63`,
			},
			{
				literal: /a+|a*aa*/,
				expected: `
					(0) -> [1] : 61

					[1] -> [1] : 61`,
			},
			{
				literal: /(?:\d+(?:\.\d*)?|\.\d+)(?:E[+-]?\d+)?/,
				expected: `
					(0) -> (1) : 2e
					    -> [2] : 30..39

					(1) -> [3] : 30..39

					[2] -> [2] : 30..39
					    -> [3] : 2e
					    -> (4) : 45

					[3] -> [3] : 30..39
					    -> (4) : 45

					(4) -> (5) : 2b, 2d
					    -> [6] : 30..39

					(5) -> [6] : 30..39

					[6] -> [6] : 30..39`,
			},
		]);

		interface TestCase {
			literal: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, expected } of cases) {
				it(literalToString(literal), function () {
					const dfa = literalToDFA(literal);
					dfa.minimize();
					assert.strictEqual(dfa.toString(), removeIndentation(expected));
				});
			}
		}
	});

	describe("Minimize & Equal", function () {
		test([
			{
				literals: [/a+b+c+|a*/, /a*(?:a+b+c+)?/],
			},
			{
				literals: [/a.*/, /a\w*.*/],
			},
			{
				literals: [
					/:\w+:/,
					/:(?:\w+|ABC|DEF|abc|def|1234567890):/,
					/:(?:\w|\w\w|\w+|\w\w\w|ABC|DEF|abc|def|1234567890)+:/,
				],
			},
			{
				literals: [/[ \t]+\S+|[ \t]+['"]\S|[ \t]+/, /[ \t]+\S*/],
			},
		]);

		interface TestCase {
			literals: [Literal, Literal, ...Literal[]];
		}

		function test(cases: TestCase[]): void {
			for (const { literals } of cases) {
				it(literals.map(literalToString).join(" == "), function () {
					const referenceDfa = literalToDFA(literals[0]);
					referenceDfa.minimize();
					for (let i = 0; i < literals.length; i++) {
						const dfa = literalToDFA(literals[i]);
						dfa.minimize();
						assert.isTrue(dfa.structurallyEqual(referenceDfa));
					}
				});
			}
		}
	});

	describe("Complement", function () {
		test([
			{
				literal: /[^\s\S]/,
				expected: `
					[0] -> [1] : 0..ffff

					[1] -> [1] : 0..ffff`,
			},
			{
				literal: /(?:)/,
				expected: `
					(0) -> [1] : 0..ffff

					[1] -> [1] : 0..ffff`,
			},
			{
				literal: /[\s\S]*/,
				expected: `
					(0) -> none`,
			},
			{
				literal: /[\s\S]+/,
				expected: `
					[0] -> none`,
			},
			{
				literal: /a+/,
				expected: `
					[0] -> [1] : 0..60, 62..ffff
					    -> (2) : 61

					[1] -> [1] : 0..ffff

					(2) -> [1] : 0..60, 62..ffff
					    -> (2) : 61`,
			},
			{
				literal: /a*b*c*/,
				expected: `
					(0) -> [1] : 0..60, 64..ffff
					    -> (2) : 61
					    -> (3) : 62
					    -> (4) : 63

					[1] -> [1] : 0..ffff

					(2) -> [1] : 0..60, 64..ffff
					    -> (2) : 61
					    -> (3) : 62
					    -> (4) : 63

					(3) -> [1] : 0..61, 64..ffff
					    -> (3) : 62
					    -> (4) : 63

					(4) -> [1] : 0..62, 64..ffff
					    -> (4) : 63`,
			},
		]);

		interface TestCase {
			literal: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, expected } of cases) {
				it(literalToString(literal), function () {
					const dfa = literalToDFA(literal);
					dfa.complement();
					assert.strictEqual(dfa.toString(), removeIndentation(expected));
				});
			}
		}
	});

	describe("isEmpty", function () {
		it("constructed from 0 words", function () {
			// empty language
			assert.isTrue(DFA.fromWords([], { maxCharacter: 0xff }).isEmpty);
			assert.isTrue(DFA.fromWords([], { maxCharacter: 0xffff }).isEmpty);

			// language containing the empty word
			assert.isFalse(DFA.fromWords([[]], { maxCharacter: 0xff }).isEmpty);
			assert.isFalse(DFA.fromWords([[]], { maxCharacter: 0xffff }).isEmpty);
		});

		describe("true", function () {
			for (const literal of EMPTY_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isTrue(literalToDFA(literal).isEmpty);
				});
			}
		});

		describe("false", function () {
			for (const literal of NON_EMPTY_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isFalse(literalToDFA(literal).isEmpty);
				});
			}
		});
	});

	describe("isFinite", function () {
		describe("true", function () {
			for (const literal of FINITE_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isTrue(literalToDFA(literal).isFinite);
				});
			}
		});

		describe("false", function () {
			for (const literal of NON_FINITE_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isFalse(literalToDFA(literal).isFinite);
				});
			}
		});
	});

	describe("empty() & all()", function () {
		it("empty()", function () {
			assert.isTrue(DFA.empty({ maxCharacter: 0xff }).isEmpty);
			assert.isTrue(DFA.empty({ maxCharacter: 0xffff }).isEmpty);

			assert.isTrue(DFA.empty({ maxCharacter: 0xff }).isFinite);
			assert.isTrue(DFA.empty({ maxCharacter: 0xffff }).isFinite);
		});

		it("all()", function () {
			assert.isFalse(DFA.all({ maxCharacter: 0xff }).isEmpty);
			assert.isFalse(DFA.all({ maxCharacter: 0xffff }).isEmpty);

			assert.isFalse(DFA.all({ maxCharacter: 0xff }).isFinite);
			assert.isFalse(DFA.all({ maxCharacter: 0xffff }).isFinite);
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
					const nfa = DFA.fromWords(chars, { maxCharacter: 0x10ffff });
					nfa.prefixes();

					const acutal = [...new Set([...nfa.words()].map(fromUnicodeToString))];
					const expected = [...prefixes(words)];
					assert.sameMembers(acutal, expected);
				});
			}
		}
	});
});

function getWords(dfa: DFA): string[] {
	const words = new Set<string>();
	for (const word of dfa.words()) {
		words.add(word.map(i => String.fromCodePoint(i)).join(""));
	}
	return [...words];
}
