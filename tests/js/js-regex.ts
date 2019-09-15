import { assert } from "chai";
import { parse } from "../../src/js/js-regex";
import { toPatternString } from "../../src/ast";

describe('JS Regex', function () {

	interface TestCase {
		literal: { source: string; flags: string };
		expected: string;
	}

	function test(cases: Iterable<TestCase>): void {
		for (const { literal, expected } of cases) {
			it(`/${literal.source}/${literal.flags}`, function () {
				assert.strictEqual(toPatternString(parse(literal).pattern), expected);
			});
		}
	}

	const cases: TestCase[] = [
		{
			literal: /fo[o]/,
			expected: "[66][6f][6f]"
		},
		{
			literal: /a(b|(?:c|d)(?:))(e)/,
			expected: "[61](?:[62]|(?:[63]|[64]))[65]"
		},
		{
			literal: /ab?c*d+e{3}f{5,8}g{3,}/,
			expected: "[61][62]?[63]*[64]+[65]{3}[66]{5,8}[67]{3,}"
		},
		{
			literal: /\w\W/,
			expected: "[30..39, 41..5a, 5f, 61..7a][0..2f, 3a..40, 5b..5e, 60, 7b..ffff]"
		},
		{
			literal: /\w\W/i,
			expected: "[30..39, 41..5a, 5f, 61..7a][0..2f, 3a..40, 5b..5e, 60, 7b..ffff]"
		},
		{
			literal: /\d\D/,
			expected: "[30..39][0..2f, 3a..ffff]"
		},
		{
			literal: /\s\S/,
			expected: "[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff][0..8, e..1f, 21..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff]"
		},
		{
			literal: /./,
			expected: "[0..9, b..c, e..2027, 202a..ffff]"
		},
		{
			literal: /./s,
			expected: "[0..ffff]"
		},
		{
			literal: /./su,
			expected: "[0..10ffff]"
		},
		{
			literal: /[\s\S]/,
			expected: "[0..ffff]"
		},
		{
			literal: /[\s\S]/u,
			expected: "[0..10ffff]"
		},
		{
			literal: /[^]/u,
			expected: "[0..10ffff]"
		},
		{
			literal: /[^\D][^\d]/,
			expected: "[30..39][0..2f, 3a..ffff]"
		},
		{
			literal: /[^a-cx-z]/,
			expected: "[0..60, 64..77, 7b..ffff]"
		},
		{
			literal: /a[A][aA]/i,
			expected: "[41, 61][41, 61][41, 61]"
		},
		{
			literal: /[^a-cx-z]/i,
			expected: "[0..40, 44..57, 5b..60, 64..77, 7b..ffff]"
		},
		{
			literal: /^/,
			expected: "(?<![0..ffff])"
		},
		{
			literal: /^/m,
			expected: "(?<![0..9, b..c, e..2027, 202a..ffff])"
		},
		{
			literal: /^/u,
			expected: "(?<![0..10ffff])"
		},
		{
			literal: /$/,
			expected: "(?![0..ffff])"
		},
		{
			literal: /$/m,
			expected: "(?![0..9, b..c, e..2027, 202a..ffff])"
		},
		{
			literal: /$/u,
			expected: "(?![0..10ffff])"
		},
		{
			literal: /\b/,
			expected: "(?:(?<![30..39, 41..5a, 5f, 61..7a])(?=[30..39, 41..5a, 5f, 61..7a])|(?<=[30..39, 41..5a, 5f, 61..7a])(?![30..39, 41..5a, 5f, 61..7a]))"
		},
		{
			literal: /\B/,
			expected: "(?:(?<=[30..39, 41..5a, 5f, 61..7a])(?=[30..39, 41..5a, 5f, 61..7a])|(?<![30..39, 41..5a, 5f, 61..7a])(?![30..39, 41..5a, 5f, 61..7a]))"
		},
		{
			literal: /(?=(?=a))/,
			expected: "(?=(?=[61]))"
		},
		{
			literal: /(?!a*)/,
			expected: "(?![61]*)"
		},
		{
			literal: /a+|b+|c+/,
			expected: "[61]+|[62]+|[63]+"
		},
	];

	describe('parse', function () {
		test(cases);
	});

});
