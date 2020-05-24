import { Simple, Expression, Concatenation, Alternation, CharacterClass, Quantifier, Element, Assertion, visitAst } from "./ast";
import { CharSet } from "./char-set";
import { cachedFunc, DFS, firstOf, minOf, assertNever } from "./util";


type RegexFANodeTransition = Simple<Concatenation | Alternation | CharacterClass | Quantifier>;
interface RegexFANode {
	out: Map<RegexFANode, RegexFANodeTransition>;
	in: Map<RegexFANode, RegexFANodeTransition>;
}
class NodeList {
	readonly initial: RegexFANode;
	readonly final: Set<RegexFANode>;

	constructor() {
		this.initial = this.createNode();
		this.final = new Set();
	}

	createNode(): RegexFANode {
		return {
			in: new Map(),
			out: new Map()
		};
	}

	linkNodes(from: RegexFANode, to: RegexFANode, transition: RegexFANodeTransition): void {
		if (from.out.has(to)) {
			throw new Error("The two nodes are already linked");
		}
		from.out.set(to, transition);
		to.in.set(from, transition);
	}

	unlinkNodes(from: RegexFANode, to: RegexFANode): RegexFANodeTransition | undefined {
		const t = from.out.get(to);
		if (t !== undefined) {
			from.out.delete(to);
			to.in.delete(from);
		}
		return t;
	}

}

