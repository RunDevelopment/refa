import { Char, Word } from "./char-types";
import { CharSet } from "./char-set";
import { concatSequences } from "./util";

export function isChar(value: unknown): value is Char {
	return typeof value === "number";
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
