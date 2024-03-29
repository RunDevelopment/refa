import { assert } from "chai";
import { CharSet } from "../../src/char-set";
import { Literal, Parser } from "../../src/js";

export function charsFromRegex(literal: Literal): CharSet {
	const parser = Parser.fromLiteral(literal);
	const { expression } = parser.parse({ simplify: false });

	assert.equal(expression.alternatives.length, 1);
	const elements = expression.alternatives[0].elements;
	assert.equal(elements.length, 1);
	const element = elements[0];
	if (element.type === "CharacterClass") {
		return element.characters;
	}
	assert.fail("Only element should have been a character");
}
