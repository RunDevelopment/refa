import { Concatenation, Quantifier, Element, Simple, Expression } from "./ast";
import { CharSet } from "./char-set";
import { DFS, assertNever, createIndexMap } from "./util";
import { FiniteAutomaton } from "./finite-automaton";
import { faToString, faIterateWordSets, wordSetsToWords } from "./fa-util";
import { rangesToString } from "./char-util";


interface Node {
	readonly list: NodeList;
	readonly out: EdgeList;
	readonly in: EdgeList;
}

class EdgeList {

	readonly map: Map<Node, CharSet> = new Map<Node, CharSet>();

	get size(): number {
		return this.map.size;
	}

	add(to: Node, characters: CharSet): void {
		const current = this.map.get(to);
		if (current === undefined) {
			this.map.set(to, characters);
		} else {
			this.map.set(to, current.union(characters));
		}
	}

	[Symbol.iterator](): IterableIterator<[Node, CharSet]> {
		return this.map.entries();
	}

	nodes(): Iterable<Node> {
		return this.map.keys();
	}

}

class NodeList {

	// variables for checks and debugging
	private readonly id: number;
	private _nodeCounter: number = 0;
	private static _counter: number = 0;

	readonly initial: Node;
	readonly final: Set<Node>;

	constructor() {
		this.id = NodeList._counter++;
		this.final = new Set();
		this.initial = this.createNode();
	}

	createNode(): Node {
		const node: Node & { id: number } = {
			id: this._nodeCounter++, // for debugging
			list: this,
			out: new EdgeList(), in: new EdgeList()
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

		from.out.add(to, characters);
		to.in.add(from, characters);
	}

	unlinkNodes(from: Node, to: Node): void {
		if (from.list !== to.list) {
			throw new Error("You can't link nodes from different node lists.");
		}
		if (from.list !== this) {
			throw new Error("Use the node list associated with the nodes to link them.");
		}

		if (!from.out.map.has(to)) {
			throw new Error("Can't unlink nodes which aren't linked.");
		}

		from.out.map.delete(to);
		to.in.map.delete(from);
	}

	removeUnreachable(): void {
		const makeEmpty = (): void => {
			this.final.clear();
			this.initial.in.map.clear();
			this.initial.out.map.clear();
		}

		if (this.final.size === 0) {
			makeEmpty();
			return;
		}

		const removeNode = (node: Node): void => {
			if (node === this.initial) {
				throw new Error("Cannot remove the initial state.");
			}

			this.final.delete(node);
			for (const outgoing of node.out.nodes()) {
				this.unlinkNodes(node, outgoing);
			}
			for (const incoming of node.in.nodes()) {
				this.unlinkNodes(incoming, node);
			}
		};

		// 1) Get all nodes
		const allNodes = new Set<Node>(this.final);
		DFS(this.initial, node => {
			allNodes.add(node);
			return [...node.in.nodes(), ...node.out.nodes()];
		});

		// 2) Get all nodes reachable from the initial state
		const reachableFromInitial = new Set<Node>();
		DFS(this.initial, node => {
			reachableFromInitial.add(node);
			return node.out.nodes();
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
		const canReachFinal = new Set<Node>();
		for (const final of this.final) {
			DFS(final, node => {
				if (canReachFinal.has(node)) {
					return [];
				}
				canReachFinal.add(node);

				return node.in.nodes();
			});
		}

		// 6) Remove all nodes which can't reach a final node
		reachableFromInitial.forEach(node => {
			if (!canReachFinal.has(node)) {
				removeNode(node);
			}
		});
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
					for (const outNode of node.out.nodes()) {
						newVisit.push(outNode);
					}
				}
			}
			toVisit = newVisit;
		}
	}

}

interface SubList {
	readonly initial: Node;
	readonly final: Set<Node>;
}

