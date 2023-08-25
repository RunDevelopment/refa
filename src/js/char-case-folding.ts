import { CharSet } from "../char-set";
import { Char } from "../char-types";
import { Flags } from "./flags";
import { Maximum } from "./maximum";
import { UnicodeCaseFolding } from "./unicode";
import { UTF16CaseFolding } from "./utf16-case-folding";

export interface CharCaseFolding {
	readonly canonicalize?: (char: Char) => Char;
	readonly toCharSet: (char: Char) => CharSet;
}

const CHAR_CASE_FOLDING_UTF16: CharCaseFolding = {
	toCharSet(char) {
		return CharSet.fromCharacter(Maximum.UTF16, char);
	},
};
const CHAR_CASE_FOLDING_UTF16_I: CharCaseFolding = {
	canonicalize: char => UTF16CaseFolding[char]?.[0] ?? char,
	toCharSet(char) {
		const folding = UTF16CaseFolding[char];
		if (folding === undefined) {
			return CharSet.fromCharacter(Maximum.UTF16, char);
		} else {
			return CharSet.fromCharacters(Maximum.UTF16, folding);
		}
	},
};
const CHAR_CASE_FOLDING_UNICODE: CharCaseFolding = {
	toCharSet(char) {
		return CharSet.fromCharacter(Maximum.UNICODE, char);
	},
};
const CHAR_CASE_FOLDING_UNICODE_I: CharCaseFolding = {
	canonicalize: char => UnicodeCaseFolding[char]?.[0] ?? char,
	toCharSet(char) {
		const folding = UnicodeCaseFolding[char];
		if (folding === undefined) {
			return CharSet.fromCharacter(Maximum.UNICODE, char);
		} else {
			return CharSet.fromCharacters(Maximum.UNICODE, folding);
		}
	},
};

export function getCharCaseFolding(unicode: boolean, ignoreCase: boolean): CharCaseFolding;
export function getCharCaseFolding(flags: Readonly<Flags>): CharCaseFolding;
export function getCharCaseFolding(flagsOrUnicode: Readonly<Flags> | boolean, ignoreCase?: boolean): CharCaseFolding {
	let unicode: boolean;
	if (typeof flagsOrUnicode === "boolean") {
		unicode = flagsOrUnicode;
	} else {
		unicode = flagsOrUnicode.unicode || !!flagsOrUnicode.unicodeSets;
		ignoreCase = flagsOrUnicode.ignoreCase;
	}

	if (unicode) {
		return ignoreCase ? CHAR_CASE_FOLDING_UNICODE_I : CHAR_CASE_FOLDING_UNICODE;
	} else {
		return ignoreCase ? CHAR_CASE_FOLDING_UTF16_I : CHAR_CASE_FOLDING_UTF16;
	}
}
