import { Char, ReadonlyWord, Word } from "./char-types";
import { WordSet } from "./word-set";
import { cachedFunc, debugAssert, traverse, traverseMultiRoot, withoutSet } from "./util";
import {
	FABuilder,
	FACreationOptions,
	FAIterator,
	FiniteAutomaton,
	ToRegexOptions,
	TransitionIterable,
	TransitionIterator,
} from "./fa-types";
import { CharMap, ReadonlyCharMap } from "./char-map";
import { CharRange, CharSet } from "./char-set";
import { CharBase } from "./char-base";
import { Expression, NoParent } from "./ast";
import * as Iter from "./iter";
import { MaxCharacterError, TooManyNodesError } from "./errors";
import { getIntersectionWordSets, getIntersectionWords, isDisjointWith } from "./intersection";
import { wordSetsToWords } from "./words";

const DEFAULT_MAX_NODES = 10_000;

/**
 * A readonly {@link DFA}.
 */
export interface ReadonlyDFA extends FiniteAutomaton, TransitionIterable<DFA.ReadonlyNode> {
	readonly nodes: DFA.ReadonlyNodeList;
	readonly options: Readonly<DFA.Options>;

	stateIterator(): FAIterator<DFA.ReadonlyNode>;

	/**
	 * This is equivalent to `isDisjointWith(this, other, options)` (free function).
	 *
	 * @deprecated Use the equivalent free function instead.
	 */
	isDisjointWith<O>(other: TransitionIterable<O>, options?: Readonly<FACreationOptions>): boolean;
	/**
	 * This is equivalent to `getIntersectionWords(this, other, options)` (free function).
	 *
	 * @deprecated Use the equivalent free function instead.
	 */
	getIntersectionWords<O>(other: TransitionIterable<O>, options?: Readonly<FACreationOptions>): Iterable<Word>;
	/**
	 * This is equivalent to `getIntersectionWordSets(this, other, options)` (free function).
	 *
	 * @deprecated Use the equivalent free function instead.
	 */
	getIntersectionWordSets<O>(other: TransitionIterable<O>, options?: Readonly<FACreationOptions>): Iterable<WordSet>;

	/**
	 * Creates a new DFA equivalent to this one.
	 */
	copy(): DFA;

	/**
	 * Returns whether this and the given DFA are structurally equal meaning that all nodes and all transitions are
	 * equal.
	 *
	 * @param other
	 */
	structurallyEqual(other: ReadonlyDFA): boolean;
}

/**
 * A [deterministic finite automaton](https://en.wikipedia.org/wiki/Deterministic_finite_automaton).
 *
 * This class implements DFAs with the following properties:
 *
 * - There is exactly one initial state.
 *
 * - There may be any number of final states.
 *
 *   This is implemented using a `Set` of states.
 *
 * - No epsilon transitions.
 *
 * - A transitions always consumes a character.
 *
 *   (All character sets are guaranteed to be non-empty.)
 *
 * - Transitions are unordered.
 *
 *   As a consequence, `/aa|bb/` and `/bb|aa/` have the same state machine.
 *
 * - Between any two states, there can at most be one transition.
 */
export class DFA implements ReadonlyDFA {
	readonly nodes: DFA.NodeList;
	readonly maxCharacter: Char;

	private constructor(nodes: DFA.NodeList, maxCharacter: Char) {
		this.nodes = nodes;
		this.maxCharacter = maxCharacter;
	}

	get options(): Readonly<DFA.Options> {
		return { maxCharacter: this.maxCharacter };
	}

	get isEmpty(): boolean {
		return this.nodes.finals.size === 0;
	}
	get isFinite(): boolean {
		return Iter.languageIsFinite(this.stateIterator());
	}

	stateIterator(): FAIterator<DFA.ReadonlyNode> {
		return iterStates(this.nodes);
	}
	transitionIterator(): TransitionIterator<DFA.ReadonlyNode> {
		const finals: ReadonlySet<DFA.ReadonlyNode> = this.nodes.finals;
		const maximum = this.maxCharacter;

		return {
			initial: this.nodes.initial,
			getOut: n => n.out.invert(maximum),
			isFinal: n => finals.has(n),
		};
	}

	test(word: ReadonlyWord): boolean {
		let current = this.nodes.initial;

		for (const char of word) {
			const next = current.out.get(char);
			if (next === undefined) {
				return false;
			} else {
				current = next;
			}
		}

		return this.nodes.finals.has(current);
	}

