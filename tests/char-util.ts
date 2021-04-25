import { assert } from "chai";
import { CharRange, CharSet } from "../src/char-set";
import { getBaseSets, runEncodeCharacters } from "../src/char-util";
import { charsFromRegex } from "./helper/chars";
import { assertEqualSnapshot } from "./helper/snapshot";

describe("char-util", function () {
	it(runEncodeCharacters.name, function () {
		const actual = [...runEncodeCharacters([1, 2, 3, 5, 6, 9, 10, 11, 17])];

		const expected: CharRange[] = [
			{ min: 1, max: 3 },
			{ min: 5, max: 6 },
			{ min: 9, max: 11 },
			{ min: 17, max: 17 },
		];

		assert.deepEqual(actual, expected);
	});

	it(getBaseSets.name, function () {
		const regexes: RegExp[] = [/a/u, /b/u, /c/u, /\w/u, /\d/u, /\p{L}/u, /\p{Lu}/u, /\p{Ll}/u];
		const chars = regexes.map(charsFromRegex);

		const cases: { id: string; sets: CharSet[] }[] = [];
		for (let i = 0; i < chars.length; i++) {
			for (let j = i + 1; j < chars.length; j++) {
				cases.push({ id: [regexes[i], regexes[j]].join(" "), sets: [chars[i], chars[j]] });
			}
		}
		for (let i = 0; i < chars.length; i++) {
			for (let j = i + 1; j < chars.length; j++) {
				for (let k = j + 1; k < chars.length; k++) {
					cases.push({
						id: [regexes[i], regexes[j], regexes[k]].join(" "),
						sets: [chars[i], chars[j], chars[k]],
					});
				}
			}
		}

		const actual = cases
			.map(({ id, sets }) => {
				return ["Input: " + id, ...getBaseSets(sets).map(c => c.toString())].join("\n");
			})
			.join("\n\n");

		assertEqualSnapshot(this, actual);
	});
});
