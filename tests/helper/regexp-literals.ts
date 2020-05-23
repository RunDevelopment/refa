import { Literal } from "../../src/js";


export const EMPTY_LITERALS: Literal[] = [
	/[^\s\S]/,
	/[^\s\S]+|[^\w\W]{4,13}/,
];

export const NON_EMPTY_LITERALS: Literal[] = [
	/(?:)/,
	/a*|b*c*/,
];

export const FINITE_LITERALS: Literal[] = [
	...EMPTY_LITERALS,

	// only match the empty word
	/(?:)/,
	/(?:)*/,
	/(?:|)*/,
	/(?:[^\s\S])*/,

	/a|b/,
	/a{0,10}|bb|c?/,
	/[\0-\uFFFF]{100}/, // matches about 4.4e+481 words but still finite
];

export const NON_FINITE_LITERALS: Literal[] = [
	/a+/,
	/a*|bb|ccc/,
	/(?:a|)*/,
	/(?:a|[^\s\S]){5,}/,
];
