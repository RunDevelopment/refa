import { CharRange, CharSet } from "../char-set";
import { Char } from "../char-types";
import { Flags } from "./flags";
import { UnicodeCaseFolding, UnicodeCaseVarying } from "./unicode";
import { UTF16CaseFolding, UTF16CaseVarying } from "./utf16-case-folding";

export const UNICODE_MAXIMUM = 0x10ffff;
export const UTF16_MAXIMUM = 0xffff;

interface CharEnvBase {
	readonly maxCharacter: Char;

	readonly all: CharSet;
	readonly empty: CharSet;

	readonly lineTerminator: CharSet;
	readonly nonLineTerminator: CharSet;

	readonly space: CharSet;
	readonly nonSpace: CharSet;

	readonly digit: CharSet;
	readonly nonDigit: CharSet;

	readonly word: CharSet;
	readonly nonWord: CharSet;
}
export interface CharEnvIgnoreCase {
	readonly ignoreCase: true;
	readonly caseFolding: Readonly<Record<number, readonly Char[] | undefined>>;
	readonly caseVarying: CharSet;
	readonly withCaseVaryingCharacters: (cs: CharSet) => CharSet;
}
export interface CharEnvNonIgnoreCase {
	readonly ignoreCase: false;
}
export interface CharEnvUnicode {
	readonly unicode: true;
}
export interface CharEnvNonUnicode {
	readonly unicode: false;
}
export type CharEnv = CharEnvBase & (CharEnvUnicode | CharEnvNonUnicode) & (CharEnvIgnoreCase | CharEnvNonIgnoreCase);

const DIGIT: readonly CharRange[] = [
	{ min: 0x30, max: 0x39 }, // 0-9
];
const SPACE: readonly CharRange[] = [
	{ min: 0x09, max: 0x0d }, // \t \n \v \f \r
	{ min: 0x20, max: 0x20 }, // space
	{ min: 0xa0, max: 0xa0 }, // non-breaking space
	{ min: 0x1680, max: 0x1680 },
	{ min: 0x2000, max: 0x200a },
	{ min: 0x2028, max: 0x2029 },
	{ min: 0x202f, max: 0x202f },
	{ min: 0x205f, max: 0x205f },
	{ min: 0x3000, max: 0x3000 },
	{ min: 0xfeff, max: 0xfeff },
];
const WORD: readonly CharRange[] = [
	{ min: 0x30, max: 0x39 }, // 0-9
	{ min: 0x41, max: 0x5a }, // A-Z
	{ min: 0x5f, max: 0x5f }, // _
	{ min: 0x61, max: 0x7a }, // a-z
];
const LINE_TERMINATOR: readonly CharRange[] = [
	{ min: 0x0a, max: 0x0a }, // \n
	{ min: 0x0d, max: 0x0d }, // \r
	{ min: 0x2028, max: 0x2029 },
];

const lineTerminatorUTF16 = CharSet.empty(UTF16_MAXIMUM).union(LINE_TERMINATOR);
const nonLineTerminatorUTF16 = lineTerminatorUTF16.negate();
const lineTerminatorUnicode = CharSet.empty(UNICODE_MAXIMUM).union(LINE_TERMINATOR);
const nonLineTerminatorUnicode = lineTerminatorUnicode.negate();

const spaceUTF16 = CharSet.empty(UTF16_MAXIMUM).union(SPACE);
const nonSpaceUTF16 = spaceUTF16.negate();
const spaceUnicode = CharSet.empty(UNICODE_MAXIMUM).union(SPACE);
const nonSpaceUnicode = spaceUnicode.negate();

const digitUTF16 = CharSet.empty(UTF16_MAXIMUM).union(DIGIT);
const nonDigitUTF16 = digitUTF16.negate();
const digitUnicode = CharSet.empty(UNICODE_MAXIMUM).union(DIGIT);
const nonDigitUnicode = digitUnicode.negate();

const wordUTF16 = CharSet.empty(UTF16_MAXIMUM).union(WORD);
const nonWordUTF16 = wordUTF16.negate();
const wordUnicode = CharSet.empty(UNICODE_MAXIMUM).union(WORD);
const nonWordUnicode = wordUnicode.negate();
const wordIgnoreCaseUnicode = withCaseVaryingCharacters(
	CharSet.empty(UNICODE_MAXIMUM).union(WORD),
	UnicodeCaseFolding,
	UnicodeCaseVarying
);
const nonWordIgnoreCaseUnicode = wordIgnoreCaseUnicode.negate();

