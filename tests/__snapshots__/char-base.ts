/* eslint-disable */

module.exports["CharBase >> /a/u /[^a]/u"] = `
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^b]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /c/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^c]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[ab]/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\w/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^]/u"] = `
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[]/u"] = `
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^b]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /c/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^c]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^]/u"] = `
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[]/u"] = `
CharSet (1114111) [0..60, 62..10ffff]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^b]/u"] = `
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /c/u"] = `
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^c]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[ab]/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\w/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^]/u"] = `
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[]/u"] = `
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /c/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^c]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^]/u"] = `
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[]/u"] = `
CharSet (1114111) [0..61, 63..10ffff]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^c]/u"] = `
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[ab]/u"] = `
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\w/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^]/u"] = `
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[]/u"] = `
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[^]/u"] = `
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[]/u"] = `
CharSet (1114111) [0..62, 64..10ffff]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\w/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /[]/u"] = `
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /[]/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\W/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /\\W/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\W/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\W/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
`.slice(1, -1);

module.exports["CharBase >> /\\d/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /\\d/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /\\d/u /[]/u"] = `
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..10ffff]
`.slice(1, -1);

module.exports["CharBase >> /[^]/u /[]/u"] = `
CharSet (1114111) [0..10ffff]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /b/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /[^b]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /c/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /[^c]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /[^]/u"] = `
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^a]/u /[]/u"] = `
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u /[^b]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u /c/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u /[^c]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u /[ab]/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u /\\w/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /b/u /[]/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^b]/u /c/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^b]/u /[^c]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^b]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^b]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^b]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^b]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^b]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^b]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^b]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^b]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /c/u /[^c]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /c/u /[ab]/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /c/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /c/u /\\w/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /c/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /c/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /c/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /c/u /[^]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /c/u /[]/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^c]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^c]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^c]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^c]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^c]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^c]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^c]/u /[^]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^c]/u /[]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[ab]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[ab]/u /\\w/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[ab]/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[ab]/u /[]/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^ab]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^ab]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^ab]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\w/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\w/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\w/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\w/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\w/u /[]/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\W/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\W/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\W/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\W/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\d/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\d/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\d/u /[]/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /a/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u /[^b]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u /c/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u /[^c]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u /[ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /b/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^b]/u /c/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^b]/u /[^c]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^b]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^b]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^b]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^b]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^b]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^b]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^b]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^b]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /c/u /[^c]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /c/u /[ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /c/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /c/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /c/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /c/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /c/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /c/u /[^]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /c/u /[]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^c]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^c]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^c]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^c]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62, 64..7a]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^c]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^c]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^c]/u /[^]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^c]/u /[]/u"] = `
CharSet (1114111) [0..60, 62, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[ab]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[ab]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[ab]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[ab]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^ab]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^ab]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^ab]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\w/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\w/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\w/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\w/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\w/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\W/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\W/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\W/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\W/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 62..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\d/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\d/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\d/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 62..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^a]/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..60, 62..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^b]/u /c/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^b]/u /[^c]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^b]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^b]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^b]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^b]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^b]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^b]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^b]/u /[^]/u"] = `
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^b]/u /[]/u"] = `
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /c/u /[^c]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /c/u /[ab]/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /c/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /c/u /\\w/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /c/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /c/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /c/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /c/u /[^]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /c/u /[]/u"] = `
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^c]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^c]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^c]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^c]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^c]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^c]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^c]/u /[^]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^c]/u /[]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[ab]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[ab]/u /\\w/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[ab]/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[ab]/u /[]/u"] = `
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^ab]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^ab]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^ab]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\w/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\w/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\w/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\w/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\w/u /[]/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\W/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\W/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\W/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\W/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\d/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\d/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\d/u /[]/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /b/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /c/u /[^c]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /c/u /[ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /c/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /c/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /c/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /c/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /c/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /c/u /[^]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /c/u /[]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^c]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^c]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^c]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^c]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 64..7a]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^c]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^c]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..61, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^c]/u /[^]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^c]/u /[]/u"] = `
CharSet (1114111) [0..61, 64..10ffff]
CharSet (1114111) [62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[ab]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[ab]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[ab]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[ab]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^ab]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^ab]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^ab]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\w/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\w/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\w/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\w/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\w/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\W/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\W/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\W/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\W/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61, 63..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\d/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\d/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\d/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..61, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /[^b]/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..61, 63..10ffff]
CharSet (1114111) [62]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^c]/u /[ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^c]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^c]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^c]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^c]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^c]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^c]/u /[^]/u"] = `
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^c]/u /[]/u"] = `
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[ab]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[ab]/u /\\w/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[ab]/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[ab]/u /[]/u"] = `
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^ab]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^ab]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^ab]/u /[]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\w/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\w/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\w/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\w/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\w/u /[]/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\W/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\W/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\W/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\W/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\d/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\d/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\d/u /[]/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /c/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[ab]/u /[^ab]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[ab]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[ab]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[ab]/u /[]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[^ab]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[^ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 64..7a]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[^ab]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[^ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[^ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[^ab]/u /[]/u"] = `
CharSet (1114111) [0..60, 64..10ffff]
CharSet (1114111) [61..62]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\w/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\w/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\w/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\w/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\w/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\W/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\W/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\W/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\W/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..62, 64..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\d/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\d/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\d/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..62, 64..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[^c]/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..62, 64..10ffff]
CharSet (1114111) [63]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /[^ab]/u /\\w/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /[^ab]/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /[^ab]/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /[^ab]/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /[^ab]/u /[^]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /[^ab]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\w/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\w/u /\\d/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\w/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\w/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\w/u /[]/u"] = `
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\W/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\W/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\W/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\W/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\d/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\d/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\d/u /[]/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[ab]/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\w/u /\\W/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\w/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\w/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\w/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\w/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\W/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\W/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\W/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\W/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 63..7a]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\d/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\d/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\d/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..60, 63..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /[^ab]/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..60, 63..10ffff]
CharSet (1114111) [61..62]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\W/u /\\d/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\W/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\W/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\W/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\d/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\d/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\d/u /[]/u"] = `
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\w/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\W/u /\\d/u /\\D/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\W/u /\\d/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\W/u /\\d/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /\\W/u /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\W/u /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\W/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..40, 5b..5e, 60, 7b..10ffff]
CharSet (1114111) [30..39, 41..5a, 5f, 61..7a]
`.slice(1, -1);

module.exports["CharBase >> /\\d/u /\\D/u /[^]/u"] = `
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /\\d/u /\\D/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /\\d/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);

module.exports["CharBase >> /\\D/u /[^]/u /[]/u"] = `
CharSet (1114111) [0..2f, 3a..10ffff]
CharSet (1114111) [30..39]
`.slice(1, -1);
