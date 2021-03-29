import { Concatenation, Quantifier, Element, NoParent, Expression } from "./ast";
import { CharSet } from "./char-set";
import { assertNever, cachedFunc, traverse } from "./util";
import {
	FiniteAutomaton,
	TransitionIterable,
	TransitionIterableFA,
	ToRegexOptions,
	FAIterator,
	TooManyNodesError,
	IntersectionOptions,
} from "./finite-automaton";
import { rangesToString, wordSetsToWords } from "./char-util";
import * as Iter from "./iter";
import { Char, ReadonlyWord, Word } from "./core-types";

/*
 * ####################################################################################################################
 * ###                                                                                                              ###
 * ###                                              I M P O R T A N T                                               ###
 * ###                                                                                                              ###
 * ####################################################################################################################
 *
 * Note regarding the normalization of node lists and sub lists:
 *
 * Every (sub) node list is normalized meaning that the initial node does not have incoming edges.
 * This simple property makes the implementation of all NFA operations efficient and almost trivial.
 *
 * ALL of the below operations assume that every given (sub) node list is normalized.
 */

const DEFAULT_MAX_NODES = 10_000;

export interface ReadonlyNFA extends TransitionIterableFA {
	readonly nodes: NFA.ReadonlyNodeList;
	readonly options: Readonly<NFA.Options>;

	stateIterator(): FAIterator<NFA.ReadonlyNode>;
	transitionIterator(): FAIterator<NFA.ReadonlyNode, ReadonlyMap<NFA.ReadonlyNode, CharSet>>;

	/**
	 * Create a mutable copy of this NFA.
	 */
	copy(): NFA;
}

/**
 * A [nondeterministic finite automaton](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton).
 *
 * This class implements epsilon-free NFAs.
 */
export class NFA implements ReadonlyNFA {
	readonly nodes: NFA.NodeList;
	readonly maxCharacter: Char;

	private constructor(nodes: NFA.NodeList, maxCharacter: Char) {
		this.nodes = nodes;
		this.maxCharacter = maxCharacter;
	}

	get options(): Readonly<NFA.Options> {
		return { maxCharacter: this.maxCharacter };
	}

	get isEmpty(): boolean {
		return this.nodes.finals.size === 0;
	}
	get isFinite(): boolean {
		return this.isEmpty || Iter.languageIsFinite(this.stateIterator());
	}

	stateIterator(): FAIterator<NFA.ReadonlyNode> {
		const initial: NFA.ReadonlyNode = this.nodes.initial;
		const finals: ReadonlySet<NFA.ReadonlyNode> = this.nodes.finals;
		return Iter.markPureOut({
			initial,
			getOut: n => n.out.keys(),
			isFinal: n => finals.has(n),
		});
	}
	transitionIterator(): FAIterator<NFA.ReadonlyNode, ReadonlyMap<NFA.ReadonlyNode, CharSet>> {
		const initial: NFA.ReadonlyNode = this.nodes.initial;
		const finals: ReadonlySet<NFA.ReadonlyNode> = this.nodes.finals;
		return Iter.markPureOut({
			initial,
			getOut: n => n.out,
			isFinal: n => finals.has(n),
		});
	}

	copy(): NFA {
		return NFA.fromFA(this);
	}

	test(word: ReadonlyWord): boolean {
		// An implementation of Thompson's algorithm as described by Russ Cox
		// https://swtch.com/~rsc/regexp/regexp1.html
		let currentStates = [this.nodes.initial];
		const newStatesSet = new Set<NFA.Node>();

		for (const char of word) {
			const newStates: NFA.Node[] = [];
			newStatesSet.clear();

			for (const state of currentStates) {
				state.out.forEach((charSet, to) => {
					if (charSet.has(char) && !newStatesSet.has(to)) {
						newStates.push(to);
						newStatesSet.add(to);
					}
				});
			}

			currentStates = newStates;
		}

		return currentStates.some(state => this.nodes.finals.has(state));
	}

	wordSets(): Iterable<CharSet[]> {
		return Iter.iterateWordSets(this.transitionIterator());
	}
	words(): Iterable<Word> {
		return wordSetsToWords(this.wordSets());
	}

	toString(): string {
		return Iter.toString(this.transitionIterator(), rangesToString);
	}

	toRegex(options?: Readonly<ToRegexOptions>): NoParent<Expression> {
		return Iter.toRegex(this.transitionIterator(), options);
	}

	toDot(charSetToString?: (charSet: CharSet) => string): string {
		return Iter.toDot(
			this.transitionIterator(),
			Iter.toDot.simpleOptions(charSetToString || rangesToString, false)
		);
	}

	isDisjointWith(other: TransitionIterable, options?: Readonly<IntersectionOptions>): boolean {
		checkCompatibility(this, other);

		const iter = Iter.intersection(
			new Iter.TransitionMapBuilder(),
			this.transitionIterator(),
			other.transitionIterator(),
			options
		);

		return !Iter.canReachFinal(Iter.mapOut(iter, n => n.keys()));
	}
	intersectionWordSets(other: TransitionIterable, options?: Readonly<IntersectionOptions>): Iterable<CharSet[]> {
		checkCompatibility(this, other);

		const iter = Iter.intersection(
			new Iter.TransitionMapBuilder(),
			this.transitionIterator(),
			other.transitionIterator(),
			options
		);

		return Iter.iterateWordSets(iter);
	}
	intersectionWords(other: TransitionIterable, options?: Readonly<IntersectionOptions>): Iterable<Word> {
		return wordSetsToWords(this.intersectionWordSets(other, options));
	}

