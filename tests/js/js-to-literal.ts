import { assert } from "chai";
import { Parser, toLiteral, ToLiteralOptions, Literal } from "../../src/js";
import { literalToString } from "../helper/fa";

describe("JS.toLiteral", function () {
	describe("general", function () {
		test([
			{
				literal: /abc/,
				expected: /abc/,
			},
			{
				literal: /abc/i,
				expected: /ABC/i,
			},
			{
				literal: /a{0,1}b{1}c{0,}d{1,}e{0}/,
				expected: /a?b{1}c*d+e{0}/,
			},
			{
				literal: /[^\s\S][^\0-\uFFFF]/,
				expected: /[^\s\S][^\s\S]/i,
			},

			{
				literal: /^$ (?<![\s\S])(?![\s\S])/,
				expected: /^$ ^$/i,
			},
			{
				literal: /^$ (?<!.)(?!.)/s,
				expected: /^$ ^$/i,
			},
			{
				literal: /^$ (?<!.)(?!.)/m,
				expected: /^$ ^$/im,
			},
			{
				literal: /^$ (?!.)/ms,
				expected: /^$ (?![\s\S])/im,
			},
			{
				literal: /(?<!.)(?!.) $/ms,
				expected: /^$ (?!.)/i,
			},
			{
				literal: /(?<!.)(?!.) $/ms,
				options: { flags: { dotAll: true } },
				expected: /^$ (?![^\n\r\u2028\u2029])/is,
			},

			{
				literal: /\d/,
				options: { flags: { unicode: true } },
				expected: Error,
			},
			{
				literal: /\d/,
				options: { flags: { unicode: false } },
				expected: /\d/i,
			},
			{
				literal: /\d/u,
				options: { flags: { unicode: true } },
				expected: /\d/iu,
			},
			{
				literal: /\d/u,
				options: { flags: { unicode: false } },
				expected: Error,
			},

			{
				literal: /:/,
				options: { flags: { ignoreCase: false } },
				expected: /:/,
			},
			{
				literal: /:/,
				options: { flags: { ignoreCase: true } },
				expected: /:/i,
			},
			{
				literal: /:/i,
				options: { flags: { ignoreCase: false } },
				expected: /:/,
			},
			{
				literal: /:/i,
				options: { flags: { ignoreCase: true } },
				expected: /:/i,
			},

			{
				literal: /a/,
				options: { flags: { ignoreCase: false } },
				expected: /a/,
			},
			{
				literal: /a/,
				options: { flags: { ignoreCase: true } },
				expected: Error,
			},
			{
				literal: /abc/i,
				options: { flags: { ignoreCase: false } },
				expected: /[Aa][Bb][Cc]/,
			},
			{
				literal: /abc/i,
				options: { flags: { ignoreCase: true } },
				expected: /ABC/i,
			},

			{
				literal: /a/,
				options: { flags: { dotAll: true } },
				expected: /a/s,
			},
			{
				literal: /a/u,
				options: { flags: { dotAll: true } },
				expected: /a/su,
			},
			{
				literal: /a/,
				options: { flags: { global: true } },
				expected: /a/g,
			},
			{
				literal: /a/u,
				options: { flags: { global: true } },
				expected: /a/gu,
			},
			{
				literal: /a/,
				options: { flags: { multiline: true } },
				expected: /a/m,
			},
			{
				literal: /a/u,
				options: { flags: { multiline: true } },
				expected: /a/mu,
			},
			{
				literal: /a/,
				options: { flags: { sticky: true } },
				expected: /a/y,
			},
			{
				literal: /a/u,
				options: { flags: { sticky: true } },
				expected: /a/uy,
			},

			{
				literal: /\w/,
				options: { flags: { dotAll: true, global: true, ignoreCase: true, multiline: true } },
				expected: /\w/gims,
			},
			{
				literal: /\w/,
				options: { flags: { dotAll: true, ignoreCase: true, multiline: true, sticky: true } },
				expected: /\w/imsy,
			},
			{
				literal: /\w/u,
				options: { flags: { dotAll: true, global: true, multiline: true } },
				expected: /\w/gmsu,
			},
			{
				literal: /\w/u,
				options: { flags: { dotAll: true, multiline: true, sticky: true } },
				expected: /\w/msuy,
			},

			{
				literal: /\0/,
				expected: /\0/i,
			},
			{
				literal: /\p{ASCII}/u,
				expected: /[\0-\x7f]/u,
			},
			{
				literal: /\p{Cc}/u,
				// eslint-disable-next-line no-control-regex
				expected: /[\0-\x1f\x7f-\x9f]/iu,
			},

			{
				literal: /\b\B/,
				expected: /\b\B/i,
			},
			{
				literal: /\b\B/iu,
				expected: /\b\B/iu,
			},
		]);

		interface TestCase {
			literal: Literal;
			options?: ToLiteralOptions;
			expected: Literal | typeof Error;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, options, expected } of cases) {
				it(`${literalToString(literal)} ${options ? `\t(${JSON.stringify(options)})` : ""}`, function () {
					const { expression } = Parser.fromLiteral(literal).parse({ disableOptimizations: true });
					try {
						const actual = toLiteral(expression, options);
						if ("source" in expected && "flags" in expected) {
							assert.equal(literalToString(actual), literalToString(expected));
						} else {
							assert.fail("Expected it to fail.");
						}
					} catch (error) {
						if (expected !== Error) {
							throw error;
						}
					}
				});
			}
		}
	});
});