	wordSets(): Iterable<WordSet> {
		if (this.isEmpty) {
			return [];
		}

		return Iter.iterateWordSets(this.transitionIterator());
	}

	words(): Iterable<Word> {
		return wordSetsToWords(this.wordSets());
	}

	toString(): string {
		return Iter.toString(this.transitionIterator(), cs => cs.toRangesString());
	}

	toRegex(options?: Readonly<ToRegexOptions>): NoParent<Expression> {
		return Iter.toRegex(this.transitionIterator(), options);
	}

	toDot(charSetToString?: (charSet: CharSet) => string): string {
		return Iter.toDot(
			this.transitionIterator(),
			Iter.createSimpleToDotOptions(charSetToString || (cs => cs.toRangesString()), false)
		);
	}

	/**
	 * This is equivalent to `isDisjointWith(this, other, options)` (free function).
	 *
	 * @deprecated Use the equivalent free function instead.
	 *
	 * @param other
	 * @param options
	 */
	isDisjointWith<O>(other: TransitionIterable<O>, options?: Readonly<FACreationOptions>): boolean {
		return isDisjointWith(this, other, options);
	}
	/**
	 * This is equivalent to `getIntersectionWords(this, other, options)` (free function).
	 *
	 * @deprecated Use the equivalent free function instead.
	 *
	 * @param other
	 * @param options
	 */
	getIntersectionWords<O>(other: TransitionIterable<O>, options?: Readonly<FACreationOptions>): Iterable<Word> {
		return getIntersectionWords(this, other, options);
	}
	/**
	 * This is equivalent to `getIntersectionWordSets(this, other, options)` (free function).
	 *
	 * @deprecated Use the equivalent free function instead.
	 *
	 * @param other
	 * @param options
	 */
	getIntersectionWordSets<O>(other: TransitionIterable<O>, options?: Readonly<FACreationOptions>): Iterable<WordSet> {
		return getIntersectionWordSets(this, other, options);
	}

	copy(): DFA {
		const newNodeList = new DFA.NodeList();
		copyTo(this.nodes, newNodeList);
		return new DFA(newNodeList, this.maxCharacter);
	}

	structurallyEqual(other: ReadonlyDFA): boolean {
		if (this === other) {
			return true;
		}
		if (this.nodes.finals.size !== other.nodes.finals.size) {
			return false;
		}

		const visitedThisNodes = new Set<DFA.ReadonlyNode>();

		const thisFinals: ReadonlySet<DFA.ReadonlyNode> = this.nodes.finals;
		const otherFinals: ReadonlySet<DFA.ReadonlyNode> = other.nodes.finals;
		const isEqual = (thisNode: DFA.ReadonlyNode, otherNode: DFA.ReadonlyNode): boolean => {
			if (visitedThisNodes.has(thisNode)) {
				return true;
			}
			visitedThisNodes.add(thisNode);

			if (thisFinals.has(thisNode) !== otherFinals.has(otherNode)) {
				return false;
			}

			const thisTransitions = [...thisNode.out];
			const otherTransitions = [...otherNode.out];

			if (thisTransitions.length !== otherTransitions.length) {
				return false;
			}

			for (let i = 0; i < thisTransitions.length; i++) {
				const [thisRange, thisTo] = thisTransitions[i];
				const [otherRange, otherTo] = otherTransitions[i];

				if (!rangeEqual(thisRange, otherRange) || !isEqual(thisTo, otherTo)) {
					return false;
				}
			}
			return true;
		};
		return isEqual(this.nodes.initial, other.nodes.initial);
	}

	/**
	 * [Minimizes](https://en.wikipedia.org/wiki/DFA_minimization) this DFA.
	 */
	minimize(): void {
		this.nodes.removeUnreachable();
		if (this.nodes.initial.out.isEmpty) {
			return;
		}

		const P = findEquivalenceClasses(this.nodes, this.maxCharacter);

		const mapping = new Map<DFA.Node, DFA.Node>();
		const toAdjust: DFA.Node[] = [];
		for (const eqClass of P) {
			const first: DFA.Node = eqClass[0];
			toAdjust.push(first);

			for (let i = 1; i < eqClass.length; i++) {
				const node = eqClass[i];
				if (mapping.has(node)) {
					throw new Error("Duplicate mapping");
				}
				mapping.set(node, first);
			}
		}

		if (mapping.size === 0) {
			// the DFA is already minimized
			return;
		}

		const translate = (node: DFA.Node): DFA.Node => {
			return mapping.get(node) ?? node;
		};

		// adjust nodes
		for (const node of toAdjust) {
			node.out.map(translate);
		}

		// adjust finals
		const mappedFinals = [...this.nodes.finals].map(translate);
		this.nodes.finals.clear();
		mappedFinals.forEach(n => this.nodes.finals.add(n));
	}

