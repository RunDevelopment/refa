import { assert } from "chai";
import { Parser } from "../../src/js";
import { toPatternString } from "../../src/ast";

describe("JS createCharSet", function () {
	interface TestCase {
		literal: { source: string; flags: string };
		expected: string | Error;
	}

	function test(cases: Iterable<TestCase>): void {
		for (const { literal, expected } of cases) {
			it(`/${literal.source}/${literal.flags}`, function () {
				if (typeof expected === "string") {
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
			literal: /^/,
			expected: "(?<![0..ffff])",
		},
		{
			literal: /^/m,
			expected: "(?<![0..9, b..c, e..2027, 202a..ffff])",
		},
		{
			literal: /^/u,
			expected: "(?<![0..10ffff])",
		},
		{
			literal: /^/mu,
			expected: "(?<![0..9, b..c, e..2027, 202a..10ffff])",
		},
		{
			literal: /^/ms,
			expected: "(?<![0..9, b..c, e..2027, 202a..ffff])",
		},

		{
			literal: /$/,
			expected: "(?![0..ffff])",
		},
		{
			literal: /$/m,
			expected: "(?![0..9, b..c, e..2027, 202a..ffff])",
		},
		{
			literal: /$/u,
			expected: "(?![0..10ffff])",
		},
		{
			literal: /$/mu,
			expected: "(?![0..9, b..c, e..2027, 202a..10ffff])",
		},
		{
			literal: /$/ms,
			expected: "(?![0..9, b..c, e..2027, 202a..ffff])",
		},

		{
			literal: /\b/,
			expected:
				"(?:(?<![30..39, 41..5a, 5f, 61..7a])(?=[30..39, 41..5a, 5f, 61..7a])|(?<=[30..39, 41..5a, 5f, 61..7a])(?![30..39, 41..5a, 5f, 61..7a]))",
		},
		{
			literal: /\b/i,
			expected:
				"(?:(?<![30..39, 41..5a, 5f, 61..7a])(?=[30..39, 41..5a, 5f, 61..7a])|(?<=[30..39, 41..5a, 5f, 61..7a])(?![30..39, 41..5a, 5f, 61..7a]))",
		},
		{
			literal: /\b/u,
			expected:
				"(?:(?<![30..39, 41..5a, 5f, 61..7a])(?=[30..39, 41..5a, 5f, 61..7a])|(?<=[30..39, 41..5a, 5f, 61..7a])(?![30..39, 41..5a, 5f, 61..7a]))",
		},
		{
			literal: /\b/iu,
			expected:
				"(?:(?<![30..39, 41..5a, 5f, 61..7a, 17f, 212a])(?=[30..39, 41..5a, 5f, 61..7a, 17f, 212a])|(?<=[30..39, 41..5a, 5f, 61..7a, 17f, 212a])(?![30..39, 41..5a, 5f, 61..7a, 17f, 212a]))",
		},

		{
			literal: /\B/,
			expected:
				"(?:(?<=[30..39, 41..5a, 5f, 61..7a])(?=[30..39, 41..5a, 5f, 61..7a])|(?<![30..39, 41..5a, 5f, 61..7a])(?![30..39, 41..5a, 5f, 61..7a]))",
		},
		{
			literal: /\B/i,
			expected:
				"(?:(?<=[30..39, 41..5a, 5f, 61..7a])(?=[30..39, 41..5a, 5f, 61..7a])|(?<![30..39, 41..5a, 5f, 61..7a])(?![30..39, 41..5a, 5f, 61..7a]))",
		},
		{
			literal: /\B/u,
			expected:
				"(?:(?<=[30..39, 41..5a, 5f, 61..7a])(?=[30..39, 41..5a, 5f, 61..7a])|(?<![30..39, 41..5a, 5f, 61..7a])(?![30..39, 41..5a, 5f, 61..7a]))",
		},
		{
			literal: /\B/iu,
			expected:
				"(?:(?<=[30..39, 41..5a, 5f, 61..7a, 17f, 212a])(?=[30..39, 41..5a, 5f, 61..7a, 17f, 212a])|(?<![30..39, 41..5a, 5f, 61..7a, 17f, 212a])(?![30..39, 41..5a, 5f, 61..7a, 17f, 212a]))",
		},
	];

	test(cases);
});
