import { assert } from "chai";
import { Parser } from "../../src/js";
import { toPatternString } from "../../src/ast";



describe('JS createCharSet', function () {

	interface TestCase {
		literal: { source: string; flags: string };
		expected: string | Error;
	}

	function test(cases: Iterable<TestCase>): void {
		for (const { literal, expected } of cases) {
			it(`/${literal.source}/${literal.flags}`, function () {
				if (typeof expected === "string") {
					const parser = new Parser(literal);
					assert.strictEqual(toPatternString(parser.parse().expression), expected);
				} else {
					assert.throws(() => {
						const parser = new Parser(literal);
						parser.parse();
					});
				}
			});
		}
	}

	const cases: TestCase[] = [
		{
			literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/,
			expected: "[61][62][63][64][65][66][67][68][69][6a][6b][6c][6d][6e][6f][70][71][72][73][74][75][76][77][78][79][7a][20][41][42][43][44][45][46][47][48][49][4a][4b][4c][4d][4e][4f][50][51][52][53][54][55][56][57][58][59][5a]"
		},
		{
			literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/i,
			expected: "[41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a][20][41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a]"
		},
		{
			literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/u,
			expected: "[61][62][63][64][65][66][67][68][69][6a][6b][6c][6d][6e][6f][70][71][72][73][74][75][76][77][78][79][7a][20][41][42][43][44][45][46][47][48][49][4a][4b][4c][4d][4e][4f][50][51][52][53][54][55][56][57][58][59][5a]"
		},
		{
			literal: /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/iu,
			expected: "[41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b, 212a][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73, 17f][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a][20][41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b, 212a][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73, 17f][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a]"
		},

		{
			literal: /\w/,
			expected: "[30..39, 41..5a, 5f, 61..7a]"
		},
		{
			literal: /\w/i,
			expected: "[30..39, 41..5a, 5f, 61..7a]"
		},
		{
			literal: /\w/u,
			expected: "[30..39, 41..5a, 5f, 61..7a]"
		},
		{
			literal: /\w/iu,
			expected: "[30..39, 41..5a, 5f, 61..7a, 17f, 212a]"
		},
		{
			literal: /\W/,
			expected: "[0..2f, 3a..40, 5b..5e, 60, 7b..ffff]"
		},
		{
			literal: /\W/i,
			expected: "[0..2f, 3a..40, 5b..5e, 60, 7b..ffff]"
		},
		{
			literal: /\W/u,
			expected: "[0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]"
		},
		{
			literal: /\W/iu,
			expected: "[0..2f, 3a..40, 5b..5e, 60, 7b..17e, 180..2129, 212b..10ffff]"
		},

		{
			literal: /\d/,
			expected: "[30..39]"
		},
		{
			literal: /\d/i,
			expected: "[30..39]"
		},
		{
			literal: /\d/u,
			expected: "[30..39]"
		},
		{
			literal: /\d/iu,
			expected: "[30..39]"
		},

		{
			literal: /\s/,
			expected: "[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]"
		},
		{
			literal: /\s/i,
			expected: "[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]"
		},
		{
			literal: /\s/u,
			expected: "[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]"
		},
		{
			literal: /\s/iu,
			expected: "[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]"
		},

		{
			literal: /\p{ASCII}/,
			expected: "[70][7b][41][53][43][49][49][7d]"
		},
		{
			literal: /\p{ASCII}/u,
			expected: "[0..7f]"
		},
		{
			literal: /\p{ASCII}/iu,
			expected: "[0..7f, 17f, 212a]"
		},
		{
			literal: /\P{ASCII}/u,
			expected: "[80..10ffff]"
		},
		{
			literal: /\P{ASCII}/iu,
			expected: "[80..17e, 180..2129, 212b..10ffff]"
		},

		{
			literal: /\p{Any}/u,
			expected: "[0..10ffff]"
		},
		{
			literal: /\p{Any}/iu,
			expected: "[0..10ffff]"
		},
		{
			literal: /\P{Any}/u,
			expected: "[]"
		},
		{
			literal: /\P{Any}/iu,
			expected: "[]"
		},

		{
			literal: /\p{General_Category=Control}/u,
			expected: "[0..1f, 7f..9f]"
		},
		{
			literal: /\p{gc=Control}/u,
			expected: "[0..1f, 7f..9f]"
		},
		{
			literal: /\p{Control}/u,
			expected: "[0..1f, 7f..9f]"
		},
		{
			literal: /\p{Cc}/u,
			expected: "[0..1f, 7f..9f]"
		},

		{
			literal: /\p{Emoji_Presentation}/u,
			expected: "[231a..231b, 23e9..23ec, 23f0, 23f3, 25fd..25fe, 2614..2615, 2648..2653, 267f, 2693, 26a1, 26aa..26ab, 26bd..26be, 26c4..26c5, 26ce, 26d4, 26ea, 26f2..26f3, 26f5, 26fa, 26fd, 2705, 270a..270b, 2728, 274c, 274e, 2753..2755, 2757, 2795..2797, 27b0, 27bf, 2b1b..2b1c, 2b50, 2b55, 1f004, 1f0cf, 1f18e, 1f191..1f19a, 1f1e6..1f1ff, 1f201, 1f21a, 1f22f, 1f232..1f236, 1f238..1f23a, 1f250..1f251, 1f300..1f320, 1f32d..1f335, 1f337..1f37c, 1f37e..1f393, 1f3a0..1f3ca, 1f3cf..1f3d3, 1f3e0..1f3f0, 1f3f4, 1f3f8..1f43e, 1f440, 1f442..1f4fc, 1f4ff..1f53d, 1f54b..1f54e, 1f550..1f567, 1f57a, 1f595..1f596, 1f5a4, 1f5fb..1f64f, 1f680..1f6c5, 1f6cc, 1f6d0..1f6d2, 1f6d5..1f6d7, 1f6eb..1f6ec, 1f6f4..1f6fc, 1f7e0..1f7eb, 1f90c..1f93a, 1f93c..1f945, 1f947..1f978, 1f97a..1f9cb, 1f9cd..1f9ff, 1fa70..1fa74, 1fa78..1fa7a, 1fa80..1fa86, 1fa90..1faa8, 1fab0..1fab6, 1fac0..1fac2, 1fad0..1fad6]"
		},

		{
			literal: /\p{Script=Latin}/u,
			expected: "[41..5a, 61..7a, aa, ba, c0..d6, d8..f6, f8..2b8, 2e0..2e4, 1d00..1d25, 1d2c..1d5c, 1d62..1d65, 1d6b..1d77, 1d79..1dbe, 1e00..1eff, 2071, 207f, 2090..209c, 212a..212b, 2132, 214e, 2160..2188, 2c60..2c7f, a722..a787, a78b..a7bf, a7c2..a7ca, a7f5..a7ff, ab30..ab5a, ab5c..ab64, ab66..ab69, fb00..fb06, ff21..ff3a, ff41..ff5a]"
		},
		{
			literal: /\p{Script=Latin}/iu,
			expected: "[41..5a, 61..7a, aa, ba, c0..d6, d8..f6, f8..2b8, 2e0..2e4, 1d00..1d25, 1d2c..1d5c, 1d62..1d65, 1d6b..1d77, 1d79..1dbe, 1e00..1eff, 2071, 207f, 2090..209c, 212a..212b, 2132, 214e, 2160..2188, 2c60..2c7f, a722..a787, a78b..a7bf, a7c2..a7ca, a7f5..a7ff, ab30..ab5a, ab5c..ab64, ab66..ab69, fb00..fb06, ff21..ff3a, ff41..ff5a]"
		},
		{
			literal: /\p{Script=Grek}/u,
			expected: "[370..373, 375..377, 37a..37d, 37f, 384, 386, 388..38a, 38c, 38e..3a1, 3a3..3e1, 3f0..3ff, 1d26..1d2a, 1d5d..1d61, 1d66..1d6a, 1dbf, 1f00..1f15, 1f18..1f1d, 1f20..1f45, 1f48..1f4d, 1f50..1f57, 1f59, 1f5b, 1f5d, 1f5f..1f7d, 1f80..1fb4, 1fb6..1fc4, 1fc6..1fd3, 1fd6..1fdb, 1fdd..1fef, 1ff2..1ff4, 1ff6..1ffe, 2126, ab65, 10140..1018e, 101a0, 1d200..1d245]"
		},
		{
			literal: /\p{Script=Grek}/iu,
			expected: "[b5, 345, 370..373, 375..377, 37a..37d, 37f, 384, 386, 388..38a, 38c, 38e..3a1, 3a3..3e1, 3f0..3ff, 1d26..1d2a, 1d5d..1d61, 1d66..1d6a, 1dbf, 1f00..1f15, 1f18..1f1d, 1f20..1f45, 1f48..1f4d, 1f50..1f57, 1f59, 1f5b, 1f5d, 1f5f..1f7d, 1f80..1fb4, 1fb6..1fc4, 1fc6..1fd3, 1fd6..1fdb, 1fdd..1fef, 1ff2..1ff4, 1ff6..1ffe, 2126, ab65, 10140..1018e, 101a0, 1d200..1d245]"
		},
		{
			literal: /\p{Script=Cyrillic}/u,
			expected: "[400..484, 487..52f, 1c80..1c88, 1d2b, 1d78, 2de0..2dff, a640..a69f, fe2e..fe2f]"
		},
		{
			literal: /\p{Script=Cyrillic}/iu,
			expected: "[400..484, 487..52f, 1c80..1c88, 1d2b, 1d78, 2de0..2dff, a640..a69f, fe2e..fe2f]"
		},

		{
			literal: /\p{Script=Thaana}/u,
			expected: "[780..7b1]"
		},
		{
			literal: /\p{Script_Extensions=Thaana}/u,
			expected: "[60c, 61b..61c, 61f, 660..669, 780..7b1, fdf2, fdfd]"
		},
	];

	test(cases);
});
