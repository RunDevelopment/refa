import { CharMap, ReadonlyCharMap } from "../char-map";
import { CharSet } from "../char-set";
import { Char, ReadonlyWord } from "../char-types";
import { DFA, ReadonlyDFA } from "../dfa";
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
	// eslint-disable-next-line @typescript-eslint/naming-convention
	private readonly words: readonly ReadonlyWord[];

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
	 *
	 * This is equivalent to `this.getSingleCharacter() !== undefined`.
	 */
	get hasSingleCharacter(): boolean {
		const startIndex = this.hasEmptyWord ? 1 : 0;
		return this.words.length > startIndex && this.words[startIndex].length === 1;
	}

	private _cachedWordSets: readonly ReadonlyWordSet[] | undefined;

	/**
	 * The words of this set with {@link CharCaseFolding#toCharSet} applied to each character.
	 *
	 * Word sets are guaranteed to be sorted by ascending length.
	 *
	 * Note: This is a lazy getter. Try to avoid calling it for best performance.
	 */
	get wordSets(): readonly ReadonlyWordSet[] {
		return (this._cachedWordSets ??= toWordSets(this.words, this._caseFolding));
	}

	private _cachedTrie: Trie | undefined;

	private get trie(): Trie {
		return (this._cachedTrie ??= Trie.fromWords(this.words, this._caseFolding, () => this.wordSets));
	}

	private constructor(items: readonly ReadonlyWord[], caseFolding: CharCaseFolding) {
		this.words = items;
		this._caseFolding = caseFolding;
	}

	static readonly empty = new StringSet([], noopCaseFolding);

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
	static fromWord(word: ReadonlyWord, caseFolding: CharCaseFolding): StringSet {
		if (caseFolding.canonicalize) {
			word = word.map(caseFolding.canonicalize);
		}
		return new StringSet([word], caseFolding);
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

		if (this.isEmpty || other.isEmpty) {
			return this.isEmpty === other.isEmpty;
		}

		if (this._caseFolding !== other._caseFolding) {
			return this.trie.equals(other.trie);
		}

		if (this.words.length !== other.words.length) {
			return false;
		}

		// we use the same case folding, so we don't need to use word sets
		const a = this.words;
		const b = other.words;
		for (let i = 0; i < a.length; i++) {
			if (compareWords(a[i], b[i]) !== 0) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Returns the union of all given sets.
	 *
	 * Note: This operation is only allowed if all sets are compatible.
	 *
	 * @param others
	 */
	union(...others: StringSet[]): StringSet {
		if (others.length === 0) {
			return this;
		} else if (others.length === 1) {
			const other = others[0];
			if (this.isEmpty) {
				return other;
			}
			if (other.isEmpty) {
				return this;
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

	/**
	 * Returns the intersection of this set and the given set.
	 *
	 * Note: This operation is only allowed if all sets are compatible.
	 *
	 * @param other
	 */
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

	/**
	 * Returns this set without the strings of the given set.
	 *
	 * Note: This operation is only allowed if all sets are compatible.
	 *
	 * @param other
	 */
	without(other: StringSet): StringSet {
		if (this.isEmpty || other.isEmpty) {
			return this;
		}
		if (this._caseFolding !== other._caseFolding) {
			throw new Error("Cannot subtract incompatible string sets.");
		}

		const items = withoutSorted(this.words, other.words, compareWords);
		if (items.length === this.words.length) {
			return this;
		} else if (items.length === 0) {
			return StringSet.empty;
		}
		return new StringSet(items, this._caseFolding);
	}

	/**
	 * Returns whether `this ⊇ other`.
	 *
	 * @param other
	 */
	isSupersetOf(other: StringSet): boolean {
		if (other.isEmpty) {
			return true;
		}
		if (this.isEmpty) {
			return false;
		}
		if (this._caseFolding !== other._caseFolding) {
			return this.trie.isSuperSetOf(other.trie);
		}
		return isSuperSetSorted(this.words, other.words, compareWords);
	}
	/**
	 * Returns whether `this ⊆ other`.
	 *
	 * @param other
	 */
	isSubsetOf(other: StringSet): boolean {
		return other.isSupersetOf(this);
	}
	/**
	 * Returns whether `this ⊃ other`.
	 *
	 * @param other
	 */
	isProperSupersetOf(other: StringSet): boolean {
		return this.isSupersetOf(other) && !this.equals(other);
	}
	/**
	 * Returns whether `this ⊂ other`.
	 *
	 * @param other
	 */
	isProperSubsetOf(other: StringSet): boolean {
		return this.isSubsetOf(other) && !this.equals(other);
	}

	isDisjointWith(other: StringSet): boolean {
		if (this.isEmpty || other.isEmpty) {
			return true;
		}
		if (this._caseFolding !== other._caseFolding) {
			return this.trie.isDisjointWith(other.trie);
		}
		return isDisjointWithSorted(this.words, other.words, compareWords);
	}

	/**
	 * Returns a set of all single-character words in this set or `undefined` if this set contains no single-character
	 * words.
	 */
	getSingleCharacters(): CharSet | undefined {
		const chars: Char[] = [];
		for (const word of this.words) {
			if (word.length === 1) {
				chars.push(word[0]);
			} else if (word.length > 1) {
				break;
			}
		}

		if (chars.length === 0) {
			return undefined;
		}

		return chars.map(char => this._caseFolding.toCharSet(char)).reduce((a, b) => a.union(b));
	}

	/**
	 * Removes all single-character words from this set.
	 */
	withoutSingleCharacters(): StringSet {
		if (!this.hasSingleCharacter) {
			return this;
		}

		const items = this.words.filter(w => w.length !== 1);
		if (items.length === 0) {
			return StringSet.empty;
		}
		return new StringSet(items, this._caseFolding);
	}
	/**
	 * Removes the empty word from this set.
	 */
	withoutEmptyWord(): StringSet {
		if (!this.hasEmptyWord) {
			return this;
		}

		const items = this.words.slice(1);
		if (items.length === 0) {
			return StringSet.empty;
		}
		return new StringSet(items, this._caseFolding);
	}

	/**
	 * Returns the minimum and maximum length of words in this set.
	 *
	 * If this set is empty, `undefined` will be returned returned.
	 */
	getLengthRange(): { min: number; max: number } | undefined {
		if (this.isEmpty) {
			return undefined;
		}

		const min = this.words[0].length;
		const max = this.words[this.words.length - 1].length;
		return { min, max };
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

function isDisjointWithSorted<T>(s1: readonly T[], s2: readonly T[], compare: (a: T, b: T) => number): boolean {
	let i1 = 0;
	let i2 = 0;

	while (i1 < s1.length && i2 < s2.length) {
		const diff = compare(s1[i1], s2[i2]);
		if (diff === 0) {
			return false;
		} else if (diff < 0) {
			i1++;
		} else {
			i2++;
		}
	}

	return true;
}

function isSuperSetSorted<T>(s1: readonly T[], s2: readonly T[], compare: (a: T, b: T) => number): boolean {
	let i1 = 0;
	let i2 = 0;

	while (i1 < s1.length && i2 < s2.length) {
		const diff = compare(s1[i1], s2[i2]);
		if (diff === 0) {
			i1++;
			i2++;
		} else if (diff < 0) {
			i1++;
		} else {
			return false;
		}
	}

	return i2 === s2.length;
}

class HashState {
	hash: number = 0;

	add(value: number): void {
		this.hash = (this.hash * 31 + value) | 0;
	}
}

class Trie {
	readonly accept: boolean;
	/**
	 * A mapping to the next node.
	 *
	 * The key char sets are guaranteed to be sorted and disjoint.
	 *
	 * The mapping is also guaranteed to be minimal. This means that for 2 mapping `c1 => n1` and `c2 => n2`, `n1.equals(n2)` means that `c1.equals(c2)`.
	 */
	readonly next: ReadonlyCharMap<Trie>;
	readonly hash: number;

	constructor(accept: boolean, next: ReadonlyCharMap<Trie>) {
		this.accept = accept;
		this.next = next;

		const hashState = new HashState();
		hashState.add(accept ? 1 : 0);
		for (const [range, n] of next) {
			hashState.add(range.min);
			hashState.add(range.max);
			hashState.add(n.hash);
		}

		this.hash = hashState.hash;
	}

	static readonly empty = new Trie(false, new CharMap());
	static readonly emptyString = new Trie(true, new CharMap());

	static fromWords(
		words: readonly ReadonlyWord[],
		caseFolding: CharCaseFolding,
		getWordSets: () => readonly ReadonlyWordSet[]
	): Trie {
		if (words.length === 0) {
			return Trie.empty;
		}

		let dfa;
		if (!caseFolding.canonicalize) {
			// Since we don't have a canonicalization function, we know that toCharSet is just `CharSet.fromCharacter`.
			// So we can construct the DFA from words directly.

			const maxCharacter = getMaxCharacter(words, char => caseFolding.toCharSet(char).maximum);
			if (maxCharacter === undefined) {
				// since already handled the empty set case, this must be the empty string
				return Trie.emptyString;
			}

			dfa = DFA.fromWords(words, { maxCharacter });
		} else {
			const wordSets = getWordSets();

			const maxCharacter = getMaxCharacter(wordSets, set => set.maximum);
			if (maxCharacter === undefined) {
				// since already handled the empty set case, this must be the empty string
				return Trie.emptyString;
			}

			dfa = DFA.fromWordSets(wordSets, { maxCharacter });
		}

		dfa.minimize();
		return Trie._fromDFA(dfa);
	}

	private static _fromDFA(dfa: ReadonlyDFA): Trie {
		const cache = new Map<DFA.ReadonlyNode, Trie>();
		const stack: DFA.ReadonlyNode[] = [];

		const toTrie = (node: DFA.ReadonlyNode): Trie => {
			{
				// extra scope, so nobody can use this variable
				const cached = cache.get(node);
				if (cached) {
					return cached;
				}
			}

			if (stack.includes(node)) {
				throw new Error("DFA contains cycles.");
			}
			stack.push(node);

			let trie: Trie;
			if (node.out.isEmpty && dfa.finals.has(node)) {
				trie = Trie.emptyString;
			} else {
				const next = node.out.copy(toTrie);
				trie = new Trie(dfa.finals.has(node), next);
			}

			stack.pop();
			cache.set(node, trie);
			return trie;
		};

		return toTrie(dfa.initial);
	}

	equals(other: Trie): boolean {
		if (this === other) {
			return true;
		}
		if (
			this.hash !== other.hash ||
			this.accept !== other.accept ||
			this.next.entryCount !== other.next.entryCount ||
			this.next.size !== other.next.size
		) {
			return false;
		}

		const aEntries = [...this.next.entries()];
		const bEntries = [...other.next.entries()];
		for (let i = 0; i < aEntries.length; i++) {
			const a = aEntries[i];
			const b = bEntries[i];
			if (a[0].min !== b[0].min || a[0].max !== b[0].max || !a[1].equals(b[1])) {
				return false;
			}
		}
		return true;
	}

	isSuperSetOf(other: Trie): boolean {
		if (this === other) {
			return true;
		}
		if (other.accept && !this.accept) {
			return false;
		}

		if (other.next.size > this.next.size) {
			return false;
		}

		for (const [range, subSet] of other.next.entries()) {
			for (let c = range.min; c <= range.max; c++) {
				const superSet = this.next.get(c);
				if (!superSet || !superSet.isSuperSetOf(subSet)) {
					return false;
				}
			}
		}
		return true;
	}

	isDisjointWith(other: Trie): boolean {
		if (this === other || (this.accept && other.accept)) {
			return false;
		}
		if (this.next.isEmpty || other.next.isEmpty) {
			return true;
		}

		for (const [range, a] of other.next.entries()) {
			for (let c = range.min; c <= range.max; c++) {
				const b = this.next.get(c);
				if (b && !a.isDisjointWith(b)) {
					return false;
				}
			}
		}
		return true;
	}
}

function getMaxCharacter<T>(iter: Iterable<readonly T[]>, getMaximum: (item: T) => Char): Char | undefined {
	for (const a of iter) {
		for (const b of a) {
			return getMaximum(b);
		}
	}
	return undefined;
}
