import { Concatenation, Quantifier, Element, Simple, Expression } from "./ast";
import { CharSet } from "./char-set";
import { DFS } from "./util";
import { FiniteAutomaton } from "./finite-automaton";
import { faToString } from "./fa-util";
import { rangesToString } from "./char-util";


interface Node {
	readonly list: NodeList;
	readonly out: EdgeList;
	readonly in: EdgeList;
}

interface Edge {
	readonly characters: CharSet;
	readonly to: Node;
}

class EdgeList {

	readonly map: Map<Node, Edge> = new Map<Node, Edge>();

	get size(): number {
		return this.map.size;
	}

	add(to: Node, characters: CharSet): void {
		const edge = this.map.get(to);
		if (edge === undefined) {
			this.map.set(to, { to, characters });
		} else {
			this.map.set(to, { to, characters: edge.characters.union(characters) });
		}
	}

	forEach(callbackFn: (value: Edge, key: Node, map: Map<Node, Edge>) => void): void {
		return this.map.forEach(callbackFn);
	}

	filterMut(filterFn: (value: Edge, key: Node, map: Map<Node, Edge>) => boolean): void {
		const del: Node[] = [];
		this.forEach((value, key, map) => {
			if (filterFn(value, key, map)) {
				del.push(key);
			}
		});
		del.forEach(node => this.map.delete(node));
	}

	[Symbol.iterator](): Iterator<Edge> {
		return this.map.values()[Symbol.iterator]();
	}

	nodes(): Iterable<Node> {
		return this.map.keys();
	}

}

class NodeList implements Iterable<Node> {

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

	unlinkNodes(from: Node, to: Node): CharSet {
		if (from.list !== to.list) {
			throw new Error("You can't link nodes from different node lists.");
		}
		if (from.list !== this) {
			throw new Error("Use the node list associated with the nodes to link them.");
		}

		const chars = from.out.map.get(to);
		if (!chars) {
			throw new Error("Can't unlink nodes which aren't linked.");
		}

		from.out.map.delete(to);
		to.in.map.delete(from);

		return chars.characters;
	}

	removeUnreachable(): void {
		if (this.final.size === 0) {
			this.initial.in.map.clear();
			this.initial.out.map.clear();
			return;
		}

		// mark all nodes which be reached from final nodes
		const marked = new Set<Node>();
		let toCheck: ReadonlySet<Node> = this.final;
		while (toCheck.size > 0) {
			const newToCheck = new Set<Node>();
			for (const node of toCheck) {
				marked.add(node);
				newToCheck.delete(node);
				for (const edge of node.in) {
					if (!marked.has(edge.to)) {
						newToCheck.add(edge.to);
					}
				}
			}
			toCheck = newToCheck;
		}

		// remove all unmarked nodes
		for (const node of marked) {
			node.out.filterMut(e => marked.has(e.to))
		}
	}

