import { NFA } from "../src/nfa";
import { assert } from "chai";
import { fromStringToUnicode } from "../src/words";
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
				literal: /(a*){4}/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a+|){4}/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a+)+/,
				expected: `
					(0) -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a+|){0,4}/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a+){4}/,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 61

					(2) -> (3) : 61

					(3) -> [4] : 61

					[4] -> [4] : 61`
			},
			{
				literal: /(a*){4,}/,
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
				literal: /(a+|b+)*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61
					    -> [2] : 62

					[2] -> [1] : 61
					    -> [2] : 62`
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
			{
				literal: /(?:a+){2,}/,
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> [2] : 61`
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

					(4) -> [3] : 64`
			},
			{
				literal: /abc?|abd|abcd/,
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 62

					[2] -> (3) : 63
					    -> [4] : 63..64

					(3) -> [4] : 64

					[4] -> none`
			},
			{
				literal: /food|fool|foot/,
				expected: `
					(0) -> (1) : 66

					(1) -> (2) : 6f

					(2) -> (3) : 6f

					(3) -> [4] : 64, 6c, 74

					[4] -> none`
			},
			{
				literal: /fo(od|ol|ot)/,
				expected: `
					(0) -> (1) : 66

					(1) -> (2) : 6f

					(2) -> (3) : 6f

					(3) -> [4] : 64, 6c, 74

					[4] -> none`
			},
			{
				literal: /bet|get|pet|set/,
				expected: `
					(0) -> (1) : 62, 67, 70, 73

					(1) -> (2) : 65

					(2) -> [3] : 74

					[3] -> none`
			},
			{
				literal: /bet|bat|bit/,
				expected: `
					(0) -> (1) : 62

					(1) -> (2) : 61, 65, 69

					(2) -> [3] : 74

					[3] -> none`
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

					[6] -> [6] : 30..39`
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
				const chars = persistentWords.map(w => fromStringToUnicode(w));
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
					(0) -> (1) : 61..62

					(1) -> [2] : 61..62

					[2] -> none`
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

	describe('concat', function () {

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

					[6] -> none`
			},
			{
				left: /a*/,
				right: /b*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61
					    -> [2] : 62

					[2] -> [2] : 62`
			},
			{
				left: /a+/,
				right: /b*/,
				expected: `
					(0) -> [1] : 61

					[1] -> [1] : 61
					    -> [2] : 62

					[2] -> [2] : 62`
			},
			{
				left: /a*/,
				right: /b+/,
				expected: `
					(0) -> (1) : 61
					    -> [2] : 62

					(1) -> (1) : 61
					    -> [2] : 62

					[2] -> [2] : 62`
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
					nfaLeft.concat(nfaRight);

					assert.strictEqual(nfaRight.toString(), nfaRightCopy.toString());

					const actual = nfaLeft.toString();
					assert.strictEqual(actual, removeIndentation(expected), "Actual:\n" + actual + "\n");
				});
			}
		}

	});

	describe('concatBefore', function () {

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

					[6] -> none`
			},
			{
				left: /a*/,
				right: /b*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61

					[2] -> [1] : 61
					    -> [2] : 62`
			},
			{
				left: /a+/,
				right: /b*/,
				expected: `
					(0) -> [1] : 61
					    -> (2) : 62

					[1] -> [1] : 61

					(2) -> [1] : 61
					    -> (2) : 62`
			},
			{
				left: /a*/,
				right: /b+/,
				expected: `
					(0) -> [1] : 62

					[1] -> [1] : 62
					    -> [2] : 61

					[2] -> [2] : 61`
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
					nfaLeft.concatBefore(nfaRight);

					assert.strictEqual(nfaRight.toString(), nfaRightCopy.toString());

					const actual = nfaLeft.toString();
					assert.strictEqual(actual, removeIndentation(expected), "Actual:\n" + actual + "\n");
				});
			}
		}

	});

	describe('intersect', function () {

		test([
			{
				left: /a/,
				right: /b/,
				expected: `
					(0) -> none`
			},
			{
				left: /a*/,
				right: /a/,
				expected: `
					(0) -> [1] : 61

					[1] -> none`
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

					(5) -> (4) : 62`
			},
			{
				left: /a+/,
				right: /(?:a+){2,}/,
				// expected == /a{2,})/
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> [2] : 61`
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
					const actual = NFA.intersect(nfaLeft, nfaRight).toString();
					assert.strictEqual(actual, removeIndentation(expected), "Actual:\n" + actual + "\n");
				});
			}
		}

	});

	describe('intersectionWordSets', function () {

		test([
			{
				left: /a/,
				right: /b/
			},
			{
				left: /a*/,
				right: /a/
			},
			{
				left: /b*(ab+)*a/,
				right: /a*(ba+)*/
			},
			{
				left: /a+/,
				right: /(?:a+){2,}/
			},
			{
				left: /(?:[^>"'[\]]|"[^"]*"|'[^']*')/,
				right: /(?:[^>"'[\]]|"[^"]*"|'[^']*'){2,}/
			}
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

					const intersect = NFA.intersect(nfaLeft, nfaRight);

					const expected = toArray(intersect.wordSets());
					const actual = toArray(NFA.intersectionWordSets(nfaLeft, nfaRight));

					assert.strictEqual(actual.length, expected.length, "Number of word sets");
					for (let i = 0; i < actual.length; i++) {
						const actualWordSet = actual[i];
						const expectedWordSet = expected[i];
						assert.strictEqual(actualWordSet.length, expectedWordSet.length,
							`Number of characters of word set ${i}.`);

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

	describe('empty() & all()', function () {

		it('empty()', function () {
			assert.isTrue(NFA.empty({ maxCharacter: 0xFF }).isEmpty);
			assert.isTrue(NFA.empty({ maxCharacter: 0xFFFF }).isEmpty);

			assert.isTrue(NFA.empty({ maxCharacter: 0xFF }).isFinite);
			assert.isTrue(NFA.empty({ maxCharacter: 0xFFFF }).isFinite);
		});

		it('all()', function () {
			assert.isFalse(NFA.all({ maxCharacter: 0xFF }).isEmpty);
			assert.isFalse(NFA.all({ maxCharacter: 0xFFFF }).isEmpty);

			assert.isFalse(NFA.all({ maxCharacter: 0xFF }).isFinite);
			assert.isFalse(NFA.all({ maxCharacter: 0xFFFF }).isFinite);
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