	private _localCopy(other: TransitionIterable): SubList {
		if (other instanceof NFA) {
			return localCopy(this.nodes, other.nodes);
		} else {
			return localCopyOfIterator(this.nodes, other.transitionIterator());
		}
	}

	/**
	 * Modifies this NFA to accept all words from this NFA and the given FA.
	 *
	 * @param other
	 */
	union(other: TransitionIterable): void {
		if (other === this) {
			// do nothing
		} else {
			checkCompatibility(this, other);
			baseUnion(this.nodes, this.nodes, this._localCopy(other));
		}
	}

	/**
	 * Modifies this NFA to accept the concatenation of this NFA and the given FA.
	 *
	 * @param other
	 */
	append(other: TransitionIterable): void {
		if (this === other) {
			this.quantify(2, 2);
		} else {
			checkCompatibility(this, other);
			baseAppend(this.nodes, this.nodes, this._localCopy(other));
		}
	}

	/**
	 * Modifies this NFA to accept the concatenation of the given NFA and this FA.
	 *
	 * @param other
	 */
	prepend(other: TransitionIterable): void {
		if (this === other) {
			this.quantify(2, 2);
		} else {
			checkCompatibility(this, other);
			basePrepend(this.nodes, this.nodes, this._localCopy(other));
		}
	}

	/**
	 * Modifies this NFA to accept at least `min` and at most `max` concatenations of itself.
	 *
	 * Both `min` and `max` both have to be non-negative integers with `min <= max`.
	 * `max` is also allowed to be `Infinity`.
	 *
	 * @param min
	 * @param max
	 */
	quantify(min: number, max: number): void {
		if (!Number.isInteger(min) || !(Number.isInteger(max) || max === Infinity) || min < 0 || min > max) {
			throw new RangeError("min and max both have to be non-negative integers with min <= max.");
		}
		baseQuantify(this.nodes, this.nodes, min, max);
	}

	/**
	 * Removes the empty word from the accepted languages of this NFA.
	 */
	withoutEmptyWord(): void {
		this.nodes.finals.delete(this.nodes.initial);
	}

	/**
	 * Modifies this NFA such that all prefixes of all accepted words are also accepted.
	 *
	 * If the language of this NFA is empty, then it will remain empty.
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
	 * Modifies this NFA such that all suffixes of all accepted words are also accepted.
	 *
	 * If the language of this NFA is empty, then it will remain empty.
	 *
	 * Unreachable states will be removed by this operation.
	 */
	suffixes(): void {
		this.nodes.removeUnreachable();

		if (this.isEmpty) {
			return;
		}

		function inSet(node: NFA.Node): CharSet {
			let total: CharSet | undefined = undefined;

			node.in.forEach(set => {
				if (total === undefined) {
					total = set;
				} else {
					total = total.union(set);
				}
			});

			if (total === undefined) {
				throw new Error("The node doesn't have incoming transitions.");
			}
			return total;
		}

		const initial = this.nodes.initial;
		for (const node of this.nodes) {
			if (node !== initial) {
				const set = inSet(node);
				this.nodes.linkNodes(initial, node, set);
			}
		}
		this.nodes.finals.add(initial);
	}

	/**
	 * Modifies this NFA such that it accepts the reverse of all words it currently accepts.
	 *
	 * If the language of this NFA is empty, then it will remain empty.
	 *
	 * Unreachable states will be removed by this operation.
	 */
	reverse(): void {
		this.nodes.removeUnreachable();
		baseReverse(this.nodes, this.nodes);
	}

	/**
	 * Returns a new NFA which is equivalent to the intersection of the two given FA.
	 *
	 * @param left
	 * @param right
	 * @param options
	 */
	static fromIntersection(
		left: TransitionIterable,
		right: TransitionIterable,
		options?: Readonly<IntersectionOptions & NFA.CreationOptions>
	): NFA {
		checkCompatibility(left, right);

		const nodeList = NFA.NodeList.withLimit(options?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
			const iter = Iter.intersection(nodeList, left.transitionIterator(), right.transitionIterator(), options);

			// traverse the whole iterator to create our NodeList
			Iter.traverse(Iter.mapOut(iter, n => n.out.keys()));

			// A cleanup still has to be performed because while all states are connected to the initial state, they might
			// not be able to reach a final state. This will remove such trap states.
			nodeList.removeUnreachable();

			// Try to merge as many final states as possible. This won't greatly reduce the overall number of states but
			// having less final states will make a lot of the NFA operations more efficient.
			baseOptimizationReuseFinalStates(nodeList, nodeList);
		});

