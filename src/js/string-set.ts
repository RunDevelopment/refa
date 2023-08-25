import { ReadonlyWord } from "../char-types";
import { debugAssert, filterMut } from "../util";
import { ReadonlyWordSet } from "../word-set";
import { CharCaseFolding } from "./char-case-folding";

const noopCaseFolding: CharCaseFolding = {
	toCharSet() {
		throw new Error("Cannot convert char to char set with noop case folding.");
	},
};

/**
 * A set of words.
 *
 * Words are stored as a sorted list of canonicalized words. The actual value of the set is {@link wordSets}.
 */
export class StringSet {
	/**
	 * A sorted list of canonicalized words.
	 *
	 * Words are guaranteed to be sorted by ascending length followed by ascending character value.
	 */
	readonly words: readonly ReadonlyWord[];

	private readonly _caseFolding: CharCaseFolding;

	/**
	 * `true` if this set is empty.
	 */
	get isEmpty(): boolean {
		return this.words.length === 0;
	}

	/**
	 * `true` if this set contains the empty word.
	 */
	get hasEmptyWord(): boolean {
		return this.words.length > 0 && this.words[0].length === 0;
	}
	/**
	 * `true` if this set contains at least one single-character word.
	 */
	get hasSingleCharacter(): boolean {
		const startIndex = this.hasEmptyWord ? 1 : 0;
		return this.words.length > startIndex && this.words[startIndex].length === 1;
	}

	private _wordSet: readonly ReadonlyWordSet[] | undefined;

	/**
	 * {@link words} with {@link CharCaseFolding#toCharSet} applied to each character.
	 *
	 * Word sets are guaranteed to be sorted by ascending length.
	 *
	 * Note: This is a lazy getter. Try to avoid calling it for best performance.
	 */
	get wordSets(): readonly ReadonlyWordSet[] {
		return (this._wordSet ??= toWordSets(this.words, this._caseFolding));
	}

	private constructor(items: readonly ReadonlyWord[], caseFolding: CharCaseFolding) {
		this.words = items;
		this._caseFolding = caseFolding;
	}

	static empty = new StringSet([], noopCaseFolding);

	static from(words: Iterable<ReadonlyWord>, caseFolding: CharCaseFolding): StringSet {
		const items = [...words];
		if (items.length === 0) {
			return StringSet.empty;
		}

		if (caseFolding.canonicalize) {
			for (let i = 0; i < items.length; i++) {
				items[i] = items[i].map(caseFolding.canonicalize);
			}
		}

		normalize(items);
		return new StringSet(items, caseFolding);
	}

	/**
	 * Returns whether this set is compatible with the given set. Compatibility is defined as follows:
	 *
	 * 1. The empty set is compatible with all sets.
	 * 2. Sets with different case folding are incompatible.
	 *
	 * @param other
	 */
	isCompatibleWith(other: StringSet): boolean {
		return this.isEmpty || other.isEmpty || this._caseFolding === other._caseFolding;
	}

	/**
	 * Returns whether this set is equal to the given set.
	 *
	 * Equality is defined as the `wordSets` of both sets being the same formal language.
	 *
	 * @param other
	 */
	equals(other: StringSet): boolean {
		if (this === other) {
			return true;
		}

		if (this.words.length !== other.words.length) {
			return false;
		}

		// empty sets
		if (this.words.length === 0) {
			return true;
		}

		if (this._caseFolding === other._caseFolding) {
			// we use the same case folding, so we don't need to use word sets
			const a = this.words;
			const b = other.words;
			for (let i = 0; i < a.length; i++) {
				if (compareWords(a[i], b[i]) !== 0) {
					return false;
				}
			}
			return true;
		} else {
			// before we use word sets, we check the length of all words to avoid unnecessary work
			const a = this.words;
			const b = other.words;
			for (let i = 0; i < a.length; i++) {
				if (a[i].length !== b[i].length) {
					return false;
				}
			}

			// compare word sets
			const aSets = this.wordSets;
			const bSets = other.wordSets;
			for (let i = 0; i < aSets.length; i++) {
				if (!equalWordSets(aSets[i], bSets[i])) {
					return false;
				}
			}
			return true;
		}
	}

