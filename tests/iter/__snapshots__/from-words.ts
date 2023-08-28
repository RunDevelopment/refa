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

module.exports[n`fromWords >> DFA >> [] `] = lit`
(0) -> none
`;

module.exports[n`fromWords >> DFA >> [""] `] = lit`
[0] -> none
`;

module.exports[n`fromWords >> DFA >> ["","a"] `] = lit`
[0] -> [1] : a

[1] -> none
`;

module.exports[n`fromWords >> DFA >> ["","a","aa","","a","aa"] `] = lit`
[0] -> [1] : a

[1] -> [2] : a

[2] -> none
`;

module.exports[n`fromWords >> DFA >> ["foo","bar","foo","bar","baz","food"] `] = lit`
(0) -> (1) : b
    -> (2) : f

(1) -> (3) : a

(2) -> (4) : o

(3) -> [5] : r
    -> [6] : z

(4) -> [7] : o

[5] -> none

[6] -> none

[7] -> [8] : d

[8] -> none
`;

module.exports[n`fromWords >> DFA >> ["","a","b","c","d","e","f","g"] `] = lit`
[0] -> [1] : a
    -> [2] : b
    -> [3] : c
    -> [4] : d
    -> [5] : e
    -> [6] : f
    -> [7] : g

[1] -> none

[2] -> none

[3] -> none

[4] -> none

[5] -> none

[6] -> none

[7] -> none
`;

module.exports[n`fromWords >> DFA >> ["a","b","ab","ba","aa","bb","aaa","aab","aba","abb","baa","bab","bba","bbb"] `] = lit`
(0) -> [1] : a
    -> [2] : b

[1] -> [3] : a
    -> [4] : b

[2] -> [5] : a
    -> [6] : b

[3] -> [7] : a
    -> [8] : b

[4] -> [9] : a
    -> [10] : b

[5] -> [11] : a
    -> [12] : b

[6] -> [13] : a
    -> [14] : b

[7] -> none

[8] -> none

[9] -> none

[10] -> none

[11] -> none

[12] -> none

[13] -> none

[14] -> none
`;

module.exports[n`fromWords >> ENFA >> [] `] = lit`
(0) -> none
`;

module.exports[n`fromWords >> ENFA >> [""] `] = lit`
(0) -> [1] : ε

[1] -> none
`;

module.exports[n`fromWords >> ENFA >> ["","a"] `] = lit`
(0) -> [1] : ε
    -> (2) : a

[1] -> none

(2) -> [1] : ε
`;

module.exports[n`fromWords >> ENFA >> ["","a","aa","","a","aa"] `] = lit`
(0) -> [1] : ε
    -> (2) : a

[1] -> none

(2) -> [1] : ε
    -> (3) : a

(3) -> [1] : ε
`;

module.exports[n`fromWords >> ENFA >> ["foo","bar","foo","bar","baz","food"] `] = lit`
(0) -> (1) : f
    -> (2) : b

(1) -> (3) : o

(2) -> (4) : a

(3) -> (5) : o

(4) -> (6) : r
    -> (7) : z

(5) -> [8] : ε
    -> (9) : d

(6) -> [8] : ε

(7) -> [8] : ε

[8] -> none

(9) -> [8] : ε
`;

module.exports[n`fromWords >> ENFA >> ["","a","b","c","d","e","f","g"] `] = lit`
(0) -> [1] : ε
    -> (2) : a
    -> (3) : b
    -> (4) : c
    -> (5) : d
    -> (6) : e
    -> (7) : f
    -> (8) : g

[1] -> none

(2) -> [1] : ε

(3) -> [1] : ε

(4) -> [1] : ε

(5) -> [1] : ε

(6) -> [1] : ε

(7) -> [1] : ε

(8) -> [1] : ε
`;

