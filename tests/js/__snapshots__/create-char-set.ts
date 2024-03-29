/* eslint-disable */

var unescapeBackslashes = (str: string): string => {
	return str.replace(/(\\*)(`|\$\{|\\u(?![a-fA-F0-9]{4}))/g, (m, backslashes: string, c: string) => {
		return "\\".repeat(Math.floor(backslashes.length / 2)) + c;
	});
};
var lit = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(1, -1));
};
var n = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(0, -1));
};

module.exports[n`JS createCharSet >> Literal tests >> /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/ `] = lit`
[61][62][63][64][65][66][67][68][69][6a][6b][6c][6d][6e][6f][70][71][72][73][74][75][76][77][78][79][7a][20][41][42][43][44][45][46][47][48][49][4a][4b][4c][4d][4e][4f][50][51][52][53][54][55][56][57][58][59][5a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/i `] = lit`
[41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a][20][41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/u `] = lit`
[61][62][63][64][65][66][67][68][69][6a][6b][6c][6d][6e][6f][70][71][72][73][74][75][76][77][78][79][7a][20][41][42][43][44][45][46][47][48][49][4a][4b][4c][4d][4e][4f][50][51][52][53][54][55][56][57][58][59][5a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ/iu `] = lit`
[41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b, 212a][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73, 17f][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a][20][41, 61][42, 62][43, 63][44, 64][45, 65][46, 66][47, 67][48, 68][49, 69][4a, 6a][4b, 6b, 212a][4c, 6c][4d, 6d][4e, 6e][4f, 6f][50, 70][51, 71][52, 72][53, 73, 17f][54, 74][55, 75][56, 76][57, 77][58, 78][59, 79][5a, 7a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[a-z]/ `] = lit`
[61..7a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[a-z]/i `] = lit`
[41..5a, 61..7a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[a-z]/u `] = lit`
[61..7a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[a-z]/iu `] = lit`
[41..5a, 61..7a, 17f, 212a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\w/ `] = lit`
[30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\w/i `] = lit`
[30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\w/u `] = lit`
[30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\w/iu `] = lit`
[30..39, 41..5a, 5f, 61..7a, 17f, 212a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\w/v `] = lit`
[30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\w/iv `] = lit`
[30..39, 41..5a, 5f, 61..7a, 17f, 212a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\W/ `] = lit`
[0..2f, 3a..40, 5b..5e, 60, 7b..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\W/i `] = lit`
[0..2f, 3a..40, 5b..5e, 60, 7b..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\W/u `] = lit`
[0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\W/iu `] = lit`
[0..2f, 3a..40, 5b..5e, 60, 7b..17e, 180..2129, 212b..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\W/v `] = lit`
[0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\W/iv `] = lit`
[0..2f, 3a..40, 5b..5e, 60, 7b..17e, 180..2129, 212b..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\d/ `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\d/i `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\d/u `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\d/iu `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\D/ `] = lit`
[0..2f, 3a..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\D/i `] = lit`
[0..2f, 3a..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\D/u `] = lit`
[0..2f, 3a..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\D/iu `] = lit`
[0..2f, 3a..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\s/ `] = lit`
[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\s/i `] = lit`
[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\s/u `] = lit`
[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\s/iu `] = lit`
[9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\S/ `] = lit`
[0..8, e..1f, 21..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\S/i `] = lit`
[0..8, e..1f, 21..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\S/u `] = lit`
[0..8, e..1f, 21..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\S/iu `] = lit`
[0..8, e..1f, 21..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /./ `] = lit`
[0..9, b..c, e..2027, 202a..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /./i `] = lit`
[0..9, b..c, e..2027, 202a..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /./m `] = lit`
[0..9, b..c, e..2027, 202a..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /./s `] = lit`
[0..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /./u `] = lit`
[0..9, b..c, e..2027, 202a..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /./iu `] = lit`
[0..9, b..c, e..2027, 202a..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /./mu `] = lit`
[0..9, b..c, e..2027, 202a..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /./su `] = lit`
[0..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\s\S]/ `] = lit`
[0..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\s\S]/u `] = lit`
[0..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^]/u `] = lit`
[0..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^\D][^\d]/ `] = lit`
[30..39][0..2f, 3a..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^a-cx-z]/ `] = lit`
[0..60, 64..77, 7b..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /a[A][aA]/i `] = lit`
[41, 61][41, 61][41, 61]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^a-cx-z]/i `] = lit`
[0..40, 44..57, 5b..60, 64..77, 7b..ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{ASCII}/u `] = lit`
[0..7f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{ASCII}/iu `] = lit`
[0..7f, 17f, 212a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{ASCII}/iv `] = lit`
[0..7f, 17f, 212a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\P{ASCII}/u `] = lit`
[80..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\P{ASCII}/iu `] = lit`
[4b, 53, 6b, 73, 80..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\P{ASCII}/iv `] = lit`
[80..17e, 180..2129, 212b..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Any}/u `] = lit`
[0..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Any}/iu `] = lit`
[0..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\P{Any}/u `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\P{Any}/iu `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{General_Category=Control}/u `] = lit`
[0..1f, 7f..9f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{gc=Control}/u `] = lit`
[0..1f, 7f..9f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Control}/u `] = lit`
[0..1f, 7f..9f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Cc}/u `] = lit`
[0..1f, 7f..9f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Emoji_Presentation}/u `] = lit`
[231a..231b, 23e9..23ec, 23f0, 23f3, 25fd..25fe, 2614..2615, 2648..2653, 267f, 2693, 26a1, 26aa..26ab, 26bd..26be, 26c4..26c5, 26ce, 26d4, 26ea, 26f2..26f3, 26f5, 26fa, 26fd, 2705, 270a..270b, 2728, 274c, 274e, 2753..2755, 2757, 2795..2797, 27b0, 27bf, 2b1b..2b1c, 2b50, 2b55, 1f004, 1f0cf, 1f18e, 1f191..1f19a, 1f1e6..1f1ff, 1f201, 1f21a, 1f22f, 1f232..1f236, 1f238..1f23a, 1f250..1f251, 1f300..1f320, 1f32d..1f335, 1f337..1f37c, 1f37e..1f393, 1f3a0..1f3ca, 1f3cf..1f3d3, 1f3e0..1f3f0, 1f3f4, 1f3f8..1f43e, 1f440, 1f442..1f4fc, 1f4ff..1f53d, 1f54b..1f54e, 1f550..1f567, 1f57a, 1f595..1f596, 1f5a4, 1f5fb..1f64f, 1f680..1f6c5, 1f6cc, 1f6d0..1f6d2, 1f6d5..1f6d7, 1f6dc..1f6df, 1f6eb..1f6ec, 1f6f4..1f6fc, 1f7e0..1f7eb, 1f7f0, 1f90c..1f93a, 1f93c..1f945, 1f947..1f9ff, 1fa70..1fa7c, 1fa80..1fa88, 1fa90..1fabd, 1fabf..1fac5, 1face..1fadb, 1fae0..1fae8, 1faf0..1faf8]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Script=Latin}/u `] = lit`
[41..5a, 61..7a, aa, ba, c0..d6, d8..f6, f8..2b8, 2e0..2e4, 1d00..1d25, 1d2c..1d5c, 1d62..1d65, 1d6b..1d77, 1d79..1dbe, 1e00..1eff, 2071, 207f, 2090..209c, 212a..212b, 2132, 214e, 2160..2188, 2c60..2c7f, a722..a787, a78b..a7ca, a7d0..a7d1, a7d3, a7d5..a7d9, a7f2..a7ff, ab30..ab5a, ab5c..ab64, ab66..ab69, fb00..fb06, ff21..ff3a, ff41..ff5a, 10780..10785, 10787..107b0, 107b2..107ba, 1df00..1df1e, 1df25..1df2a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Script=Latin}/iu `] = lit`
[41..5a, 61..7a, aa, ba, c0..d6, d8..f6, f8..2b8, 2e0..2e4, 1d00..1d25, 1d2c..1d5c, 1d62..1d65, 1d6b..1d77, 1d79..1dbe, 1e00..1eff, 2071, 207f, 2090..209c, 212a..212b, 2132, 214e, 2160..2188, 2c60..2c7f, a722..a787, a78b..a7ca, a7d0..a7d1, a7d3, a7d5..a7d9, a7f2..a7ff, ab30..ab5a, ab5c..ab64, ab66..ab69, fb00..fb06, ff21..ff3a, ff41..ff5a, 10780..10785, 10787..107b0, 107b2..107ba, 1df00..1df1e, 1df25..1df2a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Script=Grek}/u `] = lit`
[370..373, 375..377, 37a..37d, 37f, 384, 386, 388..38a, 38c, 38e..3a1, 3a3..3e1, 3f0..3ff, 1d26..1d2a, 1d5d..1d61, 1d66..1d6a, 1dbf, 1f00..1f15, 1f18..1f1d, 1f20..1f45, 1f48..1f4d, 1f50..1f57, 1f59, 1f5b, 1f5d, 1f5f..1f7d, 1f80..1fb4, 1fb6..1fc4, 1fc6..1fd3, 1fd6..1fdb, 1fdd..1fef, 1ff2..1ff4, 1ff6..1ffe, 2126, ab65, 10140..1018e, 101a0, 1d200..1d245]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Script=Grek}/iu `] = lit`
[b5, 345, 370..373, 375..377, 37a..37d, 37f, 384, 386, 388..38a, 38c, 38e..3a1, 3a3..3e1, 3f0..3ff, 1d26..1d2a, 1d5d..1d61, 1d66..1d6a, 1dbf, 1f00..1f15, 1f18..1f1d, 1f20..1f45, 1f48..1f4d, 1f50..1f57, 1f59, 1f5b, 1f5d, 1f5f..1f7d, 1f80..1fb4, 1fb6..1fc4, 1fc6..1fd3, 1fd6..1fdb, 1fdd..1fef, 1ff2..1ff4, 1ff6..1ffe, 2126, ab65, 10140..1018e, 101a0, 1d200..1d245]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Script=Cyrillic}/u `] = lit`
[400..484, 487..52f, 1c80..1c88, 1d2b, 1d78, 2de0..2dff, a640..a69f, fe2e..fe2f, 1e030..1e06d, 1e08f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Script=Cyrillic}/iu `] = lit`
[400..484, 487..52f, 1c80..1c88, 1d2b, 1d78, 2de0..2dff, a640..a69f, fe2e..fe2f, 1e030..1e06d, 1e08f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Script=Thaana}/u `] = lit`
[780..7b1]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Script_Extensions=Thaana}/u `] = lit`
[60c, 61b..61c, 61f, 660..669, 780..7b1, fdf2, fdfd]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Ll}/u `] = lit`
[61..7a, b5, df..f6, f8..ff, 101, 103, 105, 107, 109, 10b, 10d, 10f, 111, 113, 115, 117, 119, 11b, 11d, 11f, 121, 123, 125, 127, 129, 12b, 12d, 12f, 131, 133, 135, 137..138, 13a, 13c, 13e, 140, 142, 144, 146, 148..149, 14b, 14d, 14f, 151, 153, 155, 157, 159, 15b, 15d, 15f, 161, 163, 165, 167, 169, 16b, 16d, 16f, 171, 173, 175, 177, 17a, 17c, 17e..180, 183, 185, 188, 18c..18d, 192, 195, 199..19b, 19e, 1a1, 1a3, 1a5, 1a8, 1aa..1ab, 1ad, 1b0, 1b4, 1b6, 1b9..1ba, 1bd..1bf, 1c6, 1c9, 1cc, 1ce, 1d0, 1d2, 1d4, 1d6, 1d8, 1da, 1dc..1dd, 1df, 1e1, 1e3, 1e5, 1e7, 1e9, 1eb, 1ed, 1ef..1f0, 1f3, 1f5, 1f9, 1fb, 1fd, 1ff, 201, 203, 205, 207, 209, 20b, 20d, 20f, 211, 213, 215, 217, 219, 21b, 21d, 21f, 221, 223, 225, 227, 229, 22b, 22d, 22f, 231, 233..239, 23c, 23f..240, 242, 247, 249, 24b, 24d, 24f..293, 295..2af, 371, 373, 377, 37b..37d, 390, 3ac..3ce, 3d0..3d1, 3d5..3d7, 3d9, 3db, 3dd, 3df, 3e1, 3e3, 3e5, 3e7, 3e9, 3eb, 3ed, 3ef..3f3, 3f5, 3f8, 3fb..3fc, 430..45f, 461, 463, 465, 467, 469, 46b, 46d, 46f, 471, 473, 475, 477, 479, 47b, 47d, 47f, 481, 48b, 48d, 48f, 491, 493, 495, 497, 499, 49b, 49d, 49f, 4a1, 4a3, 4a5, 4a7, 4a9, 4ab, 4ad, 4af, 4b1, 4b3, 4b5, 4b7, 4b9, 4bb, 4bd, 4bf, 4c2, 4c4, 4c6, 4c8, 4ca, 4cc, 4ce..4cf, 4d1, 4d3, 4d5, 4d7, 4d9, 4db, 4dd, 4df, 4e1, 4e3, 4e5, 4e7, 4e9, 4eb, 4ed, 4ef, 4f1, 4f3, 4f5, 4f7, 4f9, 4fb, 4fd, 4ff, 501, 503, 505, 507, 509, 50b, 50d, 50f, 511, 513, 515, 517, 519, 51b, 51d, 51f, 521, 523, 525, 527, 529, 52b, 52d, 52f, 560..588, 10d0..10fa, 10fd..10ff, 13f8..13fd, 1c80..1c88, 1d00..1d2b, 1d6b..1d77, 1d79..1d9a, 1e01, 1e03, 1e05, 1e07, 1e09, 1e0b, 1e0d, 1e0f, 1e11, 1e13, 1e15, 1e17, 1e19, 1e1b, 1e1d, 1e1f, 1e21, 1e23, 1e25, 1e27, 1e29, 1e2b, 1e2d, 1e2f, 1e31, 1e33, 1e35, 1e37, 1e39, 1e3b, 1e3d, 1e3f, 1e41, 1e43, 1e45, 1e47, 1e49, 1e4b, 1e4d, 1e4f, 1e51, 1e53, 1e55, 1e57, 1e59, 1e5b, 1e5d, 1e5f, 1e61, 1e63, 1e65, 1e67, 1e69, 1e6b, 1e6d, 1e6f, 1e71, 1e73, 1e75, 1e77, 1e79, 1e7b, 1e7d, 1e7f, 1e81, 1e83, 1e85, 1e87, 1e89, 1e8b, 1e8d, 1e8f, 1e91, 1e93, 1e95..1e9d, 1e9f, 1ea1, 1ea3, 1ea5, 1ea7, 1ea9, 1eab, 1ead, 1eaf, 1eb1, 1eb3, 1eb5, 1eb7, 1eb9, 1ebb, 1ebd, 1ebf, 1ec1, 1ec3, 1ec5, 1ec7, 1ec9, 1ecb, 1ecd, 1ecf, 1ed1, 1ed3, 1ed5, 1ed7, 1ed9, 1edb, 1edd, 1edf, 1ee1, 1ee3, 1ee5, 1ee7, 1ee9, 1eeb, 1eed, 1eef, 1ef1, 1ef3, 1ef5, 1ef7, 1ef9, 1efb, 1efd, 1eff..1f07, 1f10..1f15, 1f20..1f27, 1f30..1f37, 1f40..1f45, 1f50..1f57, 1f60..1f67, 1f70..1f7d, 1f80..1f87, 1f90..1f97, 1fa0..1fa7, 1fb0..1fb4, 1fb6..1fb7, 1fbe, 1fc2..1fc4, 1fc6..1fc7, 1fd0..1fd3, 1fd6..1fd7, 1fe0..1fe7, 1ff2..1ff4, 1ff6..1ff7, 210a, 210e..210f, 2113, 212f, 2134, 2139, 213c..213d, 2146..2149, 214e, 2184, 2c30..2c5f, 2c61, 2c65..2c66, 2c68, 2c6a, 2c6c, 2c71, 2c73..2c74, 2c76..2c7b, 2c81, 2c83, 2c85, 2c87, 2c89, 2c8b, 2c8d, 2c8f, 2c91, 2c93, 2c95, 2c97, 2c99, 2c9b, 2c9d, 2c9f, 2ca1, 2ca3, 2ca5, 2ca7, 2ca9, 2cab, 2cad, 2caf, 2cb1, 2cb3, 2cb5, 2cb7, 2cb9, 2cbb, 2cbd, 2cbf, 2cc1, 2cc3, 2cc5, 2cc7, 2cc9, 2ccb, 2ccd, 2ccf, 2cd1, 2cd3, 2cd5, 2cd7, 2cd9, 2cdb, 2cdd, 2cdf, 2ce1, 2ce3..2ce4, 2cec, 2cee, 2cf3, 2d00..2d25, 2d27, 2d2d, a641, a643, a645, a647, a649, a64b, a64d, a64f, a651, a653, a655, a657, a659, a65b, a65d, a65f, a661, a663, a665, a667, a669, a66b, a66d, a681, a683, a685, a687, a689, a68b, a68d, a68f, a691, a693, a695, a697, a699, a69b, a723, a725, a727, a729, a72b, a72d, a72f..a731, a733, a735, a737, a739, a73b, a73d, a73f, a741, a743, a745, a747, a749, a74b, a74d, a74f, a751, a753, a755, a757, a759, a75b, a75d, a75f, a761, a763, a765, a767, a769, a76b, a76d, a76f, a771..a778, a77a, a77c, a77f, a781, a783, a785, a787, a78c, a78e, a791, a793..a795, a797, a799, a79b, a79d, a79f, a7a1, a7a3, a7a5, a7a7, a7a9, a7af, a7b5, a7b7, a7b9, a7bb, a7bd, a7bf, a7c1, a7c3, a7c8, a7ca, a7d1, a7d3, a7d5, a7d7, a7d9, a7f6, a7fa, ab30..ab5a, ab60..ab68, ab70..abbf, fb00..fb06, fb13..fb17, ff41..ff5a, 10428..1044f, 104d8..104fb, 10597..105a1, 105a3..105b1, 105b3..105b9, 105bb..105bc, 10cc0..10cf2, 118c0..118df, 16e60..16e7f, 1d41a..1d433, 1d44e..1d454, 1d456..1d467, 1d482..1d49b, 1d4b6..1d4b9, 1d4bb, 1d4bd..1d4c3, 1d4c5..1d4cf, 1d4ea..1d503, 1d51e..1d537, 1d552..1d56b, 1d586..1d59f, 1d5ba..1d5d3, 1d5ee..1d607, 1d622..1d63b, 1d656..1d66f, 1d68a..1d6a5, 1d6c2..1d6da, 1d6dc..1d6e1, 1d6fc..1d714, 1d716..1d71b, 1d736..1d74e, 1d750..1d755, 1d770..1d788, 1d78a..1d78f, 1d7aa..1d7c2, 1d7c4..1d7c9, 1d7cb, 1df00..1df09, 1df0b..1df1e, 1df25..1df2a, 1e922..1e943]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\P{Ll}/u `] = lit`
[0..60, 7b..b4, b6..de, f7, 100, 102, 104, 106, 108, 10a, 10c, 10e, 110, 112, 114, 116, 118, 11a, 11c, 11e, 120, 122, 124, 126, 128, 12a, 12c, 12e, 130, 132, 134, 136, 139, 13b, 13d, 13f, 141, 143, 145, 147, 14a, 14c, 14e, 150, 152, 154, 156, 158, 15a, 15c, 15e, 160, 162, 164, 166, 168, 16a, 16c, 16e, 170, 172, 174, 176, 178..179, 17b, 17d, 181..182, 184, 186..187, 189..18b, 18e..191, 193..194, 196..198, 19c..19d, 19f..1a0, 1a2, 1a4, 1a6..1a7, 1a9, 1ac, 1ae..1af, 1b1..1b3, 1b5, 1b7..1b8, 1bb..1bc, 1c0..1c5, 1c7..1c8, 1ca..1cb, 1cd, 1cf, 1d1, 1d3, 1d5, 1d7, 1d9, 1db, 1de, 1e0, 1e2, 1e4, 1e6, 1e8, 1ea, 1ec, 1ee, 1f1..1f2, 1f4, 1f6..1f8, 1fa, 1fc, 1fe, 200, 202, 204, 206, 208, 20a, 20c, 20e, 210, 212, 214, 216, 218, 21a, 21c, 21e, 220, 222, 224, 226, 228, 22a, 22c, 22e, 230, 232, 23a..23b, 23d..23e, 241, 243..246, 248, 24a, 24c, 24e, 294, 2b0..370, 372, 374..376, 378..37a, 37e..38f, 391..3ab, 3cf, 3d2..3d4, 3d8, 3da, 3dc, 3de, 3e0, 3e2, 3e4, 3e6, 3e8, 3ea, 3ec, 3ee, 3f4, 3f6..3f7, 3f9..3fa, 3fd..42f, 460, 462, 464, 466, 468, 46a, 46c, 46e, 470, 472, 474, 476, 478, 47a, 47c, 47e, 480, 482..48a, 48c, 48e, 490, 492, 494, 496, 498, 49a, 49c, 49e, 4a0, 4a2, 4a4, 4a6, 4a8, 4aa, 4ac, 4ae, 4b0, 4b2, 4b4, 4b6, 4b8, 4ba, 4bc, 4be, 4c0..4c1, 4c3, 4c5, 4c7, 4c9, 4cb, 4cd, 4d0, 4d2, 4d4, 4d6, 4d8, 4da, 4dc, 4de, 4e0, 4e2, 4e4, 4e6, 4e8, 4ea, 4ec, 4ee, 4f0, 4f2, 4f4, 4f6, 4f8, 4fa, 4fc, 4fe, 500, 502, 504, 506, 508, 50a, 50c, 50e, 510, 512, 514, 516, 518, 51a, 51c, 51e, 520, 522, 524, 526, 528, 52a, 52c, 52e, 530..55f, 589..10cf, 10fb..10fc, 1100..13f7, 13fe..1c7f, 1c89..1cff, 1d2c..1d6a, 1d78, 1d9b..1e00, 1e02, 1e04, 1e06, 1e08, 1e0a, 1e0c, 1e0e, 1e10, 1e12, 1e14, 1e16, 1e18, 1e1a, 1e1c, 1e1e, 1e20, 1e22, 1e24, 1e26, 1e28, 1e2a, 1e2c, 1e2e, 1e30, 1e32, 1e34, 1e36, 1e38, 1e3a, 1e3c, 1e3e, 1e40, 1e42, 1e44, 1e46, 1e48, 1e4a, 1e4c, 1e4e, 1e50, 1e52, 1e54, 1e56, 1e58, 1e5a, 1e5c, 1e5e, 1e60, 1e62, 1e64, 1e66, 1e68, 1e6a, 1e6c, 1e6e, 1e70, 1e72, 1e74, 1e76, 1e78, 1e7a, 1e7c, 1e7e, 1e80, 1e82, 1e84, 1e86, 1e88, 1e8a, 1e8c, 1e8e, 1e90, 1e92, 1e94, 1e9e, 1ea0, 1ea2, 1ea4, 1ea6, 1ea8, 1eaa, 1eac, 1eae, 1eb0, 1eb2, 1eb4, 1eb6, 1eb8, 1eba, 1ebc, 1ebe, 1ec0, 1ec2, 1ec4, 1ec6, 1ec8, 1eca, 1ecc, 1ece, 1ed0, 1ed2, 1ed4, 1ed6, 1ed8, 1eda, 1edc, 1ede, 1ee0, 1ee2, 1ee4, 1ee6, 1ee8, 1eea, 1eec, 1eee, 1ef0, 1ef2, 1ef4, 1ef6, 1ef8, 1efa, 1efc, 1efe, 1f08..1f0f, 1f16..1f1f, 1f28..1f2f, 1f38..1f3f, 1f46..1f4f, 1f58..1f5f, 1f68..1f6f, 1f7e..1f7f, 1f88..1f8f, 1f98..1f9f, 1fa8..1faf, 1fb5, 1fb8..1fbd, 1fbf..1fc1, 1fc5, 1fc8..1fcf, 1fd4..1fd5, 1fd8..1fdf, 1fe8..1ff1, 1ff5, 1ff8..2109, 210b..210d, 2110..2112, 2114..212e, 2130..2133, 2135..2138, 213a..213b, 213e..2145, 214a..214d, 214f..2183, 2185..2c2f, 2c60, 2c62..2c64, 2c67, 2c69, 2c6b, 2c6d..2c70, 2c72, 2c75, 2c7c..2c80, 2c82, 2c84, 2c86, 2c88, 2c8a, 2c8c, 2c8e, 2c90, 2c92, 2c94, 2c96, 2c98, 2c9a, 2c9c, 2c9e, 2ca0, 2ca2, 2ca4, 2ca6, 2ca8, 2caa, 2cac, 2cae, 2cb0, 2cb2, 2cb4, 2cb6, 2cb8, 2cba, 2cbc, 2cbe, 2cc0, 2cc2, 2cc4, 2cc6, 2cc8, 2cca, 2ccc, 2cce, 2cd0, 2cd2, 2cd4, 2cd6, 2cd8, 2cda, 2cdc, 2cde, 2ce0, 2ce2, 2ce5..2ceb, 2ced, 2cef..2cf2, 2cf4..2cff, 2d26, 2d28..2d2c, 2d2e..a640, a642, a644, a646, a648, a64a, a64c, a64e, a650, a652, a654, a656, a658, a65a, a65c, a65e, a660, a662, a664, a666, a668, a66a, a66c, a66e..a680, a682, a684, a686, a688, a68a, a68c, a68e, a690, a692, a694, a696, a698, a69a, a69c..a722, a724, a726, a728, a72a, a72c, a72e, a732, a734, a736, a738, a73a, a73c, a73e, a740, a742, a744, a746, a748, a74a, a74c, a74e, a750, a752, a754, a756, a758, a75a, a75c, a75e, a760, a762, a764, a766, a768, a76a, a76c, a76e, a770, a779, a77b, a77d..a77e, a780, a782, a784, a786, a788..a78b, a78d, a78f..a790, a792, a796, a798, a79a, a79c, a79e, a7a0, a7a2, a7a4, a7a6, a7a8, a7aa..a7ae, a7b0..a7b4, a7b6, a7b8, a7ba, a7bc, a7be, a7c0, a7c2, a7c4..a7c7, a7c9, a7cb..a7d0, a7d2, a7d4, a7d6, a7d8, a7da..a7f5, a7f7..a7f9, a7fb..ab2f, ab5b..ab5f, ab69..ab6f, abc0..faff, fb07..fb12, fb18..ff40, ff5b..10427, 10450..104d7, 104fc..10596, 105a2, 105b2, 105ba, 105bd..10cbf, 10cf3..118bf, 118e0..16e5f, 16e80..1d419, 1d434..1d44d, 1d455, 1d468..1d481, 1d49c..1d4b5, 1d4ba, 1d4bc, 1d4c4, 1d4d0..1d4e9, 1d504..1d51d, 1d538..1d551, 1d56c..1d585, 1d5a0..1d5b9, 1d5d4..1d5ed, 1d608..1d621, 1d63c..1d655, 1d670..1d689, 1d6a6..1d6c1, 1d6db, 1d6e2..1d6fb, 1d715, 1d71c..1d735, 1d74f, 1d756..1d76f, 1d789, 1d790..1d7a9, 1d7c3, 1d7ca, 1d7cc..1deff, 1df0a, 1df1f..1df24, 1df2b..1e921, 1e944..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Ll}/iu `] = lit`
[41..5a, 61..7a, b5, c0..d6, d8..f6, f8..12f, 131..1ba, 1bc..1bf, 1c4..293, 295..2af, 345, 370..373, 376..377, 37b..37d, 37f, 386, 388..38a, 38c, 38e..3a1, 3a3..3d1, 3d5..3f5, 3f7..481, 48a..52f, 531..556, 560..588, 10a0..10c5, 10c7, 10cd, 10d0..10fa, 10fd..10ff, 13a0..13f5, 13f8..13fd, 1c80..1c88, 1c90..1cba, 1cbd..1cbf, 1d00..1d2b, 1d6b..1d77, 1d79..1d9a, 1e00..1f15, 1f18..1f1d, 1f20..1f45, 1f48..1f4d, 1f50..1f57, 1f59, 1f5b, 1f5d, 1f5f..1f7d, 1f80..1fb4, 1fb6..1fbc, 1fbe, 1fc2..1fc4, 1fc6..1fcc, 1fd0..1fd3, 1fd6..1fdb, 1fe0..1fec, 1ff2..1ff4, 1ff6..1ffc, 210a, 210e..210f, 2113, 2126, 212a..212b, 212f, 2132, 2134, 2139, 213c..213d, 2146..2149, 214e, 2183..2184, 2c00..2c7b, 2c7e..2ce4, 2ceb..2cee, 2cf2..2cf3, 2d00..2d25, 2d27, 2d2d, a640..a66d, a680..a69b, a722..a76f, a771..a787, a78b..a78e, a790..a7ca, a7d0..a7d1, a7d3, a7d5..a7d9, a7f5..a7f6, a7fa, ab30..ab5a, ab60..ab68, ab70..abbf, fb00..fb06, fb13..fb17, ff21..ff3a, ff41..ff5a, 10400..1044f, 104b0..104d3, 104d8..104fb, 10570..1057a, 1057c..1058a, 1058c..10592, 10594..10595, 10597..105a1, 105a3..105b1, 105b3..105b9, 105bb..105bc, 10c80..10cb2, 10cc0..10cf2, 118a0..118df, 16e40..16e7f, 1d41a..1d433, 1d44e..1d454, 1d456..1d467, 1d482..1d49b, 1d4b6..1d4b9, 1d4bb, 1d4bd..1d4c3, 1d4c5..1d4cf, 1d4ea..1d503, 1d51e..1d537, 1d552..1d56b, 1d586..1d59f, 1d5ba..1d5d3, 1d5ee..1d607, 1d622..1d63b, 1d656..1d66f, 1d68a..1d6a5, 1d6c2..1d6da, 1d6dc..1d6e1, 1d6fc..1d714, 1d716..1d71b, 1d736..1d74e, 1d750..1d755, 1d770..1d788, 1d78a..1d78f, 1d7aa..1d7c2, 1d7c4..1d7c9, 1d7cb, 1df00..1df09, 1df0b..1df1e, 1df25..1df2a, 1e900..1e943]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\P{Ll}/iu `] = lit`
[0..130, 132..137, 139..148, 14a..18c, 18e..19a, 19c..1a9, 1ac..1b9, 1bb..1bd, 1bf..1ef, 1f1..220, 222..233, 23a..254, 256..257, 259, 25b..25c, 260..261, 263, 265..266, 268..26c, 26f, 271..272, 275, 27d, 280, 282..283, 287..28c, 292, 294, 29d..29e, 2b0..38f, 391..3af, 3b1..3fb, 3fd..55f, 561..586, 589..1cff, 1d2c..1d6a, 1d78..1d79, 1d7d, 1d8e, 1d9b..1e95, 1e9b, 1e9e, 1ea0..1f4f, 1f51, 1f53, 1f55, 1f57..1fb1, 1fb3, 1fb5, 1fb8..1fc1, 1fc3, 1fc5, 1fc8..1fd1, 1fd4..1fd5, 1fd8..1fe1, 1fe5, 1fe8..1ff1, 1ff3, 1ff5, 1ff8..2109, 210b..210d, 2110..2112, 2114..212e, 2130..2133, 2135..2138, 213a..213b, 213e..2145, 214a..2c70, 2c72..2c73, 2c75..2c76, 2c7c..2ce3, 2ce5..a72f, a732..a770, a779..a78d, a78f..a794, a796..a7ae, a7b0..a7d2, a7d4, a7d6..a7f9, a7fb..ab2f, ab53, ab5b..ab5f, ab69..faff, fb07..fb12, fb18..1d419, 1d434..1d44d, 1d455, 1d468..1d481, 1d49c..1d4b5, 1d4ba, 1d4bc, 1d4c4, 1d4d0..1d4e9, 1d504..1d51d, 1d538..1d551, 1d56c..1d585, 1d5a0..1d5b9, 1d5d4..1d5ed, 1d608..1d621, 1d63c..1d655, 1d670..1d689, 1d6a6..1d6c1, 1d6db, 1d6e2..1d6fb, 1d715, 1d71c..1d735, 1d74f, 1d756..1d76f, 1d789, 1d790..1d7a9, 1d7c3, 1d7ca, 1d7cc..1deff, 1df0a, 1df1f..1df24, 1df2b..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Ll}/iv `] = lit`
[41..5a, 61..7a, b5, c0..d6, d8..f6, f8..12f, 131..1ba, 1bc..1bf, 1c4..293, 295..2af, 345, 370..373, 376..377, 37b..37d, 37f, 386, 388..38a, 38c, 38e..3a1, 3a3..3d1, 3d5..3f5, 3f7..481, 48a..52f, 531..556, 560..588, 10a0..10c5, 10c7, 10cd, 10d0..10fa, 10fd..10ff, 13a0..13f5, 13f8..13fd, 1c80..1c88, 1c90..1cba, 1cbd..1cbf, 1d00..1d2b, 1d6b..1d77, 1d79..1d9a, 1e00..1f15, 1f18..1f1d, 1f20..1f45, 1f48..1f4d, 1f50..1f57, 1f59, 1f5b, 1f5d, 1f5f..1f7d, 1f80..1fb4, 1fb6..1fbc, 1fbe, 1fc2..1fc4, 1fc6..1fcc, 1fd0..1fd3, 1fd6..1fdb, 1fe0..1fec, 1ff2..1ff4, 1ff6..1ffc, 210a, 210e..210f, 2113, 2126, 212a..212b, 212f, 2132, 2134, 2139, 213c..213d, 2146..2149, 214e, 2183..2184, 2c00..2c7b, 2c7e..2ce4, 2ceb..2cee, 2cf2..2cf3, 2d00..2d25, 2d27, 2d2d, a640..a66d, a680..a69b, a722..a76f, a771..a787, a78b..a78e, a790..a7ca, a7d0..a7d1, a7d3, a7d5..a7d9, a7f5..a7f6, a7fa, ab30..ab5a, ab60..ab68, ab70..abbf, fb00..fb06, fb13..fb17, ff21..ff3a, ff41..ff5a, 10400..1044f, 104b0..104d3, 104d8..104fb, 10570..1057a, 1057c..1058a, 1058c..10592, 10594..10595, 10597..105a1, 105a3..105b1, 105b3..105b9, 105bb..105bc, 10c80..10cb2, 10cc0..10cf2, 118a0..118df, 16e40..16e7f, 1d41a..1d433, 1d44e..1d454, 1d456..1d467, 1d482..1d49b, 1d4b6..1d4b9, 1d4bb, 1d4bd..1d4c3, 1d4c5..1d4cf, 1d4ea..1d503, 1d51e..1d537, 1d552..1d56b, 1d586..1d59f, 1d5ba..1d5d3, 1d5ee..1d607, 1d622..1d63b, 1d656..1d66f, 1d68a..1d6a5, 1d6c2..1d6da, 1d6dc..1d6e1, 1d6fc..1d714, 1d716..1d71b, 1d736..1d74e, 1d750..1d755, 1d770..1d788, 1d78a..1d78f, 1d7aa..1d7c2, 1d7c4..1d7c9, 1d7cb, 1df00..1df09, 1df0b..1df1e, 1df25..1df2a, 1e900..1e943]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\P{Ll}/iv `] = lit`
[0..40, 5b..60, 7b..b4, b6..bf, d7, f7, 130, 1bb, 1c0..1c3, 294, 2b0..344, 346..36f, 374..375, 378..37a, 37e, 380..385, 387, 38b, 38d, 3a2, 3d2..3d4, 3f6, 482..489, 530, 557..55f, 589..109f, 10c6, 10c8..10cc, 10ce..10cf, 10fb..10fc, 1100..139f, 13f6..13f7, 13fe..1c7f, 1c89..1c8f, 1cbb..1cbc, 1cc0..1cff, 1d2c..1d6a, 1d78, 1d9b..1dff, 1f16..1f17, 1f1e..1f1f, 1f46..1f47, 1f4e..1f4f, 1f58, 1f5a, 1f5c, 1f5e, 1f7e..1f7f, 1fb5, 1fbd, 1fbf..1fc1, 1fc5, 1fcd..1fcf, 1fd4..1fd5, 1fdc..1fdf, 1fed..1ff1, 1ff5, 1ffd..2109, 210b..210d, 2110..2112, 2114..2125, 2127..2129, 212c..212e, 2130..2131, 2133, 2135..2138, 213a..213b, 213e..2145, 214a..214d, 214f..2182, 2185..2bff, 2c7c..2c7d, 2ce5..2cea, 2cef..2cf1, 2cf4..2cff, 2d26, 2d28..2d2c, 2d2e..a63f, a66e..a67f, a69c..a721, a770, a788..a78a, a78f, a7cb..a7cf, a7d2, a7d4, a7da..a7f4, a7f7..a7f9, a7fb..ab2f, ab5b..ab5f, ab69..ab6f, abc0..faff, fb07..fb12, fb18..ff20, ff3b..ff40, ff5b..103ff, 10450..104af, 104d4..104d7, 104fc..1056f, 1057b, 1058b, 10593, 10596, 105a2, 105b2, 105ba, 105bd..10c7f, 10cb3..10cbf, 10cf3..1189f, 118e0..16e3f, 16e80..1d419, 1d434..1d44d, 1d455, 1d468..1d481, 1d49c..1d4b5, 1d4ba, 1d4bc, 1d4c4, 1d4d0..1d4e9, 1d504..1d51d, 1d538..1d551, 1d56c..1d585, 1d5a0..1d5b9, 1d5d4..1d5ed, 1d608..1d621, 1d63c..1d655, 1d670..1d689, 1d6a6..1d6c1, 1d6db, 1d6e2..1d6fb, 1d715, 1d71c..1d735, 1d74f, 1d756..1d76f, 1d789, 1d790..1d7a9, 1d7c3, 1d7ca, 1d7cc..1deff, 1df0a, 1df1f..1df24, 1df2b..1e8ff, 1e944..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^\p{Ll}]/u `] = lit`
[0..60, 7b..b4, b6..de, f7, 100, 102, 104, 106, 108, 10a, 10c, 10e, 110, 112, 114, 116, 118, 11a, 11c, 11e, 120, 122, 124, 126, 128, 12a, 12c, 12e, 130, 132, 134, 136, 139, 13b, 13d, 13f, 141, 143, 145, 147, 14a, 14c, 14e, 150, 152, 154, 156, 158, 15a, 15c, 15e, 160, 162, 164, 166, 168, 16a, 16c, 16e, 170, 172, 174, 176, 178..179, 17b, 17d, 181..182, 184, 186..187, 189..18b, 18e..191, 193..194, 196..198, 19c..19d, 19f..1a0, 1a2, 1a4, 1a6..1a7, 1a9, 1ac, 1ae..1af, 1b1..1b3, 1b5, 1b7..1b8, 1bb..1bc, 1c0..1c5, 1c7..1c8, 1ca..1cb, 1cd, 1cf, 1d1, 1d3, 1d5, 1d7, 1d9, 1db, 1de, 1e0, 1e2, 1e4, 1e6, 1e8, 1ea, 1ec, 1ee, 1f1..1f2, 1f4, 1f6..1f8, 1fa, 1fc, 1fe, 200, 202, 204, 206, 208, 20a, 20c, 20e, 210, 212, 214, 216, 218, 21a, 21c, 21e, 220, 222, 224, 226, 228, 22a, 22c, 22e, 230, 232, 23a..23b, 23d..23e, 241, 243..246, 248, 24a, 24c, 24e, 294, 2b0..370, 372, 374..376, 378..37a, 37e..38f, 391..3ab, 3cf, 3d2..3d4, 3d8, 3da, 3dc, 3de, 3e0, 3e2, 3e4, 3e6, 3e8, 3ea, 3ec, 3ee, 3f4, 3f6..3f7, 3f9..3fa, 3fd..42f, 460, 462, 464, 466, 468, 46a, 46c, 46e, 470, 472, 474, 476, 478, 47a, 47c, 47e, 480, 482..48a, 48c, 48e, 490, 492, 494, 496, 498, 49a, 49c, 49e, 4a0, 4a2, 4a4, 4a6, 4a8, 4aa, 4ac, 4ae, 4b0, 4b2, 4b4, 4b6, 4b8, 4ba, 4bc, 4be, 4c0..4c1, 4c3, 4c5, 4c7, 4c9, 4cb, 4cd, 4d0, 4d2, 4d4, 4d6, 4d8, 4da, 4dc, 4de, 4e0, 4e2, 4e4, 4e6, 4e8, 4ea, 4ec, 4ee, 4f0, 4f2, 4f4, 4f6, 4f8, 4fa, 4fc, 4fe, 500, 502, 504, 506, 508, 50a, 50c, 50e, 510, 512, 514, 516, 518, 51a, 51c, 51e, 520, 522, 524, 526, 528, 52a, 52c, 52e, 530..55f, 589..10cf, 10fb..10fc, 1100..13f7, 13fe..1c7f, 1c89..1cff, 1d2c..1d6a, 1d78, 1d9b..1e00, 1e02, 1e04, 1e06, 1e08, 1e0a, 1e0c, 1e0e, 1e10, 1e12, 1e14, 1e16, 1e18, 1e1a, 1e1c, 1e1e, 1e20, 1e22, 1e24, 1e26, 1e28, 1e2a, 1e2c, 1e2e, 1e30, 1e32, 1e34, 1e36, 1e38, 1e3a, 1e3c, 1e3e, 1e40, 1e42, 1e44, 1e46, 1e48, 1e4a, 1e4c, 1e4e, 1e50, 1e52, 1e54, 1e56, 1e58, 1e5a, 1e5c, 1e5e, 1e60, 1e62, 1e64, 1e66, 1e68, 1e6a, 1e6c, 1e6e, 1e70, 1e72, 1e74, 1e76, 1e78, 1e7a, 1e7c, 1e7e, 1e80, 1e82, 1e84, 1e86, 1e88, 1e8a, 1e8c, 1e8e, 1e90, 1e92, 1e94, 1e9e, 1ea0, 1ea2, 1ea4, 1ea6, 1ea8, 1eaa, 1eac, 1eae, 1eb0, 1eb2, 1eb4, 1eb6, 1eb8, 1eba, 1ebc, 1ebe, 1ec0, 1ec2, 1ec4, 1ec6, 1ec8, 1eca, 1ecc, 1ece, 1ed0, 1ed2, 1ed4, 1ed6, 1ed8, 1eda, 1edc, 1ede, 1ee0, 1ee2, 1ee4, 1ee6, 1ee8, 1eea, 1eec, 1eee, 1ef0, 1ef2, 1ef4, 1ef6, 1ef8, 1efa, 1efc, 1efe, 1f08..1f0f, 1f16..1f1f, 1f28..1f2f, 1f38..1f3f, 1f46..1f4f, 1f58..1f5f, 1f68..1f6f, 1f7e..1f7f, 1f88..1f8f, 1f98..1f9f, 1fa8..1faf, 1fb5, 1fb8..1fbd, 1fbf..1fc1, 1fc5, 1fc8..1fcf, 1fd4..1fd5, 1fd8..1fdf, 1fe8..1ff1, 1ff5, 1ff8..2109, 210b..210d, 2110..2112, 2114..212e, 2130..2133, 2135..2138, 213a..213b, 213e..2145, 214a..214d, 214f..2183, 2185..2c2f, 2c60, 2c62..2c64, 2c67, 2c69, 2c6b, 2c6d..2c70, 2c72, 2c75, 2c7c..2c80, 2c82, 2c84, 2c86, 2c88, 2c8a, 2c8c, 2c8e, 2c90, 2c92, 2c94, 2c96, 2c98, 2c9a, 2c9c, 2c9e, 2ca0, 2ca2, 2ca4, 2ca6, 2ca8, 2caa, 2cac, 2cae, 2cb0, 2cb2, 2cb4, 2cb6, 2cb8, 2cba, 2cbc, 2cbe, 2cc0, 2cc2, 2cc4, 2cc6, 2cc8, 2cca, 2ccc, 2cce, 2cd0, 2cd2, 2cd4, 2cd6, 2cd8, 2cda, 2cdc, 2cde, 2ce0, 2ce2, 2ce5..2ceb, 2ced, 2cef..2cf2, 2cf4..2cff, 2d26, 2d28..2d2c, 2d2e..a640, a642, a644, a646, a648, a64a, a64c, a64e, a650, a652, a654, a656, a658, a65a, a65c, a65e, a660, a662, a664, a666, a668, a66a, a66c, a66e..a680, a682, a684, a686, a688, a68a, a68c, a68e, a690, a692, a694, a696, a698, a69a, a69c..a722, a724, a726, a728, a72a, a72c, a72e, a732, a734, a736, a738, a73a, a73c, a73e, a740, a742, a744, a746, a748, a74a, a74c, a74e, a750, a752, a754, a756, a758, a75a, a75c, a75e, a760, a762, a764, a766, a768, a76a, a76c, a76e, a770, a779, a77b, a77d..a77e, a780, a782, a784, a786, a788..a78b, a78d, a78f..a790, a792, a796, a798, a79a, a79c, a79e, a7a0, a7a2, a7a4, a7a6, a7a8, a7aa..a7ae, a7b0..a7b4, a7b6, a7b8, a7ba, a7bc, a7be, a7c0, a7c2, a7c4..a7c7, a7c9, a7cb..a7d0, a7d2, a7d4, a7d6, a7d8, a7da..a7f5, a7f7..a7f9, a7fb..ab2f, ab5b..ab5f, ab69..ab6f, abc0..faff, fb07..fb12, fb18..ff40, ff5b..10427, 10450..104d7, 104fc..10596, 105a2, 105b2, 105ba, 105bd..10cbf, 10cf3..118bf, 118e0..16e5f, 16e80..1d419, 1d434..1d44d, 1d455, 1d468..1d481, 1d49c..1d4b5, 1d4ba, 1d4bc, 1d4c4, 1d4d0..1d4e9, 1d504..1d51d, 1d538..1d551, 1d56c..1d585, 1d5a0..1d5b9, 1d5d4..1d5ed, 1d608..1d621, 1d63c..1d655, 1d670..1d689, 1d6a6..1d6c1, 1d6db, 1d6e2..1d6fb, 1d715, 1d71c..1d735, 1d74f, 1d756..1d76f, 1d789, 1d790..1d7a9, 1d7c3, 1d7ca, 1d7cc..1deff, 1df0a, 1df1f..1df24, 1df2b..1e921, 1e944..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^\P{Ll}]/u `] = lit`
[61..7a, b5, df..f6, f8..ff, 101, 103, 105, 107, 109, 10b, 10d, 10f, 111, 113, 115, 117, 119, 11b, 11d, 11f, 121, 123, 125, 127, 129, 12b, 12d, 12f, 131, 133, 135, 137..138, 13a, 13c, 13e, 140, 142, 144, 146, 148..149, 14b, 14d, 14f, 151, 153, 155, 157, 159, 15b, 15d, 15f, 161, 163, 165, 167, 169, 16b, 16d, 16f, 171, 173, 175, 177, 17a, 17c, 17e..180, 183, 185, 188, 18c..18d, 192, 195, 199..19b, 19e, 1a1, 1a3, 1a5, 1a8, 1aa..1ab, 1ad, 1b0, 1b4, 1b6, 1b9..1ba, 1bd..1bf, 1c6, 1c9, 1cc, 1ce, 1d0, 1d2, 1d4, 1d6, 1d8, 1da, 1dc..1dd, 1df, 1e1, 1e3, 1e5, 1e7, 1e9, 1eb, 1ed, 1ef..1f0, 1f3, 1f5, 1f9, 1fb, 1fd, 1ff, 201, 203, 205, 207, 209, 20b, 20d, 20f, 211, 213, 215, 217, 219, 21b, 21d, 21f, 221, 223, 225, 227, 229, 22b, 22d, 22f, 231, 233..239, 23c, 23f..240, 242, 247, 249, 24b, 24d, 24f..293, 295..2af, 371, 373, 377, 37b..37d, 390, 3ac..3ce, 3d0..3d1, 3d5..3d7, 3d9, 3db, 3dd, 3df, 3e1, 3e3, 3e5, 3e7, 3e9, 3eb, 3ed, 3ef..3f3, 3f5, 3f8, 3fb..3fc, 430..45f, 461, 463, 465, 467, 469, 46b, 46d, 46f, 471, 473, 475, 477, 479, 47b, 47d, 47f, 481, 48b, 48d, 48f, 491, 493, 495, 497, 499, 49b, 49d, 49f, 4a1, 4a3, 4a5, 4a7, 4a9, 4ab, 4ad, 4af, 4b1, 4b3, 4b5, 4b7, 4b9, 4bb, 4bd, 4bf, 4c2, 4c4, 4c6, 4c8, 4ca, 4cc, 4ce..4cf, 4d1, 4d3, 4d5, 4d7, 4d9, 4db, 4dd, 4df, 4e1, 4e3, 4e5, 4e7, 4e9, 4eb, 4ed, 4ef, 4f1, 4f3, 4f5, 4f7, 4f9, 4fb, 4fd, 4ff, 501, 503, 505, 507, 509, 50b, 50d, 50f, 511, 513, 515, 517, 519, 51b, 51d, 51f, 521, 523, 525, 527, 529, 52b, 52d, 52f, 560..588, 10d0..10fa, 10fd..10ff, 13f8..13fd, 1c80..1c88, 1d00..1d2b, 1d6b..1d77, 1d79..1d9a, 1e01, 1e03, 1e05, 1e07, 1e09, 1e0b, 1e0d, 1e0f, 1e11, 1e13, 1e15, 1e17, 1e19, 1e1b, 1e1d, 1e1f, 1e21, 1e23, 1e25, 1e27, 1e29, 1e2b, 1e2d, 1e2f, 1e31, 1e33, 1e35, 1e37, 1e39, 1e3b, 1e3d, 1e3f, 1e41, 1e43, 1e45, 1e47, 1e49, 1e4b, 1e4d, 1e4f, 1e51, 1e53, 1e55, 1e57, 1e59, 1e5b, 1e5d, 1e5f, 1e61, 1e63, 1e65, 1e67, 1e69, 1e6b, 1e6d, 1e6f, 1e71, 1e73, 1e75, 1e77, 1e79, 1e7b, 1e7d, 1e7f, 1e81, 1e83, 1e85, 1e87, 1e89, 1e8b, 1e8d, 1e8f, 1e91, 1e93, 1e95..1e9d, 1e9f, 1ea1, 1ea3, 1ea5, 1ea7, 1ea9, 1eab, 1ead, 1eaf, 1eb1, 1eb3, 1eb5, 1eb7, 1eb9, 1ebb, 1ebd, 1ebf, 1ec1, 1ec3, 1ec5, 1ec7, 1ec9, 1ecb, 1ecd, 1ecf, 1ed1, 1ed3, 1ed5, 1ed7, 1ed9, 1edb, 1edd, 1edf, 1ee1, 1ee3, 1ee5, 1ee7, 1ee9, 1eeb, 1eed, 1eef, 1ef1, 1ef3, 1ef5, 1ef7, 1ef9, 1efb, 1efd, 1eff..1f07, 1f10..1f15, 1f20..1f27, 1f30..1f37, 1f40..1f45, 1f50..1f57, 1f60..1f67, 1f70..1f7d, 1f80..1f87, 1f90..1f97, 1fa0..1fa7, 1fb0..1fb4, 1fb6..1fb7, 1fbe, 1fc2..1fc4, 1fc6..1fc7, 1fd0..1fd3, 1fd6..1fd7, 1fe0..1fe7, 1ff2..1ff4, 1ff6..1ff7, 210a, 210e..210f, 2113, 212f, 2134, 2139, 213c..213d, 2146..2149, 214e, 2184, 2c30..2c5f, 2c61, 2c65..2c66, 2c68, 2c6a, 2c6c, 2c71, 2c73..2c74, 2c76..2c7b, 2c81, 2c83, 2c85, 2c87, 2c89, 2c8b, 2c8d, 2c8f, 2c91, 2c93, 2c95, 2c97, 2c99, 2c9b, 2c9d, 2c9f, 2ca1, 2ca3, 2ca5, 2ca7, 2ca9, 2cab, 2cad, 2caf, 2cb1, 2cb3, 2cb5, 2cb7, 2cb9, 2cbb, 2cbd, 2cbf, 2cc1, 2cc3, 2cc5, 2cc7, 2cc9, 2ccb, 2ccd, 2ccf, 2cd1, 2cd3, 2cd5, 2cd7, 2cd9, 2cdb, 2cdd, 2cdf, 2ce1, 2ce3..2ce4, 2cec, 2cee, 2cf3, 2d00..2d25, 2d27, 2d2d, a641, a643, a645, a647, a649, a64b, a64d, a64f, a651, a653, a655, a657, a659, a65b, a65d, a65f, a661, a663, a665, a667, a669, a66b, a66d, a681, a683, a685, a687, a689, a68b, a68d, a68f, a691, a693, a695, a697, a699, a69b, a723, a725, a727, a729, a72b, a72d, a72f..a731, a733, a735, a737, a739, a73b, a73d, a73f, a741, a743, a745, a747, a749, a74b, a74d, a74f, a751, a753, a755, a757, a759, a75b, a75d, a75f, a761, a763, a765, a767, a769, a76b, a76d, a76f, a771..a778, a77a, a77c, a77f, a781, a783, a785, a787, a78c, a78e, a791, a793..a795, a797, a799, a79b, a79d, a79f, a7a1, a7a3, a7a5, a7a7, a7a9, a7af, a7b5, a7b7, a7b9, a7bb, a7bd, a7bf, a7c1, a7c3, a7c8, a7ca, a7d1, a7d3, a7d5, a7d7, a7d9, a7f6, a7fa, ab30..ab5a, ab60..ab68, ab70..abbf, fb00..fb06, fb13..fb17, ff41..ff5a, 10428..1044f, 104d8..104fb, 10597..105a1, 105a3..105b1, 105b3..105b9, 105bb..105bc, 10cc0..10cf2, 118c0..118df, 16e60..16e7f, 1d41a..1d433, 1d44e..1d454, 1d456..1d467, 1d482..1d49b, 1d4b6..1d4b9, 1d4bb, 1d4bd..1d4c3, 1d4c5..1d4cf, 1d4ea..1d503, 1d51e..1d537, 1d552..1d56b, 1d586..1d59f, 1d5ba..1d5d3, 1d5ee..1d607, 1d622..1d63b, 1d656..1d66f, 1d68a..1d6a5, 1d6c2..1d6da, 1d6dc..1d6e1, 1d6fc..1d714, 1d716..1d71b, 1d736..1d74e, 1d750..1d755, 1d770..1d788, 1d78a..1d78f, 1d7aa..1d7c2, 1d7c4..1d7c9, 1d7cb, 1df00..1df09, 1df0b..1df1e, 1df25..1df2a, 1e922..1e943]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^\p{Ll}]/iu `] = lit`
[0..40, 5b..60, 7b..b4, b6..bf, d7, f7, 130, 1bb, 1c0..1c3, 294, 2b0..344, 346..36f, 374..375, 378..37a, 37e, 380..385, 387, 38b, 38d, 3a2, 3d2..3d4, 3f6, 482..489, 530, 557..55f, 589..109f, 10c6, 10c8..10cc, 10ce..10cf, 10fb..10fc, 1100..139f, 13f6..13f7, 13fe..1c7f, 1c89..1c8f, 1cbb..1cbc, 1cc0..1cff, 1d2c..1d6a, 1d78, 1d9b..1dff, 1f16..1f17, 1f1e..1f1f, 1f46..1f47, 1f4e..1f4f, 1f58, 1f5a, 1f5c, 1f5e, 1f7e..1f7f, 1fb5, 1fbd, 1fbf..1fc1, 1fc5, 1fcd..1fcf, 1fd4..1fd5, 1fdc..1fdf, 1fed..1ff1, 1ff5, 1ffd..2109, 210b..210d, 2110..2112, 2114..2125, 2127..2129, 212c..212e, 2130..2131, 2133, 2135..2138, 213a..213b, 213e..2145, 214a..214d, 214f..2182, 2185..2bff, 2c7c..2c7d, 2ce5..2cea, 2cef..2cf1, 2cf4..2cff, 2d26, 2d28..2d2c, 2d2e..a63f, a66e..a67f, a69c..a721, a770, a788..a78a, a78f, a7cb..a7cf, a7d2, a7d4, a7da..a7f4, a7f7..a7f9, a7fb..ab2f, ab5b..ab5f, ab69..ab6f, abc0..faff, fb07..fb12, fb18..ff20, ff3b..ff40, ff5b..103ff, 10450..104af, 104d4..104d7, 104fc..1056f, 1057b, 1058b, 10593, 10596, 105a2, 105b2, 105ba, 105bd..10c7f, 10cb3..10cbf, 10cf3..1189f, 118e0..16e3f, 16e80..1d419, 1d434..1d44d, 1d455, 1d468..1d481, 1d49c..1d4b5, 1d4ba, 1d4bc, 1d4c4, 1d4d0..1d4e9, 1d504..1d51d, 1d538..1d551, 1d56c..1d585, 1d5a0..1d5b9, 1d5d4..1d5ed, 1d608..1d621, 1d63c..1d655, 1d670..1d689, 1d6a6..1d6c1, 1d6db, 1d6e2..1d6fb, 1d715, 1d71c..1d735, 1d74f, 1d756..1d76f, 1d789, 1d790..1d7a9, 1d7c3, 1d7ca, 1d7cc..1deff, 1df0a, 1df1f..1df24, 1df2b..1e8ff, 1e944..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^\P{Ll}]/iu `] = lit`
[131, 138, 149, 18d, 19b, 1aa..1ab, 1ba, 1be, 1f0, 221, 234..239, 255, 258, 25a, 25d..25f, 262, 264, 267, 26d..26e, 270, 273..274, 276..27c, 27e..27f, 281, 284..286, 28d..291, 293, 295..29c, 29f..2af, 390, 3b0, 3fc, 560, 587..588, 1d00..1d2b, 1d6b..1d77, 1d7a..1d7c, 1d7e..1d8d, 1d8f..1d9a, 1e96..1e9a, 1e9c..1e9d, 1e9f, 1f50, 1f52, 1f54, 1f56, 1fb2, 1fb4, 1fb6..1fb7, 1fc2, 1fc4, 1fc6..1fc7, 1fd2..1fd3, 1fd6..1fd7, 1fe2..1fe4, 1fe6..1fe7, 1ff2, 1ff4, 1ff6..1ff7, 210a, 210e..210f, 2113, 212f, 2134, 2139, 213c..213d, 2146..2149, 2c71, 2c74, 2c77..2c7b, 2ce4, a730..a731, a771..a778, a78e, a795, a7af, a7d3, a7d5, a7fa, ab30..ab52, ab54..ab5a, ab60..ab68, fb00..fb06, fb13..fb17, 1d41a..1d433, 1d44e..1d454, 1d456..1d467, 1d482..1d49b, 1d4b6..1d4b9, 1d4bb, 1d4bd..1d4c3, 1d4c5..1d4cf, 1d4ea..1d503, 1d51e..1d537, 1d552..1d56b, 1d586..1d59f, 1d5ba..1d5d3, 1d5ee..1d607, 1d622..1d63b, 1d656..1d66f, 1d68a..1d6a5, 1d6c2..1d6da, 1d6dc..1d6e1, 1d6fc..1d714, 1d716..1d71b, 1d736..1d74e, 1d750..1d755, 1d770..1d788, 1d78a..1d78f, 1d7aa..1d7c2, 1d7c4..1d7c9, 1d7cb, 1df00..1df09, 1df0b..1df1e, 1df25..1df2a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\w--\d]/v `] = lit`
[41..5a, 5f, 61..7a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\w&&\d]/v `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\w&&[\d\q{a|foo}]]/v `] = lit`
[30..39, 61]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d\q{a|foo|}]/v `] = lit`
[66][6f][6f]|[30..39, 61]|
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^\d\q{a|b}]/v `] = lit`
[0..2f, 3a..60, 63..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^\d\q{a|b}]/vi `] = lit`
[0..2f, 3a..40, 43..60, 63..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{foo|bar|x|X|"|""|"""}]/v `] = lit`
[22][22][22]|[62][61][72]|[66][6f][6f]|[22][22]|[22, 58, 78]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{foo|bar|x|X|"|""|"""}]/vi `] = lit`
[22][22][22]|[42, 62][41, 61][52, 72]|[46, 66][4f, 6f][4f, 6f]|[22][22]|[22, 58, 78]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{foo|bar}\q{x}X]/vi `] = lit`
[42, 62][41, 61][52, 72]|[46, 66][4f, 6f][4f, 6f]|[58, 78]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^\W--%]/v `] = lit`
[25, 30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[^]/v `] = lit`
[0..10ffff]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[a-cd]/v `] = lit`
[61..64]
`;

module.exports[n`JS createCharSet >> Literal tests >> /\p{Basic_Emoji}/v `] = lit`
[a9][fe0f]|[ae][fe0f]|[203c][fe0f]|[2049][fe0f]|[2122][fe0f]|[2139][fe0f]|[2194][fe0f]|[2195][fe0f]|[2196][fe0f]|[2197][fe0f]|[2198][fe0f]|[2199][fe0f]|[21a9][fe0f]|[21aa][fe0f]|[2328][fe0f]|[23cf][fe0f]|[23ed][fe0f]|[23ee][fe0f]|[23ef][fe0f]|[23f1][fe0f]|[23f2][fe0f]|[23f8][fe0f]|[23f9][fe0f]|[23fa][fe0f]|[24c2][fe0f]|[25aa][fe0f]|[25ab][fe0f]|[25b6][fe0f]|[25c0][fe0f]|[25fb][fe0f]|[25fc][fe0f]|[2600][fe0f]|[2601][fe0f]|[2602][fe0f]|[2603][fe0f]|[2604][fe0f]|[260e][fe0f]|[2611][fe0f]|[2618][fe0f]|[261d][fe0f]|[2620][fe0f]|[2622][fe0f]|[2623][fe0f]|[2626][fe0f]|[262a][fe0f]|[262e][fe0f]|[262f][fe0f]|[2638][fe0f]|[2639][fe0f]|[263a][fe0f]|[2640][fe0f]|[2642][fe0f]|[265f][fe0f]|[2660][fe0f]|[2663][fe0f]|[2665][fe0f]|[2666][fe0f]|[2668][fe0f]|[267b][fe0f]|[267e][fe0f]|[2692][fe0f]|[2694][fe0f]|[2695][fe0f]|[2696][fe0f]|[2697][fe0f]|[2699][fe0f]|[269b][fe0f]|[269c][fe0f]|[26a0][fe0f]|[26a7][fe0f]|[26b0][fe0f]|[26b1][fe0f]|[26c8][fe0f]|[26cf][fe0f]|[26d1][fe0f]|[26d3][fe0f]|[26e9][fe0f]|[26f0][fe0f]|[26f1][fe0f]|[26f4][fe0f]|[26f7][fe0f]|[26f8][fe0f]|[26f9][fe0f]|[2702][fe0f]|[2708][fe0f]|[2709][fe0f]|[270c][fe0f]|[270d][fe0f]|[270f][fe0f]|[2712][fe0f]|[2714][fe0f]|[2716][fe0f]|[271d][fe0f]|[2721][fe0f]|[2733][fe0f]|[2734][fe0f]|[2744][fe0f]|[2747][fe0f]|[2763][fe0f]|[2764][fe0f]|[27a1][fe0f]|[2934][fe0f]|[2935][fe0f]|[2b05][fe0f]|[2b06][fe0f]|[2b07][fe0f]|[3030][fe0f]|[303d][fe0f]|[3297][fe0f]|[3299][fe0f]|[1f170][fe0f]|[1f171][fe0f]|[1f17e][fe0f]|[1f17f][fe0f]|[1f202][fe0f]|[1f237][fe0f]|[1f321][fe0f]|[1f324][fe0f]|[1f325][fe0f]|[1f326][fe0f]|[1f327][fe0f]|[1f328][fe0f]|[1f329][fe0f]|[1f32a][fe0f]|[1f32b][fe0f]|[1f32c][fe0f]|[1f336][fe0f]|[1f37d][fe0f]|[1f396][fe0f]|[1f397][fe0f]|[1f399][fe0f]|[1f39a][fe0f]|[1f39b][fe0f]|[1f39e][fe0f]|[1f39f][fe0f]|[1f3cb][fe0f]|[1f3cc][fe0f]|[1f3cd][fe0f]|[1f3ce][fe0f]|[1f3d4][fe0f]|[1f3d5][fe0f]|[1f3d6][fe0f]|[1f3d7][fe0f]|[1f3d8][fe0f]|[1f3d9][fe0f]|[1f3da][fe0f]|[1f3db][fe0f]|[1f3dc][fe0f]|[1f3dd][fe0f]|[1f3de][fe0f]|[1f3df][fe0f]|[1f3f3][fe0f]|[1f3f5][fe0f]|[1f3f7][fe0f]|[1f43f][fe0f]|[1f441][fe0f]|[1f4fd][fe0f]|[1f549][fe0f]|[1f54a][fe0f]|[1f56f][fe0f]|[1f570][fe0f]|[1f573][fe0f]|[1f574][fe0f]|[1f575][fe0f]|[1f576][fe0f]|[1f577][fe0f]|[1f578][fe0f]|[1f579][fe0f]|[1f587][fe0f]|[1f58a][fe0f]|[1f58b][fe0f]|[1f58c][fe0f]|[1f58d][fe0f]|[1f590][fe0f]|[1f5a5][fe0f]|[1f5a8][fe0f]|[1f5b1][fe0f]|[1f5b2][fe0f]|[1f5bc][fe0f]|[1f5c2][fe0f]|[1f5c3][fe0f]|[1f5c4][fe0f]|[1f5d1][fe0f]|[1f5d2][fe0f]|[1f5d3][fe0f]|[1f5dc][fe0f]|[1f5dd][fe0f]|[1f5de][fe0f]|[1f5e1][fe0f]|[1f5e3][fe0f]|[1f5e8][fe0f]|[1f5ef][fe0f]|[1f5f3][fe0f]|[1f5fa][fe0f]|[1f6cb][fe0f]|[1f6cd][fe0f]|[1f6ce][fe0f]|[1f6cf][fe0f]|[1f6e0][fe0f]|[1f6e1][fe0f]|[1f6e2][fe0f]|[1f6e3][fe0f]|[1f6e4][fe0f]|[1f6e5][fe0f]|[1f6e9][fe0f]|[1f6f0][fe0f]|[1f6f3][fe0f]|[231a..231b, 23e9..23ec, 23f0, 23f3, 25fd..25fe, 2614..2615, 2648..2653, 267f, 2693, 26a1, 26aa..26ab, 26bd..26be, 26c4..26c5, 26ce, 26d4, 26ea, 26f2..26f3, 26f5, 26fa, 26fd, 2705, 270a..270b, 2728, 274c, 274e, 2753..2755, 2757, 2795..2797, 27b0, 27bf, 2b1b..2b1c, 2b50, 2b55, 1f004, 1f0cf, 1f18e, 1f191..1f19a, 1f201, 1f21a, 1f22f, 1f232..1f236, 1f238..1f23a, 1f250..1f251, 1f300..1f320, 1f32d..1f335, 1f337..1f37c, 1f37e..1f393, 1f3a0..1f3ca, 1f3cf..1f3d3, 1f3e0..1f3f0, 1f3f4, 1f3f8..1f43e, 1f440, 1f442..1f4fc, 1f4ff..1f53d, 1f54b..1f54e, 1f550..1f567, 1f57a, 1f595..1f596, 1f5a4, 1f5fb..1f64f, 1f680..1f6c5, 1f6cc, 1f6d0..1f6d2, 1f6d5..1f6d7, 1f6dc..1f6df, 1f6eb..1f6ec, 1f6f4..1f6fc, 1f7e0..1f7eb, 1f7f0, 1f90c..1f93a, 1f93c..1f945, 1f947..1f9ff, 1fa70..1fa7c, 1fa80..1fa88, 1fa90..1fabd, 1fabf..1fac5, 1face..1fadb, 1fae0..1fae8, 1faf0..1faf8]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[\p{Basic_Emoji}abc]&&[^]]/v `] = lit`
[61..63, 231a..231b, 23e9..23ec, 23f0, 23f3, 25fd..25fe, 2614..2615, 2648..2653, 267f, 2693, 26a1, 26aa..26ab, 26bd..26be, 26c4..26c5, 26ce, 26d4, 26ea, 26f2..26f3, 26f5, 26fa, 26fd, 2705, 270a..270b, 2728, 274c, 274e, 2753..2755, 2757, 2795..2797, 27b0, 27bf, 2b1b..2b1c, 2b50, 2b55, 1f004, 1f0cf, 1f18e, 1f191..1f19a, 1f201, 1f21a, 1f22f, 1f232..1f236, 1f238..1f23a, 1f250..1f251, 1f300..1f320, 1f32d..1f335, 1f337..1f37c, 1f37e..1f393, 1f3a0..1f3ca, 1f3cf..1f3d3, 1f3e0..1f3f0, 1f3f4, 1f3f8..1f43e, 1f440, 1f442..1f4fc, 1f4ff..1f53d, 1f54b..1f54e, 1f550..1f567, 1f57a, 1f595..1f596, 1f5a4, 1f5fb..1f64f, 1f680..1f6c5, 1f6cc, 1f6d0..1f6d2, 1f6d5..1f6d7, 1f6dc..1f6df, 1f6eb..1f6ec, 1f6f4..1f6fc, 1f7e0..1f7eb, 1f7f0, 1f90c..1f93a, 1f93c..1f945, 1f947..1f9ff, 1fa70..1fa7c, 1fa80..1fa88, 1fa90..1fabd, 1fabf..1fac5, 1face..1fadb, 1fae0..1fae8, 1faf0..1faf8]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[\p{Basic_Emoji}abc]&&[^]]/vi `] = lit`
[41..43, 61..63, 231a..231b, 23e9..23ec, 23f0, 23f3, 25fd..25fe, 2614..2615, 2648..2653, 267f, 2693, 26a1, 26aa..26ab, 26bd..26be, 26c4..26c5, 26ce, 26d4, 26ea, 26f2..26f3, 26f5, 26fa, 26fd, 2705, 270a..270b, 2728, 274c, 274e, 2753..2755, 2757, 2795..2797, 27b0, 27bf, 2b1b..2b1c, 2b50, 2b55, 1f004, 1f0cf, 1f18e, 1f191..1f19a, 1f201, 1f21a, 1f22f, 1f232..1f236, 1f238..1f23a, 1f250..1f251, 1f300..1f320, 1f32d..1f335, 1f337..1f37c, 1f37e..1f393, 1f3a0..1f3ca, 1f3cf..1f3d3, 1f3e0..1f3f0, 1f3f4, 1f3f8..1f43e, 1f440, 1f442..1f4fc, 1f4ff..1f53d, 1f54b..1f54e, 1f550..1f567, 1f57a, 1f595..1f596, 1f5a4, 1f5fb..1f64f, 1f680..1f6c5, 1f6cc, 1f6d0..1f6d2, 1f6d5..1f6d7, 1f6dc..1f6df, 1f6eb..1f6ec, 1f6f4..1f6fc, 1f7e0..1f7eb, 1f7f0, 1f90c..1f93a, 1f93c..1f945, 1f947..1f9ff, 1fa70..1fa7c, 1fa80..1fa88, 1fa90..1fabd, 1fabf..1fac5, 1face..1fadb, 1fae0..1fae8, 1faf0..1faf8]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9]&&[0-9]]/v `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9]&&\d]/v `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9]&&\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[30, 32, 34]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9]&&_]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9]--[0-9]]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9]--\d]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9]--\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[31, 33, 35..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9]--_]/v `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9][0-9]]/v `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9]\d]/v `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9]\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[39][fe0f][20e3]|[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[[0-9]_]/v `] = lit`
[30..39, 5f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d&&[0-9]]/v `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d&&\d]/v `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d&&\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[30, 32, 34]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d&&_]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d--[0-9]]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d--\d]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d--\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[31, 33, 35..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d--_]/v `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d[0-9]]/v `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d\d]/v `] = lit`
[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[39][fe0f][20e3]|[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\d_]/v `] = lit`
[30..39, 5f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}&&[0-9]]/v `] = lit`
[30, 32, 34]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}&&\d]/v `] = lit`
[30, 32, 34]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}&&\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[39][fe0f][20e3]|[30, 32, 34]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}&&_]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}--[0-9]]/v `] = lit`
[39][fe0f][20e3]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}--\d]/v `] = lit`
[39][fe0f][20e3]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}--\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}--_]/v `] = lit`
[39][fe0f][20e3]|[30, 32, 34]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}[0-9]]/v `] = lit`
[39][fe0f][20e3]|[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}\d]/v `] = lit`
[39][fe0f][20e3]|[30..39]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[39][fe0f][20e3]|[30, 32, 34]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[\q{0|2|4|9\uFE0F\u20E3}_]/v `] = lit`
[39][fe0f][20e3]|[30, 32, 34, 5f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[_&&[0-9]]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[_&&\d]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[_&&\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[_&&_]/v `] = lit`
[5f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[_--[0-9]]/v `] = lit`
[5f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[_--\d]/v `] = lit`
[5f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[_--\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[5f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[_--_]/v `] = lit`
[]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[_[0-9]]/v `] = lit`
[30..39, 5f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[_\d]/v `] = lit`
[30..39, 5f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[_\q{0|2|4|9\uFE0F\u20E3}]/v `] = lit`
[39][fe0f][20e3]|[30, 32, 34, 5f]
`;

module.exports[n`JS createCharSet >> Literal tests >> /[__]/v `] = lit`
[5f]
`;
