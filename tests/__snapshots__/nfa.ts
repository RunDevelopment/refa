/* eslint-disable */

module.exports["NFA >> fromRegex >> /a?/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a??/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+?/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a|b)+c/"] = `
(0) -> (1) : 61..62

(1) -> (1) : 61..62
    -> [2] : 63

[2] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a*b*c*/"] = `
[0] -> [1] : 61
    -> [2] : 62
    -> [3] : 63

[1] -> [1] : 61
    -> [2] : 62
    -> [3] : 63

[2] -> [2] : 62
    -> [3] : 63

[3] -> [3] : 63
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a*b*?c*/"] = `
[0] -> [1] : 61
    -> [2] : 62
    -> [3] : 63

[1] -> [1] : 61
    -> [2] : 62
    -> [3] : 63

[2] -> [2] : 62
    -> [3] : 63

[3] -> [3] : 63
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a*?b*c*?/"] = `
[0] -> [1] : 61
    -> [2] : 62
    -> [3] : 63

[1] -> [1] : 61
    -> [2] : 62
    -> [3] : 63

[2] -> [2] : 62
    -> [3] : 63

[3] -> [3] : 63
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+b+?c+/"] = `
(0) -> (1) : 61

(1) -> (1) : 61
    -> (2) : 62

(2) -> (2) : 62
    -> [3] : 63

[3] -> [3] : 63
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a{4}/"] = `
(0) -> (1) : 61

(1) -> (2) : 61

(2) -> (3) : 61

(3) -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a{4}?/"] = `
(0) -> (1) : 61

(1) -> (2) : 61

(2) -> (3) : 61

(3) -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a|){3}/"] = `
[0] -> [1] : 61

[1] -> [2] : 61

[2] -> [3] : 61

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(|a){3}/"] = `
[0] -> [1] : 61

[1] -> [2] : 61

[2] -> [3] : 61

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(|a|){3}/"] = `
[0] -> [1] : 61

[1] -> [2] : 61

[2] -> [3] : 61

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a{2,4}/"] = `
(0) -> (1) : 61

(1) -> [2] : 61

[2] -> [3] : 61

[3] -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a{2,4}?/"] = `
(0) -> (1) : 61

(1) -> [2] : 61

[2] -> [3] : 61

[3] -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a{2,6}/"] = `
(0) -> (1) : 61

(1) -> [2] : 61

[2] -> [3] : 61

[3] -> [4] : 61

[4] -> [5] : 61

[5] -> [6] : 61

[6] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(ab){0,3}/"] = `
[0] -> (1) : 61

(1) -> [2] : 62

[2] -> (3) : 61

(3) -> [4] : 62

[4] -> (5) : 61

(5) -> [6] : 62

[6] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(){100,1000}/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+|/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /|a+/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a*/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a*?/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a|)+/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a*)+/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a*){4}/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a+|){4}/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a+)+/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a+|){0,4}/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a+){4}/"] = `
(0) -> (1) : 61

(1) -> (2) : 61

(2) -> (3) : 61

(3) -> [4] : 61

[4] -> [4] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a*){4,}/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /((a*)+)?/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a|b)?c/"] = `
(0) -> (1) : 61..62
    -> [2] : 63

(1) -> [2] : 63

[2] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a+|b+)*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61
    -> [2] : 62

[2] -> [1] : 61
    -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /()*/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /([^\\s\\S])*/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a*|b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+|b+|c+/"] = `
(0) -> [1] : 61
    -> [2] : 62
    -> [3] : 63

[1] -> [1] : 61

[2] -> [2] : 62

[3] -> [3] : 63
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a*|b*)+/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61
    -> [2] : 62

[2] -> [1] : 61
    -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /[^\\s\\S]/"] = `
(0) -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /ab[^\\s\\S]ba/"] = `
(0) -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /([^\\s\\S]|a|[^\\s\\S]|b[^\\s\\S]b|[^\\s\\S])a/"] = `
(0) -> (1) : 61

(1) -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /[^\\s\\S]+/"] = `
(0) -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /[^\\s\\S]*/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /[^\\s\\S]?/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+|aaab/"] = `
(0) -> [1] : 61
    -> (2) : 61

[1] -> [1] : 61

(2) -> (3) : 61

(3) -> (4) : 61

