import { withoutSet, firstOf, intersectSet, DFS, cachedFunc, filterMut, BFS } from "./util";
import { FiniteAutomaton } from "./finite-automaton";
import { CharMap } from "./char-map";
import { CharRange, CharSet, optimizeRanges } from "./char-set";
import { invertCharMap } from "./char-util";
import { FAIterator } from "./fa-iterator";
import { faIterateWordSets, wordSetsToWords, faIsFinite, faWithCharSetsToString } from "./fa-util";
import type { NFA, NFANode } from "./nfa";
import { Simple, Expression } from "./ast";
import { faToRegex } from "./to-regex";


export interface DFANode {
	readonly id: number;
	readonly list: NodeList;
	readonly out: CharMap<DFANode>;
}

let nodeListCounter = 0;
class NodeList {

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

	linkNodes(from: DFANode, to: DFANode, characters: CharRange | number): void {
		if (from.list !== to.list) {
			throw new Error("You can't link nodes from different node lists.");
		}
		if (from.list !== this) {
			throw new Error("Use the node list associated with the nodes to link them.");
		}

		if (typeof characters === "number") {
			from.out.set(characters, to);
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

export interface DFAOptions {
	/**
	 * The maximum numerical value any character can have.
	 *
	 * This will be the maximum of all underlying {@link CharSet | CharSet}s.
	 */
	maxCharacter: number;
}

export class DFA implements FiniteAutomaton {

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
	structurallyEqual(other: DFA): boolean {
		if (this === other) {
			return true;
		}
		if (this.nodes.finals.size !== other.nodes.finals.size) {
			return false;
		}

		const visitedThisNodes = new Set<DFANode>();

		const isEqual = (thisNode: DFANode, otherNode: DFANode): boolean => {
			if (visitedThisNodes.has(thisNode)) {
				return true;
			}
			visitedThisNodes.add(thisNode);

			if (this.nodes.finals.has(thisNode) !== other.nodes.finals.has(otherNode)) {
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
	 * @returns {DFA}
	 */
	minimize(): DFA {
		removeUnreachable(this.nodes);
		const P = findEquivalenceClasses(this.nodes);
		const newNodeList = new NodeList();

		const newNodeMap = new Map<DFANode, DFANode>();
		P.forEach(nodes => {
			const newNode = nodes.has(this.nodes.initial) ? newNodeList.initial : newNodeList.createNode();
			nodes.forEach(n => newNodeMap.set(n, newNode));
		});
		const translate = (n: DFANode): DFANode => newNodeMap.get(n)!;

		// initial and final
		this.nodes.finals.forEach(f => newNodeList.finals.add(translate(f)));

		// transitions
		P.forEach(nodes => {
			nodes.forEach(n => {
				const from = translate(n);
				n.out.forEach((outNode, charCode) => {
					const to = translate(outNode);
					from.out.deleteEvery(charCode);
					newNodeList.linkNodes(from, to, charCode);
				});
			});
		});

		return new DFA(newNodeList, this.options);
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

	static fromNFA(nfa: NFA): DFA {
		const ranges: CharRange[] = [];
		DFS(nfa.nodes.initial, n => {
			n.out.forEach(charSet => {
				ranges.push(...charSet.ranges);
			});
			return n.out.keys();
		});

		const alphabet = getAtomicRanges(ranges);
		const nodeList = new NodeList();

		/**
		 * This will use the subset method to construct the DFA.
		 */

		const nfaNodesToDfaNodeMap = new Map<string, DFANode>();
		const dfaNodeToNfaNodesMap = new Map<DFANode, readonly NFANode[]>();
		function getKey(nodes: readonly NFANode[]): string {
			let key = "";
			for (let i = 0, l = nodes.length; i < l; i++) {
				key += "," + nodes[i].id.toString(16);
			}
			return key;
		}
		function getDfaNode(nodes: Iterable<NFANode>): DFANode {
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
				if (array.some(n => nfa.nodes.finals.has(n))) {
					nodeList.finals.add(dfaNode);
				}

				nfaNodesToDfaNodeMap.set(key, dfaNode);
				dfaNodeToNfaNodesMap.set(dfaNode, array);
			}
			return dfaNode;
		}
		function getNfaNodes(node: DFANode): readonly NFANode[] {
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

		function getOutNode(node: DFANode, char: CharRange): DFANode | undefined {
			const nfaNodes = getNfaNodes(node);
			const outNodes: NFANode[] = [];
			for (const nfaNode of nfaNodes) {
				nfaNode.out.forEach((charSet, outNode) => {
					if (charSet.has(char.min)) {
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

		BFS(nodeList.initial, function* (state) {
			for (const char of alphabet) {
				const out = getOutNode(state, char);
				if (out) {
					nodeList.linkNodes(state, out, char);
					yield out;
				}
			}
		});

		return new DFA(nodeList, {
			maxCharacter: nfa.options.maxCharacter
		});
	}

}


function removeUnreachable(list: NodeList): void {
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
	function walk(node: DFANode): void {
		if (walked.has(node)) return;
		walked.add(node);

		// walk all out node
		const out = new Set<DFANode>();
		node.out.forEach(node => out.add(node));
		out.forEach(n => walk(n));

		if (list.finals.has(node)) {
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
	}
	walk(list.initial);

	// remove dead finals
	for (const finalNode of list.finals) {
		if (!alive.has(finalNode)) {
			list.finals.delete(finalNode);
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
	removeDead(list.initial);
}

/**
 * Returns the atomic ranges for the given character ranges. The returned ranges will be sorted.
 *
 * The atomic ranges for a given set of character ranges are the smallest set of disjoint character ranges which can
 * build all the given character ranges via the union operation.
 *
 * @param ranges
 */
function getAtomicRanges(ranges: Iterable<CharRange>): CharRange[] {
	const union: CharRange[] = [];
	const cutSet = new Set<number>();
	for (const range of ranges) {
		union.push(range);
		cutSet.add(range.min);
		cutSet.add(range.max + 1);
	}
	optimizeRanges(union);

	// a sorted array of all cuts
	const cuts = [...cutSet];
	cuts.sort((a, b) => a - b);

	// cut the union
	const result: CharRange[] = [];

	let cutIndex = 0;
	for (const unionRange of union) {
		cutIndex++; // we know that there is a cut at the beginning of every range

		let min = unionRange.min;
		const max = unionRange.max;

		while (min <= max) {
			const cut = cuts[cutIndex++];
			result.push({ min: min, max: cut - 1 });
			min = cut;
		}
	}

	return result;
}

function findEquivalenceClasses(nodeList: NodeList): Set<Set<DFANode>> {
	// https://en.wikipedia.org/wiki/DFA_minimization#Hopcroft's_algorithm

	const allNodes = new Set<DFANode>();
	const allRanges: CharRange[] = [];
	/** A map from a char code to all nodes which have an incoming transition with that char code. */
	const getInTransitions = cachedFunc<DFANode, CharMap<DFANode[]>>(() => new CharMap());

	DFS(nodeList.initial, node => {
		node.out.forEach((to, range) => {
			allRanges.push(range);

			const inMap: CharMap<DFANode[]> = getInTransitions(to);
			inMap.mapRange(range, set => {
				if (set) {
					return [...set, node];
				} else {
					return [node];
				}
			});
		});

		return node.out.values();
	});

	const alphabet: readonly CharRange[] = getAtomicRanges(allRanges);

	const P = new Set<Set<DFANode>>([nodeList.finals, withoutSet(allNodes, nodeList.finals)]);
	const W = new Set<Set<DFANode>>([nodeList.finals]);

	while (W.size > 0) {
		const A: Set<DFANode> = firstOf(W)!;
		W.delete(A);

		for (const atom of alphabet) {
			const X = new Set<DFANode>();
			A.forEach(n => {
				const edges = getInTransitions(n);
				// because of how the atomic ranges are defined, we can use any char in c
				const inOfC = edges.get(atom.min);
				if (inOfC === undefined) return;
				inOfC.forEach(x => X.add(x));
			});
			if (X.size === 0) continue;

			const pToAdd = [];
			const pToDelete = [];
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
					if (intersection.size < without.size) {
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
