import { Char, Word } from "./core-types";
import { CharRange, CharSet } from "./char-set";
import { ReadonlyCharMap } from "./char-map";
import { iterToSet } from "./util";

export function isChar(value: unknown): value is Char {
	return typeof value === "number";
}

/**
 * Converts the given iterable of sorted unique numbers to a optimal iterable of character ranges.
 *
 * @param chars
 */
export function* runEncodeCharacters(chars: Iterable<Char>): Iterable<CharRange> {
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

export function invertCharMap<T>(charMap: ReadonlyCharMap<T>, maximum: Char): Map<T, CharSet> {
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

/**
 * Returns a string representation of the given character ranges.
 *
 * @param ranges
 * @param printReadable Whether to also output readable characters as characters.
 */
export function rangesToString(ranges: CharSet | Iterable<CharRange>): string {
	if (ranges instanceof CharSet) {
		ranges = ranges.ranges;
	}

	let s = "";
	for (const { min, max } of ranges) {
		if (s !== "") s += ", ";
		if (min == max) {
			s += min.toString(16);
		} else {
			s += min.toString(16) + ".." + max.toString(16);
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
	function parse(s: string): Char {
		return parseInt(s, 16);
	}

	return string
		.trim()
		.split(/\s*,\s*/g)
		.filter(Boolean)
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

/**
 * Iterates all words which can be constructed from the given word set (array of character sets).
 *
 * @param wordSet
 */
export function* wordSetToWords(wordSet: readonly CharSet[]): IterableIterator<Word> {
	if (wordSet.length === 0) {
		yield [];
	} else {
		const charsArray: number[][] = [];
		for (const set of wordSet) {
			const chars: number[] = [];
			for (const { min, max } of set.ranges) {
				for (let i = min; i <= max; i++) {
					chars.push(i);
				}
			}
			charsArray.push(chars);
		}
		yield* nestedIteration(charsArray);
	}
}
function* nestedIteration<T>(arrays: T[][]): IterableIterator<T[]> {
	const indexes: number[] = [];

	for (let i = 0; i < arrays.length; i++) {
		const array = arrays[i];
		if (array.length === 0) {
			return;
		}
		indexes[i] = 0;
	}

	function hasNext(): boolean {
		let i = arrays.length - 1;
		while (true) {
			if (i < 0) {
				return false;
			}
			const index = ++indexes[i];
			if (index >= arrays[i].length) {
				indexes[i] = 0;
				i--;
			} else {
				break;
			}
		}
		return true;
	}

	do {
		const res: T[] = [];
		for (let i = 0; i < indexes.length; i++) {
			res[i] = arrays[i][indexes[i]];
		}
		yield res;
	} while (hasNext());
}

export function* wordSetsToWords(wordSets: Iterable<CharSet[]>): IterableIterator<Word> {
	for (const wordSet of wordSets) {
		yield* wordSetToWords(wordSet);
	}
}
