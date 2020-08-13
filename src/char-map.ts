import { CharRange } from "./char-set";


function checkRange(range: CharRange): void {
	const { min, max } = range;

	if (min > max) {
		throw new RangeError(`min has to be less or equal to max. (min=${min}, max=${max})`);
	}
	if (!Number.isInteger(min) || min < 0) {
		throw new TypeError(`min has to be a non-negative integer. (min=${min})`);
	}
	if (!Number.isInteger(max) || max < 0) {
		throw new TypeError(`max has to be a non-negative integer. (max=${max})`);
	}
}
function checkChar(char: number): void {
	if (!Number.isInteger(char) || char < 0) {
		throw new TypeError(`The given character has to be a non-negative integer. (char=${char})`);
	}
}
function strictEqualFn<T>(a: T, b: T): boolean {
	return a === b;
}


export interface ReadonlyCharMap<T> extends Iterable<[CharRange, T]> {
	isEmpty: boolean;

	/**
	 * Returns whether the given character is a key in the map.
	 *
	 * @param char
	 */
	has(char: number): boolean;
	/**
	 * Returns whether every character in the given range is a key in the map.
	 *
	 * This is equivalent to: `[...chars].every(char => this.has(char))`.
	 *
	 * @param chars
	 */
	hasEvery(chars: CharRange): boolean;
	/**
	 * Returns whether some character in the given range is a key in the map.
	 *
	 * This is equivalent to: `[...chars].some(char => this.has(char))`.
	 *
	 * @param chars
	 */
	hasSome(chars: CharRange): boolean;

	/**
	 * Returns the value associated with the given character of `undefined` if the character is not key in the map.
	 *
	 * @param char
	 */
	get(char: number): T | undefined;

	/**
	 * Invokes the given callback for every item of the character map.
	 *
	 * This method is implemented more efficiently than other iterator based methods, so chose `forEach` where every
	 * possible.
	 *
	 * @param callback
	 */
	forEach(callback: (value: T, chars: CharRange, map: ReadonlyCharMap<T>) => void): void;
	keys(): Iterable<CharRange>;
	values(): Iterable<T>;
	entries(range?: CharRange): Iterable<[CharRange, T]>;
}

/**
 * A map from characters to generic values.
 *
 * The map guarantees that there are no adjacent character ranges that map to the equal values, will always be iterated
 * as one character range. The equality of values is given by a custom equal function or JavaScripts strict equality
 * operator (`===`).
 */
export class CharMap<T> implements ReadonlyCharMap<T> {

	private tree: AVLTree<T>;

	constructor(equalFn?: (a: T, b: T) => boolean) {
		this.tree = new AVLTree<T>(equalFn || strictEqualFn);
	}

	get isEmpty(): boolean {
		return this.tree.root === null;
	}

	has(char: number): boolean {
		if (!Number.isFinite(char)) return false;
		return this.tree.nodeOf(char) !== null;
	}
	hasEvery(chars: CharRange): boolean {
		checkRange(chars);
		const { min, max } = chars;

		// get nodes which contain min and max
		const minNode = this.tree.nodeOf(min);
		const maxNode = this.tree.nodeOf(max);

		if (minNode === null || maxNode === null)
			return false;

		// iterate all nodes from min to max and look for gaps
		let node: Node<T> = minNode;
		while (node !== maxNode) {
			// this cannot be null because maxNode
			const next = rightNeighbor(node)!;

			if (node.key.max + 1 !== next.key.min)
				return false; // a gap

			node = next;
		}

		return true;
	}
	hasSome(chars: CharRange): boolean {
		checkRange(chars);
		return this.tree.nodeInRange(chars) !== null;
	}

	get(char: number): T | undefined {
		if (!Number.isFinite(char)) return undefined; // char is NaN, Inf, or -Inf
		const node = this.tree.nodeOf(char);
		return node ? node.value : undefined;
	}

	set(char: number, value: T): void {
		checkChar(char);
		this.tree.deleteCharacter(char);
		this.tree.insert({ min: char, max: char }, value);
	}

	/**
	 * Sets the value for all characters in the given range.
	 *
	 * This is equivalent to `[...chars].forEach(char => this.set(char, value))`.
	 *
	 * @param chars
	 * @param value
	 */
	setEvery(chars: CharRange, value: T): void {
		checkRange(chars);
		this.tree.deleteRange(chars);
		this.tree.insert(chars, value);
	}

