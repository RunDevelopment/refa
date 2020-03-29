import { Concatenation, Quantifier, Element, Simple, Expression } from "./ast";
import { CharSet } from "./char-set";
import { DFS, assertNever, createIndexMap, cachedFunc } from "./util";
import { FiniteAutomaton } from "./finite-automaton";
import { faToString, faIterateWordSets, wordSetsToWords, faIsFinite } from "./fa-util";
import { rangesToString, invertCharMap } from "./char-util";
import type { DFA, DFANode } from "./dfa";
import { faToRegex } from "./to-regex";


export interface NFANode {
	readonly id: number;
	readonly list: NodeList;
	readonly out: Map<NFANode, CharSet>;
	readonly in: Map<NFANode, CharSet>;
}

class NodeList {

	// variables for checks and debugging
	private readonly id: number;
	private _nodeCounter: number = 0;
	private static _counter: number = 0;

	readonly initial: NFANode;
	readonly final: Set<NFANode>;

	constructor() {
		this.id = NodeList._counter++;
		this.final = new Set();
		this.initial = this.createNode();
	}

	createNode(): NFANode {
		const node: NFANode = {
			id: this._nodeCounter++,
			list: this,
			out: new Map(), in: new Map()
		};
		return node;
	}

	linkNodes(from: NFANode, to: NFANode, characters: CharSet): void {
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

	unlinkNodes(from: NFANode, to: NFANode): void {
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

	removeUnreachable(): void {
		const makeEmpty = (): void => {
			this.final.clear();
			this.initial.in.clear();
			this.initial.out.clear();
		}

		if (this.final.size === 0) {
			makeEmpty();
			return;
		}

		const removeNode = (node: NFANode): void => {
			if (node === this.initial) {
				throw new Error("Cannot remove the initial state.");
			}

			this.final.delete(node);
			for (const outgoing of node.out.keys()) {
				this.unlinkNodes(node, outgoing);
			}
			for (const incoming of node.in.keys()) {
				this.unlinkNodes(incoming, node);
			}
		};

		// 1) Get all nodes
		const allNodes = new Set<NFANode>(this.final);
		DFS(this.initial, node => {
			allNodes.add(node);
			return [...node.in.keys(), ...node.out.keys()];
		});

		// 2) Get all nodes reachable from the initial state
		const reachableFromInitial = new Set<NFANode>();
		DFS(this.initial, node => {
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
		if (this.final.size === 0) {
			makeEmpty();
			return;
		}

		// 5) Get all nodes which can reach a final state
		const canReachFinal = new Set<NFANode>();
		for (const final of this.final) {
			DFS(final, node => {
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

	*[Symbol.iterator](): IterableIterator<NFANode> {
		const visited = new Set<NFANode>();
		let toVisit = [this.initial];
		while (toVisit.length > 0) {
			const newVisit: NFANode[] = [];
			for (const node of toVisit) {
				if (!visited.has(node)) {
					visited.add(node);
					yield node;
					for (const outNode of node.out.keys()) {
						newVisit.push(outNode);
					}
				}
			}
			toVisit = newVisit;
		}
	}

}

/**
 * The actual implementation of the linkNodes function.
 *
 * @param map
 * @param to
 * @param characters
 */
function linkNodesAddImpl(map: Map<NFANode, CharSet>, to: NFANode, characters: CharSet): void {
	const current = map.get(to);
	if (current === undefined) {
		map.set(to, characters);
	} else {
		map.set(to, current.union(characters));
	}
}


interface SubList {
	readonly initial: NFANode;
	readonly final: Set<NFANode>;
}

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


export interface NFAOptions {
	/**
	 * The maximum numerical value any character can have.
	 *
	 * This will be the maximum of all underlying {@link CharSet | CharSet}s.
	 */
	maxCharacter: number;
}

export class NFA implements FiniteAutomaton {

	readonly nodes: NodeList;
	readonly options: Readonly<NFAOptions>;

	private constructor(nodes: NodeList, options: Readonly<NFAOptions>) {
		this.nodes = nodes;
		this.options = options;
	}

	get isEmpty(): boolean {
		return this.nodes.final.size === 0;
	}

	get isFinite(): boolean {
		return this.isEmpty || faIsFinite(
			this.nodes.initial,
			n => n.out.keys(),
			n => this.nodes.final.has(n)
		);
	}

	/**
	 * Create a copy of this NFA.
	 */
	copy(): NFA {
		const copy = new NFA(new NodeList(), this.options);
		copy.union(this);
		return copy;
	}

	test(word: Iterable<number>): boolean {
		const nodes = this.nodes;
		const characters = [...word];

		function match(index: number, node: NFANode): boolean {
			if (index >= characters.length)
				return nodes.final.has(node);

			const cp = characters[index];

			for (const [to, chars] of node.out) {
				if (chars.has(cp)) {
					if (match(index + 1, to)) {
						return true;
					}
				}
			}

			return false;
		}
		return match(0, nodes.initial);
	}

	wordSets(): Iterable<CharSet[]> {
		if (this.isEmpty) {
			return [];
		}

		return faIterateWordSets(
			this.nodes.initial,
			n => n.out,
			f => this.nodes.final.has(f)
		);
	}

	words(): Iterable<number[]> {
		return wordSetsToWords(this.wordSets());
	}

	toString(): string {
		return faToString(
			this.nodes.initial,
			n => [...n.out].map(([to, characters]) => [to, rangesToString(characters.ranges)]),
			n => this.nodes.final.has(n)
		);
	}

	toRegex(): Simple<Expression> {
		return faToRegex(
			this.nodes.initial,
			n => n.out,
			n => this.nodes.final.has(n)
		);
	}

	static intersect(left: NFA, right: NFA): NFA {
		const { nodeList, addOutgoing } = createNFAIntersectionEnv(left, right);

		// By recursively creating and following outgoing nodes, we only create the part of the intersection NFA which
		// is connected to the initial state. This means that we do not create nodes which will be removed either way
		// which can potentially speed up the intersection by orders of magnitude.

		// (It doesn't matter in which way we traverse the NFA as long as we traverse all of it.)
		DFS(nodeList.initial, from => {
			addOutgoing(from);
			return from.out.keys();
		});

		// A cleanup still has to be performed because while all states are connected to the initial state, they might
		// not be able to reach a final state. This will remove such trap states.
		nodeList.removeUnreachable();

		// Try to merge as many final states as possible. This won't greatly reduce the overall number of states but
		// having less final states will make a lot of the NFA operations more efficient.
		baseOptimizationReuseFinalStates(nodeList, nodeList);

		return new NFA(nodeList, left.options);
	}

	/**
	 * This is equivalent to `NFA.intersect(left, right).wordSets()` but it will lazily create the NFA while iterating.
	 *
	 * If only a small fraction of the actual word sets is needed, it might only construct a small part of the
	 * intersection NFA.
	 *
	 * @param left
	 * @param right
	 */
	static intersectionWordSets(left: NFA, right: NFA): Iterable<CharSet[]> {
		const { nodeList, addOutgoing } = createNFAIntersectionEnv(left, right);

		return faIterateWordSets(
			nodeList.initial,
			n => {
				addOutgoing(n);
				return n.out;
			},
			f => nodeList.final.has(f)
		);
	}

	/**
	 * This is equivalent to `NFA.intersect(left, right).words()` but it will lazily create the NFA while iterating.
	 *
	 * If only a small fraction of the actual words is needed, it might only construct a small part of the
	 * intersection NFA.
	 *
	 * @param left
	 * @param right
	 */
	static intersectionWords(left: NFA, right: NFA): Iterable<number[]> {
		return wordSetsToWords(NFA.intersectionWordSets(left, right));
	}

	/**
	 * Modifies this NFA to also accept all words from the given NFA.
	 *
	 * @param nfa
	 */
	union(nfa: NFA): void {
		if (nfa === this) {
			return;
		}

		checkOptionsCompatibility(this.options, nfa.options);
		baseUnion(this.nodes, this.nodes, localCopy(this.nodes, nfa.nodes));
	}

	/**
	 * Modifies this NFA to accept the concatenation of this NFA and the given NFA.
	 *
	 * @param nfa
	 */
	concat(nfa: NFA): void {
		if (this === nfa) {
			this.quantify(2, 2);
			return;
		}
		checkOptionsCompatibility(this.options, nfa.options);
		baseConcat(this.nodes, this.nodes, nfa.nodes);
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
	 * After calling this function, this NFA will no longer accept the empty word.
	 *
	 * If the NFA does not accept the empty word before calling this function, the NFA will not be changed.
	 *
	 * If you want to add the empty word again, quantify this NFA with a minimum of 0 and a maximum of 1.
	 */
	removeEmptyWord(): void {
		this.nodes.final.delete(this.nodes.initial);
	}


	static fromRegex(concat: Simple<Concatenation>, options: Readonly<NFAOptions>): NFA;
	static fromRegex(expression: Simple<Expression>, options: Readonly<NFAOptions>): NFA;
	static fromRegex(alternatives: readonly Simple<Concatenation>[], options: Readonly<NFAOptions>): NFA;
	static fromRegex(
		value: Simple<Concatenation> | Simple<Expression> | readonly Simple<Concatenation>[],
		options: Readonly<NFAOptions>
	): NFA {
		let nodeList: NodeList;
		if (Array.isArray(value)) {
			nodeList = createNodeList(value as readonly Simple<Concatenation>[], options);
		} else {
			const node = value as Simple<Expression> | Simple<Concatenation>;
			if (node.type === "Concatenation") {
				nodeList = createNodeList([node], options);
			} else {
				nodeList = createNodeList(node.alternatives, options);
			}
		}
		return new NFA(nodeList, options);
	}

	/**
	 * Creates a new NFA which matches all and only the given words.
	 *
	 * @param words
	 * @param options
	 */
	static fromWords(words: Iterable<Iterable<number>>, options: Readonly<NFAOptions>): NFA {
		const nodeList = new NodeList();

		function getNext(node: NFANode, char: number): NFANode {
			if (char > options.maxCharacter) {
				throw new Error(`All characters have to be <= options.maxCharacter (${options.maxCharacter}).`);
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
			const charSet = CharSet.empty(options.maxCharacter).union([{ min: char, max: char }]);
			nodeList.linkNodes(node, newNode, charSet);

			return newNode;
		}

		// build a prefix trie
		for (const word of words) {
			let node = nodeList.initial;
			for (const charCode of word) {
				node = getNext(node, charCode);
			}
			nodeList.final.add(node);
		}

		baseOptimizationReuseFinalStates(nodeList, nodeList);

		return new NFA(nodeList, options);
	}

	static fromDFA(dfa: DFA): NFA {
		const options: NFAOptions = {
			maxCharacter: dfa.options.maxCharacter
		};
		const nodeList = new NodeList();

		const translate = cachedFunc<DFANode, NFANode>(() => nodeList.createNode());
		translate.cache.set(dfa.nodes.initial, nodeList.initial);

		DFS(dfa.nodes.initial, dfaNode => {
			const transNode = translate(dfaNode);
			const byNode = invertCharMap(dfaNode.out, options.maxCharacter);
			byNode.forEach((charSet, outDfaNode) => {
				nodeList.linkNodes(transNode, translate(outDfaNode), charSet);
			});

			return byNode.keys();
		});

		return new NFA(nodeList, options);
	}

}



function createNodeList(expression: readonly Simple<Concatenation>[], options: Readonly<NFAOptions>): NodeList {
	const nodeList = new NodeList();
	baseReplaceWith(nodeList, nodeList, handleAlternation(expression));
	return nodeList;


	// All sub lists guarantee that the initial node has no incoming edges.

	function handleAlternation(alternatives: readonly Simple<Concatenation>[]): SubList {
		if (alternatives.length === 0) {
			return { initial: nodeList.createNode(), final: new Set<NFANode>() };
		}

		const base = handleConcatenation(alternatives[0]);
		for (let i = 1, l = alternatives.length; i < l; i++) {
			baseUnion(nodeList, base, handleConcatenation(alternatives[i]));
		}

		return base;
	}

	function handleConcatenation(concatenation: Simple<Concatenation>): SubList {
		const elements = concatenation.elements;

		const base: SubList = { initial: nodeList.createNode(), final: new Set<NFANode>() };
		base.final.add(base.initial);

		for (let i = 0, l = elements.length; i < l; i++) {
			if (base.final.size === 0) {
				// Since base is the empty language, concatenation has no effect, so let's stop early
				break;
			}

			handleElement(elements[i], base);
		}

		return base;
	}

	function handleQuantifier(quant: Simple<Quantifier>): SubList {
		const base = handleAlternation(quant.alternatives);
		baseQuantify(nodeList, base, quant.min, quant.max);
		return base;
	}

	function handleElement(element: Simple<Element>, base: SubList): void {
		switch (element.type) {
			case "Alternation":
				baseConcat(nodeList, base, handleAlternation(element.alternatives));
				break;
			case "Assertion":
				throw new Error('Assertions are not supported yet.');
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
					base.final.forEach(f => nodeList.linkNodes(f, s, chars));
					base.final.clear();
					base.final.add(s);
				}
				break;
			}
			case "Quantifier":
				baseConcat(nodeList, base, handleQuantifier(element));
				break;

			default:
				throw assertNever(element);
		}
	}

}

function checkOptionsCompatibility(thisOptions: Readonly<NFAOptions>, otherOptions: Readonly<NFAOptions>): void {
	if (thisOptions.maxCharacter !== otherOptions.maxCharacter) {
		throw new RangeError("Both NFAs have to have the same max character.");
	}
}


/**
 * Creates a copy of `toCopy` in the given node list returning the created sub NFA.
 *
 * @param nodeList
 * @param toCopy
 */
function localCopy(nodeList: NodeList, toCopy: SubList): SubList {
	const initial = nodeList.createNode();
	const final = new Set<NFANode>();

	const translate = cachedFunc<NFANode, NFANode>(() => nodeList.createNode());
	translate.cache.set(toCopy.initial, initial);

	DFS(toCopy.initial, node => {
		const trans = translate(node);

		if (toCopy.final.has(node)) {
			final.add(trans);
		}

		for (const [to, characters] of node.out) {
			nodeList.linkNodes(trans, translate(to), characters);
		}

		return node.out.keys();
	});

	return { initial, final };
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
function baseReplaceWith(nodeList: NodeList, base: SubList, replacement: SubList): void {
	baseMakeEmpty(nodeList, base);

	// transfer finals
	replacement.final.forEach(f => {
		base.final.add(f === replacement.initial ? base.initial : f);
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
function baseConcat(nodeList: NodeList, base: SubList, after: SubList): void {
	if (base.final.size === 0) {
		// concat(EMPTY_LANGUAGE, after) == EMPTY_LANGUAGE
		return;
	}
	if (after.final.size === 0) {
		// concat(base, EMPTY_LANGUAGE) == EMPTY_LANGUAGE
		baseMakeEmpty(nodeList, base);
		return;
	}

	// replace after initial with base finals
	const initialEdges = [...after.initial.out];
	for (const baseFinal of base.final) {
		for (const [to, characters] of initialEdges) {
			nodeList.linkNodes(baseFinal, to, characters);
		}
	}
	// unlink after initial
	for (const [to] of initialEdges) {
		nodeList.unlinkNodes(after.initial, to);
	}

	// If the initial of after isn't final, we have to clear the base finals
	if (!after.final.has(after.initial)) {
		base.final.clear();
	}
	// transfer finals
	after.final.forEach(n => {
		if (n !== after.initial) {
			base.final.add(n);
		}
	});
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
function baseUnion(nodeList: NodeList, base: SubList, alternative: SubList): void {
	// add finals
	alternative.final.forEach(n => {
		base.final.add(n === alternative.initial ? base.initial : n);
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

function baseOptimizationReuseFinalStates(nodeList: NodeList, base: SubList): void {
	const reusable: NFANode[] = [];
	base.final.forEach(f => {
		if (f !== base.initial && f.out.size === 0) {
			reusable.push(f);
		}
	});

	if (reusable.length > 1) {
		const masterFinal: NFANode = reusable.pop()!;
		for (let i = 0, l = reusable.length; i < l; i++) {
			const toRemove = reusable[i];
			base.final.delete(toRemove);
			for (const [to, characters] of [...toRemove.in]) {
				nodeList.linkNodes(to, masterFinal, characters);
				nodeList.unlinkNodes(to, toRemove);
			}
		}
	}
}

function baseOptimizationMergePrefixes(nodeList: NodeList, base: SubList): void {
	/**
	 * The basic idea here to to merge suffixes and prefixes.
	 * So that e.g. /abc|abba/ will merged to /ab(c|ba)/ (similar to suffixes).
	 */

	const prefixNodes: NFANode[] = [base.initial];
	// we can just do this because we know the initial node doesn't have any incoming transitions

	while (prefixNodes.length > 0) {
		const node = prefixNodes.pop()!;
		if (node.out.size < 2) {
			continue;
		}

		const candidateOutNodes: NFANode[] = [];
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
				const otherCharSet = node.out.get(other)!;
				if (currentCharSet.equals(otherCharSet)) {
					// found a match -> remove other
					for (const [otherTo, otherToCharSet] of other.out) {
						nodeList.linkNodes(current, otherTo, otherToCharSet);
						nodeList.unlinkNodes(other, otherTo);
					}
					nodeList.unlinkNodes(node, other);
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
function baseOptimizationMergeSuffixes(nodeList: NodeList, base: SubList): void {
	// this will basically be the same as the prefix optimization but in the other direction

	const suffixNodes: NFANode[] = [];

	for (const final of base.final) {
		if (final.out.size === 0) {
			suffixNodes.push(final);
		}
	}

	while (suffixNodes.length > 0) {
		const node = suffixNodes.pop()!;
		if (node.in.size < 2) {
			continue;
		}

		const candidateInNodes: NFANode[] = [];
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
				const otherCharSet = node.in.get(other)!;
				if (currentCharSet.equals(otherCharSet)) {
					// found a match -> remove other
					for (const [otherFrom, otherFromCharSet] of other.in) {
						nodeList.linkNodes(otherFrom, current, otherFromCharSet);
						nodeList.unlinkNodes(otherFrom, other);
					}
					nodeList.unlinkNodes(other, node);
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
function baseRepeat(nodeList: NodeList, base: SubList, times: number): void {
	if (times === 0) {
		// trivial
		baseMakeEmpty(nodeList, base);
		base.final.add(base.initial);
		return;
	}
	if (times === 1) {
		// trivial
		return;
	}
	if (base.final.size === 1 && base.final.has(base.initial)) {
		// base can only match the empty string
		return;
	}
	if (base.final.size === 0) {
		// base can't match any word
		return;
	}

	if (!base.final.has(base.initial)) {
		const copy = localCopy(nodeList, base);
		for (let i = times; i > 2; i--) {
			// use a copy of the original copy for concatenation
			// do this `times - 2` times
			baseConcat(nodeList, base, localCopy(nodeList, copy));
		}
		// use the original copy
		baseConcat(nodeList, base, copy);

	} else {
		// We could use the above approach here as well but this would generate O(n^2) unnecessary transitions.
		// To get rid of these unnecessary transitions, we remove the initial states from the set of final states
		// and manually store the final states of each concatenation.

		const realFinal = new Set<NFANode>(base.final);
		base.final.delete(base.initial);

		const copy = localCopy(nodeList, base);

		for (let i = times; i > 2; i--) {
			// use a copy of the original copy for concatenation
			// do this `times - 2` times
			baseConcat(nodeList, base, localCopy(nodeList, copy));
			base.final.forEach(f => realFinal.add(f));
		}
		// use the original copy
		baseConcat(nodeList, base, copy);
		base.final.forEach(f => realFinal.add(f));

		// transfer the final states
		base.final.clear();
		realFinal.forEach(f => base.final.add(f));

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
function basePlus(nodeList: NodeList, base: SubList): void {
	// The basic idea here is that we copy all edges from the initial state state to every final state. This means that
	// all final states will then behave like the initial state.
	for (const f of base.final) {
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
function baseIsPlusExpression(base: SubList): boolean {
	// The following condition have to be fulfilled:
	//
	// All Final states have to link to all and only to all directly outgoing states of the initial state.

	const initialOut = base.initial.out;

	// check condition
	for (const final of base.final) {
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

function baseQuantify(nodeList: NodeList, base: SubList, min: number, max: number): void {
	if (max === 0) {
		// this is a special case, so handle it before everything else
		// e.g. /a{0}/
		baseMakeEmpty(nodeList, base);
		base.final.add(base.initial);
		return;
	}

	if (base.final.has(base.initial)) {
		// if the initial state is also final, then `min` is effectively 0
		// e.g. /(a|)+/ == /(a|)*/
		min = 0;
	} else if (min === 0) {
		// if `min` is 0, then the initial state has to be final
		base.final.add(base.initial);
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
		for (const final of base.final) {
			for (const finalOut of final.out.keys()) {
				nodeList.unlinkNodes(final, finalOut);
			}
		}

		baseRepeat(nodeList, base, min - 1); // repeat A min-1 many times
		baseConcat(nodeList, base, aPlus); // concat A{min-1} and A+
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
		copy.final.add(copy.initial);

		baseRepeat(nodeList, copy, max - min);
		baseRepeat(nodeList, base, min);
		baseConcat(nodeList, base, copy);
	} else {
		if (min > 1) {
			// e.g. /a{4,}/
			// The basic idea here is that /a{4,}/ == /a{3}a+/

			// the plus part (has to be done first because base will be modified by repeat)
			const copy = localCopy(nodeList, base);
			basePlus(nodeList, copy);

			// repeat
			baseRepeat(nodeList, base, min - 1);

			baseConcat(nodeList, base, copy);
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
function baseMakeEmpty(nodeList: NodeList, base: SubList): void {
	for (const out of [...base.initial.out.keys()]) {
		nodeList.unlinkNodes(base.initial, out);
	}
	base.final.clear();
}


interface IntersectionEnv {
	nodeList: NodeList;
	addOutgoing(from: NFANode): void;
}

/**
 * Creates a new intersection environment for the two given NFAs.
 *
 * The initial and final states of the returned node list will be initialized and ready to use.
 *
 * Use the `addOutgoing` function to add the outgoing edges of nodes.
 *
 * @param left
 * @param right
 */
function createNFAIntersectionEnv(left: NFA, right: NFA): IntersectionEnv {
	checkOptionsCompatibility(left.options, right.options);

	const nodeList = new NodeList();

	// iterating the right nodes again and again takes time, so just cache them here
	const leftNodes = [...left.nodes];
	const rightNodes = [...right.nodes];

	// node pair translation
	const leftIndexMap = createIndexMap(leftNodes);
	const rightIndexMap = createIndexMap(rightNodes);
	const indexBackTranslatorMap = new Map<NFANode, number>();
	const indexTranslator = cachedFunc<number, NFANode>(index => {
		const node = nodeList.createNode();
		indexBackTranslatorMap.set(node, index);
		return node;
	});
	indexTranslator.cache.set(0, nodeList.initial);
	indexBackTranslatorMap.set(nodeList.initial, 0);

	function translate(leftNode: NFANode, rightNode: NFANode): NFANode {
		const leftIndex = leftIndexMap.get(leftNode);
		const rightIndex = rightIndexMap.get(rightNode);

		if (leftIndex === undefined || rightIndex === undefined) {
			// this shouldn't happen
			throw new Error("All node should be indexed.");
		}

		return indexTranslator(leftIndex * rightIndexMap.size + rightIndex);
	}

	function translateBack(node: NFANode): [NFANode, NFANode] {
		const nodeIndex = indexBackTranslatorMap.get(node);
		if (nodeIndex === undefined) {
			throw new Error("All created nodes have to be indexed.");
		}

		const rightIndex = nodeIndex % rightIndexMap.size;
		const leftIndex = Math.floor(nodeIndex / rightIndexMap.size);

		return [leftNodes[leftIndex], rightNodes[rightIndex]];
	}

	// add finals
	for (const leftFinal of left.nodes.final) {
		for (const rightFinal of right.nodes.final) {
			nodeList.final.add(translate(leftFinal, rightFinal));
		}
	}

	// charset intersection cache
	const intersectionCharSets: CharSet[] = [];
	leftNodes.forEach(n => intersectionCharSets.push(...n.out.values()));
	rightNodes.forEach(n => intersectionCharSets.push(...n.out.values()));

	const intersect = createCharSetIntersectFn(intersectionCharSets);

	// add edges

	function addOutgoing(from: NFANode): void {
		const [leftNode, rightNode] = translateBack(from);

		for (const [leftTo, leftTransition] of leftNode.out) {
			for (const [rightTo, rightTransition] of rightNode.out) {
				const transition = intersect(leftTransition, rightTransition);
				if (transition) {
					nodeList.linkNodes(from, translate(leftTo, rightTo), transition);
				}
			}
		}
	}

	return { nodeList, addOutgoing };
}
/**
 * Creates a function which can intersect any two char sets of the given set of character sets.
 *
 * The function return `null` if the intersection of two char sets is empty.
 *
 * @param charSets
 */
function createCharSetIntersectFn(charSets: Iterable<CharSet>): (a: CharSet, b: CharSet) => CharSet | null {
	const charSetIdMap = new Map<CharSet, number>();
	let charSetIdCounter = 0;

	// the hash table will be used to detect equivalent but not identical char sets
	const hashTable: (CharSet[] | undefined)[] = [];
	function addCharSet(set: CharSet): void {
		if (charSetIdMap.has(set)) {
			return;
		}

		let hash = 0;
		set.ranges.forEach(({ min, max }) => {
			hash = ((hash * 31 + min) ^ max * 31) & 0xFFFF;
		});

		let hashEntry = hashTable[hash];
		if (hashEntry === undefined) {
			hashTable[hash] = hashEntry = [];
		}

		const added = hashEntry.some(cs => {
			if (cs.equals(set)) {
				charSetIdMap.set(set, charSetIdMap.get(cs)!);
				return true;
			}
			return false;
		});

		if (!added) {
			charSetIdMap.set(set, charSetIdCounter++);
		}

		hashEntry.push(set);
	}

	for (const set of charSets) {
		addCharSet(set);
	}

	// use the id of char sets to store pairs
	// null be represent empty char sets
	const intersectionCache: (CharSet | null)[] = [];
	const charSetIdSize = charSetIdCounter;

	return (a: CharSet, b: CharSet): CharSet | null => {
		const aIndex = charSetIdMap.get(a);
		const bIndex = charSetIdMap.get(b);

		if (aIndex === undefined || bIndex === undefined) {
			// this shouldn't happen
			throw new Error("All char sets should be indexed.");
		}

		// trivial
		if (aIndex == bIndex) {
			return a;
		}

		// since intersection is symmetric we don't care about the order
		let index;
		if (aIndex < bIndex) {
			index = aIndex * charSetIdSize + bIndex;
		} else {
			index = bIndex * charSetIdSize + aIndex;
		}

		let result: CharSet | null | undefined = intersectionCache[index];
		if (result === undefined) {
			result = a.intersect(b);
			if (result.isEmpty) {
				result = null;
			}
			intersectionCache[index] = result;
		}

		return result;
	}
}
