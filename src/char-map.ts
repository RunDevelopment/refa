import { CharRange } from "./char-set";


function checkRange(range: CharRange): void {
	const { min, max } = range;

	if (min >= max) {
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


export class CharMap<T> implements Iterable<[CharRange, T]> {

	private tree: AVLTree<T> = new AVLTree<T>();

	get isEmpty(): boolean {
		return this.tree.root === null;
	}

	/**
	 * Returns whether the given character is a key in the map.
	 *
	 * @param char
	 */
	has(char: number): boolean {
		checkChar(char);
		return this.tree.nodeOf(char) !== null;
	}

	/**
	 * Returns whether every character in the given range is a key in the map.
	 *
	 * This is equivalent to: `[...chars].every(char => this.has(char))`.
	 *
	 * @param chars
	 */
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

	/**
	 * Returns whether some character in the given range is a key in the map.
	 *
	 * This is equivalent to: `[...chars].some(char => this.has(char))`.
	 *
	 * @param chars
	 */
	hasSome(chars: CharRange): boolean {
		checkRange(chars);
		return this.tree.nodeInRange(chars) !== null;
	}

	/**
	 * Returns the value associated with the given character of `undefined` if the character is not key in the map.
	 *
	 * @param char
	 */
	get(char: number): T | undefined {
		checkChar(char);
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


	forEach(callback: (value: T, chars: CharRange, map: CharMap<T>) => void): void {
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
	*entries(): IterableIterator<[CharRange, T]> {
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
	[Symbol.iterator](): IterableIterator<[CharRange, T]> {
		return this.entries();
	}

}


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


interface Node<T> {
	key: CharRange;
	value: T;

	balance: number;
	height: number;
	parent: Node<T> | null;
	left: Node<T> | null;
	right: Node<T> | null;
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


class AVLTree<T> {

	root: Node<T> | null = null;

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


	insert(key: CharRange, value: T): void {
		if (this.root == null) {
			this.root = {
				key, value, parent: null,
				balance: 0, height: 1,
				left: null, right: null
			};
			return;
		}

		const { min: kMin, max: kMax } = key;
		let parent: Node<T> = this.root;

		while (true) {
			const { min, max } = parent.key;
			if (max < kMin) {
				// [min max] [kMin kMax]
				if (parent.left) {
					parent = parent.left;
				} else {
					parent.left = {
						key, value, parent,
						balance: 0, height: 1,
						left: null, right: null
					};
					this.rebalance(parent);
					break;
				}
			} else if (kMax < min) {
				// [kMin kMax] [min max]
				if (parent.right) {
					parent = parent.right;
				} else {
					parent.right = {
						key, value, parent,
						balance: 0, height: 1,
						left: null, right: null
					};
					this.rebalance(parent);
					break;
				}
			} else {
				throw new Error("The inserted key has to be disjoint with all other keys.");
			}
		}
	}

	deleteNode(node: Node<T>): void {
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
			return;
		}

		const child = node.left != null ? rightmostNode(node.left) : leftmostNode(node.right!);
		node.key = child.key;
		node.value = child.value;
		this.deleteNode(child);
	}

	deleteCharacter(char: number): boolean {
		const node = this.nodeOf(char);
		if (node) {
			const { min, max } = node.key;
			if (min != char) {
				// [min char ...

				if (max != char) {
					// [min char max]
					node.key.max = char - 1;
					this.insert({ min: char + 1, max: max }, node.value);
				} else {
					// [min char/max]
					node.key.max--;
				}
			} if (max != char) {
				// [min/char max]
				node.key.min++;
			} else {
				// min == max == char
				this.deleteNode(node);
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
					leftEdge.key.min = rMax + 1;
					return;
				} else {
					// The left node has to be removed
					this.deleteNode(leftEdge);
					if (max == rMax) {
						return; // we got lucky and found an exact match, so we're done here
					}
				}
			} else {
				// some of the range of leftEdge is on the outside left of range
				// [min [rMin ...

				// the current leftEdge node will be set to the outside part...
				leftEdge.key.max = rMin - 1;

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
				this.deleteNode(leftEdge);
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
				rightEdge.key.min = rMax + 1;
			} else /* if (max == rMax) */ {
				// [rMin [min rMax/max]]
				this.deleteNode(rightEdge);
			}
		}

		// search and delete all node which are included by the range
		// since we handle the edge case already, all node are either completely in the range or not at all

		while (true) {
			const node = this.nodeInRange(range);
			if (node) {
				this.deleteNode(node);
			} else {
				break;
			}
		}
	}

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
