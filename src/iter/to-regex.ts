import {
	NoParent,
	Expression,
	Concatenation,
	Alternation,
	CharacterClass,
	Quantifier,
	Element,
	combineTransformers,
	TransformContext,
	transform,
} from "../ast";
import { CharSet } from "../char-set";
import { cachedFunc, DFS, firstOf, minOf, assertNever } from "../util";
import { ToRegexOptions, TooManyNodesError, FAIterator } from "../finite-automaton";
import { structurallyEqual } from "../ast-analysis";
import {
	CreationOptions,
	mergeWithQuantifier,
	factorOut,
	moveUpEmpty,
	inline,
	unionCharacters,
	nestedQuantifiers,
} from "../transformers";

const TRANSFORMER_CREATION_OPTIONS: CreationOptions = { ignoreAmbiguity: true, ignoreOrder: true };
const CONCAT_TRANSFORMER = combineTransformers([mergeWithQuantifier(TRANSFORMER_CREATION_OPTIONS)]);
const UNION_TRANSFORMER = combineTransformers([
	unionCharacters(TRANSFORMER_CREATION_OPTIONS),
	factorOut(TRANSFORMER_CREATION_OPTIONS),
	moveUpEmpty(TRANSFORMER_CREATION_OPTIONS),
	inline(TRANSFORMER_CREATION_OPTIONS),
]);
const QUANTIFIER_TRANSFORMER = combineTransformers([nestedQuantifiers(TRANSFORMER_CREATION_OPTIONS)]);
const FULL_OPTIMIZE_TRANSFORMER = combineTransformers([
	inline(TRANSFORMER_CREATION_OPTIONS),
	unionCharacters(TRANSFORMER_CREATION_OPTIONS),
	factorOut(TRANSFORMER_CREATION_OPTIONS),
	moveUpEmpty(TRANSFORMER_CREATION_OPTIONS),
	nestedQuantifiers(TRANSFORMER_CREATION_OPTIONS),
	mergeWithQuantifier(TRANSFORMER_CREATION_OPTIONS),
]);

type RegexFANodeTransition = NoParent<Concatenation | Element>;
interface RegexFANode {
	out: Map<RegexFANode, RegexFANodeTransition>;
	in: Map<RegexFANode, RegexFANodeTransition>;
}
class NodeList {
	readonly initial: RegexFANode;
	readonly finals: Set<RegexFANode>;

	constructor() {
		this.initial = this.createNode();
		this.finals = new Set();
	}