(4) -> [5] : 62

[5] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+|a*aa*/"] = `
(0) -> [1] : 61
    -> (2) : 61
    -> [3] : 61

[1] -> [1] : 61

(2) -> (2) : 61
    -> [3] : 61

[3] -> [4] : 61

[4] -> [4] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(?:a+){2,}/"] = `
(0) -> (1) : 61

(1) -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /abc|ab|abd|abcd/"] = `
(0) -> (1) : 61

(1) -> (2) : 62
    -> [3] : 62

(2) -> [3] : 63..64
    -> (4) : 63

[3] -> none

(4) -> [3] : 64
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /abc?|abd|abcd/"] = `
(0) -> (1) : 61

(1) -> (2) : 62
    -> [3] : 62

(2) -> (4) : 63
    -> [5] : 64

[3] -> [5] : 63

(4) -> [5] : 64

[5] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /food|fool|foot/"] = `
(0) -> (1) : 66

(1) -> (2) : 6f

(2) -> (3) : 6f

(3) -> [4] : 64, 6c, 74

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /fo(od|ol|ot)/"] = `
(0) -> (1) : 66

(1) -> (2) : 6f

(2) -> (3) : 6f

(3) -> [4] : 64, 6c, 74

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /bet|get|pet|set/"] = `
(0) -> (1) : 62, 67, 70, 73

(1) -> (2) : 65

(2) -> [3] : 74

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /bet|bat|bit/"] = `
(0) -> (1) : 62

(1) -> (2) : 61, 65, 69

(2) -> [3] : 74

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a(?:bc)?|dbc/"] = `
(0) -> [1] : 61
    -> (2) : 64

[1] -> (3) : 62

(2) -> (3) : 62

(3) -> [4] : 63

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?/i"] = `
(0) -> [1] : 30..39

[1] -> [1] : 30..39
    -> (2) : 2e
    -> (3) : 45, 65

(2) -> [4] : 30..39

(3) -> (5) : 2b, 2d
    -> [6] : 30..39

[4] -> (3) : 45, 65
    -> [4] : 30..39

(5) -> [6] : 30..39

[6] -> [6] : 30..39
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /<[=>]?|>=?|=>?|:=|\\/=?/"] = `
(0) -> [1] : 2f, 3e
    -> (2) : 3a
    -> [3] : 3c
    -> [4] : 3d

[1] -> [5] : 3d

(2) -> [5] : 3d

[3] -> [5] : 3d..3e

[4] -> [5] : 3e

[5] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /\\{[^\\r\\n}:]+\\}/"] = `
(0) -> (1) : 7b

(1) -> (2) : 0..9, b..c, e..39, 3b..7c, 7e..ffff

(2) -> (2) : 0..9, b..c, e..39, 3b..7c, 7e..ffff
    -> [3] : 7d

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /'(?:%.|[^%'\\r\\n])+'/"] = `
(0) -> (1) : 27

(1) -> (2) : 0..9, b..c, e..24, 26, 28..ffff
    -> (3) : 25

(2) -> (2) : 0..9, b..c, e..24, 26, 28..ffff
    -> (3) : 25
    -> [4] : 27

(3) -> (2) : 0..9, b..c, e..2027, 202a..ffff

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /&[bchou][a-z\\d]+/i"] = `
(0) -> (1) : 26

(1) -> (2) : 42..43, 48, 4f, 55, 62..63, 68, 6f, 75

(2) -> [3] : 30..39, 41..5a, 61..7a

[3] -> [3] : 30..39, 41..5a, 61..7a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /\"(?:[^\\\\\"]|\\\\.)*\"|'[^']*'/"] = `
(0) -> (1) : 22
    -> (2) : 27

(1) -> (3) : 0..21, 23..5b, 5d..ffff
    -> [4] : 22
    -> (5) : 5c

(2) -> [4] : 27
    -> (6) : 0..26, 28..ffff

(3) -> (3) : 0..21, 23..5b, 5d..ffff
    -> [4] : 22
    -> (5) : 5c

[4] -> none

(5) -> (3) : 0..9, b..c, e..2027, 202a..ffff

(6) -> [4] : 27
    -> (6) : 0..26, 28..ffff
`.slice(1, -1);

