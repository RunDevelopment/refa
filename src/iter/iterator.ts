import { FAIterator } from "../common-types";
import { iterToArray, iterateBFS, traverse as traverseGraph } from "../util";

/**
 * Maps the out type of the given iterator and returns a new iterator.
 *
 * @param iter
 * @param mapFn
 */
export function mapOut<S, O, T>(iter: FAIterator<S, O>, mapFn: (out: O) => T): FAIterator<S, T> {
	const oldGetOut = iter.getOut;

	return {
		initial: iter.initial,
		getOut: state => mapFn(oldGetOut(state)),
		isFinal: iter.isFinal,
	};
}
/**
 * Maps the out type of the given iterator and returns a new iterator.
 *
 * @param iter
 * @param mapFn
 */
export function mapOutIter<S, O, T>(
	iter: FAIterator<S, Iterable<O>>,
	mapFn: (out: O) => T
): FAIterator<S, Iterable<T>> {
	const oldGetOut = iter.getOut;
	function* getOut(state: S): IterableIterator<T> {
		for (const item of oldGetOut(state)) {
			yield mapFn(item);
		}
	}

	return {
		initial: iter.initial,
		getOut,
		isFinal: iter.isFinal,
	};
}
/**
 * Maps the out type of the given iterator and returns a new iterator.
 *
 * @param iter
 * @param mapFn
 */
export function filterOutIter<S, O>(
	iter: FAIterator<S, Iterable<O>>,
	conditionFn: (out: O) => boolean
): FAIterator<S, Iterable<O>> {
	const oldGetOut = iter.getOut;
	function* getOut(state: S): IterableIterator<O> {
		for (const item of oldGetOut(state)) {
			if (conditionFn(item)) {
				yield item;
			}
		}
	}

	return {
		initial: iter.initial,
		getOut,
		isFinal: iter.isFinal,
	};
}

/**
 * The returned iterator is guaranteed to be deterministic.
 */
export function ensureDeterministicOut<S, O>(iter: FAIterator<S, O>): FAIterator<S, O> {
	if (iter.deterministicOut) {
		return iter;
	} else {
		return cacheOut(iter);
	}
}

/**
 * Creates a new iterator with a cached `getOut` function.
 *
 * @param iter
 */
function cacheOut<S, O>(iter: FAIterator<S, O>): FAIterator<S, O> {
	const outCache = new Map<S, O>();
	const oldGetUncached = iter.getOut;

	return {
		initial: iter.initial,
		getOut: (state: S) => {
			let cached = outCache.get(state);
			if (cached === undefined) {
				cached = oldGetUncached(state);
				outCache.set(state, cached);
			}
			return cached;
		},
		deterministicOut: true,
		isFinal: iter.isFinal,
	};
}

/**
 * Iterates all states reachable from the initial state of the given iterator in BFS order.
 *
 * The returned iterable cannot be empty and will always contain the initial state.
 *
 * @param iter
 */
export function iterateStates<S>(iter: FAIterator<S>): Iterable<S> {
	const { initial, getOut } = iter;

	return iterateBFS([initial], getOut);
}

/**
 * This will traverse the whole iterator.
 *
 * The order in which states are traversed is implementation-defined.
 *
 * @param iter
 */
export function traverse<S>(iter: FAIterator<S>): void {
	traverseGraph(iter.initial, iter.getOut);
}

/**
 * Returns whether the initial state can reach (or is) a final state.
 *
 * @param iter
 */
export function canReachFinal<S>(iter: FAIterator<S>): boolean {
	const { isFinal } = iter;

	for (const state of iterateStates(iter)) {
		if (isFinal(state)) {
			return true;
		}
	}
	return false;
}

/**
 * Returns whether the given graph contains a cycle reachable from the initial state.
 *
 * @param iter
 */
export function hasCycle<S>(iter: FAIterator<S>): boolean {
	const { initial, getOut } = iter;

	// It's important that this is implemented iteratively.
	// A recursive implementation might cause a stack overflow.

	const visited = new Set<S>();

	interface StackFrame {
		element: S;
		nextElements?: readonly S[];
		nextIndex: number;
	}

	const stackElements = new Set<S>([initial]);
	const stack: StackFrame[] = [
		{
			element: initial,
			nextIndex: -1,
		},
	];

	while (stack.length > 0) {
		const top = stack[stack.length - 1];

		if (top.nextIndex === -1) {
			// first time seeing this stack frame
			stackElements.add(top.element);
			visited.add(top.element);

			top.nextElements = iterToArray(getOut(top.element));
		}

		const nextElements = top.nextElements!;

		// start with the first element
		top.nextIndex++;

		if (top.nextIndex >= nextElements.length) {
			// remove stack frame
			stackElements.delete(top.element);
			stack.pop();
			continue;
		}

		// add a new stack frame for the next element
		const nextElement = nextElements[top.nextIndex];

		if (stackElements.has(nextElement)) {
			// found a cycle
			return true;
		}

		if (visited.has(nextElement)) {
			// already processed the element
			continue;
		}

		stack.push({
			element: nextElement,
			nextIndex: -1,
		});
	}

	// nothing found
	return false;
}

/**
 * Returns whether the given FA only has finitely many paths that lead to a final state.
 *
 * @param iter
 */
export function languageIsFinite<S>(iter: FAIterator<S>): boolean {
	/**
	 * The goal is to find a cycle from which we can reach any final state. If we can find such a cycle, we can pump as
	 * many words as we like making the language infinite.
	 */

	iter = ensureDeterministicOut(mapOut(iter, iterToArray));

	const states = [...iterateStates(iter)];
	const finals = states.filter(iter.isFinal);
	const inMap = createInTransitionMap(states, iter.getOut);

	// get all states that can reach a final state
	const statesToFinal = new Set(iterateBFS(finals, s => inMap.get(s)!));

	// an iter where each state can reach a final state
	const iterToFinal = filterOutIter(iter, s => statesToFinal.has(s));

	// If this iter has a cycle, then this cycle will be reachable from the initial state and any node in that cycle can
	// reach a final state.
	return !hasCycle(iterToFinal);
}
function createInTransitionMap<T>(
	states: ReadonlySet<T> | readonly T[],
	getOut: (state: T) => Iterable<T>
): Map<T, Set<T>> {
	const inTransitions = new Map<T, Set<T>>();

	for (const s of states) {
		inTransitions.set(s, new Set<T>());
	}

	for (const s of states) {
		for (const out of getOut(s)) {
			inTransitions.get(out)!.add(s);
		}
	}

	return inTransitions;
}
