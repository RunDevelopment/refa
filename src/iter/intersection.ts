import { CharSet } from "../char-set";
import { ensureStableOut } from "./iterator";
import { FABuilder, FAIterator, TransitionIterator } from "../fa-types";

/**
 * A lazy intersection algorithm that will use the given FA builder to construct the intersection FA as the returned
 * iterator is used to traverse the FA.
 *
 * To construct the whole intersection FA, simply traverse the entire iterator.
 *
 * @param builder
 * @param left
 * @param right
 */
export function intersection<S, L, R>(
	builder: FABuilder<S, CharSet>,
	left: TransitionIterator<L>,
	right: TransitionIterator<R>
): FAIterator<S, S> {
	left = ensureStableOut(left);
	right = ensureStableOut(right);

	const leftToIndex = createIndexer<L>();
	const rightToIndex = createIndexer<R>();

	if (left.isFinal(left.initial) && right.isFinal(right.initial)) {
		builder.makeFinal(builder.initial);
	}

	// node pair translation
	type Tuple<L, R> = readonly [L, R];
	const indexBackTranslatorMap = new Map<S, Tuple<L, R>>();
	indexBackTranslatorMap.set(builder.initial, [left.initial, right.initial]);
	const indexTranslatorCache: Record<string, S | undefined> = {
		[`${leftToIndex(left.initial)};${rightToIndex(right.initial)}`]: builder.initial,
	};

	function translate(leftNode: L, rightNode: R): S {
		const leftKey = leftToIndex(leftNode);
		const rightKey = rightToIndex(rightNode);
		const key = "" + leftKey + ";" + rightKey;

		let node = indexTranslatorCache[key];
		if (node === undefined) {
			node = builder.createNode();
			indexTranslatorCache[key] = node;
			indexBackTranslatorMap.set(node, [leftNode, rightNode]);

			if (left.isFinal(leftNode) && right.isFinal(rightNode)) {
				builder.makeFinal(node);
			}
		}
		return node;
	}

	function translateBack(node: S): Tuple<L, R> {
		const tuple = indexBackTranslatorMap.get(node);
		if (tuple === undefined) {
			throw new Error("All created nodes have to be indexed.");
		}
		return tuple;
	}

	const intersect = createCharSetIntersectFn();

	// add edges

	function addOutgoing(from: S): void {
		const tuple = translateBack(from);
		const leftOut = left.getOut(tuple[0]);
		const rightOut = right.getOut(tuple[1]);

		for (const [leftTo, leftTransition] of leftOut) {
			for (const [rightTo, rightTransition] of rightOut) {
				const transition = intersect(leftTransition, rightTransition);
				if (transition) {
					builder.linkNodes(from, translate(leftTo, rightTo), transition);
				}
			}
		}
	}

	return {
		initial: builder.initial,
		getOut(node: S): S {
			addOutgoing(node);
			return node;
		},
		isFinal(node: S): boolean {
			return builder.isFinal(node);
		},
	};
}

const HASH_MASK = 0xffff;
function computeHash(a: CharSet): number {
	let hash = a.maximum & HASH_MASK;
	a.ranges.forEach(({ min, max }) => {
		hash = ((hash * 31 + min) ^ (max * 31)) & HASH_MASK;
	});
	return hash;
}
/**
 * Creates a function which can intersect any two char sets of the given set of character sets.
 *
 * The function return `null` if the intersection of two char sets is empty.
 */
function createCharSetIntersectFn(): (a: CharSet, b: CharSet) => CharSet | null {
	const hashTable: Record<number, CharSet | undefined> = {};
	const charSetIdMap = new Map<CharSet, number>();

	function getId(set: CharSet): number {
		let id = charSetIdMap.get(set);
		if (id === undefined) {
			let hash = computeHash(set);
			for (;;) {
				const entry = hashTable[hash];
				if (entry === undefined) {
					// make new entry
					hashTable[hash] = set;
					id = charSetIdMap.size;
					break;
				} else if (entry.equals(set)) {
					// same as previous set
					id = charSetIdMap.get(entry)!;
					break;
				} else {
					// handle hash collision
					hash = (hash + 1) & HASH_MASK;
				}
			}
			charSetIdMap.set(set, id);
		}
		return id;
	}

	// use the id of char sets to store pairs
	// null be represent empty char sets
	const intersectionCache: Record<string, CharSet | null | undefined> = {};

	return (a: CharSet, b: CharSet): CharSet | null => {
		const aId = getId(a);
		const bId = getId(b);

		// trivial
		if (aId == bId) {
			return a;
		}

		// since intersection is symmetric we don't care about the order
		let key;
		if (aId < bId) {
			key = "" + aId + ";" + bId;
		} else {
			key = "" + bId + ";" + aId;
		}

		let result: CharSet | null | undefined = intersectionCache[key];
		if (result === undefined) {
			result = a.intersect(b);
			if (result.isEmpty) {
				result = null;
			}
			intersectionCache[key] = result;
		}

		return result;
	};
}

function createIndexer<T>(): (value: T) => number {
	const map = new Map<T, number>();
	return (value: T): number => {
		let index = map.get(value);
		if (index === undefined) {
			index = map.size;
			map.set(value, index);
		}
		return index;
	};
}