		return new NFA(nodeList, left.maxCharacter);
	}

	/**
	 * Creates a new NFA which matches no words. The language of the returned NFA is empty.
	 *
	 * @param options
	 */
	static empty(options: Readonly<NFA.Options>): NFA {
		const nodeList = new NFA.NodeList();
		return new NFA(nodeList, options.maxCharacter);
	}

	/**
	 * Creates a new NFA which matches all words.
	 *
	 * @param options
	 */
	static all(options: Readonly<NFA.Options>): NFA {
		const nodeList = new NFA.NodeList();
		nodeList.finals.add(nodeList.initial);

		const allChars = CharSet.all(options.maxCharacter);
		const other = nodeList.createNode();
		nodeList.linkNodes(nodeList.initial, other, allChars);
		nodeList.linkNodes(other, other, allChars);
		nodeList.finals.add(other);

		return new NFA(nodeList, options.maxCharacter);
	}

	static fromRegex(
		concat: NoParent<Concatenation>,
		options: Readonly<NFA.Options>,
		creationOptions?: Readonly<NFA.FromRegexOptions>
	): NFA;
	static fromRegex(
		expression: NoParent<Expression>,
		options: Readonly<NFA.Options>,
		creationOptions?: Readonly<NFA.FromRegexOptions>
	): NFA;
	static fromRegex(
		alternatives: readonly NoParent<Concatenation>[],
		options: Readonly<NFA.Options>,
		creationOptions?: Readonly<NFA.FromRegexOptions>
	): NFA;
	static fromRegex(
		value: NoParent<Concatenation> | NoParent<Expression> | readonly NoParent<Concatenation>[],
		options: Readonly<NFA.Options>,
		creationOptions?: Readonly<NFA.FromRegexOptions>
	): NFA {
		let nodeList: NFA.NodeList;
		if (Array.isArray(value)) {
			nodeList = createNodeList(value as readonly NoParent<Concatenation>[], options, creationOptions || {});
		} else {
			const node = value as NoParent<Expression> | NoParent<Concatenation>;
			if (node.type === "Concatenation") {
				nodeList = createNodeList([node], options, creationOptions || {});
			} else {
				nodeList = createNodeList(node.alternatives, options, creationOptions || {});
			}
		}
		return new NFA(nodeList, options.maxCharacter);
	}

	/**
	 * Creates a new NFA which matches all and only all of the given words.
	 *
	 * @param words
	 * @param options
	 * @param creationOptions
	 */
	static fromWords(
		words: Iterable<ReadonlyWord>,
		options: Readonly<NFA.Options>,
		creationOptions?: Readonly<NFA.CreationOptions>
	): NFA {
		const { maxCharacter } = options;
		const nodeList = NFA.NodeList.withLimit(creationOptions?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
			function getNext(node: NFA.Node, char: Char): NFA.Node {
				if (char > maxCharacter) {
					throw new Error(`All characters have to be <= options.maxCharacter (${maxCharacter}).`);
				}
				if (!Number.isInteger(char)) {
					throw new Error(`All characters have to be integers, ${char} is not.`);
				}

				for (const [to, chars] of node.out) {
					if (chars.has(char)) {
						return to;
					}
				}

				const newNode = nodeList.createNode();
				const charSet = CharSet.empty(maxCharacter).union([{ min: char, max: char }]);
				nodeList.linkNodes(node, newNode, charSet);

				return newNode;
			}

			// build a prefix trie
			for (const word of words) {
				let node = nodeList.initial;
				for (const charCode of word) {
					node = getNext(node, charCode);
				}
				nodeList.finals.add(node);
			}

			baseOptimizationReuseFinalStates(nodeList, nodeList);
			baseOptimizationMergeSuffixes(nodeList, nodeList);
		});

		return new NFA(nodeList, maxCharacter);
	}

	static fromFA(fa: TransitionIterable, creationOptions?: Readonly<NFA.CreationOptions>): NFA {
		return NFA.fromTransitionIterator(fa.transitionIterator(), { maxCharacter: fa.maxCharacter }, creationOptions);
	}

	static fromTransitionIterator<InputNode>(
		iter: FAIterator<InputNode, ReadonlyMap<InputNode, CharSet>>,
		options: Readonly<NFA.Options>,
		creationOptions?: Readonly<NFA.CreationOptions>
	): NFA {
		const { maxCharacter } = options;
		const nodeList = NFA.NodeList.withLimit(creationOptions?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
			const translate = cachedFunc<InputNode, NFA.Node>(() => nodeList.createNode());
			translate.cache.set(iter.initial, nodeList.initial);

			traverse(iter.initial, node => {
				const transNode = translate(node);

				if (iter.isFinal(node)) {
					nodeList.finals.add(transNode);
				}

				const out = iter.getOut(node);
				out.forEach((charSet, outDfaNode) => {
					if (charSet.maximum !== maxCharacter) {
						throw new Error("Some character sets do not conform to the given maximum.");
					}
					nodeList.linkNodes(transNode, translate(outDfaNode), charSet);
				});
				return out.keys();
			});
		});

		return new NFA(nodeList, maxCharacter);
	}
}

