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
		if (!Number.isFinite(char)) return false;
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

	mapRange(
		range: CharRange,
		mapFn: (value: T | undefined, chars: CharRange, map: CharMap<T>) => T | undefined
	): void {
		this.tree.mapWithGaps(range, (r, v) => {
			return mapFn(v, r, this);
		});
	}


	/**
	 * Invokes the given callback for every item of the character map.
	 *
	 * This method is implemented more efficiently than other iterator based methods, so chose `forEach` where every
	 * possible.
	 *
	 * @param callback
	 */
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
			if (parent.key.max < kMin) {
				// [parent] [key]
				if (parent.right) {
					parent = parent.right;
				} else {
					parent.right = {
						key, value, parent,
						balance: 0, height: parent.height + 1,
						left: null, right: null
					};
					this.rebalance(parent);
					break;
				}
			} else if (kMax < parent.key.min) {
				// [key] [parent]
				if (parent.left) {
					parent = parent.left;
				} else {
					parent.left = {
						key, value, parent,
						balance: 0, height: parent.height + 1,
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
					node.key = { min: node.key.min, max: char - 1 };
					this.insert({ min: char + 1, max: max }, node.value);
				} else {
					// [min char/max]
					node.key = { min: node.key.min, max: node.key.max - 1 };
				}
			} else if (max != char) {
				// [min/char max]
				node.key = { min: node.key.min - 1, max: node.key.max };
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
					leftEdge.key = { min: rMax + 1, max: leftEdge.key.max };
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
				rightEdge.key = { min: rMax + 1, max: rightEdge.key.max };
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

	mapWithGaps(range: CharRange, mapFn: (range: CharRange, value: T | undefined) => T | undefined): void {
		/**
		 * This function only makes modifications to the tree after the given map function has been called for every
		 * node and gap.
		 */

		const del: number[] = [];
		const mod: [number, T][] = [];
		const ins: [CharRange, T][] = [];

		function simpleGap(r: CharRange): void {
			if (r.min < range.min || r.max > range.max) {
				throw new RangeError("The range of the given gap is not within the mapping range.");
			}

			const mapRes = mapFn(r, undefined);
			if (mapRes !== undefined) {
				ins.push([r, mapRes]);
			}
		}
		function simpleNode(node: Node<T>): void {
			if (node.key.min < range.min || node.key.max > range.max) {
				throw new RangeError("The range of the given node is not within the mapping range.");
			}

			const mapRes = mapFn(node.key, node.value);
			if (mapRes === undefined) {
				del.push(node.key.min);
			} else if (mapRes !== node.value) {
				mod.push([node.key.min, mapRes]);
			}
		}

		const leftmost = this.leftmostNodeInRange(range);

		if (leftmost === null) {
			// the trivial case of the entire given range is empty
			const mapRes = mapFn(range, undefined);
			if (mapRes !== undefined) this.insert(range, mapRes);

			return;
		}
		if (leftmost.key.min <= range.min && range.max <= leftmost.key.max) {
			// [leftmost.min ... [range] ... leftmost.max]
			const mapRes = mapFn(range, leftmost.value);
			const oldRange = leftmost.key;
			const oldValue = leftmost.value;

			if (mapRes === oldValue) return; // nothing changed

			// left of range
			if (oldRange.min < range.min) leftmost.key = { min: oldRange.min, max: range.min - 1 };
			else this.deleteNode(leftmost);
			// range
			if (mapRes !== undefined) this.insert(range, mapRes);
			// right of range
			if (range.max < oldRange.max) this.insert({ min: range.max + 1, max: oldRange.max }, oldValue);

			return;
		}

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

		del.forEach(n => this.deleteNode(this.nodeOf(n)!));
		mod.forEach(([char, v]) => this.nodeOf(char)!.value = v);
		ins.forEach(([range, v]) => this.insert(range, v));
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
