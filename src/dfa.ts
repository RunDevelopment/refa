import { withoutSet, firstOf, intersectSet, cachedFunc, filterMut, BFS, traverse } from "./util";
import { FiniteAutomaton, TooManyNodesError } from "./finite-automaton";
import { CharMap, ReadonlyCharMap } from "./char-map";
import { CharRange, CharSet } from "./char-set";
import { invertCharMap, getBaseSets, decomposeIntoBaseSets } from "./char-util";
import { FAIterator, faIterateStates } from "./fa-iterator";
import { faIterateWordSets, wordSetsToWords, faIsFinite, faWithCharSetsToString } from "./fa-util";
import type { ReadonlyNFA, ReadonlyNFANode } from "./nfa";
import { Simple, Expression } from "./ast";
import { faToRegex } from "./to-regex";


export interface ReadonlyDFANode {
	readonly id: number;
	readonly list: ReadonlyNodeList;
	readonly out: ReadonlyCharMap<ReadonlyDFANode>;
}
export interface DFANode extends ReadonlyDFANode {
	readonly id: number;
	readonly list: NodeList;
	readonly out: CharMap<DFANode>;
}

interface ReadonlyNodeList extends Iterable<ReadonlyDFANode> {
	readonly initial: ReadonlyDFANode;
	readonly finals: ReadonlySet<ReadonlyDFANode>;
	/**
	 * Returns the number of nodes reachable from the initial state including the initial state.
	 *
	 * This may include trap states. This will not include unreachable final states.
	 *
	 * This operation has to traverse the whole graph and runs in _O(E + V)_.
	 */
	count(): number;
}
let nodeListCounter = 0;
class NodeList implements ReadonlyNodeList {

	// variables for checks and debugging
	private readonly id: number;
	private _nodeCounter: number = 0;

	readonly initial: DFANode;
	readonly finals: Set<DFANode> = new Set();

	constructor() {
		this.id = nodeListCounter++;
		this.initial = this.createNode();
	}

	createNode(): DFANode {
		const node: DFANode = {
			id: this._nodeCounter++, // for debugging
			list: this,
			out: new CharMap<DFANode>()
		};
		return node;
	}

