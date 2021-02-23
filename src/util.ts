export interface CachedFunc<S, T> {
	(value: S): T;
	readonly cache: Map<S, T>;
}

export function cachedFunc<S, T>(func: (value: S) => T): CachedFunc<S, T> {
	function wrapper(value: S): T {
		let cached = wrapper.cache.get(value);
		if (cached === undefined) {
			wrapper.cache.set(value, (cached = func(value)));
		}
		return cached;
	}
	wrapper.cache = new Map<S, T>();

	return wrapper;
}

/**
 * This is functionally equivalent to `Array.prototype.filter` but it mutates the given array.
 *
 * @param array
 * @param filter
 */
export function filterMut<T>(array: T[], filter: (arg: T, prev: T | undefined) => boolean): void {
	let deleteCount = 0;
	for (let i = 0; i < array.length; i++) {
		const element = array[i];
		if (filter(element, array[i - deleteCount - 1])) {
			array[i - deleteCount] = element;
		} else {
			deleteCount++;
		}
	}
	array.splice(array.length - deleteCount, deleteCount);
}

export function minOf<T>(iter: Iterable<T>, cost: (value: T) => number): T | undefined {
	let min: T | undefined = undefined;
	let minCost = Infinity;
	for (const value of iter) {
		const valueCost = cost(value);
		if (valueCost < minCost) {
			min = value;
			minCost = valueCost;
		}
	}
	return min;
}

export function iterToArray<T>(iter: Iterable<T>): readonly T[] {
	return Array.isArray(iter) ? iter : [...iter];
}
export function iterToSet<T>(iter: Iterable<T>): ReadonlySet<T> {
	return iter instanceof Set ? iter : new Set(iter);
}

export function firstOf<T>(iter: Iterable<T>): T | undefined {
	for (const value of iter) {
		return value;
	}
	return undefined;
}

export function withoutSet<T>(s1: Iterable<T>, s2: ReadonlySet<T>): Set<T> {
	const s = new Set<T>();
	for (const x of s1) {
		if (!s2.has(x)) s.add(x);
	}
	return s;
}
export function intersectSet<T>(s1: Iterable<T>, s2: ReadonlySet<T>): Set<T> {
	const s = new Set<T>();
	for (const x of s1) {
		if (s2.has(x)) s.add(x);
	}
	return s;
}

const searchResult = Symbol();
export interface SearchResult<T> {
	[searchResult]: T;
}
export function createSearchResult<T>(value: T): SearchResult<T> {
	return { [searchResult]: value };
}

function isSearchResult<T>(result: any): result is SearchResult<T> {
	return searchResult in result;
}

/**
 * Performs a depth first search on the given root element.
 *
 * @param rootElement
 * @param next
 */
