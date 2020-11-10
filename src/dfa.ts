import { withoutSet, firstOf, intersectSet, cachedFunc, filterMut, traverse } from "./util";
import {
	FAIterator,
	FiniteAutomaton,
	IntersectionOptions,
	TooManyNodesError,
	ToRegexOptions,
	TransitionIterable,
	TransitionIterableFA,
} from "./finite-automaton";
import { CharMap, ReadonlyCharMap } from "./char-map";
import { CharRange, CharSet } from "./char-set";
import { invertCharMap, getBaseSets, decomposeIntoBaseSets } from "./char-util";
import {
	faIterateStates,
	faCanReachFinal,
	faEnsurePureOut,
	faLanguageIsFinite,
	faMapOut,
	faTraverse,
} from "./fa-iterator";
import { faIterateWordSets, wordSetsToWords, faWithCharSetsToString } from "./fa-util";
import { Simple, Expression } from "./ast";
import { faToRegex } from "./to-regex";
import { lazyIntersection, TransitionMapBuilder } from "./intersection";

const DEFAULT_MAX_NODES = 10_000;

export interface ReadonlyDFA extends TransitionIterableFA {
	readonly nodes: DFA.ReadonlyNodeList;
	readonly options: Readonly<DFA.Options>;

	stateIterator(): FAIterator<DFA.ReadonlyNode>;
	transitionIterator(): FAIterator<DFA.ReadonlyNode, ReadonlyMap<DFA.ReadonlyNode, CharSet>>;

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
export class DFA implements ReadonlyDFA {
	readonly nodes: DFA.NodeList;
	readonly maxCharacter: number;

	private constructor(nodes: DFA.NodeList, maxCharacter: number) {
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
		return faLanguageIsFinite(this.stateIterator());
	}

	stateIterator(): FAIterator<DFA.ReadonlyNode> {
		return iterStates(this.nodes);
	}
	transitionIterator(): FAIterator<DFA.ReadonlyNode, ReadonlyMap<DFA.ReadonlyNode, CharSet>> {
		const finals: ReadonlySet<DFA.ReadonlyNode> = this.nodes.finals;
		const maximum = this.maxCharacter;

		return {
			initial: this.nodes.initial,
			getOut: n => invertCharMap(n.out, maximum),
			isFinal: n => finals.has(n),
		};
	}

