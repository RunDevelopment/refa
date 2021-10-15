import { ENFA } from "../src/enfa";
import { assert } from "chai";
import { fromStringToUnicode, fromUnicodeToString } from "../src/words";
import { faEqual, literalToENFA, literalToNFA, literalToString } from "./helper/fa";
import { EMPTY_LITERALS, FINITE_LITERALS, NON_EMPTY_LITERALS, NON_FINITE_LITERALS } from "./helper/regexp-literals";
import { Literal, toLiteral } from "../src/js";
import { prefixes, suffixes } from "./helper/util";
import { testWordTestCases, wordTestData } from "./helper/word-test-data";
import { CharSet } from "../src/char-set";
import { assertEqualSnapshot } from "./helper/snapshot";
import { TEST_PAIRS } from "./helper/literal-pair-data";
import { FROM_REGEX_LITERALS } from "./helper/from-regex-data";

describe("ENFA", function () {
	describe("fromRegex", function () {
		for (const literal of FROM_REGEX_LITERALS) {
			it(literalToString(literal), function () {
				assertEqualSnapshot(this, literalToENFA(literal).toString());
			});
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
		for (const [literal, other] of TEST_PAIRS) {
			it(`${literalToString(literal)} ∪ ${literalToString(other)} (left)`, function () {
				const a = literalToENFA(literal);
				const b = literalToENFA(other);
				a.union(b, "left");
				assertEqualSnapshot(this, a.toString());
			});
			it(`${literalToString(literal)} ∪ ${literalToString(other)} (right)`, function () {
				const a = literalToENFA(literal);
				const b = literalToENFA(other);
				a.union(b, "right");
				assertEqualSnapshot(this, a.toString());
			});
		}
	});

	describe("unionInto", function () {
		for (const [literal, other] of TEST_PAIRS) {
			it(`${literalToString(literal)} ∪ ${literalToString(other)} (left)`, function () {
				const a = literalToENFA(literal);
				const b = literalToENFA(literal);
				const c = literalToENFA(other);
				a.union(c, "left");
				b.unionInto(c, "left");
				assert.strictEqual(a.toString(), b.toString());
			});
			it(`${literalToString(literal)} ∪ ${literalToString(other)} (right)`, function () {
				const a = literalToENFA(literal);
				const b = literalToENFA(literal);
				const c = literalToENFA(other);
				a.union(c, "right");
				b.unionInto(c, "right");
				assert.strictEqual(a.toString(), b.toString());
			});
		}
	});

	describe("append", function () {
		for (const [left, right] of TEST_PAIRS) {
			it(`${literalToString(left)} * ${literalToString(right)}`, function () {
				const a = literalToENFA(left);
				const b = literalToENFA(right);
				a.append(b);
				assertEqualSnapshot(this, a.toString());
			});
		}
	});

	describe("appendInto", function () {
		for (const [left, right] of TEST_PAIRS) {
			it(`${literalToString(left)} * ${literalToString(right)}`, function () {
				const a = literalToENFA(left);
				const b = literalToENFA(left);
				const c = literalToENFA(right);
				a.append(c);
				b.appendInto(c);
				assert.strictEqual(a.toString(), b.toString());
			});
		}
	});

	describe("prepend", function () {
		for (const [left, right] of TEST_PAIRS) {
			it(`${literalToString(right)} * ${literalToString(left)}`, function () {
				const a = literalToENFA(left);
				const b = literalToENFA(right);
				a.prepend(b);
				assertEqualSnapshot(this, a.toString());
			});
		}
	});

	describe("prependInto", function () {
		for (const [left, right] of TEST_PAIRS) {
			it(`${literalToString(right)} * ${literalToString(left)}`, function () {
				const a = literalToENFA(left);
				const b = literalToENFA(left);
				const c = literalToENFA(right);
				a.prepend(c);
				b.prependInto(c);
				assert.strictEqual(a.toString(), b.toString());
			});
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

	describe("withoutEmptyWord", function () {
		test([
			/a*b*c+/,
			/a?b?/,
			/a??b?/,
			/a??b??/,
			/a?b??/,
			/a*b*c*/,
			/(a*b*c*)*/,
			/(a||b)(|c|d)(||f|g)/,
			/((a||b)(|c|d)(||f|g))*/,
		]);

		type TestCase = Literal;

		function test(cases: TestCase[]): void {
			for (const literal of cases) {
				it(`${literalToString(literal)}`, function () {
					const enfa = literalToENFA(literal);
					const before = enfa.toString();

					enfa.withoutEmptyWord();
					const after = enfa.toString();
					const afterRegex = literalToString(toLiteral(enfa.toRegex()));

					assert.isFalse(enfa.test([]));

					const nfa = literalToNFA(literal);
					nfa.withoutEmptyWord();

					assert.isTrue(faEqual(enfa, nfa));

					assertEqualSnapshot(
						this,
						`Before: ${literalToString(literal)}\n${before}\n\n\nAfter: ${afterRegex}\n${after}`
					);
				});
			}
		}
	});

	describe("Safe creation", function () {
		const testENFA = literalToENFA(/a{1000}/);

		it(ENFA.fromFA.name, function () {
			assert.throws(() => {
				ENFA.fromFA(testENFA, new ENFA.LimitedNodeFactory(100));
			});
		});
		it(ENFA.fromRegex.name, function () {
			assert.throws(() => {
				ENFA.fromRegex(testENFA.toRegex(), testENFA, {}, new ENFA.LimitedNodeFactory(100));
			});
		});
		it(ENFA.fromTransitionIterator.name, function () {
			assert.throws(() => {
				ENFA.fromTransitionIterator(testENFA.transitionIterator(), testENFA, new ENFA.LimitedNodeFactory(100));
			});
		});
		it(ENFA.fromWords.name, function () {
			assert.throws(() => {
				ENFA.fromWords(testENFA.words(), testENFA, new ENFA.LimitedNodeFactory(100));
			});
		});
	});

	describe(ENFA.Node.name, function () {
		it(ENFA.Node.prototype.resolveEpsilon.name, function () {
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

			const n0 = new ENFA.Node();
			const n1 = new ENFA.Node();
			const n2 = new ENFA.Node();
			const n3 = new ENFA.Node();
			const n4 = new ENFA.Node();

			n0.link(n1, a);
			n0.link(n2, null);
			n0.link(n3, b);

			n1.link(n3, c);

			n2.link(n4, d);
			n2.link(n1, e);
			n2.link(n2, null);

			n3.link(n1, null);

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
			n0.resolveEpsilon("out", (charSet, node) => resolved.push([node, charSet]));

			assert.deepEqual(resolved, [
				[n1, a],
				[n4, d],
				[n1, e],
				[n3, b],
			]);
		});
	});
});
