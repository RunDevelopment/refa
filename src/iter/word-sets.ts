import { CharSet } from "../char-set";
import { FAIterator } from "../common-types";
import { debugAssert } from "../util";
import { ensureDeterministicOut } from "./iterator";
import { removeDeadStates } from "./remove-dead-states";

/**
 * Iterates all word sets of the given FA.
 *
 * Word sets are guaranteed to be iterated ordered by ascending length. Word sets might overlap.
 *
 * This function assumes that all character sets in the given iterator are non-empty.
 *
 * @param iter
 */
export function* iterateWordSets<S>(iter: FAIterator<S, Iterable<[S, CharSet]>>): Iterable<CharSet[]> {
	const { initial, getOut, isFinal } = ensureDeterministicOut(removeDeadStates(iter, i => i[0]));

	interface BFSNode {
		state: S;
		parent: BFSNode | null;
		value: CharSet | null;
	}

	const root: BFSNode = {
		state: initial,
		parent: null,
		value: null,
	};

	let currentWave: BFSNode[] = [root];
	let nextWave: BFSNode[] = [];

	function hasNextNode(): boolean {
		if (currentWave.length === 0) {
			currentWave = nextWave;
			nextWave = [];
		}
		return currentWave.length !== 0;
	}

	function getPath(node: BFSNode): CharSet[] {
		const path: CharSet[] = [];
		while (node.value) {
			path.push(node.value);
			node = node.parent!;
		}
		return path.reverse();
	}

	function createNextWaveOf(node: BFSNode): void {
		for (const [to, chars] of getOut(node.state)) {
			nextWave.push({
				state: to,
				parent: node,
				value: chars,
			});
		}
	}

	while (hasNextNode()) {
		const current: BFSNode = currentWave.pop()!;

		if (isFinal(current.state)) {
			yield getPath(current);
		}

		createNextWaveOf(current);
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
 */
export function shortestWordSet<S>(iter: FAIterator<S, Iterable<[S, CharSet]>>): CharSet[] | undefined {
	const { initial, getOut, isFinal } = iter;

	if (isFinal(initial)) {
		// trivial
		return [];
	}

	// The idea here is to do a BFS and write down from which state we could first reach any previously unseen state.
	// Once we see a final state, we just have to trace back the path to the initial state.
	//
	// The nice thing here is that we do not have to cache the `getOut` method. BFS guarantees that we call it at most
	// once for every state.

	const shortestPathTo = new Map<S, { via: CharSet; from: S } | null>();
	shortestPathTo.set(iter.initial, null); // null to mark the initial state

	function getShortestPath(to: S): CharSet[] {
		const revPath: CharSet[] = [];

		while (true) {
			const from = shortestPathTo.get(to);

			// this _should_ never happen
			debugAssert(from !== undefined);

			if (from === null) {
				// reached initial state
				return revPath.reverse();
			}

			revPath.push(from.via);

			to = from.from;
		}
	}

	let current: readonly S[] = [iter.initial];
	while (current.length > 0) {
		const next: S[] = [];

		for (const state of current) {
			for (const [to, via] of getOut(state)) {
				if (shortestPathTo.has(to)) {
					continue;
				}

				shortestPathTo.set(to, { via, from: state });

				if (isFinal(to)) {
					// we found the shortest accepting path
					return getShortestPath(to);
				}

				next.push(to);
			}
		}

		current = next;
	}

	return undefined;
}
