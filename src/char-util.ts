import { CharRange, CharSet } from "./char-set";
import { ReadonlyCharMap } from "./char-map";
import { iterToSet } from "./util";

/**
 * Converts the given iterable of sorted unique numbers to a optimal iterable of character ranges.
 *
 * @param chars
 */
export function* runEncodeCharacters(chars: Iterable<number>): Iterable<CharRange> {
	let start = -1;
	let length = 0;

	for (const i of chars) {
		if (start === -1) {
			start = i;
			length = 1;
		} else if (i === start + length) {
			length++;
		} else {
			yield { min: start, max: start + length - 1 };
			start = i;
			length = 1;
		}
	}

	if (length > 0) {
		yield { min: start, max: start + length - 1 };
	}
}

/**
 * Returns an array of disjoint non-empty sets that can used to construct all given sets.
 *
 * If the union of all given character sets is empty, the empty array will be returned.
 *
 * @param sets
 */
export function getBaseSets(charSets: Iterable<CharSet>): readonly CharSet[] {
	// remove duplicates and empty sets
	const sets = [...iterToSet(charSets)]
		.filter(set => !set.isEmpty)
		.sort((a, b) => a.compare(b))
		.filter((set, i, array) => i === 0 || !set.equals(array[i - 1]));

	if (sets.length === 0) {
		// trivially
		return sets;
	}
	if (sets.length === 1) {
		// if there's only one set, then it's the only base set
		return sets;
	}

	// extract all ranges
	const maximum = sets[0].maximum;
	const ranges: CharRange[] = [];
	for (const set of sets) {
		if (set.maximum !== maximum) {
			throw new Error("The maximum of all given sets has to be the same.");
		}
		ranges.push(...set.ranges);
	}

	if (ranges.length === 0) {
		return [];
	}

	// union of all char sets
	const union = CharSet.empty(maximum).union(ranges);

	// set of all cuts
	const cuts = new Set<number>();
	for (let i = 0, l = ranges.length; i < l; i++) {
		const { min, max } = ranges[i];
		cuts.add(min);
		cuts.add(max + 1);
	}

	// determine the ranges of the base sets
	const sortedCuts = [...cuts].sort((a, b) => a - b);
	const baseRanges = new Map<string, CharRange[]>();
	for (let i = 1, l = sortedCuts.length; i < l; i++) {
		const min = sortedCuts[i - 1];
		if (union.has(min)) {
			const range = { min, max: sortedCuts[i] - 1 };
			let key = "";
			for (const set of sets) {
				if (set.has(min)) {
					key += rangesToKey(set.ranges) + "\n";
				}
			}

			const value = baseRanges.get(key);
			if (value) {
				value.push(range);
			} else {
				baseRanges.set(key, [range]);
			}
		}
	}

	// create the base sets
	const baseSets: CharSet[] = [];
	for (const ranges of baseRanges.values()) {
		baseSets.push(CharSet.empty(maximum).union(ranges));
	}

	return baseSets;
}
function rangesToKey(ranges: readonly CharRange[]): string {
	let key = "";
	for (let i = 0, l = ranges.length; i < l; i++) {
		const { min, max } = ranges[i];
		key += min.toString(16) + "," + max.toString(16) + ";";
	}
	return key;
}

/**
 * Decomposes the given set into its base sets. Returned array will be the sorted indexes of the base sets necessary to
 * construct the given set.
 *
 * This assumes that `set` is either empty or can be constructed from the base sets.
 *
 * @param set
 * @param baseSets
 */
export function decomposeIntoBaseSets(set: CharSet, baseSets: readonly CharSet[]): number[] {
	const res: number[] = [];
	for (let i = 0, l = baseSets.length; i < l; i++) {
		if (set.has(baseSets[i].ranges[0].min)) {
			res.push(i);
		}
	}
	return res;
}

export function invertCharMap<T>(charMap: ReadonlyCharMap<T>, maximum: number): Map<T, CharSet> {
	const rangeMap = new Map<T, CharRange[]>();

	charMap.forEach((value, range) => {
		let array = rangeMap.get(value);
		if (array === undefined) {
			rangeMap.set(value, (array = []));
		}
		array.push(range);
	});

	const map = new Map<T, CharSet>();
	for (const [value, ranges] of rangeMap) {
		map.set(value, CharSet.empty(maximum).union(ranges));
	}
	return map;
}

const LATIN_LOWER: CharRange = { min: 0x61, max: 0x7a };
const LATIN_UPPER: CharRange = { min: 0x41, max: 0x5a };
const LATIN_DIGIT: CharRange = { min: 0x30, max: 0x39 };
const LATIN_UNDERSCORE = 0x5f;
const READABLE_CHARACTERS = CharSet.empty(0x10ffff).union([
	LATIN_LOWER,
	LATIN_UPPER,
	LATIN_DIGIT,
	{ min: LATIN_UNDERSCORE, max: LATIN_UNDERSCORE },
]);

/**
 * Returns a string representation of the given character ranges.
 *
 * @param ranges
 * @param printReadable Whether to also output readable characters as characters.
 */
export function rangesToString(ranges: Iterable<CharRange>, printReadable: boolean = false): string {
	function stringify(char: number): string {
		if (printReadable && char !== /* ',' */ 44 && char !== /* ' */ 39 && READABLE_CHARACTERS.has(char)) {
			return `${char.toString(16)} '${String.fromCodePoint(char)}'`;
		}
		return char.toString(16);
	}

	let s = "";
	for (const range of ranges) {
		if (s !== "") s += ", ";
		if (range.min == range.max) {
			s += stringify(range.min);
		} else {
			s += stringify(range.min) + ".." + stringify(range.max);
		}
	}
	return s;
}
/**
 * Parses the string representation of character ranges and returns the represented ranges.
 *
 * @param string
 */
export function rangesFromString(string: string): CharRange[] {
	function parse(s: string): number {
		return parseInt(s, 16);
	}

	return string
		.trim()
		.split(/\s*,\s*/g)
		.map(r => {
			const [min, max] = r.split("..");
			if (max === undefined) {
				const parsed = parse(min);
				return { min: parsed, max: parsed };
			} else {
				return { min: parse(min), max: parse(max) };
			}
		});
}
