import { CharSet } from "../char-set";
import { Char } from "../char-types";
import { StringSet } from "./string-set";

const emptyCache = new Map<Char, ExtendedCharSet>();

export class ExtendedCharSet {
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

	private constructor(chars: CharSet, accept: StringSet) {
		this.chars = chars;
		this.accept = accept;
	}

	static empty(maximum: Char): ExtendedCharSet {
		let emptySet = emptyCache.get(maximum);
		if (emptySet === undefined) {
			emptySet = new ExtendedCharSet(CharSet.empty(maximum), StringSet.empty);
			emptyCache.set(maximum, emptySet);
		}
		return emptySet;
	}

	static fromChars(chars: CharSet): ExtendedCharSet {
		return new ExtendedCharSet(chars, StringSet.empty);
	}
	static from(chars: CharSet, accept: StringSet): ExtendedCharSet {
		if (accept.hasSingleCharacterWord) {
			throw new Error("The given accept set contains single-character words.");
		}
		return new ExtendedCharSet(chars, accept);
	}

	equals(other: ExtendedCharSet): boolean {
		return this.chars.equals(other.chars) && this.accept.equals(other.accept);
	}
	compare(other: ExtendedCharSet): number {
		return this.chars.compare(other.chars) || this.accept.compare(other.accept);
	}

	union(...others: ExtendedCharSet[]): ExtendedCharSet {
		if (others.length === 0) {
			return this;
		} else if (others.length === 1) {
			const o = others[0];
			return new ExtendedCharSet(this.chars.union(o.chars), this.accept.union(o.accept));
		} else {
			return new ExtendedCharSet(
				this.chars.union(...others.map(o => o.chars)),
				this.accept.union(...others.map(o => o.accept))
			);
		}
	}

	intersect(other: ExtendedCharSet): ExtendedCharSet {
		return new ExtendedCharSet(this.chars.intersect(other.chars), this.accept.intersect(other.accept));
	}

	without(other: ExtendedCharSet): ExtendedCharSet {
		return new ExtendedCharSet(this.chars.without(other.chars), this.accept.without(other.accept));
	}
}
