import { assert } from "chai";
import { CharSet, CharRange } from "../src/char-set";
import { rangesToString } from "../src/char-util";
import { charsFromRegex } from "./helper/chars";

function toRanges(input: (string | number | CharRange | [number, number])[]): CharRange[] {
	const ranges: CharRange[] = [];
	for (const i of input) {
		if (typeof i === "number") {
			ranges.push({ min: i, max: i });
		} else if (typeof i === "string") {
			const cp = i.codePointAt(0);
			if (cp === undefined) throw new Error("Invalid string");
			ranges.push({ min: cp, max: cp });
		} else if (Array.isArray(i)) {
			ranges.push({ min: i[0], max: i[1] });
		} else {
			ranges.push(i);
		}
	}
	return ranges;
}

describe("CharSet", function () {
	describe("toRanges (test setup)", function () {
		it("should work with numbers", function () {
			assert.deepStrictEqual(toRanges([1, 97]), [
				{ min: 1, max: 1 },
				{ min: 97, max: 97 },
			]);
		});
		it("should work with strings", function () {
			assert.deepStrictEqual(toRanges(["a", "b"]), [
				{ min: 97, max: 97 },
				{ min: 98, max: 98 },
			]);
		});
		it("should work with intervals", function () {
			assert.deepStrictEqual(
				toRanges([
					[1, 3],
					[65, 71],
				]),
				[
					{ min: 1, max: 3 },
					{ min: 65, max: 71 },
				]
			);
		});
		it("should work with character ranges", function () {
			const ranges: CharRange[] = [
				{ min: 2, max: 53 },
				{ min: 65, max: 65 },
				{ min: 0, max: 0xffff },
			];
			assert.deepStrictEqual(toRanges(ranges), ranges);
		});
	});

	describe("Basic functionality", function () {
		interface TestCase {
			title: string;
			set: CharSet;
			expected: string;
		}

		const testCases: TestCase[] = [
			{
				title: "Empty set",
				set: CharSet.empty(0xffff),
				expected: "",
			},
			{
				title: "[abc]",
				// some are intentionally include twice
				set: CharSet.empty(0xffff).union(toRanges("ccbbaa".split(""))),
				expected: "61..63",
			},
			{
				title: "[^abc]",
				// some are intentionally include twice
				set: CharSet.empty(0xffff)
					.union(toRanges("ccbbaa".split("")))
					.negate(),
				expected: "0..60, 64..ffff",
			},
			{
				title: "White spaces",
				set: CharSet.empty(0xffff).union(toRanges("\n\r\f\t\v \xA0 \n\r".split(""))),
				expected: "9..d, 20, a0",
			},
			{
				title: "Not white spaces",
				set: CharSet.empty(0xffff)
					.union(toRanges("\n\r\f\t\v \xA0 \n\r".split("")))
					.negate(),
				expected: "0..8, e..1f, 21..9f, a1..ffff",
			},
			{
				title: "[abc123] & [cdf321]",
				set: CharSet.empty(0xffff)
					.union(toRanges("abc123".split("")))
					.intersect(toRanges("cdf123".split(""))),
				expected: "31..33, 63",
			},
		];

		for (const test of testCases) {
			it(test.title, function () {
				assert.equal(rangesToString(test.set), test.expected);
			});
		}
	});

	describe("Function tests", function () {
		interface PredicateTestCase {
			name: string;
			cases: (() => boolean)[];
		}

		const charSetOf = charsFromRegex;
		const predicateTests: PredicateTestCase[] = [
			{
				name: "size",
				cases: [
					// eslint-disable-next-line no-empty-character-class
					() => charSetOf(/[]/).size == 0,
					() => charSetOf(/[^\s\S]/).size == 0,
					() => charSetOf(/a/).size == 1,
					() => charSetOf(/a/i).size == 2,
					() => charSetOf(/\d/).size == 10,
					() => charSetOf(/\w/).size == 10 + 26 + 26 + 1,
				],
			},
			{
				name: CharSet.prototype.has.name,
				cases: [
					() => charSetOf(/a/).has("a".charCodeAt(0)),
					() => !charSetOf(/b/).has("a".charCodeAt(0)),
					() => charSetOf(/\w/).has("a".charCodeAt(0)),
					() => !charSetOf(/\W/).has("a".charCodeAt(0)),
				],
			},
			{
				name: CharSet.prototype.isSupersetOf.name,
				cases: [
					() => charSetOf(/a/).isSupersetOf(charSetOf(/a/)),
					() => charSetOf(/[a-z]/).isSupersetOf(charSetOf(/a/)),
					() => charSetOf(/[a-z]/).isSupersetOf(charSetOf(/[a-z]/)),
					() => charSetOf(/\w/).isSupersetOf(charSetOf(/[a-z]/)),
					() => charSetOf(/\w/).isSupersetOf(charSetOf(/\d/)),
					() => charSetOf(/\w/).isSupersetOf(charSetOf(/\w/)),
					() => charSetOf(/\W/).isSupersetOf(charSetOf(/\W/)),

					() => !charSetOf(/\w/).isSupersetOf(charSetOf(/,/)),
					() => !charSetOf(/\w/).isSupersetOf(charSetOf(/[,a]/)),

					() => !charSetOf(/\d/).isSupersetOf({ min: "a".charCodeAt(0), max: "z".charCodeAt(0) }),
					() => charSetOf(/[a-z]/).isSupersetOf({ min: "a".charCodeAt(0), max: "z".charCodeAt(0) }),
					() => charSetOf(/\w/).isSupersetOf({ min: "a".charCodeAt(0), max: "z".charCodeAt(0) }),
				],
			},
			{
				name: CharSet.prototype.isSubsetOf.name,
				cases: [
					() => charSetOf(/a/).isSubsetOf(charSetOf(/a/)),
					() => charSetOf(/a/).isSubsetOf(charSetOf(/[a-z]/)),
					() => charSetOf(/[a-z]/).isSubsetOf(charSetOf(/[a-z]/)),
					() => charSetOf(/[a-z]/).isSubsetOf(charSetOf(/\w/)),
					() => charSetOf(/\d/).isSubsetOf(charSetOf(/\w/)),
					() => charSetOf(/\w/).isSubsetOf(charSetOf(/\w/)),
					() => charSetOf(/\W/).isSubsetOf(charSetOf(/\W/)),

					() => !charSetOf(/,/).isSubsetOf(charSetOf(/\w/)),
					() => !charSetOf(/[,a]/).isSubsetOf(charSetOf(/\w/)),

					() => charSetOf(/a/).isSubsetOf({ min: "a".charCodeAt(0), max: "z".charCodeAt(0) }),
					() => !charSetOf(/\d/).isSubsetOf({ min: "a".charCodeAt(0), max: "z".charCodeAt(0) }),
					() => charSetOf(/[a-z]/).isSubsetOf({ min: "a".charCodeAt(0), max: "z".charCodeAt(0) }),
					() => !charSetOf(/\w/).isSubsetOf({ min: "a".charCodeAt(0), max: "z".charCodeAt(0) }),
				],
			},
			{
				name: CharSet.prototype.isDisjointWith.name,
				cases: [
					() => charSetOf(/a/).isDisjointWith(charSetOf(/b/)),
					() => !charSetOf(/\d/).isDisjointWith(charSetOf(/\w/)),
					() => charSetOf(/\w/).isDisjointWith(charSetOf(/\W/)),
					() => !charSetOf(/\W/).isDisjointWith(charSetOf(/\W/)),

					() => charSetOf(/,/).isDisjointWith(charSetOf(/\w/)),
					() => !charSetOf(/[,a]/).isDisjointWith(charSetOf(/\w/)),

					() => !charSetOf(/a/).isDisjointWith({ min: "a".charCodeAt(0), max: "z".charCodeAt(0) }),
					() => charSetOf(/\d/).isDisjointWith({ min: "a".charCodeAt(0), max: "z".charCodeAt(0) }),
					() => !charSetOf(/[a-z]/).isDisjointWith({ min: "a".charCodeAt(0), max: "z".charCodeAt(0) }),
					() => charSetOf(/\W/).isDisjointWith({ min: "a".charCodeAt(0), max: "z".charCodeAt(0) }),
				],
			},
		];

		for (const predicateTest of predicateTests) {
			describe(predicateTest.name, function () {
				for (const _case of predicateTest.cases) {
					const caseName = _case
						.toString()
						.replace(/\s+/g, " ")
						.replace(/^\s*\(\s*\)\s*=>\s*/, "");
					it(caseName, function () {
						assert.isTrue(_case());
					});
				}
			});
		}
	});

	describe("Combinations", function () {
		const sets: readonly [CharSet, string][] = [
			// eslint-disable-next-line no-empty-character-class
			/[]/,
			/[\s\S]/,
			/a/,
			/a/i,
			/b/,
			/B/i,
			/c/,
			/C/i,
			/\d/,
			/\w/,
			/,/,
			/[\0-\xF7]/,
			/[a-z]/,
			/[,a]/,
		].map(x => [charsFromRegex(x), String(x)]);

		for (let i = 0; i < sets.length; i++) {
			for (let j = 0; j < sets.length; j++) {
				const [left, leftString] = sets[i];
				const [right, rightString] = sets[j];

				it(`${leftString} and ${rightString}`, function () {
					// symmetry
					assert.equal(left.equals(right), right.equals(left));

					assert.isTrue(left.intersect(right).equals(right.intersect(left)));
					assert.isTrue(left.union(right).equals(right.union(left)));

					assert.equal(left.isDisjointWith(right), right.isDisjointWith(left));

					// correctness
					assert.equal(left.isDisjointWith(right), left.intersect(right).isEmpty);

					assert.equal(left.isSupersetOf(right), right.without(left).isEmpty);
					assert.equal(left.isSubsetOf(right), left.without(right).isEmpty);

					assert.isTrue(left.without(right).isDisjointWith(right));
					assert.isTrue(left.without(right).equals(left.intersect(right.negate())));

					const cc = left.commonCharacter(right);
					assert.equal(left.isDisjointWith(right), cc === undefined);
					if (cc !== undefined) {
						assert.isTrue(left.intersect(right).has(cc));
					}

					for (const r of right.ranges) {
						const cc = left.commonCharacter(r);
						assert.equal(left.isDisjointWith(r), cc === undefined);
						if (cc !== undefined) {
							assert.isTrue(left.intersect([r]).has(cc));
						}
					}
				});
			}
		}
	});

	it("should throw for incompatible sets", function () {
		const a = CharSet.empty(0xff);
		const b = CharSet.empty(0xffff);

		// should throw
		assert.throws(() => a.union(b));
		assert.throws(() => b.union(a));
		assert.throws(() => a.intersect(b));
		assert.throws(() => b.intersect(a));
		assert.throws(() => a.without(b));
		assert.throws(() => b.without(a));

		// should not throw
		assert.doesNotThrow(() => a.equals(b));
		assert.doesNotThrow(() => b.equals(a));
		assert.doesNotThrow(() => a.compare(b));
		assert.doesNotThrow(() => b.compare(a));
		assert.doesNotThrow(() => a.isDisjointWith(b));
		assert.doesNotThrow(() => b.isDisjointWith(a));
		assert.doesNotThrow(() => a.isSubsetOf(b));
		assert.doesNotThrow(() => b.isSubsetOf(a));
		assert.doesNotThrow(() => a.isSupersetOf(b));
		assert.doesNotThrow(() => b.isSupersetOf(a));
	});
});