function createNodeList<T>(initial: T, getOutTransitions: (value: T) => Iterable<[T, CharSet]>,
	final: (value: T) => boolean): NodeList | null {

	const nodeList = new NodeList();

	// the state elimination method requires that the initial state isn't final, so we add a temp state
	// the transition [initial] -> [tempInitial] is an epsilon transition
	const tempInitial = nodeList.createNode();
	nodeList.linkNodes(nodeList.initial, tempInitial, {
		type: "Concatenation",
		elements: []
	});

	const translate = cachedFunc<T, RegexFANode>(() => nodeList.createNode());
	translate.cache.set(initial, tempInitial);

	DFS(initial, n => {
		// set final
		if (final(n)) {
			nodeList.final.add(translate(n));
		}

		// out transitions sorted by char set
		const out = [...getOutTransitions(n)].sort(([, a], [, b]) => {
			const diff = Number(a.isEmpty) - Number(b.isEmpty);
			if (diff !== 0) return diff;

			for (let i = 0, l = Math.min(a.ranges.length, b.ranges.length); i < l; i++) {
				const aR = a.ranges[i];
				const bR = b.ranges[i];
				if (aR.min !== bR.min) return aR.min - bR.min;
				if (aR.max !== bR.max) return aR.max - bR.max;
			}
			return a.ranges.length - b.ranges.length;
		});

		out.forEach(([outNode, charSet]) => {
			nodeList.linkNodes(translate(n), translate(outNode), {
				type: "CharacterClass",
				characters: charSet
			})
		});

		return out.map(x => x[0]);
	});

	if (nodeList.final.size === 0) {
		// empty language
		return null;
	}

	// make a new final state with no outgoing edges
	const tempFinal = nodeList.createNode();
	nodeList.final.forEach(n => {
		// add epsilon transition
		nodeList.linkNodes(n, tempFinal, {
			type: "Concatenation",
			elements: []
		});
	});
	nodeList.final.clear();
	nodeList.final.add(tempFinal);

	// we now have an FA with one initial (source) and one final (drain) state

	// remove all states which cannot reach the final state
	const alive = new Set<RegexFANode>();
	DFS(tempFinal, n => {
		alive.add(n);
		return n.in.keys();
	});
	const dead = new Set<RegexFANode>();
	DFS(nodeList.initial, n => {
		if (!alive.has(n)) {
			dead.add(n);
		}
		return n.out.keys();
	});
	dead.forEach(n => {
		n.out.forEach((_, outNode) => {
			nodeList.unlinkNodes(n, outNode);
		});
		n.in.forEach((_, inNode) => {
			nodeList.unlinkNodes(inNode, n);
		});
	})

	return nodeList;
}
function eliminateStates(nodeList: NodeList): void {
	const initial = nodeList.initial;
	const final = firstOf(nodeList.final)!;

	const remainingStates = new Set<RegexFANode>();
	DFS(initial, n => {
		if (n !== initial && n !== final) {
			remainingStates.add(n);
		}
		return n.out.keys();
	});

	function linkWithUnion(from: RegexFANode, to: RegexFANode, trans: RegexFANodeTransition): void {
		const currentTrans = nodeList.unlinkNodes(from, to);
		if (currentTrans) {
			trans = union(currentTrans, trans);
		}
		nodeList.linkNodes(from, to, trans);
	}

	function concat(a: RegexFANodeTransition, b: RegexFANodeTransition): RegexFANodeTransition {
		if (a.type === "Concatenation") {
			if (a.elements.length === 0) return b;
			if (b.type === "Concatenation") {
				return {
					type: "Concatenation",
					elements: [...a.elements, ...b.elements]
				};
			} else {
				return {
					type: "Concatenation",
					elements: [...a.elements, b]
				};
			}
		}
		if (b.type === "Concatenation") {
			if (b.elements.length === 0) return a;
			return {
				type: "Concatenation",
				elements: [...b.elements, a]
			};
		}
		return {
			type: "Concatenation",
			elements: [a, b]
		};
	}
	function getSingleCharClass(
		a: Simple<Alternation>): Simple<Concatenation> & { elements: [Simple<CharacterClass>] } | null {
		for (const alt of a.alternatives) {
			if (alt.elements.length === 1) {
				const first = alt.elements[0];
				if (first.type === "CharacterClass") {
					return alt as Simple<Concatenation> & { elements: [Simple<CharacterClass>] };
				}
			}
		}
		return null;
	}
	function asConcatenation(a: Simple<Element | Concatenation>): Simple<Concatenation> {
		if (a.type === "Concatenation") {
			return a;
		} else {
			return {
				type: "Concatenation",
				elements: [a]
			};
		}
	}
	function union(a: RegexFANodeTransition, b: RegexFANodeTransition): RegexFANodeTransition {
		if (a.type === "CharacterClass" && b.type === "CharacterClass") {
			return {
				type: "CharacterClass",
				characters: a.characters.union(b.characters)
			};
		}

		if (a.type === "Alternation") {
			if (a.alternatives.length === 0) return b;
			if (b.type === "Alternation") {
				if (b.alternatives.length === 0) return a;

				const aCharClassAlt = getSingleCharClass(a);
				if (aCharClassAlt) {
					const bCharClassAlt = getSingleCharClass(b);
					if (bCharClassAlt) {
						const aCharClass = aCharClassAlt.elements[0];
						const bCharClass = bCharClassAlt.elements[0];
						// merge the single char class
						const newAlternatives: Simple<Concatenation>[] = [
							asConcatenation({
								type: "CharacterClass",
								characters: aCharClass.characters.union(bCharClass.characters)
							})
						];
						a.alternatives.forEach(alt => {
							if (alt !== aCharClassAlt) newAlternatives.push(alt);
						});
						b.alternatives.forEach(alt => {
							if (alt !== bCharClassAlt) newAlternatives.push(alt);
						});
						return {
							type: "Alternation",
							alternatives: newAlternatives
						};
					}
				}

				return {
					type: "Alternation",
					alternatives: [...a.alternatives, ...b.alternatives]
				};
			} else if (b.type === "CharacterClass") {
				return unionAlternationAndCharClass(a, b);
			} else {
				return {
					type: "Alternation",
					alternatives: [
						...a.alternatives,
						asConcatenation(b)
					]
				};
			}
		}
		if (b.type === "Alternation") {
			if (b.alternatives.length === 0) return a;
			if (a.type === "CharacterClass") {
				return unionAlternationAndCharClass(b, a);
			} else {
				return {
					type: "Alternation",
					alternatives: [
						...b.alternatives,
						asConcatenation(a)
					]
				};
			}
		}

		return {
			type: "Alternation",
			alternatives: [asConcatenation(a), asConcatenation(b)]
		};
	}
	function unionAlternationAndCharClass(
		alternation: Simple<Alternation>,
		char: Simple<CharacterClass>): Simple<Alternation> {
		const charClassAlt = getSingleCharClass(alternation);
		if (charClassAlt) {
			// merge the single char class
			const newAlternatives: Simple<Concatenation>[] = [
				asConcatenation({
					type: "CharacterClass",
					characters: charClassAlt.elements[0].characters.union(char.characters)
				})
			];
			alternation.alternatives.forEach(alt => {
				if (alt !== charClassAlt) newAlternatives.push(alt);
			});
			return {
				type: "Alternation",
				alternatives: newAlternatives
			};
		}
		return {
			type: "Alternation",
			alternatives: [
				asConcatenation(char),
				...alternation.alternatives
			]
		};
	}
	function star(a: RegexFANodeTransition): RegexFANodeTransition {
		switch (a.type) {
			case "Quantifier":
				if (a.min === 0 && a.max === Infinity) return a;
				return {
					type: "Quantifier",
					min: 0,
					max: Infinity,
					alternatives: a.alternatives
				};

			case "Alternation":
				return {
					type: "Quantifier",
					min: 0,
					max: Infinity,
					alternatives: a.alternatives
				};

			case "Concatenation":
				if (a.elements.length === 0)
					return a;
				return {
					type: "Quantifier",
					min: 0,
					max: Infinity,
					alternatives: [a]
				};

			default:
				return {
					type: "Quantifier",
					min: 0,
					max: Infinity,
					alternatives: [asConcatenation(a)]
				};
		}
	}

	function removeTrivialReflexiveTransition(state: RegexFANode): void {
		if (state.out.has(state)) {
			if (state.out.size === 2) {
				// (A1) -[a1]-v                     (A1) -[a1]-v
				// (A2) -[a2]-> (B) -[b]-> (C)  ==  (A2) -[a2]-> (B) -[c*b]-> (C)
				// (An) -[an]-^  Δ  \               (An) -[an]-^
				//                \[c]

				const refTrans = nodeList.unlinkNodes(state, state)!;
				const [outState,] = firstOf(state.out)!;
				const outTrans = nodeList.unlinkNodes(state, outState)!;
				nodeList.linkNodes(state, outState, concat(star(refTrans), outTrans));

			} else if (state.in.size === 2) {
				//                /[b1]-> (C1)                       /[b1]-> (C1)
				// (A) -[a]-> (B) -[b2]-> (C2)  ==  (A) -[ac*]-> (B) -[b2]-> (C2)
				//          /  Δ  \[bn]-> (Cn)                       \[bn]-> (Cn)
				//         [c]/

				const refTrans = nodeList.unlinkNodes(state, state)!;
				const [inState,] = firstOf(state.in)!;
				const inTrans = nodeList.unlinkNodes(inState, state)!;
				nodeList.linkNodes(inState, state, concat(inTrans, star(refTrans)));
			}
		}
	}
	function removeTrivialConcat(state: RegexFANode): null | RegexFANode[] {
		if (state.in.size === 1 && state.out.size === 1) {
			// (A) -[a]-> (B) -[b]-> (C)  ==  (A) -[ab]-> (C)
			const [inState,] = firstOf(state.in)!;
			const [outState,] = firstOf(state.out)!;
			const inTrans = nodeList.unlinkNodes(inState, state)!;
			const outTrans = nodeList.unlinkNodes(state, outState)!;

			linkWithUnion(inState, outState, concat(inTrans, outTrans));

			remainingStates.delete(state);
			return [inState, outState];
		}
		return null;
	}

	function trivialOperations(toProcess: ReadonlySet<RegexFANode>): void {
		while (toProcess.size > 0) {
			const newToProcess = new Set<RegexFANode>();
			toProcess.forEach(state => {
				if (!remainingStates.has(state)) return;

				removeTrivialReflexiveTransition(state);

				const affected = removeTrivialConcat(state);
				if (affected) {
					affected.forEach(s => newToProcess.add(s));
				}
			});
			toProcess = newToProcess;
		}
	}

	function removeState(state: RegexFANode): Set<RegexFANode> {
		const affected = new Set<RegexFANode>([...state.in.keys(), ...state.out.keys()]);
		affected.delete(state);

		const refTrans = nodeList.unlinkNodes(state, state);
		if (refTrans) {
			const refStar = star(refTrans);
			state.in.forEach((inTrans, inState) => {
				state.out.forEach((outTrans, outState) => {
					linkWithUnion(inState, outState, concat(inTrans, concat(refStar, outTrans)));
				});
			});
		} else {
			state.in.forEach((inTrans, inState) => {
				state.out.forEach((outTrans, outState) => {
					linkWithUnion(inState, outState, concat(inTrans, outTrans));
				});
			});
		}

		state.in.forEach((_, inState) => {
			nodeList.unlinkNodes(inState, state);
		});
		state.out.forEach((_, outState) => {
			nodeList.unlinkNodes(state, outState);
		});

		remainingStates.delete(state);
		return affected;
	}

	// start by applying all trivial operations
	trivialOperations(remainingStates);

	while (remainingStates.size > 0) {
		// 1) Pick a state
		// 2) Eliminate it
		// 3) Do trivial operations

		const pickedState = minOf(remainingStates, state => {
			/**
			 * This cost function tries to minimize the length of the resulting regular expression.
			 *
			 * The cost of every starting transition of the state will be 1. The total cost to remove a state will
			 * be the number of transitions created by the removal of the state times the average cost of the operations
			 * used to get the value of a transition.
			 *
			 * The cost function for different operation will behave like this:
			 *  1. `cost(star(t)) == cost(t)`
			 *  2. `cost(concat(t1, t2)) == cost(t1) + cost(t2)`
			 *  3. `cost(union(t1, t2)) == cost(t1) + cost(t2)`
			 */

			// this will ignore the cost of a union with existing transition to estimate the cost faster
			if (state.out.has(state)) {
				// n * 3, because `cost(concat(t_in, concat(star(t_ref), t_out))) == 3`
				return (state.in.size - 1) * (state.out.size - 1) * 3;
			} else {
				// n * 3, because `cost(concat(t_in, t_out)) == 2`
				return state.in.size * state.out.size * 2;
			}
		});
		const affected = removeState(pickedState!);
		trivialOperations(affected);
	}
}

