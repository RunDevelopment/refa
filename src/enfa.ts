/* eslint-disable no-inner-declarations */
import { CharSet } from "./char-set";
import { Char, ReadonlyWord, Word } from "./char-types";
import { WordSet } from "./word-set";
import {
	FABuilder,
	FACreationOptions,
	FAIterator,
	FiniteAutomaton,
	ToRegexOptions,
	TransitionIterable,
	TransitionIterator,
} from "./fa-types";
import { assertNever, cachedFunc, debugAssert, intersectSet, traverse, traverseMultiRoot } from "./util";
import * as Iter from "./iter";
import { Concatenation, Element, Expression, NoParent, Node, Quantifier } from "./ast";
import { MaxCharacterError, TooManyNodesError } from "./errors";
import { getIntersectionWordSets, getIntersectionWords, isDisjointWith } from "./intersection";
import { wordSetsToWords } from "./words";

const DEFAULT_MAX_NODES = 10_000;

/**
 * A readonly {@link ENFA}.
 */
export interface ReadonlyENFA extends FiniteAutomaton, TransitionIterable<ENFA.ReadonlyNode> {
	readonly nodes: ENFA.ReadonlyNodeList;
	readonly options: Readonly<ENFA.Options>;

	stateIterator(resolveEpsilon: boolean): FAIterator<ENFA.ReadonlyNode>;

	/**
	 * This is equivalent to `isDisjointWith(this, other, options)` (free function).
	 *
	 * @deprecated
	 */
	isDisjointWith<O>(other: TransitionIterable<O>, options?: Readonly<FACreationOptions>): boolean;
	/**
	 * This is equivalent to `getIntersectionWords(this, other, options)` (free function).
	 *
	 * @deprecated
	 */
	getIntersectionWords<O>(other: TransitionIterable<O>, options?: Readonly<FACreationOptions>): Iterable<Word>;
	/**
	 * This is equivalent to `getIntersectionWordSets(this, other, options)` (free function).
	 *
	 * @deprecated
	 */
	getIntersectionWordSets<O>(other: TransitionIterable<O>, options?: Readonly<FACreationOptions>): Iterable<WordSet>;

	/**
	 * Create a mutable copy of this ENFA.
	 */
	copy(): ENFA;
}

/**
 * A [nondeterministic finite automaton](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton) with epsilon
 * transitions.
 *
 * This class implements NFAs with the following properties:
 *
 * - There is exactly one initial state.
 *
 * - There is exactly one final state.
 *
 * - There are epsilon transitions.
 *
 * - A transitions either an epsilon transition or consumes a character.
 *
 *   Epsilon transition are represented using `null` and characters are represented using non-empty `CharSet`s.
 *
 * - Transitions are ordered.
 *
 *   As a consequence, `/aa|bb/` and `/bb|aa/` have different state machines in this NFA implementation.
 *
 *   Order is only guaranteed as long as no transitions are removed. Order is defined by the key order of the JavaScript
 *   `Map` class.
 *
 * - Between any two states, there can at most be one transition.
 *
 *   Unlike the {@link NFA} class, transition cannot be merged. As a consequence, `/a|a/` and `/a/` have different
 *   state machines in this NFA implementation.
 */
export class ENFA implements ReadonlyENFA {
	readonly nodes: ENFA.NodeList;
	readonly maxCharacter: Char;

	private constructor(nodes: ENFA.NodeList, maxCharacter: Char) {
		this.nodes = nodes;
		this.maxCharacter = maxCharacter;
	}

	get options(): Readonly<ENFA.Options> {
		return { maxCharacter: this.maxCharacter };
	}

	get isEmpty(): boolean {
		return this.nodes.initial.out.size === 0;
	}
	get isFinite(): boolean {
		return this.isEmpty || Iter.languageIsFinite(this.stateIterator(true));
	}

