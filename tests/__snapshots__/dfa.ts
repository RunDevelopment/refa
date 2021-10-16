/* eslint-disable */

module.exports["DFA >> fromNFA >> /a?/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a??/"] = `
[0] -> [1] : 61

[1] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+?/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a|b)+c/"] = `
(0) -> (1) : 61..62

(1) -> (1) : 61..62
    -> [2] : 63

[2] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a*b*c*/"] = `
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

module.exports["DFA >> fromNFA >> /a*b*?c*/"] = `
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

module.exports["DFA >> fromNFA >> /a*?b*c*?/"] = `
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

module.exports["DFA >> fromNFA >> /a+b+?c+/"] = `
(0) -> (1) : 61

(1) -> (1) : 61
    -> (2) : 62

(2) -> (2) : 62
    -> [3] : 63

[3] -> [3] : 63
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a{4}/"] = `
(0) -> (1) : 61

(1) -> (2) : 61

(2) -> (3) : 61

(3) -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a{4}?/"] = `
(0) -> (1) : 61

(1) -> (2) : 61

(2) -> (3) : 61

(3) -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a|){3}/"] = `
[0] -> [1] : 61

[1] -> [2] : 61

[2] -> [3] : 61

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(|a){3}/"] = `
[0] -> [1] : 61

[1] -> [2] : 61

[2] -> [3] : 61

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(|a|){3}/"] = `
[0] -> [1] : 61

[1] -> [2] : 61

[2] -> [3] : 61

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a{2,4}/"] = `
(0) -> (1) : 61

(1) -> [2] : 61

[2] -> [3] : 61

[3] -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a{2,4}?/"] = `
(0) -> (1) : 61

(1) -> [2] : 61

[2] -> [3] : 61

[3] -> [4] : 61

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a{2,6}/"] = `
(0) -> (1) : 61

(1) -> [2] : 61

[2] -> [3] : 61

[3] -> [4] : 61

[4] -> [5] : 61

[5] -> [6] : 61

[6] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(ab){0,3}/"] = `
[0] -> (1) : 61

(1) -> [2] : 62

[2] -> (3) : 61

(3) -> [4] : 62

[4] -> (5) : 61

(5) -> [6] : 62

[6] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(){100,1000}/"] = `
[0] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+|/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /|a+/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a*/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a*?/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a|)+/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a*)+/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a*){4}/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a+|){4}/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a+)+/"] = `
(0) -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a+|){0,4}/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a+){4}/"] = `
(0) -> (1) : 61

(1) -> (2) : 61

(2) -> (3) : 61

(3) -> [4] : 61

[4] -> [4] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a*){4,}/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /((a*)+)?/"] = `
[0] -> [1] : 61

[1] -> [1] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a|b)?c/"] = `
(0) -> (1) : 61..62
    -> [2] : 63

(1) -> [2] : 63

[2] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a+|b+)*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61
    -> [2] : 62

[2] -> [1] : 61
    -> [2] : 62
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /()*/"] = `
[0] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /([^\\s\\S])*/"] = `
[0] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a*|b*/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61

[2] -> [2] : 62
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+|b+|c+/"] = `
(0) -> [1] : 61
    -> [2] : 62
    -> [3] : 63

[1] -> [1] : 61

[2] -> [2] : 62

[3] -> [3] : 63
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a*|b*)+/"] = `
[0] -> [1] : 61
    -> [2] : 62

[1] -> [1] : 61
    -> [2] : 62

[2] -> [1] : 61
    -> [2] : 62
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /[^\\s\\S]/"] = `
(0) -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /ab[^\\s\\S]ba/"] = `
(0) -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /([^\\s\\S]|a|[^\\s\\S]|b[^\\s\\S]b|[^\\s\\S])a/"] = `
(0) -> (1) : 61

(1) -> [2] : 61

[2] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /[^\\s\\S]+/"] = `
(0) -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /[^\\s\\S]*/"] = `
[0] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /[^\\s\\S]?/"] = `
[0] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+|aaab/"] = `
(0) -> [1] : 61

[1] -> [2] : 61

[2] -> [3] : 61

[3] -> [4] : 61
    -> [5] : 62

[4] -> [4] : 61

[5] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+|a*aa*/"] = `
(0) -> [1] : 61

[1] -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(?:a+){2,}/"] = `
(0) -> (1) : 61

(1) -> [2] : 61

[2] -> [2] : 61
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /abc|ab|abd|abcd/"] = `
(0) -> (1) : 61

(1) -> [2] : 62

[2] -> [3] : 63
    -> [4] : 64

[3] -> [4] : 64

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /abc?|abd|abcd/"] = `
(0) -> (1) : 61

(1) -> [2] : 62

[2] -> [3] : 63
    -> [4] : 64

[3] -> [4] : 64

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /food|fool|foot/"] = `
(0) -> (1) : 66

(1) -> (2) : 6f

(2) -> (3) : 6f

(3) -> [4] : 64, 6c, 74

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /fo(od|ol|ot)/"] = `
(0) -> (1) : 66

(1) -> (2) : 6f

(2) -> (3) : 6f

(3) -> [4] : 64, 6c, 74

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /bet|get|pet|set/"] = `
(0) -> (1) : 62, 67, 70, 73

(1) -> (2) : 65

(2) -> [3] : 74

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /bet|bat|bit/"] = `
(0) -> (1) : 62

(1) -> (2) : 61, 65, 69

(2) -> [3] : 74

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a(?:bc)?|dbc/"] = `
(0) -> [1] : 61
    -> (2) : 64

[1] -> (3) : 62

(2) -> (3) : 62

(3) -> [4] : 63

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?/i"] = `
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

module.exports["DFA >> fromNFA >> /<[=>]?|>=?|=>?|:=|\\/=?/"] = `
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

module.exports["DFA >> fromNFA >> /\\{[^\\r\\n}:]+\\}/"] = `
(0) -> (1) : 7b

(1) -> (2) : 0..9, b..c, e..39, 3b..7c, 7e..ffff

(2) -> (2) : 0..9, b..c, e..39, 3b..7c, 7e..ffff
    -> [3] : 7d

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /'(?:%.|[^%'\\r\\n])+'/"] = `
(0) -> (1) : 27

(1) -> (2) : 0..9, b..c, e..24, 26, 28..ffff
    -> (3) : 25

(2) -> (2) : 0..9, b..c, e..24, 26, 28..ffff
    -> (3) : 25
    -> [4] : 27

(3) -> (2) : 0..9, b..c, e..2027, 202a..ffff

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /&[bchou][a-z\\d]+/i"] = `
(0) -> (1) : 26

(1) -> (2) : 42..43, 48, 4f, 55, 62..63, 68, 6f, 75

(2) -> [3] : 30..39, 41..5a, 61..7a

[3] -> [3] : 30..39, 41..5a, 61..7a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /\"(?:[^\\\\\"]|\\\\.)*\"|'[^']*'/"] = `
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
