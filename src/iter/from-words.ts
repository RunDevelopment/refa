import { CharSet } from "../char-set";
import { Char, ReadonlyWord } from "../char-types";
import { FABuilder, FAIterator } from "../fa-types";
import { cachedFunc, traverse } from "../util";
import { ReadonlyWordSet } from "../word-set";

/**
 * This eagerly creates an FA that accepts exactly all the given words.
 *
 * The construction is already finished when this method returns, so the returned FA iterator does not have to be used.
 *
 * The construction will create a DFA by default. However, the FA builder implementation has to be carefully chosen to
 * preserve the determinism. In order for the determinism to be preserved, `builder` and `getOutState` have to fulfill
 * the following conditions:
 *
 * - Let `x`, `y` be any 2 states of `builder` and `c` be any valid character `<= maxCharacter`. Iff this function
 *   called `builder.linkNodes(x, y, c)`, then `getOutState(builder, x, c) == y`.
 * - `builder` has to be an empty FA when given to this method.
 * - `builder.makeFinal(x)` must have no effect on `getOutState`.
 *
 * @param builder
 * @param getOutState
 * @param words
 * @param maxCharacter
 * @returns
 */
export function fromWords<S>(
	builder: FABuilder<S, CharSet>,
	getOutState: (state: S, char: Char) => S | undefined,
	words: Iterable<ReadonlyWord>,
	maxCharacter: Char
): FAIterator<S, S> {
	const getCharSet = cachedFunc<Char, CharSet>(c => CharSet.fromCharacters(maxCharacter, [c]));

	// build a prefix trie
	for (const word of words) {
		let node = builder.initial;
		for (const char of word) {
			if (char > maxCharacter) {
				throw new Error(`The character (${char}) has to be <= maxCharacter (${maxCharacter}).`);
			}

			let next = getOutState(node, char);
			if (next === undefined) {
				next = builder.createNode();
				builder.linkNodes(node, next, getCharSet(char));
			}
			node = next;
		}
		builder.makeFinal(node);
	}

	return {
		initial: builder.initial,
		stableOut: true,
		getOut: s => s,
		isFinal: s => builder.isFinal(s),
	};
}

/**
 * This eagerly creates an FA that accepts exactly all the given word sets.
 *
 * The construction is already finished when this method returns, so the returned FA iterator does not have to be used.
 *
 * The construction will create a DFA by default.
 *
 * @param builder
 * @param wordSets
 * @param maxCharacter
 * @returns
 */
export function fromWordSets<S>(
	builder: FABuilder<S, CharSet>,
	wordSets: Iterable<ReadonlyWordSet>,
	maxCharacter: Char
): FAIterator<S, S> {
	// create trie
	const root = new TrieNode(builder.initial);

	for (const wordSet of wordSets) {
		let current = new Set([root]);

		for (const set of wordSet) {
			if (set.maximum !== maxCharacter) {
				throw new Error(
					`The maximum (${set.maximum}) of the char set has to be == maxCharacter (${maxCharacter}).`
				);
			}

			const next = new Set<TrieNode<S>>();
			for (const node of current) {
				for (const n of node.getNext(set, builder)) {
					next.add(n);
				}
			}
			current = next;
		}

		for (const node of current) {
			node.isFinal = true;
		}
	}

	// translate trie
	traverse(root, n => {
		if (n.isFinal) {
			builder.makeFinal(n.builderNode);
		}

		for (const { to, via } of n.out) {
			builder.linkNodes(n.builderNode, to.builderNode, via);
		}

		return n.out.map(item => item.to);
	});

	return {
		initial: builder.initial,
		stableOut: true,
		getOut: s => s,
		isFinal: s => builder.isFinal(s),
	};
}

class OutItem<S> {
	to: TrieNode<S>;
	via: CharSet;

	constructor(to: TrieNode<S>, via: CharSet) {
		this.to = to;
		this.via = via;
	}
}

class TrieNode<S> {
	readonly builderNode: S;
	readonly out: OutItem<S>[] = [];
	isFinal: boolean = false;

	constructor(builderNode: S) {
		this.builderNode = builderNode;
	}

	copy(builder: FABuilder<S, never>): TrieNode<S> {
		const copy = new TrieNode(builder.createNode());
		copy.isFinal = this.isFinal;

		for (const { to, via } of this.out) {
			copy.out.push(new OutItem(to.copy(builder), via));
		}

		return copy;
	}

	getNext(charSet: CharSet, build: FABuilder<S, never>): Iterable<TrieNode<S>> {
		const next: TrieNode<S>[] = [];
		const taken: CharSet[] = [];

		for (let i = 0, l = this.out.length; i < l; i++) {
			const item = this.out[i];
			if (item.via.isDisjointWith(charSet)) {
				// this item has nothing to do with us
			} else if (item.via.isSubsetOf(charSet)) {
				// this is a path we want to take
				taken.push(item.via);
				next.push(item.to);
			} else {
				// the item contains parts of what we want, so we will split it
				const newItem = new OutItem<S>(item.to.copy(build), item.via.intersect(charSet));
				this.out.push(newItem);
				item.via = item.via.without(charSet);

				taken.push(newItem.via);
				next.push(newItem.to);
			}
		}

		const rest = taken.length === 0 ? charSet : charSet.without(CharSet.empty(charSet.maximum).union(...taken));
		if (!rest.isEmpty) {
			const newItem = new OutItem<S>(new TrieNode<S>(build.createNode()), rest);
			this.out.push(newItem);
			next.push(newItem.to);
		}

		return next;
	}
}
