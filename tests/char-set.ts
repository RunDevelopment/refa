import { assert } from "chai";
import { CharSet, CharRange } from "../src/char-set";
import { readableIntervalString } from "./helper/chars";


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
		it('should work with numbers', function () {
			assert.deepStrictEqual(toRanges([1, 97]), [
				{ min: 1, max: 1 },
				{ min: 97, max: 97 },
			]);
		});
		it('should work with strings', function () {
			assert.deepStrictEqual(toRanges(["a", "b"]), [
				{ min: 97, max: 97 },
				{ min: 98, max: 98 },
			]);
		});
		it('should work with intervals', function () {
			assert.deepStrictEqual(toRanges([[1, 3], [65, 71]]), [
				{ min: 1, max: 3 },
				{ min: 65, max: 71 },
			]);
		});
		it('should work with character ranges', function () {
			const ranges: CharRange[] = [
				{ min: 2, max: 53 },
				{ min: 65, max: 65 },
				{ min: 0, max: 0xFFFF },
			];
			assert.deepStrictEqual(toRanges(ranges), ranges);
		});
	});

	interface TestCase {
		title: string;
		set: CharSet;
		content: string;
	}

	const testCases: TestCase[] = [
		{
			title: "Empty set",
			set: CharSet.empty(0xFFFF),
			content: "[]"
		},
		{
			title: "[abc]",
			// some are intentionally include twice
			set: CharSet.empty(0xFFFF).union(toRanges("ccbbaa".split(""))),
			content: "[['a','c']]"
		},
		{
			title: "[^abc]",
			// some are intentionally include twice
			set: CharSet.empty(0xFFFF).union(toRanges("ccbbaa".split(""))).negate(),
			content: "[[0,96],['d',65535]]"
		},
		{
			title: "White spaces",
			set: CharSet.empty(0xFFFF).union(toRanges("\n\r\f\t\v \xA0 \n\r".split(""))),
			content: "[[9,13],32,160]"
		},
		{
			title: "Not white spaces",
			set: CharSet.empty(0xFFFF).union(toRanges("\n\r\f\t\v \xA0 \n\r".split(""))).negate(),
			content: "[[0,8],[14,31],[33,159],[161,65535]]"
		},
		{
			title: "[abc123] & [cdf321]",
			set: CharSet.empty(0xFFFF).union(toRanges("abc123".split(""))).intersect(toRanges("cdf123".split(""))),
			content: "[['1','3'],'c']"
		},
	];

	for (const test of testCases) {
		it(test.title, function () {
			assert.equal(readableIntervalString(test.set), test.content);
		});
	}

});
