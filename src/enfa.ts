/* eslint-disable no-inner-declarations */
import { CharSet } from "./char-set";
import { Char } from "./core-types";
import { FAIterator, TooManyNodesError } from "./finite-automaton";
import { assertNever, cachedFunc, intersectSet, traverse } from "./util";
import * as Iter from "./iter";
import { Concatenation, Element, Expression, NoParent, Quantifier } from "./ast";
import { rangesToString } from "./char-util";

const DEFAULT_MAX_NODES = 10_000;

export class ENFA {
	readonly nodes: ENFA.NodeList;
	readonly maxCharacter: Char;

	private constructor(nodes: ENFA.NodeList, maxCharacter: Char) {
		this.nodes = nodes;
		this.maxCharacter = maxCharacter;
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
				reachableFromInitial.add(n);
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

/**
 * Creates a node list that is only allowed to create a certain number of nodes during the execution of the given
 * consumer function.
 *
 * After the node list is returned by this function, the limit no longer applies.
 *
 * @param maxNodes
 * @param consumerFn
 */
function nodeListWithLimit(maxNodes: number, consumerFn: (nodeList: ENFA.NodeList) => void): ENFA.NodeList {
	const nodeList = new ENFA.NodeList();
	nodeList["_nodeLimit"] = maxNodes;
	consumerFn(nodeList);
	nodeList["_nodeLimit"] = Infinity;
	return nodeList;
}

function createNodeList(
	expression: readonly NoParent<Concatenation>[],
	options: Readonly<ENFA.Options>,
	creationOptions: Readonly<ENFA.FromRegexOptions>
): ENFA.NodeList {
	return nodeListWithLimit(creationOptions.maxNodes ?? DEFAULT_MAX_NODES, nodeList => {
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
	readonly initial: ENFA.Node;
	readonly final: ENFA.Node;
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

			for (const a of alternatives) {
				const alternativeFinal = handleConcat(nodeList, a.elements, initial, options);
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
			final = handleElement(nodeList, e, final, options);
		}
		if (final === initial) {
			final = nodeList.createNode();
			nodeList.linkNodes(initial, final, null);
		}
		return final;
	}
	function handleQuantifier(
		nodeList: ENFA.NodeList,
		quant: NoParent<Quantifier>,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		const originalInitial = initial;

		let { min, max } = quant;

		if (max > options.infinityThreshold) {
			max = Infinity;
		}

		if (min > 1) {
			for (let i = 1; i < min; i++) {
				initial = handleAlternatives(nodeList, quant.alternatives, initial, options);
			}

			max -= min - 1;
			min = 1;
		}

		// min is now either 1 or 0

		const lazy = quant.lazy;

		if (min === 1) {
			if (max === Infinity) {
				// we do a plus now

				const final = nodeList.createNode();

				const altInitial = nodeList.createNode();
				nodeList.linkNodes(initial, altInitial, null);

				const altFinal = handleAlternatives(nodeList, quant.alternatives, altInitial, options);
				if (lazy) {
					nodeList.linkNodes(altFinal, final, null);
					nodeList.linkNodes(altFinal, altInitial, null);
				} else {
					nodeList.linkNodes(altFinal, altInitial, null);
					nodeList.linkNodes(altFinal, final, null);
				}

				return final;
			} else {
				min--;
				max--;
				initial = handleAlternatives(nodeList, quant.alternatives, initial, options);
			}
		}

		// min is now 0

		if (max === 0) {
			if (initial === originalInitial) {
				const final = nodeList.createNode();
				nodeList.linkNodes(initial, final, null);
				return final;
			} else {
				return initial;
			}
		} else if (max === Infinity) {
			// we do a star now

			const final = nodeList.createNode();
			if (lazy) {
				nodeList.linkNodes(initial, final, null);
			}

			const altInitial = nodeList.createNode();
			nodeList.linkNodes(initial, altInitial, null);

			const altFinal = handleAlternatives(nodeList, quant.alternatives, altInitial, options);
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
		} else {
			// 1 <= max < Infinity
			// What is done here for `A{0,3}` is equivalent to `(A(A(A|)|)|)` if not lazy and `(|A(|A(|A)))` if lazy.

			// TODO: do this without recursion
			function foo(initial: ENFA.Node, count: number): ENFA.Node {
				const final = nodeList.createNode();
				if (lazy) {
					nodeList.linkNodes(initial, final, null);
				}

				let inner = handleAlternatives(nodeList, quant.alternatives, initial, options);
				if (count > 1) {
					inner = foo(inner, count - 1);
				}
				nodeList.linkNodes(inner, final, null);

				if (!lazy) {
					nodeList.linkNodes(initial, final, null);
				}

				return final;
			}

			return foo(initial, max);
		}
	}
	function handleAssertion(nodeList: ENFA.NodeList, options: Options): ENFA.Node {
		if (options.assertions === "throw") {
			throw new Error("Assertions are not supported yet.");
		}
		return nodeList.createNode();
	}
}

function isEmpty(element: ReadonlySubList): boolean {
	return element.final.in.size === 0;
}
function createEmpty(nodeList: ENFA.NodeList): SubList {
	return { initial: nodeList.createNode(), final: nodeList.createNode() };
}
function createEmptyConcat(nodeList: ENFA.NodeList): SubList {
	const initial = nodeList.createNode();
	const final = nodeList.createNode();

	nodeList.linkNodes(initial, final, null);

	return { initial, final };
}
function union(nodeList: ENFA.NodeList, alternatives: SubList[]): SubList {
	if (alternatives.length === 0) {
		return createEmpty(nodeList);
	} else if (alternatives.length === 1) {
		return alternatives[0];
	} else {
		const initial = nodeList.createNode();
		const final = nodeList.createNode();

		for (const a of alternatives) {
			nodeList.linkNodes(initial, a.initial, null);
			nodeList.linkNodes(a.final, final, null);
		}

		return { initial, final };
	}
}
function concat(nodeList: ENFA.NodeList, elements: SubList[]): SubList {
	if (elements.length === 0) {
		return createEmptyConcat(nodeList);
	} else if (elements.length === 1) {
		return elements[0];
	} else {
		const initial = elements[0].initial;
		const final = elements[elements.length - 1].final;

		for (let i = 1; i < elements.length; i++) {
			const prev = elements[i - 1];
			const next = elements[i];

			nodeList.linkNodes(prev.final, next.initial, null);
		}

		return { initial, final };
	}
}
function copy(nodeList: ENFA.NodeList, toCopy: ReadonlySubList): SubList {
	const initial = nodeList.createNode();
	const final = nodeList.createNode();

	const translate = cachedFunc<ENFA.ReadonlyNode, ENFA.Node>(() => nodeList.createNode());
	translate.cache.set(toCopy.initial, initial);
	translate.cache.set(toCopy.final, final);

	traverse(toCopy.initial, n => {
		const from = translate(n);

		n.out.forEach((trans, to) => {
			nodeList.linkNodes(from, translate(to), trans);
		});

		return n.out.keys();
	});

	return { initial, final };
}
/*function repeat(nodeList: ENFA.NodeList, element: SubList, count: number): SubList {
	if (count < 1) {
		return createEmptyConcat(nodeList);
	} else if (count === 1) {
		return element;
	} else {
	}
}*/
