import { CharSet } from "../char-set";
import { CharBase } from "../char-base";
import { FABuilder, FAIterator } from "../fa-types";
import { Char } from "../char-types";
import { debugAssert, filterMut, traverse } from "../util";
import { ensureStableOut } from "./iterator";

/**
 * This will return an iterator that iteratively create a DFA using the given {@link FABuilder}.
 *
 * This operation may produce up to _2^O(n)_ many states. The builder should limit the number of states created.
 *
 * @param builder
 * @param iter
 */
export function makeDeterministic<B, I>(
	builder: FABuilder<B, CharSet>,
	iter: FAIterator<I, Iterable<[I, CharSet]>>
): FAIterator<B, B> {
	iter = ensureStableOut(iter);

	const { charSets, ids } = getInfo(iter);
	const alphabet = new CharBase(charSets);

	// This will use the subset method to construct the DFA.

	const inputNodesToDfaNodeMap = new Map<string, B>();
	const dfaNodeToInputNodesMap = new Map<B, readonly I[]>();
	function getKey(nodes: readonly I[]): string {
		let key = "";
		for (let i = 0, l = nodes.length; i < l; i++) {
			key += "," + ids.get(nodes[i])!;
		}
		return key;
	}
	function getDfaNode(nodes: I[]): B {
		// sort
		nodes.sort((a, b) => ids.get(a)! - ids.get(b)!);
		// remove duplicates
		filterMut(nodes, (n, prev) => n !== prev);

		const key = getKey(nodes);
		let dfaNode = inputNodesToDfaNodeMap.get(key);
		if (dfaNode === undefined) {
			// this will create a new node AND set it as final if it contains a final NFA state
			dfaNode = builder.createNode();
			if (nodes.some(n => iter.isFinal(n))) {
				builder.makeFinal(dfaNode);
			}

			inputNodesToDfaNodeMap.set(key, dfaNode);
			dfaNodeToInputNodesMap.set(dfaNode, nodes);
		}
		return dfaNode;
	}
	function getInputNodes(node: B): readonly I[] {
		const nodes = dfaNodeToInputNodesMap.get(node);
		debugAssert(nodes !== undefined, "Unregistered DFA node.");
		return nodes;
	}
	// set initial states
	inputNodesToDfaNodeMap.set(getKey([iter.initial]), builder.initial);
	dfaNodeToInputNodesMap.set(builder.initial, [iter.initial]);
	if (iter.isFinal(iter.initial)) {
		builder.makeFinal(builder.initial);
	}

	function getOutNode(inputNodes: readonly I[], char: Char): B | undefined {
		const outNodes: I[] = [];

		for (const inputNode of inputNodes) {
			for (const [to, via] of iter.getOut(inputNode)) {
				if (via.has(char)) {
					outNodes.push(to);
				}
			}
		}

		if (outNodes.length === 0) {
			// this is the most likely event
			// we save all transitions going to a trap state
			return undefined;
		} else {
			return getDfaNode(outNodes);
		}
	}

	return {
		initial: builder.initial,
		getOut: state => {
			const inputNodes = getInputNodes(state);
			for (const set of alphabet.sets) {
				const out = getOutNode(inputNodes, set.ranges[0].min);
				if (out !== undefined) {
					builder.linkNodes(state, out, set);
				}
			}

			return state;
		},
		isFinal: s => builder.isFinal(s),
	};
}

interface Info<S> {
	charSets: Set<CharSet>;
	ids: ReadonlyMap<S, number>;
}

function getInfo<S>(iter: FAIterator<S, Iterable<[S, CharSet]>>): Info<S> {
	const charSets = new Set<CharSet>();
	const ids = new Map<S, number>();
	let id = 0;

	traverse(iter.initial, (n, queue) => {
		ids.set(n, id);
		id++;

		for (const [to, via] of iter.getOut(n)) {
			charSets.add(via);
			queue.push(to);
		}
	});

	return { charSets, ids };
}
