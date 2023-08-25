import { CharSet } from "../char-set";
import { Char } from "../char-types";
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
	 * In addition to the usual guarantees of `StringSet`, this set is also guaranteed to not contain any single-character words.
	 */
	readonly accept: StringSet;

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
		if (accept.hasSingleCharacter) {
			const singleChars = accept.filter(w => w.length === 1);
			chars = chars.union(...singleChars.wordSets.map(w => w[0]));
			accept = accept.filter(w => w.length !== 1);
		}

		return new UnicodeSet(chars, accept);
	}

	/**
	 * Returns whether this set and the other set contain the same formal language.
	 *
	 * @param other
	 */
	equals(other: UnicodeSet): boolean {
		return this.chars.equals(other.chars) && this.accept.equals(other.accept);
	}

	isCompatibleWith(other: UnicodeSet): boolean {
		return this.chars.maximum === other.chars.maximum && this.accept.isCompatibleWith(other.accept);
	}

	union(...others: UnicodeSet[]): UnicodeSet {
		if (others.length === 0) {
			return this;
		} else if (others.length === 1) {
			const o = others[0];
			return new UnicodeSet(this.chars.union(o.chars), this.accept.union(o.accept));
		} else {
			return new UnicodeSet(
				this.chars.union(...others.map(o => o.chars)),
				this.accept.union(...others.map(o => o.accept))
			);
		}
	}

	intersect(other: UnicodeSet): UnicodeSet {
		return new UnicodeSet(this.chars.intersect(other.chars), this.accept.intersect(other.accept));
	}

	without(other: UnicodeSet): UnicodeSet {
		return new UnicodeSet(this.chars.without(other.chars), this.accept.without(other.accept));
	}
}
