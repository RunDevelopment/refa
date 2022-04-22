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
import { isDisjointWith } from "../src/intersection";
import { assertEqualSnapshot } from "./helper/snapshot";
import { TEST_PAIRS } from "./helper/literal-pair-data";
import { FROM_REGEX_LITERALS } from "./helper/from-regex-data";

describe("NFA", function () {
	describe("fromRegex", function () {
		for (const literal of FROM_REGEX_LITERALS) {
			it(literalToString(literal), function () {
				const nfa = literalToNFA(literal);
				assert.strictEqual(nfa.finals.size, reachableFinalStates(nfa));
				assertEqualSnapshot(this, nfa.toString());
			});
		}
	});

	describe("fromRegex options", function () {
		const options: NFA.FromRegexOptions[] = [{ assertions: "disable" }, { assertions: "ignore" }];
		const literals: Literal[] = [/^foo$|bar/];
		for (const literal of literals) {
			for (const o of options) {
				it(JSON.stringify(o) + ": " + literalToString(literal), function () {
					const parsed = Parser.fromLiteral(literal).parse();
					const nfa = NFA.fromRegex(parsed.expression, { maxCharacter: parsed.maxCharacter }, o);
					assertEqualSnapshot(this, nfa.toString());
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
		for (const [literal, other] of TEST_PAIRS) {
			it(`${literalToString(literal)} ∪ ${literalToString(other)}`, function () {
				const a = literalToNFA(literal);
				const b = literalToNFA(other);
				a.union(b);
				assertEqualSnapshot(this, a.toString());
			});
		}
	});

	describe("unionInto", function () {
		for (const [literal, other] of TEST_PAIRS) {
			it(`${literalToString(literal)} ∪ ${literalToString(other)}`, function () {
				const a = literalToNFA(literal);
				const b = literalToNFA(literal);
				const c = literalToNFA(other);
				a.union(c);
				b.unionInto(c);

				assert.strictEqual(a.toString(), b.toString());
				assert.isTrue(c.isEmpty);
			});
		}
	});

	describe("append", function () {
		for (const [left, right] of TEST_PAIRS) {
			it(`${literalToString(left)} * ${literalToString(right)}`, function () {
				const a = literalToNFA(left);
				const c = literalToNFA(right);
				a.append(c);
				assertEqualSnapshot(this, a.toString());
			});
		}
	});

	describe("appendInto", function () {
		for (const [left, right] of TEST_PAIRS) {
			it(`${literalToString(left)} * ${literalToString(right)}`, function () {
				const a = literalToNFA(left);
				const b = literalToNFA(left);
				const c = literalToNFA(right);
				a.append(c);
				b.appendInto(c);

				assert.strictEqual(a.toString(), b.toString());
				assert.isTrue(c.isEmpty);
			});
		}
	});

	describe("prepend", function () {
		for (const [left, right] of TEST_PAIRS) {
			it(`${literalToString(right)} * ${literalToString(left)}`, function () {
				const a = literalToNFA(left);
				const c = literalToNFA(right);
				a.prepend(c);
				assertEqualSnapshot(this, a.toString());
			});
		}
	});

	describe("prependInto", function () {
		for (const [left, right] of TEST_PAIRS) {
			it(`${literalToString(right)} * ${literalToString(left)}`, function () {
				const a = literalToNFA(left);
				const b = literalToNFA(left);
				const c = literalToNFA(right);
				a.prepend(c);
				b.prependInto(c);

				assert.strictEqual(a.toString(), b.toString());
				assert.isTrue(c.isEmpty);
			});
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
				NFA.fromFA(testNfa, new NFA.LimitedNodeFactory(100));
			});
		});
		it(NFA.fromIntersection.name, function () {
			assert.throws(() => {
				NFA.fromIntersection(testNfa, testNfa, new NFA.LimitedNodeFactory(100));
			});
		});
		it(NFA.fromRegex.name, function () {
			assert.throws(() => {
				NFA.fromRegex(testNfa.toRegex(), testNfa, {}, new NFA.LimitedNodeFactory(100));
			});
		});
		it(NFA.fromTransitionIterator.name, function () {
			assert.throws(() => {
				NFA.fromTransitionIterator(testNfa.transitionIterator(), testNfa, new NFA.LimitedNodeFactory(100));
			});
		});
		it(NFA.fromWords.name, function () {
			assert.throws(() => {
				NFA.fromWords(testNfa.words(), testNfa, new NFA.LimitedNodeFactory(100));
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
				if (isDisjointWith(total, nfa)) {
					total.union(nfa);
				} else {
					// do something
				}
			}
		}
	});
});