/**
 * A namespace for NFA-specific classes and interfaces.
 *
 * @see {@link NFA} (class)
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NFA {
	export interface ReadonlyNode {
		readonly list: ReadonlyNodeList;
		readonly out: ReadonlyMap<ReadonlyNode, CharSet>;
		readonly in: ReadonlyMap<ReadonlyNode, CharSet>;
	}
	export interface Node extends ReadonlyNode {
		readonly list: NodeList;
		readonly out: Map<Node, CharSet>;
		readonly in: Map<Node, CharSet>;
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
	export class NodeList implements ReadonlyNodeList, Iterable<Node> {
		private _nodeCounter: number = 0;
		private _nodeLimit: number = Infinity;

		/**
		 * The initial state of this list.
		 *
		 * The initial state is fixed an cannot be changed or removed.
		 */
		readonly initial: Node;
		/**
		 * The set of final states of this list.
		 */
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

		/**
		 * Creates a new node associated with this node list.
		 */
		createNode(): Node {
			const id = this._nodeCounter++;
			if (id > this._nodeLimit) {
				throw new TooManyNodesError(`The NFA is not allowed to create more than ${this._nodeLimit} nodes.`);
			}

			const node: Node & { id: number } = {
				id, // for debugging
				list: this,
				out: new Map(),
				in: new Map(),
			};
			return node;
		}

		/**
		 * Adds a transition from `from` to `to` using the given non-empty set of characters.
		 *
		 * If two nodes are already linked, the character sets will be combined.
		 *
		 * @param from
		 * @param to
		 * @param characters
		 */
		linkNodes(from: Node, to: Node, characters: CharSet): void {
			if (from.list !== to.list) {
				throw new Error("You can't link nodes from different node lists.");
			}
			if (from.list !== this) {
				throw new Error("Use the node list associated with the nodes to link them.");
			}
			if (characters.isEmpty) {
				throw new Error("You can't link nodes with the empty character set.");
			}

			linkNodesAddImpl(from.out, to, characters);
			linkNodesAddImpl(to.in, from, characters);
		}

		/**
		 * Removes the transition from `from` to `to`.
		 *
		 * If there is no transition from `from` to `to`, an error will be thrown.
		 *
		 * @param from
		 * @param to
		 */
		unlinkNodes(from: Node, to: Node): void {
			if (from.list !== to.list) {
				throw new Error("You can't link nodes from different node lists.");
			}
			if (from.list !== this) {
				throw new Error("Use the node list associated with the nodes to link them.");
			}

			if (!from.out.has(to)) {
				throw new Error("Can't unlink nodes which aren't linked.");
			}

			from.out.delete(to);
			to.in.delete(from);
		}

		/**
		 * All states which cannot be reached from the initial state or cannot reach (or are) a final state, will be
		 * removed.
		 */
		removeUnreachable(): void {
			const makeEmpty = (): void => {
				this.finals.clear();
				this.initial.in.clear();
				this.initial.out.clear();
			};

			if (this.finals.size === 0) {
				makeEmpty();
				return;
			}

			const removeNode = (node: Node): void => {
				if (node === this.initial) {
					throw new Error("Cannot remove the initial state.");
				}

				this.finals.delete(node);
				for (const outgoing of node.out.keys()) {
					this.unlinkNodes(node, outgoing);
				}
				for (const incoming of node.in.keys()) {
					this.unlinkNodes(incoming, node);
				}
			};

			// 1) Get all nodes
			const allNodes = new Set<Node>(this.finals);
			traverse(this.initial, node => {
				allNodes.add(node);
				return [...node.in.keys(), ...node.out.keys()];
			});

			// 2) Get all nodes reachable from the initial state
			const reachableFromInitial = new Set<Node>();
			traverse(this.initial, node => {
				reachableFromInitial.add(node);
				return node.out.keys();
			});

			// 3) Remove all final nodes which aren't reachable from the initial node
			allNodes.forEach(node => {
				if (!reachableFromInitial.has(node)) {
					removeNode(node);
				}
			});

			// 4) We may not have any final states left
			if (this.finals.size === 0) {
				makeEmpty();
				return;
			}

			// 5) Get all nodes which can reach a final state
			const canReachFinal = new Set<Node>();
			for (const final of this.finals) {
				traverse(final, node => {
					if (canReachFinal.has(node)) {
						return [];
					}
					canReachFinal.add(node);

					return node.in.keys();
				});
			}

			// 6) Remove all nodes which can't reach a final node
			reachableFromInitial.forEach(node => {
				if (!canReachFinal.has(node)) {
					removeNode(node);
				}
			});
		}

		count(): number {
			let c = 0;
			traverse(this.initial, n => {
				c++;
				return n.out.keys();
			});
			return c;
		}

		[Symbol.iterator](): Iterator<Node> {
			return Iter.iterateStates({
				initial: this.initial,
				getOut: state => state.out.keys(),
				isFinal: state => this.finals.has(state),
			})[Symbol.iterator]();
		}
	}

	/**
	 * Options for the constraints on how a NFA will be created.
	 */
	export interface CreationOptions {
		/**
		 * The maximum number of nodes the NFA creation operation is allowed to create before throwing a
		 * `TooManyNodesError`.
		 *
		 * If the maximum number of nodes is set to `Infinity`, the NFA creation operation may create as many nodes as
		 * necessary to construct the NFA. This might cause the machine to run out of memory. I.e. some REs can only be
		 * represented with a huge number of states (e.g `/a{123456789}/`).
		 *
		 * Note: This limit describes maximum number of __created__ nodes. If nodes are created and subsequently
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
	export interface FromRegexOptions extends CreationOptions {
		/**
		 * How to handle assertions when construction the NFA.
		 *
		 * - `"throw"`
		 *
		 *   This method will throw an error when encountering an assertion.
		 *
		 * - `"disable"`
		 *
		 *   This method will replace any assertion with an empty character class, effectively removing it.
		 *
		 * @default "throw"
		 */
		assertions?: "disable" | "throw";
		/**
		 * The number at which the maximum of a quantifier will be assumed to be infinity.
		 *
		 * Quantifiers with a large finite maximum (e.g. `a{1,10000}`) can create huge NFAs with thousands of states.
		 * Any Quantifier with a maximum greater or equal to this threshold will be assumed to be infinite.
		 *
		 * @default Infinity
		 */
		infinityThreshold?: number;
	}
}

/**
 * The actual implementation of the linkNodes function.
 *
 * @param map
 * @param to
 * @param characters
 */
function linkNodesAddImpl(map: Map<NFA.Node, CharSet>, to: NFA.Node, characters: CharSet): void {
	const current = map.get(to);
	if (current === undefined) {
		map.set(to, characters);
	} else {
		map.set(to, current.union(characters));
	}
}

