import { Char, ReadonlyWord, Word } from "./char-types";
import { ReadonlyWordSet, WordSet } from "./word-set";
import { cachedFunc, debugAssert, traverse, traverseMultiRoot, withoutSet } from "./util";
import {
	FABuilder,
	FAIterator,
	FiniteAutomaton,
	NodeFactory,
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
import { wordSetsToWords } from "./words";

/**
 * A readonly {@link DFA}.
 */
export interface ReadonlyDFA extends FiniteAutomaton, TransitionIterable<DFA.ReadonlyNode> {
	/**
	 * The initial state of the DFA.
	 */
	readonly initial: DFA.ReadonlyNode;
	/**
	 * The set of final states of the DFA.
	 *
	 * This set may be empty or contain nodes not reachable from the initial state.
	 */
	readonly finals: ReadonlySet<DFA.ReadonlyNode>;

	stateIterator(): FAIterator<DFA.ReadonlyNode>;
	/**
	 * Yields all nodes reachable from the initial state including the initial state.
	 *
	 * This may include trap states, but it will not include unreachable final states.
	 *
	 * The order in which nodes will be returned is implementation defined and may change after any operation that
	 * modifies the DFA.
	 *
	 * Modifying the DFA while iterating will result in implementation-defined behavior. The implementation may stop the
	 * iteration or yield an nodes.
	 *
	 * This operation runs in _O(E + V)_ where _E_ is the number of nodes reachable from the initial state and _V_ is
	 * the number of transitions.
	 */
	nodes(): Iterable<DFA.ReadonlyNode>;

	/**
	 * Returns the number of nodes reachable from the initial state including the initial state.
	 *
	 * This returns the number of nodes returned by {@link nodes}.
	 */
	countNodes(): number;

	/**
	 * Creates a new DFA equivalent to this one.
	 */
	copy(factory?: NodeFactory<DFA.Node>): DFA;

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
	readonly initial: DFA.Node;
	readonly finals = new Set<DFA.Node>();
	readonly maxCharacter: Char;

	private constructor(initial: DFA.Node, finals: Set<DFA.Node>, maxCharacter: Char) {
		this.initial = initial;
		this.finals = finals;
		this.maxCharacter = maxCharacter;
	}

	get isEmpty(): boolean {
		return this.finals.size === 0;
	}
	get isFinite(): boolean {
		return Iter.languageIsFinite(this.stateIterator());
	}

	stateIterator(): FAIterator<DFA.ReadonlyNode> {
		const finals: ReadonlySet<DFA.ReadonlyNode> = this.finals;

		return {
			initial: this.initial,
			getOut: n => {
				const out = new Set<DFA.ReadonlyNode>();
				n.out.forEach(n => out.add(n));
				return out;
			},
			isFinal: n => finals.has(n),
		};
	}
	transitionIterator(): TransitionIterator<DFA.ReadonlyNode> {
		const finals: ReadonlySet<DFA.ReadonlyNode> = this.finals;
		const maximum = this.maxCharacter;

		return {
			initial: this.initial,
			getOut: n => n.out.invert(maximum),
			isFinal: n => finals.has(n),
		};
	}
	*nodes(): Iterable<DFA.Node> {
		const visited = new Set<DFA.Node>();
		let toVisit = [this.initial];
		while (toVisit.length > 0) {
			const newVisit: DFA.Node[] = [];
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

	countNodes(): number {
		let c = 0;
		traverse(this.initial, (n, queue) => {
			c++;
			queue.push(...n.out.values());
		});
		return c;
	}

	test(word: ReadonlyWord): boolean {
		let current = this.initial;

		for (const char of word) {
			const next = current.out.get(char);
			if (next === undefined) {
				return false;
			} else {
				current = next;
			}
		}

		return this.finals.has(current);
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
		return Iter.toString(this.transitionIterator(), cs => cs.toUnicodeString());
	}

	toRegex(options?: Readonly<ToRegexOptions>): NoParent<Expression> {
		return Iter.toRegex(this.transitionIterator(), options);
	}

	toDot(charSetToString?: (charSet: CharSet) => string): string {
		return Iter.toDot(this.transitionIterator(), {
			transitionToString: charSetToString || (cs => cs.toUnicodeString()),
		});
	}
	toMermaid(charSetToString?: (charSet: CharSet) => string): string {
		return Iter.toMermaid(this.transitionIterator(), {
			transitionToString: charSetToString || (cs => cs.toUnicodeString()),
		});
	}

	copy(factory: NodeFactory<DFA.Node> = new DFA.LimitedNodeFactory()): DFA {
		const { initial, finals } = factoryCopy(this, factory);
		return new DFA(initial, finals, this.maxCharacter);
	}

	structurallyEqual(other: ReadonlyDFA): boolean {
		if (this === other) {
			return true;
		}
		if (this.finals.size !== other.finals.size) {
			return false;
		}

		const visitedThisNodes = new Set<DFA.ReadonlyNode>();

		const thisFinals: ReadonlySet<DFA.ReadonlyNode> = this.finals;
		const otherFinals: ReadonlySet<DFA.ReadonlyNode> = other.finals;
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
		return isEqual(this.initial, other.initial);
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

		const getInSet = cachedFunc<DFA.Node, Set<DFA.Node>>(() => new Set());
		const reachableFromInitial: DFA.Node[] = [];

		traverse(this.initial, (node, queue) => {
			reachableFromInitial.push(node);
			getInSet(node);

			node.out.forEach(n => {
				queue.push(n);
				getInSet(n).add(node);
			});
		});

		debugAssert(getInSet.cache.has(this.initial));

		// Check condition 1) for all final states
		const toDelete: DFA.Node[] = [];
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
		const reachableFromFinal = new Set<DFA.Node>();
		traverseMultiRoot(this.finals, (node, queue) => {
			reachableFromFinal.add(node);
			queue.push(...getInSet(node));
		});

		// Check condition 2)
		if (reachableFromFinal.size < reachableFromInitial.length) {
			for (const node of reachableFromInitial) {
				node.out.filter(n => reachableFromFinal.has(n));
			}
		}
	}

	/**
	 * [Minimizes](https://en.wikipedia.org/wiki/DFA_minimization) this DFA.
	 */
	minimize(): void {
		this.removeUnreachable();
		if (this.initial.out.isEmpty) {
			return;
		}

		const P = findEquivalenceClasses(this, this.maxCharacter);

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
		const mappedFinals = [...this.finals].map(translate);
		this.finals.clear();
		mappedFinals.forEach(n => this.finals.add(n));
	}

	/**
	 * Complements this DFA.
	 *
	 * This DFA after calling this function will accept all words that are not accepted by this DFA before calling this
	 * function.
	 *
	 * This operation will create at most 1 node with the given factory.
	 *
	 * @param factory
	 */
	complement(factory: NodeFactory<DFA.Node> = DFA.nodeFactory): void {
		const all: CharRange = { min: 0, max: this.maxCharacter };

		// create a trap state
		const trap = factory.createNode();
		trap.link(trap, CharSet.all(this.maxCharacter));

		// Link all gaps to the trap state
		traverse(this.initial, (node, queue) => {
			queue.push(...node.out.values());
			node.out.mapRange(all, nodeOrUndef => nodeOrUndef ?? trap);
		});

		// Complement the set of final states.
		const nonFinal = withoutSet(this.nodes(), this.finals);
		this.finals.clear();
		nonFinal.forEach(n => this.finals.add(n));

		// one or more final states might have become trap states, so let's remove them
		this.removeUnreachable();
	}

	/**
	 * Modifies this DFA such that all prefixes of all accepted words are also accepted.
	 *
	 * If the language of this DFA is empty, then it will remain empty.
	 *
	 * Unreachable states will be removed by this operation.
	 */
	prefixes(): void {
		this.removeUnreachable();

		if (this.isEmpty) {
			return;
		}

		for (const node of this.nodes()) {
			this.finals.add(node);
		}
	}

	/**
	 * Creates a new DFA which matches no words. The language of the returned DFA is empty.
	 *
	 * This operation will create exactly 1 node with the given factory.
	 *
	 * @param options
	 * @param factory
	 */
	static empty(options: Readonly<DFA.Options>, factory: NodeFactory<DFA.Node> = DFA.nodeFactory): DFA {
		return new DFA(factory.createNode(), new Set(), options.maxCharacter);
	}

	/**
	 * Creates a new DFA which matches only the empty word.
	 *
	 * This operation will create exactly 1 node with the given factory.
	 *
	 * @param options
	 * @param factory
	 */
	static emptyWord(options: Readonly<DFA.Options>, factory: NodeFactory<DFA.Node> = DFA.nodeFactory): DFA {
		const initial = factory.createNode();
		return new DFA(initial, new Set([initial]), options.maxCharacter);
	}

	/**
	 * Creates a new DFA which matches all words.
	 *
	 * This operation will create exactly 1 node with the given factory.
	 *
	 * @param options
	 * @param factory
	 */
	static all(options: Readonly<DFA.Options>, factory: NodeFactory<DFA.Node> = DFA.nodeFactory): DFA {
		const initial = factory.createNode();
		initial.link(initial, CharSet.all(options.maxCharacter));
		return new DFA(initial, new Set([initial]), options.maxCharacter);
	}

	/**
	 * Creates a new DFA which matches the given characters.
	 *
	 * This operation will create at most 2 nodes with the given factory.
	 *
	 * @param charSet
	 * @param factory
	 */
	static fromCharSet(charSet: CharSet, factory: NodeFactory<DFA.Node> = DFA.nodeFactory): DFA {
		const initial = factory.createNode();

		if (charSet.isEmpty) {
			return new DFA(initial, new Set(), charSet.maximum);
		}

		const final = factory.createNode();
		initial.link(final, charSet);

		return new DFA(initial, new Set([final]), charSet.maximum);
	}

	/**
	 * Returns a new DFA which is equivalent to the intersection of the two given FA.
	 *
	 * @param left
	 * @param right
	 * @param factory
	 */
	static fromIntersection<L, R>(
		left: TransitionIterable<L>,
		right: TransitionIterable<R>,
		factory: NodeFactory<DFA.Node> = new DFA.LimitedNodeFactory()
	): DFA {
		MaxCharacterError.assert(left, right, "TransitionIterable");

		if (left instanceof DFA && right instanceof DFA) {
			// the intersection of two DFA is also a DFA, so we can directly construct it

			const builder = new DFA.Builder(factory);

			const iter = Iter.intersection(builder, left.transitionIterator(), right.transitionIterator());
			Iter.forEach(Iter.mapOut(iter, n => n.out.values()));

			return DFA.fromBuilder(builder, left);
		} else {
			// the intersection of two non-DFA is likely a NFA, so we have to make it deterministic.

			const iter = Iter.intersection(
				new Iter.MapFABuilder(),
				left.transitionIterator(),
				right.transitionIterator()
			);

			return DFA.fromTransitionIterator(iter, { maxCharacter: left.maxCharacter }, factory);
		}
	}

	/**
	 * Creates a new DFA which matches all and only all of the given words.
	 *
	 * @param words
	 * @param options
	 * @param factory
	 */
	static fromWords(
		words: Iterable<ReadonlyWord>,
		options: Readonly<DFA.Options>,
		factory: NodeFactory<DFA.Node> = new DFA.LimitedNodeFactory()
	): DFA {
		const { maxCharacter } = options;

		const builder = new DFA.Builder(factory);
		Iter.fromWords(builder, (node, char) => node.out.get(char), words, maxCharacter);

		return DFA.fromBuilder(builder, options);
	}

	/**
	 * Creates a new DFA which matches all and only all of the given word sets.
	 *
	 * @param wordSets
	 * @param options
	 * @param factory
	 */
	static fromWordSets(
		wordSets: Iterable<ReadonlyWordSet>,
		options: Readonly<DFA.Options>,
		factory: NodeFactory<DFA.Node> = new DFA.LimitedNodeFactory()
	): DFA {
		const { maxCharacter } = options;

		const builder = new DFA.Builder(factory);
		Iter.fromWordSets(builder, wordSets, maxCharacter);

		return DFA.fromBuilder(builder, options);
	}

	static fromFA<InputNode>(
		fa: TransitionIterable<InputNode>,
		factory: NodeFactory<DFA.Node> = new DFA.LimitedNodeFactory()
	): DFA {
		if (fa instanceof DFA) {
			const { initial, finals } = factoryCopy(fa, factory);
			return new DFA(initial, finals, fa.maxCharacter);
		} else {
			return DFA.fromTransitionIterator(fa.transitionIterator(), fa, factory);
		}
	}

	static fromTransitionIterator<InputNode>(
		iter: TransitionIterator<InputNode>,
		options: Readonly<DFA.Options>,
		factory: NodeFactory<DFA.Node> = new DFA.LimitedNodeFactory()
	): DFA {
		const builder = new DFA.Builder(factory);
		const deterministicIter = Iter.makeDeterministic(builder, iter);
		Iter.forEach(Iter.mapOut(deterministicIter, s => s.out.values()));

		return DFA.fromBuilder(builder, options);
	}

	static fromBuilder(builder: DFA.Builder, options: Readonly<DFA.Options>): DFA {
		return new DFA(builder.initial, builder.finals, options.maxCharacter);
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
		readonly out: ReadonlyCharMap<ReadonlyNode>;
	}
	export class Node implements ReadonlyNode {
		readonly out = new CharMap<Node>();

		link(to: Node, via: CharSet): void {
			this.out.setCharSet(via, to);
		}

		unlink(to: Node): void {
			this.out.filter(node => node !== to);
		}

		/**
		 * Unlinks all outgoing and incoming transitions of this node.
		 */
		unlinkAll(): void {
			this.out.clear();
		}
	}

	/**
	 * An unlimited node factory that will simply call the {@link Node} constructor.
	 */
	export const nodeFactory: NodeFactory<Node> = {
		createNode() {
			return new Node();
		},
	};

	export class LimitedNodeFactory implements NodeFactory<Node> {
		private _counter = 0;
		readonly limit: number;

		constructor(limit: number = 10_000) {
			this.limit = limit;
		}

		createNode(): Node {
			TooManyNodesError.assert(++this._counter, this.limit, "DFA");
			return new Node();
		}
	}

	export class Builder implements FABuilder<Node, CharSet> {
		readonly initial: Node;
		readonly finals = new Set<Node>();
		readonly factory: NodeFactory<Node>;

		constructor(factory: NodeFactory<Node>) {
			this.factory = factory;
			this.initial = factory.createNode();
		}

		makeFinal(state: Node): void {
			this.finals.add(state);
		}
		isFinal(state: Node): boolean {
			return this.finals.has(state);
		}
		linkNodes(from: Node, to: Node, transition: CharSet): void {
			from.link(to, transition);
		}
		createNode(): Node {
			return this.factory.createNode();
		}
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

interface SubGraph {
	readonly initial: DFA.Node;
	readonly finals: Set<DFA.Node>;
}
interface ReadonlySubGraph {
	readonly initial: DFA.ReadonlyNode;
	readonly finals: ReadonlySet<DFA.ReadonlyNode>;
}

function rangeEqual(r1: CharRange, r2: CharRange): boolean {
	return r1.min === r2.min && r1.max === r2.max;
}

function factoryCopy(source: ReadonlySubGraph, factory: NodeFactory<DFA.Node>): SubGraph {
	const initial = factory.createNode();
	const finals = new Set<DFA.Node>();

	const translate = cachedFunc<DFA.ReadonlyNode, DFA.Node>(() => factory.createNode());
	translate.cache.set(source.initial, initial);

	traverse(source.initial, (node, queue) => {
		const toNode = translate(node);

		node.out.forEach((n, range) => {
			queue.push(n);
			toNode.out.setRange(range, translate(n));
		});
	});

	source.finals.forEach(f => finals.add(translate(f)));

	return { initial, finals };
}

function findEquivalenceClasses(nodes: SubGraph, maxCharacter: Char): DFA.Node[][];
function findEquivalenceClasses(nodes: ReadonlySubGraph, maxCharacter: Char): DFA.ReadonlyNode[][];
function findEquivalenceClasses(nodes: ReadonlySubGraph, maxCharacter: Char): DFA.ReadonlyNode[][] {
	if (nodes.finals.size === 0) {
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
	traverse(nodes.initial, (node, queue) => {
		numberMap.set(node, numberMap.size);
		allNodes.push(node);

		const out = node.out.invert(maxCharacter);
		outMaps.push(out);
		out.forEach(cs => allCharacterSets.add(cs));
		queue.push(...out.keys());
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
	for (const f of nodes.finals) {
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
