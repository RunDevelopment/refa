/* eslint-disable */

module.exports["DFA >> fromNFA >> /a?/"] = `
[0] -> [1] : a

[1] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a??/"] = `
[0] -> [1] : a

[1] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+/"] = `
(0) -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+?/"] = `
(0) -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a|b)+c/"] = `
(0) -> (1) : a b

(1) -> (1) : a b
    -> [2] : c

[2] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a*b*c*/"] = `
[0] -> [1] : a
    -> [2] : b
    -> [3] : c

[1] -> [1] : a
    -> [2] : b
    -> [3] : c

[2] -> [2] : b
    -> [3] : c

[3] -> [3] : c
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a*b*?c*/"] = `
[0] -> [1] : a
    -> [2] : b
    -> [3] : c

[1] -> [1] : a
    -> [2] : b
    -> [3] : c

[2] -> [2] : b
    -> [3] : c

[3] -> [3] : c
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a*?b*c*?/"] = `
[0] -> [1] : a
    -> [2] : b
    -> [3] : c

[1] -> [1] : a
    -> [2] : b
    -> [3] : c

[2] -> [2] : b
    -> [3] : c

[3] -> [3] : c
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+b+?c+/"] = `
(0) -> (1) : a

(1) -> (1) : a
    -> (2) : b

(2) -> (2) : b
    -> [3] : c

[3] -> [3] : c
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a{4}/"] = `
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a{4}?/"] = `
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a|){3}/"] = `
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(|a){3}/"] = `
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(|a|){3}/"] = `
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a{2,4}/"] = `
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a{2,4}?/"] = `
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a{2,6}/"] = `
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> [5] : a

[5] -> [6] : a

[6] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(ab){0,3}/"] = `
[0] -> (1) : a

(1) -> [2] : b

[2] -> (3) : a

(3) -> [4] : b

[4] -> (5) : a

(5) -> [6] : b

[6] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(){100,1000}/"] = `
[0] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+|/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /|a+/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a*/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a*?/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a|)+/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a*)+/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a*){4}/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a+|){4}/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a+)+/"] = `
(0) -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a+|){0,4}/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a+){4}/"] = `
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> [4] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a*){4,}/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /((a*)+)?/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a|b)?c/"] = `
(0) -> (1) : a b
    -> [2] : c

(1) -> [2] : c

[2] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a+|b+)*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> [1] : a
    -> [2] : b
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /()*/"] = `
[0] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /([^\\s\\S])*/"] = `
[0] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a*|b*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+|b+|c+/"] = `
(0) -> [1] : a
    -> [2] : b
    -> [3] : c

[1] -> [1] : a

[2] -> [2] : b

[3] -> [3] : c
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(a*|b*)+/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> [1] : a
    -> [2] : b
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /[^\\s\\S]/"] = `
(0) -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /ab[^\\s\\S]ba/"] = `
(0) -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /([^\\s\\S]|a|[^\\s\\S]|b[^\\s\\S]b|[^\\s\\S])a/"] = `
(0) -> (1) : a

(1) -> [2] : a

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
(0) -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> [4] : a
    -> [5] : b

[4] -> [4] : a

[5] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a+|a*aa*/"] = `
(0) -> [1] : a

[1] -> [2] : a

[2] -> [2] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /(?:a+){2,}/"] = `
(0) -> (1) : a

(1) -> [2] : a

[2] -> [2] : a
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /abc|ab|abd|abcd/"] = `
(0) -> (1) : a

(1) -> [2] : b

[2] -> [3] : c
    -> [4] : d

[3] -> [4] : d

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /abc?|abd|abcd/"] = `
(0) -> (1) : a

(1) -> [2] : b

[2] -> [3] : c
    -> [4] : d

[3] -> [4] : d

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /food|fool|foot/"] = `
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> [4] : d l t

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /fo(od|ol|ot)/"] = `
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> [4] : d l t

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /bet|get|pet|set/"] = `
(0) -> (1) : b g p s

(1) -> (2) : e

(2) -> [3] : t

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /bet|bat|bit/"] = `
(0) -> (1) : b

(1) -> (2) : a e i

(2) -> [3] : t

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /a(?:bc)?|dbc/"] = `
(0) -> [1] : a
    -> (2) : d

[1] -> (3) : b

(2) -> (3) : b

(3) -> [4] : c

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?/i"] = `
(0) -> [1] : 0-9

[1] -> [1] : 0-9
    -> (2) : '.'
    -> (3) : E e

(2) -> [4] : 0-9

(3) -> (5) : '+' '-'
    -> [6] : 0-9

[4] -> (3) : E e
    -> [4] : 0-9

(5) -> [6] : 0-9

[6] -> [6] : 0-9
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /<[=>]?|>=?|=>?|:=|\\/=?/"] = `
(0) -> (1) : ':'
    -> [2] : '/' '>'
    -> [3] : '<'
    -> [4] : '='

(1) -> [5] : '='