/*
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

	nodes: NodeList;
	readonly options: Readonly<NFAOptions>;

	private constructor(nodes: NodeList, options: Readonly<NFAOptions>) {
		this.nodes = nodes;
		this.options = options;
	}

	get isEmpty(): boolean {
		return this.nodes.final.size === 0;
	}

	/**
	 * Create a copy of this NFA.
	 */
	copy(): NFA {
		return new NFA(new NodeList(), this.options).union(this);
	}

	test(word: Iterable<number>): boolean {
		const nodes = this.nodes;
		const characters = [...word];

		function match(index: number, node: Node): boolean {
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

	static intersect(left: NFA, right: NFA): NFA {
		checkOptionsCompatibility(left.options, right.options);

		const nodeList = new NodeList();

		// node pair translation
		const thisIndexMap = createIndexMap(left.nodes);
		const otherIndexMap = createIndexMap(right.nodes);
		const translationCache = new Map<number, Node>();
		translationCache.set(0, nodeList.initial);
		function translate(thisNode: Node, otherNode: Node): Node {
			const thisIndex = thisIndexMap.get(thisNode);
			const otherIndex = otherIndexMap.get(otherNode);

			if (thisIndex === undefined || otherIndex === undefined) {
				// this shouldn't happen
				throw new Error("All node should be indexed.");
			}

			const index = thisIndex * otherIndexMap.size + otherIndex;
			let node = translationCache.get(index);
			if (node === undefined) {
				translationCache.set(index, node = nodeList.createNode());
			}
			return node;
		}

		// add finals
		for (const thisFinal of left.nodes.final) {
			for (const otherFinal of right.nodes.final) {
				nodeList.final.add(translate(thisFinal, otherFinal));
			}
		}

		// add edges
		for (const thisNode of left.nodes) {
			for (const otherNode of right.nodes) {
				const from = translate(thisNode, otherNode);
				for (const [thisTo, thisTransition] of thisNode.out) {
					for (const [otherTo, otherTransition] of otherNode.out) {
						const transition = thisTransition.intersect(otherTransition);
						if (!transition.isEmpty) {
							nodeList.linkNodes(from, translate(thisTo, otherTo), transition);
						}
					}
				}
			}
		}

		// since the node list has O(n * m) many nodes, we'll try to get rid of as many as possible
		nodeList.removeUnreachable();

		baseOptimizationReuseFinalStates(nodeList, nodeList);

		return new NFA(nodeList, left.options);
	}

	/**
	 * Modifies this NFA to also accept all words from the given NFA.
	 *
	 * @param nfa
	 */
	union(nfa: NFA): NFA {
		checkOptionsCompatibility(this.options, nfa.options);
		baseUnion(this.nodes, this.nodes, localCopy(this.nodes, nfa.nodes));
		return this;
	}


	static fromRegex(concat: Simple<Concatenation>, options: Readonly<NFAOptions>): NFA;
	static fromRegex(expression: Simple<Expression>, options: Readonly<NFAOptions>): NFA;
	static fromRegex(alternatives: readonly Simple<Concatenation>[], options: Readonly<NFAOptions>): NFA;
	static fromRegex(value: Simple<Concatenation> | Simple<Expression> | readonly Simple<Concatenation>[], options: Readonly<NFAOptions>): NFA {
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

	static fromWords(words: Iterable<Iterable<number>>, options: Readonly<NFAOptions>): NFA {
		const nodeList = new NodeList();

		function getNext(node: Node, char: number): Node {
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

}


function createNodeList(expression: readonly Simple<Concatenation>[], options: Readonly<NFAOptions>): NodeList {
	const nodeList = new NodeList();
	baseReplaceWith(nodeList, nodeList, handleAlternation(expression));
	return nodeList;


	// All sub lists guarantee that the initial node has no incoming edges.

	function handleAlternation(alternatives: readonly Simple<Concatenation>[]): SubList {
		if (alternatives.length === 0) {
			return { initial: nodeList.createNode(), final: new Set<Node>() };
		}

		const base = handleConcatenation(alternatives[0]);
		for (let i = 1, l = alternatives.length; i < l; i++) {
			baseUnion(nodeList, base, handleConcatenation(alternatives[i]));
		}

		return base;
	}

	function handleConcatenation(concatenation: Simple<Concatenation>): SubList {
		const elements = concatenation.elements;

		const base: SubList = { initial: nodeList.createNode(), final: new Set<Node>() };
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
			case "CharacterClass":
				{
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
				}
				break;
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
	const final = new Set<Node>();

	const translationMap = new Map<Node, Node>();
	translationMap.set(toCopy.initial, initial);
	const translate = (n: Node): Node => {
		let translation = translationMap.get(n);
		if (!translation) {
			translationMap.set(n, translation = nodeList.createNode());
		}
		return translation;
	};

	DFS(toCopy.initial, node => {
		const trans = translate(node);

		if (toCopy.final.has(node)) {
			final.add(trans);
		}

		for (const [to, characters] of node.out) {
			nodeList.linkNodes(trans, translate(to), characters);
		}

		return node.out.nodes();
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

	// A optional optimization to reduce the number of nodes.
	baseOptimizationReuseFinalStates(nodeList, base);
}

function baseOptimizationReuseFinalStates(nodeList: NodeList, base: SubList): void {
	const reusable: Node[] = [];
	base.final.forEach(f => {
		if (f !== base.initial && f.out.size === 0) {
			reusable.push(f);
		}
	});

	if (reusable.length > 1) {
		const masterFinal: Node = reusable.pop()!;
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

		const realFinal = new Set<Node>(base.final);
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
	for (const out of [...base.initial.out.nodes()]) {
		nodeList.unlinkNodes(base.initial, out);
	}
	base.final.clear();
}
