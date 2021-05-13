import { CharSet } from "../char-set";
import { FAIterator } from "../common-types";
import { ensureDeterministicOut, shortestAcceptingPath } from "./iterator";
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
	const result = shortestAcceptingPath(iter, item => item[0]);

	if (result === undefined) {
		return undefined;
	} else {
		return result.map(item => item[1]);
	}
}
