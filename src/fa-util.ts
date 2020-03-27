import { CharSet } from "./char-set";
import { BFS, cachedFunc } from "./util";
import { wordSetToWords } from "./words";


/**
 * Returns a human readable string representation of the given FA. The FA has to have exactly one initial state.
 *
 * Example output: for `a*d|bb*`
 * ```
 * (0) -> (1) : 'a'
 *     -> [2] : 'd'
 *     -> [3] : 'b'
 *
 * (1) -> [2] : ['d']
 *
 * [2] -> none
 *
 * [3] -> [3] : 'b'
 * ```
 *
 * @param states All states of the FA. The first state in the array has to be the initial state.
 * @param initialState The initial state of the FA. This will be starting point of a BFS to get the list of all states.
 * @param getOutTransitions Returns the outgoing transitions of a state and the labels of these transitions.
 * @param final Determines whether a given state is final.
 */
export function faToString<T>(initialState: T, getOutTransitions: (state: T) => Iterable<[T, string]>,
	final: (state: T) => boolean): string {

	const states: T[] = [];
	const cachedGetOut = cachedFunc<T, [T, string][]>(state => {
		return [...getOutTransitions(state)].sort(([, a], [, b]) => a.localeCompare(b));
	});

	// BFS to get all states
	BFS(initialState, state => {
		states.push(state);
		return cachedGetOut(state).map(([s]) => s);
	});

	getOutTransitions = cachedGetOut;

	if (states.length === 0) {
		return "Empty."
	}

	const index = new Map<T, number>(states.map((s, i) => [s, i]));

	const labelOf = (state: T): string => {
		if (final(state)) {
			return `[${index.get(state)}]`;
		} else {
			return `(${index.get(state)})`;
		}
	};

	return states.map(state => {
		const label = labelOf(state);
		const out = [...getOutTransitions(state)].sort((a, b) => index.get(a[0])! - index.get(b[0])!);

		if (out.length === 0) {
			return `${label} -> none`;
		} else {
			const spaces = " ".repeat(label.length);
			return out.map(([s, t], i) => {
				return `${i ? spaces : label} -> ${labelOf(s)} : ${t}`;
			}).join("\n");
		}
	}).join("\n\n");
}


/**
 * Returns whether the given FA matches a formal language with only finitely many words.
 *
 * @param initialState The initial state of the FA.
 * @param getOutTransitions A function which returns all the nodes of all out-going transitions.
 * @param final Determines whether a given state is final.
 */
export function faIsFinite<T>(initialState: T, getOutTransitions: (state: T) => Iterable<T>,
	final: (state: T) => boolean): boolean {
	/**
	 * The goal is to find a cycle from which we can reach any final state. If we can find such a cycle, we can pump as
	 * many words as we like making the language infinite.
	 *
	 * To find such a cycle, we will list all nodes reachable from the initial state AND any final state. Like this, we
	 * only have to find nodes which are part of a cycle. To do this, we will iteratively remove nodes which cannot be
	 * part of a cycle. All nodes dot not have at least one outgoing transition where its state is still in the list
	 * will be removed.
	 */

	const reachFinal = new Map<T, boolean>();
	const reachFinalStack = new Set<T>();
	function canReachFinal(state: T): boolean {
		let value = reachFinal.get(state);
		if (value === undefined) {
			if (final(state)) {
				// the state is a final state
				value = true;
			} else {
				// set the value temporarily to false
				value = false;

				reachFinalStack.add(state);
				for (const out of getOutTransitions(state)) {
					if (!reachFinalStack.has(out) && canReachFinal(out)) {
						value = true;
						break;
					}
				}
				reachFinalStack.delete(state);
			}
			reachFinal.set(state, value);
		}
		return value;
	}

	const nodes = new Set<T>();
	const processedNodes = new Set<T>();
	function fillNodeList(state: T): void {
		if (processedNodes.has(state))
			return;
		processedNodes.add(state);

		if (!canReachFinal(state))
			return;

		for (const out of getOutTransitions(state)) {
			fillNodeList(out);
		}

		nodes.add(state);
	}
	fillNodeList(initialState);

	const inTrans = createInTransitionMap(nodes, getOutTransitions);

	// the set of all states which have to be checked
	let toCheck: ReadonlySet<T> = new Set<T>(nodes);
	while (toCheck.size > 0) {
		const nextToCheck = new Set<T>();

		for (const state of toCheck) {
			if (!nodes.has(state))
				continue; // already removed

			let hasOut = false;
			for (const out of getOutTransitions(state)) {
				if (nodes.has(out)) {
					hasOut = true;
					break;
				}
			}

			if (!hasOut) {
				nodes.delete(state);
				// add all in transitions to the set of states to check next round
				inTrans.get(state)!.forEach(s => nextToCheck.add(s));
			}
		}

		toCheck = nextToCheck;
	}

	// if no nodes are left, the FA does not contain cycles
	return nodes.size === 0;
}

function createInTransitionMap<T>(states: Set<T>, getOutTransitions: (state: T) => Iterable<T>): Map<T, Set<T>> {
	const inTransitions = new Map<T, Set<T>>();

	for (const s of states) {
		inTransitions.set(s, new Set<T>());
	}

	for (const s of states) {
		for (const out of getOutTransitions(s)) {
			const value = inTransitions.get(out);
			if (value !== undefined) {
				value.add(s);
			}
		}
	}

	return inTransitions;
}


export function* faIterateWordSets<T>(initialState: T, getOutTransitions: (state: T) => Iterable<[T, CharSet]>,
	final: (state: T) => boolean): Iterable<CharSet[]> {

	interface BFSNode {
		node: T;
		parent: BFSNode | null;
		value: CharSet | null;
	}

	const root: BFSNode = {
		node: initialState,
		parent: null,
		value: null
	};

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
		for (const [to, chars] of getOutTransitions(node.node)) {
			nextWave.push({
				node: to,
				parent: node,
				value: chars
			});
		}
	}

	while (hasNextNode()) {
		const current: BFSNode = currentWave.pop()!;

		if (final(current.node)) {
			yield getPath(current);
		}

		createNextWaveOf(current);
	}
}

export function* wordSetsToWords(wordSets: Iterable<CharSet[]>): IterableIterator<number[]> {
	for (const wordSet of wordSets) {
		yield* wordSetToWords(wordSet);
	}
}
