import { Literal } from "../../src/js";

export const FROM_REGEX_LITERALS: Literal[] = [
	/a?/,
	/a??/,
	/a+/,
	/a+?/,
	/(a|b)+c/,
	/a*b*c*/,
	/a*b*?c*/,
	/a*?b*c*?/,
	/a+b+?c+/,
	/a{4}/,
	/a{4}?/,
	/(a|){3}/,
	/(|a){3}/,
	/(|a|){3}/,
	/a{2,4}/,
	/a{2,4}?/,
	/a{2,6}/,
	/(ab){0,3}/,
	/(){100,1000}/,
	/a+|/,
	/|a+/,
	/a*/,
	/a*?/,
	/(a|)+/,
	/(a*)+/,
	/(a*){4}/,
	/(a+|){4}/,
	/(a+)+/,
	/(a+|){0,4}/,
	/(a+){4}/,
	/(a*){4,}/,
	/((a*)+)?/,
	/(a|b)?c/,
	/(a+|b+)*/,
	/()*/,
	/([^\s\S])*/,
	/a*|b*/,
	/a+|b+|c+/,
	/(a*|b*)+/,
	/[^\s\S]/,
	/ab[^\s\S]ba/,
	/([^\s\S]|a|[^\s\S]|b[^\s\S]b|[^\s\S])a/,
	/[^\s\S]+/,
	/[^\s\S]*/,
	/[^\s\S]?/,
	/a+|aaab/,
	/a+|a*aa*/,
	/(?:a+){2,}/,
	/abc|ab|abd|abcd/,
	/abc?|abd|abcd/,
	/food|fool|foot/,
	/fo(od|ol|ot)/,
	/bet|get|pet|set/,
	/bet|bat|bit/,
	/a(?:bc)?|dbc/,
	/\d+(?:\.\d+)?(?:e[+-]?\d+)?/i,
	/<[=>]?|>=?|=>?|:=|\/=?/,
	/\{[^\r\n}:]+\}/,
	/'(?:%.|[^%'\r\n])+'/,
	/&[bchou][a-z\d]+/i,
	/"(?:[^\\"]|\\.)*"|'[^']*'/,
];