	delete(char: number): boolean {
		if (!Number.isFinite(char)) return false;
		return this.tree.deleteCharacter(char);
	}

	/**
	 * Deletes all characters in the given range.
	 *
	 * This is equivalent to `[...range].forEach(char => this.delete(char))`.
	 *
	 * @param range
	 */
	deleteEvery(range: CharRange): void {
		checkRange(range);
		this.tree.deleteRange(range);
	}

	map(mapFn: (value: T, chars: CharRange, map: ReadonlyCharMap<T>) => T): void {
		this.tree.map((r, v) => {
			return mapFn(v, r, this);
		});
	}
	mapRange(
		range: CharRange,
		mapFn: (value: T | undefined, chars: CharRange, map: ReadonlyCharMap<T>) => T | undefined
	): void {
		this.tree.mapWithGaps(range, (r, v) => {
			return mapFn(v, r, this);
		});
	}

	forEach(callback: (value: T, chars: CharRange, map: ReadonlyCharMap<T>) => void): void {
		const rec = (node: Node<T> | null): void => {
			if (node) {
				rec(node.left);
				callback(node.value, node.key, this);
				rec(node.right);
			}
		};
		rec(this.tree.root);
	}
	*keys(): IterableIterator<CharRange> {
		for (const [key,] of this.entries()) {
			yield key;
		}
	}
	*values(): IterableIterator<T> {
		for (const [, value] of this.entries()) {
			yield value;
		}
	}
	*entries(range?: CharRange): IterableIterator<[CharRange, T]> {
		if (range) {
			let current = this.tree.leftmostNodeInRange(range);
			const end = this.tree.rightmostNodeInRange(range);
			while (current) {
				yield [current.key, current.value];

				if (current === end) {
					break;
				} else {
					current = rightNeighbor(current);
				}
			}
		} else {
			const stack: { leftDone: boolean; node: Node<T> }[] = [];

			if (this.tree.root) {
				stack.push({ leftDone: false, node: this.tree.root });
			}

			while (stack.length > 0) {
				const { leftDone, node } = stack.pop()!;

				if (leftDone || node.left === null) {
					const { key, value, right } = node;
					yield [key, value];
					if (right !== null) {
						stack.push({ leftDone: false, node: right });
					}
				} else /* if (!leftDone && node.left !== null) */ {
					stack.push({ leftDone: true, node });
					stack.push({ leftDone: false, node: node.left });
				}
			}
		}
	}
	[Symbol.iterator](): IterableIterator<[CharRange, T]> {
		return this.entries();
	}
}


interface Node<T> {
	key: CharRange;
	value: T;

	balance: number;
	height: number;
	parent: Node<T> | null;
	left: Node<T> | null;
	right: Node<T> | null;
}
interface DetachedNode<T> {
	key: CharRange;
	value: T;

	balance: number;
	height: number;
	parent: null;
	left: null;
	right: null;
}

/**
 * Returns the right neighbor of the given node or `null` if the given node is the rightmost node in its tree.
 *
 * This takes _O(log n)_ time (n = total number of nodes in the tree).
 *
 * @param node
 */
function rightNeighbor<T>(node: Node<T>): Node<T> | null {
	if (node.right) {
		// get the leftmost of the right sub-tree
		return leftmostNode(node.right);
	} else {
		let parent = node.parent;
		while (parent) {
			if (parent.left == node) {
				return parent;
			} else /* if (parent.right == node) */ {
				node = parent;
				parent = parent.parent;
			}
		}
		return null;
	}
}
/**
 * Returns the left neighbor of the given node or `null` if the given node is the leftmost node in its tree.
 *
 * This takes _O(log n)_ time (n = total number of nodes in the tree).
 *
 * @param node
 */
function leftNeighbor<T>(node: Node<T>): Node<T> | null {
	if (node.left) {
		// get the rightmost of the left sub-tree
		return rightmostNode(node.left);
	} else {
		let parent = node.parent;
		while (parent) {
			if (parent.right == node) {
				return parent;
			} else /* if (parent.left == node) */ {
				node = parent;
				parent = parent.parent;
			}
		}
		return null;
	}
}

