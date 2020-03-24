export interface CachedFunc<S, T> {
	(value: S): T;
	readonly cache: Map<S, T>;
}

export function cachedFunc<S, T>(func: (value: S) => T): CachedFunc<S, T> {
	function wrapper(value: S): T {
		let cached = wrapper.cache.get(value);
		if (cached === undefined) {
			wrapper.cache.set(value, cached = func(value));
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
}

/**
 * Returns the Unicode code points of a given string.
 *
 * @param word
 */
export function* stringToCodePoints(word: string): Iterable<number> {
	// https://stackoverflow.com/a/21409165/7595472

	for (let i = 0, l = word.length; i < l; i++) {
		const c1 = word.charCodeAt(i);
		if (c1 >= 0xD800 && c1 < 0xDC00 && i + 1 < l) {
			const c2 = word.charCodeAt(i + 1);
			if (c2 >= 0xDC00 && c2 < 0xE000) {
				yield 0x10000 + ((c1 - 0xD800) << 10) + (c2 - 0xDC00);
				i++;
				continue;
			}
		}
		yield c1;
	}
}
/**
 * Returns the UTF16 character code of a given string.
 *
 * @param word
 */
export function* stringToCharCodes(word: string): Iterable<number> {
	for (let i = 0, l = word.length; i < l; i++) {
		yield word.charCodeAt(i);
	}
}

/**
 * Returns the corresponding string of some given UTF16 character codes or Unicode code points.
 *
 * @param codes
 */
export function codesToString(codes: Iterable<number>): string {
	let s = "";
	for (const code of codes) {
		s += String.fromCodePoint(code);
	}
	return s;
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

export function firstOf<T>(iter: Iterable<T>): T | undefined {
	for (const value of iter) {
		return value;
	}
	return undefined;
}

export function withoutSet<T>(s1: Iterable<T>, s2: Set<T>): Set<T> {
	const s = new Set<T>();
	for (const x of s1) {
		if (!s2.has(x)) s.add(x);
	}
	return s;
}
export function intersectSet<T>(s1: Iterable<T>, s2: Set<T>): Set<T> {
	const s = new Set<T>();
	for (const x of s1) {
		if (s2.has(x)) s.add(x);
	}
	return s;
}


export function* BFSIterate<S, T>(rootElement: S,
	next: (element: S) => Iterable<T>,
	hit: (element: S) => boolean,
	select: (item: T) => S): Iterable<T[]> {

	interface BFSNode<T> {
		parent: BFSNode<T> | undefined;
		element: T;
	}

	const visited = new Set<S>();
	let toVisit: BFSNode<T>[] = iterToArray(next(rootElement)).map(x => ({ parent: undefined, element: x }));

	while (toVisit.length > 0) {
		const newToVisit: BFSNode<T>[] = [];

		for (let i = 0, l = toVisit.length; i < l; i++) {
			const node = toVisit[i];
			const element = select(node.element);

			if (!visited.has(element)) {
				visited.add(element);

				if (hit(element)) {
					const path: T[] = [];
					let n: BFSNode<T> | undefined = node;
					while (n) {
						path.push(n.element);
						n = n.parent;
					}
					path.reverse();
					yield path;
				}

				for (const child of next(element)) {
					newToVisit.push({
						parent: node,
						element: child
					});
				}
			}
		}

		toVisit = newToVisit;
	}
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
	defaultValue?: T): T | undefined {

	// It's important that this is implemented iteratively.
	// A recursive implementation might cause a stack overflow.

	const visited = new Set<S>();

	interface StackFrame {
		element: S;
		nextElements?: readonly S[];
		nextIndex: number;
	}

	const stack: StackFrame[] = [{
		element: rootElement,
		nextIndex: -1
	}];

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
			nextIndex: -1
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
	defaultValue?: T): T | undefined {

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


export function createIndexMap<T>(items: Iterable<T>): Map<T, number> {
	const map = new Map<T, number>();
	let i = 0;
	for (const node of items) {
		map.set(node, i++);
	}
	return map;
}

export function assertNever(value: never, message?: string): never {
	const error = new Error(message);
	(error as any).data = value;
	throw error;
}