interface SubList {
	readonly initial: NFA.Node;
	readonly finals: Set<NFA.Node>;
}
interface ReadonlySubList {
	readonly initial: NFA.ReadonlyNode;
	readonly finals: ReadonlySet<NFA.ReadonlyNode>;
}

function createNodeList(
	expression: readonly NoParent<Concatenation>[],
	options: Readonly<NFA.Options>,
	creationOptions: Readonly<NFA.FromRegexOptions>
): NFA.NodeList {
	const infinityThreshold: number = creationOptions.infinityThreshold || Infinity;

	return NFA.NodeList.withLimit(creationOptions.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
		baseReplaceWith(nodeList, nodeList, handleAlternation(expression));

		// All sub lists guarantee that the initial node has no incoming edges.

		function handleAlternation(alternatives: readonly NoParent<Concatenation>[]): SubList {
			if (alternatives.length === 0) {
				return { initial: nodeList.createNode(), finals: new Set<NFA.Node>() };
			}

			const base = handleConcatenation(alternatives[0]);
			for (let i = 1, l = alternatives.length; i < l; i++) {
				baseUnion(nodeList, base, handleConcatenation(alternatives[i]));
			}

			return base;
		}

		function handleConcatenation(concatenation: NoParent<Concatenation>): SubList {
			const elements = concatenation.elements;

			const base: SubList = { initial: nodeList.createNode(), finals: new Set<NFA.Node>() };

			// check for trivial cases first
			for (let i = 0, l = elements.length; i < l; i++) {
				const element = elements[i];
				if (element.type === "Assertion") {
					if (creationOptions.assertions === "disable") {
						return base;
					} else {
						throw new Error("Assertions are not supported yet.");
					}
				} else if (element.type === "CharacterClass") {
					if (element.characters.isEmpty) {
						return base;
					}
				}
			}

			base.finals.add(base.initial);

			for (let i = 0, l = elements.length; i < l; i++) {
				if (base.finals.size === 0) {
					// Since base is the empty language, concatenation has no effect, so let's stop early
					break;
				}

				handleElement(elements[i], base);
			}

			return base;
		}

		function handleQuantifier(quant: NoParent<Quantifier>): SubList {
			const base = handleAlternation(quant.alternatives);
			let max = quant.max;
			if (max >= infinityThreshold) {
				max = Infinity;
			}
			baseQuantify(nodeList, base, quant.min, max);
			return base;
		}

		function handleElement(element: NoParent<Element>, base: SubList): void {
			switch (element.type) {
				case "Alternation":
					baseAppend(nodeList, base, handleAlternation(element.alternatives));
					break;

				case "Assertion":
					if (creationOptions.assertions === "disable") {
						baseMakeEmpty(nodeList, base);
						break;
					} else {
						throw new Error("Assertions are not supported yet.");
					}

				case "CharacterClass": {
					const chars = element.characters;
					if (chars.maximum !== options.maxCharacter) {
						throw new Error(`The maximum of all character sets has to be ${options.maxCharacter}.`);
					}

					if (chars.isEmpty) {
						// the whole concatenation can't go anywhere
						baseMakeEmpty(nodeList, base);
					} else {
						// we know that base.final isn't empty, so just link all former finals to a new final node
						const s = nodeList.createNode();
						base.finals.forEach(f => nodeList.linkNodes(f, s, chars));
						base.finals.clear();
						base.finals.add(s);
					}
					break;
				}
				case "Quantifier":
					if (element.max > 0) {
						baseAppend(nodeList, base, handleQuantifier(element));
					}
					break;

				default:
					throw assertNever(element);
			}
		}
	});
}

function checkCompatibility(a: FiniteAutomaton | TransitionIterable, b: FiniteAutomaton | TransitionIterable): void {
	if (a.maxCharacter !== b.maxCharacter) {
		throw new RangeError("Both NFAs have to have the same max character.");
	}
}

/**
 * Creates a copy of `toCopy` in the given node list returning the created sub NFA.
 *
 * @param nodeList
 * @param toCopy
 */
function localCopy(nodeList: NFA.NodeList, toCopy: ReadonlySubList): SubList {
	return localCopyOfIterator(nodeList, {
		initial: toCopy.initial,
		getOut: n => n.out,
		isFinal: n => toCopy.finals.has(n),
	});
}
function localCopyOfIterator<T>(nodeList: NFA.NodeList, iter: FAIterator<T, ReadonlyMap<T, CharSet>>): SubList {
	const initial = nodeList.createNode();
	const finals = new Set<NFA.Node>();

	const translate = cachedFunc<T, NFA.Node>(() => nodeList.createNode());
	translate.cache.set(iter.initial, initial);

	traverse(iter.initial, node => {
		const trans = translate(node);

		if (iter.isFinal(node)) {
			finals.add(trans);
		}

		const out = iter.getOut(node);
		for (const [to, characters] of out) {
			nodeList.linkNodes(trans, translate(to), characters);
		}
		return out.keys();
	});

	return { initial, finals };
}

/**
 * Alters `base` to to be the same as the given replacement.
 *
 * `replacement` will be altered as well and cannot be used again after this operation.
 *
 * @param nodeList
 * @param base
 * @param replacement
 */