	createNode(): RegexFANode {
		return {
			in: new Map(),
			out: new Map(),
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

	relinkNodes(from: RegexFANode, to: RegexFANode, newTransition: RegexFANodeTransition): void {
		if (!from.out.has(to)) {
			throw new Error("The two nodes are not linked");
		}
		from.out.set(to, newTransition);
		to.in.set(from, newTransition);
	}
}

class TransitionCreator {
	private _counter: number = 0;
	constructor(public readonly max: number) {}

	private _incrementCounter(): void {
		if (++this._counter > this.max) {
			throw new TooManyNodesError(`Too many RE AST nodes. Reached maximum of ${this.max}.`);
		}
	}

	concat(elements: NoParent<Concatenation>["elements"]): NoParent<Concatenation> {
		this._incrementCounter();

		return {
			type: "Concatenation",
			elements,
		};
	}
	emptyConcat(): NoParent<Concatenation> {
		this._incrementCounter();

		return {
			type: "Concatenation",
			elements: [],
		};
	}

	alter(alternatives: NoParent<Alternation>["alternatives"]): NoParent<Alternation> {
		this._incrementCounter();

		return {
			type: "Alternation",
			alternatives,
		};
	}
	emptyAlter(): NoParent<Alternation> {
		this._incrementCounter();

		return {
			type: "Alternation",
			alternatives: [],
		};
	}

	expression(alternatives: NoParent<Expression>["alternatives"]): NoParent<Expression> {
		this._incrementCounter();

		return {
			type: "Expression",
			alternatives,
		};
	}
	emptyExpression(): NoParent<Expression> {
		this._incrementCounter();

		return {
			type: "Expression",
			alternatives: [],
		};
	}

	char(characters: CharSet): NoParent<CharacterClass> {
		this._incrementCounter();

		return {
			type: "CharacterClass",
			characters,
		};
	}

	quant(alternatives: NoParent<Quantifier>["alternatives"], min: number, max: number): NoParent<Quantifier> {
		this._incrementCounter();

		return {
			type: "Quantifier",
			alternatives,
			lazy: false,
			min,
			max,
		};
	}
	quantStar(alternatives: NoParent<Quantifier>["alternatives"]): NoParent<Quantifier> {
		this._incrementCounter();

		return {
			type: "Quantifier",
			alternatives,
			lazy: false,
			min: 0,
			max: Infinity,
		};
	}
	quantPlus(alternatives: NoParent<Quantifier>["alternatives"]): NoParent<Quantifier> {
		this._incrementCounter();

		return {
			type: "Quantifier",
			alternatives,
			lazy: false,
			min: 1,
			max: Infinity,
		};
	}

	copy(t: NoParent<Concatenation>): NoParent<Concatenation>;
	copy(t: RegexFANodeTransition): RegexFANodeTransition;
	copy(t: RegexFANodeTransition): RegexFANodeTransition {
		switch (t.type) {
			case "Alternation":
				return this.alter(t.alternatives.map(a => this.copy(a)));
			case "Concatenation":
				return this.concat(t.elements.map(e => this.copy(e as RegexFANodeTransition) as NoParent<Element>));
			case "CharacterClass":
				return this.char(t.characters);
			case "Quantifier":
				return this.quant(
					t.alternatives.map(a => this.copy(a)),
					t.min,
					t.max
				);
			case "Assertion":
				throw new Error("Assertions should not have been part of the created regex.");

			default:
				throw assertNever(t);
		}
	}
}

function createNodeList<T>(
	iter: FAIterator<T, Iterable<[T, CharSet]>>,
	tc: TransitionCreator
): { nodeList: NodeList; maxCharacter: number } | null {
	const nodeList = new NodeList();

	// the state elimination method requires that the initial state isn't final, so we add a temp state
	// the transition [initial] -> [tempInitial] is an epsilon transition
	const tempInitial = nodeList.createNode();
	nodeList.linkNodes(nodeList.initial, tempInitial, tc.emptyConcat());

	const translate = cachedFunc<T, RegexFANode>(() => nodeList.createNode());
	translate.cache.set(iter.initial, tempInitial);

	let maxCharacter: number | undefined = undefined;

	DFS(iter.initial, n => {
		// set final
		if (iter.isFinal(n)) {
			nodeList.finals.add(translate(n));
		}

		// out transitions sorted by char set
		const out = [...iter.getOut(n)].sort(([, a], [, b]) => {
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
			if (maxCharacter === undefined) {
				maxCharacter = charSet.maximum;
			} else if (charSet.maximum !== maxCharacter) {
				throw new Error("All character sets have to have to same maximum.");
			}
			nodeList.linkNodes(translate(n), translate(outNode), tc.char(charSet));
		});

		return out.map(x => x[0]);
	});

	if (nodeList.finals.size === 0) {
		// empty language
		return null;
	}

	// make a new final state with no outgoing edges
	const tempFinal = nodeList.createNode();
	nodeList.finals.forEach(n => {
		// add epsilon transition
		nodeList.linkNodes(n, tempFinal, tc.emptyConcat());
	});
	nodeList.finals.clear();
	nodeList.finals.add(tempFinal);

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
	});

