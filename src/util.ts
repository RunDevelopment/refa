
/**
 * This is functionally equivalent to `Array.prototype.filter` but it mutates the given array.
 *
 * @param array
 * @param filter
 */
export function filterMut<T>(array: T[], filter: (arg: T) => boolean): void {
	let deleteCount = 0;
	for (let i = 0; i < array.length; i++) {
		const element = array[i];
		if (filter(element)) {
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


interface BFSTreeNode<T, V> {
	parent: BFSTreeNode<T, V> | undefined;
	element: T;
	value: V;
}
/**
 * Breadth-first search.
 *
 * Returns the values of the first found path from `rootElement` to the first element `selector` returned `true` for.
 *
 * @param rootElement The root element from which to start the search.
 * @param selector The selector for the list of next elements. This function takes an element and returns `true` if
 * the search is to conclude successfully on that element or a list of element-value-tuples.
 * @returns A list of selected values or `undefined` if the search failed.
 */
export function BFS_old<T, V>(rootElement: T, selector: (element: T) => true | [T, V][]): V[] | undefined {
	const rootChildren = selector(rootElement);
	if (rootChildren === true)
		return [];

	const visited = new Set<T>([rootElement]);
	let front: BFSTreeNode<T, V>[] = rootChildren.map(c => ({
		parent: undefined,
		element: c[0],
		value: c[1],
	}));

	while (front.length > 0) {
		const newFront: BFSTreeNode<T, V>[] = [];
		for (const node of front) {
			if (visited.has(node.element))
				continue;
			visited.add(node.element);

			const children = selector(node.element);

			if (children === true) {
				// found it
				const result: V[] = [];
				let _node: BFSTreeNode<T, V> | undefined = node;
				while (_node !== undefined) {
					result.push(_node.value);
					_node = _node.parent;
				}
				return result.reverse();
			}

			// add to new front
			for (const [element, value] of children) {
				newFront.push({
					parent: node,
					element,
					value
				});
			}
		}
		front = newFront;
	}

	return undefined;
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