	/**
	 * Complements this DFA.
	 *
	 * This DFA after calling this function will accept all words that are not accepted by this DFA before calling this
	 * function.
	 */
	complement(): void {
		const all: CharRange = { min: 0, max: this.maxCharacter };

		// create a trap state
		const trap = this.nodes.createNode();
		this.nodes.linkNodes(trap, trap, CharSet.all(this.maxCharacter));

		// Link all gaps to the trap state
		traverse(this.nodes.initial, node => {
			const outNodes = new Set(node.out.values());
			node.out.mapRange(all, nodeOrUndef => nodeOrUndef ?? trap);
			return outNodes;
		});

		// Complement the set of final states.
		const nonFinal = withoutSet(Iter.iterateStates(iterStatesMut(this.nodes)), this.nodes.finals);
		this.nodes.finals.clear();
		nonFinal.forEach(n => this.nodes.finals.add(n));

		// one or more final states might have become trap states, so let's remove them
		this.nodes.removeUnreachable();
	}

	/**
	 * Modifies this DFA such that all prefixes of all accepted words are also accepted.
	 *
	 * If the language of this DFA is empty, then it will remain empty.
	 *
	 * Unreachable states will be removed by this operation.
	 */
	prefixes(): void {
		this.nodes.removeUnreachable();

		if (this.isEmpty) {
			return;
		}

		for (const node of this.nodes) {
			this.nodes.finals.add(node);
		}
	}

	/**
	 * Returns a new DFA which is equivalent to the intersection of the two given FA.
	 *
	 * @param left
	 * @param right
	 * @param options
	 */
	static fromIntersection<L, R>(
		left: TransitionIterable<L>,
		right: TransitionIterable<R>,
		options?: Readonly<DFA.CreationOptions>
	): DFA {
		MaxCharacterError.assert(left, right, "TransitionIterable");

		if (left instanceof DFA && right instanceof DFA) {
			// the intersection of two DFA is also a DFA, so we can directly construct it

			const nodeList = DFA.NodeList.withLimit(options?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
				const iter = Iter.intersection(nodeList, left.transitionIterator(), right.transitionIterator());

				// traverse the whole iterator to create our NodeList
				Iter.forEach(Iter.mapOut(iter, n => n.out.values()));

				// A cleanup still has to be performed because while all states are connected to the initial state, they
				// might not be able to reach a final state. This will remove such trap states.
				nodeList.removeUnreachable();
			});

			return new DFA(nodeList, left.maxCharacter);
		} else {
			// the intersection of two non-DFA is likely a NFA, so we have to make it deterministic.

			const iter = Iter.intersection(
				new Iter.MapFABuilder(),
				left.transitionIterator(),
				right.transitionIterator()
			);

			return DFA.fromTransitionIterator(iter, { maxCharacter: left.maxCharacter }, options);
		}
	}

	/**
	 * Creates a new DFA which matches no words. The language of the returned DFA is empty.
	 *
	 * @param options
	 */
	static empty(options: Readonly<DFA.Options>): DFA {
		const { maxCharacter } = options;
		const nodeList = new DFA.NodeList();
		return new DFA(nodeList, maxCharacter);
	}

	/**
	 * Creates a new DFA which matches all words.
	 *
	 * @param options
	 */
	static all(options: Readonly<DFA.Options>): DFA {
		const { maxCharacter } = options;
		const nodeList = new DFA.NodeList();
		nodeList.finals.add(nodeList.initial);

		const other = nodeList.createNode();
		nodeList.linkNodes(nodeList.initial, other, CharSet.all(maxCharacter));
		nodeList.linkNodes(other, other, CharSet.all(maxCharacter));
		nodeList.finals.add(other);

		return new DFA(nodeList, maxCharacter);
	}

	static fromWords(
		words: Iterable<ReadonlyWord>,
		options: Readonly<DFA.Options>,
		creationOptions?: Readonly<DFA.CreationOptions>
	): DFA {
		const { maxCharacter } = options;

		const nodeList = DFA.NodeList.withLimit(creationOptions?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
			// build a prefix trie
			for (const word of words) {
				let node = nodeList.initial;
				for (const char of word) {
					if (char > maxCharacter) {
						throw new Error(`All characters have to be <= options.maxCharacter (${maxCharacter}).`);
					}

					let next = node.out.get(char);
					if (next === undefined) {
						next = nodeList.createNode();
						nodeList.linkNodes(node, next, CharSet.fromCharacters(maxCharacter, [char]));
					}
					node = next;
				}
				nodeList.finals.add(node);
			}
		});

		return new DFA(nodeList, maxCharacter);
	}

	static fromFA<InputNode>(fa: TransitionIterable<InputNode>, creationOptions?: Readonly<DFA.CreationOptions>): DFA {
		if (fa instanceof DFA) {
			const nodeList = DFA.NodeList.withLimit(creationOptions?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
				copyTo(fa.nodes, nodeList);
			});
			return new DFA(nodeList, fa.maxCharacter);
		} else {
			return DFA.fromTransitionIterator(fa.transitionIterator(), fa, creationOptions);
		}
	}

	static fromTransitionIterator<InputNode>(
		iter: TransitionIterator<InputNode>,
		options: Readonly<DFA.Options>,
		creationOptions?: Readonly<DFA.CreationOptions>
	): DFA {
		const nodeList = DFA.NodeList.withLimit(creationOptions?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
			const deterministicIter = Iter.makeDeterministic(nodeList, iter);
			Iter.forEach(Iter.mapOut(deterministicIter, s => s.out.values()));
		});

		return new DFA(nodeList, options.maxCharacter);
	}
}

