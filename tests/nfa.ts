import { NFA } from "../src/nfa";
import { assert } from "chai";
import { parse } from "../src/js/js-regex";


describe('NFA', function () {

	describe('fromRegex', function () {

		test([
			{
				literal: /a+/,
				expected: `
					(0) -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a|b)+c/,
				expected: `
					(0) -> (1) : 61..62

					(1) -> (1) : 61..62
					    -> [2] : 63

					[2] -> none`
			},
			{
				literal: /a*b*c*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62
					    -> [3] : 63

					[1] -> [1] : 61
					    -> [2] : 62
					    -> [3] : 63

					[2] -> [2] : 62
					    -> [3] : 63

					[3] -> [3] : 63`
			},
			{
				literal: /a{4}/,
				expected: `
					(0) -> (1) : 61

					(1) -> (2) : 61

					(2) -> (3) : 61

					(3) -> [4] : 61

					[4] -> none`
			},
			{
				literal: /(a|){4}/,
				expected: `
					[0] -> [1] : 61

					[1] -> [2] : 61

					[2] -> [3] : 61

					[3] -> [4] : 61

					[4] -> none`
			},
			{
				literal: /a{2,4}/,
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> [3] : 61

					[3] -> [4] : 61

					[4] -> none`
			},
			{
				literal: /a{2,6}/,
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> [3] : 61

					[3] -> [4] : 61

					[4] -> [5] : 61

					[5] -> [6] : 61

					[6] -> none`
			},
			{
				literal: /(ab){0,3}/,
				expected: `
					[0] -> (1) : 61

					(1) -> [2] : 62

					[2] -> (3) : 61

					(3) -> [4] : 62

					[4] -> (5) : 61

					(5) -> [6] : 62

					[6] -> none`
			},
			{
				literal: /(){100,1000}/,
				expected: `
					[0] -> none`
			},
			{
				literal: /a+|/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /a*/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a|)+/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a*)+/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /((a*)+)?/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /(a|b)?c/,
				expected: `
					(0) -> (1) : 61..62
					    -> [2] : 63

					(1) -> [2] : 63

					[2] -> none`
			},
			{
				literal: /()*/,
				expected: `
					[0] -> none`
			},
			{
				literal: /a*|b*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61

					[2] -> [2] : 62`
			},
			{
				literal: /a+|b+|c+/,
				expected: `
					(0) -> [1] : 61
					    -> [2] : 62
					    -> [3] : 63

					[1] -> [1] : 61

					[2] -> [2] : 62

					[3] -> [3] : 63`
			},
			{
				literal: /(a*|b*)+/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61
					    -> [2] : 62

					[2] -> [1] : 61
					    -> [2] : 62`
			},
			{
				literal: /[^\s\S]/,
				expected: `
					(0) -> none`
			},
			{
				literal: /ab[^\s\S]ba/,
				expected: `
					(0) -> none`
			},
			{
				literal: /(a|[^\s\S]|b[^\s\S]b|[^\s\S])a/,
				expected: `
					(0) -> (1) : 61

					(1) -> [2] : 61

					[2] -> none`
			},
			{
				literal: /[^\s\S]+/,
				expected: `
					(0) -> none`
			},
			{
				literal: /[^\s\S]*/,
				expected: `
					[0] -> none`
			},
			{
				literal: /[^\s\S]?/,
				expected: `
					[0] -> none`
			},
		]);

		interface TestCase {
			literal: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, expected } of cases) {
				it(literalToString(literal), function () {
					const expr = parse(literal).pattern;
					assert.strictEqual(NFA.fromRegex(expr).toString(), removeIndentation(expected));
				});
			}
		}

	});

	describe('union', function () {

		test([
			{
				literal: /a/,
				other: /b/,
				expected: `
					(0) -> [1] : 61..62

					[1] -> none`
			},
			{
				literal: /ab|ba/,
				other: /aa|bb/,
				expected: `
					(0) -> (1) : 61
					    -> (2) : 62
					    -> (3) : 61
					    -> (4) : 62

					(1) -> [5] : 62

					(2) -> [5] : 61

					(3) -> [5] : 61

					(4) -> [5] : 62

					[5] -> none`
			},
			{
				literal: /a/,
				other: /()/,
				expected: `
					[0] -> [1] : 61

					[1] -> none`
			},
			{
				literal: /a/,
				other: /b*/,
				expected: `
					[0] -> [1] : 61
					    -> [2] : 62

					[1] -> none

					[2] -> [2] : 62`
			},
			{
				literal: /a+/,
				other: /b+/,
				expected: `
					(0) -> [1] : 61
					    -> [2] : 62

					[1] -> [1] : 61

					[2] -> [2] : 62`
			},
			{
				literal: /a+/,
				other: /()/,
				expected: `
					[0] -> [1] : 61

					[1] -> [1] : 61`
			},
			{
				literal: /a|b|c{2}/,
				other: /a{2}|b{2}|c/,
				expected: `
					(0) -> (1) : 63
					    -> (2) : 61
					    -> (3) : 62
					    -> [4] : 61..63

					(1) -> [4] : 63

					(2) -> [4] : 61

					(3) -> [4] : 62

					[4] -> none`
			},
		]);

		interface TestCase {
			literal: Literal;
			other: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, other, expected } of cases) {
				it(`${literalToString(literal)} ∪ ${literalToString(other)}`, function () {
					const nfa = NFA.fromRegex(parse(literal).pattern);
					const nfaOther = NFA.fromRegex(parse(other).pattern);
					assert.strictEqual(nfa.union(nfaOther).toString(), removeIndentation(expected));
				});
			}
		}

	});

});


interface Literal {
	source: string;
	flags: string;
}

function literalToString(literal: Literal): string {
	return `/${literal.source}/${literal.flags}`;
}

function removeIndentation(expected: string): string {
	// remove trailing spaces and initial line breaks
	expected = expected.replace(/^[\r\n]+|\s+$/g, "");

	const lines = expected.split(/\r\n?|\n/g);
	const indentation = /^[ \t]*/.exec(lines[0])![0];

	if (indentation) {
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];
			if (line.startsWith(indentation)) {
				line = line.substr(indentation.length);
			}
			lines[i] = line;
		}
	}

	return lines.join("\n");
}