	stateIterator(resolveEpsilon: boolean): FAIterator<ENFA.ReadonlyNode> {
		if (resolveEpsilon) {
			const initial: ENFA.ReadonlyNode = this.nodes.initial;
			const effectivelyFinal: Set<ENFA.ReadonlyNode> = ENFA.NodeList.reachableViaEpsilon(this.nodes.final, "in");
			return {
				initial,
				getOut: n => {
					const out = new Set<ENFA.ReadonlyNode>();
					ENFA.NodeList.unorderedResolveEpsilon(n, "out", (_, to) => out.add(to));
					return out;
				},
				isFinal: n => effectivelyFinal.has(n),
			};
		} else {
			const initial: ENFA.ReadonlyNode = this.nodes.initial;
			const final: ENFA.ReadonlyNode = this.nodes.final;
			return {
				initial,
				getOut: n => n.out.keys(),
				stableOut: true,
				isFinal: n => n === final,
			};
		}
	}
	transitionIterator(): TransitionIterator<ENFA.ReadonlyNode> {
		const initial: ENFA.ReadonlyNode = this.nodes.initial;
		const effectivelyFinal: Set<ENFA.ReadonlyNode> = ENFA.NodeList.reachableViaEpsilon(this.nodes.final, "in");

		return {
			initial,
			getOut: n => {
				const out = new Map<ENFA.ReadonlyNode, CharSet>();
				ENFA.NodeList.unorderedResolveEpsilon(n, "out", (via, to) => {
					let transition = out.get(to);
					if (transition === undefined) {
						transition = via;
					} else {
						transition = transition.union(via);
					}
					out.set(to, transition);
				});
				return out;
			},
			isFinal: n => effectivelyFinal.has(n),
		};
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

	copy(): ENFA {
		const nodeList = new ENFA.NodeList();
		const { initial, final } = localCopy(nodeList, this.nodes);
		nodeList.initial = initial;
		nodeList.final = final;

		return new ENFA(nodeList, this.maxCharacter);
	}

	test(word: ReadonlyWord): boolean {
		// An implementation of Thompson's algorithm as described by Russ Cox
		// https://swtch.com/~rsc/regexp/regexp1.html
		let currentStates: ENFA.ReadonlyNode[] = [this.nodes.initial];
		const newStatesSet = new Set<ENFA.ReadonlyNode>();

		for (const char of word) {
			const newStates: ENFA.ReadonlyNode[] = [];
			newStatesSet.clear();

			// this is a multi-root version of ENFA.NodeList.unorderedResolveEpsilon
			traverseMultiRoot(currentStates, state => {
				const next: ENFA.ReadonlyNode[] = [];

				state.out.forEach((charSet, to) => {
					if (charSet === null) {
						next.push(to);
					} else if (charSet.has(char) && !newStatesSet.has(to)) {
						newStates.push(to);
						newStatesSet.add(to);
					}
				});

				return next;
			});

			currentStates = newStates;
		}

		if (newStatesSet.has(this.nodes.final)) {
			// this a short cut that uses the set we construct to detect duplicates
			return true;
		}

		const effectivelyFinal: Set<ENFA.ReadonlyNode> = ENFA.NodeList.reachableViaEpsilon(this.nodes.final, "in");
		return currentStates.some(state => effectivelyFinal.has(state));
	}

	wordSets(): Iterable<WordSet> {
		return Iter.iterateWordSets(this.transitionIterator());
	}
	words(): Iterable<Word> {
		return wordSetsToWords(this.wordSets());
	}

	toString(): string {
		const iter: FAIterator<ENFA.ReadonlyNode, ReadonlyMap<ENFA.ReadonlyNode, CharSet | null>> = {
			initial: this.nodes.initial,
			getOut: n => n.out,
			stableOut: true,
			isFinal: n => n === this.nodes.final,
		};

		return Iter.toString(
			iter,
			cs => {
				if (cs === null) {
					return "ε";
				} else {
					return cs.toRangesString();
				}
			},
			true
		);
	}

	toRegex(options?: Readonly<ToRegexOptions>): NoParent<Expression> {
		const { initial, final } = this.nodes;
		const iter: FAIterator<ENFA.ReadonlyNode, ReadonlyMap<ENFA.ReadonlyNode, CharSet | null>> = {
			initial,
			getOut: n => n.out,
			stableOut: true,
			isFinal: n => n === final,
		};
		return Iter.toRegex(iter, options);
	}

	toDot(charSetToString?: (charSet: CharSet) => string): string {
		const iter: FAIterator<ENFA.ReadonlyNode, ReadonlyMap<ENFA.ReadonlyNode, CharSet | null>> = {
			initial: this.nodes.initial,
			getOut: n => n.out,
			stableOut: true,
			isFinal: n => n === this.nodes.final,
		};

		const toString: (charSet: null | CharSet) => string = charSetToString
			? cs => (cs === null ? "" : charSetToString!(cs))
			: cs => (cs === null ? "" : cs.toRangesString());

		return Iter.toDot(iter, Iter.createSimpleToDotOptions(toString, true));
	}

	private _localCopy<O>(other: TransitionIterable<O>): SubList {
		if (other instanceof ENFA) {
			return localCopy(this.nodes, other.nodes);
		} else {
			return localCopyOfIterator(this.nodes, other.transitionIterator());
		}
	}

	/**
	 * Modifies this ENFA to accept the concatenation of this ENFA and the given FA.
	 *
	 * @param other
	 */
	append<O>(other: TransitionIterable<O>): void {
		MaxCharacterError.assert(this, other);
		baseAppend(this.nodes, this.nodes, this._localCopy(other));
	}

	/**
	 * Modifies this ENFA to accept the concatenation of the given FA and this ENFA.
	 *
	 * @param other
	 */
	prepend<O>(other: TransitionIterable<O>): void {
		MaxCharacterError.assert(this, other);
		basePrepend(this.nodes, this.nodes, this._localCopy(other));
	}

	/**
	 * Modifies this ENFA to accept the language of this ENFA and the language of the given FA.
	 *
	 * If the union kind is `left`, then this ENFA will be modified to accept `<other>|<this>`. Otherwise, it will be
	 * modified to accept `<this>|<other>`.
	 *
	 * @param other
	 * @param kind
	 */
	union<O>(other: TransitionIterable<O>, kind: "left" | "right" = "right"): void {
		MaxCharacterError.assert(this, other);

		if (kind === "left") {
			baseUnionLeft(this.nodes, this.nodes, this._localCopy(other));
		} else {
			baseUnionRight(this.nodes, this.nodes, this._localCopy(other));
		}
	}

	/**
	 * Modifies this ENFA to accept at least `min` and at most `max` concatenations of itself.
	 *
	 * Both `min` and `max` both have to be non-negative integers with `min <= max`.
	 * `max` is also allowed to be `Infinity`.
	 *
	 * @param min
	 * @param max
	 * @param lazy
	 */
	quantify(min: number, max: number, lazy: boolean = false): void {
		if (!Number.isInteger(min) || !(Number.isInteger(max) || max === Infinity) || min < 0 || min > max) {
			throw new RangeError("min and max both have to be non-negative integers with min <= max.");
		}

		baseQuantify(this.nodes, this.nodes, min, max, lazy);
	}

	/**
	 * Modifies this ENFA such that all prefixes of all accepted words are also accepted.
	 *
	 * If the language of this ENFA is empty, then it will remain empty.
	 *
	 * Unreachable states will be removed by this operation.
	 */
	prefixes(): void {
		this.nodes.removeUnreachable();

		if (this.isEmpty) {
			return;
		}

		for (const node of this.nodes) {
			baseMakeEffectivelyFinal(this.nodes, this.nodes, node);
		}
	}

	/**
	 * Modifies this ENFA such that all suffixes of all accepted words are also accepted.
	 *
	 * If the language of this ENFA is empty, then it will remain empty.
	 *
	 * Unreachable states will be removed by this operation.
	 */
	suffixes(): void {
		this.nodes.removeUnreachable();

		if (this.isEmpty) {
			return;
		}

		for (const node of this.nodes) {
			baseMakeEffectivelyInitial(this.nodes, this.nodes, node);
		}
	}

	/**
	 * Creates a new ENFA which matches no words. The language of the returned ENFA is empty.
	 *
	 * @param options
	 */
	static empty(options: Readonly<ENFA.Options>): ENFA {
		const nodeList = new ENFA.NodeList();
		return new ENFA(nodeList, options.maxCharacter);
	}

	/**
	 * Creates a new ENFA which matches all words.
	 *
	 * @param options
	 */
	static all(options: Readonly<ENFA.Options>): ENFA {
		const nodeList = new ENFA.NodeList();

		const middle = nodeList.createNode();

		nodeList.linkNodes(nodeList.initial, middle, null);
		nodeList.linkNodes(middle, middle, CharSet.all(options.maxCharacter));
		nodeList.linkNodes(middle, nodeList.final, null);

		return new ENFA(nodeList, options.maxCharacter);
	}

	static fromRegex(
		concat: NoParent<Node>,
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.FromRegexOptions>
	): ENFA;
	static fromRegex(
		alternatives: readonly NoParent<Concatenation>[],
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.FromRegexOptions>
	): ENFA;
	static fromRegex(
		value: NoParent<Node> | readonly NoParent<Concatenation>[],
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.FromRegexOptions>
	): ENFA {
		let nodeList: ENFA.NodeList;
		if (Array.isArray(value)) {
			nodeList = createNodeList(value as readonly NoParent<Concatenation>[], options, creationOptions || {});
		} else {
			const node = value as NoParent<Node>;

			switch (node.type) {
				case "Expression":
					nodeList = createNodeList(node.alternatives, options, creationOptions || {});
					break;

				case "Concatenation":
					nodeList = createNodeList([node], options, creationOptions || {});
					break;

				default:
					nodeList = createNodeList(
						[{ type: "Concatenation", elements: [node] }],
						options,
						creationOptions || {}
					);
					break;
			}
		}
		return new ENFA(nodeList, options.maxCharacter);
	}

	/**
	 * Creates a new ENFA which matches all and only all of the given words.
	 *
	 * @param words
	 * @param options
	 * @param creationOptions
	 */
	static fromWords(
		words: Iterable<ReadonlyWord>,
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.CreationOptions>
	): ENFA {
		const { maxCharacter } = options;
		const maxNodes = creationOptions?.maxNodes ?? DEFAULT_MAX_NODES;

		const nodeList = ENFA.NodeList.withLimit(maxNodes, nodeList => {
			function getNext(node: ENFA.Node, char: Char): ENFA.Node {
				if (char > maxCharacter) {
					throw new Error(`All characters have to be <= options.maxCharacter (${maxCharacter}).`);
				}

				for (const [to, chars] of node.out) {
					if (chars !== null && chars.has(char)) {
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

				if (!node.out.has(nodeList.final)) {
					nodeList.linkNodes(node, nodeList.final, null);
				}
			}
		});

		return new ENFA(nodeList, maxCharacter);
	}

	static fromFA<InputNode>(
		fa: TransitionIterable<InputNode>,
		creationOptions?: Readonly<ENFA.CreationOptions>
	): ENFA {
		return ENFA.fromTransitionIterator(fa.transitionIterator(), fa, creationOptions);
	}

	static fromTransitionIterator<InputNode>(
		iter: TransitionIterator<InputNode>,
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.CreationOptions>
	): ENFA {
		const { maxCharacter } = options;
		const maxNodes = creationOptions?.maxNodes ?? DEFAULT_MAX_NODES;

		const nodeList = ENFA.NodeList.withLimit(maxNodes, nodeList => {
			const fakeInitial = nodeList.createNode();
			nodeList.linkNodes(nodeList.initial, fakeInitial, null);

			const translate = cachedFunc<InputNode, ENFA.Node>(() => nodeList.createNode());
			translate.cache.set(iter.initial, fakeInitial);

			traverse(iter.initial, node => {
				const transNode = translate(node);

				if (iter.isFinal(node)) {
					nodeList.linkNodes(transNode, nodeList.final, null);
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

		return new ENFA(nodeList, maxCharacter);
	}
}

/**
 * A namespace for ENFA-specific classes and interfaces.
 *
 * @see {@link ENFA} (class)
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ENFA {
	export interface ReadonlyNode {
		readonly list: ReadonlyNodeList;
		readonly out: ReadonlyMap<ReadonlyNode, CharSet | null>;
		readonly in: ReadonlyMap<ReadonlyNode, CharSet | null>;
	}
	export interface Node extends ReadonlyNode {
		readonly list: NodeList;
		readonly out: Map<Node, CharSet | null>;
		readonly in: Map<Node, CharSet | null>;
	}

	export interface ReadonlyNodeList extends Iterable<ReadonlyNode> {
		/**
		 * The initial state of this list.
		 *
		 * The initial state is fixed an cannot be changed or removed.
		 *
		 * This state is not allowed to have any incoming transitions.
		 *
		 * The initial and final state are guaranteed to be two different states.
		 */
		readonly initial: ReadonlyNode;
		/**
		 * The final state of this list.
		 *
		 * The final state is fixed an cannot be changed or removed.
		 *
		 * This state is not allowed to have any outgoing transitions.
		 *
		 * The initial and final state are guaranteed to be two different states.
		 */
		readonly final: ReadonlyNode;
		/**
		 * Returns the number of nodes reachable from the initial state including the initial state.
		 *
		 * This may include trap states. This will not include unreachable final states.
		 *
		 * This operation has to traverse the whole graph and runs in _O(E + V)_.
		 */
		count(): number;
	}
	export class NodeList implements ReadonlyNodeList, Iterable<Node>, FABuilder<Node, CharSet | null> {
		private _nodeCounter: number = 0;
		private _nodeLimit: number = Infinity;

		initial: Node;
		final: Node;

		constructor() {
			this.initial = this.createNode();
			this.final = this.createNode();
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
			TooManyNodesError.assert(id, this._nodeLimit, "ENFA");

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
		linkNodes(from: Node, to: Node, characters: CharSet | null): void {
			if (from.list !== to.list) {
				throw new Error("You can't link nodes from different node lists.");
			}
			if (from.list !== this) {
				throw new Error("Use the node list associated with the nodes to link them.");
			}
			if (from.out.has(to)) {
				throw new Error("Cannot link nodes that are already linked.");
			}
			if (characters && characters.isEmpty) {
				throw new Error("You can't link nodes with the empty character set.");
			}

			from.out.set(to, characters);
			to.in.set(from, characters);
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

		makeFinal(state: Node): void {
			baseMakeEffectivelyFinal(this, this, state);
		}
		isFinal(state: Node): boolean {
			return state === this.final;
		}

		/**
		 * All states which cannot be reached from the initial state or cannot reach (or are) a final state, will be
		 * removed.
		 */
		removeUnreachable(): void {
			if (this.final.in.size === 0 || this.initial.out.size === 0) {
				baseMakeEmpty(this, this);
				return;
			}

			const reachableFromInitial = new Set<Node>();
			traverse(this.initial, n => {
				reachableFromInitial.add(n);
				return n.out.keys();
			});
			const finalReachableFrom = new Set<Node>();
			traverse(this.final, n => {
				finalReachableFrom.add(n);
				return n.in.keys();
			});

			const alive = intersectSet(reachableFromInitial, finalReachableFrom);

			if (alive.size === 0) {
				baseMakeEmpty(this, this);
			} else {
				alive.forEach(n => {
					n.out.forEach((_, to) => {
						if (!alive.has(to)) {
							this.unlinkNodes(n, to);
						}
					});
					n.in.forEach((_, from) => {
						if (!alive.has(from)) {
							this.unlinkNodes(from, n);
						}
					});
				});
			}
		}

		/**
		 * Changes the nodes, so that the initial state has no incoming transitions and that the final state has no
		 * outgoing transitions.
		 */
		normalize(): void {
			baseNormalize(this, this);
		}

		count(): number {
			let c = 0;
			let hasSeenFinal = false;
			traverse(this.initial, n => {
				c++;
				if (n === this.final) {
					hasSeenFinal = true;
				}
				return n.out.keys();
			});
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!hasSeenFinal) {
				c++;
			}
			return c;
		}

		[Symbol.iterator](): Iterator<Node> {
			return Iter.iterateStates({
				initial: this.initial,
				getOut: state => state.out.keys(),
				isFinal: state => this.final === state,
			})[Symbol.iterator]();
		}

		/**
		 * Calls the given consumer function on every non-epsilon transition directly reachable from the given node.
		 *
		 * Epsilon transitions will be resolved using a DFS algorithm. This means that for the following graph:
		 *
		 * ```text
		 * (0) -> (1) : "a"
		 *     -> (2) : epsilon
		 *     -> (3) : "b"
		 *
		 * (1) -> (3) : "c"
		 *
		 * (2) -> (4) : "d"
		 *     -> (1) : "e"
		 *     -> (2) : epsilon
		 *
		 * (3) -> (1) : epsilon
		 *
		 * (4) -> empty
		 * ```
		 *
		 * The node `(0)` will return the resolved list:
		 *
		 * ```text
		 * [(1), "a"]
		 * [(4), "d"]
		 * [(1), "e"]
		 * [(3), "b"]
		 * ```
		 */
		static resolveEpsilon(
			node: ENFA.Node,
			direction: "in" | "out",
			consumerFn: (charSet: CharSet, node: ENFA.Node) => void
		): void;
		static resolveEpsilon(
			node: ENFA.ReadonlyNode,
			direction: "in" | "out",
			consumerFn: (charSet: CharSet, node: ENFA.ReadonlyNode) => void
		): void;
		static resolveEpsilon(
			node: ENFA.Node,
			direction: "in" | "out",
			consumerFn: (charSet: CharSet, node: ENFA.Node) => void
		): void {
			// TODO: Implement this non-recursively

			const visited = new Set<ENFA.Node>();

			function resolveDFS(n: ENFA.Node): void {
				if (visited.has(n)) {
					return;
				} else {
					visited.add(n);
				}

				n[direction].forEach((via, to) => {
					if (via === null) {
						resolveDFS(to);
					} else {
						consumerFn(via, to);
					}
				});
			}
			resolveDFS(node);
		}

		/**
		 * Calls the given consumer function on every non-epsilon transition directly reachable from the given node.
		 *
		 * The order in which the consumer function will be called for the pair is implementation-defined. Only use this
		 * if the order of nodes is irrelevant.
		 */
		static unorderedResolveEpsilon(
			node: ENFA.Node,
			direction: "in" | "out",
			consumerFn: (charSet: CharSet, node: ENFA.Node) => void
		): void;
		static unorderedResolveEpsilon(
			node: ENFA.ReadonlyNode,
			direction: "in" | "out",
			consumerFn: (charSet: CharSet, node: ENFA.ReadonlyNode) => void
		): void;
		static unorderedResolveEpsilon(
			node: ENFA.Node,
			direction: "in" | "out",
			consumerFn: (charSet: CharSet, node: ENFA.Node) => void
		): void {
			traverse(node, n => {
				const next: ENFA.Node[] = [];

				n[direction].forEach((via, to) => {
					if (via === null) {
						next.push(to);
					} else {
						consumerFn(via, to);
					}
				});

				return next;
			});
		}

		/**
		 * Returns a set of all nodes that are reachable from the given node by only following epsilon transitions in
		 * the given direction. The returned set is guaranteed to always contain the given node.
		 *
		 * The order of the nodes in the returned set in implementation-defined and cannot be relied upon.
		 *
		 * ---
		 *
		 * This method can be used to determine the set of all effectively final states.
		 *
		 * ```
		 * const effectivelyFinal = ENFA.NodeList.reachableViaEpsilon(final, "in");
		 * ```
		 */
		static reachableViaEpsilon(node: ENFA.Node, direction: "in" | "out"): Set<ENFA.Node>;
		static reachableViaEpsilon(node: ENFA.ReadonlyNode, direction: "in" | "out"): Set<ENFA.ReadonlyNode>;
		static reachableViaEpsilon(node: ENFA.ReadonlyNode, direction: "in" | "out"): Set<ENFA.ReadonlyNode> {
			const result = new Set<ENFA.ReadonlyNode>();

			traverse(node, n => {
				result.add(n);

				const next: ENFA.ReadonlyNode[] = [];

				n[direction].forEach((via, to) => {
					if (via === null) {
						next.push(to);
					}
				});

				return next;
			});

			return result;
		}
	}

	/**
	 * Options for the constraints on how a ENFA will be created.
	 */
	export interface CreationOptions extends FACreationOptions {
		/**
		 * The maximum number of nodes the ENFA creation operation is allowed to create before throwing a
		 * `TooManyNodesError`.
		 *
		 * If the maximum number of nodes is set to `Infinity`, the ENFA creation operation may create as many nodes as
		 * necessary to construct the ENFA. This might cause the machine to run out of memory. I.e. some REs can only be
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
		 * How to handle assertions when construction the ENFA.
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
		 * How to handle unknowns when construction the ENFA.
		 *
		 * - `"throw"`
		 *
		 *   This method will throw an error when encountering an unknown.
		 *
		 * - `"disable"`
		 *
		 *   This method will replace any unknown with an empty character class, effectively removing it.
		 *
		 * @default "throw"
		 */
		unknowns?: "disable" | "throw";
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

function createNodeList(
	expression: readonly NoParent<Concatenation>[],
	options: Readonly<ENFA.Options>,
	creationOptions: Readonly<ENFA.FromRegexOptions>
): ENFA.NodeList {
	return ENFA.NodeList.withLimit(creationOptions.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
		const { initial, final } = ThompsonOptimized.create(nodeList, expression, {
			maxCharacter: options.maxCharacter,
			assertions: creationOptions.assertions ?? "throw",
			unknowns: creationOptions.unknowns ?? "throw",
			infinityThreshold: creationOptions.infinityThreshold ?? Infinity,
		});

		nodeList.initial = initial;
		nodeList.final = final;
	});
}

interface SubList {
	initial: ENFA.Node;
	final: ENFA.Node;
}
interface ReadonlySubList {
	readonly initial: ENFA.ReadonlyNode;
	readonly final: ENFA.ReadonlyNode;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace ThompsonOptimized {
	interface Options {
		readonly maxCharacter: Char;
		readonly assertions: "disable" | "throw";
		readonly unknowns: "disable" | "throw";
		readonly infinityThreshold: number;
	}

	export function create(
		nodeList: ENFA.NodeList,
		expression: readonly NoParent<Concatenation>[],
		options: Options
	): SubList {
		const initial = nodeList.createNode();

		return { initial, final: handleAlternatives(nodeList, expression, initial, options) };
	}

	// All of the below function guarantee that
	// 1. no incoming transitions are added to the initial state.
	// 2. the returned final state will not be the given initial state.
	// 3. the returned final state will have no outgoing transitions.

	function handleElement(
		nodeList: ENFA.NodeList,
		element: NoParent<Element>,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		switch (element.type) {
			case "Alternation":
				return handleAlternatives(nodeList, element.alternatives, initial, options);
			case "Assertion":
				return handleAssertion(nodeList, options);
			case "CharacterClass":
				return handleChar(nodeList, element.characters, initial, options);
			case "Quantifier":
				return handleQuantifier(nodeList, element, initial, options);
			case "Unknown":
				return handleUnknown(nodeList, options);
			default:
				assertNever(element);
		}
	}
	function handleAlternatives(
		nodeList: ENFA.NodeList,
		alternatives: readonly NoParent<Concatenation>[],
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		if (alternatives.length === 1) {
			return handleConcat(nodeList, alternatives[0].elements, initial, options);
		} else {
			const final = nodeList.createNode();

			for (const { elements } of alternatives) {
				const alternativeFinal = handleConcat(nodeList, elements, initial, options);
				nodeList.linkNodes(alternativeFinal, final, null);
			}

			return final;
		}
	}
	function handleChar(nodeList: ENFA.NodeList, characters: CharSet, initial: ENFA.Node, options: Options): ENFA.Node {
		if (characters.maximum !== options.maxCharacter) {
			throw new Error(`Expected a max character of ${options.maxCharacter} but found ${characters.maximum}.`);
		}

		const final = nodeList.createNode();
		if (!characters.isEmpty) {
			nodeList.linkNodes(initial, final, characters);
		}
		return final;
	}
	function handleConcat(
		nodeList: ENFA.NodeList,
		elements: readonly NoParent<Element>[],
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		let final = initial;
		for (const e of elements) {
			const newFinal = handleElement(nodeList, e, final, options);
			debugAssert(final !== newFinal, "The returned final state cannot be the given initial state.");
			debugAssert(newFinal.out.size === 0, "The returned final cannot have outgoing transitions.");
			final = newFinal;
		}

		return safeFinal(nodeList, initial, final);
	}
	function handleQuantifier(
		nodeList: ENFA.NodeList,
		quant: NoParent<Quantifier>,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		const originalInitial = initial;

		let { min, max } = quant;
		if (!(min <= max) || !(min >= 0)) {
			throw new Error(`Expected 0 <= min <= max but found min=${min} max=${max}.`);
		}

		if (max > options.infinityThreshold) {
			max = Infinity;
		}

		if (min > 1) {
			initial = quantConstant(nodeList, quant.alternatives, min - 1, initial, options);
			max -= min - 1;
			min = 1;
		}

		// min is now either 1 or 0
		debugAssert(min === 0 || min === 1);

		if (min === 1) {
			if (max === Infinity) {
				return quantPlus(nodeList, quant.alternatives, quant.lazy, initial, options);
			} else {
				max--;
				min--;
				initial = handleAlternatives(nodeList, quant.alternatives, initial, options);
			}
		}

		// min is now 0
		debugAssert(min === 0);

		if (max === 0) {
			return safeFinal(nodeList, originalInitial, initial);
		} else if (max === Infinity) {
			return quantStar(nodeList, quant.alternatives, quant.lazy, initial, options);
		} else {
			// 1 <= max < Infinity
			// What is done here for `A{0,3}` is equivalent to `(A(A(A|)|)|)` if not lazy and `(|A(|A(|A)))` if lazy.

			const final = nodeList.createNode();

			for (let i = 0; i < max; i++) {
				if (quant.lazy) {
					nodeList.linkNodes(initial, final, null);
				}

				const nextInitial = handleAlternatives(nodeList, quant.alternatives, initial, options);

				if (!quant.lazy) {
					nodeList.linkNodes(initial, final, null);
				}

				initial = nextInitial;
			}

			nodeList.linkNodes(initial, final, null);

			return final;
		}
	}
	function handleAssertion(nodeList: ENFA.NodeList, options: Options): ENFA.Node {
		if (options.assertions === "throw") {
			throw new Error("Assertions are not supported yet.");
		}
		return nodeList.createNode();
	}
	function handleUnknown(nodeList: ENFA.NodeList, options: Options): ENFA.Node {
		if (options.unknowns === "throw") {
			throw new Error("Unknowns are not supported.");
		}
		return nodeList.createNode();
	}

	function safeFinal(nodeList: ENFA.NodeList, initial: ENFA.Node, final: ENFA.Node): ENFA.Node {
		if (final === initial) {
			final = nodeList.createNode();
			nodeList.linkNodes(initial, final, null);
		}

		return final;
	}

	function quantConstant(
		nodeList: ENFA.NodeList,
		alternatives: readonly NoParent<Concatenation>[],
		count: number,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		let final = initial;
		for (let i = 0; i < count; i++) {
			final = handleAlternatives(nodeList, alternatives, final, options);
		}

		return safeFinal(nodeList, initial, final);
	}
	function quantPlus(
		nodeList: ENFA.NodeList,
		alternatives: readonly NoParent<Concatenation>[],
		lazy: boolean,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		const final = nodeList.createNode();

		const altInitial = nodeList.createNode();
		nodeList.linkNodes(initial, altInitial, null);

		const altFinal = handleAlternatives(nodeList, alternatives, altInitial, options);
		if (lazy) {
			nodeList.linkNodes(altFinal, final, null);
			nodeList.linkNodes(altFinal, altInitial, null);
		} else {
			nodeList.linkNodes(altFinal, altInitial, null);
			nodeList.linkNodes(altFinal, final, null);
		}

		return final;
	}
	function quantStar(
		nodeList: ENFA.NodeList,
		alternatives: readonly NoParent<Concatenation>[],
		lazy: boolean,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		const final = nodeList.createNode();
		if (lazy) {
			nodeList.linkNodes(initial, final, null);
		}

		const altInitial = nodeList.createNode();
		nodeList.linkNodes(initial, altInitial, null);

		const altFinal = handleAlternatives(nodeList, alternatives, altInitial, options);
		if (lazy) {
			nodeList.linkNodes(altFinal, final, null);
			nodeList.linkNodes(altFinal, altInitial, null);
		} else {
			nodeList.linkNodes(altFinal, altInitial, null);
			nodeList.linkNodes(altFinal, final, null);
		}

		if (!lazy) {
			nodeList.linkNodes(initial, final, null);
		}

		return final;
	}
}

function baseMakeEffectivelyFinal(nodeList: ENFA.NodeList, base: SubList, node: ENFA.Node): void {
	if (node === base.final) {
		return;
	}

	const current = node.out.get(base.final);
	if (current === undefined) {
		nodeList.linkNodes(node, base.final, null);
	} else if (current === null) {
		return;
	} else {
		// the trick is to add a new node that connects the given node with the final state via epsilon transitions
		// however, we might already have added such a node, so we need to check for that.

		for (const [to, via] of node.out) {
			if (via === null) {
				if (to.out.get(base.final) === null) {
					// we already added such a state
					return;
				}
			}
		}

		const newNode = nodeList.createNode();
		nodeList.linkNodes(node, newNode, null);
		nodeList.linkNodes(newNode, base.final, null);
	}
}
function baseMakeEffectivelyInitial(nodeList: ENFA.NodeList, base: SubList, node: ENFA.Node): void {
	if (node === base.initial) {
		return;
	}

	const current = base.initial.out.get(node);
	if (current === undefined) {
		nodeList.linkNodes(base.initial, node, null);
	} else if (current === null) {
		return;
	} else {
		const newNode = nodeList.createNode();
		nodeList.linkNodes(base.initial, newNode, null);
		nodeList.linkNodes(newNode, node, null);
	}
}

function localCopy(nodeList: ENFA.NodeList, toCopy: ReadonlySubList): SubList {
	const initial = nodeList.createNode();
	const final = nodeList.createNode();

	const translate = cachedFunc<ENFA.ReadonlyNode, ENFA.Node>(() => nodeList.createNode());
	translate.cache.set(toCopy.initial, initial);
	translate.cache.set(toCopy.final, final);

	traverse(toCopy.initial, node => {
		const transNode = translate(node);

		node.out.forEach((charSet, to) => {
			nodeList.linkNodes(transNode, translate(to), charSet);
		});
		return node.out.keys();
	});

	return { initial, final };
}
function localCopyOfIterator<T>(nodeList: ENFA.NodeList, iter: TransitionIterator<T>): SubList {
	const initial = nodeList.createNode();
	const final = nodeList.createNode();

	const translate = cachedFunc<T, ENFA.Node>(() => nodeList.createNode());
	translate.cache.set(iter.initial, initial);

	traverse(iter.initial, node => {
		const transNode = translate(node);

		if (iter.isFinal(node)) {
			nodeList.linkNodes(transNode, final, null);
		}

		const out = iter.getOut(node);
		out.forEach((charSet, to) => {
			nodeList.linkNodes(transNode, translate(to), charSet);
		});
		return out.keys();
	});

	if (initial.in.size === 0) {
		return { initial, final };
	} else {
		const newInitial = nodeList.createNode();
		nodeList.linkNodes(newInitial, initial, null);

		return { initial: newInitial, final };
	}
}

/**
 * Alters `base` to accept no words.
 *
 * @param _nodeList
 * @param base
 */
function baseMakeEmpty(_nodeList: ENFA.NodeList, base: SubList): void {
	base.initial.in.clear();
	base.initial.out.clear();
	base.final.in.clear();
	base.final.out.clear();
}
/**
 * Alters `base` to accept only the empty word.
 *
 * @param nodeList
 * @param base
 */
function baseMakeEmptyWord(nodeList: ENFA.NodeList, base: SubList): void {
	baseMakeEmpty(nodeList, base);

	nodeList.linkNodes(base.initial, base.final, null);
}

function baseNormalize(nodeList: ENFA.NodeList, base: SubList): void {
	baseNormalizeInitial(nodeList, base);
	baseNormalizeFinal(nodeList, base);
}
function baseNormalizeInitial(nodeList: ENFA.NodeList, base: SubList): void {
	if (base.initial.in.size > 0) {
		const newInitial = nodeList.createNode();
		nodeList.linkNodes(newInitial, base.initial, null);
		base.initial = newInitial;
	}
}
function baseNormalizeFinal(nodeList: ENFA.NodeList, base: SubList): void {
	if (base.final.out.size > 0) {
		const newFinal = nodeList.createNode();
		nodeList.linkNodes(base.final, newFinal, null);
		base.final = newFinal;
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
function baseAppend(nodeList: ENFA.NodeList, base: SubList, after: SubList): void {
	if (base.initial.out.size === 0 || base.final.in.size === 0) {
		// concat(EMPTY_LANGUAGE, after) == EMPTY_LANGUAGE
		baseMakeEmpty(nodeList, base);
		return;
	}
	if (after.initial.out.size === 0 || after.final.in.size === 0) {
		// concat(base, EMPTY_LANGUAGE) == EMPTY_LANGUAGE
		baseMakeEmpty(nodeList, base);
		return;
	}

	nodeList.linkNodes(base.final, after.initial, null);
	base.final = after.final;
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
function basePrepend(nodeList: ENFA.NodeList, base: SubList, before: SubList): void {
	if (base.initial.out.size === 0 || base.final.in.size === 0) {
		// concat(before, EMPTY_LANGUAGE) == EMPTY_LANGUAGE
		baseMakeEmpty(nodeList, base);
		return;
	}
	if (before.initial.out.size === 0 || before.final.in.size === 0) {
		// concat(EMPTY_LANGUAGE, base) == EMPTY_LANGUAGE
		baseMakeEmpty(nodeList, base);
		return;
	}

	nodeList.linkNodes(before.final, base.initial, null);
	base.initial = before.initial;
}

/**
 * Alters `base` to be repeated a certain number of times.
 *
 * @param nodeList
 * @param base
 * @param times
 */
function baseRepeat(nodeList: ENFA.NodeList, base: SubList, times: number): void {
	if (times === 0) {
		// trivial
		baseMakeEmptyWord(nodeList, base);
		return;
	}
	if (times === 1) {
		// trivial
		return;
	}
	if (base.initial.out.size === 0 || base.final.in.size === 0) {
		// base can't match any word
		return;
	}

	const copy = localCopy(nodeList, base);

	let final = base.final;
	for (let i = 2; i < times; i++) {
		const iterationCopy = localCopy(nodeList, copy);
		nodeList.linkNodes(final, iterationCopy.initial, null);
		final = iterationCopy.final;
	}

	nodeList.linkNodes(final, copy.initial, null);
	base.final = copy.final;
}

/**
 * Alters `base` to be equal to `/(<base>)+/`.
 *
 * @param nodeList
 * @param base
 * @param lazy
 */
function basePlus(nodeList: ENFA.NodeList, base: SubList, lazy: boolean): void {
	baseNormalize(nodeList, base);

	const newFinal = nodeList.createNode();

	if (lazy) {
		nodeList.linkNodes(base.final, newFinal, null);
		nodeList.linkNodes(base.final, base.initial, null);
	} else {
		nodeList.linkNodes(base.final, base.initial, null);
		nodeList.linkNodes(base.final, newFinal, null);
	}

	base.final = newFinal;
}
/**
 * Alters `base` to be equal to `(<base>)*`.
 *
 * @param nodeList
 * @param base
 * @param lazy
 */
function baseStar(nodeList: ENFA.NodeList, base: SubList, lazy: boolean): void {
	baseNormalize(nodeList, base);

	const newInitial = nodeList.createNode();
	const newFinal = nodeList.createNode();

	if (lazy) {
		nodeList.linkNodes(newInitial, newFinal, null);
		nodeList.linkNodes(newInitial, base.initial, null);

		nodeList.linkNodes(base.final, newFinal, null);
		nodeList.linkNodes(base.final, base.initial, null);
	} else {
		nodeList.linkNodes(newInitial, base.initial, null);
		nodeList.linkNodes(newInitial, newFinal, null);

		nodeList.linkNodes(base.final, base.initial, null);
		nodeList.linkNodes(base.final, newFinal, null);
	}

	base.initial = newInitial;
	base.final = newFinal;
}

/**
 * Alters `base` to be equal to `(<base>){0,<max>}`.
 *
 * @param nodeList
 * @param base
 * @param max
 * @param lazy
 */
function baseMaximum(nodeList: ENFA.NodeList, base: SubList, max: number, lazy: boolean): void {
	if (max === Infinity) {
		// `(<base>){0,}`
		baseStar(nodeList, base, lazy);
	} else if (max === 0) {
		// `(<base>){0,0}`
		baseMakeEmptyWord(nodeList, base);
	} else if (max === 1) {
		// `(<base>){0,1}`
		baseNormalizeFinal(nodeList, base);

		const newInitial = nodeList.createNode();
		if (lazy) {
			nodeList.linkNodes(newInitial, base.final, null);
			nodeList.linkNodes(newInitial, base.initial, null);
		} else {
			nodeList.linkNodes(newInitial, base.initial, null);
			nodeList.linkNodes(newInitial, base.final, null);
		}
		base.initial = newInitial;
	} else {
		// `(<base>){0,n}`
		debugAssert(max >= 2);

		baseNormalizeFinal(nodeList, base);

		const copies = [base];
		for (let i = 1; i < max; i++) {
			copies.push(localCopy(nodeList, base));
		}

		const initial = nodeList.createNode();
		const final = copies[copies.length - 1].final;
		if (lazy) {
			nodeList.linkNodes(initial, final, null);
			nodeList.linkNodes(initial, copies[0].initial, null);
		} else {
			nodeList.linkNodes(initial, copies[0].initial, null);
			nodeList.linkNodes(initial, final, null);
		}

		for (let i = 1; i < max; i++) {
			const curr = copies[i - 1];
			const next = copies[i];

			if (lazy) {
				nodeList.linkNodes(curr.final, final, null);
				nodeList.linkNodes(curr.final, next.initial, null);
			} else {
				nodeList.linkNodes(curr.final, next.initial, null);
				nodeList.linkNodes(curr.final, final, null);
			}
		}

		base.initial = initial;
		base.final = final;
	}
}

function baseQuantify(nodeList: ENFA.NodeList, base: SubList, min: number, max: number, lazy: boolean): void {
	if (max === Infinity) {
		if (min > 1) {
			const prefix = localCopy(nodeList, base);
			baseRepeat(nodeList, prefix, min - 1);
			basePlus(nodeList, base, lazy);
			basePrepend(nodeList, base, prefix);
		} else if (min === 1) {
			basePlus(nodeList, base, lazy);
		} else {
			debugAssert(min === 0);
			baseStar(nodeList, base, lazy);
		}
	} else {
		if (min === max) {
			baseRepeat(nodeList, base, min);
		} else if (min === 0) {
			baseMaximum(nodeList, base, max, lazy);
		} else {
			const prefix = localCopy(nodeList, base);
			baseRepeat(nodeList, prefix, min);
			baseMaximum(nodeList, base, max - min, lazy);
			basePrepend(nodeList, base, prefix);
		}
	}
}

/**
 * Alters `base` to be equal to `<left>|<base>`.
 *
 * @param nodeList
 * @param base
 * @param left
 */
function baseUnionLeft(nodeList: ENFA.NodeList, base: SubList, left: SubList): void {
	const initial = nodeList.createNode();
	const final = nodeList.createNode();

	nodeList.linkNodes(initial, left.initial, null);
	nodeList.linkNodes(initial, base.initial, null);
	nodeList.linkNodes(left.final, final, null);
	nodeList.linkNodes(base.final, final, null);

	base.initial = initial;
	base.final = final;
}
/**
 * Alters `base` to be equal to `<base>|<right>`.
 *
 * @param nodeList
 * @param base
 * @param right
 */
function baseUnionRight(nodeList: ENFA.NodeList, base: SubList, right: SubList): void {
	baseNormalize(nodeList, base);

	nodeList.linkNodes(base.initial, right.initial, null);
	nodeList.linkNodes(right.final, base.final, null);
}
