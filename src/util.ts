export function createCachedTranslator<S, T>(translate: (value: S) => T): { (value: S): T; cache: Map<S, T> } {
	function cachedFunc(value: S): T {
		let cached = cachedFunc.cache.get(value);
		if (cached === undefined) {
			cachedFunc.cache.set(value, cached = translate(value));
		}
		return cached;
	}
	cachedFunc.cache = new Map<S, T>();

	return cachedFunc;
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


interface BFSNode<T> {
	parent: BFSNode<T> | undefined;
	element: T;
}

export function* BFS<S, T>(rootElement: S,
	next: (element: S) => Iterable<T>,
	hit: (element: S) => boolean,
	select: (item: T) => S): Iterable<T[]> {

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


/**
 * Performs a depth first search on the given root element.
 *
 * __Note:__ You can return `true` in the `next` function to abort the search immediately.
 *
 * @param rootElement
 * @param next
 * @returns Whether the search was aborted.
 */
export function DFS<S>(rootElement: S, next: (element: S) => Iterable<S> | true): boolean {
	const visited = new Set<S>();

	/**
	 *
	 * @param element
	 * @returns Whether the search was be aborted.
	 */
	function inner(element: S): boolean {
		if (visited.has(element)) {
			return false;
		}
		visited.add(element);

		const nextResult = next(element);
		if (nextResult === true) {
			return true;
		}

		for (const e of iterToArray(nextResult)) {
			if (inner(e)) {
				return true;
			}
		}
		return false;
	}

	return inner(rootElement);
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
