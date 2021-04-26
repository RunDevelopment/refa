import { CharSet } from "../char-set";
import { FAIterator } from "../common-types";
import { cachedFunc } from "../util";

/**
 * Iterates all word sets of the given FA.
 *
 * The `getOut` function of the given iterator is guaranteed to be called once and once only for every state.
 *
 * @param iter
 */
export function* iterateWordSets<T>(iter: FAIterator<T, Iterable<[T, CharSet]>>): Iterable<CharSet[]> {
	const { initial, getOut, isFinal } = iter;

	interface BFSNode {
		state: T;
		parent: BFSNode | null;
		value: CharSet | null;
	}

	const root: BFSNode = {
		state: initial,
		parent: null,
		value: null,
	};

	/**
	 * One major problem here are trap states (states which cannot reach a final state).
	 *
	 * To solve this, we will lazily and iteratively figure out for every state whether that state can reach a final
	 * state. If we, at some point, do not discover new states, we have explored the full FA at which point we can
	 * know for each state whether that state can reach a final state.
	 */

	const cachedGetOut = cachedFunc((state: T) => [...getOut(state)]);

	const canReachFinalStateCache = new Map<T, boolean>();
	function canReachFinalState(state: T): boolean | null {
		const cachedValue = canReachFinalStateCache.get(state);
		if (cachedValue !== undefined) {
			return cachedValue;
		}

		const visited = new Set<T>();
		function canReachImpl(state: T): boolean | null {
			if (visited.has(state)) {
				return false; // forming a cycle can't reach a final state
			}
			visited.add(state);

			const cachedValue = canReachFinalStateCache.get(state);
			if (cachedValue !== undefined) {
				return cachedValue;
			}

			const out = cachedGetOut.cache.get(state);
			if (out === undefined) {
				return null; // inconclusive
			}

			let canReach: boolean | null = false;
			for (const [outState] of out) {
				if (isFinal(outState)) {
					canReach = true;
					break;
				}
				const outStateCanReachFinal = canReachImpl(outState);
				if (outStateCanReachFinal === true) {
					canReach = true;
					break;
				}
				if (outStateCanReachFinal === null) {
					canReach = null;
				}
			}

			if (canReach !== null) {
				canReachFinalStateCache.set(state, canReach);
			}

			return canReach;
		}

		return canReachImpl(state);
	}

	// these two arrays are my substitute of a linked list
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
		if (canReachFinalState(node.state) === false) {
			return;
		}

		for (const [to, chars] of cachedGetOut(node.state)) {
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
