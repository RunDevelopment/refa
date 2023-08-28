/* eslint-disable */

var unescapeBackslashes = (str: string): string => {
	return str.replace(/(\\*)(`|\$\{|\\$)/g, (m, backslashes: string, c: string) => {
		return "\\".repeat(Math.floor(backslashes.length / 2)) + c;
	});
};
var lit = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(1, -1));
};
var n = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(0, -1));
};

module.exports[n`NFA >> fromRegex >> /a?/ `] = lit`
[0] -> [1] : a

[1] -> none
`;

module.exports[n`NFA >> fromRegex >> /a??/ `] = lit`
[0] -> [1] : a

[1] -> none
`;

module.exports[n`NFA >> fromRegex >> /a+/ `] = lit`
(0) -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /a+?/ `] = lit`
(0) -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /(a|b)+c/ `] = lit`
(0) -> (1) : a b

(1) -> (1) : a b
    -> [2] : c

[2] -> none
`;

module.exports[n`NFA >> fromRegex >> /a*b*c*/ `] = lit`
[0] -> [1] : a
    -> [2] : b
    -> [3] : c

[1] -> [1] : a
    -> [2] : b
    -> [3] : c

[2] -> [2] : b
    -> [3] : c

[3] -> [3] : c
`;

module.exports[n`NFA >> fromRegex >> /a*b*?c*/ `] = lit`
[0] -> [1] : a
    -> [2] : b
    -> [3] : c

[1] -> [1] : a
    -> [2] : b
    -> [3] : c

[2] -> [2] : b
    -> [3] : c

[3] -> [3] : c
`;

module.exports[n`NFA >> fromRegex >> /a*?b*c*?/ `] = lit`
[0] -> [1] : a
    -> [2] : b
    -> [3] : c

[1] -> [1] : a
    -> [2] : b
    -> [3] : c

[2] -> [2] : b
    -> [3] : c

[3] -> [3] : c
`;

module.exports[n`NFA >> fromRegex >> /a+b+?c+/ `] = lit`
(0) -> (1) : a

(1) -> (1) : a
    -> (2) : b

(2) -> (2) : b
    -> [3] : c

[3] -> [3] : c
`;

module.exports[n`NFA >> fromRegex >> /a{4}/ `] = lit`
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> none
`;

module.exports[n`NFA >> fromRegex >> /a{4}?/ `] = lit`
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> none
`;

module.exports[n`NFA >> fromRegex >> /(a|){3}/ `] = lit`
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`;

module.exports[n`NFA >> fromRegex >> /(|a){3}/ `] = lit`
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`;

module.exports[n`NFA >> fromRegex >> /(|a|){3}/ `] = lit`
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`;

module.exports[n`NFA >> fromRegex >> /a{2,4}/ `] = lit`
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> none
`;

module.exports[n`NFA >> fromRegex >> /a{2,4}?/ `] = lit`
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> none
`;

module.exports[n`NFA >> fromRegex >> /a{2,6}/ `] = lit`
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> [5] : a

[5] -> [6] : a

[6] -> none
`;

module.exports[n`NFA >> fromRegex >> /(ab){0,3}/ `] = lit`
[0] -> (1) : a

(1) -> [2] : b

[2] -> (3) : a

(3) -> [4] : b

[4] -> (5) : a

(5) -> [6] : b

[6] -> none
`;

module.exports[n`NFA >> fromRegex >> /(){100,1000}/ `] = lit`
[0] -> none
`;

module.exports[n`NFA >> fromRegex >> /a+|/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /|a+/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /a*/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /a*?/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /(a|)+/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /(a*)+/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /(a*){4}/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /(a+|){4}/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /(a+)+/ `] = lit`
(0) -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /(a+|){0,4}/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /(a+){4}/ `] = lit`
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> [4] : a
`;

module.exports[n`NFA >> fromRegex >> /(a*){4,}/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /((a*)+)?/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> fromRegex >> /(a|b)?c/ `] = lit`
(0) -> (1) : a b
    -> [2] : c

(1) -> [2] : c

[2] -> none
`;

module.exports[n`NFA >> fromRegex >> /(a+|b+)*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> [1] : a
    -> [2] : b
`;

module.exports[n`NFA >> fromRegex >> /()*/ `] = lit`
[0] -> none
`;

module.exports[n`NFA >> fromRegex >> /([^\s\S])*/ `] = lit`
[0] -> none
`;

module.exports[n`NFA >> fromRegex >> /a*|b*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`;

module.exports[n`NFA >> fromRegex >> /a+|b+|c+/ `] = lit`
(0) -> [1] : a
    -> [2] : b
    -> [3] : c

[1] -> [1] : a

[2] -> [2] : b

[3] -> [3] : c
`;

module.exports[n`NFA >> fromRegex >> /(a*|b*)+/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> [1] : a
    -> [2] : b
`;

module.exports[n`NFA >> fromRegex >> /[^\s\S]/ `] = lit`
(0) -> none
`;

module.exports[n`NFA >> fromRegex >> /ab[^\s\S]ba/ `] = lit`
(0) -> none
`;

module.exports[n`NFA >> fromRegex >> /([^\s\S]|a|[^\s\S]|b[^\s\S]b|[^\s\S])a/ `] = lit`
(0) -> (1) : a

(1) -> [2] : a

[2] -> none
`;

module.exports[n`NFA >> fromRegex >> /[^\s\S]+/ `] = lit`
(0) -> none
`;

module.exports[n`NFA >> fromRegex >> /[^\s\S]*/ `] = lit`
[0] -> none
`;

module.exports[n`NFA >> fromRegex >> /[^\s\S]?/ `] = lit`
[0] -> none
`;

module.exports[n`NFA >> fromRegex >> /a+|aaab/ `] = lit`
(0) -> [1] : a
    -> (2) : a

[1] -> [1] : a

(2) -> (3) : a

(3) -> (4) : a

(4) -> [5] : b

[5] -> none
`;

module.exports[n`NFA >> fromRegex >> /a+|a*aa*/ `] = lit`
(0) -> [1] : a
    -> (2) : a
    -> [3] : a

[1] -> [1] : a

(2) -> (2) : a
    -> [3] : a

[3] -> [4] : a

[4] -> [4] : a
`;

module.exports[n`NFA >> fromRegex >> /(?:a+){2,}/ `] = lit`
(0) -> (1) : a

(1) -> [2] : a

[2] -> [2] : a
`;

module.exports[n`NFA >> fromRegex >> /abc|ab|abd|abcd/ `] = lit`
(0) -> (1) : a

(1) -> (2) : b
    -> [3] : b

(2) -> [3] : c d
    -> (4) : c

[3] -> none

(4) -> [3] : d
`;

module.exports[n`NFA >> fromRegex >> /abc?|abd|abcd/ `] = lit`
(0) -> (1) : a

(1) -> (2) : b
    -> [3] : b

(2) -> (4) : c
    -> [5] : d

[3] -> [5] : c

(4) -> [5] : d

[5] -> none
`;

module.exports[n`NFA >> fromRegex >> /food|fool|foot/ `] = lit`
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> [4] : d l t

[4] -> none
`;

module.exports[n`NFA >> fromRegex >> /fo(od|ol|ot)/ `] = lit`
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> [4] : d l t

[4] -> none
`;

module.exports[n`NFA >> fromRegex >> /bet|get|pet|set/ `] = lit`
(0) -> (1) : b g p s

(1) -> (2) : e

(2) -> [3] : t

[3] -> none
`;

module.exports[n`NFA >> fromRegex >> /bet|bat|bit/ `] = lit`
(0) -> (1) : b

(1) -> (2) : a e i

(2) -> [3] : t

[3] -> none
`;

module.exports[n`NFA >> fromRegex >> /a(?:bc)?|dbc/ `] = lit`
(0) -> [1] : a
    -> (2) : d

[1] -> (3) : b

(2) -> (3) : b

(3) -> [4] : c

[4] -> none
`;

module.exports[n`NFA >> fromRegex >> /\d+(?:\.\d+)?(?:e[+-]?\d+)?/i `] = lit`
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
`;

module.exports[n`NFA >> fromRegex >> /<[=>]?|>=?|=>?|:=|\/=?/ `] = lit`
(0) -> (1) : ':'
    -> [2] : '/' '>'
    -> [3] : '<'
    -> [4] : '='

(1) -> [5] : '='

[2] -> [5] : '='

[3] -> [5] : '=' '>'

[4] -> [5] : '>'

[5] -> none
`;

module.exports[n`NFA >> fromRegex >> /\{[^\r\n}:]+\}/ `] = lit`
(0) -> (1) : '{'

(1) -> (2) : not U+A U+D ':' '}'

(2) -> (2) : not U+A U+D ':' '}'
    -> [3] : '}'

[3] -> none
`;

module.exports[n`NFA >> fromRegex >> /'(?:%.|[^%'\r\n])+'/ `] = lit`
(0) -> (1) : '''

(1) -> (2) : '%'
    -> (3) : not U+A U+D '%' '''

