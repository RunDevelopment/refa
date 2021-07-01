import { assert } from "chai";
import { CharRange, CharSet } from "../src/char-set";
import { getBaseSets, runEncodeCharacters } from "../src/char-util";
import { Char } from "../src/char-types";
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
		const regexes: RegExp[] = [/a/u, /b/u, /c/u, /\w/u, /\d/u, /\p{L}/u, /\p{Lu}/u, /\p{Ll}/u, /[^]/u, /[]/u];
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
				const baseSets = getBaseSets(sets);

				assert.isTrue(
					baseSets.every(b => !b.isEmpty),
					"Expected all base sets to be non-empty"
				);
				assert.isTrue(
					unionAll(sets).equals(unionAll(baseSets)),
					"Expected the union of all base sets to be equal to the union of all input sets."
				);
				for (let i = 0; i < baseSets.length; i++) {
					const a = baseSets[i];
					for (let j = i + 1; j < baseSets.length; j++) {
						const b = baseSets[j];
						assert.isTrue(a.isDisjointWith(b), "Expected base sets to be disjoint with each other.");
					}
				}

				return ["Input: " + id, ...getBaseSets(sets).map(c => c.toString())].join("\n");
			})
			.join("\n\n");

		assertEqualSnapshot(this, actual);
	});
});

function unionAll(sets: Iterable<CharSet>, maxCharacter: Char = 0x10ffff): CharSet {
	return CharSet.empty(maxCharacter).union(...sets);
}
