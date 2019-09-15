import { Alternation } from "./ast";
import { withoutSet, firstOf, intersectSet, BFS } from "./util";
import { FiniteAutomaton } from "./finite-automaton";
import { CharMap } from "./char-map";
import { CharRange } from "./char-set";
import { rangesToString } from "./char-util";
import { faToString } from "./fa-util";

export interface DFANode {
	out: CharMap<DFANode>;
}

//function createNode(): DFANode {
//	return {
//		out: new CharMap()
//	};
//}
//
//function linkNodes(from: DFANode, to: DFANode, char: number): void {
//	if (from.out.has(char)) {
//		throw new Error("The from node already has an out edge for that code point.");
//	}
//
//	from.out.set(char, to);
//}
//function unlinkNodes(from: DFANode, to: DFANode, char: number): void {
//	if (!from.out.has(char)) {
//		throw new Error("The from node doesn't have an out edge for that code point.");
//	}
//
//	from.out.delete(char);
//}
//
//export class DFA implements FiniteAutomaton {
//
//	initial: DFANode;
//	finals: Set<DFANode>;
//
//	constructor(initial: DFANode, finals: Set<DFANode>) {
//		this.initial = initial;
//		this.finals = finals;
//	}
//
//	get empty(): boolean {
//		return firstOf(BFS(this.initial, n => n.out.values(), n => this.finals.has(n), n => n)) === undefined;
//	}
//
//	test(word: Iterable<number>): boolean {
//		let current = this.initial;
//
//		for (const char of word) {
//			const next = current.out.get(char);
//			if (next === undefined) {
//				return false;
//			} else {
//				current = next;
//			}
//		}
//
//		return this.finals.has(current);
//	}
//
//	toString(): string {
//		return faToString(
//			this.initial,
//			node => {
//				// aggregate per node
//				const outMap = new Map<DFANode, CharRange[]>();
//				node.out.forEach((outNode, outRange) => {
//					let ranges = outMap.get(outNode);
//					if (ranges === undefined) {
//						outMap.set(outNode, ranges = []);
//					}
//					ranges.push(outRange);
//				});
//
//				return [...outMap.entries()].map(([n, r]) => [n, rangesToString(r)]);
//			},
//			n => this.finals.has(n)
//		);
//	}
//
//	private createIndexMap(): Map<DFANode, number> {
//		const map = new Map<DFANode, number>();
//		this.listNodes().forEach((node, i) => map.set(node, i));
//		return map;
//	}
//
//	private listNodes(): DFANode[] {
//
//	}
//
//	/**
//	 * Creates a new DFA with is equivalent to this one.
//	 */
//	clone(): DFA {
//		const copied = new Map<DFANode, DFANode>();
//		function copyNode(node: DFANode): DFANode {
//			let copy = copied.get(node);
//			if (copy === undefined) {
//				const out = new Map<number, DFANode>();
//				copy = { out };
//				copied.set(node, copy);
//				node.out.forEach((n, k) => out.set(k, copyNode(n)));
//			}
//			return copy;
//		}
//
//		return new DFA(copyNode(this.initial), new Set<DFANode>([...this.finals].map(f => copyNode(f))));
//	}
//
//	/**
//	 * @returns {DFA}
//	 */
//	minimize(): DFA {
//		this.removeDeadStates();
//
//		const P = this.findEquivalenceClasses();
//
//		const newNodeMap = new Map<DFANode, DFANode>();
//		P.forEach(nodes => {
//			const newNode = createNode();
//			nodes.forEach(n => newNodeMap.set(n, newNode));
//		});
//
//		// initial and finals
//		const initial = newNodeMap.get(this.initial);
//		const finals = new Set<DFANode>();
//		this.finals.forEach(f => finals.add(newNodeMap.get(f)));
//
//		// transitions
//		P.forEach(nodes => {
//			nodes.forEach(n => {
//				const from = newNodeMap.get(n);
//				n.out.forEach((outNode, charCode) => {
//					const to = newNodeMap.get(outNode);
//					if (from.out.get(charCode) !== to) {
//						linkNodes(from, to, charCode);
//					}
//				});
//			});
//		});
//
//		return new DFA(initial, finals);
//	}
//
//	private findEquivalenceClasses(): Set<Set<DFANode>> {
//		// https://en.wikipedia.org/wiki/DFA_minimization#Hopcroft's_algorithm
//
//		const allNodes = new Set<DFANode>();
//		const alphabet = new Set<number>();
//		/** A map from a char code to all nodes which have an incoming transition with that char code. */
//		const inTransitions = new Map<DFANode, Map<number, Set<DFANode>>>();
//
//		const visitAll = (node = this.initial): void => {
//			if (allNodes.has(node)) return;
//			else allNodes.add(node);
//
//			node.out.forEach((outNode, charCode) => {
//				alphabet.add(charCode);
//				visitAll(outNode);
//
//				let inMap = inTransitions.get(outNode);
//				if (inMap === undefined) {
//					inTransitions.set(outNode, inMap = new Map<number, Set<DFANode>>());
//				}
//
//				let set = inMap.get(charCode);
//				if (set === undefined) {
//					inMap.set(charCode, set = new Set<DFANode>());
//				}
//				set.add(node);
//			});
//			for (const outNode of node.out.values()) {
//				visitAll(outNode);
//			}
//		}
//		visitAll();
//
//		const P = new Set<Set<DFANode>>([this.finals, withoutSet(allNodes, this.finals)]);
//		const W = new Set<Set<DFANode>>([this.finals]);
//
//		while (W.size > 0) {
//			const A = firstOf(W)!;
//			W.delete(A);
//
//			for (const c of alphabet) {
//				const X = new Set<DFANode>();
//				A.forEach(n => {
//					const edges = inTransitions.get(n);
//					if (edges === undefined) return;
//					const inOfC = edges.get(c);
//					if (inOfC === undefined) return;
//					inOfC.forEach(x => X.add(x));
//				});
//				if (X.size === 0) continue;
//
//				const pToAdd = [];
//				const pToDelete = [];
//				for (const Y of P) {
//					const intersection = intersectSet(X, Y);
//					if (intersection.size === 0) continue;
//					const without = withoutSet(Y, X);
//					if (without.size === 0) continue;
//
//					pToAdd.push(intersection, without);
//					pToDelete.push(Y);
//
//					if (W.has(Y)) {
//						W.delete(Y);
//						W.add(intersection).add(without);
//					} else {
//						if (intersection.size < without.size) {
//							W.add(intersection);
//						} else {
//							W.add(without);
//						}
//					}
//				}
//				pToDelete.forEach(x => P.delete(x));
//				pToAdd.forEach(x => P.add(x));
//			}
//		}
//
//		return P;
//	}
//
//	private removeDeadStates(): void {
//		const dead = new Set<DFANode>();
//		const alive = new Set<DFANode>();
//
//		const isDead = (node: DFANode, stack: DFANode[] = []): boolean | undefined => {
//			if (dead.has(node)) return true;
//			if (alive.has(node)) return false;
//
//			if (this.finals.has(node)) {
//				alive.add(node);
//				return false;
//			}
//
//			if (stack.includes(node)) {
//				return undefined; // probably dead
//			}
//
//			stack.push(node);
//
//			const toDelete: number[] = []
//			let hasAliveOutEdges = false;
//			node.out.forEach((outNode, key) => {
//				const res = isDead(outNode, stack);
//				if (res === true) {
//					toDelete.push(key);
//				} else if (res === false) {
//					hasAliveOutEdges = true;
//				}
//			});
//
//			toDelete.forEach(key => node.out.delete(key));
//
//			stack.pop();
//
//			if (hasAliveOutEdges) {
//				alive.add(node);
//				return false;
//			} else {
//				dead.add(node);
//				return true;
//			}
//		}
//
//		if (isDead(this.initial)) {
//			this.finals.clear();
//		}
//	}
//
//	toRegex(): Alternation {
//		/**
//		 * @typedef RENode
//		 * @property {Map<RENode, Expression | string>} out
//		 * @property {Map<RENode, Expression | string>} in
//		 */
//
//		/**
//		 * @returns {RENode}
//		 */
//		const createNode = () => ({ in: new Map(), out: new Map() });
//		/** @type {Map<DFANode, RENode>} */
//		const nodeToRENodeMap = new Map();
//		/**
//		 *
//		 * @param {DFANode} node
//		 * @returns {RENode}
//		 */
//		const nodeOf = node => {
//			let reNode = nodeToRENodeMap.get(node);
//			if (reNode === undefined) {
//				nodeToRENodeMap.set(node, reNode = createNode());
//			}
//			return reNode;
//		};
//		/**
//		 *
//		 * @param {RENode} from
//		 * @param {RENode} to
//		 * @param {Expression | string} expr
//		 * @returns {Expression | string}
//		 */
//		const link = (from, to, expr) => {
//			if (from.out.has(to)) {
//				expr = new Alternation([expr, from.out.get(to)]);
//			}
//			from.out.set(to, expr);
//			to.in.set(from, expr);
//			return expr;
//		};
//
//
//		// make new initial and final state
//		const initial = createNode();
//		const final = createNode();
//
//		// connect
//		link(initial, nodeOf(this.initial), "");
//		this.finals.forEach(f => link(nodeOf(f), final, ""));
//
//		// add the rest of the graph
//		/**
//		 *
//		 * @param {DFANode} node
//		 * @param {DFANode[]} stack
//		 */
//		const addNode = (node, stack = []) => {
//			if (stack.includes(node)) return;
//			stack.push(node);
//
//			const reNode = nodeOf(node);
//
//			/** @type {Map<DFANode, Alternation>} */
//			const alternations = new Map();
//			node.out.forEach((outNode, charCode) => {
//				let alt = alternations.get(outNode);
//				if (alt === undefined) {
//					alt = new Alternation([]);
//					link(reNode, nodeOf(outNode), alt)
//					alternations.set(outNode, alt);
//
//					// recursion
//					addNode(outNode, stack);
//				}
//				alt.content.push(String.fromCharCode(charCode));
//			});
//
//			stack.pop();
//		};
//		addNode(this.initial);
//
//		/**
//		 * @returns {Iterable<RENode>}
//		 */
//		function iterate() {
//			/** @type {Set<RENode>} */
//			const visited = new Set();
//			let toVisit = [initial]
//
//			while (toVisit.length > 0) {
//				const newToVisit = [];
//				for (const node of toVisit) {
//					if (visited.has(node))
//						continue;
//					else
//						visited.add(node);
//
//					newToVisit.push(...node.out.keys());
//				}
//				toVisit = newToVisit;
//			}
//
//			return visited;
//		}
//
//		// reduction steps
//		let changed = true;
//		while (changed) {
//			changed = false;
//
//			for (const node of iterate()) {
//				if (node.out.has(node))
//					throw new Error("Kleene star is not supported yet.");
//
//				if (node.in.size === 1 && node.out.size === 1) {
//					const from = firstOf(node.in.keys());
//					const to = firstOf(node.out.keys());
//					const expr = new Concatenation([firstOf(node.in.values()), firstOf(node.out.values())]);
//
//					from.out.delete(node);
//					to.in.delete(node);
//					node.in.clear();
//					node.out.clear();
//					link(from, to, expr);
//
//					changed = true;
//					continue;
//				}
//			}
//
//			if (!changed) {
//				// we want to take away 1 out going edge of a node which has at least 2
//
//				// optimize all expressions
//				for (const node of iterate()) {
//					node.out.forEach((expr, outNode) => {
//						const optimized = Expression.optimize(expr);
//						node.out.set(outNode, optimized);
//						outNode.in.set(node, optimized);
//					});
//				}
//
//				// find all candidates and measure them
//				/** @type {RENode} */
//				let min = undefined;
//				/** @type {RENode} */
//				let minOut = undefined;
//				/** @type {number} */
//				let minScore = undefined;
//				for (const node of iterate()) {
//					if (node.in.size >= 1 && node.out.size > 1) {
//						let inScore = 0;
//						node.in.forEach((expr) => inScore += expr.toString().length);
//
//						node.out.forEach((expr, outNode) => {
//							const score = inScore + node.in.size * (expr.toString().length);
//							if (minScore === undefined || score < minScore) {
//								min = node;
//								minOut = outNode;
//								minScore = score;
//							}
//						});
//					}
//				}
//
//				// remove the minimum
//				if (min !== undefined) {
//					const outExpr = min.out.get(minOut);
//					min.in.forEach((expr, inNode) => {
//						link(inNode, minOut, new Concatenation([expr, outExpr]));
//					});
//					min.out.delete(minOut);
//					minOut.in.delete(min);
//
//					changed = true;
//				}
//			}
//		}
//
//		if (initial.out.size === 1 && initial.out.has(final)) {
//			return firstOf(initial.out.values());
//		}
//
//		// this shouldn't happen
//		throw new Error("Unable to further reduce the expression");
//	}
//
//	static fromWords(words: Iterable<string>): DFA {
//		const initial = createNode();
//		const finals = new Set<DFANode>();
//
//		// just build a prefix trie
//		for (const word of words) {
//			let node = initial;
//			for (let i = 0; i < word.length; i++) {
//				const charCode = word.charCodeAt(i);
//				let next = node.out.get(charCode);
//				if (next === undefined) {
//					next = createNode();
//					linkNodes(node, next, charCode);
//				}
//				node = next;
//			}
//			finals.add(node);
//		}
//
//		return new DFA(initial, finals);
//	}
//
//}
