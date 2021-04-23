import { Char } from "../core-types";
import { CharRange, CharSet } from "../char-set";
import { runEncodeCharacters } from "../char-util";
import { UnicodeCaseFolding, UnicodeCaseVarying } from "./unicode";

export const UNICODE_MAXIMUM = 0x10ffff;
export const UTF16_MAXIMUM = 0xffff;

/**
 * Returns a character set which includes all characters of the given character set and all their case variations.
 *
 * @param cs
 * @param caseFolding
 * @param caseVarying
 */
export function withCaseVaryingCharacters(
	cs: CharSet,
	caseFolding: Readonly<Record<number, readonly Char[]>>,
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
			const fold = caseFolding[i];
			for (let j = 0, l = fold.length; j < l; j++) {
				caseVariationSet.add(fold[j]);
			}
		}
	}
	const caseVariationArray = [...caseVariationSet];
	caseVariationArray.sort((a, b) => a - b);

	return cs.union(runEncodeCharacters(caseVariationArray));
}

export const DIGIT: readonly CharRange[] = [
	{ min: 0x30, max: 0x39 }, // 0-9
];
export const SPACE: readonly CharRange[] = [
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
export const WORD: readonly CharRange[] = [
	{ min: 0x30, max: 0x39 }, // 0-9
	{ min: 0x41, max: 0x5a }, // A-Z
	{ min: 0x5f, max: 0x5f }, // _
	{ min: 0x61, max: 0x7a }, // a-z
];
export const LINE_TERMINATOR: readonly CharRange[] = [
	{ min: 0x0a, max: 0x0a }, // \n
	{ min: 0x0d, max: 0x0d }, // \r
	{ min: 0x2028, max: 0x2029 },
];
export const WORD_IU: readonly CharRange[] = withCaseVaryingCharacters(
	CharSet.empty(UNICODE_MAXIMUM).union(WORD),
	UnicodeCaseFolding,
	UnicodeCaseVarying
).ranges;