function stateElimination<T>(initial: T, getOutTransitions: (value: T) => Iterable<[T, CharSet]>,
	final: (value: T) => boolean): Simple<Expression> {

	const nodeList = createNodeList(initial, getOutTransitions, final);
	if (nodeList == null) {
		return {
			type: "Expression",
			alternatives: []
		};
	}

	eliminateStates(nodeList);

	const [finalState] = [...nodeList.final];
	if (finalState.in.size !== 1 || !finalState.in.has(nodeList.initial)) {
		throw new Error("State elimination failed.");
	}

	const transition = finalState.in.get(nodeList.initial)!;

	switch (transition.type) {
		case "Alternation":
			return {
				type: "Expression",
				alternatives: transition.alternatives
			};

		case "Concatenation":
			return {
				type: "Expression",
				alternatives: [transition]
			};

		default:
			return {
				type: "Expression",
				alternatives: [
					{
						type: "Concatenation",
						elements: [
							transition
						]
					}
				]
			};
	}
}

function structurallyEqual(a: Simple<Element>, b: Simple<Element>): boolean {
	if (a.type !== b.type) return false;
	switch (a.type) {
		case "Alternation": {
			const other = b as Simple<Alternation>;
			return structurallyEqualAlternatives(a.alternatives, other.alternatives);
		}
		case "Assertion": {
			const other = b as Simple<Assertion>;
			if (a.kind !== other.kind || a.negate !== other.negate)
				return false;
			return structurallyEqualAlternatives(a.alternatives, other.alternatives);
		}
		case "CharacterClass": {
			const other = b as Simple<CharacterClass>;
			return a.characters.equals(other.characters);
		}
		case "Quantifier": {
			const other = b as Simple<Quantifier>;
			if (a.min !== other.min || a.max !== other.max)
				return false;
			return structurallyEqualAlternatives(a.alternatives, other.alternatives);
		}
		default:
			throw assertNever(a);
	}
}
function structurallyEqualAlternatives(
	a: readonly Simple<Concatenation>[],
	b: readonly Simple<Concatenation>[]): boolean {
	const l = a.length;
	if (l !== b.length) return false;
	for (let i = 0; i < l; i++) {
		if (!structurallyEqualConcatenation(a[i], b[i]))
			return false;
	}
	return true;
}
function structurallyEqualConcatenation(a: Simple<Concatenation>, b: Simple<Concatenation>): boolean {
	const l = a.elements.length;
	if (l !== b.elements.length) return false;
	for (let i = 0; i < l; i++) {
		if (!structurallyEqual(a.elements[i], b.elements[i]))
			return false;
	}
	return true;
}

