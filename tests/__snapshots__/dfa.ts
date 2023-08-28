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

module.exports[n`DFA >> fromNFA >> /a?/ `] = lit`
[0] -> [1] : a

[1] -> none
`;

module.exports[n`DFA >> fromNFA >> /a??/ `] = lit`
[0] -> [1] : a

[1] -> none
`;

module.exports[n`DFA >> fromNFA >> /a+/ `] = lit`
(0) -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /a+?/ `] = lit`
(0) -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /(a|b)+c/ `] = lit`
(0) -> (1) : a b

(1) -> (1) : a b
    -> [2] : c

[2] -> none
`;

module.exports[n`DFA >> fromNFA >> /a*b*c*/ `] = lit`
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

module.exports[n`DFA >> fromNFA >> /a*b*?c*/ `] = lit`
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

module.exports[n`DFA >> fromNFA >> /a*?b*c*?/ `] = lit`
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

module.exports[n`DFA >> fromNFA >> /a+b+?c+/ `] = lit`
(0) -> (1) : a

(1) -> (1) : a
    -> (2) : b

(2) -> (2) : b
    -> [3] : c

[3] -> [3] : c
`;

module.exports[n`DFA >> fromNFA >> /a{4}/ `] = lit`
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> none
`;

module.exports[n`DFA >> fromNFA >> /a{4}?/ `] = lit`
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> none
`;

module.exports[n`DFA >> fromNFA >> /(a|){3}/ `] = lit`
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`;

module.exports[n`DFA >> fromNFA >> /(|a){3}/ `] = lit`
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`;

module.exports[n`DFA >> fromNFA >> /(|a|){3}/ `] = lit`
[0] -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> none
`;

module.exports[n`DFA >> fromNFA >> /a{2,4}/ `] = lit`
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> none
`;

module.exports[n`DFA >> fromNFA >> /a{2,4}?/ `] = lit`
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> none
`;

module.exports[n`DFA >> fromNFA >> /a{2,6}/ `] = lit`
(0) -> (1) : a

(1) -> [2] : a

[2] -> [3] : a

[3] -> [4] : a

[4] -> [5] : a

[5] -> [6] : a

[6] -> none
`;

module.exports[n`DFA >> fromNFA >> /(ab){0,3}/ `] = lit`
[0] -> (1) : a

(1) -> [2] : b

[2] -> (3) : a

(3) -> [4] : b

[4] -> (5) : a

(5) -> [6] : b

[6] -> none
`;

module.exports[n`DFA >> fromNFA >> /(){100,1000}/ `] = lit`
[0] -> none
`;

module.exports[n`DFA >> fromNFA >> /a+|/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /|a+/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /a*/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /a*?/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /(a|)+/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /(a*)+/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /(a*){4}/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /(a+|){4}/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /(a+)+/ `] = lit`
(0) -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /(a+|){0,4}/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /(a+){4}/ `] = lit`
(0) -> (1) : a

(1) -> (2) : a

(2) -> (3) : a

(3) -> [4] : a

[4] -> [4] : a
`;

module.exports[n`DFA >> fromNFA >> /(a*){4,}/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /((a*)+)?/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> fromNFA >> /(a|b)?c/ `] = lit`
(0) -> (1) : a b
    -> [2] : c

(1) -> [2] : c

[2] -> none
`;

module.exports[n`DFA >> fromNFA >> /(a+|b+)*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> [1] : a
    -> [2] : b
`;

module.exports[n`DFA >> fromNFA >> /()*/ `] = lit`
[0] -> none
`;

module.exports[n`DFA >> fromNFA >> /([^\s\S])*/ `] = lit`
[0] -> none
`;

module.exports[n`DFA >> fromNFA >> /a*|b*/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a

[2] -> [2] : b
`;

module.exports[n`DFA >> fromNFA >> /a+|b+|c+/ `] = lit`
(0) -> [1] : a
    -> [2] : b
    -> [3] : c

[1] -> [1] : a

[2] -> [2] : b

[3] -> [3] : c
`;

module.exports[n`DFA >> fromNFA >> /(a*|b*)+/ `] = lit`
[0] -> [1] : a
    -> [2] : b

[1] -> [1] : a
    -> [2] : b

[2] -> [1] : a
    -> [2] : b
`;

module.exports[n`DFA >> fromNFA >> /[^\s\S]/ `] = lit`
(0) -> none
`;

module.exports[n`DFA >> fromNFA >> /ab[^\s\S]ba/ `] = lit`
(0) -> none
`;

module.exports[n`DFA >> fromNFA >> /([^\s\S]|a|[^\s\S]|b[^\s\S]b|[^\s\S])a/ `] = lit`
(0) -> (1) : a

(1) -> [2] : a

[2] -> none
`;

module.exports[n`DFA >> fromNFA >> /[^\s\S]+/ `] = lit`
(0) -> none
`;

module.exports[n`DFA >> fromNFA >> /[^\s\S]*/ `] = lit`
[0] -> none
`;

module.exports[n`DFA >> fromNFA >> /[^\s\S]?/ `] = lit`
[0] -> none
`;

module.exports[n`DFA >> fromNFA >> /a+|aaab/ `] = lit`
(0) -> [1] : a

[1] -> [2] : a

[2] -> [3] : a

[3] -> [4] : a
    -> [5] : b

[4] -> [4] : a

[5] -> none
`;

module.exports[n`DFA >> fromNFA >> /a+|a*aa*/ `] = lit`
(0) -> [1] : a

[1] -> [2] : a

[2] -> [2] : a
`;

module.exports[n`DFA >> fromNFA >> /(?:a+){2,}/ `] = lit`
(0) -> (1) : a