function leftmostNode<T>(root: Node<T>): Node<T> {
	while (root.left) {
		root = root.left;
	}
	return root;
}
function rightmostNode<T>(root: Node<T>): Node<T> {
	while (root.right) {
		root = root.right;
	}
	return root;
}

/**
 * Returns the leftmost node in the subtree created be the given node which contains at least one character of the
 * given range.
 *
 * This takes _O(log n)_ time (n = total number of nodes in the subtree).
 *
 * @param node
 * @param range
 */
function leftmostNodeInRange<T>(node: Node<T> | null, range: CharRange): Node<T> | null {
	if (node === null) return null;

	const { min, max } = range;

	if (node.key.min <= min && min <= node.key.max) {
		// this node contains range.min
		return node; // nodes cover disjoint intervals
	} else if (node.key.max < min) {
		// [node.key] ... [range]
		return leftmostNodeInRange(node.right, range);
	} else if (max < node.key.min) {
		// [range] ... [node.key]
		return leftmostNodeInRange(node.left, range);
	} else {
		// the node and the given range at least partially overlap but there could be better nodes left to this node
		const moreLeft = leftmostNodeInRange(node.left, range);
		if (moreLeft) {
			return moreLeft;
		}
		return node;
	}
}
/**
 * Returns the rightmost node in the subtree created be the given node which contains at least one character of the
 * given range.
 *
 * This takes _O(log n)_ time (n = total number of nodes in the subtree).
 *
 * @param node
 * @param range
 */
function rightmostNodeInRange<T>(node: Node<T> | null, range: CharRange): Node<T> | null {
	if (node === null) return null;

	const { min, max } = range;

	if (node.key.min <= max && max <= node.key.max) {
		// this node contains range.max
		return node; // nodes cover disjoint intervals
	} else if (node.key.max < min) {
		// [node.key] ... [range]
		return rightmostNodeInRange(node.right, range);
	} else if (max < node.key.min) {
		// [range] ... [node.key]
		return rightmostNodeInRange(node.left, range);
	} else {
		// the node and the given range at least partially overlap but there could be better nodes right to this node
		const moreRight = rightmostNodeInRange(node.right, range);
		if (moreRight) {
			return moreRight;
		}
		return node;
	}
}


function rotateLeft<T>(a: Node<T>): Node<T> {
	const b: Node<T> = a.right!;
	b.parent = a.parent;

	a.right = b.left;

	if (a.right != null)
		a.right.parent = a;

	b.left = a;
	a.parent = b;

	if (b.parent != null) {
		if (b.parent.right == a) {
			b.parent.right = b;
		} else {
			b.parent.left = b;
		}
	}

	setBalance(a);
	setBalance(b);

	return b;
}
function rotateRight<T>(a: Node<T>): Node<T> {
	const b: Node<T> = a.left!;
	b.parent = a.parent;

	a.left = b.right;

	if (a.left != null)
		a.left.parent = a;

	b.right = a;
	a.parent = b;

	if (b.parent != null) {
		if (b.parent.right == a) {
			b.parent.right = b;
		} else {
			b.parent.left = b;
		}
	}

	setBalance(a);
	setBalance(b);

	return b;
}
function rotateLeftThenRight<T>(n: Node<T>): Node<T> {
	n.left = rotateLeft(n.left!);
	return rotateRight(n);
}
function rotateRightThenLeft<T>(n: Node<T>): Node<T> {
	n.right = rotateRight(n.right!);
	return rotateLeft(n);
}
function setBalance<T>(n: Node<T>): void {
	n.height = 1 + Math.max(height(n.left), height(n.right));
	n.balance = height(n.right) - height(n.left);
}
function height<T>(node: Node<T> | null): number {
	return node === null ? 0 : node.height;
}

function areAdjacent<T>(left: Node<T>, right: Node<T>): boolean {
	return left.key.max + 1 === right.key.min;
}
function areAdjacentRanges(left: CharRange, right: CharRange): boolean {
	return left.max + 1 === right.min;
}
function unionAdjacentRanges(left: CharRange, right: CharRange): CharRange {
	return { min: left.min, max: right.max };
}


class AVLTree<T> {

	root: Node<T> | null = null;

	constructor(public readonly equalFn: (a: T, b: T) => boolean) { }

	isDetached(node: Node<T>): node is DetachedNode<T> {
		return node !== this.root && node.parent === null && node.left === null && node.right === null;
	}