module.exports[n`fromWords >> ENFA >> ["a","b","ab","ba","aa","bb","aaa","aab","aba","abb","baa","bab","bba","bbb"] `] = lit`
(0) -> (1) : a
    -> (2) : b

(1) -> [3] : ε
    -> (4) : b
    -> (5) : a

(2) -> [3] : ε
    -> (6) : a
    -> (7) : b

[3] -> none

(4) -> [3] : ε
    -> (8) : a
    -> (9) : b

(5) -> [3] : ε
    -> (10) : a
    -> (11) : b

(6) -> [3] : ε
    -> (12) : a
    -> (13) : b

(7) -> [3] : ε
    -> (14) : a
    -> (15) : b

(8) -> [3] : ε

(9) -> [3] : ε

(10) -> [3] : ε

(11) -> [3] : ε

(12) -> [3] : ε

(13) -> [3] : ε

(14) -> [3] : ε

(15) -> [3] : ε
`;

module.exports[n`fromWords >> NFA >> [] `] = lit`
(0) -> none
`;

module.exports[n`fromWords >> NFA >> [""] `] = lit`
[0] -> none
`;

module.exports[n`fromWords >> NFA >> ["","a"] `] = lit`
[0] -> [1] : a

[1] -> none
`;

module.exports[n`fromWords >> NFA >> ["","a","aa","","a","aa"] `] = lit`
[0] -> [1] : a

[1] -> [2] : a

[2] -> none
`;

module.exports[n`fromWords >> NFA >> ["foo","bar","foo","bar","baz","food"] `] = lit`
(0) -> (1) : b
    -> (2) : f

(1) -> (3) : a

(2) -> (4) : o

(3) -> [5] : r z

(4) -> [6] : o

[5] -> none

[6] -> [5] : d
`;

module.exports[n`fromWords >> NFA >> ["","a","b","c","d","e","f","g"] `] = lit`
[0] -> [1] : a-g

[1] -> none
`;

module.exports[n`fromWords >> NFA >> ["a","b","ab","ba","aa","bb","aaa","aab","aba","abb","baa","bab","bba","bbb"] `] = lit`
(0) -> [1] : a
    -> [2] : b

[1] -> [3] : a b

[2] -> [4] : a b

[3] -> [5] : a b

[4] -> [5] : a b

[5] -> none
`;

module.exports[n`fromWordSets >> DFA >> /[]/u `] = lit`
(0) -> none
`;

module.exports[n`fromWordSets >> DFA >> /||||/u `] = lit`
[0] -> none
`;

module.exports[n`fromWordSets >> DFA >> /a|b|c|abc|bca|cba|cab|aa|caa/i `] = lit`
(0) -> [1] : A a
    -> [2] : B b
    -> [3] : C c

[1] -> [4] : A a
    -> (5) : B b

[2] -> (6) : C c

[3] -> (7) : A a
    -> (8) : B b

[4] -> none

(5) -> [9] : C c

(6) -> [10] : A a

(7) -> [11] : A a
    -> [12] : B b

(8) -> [13] : A a

[9] -> none

[10] -> none

[11] -> none

[12] -> none

[13] -> none
`;

module.exports[n`fromWordSets >> DFA >> /|a|b|c|abc|bca|cba|cab|aa|caa/i `] = lit`
[0] -> [1] : A a
    -> [2] : B b
    -> [3] : C c

[1] -> [4] : A a
    -> (5) : B b

[2] -> (6) : C c

[3] -> (7) : A a
    -> (8) : B b

[4] -> none

(5) -> [9] : C c

(6) -> [10] : A a

(7) -> [11] : A a
    -> [12] : B b

(8) -> [13] : A a

[9] -> none

[10] -> none

[11] -> none

[12] -> none

[13] -> none
`;

module.exports[n`fromWordSets >> DFA >> /foo|food|bar|bar|\wd|\d\w/ `] = lit`
(0) -> (1) : 0-9
    -> (2) : A-Z '_' a c-e g-z
    -> (3) : b
    -> (4) : f

(1) -> [5] : 0-9 A-Z '_' a-c e-z
    -> [6] : d

(2) -> [7] : d

(3) -> (8) : a
    -> [9] : d

(4) -> [10] : d
    -> (11) : o

[5] -> none

[6] -> none

[7] -> none

(8) -> [12] : r

[9] -> none

[10] -> none

(11) -> [13] : o

[12] -> none

[13] -> [14] : d

[14] -> none
`;

module.exports[n`fromWordSets >> ENFA >> /[]/u `] = lit`
(0) -> none
`;

module.exports[n`fromWordSets >> ENFA >> /||||/u `] = lit`
(0) -> [1] : ε

[1] -> none
`;

