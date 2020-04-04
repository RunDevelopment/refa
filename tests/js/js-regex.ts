import { assert } from "chai";
import { Parser, ParseOptions } from "../../src/js";
import { toPatternString } from "../../src/ast";

describe('JS Regex', function () {

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

	describe('parse', function () {
		test(cases);
	});

	describe('parse options: lookaround', function () {
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

	describe('parse options: backreferences', function () {
		test([
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
		]);
	});

	describe('parse finite backreferences', function () {
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
			// TODO: More complicated cases
			//{
			//	literal: /(a*)|b\1/,
			//	expected: "[61]*|[62]"
			//},

			// backreferences which only be small finite number of words
			// TODO:
			//{
			//	literal: /(a)\1/,
			//	options: {
			//		backreferences: "throw"
			//	},
			//	expected: "[61][61]"
			//},
			//{
			//	literal: /(a|b|c)\1/,
			//	options: {
			//		backreferences: "throw"
			//	},
			//	expected: "[61][61]|[62][62]|[63][63]"
			//},
			//{
			//	literal: /(a|b|c)\1/,
			//	options: {
			//		backreferences: "throw"
			//	},
			//	expected: ""
			//},
			//{
			//	literal: /("|')(?:(?!\1)[^\\\r\n]|\\.)*\1/,
			//	options: {
			//		backreferences: "throw"
			//	},
			//	expected: ""
			//},
		]);
	});

});