	/**
	 * Returns the node which contains the given character or `null` if no such node exists.
	 *
	 * @param char
	 */
	nodeOf(char: number): Node<T> | null {
		let node = this.root;
		while (node) {
			const { min, max } = node.key;
			if (char < min) {
				node = node.left;
			} else if (char > max) {
				node = node.right;
			} else {
				return node;
			}
		}
		return null;
	}

	/**
	 * Returns a node which shares at least one character with the given range.
	 *
	 * __Note:__ There can be multiple nodes within the given range. The returned node can be any one of them.
	 *
	 * @param range
	 */
	nodeInRange(range: CharRange): Node<T> | null {
		const { min: rMin, max: rMax } = range;

		let node = this.root;
		while (node) {
			const { min, max } = node.key;
			if (rMax < min) {
				node = node.left;
			} else if (rMin > max) {
				node = node.right;
			} else {
				return node;
			}
		}
		return null;
	}

	/**
	 * Returns the leftmost node which shares at least one character with the given range.
	 *
	 * @param range
	 */
	leftmostNodeInRange(range: CharRange): Node<T> | null {
		return leftmostNodeInRange(this.root, range);
	}
	/**
	 * Returns the rightmost node which shares at least one character with the given range.
	 *
	 * @param range
	 */
	rightmostNodeInRange(range: CharRange): Node<T> | null {
		return rightmostNodeInRange(this.root, range);
	}


	private mergeAdjacentLeft(key: CharRange, rightNode: Node<T>): void {
		if (!areAdjacentRanges(key, rightNode.key)) {
			throw new Error("The ranges are not adjacent");
		}

		let min = key.min;
		const leftN = leftNeighbor(rightNode);
		if (leftN) {
			if (leftN.key.max >= key.min) {
				throw new Error("The inserted key has to be disjoint with all other keys.");
			}
			if (areAdjacentRanges(leftN.key, key) && this.equalFn(leftN.value, rightNode.value)) {
				min = leftN.key.min;
				this.detachNode(leftN);
			}
		}

		rightNode.key = { min, max: rightNode.key.max };
	}
	private mergeAdjacentRight(leftNode: Node<T>, key: CharRange): void {
		if (!areAdjacentRanges(leftNode.key, key)) {
			throw new Error("The ranges are not adjacent");
		}

		let max = key.max;
		const rightN = rightNeighbor(leftNode);
		if (rightN) {
			if (rightN.key.min <= key.max) {
				throw new Error("The inserted key has to be disjoint with all other keys.");
			}
			if (areAdjacentRanges(key, rightN.key) && this.equalFn(leftNode.value, rightN.value)) {
				max = rightN.key.max;
				this.detachNode(rightN);
			}
		}

		leftNode.key = { min: leftNode.key.min, max };
	}

	insert(key: CharRange, value: T): void {
		if (this.root == null) {
			this.root = {
				key, value, parent: null,
				balance: 0, height: 1,
				left: null, right: null
			};
			return;
		}

		const { min: keyMin, max: keyMax } = key;
		let parent: Node<T> = this.root;

		while (true) {
			if (parent.key.max < keyMin) {
				// [parent] [key]
				if (areAdjacentRanges(parent.key, key) && this.equalFn(parent.value, value)) {
					this.mergeAdjacentRight(parent, key);
					break;
				} else if (parent.right) {
					parent = parent.right;
				} else {
					const rightN = rightNeighbor(parent);
					if (rightN && areAdjacentRanges(key, rightN.key) && this.equalFn(value, rightN.value)) {
						// merge with right neighbor
						rightN.key = unionAdjacentRanges(key, rightN.key);
					} else {
						parent.right = {
							key, value, parent,
							balance: 0, height: parent.height + 1,
							left: null, right: null
						};
						this.rebalance(parent);
					}
					break;
				}
			} else if (keyMax < parent.key.min) {
				// [key] [parent]
				if (areAdjacentRanges(key, parent.key) && this.equalFn(value, parent.value)) {
					this.mergeAdjacentLeft(key, parent);
					break;
				} else if (parent.left) {
					parent = parent.left;
				} else {
					const leftN = leftNeighbor(parent);
					if (leftN && areAdjacentRanges(leftN.key, key) && this.equalFn(leftN.value, value)) {
						// merge with left neighbor
						leftN.key = unionAdjacentRanges(leftN.key, key);
					} else {
						parent.left = {
							key, value, parent,
							balance: 0, height: parent.height + 1,
							left: null, right: null
						};
						this.rebalance(parent);
					}
					break;
				}
			} else {
				throw new Error("The inserted key has to be disjoint with all other keys.");
			}
		}
	}