module.exports["NFA >> fromRegex options >> {\"assertions\":\"disable\"}: /^foo$|bar/"] = `
(0) -> (1) : 62

(1) -> (2) : 61

(2) -> [3] : 72

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex options >> {\"assertions\":\"ignore\"}: /^foo$|bar/"] = `
(0) -> (1) : 62
    -> (2) : 66

(1) -> (3) : 61

(2) -> (4) : 6f

(3) -> [5] : 72

(4) -> [5] : 6f

[5] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /()/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b?/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b*/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b+/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /()/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b/"] = `
(0) -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b?/"] = `
[0] -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b+/"] = `
(0) -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /()/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b/"] = `
[0] -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b?/"] = `
[0] -> [1] : 61..62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b+/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /()/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b+/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /()/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b/"] = `
(0) -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b+/"] = `
(0) -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> union >> /ab/ ∪ /ba/"] = `
(0) -> (1) : 61
    -> (2) : 62

(1) -> [3] : 62

(2) -> [3] : 61

[3] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /foo/ ∪ /bar/"] = `
(0) -> (1) : 62
    -> (2) : 66

(1) -> (3) : 61

(2) -> (4) : 6f

(3) -> [5] : 72

(4) -> [5] : 6f

[5] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /a*/"] = `
[0] -> [1] : 61
    -> [2] : 61

[1] -> none

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /a*b*c*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61

[2] -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[3] -> [3] : 62
    -> [4] : 63

[4] -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> union >> /a|b|c{2}/ ∪ /a{2}|b{2}|c/"] = `
(0) -> (1) : 61
    -> [2] : 61..63
    -> (3) : 62
    -> (4) : 63

(1) -> [2] : 61

[2] -> none

(3) -> [2] : 62

(4) -> [2] : 63
`.slice(1, -1);

module.exports["NFA >> union >> /ba/ ∪ /ab/"] = `
(0) -> (1) : 61
    -> (2) : 62

(1) -> [3] : 62

(2) -> [3] : 61

[3] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /bar/ ∪ /foo/"] = `
(0) -> (1) : 62
    -> (2) : 66

(1) -> (3) : 61

(2) -> (4) : 6f

(3) -> [5] : 72

(4) -> [5] : 6f

[5] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /a/"] = `
[0] -> [1] : 61
    -> [2] : 61

[1] -> [1] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*b*c*/ ∪ /a*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61
    -> [3] : 62
    -> [4] : 63

[2] -> [2] : 61

[3] -> [3] : 62
    -> [4] : 63

[4] -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> union >> /a{2}|b{2}|c/ ∪ /a|b|c{2}/"] = `
(0) -> (1) : 61
    -> [2] : 61..63
    -> (3) : 62
    -> (4) : 63

(1) -> [2] : 61

[2] -> none

(3) -> [2] : 62

(4) -> [2] : 63
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /()/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b/"] = `
(0) -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b?/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b*/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b+/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /()/"] = `
(0) -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b/"] = `
(0) -> (1) : 61

(1) -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b?/"] = `
(0) -> [1] : 61

[1] -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b*/"] = `
(0) -> [1] : 61

[1] -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b+/"] = `
(0) -> (1) : 61

(1) -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /()/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b+/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /()/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> (1) : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b+/"] = `
(0) -> (1) : 61
    -> [2] : 62

(1) -> (1) : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /()/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b/"] = `
(0) -> (1) : 61

(1) -> (1) : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b?/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
    -> [2] : 62

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b*/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b+/"] = `
(0) -> (1) : 61

(1) -> (1) : 61
    -> [2] : 62

[2] -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> append >> /ab/ * /ba/"] = `
(0) -> (1) : 61

(1) -> (2) : 62

(2) -> (3) : 62

(3) -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /foo/ * /bar/"] = `
(0) -> (1) : 66

(1) -> (2) : 6f

(2) -> (3) : 6f

(3) -> (4) : 62

(4) -> (5) : 61

(5) -> [6] : 72

[6] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /a*/"] = `
(0) -> [1] : 61

[1] -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /a*b*c*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[2] -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[3] -> [3] : 62
    -> [4] : 63

[4] -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> append >> /a|b|c{2}/ * /a{2}|b{2}|c/"] = `
(0) -> (1) : 61..62
    -> (2) : 63

(1) -> (3) : 61
    -> (4) : 62
    -> [5] : 63

