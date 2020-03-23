import { CharSet } from "./char-set";

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
	final: (state: T) => boolean): string;
export function faToString<T>(states: T[], getOutTransitions: (state: T) => Iterable<[T, string]>,
	final: (state: T) => boolean): string;
export function faToString<T>(states: T | T[], getOutTransitions: (state: T) => Iterable<[T, string]>,
	final: (state: T) => boolean): string {

	if (!Array.isArray(states)) {
		const initial: T = states;
		states = [];

		const outCache = new Map<T, [T, string][]>();
		const cachedGetOutTransitions = (state: T): [T, string][] => {
			let out = outCache.get(state);
			if (out === undefined) {
				out = [...getOutTransitions(state)].sort(([, a], [, b]) => a.localeCompare(b));
				outCache.set(state, out);
			}
			return out;
		};

		// BFS to get all states
		const visited: Set<T> = new Set();
		let toVisit: T[] = [initial];
		while (toVisit.length > 0) {
			const newToVisit: T[] = [];
			for (let i = 0, l = toVisit.length; i < l; i++) {
				const state = toVisit[i];
				if (!visited.has(state)) {
					visited.add(state);
					states.push(state);

					newToVisit.push(...cachedGetOutTransitions(state).map(([s]) => s));
				}
			}
			toVisit = newToVisit;
		}

		getOutTransitions = cachedGetOutTransitions;
	}

	if (states.length === 0) {
		return "Empty."
	}

	const index = new Map<T, number>(states.map((s, i) => [s, i]));
	const finals = new Set<T>(states.filter(s => final(s)));

	const labelOf = (state: T): string => {
		if (finals.has(state)) {
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
		if (wordSet.length === 0) {
			yield [];
		} else {
			const charsArray: number[][] = [];
			for (const set of wordSet) {
				const chars: number[] = [];
				for (const { min, max } of set.ranges) {
					for (let i = min; i <= max; i++) {
						chars.push(i);
					}
				}
				charsArray.push(chars);
			}
			yield* nestedIteration(charsArray);
		}
	}
}

function* nestedIteration<T>(arrays: T[][]): IterableIterator<T[]> {
	const indexes: number[] = [];

	for (let i = 0; i < arrays.length; i++) {
		const array = arrays[i];
		if (array.length === 0) {
			return;
		}
		indexes[i] = 0;
	}

	function hasNext(): boolean {
		let i = arrays.length - 1;
		while (true) {
			if (i < 0) {
				return false;
			}
			const index = ++indexes[i];
			if (index >= arrays[i].length) {
				indexes[i] = 0;
				i--;
			} else {
				break;
			}
		}
		return true;
	}

	do {
		const res: T[] = [];
		for (let i = 0; i < indexes.length; i++) {
			res[i] = arrays[i][indexes[i]];
		}
		yield res;
	} while (hasNext());
}

