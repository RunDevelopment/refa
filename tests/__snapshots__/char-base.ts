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

module.exports[n`CharBase >> /a/u /[^a]/u `] = lit`
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /b/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^b]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /c/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /[^c]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[ab]/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\w/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[]/u `] = lit`
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /b/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^b]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /c/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[^c]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
`;

module.exports[n`CharBase >> /[^a]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /[^a]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 62..10ffff]
`;

module.exports[n`CharBase >> /b/u /[^b]/u `] = lit`
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /c/u `] = lit`
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /[^c]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[ab]/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\w/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^]/u `] = lit`
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[]/u `] = lit`
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /c/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /[^c]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^b]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
`;

module.exports[n`CharBase >> /[^b]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /[^b]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[^]/u `] = lit`
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[]/u `] = lit`
CharSet (1114111) [0..61, 63..10ffff]
`;

module.exports[n`CharBase >> /c/u /[^c]/u `] = lit`
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[ab]/u `] = lit`
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\w/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^]/u `] = lit`
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[]/u `] = lit`
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^c]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
`;

module.exports[n`CharBase >> /[^c]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /[^c]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[^]/u `] = lit`
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[]/u `] = lit`
CharSet (1114111) [0..62, 64..10ffff]
`;

module.exports[n`CharBase >> /[ab]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\w/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /[]/u `] = lit`
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
`;

module.exports[n`CharBase >> /[^ab]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /[^ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
`;

module.exports[n`CharBase >> /\w/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /[]/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\W/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /\W/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\W/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\W/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
`;

module.exports[n`CharBase >> /\d/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /\d/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /\d/u /[]/u `] = lit`
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..10ffff]
`;

module.exports[n`CharBase >> /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..10ffff]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /b/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /[^b]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /c/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /[^c]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^a]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /b/u /[^b]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /b/u /c/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /b/u /[^c]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /b/u /[ab]/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /b/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /b/u /\w/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /b/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /b/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /b/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /b/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /b/u /[]/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^b]/u /c/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /[^b]/u /[^c]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /[^b]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^b]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^b]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^b]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^b]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^b]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^b]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^b]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /c/u /[^c]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /c/u /[ab]/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /c/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /c/u /\w/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /c/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /c/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /c/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /c/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /c/u /[]/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /[^c]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^c]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /[^c]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /[^c]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^c]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^c]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /[^c]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /a/u /[^c]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[ab]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[ab]/u /\w/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[ab]/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[ab]/u /[]/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^ab]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^ab]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /a/u /[^ab]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\w/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\w/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\w/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\w/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\w/u /[]/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\W/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\W/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\W/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\W/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\d/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\d/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\d/u /[]/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /a/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /b/u /[^b]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /b/u /c/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /b/u /[^c]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /b/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /b/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /b/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /b/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /b/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /b/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /b/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /b/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^b]/u /c/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[^b]/u /[^c]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[^b]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^b]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^b]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^b]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^b]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^b]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^b]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^b]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /c/u /[^c]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /c/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /c/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /c/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /c/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /c/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /c/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /c/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /c/u /[]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[^c]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[^c]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[^c]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[^c]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[^c]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[^c]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[^c]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[^c]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^a]/u /[ab]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[ab]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[ab]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[ab]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^ab]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^ab]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /[^ab]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^a]/u /\w/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /\w/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /\w/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /\w/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /\w/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /\W/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
`;

module.exports[n`CharBase >> /[^a]/u /\W/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /\W/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /\W/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
`;

module.exports[n`CharBase >> /[^a]/u /\d/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /\d/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /\d/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /[^a]/u /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^a]/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /b/u /[^b]/u /c/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /[^b]/u /[^c]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /[^b]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^b]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^b]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^b]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^b]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^b]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^b]/u /[^]/u `] = lit`
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^b]/u /[]/u `] = lit`
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /c/u /[^c]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /c/u /[ab]/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /c/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /c/u /\w/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /c/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /c/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /c/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /c/u /[^]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /c/u /[]/u `] = lit`
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /[^c]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^c]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /[^c]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /[^c]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^c]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^c]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /[^c]/u /[^]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /b/u /[^c]/u /[]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[ab]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[ab]/u /\w/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[ab]/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[ab]/u /[]/u `] = lit`
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^ab]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^ab]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^ab]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\w/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\w/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\w/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\w/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\w/u /[]/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\W/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\W/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\W/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\W/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\d/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\d/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\d/u /[]/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /b/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /c/u /[^c]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /c/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /c/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /c/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /c/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /c/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /c/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /c/u /[^]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /c/u /[]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /[^c]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /[^c]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /[^c]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /[^c]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /[^c]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /[^c]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /[^c]/u /[^]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /[^c]/u /[]/u `] = lit`
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^b]/u /[ab]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[ab]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[ab]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[ab]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[^ab]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[^ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^b]/u /[^ab]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^b]/u /[^ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[^ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[^ab]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`;

module.exports[n`CharBase >> /[^b]/u /\w/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /\w/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /\w/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /\w/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /\w/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /\W/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
`;

module.exports[n`CharBase >> /[^b]/u /\W/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /\W/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /\W/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
`;

module.exports[n`CharBase >> /[^b]/u /\d/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /\d/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /\d/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /[^b]/u /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /[^b]/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`;

module.exports[n`CharBase >> /c/u /[^c]/u /[ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^c]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^c]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^c]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^c]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^c]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^c]/u /[^]/u `] = lit`
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^c]/u /[]/u `] = lit`
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[ab]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[ab]/u /\w/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[ab]/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[ab]/u /[]/u `] = lit`
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^ab]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^ab]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^ab]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\w/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\w/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\w/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\w/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\w/u /[]/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\W/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\W/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\W/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\W/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\d/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\d/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\d/u /[]/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /c/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[ab]/u /[^ab]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[ab]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^c]/u /[ab]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^c]/u /[ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[ab]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^c]/u /[^ab]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[^ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[^ab]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[^ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[^ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[^ab]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\w/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\w/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\w/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\w/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\w/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\W/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
`;

module.exports[n`CharBase >> /[^c]/u /\W/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\W/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\W/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
`;

module.exports[n`CharBase >> /[^c]/u /\d/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\d/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\d/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /[^c]/u /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[^c]/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`;

module.exports[n`CharBase >> /[ab]/u /[^ab]/u /\w/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /[^ab]/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /[^ab]/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /[^ab]/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /[^ab]/u /[^]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /[^ab]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\w/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\w/u /\d/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\w/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\w/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\w/u /[]/u `] = lit`
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\W/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\W/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\W/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\W/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\d/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\d/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\d/u /[]/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[ab]/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\w/u /\W/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\w/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\w/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\w/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\w/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\W/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
`;

module.exports[n`CharBase >> /[^ab]/u /\W/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\W/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\W/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
`;

module.exports[n`CharBase >> /[^ab]/u /\d/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\d/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\d/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /[^ab]/u /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /[^ab]/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`;

module.exports[n`CharBase >> /\w/u /\W/u /\d/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /\W/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /\W/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /\W/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /\d/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /\d/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /\d/u /[]/u `] = lit`
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\w/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\W/u /\d/u /\D/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\W/u /\d/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\W/u /\d/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /\W/u /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\W/u /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\W/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`;

module.exports[n`CharBase >> /\d/u /\D/u /[^]/u `] = lit`
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /\d/u /\D/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /\d/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`;

module.exports[n`CharBase >> /\D/u /[^]/u /[]/u `] = lit`
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`;