	/**
	 * This will replace the given old node with the given new node.
	 *
	 * The old node will be completely detached from the tree meaning that it will have neither children nor a parent
	 * after this operation. The new node is assumed to be detached from the tree.
	 *
	 * This will not check whether the tree is valid afterwards.
	 *
	 * This operation is guaranteed to uphold the __referential integrity__ of all nodes. This means that the `key` and
	 * `value` values of all nodes in the tree will be the same after this operation as before.
	 *
	 * @param oldNode
	 * @param newNode
	 * @returns The old node but casted to the `DetachedNode` type.
	 */
	private dangerouslyReplaceNode(oldNode: Node<T>, newNode: DetachedNode<T>): DetachedNode<T> {
		const _new = newNode as Node<T>;

		const parent = oldNode.parent;
		if (!parent) {
			if (this.root === oldNode) {
				_new.left = oldNode.left;
				_new.right = oldNode.right;
				oldNode.left = null;
				oldNode.right = null;
				this.root = _new;
			} else {
				throw new Error("The old node cannot be a detached node.");
			}
		} else {

			_new.left = oldNode.left;
			_new.right = oldNode.right;
			_new.parent = parent;
			oldNode.left = null;
			oldNode.right = null;
			oldNode.parent = null;
			if (parent.left === oldNode) {
				parent.left = newNode;
			} else /* if (parent.right === oldNode) */ {
				parent.right = newNode;
			}
		}

		return oldNode as DetachedNode<T>;
	}
	/**
	 * Detached the given node from the tree.
	 *
	 * This operation is guaranteed to uphold the __referential integrity__ of all nodes. This means that the `key` and
	 * `value` values of all nodes in the tree will be the same after this operation as before.
	 *
	 * @param node
	 */
	detachNode(node: Node<T>): DetachedNode<T> {
		if (node.left == null && node.right == null) {
			if (node.parent == null) {
				this.root = null;
			} else {
				const parent: Node<T> = node.parent;
				if (parent.left == node) {
					parent.left = null;
				} else /* if (parent.right == node) */ {
					parent.right = null;
				}
				this.rebalance(parent);
			}
			node.parent = null;
			return node as DetachedNode<T>;
		}

		const child = node.left != null ? rightmostNode(node.left) : leftmostNode(node.right!);
		return this.dangerouslyReplaceNode(node, this.detachNode(child));
	}

	deleteCharacter(char: number): boolean {
		const node = this.nodeOf(char);
		if (node) {
			const { min, max } = node.key;
			if (min != char) {
				// [min char ...

				if (max != char) {
					// [min char max]
					node.key = { min: node.key.min, max: char - 1 };
					this.insert({ min: char + 1, max: max }, node.value);
				} else {
					// [min char==max]
					node.key = { min: node.key.min, max: node.key.max - 1 };
				}
			} else if (max != char) {
				// [min==char max]
				node.key = { min: node.key.min - 1, max: node.key.max };
			} else {
				// min == max == char
				this.detachNode(node);
			}
		}
		return node !== null;
	}