function baseReplaceWith(nodeList: NFA.NodeList, base: SubList, replacement: SubList): void {
	baseMakeEmpty(nodeList, base);

	// transfer finals
	replacement.finals.forEach(f => {
		base.finals.add(f === replacement.initial ? base.initial : f);
	});

	// transfer nodes
	for (const [to, characters] of [...replacement.initial.out]) {
		nodeList.linkNodes(base.initial, to, characters);
		nodeList.unlinkNodes(replacement.initial, to);
	}
}

/**
 * Alters `base` to end with the `after` expression.
 *
 * `after` will be altered as well and cannot be used again after this operation.
 *
 * @param nodeList The node list of both `base` and `after`.
 * @param base
 * @param after
 */
function baseAppend(nodeList: NFA.NodeList, base: SubList, after: SubList): void {
	if (base.finals.size === 0) {
		// concat(EMPTY_LANGUAGE, after) == EMPTY_LANGUAGE
		return;
	}
	if (after.finals.size === 0) {
		// concat(base, EMPTY_LANGUAGE) == EMPTY_LANGUAGE
		baseMakeEmpty(nodeList, base);
		return;
	}

	// replace after initial with base finals
	const initialEdges = [...after.initial.out];
	for (const baseFinal of base.finals) {
		for (const [to, characters] of initialEdges) {
			nodeList.linkNodes(baseFinal, to, characters);
		}
	}
	// unlink after initial
	for (const [to] of initialEdges) {
		nodeList.unlinkNodes(after.initial, to);
	}

	// If the initial of after isn't final, we have to clear the base finals
	if (!after.finals.has(after.initial)) {
		base.finals.clear();
	}
	// transfer finals
	after.finals.forEach(n => {
		if (n !== after.initial) {
			base.finals.add(n);
		}
	});
}

/**
 * Alters `base` to start with the `before` expression.
 *
 * `before` will be altered as well and cannot be used again after this operation.
 *
 * @param nodeList The node list of both `base` and `before`.
 * @param base
 * @param before
 */
function basePrepend(nodeList: NFA.NodeList, base: SubList, before: SubList): void {
	if (base.finals.size === 0) {
		// concat(before, EMPTY_LANGUAGE) == EMPTY_LANGUAGE
		return;
	}
	if (before.finals.size === 0) {
		// concat(EMPTY_LANGUAGE, base) == EMPTY_LANGUAGE
		baseMakeEmpty(nodeList, base);
		return;
	}

	// replace base initial with before finals
	const initialEdges = [...base.initial.out];
	for (const beforeFinal of before.finals) {
		for (const [to, characters] of initialEdges) {
			nodeList.linkNodes(beforeFinal, to, characters);
		}
	}
	// unlink base initial
	for (const [to] of initialEdges) {
		nodeList.unlinkNodes(base.initial, to);
	}
	// link before initial out to base initial
	for (const [to, characters] of before.initial.out) {
		nodeList.linkNodes(base.initial, to, characters);
		// and unlink before before initial
		nodeList.unlinkNodes(before.initial, to);
	}

	if (base.finals.has(base.initial)) {
		base.finals.delete(base.initial);

		before.finals.forEach(n => {
			if (n === before.initial) {
				base.finals.add(base.initial);
			} else {
				base.finals.add(n);
			}
		});
	}
}

/**
 * Alters `base` to be the union of itself and the given alternative.
 *
 * `alternative` will be altered as well and cannot be used again after this operation.
 *
 * @param nodeList The node list of both `base` and `alternative`.
 * @param base
 * @param alternative
 */
function baseUnion(nodeList: NFA.NodeList, base: SubList, alternative: SubList): void {
	// add finals
	alternative.finals.forEach(n => {
		base.finals.add(n === alternative.initial ? base.initial : n);
	});

	// transfer nodes to base
	for (const [to, characters] of [...alternative.initial.out]) {
		nodeList.linkNodes(base.initial, to, characters);
		nodeList.unlinkNodes(alternative.initial, to);
	}

	// optional optimization to reduce the number of nodes
	baseOptimizationReuseFinalStates(nodeList, base);
	baseOptimizationMergePrefixes(nodeList, base);
	baseOptimizationMergeSuffixes(nodeList, base); // suffixes should to be done after ReuseFinalStates
}

function baseOptimizationReuseFinalStates(nodeList: NFA.NodeList, base: SubList): void {
	const reusable: NFA.Node[] = [];
	base.finals.forEach(f => {
		if (f !== base.initial && f.out.size === 0) {
			reusable.push(f);
		}
	});

	if (reusable.length > 1) {
		const masterFinal: NFA.Node = reusable.pop()!;
		for (let i = 0, l = reusable.length; i < l; i++) {
			const toRemove = reusable[i];
			base.finals.delete(toRemove);
			for (const [from, characters] of [...toRemove.in]) {
				nodeList.linkNodes(from, masterFinal, characters);
				nodeList.unlinkNodes(from, toRemove);
			}
		}
	}
}