const CHAR_ENV: CharEnv = {
	// base
	maxCharacter: UTF16_MAXIMUM,

	all: CharSet.all(UTF16_MAXIMUM),
	empty: CharSet.empty(UTF16_MAXIMUM),

	lineTerminator: lineTerminatorUTF16,
	nonLineTerminator: nonLineTerminatorUTF16,

	space: spaceUTF16,
	nonSpace: nonSpaceUTF16,

	digit: digitUTF16,
	nonDigit: nonDigitUTF16,

	word: wordUTF16,
	nonWord: nonWordUTF16,

	// ignore case
	ignoreCase: false,

	// unicode
	unicode: false,
};
const CHAR_ENV_I: CharEnv = {
	// base
	maxCharacter: UTF16_MAXIMUM,

	all: CharSet.all(UTF16_MAXIMUM),
	empty: CharSet.empty(UTF16_MAXIMUM),

	lineTerminator: lineTerminatorUTF16,
	nonLineTerminator: nonLineTerminatorUTF16,

	space: spaceUTF16,
	nonSpace: nonSpaceUTF16,

	digit: digitUTF16,
	nonDigit: nonDigitUTF16,

	word: wordUTF16,
	nonWord: nonWordUTF16,

	// ignore case
	ignoreCase: true,
	caseFolding: UTF16CaseFolding,
	caseVarying: UTF16CaseVarying,
	withCaseVaryingCharacters: cs => withCaseVaryingCharacters(cs, UTF16CaseFolding, UTF16CaseVarying),

	// unicode
	unicode: false,
};
const CHAR_ENV_U: CharEnv = {
	// base
	maxCharacter: UNICODE_MAXIMUM,

	all: CharSet.all(UNICODE_MAXIMUM),
	empty: CharSet.empty(UNICODE_MAXIMUM),

	lineTerminator: lineTerminatorUnicode,
	nonLineTerminator: nonLineTerminatorUnicode,

	space: spaceUnicode,
	nonSpace: nonSpaceUnicode,

	digit: digitUnicode,
	nonDigit: nonDigitUnicode,

	word: wordUnicode,
	nonWord: nonWordUnicode,

	// ignore case
	ignoreCase: false,

	// unicode
	unicode: true,
};
const CHAR_ENV_IU: CharEnv = {
	// base
	maxCharacter: UNICODE_MAXIMUM,

	all: CharSet.all(UNICODE_MAXIMUM),
	empty: CharSet.empty(UNICODE_MAXIMUM),

	lineTerminator: lineTerminatorUnicode,
	nonLineTerminator: nonLineTerminatorUnicode,

	space: spaceUnicode,
	nonSpace: nonSpaceUnicode,

	digit: digitUnicode,
	nonDigit: nonDigitUnicode,

	word: wordIgnoreCaseUnicode,
	nonWord: nonWordIgnoreCaseUnicode,

	// ignore case
	ignoreCase: true,
	caseFolding: UnicodeCaseFolding,
	caseVarying: UnicodeCaseVarying,
	withCaseVaryingCharacters: cs => withCaseVaryingCharacters(cs, UnicodeCaseFolding, UnicodeCaseVarying),

	// unicode
	unicode: true,
};

function withCaseVaryingCharacters(
	cs: CharSet,
	caseFolding: Readonly<Record<number, readonly Char[] | undefined>>,
	caseVarying: CharSet
): CharSet {
	if (cs.isSupersetOf(caseVarying)) {
		// this set already includes all case varying characters
		return cs;
	}

	const actualCaseVarying = cs.intersect(caseVarying);
	if (actualCaseVarying.isEmpty) {
		return cs;
	}

	const caseVariationSet = new Set<Char>();
	for (const { min, max } of actualCaseVarying.ranges) {
		for (let i = min; i <= max; i++) {
			const fold = caseFolding[i]!;
			for (let j = 0, l = fold.length; j < l; j++) {
				caseVariationSet.add(fold[j]);
			}
		}
	}
	const caseVariationArray = [...caseVariationSet];
	caseVariationArray.sort((a, b) => a - b);

	return cs.union(CharSet.fromCharacters(cs.maximum, caseVariationArray));
}

export function getCharEnv(flags: Readonly<Flags>): CharEnv {
	if (flags.unicode) {
		return flags.ignoreCase ? CHAR_ENV_IU : CHAR_ENV_U;
	} else {
		return flags.ignoreCase ? CHAR_ENV_I : CHAR_ENV;
	}
}
