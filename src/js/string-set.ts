import { ReadonlyWord } from "../char-types";
import { filterMut } from "../util";

/**
 * A sorted set of words.
 *
 * Words are guaranteed to be sorted by ascending length followed by ascending character value.
 */
export class StringSet {
	/**
	 * A sorted list of words.
	 *
	 * Words are guaranteed to be sorted by ascending length.
	 */
	private readonly _items: readonly ReadonlyWord[];

	/**
	 * Returns the number of words in this set.
	 */
	get size(): number {
		return this._items.length;
	}
	/**
	 * Returns true if this set is empty.
	 *
	 * This is equivalent to `size === 0`.
	 */
	get isEmpty(): boolean {
		return this._items.length === 0;
	}

	/**
	 * Returns true if this set contains the empty word.
	 */
	get hasEmptyWord(): boolean {
		return this._items.length > 0 && this._items[0].length === 0;
	}
	/**
	 * Returns true if this set contains at least one single-character word.
	 */
	get hasSingleCharacterWord(): boolean {
		const startIndex = this.hasEmptyWord ? 1 : 0;
		return this._items.length > startIndex && this._items[startIndex].length === 1;
	}

	private constructor(items: readonly ReadonlyWord[]) {
		this._items = items;
	}

	static empty = new StringSet([]);

	static from(words: Iterable<ReadonlyWord>): StringSet {
		if (words instanceof StringSet) {
			return words;
		}

		const items = [...words];
		if (items.length === 0) {
			return StringSet.empty;
		}
		normalize(items);
		return new StringSet(items);
	}

	equals(other: StringSet): boolean {
		if (this === other) {
			return true;
		}

		const a = this._items;
		const b = other._items;

		if (a.length !== a.length) {
			return false;
		}
		for (let i = 0; i < a.length; i++) {
			if (compare(a[i], b[i]) !== 0) {
				return false;
			}
		}
		return true;
	}
	compare(other: StringSet): number {
		if (other === this) {
			return 0;
		}

		const a = this._items;
		const b = other._items;

		if (a.length !== a.length) {
			return a.length - b.length;
		}
		for (let i = 0; i < a.length; i++) {
			const diff = compare(a[i], b[i]);
			if (diff !== 0) {
				return diff;
			}
		}
		return 0;
	}

	has(word: ReadonlyWord): boolean {
		return this._items.some(item => compare(item, word) === 0);
	}

	union(...others: StringSet[]): StringSet {
		if (others.length === 0) {
			return this;
		}

		const items = [...this._items];
		const len = items.length;
		for (const words of others) {
			items.push(...words._items);
		}
		if (items.length === len) {
			// nothing changed
			return this;
		}
		normalize(items);
		return new StringSet(items);
	}

	intersect(other: StringSet): StringSet {
		if (this.isEmpty || other.isEmpty) {
			return StringSet.empty;
		}

		const items = this._items.filter(item => other.has(item));
		if (items.length === this._items.length) {
			return this;
		} else if (items.length === other._items.length) {
			return other;
		} else if (items.length === 0) {
			return StringSet.empty;
		}
		return new StringSet(items);
	}

	without(other: StringSet): StringSet {
		if (this.isEmpty || other.isEmpty) {
			return this;
		}

		const items = this._items.filter(item => !other.has(item));
		if (items.length === this._items.length) {
			return this;
		} else if (items.length === 0) {
			return StringSet.empty;
		}
		return new StringSet(items);
	}

	filter(predicate: (word: ReadonlyWord) => boolean): StringSet {
		const items = this._items.filter(predicate);
		if (items.length === this._items.length) {
			return this;
		} else if (items.length === 0) {
			return StringSet.empty;
		}
		return new StringSet(items);
	}
	map(mapFn: (word: ReadonlyWord) => ReadonlyWord): StringSet {
		return StringSet.from(this._items.map(mapFn));
	}

	values(): Iterable<ReadonlyWord> {
		return this._items;
	}
}

function normalize(items: ReadonlyWord[]): void {
	if (items.length <= 1) {
		return;
	}

	// sort
	items.sort(compare);

	// remove duplicates
	filterMut(items, (item, prev) => !prev || compare(item, prev) !== 0);
}

function compare(a: ReadonlyWord, b: ReadonlyWord): number {
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
