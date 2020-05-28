import { IterateBFS, iterToArray } from "./util";

/**
 * An iterator over all states of an FA with final states.
 */
export interface FAIterator<S, O = Iterable<S>> {
	readonly initial: S;
	readonly getOut: (state: S) => O;
	readonly isFinal: (state: S) => boolean;
}


/**
 * Maps the out type of the given iterator and returns a new iterator.
 *
 * @param iter
 * @param mapFn
 */
export function faMapOut<S, O, T>(iter: FAIterator<S, O>, mapFn: (out: O) => T): FAIterator<S, T> {
	const oldGetOut = iter.getOut;

	return {
		initial: iter.initial,
		getOut: state => mapFn(oldGetOut(state)),
		isFinal: iter.isFinal
	};
}
/**
 * Maps the out type of the given iterator and returns a new iterator.
 *
 * @param iter
 * @param mapFn
 */
export function faMapOutIter<S, O, T>(
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
		isFinal: iter.isFinal
	};
}
/**
 * Maps the out type of the given iterator and returns a new iterator.
 *
 * @param iter
 * @param mapFn
 */
export function faFilterOutIter<S, O>(
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
		isFinal: iter.isFinal
	};
}

/**
 * Creates a new iterator with a cached `getOut` function.
 *
 * @param iter
 */
export function faCacheOut<S, O>(iter: FAIterator<S, O>): FAIterator<S, O> {
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
		isFinal: iter.isFinal
	};
}

/**
 * Iterates all states reachable from the initial state of the given iterator in BFS order.
 *
 * @param iter
 */
export function faIterateStates<S>(iter: FAIterator<S>): Iterable<S> {
	const { initial, getOut } = iter;

	return IterateBFS([initial], getOut);
}

/**
 * Returns whether there is a final state reachable from the initial state.
 *
 * @param iter
 */
export function faCanReachFinal<S>(iter: FAIterator<S>): boolean {
	const { isFinal } = iter;

	for (const state of faIterateStates(iter)) {
		if (isFinal(state)) {
			return true;
		}
	}
	return false;
}

/**
 * Returns whether the given states form a cycle.
 *
 * @param iter
 */
export function faHasCycle<S>(iter: FAIterator<S>): boolean {
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
	const stack: StackFrame[] = [{
		element: initial,
		nextIndex: -1
	}];

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
			nextIndex: -1
		});
	}

	// nothing found
	return false;
}
