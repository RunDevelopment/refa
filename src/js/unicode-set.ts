import { CharRange, CharSet } from "../char-set";
import { Char } from "../char-types";
import { ReadonlyWordSet } from "../word-set";
import { StringSet } from "./string-set";

const emptyCache = new Map<Char, UnicodeSet>();

/**
 * A mathematical set of characters and strings.
 *
 * Despite the name, the characters in this set are not necessarily Unicode characters.
 * So `chars.maximum` is not necessarily `0x10FFFF`.
 *
 * The set is represented as a union of a {@link CharSet} and a {@link StringSet}.
 */
export class UnicodeSet {
	/**
	 * All single characters in the set.
	 */
	readonly chars: CharSet;
	/**
	 * A sorted set of words.
	 *
	 * In addition to the usual guarantees of `StringSet`, this set is also guaranteed to not contain any
	 * single-character words.
	 */
	readonly accept: StringSet;

	/**
	 * The maximum character in the set.
	 *
	 * This is equivalent to `this.chars.maximum`.
	 */
	get maximum(): Char {
		return this.chars.maximum;
	}

	/**
	 * `true` if the set is empty (=accepts no words).
	 */
	get isEmpty(): boolean {
		return this.chars.isEmpty && this.accept.isEmpty;
	}

	/**
	 * `true` if the set contains the empty word.
	 *
	 * This is equivalent to `this.accept.hasEmptyWord`.
	 */
	get hasEmptyWord(): boolean {
		return this.accept.hasEmptyWord;
	}

	private _cachedWordSets: readonly ReadonlyWordSet[] | undefined;

	/**
	 * All word sets accepted by this set.
	 *
	 * Word sets are guaranteed to be sorted by **descending** length and code points. This means that word sets are in
	 * the order in which the ECMAScript RegExp engine would try matching them.
	 *
	 * Note: This is a lazy getter. Try to avoid calling it for best performance.
	 */
	get wordSets(): readonly ReadonlyWordSet[] {
		return (this._cachedWordSets ??= toWordSets(this));
	}

	private constructor(chars: CharSet, accept: StringSet) {
		this.chars = chars;
		this.accept = accept;
	}

	static empty(maximum: Char): UnicodeSet {
		let emptySet = emptyCache.get(maximum);
		if (emptySet === undefined) {
			emptySet = new UnicodeSet(CharSet.empty(maximum), StringSet.empty);
			emptyCache.set(maximum, emptySet);
		}
		return emptySet;
	}

	static fromChars(chars: CharSet): UnicodeSet {
		return new UnicodeSet(chars, StringSet.empty);
	}
	static from(chars: CharSet, accept: StringSet): UnicodeSet {
		const singleChars = accept.getSingleCharacters();
		if (singleChars) {
			chars = chars.union(singleChars);
			accept = accept.withoutSingleCharacters();
		}

		return new UnicodeSet(chars, accept);
	}

	/**
	 * Returns whether this set and the other set contain the same formal language.
	 *
	 * @param other
	 */
	equals(other: UnicodeSet | CharSet | CharRange): boolean {
		if (other instanceof UnicodeSet) {
			return this.chars.equals(other.chars) && this.accept.equals(other.accept);
		} else {
			return this.accept.isEmpty && this.chars.equals(other);
		}
	}

	isCompatibleWith(other: UnicodeSet): boolean {
		return this.chars.maximum === other.chars.maximum && this.accept.isCompatibleWith(other.accept);
	}

	union(...others: (UnicodeSet | CharSet)[]): UnicodeSet {
		if (others.length === 0) {
			return this;
		} else if (others.length === 1) {
			const o = others[0];
			if (o instanceof UnicodeSet) {
				return new UnicodeSet(this.chars.union(o.chars), this.accept.union(o.accept));
			} else {
				return new UnicodeSet(this.chars.union(o), this.accept);
			}
		} else {
			return new UnicodeSet(
				this.chars.union(...others.map(o => (o instanceof UnicodeSet ? o.chars : o))),
				this.accept.union(...others.map(o => (o instanceof UnicodeSet ? o.accept : StringSet.empty)))
			);
		}
	}

	intersect(other: UnicodeSet | CharSet | CharRange): UnicodeSet {
		if (other instanceof UnicodeSet) {
			return new UnicodeSet(this.chars.intersect(other.chars), this.accept.intersect(other.accept));
		} else {
			return new UnicodeSet(this.chars.intersect(other), StringSet.empty);
		}
	}

	without(other: UnicodeSet | CharSet | CharRange): UnicodeSet {
		if (other instanceof UnicodeSet) {
			return new UnicodeSet(this.chars.without(other.chars), this.accept.without(other.accept));
		} else {
			return new UnicodeSet(this.chars.without(other), this.accept);
		}
	}

	/**
	 * Returns whether `this ⊇ other`.
	 *
	 * @param other
	 */
	isSupersetOf(other: UnicodeSet | CharSet | CharRange): boolean {
		if (other instanceof UnicodeSet) {
			return this.chars.isSupersetOf(other.chars) && this.accept.isSupersetOf(other.accept);
		} else {
			return this.chars.isSupersetOf(other);
		}
	}
	/**
	 * Returns whether `this ⊆ other`.
	 *
	 * @param other
	 */
	isSubsetOf(other: UnicodeSet | CharSet | CharRange): boolean {
		if (other instanceof UnicodeSet) {
			return this.chars.isSubsetOf(other.chars) && this.accept.isSubsetOf(other.accept);
		} else {
			return this.accept.isEmpty && this.chars.isSubsetOf(other);
		}
	}
	/**
	 * Returns whether `this ⊃ other`.
	 *
	 * @param other
	 */
	isProperSupersetOf(other: UnicodeSet | CharSet | CharRange): boolean {
		return this.isSupersetOf(other) && !this.equals(other);
	}
	/**
	 * Returns whether `this ⊂ other`.
	 *
	 * @param other
	 */
	isProperSubsetOf(other: UnicodeSet | CharSet | CharRange): boolean {
		return this.isSubsetOf(other) && !this.equals(other);
	}

	isDisjointWith(other: UnicodeSet | CharSet | CharRange): boolean {
		if (other instanceof UnicodeSet) {
			return this.chars.isDisjointWith(other.chars) && this.accept.isDisjointWith(other.accept);
		} else {
			return this.chars.isDisjointWith(other);
		}
	}
}

function toWordSets(set: UnicodeSet): readonly ReadonlyWordSet[] {
	if (set.accept.isEmpty && !set.chars.isEmpty) {
		return [[set.chars]];
	}
	if (set.isEmpty) {
		return [];
	}

	const wordSets: ReadonlyWordSet[] = Array.from(set.accept.wordSets);
	wordSets.push([set.chars]);
	wordSets.sort((a, b) => {
		if (a.length !== b.length) {
			return b.length - a.length;
		}
		for (let i = 0; i < a.length; i++) {
			const diff = a[i].compare(b[i]);
			if (diff !== 0) {
				return diff;
			}
		}
		return 0;
	});
	return wordSets;
}