module.exports[n`fromWordSets >> ENFA >> /a|b|c|abc|bca|cba|cab|aa|caa/i `] = lit`
(0) -> (1) : A a
    -> (2) : B b
    -> (3) : C c

(1) -> [4] : ε
    -> (5) : B b
    -> (6) : A a

(2) -> [4] : ε
    -> (7) : C c

(3) -> [4] : ε
    -> (8) : B b
    -> (9) : A a

[4] -> none

(5) -> (10) : C c

(6) -> [4] : ε

(7) -> (11) : A a

(8) -> (12) : A a

(9) -> (13) : B b
    -> (14) : A a

(10) -> [4] : ε

(11) -> [4] : ε

(12) -> [4] : ε

(13) -> [4] : ε

(14) -> [4] : ε
`;

module.exports[n`fromWordSets >> ENFA >> /|a|b|c|abc|bca|cba|cab|aa|caa/i `] = lit`
(0) -> [1] : ε
    -> (2) : A a
    -> (3) : B b
    -> (4) : C c

[1] -> none

(2) -> [1] : ε
    -> (5) : B b
    -> (6) : A a

(3) -> [1] : ε
    -> (7) : C c

(4) -> [1] : ε
    -> (8) : B b
    -> (9) : A a

(5) -> (10) : C c

(6) -> [1] : ε

(7) -> (11) : A a

(8) -> (12) : A a

(9) -> (13) : B b
    -> (14) : A a

(10) -> [1] : ε

(11) -> [1] : ε

(12) -> [1] : ε

(13) -> [1] : ε

(14) -> [1] : ε
`;

module.exports[n`fromWordSets >> ENFA >> /foo|food|bar|bar|\wd|\d\w/ `] = lit`
(0) -> (1) : f
    -> (2) : b
    -> (3) : A-Z '_' a c-e g-z
    -> (4) : 0-9

(1) -> (5) : o
    -> (6) : d

(2) -> (7) : a
    -> (8) : d

(3) -> (9) : d

(4) -> (10) : d
    -> (11) : 0-9 A-Z '_' a-c e-z

(5) -> (12) : o

(6) -> [13] : ε

(7) -> (14) : r

(8) -> [13] : ε

(9) -> [13] : ε

(10) -> [13] : ε

(11) -> [13] : ε

(12) -> [13] : ε
     -> (15) : d

[13] -> none

(14) -> [13] : ε

(15) -> [13] : ε
`;

module.exports[n`fromWordSets >> NFA >> /[]/u `] = lit`
(0) -> none
`;

module.exports[n`fromWordSets >> NFA >> /||||/u `] = lit`
[0] -> none
`;

module.exports[n`fromWordSets >> NFA >> /a|b|c|abc|bca|cba|cab|aa|caa/i `] = lit`
(0) -> [1] : A a
    -> [2] : B b
    -> [3] : C c

[1] -> [4] : A a
    -> (5) : B b

[2] -> (6) : C c

[3] -> (6) : B b
    -> (7) : A a

[4] -> none

(5) -> [4] : C c

(6) -> [4] : A a

(7) -> [4] : A B a b
`;

module.exports[n`fromWordSets >> NFA >> /|a|b|c|abc|bca|cba|cab|aa|caa/i `] = lit`
[0] -> [1] : A a
    -> [2] : B b
    -> [3] : C c

[1] -> [4] : A a
    -> (5) : B b

[2] -> (6) : C c

[3] -> (6) : B b
    -> (7) : A a

[4] -> none

(5) -> [4] : C c

(6) -> [4] : A a

(7) -> [4] : A B a b
`;

module.exports[n`fromWordSets >> NFA >> /foo|food|bar|bar|\wd|\d\w/ `] = lit`
(0) -> (1) : 0-9
    -> (2) : A-Z '_' a c-e g-z
    -> (3) : b
    -> (4) : f

(1) -> [5] : 0-9 A-Z '_' a-z

(2) -> [5] : d

(3) -> [5] : d
    -> (6) : a

(4) -> [5] : d
    -> (7) : o

[5] -> none

(6) -> [5] : r

(7) -> [8] : o

[8] -> [5] : d
`;
