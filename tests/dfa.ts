import { DFA } from "../src/dfa";
import { assert } from "chai";
import { literalToDFA, literalToNFA, literalToString } from "./helper/fa";
import { EMPTY_LITERALS, FINITE_LITERALS, NON_EMPTY_LITERALS, NON_FINITE_LITERALS } from "./helper/regexp-literals";
import { Literal } from "../src/js";
import { fromStringToUnicode, fromUnicodeToString } from "../src/words";
import { prefixes } from "./helper/util";
import { testWordTestCases, wordTestData } from "./helper/word-test-data";
import { NFA } from "../src/nfa";
import { assertEqualSnapshot } from "./helper/snapshot";
import { FROM_REGEX_LITERALS } from "./helper/from-regex-data";

describe("DFA", function () {
	describe("fromNFA", function () {
		for (const literal of FROM_REGEX_LITERALS) {
			it(literalToString(literal), function () {
				assertEqualSnapshot(this, literalToDFA(literal).toString());
			});
		}
	});

	describe("test", function () {
		for (const testCase of wordTestData) {
			it(literalToString(testCase.literal), function () {
				const dfa = literalToDFA(testCase.literal);
				testWordTestCases(dfa, testCase);
			});

			it(literalToString(testCase.literal) + " (minimized)", function () {
				const dfa = literalToDFA(testCase.literal);
				dfa.minimize();
				testWordTestCases(dfa, testCase);
			});
		}
	});

	describe("Minimize", function () {
		test([
			/[^\s\S]/,
			/[^\s\S]*/,
			/a*b*c*/,
			/a+b+c+/,
			/a+b+c+|a*/,
			/a*(a+b+c+)?/,
			/a+|a*aa*/,
			/(?:\d+(?:\.\d*)?|\.\d+)(?:E[+-]?\d+)?/,
			/ab+/,
		]);

		function test(cases: Literal[]): void {
			for (const literal of cases) {
				it(literalToString(literal), function () {
					const dfa = literalToDFA(literal);
					dfa.minimize();
					assertEqualSnapshot(this, dfa.toString());
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
		test([/[^\s\S]/, /(?:)/, /[\s\S]*/, /[\s\S]+/, /a+/, /a*b*c*/]);

		function test(cases: Literal[]): void {
			for (const literal of cases) {
				it(literalToString(literal), function () {
					const dfa = literalToDFA(literal);
					dfa.complement();
					assertEqualSnapshot(this, dfa.toString());
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

	describe("Safe creation", function () {
		const testDfa = literalToDFA(/a{1000}/);

		it(DFA.fromFA.name, function () {
			assert.throws(() => {
				DFA.fromFA(testDfa, new DFA.LimitedNodeFactory(100));
			});
		});
		it(DFA.fromIntersection.name, function () {
			assert.throws(() => {
				DFA.fromIntersection(testDfa, testDfa, new DFA.LimitedNodeFactory(100));
			});
		});
		it(DFA.fromTransitionIterator.name, function () {
			assert.throws(() => {
				DFA.fromTransitionIterator(testDfa.transitionIterator(), testDfa, new DFA.LimitedNodeFactory(100));
			});
		});
		it(DFA.fromWords.name, function () {
			assert.throws(() => {
				DFA.fromWords(testDfa.words(), testDfa, new DFA.LimitedNodeFactory(100));
			});
		});
	});

	describe("fromIntersection", function () {
		it("should work", function () {
			const r1 = /\d+(?:ab|ba|.)+\w+/;
			const r2 = /\w*(?:abc?|abba|\S)+\d+/;

			const r1Nfa = literalToNFA(r1);
			const r2Nfa = literalToNFA(r2);
			const r1Dfa = literalToDFA(r1);
			const r2Dfa = literalToDFA(r2);

			const d1 = DFA.fromFA(NFA.fromIntersection(r1Dfa, r2Dfa));
			const d2 = DFA.fromFA(NFA.fromIntersection(r1Nfa, r2Nfa));
			const d3 = DFA.fromIntersection(r1Dfa, r2Dfa);
			const d4 = DFA.fromIntersection(r1Nfa, r2Nfa);

			d1.minimize();
			d2.minimize();
			d3.minimize();
			d4.minimize();

			assert.isTrue(d1.structurallyEqual(d2));
			assert.isTrue(d2.structurallyEqual(d3));
			assert.isTrue(d3.structurallyEqual(d4));
		});
	});
});