	linkNodes(from: DFANode, to: DFANode, characters: CharSet | CharRange | number): void {
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

	unlinkNodes(from: DFANode, to: DFANode): void {
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

		const alive = new Set<DFANode>();

		const walked = new Set<DFANode>();
		const walk = (node: DFANode): void => {
			if (walked.has(node)) return;
			walked.add(node);

			// walk all out node
			const out = new Set<DFANode>();
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
		function removeDead(node: DFANode): void {
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

	*[Symbol.iterator](): IterableIterator<DFANode> {
		const visited = new Set<DFANode>();
		let toVisit = [this.initial];
		while (toVisit.length > 0) {
			const newVisit: DFANode[] = [];
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

	stateIterator(): FAIterator<DFANode> {
		return {
			initial: this.initial,
			getOut: n => {
				const out = new Set<DFANode>();
				n.out.forEach(n => out.add(n));
				return out;
			},
			isFinal: n => this.finals.has(n)
		};
	}
}

function toTransIter(list: NodeList, maximum: number): FAIterator<DFANode, Iterable<[DFANode, CharSet]>> {
	return {
		initial: list.initial,
		getOut: n => invertCharMap(n.out, maximum),
		isFinal: n => list.finals.has(n)
	};
}
function toStateIter(list: NodeList): FAIterator<DFANode> {
	return {
		initial: list.initial,
		getOut: n => n.out.values(),
		isFinal: n => list.finals.has(n)
	};
}

export interface CreationOptions {
	/**
	 * The maximum number of nodes the DFA creation operation is allowed to create before throwing a
	 * `TooManyNodesError`.
	 *
	 * If the maximum number of nodes is unset or set to `Infinity`, the DFA creation operation may create as many nodes
	 * as necessary to construct the DFA. This might cause the machine to run out of memory as the conversion from NFA
	 * to DFA may create up to 2^n many nodes.
	 */
	maxNodes?: number;
}

export type ReadonlyCreationOptions = Readonly<CreationOptions>;


export interface DFAOptions {
	/**
	 * The maximum numerical value any character can have.
	 *
	 * This will be the maximum of all underlying {@link CharSet | CharSet}s.
	 */
	maxCharacter: number;
}

export interface ReadonlyDFA extends FiniteAutomaton {
	readonly nodes: ReadonlyNodeList;
	readonly options: Readonly<DFAOptions>;

	/**
	 * Creates a new DFA with is equivalent to this one.
	 */
	clone(): DFA;

	/**
	 * Returns whether this and the given DFA are structurally equal meaning that all nodes and all transitions are
	 * equal.
	 *
	 * @param other
	 */
	structurallyEqual(other: ReadonlyDFA): boolean;
}
export class DFA implements ReadonlyDFA {

	readonly nodes: NodeList;
	readonly options: Readonly<DFAOptions>;

	private constructor(nodes: NodeList, options: Readonly<DFAOptions>) {
		this.nodes = nodes;
		this.options = options;
	}

	get isEmpty(): boolean {
		return this.nodes.finals.size === 0;
	}

	get isFinite(): boolean {
		return faIsFinite(toStateIter(this.nodes));
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

		return faIterateWordSets(toTransIter(this.nodes, this.options.maxCharacter));
	}

	words(): Iterable<number[]> {
		return wordSetsToWords(this.wordSets());
	}

	toString(): string {
		return faWithCharSetsToString(toTransIter(this.nodes, this.options.maxCharacter));
	}

	toRegex(): Simple<Expression> {
		return faToRegex(toTransIter(this.nodes, this.options.maxCharacter));
	}

	/**
	 * Creates a new DFA with is equivalent to this one.
	 */
	clone(): DFA {
		const nodeList = this.nodes;
		const newNodeList = new NodeList();

		const translationMap = new Map<DFANode, DFANode>();
		translationMap.set(nodeList.initial, newNodeList.initial);
		function translate(node: DFANode): DFANode {
			let trans = translationMap.get(node);
			if (trans === undefined) {
				trans = newNodeList.createNode();
				translationMap.set(node, trans);
				node.out.forEach((n, k) => newNodeList.linkNodes(trans!, translate(n), k));
			}
			return trans;
		}

		translate(nodeList.initial);
		nodeList.finals.forEach(f => newNodeList.finals.add(translate(f)));

		return new DFA(newNodeList, this.options);
	}

	/**
	 * Returns whether this and the given DFA are structurally equal meaning that all nodes and all transitions are
	 * equal.
	 *
	 * @param other
	 */
	structurallyEqual(other: ReadonlyDFA): boolean {
		if (this === other) {
			return true;
		}
		if (this.nodes.finals.size !== other.nodes.finals.size) {
			return false;
		}

		const visitedThisNodes = new Set<ReadonlyDFANode>();

		const thisFinals: ReadonlySet<ReadonlyDFANode> = this.nodes.finals;
		const otherFinals: ReadonlySet<ReadonlyDFANode> = other.nodes.finals;
		const isEqual = (thisNode: ReadonlyDFANode, otherNode: ReadonlyDFANode): boolean => {
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

		const P = findEquivalenceClasses(this.nodes, this.options.maxCharacter);

		const mapping = new Map<DFANode, DFANode>();
		P.forEach(eqClass => {
			let first: DFANode | undefined = undefined;
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
		const translate = (node: DFANode): DFANode => {
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
		const all: CharRange = { min: 0, max: this.options.maxCharacter };

		// create a trap state
		const trap = this.nodes.createNode();
		this.nodes.linkNodes(trap, trap, all);

		// Link all gaps to the trap state
		traverse(this.nodes.initial, node => {
			const outNodes = new Set(node.out.values());
			node.out.mapRange(all, (nodeOrUndef => nodeOrUndef ?? trap));
			return outNodes;
		});

		// Complement the set of final states.
		const nonFinal = withoutSet(faIterateStates(this.nodes.stateIterator()), this.nodes.finals);
		this.nodes.finals.clear();
		nonFinal.forEach(n => this.nodes.finals.add(n));

		// one or more final states might have become trap states, so let's remove them
		this.nodes.removeUnreachable();
	}


	/**
	 * Creates a new DFA which matches no words. The language of the returned DFA is empty.
	 *
	 * @param options
	 */
	static empty(options: Readonly<DFAOptions>): DFA {
		const nodeList = new NodeList();
		return new DFA(nodeList, options);
	}

	/**
	 * Creates a new DFA which matches all words.
	 *
	 * @param options
	 */
	static all(options: Readonly<DFAOptions>): DFA {
		const nodeList = new NodeList();
		nodeList.finals.add(nodeList.initial);

		const allChars = { min: 0, max: options.maxCharacter };
		const other = nodeList.createNode();
		nodeList.linkNodes(nodeList.initial, other, allChars);
		nodeList.linkNodes(other, other, allChars);
		nodeList.finals.add(other);

		return new DFA(nodeList, options);
	}

	static fromWords(words: Iterable<Iterable<number>>, options: Readonly<DFAOptions>): DFA {
		const nodeList = new NodeList();

		// build a prefix trie
		for (const word of words) {
			let node = nodeList.initial;
			for (const char of word) {
				if (char > options.maxCharacter) {
					throw new Error(`All characters have to be <= options.maxCharacter (${options.maxCharacter}).`);
				}
				if (!Number.isInteger(char)) {
					throw new Error(`All characters have to be integers, ${char} is not.`);
				}

				let next = node.out.get(char);
				if (next === undefined) {
					next = nodeList.createNode();
					nodeList.linkNodes(node, next, char);
				}
				node = next;
			}
			nodeList.finals.add(node);
		}

		return new DFA(nodeList, options);
	}

	static fromNFA(nfa: ReadonlyNFA, creationOptions?: ReadonlyCreationOptions): DFA {
		const maxNodes = creationOptions?.maxNodes ?? Infinity;

		const transitionSets = new Set<CharSet>();
		traverse(nfa.nodes.initial, n => {
			n.out.forEach(c => transitionSets.add(c));
			return n.out.keys();
		});

		const alphabet = getBaseSets(transitionSets);
		const nodeList = new NodeList();
		let nodeCount = 0;

		/**
		 * This will use the subset method to construct the DFA.
		 */

		const nfaNodesToDfaNodeMap = new Map<string, DFANode>();
		const dfaNodeToNfaNodesMap = new Map<DFANode, readonly ReadonlyNFANode[]>();
		function getKey(nodes: readonly ReadonlyNFANode[]): string {
			let key = "";
			for (let i = 0, l = nodes.length; i < l; i++) {
				key += "," + nodes[i].id.toString(16);
			}
			return key;
		}
		function getDfaNode(nodes: Iterable<ReadonlyNFANode>): DFANode {
			const array = [...nodes];
			// sort
			array.sort((a, b) => a.id - b.id);
			// remove duplicates
			filterMut(array, (n, prev) => n !== prev);

			const key = getKey(array);
			let dfaNode = nfaNodesToDfaNodeMap.get(key);
			if (dfaNode === undefined) {
				// this will create a new node AND set it as final if it contains a final NFA state
				dfaNode = nodeList.createNode();
				nodeCount++;
				if (nodeCount > maxNodes) {
					throw new TooManyNodesError();
				}
				if (array.some(n => nfa.nodes.finals.has(n))) {
					nodeList.finals.add(dfaNode);
				}

				nfaNodesToDfaNodeMap.set(key, dfaNode);
				dfaNodeToNfaNodesMap.set(dfaNode, array);
			}
			return dfaNode;
		}
		function getNfaNodes(node: DFANode): readonly ReadonlyNFANode[] {
			const nodes = dfaNodeToNfaNodesMap.get(node);
			if (nodes === undefined) {
				throw new Error("Unregistered DFA node.");
			}
			return nodes;
		}
		// set initial states
		nfaNodesToDfaNodeMap.set(getKey([nfa.nodes.initial]), nodeList.initial);
		dfaNodeToNfaNodesMap.set(nodeList.initial, [nfa.nodes.initial]);
		if (nfa.nodes.finals.has(nfa.nodes.initial)) {
			nodeList.finals.add(nodeList.initial);
		}

		function getOutNode(node: DFANode, baseSet: CharSet): DFANode | undefined {
			const baseMin = baseSet.ranges[0].min;
			const nfaNodes = getNfaNodes(node);
			const outNodes: ReadonlyNFANode[] = [];
			for (const nfaNode of nfaNodes) {
				nfaNode.out.forEach((charSet, outNode) => {
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
			const nodes = new Set<DFANode>();
			for (const set of alphabet) {
				const out = getOutNode(state, set);
				if (out) {
					nodeList.linkNodes(state, out, set);
					nodes.add(out);
				}
			}
			return nodes;
		});

		return new DFA(nodeList, {
			maxCharacter: nfa.options.maxCharacter
		});
	}

}


function findEquivalenceClasses(nodeList: NodeList, maxCharacter: number): Set<ReadonlySet<DFANode>>;
function findEquivalenceClasses(nodeList: ReadonlyNodeList, maxCharacter: number): Set<ReadonlySet<ReadonlyDFANode>>;
function findEquivalenceClasses(nodeList: ReadonlyNodeList, maxCharacter: number): Set<ReadonlySet<ReadonlyDFANode>> {
	// https://en.wikipedia.org/wiki/DFA_minimization#Hopcroft's_algorithm
	if (nodeList.finals.size === 0) {
		throw new Error("Cannot find equivalence classes for a DFA without final states.");
	}

	const getInMap = cachedFunc<ReadonlyDFANode, Map<ReadonlyDFANode, CharSet>>(() => new Map());
	const allNodes: ReadonlyDFANode[] = [];
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
	const getIn = cachedFunc<ReadonlyDFANode, readonly (readonly ReadonlyDFANode[])[]>(node => {
		const inArray: ReadonlyDFANode[][] = [];
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


	const P = new Set<ReadonlySet<ReadonlyDFANode>>([nodeList.finals]);
	if (allNodes.length > nodeList.finals.size) {
		P.add(withoutSet(allNodes, nodeList.finals));
	}
	const W = new Set<ReadonlySet<ReadonlyDFANode>>(P);

	while (W.size > 0) {
		const A: ReadonlySet<ReadonlyDFANode> = firstOf(W)!;
		W.delete(A);

		// this essentially loops through all characters
		for (let baseIndex = 0, l = baseSets.length; baseIndex < l; baseIndex++) {
			const X = new Set<ReadonlyDFANode>();
			A.forEach(node => {
				const inArray = getIn(node)[baseIndex];
				if (inArray) {
					inArray.forEach(inNode => X.add(inNode));
				}
			});
			if (X.size === 0) continue;

			const pToAdd: ReadonlySet<ReadonlyDFANode>[] = [];
			const pToDelete: ReadonlySet<ReadonlyDFANode>[] = [];
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
