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
			{ literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/ },
			{ literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/i },
			{ literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/u },
			{ literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/iu },

			// \w \W

			{ literal: /\w/ },
			{ literal: /\w/i },
			{ literal: /\w/u },
			{ literal: /\w/iu },
			{ literal: { source: String.raw`\w`, flags: "v" } },
			{ literal: { source: String.raw`\w`, flags: "iv" } },
			{ literal: /\W/ },
			{ literal: /\W/i },
			{ literal: /\W/u },
			{ literal: /\W/iu },
			{ literal: { source: String.raw`\W`, flags: "v" } },
			{ literal: { source: String.raw`\W`, flags: "iv" } },

			// \d \D

			{ literal: /\d/ },
			{ literal: /\d/i },
			{ literal: /\d/u },
			{ literal: /\d/iu },

			{ literal: /\D/ },
			{ literal: /\D/i },
			{ literal: /\D/u },
			{ literal: /\D/iu },

			// \s \S

			{ literal: /\s/ },
			{ literal: /\s/i },
			{ literal: /\s/u },
			{ literal: /\s/iu },

			{ literal: /\S/ },
			{ literal: /\S/i },
			{ literal: /\S/u },
			{ literal: /\S/iu },

			// . (dot)

			{ literal: /./ },
			{ literal: /./i },
			{ literal: /./m },
			{ literal: /./s },
			{ literal: /./u },
			{ literal: /./iu },
			{ literal: /./mu },
			{ literal: /./su },

			// character classes

			{ literal: /[\s\S]/ },
			{ literal: /[\s\S]/u },
			{ literal: /[^]/u },
			{ literal: /[^\D][^\d]/ },
			{ literal: /[^a-cx-z]/ },
			{ literal: /a[A][aA]/i },
			{ literal: /[^a-cx-z]/i },

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

			{ literal: /\p{ASCII}/u },
			{ literal: /\p{ASCII}/iu },
			{ literal: { source: String.raw`\p{ASCII}`, flags: "iv" } },
			{ literal: /\P{ASCII}/u },
			{ literal: /\P{ASCII}/iu },
			{ literal: { source: String.raw`\P{ASCII}`, flags: "iv" } },

			{ literal: /\p{Any}/u },
			{ literal: /\p{Any}/iu },
			{ literal: /\P{Any}/u },
			{ literal: /\P{Any}/iu },

			{ literal: /\p{General_Category=Control}/u },
			{ literal: /\p{gc=Control}/u },
			{ literal: /\p{Control}/u },
			{ literal: /\p{Cc}/u },

			{ literal: /\p{Emoji_Presentation}/u },

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
			{ literal: { source: String.raw`\p{Ll}`, flags: "iv" } },
			{ literal: { source: String.raw`\P{Ll}`, flags: "iv" } },
			{ literal: /[^\p{Ll}]/u },
			{ literal: /[^\P{Ll}]/u },
			{ literal: /[^\p{Ll}]/iu },
			{ literal: /[^\P{Ll}]/iu },

			{ literal: { source: String.raw`[\w--\d]`, flags: "v" } },
			{ literal: { source: String.raw`[\w&&\d]`, flags: "v" } },
			{ literal: { source: String.raw`[\w&&[\d\q{a|foo}]]`, flags: "v" } },
			{ literal: { source: String.raw`[\d\q{a|foo|}]`, flags: "v" } },
			{ literal: { source: String.raw`[^\d\q{a|b}]`, flags: "v" } },
			{ literal: { source: String.raw`[^\q{ab}]`, flags: "v" }, expected: Error },
			{ literal: { source: String.raw`[^\W--%]`, flags: "v" } },

			{ literal: { source: "[[0-9]&&[0-9]]", flags: "v" } },
			{ literal: { source: "[[0-9]&&\\d]", flags: "v" } },
			{ literal: { source: "[[0-9]&&\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[[0-9]&&_]", flags: "v" } },
			{ literal: { source: "[[0-9]--[0-9]]", flags: "v" } },
			{ literal: { source: "[[0-9]--\\d]", flags: "v" } },
			{ literal: { source: "[[0-9]--\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[[0-9]--_]", flags: "v" } },
			{ literal: { source: "[[0-9][0-9]]", flags: "v" } },
			{ literal: { source: "[[0-9]\\d]", flags: "v" } },
			{ literal: { source: "[[0-9]\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[[0-9]_]", flags: "v" } },
			{ literal: { source: "[\\d&&[0-9]]", flags: "v" } },
			{ literal: { source: "[\\d&&\\d]", flags: "v" } },
			{ literal: { source: "[\\d&&\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[\\d&&_]", flags: "v" } },
			{ literal: { source: "[\\d--[0-9]]", flags: "v" } },
			{ literal: { source: "[\\d--\\d]", flags: "v" } },
			{ literal: { source: "[\\d--\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[\\d--_]", flags: "v" } },
			{ literal: { source: "[\\d[0-9]]", flags: "v" } },
			{ literal: { source: "[\\d\\d]", flags: "v" } },
			{ literal: { source: "[\\d\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[\\d_]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}&&[0-9]]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}&&\\d]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}&&\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}&&_]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}--[0-9]]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}--\\d]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}--\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}--_]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}[0-9]]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}\\d]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[\\q{0|2|4|9\\uFE0F\\u20E3}_]", flags: "v" } },
			{ literal: { source: "[_&&[0-9]]", flags: "v" } },
			{ literal: { source: "[_&&\\d]", flags: "v" } },
			{ literal: { source: "[_&&\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[_&&_]", flags: "v" } },
			{ literal: { source: "[_--[0-9]]", flags: "v" } },
			{ literal: { source: "[_--\\d]", flags: "v" } },
			{ literal: { source: "[_--\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[_--_]", flags: "v" } },
			{ literal: { source: "[_[0-9]]", flags: "v" } },
			{ literal: { source: "[_\\d]", flags: "v" } },
			{ literal: { source: "[_\\q{0|2|4|9\\uFE0F\\u20E3}]", flags: "v" } },
			{ literal: { source: "[__]", flags: "v" } },
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