(1) -> [2] : a

[2] -> [2] : a
`;

module.exports[n`DFA >> fromNFA >> /abc|ab|abd|abcd/ `] = lit`
(0) -> (1) : a

(1) -> [2] : b

[2] -> [3] : c
    -> [4] : d

[3] -> [4] : d

[4] -> none
`;

module.exports[n`DFA >> fromNFA >> /abc?|abd|abcd/ `] = lit`
(0) -> (1) : a

(1) -> [2] : b

[2] -> [3] : c
    -> [4] : d

[3] -> [4] : d

[4] -> none
`;

module.exports[n`DFA >> fromNFA >> /food|fool|foot/ `] = lit`
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> [4] : d l t

[4] -> none
`;

module.exports[n`DFA >> fromNFA >> /fo(od|ol|ot)/ `] = lit`
(0) -> (1) : f

(1) -> (2) : o

(2) -> (3) : o

(3) -> [4] : d l t

[4] -> none
`;

module.exports[n`DFA >> fromNFA >> /bet|get|pet|set/ `] = lit`
(0) -> (1) : b g p s

(1) -> (2) : e

(2) -> [3] : t

[3] -> none
`;

module.exports[n`DFA >> fromNFA >> /bet|bat|bit/ `] = lit`
(0) -> (1) : b

(1) -> (2) : a e i

(2) -> [3] : t

[3] -> none
`;

module.exports[n`DFA >> fromNFA >> /a(?:bc)?|dbc/ `] = lit`
(0) -> [1] : a
    -> (2) : d

[1] -> (3) : b

(2) -> (3) : b

(3) -> [4] : c

[4] -> none
`;

module.exports[n`DFA >> fromNFA >> /\d+(?:\.\d+)?(?:e[+-]?\d+)?/i `] = lit`
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

module.exports[n`DFA >> fromNFA >> /<[=>]?|>=?|=>?|:=|\/=?/ `] = lit`
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

module.exports[n`DFA >> fromNFA >> /\{[^\r\n}:]+\}/ `] = lit`
(0) -> (1) : '{'

(1) -> (2) : not U+A U+D ':' '}'

(2) -> (2) : not U+A U+D ':' '}'
    -> [3] : '}'

[3] -> none
`;

module.exports[n`DFA >> fromNFA >> /'(?:%.|[^%'\r\n])+'/ `] = lit`
(0) -> (1) : '''

(1) -> (2) : '%'
    -> (3) : not U+A U+D '%' '''

(2) -> (3) : not U+A U+D U+2028 U+2029

(3) -> (2) : '%'
    -> (3) : not U+A U+D '%' '''
    -> [4] : '''

[4] -> none
`;

module.exports[n`DFA >> fromNFA >> /&[bchou][a-z\d]+/i `] = lit`
(0) -> (1) : '&'

(1) -> (2) : B C H O U b c h o u

(2) -> [3] : 0-9 A-Z a-z

[3] -> [3] : 0-9 A-Z a-z
`;

module.exports[n`DFA >> fromNFA >> /"(?:[^\\"]|\\.)*"|'[^']*'/ `] = lit`
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

module.exports[n`DFA >> Minimize >> /[^\s\S]/ `] = lit`
(0) -> none
`;

module.exports[n`DFA >> Minimize >> /[^\s\S]*/ `] = lit`
[0] -> none
`;

module.exports[n`DFA >> Minimize >> /a*b*c*/ `] = lit`
[0] -> [0] : a
    -> [1] : b
    -> [2] : c

[1] -> [1] : b
    -> [2] : c

[2] -> [2] : c
`;

module.exports[n`DFA >> Minimize >> /a+b+c+/ `] = lit`
(0) -> (1) : a

(1) -> (1) : a
    -> (2) : b

(2) -> (2) : b
    -> [3] : c

[3] -> [3] : c
`;

module.exports[n`DFA >> Minimize >> /a+b+c+|a*/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
    -> (2) : b

(2) -> (2) : b
    -> [3] : c

[3] -> [3] : c
`;

module.exports[n`DFA >> Minimize >> /a*(a+b+c+)?/ `] = lit`
[0] -> [1] : a

[1] -> [1] : a
    -> (2) : b

(2) -> (2) : b
    -> [3] : c

[3] -> [3] : c
`;

module.exports[n`DFA >> Minimize >> /a+|a*aa*/ `] = lit`
(0) -> [1] : a

[1] -> [1] : a
`;

module.exports[n`DFA >> Minimize >> /(?:\d+(?:\.\d*)?|\.\d+)(?:E[+-]?\d+)?/ `] = lit`
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
`;

module.exports[n`DFA >> Minimize >> /ab+/ `] = lit`
(0) -> (1) : a

(1) -> [2] : b

[2] -> [2] : b
`;

module.exports[n`DFA >> Complement >> /[^\s\S]/ `] = lit`
[0] -> [1] : all

[1] -> [1] : all
`;

module.exports[n`DFA >> Complement >> /(?:)/ `] = lit`
(0) -> [1] : all

[1] -> [1] : all
`;

module.exports[n`DFA >> Complement >> /[\s\S]*/ `] = lit`
(0) -> none
`;

module.exports[n`DFA >> Complement >> /[\s\S]+/ `] = lit`
[0] -> none
`;

module.exports[n`DFA >> Complement >> /a+/ `] = lit`
[0] -> (1) : a
    -> [2] : not a

(1) -> (1) : a
    -> [2] : not a

[2] -> [2] : all
`;

module.exports[n`DFA >> Complement >> /a*b*c*/ `] = lit`
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
`;