	union(...others: StringSet[]): StringSet {
		if (others.length === 0) {
			return this;
		} else if (others.length === 1) {
			const other = others[0];
			if (this.isEmpty || other.isEmpty) {
				return StringSet.empty;
			}
			if (this._caseFolding !== other._caseFolding) {
				throw new Error("Cannot intersect incompatible string sets.");
			}

			const items: ReadonlyWord[] = [...this.words, ...other.words];
			normalize(items);
			return new StringSet(items, this._caseFolding);
		} else {
			const items: ReadonlyWord[] = [...this.words];
			for (const set of others) {
				items.push(...set.words);
			}

			if (items.length === 0) {
				return StringSet.empty;
			}

			let caseFolding: CharCaseFolding | undefined = this.isEmpty ? undefined : this._caseFolding;
			for (const set of others) {
				if (!set.isEmpty) {
					if (caseFolding === undefined) {
						caseFolding = set._caseFolding;
					} else if (caseFolding !== set._caseFolding) {
						throw new Error("Cannot union incompatible string sets.");
					}
				}
			}
			debugAssert(caseFolding !== undefined);

			normalize(items);
			return new StringSet(items, caseFolding);
		}
	}

	intersect(other: StringSet): StringSet {
		if (this.isEmpty || other.isEmpty) {
			return StringSet.empty;
		}
		if (this._caseFolding !== other._caseFolding) {
			throw new Error("Cannot intersect incompatible string sets.");
		}

		const items = intersectSorted(this.words, other.words, compareWords);
		if (items.length === this.words.length) {
			return this;
		} else if (items.length === other.words.length) {
			return other;
		} else if (items.length === 0) {
			return StringSet.empty;
		}
		return new StringSet(items, this._caseFolding);
	}

	without(other: StringSet): StringSet {
		if (this.isEmpty || other.isEmpty) {
			return this;
		}
		if (this._caseFolding !== other._caseFolding) {
			throw new Error("Cannot intersect incompatible string sets.");
		}

		const items = withoutSorted(this.words, other.words, compareWords);
		if (items.length === this.words.length) {
			return this;
		} else if (items.length === 0) {
			return StringSet.empty;
		}
		return new StringSet(items, this._caseFolding);
	}

	filter(predicate: (word: ReadonlyWord) => boolean): StringSet {
		const items = this.words.filter(predicate);
		if (items.length === this.words.length) {
			return this;
		} else if (items.length === 0) {
			return StringSet.empty;
		}
		return new StringSet(items, this._caseFolding);
	}
}

function normalize(items: ReadonlyWord[]): void {
	if (items.length <= 1) {
		return;
	}

	// sort
	items.sort(compareWords);

	// remove duplicates
	filterMut(items, (item, prev) => !prev || compareWords(item, prev) !== 0);
}

function compareWords(a: ReadonlyWord, b: ReadonlyWord): number {
	if (a.length !== b.length) {
		return a.length - b.length;
	}

	for (let i = 0; i < a.length; i++) {
		const diff = a[i] - b[i];
		if (diff !== 0) {
			return diff;
		}
	}
	return 0;
}
function equalWordSets(a: ReadonlyWordSet, b: ReadonlyWordSet): boolean {
	if (a.length !== b.length) {
		return false;
	}

	for (let i = 0; i < a.length; i++) {
		if (!a[i].equals(b[i])) {
			return false;
		}
	}
	return true;
}

function toWordSets(items: readonly ReadonlyWord[], caseFolding: CharCaseFolding): readonly ReadonlyWordSet[] {
	if (items.length === 0) {
		return [];
	}

	return items.map(word => {
		return word.map(char => caseFolding.toCharSet(char));
	});
}

function intersectSorted<T>(s1: readonly T[], s2: readonly T[], compare: (a: T, b: T) => number): T[] {
	const result: T[] = [];
	let i1 = 0;
	let i2 = 0;

	while (i1 < s1.length && i2 < s2.length) {
		const diff = compare(s1[i1], s2[i2]);
		if (diff === 0) {
			result.push(s1[i1]);
			i1++;
			i2++;
		} else if (diff < 0) {
			i1++;
		} else {
			i2++;
		}
	}

	return result;
}

function withoutSorted<T>(s1: readonly T[], s2: readonly T[], compare: (a: T, b: T) => number): T[] {
	const result: T[] = [];
	let i1 = 0;
	let i2 = 0;

	while (i1 < s1.length && i2 < s2.length) {
		const diff = compare(s1[i1], s2[i2]);
		if (diff === 0) {
			i1++;
			i2++;
		} else if (diff < 0) {
			result.push(s1[i1]);
			i1++;
		} else {
			i2++;
		}
	}

	if (i1 < s1.length) {
		result.push(...s1.slice(i1));
	}

	return result;
}
