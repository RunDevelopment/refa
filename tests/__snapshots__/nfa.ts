/* eslint-disable */

module.exports["NFA >> fromRegex >> /a?/"] = `
[0] -> [1] : a

[1] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a??/"] = `
[0] -> [1] : a

[1] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+/"] = `
(0) -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+?/"] = `
(0) -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a|b)+c/"] = `
(0) -> (1) : a b

(1) -> (1) : a b
    -> [2] : c

[2] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a*b*c*/"] = `
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

module.exports["NFA >> fromRegex >> /a*b*?c*/"] = `
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

module.exports["NFA >> fromRegex >> /a*?b*c*?/"] = `
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

module.exports["NFA >> fromRegex >> /a+b+?c+/"] = `
(0) -> (1) : a

(1) -> (1) : a
    -> (2) : b

(2) -> (2) : b
    -> [3] : c

[3] -> [3] : c
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a{4}/"] = `
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a{4}?/"] = `
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a|){3}/"] = `
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(|a){3}/"] = `
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(|a|){3}/"] = `
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a{2,4}/"] = `
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a{2,4}?/"] = `
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a{2,6}/"] = `
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> [5] : a

[5] -> [6] : a

[6] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(ab){0,3}/"] = `
[0] -> (1) : a

(1) -> [2] : b

[2] -> (3) : a

(3) -> [4] : b

[4] -> (5) : a

(5) -> [6] : b

[6] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(){100,1000}/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+|/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /|a+/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a*/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a*?/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a|)+/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a*)+/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a*){4}/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a+|){4}/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a+)+/"] = `
(0) -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a+|){0,4}/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a+){4}/"] = `
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> [4] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a*){4,}/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /((a*)+)?/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a|b)?c/"] = `
(0) -> (1) : a b
    -> [2] : c

(1) -> [2] : c

[2] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a+|b+)*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> [1] : a
    -> [2] : b
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /()*/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /([^\\s\\S])*/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a*|b*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+|b+|c+/"] = `
(0) -> [1] : a
    -> [2] : b
    -> [3] : c

[1] -> [1] : a

[2] -> [2] : b

[3] -> [3] : c
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(a*|b*)+/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> [1] : a
    -> [2] : b
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /[^\\s\\S]/"] = `
(0) -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /ab[^\\s\\S]ba/"] = `
(0) -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /([^\\s\\S]|a|[^\\s\\S]|b[^\\s\\S]b|[^\\s\\S])a/"] = `
(0) -> (1) : a

(1) -> [2] : a

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
(0) -> [1] : a
    -> (2) : a

[1] -> [1] : a

(2) -> (3) : a

(3) -> (4) : a

(4) -> [5] : b

[5] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a+|a*aa*/"] = `
(0) -> [1] : a
    -> (2) : a
    -> [3] : a

[1] -> [1] : a

(2) -> (2) : a
    -> [3] : a

[3] -> [4] : a

[4] -> [4] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /(?:a+){2,}/"] = `
(0) -> (1) : a

(1) -> [2] : a

[2] -> [2] : a
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /abc|ab|abd|abcd/"] = `
(0) -> (1) : a

(1) -> (2) : b
    -> [3] : b

(2) -> [3] : c d
    -> (4) : c

[3] -> none

(4) -> [3] : d
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /abc?|abd|abcd/"] = `
(0) -> (1) : a

(1) -> (2) : b
    -> [3] : b

(2) -> (4) : c
    -> [5] : d

[3] -> [5] : c

(4) -> [5] : d

[5] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /food|fool|foot/"] = `
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> [4] : d l t

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /fo(od|ol|ot)/"] = `
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> [4] : d l t

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /bet|get|pet|set/"] = `
(0) -> (1) : b g p s

(1) -> (2) : e

(2) -> [3] : t

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /bet|bat|bit/"] = `
(0) -> (1) : b

(1) -> (2) : a e i