function baseOptimizationMergePrefixes(nodeList: NFA.NodeList, base: SubList): void {
	/**
	 * The basic idea here to to merge suffixes and prefixes.
	 * So that e.g. /abc|abba/ will merged to /ab(c|ba)/ (similar to suffixes).
	 */

	const prefixNodes: NFA.Node[] = [base.initial];
	// we can just do this because we know the initial node doesn't have any incoming transitions

	while (prefixNodes.length > 0) {
		const node = prefixNodes.pop()!;
		if (node.out.size < 2) {
			continue;
		}

		const candidateOutNodes: NFA.Node[] = [];
		for (const outNode of node.out.keys()) {
			// the only incoming node is the prefix node
			if (outNode.in.size === 1) {
				candidateOutNodes.push(outNode);
			}
		}

		while (candidateOutNodes.length >= 2) {
			const current = candidateOutNodes.pop()!;
			const currentCharSet = node.out.get(current)!;

			for (let i = 0, l = candidateOutNodes.length; i < l; i++) {
				const other = candidateOutNodes[i];
				const otherIsFinal = base.finals.has(other);
				const otherCharSet = node.out.get(other)!;
				if (currentCharSet.equals(otherCharSet) && otherIsFinal == base.finals.has(current)) {
					// found a match -> remove `other`
					for (const [otherTo, otherToCharSet] of other.out) {
						nodeList.linkNodes(current, otherTo, otherToCharSet);
						nodeList.unlinkNodes(other, otherTo);
					}
					nodeList.unlinkNodes(node, other);
					if (otherIsFinal) {
						base.finals.delete(other);
					}
					candidateOutNodes.splice(i, 1);

					// we might be able to merge prefixes on this one
					prefixNodes.push(current);

					// there can be no other nodes with the same char set because if there were they would have been
					// removed by this function in a previous union
					break;
				}
			}
		}
	}
}
function baseOptimizationMergeSuffixes(nodeList: NFA.NodeList, base: SubList): void {
	// this will basically be the same as the prefix optimization but in the other direction

	const suffixNodes: NFA.Node[] = [];

	for (const final of base.finals) {
		if (final.out.size === 0) {
			suffixNodes.push(final);
		}
	}

	while (suffixNodes.length > 0) {
		const node = suffixNodes.pop()!;
		if (node.in.size < 2) {
			continue;
		}

		const candidateInNodes: NFA.Node[] = [];
		for (const inNode of node.in.keys()) {
			// the only outgoing node is the suffix node
			if (inNode.out.size === 1) {
				candidateInNodes.push(inNode);
			}
		}

		while (candidateInNodes.length >= 2) {
			const current = candidateInNodes.pop()!;
			const currentCharSet = node.in.get(current)!;

			for (let i = 0, l = candidateInNodes.length; i < l; i++) {
				const other = candidateInNodes[i];
				const otherIsFinal = base.finals.has(other);
				const otherCharSet = node.in.get(other)!;
				if (currentCharSet.equals(otherCharSet) && otherIsFinal == base.finals.has(current)) {
					// found a match -> remove other
					for (const [otherFrom, otherFromCharSet] of other.in) {
						nodeList.linkNodes(otherFrom, current, otherFromCharSet);
						nodeList.unlinkNodes(otherFrom, other);
					}
					nodeList.unlinkNodes(other, node);
					if (otherIsFinal) {
						base.finals.delete(other);
					}
					candidateInNodes.splice(i, 1);

					// we might be able to merge prefixes on this one
					suffixNodes.push(current);

					// there can be no other nodes with the same char set because if there were they would have been
					// removed by this function in a previous union
					break;
				}
			}
		}
	}
}

/**
 * Alters `base` to be repeated a certain number of times.
 *
 * @param nodeList
 * @param base
 * @param times
 */
function baseRepeat(nodeList: NFA.NodeList, base: SubList, times: number): void {
	if (times === 0) {
		// trivial
		baseMakeEmpty(nodeList, base);
		base.finals.add(base.initial);
		return;
	}
	if (times === 1) {
		// trivial
		return;
	}
	if (base.finals.size === 1 && base.finals.has(base.initial)) {
		// base can only match the empty string
		return;
	}
	if (base.finals.size === 0) {
		// base can't match any word
		return;
	}

	if (!base.finals.has(base.initial)) {
		const copy = localCopy(nodeList, base);
		for (let i = times; i > 2; i--) {
			// use a copy of the original copy for concatenation
			// do this `times - 2` times
			baseAppend(nodeList, base, localCopy(nodeList, copy));
		}
		// use the original copy
		baseAppend(nodeList, base, copy);
	} else {
		// We could use the above approach here as well but this would generate O(n^2) unnecessary transitions.
		// To get rid of these unnecessary transitions, we remove the initial states from the set of final states
		// and manually store the final states of each concatenation.

		const realFinal = new Set<NFA.Node>(base.finals);
		base.finals.delete(base.initial);

		const copy = localCopy(nodeList, base);

		for (let i = times; i > 2; i--) {
			// use a copy of the original copy for concatenation
			// do this `times - 2` times
			baseAppend(nodeList, base, localCopy(nodeList, copy));
			base.finals.forEach(f => realFinal.add(f));
		}
		// use the original copy
		baseAppend(nodeList, base, copy);
		base.finals.forEach(f => realFinal.add(f));

		// transfer the final states
		base.finals.clear();
		realFinal.forEach(f => base.finals.add(f));

		// NOTE: For this to be correct, it is assumed, that
		//  1) concatenation doesn't replace the initial state of base
		//  2) the final states of base aren't removed (they just have to be reachable from the initial state)
	}
}

/**
 * Alters `base` to be equal to `/(<base>)+/`.
 *
 * @param nodeList
 * @param base
 */
function basePlus(nodeList: NFA.NodeList, base: SubList): void {
	// The basic idea here is that we copy all edges from the initial state state to every final state. This means that
	// all final states will then behave like the initial state.
	for (const f of base.finals) {
		if (f !== base.initial) {
			for (const [to, characters] of base.initial.out) {
				nodeList.linkNodes(f, to, characters);
			}
		}
	}
}

/**
 * Returns whether the given base can be expressed as `A+` for some A.
 *
 * @param base
 */