	test(word: Iterable<number>): boolean {
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

	wordSets(): Iterable<CharSet[]> {
		if (this.isEmpty) {
			return [];
		}

		return faIterateWordSets(this.transitionIterator());
	}

	words(): Iterable<number[]> {
		return wordSetsToWords(this.wordSets());
	}

	toString(): string {
		return faWithCharSetsToString(this.transitionIterator());
	}

	toRegex(options?: Readonly<ToRegexOptions>): Simple<Expression> {
		return faToRegex(this.transitionIterator(), options);
	}

	isDisjointWith(other: TransitionIterable, options?: Readonly<IntersectionOptions>): boolean {
		checkCompatibility(this, other);

		const iter = lazyIntersection(
			new TransitionMapBuilder(),
			this.transitionIterator(),
			other.transitionIterator(),
			options
		);

		return !faCanReachFinal(faMapOut(iter, n => n.keys()));
	}
	intersectionWordSets(other: TransitionIterable, options?: Readonly<IntersectionOptions>): Iterable<CharSet[]> {
		checkCompatibility(this, other);

		const iter = lazyIntersection(
			new TransitionMapBuilder(),
			this.transitionIterator(),
			other.transitionIterator(),
			options
		);

		return faIterateWordSets(iter);
	}
	intersectionWords(other: TransitionIterable, options?: Readonly<IntersectionOptions>): Iterable<number[]> {
		return wordSetsToWords(this.intersectionWordSets(other, options));
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
			let first: DFA.Node | undefined = undefined;
			if (eqClass.has(this.nodes.initial)) {
				first = this.nodes.initial;
			}
			if (eqClass.size === 0) {
				throw new Error("Empty equivalence class");
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
		const translate = (node: DFA.Node): DFA.Node => {
			const mappedNode = mapping.get(node);
			if (mappedNode === undefined) {
				throw new Error("Unmapped node");
			}
			return mappedNode;
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
		const nonFinal = withoutSet(faIterateStates(iterStatesMut(this.nodes)), this.nodes.finals);
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
	static fromIntersection(
		left: TransitionIterable,
		right: TransitionIterable,
		options?: Readonly<IntersectionOptions>
	): DFA {
		checkCompatibility(left, right);

		const nodeList = nodeListWithLimit(options?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
			const iter = lazyIntersection(nodeList, left.transitionIterator(), right.transitionIterator(), options);

			// traverse the whole iterator to create our NodeList
			faTraverse(faMapOut(iter, n => n.out.values()));

			// A cleanup still has to be performed because while all states are connected to the initial state, they might
			// not be able to reach a final state. This will remove such trap states.
			nodeList.removeUnreachable();
		});

		return new DFA(nodeList, left.maxCharacter);
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
		words: Iterable<Iterable<number>>,
		options: Readonly<DFA.Options>,
		creationOptions?: Readonly<DFA.CreationOptions>
	): DFA {
		const { maxCharacter } = options;

		const nodeList = nodeListWithLimit(creationOptions?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
			// build a prefix trie
			for (const word of words) {
				let node = nodeList.initial;
				for (const char of word) {
					if (char > maxCharacter) {
						throw new Error(`All characters have to be <= options.maxCharacter (${maxCharacter}).`);
					}
					if (!Number.isInteger(char)) {
						throw new Error(`All characters have to be integers, ${char} is not.`);
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

	static fromFA(fa: TransitionIterable, creationOptions?: Readonly<DFA.CreationOptions>): DFA {
		if (fa instanceof DFA) {
			const nodeList = nodeListWithLimit(creationOptions?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
				copyTo(fa.nodes, nodeList);
			});
			return new DFA(nodeList, fa.maxCharacter);
		} else {
			return DFA.fromTransitionIterator(
				fa.transitionIterator(),
				{ maxCharacter: fa.maxCharacter },
				creationOptions
			);
		}
	}

	static fromTransitionIterator<InputNode>(
		iter: FAIterator<InputNode, ReadonlyMap<InputNode, CharSet>>,
		options: Readonly<DFA.Options>,
		creationOptions?: Readonly<DFA.CreationOptions>
	): DFA {
		const nodeList = nodeListWithLimit(creationOptions?.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
			iter = faEnsurePureOut(iter);

			const transitionSets = new Set<CharSet>();
			traverse(iter.initial, n => {
				const out = iter.getOut(n);
				out.forEach(c => transitionSets.add(c));
				return out.keys();
			});

			const alphabet = getBaseSets(transitionSets);

			const idMap = new Map<InputNode, number>();
			function getId(node: InputNode): number {
				let value = idMap.get(node);
				if (value === undefined) {
					value = idMap.size;
					idMap.set(node, value);
				}
				return value;
			}

			/**
			 * This will use the subset method to construct the DFA.
			 */

			const inputNodesToDfaNodeMap = new Map<string, DFA.Node>();
			const dfaNodeToInputNodesMap = new Map<DFA.Node, readonly InputNode[]>();
			function getKey(nodes: readonly InputNode[]): string {
				let key = "";
				for (let i = 0, l = nodes.length; i < l; i++) {
					key += "," + getId(nodes[i]).toString(16);
				}
				return key;
			}
			function getDfaNode(nodes: InputNode[]): DFA.Node {
				// sort
				nodes.sort((a, b) => getId(a) - getId(b));
				// remove duplicates
				filterMut(nodes, (n, prev) => n !== prev);

				const key = getKey(nodes);
				let dfaNode = inputNodesToDfaNodeMap.get(key);
				if (dfaNode === undefined) {
					// this will create a new node AND set it as final if it contains a final NFA state
					dfaNode = nodeList.createNode();
					if (nodes.some(n => iter.isFinal(n))) {
						nodeList.finals.add(dfaNode);
					}

					inputNodesToDfaNodeMap.set(key, dfaNode);
					dfaNodeToInputNodesMap.set(dfaNode, nodes);
				}
				return dfaNode;
			}
			function getInputNodes(node: DFA.Node): readonly InputNode[] {
				const nodes = dfaNodeToInputNodesMap.get(node);
				if (nodes === undefined) {
					throw new Error("Unregistered DFA node.");
				}
				return nodes;
			}
			// set initial states
			inputNodesToDfaNodeMap.set(getKey([iter.initial]), nodeList.initial);
			dfaNodeToInputNodesMap.set(nodeList.initial, [iter.initial]);
			if (iter.isFinal(iter.initial)) {
				nodeList.finals.add(nodeList.initial);
			}

			function getOutNode(node: DFA.Node, baseSet: CharSet): DFA.Node | undefined {
				const baseMin = baseSet.ranges[0].min;
				const inputNodes = getInputNodes(node);
				const outNodes: InputNode[] = [];
				for (const inputNode of inputNodes) {
					iter.getOut(inputNode).forEach((charSet, outNode) => {
						if (charSet.has(baseMin)) {
							outNodes.push(outNode);
						}
					});
				}

				if (outNodes.length === 0) {
					// this is the most likely event, so we save all transitions which go to trap state
					return undefined;
				} else {
					return getDfaNode(outNodes);
				}
			}

			traverse(nodeList.initial, state => {
				const nodes = new Set<DFA.Node>();
				for (const set of alphabet) {
					const out = getOutNode(state, set);
					if (out) {
						nodeList._uncheckedLinkNodesWithCharSet(state, out, set);
						nodes.add(out);
					}
				}
				return nodes;
			});
		});

		return new DFA(nodeList, options.maxCharacter);
	}
}

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
	export class NodeList implements ReadonlyNodeList {
		private _nodeCounter: number = 0;
		private _nodeLimit: number = Infinity;

		readonly initial: Node;
		readonly finals: Set<Node> = new Set();

		constructor() {
			this.initial = this.createNode();
		}

		createNode(): Node {
			const id = this._nodeCounter++;
			if (id > this._nodeLimit) {
				throw new TooManyNodesError(`The DFA is not allowed to create more than ${this._nodeLimit} nodes.`);
			}

			const node: Node & { id: number } = {
				id, // for debugging
				list: this,
				out: new CharMap<Node>(),
			};
			return node;
		}

		linkNodes(from: Node, to: Node, characters: CharSet | CharRange | number): void {
			if (from.list !== to.list) {
				throw new Error("You can't link nodes from different node lists.");
			}
			if (from.list !== this) {
				throw new Error("Use the node list associated with the nodes to link them.");
			}

			if (typeof characters === "number") {
				from.out.set(characters, to);
			} else if (characters instanceof CharSet) {
				for (const range of characters.ranges) {
					from.out.setEvery(range, to);
				}
			} else {
				from.out.setEvery(characters, to);
			}
		}
		_uncheckedLinkNodesWithCharacter(from: Node, to: Node, character: number): void {
			from.out.set(character, to);
		}
		_uncheckedLinkNodesWithCharRange(from: Node, to: Node, characters: CharRange): void {
			from.out.setEvery(characters, to);
		}
		_uncheckedLinkNodesWithCharSet(from: Node, to: Node, characters: CharSet): void {
			for (const range of characters.ranges) {
				from.out.setEvery(range, to);
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
				from.out.deleteEvery(toRemove[i]);
			}
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

			const alive = new Set<Node>();

			const walked = new Set<Node>();
			const walk = (node: Node): void => {
				if (walked.has(node)) return;
				walked.add(node);

				// walk all out node
				const out = new Set<Node>();
				node.out.forEach(node => out.add(node));
				out.forEach(n => walk(n));

				if (this.finals.has(node)) {
					// if it's final, it satisfies both conditions
					alive.add(node);
				} else {
					// if at least one out node is alive, this node it too
					for (const outNode of out) {
						if (alive.has(outNode)) {
							alive.add(node);
							break;
						}
					}
				}
			};
			walk(this.initial);

			// remove dead finals
			for (const finalNode of this.finals) {
				if (!alive.has(finalNode)) {
					this.finals.delete(finalNode);
				}
			}

			// remove dead nodes reachable from the initial state
			function removeDead(node: Node): void {
				const toRemove: CharRange[] = [];
				for (const [range, outNode] of node.out) {
					if (!alive.has(outNode)) {
						toRemove.push(range);
					}
				}
				toRemove.forEach(n => node.out.deleteEvery(n));
			}
			removeDead(this.initial);
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
	export interface CreationOptions {
		/**
		 * The maximum number of nodes the DFA creation operation is allowed to create before throwing a
		 * `TooManyNodesError`.
		 *
		 * If the maximum number of nodes is set to `Infinity`, the DFA creation operation may create as many nodes as
		 * necessary to construct the DFA. This might cause the machine to run out of memory. I.e. the conversion from
		 * NFA to DFA may create `O(2^n)` many nodes and an intersection may created `O(n * m)` many.
		 *
		 * By default, this value is set to 10K nodes.
		 *
		 * Note: This limit describes the maximum number of __created__ nodes. If nodes are created and subsequently
		 * discard, they will still count toward the limit.
		 */
		maxNodes?: number;
	}
	export interface Options {
		/**
		 * The maximum numerical value any character can have.
		 *
		 * This will be the maximum of all underlying {@link CharSet}s.
		 */
		maxCharacter: number;
	}
}

/**
 * Creates a node list that is only allowed to create a certain number of nodes during the execution of the given
 * consumer function.
 *
 * After the node list is returned by this function, the limit no longer applies.
 *
 * @param maxNodes
 * @param consumerFn
 */
function nodeListWithLimit(maxNodes: number, consumerFn: (nodeList: DFA.NodeList) => void): DFA.NodeList {
	const nodeList = new DFA.NodeList();
	nodeList["_nodeLimit"] = maxNodes;
	consumerFn(nodeList);
	nodeList["_nodeLimit"] = Infinity;
	return nodeList;
}

function checkCompatibility(a: FiniteAutomaton | TransitionIterable, b: FiniteAutomaton | TransitionIterable): void {
	if (a.maxCharacter !== b.maxCharacter) {
		throw new RangeError("Both NFAs have to have the same max character.");
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

function findEquivalenceClasses(nodeList: DFA.NodeList, maxCharacter: number): Set<ReadonlySet<DFA.Node>>;
function findEquivalenceClasses(
	nodeList: DFA.ReadonlyNodeList,
	maxCharacter: number
): Set<ReadonlySet<DFA.ReadonlyNode>>;
function findEquivalenceClasses(
	nodeList: DFA.ReadonlyNodeList,
	maxCharacter: number
): Set<ReadonlySet<DFA.ReadonlyNode>> {
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
		const out = invertCharMap(node.out, maxCharacter);
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
	// DFA can be constructed (via union). If we then decompose all character sets in the DFA into their base sets, we
	// will create a new alphabet (of base sets) that behaves like the "original" alphabet. The only difference is that
	// alphabet of base sets is MUCH smaller. The total number of base sets is bound by both the total number of unique
	// character sets in the DFA and the number of character in the original alphabet.
	const baseSets = getBaseSets(allCharacterSets);
	const decompose = cachedFunc<CharSet, readonly number[]>(set => decomposeIntoBaseSets(set, baseSets));

	// determine the incoming nodes by base set for all nodes
	//
	// The returned data structure is a nested array. The outer array takes the index of a base set as key and yields
	// the list of nodes that have a transition via the key base set to the function argument node.
	const getIn = cachedFunc<DFA.ReadonlyNode, readonly (readonly DFA.ReadonlyNode[])[]>(node => {
		const inArray: DFA.ReadonlyNode[][] = [];
		getInMap(node).forEach((cs, n) => {
			decompose(cs).forEach(baseIndex => {
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

	const P = new Set<ReadonlySet<DFA.ReadonlyNode>>([nodeList.finals]);
	if (allNodes.length > nodeList.finals.size) {
		P.add(withoutSet(allNodes, nodeList.finals));
	}
	const W = new Set<ReadonlySet<DFA.ReadonlyNode>>(P);

	while (W.size > 0) {
		const A: ReadonlySet<DFA.ReadonlyNode> = firstOf(W)!;
		W.delete(A);

		// this essentially loops through all characters
		for (let baseIndex = 0, l = baseSets.length; baseIndex < l; baseIndex++) {
			const X = new Set<DFA.ReadonlyNode>();
			A.forEach(node => {
				const inArray = getIn(node)[baseIndex];
				if (inArray) {
					inArray.forEach(inNode => X.add(inNode));
				}
			});
			if (X.size === 0) continue;

			const pToAdd: ReadonlySet<DFA.ReadonlyNode>[] = [];
			const pToDelete: ReadonlySet<DFA.ReadonlyNode>[] = [];
			for (const Y of P) {
				const intersection = intersectSet(X, Y);
				if (intersection.size === 0) continue;
				const without = withoutSet(Y, X);
				if (without.size === 0) continue;

				pToAdd.push(intersection, without);
				pToDelete.push(Y);

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
			pToDelete.forEach(x => P.delete(x));
			pToAdd.forEach(x => P.add(x));
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
			toNode.out.setEvery(range, translate(n));
		});

		return next;
	});

	fromNodeList.finals.forEach(f => toNodeList.finals.add(translate(f)));
}