/**
 * A namespace for DFA-specific classes and interfaces.
 *
 * @see {@link DFA} (class)
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DFA {
	export interface ReadonlyNode {
		readonly list: ReadonlyNodeList;
		readonly out: ReadonlyCharMap<ReadonlyNode>;
	}
	export interface Node extends ReadonlyNode {
		readonly list: NodeList;
		readonly out: CharMap<Node>;
	}

	export interface ReadonlyNodeList extends Iterable<ReadonlyNode> {
		readonly initial: ReadonlyNode;
		readonly finals: ReadonlySet<ReadonlyNode>;
		/**
		 * Returns the number of nodes reachable from the initial state including the initial state.
		 *
		 * This may include trap states. This will not include unreachable final states.
		 *
		 * This operation has to traverse the whole graph and runs in _O(E + V)_.
		 */
		count(): number;
	}
	export class NodeList implements ReadonlyNodeList, Iterable<Node>, FABuilder<Node, CharSet> {
		private _nodeCounter: number = 0;
		private _nodeLimit: number = Infinity;

		readonly initial: Node;
		readonly finals: Set<Node> = new Set();

		constructor() {
			this.initial = this.createNode();
		}

		/**
		 * Creates and returns a new node list that is only allowed to create a certain number of nodes during the
		 * execution of the given consumer function.
		 *
		 * After this function returns, the limit no longer applies.
		 *
		 * @param maxNodes
		 * @param consumerFn
		 */
		static withLimit(maxNodes: number, consumerFn: (nodeList: NodeList) => void): NodeList {
			const nodeList = new NodeList();
			nodeList._nodeLimit = maxNodes;
			try {
				consumerFn(nodeList);
				nodeList._nodeLimit = Infinity;
			} catch (error) {
				nodeList._nodeLimit = Infinity;
				throw error;
			}
			return nodeList;
		}

		createNode(): Node {
			const id = this._nodeCounter++;
			TooManyNodesError.assert(id, this._nodeLimit, "DFA");

			const node: Node & { id: number } = {
				id, // for debugging
				list: this,
				out: new CharMap<Node>(),
			};
			return node;
		}

		linkNodes(from: Node, to: Node, characters: CharSet): void {
			if (from.list !== to.list) {
				throw new Error("You can't link nodes from different node lists.");
			}
			if (from.list !== this) {
				throw new Error("Use the node list associated with the nodes to link them.");
			}

			from.out.setCharSet(characters, to);
		}

		unlinkNodes(from: Node, to: Node): void {
			from.out.filter(node => node !== to);
		}

		makeFinal(state: Node): void {
			this.finals.add(state);
		}

		isFinal(state: Node): boolean {
			return this.finals.has(state);
		}

		removeUnreachable(): void {
			/**
			 * Remove all non-initial states which are
			 *
			 * 1) Not reachable from the initial state.
			 * 2) Cannot reach a final state.
			 *
			 * (For condition 1, we just have to check the final states.)
			 */

			if (this.finals.size === 0) {
				// clear all nodes
				this.initial.out.clear();
				return;
			}

			const getInSet = cachedFunc<Node, Set<Node>>(() => new Set());
			const reachableFromInitial: Node[] = [];

			traverse(this.initial, node => {
				reachableFromInitial.push(node);
				getInSet(node);

				const out = new Set<Node>();
				node.out.forEach(n => {
					out.add(n);
					getInSet(n).add(node);
				});

				return out;
			});

			debugAssert(getInSet.cache.has(this.initial));

			// Check condition 1) for all final states
			const toDelete: Node[] = [];
			for (const f of this.finals) {
				if (!getInSet.cache.has(f)) {
					toDelete.push(f);
				}
			}
			toDelete.forEach(f => this.finals.delete(f));

			if (this.finals.size === 0) {
				// clear all nodes
				this.initial.out.clear();
				return;
			}

			// Mark all states reachable from final states
			const reachableFromFinal = new Set<Node>();
			traverseMultiRoot(this.finals, node => {
				reachableFromFinal.add(node);
				return getInSet(node);
			});

			// Check condition 2)
			if (reachableFromFinal.size < reachableFromInitial.length) {
				for (const node of reachableFromInitial) {
					node.out.filter(n => reachableFromFinal.has(n));
				}
			}
		}

		count(): number {
			let c = 0;
			traverse(this.initial, n => {
				c++;
				return n.out.values();
			});
			return c;
		}

		*[Symbol.iterator](): IterableIterator<Node> {
			const visited = new Set<Node>();
			let toVisit = [this.initial];
			while (toVisit.length > 0) {
				const newVisit: Node[] = [];
				for (const node of toVisit) {
					if (!visited.has(node)) {
						visited.add(node);
						yield node;
						node.out.forEach(outNode => newVisit.push(outNode));
					}
				}
				toVisit = newVisit;
			}
		}
	}

	/**
	 * Options for the constraints on how a DFA will be created.
	 */
	export interface CreationOptions extends FACreationOptions {
		/**
		 * The maximum number of nodes the DFA creation operation is allowed to create before throwing a
		 * `TooManyNodesError`.
		 *
		 * If the maximum number of nodes is set to `Infinity`, the DFA creation operation may create as many nodes as
		 * necessary to construct the DFA. This might cause the machine to run out of memory. I.e. the conversion from
		 * NFA to DFA may create `O(2^n)` many nodes and an intersection may created `O(n * m)` many.
		 *
		 * Note: This limit describes the maximum number of __created__ nodes. If nodes are created and subsequently
		 * discard, they will still count toward the limit.
		 *
		 * @default 10000
		 */
		maxNodes?: number;
	}
	export interface Options {
		/**
		 * The maximum numerical value any character can have.
		 *
		 * This will be the maximum of all underlying {@link CharSet}s.
		 */
		maxCharacter: Char;
	}
}

