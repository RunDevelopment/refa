import { Char, Word } from "./char-types";
import { CharRange, CharSet } from "./char-set";
import { concatSequences, iterToSet } from "./util";

export function isChar(value: unknown): value is Char {
	return typeof value === "number";
}

/**
 * Returns an array of disjoint non-empty sets that can used to construct all given sets.
 *
 * If the union of all given character sets is empty, the empty array will be returned.
 *
 * This algorithm run in O(n*log(n)) where n is the number of ranges in the given character sets.
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
			let key = "";
			for (let setIndex = 0; setIndex < sets.length; setIndex++) {
				const set = sets[setIndex];
				if (set.has(min)) {
					key += setIndex + " ";
				}
			}

			const value = baseRanges.get(key);
			const range = { min, max: sortedCuts[i] - 1 };
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

/**
 * Iterates all words which can be constructed from the given word set (array of character sets).
 *
 * @param wordSet
 */
export function wordSetToWords(wordSet: readonly CharSet[]): Iterable<Word> {
	if (wordSet.length === 0) {
		// simple base case
		return [[]];
	} else if (wordSet.length === 1) {
		// This is about twice as fast as calling `concatSequences`.
		const ranges = wordSet[0].ranges;
		return (function* (): Iterable<Word> {
			for (const { min, max } of ranges) {
				for (let c = min; c <= max; c++) {
					yield [c];
				}
			}
		})();
	}

	// The overhead of `concatSequences` can be **really** high for single-character char sets.
	// So we will try to find a subtract a non-empty suffix of single-character char sets.
	const suffix: Word = [];
	for (let i = wordSet.length - 1; i >= 0; i--) {
		const ranges = wordSet[i].ranges;
		if (ranges.length === 1 && ranges[0].min === ranges[0].max) {
			suffix.push(ranges[0].min);
		} else {
			break;
		}
	}

	if (suffix.length > 0) {
		suffix.reverse();
		if (suffix.length === wordSet.length) {
			return [suffix];
		}

		wordSet = wordSet.slice(0, wordSet.length - suffix.length);

		return (function* (): Iterable<Word> {
			for (const word of wordSetToWords(wordSet)) {
				word.push(...suffix);
				yield word;
			}
		})();
	}

	return concatSequences(wordSet.map(cs => cs.characters()));
}

export function* wordSetsToWords(wordSets: Iterable<readonly CharSet[]>): Iterable<Word> {
	for (const wordSet of wordSets) {
		yield* wordSetToWords(wordSet);
	}
}
