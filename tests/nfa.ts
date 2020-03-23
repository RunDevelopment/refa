import { NFA } from "../src/nfa";
import { assert } from "chai";
import { stringToCodePoints } from "../src/util";
import { literalToString, Literal, literalToNFA, removeIndentation } from "./helper/fa";
import { FINITE_LITERALS, NON_FINITE_LITERALS, NON_EMPTY_LITERALS, EMPTY_LITERALS } from "./helper/regexp-literals";


describe('NFA', function () {

	describe('fromRegex', function () {

		test([
			{
				literal: /a+/,
				expected: `
					(0) -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a|b)+c/,
				expected: `
					(0) -> (1) : 61..62

					(1) -> (1) : 61..62
					    -> [2] : 63

					[2] -> none`
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

					[3] -> [3] : 63`
			},
			{
				literal: /a{4}/,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 61

					(2) -> (3) : 61

					(3) -> [4] : 61

					[4] -> none`
			},
			{
				literal: /(a|){4}/,
				expected: `
					[0] -> [1] : 61

					[1] -> [2] : 61

					[2] -> [3] : 61

					[3] -> [4] : 61

					[4] -> none`
			},
			{
				literal: /a{2,4}/,
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> [3] : 61

					[3] -> [4] : 61

					[4] -> none`
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

					[6] -> none`
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

					[6] -> none`
			},
			{
				literal: /(){100,1000}/,
				expected: `
					[0] -> none`
			},
			{
				literal: /a+|/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /a*/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a|)+/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a*)+/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /((a*)+)?/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a|b)?c/,
				expected: `
					(0) -> (1) : 61..62
					    -> [2] : 63

					(1) -> [2] : 63

					[2] -> none`
			},
			{
				literal: /()*/,
				expected: `
					[0] -> none`
			},
			{
				literal: /([^\s\S])*/,
				expected: `
					[0] -> none`
			},
			{
				literal: /a*|b*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61

					[2] -> [2] : 62`
			},
			{
				literal: /a+|b+|c+/,
				expected: `
					(0) -> [1] : 61
					    -> [2] : 62
					    -> [3] : 63

					[1] -> [1] : 61

					[2] -> [2] : 62

					[3] -> [3] : 63`
			},
			{
				literal: /(a*|b*)+/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61
					    -> [2] : 62

					[2] -> [1] : 61
					    -> [2] : 62`
			},
			{
				literal: /[^\s\S]/,
				expected: `
					(0) -> none`
			},
			{
				literal: /ab[^\s\S]ba/,
				expected: `
					(0) -> none`
			},
			{
				literal: /([^\s\S]|a|[^\s\S]|b[^\s\S]b|[^\s\S])a/,
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> none`
			},
			{
				literal: /[^\s\S]+/,
				expected: `
					(0) -> none`
			},
			{
				literal: /[^\s\S]*/,
				expected: `
					[0] -> none`
			},
			{
				literal: /[^\s\S]?/,
				expected: `
					[0] -> none`
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

					[5] -> none`
			},
		]);

		interface TestCase {
			literal: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, expected } of cases) {
				it(literalToString(literal), function () {
					assert.strictEqual(literalToNFA(literal).toString(), removeIndentation(expected));
				});
			}
		}

	});

	describe('fromWords', function () {

		test([
			{
				words: [],
				expected: `
					(0) -> none`
			},
			{
				words: []
			},
			{
				words: "",
				expected: `
					[0] -> none`
			},
			{
				words: ""
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

					[6] -> [5] : 64`
			},
			{
				words: "foo bar foo bar baz food"
			},
			{
				// the space at the beginning will include the empty word
				words: " a b c d e f g"
			},
			{
				// the space at the beginning will include the empty word
				words: "a b ab ba aa bb aaa aab aba abb baa bab bba bbb"
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
				const chars = persistentWords.map(w => stringToCodePoints(w));
				const nfa = NFA.fromWords(chars, { maxCharacter: 0x10FFFF });
				it(title, function () {
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

	describe('union', function () {

		test([
			{
				literal: /a/,
				other: /b/,
				expected: `
					(0) -> [1] : 61..62

					[1] -> none`
			},
			{
				literal: /ab|ba/,
				other: /aa|bb/,
				expected: `
					(0) -> (1) : 61
					    -> (2) : 61
					    -> (3) : 62
					    -> (4) : 62

					(1) -> [5] : 62

					(2) -> [5] : 61

					(3) -> [5] : 61

					(4) -> [5] : 62

					[5] -> none`
			},
			{
				literal: /a/,
				other: /()/,
				expected: `
					[0] -> [1] : 61

					[1] -> none`
			},
			{
				literal: /a/,
				other: /b*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> none

					[2] -> [2] : 62`
			},
			{
				literal: /a+/,
				other: /b+/,
				expected: `
					(0) -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61

					[2] -> [2] : 62`
			},
			{
				literal: /a+/,
				other: /()/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
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

					(4) -> [2] : 63`
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

	describe('intersect', function () {

		test([
			{
				literal: /a/,
				other: /b/,
				expected: `
					(0) -> none`
			},
			{
				literal: /a*/,
				other: /a/,
				expected: `
					(0) -> [1] : 61

					[1] -> none`
			},
			{
				literal: /b*(ab+)*a/,
				other: /a*(ba+)*/,
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

					(5) -> (4) : 62`
			},
		]);

		interface TestCase {
			literal: Literal;
			other: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, other, expected } of cases) {
				it(`${literalToString(literal)} ∩ ${literalToString(other)}`, function () {

					const nfa = literalToNFA(literal);
					const nfaOther = literalToNFA(other);
					const actual = NFA.intersect(nfa, nfaOther).toString();
					assert.strictEqual(actual, removeIndentation(expected), "Actual:\n" + actual + "\n");
				});
			}
		}

	});

	describe('isEmpty', function () {

		it('constructed from 0 words', function () {
			// empty language
			assert.isTrue(NFA.fromWords([], { maxCharacter: 0xFF }).isEmpty);
			assert.isTrue(NFA.fromWords([], { maxCharacter: 0xFFFF }).isEmpty);

			// language containing the empty word
			assert.isFalse(NFA.fromWords([[]], { maxCharacter: 0xFF }).isEmpty);
			assert.isFalse(NFA.fromWords([[]], { maxCharacter: 0xFFFF }).isEmpty);
		});

		describe('true', function () {
			for (const literal of EMPTY_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isTrue(literalToNFA(literal).isEmpty);
				});
			}
		});

		describe('false', function () {
			for (const literal of NON_EMPTY_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isFalse(literalToNFA(literal).isEmpty);
				});
			}
		});

	});

	describe('isFinite', function () {

		describe('true', function () {
			for (const literal of FINITE_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isTrue(literalToNFA(literal).isFinite);
				});
			}
		});

		describe('false', function () {
			for (const literal of NON_FINITE_LITERALS) {
				it(`${literalToString(literal)}`, function () {
					assert.isFalse(literalToNFA(literal).isFinite);
				});
			}
		});

	});

});

function getWords(nfa: NFA): string[] {
	const words = new Set<string>();
	for (const word of nfa.words()) {
		words.add(word.map(i => String.fromCodePoint(i)).join(""));
	}
	return [...words];
}