	deleteRange(range: CharRange): void {
		const { min: rMin, max: rMax } = range;

		// edge cases first
		// partially included nodes
		const leftEdge = this.nodeOf(rMin);
		if (leftEdge) {
			const { min, max } = leftEdge.key;

			if (min == rMin) {
				// there is nothing left of range.min
				if (max > rMax) {
					// [[min/rMin rMax] max]
					// we set min to remove the range without removing the node
					leftEdge.key = { min: rMax + 1, max: leftEdge.key.max };
					return;
				} else {
					// The left node has to be removed
					this.detachNode(leftEdge);
					if (max == rMax) {
						return; // we got lucky and found an exact match, so we're done here
					}
				}
			} else {
				// some of the range of leftEdge is on the outside left of range
				// [min [rMin ...

				// the current leftEdge node will be set to the outside part...
				leftEdge.key = { min: leftEdge.key.min, max: rMin - 1 };

				// ..and for the rest:
				if (max > rMax) {
					// [min [rMin rMax] max]
					// we adjust the range of the leftEdge and insert a new node
					this.insert({ min: rMax + 1, max: max }, leftEdge.value);
					return;
				} else if (max == rMax) {
					// [min [rMin rMax/max]]
					return;
				} /* else {
					// [min <rMin max] rMax>
					// since [rMin max] has already been removed there's nothing to do here
				} */
			}

			if (min == rMin && max == rMax) {
				// we got lucky and found an exact match
				this.detachNode(leftEdge);
				return;
			}
		}

		const rightEdge = this.nodeOf(range.max);
		if (rightEdge) {
			const { max } = rightEdge.key;

			// we know that rightEdge can't include rMin because it would have been handled by leftEdge
			// [rMin [min ...

			if (max > rMax) {
				// [rMin <min rMax] max>
				rightEdge.key = { min: rMax + 1, max: rightEdge.key.max };
			} else /* if (max == rMax) */ {
				// [rMin [min rMax/max]]
				this.detachNode(rightEdge);
			}
		}

		// search and delete all node which are included by the range
		// since we handle the edge case already, all node are either completely in the range or not at all

		while (true) {
			const node = this.nodeInRange(range);
			if (node) {
				this.detachNode(node);
			} else {
				break;
			}
		}
	}

	/**
	 * Sets the value of the given node.
	 *
	 * This operation may detach some other nodes from the tree.
	 *
	 * This operation is guaranteed to uphold the __referential integrity__ of all nodes except for the given one.
	 *
	 * @param node
	 * @param newValue
	 */
	setNode(node: Node<T>, newValue: T): void {
		if (this.equalFn(node.value, newValue)) {
			// trivial
			return;
		}

		node.value = newValue;

		const leftN = leftNeighbor(node);
		if (leftN && areAdjacent(leftN, node) && this.equalFn(leftN.value, newValue)) {
			node.key = unionAdjacentRanges(leftN.key, node.key);
			this.detachNode(leftN);
		}

		const rightN = leftNeighbor(node);
		if (rightN && areAdjacent(node, rightN) && this.equalFn(newValue, rightN.value)) {
			node.key = unionAdjacentRanges(node.key, rightN.key);
			this.detachNode(rightN);
		}
	}

	map(mapFn: (range: CharRange, value: T) => T): void {
		if (!this.root) {
			return;
		}

		let prevNode = leftmostNode(this.root);
		prevNode.value = mapFn(prevNode.key, prevNode.value);

		let node: Node<T> | null;
		while ((node = rightNeighbor(prevNode))) {
			node.value = mapFn(node.key, node.value);

			if (areAdjacent(prevNode, node) && this.equalFn(prevNode.value, node.value)) {
				node.key = unionAdjacentRanges(prevNode.key, node.key);
				this.detachNode(prevNode);
			}

			prevNode = node;
		}
	}

