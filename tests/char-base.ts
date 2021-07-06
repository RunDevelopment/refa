import { assert } from "chai";
import { CharBase } from "../src/char-base";
import { CharSet } from "../src/char-set";
import { Char } from "../src/char-types";
import { charsFromRegex } from "./helper/chars";
import { assertEqualSnapshot } from "./helper/snapshot";

describe(CharBase.name, function () {
	it("base sets", function () {
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
				const base = new CharBase(sets);

				assert.isTrue(
					base.sets.every(b => !b.isEmpty),
					"Expected all base sets to be non-empty"
				);
				assert.isTrue(
					unionAll(sets).equals(unionAll(base.sets)),
					"Expected the union of all base sets to be equal to the union of all input sets."
				);
				for (let i = 0; i < base.sets.length; i++) {
					const a = base.sets[i];
					for (let j = i + 1; j < base.sets.length; j++) {
						const b = base.sets[j];
						assert.isTrue(a.isDisjointWith(b), "Expected base sets to be disjoint with each other.");
					}
				}

				return ["Input: " + id, ...base.sets.map(c => c.toString())].join("\n");
			})
			.join("\n\n");

		assertEqualSnapshot(this, actual);
	});
});

function unionAll(sets: Iterable<CharSet>, maxCharacter: Char = 0x10ffff): CharSet {
	return CharSet.empty(maxCharacter).union(...sets);
}
