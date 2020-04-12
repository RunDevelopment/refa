import { assert } from "chai";
import { Parser, ParseOptions } from "../../src/js";
import { toPatternString } from "../../src/ast";

describe("JS Regex", function () {

	interface TestCase {
		literal: { source: string; flags: string };
		options?: ParseOptions;
		expected: string | typeof Error;
	}

	function test(cases: Iterable<TestCase>): void {
		for (const { literal, expected, options } of cases) {
			const optionsStr = options ? " " + JSON.stringify(options) : "";
			it(`/${literal.source}/${literal.flags}${optionsStr}`, function () {
				const parser = new Parser(literal);
				if (typeof expected === "string") {
					assert.strictEqual(toPatternString(parser.parse(options).expression), expected);
				} else {
					assert.throws(() => {
						parser.parse(options);
					});
				}
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

		// properly remove unreachable parts

		{
			literal: /ab|c\b/,
			options: {
				lookarounds: "disable"
			},
			expected: "[61][62]"
		},
		{
			literal: /ab\b|c(?:\b)/,
			options: {
				lookarounds: "disable"
			},
			expected: "[]"
		},
		{
			literal: /(a*)(?:[^\s\S]\1{0})/,
			options: {
				backreferences: "throw"
			},
			expected: "[]"
		},
		{
			literal: /(a*)[^\s\S]\1/,
			options: {
				backreferences: "throw"
			},
			expected: "[]"
		},
		{
			literal: /(a*)\1[^\s\S]/,
			options: {
				backreferences: "throw"
			},
			expected: "[]"
		},
		{
			literal: /(a*)(?:[^\s\S]\1)/,
			options: {
				backreferences: "throw"
			},
			expected: "[]"
		},
		{
			literal: /(a*)(?:\1{0})/,
			options: {
				backreferences: "throw"
			},
			expected: "[61]*"
		},
		{
			literal: /(a*)(?:\b\1|$)/,
			options: {
				backreferences: "throw",
				lookarounds: "disable"
			},
			expected: "[]"
		},
		{
			literal: /a(?=[^\s\S]abc|[^\s\S])/,
			expected: "[]"
		},
		{
			literal: /a(?![^\s\S]abc|[^\s\S])/,
			expected: "[61]"
		},
		{
			literal: /(?:)?/,
			expected: ""
		},
		{
			literal: /(?:[^\s\S])?/,
			expected: ""
		},
		{
			literal: /(?:[^\s\S])+/,
			expected: "[]"
		},
		{
			literal: /(?:\b|abc$)+/,
			options: {
				lookarounds: "disable"
			},
			expected: "[]"
		},
	];

	describe("parse", function () {
		test(cases);
	});

	describe("parse options: lookaround", function () {
		test([
			{
				literal: /(?=abc)a|b/,
				options: {
					lookarounds: "parse"
				},
				expected: "(?=[61][62][63])[61]|[62]"
			},
			{
				literal: /(?=abc)a|b/,
				options: {
					lookarounds: "disable"
				},
				expected: "[62]"
			},
			{
				literal: /(?=abc)a|b/,
				options: {
					lookarounds: "throw",
				},
				expected: Error
			},
		]);
	});

	describe("parse options: backreferences", function () {
		test([
			{
				literal: /(a*)b\1/,
				options: {
					backreferences: "resolve"
				},
				expected: "[]"
			},
			{
				literal: /(a*)b\1/,
				options: {
					backreferences: "disable"
				},
				expected: "[]"
			},
			{
				literal: /(a*)b\1/,
				options: {
					backreferences: "throw"
				},
				expected: Error
			},

			{
				literal: /()b\1/,
				options: {
					backreferences: "resolve"
				},
				expected: "[62]"
			},
			{
				literal: /()b\1/,
				options: {
					backreferences: "disable"
				},
				expected: "[62]"
			},
			{
				literal: /()b\1/,
				options: {
					backreferences: "throw"
				},
				expected: "[62]"
			},

			{
				literal: /()b\1/,
				options: {
					backreferences: "resolve",
					disableOptimizations: true
				},
				expected: "(?:)[62]"
			},
			{
				literal: /()b\1/,
				options: {
					backreferences: "disable",
					disableOptimizations: true
				},
				expected: "(?:)[62][]"
			},
			{
				literal: /()b\1/,
				options: {
					backreferences: "throw",
					disableOptimizations: true
				},
				expected: Error
			},

			{
				literal: /(a*)[^\s\S]|b\1/,
				options: {
					backreferences: "resolve"
				},
				expected: "[62]"
			},
			{
				literal: /(a*)[^\s\S]|b\1/,
				options: {
					backreferences: "disable"
				},
				expected: "[62]"
			},
			{
				literal: /(a*)[^\s\S]|b\1/,
				options: {
					backreferences: "throw"
				},
				expected: "[62]"
			},
		]);
	});

	describe("parse constant backreferences", function () {
		test([
			// backreferences which can only ever be the empty
			{
				literal: /\1(a*)/,
				expected: "[61]*"
			},
			{
				literal: /(a*\1)/,
				expected: "[61]*"
			},
			{
				literal: /(a*\1*)/,
				expected: "[61]*"
			},
			{
				literal: /()\1/,
				expected: ""
			},
			{
				literal: /((?=a))\1/,
				expected: "(?=[61])"
			},
			{
				literal: /((?=a)|()*|a{0})\1/,
				expected: "(?:(?=[61])||)"
			},
			{
				literal: /(a*)|b\1/,
				expected: "[61]*|[62]"
			},
			{
				literal: /(?:\1(a)){2}/,
				expected: "[61]{2}"
			},

			// backreferences which only match a constant word

			{
				literal: /(a)\1?/,
				expected: "[61][61]?"
			},
			{
				literal: /(a)[^\s\S]|(a\1)\2/,
				expected: "[61][61]"
			},
			{
				literal: /(")(?:(?!\1)[^\\\r\n]|\\.)*\1/,
				expected: "[22](?:(?![22])[0..9, b..c, e..5b, 5d..ffff]|[5c][0..9, b..c, e..2027, 202a..ffff])*[22]"
			},

			// where it can't be done

			{
				literal: /(a)?\1/,
				expected: "[]"
			},
			{
				literal: /(a)*\1/,
				expected: "[]"
			},
			{
				literal: /(?:b|(a))+\1/,
				expected: "[]"
			},
		]);
	});

});
