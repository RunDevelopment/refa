import { Concatenation, Quantifier, Element, Simple, Expression } from "./ast";
import { CharSet } from "./char-set";
import { iterToArray, BFS, DFS } from "./util";
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
	readonly final: ReadonlySet<Node>

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

	makeFinal(node: Node): void {
		if (node.list !== this) {
			throw new Error("Use the node list associated with the node to make it final.");
		}

		(this.final as Set<Node>).add(node);
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

type EndNodes = readonly [Node, ...Node[]];


const EMPTY_CONCATENATION: Simple<Concatenation> = {
	type: "Concatenation",
	elements: []
};


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
		const thisMap = NFA.createIndexMap(left.nodes);
		const otherMap = NFA.createIndexMap(right.nodes);

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
				newNodes.makeFinal(getNewNode(thisIndex, otherIndex));
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
		const unionNodeList = this.nodes;

		const nodes = nfa.nodes;

		const translationMap = new Map<Node, Node>();
		const translate = (n: Node): Node => {
			if (n === nodes.initial)
				return unionNodeList.initial;

			let translation = translationMap.get(n);
			if (!translation) {
				translationMap.set(n, translation = unionNodeList.createNode());
			}
			return translation;
		};

		DFS(nodes.initial, node => {
			const trans = translate(node);

			if (nodes.final.has(node)) {
				unionNodeList.makeFinal(trans);
			}

			for (const { characters, to } of node.out) {
				unionNodeList.linkNodes(trans, translate(to), characters);
			}

			return node.out.nodes();
		});

		return this;
	}

	/**
	 * Returns whether this and the given NFA match the same language.
	 *
	 * @param other
	 */
	equals(other: NFA): boolean {
		throw new Error('Not implemented');
	}

	private static createIndexMap(nodes: NodeList): Map<Node, number> {
		const map = new Map<Node, number>();
		let i = 0;
		for (const node of nodes) {
			map.set(node, i++);
		}
		return map;
	}




	static fromRegex(concat: Simple<Concatenation>): NFA;
	static fromRegex(expression: Simple<Expression>): NFA;
	static fromRegex(alternatives: readonly Simple<Concatenation>[]): NFA;
	static fromRegex(value: Simple<Concatenation> | Simple<Expression> | readonly Simple<Concatenation>[]): NFA {
		if (Array.isArray(value)) {
			return new NFA(createNodeList(value as readonly Simple<Concatenation>[]));
		} else {
			const node = value as Simple<Expression> | Simple<Concatenation>;
			if (node.type === "Concatenation") {
				return new NFA(createNodeList([node]));
			} else {
				return new NFA(createNodeList(node.alternatives));
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


function createNodeList(expression: readonly Simple<Concatenation>[]): NodeList {
	const nodeList = new NodeList();

	for (const node of handleAlternation(expression, [nodeList.initial])) {
		nodeList.makeFinal(node);
	}

	return nodeList;

	/**
	 * A stable iterable it an iterable collection of nodes which can be iterated multiple times
	 * without the items or their order changing.
	 */
	type StableIterable = readonly Node[] | ReadonlySet<Node>;

	function handleAlternation(alternatives: readonly Simple<Concatenation>[], start: StableIterable, end?: EndNodes): StableIterable {
		const nodes = new Set<Node>();
		end = end || [nodeList.createNode()];
		for (const concat of alternatives) {
			for (const node of handleConcatenation(concat, start, end)) {
				nodes.add(node);
			}
		}
		// `nodes` contains all `end` nodes.
		// `nodes` will also contain all `start` nodes if one of the alternatives matches the empty string.
		return nodes;
	}

	function handleConcatenation(concat: Simple<Concatenation>, start: StableIterable, end?: EndNodes): StableIterable {
		const elements = concat.elements;
		const max = elements.length - 1;

		if (max === -1) return start;

		for (let i = 0; i < max; i++) {
			start = handleElement(elements[i], start);
		}
		return handleElement(elements[max], start, end);
	}

	function handleQuantifier(quant: Simple<Quantifier>, start: StableIterable, end?: EndNodes): StableIterable {
		function concatWithoutEnd(times: number, alternatives: readonly Simple<Concatenation>[]): void {
			for (; times > 0; times--) {
				start = handleAlternation(alternatives, start);
			}
		}

		// About the notation used in the comments:
		// Regular expressions will be use the standard JS RegExp literal notation.
		// For finite automata a simple graph notation is used where states are uppercase letters or digits and
		// transition are denotes by arrows ( -()-> ) which contains the accepted characters of the transition in
		// round braces. The states S and E refer to the given start node(s) and the suggested or created end node(s)
		// respectively. All states in square brackets will be returned by this function.
		// Reflexive transition will be denoted by the ⮌ symbol, e.g. S ⮌(a).

		// (e.g. /a{0}/)
		if (quant.max === 0) throw new RangeError(`max of a quantity cannot be zero.`);

		if (quant.min === quant.max) {
			// simple concatenation (e.g. /a{4}/)
			// /a{4}/ is implemented as: S -(a)-> 1 -(a)-> 2 -(a)-> 3 -(a)-> [E]

			concatWithoutEnd(quant.max - 1, quant.alternatives);
			return handleAlternation(quant.alternatives, start, end);

		} else if (quant.max < Infinity) {
			// finite quantifier (e.g. /a{4,6}/ or /a?/)
			// /a{1,3}/ == /a(a|)(a|)/ is implemented as: S -(a)-> [1] -(a)-> [2] -(a)-> [E]
			// /a?/ == /(a|)/ is implemented as: [S] -(a)-> [E]

			concatWithoutEnd(quant.min, quant.alternatives);

			const modifiedAlternatives = [EMPTY_CONCATENATION, ...quant.alternatives];
			concatWithoutEnd(quant.max - quant.min - 1, modifiedAlternatives);
			return handleAlternation(modifiedAlternatives, start, end);

		} else {
			// Kleene star (e.g. /a{4,}/ or /a+/ or /a*/)

			concatWithoutEnd(quant.min - 1, quant.alternatives);

			// /a+/ is implemented as: S -(a)-> [E] ⮌(a)
			// /a*/ is implemented as: [S] -(a)-> [E] ⮌(a)
			// They are implemented like this, so that the there exists no circle which includes the start nodes.
			// This is useful because that means that the initial nodes will never have incoming edges which makes
			// the union of two NFAs trivial to implement.

			const startNodes = new Set<Node>(start);
			const resultNodes = new Set<Node>(quant.min === 0 ? startNodes : []);

			if (end) {
				// Suggested end nodes might contain nodes which are part of a circle which is a problem. Let's say the
				// start and end nodes (which are shared between operations to reduce the number of nodes) were used to
				// create /a+/, meaning that the transition of S and E will be as follows: S -(a)-> [E] ⮌(a). If we
				// use E again for the union with /b+/, the resulting transition will look like this:
				// S -(a|b)-> [E] ⮌(a|b)
				// But this is /(a|b)+/ and not /a+|b+/! Because, as described above, the start nodes are not circular,
				// we only have to worry about the end nodes being part of a circle. To resolve this, we remove the
				// circular end nodes.
				const nonCircular = end.filter(e => !isCircular(e));

				// This might have removed all nodes, so add a new one in that case.
				if (nonCircular.length === 0) {
					nonCircular.push(nodeList.createNode());
				}

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				end = nonCircular as any as EndNodes;
			} else {
				end = [nodeList.createNode()];
			}

			let startAndEndNodes = iterToArray(handleAlternation(quant.alternatives, startNodes, end));
			startAndEndNodes = startAndEndNodes.filter(s => {
				resultNodes.add(s);
				// we have to filter out the original start nodes which will be included if
				// quant.alternatives matched the empty string
				return !startNodes.has(s);
			});

			for (const node of handleAlternation(quant.alternatives, startAndEndNodes, startAndEndNodes as EndNodes)) {
				resultNodes.add(node);
			}

			return resultNodes;
		}
	}

	function handleCharacters(characters: CharSet, start: StableIterable, end?: EndNodes): StableIterable {
		if (characters.isEmpty) return [];

		end = end || [nodeList.createNode()];
		for (const node of start) {
			for (const endNode of end) {
				nodeList.linkNodes(node, endNode, characters);
			}
		}
		return end;
	}

	function handleElement(element: Simple<Element>, start: StableIterable, end?: EndNodes): StableIterable {
		switch (element.type) {
			case "Alternation":
				return handleAlternation(element.alternatives, start, end);
			case "CharacterClass":
				return handleCharacters(element.characters, start, end);
			case "Quantifier":
				return handleQuantifier(element, start, end);

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
	const visited = new Set<Node>();

	function check(n: Node): boolean {
		if (visited.has(n)) {
			return false;
		}
		visited.add(n);

		for (const out of n.out.nodes()) {
			if (out === node) {
				return true;
			} else {
				return check(out);
			}
		}
		return false;
	}

	return check(node);
}

