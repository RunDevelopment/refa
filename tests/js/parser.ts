/* eslint-disable no-useless-backreference */
import { assert } from "chai";
import { Literal, ParseOptions, Parser, toLiteral } from "../../src/js";
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
				options: { simplify: false },
				expected: "[61](?:[62]|(?:[63]|[64])(?:))(?:[65])",
			},
			{
				literal: /ab?c*d+e{3}f{5,8}g{3,}?/,
				expected: "[61][62]?[63]*[64]+[65]{3}[66]{5,8}[67]{3,}?",
			},

			{
				literal: /(?=(?=a))/,
				expected: "(?=(?=[61]))",
			},
			{
				literal: /(?!a*)/,
				options: { simplify: false },
				expected: "(?![61]*)",
			},
			{
				literal: /(?!a*)/,
				expected: "[]",
			},
			{
				literal: /a+|b+?|c+/,
				expected: "[61]+|[62]+?|[63]+",
			},

			// properly remove unreachable parts

			{
				literal: /ab|c\b/,
				options: { assertions: "disable" },
				expected: "[61][62]",
			},
			{
				literal: /ab\b|c(?:\b)/,
				options: { assertions: "disable" },
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
				options: { backreferences: "throw", assertions: "disable" },
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
				options: { assertions: "disable" },
				expected: "[]",
			},
		]);
	});

	describe("parse options: assertions", function () {
		test([
			{
				literal: /(?=abc)a|b/,
				options: { assertions: "parse" },
				expected: "(?=[61][62][63])[61]|[62]",
			},
			{
				literal: /(?=abc)a|b/,
				options: { assertions: "disable" },
				expected: "[62]",
			},
			{
				literal: /(?=abc)a|b/,
				options: { assertions: "ignore" },
				expected: "[61]|[62]",
			},
			{
				literal: /(?=abc)a|b/,
				options: { assertions: "ignore", simplify: false },
				expected: "(?:)[61]|[62]",
			},
			{
				literal: /(?=abc)a|b/,
				options: { assertions: "throw" },
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
				options: { backreferences: "disable", maxBackreferenceWords: 0 },
				expected: "[]",
			},
			{
				literal: /()b\1/,
				options: { backreferences: "throw", maxBackreferenceWords: 0 },
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
				expected: /"(?:(?!")[^\n\r\\]|\\.)*"/,
			},
			{
				literal: /(''''').+?(?=\1)/,
				expected: /'''''.+?(?=''''')/,
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
				literal: /(a)\1/,
				expected: "[61][61]",
			},
			{
				literal: /(a)\1/i,
				expected: "[41, 61][41, 61]",
			},
			{
				literal: /(a)\1/iu,
				expected: "[41, 61][41, 61]",
			},
			{
				literal: /([aA])\1/,
				expected: "[41][41]|[61][61]",
			},

			{
				literal: /(k)\1/i,
				expected: "[4b, 6b][4b, 6b]",
			},
			{
				literal: /(k)\1/iu,
				expected: "[4b, 6b, 212a][4b, 6b, 212a]",
			},

			{
				literal: /(a)\1?/i,
				expected: "[41, 61][41, 61]?",
			},
			{
				literal: /(a)\1(b)\2(c)\3/i,
				expected: "[41, 61][41, 61][42, 62][42, 62][43, 63][43, 63]",
			},
			{
				literal: /(a)\1(b)\2(c\1)\3/i,
				expected: /AABBCACA/i,
			},
			{
				literal: /([aA])\1([bB])\2([cC])\3/,
				expected: "(?:[41][41]|[61][61])(?:[42][42]|[62][62])(?:[43][43]|[63][63])",
			},
			{
				literal: /([aA])\1([bB])\2([cC]\1)\3/,
				expected: /AA(?:BB|bb)(?:CACA|cAcA)|aa(?:BB|bb)(?:CaCa|caca)/,
			},
			{
				literal: /(a)(b)\1\2/i,
				expected: "[41, 61][42, 62][41, 61][42, 62]",
			},
			{
				literal: /(a)(b)\1\2/i,
				expected: /ABAB/i,
			},
			{
				literal: /([aA])([bB])\1\2/,
				expected: "[41](?:[42][41][42]|[62][41][62])|[61](?:[42][61][42]|[62][61][62])",
			},
			{
				literal: /([aA])([bB])\1\2/,
				expected: /A(?:BAB|bAb)|a(?:BaB|bab)/,
			},

			{
				literal: /(?=(a)\1)/i,
				expected: /(?=AA)/i,
			},
			{
				literal: /(?=([aA])\1)/,
				expected: /(?=AA|aa)/,
			},
			{
				literal: /(?=(AB|CD)bcd\1)/,
				expected: /(?=ABbcdAB|CDbcdCD)/,
			},
			{
				literal: /(?<=\1(a))/i,
				expected: /(?<=AA)/i,
			},
			{
				literal: /(?<=\1([aA]))/,
				expected: /(?<=AA|aa)/,
			},
			{
				literal: /(?<=\1("|'))/i,
				expected: /(?<=""|'')/,
			},
			{
				literal: /(?<=\1bcd(AB|CD))/,
				expected: /(?<=ABbcdAB|CDbcdCD)/,
			},

			// real world examples

			{
				literal: /("|')(?:(?!\1)[^\\\r\n]|\\.)*\1/,
				expected:
					"[22](?:(?![22])[0..9, b..c, e..5b, 5d..ffff]|[5c][0..9, b..c, e..2027, 202a..ffff])*[22]|[27](?:(?![27])[0..9, b..c, e..5b, 5d..ffff]|[5c][0..9, b..c, e..2027, 202a..ffff])*[27]",
			},
			{
				literal: /("|')(?:(?!\1)[^\\\r\n]|\\.)*\1/,
				expected: /"(?:(?!")[^\n\r\\]|\\.)*"|'(?:(?!')[^\n\r\\]|\\.)*'/,
			},
			{
				literal: /('|")(?:(?!\1)[^\\\r\n]|\\.)*\1/,
				expected: /'(?:(?!')[^\n\r\\]|\\.)*'|"(?:(?!")[^\n\r\\]|\\.)*"/,
			},
			{
				literal: /(["'])(?:(?!\1)[^\\\r\n]|\\.)*\1/,
				expected: /"(?:(?!")[^\n\r\\]|\\.)*"|'(?:(?!')[^\n\r\\]|\\.)*'/,
			},

			{
				literal: /<(a|p|div)>[^]*?<\/\1>/,
				expected: /<(?:a>[^]*?<\/a|p>[^]*?<\/p|div>[^]*?<\/div)>/,
			},
			{
				literal: /<(a|p|div)>[^]*?<\/\1>/i,
				expected: /<(?:A>[^]*?<\/A|P>[^]*?<\/P|DIV>[^]*?<\/DIV)>/i,
			},
			{
				literal: /<(a|p|div)>[^]*?<\/\1>/iu,
				expected: /<(?:A>[^]*?<\/A|P>[^]*?<\/P|DIV>[^]*?<\/DIV)>/iu,
			},
			{
				literal: /#[\da-z]+|#(?:-|([+/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
				expected:
					/#[\dA-Z]+|#(?:-|!!?|%%?|&&?|\*\*?|\+\+?|\/\/?|<<?|==?|>>?|\?\??|@@?|\\\\?|\|\|?|~~?)|#(?=\()/i,
			},
			{
				literal: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
				expected: /(?:[BRU]|RB|BR)?(?:"""[^]*?"""|'''[^]*?''')/i,
			},
			{
				literal: /url\((["']?).*?\1\)/i,
				expected: /URL\((?:".*?"|'.*?'|.*?)\)/i,
			},
			{
				literal: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
				expected: /@(?:"(?:\\[^]|(?!")[^\\])+"|'(?:\\[^]|(?!')[^\\])+'|`(?:\\[^]|(?!`)[^\\])+`)/,
			},
			{
				literal: /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
				expected:
					/\b(?:m|qr)\s+(?:0(?:(?!0)[^\\]|\\[^])*0|1(?:(?!1)[^\\]|\\[^])*1|2(?:(?!2)[^\\]|\\[^])*2|3(?:(?!3)[^\\]|\\[^])*3|4(?:(?!4)[^\\]|\\[^])*4|5(?:(?!5)[^\\]|\\[^])*5|6(?:(?!6)[^\\]|\\[^])*6|7(?:(?!7)[^\\]|\\[^])*7|8(?:(?!8)[^\\]|\\[^])*8|9(?:(?!9)[^\\]|\\[^])*9|A(?:(?!A)[^\\]|\\[^])*A|B(?:(?!B)[^\\]|\\[^])*B|C(?:(?!C)[^\\]|\\[^])*C|D(?:(?!D)[^\\]|\\[^])*D|E(?:(?!E)[^\\]|\\[^])*E|F(?:(?!F)[^\\]|\\[^])*F|G(?:(?!G)[^\\]|\\[^])*G|H(?:(?!H)[^\\]|\\[^])*H|I(?:(?!I)[^\\]|\\[^])*I|J(?:(?!J)[^\\]|\\[^])*J|K(?:(?!K)[^\\]|\\[^])*K|L(?:(?!L)[^\\]|\\[^])*L|M(?:(?!M)[^\\]|\\[^])*M|N(?:(?!N)[^\\]|\\[^])*N|O(?:(?!O)[^\\]|\\[^])*O|P(?:(?!P)[^\\]|\\[^])*P|Q(?:(?!Q)[^\\]|\\[^])*Q|R(?:(?!R)[^\\]|\\[^])*R|S(?:(?!S)[^\\]|\\[^])*S|T(?:(?!T)[^\\]|\\[^])*T|U(?:(?!U)[^\\]|\\[^])*U|V(?:(?!V)[^\\]|\\[^])*V|W(?:(?!W)[^\\]|\\[^])*W|X(?:(?!X)[^\\]|\\[^])*X|Y(?:(?!Y)[^\\]|\\[^])*Y|Z(?:(?!Z)[^\\]|\\[^])*Z|a(?:(?!a)[^\\]|\\[^])*a|b(?:(?!b)[^\\]|\\[^])*b|c(?:(?!c)[^\\]|\\[^])*c|d(?:(?!d)[^\\]|\\[^])*d|e(?:(?!e)[^\\]|\\[^])*e|f(?:(?!f)[^\\]|\\[^])*f|g(?:(?!g)[^\\]|\\[^])*g|h(?:(?!h)[^\\]|\\[^])*h|i(?:(?!i)[^\\]|\\[^])*i|j(?:(?!j)[^\\]|\\[^])*j|k(?:(?!k)[^\\]|\\[^])*k|l(?:(?!l)[^\\]|\\[^])*l|m(?:(?!m)[^\\]|\\[^])*m|n(?:(?!n)[^\\]|\\[^])*n|o(?:(?!o)[^\\]|\\[^])*o|p(?:(?!p)[^\\]|\\[^])*p|q(?:(?!q)[^\\]|\\[^])*q|r(?:(?!r)[^\\]|\\[^])*r|s(?:(?!s)[^\\]|\\[^])*s|t(?:(?!t)[^\\]|\\[^])*t|u(?:(?!u)[^\\]|\\[^])*u|v(?:(?!v)[^\\]|\\[^])*v|w(?:(?!w)[^\\]|\\[^])*w|x(?:(?!x)[^\\]|\\[^])*x|y(?:(?!y)[^\\]|\\[^])*y|z(?:(?!z)[^\\]|\\[^])*z)[acdgil-psux]*/,
			},
			{
				literal: /('{2,5}).+?\1/,
				expected: /'''''.+?'''''|''''.+?''''|'''.+?'''|''.+?''/,
			},
			{
				literal: /('{2,5}?).+?\1/,
				expected: /''.+?''|'''.+?'''|''''.+?''''|'''''.+?'''''/,
			},
			{
				literal: /^("(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
				expected: /^(?:"""(?!""")[^]+(?="""$)|"(?!")[^]+(?="$))/,
			},

			{
				// `(nowiki|pre|sources?)` will be resolved to 4 words.
				// Since if only 3 words are allowed, this will fail.
				literal: /<(nowiki|pre|sources?)\b[\s\S]*?>[\s\S]*?<\/\1>/i,
				options: { maxBackreferenceWords: 3 },
				expected: Error,
			},
			{
				literal: /<(nowiki|pre|sources?)\b[\s\S]*?>[\s\S]*?<\/\1>/i,
				options: { maxBackreferenceWords: 4 },
				expected:
					/<(?:NOWIKI\b[^]*?>[^]*?<\/NOWIKI|PRE\b[^]*?>[^]*?<\/PRE|SOURCES\b[^]*?>[^]*?<\/SOURCES|SOURCE\b[^]*?>[^]*?<\/SOURCE)>/i,
			},
		]);
	});
});