	private applyModifications(mods: [Node<T>, T][]): void {
		if (mods.length === 0) {
			return;
		} else if (mods.length === 1) {
			this.setNode(mods[0][0], mods[0][1]);
		}

		mods.sort((a, b) => a[0].key.min - b[0].key.min);

		for (let i = 0, l = mods.length; i < l; i++) {
			const [node, newValue] = mods[i];
			node.value = newValue;

			const prev = leftNeighbor(node);
			if (prev && areAdjacent(prev, node) && this.equalFn(prev.value, newValue)) {
				node.key = unionAdjacentRanges(prev.key, node.key);
				this.detachNode(prev);
			}

			const next = rightNeighbor(node);
			if (!(i + 1 < l && next === mods[i + 1][0])) {
				// the right neighbor isn't the next modification
				if (next && areAdjacent(node, next) && this.equalFn(newValue, next.value)) {
					node.key = unionAdjacentRanges(node.key, next.key);
					this.detachNode(next);
				}
			}
		}
	}
	mapWithGaps(range: CharRange, mapFn: (range: CharRange, value: T | undefined) => T | undefined): void {
		/**
		 * This function only makes modifications to the tree after the given map function has been called for every
		 * node and gap.
		 */

		const leftmost = this.leftmostNodeInRange(range);

		if (leftmost === null) {
			// the trivial case of the entire given range is empty
			const mapRes = mapFn(range, undefined);
			if (mapRes !== undefined) {
				this.insert(range, mapRes);
			}

		} else if (leftmost.key.min <= range.min && range.max <= leftmost.key.max) {
			// [leftmost.min ... [range] ... leftmost.max]
			const oldRange = leftmost.key;
			const oldValue = leftmost.value;
			const mapRes = mapFn(range, oldValue);

			if (mapRes === undefined) {
				this.deleteRange(range);
			} else if (this.equalFn(mapRes, oldValue)) {
				// nothing changed
			} else if (oldRange.min === range.min && range.max === oldRange.max) {
				// range === leftmost.key
				leftmost.value = mapRes;
			} else if (oldRange.min < range.min) {
				leftmost.key = { min: oldRange.min, max: range.min - 1 };
				this.insert(range, mapRes);
				if (range.max < oldRange.max) {
					this.insert({ min: range.max + 1, max: oldRange.max }, oldValue);
				}
			} else /* if (oldRange.min === range.min && range.max < oldRange.max) */ {
				leftmost.key = { min: range.max + 1, max: oldRange.max };
				this.insert(range, mapRes);
			}

		} else {
			const del: Node<T>[] = [];
			const mod: [Node<T>, T][] = [];
			const ins: [CharRange, T][] = [];

			const simpleGap = (r: CharRange): void => {
				if (r.min < range.min || r.max > range.max) {
					throw new RangeError("The range of the given gap is not within the mapping range.");
				}

				const mapRes = mapFn(r, undefined);
				if (mapRes !== undefined) {
					ins.push([r, mapRes]);
				}
			};
			const simpleNode = (node: Node<T>): void => {
				if (node.key.min < range.min || node.key.max > range.max) {
					throw new RangeError("The range of the given node is not within the mapping range.");
				}

				const mapRes = mapFn(node.key, node.value);
				if (mapRes === undefined) {
					del.push(node);
				} else {
					mod.push([node, mapRes]);
				}
			};

			const rightmost = this.rightmostNodeInRange(range);


			if (range.min < leftmost.key.min) {
				// there is a gap between the leftmost node and the start of the given range
				simpleGap({ min: range.min, max: leftmost.key.min - 1 });
			} else if (leftmost.key.min < range.min) {
				// the leftmost node has to be split
				ins.push([{ min: leftmost.key.min, max: range.min - 1 }, leftmost.value]);
				leftmost.key = { min: range.min, max: leftmost.key.max };
			}

			let currentNode: Node<T> = leftmost;
			while (currentNode !== rightmost) {
				// the node itself
				simpleNode(currentNode);

				const nextNode = rightNeighbor(currentNode)!;
				// the gap between the current node and the next node
				if (currentNode.key.max + 1 < nextNode.key.min) {
					simpleGap({ min: currentNode.key.max + 1, max: nextNode.key.min - 1 });
				}

				currentNode = nextNode;
			}

			if (rightmost.key.max < range.max) {
				// there's a gap after the rightmost node
				simpleNode(rightmost);
				simpleGap({ min: rightmost.key.max + 1, max: range.max });
			} else if (rightmost.key.max > range.max) {
				// the rightmost node goes beyond the given range
				ins.push([{ min: range.max + 1, max: rightmost.key.max }, rightmost.value]);
				rightmost.key = { min: rightmost.key.min, max: range.max };
				simpleNode(rightmost);
			} else {
				// the rightmost node ends perfectly with the given range
				simpleNode(rightmost);
			}

			// delete, modify, and insert
			del.forEach(n => this.detachNode(n));
			this.applyModifications(mod);
			ins.forEach(([range, v]) => this.insert(range, v));
		}
	}

	/**
	 * Re-balances the given node.
	 *
	 * This operation is guaranteed to uphold the __referential integrity__ of all nodes. This means that the `key` and
	 * `value` values of all nodes in the tree will be the same after this operation as before.
	 *
	 * @param n
	 */
	private rebalance(n: Node<T>): void {
		setBalance(n);

		if (n.balance == -2) {
			if (height(n.left!.left) >= height(n.left!.right))
				n = rotateRight(n);
			else
				n = rotateLeftThenRight(n);

		} else if (n.balance == 2) {
			if (height(n.right!.right) >= height(n.right!.left))
				n = rotateLeft(n);
			else
				n = rotateRightThenLeft(n);
		}

		if (n.parent != null) {
			this.rebalance(n.parent);
		} else {
			this.root = n;
		}
	}

}