function iterStates(list: DFA.ReadonlyNodeList): FAIterator<DFA.ReadonlyNode> {
	return {
		initial: list.initial,
		getOut: n => {
			const out = new Set<DFA.ReadonlyNode>();
			n.out.forEach(n => out.add(n));
			return out;
		},
		isFinal: n => list.finals.has(n),
	};
}
function iterStatesMut(list: DFA.NodeList): FAIterator<DFA.Node> {
	return {
		initial: list.initial,
		getOut: n => {
			const out = new Set<DFA.Node>();
			n.out.forEach(n => out.add(n));
			return out;
		},
		isFinal: n => list.finals.has(n),
	};
}

function rangeEqual(r1: CharRange, r2: CharRange): boolean {
	return r1.min === r2.min && r1.max === r2.max;
}

function copyTo(fromNodeList: DFA.ReadonlyNodeList, toNodeList: DFA.NodeList): void {
	const translate = cachedFunc<DFA.ReadonlyNode, DFA.Node>(() => toNodeList.createNode());
	translate.cache.set(fromNodeList.initial, toNodeList.initial);

	traverse(fromNodeList.initial, node => {
		const toNode = translate(node);

		const next = new Set<DFA.ReadonlyNode>();
		node.out.forEach((n, range) => {
			next.add(n);
			toNode.out.setRange(range, translate(n));
		});

		return next;
	});

	fromNodeList.finals.forEach(f => toNodeList.finals.add(translate(f)));
}

