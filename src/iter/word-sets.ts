import { CharSet } from "../char-set";
import { FAIterator } from "../common-types";
import { ensureDeterministicOut } from "./iterator";
import { removeDead } from "./remove-dead";

/**
 * Iterates all word sets of the given FA.
 *
 * @param iter
 */
export function* iterateWordSets<T>(iter: FAIterator<T, Iterable<[T, CharSet]>>): Iterable<CharSet[]> {
	const { initial, getOut, isFinal } = ensureDeterministicOut(removeDead(iter, i => i[0]));

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
