import { CharSet } from "../char-set";
import { WordSet } from "../word-set";
import { FAIterator } from "../fa-types";
import { ensureStableOut, shortestAcceptingPath } from "./iterator";
import { removeDeadStates } from "./remove-dead-states";

type BFSNode<S> = BFSRootNode<S> | BFSChildNode<S>;
interface BFSRootNode<S> {
	state: S;
	parent: null;
	value: null;
}
interface BFSChildNode<S> {
	state: S;
	parent: BFSNode<S>;
	value: CharSet;
}

function getPath<S>(node: BFSNode<S>): WordSet {
	const path: WordSet = [];
	while (node.value) {
		path.push(node.value);
		node = node.parent;
	}
	return path.reverse();
}

/**
 * Iterates all word sets of the given FA.
 *
 * Word sets are guaranteed to be iterated ordered by ascending length. Word sets might overlap.
 *
 * This function assumes that all character sets in the given iterator are non-empty.
 *
 * @param iter
 */
export function* iterateWordSets<S>(iter: FAIterator<S, Iterable<[S, CharSet]>>): Iterable<WordSet> {
	const { initial, getOut, isFinal } = ensureStableOut(removeDeadStates(iter, i => i[0]));

	const root: BFSRootNode<S> = {
		state: initial,
		parent: null,
		value: null,
	};

	let currentWave: BFSNode<S>[] = [root];

	while (currentWave.length > 0) {
		const nextWave: BFSChildNode<S>[] = [];

		for (const current of currentWave) {
			if (isFinal(current.state)) {
				yield getPath(current);
			}

			for (const [to, chars] of getOut(current.state)) {
				nextWave.push({
					state: to,
					parent: current,
					value: chars,
				});
			}
		}

		currentWave = nextWave;
	}
}

/**
 * Returns any one of the shortest word sets accepted by the given iterator.
 *
 * If the iterator does not accept any words, `undefined` will be returned.
 *
 * This function assumes that all character sets in the given iterator are non-empty.
 *
 * ---
 *
 * This operation is roughly equivalent to `firstOf(iterateWordSets(iter))` but implemented **much more** efficiently.
 *
 * @param iter
 */
export function shortestWordSet<S>(iter: FAIterator<S, Iterable<[S, CharSet]>>): WordSet | undefined {
	const result = shortestAcceptingPath(iter, item => item[0]);

	if (result === undefined) {
		return undefined;
	} else {
		return result.map(item => item[1]);
	}
}

/**
 * Returns a set of inputs rejected by the given iterator using the given input character set.
 *
 * If the iterator accepts all words, `undefined` is guaranteed to be returned.
 *
 * This algorithm implements an approximation to determine rejecting inputs in order to guarantee non-exponential
 * worst-case execution time. Consequently, the algorithm can't find rejecting inputs for some iterators and returns
 * `undefined` instead.
 *
 * @param iter
 * @param inputCharacters The set of input characters.
 *
 * All character sets in the returned word set will be subsets of the set of input characters.
 *
 * If all characters are allowed, use `CharSet.all(maxCharacter)`.
 */
export function approximateRejectingWordSet<S>(
	iter: FAIterator<S, Iterable<[S, CharSet]>>,
	inputCharacters: CharSet
): WordSet | undefined {
	if (inputCharacters.isEmpty) {
		return undefined;
	}

	const { initial, getOut, isFinal } = ensureStableOut(removeDeadStates(iter, i => i[0]));

	// The idea here is to use Thompson's algorithm as described by Russ Cox
	// (https://swtch.com/~rsc/regexp/regexp1.html) with a slight twist.
	//
	// In Thompson's algorithm, we have a set of states and determine the next set of states based on the current
	// character. Thompson's algorithm will reject an input string if (1) the next set of states is empty or (2) if the
	// string ended and the current set of states does not contain a final state.
	//
	// These two properties are enough to make Thompson's algorithm but they aren't enough for us. For the regex
	// `/[^]*/`, we simply cannot find a rejecting string because there is none. Condition (1) and (2) will never apply.
	// Instead of using a max-iterations approach, we will do something smarter. If conditions (1) and (2) do not apply
	// to the current set of states, we will memorize this set of states. If we ever find any memorized set of states
	// again, we know that there are no rejecting words.
	//
	// Note: The above memorization approach assumes that all states can eventually reach a final state.

	const wordSet: WordSet = [];

	let current: readonly S[] = [initial];

	const idCache = new Map<S, number>();
	function getMemoryKey(states: readonly S[]): string {
		return states
			.map(s => {
				let id = idCache.get(s);
				if (id === undefined) {
					id = idCache.size;
					idCache.set(s, id);
				}
				return id;
			})
			.sort((a, b) => a - b)
			.join(" ");
	}
	const memory = new Set<string>();

	for (let i = 0; i <= idCache.size; i++) {
		if (!current.some(s => isFinal(s))) {
			// condition (1)
			return wordSet;
		}

		const nextSet = new Set<S>();
		const transitions: CharSet[] = [];

		for (const state of current) {
			for (const [to, via] of getOut(state)) {
				nextSet.add(to);
				transitions.push(via);
			}
		}

		const rejecting = getRejectingCharSet(transitions, inputCharacters);
		if (rejecting === undefined) {
			wordSet.push(inputCharacters);
		} else {
			wordSet.push(rejecting);
			// condition (2)
			return wordSet;
		}

		const next = [...nextSet];

		// check if the next set of states has been memorized already and if not, memorize it.
		const memoryKey = getMemoryKey(next);
		if (memory.has(memoryKey)) {
			// found loop
			return undefined;
		}
		memory.add(memoryKey);

		current = next;
	}

	return undefined;
}
function getRejectingCharSet(acceptingSets: readonly CharSet[], inputCharacters: CharSet): CharSet | undefined {
	if (acceptingSets.length === 0) {
		return inputCharacters;
	} else {
		const accepting = getTotal(acceptingSets);
		if (accepting.isAll) {
			return undefined;
		} else {
			return inputCharacters.without(accepting);
		}
	}
}
function getTotal(sets: readonly CharSet[]): CharSet {
	if (sets.length === 1) {
		return sets[0];
	} else {
		return sets[0].union(...sets.slice(1));
	}
}
