import { assert } from "chai";
import { CharSet } from "../../src/char-set";
import { Literal } from "./fa";
import { Parser } from "../../src/js";


export function readableIntervalString(chars: CharSet): string {
	const makeReadable = (c: number): string | number => {
		if (/^[\w]$/.test(String.fromCodePoint(c))) {
			return String.fromCodePoint(c);
		} else {
			return c;
		}
	};

	return JSON.stringify(chars.ranges.map(({ min, max }) => {
		if (min === max) {
			return makeReadable(min);
		} else {
			return [makeReadable(min), makeReadable(max)]
		}
	})).replace(/"/g, "'");
}

export function charsFromRegex(literal: Literal): CharSet {
	const parser = new Parser(literal);
	const { expression } = parser.parse();

	assert.equal(expression.alternatives.length, 1);
	const elements = expression.alternatives[0].elements;
	assert.equal(elements.length, 1);
	const element = elements[0];
	if (element.type === "CharacterClass") {
		return element.characters;
	}
	assert.fail("Only element should have been a character");
}