export function DFS<S>(rootElement: S, next: (element: S) => Iterable<S>): void;
export function DFS<S, T>(rootElement: S, next: (element: S) => Iterable<S> | SearchResult<T>): T | undefined;
export function DFS<S, T>(rootElement: S, next: (element: S) => Iterable<S> | SearchResult<T>, defaultValue: T): T;
export function DFS<S, T>(
	rootElement: S,
	next: (element: S) => Iterable<S> | SearchResult<T>,
	defaultValue?: T
): T | undefined {
	// It's important that this is implemented iteratively.
	// A recursive implementation might cause a stack overflow.

	const visited = new Set<S>();

	interface StackFrame {
		element: S;
		nextElements?: readonly S[];
		nextIndex: number;
	}

	const stack: StackFrame[] = [
		{
			element: rootElement,
			nextIndex: -1,
		},
	];

	while (stack.length > 0) {
		const top = stack[stack.length - 1];

		if (top.nextIndex === -1) {
			// first time seeing this stack frame
			visited.add(top.element);

			const nextResult = next(top.element);
			if (isSearchResult(nextResult)) {
				return nextResult[searchResult];
			}

			top.nextElements = iterToArray(nextResult);
		}

		const nextElements = top.nextElements;

		if (!nextElements) {
			throw new Error("This should not happen.");
		}

		// start with the first element
		top.nextIndex++;

		if (top.nextIndex >= nextElements.length) {
			stack.pop();
			continue;
		}

		// add a new stack frame for the next element
		const nextElement = nextElements[top.nextIndex];
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
	return defaultValue;
}

export function BFS<S>(rootElement: S, next: (element: S) => Iterable<S>): void;
export function BFS<S, T>(rootElement: S, next: (element: S) => Iterable<S> | SearchResult<T>): T | undefined;
export function BFS<S, T>(rootElement: S, next: (element: S) => Iterable<S> | SearchResult<T>, defaultValue: T): T;
export function BFS<S, T>(
	rootElement: S,
	next: (element: S) => Iterable<S> | SearchResult<T>,
	defaultValue?: T
): T | undefined {
	// It's important that this is implemented iteratively.
	// A recursive implementation might cause a stack overflow.

	const visited = new Set<S>();
	let toCheck: readonly S[] = [rootElement];

	while (toCheck.length > 0) {
		const newToCheck: S[] = [];

		for (let i = 0, l = toCheck.length; i < l; i++) {
			const element = toCheck[i];

			if (visited.has(element)) {
				// already processed that element
				continue;
			}
			visited.add(element);

			const nextResult = next(element);
			if (isSearchResult(nextResult)) {
				return nextResult[searchResult];
			}

			for (const nextElement of nextResult) {
				if (!visited.has(nextElement)) {
					newToCheck.push(nextElement);
				}
			}
		}

		toCheck = newToCheck;
	}

	return defaultValue;
}

export function* IterateBFS<S>(startElements: Iterable<S>, next: (element: S) => Iterable<S>): Iterable<S> {
	const visited = new Set<S>();
	let visitNow: S[] = [...startElements];
	let visitNext: S[] = [];

	while (visitNow.length > 0) {
		for (const node of visitNow) {
			if (!visited.has(node)) {
				visited.add(node);
				yield node;
				visitNext.push(...next(node));
			}
		}

		// swap arrays
		[visitNow, visitNext] = [visitNext, visitNow];
		// clear visitNext
		visitNext.length = 0;
	}
}

/**
 * Traverses the given graph in any order. All elements will be visited exactly once.
 *
 * @param root
 * @param next
 */
export function traverse<S>(root: S, next: (element: S) => Iterable<S>): void {
	const visited = new Set<S>();
	const toCheck: S[] = [root];

	let element;
	while ((element = toCheck.pop())) {
		if (!visited.has(element)) {
			visited.add(element);
			toCheck.push(...next(element));
		}
	}
}

export function assertNever(value: never, message?: string): never {
	const error = new Error(message);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(error as any).data = value;
	throw error;
}

export type UnionIterable<T> = Iterable<T> & { __unionIterable?: never };
export type ConcatIterable<T> = Iterable<T> & { __concatIterable?: never };

export function* unionSequences<T>(sequencesSet: UnionIterable<UnionIterable<T>>): UnionIterable<T> {
	for (const sequences of sequencesSet) {
		yield* sequences;
	}
}
export function* flatConcatSequences<T>(
	sequencesList: ConcatIterable<UnionIterable<readonly T[]>>
): UnionIterable<T[]> {
	for (const combination of iterateCombinations(sequencesList)) {
		const wordSet: T[] = [];
		for (const item of combination) {
			wordSet.push(...item);
		}
		yield wordSet;
	}
}
export function* concatSequences<T>(sequencesList: ConcatIterable<UnionIterable<T>>): UnionIterable<T[]> {
	for (const combination of iterateCombinations(sequencesList)) {
		yield [...combination];
	}
}
export function* repeatSequences<T, R>(
	counts: UnionIterable<number>,
	sequences: UnionIterable<T>,
	concat: (list: ConcatIterable<UnionIterable<T>>) => UnionIterable<R>
): UnionIterable<R> {
	sequences = LazyStableIterable.from(sequences);

	for (const count of counts) {
		const concatSeq: UnionIterable<T>[] = [];
		for (let i = 0; i < count; i++) {
			concatSeq.push(sequences);
		}
		yield* concat(concatSeq);
	}
}

class LazyStableIterable<T> implements Iterable<T> {
	private readonly _iterator: Iterator<T>;
	private readonly _cache: T[] = [];
	private _fullyCached = false;
	private constructor(iter: Iterable<T>) {
		this._iterator = iter[Symbol.iterator]();
	}
	static from<T>(iter: Iterable<T>): LazyStableIterable<T> {
		if (iter instanceof LazyStableIterable) {
			return iter;
		} else {
			return new LazyStableIterable(iter);
		}
	}
	[Symbol.iterator](): Iterator<T> {
		if (this._fullyCached) {
			return this._cache[Symbol.iterator]();
		} else {
			return (function* (instance: LazyStableIterable<T>) {
				const { _cache, _iterator } = instance;

				let i = 0;
				while (!instance._fullyCached) {
					if (i < _cache.length) {
						yield _cache[i];
						i++;
					} else {
						const next = _iterator.next();
						if (next.done) {
							instance._fullyCached = true;
						} else {
							const { value } = next;
							_cache.push(value);
							yield value;
							i++;
						}
					}
				}

				for (; i < _cache.length; i++) {
					yield _cache[i];
				}
			})(this);
		}
	}
}
/**
 * This function only yields one array. You are not allowed to modify the yielded array and you have to make a copy of
 * it before this iterator yields the next value.
 *
 * @param sequences
 */
function* iterateCombinations<T>(sequences: ConcatIterable<Iterable<T>>): Iterable<ConcatIterable<T>> {
	const iterables = iterToArray(sequences).map(LazyStableIterable.from);
	const iterators = iterables.map(iter => iter[Symbol.iterator]());
	const values: T[] = [];

	for (const iter of iterators) {
		const result = iter.next();
		if (result.done) {
			// one of the iterators is empty
			return;
		}
		values.push(result.value);
	}

	yield values;

	if (iterators.length === 0) {
		return;
	}

	while (true) {
		for (let i = iterators.length - 1; i >= 0; i--) {
			const result = iterators[i].next();
			if (result.done) {
				if (i === 0) {
					// finished iterating all combinations
					return;
				} else {
					// restart
					iterators[i] = iterables[i][Symbol.iterator]();
					const restartResult = iterators[i].next();
					if (restartResult.done) {
						throw new Error();
					} else {
						values[i] = restartResult.value;
					}
				}
			} else {
				values[i] = result.value;
				break;
			}
		}

		yield values;
	}
}
