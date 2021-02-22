import { assert } from "chai";
import { Parser, ParseOptions, Literal, toLiteral } from "../../src/js";
import { literalToString } from "../helper/fa";
import { toPatternString } from "../helper/literal-to-string";

describe("JS.Parser", function () {
	interface TestCase {
		literal: { source: string; flags: string };
		options?: ParseOptions;
		expected: string | typeof Error | Literal;
		debug?: boolean;
	}

	function test(cases: Iterable<TestCase>): void {
		for (const { literal, expected, options, debug } of cases) {
			const optionsStr = options ? " " + JSON.stringify(options) : "";
			it(`${literalToString(literal)}${optionsStr}`, function () {
				if (debug) {
					// eslint-disable-next-line no-debugger
					debugger;
				}

				const parser = Parser.fromLiteral(literal);
				if (typeof expected === "function") {
					assert.throws(() => {
						parser.parse(options);
					});
				} else {
					const { expression } = parser.parse(options);

					if (typeof expected === "string") {
						assert.strictEqual(toPatternString(expression), expected);
					} else {
						assert.strictEqual(literalToString(toLiteral(expression)), literalToString(expected));
					}
				}
			});
		}
	}

	describe("parse", function () {
		test([
			{
				literal: /fo[o]/,
				expected: "[66][6f][6f]",
			},
			{
				literal: /a(b|(?:c|d)(?:))(e)/,
				expected: "[61](?:[62]|[63]|[64])[65]",
			},
			{
				literal: /a(b|(?:c|d)(?:))(e)/,
				options: { disableOptimizations: true },
				expected: "[61](?:[62]|(?:[63]|[64])(?:))(?:[65])",
			},
			{
				literal: /ab?c*d+e{3}f{5,8}g{3,}/,
				expected: "[61][62]?[63]*[64]+[65]{3}[66]{5,8}[67]{3,}",
			},

			{
				literal: /(?=(?=a))/,
				expected: "(?=(?=[61]))",
			},
			{
				literal: /(?!a*)/,
				options: { disableOptimizations: true },
				expected: "(?![61]*)",
			},
			{
				literal: /(?!a*)/,
				expected: "[]",
			},
			{
				literal: /a+|b+|c+/,
				expected: "[61]+|[62]+|[63]+",
			},

			// properly remove unreachable parts

			{
				literal: /ab|c\b/,
				options: { lookarounds: "disable" },
				expected: "[61][62]",
			},
			{
				literal: /ab\b|c(?:\b)/,
				options: { lookarounds: "disable" },
				expected: "[]",
			},
			{
				literal: /(a*)(?:[^\s\S]\1{0})/,
				options: { backreferences: "throw" },
				expected: "[]",
			},
			{
				literal: /(a*)[^\s\S]\1/,
				options: { backreferences: "throw" },
				expected: "[]",
			},
			{
				literal: /(a*)\1[^\s\S]/,
				options: { backreferences: "throw" },
				expected: "[]",
			},
			{
				literal: /(a*)(?:[^\s\S]\1)/,
				options: { backreferences: "throw" },
				expected: "[]",
			},
			{
				literal: /(a*)(?:\1{0})/,
				options: { backreferences: "throw" },
				expected: "[61]*",
			},
			{
				literal: /(a*)(?:\b\1|$)/,
				options: { backreferences: "throw", lookarounds: "disable" },
				expected: "[]",
			},
			{
				literal: /a(?=[^\s\S]abc|[^\s\S])/,
				expected: "[]",
			},
			{
				literal: /a(?![^\s\S]abc|[^\s\S])/,
				expected: "[61]",
			},
			{
				literal: /(?:)?/,
				expected: "",
			},
			{
				literal: /(?:[^\s\S])?/,
				expected: "",
			},
			{
				literal: /(?:[^\s\S])+/,
				expected: "[]",
			},
			{
				literal: /(?:\b|abc$)+/,
				options: { lookarounds: "disable" },
				expected: "[]",
			},
		]);
	});

	describe("parse options: lookaround", function () {
		test([
			{
				literal: /(?=abc)a|b/,
				options: { lookarounds: "parse" },
				expected: "(?=[61][62][63])[61]|[62]",
			},
			{
				literal: /(?=abc)a|b/,
				options: { lookarounds: "disable" },
				expected: "[62]",
			},
			{
				literal: /(?=abc)a|b/,
				options: { lookarounds: "throw" },
				expected: Error,
			},
		]);
	});

	describe("parse options: backreferences", function () {
		test([
			{
				literal: /(a*)b\1/,
				options: { backreferences: "disable" },
				expected: "[]",
			},
			{
				literal: /(a*)b\1/,
				options: { backreferences: "throw" },
				expected: Error,
			},

			{
				literal: /()b\1/,
				options: { backreferences: "disable" },
				expected: "[62]",
			},
			{
				literal: /()b\1/,
				options: { backreferences: "throw" },
				expected: "[62]",
			},

			{
				literal: /()b\1/,
				options: { backreferences: "disable", backreferenceMaximumWords: 0 },
				expected: "[]",
			},
			{
				literal: /()b\1/,
				options: { backreferences: "throw", backreferenceMaximumWords: 0 },
				expected: Error,
			},

			{
				literal: /(a*)[^\s\S]|b\1/,
				options: { backreferences: "disable" },
				expected: "[62]",
			},
			{
				literal: /(a*)[^\s\S]|b\1/,
				options: { backreferences: "throw" },
				expected: "[62]",
			},
		]);
	});

	describe("resolve constant backreferences", function () {
		test([
			// backreferences which can only ever be the empty
			{
				literal: /\1(a*)/,
				expected: "[61]*",
			},
			{
				literal: /(a*\1)/,
				expected: "[61]*",
			},
			{
				literal: /(a*\1*)/,
				expected: "[61]*",
			},
			{
				literal: /()\1/,
				expected: "",
			},
			{
				literal: /((?=a))\1/,
				expected: "(?=[61])",
			},
			{
				literal: /((?=a)|()*|a{0})\1/,
				expected: "(?=[61])||",
			},
			{
				literal: /(a*)|b\1/,
				expected: "[61]*|[62]",
			},
			{
				literal: /(?:\1(a)){2}/,
				expected: "[61]{2}",
			},
			{
				literal: /(?<=(a)\1)/,
				expected: "(?<=[61])",
			},

			// backreferences which only match a constant word

			{
				literal: /(a)\1/,
				expected: "[61][61]",
			},
			{
				literal: /(a)\1?/,
				expected: "[61][61]?",
			},
			{
				literal: /(a)\1(b)\2(c)\3/,
				expected: "[61][61][62][62][63][63]",
			},
			{
				literal: /(a)(b)\1\2/,
				expected: "[61][62][61][62]",
			},
			{
				literal: /(a(b))\1\2/,
				expected: "[61][62][61][62][62]",
			},
			{
				literal: /(a)[^\s\S]|(a\1)\2/,
				expected: "[61][61]",
			},
			{
				literal: /(")(?:(?!\1)[^\\\r\n]|\\.)*\1/,
				expected: "[22](?:(?![22])[0..9, b..c, e..5b, 5d..ffff]|[5c][0..9, b..c, e..2027, 202a..ffff])*[22]",
			},
			{
				literal: /(")(?:(?!\1)[^\\\r\n]|\\.)*\1/,
				expected: /"(?:(?!")[^\n\r\\]|\\.)*"/i,
			},
			{
				literal: /(?<=\1(a))/,
				expected: "(?<=[61][61])",
			},

			// where it can't be done

			{
				literal: /(a)?\1/,
				expected: Error,
			},
			{
				literal: /(a)*\1/,
				expected: Error,
			},
			{
				literal: /(?:b|(a))+\1/,
				expected: Error,
			},
		]);
	});

	describe("resolve variable backreferences", function () {
		test([
			{
				literal: /(a)\1/i,
				expected: "[41][41]|[61][61]",
			},
			{
				literal: /(a)\1?/i,
				expected: "[41][41]?|[61][61]?",
			},
			{
				literal: /(a)\1(b)\2(c)\3/i,
				expected: "(?:[41][41]|[61][61])(?:[42][42]|[62][62])(?:[43][43]|[63][63])",
			},
			{
				literal: /(a)\1(b)\2(c\1)\3/i,
				expected: /AA(?:BB|bb)(?:CACA|cAcA)|aa(?:BB|bb)(?:CaCa|caca)/,
			},
			{
				literal: /(a)(b)\1\2/i,
				expected: "[41](?:[42][41][42]|[62][41][62])|[61](?:[42][61][42]|[62][61][62])",
			},
			{
				literal: /(a)(b)\1\2/i,
				expected: /A(?:BAB|bAb)|a(?:BaB|bab)/,
			},

			{
				literal: /("|')(?:(?!\1)[^\\\r\n]|\\.)*\1/,
				expected:
					"[22](?:(?![22])[0..9, b..c, e..5b, 5d..ffff]|[5c][0..9, b..c, e..2027, 202a..ffff])*[22]|[27](?:(?![27])[0..9, b..c, e..5b, 5d..ffff]|[5c][0..9, b..c, e..2027, 202a..ffff])*[27]",
			},
			{
				literal: /("|')(?:(?!\1)[^\\\r\n]|\\.)*\1/,
				expected: /"(?:(?!")[^\n\r\\]|\\.)*"|'(?:(?!')[^\n\r\\]|\\.)*'/i,
			},
			{
				literal: /('|")(?:(?!\1)[^\\\r\n]|\\.)*\1/,
				expected: /'(?:(?!')[^\n\r\\]|\\.)*'|"(?:(?!")[^\n\r\\]|\\.)*"/i,
			},
			{
				literal: /(["'])(?:(?!\1)[^\\\r\n]|\\.)*\1/,
				expected: /"(?:(?!")[^\n\r\\]|\\.)*"|'(?:(?!')[^\n\r\\]|\\.)*'/i,
			},

			{
				literal: /<(a|p|div)>[^]*?<\/\1>/,
				expected: /<(?:a>[^]*<\/a|p>[^]*<\/p|div>[^]*<\/div)>/,
			},
			{
				literal: /<(a|p|div)>[^]*?<\/\1>/i,
				expected: /<(?:A>[^]*<\/A|a>[^]*<\/a|P>[^]*<\/P|p>[^]*<\/p|DIV>[^]*<\/DIV|DIv>[^]*<\/DIv|DiV>[^]*<\/DiV|Div>[^]*<\/Div|dIV>[^]*<\/dIV|dIv>[^]*<\/dIv|diV>[^]*<\/diV|div>[^]*<\/div)>/,
			},

			{
				literal: /(?=(a)\1)/i,
				expected: /(?=AA|aa)/,
			},
			{
				literal: /(?=(AB|CD)bcd\1)/,
				expected: /(?=ABbcdAB|CDbcdCD)/,
			},
			{
				literal: /(?<=\1(a))/i,
				expected: /(?<=AA|aa)/,
			},
			{
				literal: /(?<=\1bcd(AB|CD))/,
				expected: /(?<=ABbcdAB|CDbcdCD)/,
			},
		]);
	});
});
