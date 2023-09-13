import { assert } from "chai";
import { Parser, UnicodeSet, parseUnicodeSet } from "../../src/js";
import { assertEqualSnapshot } from "../helper/snapshot";

describe("JS.UnicodeSet", function () {
	interface TestCase {
		readonly literal: string;
		readonly set: UnicodeSet;
	}
	function parseCharacterClass(literal: string): TestCase {
		const parser = Parser.fromLiteral(literal);
		const element = parser.ast.pattern.alternatives[0].elements[0];
		if (
			element.type === "Assertion" ||
			element.type === "Group" ||
			element.type === "CapturingGroup" ||
			element.type === "Backreference" ||
			element.type === "Quantifier"
		) {
			throw new Error("Invalid element type");
		}
		const set = parseUnicodeSet(element, parser.flags);
		return { literal, set };
	}

	const testCases: readonly TestCase[] = [
		String.raw`/[]/v`,
		String.raw`/[\q{}]/v`,
		String.raw`/[\q{}]/vi`,

		String.raw`/a/v`,
		String.raw`/A/v`,
		String.raw`/[aA]/v`,
		String.raw`/[aA]/vi`,
		String.raw`/a/vi`,
		String.raw`/[\q{aa}]/vi`,
		String.raw`/[\q{aa|aA|Aa|AA}]/v`,
		String.raw`/[\q{aa|aA|Aa|AA|aaa}]/v`,
		String.raw`/[\q{aa|aA|Aa|AA|aaa|aAa}]/v`,
		String.raw`/[\q{aa|aA|Aa|AA|aaa}]/vi`,
		String.raw`/[\q{a|aa|aA|Aa|AA|aaa}]/vi`,

		String.raw`/[\w\q{foo|bar}]/v`,
		String.raw`/[\w\q{foo|bar}]/vi`,
		String.raw`/[\w\q{foo|bar|food}]/v`,
		String.raw`/[\w\q{foo|foot|food}]/v`,
		String.raw`/[\q{foo|foot|food}]/v`,
		String.raw`/[\w\q{foo|foot|food}]/vi`,
		String.raw`/[\w\q{foo|bar|baz}]/vi`,
		String.raw`/[\q{foo|bar|baz}]/vi`,
	].map(parseCharacterClass);

	function test1(name: string, testFn: (a: UnicodeSet) => boolean): void {
		it(name, function () {
			for (const { literal, set } of testCases) {
				let result;
				try {
					result = testFn(set);
				} catch (e) {
					assert.fail(`Failed for A=${literal}: ${e}`);
				}
				assert.isTrue(result, `Failed for A=${literal}`);
			}
		});
	}
	function test2(name: string, testFn: (a: UnicodeSet, b: UnicodeSet) => boolean): void {
		it(name, function () {
			for (const a of testCases) {
				for (const b of testCases) {
					const errorPrefix = `Failed for A=${a.literal} B=${b.literal}`;
					let result;
					try {
						result = testFn(a.set, b.set);
					} catch (e) {
						assert.fail(`${errorPrefix}: ${e}`);
					}
					if (!result) {
						testFn(a.set, b.set);
					}
					assert.isTrue(result, errorPrefix);
				}
			}
		});
	}
	// function test3(name: string, testFn: (a: UnicodeSet, b: UnicodeSet, c: UnicodeSet) => boolean): void {}

	describe("Invariants", function () {
		test1("A = A", a => a.equals(a));
		test1("A ⊆ A", a => a.isSubsetOf(a));
		test1("A ∪ A = A", a => a.union(a).equals(a));
		test1("A ∩ A = A", a => a.intersect(a).equals(a));
		test1("A ∪ A ⊆ A", a => a.union(a).isSubsetOf(a));
		test1("A ∩ A ⊆ A", a => a.intersect(a).isSubsetOf(a));
		test1("A - A = ∅", a => a.without(a).isEmpty);

		test2("A = B ↔ B = A", (a, b) => a.equals(b) === b.equals(a));
		test2("A = B ↔ A = B (chars)", (a, b) => {
			if (!a.accept.isEmpty) {
				return true;
			}
			return a.equals(b) === b.equals(a.chars);
		});
		test2("isDisjoint(A, B) ↔ isDisjoint(B, A)", (a, b) => a.isDisjointWith(b) === b.isDisjointWith(a));
		test2("A = B ↔ A ⊆ B ∧ B ⊆ A", (a, b) => {
			const eq = a.equals(b);
			const aSubB = a.isSubsetOf(b);
			const bSubA = b.isSubsetOf(a);
			return eq === (aSubB && bSubA);
		});
		test2("A ∪ B = B ∪ A", (a, b) => !a.isCompatibleWith(b) || a.union(b).equals(b.union(a)));
		test2("A ∩ B = B ∩ A", (a, b) => !a.isCompatibleWith(b) || a.intersect(b).equals(b.intersect(a)));
		test2(
			"A - B = B - A ↔ A = B",
			(a, b) => !a.isCompatibleWith(b) || a.without(b).equals(b.without(a)) === a.equals(b)
		);
		test2("A ∪ B ⊇ A ∧ A ∪ B ⊇ B", (a, b) => {
			if (!a.isCompatibleWith(b)) {
				return true;
			}
			const union = a.union(b);
			const uSuperA = union.isSupersetOf(a);
			const uSuperB = union.isSupersetOf(b);
			return uSuperA && uSuperB;
		});
	});

	it("equals", function () {
		const results: string[] = [];
		for (let i = 0; i < testCases.length; i++) {
			for (let j = i + 1; j < testCases.length; j++) {
				const a = testCases[i];
				const b = testCases[j];
				const eq = a.set.equals(b.set);

				const message = `${eq ? "✔️" : "❌"}  ${a.literal} = ${b.literal}`;
				results.push(message);
			}
		}

		assertEqualSnapshot(this, results.join("\n"));
	});

	it("isSupersetOf", function () {
		const results: string[] = [];
		for (let i = 0; i < testCases.length; i++) {
			for (let j = 0; j < testCases.length; j++) {
				const a = testCases[i];
				const b = testCases[j];
				const eq = a.set.isSupersetOf(b.set);

				const message = `${eq ? "✔️" : "❌"}  ${a.literal} ⊇ ${b.literal}`;
				results.push(message);
			}
		}

		assertEqualSnapshot(this, results.join("\n"));
	});

	it("isDisjointWith", function () {
		const results: string[] = [];
		for (let i = 0; i < testCases.length; i++) {
			for (let j = i + 1; j < testCases.length; j++) {
				const a = testCases[i];
				const b = testCases[j];
				const eq = a.set.isDisjointWith(b.set);

				const message = `${eq ? "✔️" : "❌"}  ${a.literal} ∩ ${b.literal} = ∅`;
				results.push(message);
			}
		}

		assertEqualSnapshot(this, results.join("\n"));
	});
});
