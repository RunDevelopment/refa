/* eslint-disable no-control-regex */
import { assert } from "chai";
import { Literal, Parser, ToLiteralOptions, toLiteral } from "../../src/js";
import { literalToString } from "../helper/fa";
import { assertEqualSnapshot } from "../helper/snapshot";
import { PrismRegexes } from "../helper/prism-regex-data";
import { TooManyNodesError } from "../../src/errors";

describe("JS.toLiteral", function () {
	interface TestCase {
		literal: Literal;
		options?: ToLiteralOptions;
		expected: Literal | typeof Error;
	}

	function test(cases: TestCase[]): void {
		for (const { literal, options, expected } of cases) {
			it(`${literalToString(literal)} ${options ? `\t(${JSON.stringify(options)})` : ""}`, function () {
				const { expression } = Parser.fromLiteral(literal).parse({ simplify: false });
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
				literal: /-\//i,
				expected: /-\//,
			},
			{
				literal: /[-][^-][a\- ][\^.][\^-]/,
				expected: /-[^-][- a][.^][-^]/,
			},
			{
				literal: /[a][ab][abc][abcd][abcde]/,
				expected: /a[ab][abc][a-d][a-e]/,
			},
			{
				literal: /[!][!"][!"#][!"#$][!"#$%][!"#$%&][!"#$%&'][!"#$%&'(][!"#$%&'()]/,
				expected: /![!"][!"#][!"#$][!"#$%][!"#$%&][\x21-\x27][\x21-\x28][\x21-\x29]/,
			},
			{
				literal: /\n\r\f\t[\n\r\f\t]/,
				expected: /\n\r\f\t[\t\n\f\r]/,
			},
			{
				literal: /\s\d\w\S\D\W./,
				expected: /\s\d\w\S\D\W./,
			},
			{
				literal: /\s\d\w\S\D\W./iu,
				expected: /\s\d\w\S\D\W./iu,
			},
			{
				literal: /a{0,1}b{1}c{0,}d{1,}e{0}f{3,6} (){2}/,
				expected: /a?b{1}c*d+e{0}f{3,6} (?:){2}/,
			},
			{
				literal: /[^\s\S][^\0-\uFFFF]/,
				// eslint-disable-next-line no-empty-character-class
				expected: /[][]/,
			},

			{
				literal: /\0/,
				expected: /\0/,
			},
			{
				literal: /\p{ASCII}/u,
				expected: /[\0-\x7f]/u,
			},
			{
				literal: /\p{Cc}/u,
				// eslint-disable-next-line no-control-regex
				expected: /[\0-\x1f\x7f-\x9f]/u,
			},

			{
				literal: /[\s'">=]/,
				expected: /[\s"'=>]/,
			},
			{
				literal: /[^\s'">=]/,
				expected: /[^\s"'=>]/,
			},
			{
				literal: /[\s'">=]/u,
				expected: /[\s"'=>]/u,
			},
			{
				literal: /[^\s'">=]/u,
				expected: /[^\s"'=>]/u,
			},

			{
				literal: /[\w-]/,
				expected: /[-\w]/,
			},

			{
				literal: { source: /(abc)/.source, flags: "d" },
				expected: { source: /(?:abc)/.source, flags: "" },
			},
		]);
	});

	describe("assertions", function () {
		test([
			{
				literal: /^$ (?<![\s\S])(?![\s\S])/,
				expected: /^$ ^$/,
			},
			{
				literal: /^$ (?<!.)(?!.)/s,
				expected: /^$ ^$/,
			},
			{
				literal: /^$ (?<!.)(?!.)/m,
				expected: /^$ ^$/m,
			},

			{
				literal: /^$ (?!.)/ms,
				expected: /^$ (?![^])/m,
			},
			{
				literal: /(?<!.)(?!.) $/ms,
				expected: /^$ (?!.)/,
			},
			{
				literal: /(?<!.)(?!.) $/ms,
				options: { flags: { dotAll: true } },
				expected: /^$ (?![^\n\r\u2028\u2029])/s,
			},

			{
				literal: /\b\B/,
				expected: /\b\B/,
			},
			{
				literal: /\b\B/iu,
				expected: /\b\B/iu,
			},

			{
				literal: /(?<=a) (?<!a) (?=a) (?!a)/,
				expected: /(?<=a) (?<!a) (?=a) (?!a)/,
			},
			{
				literal: /(?<=a) (?<!a) (?=a) (?!a)/u,
				expected: /(?<=a) (?<!a) (?=a) (?!a)/u,
			},
			{
				literal: /((?=a))?/,
				expected: /(?:(?=a))?/,
			},
		]);
	});

	describe("forced flags", function () {
		test([
			{
				literal: /\d/,
				options: { flags: { unicode: true } },
				expected: Error,
			},
			{
				literal: /\d/,
				options: { flags: { unicode: false } },
				expected: /\d/,
			},
			{
				literal: /\d/u,
				options: { flags: { unicode: true } },
				expected: /\d/u,
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
				literal: /(abc)/,
				options: { flags: { hasIndices: true } },
				expected: { source: "(?:abc)", flags: "d" },
			},
		]);
	});

	describe("fast", function () {
		test([
			{
				literal: /abc/,
				options: { fastCharacters: true },
				expected: /[a][b][c]/,
			},
			{
				literal: /abc/i,
				options: { fastCharacters: true },
				expected: /[Aa][Bb][Cc]/,
			},
			{
				literal: /\w\d\s/i,
				options: { fastCharacters: true },
				expected: /[0-9A-Z_a-z][0-9][\x09-\x0d \xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/,
			},
			{
				literal: /./,
				options: { fastCharacters: true },
				expected: /[\0-\x09\x0b\f\x0e-\u2027\u202a-\uffff]/,
			},
		]);
	});

	describe("Prism regexes", function () {
		this.timeout(60 * 1000); // timeout after a minute

		const literals = PrismRegexes.map(re => {
			try {
				return literalToString(
					toLiteral(Parser.fromLiteral(re).parse({ backreferences: "disable" }).expression)
				);
			} catch (e) {
				if (e instanceof TooManyNodesError) {
					return "TooManyNodesError";
				}
				throw e;
			}
		});

		it("should not contain line ends", function () {
			for (const l of literals) {
				assert.notMatch(l, /[\r\n]/);
			}
		});

		it("snapshot", function () {
			assertEqualSnapshot(this, literals.join("\n"));
		});
	});
});