	return { nodeList, maxCharacter: maxCharacter ?? 0 };
}
function eliminateStates(nodeList: NodeList, tc: TransitionCreator, maxCharacter: number): void {
	const initial = nodeList.initial;
	const final = firstOf(nodeList.finals)!;

	const remainingStates = new Set<RegexFANode>();
	DFS(initial, n => {
		if (n !== initial && n !== final) {
			remainingStates.add(n);
		}
		return n.out.keys();
	});

	const transformContext: TransformContext = {
		maxCharacter,
		signalMutation: () => {
			/* noop */
		},
	};

	function linkWithUnion(from: RegexFANode, to: RegexFANode, trans: RegexFANodeTransition): void {
		const currentTrans = nodeList.unlinkNodes(from, to);
		if (currentTrans) {
			trans = union(currentTrans, trans);
		}
		nodeList.linkNodes(from, to, trans);
	}

	function unwrap(a: RegexFANodeTransition): RegexFANodeTransition {
		if (a.type === "Concatenation") {
			if (a.elements.length === 1) {
				return unwrap(a.elements[0]);
			} else {
				return a;
			}
		} else if (a.type === "Alternation") {
			if (a.alternatives.length === 1) {
				return unwrap(a.alternatives[0]);
			} else {
				return a;
			}
		} else {
			return a;
		}
	}
	function concat(a: RegexFANodeTransition, b: RegexFANodeTransition): RegexFANodeTransition {
		let result: NoParent<Concatenation>;

		if (a.type === "Concatenation") {
			if (a.elements.length === 0) return b;
			if (b.type === "Concatenation") {
				a.elements.push(...b.elements);
			} else {
				a.elements.push(b);
			}
			result = a;
		} else if (b.type === "Concatenation") {
			if (b.elements.length === 0) return a;
			b.elements.unshift(a);
			result = b;
		} else {
			result = tc.concat([a, b]);
		}

		// optimize quantifiers
		CONCAT_TRANSFORMER.onConcatenation!(result, transformContext);

		return unwrap(result);
	}
	function toConcatenation(a: NoParent<Element | Concatenation>): NoParent<Concatenation> {
		if (a.type === "Concatenation") {
			return a;
		} else if (a.type === "Alternation" && a.alternatives.length === 1) {
			return a.alternatives[0];
		} else {
			return tc.concat([a]);
		}
	}
	function union(a: RegexFANodeTransition, b: RegexFANodeTransition): RegexFANodeTransition {
		if (a.type === "CharacterClass" && b.type === "CharacterClass") {
			a.characters = a.characters.union(b.characters);
			return a;
		}

		let result: NoParent<Alternation>;
		if (a.type === "Alternation") {
			if (a.alternatives.length === 0) return b;

			if (b.type === "Alternation") {
				if (b.alternatives.length === 0) return a;
				a.alternatives.push(...b.alternatives);
			} else {
				a.alternatives.push(toConcatenation(b));
			}
			result = a;
		} else if (b.type === "Alternation") {
			if (b.alternatives.length === 0) return a;

			b.alternatives.push(toConcatenation(a));
			result = b;
		} else {
			result = tc.alter([toConcatenation(a), toConcatenation(b)]);
		}

		// optimize
		UNION_TRANSFORMER.onAlternation!(result, transformContext);

		return unwrap(result);
	}
	function star(a: RegexFANodeTransition): RegexFANodeTransition {
		let result: NoParent<Quantifier>;

		switch (a.type) {
			case "Quantifier": {
				if (a.max === 0) return tc.emptyConcat();
				if (a.min === 0 || a.min === 1) {
					a.min = 0;
					a.max = Infinity;
					return a;
				}
				result = tc.quantStar([toConcatenation(a)]);
				break;
			}
			case "Alternation": {
				result = tc.quantStar(a.alternatives);
				break;
			}
			case "Concatenation": {
				if (a.elements.length === 0) return a;
				result = tc.quantStar([a]);
				break;
			}
			default: {
				result = tc.quantStar([toConcatenation(a)]);
				break;
			}
		}

		// optimize
		QUANTIFIER_TRANSFORMER.onQuantifier!(result, transformContext);

		return unwrap(result);
	}
	function plus(a: RegexFANodeTransition): RegexFANodeTransition {
		let result: NoParent<Quantifier>;

		switch (a.type) {
			case "Quantifier": {
				if (a.max === 0) return tc.emptyConcat();
				if (a.min === 0 || a.min === 1) {
					a.max = Infinity;
					return a;
				}
				result = tc.quantPlus([toConcatenation(a)]);
				break;
			}
			case "Alternation": {
				result = tc.quantPlus(a.alternatives);
				break;
			}
			case "Concatenation": {
				if (a.elements.length === 0) return a;
				result = tc.quantPlus([a]);
				break;
			}
			default: {
				result = tc.quantPlus([toConcatenation(a)]);
				break;
			}
		}

		// optimize
		QUANTIFIER_TRANSFORMER.onQuantifier!(result, transformContext);

		return unwrap(result);
	}

	function removeTrivialReflexiveTransition(state: RegexFANode): void {
		if (state.out.has(state)) {
			if (state.in.size === 2 && state.out.size === 2) {
				// (A) -[a]-> (B) -[b]-> (C)  ==  (A) -[a]-> (B) -[c*b]-> (C)  ==  (A) -[ac*]-> (B) -[b]-> (C)
				//             Δ  \
				//              \[c]

				// Since we choose the between two equivalent outcomes here, we will try to make a good choice.

				const refTrans = nodeList.unlinkNodes(state, state)!;
				const [outState, outTrans] = firstOf(state.out)!;
				const [inState, inTrans] = firstOf(state.in)!;

				if (structurallyEqual(inTrans, refTrans)) {
					// a == c  =>  (A) -[a+]-> (B) -[b]-> (C)
					nodeList.relinkNodes(inState, state, plus(refTrans));
				} else {
					if (structurallyEqual(refTrans, outTrans)) {
						// c == b  =>  (A) -[a]-> (B) -[b+]-> (C)
						nodeList.relinkNodes(state, outState, plus(refTrans));
					} else {
						// (A) -[a]-> (B) -[c*b]-> (C)
						nodeList.relinkNodes(state, outState, concat(star(refTrans), outTrans));
					}
				}
			} else if (state.out.size === 2) {
				// (A1) -[a1]-v                     (A1) -[a1]-v
				// (A2) -[a2]-> (B) -[b]-> (C)  ==  (A2) -[a2]-> (B) -[c*b]-> (C)
				// (An) -[an]-^  Δ  \               (An) -[an]-^
				//                \[c]

				const refTrans = nodeList.unlinkNodes(state, state)!;
				const [outState, outTrans] = firstOf(state.out)!;
				if (structurallyEqual(refTrans, outTrans)) {
					nodeList.relinkNodes(state, outState, plus(refTrans));
				} else {
					nodeList.relinkNodes(state, outState, concat(star(refTrans), outTrans));
				}
			} else if (state.in.size === 2) {
				//                /[b1]-> (C1)                       /[b1]-> (C1)
				// (A) -[a]-> (B) -[b2]-> (C2)  ==  (A) -[ac*]-> (B) -[b2]-> (C2)
				//          /  Δ  \[bn]-> (Cn)                       \[bn]-> (Cn)
				//         [c]/

				const refTrans = nodeList.unlinkNodes(state, state)!;
				const [inState, inTrans] = firstOf(state.in)!;
				if (structurallyEqual(inTrans, refTrans)) {
					nodeList.relinkNodes(inState, state, plus(refTrans));
				} else {
					nodeList.relinkNodes(inState, state, concat(inTrans, star(refTrans)));
				}
			}
		}
	}
	function removeTrivialConcat(state: RegexFANode): null | RegexFANode[] {
		if (state.in.size === 1 && state.out.size === 1) {
			// (A) -[a]-> (B) -[b]-> (C)  ==  (A) -[ab]-> (C)
			const [inState, inTrans] = firstOf(state.in)!;
			const [outState, outTrans] = firstOf(state.out)!;
			nodeList.unlinkNodes(inState, state);
			nodeList.unlinkNodes(state, outState);

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
					linkWithUnion(
						inState,
						outState,
						concat(tc.copy(inTrans), concat(tc.copy(refStar), tc.copy(outTrans)))
					);
				});
			});
		} else {
			state.in.forEach((inTrans, inState) => {
				state.out.forEach((outTrans, outState) => {
					linkWithUnion(inState, outState, concat(tc.copy(inTrans), tc.copy(outTrans)));
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
			 *  2. `cost(concat(t1, t2)) == cost(t1) * cost(t2)`
			 *  3. `cost(union(t1, t2)) == cost(t1) + cost(t2)`
			 */

			// this will ignore the cost of a union with existing transition to estimate the cost faster
			if (state.out.has(state)) {
				// n * 3, because `cost(concat(t_in, concat(star(t_ref), t_out))) == 3`
				return (state.in.size - 1) * (state.out.size - 1) * 3;
			} else {
				// n * 2, because `cost(concat(t_in, t_out)) == 2`
				return state.in.size * state.out.size * 2;
			}
		});
		const affected = removeState(pickedState!);
		trivialOperations(affected);
	}
}

function stateElimination<T>(iter: FAIterator<T, Iterable<[T, CharSet]>>, maxAstNodes: number): NoParent<Expression> {
	const tc = new TransitionCreator(maxAstNodes);

	const result = createNodeList(iter, tc);
	if (result == null) {
		return tc.emptyExpression();
	}

	const { nodeList, maxCharacter } = result;
	eliminateStates(nodeList, tc, maxCharacter);

	const [finalState] = [...nodeList.finals];
	if (finalState.in.size !== 1 || !finalState.in.has(nodeList.initial)) {
		throw new Error("State elimination failed.");
	}

	const transition = finalState.in.get(nodeList.initial)!;

	switch (transition.type) {
		case "Alternation":
			return tc.expression(transition.alternatives);
		case "Concatenation":
			return tc.expression([transition]);
		default:
			return tc.expression([tc.concat([transition])]);
	}
}

export function toRegex<T>(
	iter: FAIterator<T, Iterable<[T, CharSet]>>,
	options?: Readonly<ToRegexOptions>
): NoParent<Expression> {
	const maxAstNodes = options?.maxNodes ?? 10000;
	const expression = stateElimination(iter, maxAstNodes);

	// optimize
	const optimized = transform(FULL_OPTIMIZE_TRANSFORMER, expression, {
		maxPasses: options?.maxOptimizationPasses ?? Infinity,
	});

	return optimized;
}
