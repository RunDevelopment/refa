import { Char, ReadonlyWord, Word } from "./char-types";
import { WordSet } from "./word-set";
import { cachedFunc, debugAssert, firstOf, intersectSet, traverse, traverseMultiRoot, withoutSet } from "./util";
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
import { isChar } from "./char-util";
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
		P.forEach(eqClass => {
			if (eqClass.size === 1) {
				return;
			}

			let first: DFA.Node | undefined = undefined;
			if (eqClass.has(this.nodes.initial)) {
				first = this.nodes.initial;
			}
			eqClass.forEach(node => {
				if (first === undefined) {
					first = node;
				}
				if (mapping.has(node)) {
					throw new Error("Duplicate mapping");
				}
				mapping.set(node, first);
			});
		});

		if (mapping.size === 0) {
			// the DFA is already minimized
			return;
		}

		const translate = (node: DFA.Node): DFA.Node => {
			return mapping.get(node) ?? node;
		};

		// adjust nodes
		traverse(this.nodes.initial, node => {
			node.out.map(translate);
			return node.out.values();
		});

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
		this.nodes._uncheckedLinkNodesWithCharRange(trap, trap, all);

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

		const allChars = { min: 0, max: maxCharacter };
		const other = nodeList.createNode();
		nodeList._uncheckedLinkNodesWithCharRange(nodeList.initial, other, allChars);
		nodeList._uncheckedLinkNodesWithCharRange(other, other, allChars);
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
						nodeList._uncheckedLinkNodesWithCharacter(node, next, char);
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

		linkNodes(from: Node, to: Node, characters: CharSet | CharRange | Char): void {
			if (from.list !== to.list) {
				throw new Error("You can't link nodes from different node lists.");
			}
			if (from.list !== this) {
				throw new Error("Use the node list associated with the nodes to link them.");
			}

			if (isChar(characters)) {
				this._uncheckedLinkNodesWithCharacter(from, to, characters);
			} else if (characters instanceof CharSet) {
				this._uncheckedLinkNodesWithCharSet(from, to, characters);
			} else {
				this._uncheckedLinkNodesWithCharRange(from, to, characters);
			}
		}
		// eslint-disable-next-line jsdoc/require-param
		/** @internal */
		// eslint-disable-next-line @typescript-eslint/naming-convention
		_uncheckedLinkNodesWithCharacter(from: Node, to: Node, character: Char): void {
			from.out.set(character, to);
		}
		// eslint-disable-next-line jsdoc/require-param
		/** @internal */
		// eslint-disable-next-line @typescript-eslint/naming-convention
		_uncheckedLinkNodesWithCharRange(from: Node, to: Node, characters: CharRange): void {
			from.out.setRange(characters, to);
		}
		// eslint-disable-next-line jsdoc/require-param
		/** @internal */
		// eslint-disable-next-line @typescript-eslint/naming-convention
		_uncheckedLinkNodesWithCharSet(from: Node, to: Node, characters: CharSet): void {
			for (const range of characters.ranges) {
				from.out.setRange(range, to);
			}
		}

		unlinkNodes(from: Node, to: Node): void {
			const toRemove: CharRange[] = [];
			for (const [key, node] of from.out) {
				if (node === to) {
					toRemove.push(key);
				}
			}

			for (let i = 0, l = toRemove.length; i < l; i++) {
				from.out.deleteRange(toRemove[i]);
			}
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

			traverse(this.initial, node => {
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
			const alive = new Set<Node>();
			traverseMultiRoot(this.finals, node => {
				alive.add(node);
				return getInSet(node);
			});

			// Check condition 2)
			traverse(this.initial, node => {
				const next: Node[] = [];
				node.out.filter(n => {
					if (alive.has(n)) {
						next.push(n);
						return true;
					} else {
						return false;
					}
				});
				return next;
			});
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

function findEquivalenceClasses(nodeList: DFA.NodeList, maxCharacter: Char): ReadonlySet<DFA.Node>[];
function findEquivalenceClasses(nodeList: DFA.ReadonlyNodeList, maxCharacter: Char): ReadonlySet<DFA.ReadonlyNode>[];
function findEquivalenceClasses(nodeList: DFA.ReadonlyNodeList, maxCharacter: Char): ReadonlySet<DFA.ReadonlyNode>[] {
	// https://en.wikipedia.org/wiki/DFA_minimization#Hopcroft's_algorithm
	if (nodeList.finals.size === 0) {
		throw new Error("Cannot find equivalence classes for a DFA without final states.");
	}

	const getInMap = cachedFunc<DFA.ReadonlyNode, Map<DFA.ReadonlyNode, CharSet>>(() => new Map());
	const allNodes: DFA.ReadonlyNode[] = [];
	const allCharacterSets = new Set<CharSet>();

	// Go through all nodes to:
	//  1. Determine all nodes
	//  2. Determine all used character sets
	//  3. Create the in map of all nodes
	traverse(nodeList.initial, node => {
		allNodes.push(node);
		const out = node.out.invert(maxCharacter);
		out.forEach((cs, n) => {
			allCharacterSets.add(cs);
			getInMap(n).set(node, cs);
		});
		return out.keys();
	});

	// determine the base sets of all used character sets
	//
	// Hopcroft's algorithm scales linearly with the number of characters in the alphabet. This is bad news for us
	// because in JS regex unicode mode, character sets can contain 1 million characters, so iterating over all of them
	// is not feasible. To make this more efficient, we use the base sets of all the character sets in the given DFA
	// instead. The base sets are a set of non-empty disjoint character sets from which all other character sets in the
	// DFA can be constructed (via union). If we then split all character sets in the DFA into their base sets, we
	// will create a new alphabet (of base sets) that behaves like the "original" alphabet. The only difference is that
	// alphabet of base sets is MUCH smaller. The total number of base sets is bound by both the total number of unique
	// character sets in the DFA and the number of character in the original alphabet.
	const base = new CharBase(allCharacterSets);
	const split = cachedFunc<CharSet, readonly number[]>(set => base.split(set));

	// determine the incoming nodes by base set for all nodes
	//
	// The returned data structure is a nested array. The outer array takes the index of a base set as key and yields
	// the list of nodes that have a transition via the key base set to the function argument node.
	const getIn = cachedFunc<DFA.ReadonlyNode, readonly (readonly DFA.ReadonlyNode[])[]>(node => {
		const inArray: DFA.ReadonlyNode[][] = [];
		getInMap(node).forEach((cs, n) => {
			split(cs).forEach(baseIndex => {
				const value = inArray[baseIndex];
				if (value) {
					value.push(n);
				} else {
					inArray[baseIndex] = [n];
				}
			});
		});
		return inArray;
	});

	const P: ReadonlySet<DFA.ReadonlyNode>[] = [nodeList.finals];
	if (allNodes.length > nodeList.finals.size) {
		P.push(withoutSet(allNodes, nodeList.finals));
	}
	const W = new Set<ReadonlySet<DFA.ReadonlyNode>>(P);

	while (W.size > 0) {
		const A: ReadonlySet<DFA.ReadonlyNode> = firstOf(W)!;
		W.delete(A);

		// this essentially loops through all characters
		for (let baseIndex = 0, l = base.sets.length; baseIndex < l; baseIndex++) {
			const X = new Set<DFA.ReadonlyNode>();
			A.forEach(node => {
				const inArray = getIn(node)[baseIndex];
				if (inArray) {
					inArray.forEach(inNode => X.add(inNode));
				}
			});
			if (X.size === 0) {
				continue;
			}

			for (let i = 0, l = P.length; i < l; i++) {
				const Y = P[i];
				const intersection = intersectSet(X, Y);
				if (intersection.size === 0) {
					continue;
				}
				const without = withoutSet(Y, X);
				if (without.size === 0) {
					continue;
				}

				// This is a little trick to remove `Y` and push `intersection` and `without`
				P.push(intersection);
				P[i] = without;

				if (W.has(Y)) {
					W.delete(Y);
					W.add(intersection);
					W.add(without);
				} else {
					if (intersection.size <= without.size) {
						W.add(intersection);
					} else {
						W.add(without);
					}
				}
			}
		}
	}

	return P;
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
