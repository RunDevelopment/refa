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
				literal: /ab?c*d+e{3}f{5,8}g{3,}?/,
				expected: "[61][62]?[63]*[64]+[65]{3}[66]{5,8}[67]{3,}?",
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
				literal: /a+|b+?|c+/,
				expected: "[61]+|[62]+?|[63]+",
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
				literal: /(''''').+?(?=\1)/,
				expected: /'''''.+?(?=''''')/i,
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

			// real world examples

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
				expected: /<(?:a>[^]*?<\/a|p>[^]*?<\/p|div>[^]*?<\/div)>/,
			},
			{
				literal: /<(a|p|div)>[^]*?<\/\1>/i,
				expected: /<(?:A>[^]*?<\/A|a>[^]*?<\/a|P>[^]*?<\/P|p>[^]*?<\/p|DIV>[^]*?<\/DIV|DIv>[^]*?<\/DIv|DiV>[^]*?<\/DiV|Div>[^]*?<\/Div|dIV>[^]*?<\/dIV|dIv>[^]*?<\/dIv|diV>[^]*?<\/diV|div>[^]*?<\/div)>/,
			},
			{
				literal: /#[\da-z]+|#(?:-|([+/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
				expected: /#[\dA-Z]+|#(?:-|!!?|%%?|&&?|\*\*?|\+\+?|\/\/?|<<?|==?|>>?|\?\??|@@?|\\\\?|\|\|?|~~?)|#(?=\()/i,
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
				expected: /@(?:"(?:\\[^]|(?!")[^\\])+"|'(?:\\[^]|(?!')[^\\])+'|`(?:\\[^]|(?!`)[^\\])+`)/i,
			},
			{
				literal: /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
				expected: /\b(?:m|qr)\s+(?:0(?:(?!0)[^\\]|\\[^])*0|1(?:(?!1)[^\\]|\\[^])*1|2(?:(?!2)[^\\]|\\[^])*2|3(?:(?!3)[^\\]|\\[^])*3|4(?:(?!4)[^\\]|\\[^])*4|5(?:(?!5)[^\\]|\\[^])*5|6(?:(?!6)[^\\]|\\[^])*6|7(?:(?!7)[^\\]|\\[^])*7|8(?:(?!8)[^\\]|\\[^])*8|9(?:(?!9)[^\\]|\\[^])*9|A(?:(?!A)[^\\]|\\[^])*A|B(?:(?!B)[^\\]|\\[^])*B|C(?:(?!C)[^\\]|\\[^])*C|D(?:(?!D)[^\\]|\\[^])*D|E(?:(?!E)[^\\]|\\[^])*E|F(?:(?!F)[^\\]|\\[^])*F|G(?:(?!G)[^\\]|\\[^])*G|H(?:(?!H)[^\\]|\\[^])*H|I(?:(?!I)[^\\]|\\[^])*I|J(?:(?!J)[^\\]|\\[^])*J|K(?:(?!K)[^\\]|\\[^])*K|L(?:(?!L)[^\\]|\\[^])*L|M(?:(?!M)[^\\]|\\[^])*M|N(?:(?!N)[^\\]|\\[^])*N|O(?:(?!O)[^\\]|\\[^])*O|P(?:(?!P)[^\\]|\\[^])*P|Q(?:(?!Q)[^\\]|\\[^])*Q|R(?:(?!R)[^\\]|\\[^])*R|S(?:(?!S)[^\\]|\\[^])*S|T(?:(?!T)[^\\]|\\[^])*T|U(?:(?!U)[^\\]|\\[^])*U|V(?:(?!V)[^\\]|\\[^])*V|W(?:(?!W)[^\\]|\\[^])*W|X(?:(?!X)[^\\]|\\[^])*X|Y(?:(?!Y)[^\\]|\\[^])*Y|Z(?:(?!Z)[^\\]|\\[^])*Z|a(?:(?!a)[^\\]|\\[^])*a|b(?:(?!b)[^\\]|\\[^])*b|c(?:(?!c)[^\\]|\\[^])*c|d(?:(?!d)[^\\]|\\[^])*d|e(?:(?!e)[^\\]|\\[^])*e|f(?:(?!f)[^\\]|\\[^])*f|g(?:(?!g)[^\\]|\\[^])*g|h(?:(?!h)[^\\]|\\[^])*h|i(?:(?!i)[^\\]|\\[^])*i|j(?:(?!j)[^\\]|\\[^])*j|k(?:(?!k)[^\\]|\\[^])*k|l(?:(?!l)[^\\]|\\[^])*l|m(?:(?!m)[^\\]|\\[^])*m|n(?:(?!n)[^\\]|\\[^])*n|o(?:(?!o)[^\\]|\\[^])*o|p(?:(?!p)[^\\]|\\[^])*p|q(?:(?!q)[^\\]|\\[^])*q|r(?:(?!r)[^\\]|\\[^])*r|s(?:(?!s)[^\\]|\\[^])*s|t(?:(?!t)[^\\]|\\[^])*t|u(?:(?!u)[^\\]|\\[^])*u|v(?:(?!v)[^\\]|\\[^])*v|w(?:(?!w)[^\\]|\\[^])*w|x(?:(?!x)[^\\]|\\[^])*x|y(?:(?!y)[^\\]|\\[^])*y|z(?:(?!z)[^\\]|\\[^])*z)[acdgil-psux]*/,
			},
			{
				literal: /('{2,5}).+?\1/,
				expected: /'''''.+?'''''|''''.+?''''|'''.+?'''|''.+?''/i,
			},
			{
				literal: /^("(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
				expected: /^(?:"""(?!""")[^]+(?="""$)|"(?!")[^]+(?="$))/i,
			},

			{
				// `(nowiki|pre|source)` will be resolved to 136 words.
				// Since only 135 words are allowed, this will fail.
				literal: /<(nowiki|pre|source)\b[\s\S]*?>[\s\S]*?<\/\1>/i,
				options: { backreferenceMaximumWords: 135 },
				expected: Error,
			},
			{
				literal: /<(nowiki|pre|source)\b[\s\S]*?>[\s\S]*?<\/\1>/i,
				options: { backreferenceMaximumWords: 136 },
				expected: /<(?:NOWIKI\b[^]*?>[^]*?<\/NOWIKI|NOWIKi\b[^]*?>[^]*?<\/NOWIKi|NOWIkI\b[^]*?>[^]*?<\/NOWIkI|NOWIki\b[^]*?>[^]*?<\/NOWIki|NOWiKI\b[^]*?>[^]*?<\/NOWiKI|NOWiKi\b[^]*?>[^]*?<\/NOWiKi|NOWikI\b[^]*?>[^]*?<\/NOWikI|NOWiki\b[^]*?>[^]*?<\/NOWiki|NOwIKI\b[^]*?>[^]*?<\/NOwIKI|NOwIKi\b[^]*?>[^]*?<\/NOwIKi|NOwIkI\b[^]*?>[^]*?<\/NOwIkI|NOwIki\b[^]*?>[^]*?<\/NOwIki|NOwiKI\b[^]*?>[^]*?<\/NOwiKI|NOwiKi\b[^]*?>[^]*?<\/NOwiKi|NOwikI\b[^]*?>[^]*?<\/NOwikI|NOwiki\b[^]*?>[^]*?<\/NOwiki|NoWIKI\b[^]*?>[^]*?<\/NoWIKI|NoWIKi\b[^]*?>[^]*?<\/NoWIKi|NoWIkI\b[^]*?>[^]*?<\/NoWIkI|NoWIki\b[^]*?>[^]*?<\/NoWIki|NoWiKI\b[^]*?>[^]*?<\/NoWiKI|NoWiKi\b[^]*?>[^]*?<\/NoWiKi|NoWikI\b[^]*?>[^]*?<\/NoWikI|NoWiki\b[^]*?>[^]*?<\/NoWiki|NowIKI\b[^]*?>[^]*?<\/NowIKI|NowIKi\b[^]*?>[^]*?<\/NowIKi|NowIkI\b[^]*?>[^]*?<\/NowIkI|NowIki\b[^]*?>[^]*?<\/NowIki|NowiKI\b[^]*?>[^]*?<\/NowiKI|NowiKi\b[^]*?>[^]*?<\/NowiKi|NowikI\b[^]*?>[^]*?<\/NowikI|Nowiki\b[^]*?>[^]*?<\/Nowiki|nOWIKI\b[^]*?>[^]*?<\/nOWIKI|nOWIKi\b[^]*?>[^]*?<\/nOWIKi|nOWIkI\b[^]*?>[^]*?<\/nOWIkI|nOWIki\b[^]*?>[^]*?<\/nOWIki|nOWiKI\b[^]*?>[^]*?<\/nOWiKI|nOWiKi\b[^]*?>[^]*?<\/nOWiKi|nOWikI\b[^]*?>[^]*?<\/nOWikI|nOWiki\b[^]*?>[^]*?<\/nOWiki|nOwIKI\b[^]*?>[^]*?<\/nOwIKI|nOwIKi\b[^]*?>[^]*?<\/nOwIKi|nOwIkI\b[^]*?>[^]*?<\/nOwIkI|nOwIki\b[^]*?>[^]*?<\/nOwIki|nOwiKI\b[^]*?>[^]*?<\/nOwiKI|nOwiKi\b[^]*?>[^]*?<\/nOwiKi|nOwikI\b[^]*?>[^]*?<\/nOwikI|nOwiki\b[^]*?>[^]*?<\/nOwiki|noWIKI\b[^]*?>[^]*?<\/noWIKI|noWIKi\b[^]*?>[^]*?<\/noWIKi|noWIkI\b[^]*?>[^]*?<\/noWIkI|noWIki\b[^]*?>[^]*?<\/noWIki|noWiKI\b[^]*?>[^]*?<\/noWiKI|noWiKi\b[^]*?>[^]*?<\/noWiKi|noWikI\b[^]*?>[^]*?<\/noWikI|noWiki\b[^]*?>[^]*?<\/noWiki|nowIKI\b[^]*?>[^]*?<\/nowIKI|nowIKi\b[^]*?>[^]*?<\/nowIKi|nowIkI\b[^]*?>[^]*?<\/nowIkI|nowIki\b[^]*?>[^]*?<\/nowIki|nowiKI\b[^]*?>[^]*?<\/nowiKI|nowiKi\b[^]*?>[^]*?<\/nowiKi|nowikI\b[^]*?>[^]*?<\/nowikI|nowiki\b[^]*?>[^]*?<\/nowiki|PRE\b[^]*?>[^]*?<\/PRE|PRe\b[^]*?>[^]*?<\/PRe|PrE\b[^]*?>[^]*?<\/PrE|Pre\b[^]*?>[^]*?<\/Pre|pRE\b[^]*?>[^]*?<\/pRE|pRe\b[^]*?>[^]*?<\/pRe|prE\b[^]*?>[^]*?<\/prE|pre\b[^]*?>[^]*?<\/pre|SOURCE\b[^]*?>[^]*?<\/SOURCE|SOURCe\b[^]*?>[^]*?<\/SOURCe|SOURcE\b[^]*?>[^]*?<\/SOURcE|SOURce\b[^]*?>[^]*?<\/SOURce|SOUrCE\b[^]*?>[^]*?<\/SOUrCE|SOUrCe\b[^]*?>[^]*?<\/SOUrCe|SOUrcE\b[^]*?>[^]*?<\/SOUrcE|SOUrce\b[^]*?>[^]*?<\/SOUrce|SOuRCE\b[^]*?>[^]*?<\/SOuRCE|SOuRCe\b[^]*?>[^]*?<\/SOuRCe|SOuRcE\b[^]*?>[^]*?<\/SOuRcE|SOuRce\b[^]*?>[^]*?<\/SOuRce|SOurCE\b[^]*?>[^]*?<\/SOurCE|SOurCe\b[^]*?>[^]*?<\/SOurCe|SOurcE\b[^]*?>[^]*?<\/SOurcE|SOurce\b[^]*?>[^]*?<\/SOurce|SoURCE\b[^]*?>[^]*?<\/SoURCE|SoURCe\b[^]*?>[^]*?<\/SoURCe|SoURcE\b[^]*?>[^]*?<\/SoURcE|SoURce\b[^]*?>[^]*?<\/SoURce|SoUrCE\b[^]*?>[^]*?<\/SoUrCE|SoUrCe\b[^]*?>[^]*?<\/SoUrCe|SoUrcE\b[^]*?>[^]*?<\/SoUrcE|SoUrce\b[^]*?>[^]*?<\/SoUrce|SouRCE\b[^]*?>[^]*?<\/SouRCE|SouRCe\b[^]*?>[^]*?<\/SouRCe|SouRcE\b[^]*?>[^]*?<\/SouRcE|SouRce\b[^]*?>[^]*?<\/SouRce|SourCE\b[^]*?>[^]*?<\/SourCE|SourCe\b[^]*?>[^]*?<\/SourCe|SourcE\b[^]*?>[^]*?<\/SourcE|Source\b[^]*?>[^]*?<\/Source|sOURCE\b[^]*?>[^]*?<\/sOURCE|sOURCe\b[^]*?>[^]*?<\/sOURCe|sOURcE\b[^]*?>[^]*?<\/sOURcE|sOURce\b[^]*?>[^]*?<\/sOURce|sOUrCE\b[^]*?>[^]*?<\/sOUrCE|sOUrCe\b[^]*?>[^]*?<\/sOUrCe|sOUrcE\b[^]*?>[^]*?<\/sOUrcE|sOUrce\b[^]*?>[^]*?<\/sOUrce|sOuRCE\b[^]*?>[^]*?<\/sOuRCE|sOuRCe\b[^]*?>[^]*?<\/sOuRCe|sOuRcE\b[^]*?>[^]*?<\/sOuRcE|sOuRce\b[^]*?>[^]*?<\/sOuRce|sOurCE\b[^]*?>[^]*?<\/sOurCE|sOurCe\b[^]*?>[^]*?<\/sOurCe|sOurcE\b[^]*?>[^]*?<\/sOurcE|sOurce\b[^]*?>[^]*?<\/sOurce|soURCE\b[^]*?>[^]*?<\/soURCE|soURCe\b[^]*?>[^]*?<\/soURCe|soURcE\b[^]*?>[^]*?<\/soURcE|soURce\b[^]*?>[^]*?<\/soURce|soUrCE\b[^]*?>[^]*?<\/soUrCE|soUrCe\b[^]*?>[^]*?<\/soUrCe|soUrcE\b[^]*?>[^]*?<\/soUrcE|soUrce\b[^]*?>[^]*?<\/soUrce|souRCE\b[^]*?>[^]*?<\/souRCE|souRCe\b[^]*?>[^]*?<\/souRCe|souRcE\b[^]*?>[^]*?<\/souRcE|souRce\b[^]*?>[^]*?<\/souRce|sourCE\b[^]*?>[^]*?<\/sourCE|sourCe\b[^]*?>[^]*?<\/sourCe|sourcE\b[^]*?>[^]*?<\/sourcE|source\b[^]*?>[^]*?<\/source)>/,
			},
		]);
	});
});