function optimize(expr: Simple<Expression>): void {
	visitAst(expr, {
		onConcatenationLeave(node) {
			const elements = node.elements;
			// make (?:|a) -> a?
			for (let i = 0; i < elements.length; i++) {
				const element = elements[i];
				if (element.type === "Alternation") {
					if (element.alternatives.some(a => a.elements.length === 0)) {
						// remove empty alternatives
						let alternatives = element.alternatives.filter(a => a.elements.length > 0);

						// optimize alternatives
						if (alternatives.length === 1 && alternatives[0].elements.length === 1) {
							const singleElement = alternatives[0].elements[0];
							if (singleElement.type === "Alternation") {
								alternatives = singleElement.alternatives;
							}
						}

						let replaced = false;
						// try to replace the alternative with an adjusted quantifier
						if (alternatives.length === 1 && alternatives[0].elements.length === 1) {
							const singleElement = alternatives[0].elements[0];
							if (singleElement.type === "Quantifier") {
								singleElement.min = 0;
								elements[i] = singleElement;
								replaced = true;
							}
						}

						// replace alternative with quantifier if not already replaced
						if (!replaced) {
							elements[i] = {
								type: "Quantifier",
								min: 0, max: 1,
								alternatives
							};
						}
					}
				}
			}

			// make e.g. aa* -> a+
			for (let i = 1; i < elements.length; i++) {
				const element = elements[i];
				if (element.type === "Quantifier") {
					// TODO: Implement
				}
			}
		}
	});
}

export function faToRegex<T>(initial: T, getOutTransitions: (value: T) => Iterable<[T, CharSet]>,
	final: (value: T) => boolean): Simple<Expression> {

	const expression = stateElimination(initial, getOutTransitions, final);
	optimize(expression);

	return expression;
}