(2) -> [3] : t

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /a(?:bc)?|dbc/"] = `
(0) -> [1] : a
    -> (2) : d

[1] -> (3) : b

(2) -> (3) : b

(3) -> [4] : c

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?/i"] = `
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

module.exports["NFA >> fromRegex >> /<[=>]?|>=?|=>?|:=|\\/=?/"] = `
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

module.exports["NFA >> fromRegex >> /\\{[^\\r\\n}:]+\\}/"] = `
(0) -> (1) : '{'

(1) -> (2) : not U+A U+D ':' '}'

(2) -> (2) : not U+A U+D ':' '}'
    -> [3] : '}'

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /'(?:%.|[^%'\\r\\n])+'/"] = `
(0) -> (1) : '''

(1) -> (2) : '%'
    -> (3) : not U+A U+D '%' '''

(2) -> (3) : not U+A U+D U+2028 U+2029

(3) -> (2) : '%'
    -> (3) : not U+A U+D '%' '''
    -> [4] : '''

[4] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /&[bchou][a-z\\d]+/i"] = `
(0) -> (1) : '&'

(1) -> (2) : B C H O U b c h o u

(2) -> [3] : 0-9 A-Z a-z

[3] -> [3] : 0-9 A-Z a-z
`.slice(1, -1);

module.exports["NFA >> fromRegex >> /\"(?:[^\\\\\"]|\\\\.)*\"|'[^']*'/"] = `
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

module.exports["NFA >> fromRegex options >> {\"assertions\":\"disable\"}: /^foo$|bar/"] = `
(0) -> (1) : b

(1) -> (2) : a

(2) -> [3] : r

[3] -> none
`.slice(1, -1);

module.exports["NFA >> fromRegex options >> {\"assertions\":\"ignore\"}: /^foo$|bar/"] = `
(0) -> (1) : b
    -> (2) : f

(1) -> (3) : a

(2) -> (4) : o

(3) -> [5] : r

(4) -> [5] : o

[5] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /()/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b/"] = `
[0] -> [1] : b

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b?/"] = `
[0] -> [1] : b

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b*/"] = `
[0] -> [1] : b

[1] -> [1] : b
`.slice(1, -1);

module.exports["NFA >> union >> /()/ ∪ /b+/"] = `
[0] -> [1] : b

[1] -> [1] : b
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /()/"] = `
[0] -> [1] : a

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b/"] = `
(0) -> [1] : a b

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b?/"] = `
[0] -> [1] : a b

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /b+/"] = `
(0) -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /()/"] = `
[0] -> [1] : a

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b/"] = `
[0] -> [1] : a b

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b?/"] = `
[0] -> [1] : a b

[1] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> union >> /a?/ ∪ /b+/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /()/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b?/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /b+/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /()/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b/"] = `
(0) -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b?/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> union >> /a+/ ∪ /b+/"] = `
(0) -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> union >> /ab/ ∪ /ba/"] = `
(0) -> (1) : a
    -> (2) : b

(1) -> [3] : b

(2) -> [3] : a

[3] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /foo/ ∪ /bar/"] = `
(0) -> (1) : b
    -> (2) : f

(1) -> (3) : a

(2) -> (4) : o

(3) -> [5] : r

(4) -> [5] : o

[5] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a/ ∪ /a*/"] = `
[0] -> [1] : a
    -> [2] : a

[1] -> none

[2] -> [2] : a
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /a*b*c*/"] = `
[0] -> [1] : a
    -> [2] : a
    -> [3] : b
    -> [4] : c

[1] -> [1] : a

[2] -> [2] : a
    -> [3] : b
    -> [4] : c

[3] -> [3] : b
    -> [4] : c

[4] -> [4] : c
`.slice(1, -1);

module.exports["NFA >> union >> /a|b|c{2}/ ∪ /a{2}|b{2}|c/"] = `
(0) -> (1) : a
    -> [2] : a-c
    -> (3) : b
    -> (4) : c