function findEquivalenceClasses(nodeList: DFA.NodeList, maxCharacter: Char): DFA.Node[][];
function findEquivalenceClasses(nodeList: DFA.ReadonlyNodeList, maxCharacter: Char): DFA.ReadonlyNode[][];
function findEquivalenceClasses(nodeList: DFA.ReadonlyNodeList, maxCharacter: Char): DFA.ReadonlyNode[][] {
	if (nodeList.finals.size === 0) {
		throw new Error("Cannot find equivalence classes for a DFA without final states.");
	}

	// This is an implementation of the paper:
	// Valmari, A. (2012). Fast brief practical DFA minimization. Inf. Process. Lett., 112, 213-217.
	// https://www.cs.cmu.edu/~sutner/CDM/papers/Valmari12.pdf

	// This methods only converts the given DFA into the right format for the algorithm in the paper.
	// The paper itself is implemented in the `DFAMinimizer` class.

	const allNodes: DFA.ReadonlyNode[] = [];
	const allCharacterSets = new Set<CharSet>();
	const numberMap = new Map<DFA.ReadonlyNode, MinState>();
	const outMaps: Map<DFA.ReadonlyNode, CharSet>[] = [];

	// Go through all nodes to:
	//  1. Determine all nodes
	//  2. Determine all used character sets
	//  3. Create the out map of all nodes
	traverse(nodeList.initial, node => {
		numberMap.set(node, numberMap.size);
		allNodes.push(node);

		const out = node.out.invert(maxCharacter);
		outMaps.push(out);
		out.forEach(cs => allCharacterSets.add(cs));
		return out.keys();
	});

	const base = new CharBase(allCharacterSets);

	const T: MinState[] = [];
	const L: Char[] = [];
	const H: MinState[] = [];
	for (let i = 0; i < allNodes.length; i++) {
		const out = outMaps[i];

		out.forEach((cs, to) => {
			const head = numberMap.get(to)!;

			for (const index of base.split(cs)) {
				T.push(i);
				L.push(index);
				H.push(head);
			}
		});
	}

	const finals: MinState[] = [];
	for (const f of nodeList.finals) {
		finals.push(numberMap.get(f)!);
	}

	// minimize
	const min = new DFAMinimizer(allNodes.length, finals, T, L, H);
	const blockPartition = min.getBlockPartition();

	// get equivalence classes
	const eqClasses: DFA.ReadonlyNode[][] = [];
	for (let i = 0; i < blockPartition.setCount; i++) {
		eqClasses.push([]);
	}
	for (let i = 0; i < allNodes.length; i++) {
		eqClasses[blockPartition.setIndex[i]].push(allNodes[i]);
	}

	return eqClasses;
}

type MinState = number & { __state?: never };

class WorkSet {
	readonly marked: number[] = [];
	readonly touched: number[] = [];
}

class Partition {
	readonly elements: number[] = [];
	readonly location: number[] = [];
	readonly setIndex: number[];
	readonly first: number[] = [];
	readonly past: number[] = [];
	readonly workSet: WorkSet;
	setCount: number = 1;

	constructor(elementCount: number, workSet: WorkSet) {
		this.setIndex = new Array(elementCount).fill(0);
		this.workSet = workSet;

		for (let i = 0; i < elementCount; i++) {
			this.elements.push(i);
			this.location.push(i);
		}

		this.first.push(0);
		this.past.push(elementCount);
	}

	mark(element: number): void {
		const set = this.setIndex[element];
		const i = this.location[element];
		const j = this.first[set] + this.workSet.marked[set];

		this.elements[i] = this.elements[j];
		this.location[this.elements[i]] = i;
		this.elements[j] = element;
		this.location[element] = j;

		if (!this.workSet.marked[set]++) {
			this.workSet.touched.push(set);
		}
	}