	*[Symbol.iterator](): Iterator<Node> {
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

interface SubNFA {
	readonly initial: Node;
	readonly final: Set<Node>;
}


export class NFA implements FiniteAutomaton {

	nodes: NodeList;

	private constructor(nodes: NodeList) {
		this.nodes = nodes;
	}

	get isEmpty(): boolean {
		return this.nodes.final.size > 0;
	}

	/**
	 * Create a copy of this NFA.
	 */
	copy(): NFA {
		return new NFA(new NodeList()).union(this);
	}

	test(word: Iterable<number>): boolean {
		const nodes = this.nodes;
		const characters = [...word];

		function match(index: number, node: Node): boolean {
			if (index >= characters.length)
				return nodes.final.has(node);

			const cp = characters[index];

			for (const outEdge of node.out) {
				if (outEdge.characters.has(cp)) {
					if (match(index + 1, outEdge.to)) {
						return true;
					}
				}
			}

			return false;
		}
		return match(0, nodes.initial);
	}

	toString(): string {
		return faToString(
			this.nodes.initial,
			n => [...n.out].map(e => [e.to, rangesToString(e.characters.ranges)]),
			n => this.nodes.final.has(n)
		);
	}


	static intersect(left: NFA, right: NFA): NFA {
		const thisMap = createIndexMap(left.nodes);
		const otherMap = createIndexMap(right.nodes);

		const newNodes = new NodeList();
		const newNodesIndexer = new Map<number, Node>();
		newNodesIndexer.set(0, newNodes.initial);
		const getNewNode = (thisIndex: number, otherIndex: number): Node => {
			const index = thisIndex * otherMap.size + otherIndex;
			let node = newNodesIndexer.get(index);
			if (node === undefined) {
				node = newNodes.createNode();
				newNodesIndexer.set(index, node);
			}
			return node;
		};

		// add finals
		for (const thisFinal of left.nodes.final) {
			for (const otherFinal of right.nodes.final) {
				const thisIndex = thisMap.get(thisFinal)!;
				const otherIndex = otherMap.get(otherFinal)!;
				newNodes.final.add(getNewNode(thisIndex, otherIndex));
			}
		}

		// add edges
		for (const thisNode of left.nodes.final) {
			for (const otherNode of right.nodes.final) {
				const thisIndex = thisMap.get(thisNode)!;
				const otherIndex = otherMap.get(otherNode)!;
				const from = getNewNode(thisIndex, otherIndex);
				for (const thisEdge of thisNode.out) {
					for (const otherEdge of otherNode.out) {
						const characters = thisEdge.characters.intersect(otherEdge.characters);
						if (!characters.isEmpty) {
							const thisToIndex = thisMap.get(thisEdge.to)!;
							const otherToIndex = otherMap.get(otherEdge.to)!;
							const to = getNewNode(thisToIndex, otherToIndex);
							newNodes.linkNodes(from, to, characters);
						}
					}
				}
			}
		}

		return new NFA(newNodes);
	}

	/**
	 * Modifies this NFA to also accept all words from the given NFA.
	 *
	 * @param nfa
	 */
	union(nfa: NFA): NFA {
		baseUnion(this.nodes, this.nodes, localCopy(this.nodes, nfa.nodes));
		return this;
	}


	static fromRegex(concat: Simple<Concatenation>): NFA;
	static fromRegex(expression: Simple<Expression>): NFA;
	static fromRegex(alternatives: readonly Simple<Concatenation>[]): NFA;
	static fromRegex(value: Simple<Concatenation> | Simple<Expression> | readonly Simple<Concatenation>[]): NFA {
		if (Array.isArray(value)) {
			return new NFA(createNodeList2(value as readonly Simple<Concatenation>[]));
		} else {
			const node = value as Simple<Expression> | Simple<Concatenation>;
			if (node.type === "Concatenation") {
				return new NFA(createNodeList2([node]));
			} else {
				return new NFA(createNodeList2(node.alternatives));
			}
		}
	}

}


function createIndexMap(nodes: NodeList): Map<Node, number> {
	const map = new Map<Node, number>();
	let i = 0;
	for (const node of nodes) {
		map.set(node, i++);
	}
	return map;
}



function createNodeList2(expression: readonly Simple<Concatenation>[]): NodeList {
	const nodeList = new NodeList();
	baseReplaceWith(nodeList, nodeList, handleAlternation(expression));
	return nodeList;


	// All sub NFAs guarantee that the initial node has no incoming edges.

	function handleAlternation(alternatives: readonly Simple<Concatenation>[]): SubNFA {
		if (alternatives.length === 0) {
			return { initial: nodeList.createNode(), final: new Set<Node>() };
		}

		const base = handleConcatenation(alternatives[0]);
		for (let i = 1, l = alternatives.length; i < l; i++) {
			baseUnion(nodeList, base, handleConcatenation(alternatives[i]));
		}

		return base;
	}

	function handleConcatenation(concatenation: Simple<Concatenation>): SubNFA {
		const elements = concatenation.elements;

		const base: SubNFA = { initial: nodeList.createNode(), final: new Set<Node>() };
		base.final.add(base.initial);

		for (let i = 0, l = elements.length; i < l; i++) {
			baseConcat(nodeList, base, handleElement(elements[i]));
		}

		return base;
	}

	function handleCharacters(chars: CharSet): SubNFA {
		if (chars.isEmpty) {
			return { initial: nodeList.createNode(), final: new Set<Node>() };
		}

		const s0 = nodeList.createNode();
		const s1 = nodeList.createNode();
		nodeList.linkNodes(s0, s1, chars);

		return { initial: s0, final: new Set<Node>([s1]) };
	}

	function handleQuantifier(quant: Simple<Quantifier>): SubNFA {
		const base = handleAlternation(quant.alternatives);
		baseQuantify(nodeList, base, quant.min, quant.max);
		return base;
	}

	function handleElement(element: Simple<Element>): SubNFA {
		switch (element.type) {
			case "Alternation":
				return handleAlternation(element.alternatives);
			case "CharacterClass":
				return handleCharacters(element.characters);
			case "Quantifier":
				return handleQuantifier(element);

			default:
				throw new TypeError(`Unsupported element "${element.type}".`);
		}
	}

}


/**
 * Returns whether there exists a path from the given node to itself.
 *
 * @param node
 */
function isCircular(node: Node): boolean {
	return DFS(node, n => {
		if (n === node) {
			return true;
		}
		return n.out.nodes();
	});
}

/**
 * Creates a copy of `toCopy` in the given node list returning the created sub NFA.
 *
 * @param nodeList
 * @param toCopy
 */
function localCopy(nodeList: NodeList, toCopy: SubNFA): SubNFA {
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

		for (const { characters, to } of node.out) {
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
function baseReplaceWith(nodeList: NodeList, base: SubNFA, replacement: SubNFA): void {
	base.final.clear();
	base.initial.out.map.clear();

	// transfer finals
	replacement.final.forEach(f => {
		base.final.add(f === replacement.initial ? base.initial : f);
	});

	// transfer nodes
	for (const { to, characters } of [...replacement.initial.out]) {
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
function baseConcat(nodeList: NodeList, base: SubNFA, after: SubNFA): void {
	// replace after initial with base finals
	const initialEdges = [...after.initial.out];
	for (const baseFinal of base.final) {
		for (const { to, characters } of initialEdges) {
			nodeList.linkNodes(baseFinal, to, characters);
		}
	}
	// unlink after initial
	for (const { to } of initialEdges) {
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
function baseUnion(nodeList: NodeList, base: SubNFA, alternative: SubNFA): void {
	// add finals
	alternative.final.forEach(n => {
		base.final.add(n === alternative.initial ? base.initial : n);
	});

	// transfer nodes to base
	for (const { to, characters } of [...alternative.initial.out]) {
		nodeList.linkNodes(base.initial, to, characters);
		nodeList.unlinkNodes(alternative.initial, to);
	}

	// A optional optimization to reduce the number of nodes.
	baseOptimizationReuseFinalStates(nodeList, base);
}

function baseOptimizationReuseFinalStates(nodeList: NodeList, base: SubNFA): void {
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
			for (const { to, characters } of [...toRemove.in]) {
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
function baseRepeat(nodeList: NodeList, base: SubNFA, times: number): void {
	if (times === 0) {
		// trivial
		base.initial.out.map.clear();
		base.final.clear();
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
function basePlus(nodeList: NodeList, base: SubNFA): void {
	// The basic idea here is that we copy all edges from the initial state state to every final state. This means that
	// all final states will then behave like the initial state.
	for (const f of base.final) {
		if (f !== base.initial) {
			for (const { to, characters } of base.initial.out) {
				nodeList.linkNodes(f, to, characters);
			}
		}
	}
}

function baseQuantify(nodeList: NodeList, base: SubNFA, min: number, max: number): void {
	if (max === 0) {
		// this is a special case, so handle it before everything else
		// e.g. /a{0}/
		base.initial.out.map.clear();
		base.final.clear();
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
