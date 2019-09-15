import { assert } from "chai";
import { CASE_VARIATIONS } from "../src/char-util";

describe("Char util", function () {

	function assertCaseVariations(char: string, variations: string | undefined): void {
		assert.strictEqual(char.codePointAt(1), undefined, 'Only 1 character expected');

		const expected = variations === undefined ? undefined : [...variations].map(s => s.codePointAt(0));
		assert.deepStrictEqual(CASE_VARIATIONS.get(char.codePointAt(0)!), expected)
	}

	it('should know all case variation', function () {
		assertCaseVariations("a", "A");
		assertCaseVariations("A", "a");
		assertCaseVariations("í", "Í");
		assertCaseVariations("ä", "Ä");
		assertCaseVariations("Ä", "ä");
	});

});