function baseIsPlusExpression(base: ReadonlySubList): boolean {
	// The following condition have to be fulfilled:
	//
	// All Final states have to link to all and only to all directly outgoing states of the initial state.

	const initialOut = base.initial.out;

	// check condition
	for (const final of base.finals) {
		if (final === base.initial) {
			// the initial state trivially fulfills the condition
			continue;
		}
		if (final.out.size !== initialOut.size) {
			return false;
		}
		for (const finalOut of final.out.keys()) {
			if (!initialOut.has(finalOut)) {
				return false;
			}
		}
	}

	return true;
}

function baseQuantify(nodeList: NFA.NodeList, base: SubList, min: number, max: number): void {
	if (max === 0) {
		// this is a special case, so handle it before everything else
		// e.g. /a{0}/
		baseMakeEmpty(nodeList, base);
		base.finals.add(base.initial);
		return;
	}

	if (base.finals.has(base.initial)) {
		// if the initial state is also final, then `min` is effectively 0
		// e.g. /(a|)+/ == /(a|)*/
		min = 0;
	} else if (min === 0) {
		// if `min` is 0, then the initial state has to be final
		base.finals.add(base.initial);
	}

	if (max === 1) {
		// since min can either be 0 (in which case the initial state has be handled above)
		// or 1 (in which case it's trivial).
		// e.g. /a{1}/
		return;
	}

	// if base can be expressed as A+ for some A, then we can do some optimization
	if (baseIsPlusExpression(base)) {
		if (min <= 1) {
			// If min == 0, then we know that A+ matches, them empty string and is the same as A*. Since no quantifier
			// (except {0} which is already handled above) can change A*, we can just return.
			// if min == 1, then A+ == (A+){1,max} for any max.
			return;
		}

		// the base idea here is this:
		// (A+){min,max} == (A+){min}(A+){0,max-min} == (A+){min}A* == A{min-1}A+A* == A{min-1}A+

		// make a copy of A+
		const aPlus = localCopy(nodeList, base);

		// remove the + from the current A+
		for (const final of base.finals) {
			for (const finalOut of final.out.keys()) {
				nodeList.unlinkNodes(final, finalOut);
			}
		}

		baseRepeat(nodeList, base, min - 1); // repeat A min-1 many times
		baseAppend(nodeList, base, aPlus); // concat A{min-1} and A+
		return;
	}

	if (min === max) {
		// e.g. /a{4}/
		baseRepeat(nodeList, base, min);
	} else if (max < Infinity) {
		// e.g. /a{2,4}/
		// The basic idea here is that /a{m,n}/ == /a{m}(a|){n-m}/

		// make a copy of base and include the empty string
		const copy = localCopy(nodeList, base);
		copy.finals.add(copy.initial);

		baseRepeat(nodeList, copy, max - min);
		baseRepeat(nodeList, base, min);
		baseAppend(nodeList, base, copy);
	} else {
		if (min > 1) {
			// e.g. /a{4,}/
			// The basic idea here is that /a{4,}/ == /a{3}a+/

			// the plus part (has to be done first because base will be modified by repeat)
			const copy = localCopy(nodeList, base);
			basePlus(nodeList, copy);

			// repeat
			baseRepeat(nodeList, base, min - 1);

			baseAppend(nodeList, base, copy);
		} else {
			// e.g. /a*/, /a+/
			// If `min` is 0 then the initial state will already be final because of the code above.
			// We can use the plus operator for star as well because /(<RE>)*/ == /(<RE>)+|/
			basePlus(nodeList, base);
		}
	}
}

/**
 * Alters `base` to accept no words.
 *
 * @param nodeList
 * @param base
 */
function baseMakeEmpty(nodeList: NFA.NodeList, base: SubList): void {
	for (const out of [...base.initial.out.keys()]) {
		nodeList.unlinkNodes(base.initial, out);
	}
	base.finals.clear();
}

function baseReverse(nodeList: NFA.NodeList, base: SubList): void {
	const { initial, finals } = base;

	if (finals.size === 0 || (finals.size === 1 && finals.has(initial))) {
		// either no finals (= empty language)
		// or only the initial state is final (= language with only the empty word)
		return;
	}

	// reverse the direction of all transitions
	const allNodes = [
		...Iter.iterateStates({
			initial: base.initial,
			getOut: n => n.out.keys(),
			isFinal: n => base.finals.has(n),
		}),
	];
	for (const node of allNodes) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mutableNode = node as any;
		const temp = mutableNode.out;
		mutableNode.out = mutableNode.in;
		mutableNode.in = temp;
	}

	// replace the former initial with a new node and make it final
	// this will make the initial "free" (no in/out transitions)
	const mainFinal = nodeList.createNode();
	initial.in.forEach((trans, from) => {
		nodeList.unlinkNodes(from, initial);
		nodeList.linkNodes(from, mainFinal, trans);
	});

	const newFinals = new Set<NFA.Node>([mainFinal]);
	if (finals.has(initial)) {
		finals.delete(initial);
		newFinals.add(initial);
	}

	// make the former initial the new initial
	for (const f of finals) {
		f.out.forEach((trans, to) => {
			nodeList.linkNodes(initial, to, trans);
		});
		if (f.in.size === 0) {
			// remove f
			f.out.forEach((_, to) => {
				nodeList.unlinkNodes(f, to);
			});
		}
	}

	// transfer finals
	finals.clear();
	newFinals.forEach(f => finals.add(f));
}
