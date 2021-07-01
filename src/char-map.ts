import { Char } from "./char-types";
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
function checkChar(char: Char): void {
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
	has(char: Char): boolean;
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
	get(char: Char): T | undefined;

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
 * as one character range. The equality of values is given by a custom equal function or JavaScript's strict equality
 * operator (`===`).
 */
export class CharMap<T> implements ReadonlyCharMap<T> {
	private _tree: AVLTree<T>;

	constructor(equalFn?: (a: T, b: T) => boolean) {
		this._tree = new AVLTree<T>(equalFn || strictEqualFn);
	}

	get isEmpty(): boolean {
		return this._tree.root === null;
	}

	has(char: Char): boolean {
		if (!Number.isFinite(char)) {
			return false;
		}
		return this._tree.nodeOf(char) !== null;
	}
	hasEvery(chars: CharRange): boolean {
		checkRange(chars);
		const { min, max } = chars;

		// get nodes which contain min and max
		const minNode = this._tree.nodeOf(min);
		const maxNode = this._tree.nodeOf(max);

		if (minNode === null || maxNode === null) {
			return false;
		}

		// iterate all nodes from min to max and look for gaps
		let node: Node<T> = minNode;
		while (node !== maxNode) {
			// this cannot be null because maxNode
			const next = rightNeighbor(node)!;

			if (node.key.max + 1 !== next.key.min) {
				return false; // a gap
			}

			node = next;
		}

		return true;
	}
	hasSome(chars: CharRange): boolean {
		checkRange(chars);
		return this._tree.nodeInRange(chars) !== null;
	}

	get(char: Char): T | undefined {
		if (!Number.isFinite(char)) {
			return undefined; // char is NaN, Inf, or -Inf
		}
		const node = this._tree.nodeOf(char);
		return node ? node.value : undefined;
	}

	set(char: Char, value: T): void {
		checkChar(char);
		this._tree.deleteCharacter(char);
		this._tree.insert({ min: char, max: char }, value);
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
		this._tree.deleteRange(chars);
		this._tree.insert(chars, value);
	}

	delete(char: Char): boolean {
		if (!Number.isFinite(char)) {
			return false;
		}
		const result = this._tree.deleteCharacter(char);
		return result;
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
		this._tree.deleteRange(range);
	}

	map(mapFn: (value: T, chars: CharRange, map: ReadonlyCharMap<T>) => T): void {
		this._tree.map((r, v) => {
			return mapFn(v, r, this);
		});
	}
	mapRange(
		range: CharRange,
		mapFn: (value: T | undefined, chars: CharRange, map: ReadonlyCharMap<T>) => T | undefined
	): void {
		this._tree.mapWithGaps(range, (r, v) => {
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
		rec(this._tree.root);
	}
	*keys(): IterableIterator<CharRange> {
		for (const [key] of this.entries()) {
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
			let current = this._tree.leftmostNodeInRange(range);
			const end = this._tree.rightmostNodeInRange(range);
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

			if (this._tree.root) {
				stack.push({ leftDone: false, node: this._tree.root });
			}

			while (stack.length > 0) {
				const { leftDone, node } = stack.pop()!;

				if (leftDone || node.left === null) {
					const { key, value, right } = node;
					yield [key, value];
					if (right !== null) {
						stack.push({ leftDone: false, node: right });
					}
				} /* if (!leftDone && node.left !== null) */ else {
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

interface ReadonlyNode<T> {
	readonly key: CharRange;
	readonly value: T;

	readonly height: number;
	readonly parent: ReadonlyNode<T> | null;
	readonly left: ReadonlyNode<T> | null;
	readonly right: ReadonlyNode<T> | null;
}
interface Node<T> {
	key: CharRange;
	value: T;

	height: number;
	parent: Node<T> | null;
	left: Node<T> | null;
	right: Node<T> | null;
}

/**
 * Returns the right neighbor of the given node or `null` if the given node is the rightmost node in its tree.
 *
 * If a balanced tree, this takes at most _O(log n)_ time with an average of _O(1)_
 * (n = total number of nodes in the tree).
 *
 * @param node
 */
function rightNeighbor<T>(node: Node<T>): Node<T> | null;
function rightNeighbor<T>(node: ReadonlyNode<T>): ReadonlyNode<T> | null;
function rightNeighbor<T>(node: ReadonlyNode<T>): ReadonlyNode<T> | null {
	if (node.right) {
		// get the leftmost of the right sub-tree
		return leftmostNode(node.right);
	} else {
		let parent = node.parent;
		while (parent) {
			if (parent.left === node) {
				return parent;
			} else if (parent.right === node) {
				node = parent;
				parent = parent.parent;
			} else {
				throw new Error("Expected the node to be a child of its parent.");
			}
		}
		return null;
	}
}
/**
 * Returns the left neighbor of the given node or `null` if the given node is the leftmost node in its tree.
 *
 * If a balanced tree, this takes at most _O(log n)_ time with an average of _O(1)_
 * (n = total number of nodes in the tree).
 *
 * @param node
 */
function leftNeighbor<T>(node: Node<T>): Node<T> | null;
function leftNeighbor<T>(node: ReadonlyNode<T>): ReadonlyNode<T> | null;
function leftNeighbor<T>(node: ReadonlyNode<T>): ReadonlyNode<T> | null {
	if (node.left) {
		// get the rightmost of the left sub-tree
		return rightmostNode(node.left);
	} else {
		let parent = node.parent;
		while (parent) {
			if (parent.right === node) {
				return parent;
			} else if (parent.left === node) {
				node = parent;
				parent = parent.parent;
			} else {
				throw new Error("Expected the node to be a child of its parent.");
			}
		}
		return null;
	}
}

function leftmostNode<T>(root: Node<T>): Node<T>;
function leftmostNode<T>(root: ReadonlyNode<T>): ReadonlyNode<T>;
function leftmostNode<T>(root: ReadonlyNode<T>): ReadonlyNode<T> {
	while (root.left) {
		root = root.left;
	}
	return root;
}
function rightmostNode<T>(root: Node<T>): Node<T>;
function rightmostNode<T>(root: ReadonlyNode<T>): ReadonlyNode<T>;
function rightmostNode<T>(root: ReadonlyNode<T>): Node<T> {
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
function leftmostNodeInRange<T>(node: Node<T> | null, range: CharRange): Node<T> | null;
function leftmostNodeInRange<T>(node: ReadonlyNode<T> | null, range: CharRange): ReadonlyNode<T> | null;
function leftmostNodeInRange<T>(node: ReadonlyNode<T> | null, range: CharRange): ReadonlyNode<T> | null {
	if (node === null) {
		return null;
	}

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
function rightmostNodeInRange<T>(node: Node<T> | null, range: CharRange): Node<T> | null;
function rightmostNodeInRange<T>(node: ReadonlyNode<T> | null, range: CharRange): ReadonlyNode<T> | null;
function rightmostNodeInRange<T>(node: Node<T> | null, range: CharRange): Node<T> | null {
	if (node === null) {
		return null;
	}

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

function areAdjacent<T>(left: ReadonlyNode<T>, right: ReadonlyNode<T>): boolean {
	return left.key.max + 1 === right.key.min;
}
function areAdjacentRanges(left: CharRange, right: CharRange): boolean {
	return left.max + 1 === right.min;
}
function unionAdjacentRanges(left: CharRange, right: CharRange): CharRange {
	return { min: left.min, max: right.max };
}

// The basic AVL implementation is from here:
// https://www.codesdope.com/course/data-structures-avl-trees/
// This includes balancing, deletion of a single node, and the insertion of a single node
// (without the merging of adjacent nodes).

class AVLTree<T> {
	root: Node<T> | null = null;

	constructor(public readonly equalFn: (a: T, b: T) => boolean) {}

	validateTree(at: string): void {
		const prefix = `Invalid tree: ${at}`;
		if (this.root && this.root.parent) {
			throw new Error(prefix + ": The root element cannot have a parent.");
		}
		const rec = (node: ReadonlyNode<T> | null): number => {
			if (node) {
				if (node.left) {
					if (node.left.parent !== node) {
						throw new Error(prefix + ": Incorrect parent.");
					}
				}
				if (node.right) {
					if (node.right.parent !== node) {
						throw new Error(prefix + ": Incorrect parent.");
					}
				}

				const leftHeight = rec(node.left);
				const rightHeight = rec(node.right);
				if (Math.abs(leftHeight - rightHeight) >= 2) {
					throw new Error(prefix + ": The tree in unbalanced.");
				}

				const actualHeight = 1 + Math.max(leftHeight, rightHeight);
				if (node.height !== actualHeight) {
					throw new Error(prefix + ": Stored height is incorrect.");
				}
				return actualHeight;
			} else {
				return 0;
			}
		};
		rec(this.root);
	}

	/**
	 * Returns the node which contains the given character or `null` if no such node exists.
	 *
	 * @param char
	 */
	nodeOf(char: Char): Node<T> | null {
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

	private _mergeAdjacentLeft(key: CharRange, rightNode: Node<T>): void {
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
	private _mergeAdjacentRight(leftNode: Node<T>, key: CharRange): void {
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
		let parent: Node<T> | null = null;
		let temp: Node<T> | null = this.root;
		while (temp !== null) {
			parent = temp;
			if (key.max < parent.key.min) {
				temp = temp.left;
			} else if (parent.key.min < key.max) {
				temp = temp.right;
			} else {
				throw new Error("The inserted key has to be disjoint with all other keys.");
			}
		}

		if (parent !== null) {
			// check whether we can merge the current value with an existing node instead of creating a new one
			if (parent.key.max < key.min) {
				// [parent] [key]
				if (areAdjacentRanges(parent.key, key) && this.equalFn(parent.value, value)) {
					this._mergeAdjacentRight(parent, key);
					return;
				} else {
					const rightN = rightNeighbor(parent);
					if (rightN && areAdjacentRanges(key, rightN.key) && this.equalFn(value, rightN.value)) {
						// merge with right neighbor
						rightN.key = unionAdjacentRanges(key, rightN.key);
						return;
					}
				}
			} else {
				// [key] [parent]
				if (areAdjacentRanges(key, parent.key) && this.equalFn(value, parent.value)) {
					this._mergeAdjacentLeft(key, parent);
					return;
				} else {
					const leftN = leftNeighbor(parent);
					if (leftN && areAdjacentRanges(leftN.key, key) && this.equalFn(leftN.value, value)) {
						// merge with left neighbor
						leftN.key = unionAdjacentRanges(leftN.key, key);
						return;
					}
				}
			}
		}

		const n = newNode(key, value, parent);
		if (parent === null) {
			//newly added node is root
			this.root = n;
			return;
		} else if (n.key.max < parent.key.min) {
			parent.left = n;
		} else {
			parent.right = n;
		}

		let z: Node<T> = n;

		while (parent !== null) {
			updateHeight(parent);

			const x = parent.parent;
			if (x === null) {
				break;
			}

			if (balanceFactor(x) <= -2 || balanceFactor(x) >= 2) {
				//grandparent is unbalanced
				if (parent === x.left) {
					if (z === x.left.left) {
						//case 1
						rotateRight(this, x);
					} else if (z === x.left.right) {
						//case 3
						rotateLeft(this, parent);
						rotateRight(this, x);
					}
				} else if (parent === x.right) {
					if (z === x.right.right) {
						//case 2
						rotateLeft(this, x);
					} else if (z === x.right.left) {
						//case 4
						rotateRight(this, parent);
						rotateLeft(this, x);
					}
				}
				break;
			}
			parent = parent.parent;
			z = z.parent!;
		}
	}

	private _transplant(u: Node<T>, v: Node<T> | null): void {
		if (u.parent === null) {
			//u is root
			this.root = v;
		} else if (u === u.parent.left) {
			//u is left child
			u.parent.left = v;
		} else {
			//u is right child
			u.parent.right = v;
		}

		if (v !== null) {
			v.parent = u.parent;
		}
	}
	private _avlDeleteFixup(n: Node<T>): void {
		let p: Node<T> | null = n;

		while (p !== null) {
			updateHeight(p);

			if (balanceFactor(p) <= -2 || balanceFactor(p) >= 2) {
				//grandparent is unbalanced
				const x = p;
				let y: Node<T>, z: Node<T>;

				//taller child of x will be y
				if (height(x.left) > height(x.right)) {
					y = x.left!;
				} else {
					y = x.right!;
				}

				//taller child of y will be z
				if (height(y.left) > height(y.right)) {
					z = y.left!;
				} else if (height(y.left) < height(y.right)) {
					z = y.right!;
				} else {
					//same height, go for single rotation
					if (y === x.left) {
						z = y.left!;
					} else {
						z = y.right!;
					}
				}

				if (y === x.left) {
					if (z === x.left.left) {
						//case 1
						rotateRight(this, x);
					} else if (z === x.left.right) {
						//case 3
						rotateLeft(this, y);
						rotateRight(this, x);
					}
				} else if (y === x.right) {
					if (z === x.right.right) {
						//case 2
						rotateLeft(this, x);
					} else if (z === x.right.left) {
						//case 4
						rotateRight(this, y);
						rotateLeft(this, x);
					}
				}
			}
			p = p.parent;
		}
	}
	/**
	 * Detached the given node from the tree.
	 *
	 * This operation is guaranteed to uphold the __referential integrity__ of all nodes. This means that the `key` and
	 * `value` values of all nodes in the tree will be the same after this operation as before.
	 *
	 * @param z
	 */
	detachNode(z: Node<T>): void {
		if (z.left === null) {
			this._transplant(z, z.right);
			if (z.parent) {
				this._avlDeleteFixup(z.parent);
			}
		} else if (z.right === null) {
			this._transplant(z, z.left);
			if (z.parent) {
				this._avlDeleteFixup(z.parent);
			}
		} else {
			const y = leftmostNode(z.right); //leftmostNode element in right subtree
			let fixupStart = y;
			if (y.parent !== z) {
				fixupStart = y.parent!;
				this._transplant(y, y.right);
				y.right = z.right;
				y.right.parent = y;
			}
			this._transplant(z, y);
			y.left = z.left;
			y.left.parent = y;
			this._avlDeleteFixup(fixupStart);
		}
	}

	deleteCharacter(char: Char): boolean {
		const node = this.nodeOf(char);
		if (node) {
			const { min, max } = node.key;
			if (min !== char) {
				// [min char ...

				if (max !== char) {
					// [min char max]
					node.key = { min: node.key.min, max: char - 1 };
					this.insert({ min: char + 1, max: max }, node.value);
				} else {
					// [min char===max]
					node.key = { min: node.key.min, max: node.key.max - 1 };
				}
			} else if (max !== char) {
				// [min===char max]
				node.key = { min: node.key.min - 1, max: node.key.max };
			} else {
				// min === max === char
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

			if (min === rMin) {
				// there is nothing left of range.min
				if (max > rMax) {
					// [[min/rMin rMax] max]
					// we set min to remove the range without removing the node
					leftEdge.key = { min: rMax + 1, max: leftEdge.key.max };
					return;
				} else {
					// The left node has to be removed
					this.detachNode(leftEdge);
					if (max === rMax) {
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
				} else if (max === rMax) {
					// [min [rMin rMax/max]]
					return;
				} /* else {
					// [min <rMin max] rMax>
					// since [rMin max] has already been removed there's nothing to do here
				} */
			}

			if (min === rMin && max === rMax) {
				// we got lucky and found an exact match
				this.detachNode(leftEdge);
				return;
			}
		}

		let rightEdge = this.nodeOf(range.max);
		if (rightEdge) {
			const { max } = rightEdge.key;

			// we know that rightEdge can't include rMin because it would have been handled by leftEdge
			// [rMin [min ...

			if (max > rMax) {
				// [rMin <min rMax] max>
				rightEdge.key = { min: rMax + 1, max: rightEdge.key.max };
			} /* if (max === rMax) */ else {
				// [rMin [min rMax/max]]
				this.detachNode(rightEdge);
				rightEdge = null;
			}
		}

		// search and delete all node which are included by the range
		// since we handle the edge case already, all node are either completely in the range or not at all
		const toRemove: Node<T>[] = [];
		let current = this.leftmostNodeInRange(range);
		while (current) {
			toRemove.push(current);
			current = rightNeighbor(current);
		}

		toRemove.forEach(node => this.detachNode(node));
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

	private _applyModifications(mods: [Node<T>, T][]): void {
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
			} /* if (oldRange.min === range.min && range.max < oldRange.max) */ else {
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
			this._applyModifications(mod);
			ins.forEach(([range, v]) => this.insert(range, v));
		}
	}
}

function newNode<T>(key: CharRange, value: T, parent: Node<T> | null): Node<T> {
	return {
		key,
		value,
		parent,
		height: 1,
		left: null,
		right: null,
	};
}
function height<T>(n: ReadonlyNode<T> | null): number {
	return n?.height ?? 0;
}
function updateHeight<T>(n: Node<T>): void {
	n.height = 1 + Math.max(height(n.right), height(n.left));
}
function balanceFactor<T>(n: ReadonlyNode<T>): number {
	return height(n.left) - height(n.right);
}
function rotateLeft<T>(tree: AVLTree<T>, x: Node<T>): void {
	const y = x.right!;
	x.right = y.left;
	if (y.left !== null) {
		y.left.parent = x;
	}
	y.parent = x.parent;
	if (x.parent === null) {
		//x is root
		tree.root = y;
	} else if (x === x.parent.left) {
		//x is left child
		x.parent.left = y;
	} else {
		//x is right child
		x.parent.right = y;
	}
	y.left = x;
	x.parent = y;

	updateHeight(x);
	updateHeight(y);
}
function rotateRight<T>(tree: AVLTree<T>, x: Node<T>): void {
	const y = x.left!;
	x.left = y.right;
	if (y.right !== null) {
		y.right.parent = x;
	}
	y.parent = x.parent;
	if (x.parent === null) {
		//x is root
		tree.root = y;
	} else if (x === x.parent.right) {
		//x is left child
		x.parent.right = y;
	} else {
		//x is right child
		x.parent.left = y;
	}
	y.right = x;
	x.parent = y;

	updateHeight(x);
	updateHeight(y);
}
