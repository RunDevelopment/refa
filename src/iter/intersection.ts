import { CharSet } from "../char-set";
import { ensureDeterministicOut } from "./iterator";
import { FAIterator, IntersectionOptions, TransitionIterator } from "../common-types";
import { TooManyNodesError } from "../errors";

/**
 * An FA builder has the responsibility of constructing a finite automata.
 *
 * The constructed FA is always owned by the builder.
 */
export interface FABuilder<S, T> {
	readonly initial: S;
	readonly finals: Set<S>;
	readonly createNode: (id: number) => S;
	readonly linkNodes: (from: S, to: S, transition: T) => void;
}

type TransitionMap = Map<TransitionMap, CharSet>;
/**
 * An FA builder that uses `Map` objects as nodes. Each node is the map of its outgoing transitions.
 */
export class TransitionMapBuilder implements FABuilder<TransitionMap, CharSet> {
	readonly initial: TransitionMap = new Map();
	readonly finals = new Set<TransitionMap>();
	createNode(): TransitionMap {
		return new Map();
	}
	linkNodes(from: TransitionMap, to: TransitionMap, transition: CharSet): void {
		const current = from.get(to);
		if (current === undefined) {
			from.set(to, transition);
		} else {
			from.set(to, current.union(transition));
		}
	}
}

/**
 * A lazy intersection algorithm that will use the given FA builder to construct the intersection FA as the returned
 * iterator is used to traverse the FA.
 *
 * To construct the whole intersection FA use:
 *
 * ```js
 * const iter = lazyIntersection(...);
 * faTraverse(faMapOut(iter, n => n.out.keys()));
 * ```
 *
 * @param builder
 * @param left
 * @param right
 * @param options
 */
export function intersection<S, L, R>(
	builder: FABuilder<S, CharSet>,
	left: TransitionIterator<L>,
	right: TransitionIterator<R>,
	options: undefined | Readonly<IntersectionOptions>
): FAIterator<S, S> {
	left = ensureDeterministicOut(left);
	right = ensureDeterministicOut(right);

	const maxNodes = options?.maxNodes ?? Infinity;

	const leftToIndex = createIndexer<L>();
	const rightToIndex = createIndexer<R>();

	const { initial, finals } = builder;

	if (left.isFinal(left.initial) && right.isFinal(right.initial)) {
		finals.add(initial);
	}

	// node pair translation
	type Tuple<L, R> = readonly [L, R];
	const indexBackTranslatorMap = new Map<S, Tuple<L, R>>();
	indexBackTranslatorMap.set(initial, [left.initial, right.initial]);
	const indexTranslatorCache: Record<string, S | undefined> = {
		[`${leftToIndex(left.initial)};${rightToIndex(right.initial)}`]: initial,
	};

	let createdNodes = 0;
	function translate(leftNode: L, rightNode: R): S {
		const leftKey = leftToIndex(leftNode);
		const rightKey = rightToIndex(rightNode);
		const key = "" + leftKey + ";" + rightKey;

		let node = indexTranslatorCache[key];
		if (node === undefined) {
			TooManyNodesError.assert(createdNodes, maxNodes, "intersection operation");
			createdNodes++;

			node = builder.createNode(createdNodes);
			indexTranslatorCache[key] = node;
			indexBackTranslatorMap.set(node, [leftNode, rightNode]);

			if (left.isFinal(leftNode) && right.isFinal(rightNode)) {
				finals.add(node);
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
		initial,
		getOut(node: S): S {
			addOutgoing(node);
			return node;
		},
		isFinal(node: S): boolean {
			return finals.has(node);
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
 *
 * @param charSets
 */
function createCharSetIntersectFn(): (a: CharSet, b: CharSet) => CharSet | null {
	const hashTable: Record<number, CharSet | undefined> = {};
	const charSetIdMap = new Map<CharSet, number>();

	function getId(set: CharSet): number {
		let id = charSetIdMap.get(set);
		if (id === undefined) {
			let hash = computeHash(set);
			while (true) {
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