[2] -> [5] : '='

[3] -> [5] : '=' '>'

[4] -> [5] : '>'

[5] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /\\{[^\\r\\n}:]+\\}/"] = `
(0) -> (1) : '{'

(1) -> (2) : not U+A U+D ':' '}'

(2) -> (2) : not U+A U+D ':' '}'
    -> [3] : '}'

[3] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /'(?:%.|[^%'\\r\\n])+'/"] = `
(0) -> (1) : '''

(1) -> (2) : '%'
    -> (3) : not U+A U+D '%' '''

(2) -> (3) : not U+A U+D U+2028 U+2029

(3) -> (2) : '%'
    -> (3) : not U+A U+D '%' '''
    -> [4] : '''

[4] -> none
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /&[bchou][a-z\\d]+/i"] = `
(0) -> (1) : '&'

(1) -> (2) : B C H O U b c h o u

(2) -> [3] : 0-9 A-Z a-z

[3] -> [3] : 0-9 A-Z a-z
`.slice(1, -1);

module.exports["DFA >> fromNFA >> /\"(?:[^\\\\\"]|\\\\.)*\"|'[^']*'/"] = `
(0) -> (1) : '''
    -> (2) : '"'

(1) -> [3] : '''
    -> (4) : not '''

(2) -> [3] : '"'
    -> (5) : '\\'
    -> (6) : not '"' '\\'

[3] -> none

(4) -> [3] : '''
    -> (4) : not '''

(5) -> (6) : not U+A U+D U+2028 U+2029

(6) -> [3] : '"'
    -> (5) : '\\'
    -> (6) : not '"' '\\'
`.slice(1, -1);

module.exports["DFA >> Minimize >> /[^\\s\\S]/"] = `
(0) -> none
`.slice(1, -1);

module.exports["DFA >> Minimize >> /[^\\s\\S]*/"] = `
[0] -> none
`.slice(1, -1);

module.exports["DFA >> Minimize >> /a*b*c*/"] = `
[0] -> [0] : a
    -> [1] : b
    -> [2] : c

[1] -> [1] : b
    -> [2] : c

[2] -> [2] : c
`.slice(1, -1);

module.exports["DFA >> Minimize >> /a+b+c+/"] = `
(0) -> (1) : a

(1) -> (1) : a
    -> (2) : b

(2) -> (2) : b
    -> [3] : c

[3] -> [3] : c
`.slice(1, -1);

module.exports["DFA >> Minimize >> /a+b+c+|a*/"] = `
[0] -> [1] : a

[1] -> [1] : a
    -> (2) : b

(2) -> (2) : b
    -> [3] : c

[3] -> [3] : c
`.slice(1, -1);

module.exports["DFA >> Minimize >> /a*(a+b+c+)?/"] = `
[0] -> [1] : a

[1] -> [1] : a
    -> (2) : b

(2) -> (2) : b
    -> [3] : c

[3] -> [3] : c
`.slice(1, -1);

module.exports["DFA >> Minimize >> /a+|a*aa*/"] = `
(0) -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["DFA >> Minimize >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:E[+-]?\\d+)?/"] = `
(0) -> (1) : '.'
    -> [2] : 0-9

(1) -> [3] : 0-9

[2] -> [2] : 0-9
    -> [3] : '.'
    -> (4) : E

[3] -> [3] : 0-9
    -> (4) : E

(4) -> (5) : '+' '-'
    -> [6] : 0-9

(5) -> [6] : 0-9

[6] -> [6] : 0-9
`.slice(1, -1);

module.exports["DFA >> Minimize >> /ab+/"] = `
(0) -> (1) : a

(1) -> [2] : b

[2] -> [2] : b
`.slice(1, -1);

module.exports["DFA >> Complement >> /[^\\s\\S]/"] = `
[0] -> [1] : all

[1] -> [1] : all
`.slice(1, -1);

module.exports["DFA >> Complement >> /(?:)/"] = `
(0) -> [1] : all

[1] -> [1] : all
`.slice(1, -1);

module.exports["DFA >> Complement >> /[\\s\\S]*/"] = `
(0) -> none
`.slice(1, -1);

module.exports["DFA >> Complement >> /[\\s\\S]+/"] = `
[0] -> none
`.slice(1, -1);

module.exports["DFA >> Complement >> /a+/"] = `
[0] -> (1) : a
    -> [2] : not a

(1) -> (1) : a
    -> [2] : not a

[2] -> [2] : all
`.slice(1, -1);

module.exports["DFA >> Complement >> /a*b*c*/"] = `
(0) -> (1) : a
    -> (2) : b
    -> (3) : c
    -> [4] : not a-c

(1) -> (1) : a
    -> (2) : b
    -> (3) : c
    -> [4] : not a-c

(2) -> (2) : b
    -> (3) : c
    -> [4] : not b c

(3) -> (3) : c
    -> [4] : not c

[4] -> [4] : all
`.slice(1, -1);
