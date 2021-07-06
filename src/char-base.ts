import { CharRange, CharSet } from "./char-set";
import { iterToSet } from "./util";

/**
 * A character base is constructed from a collection of character sets. It holds a list of disjoint, non-empty
 * character sets - the base sets - that can be used to construct every character set in the collection it was
 * constructed from.
 *
 * ## Guarantees
 *
 * - The base sets are guaranteed to be mutually disjoint and non-empty.
 *
 * - Every character set in the collection can be constructed by combining (union) a unique set of base sets.
 *
 * - The list of base sets is guaranteed to be as small as possible. There are at most `min(n, o)` base sets where `n`
 *   is the number of unique, non-empty character sets in the collection, and `o` is the number of characters in the
 *   union of all character sets in the collection.
 *
 * ## Use case
 *
 * The primary purpose of base sets is to remap alphabets. Some FA operations scale with the number of characters in the
 * alphabet of the FA (e.g. DFA minimization).
 *
 * Base sets can be used to determine which characters in an FA's alphabet *Σ* cannot be distinguished by the FA *A*.
 * Two characters *a,b* in *Σ* are indistinguishable if for all inputs *w* the following hold true:
 *
 * 1. *w* is accepted by *A* iff *w* with all occurrences of *a* replaced with *b* is accepted by *A*.
 * 2. *w* is accepted by *A* iff *w* with all occurrences of *b* replaced with *a* is accepted by *A*.
 *
 * Two indistinguishable characters are guaranteed to be in the same base set.
 *
 * By treating each base set as a character, it is possible to create a new (smaller) alphabet *Γ* (*|Γ| <= |Σ|*) such
 * that the FA *A* still behaves the same.
 *
 * Since *Γ* is typically (several orders of magnitude) smaller, operations that scale with the size of the alphabet
 * can be done more quickly.
 */
export class CharBase {
	/**
	 * A list of disjoint, non-empty character sets.
	 *
	 * See {@link CharBase} to learn more.
	 */
	readonly sets: readonly CharSet[];

	/**
	 * Create the base sets of the given collection of character sets.
	 *
	 * See {@link CharBase} to learn more.
	 *
	 * @throws `RangeError` if the collection contains two character sets with different maximums.
	 */
	constructor(charSets: Iterable<CharSet>) {
		this.sets = getBaseSets(charSets);
	}

	/**
	 * Splits the given character set into its base sets.
	 *
	 * The returned array will be a list of indexes of base sets necessary to construct the given character sets. The
	 * indexes will be sorted and occur at most once.
	 *
	 * **Note**: This assumes that `charSet` is either empty or can be constructed from the base sets. If the
	 * assumption is not met, the output of this function will be undefined.
	 */
	split(charSet: CharSet): number[] {
		const indexes: number[] = [];
		for (let i = 0, l = this.sets.length; i < l; i++) {
			if (charSet.has(this.sets[i].ranges[0].min)) {
				indexes.push(i);
			}
		}
		return indexes;
	}
}

/**
 * Returns an array of disjoint non-empty sets that can used to construct all given sets.
 *
 * If the union of all given character sets is empty, the empty array will be returned.
 *
 * This algorithm run in O(n*log(n)) where n is the number of ranges in the given character sets.
 */
function getBaseSets(charSets: Iterable<CharSet>): readonly CharSet[] {
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
			throw new RangeError("The maximum of all given sets has to be the same.");
		}
		ranges.push(...set.ranges);
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