	split(): void {
		let set;
		while ((set = this.workSet.touched.pop()) !== undefined) {
			const p = this.first[set] + this.workSet.marked[set];
			if (p === this.past[set]) {
				this.workSet.marked[set] = 0;
				continue;
			}

			if (this.workSet.marked[set] <= this.past[set] - p) {
				this.first[this.setCount] = this.first[set];
				this.past[this.setCount] = p;
				this.first[set] = p;
			} else {
				this.past[this.setCount] = this.past[set];
				this.first[this.setCount] = p;
				this.past[set] = p;
			}

			for (let i = this.first[this.setCount]; i < this.past[this.setCount]; i++) {
				this.setIndex[this.elements[i]] = this.setCount;
			}

			this.workSet.marked[set] = 0;
			this.workSet.marked[this.setCount++] = 0;
		}
	}
}

class DFAMinimizer {
	readonly stateCount: number;
	readonly transitionCount: number;
	readonly finals: readonly MinState[];
	readonly tails: readonly MinState[];
	readonly chars: readonly Char[];
	readonly heads: readonly MinState[];

	private readonly _adjacent: number[];
	private readonly _offset: number[];

	constructor(
		statesCount: number,
		finals: readonly MinState[],
		tails: readonly MinState[],
		chars: readonly Char[],
		heads: readonly MinState[]
	) {
		debugAssert(statesCount > 0);
		debugAssert(finals.length > 0);
		debugAssert(tails.length === chars.length && chars.length === heads.length);
		debugAssert(tails.length > 0);

		this.stateCount = statesCount;
		this.transitionCount = tails.length;
		this.finals = finals;
		this.tails = tails;
		this.chars = chars;
		this.heads = heads;

		this._adjacent = new Array(this.transitionCount);
		this._offset = new Array(statesCount + 1).fill(0);
	}

	private _makeAdjacent(keys: readonly MinState[]): void {
		for (let trans = 0; trans < this.transitionCount; trans++) {
			this._offset[keys[trans]]++;
		}
		for (let state = 0; state < this.stateCount; state++) {
			this._offset[state + 1] += this._offset[state];
		}
		for (let trans = this.transitionCount; trans--; ) {
			this._adjacent[--this._offset[keys[trans]]] = trans;
		}
	}

	getBlockPartition(): Partition {
		const workSet = new WorkSet();
		const blocks = new Partition(this.stateCount, workSet);
		const cords = new Partition(this.transitionCount, workSet);

		// Move the final states
		let reachedStates = 0;
		for (const f of this.finals) {
			const i = blocks.location[f];
			if (i >= reachedStates) {
				blocks.elements[i] = blocks.elements[reachedStates];
				blocks.location[blocks.elements[i]] = i;
				blocks.elements[reachedStates] = f;
				blocks.location[f] = reachedStates++;
			}
		}

		// Make initial partition
		workSet.marked[0] = this.finals.length;
		workSet.touched.push(0);
		blocks.split();

		// Make transition partition
		cords.elements.sort((a, b) => this.chars[a] - this.chars[b]);
		cords.setCount = workSet.marked[0] = 0;
		let char = this.chars[cords.elements[0]];
		for (let i = 0; i < this.transitionCount; i++) {
			const trans = cords.elements[i];
			if (this.chars[trans] !== char) {
				char = this.chars[trans];
				cords.past[cords.setCount++] = i;
				cords.first[cords.setCount] = i;
				workSet.marked[cords.setCount] = 0;
			}
			cords.setIndex[trans] = cords.setCount;
			cords.location[trans] = i;
		}
		cords.past[cords.setCount++] = this.transitionCount;

		// Split blocks and cords
		this._makeAdjacent(this.heads);
		for (let b = 1, c = 0; c < cords.setCount; c++) {
			for (let i = cords.first[c]; i < cords.past[c]; i++) {
				blocks.mark(this.tails[cords.elements[i]]);
			}
			blocks.split();
			for (; b < blocks.setCount; b++) {
				for (let i = blocks.first[b]; i < blocks.past[b]; i++) {
					const state = blocks.elements[i];
					for (let j = this._offset[state]; j < this._offset[state + 1]; j++) {
						cords.mark(this._adjacent[j]);
					}
				}
				cords.split();
			}
		}

		return blocks;
	}
}
