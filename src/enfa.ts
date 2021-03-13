/* eslint-disable no-inner-declarations */
import { CharSet } from "./char-set";
import { Char, ReadonlyWord, Word } from "./core-types";
import {
	FAIterator,
	FiniteAutomaton,
	TransitionIterableFA,
	TooManyNodesError,
	ToRegexOptions,
	TransitionIterable,
	IntersectionOptions,
} from "./finite-automaton";
import { assertNever, cachedFunc, debugAssert, DFS, intersectSet, traverse, traverseMultiRoot } from "./util";
import * as Iter from "./iter";
import { Concatenation, Element, Expression, NoParent, Quantifier } from "./ast";
import { rangesToString, wordSetsToWords } from "./char-util";

const DEFAULT_MAX_NODES = 10_000;

export interface ReadonlyENFA extends TransitionIterableFA {
	readonly nodes: ENFA.ReadonlyNodeList;
	readonly options: Readonly<ENFA.Options>;

	stateIterator(resolveEpsilon: boolean): FAIterator<ENFA.ReadonlyNode>;
	transitionIterator(): FAIterator<ENFA.ReadonlyNode, ReadonlyMap<ENFA.ReadonlyNode, CharSet>>;

	/**
	 * Create a mutable copy of this ENFA.
	 */
	copy(): ENFA;
}

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
					ENFA.NodeList.resolveEpsilon(n, "out", (_, to) => out.add(to));
					return out;
				},
				isFinal: n => effectivelyFinal.has(n),
			};
		} else {
			const initial: ENFA.ReadonlyNode = this.nodes.initial;
			const final: ENFA.ReadonlyNode = this.nodes.final;
			return Iter.markPureOut({
				initial,
				getOut: n => n.out.keys(),
				isFinal: n => n === final,
			});
		}
	}
	transitionIterator(): FAIterator<ENFA.ReadonlyNode, ReadonlyMap<ENFA.ReadonlyNode, CharSet>> {
		const initial: ENFA.ReadonlyNode = this.nodes.initial;
		const effectivelyFinal: Set<ENFA.ReadonlyNode> = ENFA.NodeList.reachableViaEpsilon(this.nodes.final, "in");

		return {
			initial,
			getOut: n => {
				const out = new Map<ENFA.ReadonlyNode, CharSet>();
				ENFA.NodeList.resolveEpsilon(n, "out", (via, to) => {
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

			// this is a multi-root version of ENFA.NodeList.resolveEpsilon
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

	wordSets(): Iterable<CharSet[]> {
		return Iter.iterateWordSets(this.transitionIterator());
	}
	words(): Iterable<Word> {
		return wordSetsToWords(this.wordSets());
	}

	toString(): string {
		const iter: FAIterator<ENFA.ReadonlyNode, ReadonlyMap<ENFA.ReadonlyNode, CharSet | null>> = {
			initial: this.nodes.initial,
			getOut: n => n.out,
			isFinal: n => n === this.nodes.final,
		};

		return Iter.toString(
			Iter.markPureOut(iter),
			cs => {
				if (cs === null) {
					return "ε";
				} else {
					return rangesToString(cs);
				}
			},
			true
		);
	}

	toRegex(options?: Readonly<ToRegexOptions>): NoParent<Expression> {
		return Iter.toRegex(this.transitionIterator(), options);
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
	append(other: TransitionIterable): void {
		checkCompatibility(this, other);
		baseAppend(this.nodes, this.nodes, this._localCopy(other));
	}

	/**
	 * Modifies this ENFA to accept the concatenation of the given FA and this ENFA.
	 *
	 * @param other
	 */
	prepend(other: TransitionIterable): void {
		checkCompatibility(this, other);
		basePrepend(this.nodes, this.nodes, this._localCopy(other));
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
		concat: NoParent<Concatenation>,
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.FromRegexOptions>
	): ENFA;
	static fromRegex(
		expression: NoParent<Expression>,
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.FromRegexOptions>
	): ENFA;
	static fromRegex(
		alternatives: readonly NoParent<Concatenation>[],
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.FromRegexOptions>
	): ENFA;
	static fromRegex(
		value: NoParent<Concatenation> | NoParent<Expression> | readonly NoParent<Concatenation>[],
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.FromRegexOptions>
	): ENFA {
		let nodeList: ENFA.NodeList;
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
		const nodeList = ENFA.NodeList.withLimit(creationOptions?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
			function getNext(node: ENFA.Node, char: Char): ENFA.Node {
				if (char > maxCharacter) {
					throw new Error(`All characters have to be <= options.maxCharacter (${maxCharacter}).`);
				}
				if (!Number.isInteger(char)) {
					throw new Error(`All characters have to be integers, ${char} is not.`);
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

	static fromFA(fa: TransitionIterable, creationOptions?: Readonly<ENFA.CreationOptions>): ENFA {
		return ENFA.fromTransitionIterator(fa.transitionIterator(), { maxCharacter: fa.maxCharacter }, creationOptions);
	}

	static fromTransitionIterator<InputNode>(
		iter: FAIterator<InputNode, ReadonlyMap<InputNode, CharSet>>,
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.CreationOptions>
	): ENFA {
		const { maxCharacter } = options;
		const nodeList = ENFA.NodeList.withLimit(creationOptions?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
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
	export class NodeList implements ReadonlyNodeList, Iterable<Node> {
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
			if (id > this._nodeLimit) {
				throw new TooManyNodesError(`The ENFA is not allowed to create more than ${this._nodeLimit} nodes.`);
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

		/**
		 * All states which cannot be reached from the initial state or cannot reach (or are) a final state, will be
		 * removed.
		 */
		removeUnreachable(): void {
			const makeEmpty = (): void => {
				this.initial.in.clear();
				this.initial.out.clear();
				this.final.in.clear();
				this.final.out.clear();
			};

			if (this.final.in.size === 0 || this.initial.out.size === 0) {
				makeEmpty();
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
				makeEmpty();
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
		 * ```txt
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
		 * ```txt
		 * [(1), "a"]
		 * [(4), "d"]
		 * [(1), "e"]
		 * [(3), "b"]
		 * ```
		 */
		static orderedResolveEpsilon(
			node: ENFA.Node,
			direction: "in" | "out",
			consumerFn: (charSet: CharSet, node: ENFA.Node) => void
		): void;
		static orderedResolveEpsilon(
			node: ENFA.ReadonlyNode,
			direction: "in" | "out",
			consumerFn: (charSet: CharSet, node: ENFA.ReadonlyNode) => void
		): void;
		static orderedResolveEpsilon(
			node: ENFA.Node,
			direction: "in" | "out",
			consumerFn: (charSet: CharSet, node: ENFA.Node) => void
		): void {
			DFS(node, n => {
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
		 * Calls the given consumer function on every non-epsilon transition directly reachable from the given node.
		 *
		 * The order in which the consumer function will be called for the pair is implementation-defined. Only use this
		 * if the order of nodes is irrelevant.
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
	export interface CreationOptions {
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
		const { initial, final } = Thompson.create(nodeList, expression, {
			maxCharacter: options.maxCharacter,
			assertions: creationOptions.assertions ?? "throw",
			infinityThreshold: creationOptions.infinityThreshold ?? Infinity,
			optimize: false,
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
namespace Thompson {
	interface Options {
		readonly maxCharacter: Char;
		readonly assertions: "disable" | "throw";
		readonly infinityThreshold: number;
		readonly optimize: boolean;
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

function checkCompatibility(a: FiniteAutomaton | TransitionIterable, b: FiniteAutomaton | TransitionIterable): void {
	if (a.maxCharacter !== b.maxCharacter) {
		throw new RangeError("Both NFAs have to have the same max character.");
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
function localCopyOfIterator<T>(nodeList: ENFA.NodeList, iter: FAIterator<T, ReadonlyMap<T, CharSet>>): SubList {
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
 * @param nodeList
 * @param base
 */
function baseMakeEmpty(nodeList: ENFA.NodeList, base: SubList): void {
	base.initial.in.clear();
	base.initial.out.clear();
	base.final.in.clear();
	base.final.out.clear();
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