(2) -> (1) : 63

(3) -> [5] : 61

(4) -> [5] : 62

[5] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /ba/ * /ab/"] = `
(0) -> (1) : 62

(1) -> (2) : 61

(2) -> (3) : 61

(3) -> [4] : 62

[4] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /bar/ * /foo/"] = `
(0) -> (1) : 62

(1) -> (2) : 61

(2) -> (3) : 72

(3) -> (4) : 66

(4) -> (5) : 6f

(5) -> [6] : 6f

[6] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /a/"] = `
(0) -> (1) : 61
    -> [2] : 61

(1) -> (1) : 61
    -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*b*c*/ * /a*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[2] -> [2] : 61

[3] -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[4] -> [2] : 61
    -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> append >> /a{2}|b{2}|c/ * /a|b|c{2}/"] = `
(0) -> (1) : 61
    -> (2) : 62
    -> (3) : 63

(1) -> (3) : 61

(2) -> (3) : 62

(3) -> [4] : 61..62
    -> (5) : 63

[4] -> none

(5) -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /()/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /()/"] = `
(0) -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /()/"] = `
[0] -> [1] : 62

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /()/"] = `
[0] -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /()/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a/"] = `
(0) -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a/"] = `
(0) -> (1) : 62

(1) -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> none

(2) -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> none

(2) -> [1] : 61
    -> (2) : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a/"] = `
(0) -> (1) : 62

(1) -> (1) : 62
    -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a?/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a?/"] = `
(0) -> [1] : 62

[1] -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a?/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> none

[2] -> [1] : 61
    -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a?/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
    -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a*/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a*/"] = `
(0) -> [1] : 62

[1] -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [1] : 61
    -> [2] : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a*/"] = `
(0) -> [1] : 62

[1] -> [1] : 62
    -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a+/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a+/"] = `
(0) -> (1) : 62

(1) -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a+/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> [1] : 61

(2) -> [1] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a+/"] = `
(0) -> [1] : 61
    -> (2) : 62

[1] -> [1] : 61

(2) -> [1] : 61
    -> (2) : 62
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a+/"] = `
(0) -> (1) : 62

(1) -> (1) : 62
    -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /ba/ * /ab/"] = `
(0) -> (1) : 62

(1) -> (2) : 61

(2) -> (3) : 61

(3) -> [4] : 62

[4] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /bar/ * /foo/"] = `
(0) -> (1) : 62

(1) -> (2) : 61

(2) -> (3) : 72

(3) -> (4) : 66

(4) -> (5) : 6f

(5) -> [6] : 6f

[6] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*/ * /a/"] = `
(0) -> (1) : 61
    -> [2] : 61

(1) -> (1) : 61
    -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*b*c*/ * /a*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[2] -> [2] : 61

[3] -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[4] -> [2] : 61
    -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> prepend >> /a{2}|b{2}|c/ * /a|b|c{2}/"] = `
(0) -> (1) : 61
    -> (2) : 62
    -> (3) : 63

(1) -> (3) : 61

(2) -> (3) : 62

(3) -> [4] : 61..62
    -> (5) : 63

[4] -> none

(5) -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> prepend >> /ab/ * /ba/"] = `
(0) -> (1) : 61

(1) -> (2) : 62

(2) -> (3) : 62

(3) -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /foo/ * /bar/"] = `
(0) -> (1) : 66

(1) -> (2) : 6f

(2) -> (3) : 6f

(3) -> (4) : 62

(4) -> (5) : 61

(5) -> [6] : 72

[6] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a/ * /a*/"] = `
(0) -> [1] : 61

[1] -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*/ * /a*b*c*/"] = `
[0] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[1] -> [1] : 61
    -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[2] -> [2] : 61
    -> [3] : 62
    -> [4] : 63

[3] -> [3] : 62
    -> [4] : 63

[4] -> [4] : 63
`.slice(1, -1);

module.exports["NFA >> prepend >> /a|b|c{2}/ * /a{2}|b{2}|c/"] = `
(0) -> (1) : 61..62
    -> (2) : 63

(1) -> (3) : 61
    -> (4) : 62
    -> [5] : 63

(2) -> (1) : 63

(3) -> [5] : 61

(4) -> [5] : 62

[5] -> none
`.slice(1, -1);
