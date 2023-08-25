import { CharRange, CharSet } from "../char-set";
import { Char } from "../char-types";
import { Maximum } from "./maximum";

const enum HighSurrogate {
	MIN = 0xd800,
	MAX = 0xdbff,
}
const enum LowSurrogate {
	MIN = 0xdc00,
	MAX = 0xdfff,
}

const BMP: CharRange = { min: 0, max: Maximum.UTF16 };
const SURROGATE_RANGE: CharRange = { min: 0xd800, max: 0xdfff };
const HIGH_SURROGATE_RANGE: CharRange = { min: HighSurrogate.MIN, max: HighSurrogate.MAX };
const LOW_SURROGATE_RANGE: CharRange = { min: LowSurrogate.MIN, max: LowSurrogate.MAX };
const LOW_SURROGATE_SET: CharSet = CharSet.empty(Maximum.UTF16).union([LOW_SURROGATE_RANGE]);

/**
 * A representation of UTF16 character codes.
 *
 * The representation is equivalent to the regex:
 *
 * ```js
 * /[bmp]|[astral_0_0][astral_0_1]|...|[astral_n_0][astral_n_1]|(?<![\uD800-\uDBFF])[low]|[high](?![\uDC00-\uDFFF])/
 * ```
 *
 * The character sets of `bmp`, `low`, `high`, and all `astral_i_0` are guaranteed to be disjoint. The maximum of all
 * character sets is guaranteed to be 0xFFFF.
 */
export interface UTF16Result {
	bmp: CharSet;
	high: CharSet;
	low: CharSet;
	astral: [CharSet, CharSet][];
}

/**
 * Converts the given character set into a UTF16-compatible result.
 *
 * @param charSet
 * @returns
 */
export function toUTF16(charSet: CharSet): UTF16Result {
	if (charSet.maximum === Maximum.UTF16) {
		return {
			bmp: charSet,
			high: CharSet.empty(Maximum.UTF16),
			low: CharSet.empty(Maximum.UTF16),
			astral: [],
		};
	}

	if (charSet.maximum !== Maximum.UNICODE) {
		throw new RangeError(`Expected Unicode maximum (${Maximum.UNICODE}) but found ${charSet.maximum}`);
	}

	const nativeUTF16 = charSet.resize(Maximum.UTF16);
	const bmp = nativeUTF16.without(SURROGATE_RANGE);
	const high = nativeUTF16.intersect(HIGH_SURROGATE_RANGE);
	const low = nativeUTF16.intersect(LOW_SURROGATE_RANGE);

	const astral = charSet.without(BMP);

	return {
		bmp,
		high,
		low,
		astral: convertAstral(astral),
	};
}

function convertAstral(astral: CharSet): UTF16Result["astral"] {
	if (astral.isEmpty) {
		// trivial
		return [];
	}

	interface PartialItem {
		/** The high surrogate for all the low surrogates. */
		high: Char;
		/** A sorted list of disjoint, non-adjacent ranges of low surrogates. */
		low: CharRange[];
	}
	const partials: PartialItem[] = [];
	const full: CharRange[] = [];

	function addPartialRange(high: Char, range: CharRange): void {
		if (range.min === LowSurrogate.MIN && range.max === LowSurrogate.MAX) {
			// it's actually a full range
			full.push({ min: high, max: high });
			return;
		}

		const last = partials[partials.length - 1] as PartialItem | undefined;
		if (last?.high === high) {
			last.low.push(range);
		} else {
			partials.push({ high, low: [range] });
		}
	}

	// Step 1:
	// Add all surrogate pairs. We will keep a list of all high surrogates and their low surrogates.

	for (const { min, max } of astral.ranges) {
		const minHigh = getHighSurrogate(min);
		const maxHigh = getHighSurrogate(max);
		const minLow = getLowSurrogate(min);
		const maxLow = getLowSurrogate(max);

		if (minHigh === maxHigh) {
			addPartialRange(minHigh, { min: minLow, max: maxLow });
		} else {
			addPartialRange(minHigh, { min: minLow, max: LowSurrogate.MAX });
			if (minHigh + 1 < maxHigh) {
				full.push({ min: minHigh + 1, max: maxHigh - 1 });
			}
			addPartialRange(maxHigh, { min: LowSurrogate.MIN, max: maxLow });
		}
	}

	// Step 2:
	// We now further compress the list by merging all high surrogates with the same set of low surrogates.
	// This compression is unlikely to see much results. We only do it because it means that the final result is
	// guaranteed to be minimal (= a minimal DFA).

	partials.sort((a, b) => compareRanges(a.low, b.low));

	interface CompressedPartialItem {
		/** A list of high surrogate for all the low surrogates. */
		high: Char[];
		/** A sorted list of disjoint, non-adjacent ranges of low surrogates. */
		low: CharRange[];
	}
	const compressedPartials: CompressedPartialItem[] = [];

	for (const { high, low } of partials) {
		const last = compressedPartials[compressedPartials.length - 1] as CompressedPartialItem | undefined;
		if (last !== undefined && equalRanges(last.low, low)) {
			last.high.push(high);
		} else {
			compressedPartials.push({ high: [high], low });
		}
	}

	// Step 3:
	// Combine the compressed partials and the full list to create the final list

	const result: UTF16Result["astral"] = [];

	if (full.length > 0) {
		result.push([CharSet.empty(Maximum.UTF16).union(full), LOW_SURROGATE_SET]);
	}

	for (const { high, low } of compressedPartials) {
		// This additional sort will be unnecessary if `Array#sort` is stable.
		// TODO: Are we allowed to assume stable sorting?
		high.sort((a, b) => a - b);

		result.push([CharSet.fromCharacters(Maximum.UTF16, high), CharSet.empty(Maximum.UTF16).union(low)]);
	}

	// finally, sort the result by ascending high surrogate
	result.sort((a, b) => a[0].ranges[0].min - b[0].ranges[0].min);

	return result;
}

function getHighSurrogate(codePoint: Char): Char {
	return Math.floor((codePoint - 0x10000) / 0x400) + HighSurrogate.MIN;
}
function getLowSurrogate(codePoint: Char): Char {
	return ((codePoint - 0x10000) % 0x400) + LowSurrogate.MIN;
}

function compareRanges(a: readonly CharRange[], b: readonly CharRange[]): number {
	if (a.length !== b.length) {
		return a.length - b.length;
	}
	for (let i = 0, l = a.length; i < l; i++) {
		let diff = a[i].min - b[i].min;
		if (diff !== 0) {
			return diff;
		}
		diff = a[i].max - b[i].max;
		if (diff !== 0) {
			return diff;
		}
	}
	return 0;
}
function equalRanges(a: readonly CharRange[], b: readonly CharRange[]): boolean {
	return compareRanges(a, b) === 0;
}