(1) -> [2] : a

[2] -> none

(3) -> [2] : b

(4) -> [2] : c
`.slice(1, -1);

module.exports["NFA >> union >> /ba/ ∪ /ab/"] = `
(0) -> (1) : a
    -> (2) : b

(1) -> [3] : b

(2) -> [3] : a

[3] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /bar/ ∪ /foo/"] = `
(0) -> (1) : b
    -> (2) : f

(1) -> (3) : a

(2) -> (4) : o

(3) -> [5] : r

(4) -> [5] : o

[5] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*/ ∪ /a/"] = `
[0] -> [1] : a
    -> [2] : a

[1] -> [1] : a

[2] -> none
`.slice(1, -1);

module.exports["NFA >> union >> /a*b*c*/ ∪ /a*/"] = `
[0] -> [1] : a
    -> [2] : a
    -> [3] : b
    -> [4] : c

[1] -> [1] : a
    -> [3] : b
    -> [4] : c

[2] -> [2] : a

[3] -> [3] : b
    -> [4] : c

[4] -> [4] : c
`.slice(1, -1);

module.exports["NFA >> union >> /a{2}|b{2}|c/ ∪ /a|b|c{2}/"] = `
(0) -> (1) : a
    -> [2] : a-c
    -> (3) : b
    -> (4) : c

(1) -> [2] : a

[2] -> none

(3) -> [2] : b

(4) -> [2] : c
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /()/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b/"] = `
(0) -> [1] : b

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b?/"] = `
[0] -> [1] : b

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b*/"] = `
[0] -> [1] : b

[1] -> [1] : b
`.slice(1, -1);

module.exports["NFA >> append >> /()/ * /b+/"] = `
(0) -> [1] : b

[1] -> [1] : b
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /()/"] = `
(0) -> [1] : a

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b/"] = `
(0) -> (1) : a

(1) -> [2] : b

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b?/"] = `
(0) -> [1] : a

[1] -> [2] : b

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b*/"] = `
(0) -> [1] : a

[1] -> [2] : b

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /b+/"] = `
(0) -> (1) : a

(1) -> [2] : b

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /()/"] = `
[0] -> [1] : a

[1] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b/"] = `
(0) -> (1) : a
    -> [2] : b

(1) -> [2] : b

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b?/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [2] : b

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [2] : b

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> append >> /a?/ * /b+/"] = `
(0) -> (1) : a
    -> [2] : b

(1) -> [2] : b

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /()/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b/"] = `
(0) -> (1) : a
    -> [2] : b

(1) -> (1) : a
    -> [2] : b

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b?/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /b+/"] = `
(0) -> (1) : a
    -> [2] : b

(1) -> (1) : a
    -> [2] : b

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /()/"] = `
(0) -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b/"] = `
(0) -> (1) : a

(1) -> (1) : a
    -> [2] : b

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b?/"] = `
(0) -> [1] : a

[1] -> [1] : a
    -> [2] : b

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b*/"] = `
(0) -> [1] : a

[1] -> [1] : a
    -> [2] : b

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> append >> /a+/ * /b+/"] = `
(0) -> (1) : a

(1) -> (1) : a
    -> [2] : b

[2] -> [2] : b
`.slice(1, -1);

module.exports["NFA >> append >> /ab/ * /ba/"] = `
(0) -> (1) : a

(1) -> (2) : b

(2) -> (3) : b

(3) -> [4] : a

[4] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /foo/ * /bar/"] = `
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> (4) : b

(4) -> (5) : a

(5) -> [6] : r

[6] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a/ * /a*/"] = `
(0) -> [1] : a

[1] -> [2] : a

[2] -> [2] : a
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /a*b*c*/"] = `
[0] -> [1] : a
    -> [2] : a
    -> [3] : b
    -> [4] : c

[1] -> [1] : a
    -> [2] : a
    -> [3] : b
    -> [4] : c

