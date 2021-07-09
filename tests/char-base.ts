import { assert } from "chai";
import { CharBase } from "../src/char-base";
import { CharSet } from "../src/char-set";
import { Char } from "../src/char-types";
import { charsFromRegex } from "./helper/chars";
import { assertEqualSnapshot } from "./helper/snapshot";

describe(CharBase.name, function () {
	const regexes: RegExp[] = [
		/a/u,
		/[^a]/u,
		/b/u,
		/[^b]/u,
		/c/u,
		/[^c]/u,
		/[ab]/u,
		/[^ab]/u,
		/\w/u,
		/\W/u,
		/\d/u,
		/\D/u,
		/\p{L}/u,
		/\P{L}/u,
		/\p{Lu}/u,
		/\P{Lu}/u,
		/\p{Ll}/u,
		/\P{Ll}/u,
		/[^]/u,
		/[]/u,
	];
	const chars = regexes.map(charsFromRegex);

	interface TestCase {
		id: string;
		sets: CharSet[];
	}

	const cases: TestCase[] = [];
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

	cases.forEach(test);

	function test({ id, sets }: TestCase): void {
		it(id, function () {
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

			for (const s of sets) {
				const indexes = base.split(s);
				if (indexes.length === 0) {
					assert.isTrue(s.isEmpty);
					continue;
				}

				assert.deepEqual([...new Set(indexes)], indexes, "expected index to be unique");
				assert.deepEqual(
					[...indexes].sort((a, b) => a - b),
					indexes,
					"expected index to be sorted"
				);

				const total = unionAll(indexes.map(i => base.sets[i]));
				assert.isTrue(total.equals(s));
			}

			const checkBase = new CharBase(base.sets);
			assert.equal(checkBase.sets.length, base.sets.length, "Expected the base sets to be as small as possible.");
			assert.isTrue(base.sets.every((s, i) => s.equals(checkBase.sets[i])));

			if (sets.every(s => s.ranges.length < 10)) {
				assertEqualSnapshot(this, base.sets.join("\n"));
			}
		});
	}
});

function unionAll(sets: Iterable<CharSet>, maxCharacter: Char = 0x10ffff): CharSet {
	return CharSet.empty(maxCharacter).union(...sets);
}
