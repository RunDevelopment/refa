/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from "chai";
import { CharacterClass } from "../../src/ast";
import { CharSet } from "../../src/char-set";
import { Literal, Parser } from "../../src/js";
import { toPatternString } from "../helper/literal-to-string";
import { assertEqualSnapshot } from "../helper/snapshot";

describe("JS createCharSet", function () {
	describe("Literal tests", function () {
		interface TestCase {
			literal: Literal;
			expected?: string | typeof Error;
		}

		function test(cases: Iterable<TestCase>): void {
			for (const { literal, expected } of cases) {
				it(`/${literal.source}/${literal.flags}`, function () {
					if (expected === undefined) {
						const parser = Parser.fromLiteral(literal);
						assertEqualSnapshot(this, toPatternString(parser.parse().expression));
					} else if (typeof expected === "string") {
						const parser = Parser.fromLiteral(literal);
						assert.strictEqual(toPatternString(parser.parse().expression), expected);
					} else {
						assert.throws(() => {
							const parser = Parser.fromLiteral(literal);
							parser.parse();
						});
					}
				});
			}
		}

		const cases: TestCase[] = [
			{
				literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/,
				expected:
					"[61][62][63][64][65][66][67][68][69][6a][6b][6c][6d][6e][6f][70][71][72][73][74][75][76][77][78][79][7a][20][41][42][43][44][45][46][47][48][49][4a][4b][4c][4d][4e][4f][50][51][52][53][54][55][56][57][58][59][5a]",
			},
			{
				literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/i,
				expected:
					"[41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a][20][41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a]",
			},
			{
				literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/u,
				expected:
					"[61][62][63][64][65][66][67][68][69][6a][6b][6c][6d][6e][6f][70][71][72][73][74][75][76][77][78][79][7a][20][41][42][43][44][45][46][47][48][49][4a][4b][4c][4d][4e][4f][50][51][52][53][54][55][56][57][58][59][5a]",
			},
			{
				literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/iu,
				expected:
					"[41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b, 212a][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73, 17f][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a][20][41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b, 212a][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73, 17f][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a]",
			},

			// \w \W

			{
				literal: /\w/,
				expected: "[30..39, 41..5a, 5f, 61..7a]",
			},
			{
				literal: /\w/i,
				expected: "[30..39, 41..5a, 5f, 61..7a]",
			},
			{
				literal: /\w/u,
				expected: "[30..39, 41..5a, 5f, 61..7a]",
			},
			{
				literal: /\w/iu,
				expected: "[30..39, 41..5a, 5f, 61..7a, 17f, 212a]",
			},
			{
				literal: /\W/,
				expected: "[0..2f, 3a..40, 5b..5e, 60, 7b..ffff]",
			},
			{
				literal: /\W/i,
				expected: "[0..2f, 3a..40, 5b..5e, 60, 7b..ffff]",
			},
			{
				literal: /\W/u,
				expected: "[0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]",
			},
			{
				literal: /\W/iu,
				expected: "[0..2f, 3a..40, 5b..5e, 60, 7b..17e, 180..2129, 212b..10ffff]",
			},

			// \d \D

			{
				literal: /\d/,
				expected: "[30..39]",
			},
			{
				literal: /\d/i,
				expected: "[30..39]",
			},
			{
				literal: /\d/u,
				expected: "[30..39]",
			},
			{
				literal: /\d/iu,
				expected: "[30..39]",
			},

			{
				literal: /\D/,
				expected: "[0..2f, 3a..ffff]",
			},
			{
				literal: /\D/i,
				expected: "[0..2f, 3a..ffff]",
			},
			{
				literal: /\D/u,
				expected: "[0..2f, 3a..10ffff]",
			},
			{
				literal: /\D/iu,
				expected: "[0..2f, 3a..10ffff]",
			},

			// \s \S

			{
				literal: /\s/,
				expected: "[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]",
			},
			{
				literal: /\s/i,
				expected: "[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]",
			},
			{
				literal: /\s/u,
				expected: "[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]",
			},
			{
				literal: /\s/iu,
				expected: "[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]",
			},

			{
				literal: /\S/,
				expected:
					"[0..8, e..1f, 21..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff]",
			},
			{
				literal: /\S/i,
				expected:
					"[0..8, e..1f, 21..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff]",
			},
			{
				literal: /\S/u,
				expected:
					"[0..8, e..1f, 21..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..10ffff]",
			},
			{
				literal: /\S/iu,
				expected:
					"[0..8, e..1f, 21..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..10ffff]",
			},

			// . (dot)

			{
				literal: /./,
				expected: "[0..9, b..c, e..2027, 202a..ffff]",
			},
			{
				literal: /./i,
				expected: "[0..9, b..c, e..2027, 202a..ffff]",
			},
			{
				literal: /./m,
				expected: "[0..9, b..c, e..2027, 202a..ffff]",
			},
			{
				literal: /./s,
				expected: "[0..ffff]",
			},
			{
				literal: /./u,
				expected: "[0..9, b..c, e..2027, 202a..10ffff]",
			},
			{
				literal: /./iu,
				expected: "[0..9, b..c, e..2027, 202a..10ffff]",
			},
			{
				literal: /./mu,
				expected: "[0..9, b..c, e..2027, 202a..10ffff]",
			},
			{
				literal: /./su,
				expected: "[0..10ffff]",
			},

			// character classes

			{
				literal: /[\s\S]/,
				expected: "[0..ffff]",
			},
			{
				literal: /[\s\S]/u,
				expected: "[0..10ffff]",
			},
			{
				literal: /[^]/u,
				expected: "[0..10ffff]",
			},
			{
				literal: /[^\D][^\d]/,
				expected: "[30..39][0..2f, 3a..ffff]",
			},
			{
				literal: /[^a-cx-z]/,
				expected: "[0..60, 64..77, 7b..ffff]",
			},
			{
				literal: /a[A][aA]/i,
				expected: "[41, 61][41, 61][41, 61]",
			},
			{
				literal: /[^a-cx-z]/i,
				expected: "[0..40, 44..57, 5b..60, 64..77, 7b..ffff]",
			},

			// Unicode property escapes

			{
				// not in unicode mode
				literal: /\p{ASCII}/,
				expected: "[70][7b][41][53][43][49][49][7d]",
			},
			{
				// property names are case sensitive
				// (invalid property names/values are a JS syntax error, so we have to use object literals)
				literal: { source: String.raw`\p{ascii}`, flags: "u" },
				expected: Error,
			},
			{
				// property names are case sensitive
				literal: { source: String.raw`\p{any}`, flags: "u" },
				expected: Error,
			},
			{
				// not a valid binary property name or property value
				literal: { source: String.raw`\p{General_Category}`, flags: "u" },
				expected: Error,
			},

			{
				literal: /\p{ASCII}/u,
				expected: "[0..7f]",
			},
			{
				literal: /\p{ASCII}/iu,
				expected: "[0..7f, 17f, 212a]",
			},
			{
				literal: /\P{ASCII}/u,
				expected: "[80..10ffff]",
			},
			{
				literal: /\P{ASCII}/iu,
				expected: "[4b, 53, 6b, 73, 80..10ffff]",
			},

			{
				literal: /\p{Any}/u,
				expected: "[0..10ffff]",
			},
			{
				literal: /\p{Any}/iu,
				expected: "[0..10ffff]",
			},
			{
				literal: /\P{Any}/u,
				expected: "[]",
			},
			{
				literal: /\P{Any}/iu,
				expected: "[]",
			},

			{
				literal: /\p{General_Category=Control}/u,
				expected: "[0..1f, 7f..9f]",
			},
			{
				literal: /\p{gc=Control}/u,
				expected: "[0..1f, 7f..9f]",
			},
			{
				literal: /\p{Control}/u,
				expected: "[0..1f, 7f..9f]",
			},
			{
				literal: /\p{Cc}/u,
				expected: "[0..1f, 7f..9f]",
			},

			{
				literal: /\p{Emoji_Presentation}/u,
			},

			{ literal: /\p{Script=Latin}/u },
			{ literal: /\p{Script=Latin}/iu },
			{ literal: /\p{Script=Grek}/u },
			{ literal: /\p{Script=Grek}/iu },
			{ literal: /\p{Script=Cyrillic}/u },
			{ literal: /\p{Script=Cyrillic}/iu },

			{ literal: /\p{Script=Thaana}/u },
			{ literal: /\p{Script_Extensions=Thaana}/u },

			{ literal: /\p{Ll}/u },
			{ literal: /\P{Ll}/u },
			{ literal: /\p{Ll}/iu },
			{ literal: /\P{Ll}/iu },
			{ literal: /[^\p{Ll}]/u },
			{ literal: /[^\P{Ll}]/u },
			{ literal: /[^\p{Ll}]/iu },
			{ literal: /[^\P{Ll}]/iu },
		];

		test(cases);
	});

	describe("Invariants", function () {
		const elements: Literal[] = [
			/a/u, // case-variant
			/;/u, // case-invariant

			// \w and \W behave different compared to normal characters and \p{}s

			/\p{ASCII}/u,
			/\P{ASCII}/u,
			/\P{ASCII}/u,
			/\P{Ll}/u,
			/\p{Ll}/u,
			/\P{L}/u,
			/\p{L}/u,
		];

		elements.forEach(test);

		function test(literal: Literal): void {
			it(`/${literal.source}/${literal.flags}`, function () {
				const cs = getCharSet(literal);
				const cs_i = getCharSet({ source: literal.source, flags: "iu" });

				assert.isTrue(cs.isSubsetOf(cs_i), "Invariant: The i flag only adds characters");

				assert.isTrue(
					getCharSet({ source: `[${literal.source}]`, flags: literal.flags }).equals(cs),
					"Invariant: [<something>] does nothing"
				);

				assert.isTrue(
					getCharSet({ source: `[^${literal.source}]`, flags: literal.flags }).equals(cs.negate()),
					"Invariant: [^<something>] simply negates its content"
				);

				assert.isTrue(
					getCharSet({ source: `[^${literal.source}]`, flags: "iu" }).equals(cs_i.negate()),
					"Invariant: [^<something>] simply negates its content"
				);
			});
		}

		function getCharSet(literal: Literal): CharSet {
			const { expression } = Parser.fromLiteral(literal).parse();

			assert.equal(expression.alternatives.length, 1);
			const [a] = expression.alternatives;
			assert.equal(a.elements.length, 1);
			const [e] = a.elements;
			assert.equal(e.type, "CharacterClass");
			return (e as CharacterClass).characters;
		}
	});
});