[2] -> [2] : a
    -> [3] : b
    -> [4] : c

[3] -> [3] : b
    -> [4] : c

[4] -> [4] : c
`.slice(1, -1);

module.exports["NFA >> append >> /a|b|c{2}/ * /a{2}|b{2}|c/"] = `
(0) -> (1) : a b
    -> (2) : c

(1) -> (3) : a
    -> (4) : b
    -> [5] : c

(2) -> (1) : c

(3) -> [5] : a

(4) -> [5] : b

[5] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /ba/ * /ab/"] = `
(0) -> (1) : b

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : b

[4] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /bar/ * /foo/"] = `
(0) -> (1) : b

(1) -> (2) : a

(2) -> (3) : r

(3) -> (4) : f

(4) -> (5) : o

(5) -> [6] : o

[6] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*/ * /a/"] = `
(0) -> (1) : a
    -> [2] : a

(1) -> (1) : a
    -> [2] : a

[2] -> none
`.slice(1, -1);

module.exports["NFA >> append >> /a*b*c*/ * /a*/"] = `
[0] -> [1] : a
    -> [2] : a
    -> [3] : b
    -> [4] : c

[1] -> [1] : a
    -> [2] : a
    -> [3] : b
    -> [4] : c

[2] -> [2] : a

[3] -> [2] : a
    -> [3] : b
    -> [4] : c

[4] -> [2] : a
    -> [4] : c
`.slice(1, -1);

module.exports["NFA >> append >> /a{2}|b{2}|c/ * /a|b|c{2}/"] = `
(0) -> (1) : a
    -> (2) : b
    -> (3) : c

(1) -> (3) : a

(2) -> (3) : b

(3) -> [4] : a b
    -> (5) : c

[4] -> none

(5) -> [4] : c
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /()/"] = `
[0] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /()/"] = `
(0) -> [1] : b

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /()/"] = `
[0] -> [1] : b

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /()/"] = `
[0] -> [1] : b

[1] -> [1] : b
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /()/"] = `
(0) -> [1] : b

[1] -> [1] : b
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a/"] = `
(0) -> [1] : a

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a/"] = `
(0) -> (1) : b

(1) -> [2] : a

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a/"] = `
(0) -> [1] : a
    -> (2) : b

[1] -> none

(2) -> [1] : a
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a/"] = `
(0) -> [1] : a
    -> (2) : b

[1] -> none

(2) -> [1] : a
    -> (2) : b
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a/"] = `
(0) -> (1) : b

(1) -> (1) : b
    -> [2] : a

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a?/"] = `
[0] -> [1] : a

[1] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a?/"] = `
(0) -> [1] : b

[1] -> [2] : a

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a?/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a?/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [1] : a
    -> [2] : b
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a?/"] = `
(0) -> [1] : b

[1] -> [1] : b
    -> [2] : a

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a*/"] = `
[0] -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a*/"] = `
(0) -> [1] : b

[1] -> [2] : a

[2] -> [2] : a
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a*/"] = `
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [1] : a
    -> [2] : b
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a*/"] = `
(0) -> [1] : b

[1] -> [1] : b
    -> [2] : a

[2] -> [2] : a
`.slice(1, -1);

module.exports["NFA >> prepend >> /()/ * /a+/"] = `
(0) -> [1] : a

[1] -> [1] : a
`.slice(1, -1);

module.exports["NFA >> prepend >> /b/ * /a+/"] = `
(0) -> (1) : b

(1) -> [2] : a

[2] -> [2] : a
`.slice(1, -1);

module.exports["NFA >> prepend >> /b?/ * /a+/"] = `
(0) -> [1] : a
    -> (2) : b

[1] -> [1] : a

(2) -> [1] : a
`.slice(1, -1);

module.exports["NFA >> prepend >> /b*/ * /a+/"] = `
(0) -> [1] : a
    -> (2) : b

[1] -> [1] : a