(2) -> (3) : not U+A U+D U+2028 U+2029

(3) -> (2) : '%'
    -> (3) : not U+A U+D '%' '''
    -> [4] : '''

[4] -> none
`;

module.exports[n`NFA >> fromRegex >> /&[bchou][a-z\d]+/i `] = lit`
(0) -> (1) : '&'

(1) -> (2) : B C H O U b c h o u

(2) -> [3] : 0-9 A-Z a-z

[3] -> [3] : 0-9 A-Z a-z
`;

module.exports[n`NFA >> fromRegex >> /"(?:[^\\"]|\\.)*"|'[^']*'/ `] = lit`
(0) -> (1) : '''
    -> (2) : '"'

(1) -> [3] : '''
    -> (4) : not '''

(2) -> [3] : '"'
    -> (5) : '\'
    -> (6) : not '"' '\'

[3] -> none

(4) -> [3] : '''
    -> (4) : not '''

(5) -> (6) : not U+A U+D U+2028 U+2029

(6) -> [3] : '"'
    -> (5) : '\'
    -> (6) : not '"' '\'
`;

module.exports[n`NFA >> fromRegex options >> {"assertions":"disable"}: /^foo$|bar/ `] = lit`
(0) -> (1) : b

(1) -> (2) : a

(2) -> [3] : r

[3] -> none
`;

module.exports[n`NFA >> fromRegex options >> {"assertions":"ignore"}: /^foo$|bar/ `] = lit`
(0) -> (1) : b
    -> (2) : f

(1) -> (3) : a

(2) -> (4) : o

(3) -> [5] : r

(4) -> [5] : o

[5] -> none
`;

module.exports[n`NFA >> union >> /()/ ∪ /()/ `] = lit`
[0] -> none
`;

module.exports[n`NFA >> union >> /()/ ∪ /b/ `] = lit`
[0] -> [1] : b

[1] -> none
`;

module.exports[n`NFA >> union >> /()/ ∪ /b?/ `] = lit`
[0] -> [1] : b

[1] -> none
`;

module.exports[n`NFA >> union >> /()/ ∪ /b*/ `] = lit`
[0] -> [1] : b

[1] -> [1] : b
`;

module.exports[n`NFA >> union >> /()/ ∪ /b+/ `] = lit`
[0] -> [1] : b

[1] -> [1] : b
`;

module.exports[n`NFA >> union >> /a/ ∪ /()/ `] = lit`
[0] -> [1] : a

[1] -> none
`;

module.exports[n`NFA >> union >> /a/ ∪ /b/ `] = lit`
(0) -> [1] : a b

[1] -> none
`;

module.exports[n`NFA >> union >> /a/ ∪ /b?/ `] = lit`
[0] -> [1] : a b

[1] -> none
`;

module.exports[n`NFA >> union >> /a/ ∪ /b*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [2] : b
`;

module.exports[n`NFA >> union >> /a/ ∪ /b+/ `] = lit`
(0) -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [2] : b
`;

module.exports[n`NFA >> union >> /a?/ ∪ /()/ `] = lit`
[0] -> [1] : a

[1] -> none
`;

module.exports[n`NFA >> union >> /a?/ ∪ /b/ `] = lit`
[0] -> [1] : a b

[1] -> none
`;

module.exports[n`NFA >> union >> /a?/ ∪ /b?/ `] = lit`
[0] -> [1] : a b

[1] -> none
`;

module.exports[n`NFA >> union >> /a?/ ∪ /b*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [2] : b
`;

module.exports[n`NFA >> union >> /a?/ ∪ /b+/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [2] : b
`;

module.exports[n`NFA >> union >> /a*/ ∪ /()/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> union >> /a*/ ∪ /b/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> none
`;

module.exports[n`NFA >> union >> /a*/ ∪ /b?/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> none
`;

module.exports[n`NFA >> union >> /a*/ ∪ /b*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`;

module.exports[n`NFA >> union >> /a*/ ∪ /b+/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`;

module.exports[n`NFA >> union >> /a+/ ∪ /()/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> union >> /a+/ ∪ /b/ `] = lit`
(0) -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> none
`;

module.exports[n`NFA >> union >> /a+/ ∪ /b?/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> none
`;

module.exports[n`NFA >> union >> /a+/ ∪ /b*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`;

module.exports[n`NFA >> union >> /a+/ ∪ /b+/ `] = lit`
(0) -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`;

module.exports[n`NFA >> union >> /ab/ ∪ /ba/ `] = lit`
(0) -> (1) : a
    -> (2) : b

(1) -> [3] : b

(2) -> [3] : a

[3] -> none
`;

module.exports[n`NFA >> union >> /foo/ ∪ /bar/ `] = lit`
(0) -> (1) : b
    -> (2) : f

(1) -> (3) : a

(2) -> (4) : o

(3) -> [5] : r

(4) -> [5] : o

[5] -> none
`;

module.exports[n`NFA >> union >> /a/ ∪ /a*/ `] = lit`
[0] -> [1] : a
    -> [2] : a

[1] -> none

[2] -> [2] : a
`;

module.exports[n`NFA >> union >> /a*/ ∪ /a*b*c*/ `] = lit`
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
`;

module.exports[n`NFA >> union >> /a|b|c{2}/ ∪ /a{2}|b{2}|c/ `] = lit`
(0) -> (1) : a
    -> [2] : a-c
    -> (3) : b
    -> (4) : c

(1) -> [2] : a

[2] -> none

(3) -> [2] : b

(4) -> [2] : c
`;

module.exports[n`NFA >> union >> /ba/ ∪ /ab/ `] = lit`
(0) -> (1) : a
    -> (2) : b

(1) -> [3] : b

(2) -> [3] : a

[3] -> none
`;

module.exports[n`NFA >> union >> /bar/ ∪ /foo/ `] = lit`
(0) -> (1) : b
    -> (2) : f

(1) -> (3) : a

(2) -> (4) : o

(3) -> [5] : r

(4) -> [5] : o

[5] -> none
`;

module.exports[n`NFA >> union >> /a*/ ∪ /a/ `] = lit`
[0] -> [1] : a
    -> [2] : a

[1] -> [1] : a

[2] -> none
`;

module.exports[n`NFA >> union >> /a*b*c*/ ∪ /a*/ `] = lit`
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
`;

module.exports[n`NFA >> union >> /a{2}|b{2}|c/ ∪ /a|b|c{2}/ `] = lit`
(0) -> (1) : a
    -> [2] : a-c
    -> (3) : b
    -> (4) : c

(1) -> [2] : a

[2] -> none

(3) -> [2] : b

(4) -> [2] : c
`;

module.exports[n`NFA >> append >> /()/ * /()/ `] = lit`
[0] -> none
`;

module.exports[n`NFA >> append >> /()/ * /b/ `] = lit`
(0) -> [1] : b

[1] -> none
`;

module.exports[n`NFA >> append >> /()/ * /b?/ `] = lit`
[0] -> [1] : b

[1] -> none
`;

module.exports[n`NFA >> append >> /()/ * /b*/ `] = lit`
[0] -> [1] : b

[1] -> [1] : b
`;

module.exports[n`NFA >> append >> /()/ * /b+/ `] = lit`
(0) -> [1] : b

[1] -> [1] : b
`;

module.exports[n`NFA >> append >> /a/ * /()/ `] = lit`
(0) -> [1] : a

[1] -> none
`;

module.exports[n`NFA >> append >> /a/ * /b/ `] = lit`
(0) -> (1) : a

(1) -> [2] : b

[2] -> none
`;

module.exports[n`NFA >> append >> /a/ * /b?/ `] = lit`
(0) -> [1] : a

[1] -> [2] : b

[2] -> none
`;

module.exports[n`NFA >> append >> /a/ * /b*/ `] = lit`
(0) -> [1] : a

[1] -> [2] : b

[2] -> [2] : b
`;

module.exports[n`NFA >> append >> /a/ * /b+/ `] = lit`
(0) -> (1) : a

(1) -> [2] : b

[2] -> [2] : b
`;

module.exports[n`NFA >> append >> /a?/ * /()/ `] = lit`
[0] -> [1] : a

[1] -> none
`;

module.exports[n`NFA >> append >> /a?/ * /b/ `] = lit`
(0) -> (1) : a
    -> [2] : b

(1) -> [2] : b

[2] -> none
`;

module.exports[n`NFA >> append >> /a?/ * /b?/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [2] : b

[2] -> none
`;

module.exports[n`NFA >> append >> /a?/ * /b*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [2] : b

[2] -> [2] : b
`;

module.exports[n`NFA >> append >> /a?/ * /b+/ `] = lit`
(0) -> (1) : a
    -> [2] : b

(1) -> [2] : b

[2] -> [2] : b
`;

module.exports[n`NFA >> append >> /a*/ * /()/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> append >> /a*/ * /b/ `] = lit`
(0) -> (1) : a
    -> [2] : b

(1) -> (1) : a
    -> [2] : b

[2] -> none
`;

module.exports[n`NFA >> append >> /a*/ * /b?/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> none
`;

module.exports[n`NFA >> append >> /a*/ * /b*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> [2] : b
`;

module.exports[n`NFA >> append >> /a*/ * /b+/ `] = lit`
(0) -> (1) : a
    -> [2] : b

(1) -> (1) : a
    -> [2] : b

[2] -> [2] : b
`;

module.exports[n`NFA >> append >> /a+/ * /()/ `] = lit`
(0) -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> append >> /a+/ * /b/ `] = lit`
(0) -> (1) : a

(1) -> (1) : a
    -> [2] : b

[2] -> none
`;

module.exports[n`NFA >> append >> /a+/ * /b?/ `] = lit`
(0) -> [1] : a

[1] -> [1] : a
    -> [2] : b

[2] -> none
`;

module.exports[n`NFA >> append >> /a+/ * /b*/ `] = lit`
(0) -> [1] : a

[1] -> [1] : a
    -> [2] : b

[2] -> [2] : b
`;

module.exports[n`NFA >> append >> /a+/ * /b+/ `] = lit`
(0) -> (1) : a

(1) -> (1) : a
    -> [2] : b

[2] -> [2] : b
`;

module.exports[n`NFA >> append >> /ab/ * /ba/ `] = lit`
(0) -> (1) : a

(1) -> (2) : b

(2) -> (3) : b

(3) -> [4] : a

[4] -> none
`;

module.exports[n`NFA >> append >> /foo/ * /bar/ `] = lit`
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> (4) : b

(4) -> (5) : a

(5) -> [6] : r

[6] -> none
`;

module.exports[n`NFA >> append >> /a/ * /a*/ `] = lit`
(0) -> [1] : a

[1] -> [2] : a

[2] -> [2] : a
`;

module.exports[n`NFA >> append >> /a*/ * /a*b*c*/ `] = lit`
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
`;

module.exports[n`NFA >> append >> /a|b|c{2}/ * /a{2}|b{2}|c/ `] = lit`
(0) -> (1) : a b
    -> (2) : c

(1) -> (3) : a
    -> (4) : b
    -> [5] : c

(2) -> (1) : c

(3) -> [5] : a

(4) -> [5] : b

[5] -> none
`;

module.exports[n`NFA >> append >> /ba/ * /ab/ `] = lit`
(0) -> (1) : b

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : b

[4] -> none
`;

module.exports[n`NFA >> append >> /bar/ * /foo/ `] = lit`
(0) -> (1) : b

(1) -> (2) : a

(2) -> (3) : r

(3) -> (4) : f

(4) -> (5) : o

(5) -> [6] : o

[6] -> none
`;

module.exports[n`NFA >> append >> /a*/ * /a/ `] = lit`
(0) -> (1) : a
    -> [2] : a

(1) -> (1) : a
    -> [2] : a

[2] -> none
`;

module.exports[n`NFA >> append >> /a*b*c*/ * /a*/ `] = lit`
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
`;

module.exports[n`NFA >> append >> /a{2}|b{2}|c/ * /a|b|c{2}/ `] = lit`
(0) -> (1) : a
    -> (2) : b
    -> (3) : c

(1) -> (3) : a

(2) -> (3) : b

(3) -> [4] : a b
    -> (5) : c

[4] -> none

(5) -> [4] : c
`;

module.exports[n`NFA >> prepend >> /()/ * /()/ `] = lit`
[0] -> none
`;

module.exports[n`NFA >> prepend >> /b/ * /()/ `] = lit`
(0) -> [1] : b

[1] -> none
`;

module.exports[n`NFA >> prepend >> /b?/ * /()/ `] = lit`
[0] -> [1] : b

[1] -> none
`;

module.exports[n`NFA >> prepend >> /b*/ * /()/ `] = lit`
[0] -> [1] : b

[1] -> [1] : b
`;

module.exports[n`NFA >> prepend >> /b+/ * /()/ `] = lit`
(0) -> [1] : b

[1] -> [1] : b
`;

module.exports[n`NFA >> prepend >> /()/ * /a/ `] = lit`
(0) -> [1] : a

[1] -> none
`;

module.exports[n`NFA >> prepend >> /b/ * /a/ `] = lit`
(0) -> (1) : b

(1) -> [2] : a

[2] -> none
`;

module.exports[n`NFA >> prepend >> /b?/ * /a/ `] = lit`
(0) -> [1] : a
    -> (2) : b

[1] -> none

(2) -> [1] : a
`;

module.exports[n`NFA >> prepend >> /b*/ * /a/ `] = lit`
(0) -> [1] : a
    -> (2) : b

[1] -> none

(2) -> [1] : a
    -> (2) : b
`;

module.exports[n`NFA >> prepend >> /b+/ * /a/ `] = lit`
(0) -> (1) : b

(1) -> (1) : b
    -> [2] : a

[2] -> none
`;

module.exports[n`NFA >> prepend >> /()/ * /a?/ `] = lit`
[0] -> [1] : a

[1] -> none
`;

module.exports[n`NFA >> prepend >> /b/ * /a?/ `] = lit`
(0) -> [1] : b

[1] -> [2] : a

[2] -> none
`;

module.exports[n`NFA >> prepend >> /b?/ * /a?/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [1] : a
`;

module.exports[n`NFA >> prepend >> /b*/ * /a?/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> none

[2] -> [1] : a
    -> [2] : b
`;

module.exports[n`NFA >> prepend >> /b+/ * /a?/ `] = lit`
(0) -> [1] : b

[1] -> [1] : b
    -> [2] : a

[2] -> none
`;

module.exports[n`NFA >> prepend >> /()/ * /a*/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> prepend >> /b/ * /a*/ `] = lit`
(0) -> [1] : b

[1] -> [2] : a

[2] -> [2] : a
`;

module.exports[n`NFA >> prepend >> /b?/ * /a*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [1] : a
`;

module.exports[n`NFA >> prepend >> /b*/ * /a*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [1] : a
    -> [2] : b
`;

module.exports[n`NFA >> prepend >> /b+/ * /a*/ `] = lit`
(0) -> [1] : b

[1] -> [1] : b
    -> [2] : a

[2] -> [2] : a
`;

module.exports[n`NFA >> prepend >> /()/ * /a+/ `] = lit`
(0) -> [1] : a

[1] -> [1] : a
`;

module.exports[n`NFA >> prepend >> /b/ * /a+/ `] = lit`
(0) -> (1) : b

(1) -> [2] : a

[2] -> [2] : a
`;

module.exports[n`NFA >> prepend >> /b?/ * /a+/ `] = lit`
(0) -> [1] : a
    -> (2) : b

[1] -> [1] : a

(2) -> [1] : a
`;

module.exports[n`NFA >> prepend >> /b*/ * /a+/ `] = lit`
(0) -> [1] : a
    -> (2) : b

[1] -> [1] : a

(2) -> [1] : a
    -> (2) : b
`;

module.exports[n`NFA >> prepend >> /b+/ * /a+/ `] = lit`
(0) -> (1) : b

(1) -> (1) : b
    -> [2] : a

[2] -> [2] : a
`;

module.exports[n`NFA >> prepend >> /ba/ * /ab/ `] = lit`
(0) -> (1) : b

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : b

[4] -> none
`;

module.exports[n`NFA >> prepend >> /bar/ * /foo/ `] = lit`
(0) -> (1) : b

(1) -> (2) : a

(2) -> (3) : r

(3) -> (4) : f

(4) -> (5) : o

(5) -> [6] : o

[6] -> none
`;

module.exports[n`NFA >> prepend >> /a*/ * /a/ `] = lit`
(0) -> (1) : a
    -> [2] : a

(1) -> (1) : a
    -> [2] : a

[2] -> none
`;

module.exports[n`NFA >> prepend >> /a*b*c*/ * /a*/ `] = lit`
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
`;

module.exports[n`NFA >> prepend >> /a{2}|b{2}|c/ * /a|b|c{2}/ `] = lit`
(0) -> (1) : a
    -> (2) : b
    -> (3) : c

(1) -> (3) : a

(2) -> (3) : b

(3) -> [4] : a b
    -> (5) : c

[4] -> none

(5) -> [4] : c
`;

module.exports[n`NFA >> prepend >> /ab/ * /ba/ `] = lit`
(0) -> (1) : a

(1) -> (2) : b

(2) -> (3) : b

(3) -> [4] : a

[4] -> none
`;

module.exports[n`NFA >> prepend >> /foo/ * /bar/ `] = lit`
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> (4) : b

(4) -> (5) : a

(5) -> [6] : r

[6] -> none
`;

module.exports[n`NFA >> prepend >> /a/ * /a*/ `] = lit`
(0) -> [1] : a

[1] -> [2] : a

[2] -> [2] : a
`;

module.exports[n`NFA >> prepend >> /a*/ * /a*b*c*/ `] = lit`
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
`;

module.exports[n`NFA >> prepend >> /a|b|c{2}/ * /a{2}|b{2}|c/ `] = lit`
(0) -> (1) : a b
    -> (2) : c

(1) -> (3) : a
    -> (4) : b
    -> [5] : c

(2) -> (1) : c

(3) -> [5] : a

(4) -> [5] : b

[5] -> none
`;

module.exports[n`NFA >> intersect >> /a/ ∩ /b/ `] = lit`
(0) -> none
`;

module.exports[n`NFA >> intersect >> /a*/ ∩ /a/ `] = lit`
(0) -> [1] : a

[1] -> none
`;

module.exports[n`NFA >> intersect >> /b*(ab+)*a/ ∩ /a*(ba+)*/ `] = lit`
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
`;

module.exports[n`NFA >> intersect >> /a+/ ∩ /(?:a+){2,}/ `] = lit`
(0) -> (1) : a

(1) -> [2] : a

[2] -> [2] : a
`;

module.exports[n`NFA >> intersect >> /a*/ ∩ /b*/ `] = lit`
[0] -> none
`;