(2) -> [1] : a
    -> (2) : b
`.slice(1, -1);

module.exports["NFA >> prepend >> /b+/ * /a+/"] = `
(0) -> (1) : b

(1) -> (1) : b
    -> [2] : a

[2] -> [2] : a
`.slice(1, -1);

module.exports["NFA >> prepend >> /ba/ * /ab/"] = `
(0) -> (1) : b

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : b

[4] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /bar/ * /foo/"] = `
(0) -> (1) : b

(1) -> (2) : a

(2) -> (3) : r

(3) -> (4) : f

(4) -> (5) : o

(5) -> [6] : o

[6] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*/ * /a/"] = `
(0) -> (1) : a
    -> [2] : a

(1) -> (1) : a
    -> [2] : a

[2] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*b*c*/ * /a*/"] = `
[0] -> [1] : a
    -> [2] : a
    -> [3] : b
    -> [4] : c

[1] -> [1] : a
    -> [2] : a
    -> [3] : b
    -> [4] : c

[2] -> [2] : a

[3] -> [2] : a
    -> [3] : b
    -> [4] : c

[4] -> [2] : a
    -> [4] : c
`.slice(1, -1);

module.exports["NFA >> prepend >> /a{2}|b{2}|c/ * /a|b|c{2}/"] = `
(0) -> (1) : a
    -> (2) : b
    -> (3) : c

(1) -> (3) : a

(2) -> (3) : b

(3) -> [4] : a b
    -> (5) : c

[4] -> none

(5) -> [4] : c
`.slice(1, -1);

module.exports["NFA >> prepend >> /ab/ * /ba/"] = `
(0) -> (1) : a

(1) -> (2) : b

(2) -> (3) : b

(3) -> [4] : a

[4] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /foo/ * /bar/"] = `
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> (4) : b

(4) -> (5) : a

(5) -> [6] : r

[6] -> none
`.slice(1, -1);

module.exports["NFA >> prepend >> /a/ * /a*/"] = `
(0) -> [1] : a

[1] -> [2] : a

[2] -> [2] : a
`.slice(1, -1);

module.exports["NFA >> prepend >> /a*/ * /a*b*c*/"] = `
[0] -> [1] : a
    -> [2] : a
    -> [3] : b
    -> [4] : c

[1] -> [1] : a
    -> [2] : a
    -> [3] : b
    -> [4] : c

[2] -> [2] : a
    -> [3] : b
    -> [4] : c

[3] -> [3] : b
    -> [4] : c

[4] -> [4] : c
`.slice(1, -1);

module.exports["NFA >> prepend >> /a|b|c{2}/ * /a{2}|b{2}|c/"] = `
(0) -> (1) : a b
    -> (2) : c

(1) -> (3) : a
    -> (4) : b
    -> [5] : c

(2) -> (1) : c

(3) -> [5] : a

(4) -> [5] : b

[5] -> none
`.slice(1, -1);

module.exports["NFA >> intersect >> /a/ ∩ /b/"] = `
(0) -> none
`.slice(1, -1);

module.exports["NFA >> intersect >> /a*/ ∩ /a/"] = `
(0) -> [1] : a

[1] -> none
`.slice(1, -1);

module.exports["NFA >> intersect >> /b*(ab+)*a/ ∩ /a*(ba+)*/"] = `
(0) -> (1) : a
    -> [2] : a
    -> (3) : b

(1) -> (4) : b

[2] -> none

(3) -> [2] : a
    -> (5) : a

(4) -> [2] : a
    -> (5) : a

(5) -> (4) : b
`.slice(1, -1);

module.exports["NFA >> intersect >> /a+/ ∩ /(?:a+){2,}/"] = `
(0) -> (1) : a

(1) -> [2] : a

[2] -> [2] : a
`.slice(1, -1);

module.exports["NFA >> intersect >> /a*/ ∩ /b*/"] = `
[0] -> none
`.slice(1, -1);
