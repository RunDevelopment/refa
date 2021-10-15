/* eslint-disable no-inner-declarations */
import { CharSet } from "./char-set";
import { Char, ReadonlyWord, Word } from "./char-types";
import { ReadonlyWordSet, WordSet } from "./word-set";
import {
	FABuilder,
	FAIterator,
	FiniteAutomaton,
	NodeFactory,
	ToRegexOptions,
	TransitionIterable,
	TransitionIterator,
} from "./fa-types";
import { assertNever, cachedFunc, debugAssert, traverse, traverseMultiRoot } from "./util";
import * as Iter from "./iter";
import { Concatenation, Element, Expression, NoParent, Node, Quantifier } from "./ast";
import { MaxCharacterError, TooManyNodesError } from "./errors";
import { wordSetsToWords } from "./words";
import { toAlternatives } from "./ast-analysis";

/**
 * A readonly {@link ENFA}.
 */
export interface ReadonlyENFA extends FiniteAutomaton, TransitionIterable<ENFA.ReadonlyNode> {
	readonly initial: ENFA.ReadonlyNode;
	readonly final: ENFA.ReadonlyNode;

	/**
	 * Whether this ENFA is in its normal form.
	 *
	 * @see {@link ENFA}
	 */
	readonly isNormalized: boolean;

	stateIterator(resolveEpsilon: boolean): FAIterator<ENFA.ReadonlyNode>;
	nodes(): Iterable<ENFA.ReadonlyNode>;

	/**
	 * Returns the number of nodes reachable from the initial state including the initial state.
	 *
	 * This may include trap states. This will not include unreachable final states.
	 *
	 * This operation has to traverse the whole graph and runs in _O(E + V)_.
	 */
	countNodes(): number;

	/**
	 * Create a mutable copy of this ENFA.
	 */
	copy(factory?: NodeFactory<ENFA.Node>): ENFA;
}

/**
 * A [nondeterministic finite automaton](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton) with epsilon
 * transitions.
 *
 * This class implements NFAs with the following properties:
 *
 * - There is exactly one initial state.
 *
 * - There is exactly one final state.
 *
 * - There are epsilon transitions.
 *
 * - A transitions either an epsilon transition or consumes a character.
 *
 *   Epsilon transition are represented using `null` and characters are represented using non-empty `CharSet`s.
 *
 * - Transitions are ordered.
 *
 *   As a consequence, `/aa|bb/` and `/bb|aa/` have different state machines in this NFA implementation.
 *
 *   Order is only guaranteed as long as no transitions are removed. Order is defined by the key order of the JavaScript
 *   `Map` class.
 *
 * - Between any two states, there can at most be one transition.
 *
 *   Unlike the {@link NFA} class, transition cannot be merged. As a consequence, `/a|a/` and `/a/` have different
 *   state machines in this NFA implementation.
 *
 * ## Normal form
 *
 * The normal form of this ENFA implementation has the following restriction:
 *
 * - The initial state must not have incoming transitions.
 * - The final state must not have outgoing transitions.
 * - The initial state and final state are different states.
 *
 * Non-normalized ENFAs will either be tolerated or normalized by operations.
 */
export class ENFA implements ReadonlyENFA {
	initial: ENFA.Node;
	final: ENFA.Node;
	readonly maxCharacter: Char;

	private constructor(initial: ENFA.Node, final: ENFA.Node, maxCharacter: Char) {
		this.initial = initial;
		this.final = final;
		this.maxCharacter = maxCharacter;
	}

	get isEmpty(): boolean {
		return this.initial.out.size === 0;
	}
	get isFinite(): boolean {
		return this.isEmpty || Iter.languageIsFinite(this.stateIterator(true));
	}
	get isNormalized(): boolean {
		return this.initial.in.size === 0 && this.final.out.size === 0 && this.initial !== this.final;
	}

	/**
	 * Brings this ENFA is in its normal form.
	 *
	 * This operation will create at most 2 nodes with the given factory.
	 *
	 * @param factory
	 * @see {@link ENFA}
	 */
	normalize(factory: NodeFactory<ENFA.Node> = ENFA.nodeFactory): void {
		baseNormalize(factory, this);
	}

	stateIterator(resolveEpsilon: boolean): FAIterator<ENFA.ReadonlyNode> {
		if (resolveEpsilon) {
			const initial: ENFA.ReadonlyNode = this.initial;
			const effectivelyFinal: Set<ENFA.ReadonlyNode> = this.final.reachableViaEpsilon("in");
			return {
				initial,
				getOut: n => {
					const out = new Set<ENFA.ReadonlyNode>();
					n.resolveEpsilon("out", (_, to) => out.add(to));
					return out;
				},
				isFinal: n => effectivelyFinal.has(n),
			};
		} else {
			const initial: ENFA.ReadonlyNode = this.initial;
			const final: ENFA.ReadonlyNode = this.final;
			return {
				initial,
				getOut: n => n.out.keys(),
				stableOut: true,
				isFinal: n => n === final,
			};
		}
	}
	transitionIterator(): TransitionIterator<ENFA.ReadonlyNode> {
		const initial: ENFA.ReadonlyNode = this.initial;
		const effectivelyFinal: Set<ENFA.ReadonlyNode> = this.final.reachableViaEpsilon("in");

		return {
			initial,
			getOut: n => {
				const out = new Map<ENFA.ReadonlyNode, CharSet>();
				n.resolveEpsilon("out", (via, to) => {
					let transition = out.get(to);
					if (transition === undefined) {
						transition = via;
					} else {
						transition = transition.union(via);
					}
					out.set(to, transition);
				});
				return out;
			},
			isFinal: n => effectivelyFinal.has(n),
		};
	}
	nodes(): Iterable<ENFA.Node> {
		return Iter.iterateStates({
			initial: this.initial,
			getOut: state => state.out.keys(),
			isFinal: state => this.final === state,
		});
	}

	countNodes(): number {
		let c = 0;
		let hasSeenFinal = false;
		traverse(this.initial, (n, queue) => {
			c++;
			if (n === this.final) {
				hasSeenFinal = true;
			}
			queue.push(...n.out.keys());
		});
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!hasSeenFinal) {
			c++;
		}
		return c;
	}

	copy(factory: NodeFactory<ENFA.Node> = ENFA.nodeFactory): ENFA {
		const { initial, final } = factoryCopyOfSubGraph(factory, this);
		return new ENFA(initial, final, this.maxCharacter);
	}

	test(word: ReadonlyWord): boolean {
		// An implementation of Thompson's algorithm as described by Russ Cox
		// https://swtch.com/~rsc/regexp/regexp1.html
		let currentStates: ENFA.ReadonlyNode[] = [this.initial];
		const newStatesSet = new Set<ENFA.ReadonlyNode>();

		for (const char of word) {
			const newStates: ENFA.ReadonlyNode[] = [];
			newStatesSet.clear();

			// this is a multi-root version of ENFA.NodeList.unorderedResolveEpsilon
			traverseMultiRoot(currentStates, (state, queue) => {
				state.out.forEach((charSet, to) => {
					if (charSet === null) {
						queue.push(to);
					} else if (charSet.has(char) && !newStatesSet.has(to)) {
						newStates.push(to);
						newStatesSet.add(to);
					}
				});
			});

			currentStates = newStates;
		}

		if (newStatesSet.has(this.final)) {
			// this a short cut that uses the set we construct to detect duplicates
			return true;
		}

		const effectivelyFinal: Set<ENFA.ReadonlyNode> = this.final.reachableViaEpsilon("in");
		return currentStates.some(state => effectivelyFinal.has(state));
	}

	wordSets(): Iterable<WordSet> {
		return Iter.iterateWordSets(this.transitionIterator());
	}
	words(): Iterable<Word> {
		return wordSetsToWords(this.wordSets());
	}

	toString(): string {
		const iter: FAIterator<ENFA.ReadonlyNode, ReadonlyMap<ENFA.ReadonlyNode, CharSet | null>> = {
			initial: this.initial,
			getOut: n => n.out,
			stableOut: true,
			isFinal: n => n === this.final,
		};

		return Iter.toString(
			iter,
			cs => {
				if (cs === null) {
					return "ε";
				} else {
					return cs.toRangesString();
				}
			},
			true
		);
	}

	toRegex(options?: Readonly<ToRegexOptions>): NoParent<Expression> {
		const iter: FAIterator<ENFA.ReadonlyNode, ReadonlyMap<ENFA.ReadonlyNode, CharSet | null>> = {
			initial: this.initial,
			getOut: n => n.out,
			stableOut: true,
			isFinal: n => n === this.final,
		};
		return Iter.toRegex(iter, options);
	}

	toDot(charSetToString?: (charSet: CharSet) => string): string {
		const iter: FAIterator<ENFA.ReadonlyNode, ReadonlyMap<ENFA.ReadonlyNode, CharSet | null>> = {
			initial: this.initial,
			getOut: n => n.out,
			stableOut: true,
			isFinal: n => n === this.final,
		};

		const toString: (charSet: null | CharSet) => string = charSetToString
			? cs => (cs === null ? "" : charSetToString!(cs))
			: cs => (cs === null ? "" : cs.toRangesString());

		return Iter.toDot(iter, Iter.createSimpleToDotOptions(toString, true));
	}

	/**
	 * Modifies this ENFA to accept the concatenation of this ENFA and the given FA.
	 *
	 * @param other
	 * @param factory
	 */
	append<O>(other: TransitionIterable<O>, factory: NodeFactory<ENFA.Node> = new ENFA.LimitedNodeFactory()): void {
		MaxCharacterError.assert(this, other);

		this.normalize(factory);
		baseAppend(this, smartFactoryCopy(factory, other));
	}

	/**
	 * Modifies this ENFA to accept the concatenation of this ENFA and the other ENFA.
	 *
	 * This operation is implemented by moving (not copying) the states from the other ENFA into this ENFA. The other
	 * ENFA will be in an **invalid state** after this operation completes. The initial and final states of the other
	 * ENFA will be random nodes of this ENFA. Makes sure that you never use the other ENFA again.
	 *
	 * This operation will create at most 4 nodes with the given factory.
	 *
	 * @param other
	 * @param factory
	 */
	appendInto(other: ENFA, factory: NodeFactory<ENFA.Node> = ENFA.nodeFactory): void {
		MaxCharacterError.assert(this, other);

		if (this === other) {
			throw new Error("Cannot append an ENFA into itself.");
		}

		this.normalize(factory);
		other.normalize(factory);
		baseAppend(this, other);
	}

	/**
	 * Modifies this ENFA to accept the concatenation of the given FA and this ENFA.
	 *
	 * @param other
	 * @param factory
	 */
	prepend<O>(other: TransitionIterable<O>, factory: NodeFactory<ENFA.Node> = new ENFA.LimitedNodeFactory()): void {
		MaxCharacterError.assert(this, other);

		this.normalize(factory);
		basePrepend(this, smartFactoryCopy(factory, other));
	}

	/**
	 * Modifies this ENFA to accept the concatenation of the other ENFA and this ENFA.
	 *
	 * This operation is implemented by moving (not copying) the states from the other ENFA into this ENFA. The other
	 * ENFA will be in an **invalid state** after this operation completes. The initial and final states of the other
	 * ENFA will be random nodes of this ENFA. Makes sure that you never use the other ENFA again.
	 *
	 * This operation will create at most 4 nodes with the given factory.
	 *
	 * @param other
	 * @param factory
	 */
	prependInto(other: ENFA, factory: NodeFactory<ENFA.Node> = ENFA.nodeFactory): void {
		MaxCharacterError.assert(this, other);

		if (this === other) {
			throw new Error("Cannot prepend an ENFA into itself.");
		}

		this.normalize(factory);
		other.normalize(factory);
		basePrepend(this, other);
	}

	/**
	 * Modifies this ENFA to accept the language of this ENFA and the language of the given FA.
	 *
	 * If the union kind is `left`, then this ENFA will be modified to accept `<other>|<this>`. Otherwise, it will be
	 * modified to accept `<this>|<other>`.
	 *
	 * @param other
	 * @param kind
	 * @param factory
	 */
	union<O>(
		other: TransitionIterable<O>,
		kind: "left" | "right" = "right",
		factory: NodeFactory<ENFA.Node> = new ENFA.LimitedNodeFactory()
	): void {
		MaxCharacterError.assert(this, other);

		this.normalize(factory);
		if (kind === "left") {
			baseUnionLeft(factory, this, smartFactoryCopy(factory, other));
		} else {
			baseUnionRight(this, smartFactoryCopy(factory, other));
		}
	}

	/**
	 * Modifies this ENFA to accept the language of this ENFA and the language of the other ENFA.
	 *
	 * If the union kind is `left`, then this ENFA will be modified to accept `<other>|<this>`. Otherwise, it will be
	 * modified to accept `<this>|<other>`.
	 *
	 * This operation is implemented by moving (not copying) the states from the other ENFA into this ENFA. The other
	 * ENFA will be in an **invalid state** after this operation completes. The initial and final states of the other
	 * ENFA will be random nodes of this ENFA. Makes sure that you never use the other ENFA again.
	 *
	 * This operation will create at most 6 nodes with the given factory.
	 *
	 * @param other
	 * @param kind
	 * @param factory
	 */
	unionInto(other: ENFA, kind: "left" | "right" = "right", factory: NodeFactory<ENFA.Node> = ENFA.nodeFactory): void {
		MaxCharacterError.assert(this, other);

		if (this === other) {
			throw new Error("Cannot union an ENFA into itself.");
		}

		this.normalize(factory);
		other.normalize(factory);
		if (kind === "left") {
			baseUnionLeft(factory, this, other);
		} else {
			baseUnionRight(this, other);
		}
	}

	/**
	 * Modifies this ENFA to accept at least `min` and at most `max` concatenations of itself.
	 *
	 * Both `min` and `max` both have to be non-negative integers with `min <= max`.
	 * `max` is also allowed to be `Infinity`.
	 *
	 * @param min
	 * @param max
	 * @param lazy
	 * @param factory
	 */
	quantify(
		min: number,
		max: number,
		lazy: boolean = false,
		factory: NodeFactory<ENFA.Node> = new ENFA.LimitedNodeFactory()
	): void {
		if (!Number.isInteger(min) || !(Number.isInteger(max) || max === Infinity) || min < 0 || min > max) {
			throw new RangeError("min and max both have to be non-negative integers with min <= max.");
		}

		this.normalize(factory);
		baseQuantify(factory, this, min, max, lazy);
	}

	/**
	 * Removes the empty word from the accepted languages of this ENFA.
	 *
	 * Unreachable states will be removed by this operation.
	 *
	 * @param factory
	 */
	withoutEmptyWord(factory: NodeFactory<ENFA.Node> = new ENFA.LimitedNodeFactory()): void {
		this.normalize(factory);

		const effectivelyInitial = this.initial.reachableViaEpsilon("out");
		if (!effectivelyInitial.has(this.final)) {
			// The ENFA does not accept the empty word, so there is nothing to remove.
			return;
		}
		if (effectivelyInitial.size === 2) {
			// These two states have to be the initial state and the final state linked directly via an
			// epsilon transition. To remove the empty word, we simply have to unlink the two
			this.initial.unlink(this.final);
			return;
		}

		// Resolve all epsilon transitions of the outgoing transitions of the initial state and write down the result.
		// It's important to preserve the order.
		const out: [CharSet, ENFA.Node][] = [];
		this.initial.resolveEpsilon("out", (transition, to) => out.push([transition, to]));

		// Clear the initial state.
		// This might create unreachable nodes that we have to clean up later.
		this.initial.unlinkAllOut();

		// Re-link the initial state with the rest of the graph.
		for (const [transition, to] of out) {
			if (this.initial.out.has(to)) {
				// preserve ambiguity
				const q = factory.createNode();
				this.initial.link(q, transition);
				q.link(to, null);
			} else {
				// no need to create a new state
				this.initial.link(to, transition);
			}
		}

		// clean up
		this.removeUnreachable();
	}

	/**
	 * All states which cannot be reached from the initial state or cannot reach (or are) a final state, will be
	 * removed.
	 */
	removeUnreachable(): void {
		baseRemoveUnreachable(this);
	}

	/**
	 * Modifies this ENFA such that all prefixes of all accepted words are also accepted.
	 *
	 * If the language of this ENFA is empty, then it will remain empty.
	 *
	 * Unreachable states will be removed by this operation.
	 *
	 * @param factory
	 */
	prefixes(factory: NodeFactory<ENFA.Node> = new ENFA.LimitedNodeFactory()): void {
		this.removeUnreachable();

		if (this.isEmpty) {
			return;
		}

		this.normalize();
		for (const node of this.nodes()) {
			baseMakeEffectivelyFinal(factory, this, node);
		}
	}

	/**
	 * Modifies this ENFA such that all suffixes of all accepted words are also accepted.
	 *
	 * If the language of this ENFA is empty, then it will remain empty.
	 *
	 * Unreachable states will be removed by this operation.
	 *
	 * @param factory
	 */
	suffixes(factory: NodeFactory<ENFA.Node> = new ENFA.LimitedNodeFactory()): void {
		this.removeUnreachable();

		if (this.isEmpty) {
			return;
		}

		this.normalize();
		for (const node of this.nodes()) {
			baseMakeEffectivelyInitial(factory, this, node);
		}
	}

	/**
	 * Creates a new ENFA which matches no words. The language of the returned ENFA is empty.
	 *
	 * @param options
	 */
	static empty(options: Readonly<ENFA.Options>): ENFA {
		return new ENFA(new ENFA.Node(), new ENFA.Node(), options.maxCharacter);
	}

	/**
	 * Creates a new ENFA which matches all words.
	 *
	 * @param options
	 */
	static all(options: Readonly<ENFA.Options>): ENFA {
		const initial = new ENFA.Node();
		const middle = new ENFA.Node();
		const final = new ENFA.Node();

		initial.link(middle, null);
		middle.link(middle, CharSet.all(options.maxCharacter));
		middle.link(final, null);

		return new ENFA(initial, final, options.maxCharacter);
	}

	/**
	 * Creates a new ENFA which matches the given characters.
	 *
	 * @param charSet
	 * @param factory
	 */
	static fromCharSet(charSet: CharSet, factory: NodeFactory<ENFA.Node> = ENFA.nodeFactory): ENFA {
		const initial = factory.createNode();
		const final = factory.createNode();

		if (!charSet.isEmpty) {
			initial.link(final, charSet);
		}

		return new ENFA(initial, final, charSet.maximum);
	}

	static fromRegex(
		concat: NoParent<Node>,
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.FromRegexOptions>,
		factory?: NodeFactory<ENFA.Node>
	): ENFA;
	static fromRegex(
		alternatives: readonly NoParent<Concatenation>[],
		options: Readonly<ENFA.Options>,
		creationOptions?: Readonly<ENFA.FromRegexOptions>,
		factory?: NodeFactory<ENFA.Node>
	): ENFA;
	static fromRegex(
		value: NoParent<Node> | readonly NoParent<Concatenation>[],
		options: Readonly<ENFA.Options>,
		creationOptions: Readonly<ENFA.FromRegexOptions> = {},
		factory: NodeFactory<ENFA.Node> = new ENFA.LimitedNodeFactory()
	): ENFA {
		const { initial, final } = createGraphFromRegex(toAlternatives(value), options, creationOptions, factory);
		return new ENFA(initial, final, options.maxCharacter);
	}

	/**
	 * Creates a new ENFA which matches all and only all of the given words.
	 *
	 * @param words
	 * @param options
	 * @param factory
	 */
	static fromWords(
		words: Iterable<ReadonlyWord>,
		options: Readonly<ENFA.Options>,
		factory: NodeFactory<ENFA.Node> = new ENFA.LimitedNodeFactory()
	): ENFA {
		const { maxCharacter } = options;
		const builder = new ENFA.Builder(factory);

		Iter.fromWords(
			builder,
			(node, char) => {
				for (const [to, chars] of node.out) {
					if (chars !== null && chars.has(char)) {
						return to;
					}
				}
				return undefined;
			},
			words,
			maxCharacter
		);

		return ENFA.fromBuilder(builder, options);
	}

	/**
	 * Creates a new ENFA which matches all and only all of the given word sets.
	 *
	 * @param wordSets
	 * @param options
	 * @param factory
	 */
	static fromWordSets(
		wordSets: Iterable<ReadonlyWordSet>,
		options: Readonly<ENFA.Options>,
		factory: NodeFactory<ENFA.Node> = new ENFA.LimitedNodeFactory()
	): ENFA {
		const { maxCharacter } = options;
		const builder = new ENFA.Builder(factory);
		Iter.fromWordSets(builder, wordSets, maxCharacter);
		return ENFA.fromBuilder(builder, options);
	}

	static fromFA<InputNode>(fa: TransitionIterable<InputNode>, factory?: NodeFactory<ENFA.Node>): ENFA {
		return ENFA.fromTransitionIterator(fa.transitionIterator(), fa, factory);
	}

	static fromTransitionIterator<InputNode>(
		iter: TransitionIterator<InputNode>,
		options: Readonly<ENFA.Options>,
		factory: NodeFactory<ENFA.Node> = new ENFA.LimitedNodeFactory()
	): ENFA {
		const { maxCharacter } = options;
		const builder = new ENFA.Builder(factory);

		const fakeInitial = factory.createNode();
		builder.initial.link(fakeInitial, null);

		const translate = cachedFunc<InputNode, ENFA.Node>(() => factory.createNode());
		translate.cache.set(iter.initial, fakeInitial);

		traverse(iter.initial, (node, queue) => {
			const transNode = translate(node);

			if (iter.isFinal(node)) {
				builder.makeFinal(transNode);
			}

			const out = iter.getOut(node);
			out.forEach((charSet, outNode) => {
				if (charSet.maximum !== maxCharacter) {
					throw new Error("Some character sets do not conform to the given maximum.");
				}
				queue.push(outNode);
				transNode.link(translate(outNode), charSet);
			});
		});

		return ENFA.fromBuilder(builder, options);
	}

	static fromBuilder(builder: ENFA.Builder, options: Readonly<ENFA.Options>): ENFA {
		return new ENFA(builder.initial, builder.final, options.maxCharacter);
	}
}

/**
 * A namespace for ENFA-specific classes and interfaces.
 *
 * @see {@link ENFA} (class)
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ENFA {
	export interface ReadonlyNode {
		readonly out: ReadonlyMap<ReadonlyNode, CharSet | null>;
		readonly in: ReadonlyMap<ReadonlyNode, CharSet | null>;

		/**
		 * Calls the given consumer function on every non-epsilon transition directly reachable from the given node.
		 *
		 * Epsilon transitions will be resolved using a DFS algorithm. This means that for the following graph:
		 *
		 * ```text
		 * (0) -> (1) : "a"
		 *     -> (2) : epsilon
		 *     -> (3) : "b"
		 *
		 * (1) -> (3) : "c"
		 *
		 * (2) -> (4) : "d"
		 *     -> (1) : "e"
		 *     -> (2) : epsilon
		 *
		 * (3) -> (1) : epsilon
		 *
		 * (4) -> empty
		 * ```
		 *
		 * The node `(0)` will return the resolved list:
		 *
		 * ```text
		 * [(1), "a"]
		 * [(4), "d"]
		 * [(1), "e"]
		 * [(3), "b"]
		 * ```
		 */
		resolveEpsilon(direction: "in" | "out", consumerFn: (charSet: CharSet, node: ReadonlyNode) => void): void;

		/**
		 * Returns a set of all nodes that are reachable from the given node by only following epsilon transitions in
		 * the given direction. The returned set is guaranteed to always contain the given node.
		 *
		 * The order of the nodes in the returned set in implementation-defined and cannot be relied upon.
		 *
		 * ---
		 *
		 * This method can be used to determine the set of all effectively final states.
		 *
		 * ```
		 * const effectivelyFinal = final.reachableViaEpsilon("in");
		 * ```
		 */
		reachableViaEpsilon(direction: "in" | "out"): Set<ReadonlyNode>;
	}
	export class Node implements ReadonlyNode {
		readonly out = new Map<Node, CharSet | null>();
		readonly in = new Map<Node, CharSet | null>();

		/**
		 * Adds a transition from `this` to `to` using the given non-empty set of characters.
		 *
		 * If two nodes are already linked, an error will be thrown.
		 *
		 * @param to
		 * @param via
		 */
		link(to: Node, via: CharSet | null): void {
			if (this.out.has(to)) {
				throw new Error("Cannot link nodes that are already linked.");
			}
			if (via && via.isEmpty) {
				throw new Error("You can't link nodes with the empty character set.");
			}

			this.out.set(to, via);
			to.in.set(this, via);
		}

		/**
		 * Removes the transition from `this` to `to`.
		 *
		 * This will do nothing if `this` isn't linked to `to`.
		 *
		 * @param to
		 */
		unlink(to: Node): void {
			this.out.delete(to);
			to.in.delete(this);
		}

		/**
		 * Unlinks all outgoing and incoming transitions of this node.
		 */
		unlinkAll(): void {
			this.unlinkAllIn();
			this.unlinkAllOut();
		}
		/**
		 * Unlinks all outgoing transitions of this node.
		 */
		unlinkAllOut(): void {
			this.out.forEach((_, to) => {
				to.in.delete(this);
			});
			this.out.clear();
		}
		/**
		 * Unlinks all incoming transitions of this node.
		 */
		unlinkAllIn(): void {
			this.in.forEach((_, from) => {
				from.out.delete(this);
			});
			this.in.clear();
		}

		resolveEpsilon(direction: "in" | "out", consumerFn: (charSet: CharSet, node: Node) => void): void {
			// The little magic trick of this non-recursive implementation is a reversed stack.
			// By popping from the stack and pushing elements in reversed order, we get exactly the iteration order
			// that we need to resolve epsilon while keeping order and ambiguity.

			const stack: [Node, CharSet | null][] = [...this[direction]].reverse();

			const visited = new Set<Node>([this]);
			for (let item; (item = stack.pop()); ) {
				const [to, via] = item;

				if (via === null) {
					// recurse

					// check already visited nodes
					if (visited.has(to)) {
						continue;
					}
					visited.add(to);

					stack.push(...[...to[direction]].reverse());
				} else {
					consumerFn(via, to);
				}
			}
		}

		reachableViaEpsilon(direction: "in" | "out"): Set<Node> {
			const result = new Set<Node>();

			traverse<Node>(this, (n, queue) => {
				result.add(n);

				n[direction].forEach((via, to) => {
					if (via === null) {
						queue.push(to);
					}
				});
			});

			return result;
		}
	}

	/**
	 * An unlimited node factory that will simply call the {@link Node} constructor.
	 */
	export const nodeFactory: NodeFactory<Node> = {
		createNode() {
			return new Node();
		},
	};

	export class LimitedNodeFactory implements NodeFactory<Node> {
		private _counter = 0;
		readonly limit: number;

		constructor(limit: number = 10_000) {
			this.limit = limit;
		}

		createNode(): Node {
			TooManyNodesError.assert(++this._counter, this.limit, "ENFA");
			return new Node();
		}
	}

	export class Builder implements FABuilder<Node, CharSet | null> {
		readonly initial: Node;
		readonly final: Node;
		readonly factory: NodeFactory<Node>;

		constructor(factory: NodeFactory<Node>) {
			this.factory = factory;
			this.initial = factory.createNode();
			this.final = factory.createNode();
		}

		makeFinal(state: Node): void {
			baseMakeEffectivelyFinal(this.factory, this, state);
		}
		isFinal(state: Node): boolean {
			return state === this.final;
		}
		linkNodes(from: Node, to: Node, transition: CharSet | null): void {
			from.link(to, transition);
		}
		createNode(): Node {
			return this.factory.createNode();
		}
	}

	export interface Options {
		/**
		 * The maximum numerical value any character can have.
		 *
		 * This will be the maximum of all underlying {@link CharSet}s.
		 */
		maxCharacter: Char;
	}
	export interface FromRegexOptions {
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
		 * How to handle unknowns when construction the ENFA.
		 *
		 * - `"throw"`
		 *
		 *   This method will throw an error when encountering an unknown.
		 *
		 * - `"disable"`
		 *
		 *   This method will replace any unknown with an empty character class, effectively removing it.
		 *
		 * @default "throw"
		 */
		unknowns?: "disable" | "throw";
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

function createGraphFromRegex(
	expression: readonly NoParent<Concatenation>[],
	options: Readonly<ENFA.Options>,
	creationOptions: Readonly<ENFA.FromRegexOptions>,
	factory: NodeFactory<ENFA.Node>
): SubGraph {
	return ThompsonOptimized.create(factory, expression, {
		maxCharacter: options.maxCharacter,
		assertions: creationOptions.assertions ?? "throw",
		unknowns: creationOptions.unknowns ?? "throw",
		infinityThreshold: creationOptions.infinityThreshold ?? Infinity,
	});
}

interface NonNormalSubGraph {
	initial: ENFA.Node;
	final: ENFA.Node;
}
interface SubGraph {
	initial: ENFA.Node;
	final: ENFA.Node;
}
interface ReadonlySubGraph {
	readonly initial: ENFA.ReadonlyNode;
	readonly final: ENFA.ReadonlyNode;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace ThompsonOptimized {
	interface Options {
		readonly maxCharacter: Char;
		readonly assertions: "disable" | "throw";
		readonly unknowns: "disable" | "throw";
		readonly infinityThreshold: number;
	}

	export function create(
		factory: NodeFactory<ENFA.Node>,
		expression: readonly NoParent<Concatenation>[],
		options: Options
	): SubGraph {
		const initial = factory.createNode();

		return { initial, final: handleAlternatives(factory, expression, initial, options) };
	}

	// All of the below function guarantee that
	// 1. no incoming transitions are added to the initial state.
	// 2. the returned final state will not be the given initial state.
	// 3. the returned final state will have no outgoing transitions.

	function handleElement(
		factory: NodeFactory<ENFA.Node>,
		element: NoParent<Element>,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		switch (element.type) {
			case "Alternation":
				return handleAlternatives(factory, element.alternatives, initial, options);
			case "Assertion":
				return handleAssertion(factory, options);
			case "CharacterClass":
				return handleChar(factory, element.characters, initial, options);
			case "Quantifier":
				return handleQuantifier(factory, element, initial, options);
			case "Unknown":
				return handleUnknown(factory, options);
			default:
				assertNever(element);
		}
	}
	function handleAlternatives(
		factory: NodeFactory<ENFA.Node>,
		alternatives: readonly NoParent<Concatenation>[],
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		if (alternatives.length === 1) {
			return handleConcat(factory, alternatives[0].elements, initial, options);
		} else {
			const final = factory.createNode();

			for (const { elements } of alternatives) {
				const alternativeFinal = handleConcat(factory, elements, initial, options);
				alternativeFinal.link(final, null);
			}

			return final;
		}
	}
	function handleChar(
		factory: NodeFactory<ENFA.Node>,
		characters: CharSet,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		if (characters.maximum !== options.maxCharacter) {
			throw new Error(`Expected a max character of ${options.maxCharacter} but found ${characters.maximum}.`);
		}

		const final = factory.createNode();
		if (!characters.isEmpty) {
			initial.link(final, characters);
		}
		return final;
	}
	function handleConcat(
		factory: NodeFactory<ENFA.Node>,
		elements: readonly NoParent<Element>[],
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		let final = initial;
		for (const e of elements) {
			const newFinal = handleElement(factory, e, final, options);
			debugAssert(final !== newFinal, "The returned final state cannot be the given initial state.");
			debugAssert(newFinal.out.size === 0, "The returned final cannot have outgoing transitions.");
			final = newFinal;
		}

		return safeFinal(factory, initial, final);
	}
	function handleQuantifier(
		factory: NodeFactory<ENFA.Node>,
		quant: NoParent<Quantifier>,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		const originalInitial = initial;

		let { min, max } = quant;
		if (!(min <= max) || !(min >= 0)) {
			throw new Error(`Expected 0 <= min <= max but found min=${min} max=${max}.`);
		}

		if (max > options.infinityThreshold) {
			max = Infinity;
		}

		if (min > 1) {
			initial = quantConstant(factory, quant.alternatives, min - 1, initial, options);
			max -= min - 1;
			min = 1;
		}

		// min is now either 1 or 0
		debugAssert(min === 0 || min === 1);

		if (min === 1) {
			if (max === Infinity) {
				return quantPlus(factory, quant.alternatives, quant.lazy, initial, options);
			} else {
				max--;
				min--;
				initial = handleAlternatives(factory, quant.alternatives, initial, options);
			}
		}

		// min is now 0
		debugAssert(min === 0);

		if (max === 0) {
			return safeFinal(factory, originalInitial, initial);
		} else if (max === Infinity) {
			return quantStar(factory, quant.alternatives, quant.lazy, initial, options);
		} else {
			// 1 <= max < Infinity
			// What is done here for `A{0,3}` is equivalent to `(A(A(A|)|)|)` if not lazy and `(|A(|A(|A)))` if lazy.

			const final = factory.createNode();

			for (let i = 0; i < max; i++) {
				if (quant.lazy) {
					initial.link(final, null);
				}

				const nextInitial = handleAlternatives(factory, quant.alternatives, initial, options);

				if (!quant.lazy) {
					initial.link(final, null);
				}

				initial = nextInitial;
			}

			initial.link(final, null);

			return final;
		}
	}
	function handleAssertion(factory: NodeFactory<ENFA.Node>, options: Options): ENFA.Node {
		if (options.assertions === "throw") {
			throw new Error("Assertions are not supported yet.");
		}
		return factory.createNode();
	}
	function handleUnknown(factory: NodeFactory<ENFA.Node>, options: Options): ENFA.Node {
		if (options.unknowns === "throw") {
			throw new Error("Unknowns are not supported.");
		}
		return factory.createNode();
	}

	function safeFinal(factory: NodeFactory<ENFA.Node>, initial: ENFA.Node, final: ENFA.Node): ENFA.Node {
		if (final === initial) {
			final = factory.createNode();
			initial.link(final, null);
		}

		return final;
	}

	function quantConstant(
		factory: NodeFactory<ENFA.Node>,
		alternatives: readonly NoParent<Concatenation>[],
		count: number,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		let final = initial;
		for (let i = 0; i < count; i++) {
			final = handleAlternatives(factory, alternatives, final, options);
		}

		return safeFinal(factory, initial, final);
	}
	function quantPlus(
		factory: NodeFactory<ENFA.Node>,
		alternatives: readonly NoParent<Concatenation>[],
		lazy: boolean,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		const final = factory.createNode();

		const altInitial = factory.createNode();
		initial.link(altInitial, null);

		const altFinal = handleAlternatives(factory, alternatives, altInitial, options);
		if (lazy) {
			altFinal.link(final, null);
			altFinal.link(altInitial, null);
		} else {
			altFinal.link(altInitial, null);
			altFinal.link(final, null);
		}

		return final;
	}
	function quantStar(
		factory: NodeFactory<ENFA.Node>,
		alternatives: readonly NoParent<Concatenation>[],
		lazy: boolean,
		initial: ENFA.Node,
		options: Options
	): ENFA.Node {
		const final = factory.createNode();
		if (lazy) {
			initial.link(final, null);
		}

		const altInitial = factory.createNode();
		initial.link(altInitial, null);

		const altFinal = handleAlternatives(factory, alternatives, altInitial, options);
		if (lazy) {
			altFinal.link(final, null);
			altFinal.link(altInitial, null);
		} else {
			altFinal.link(altInitial, null);
			altFinal.link(final, null);
		}

		if (!lazy) {
			initial.link(final, null);
		}

		return final;
	}
}

function baseMakeEffectivelyFinal(factory: NodeFactory<ENFA.Node>, base: SubGraph, node: ENFA.Node): void {
	if (node === base.final) {
		return;
	}

	const current = node.out.get(base.final);
	if (current === undefined) {
		node.link(base.final, null);
	} else if (current === null) {
		return;
	} else {
		// the trick is to add a new node that connects the given node with the final state via epsilon transitions
		// however, we might already have added such a node, so we need to check for that.

		for (const [to, via] of node.out) {
			if (via === null) {
				if (to.out.get(base.final) === null) {
					// we already added such a state
					return;
				}
			}
		}

		const newNode = factory.createNode();
		node.link(newNode, null);
		newNode.link(base.final, null);
	}
}
function baseMakeEffectivelyInitial(factory: NodeFactory<ENFA.Node>, base: SubGraph, node: ENFA.Node): void {
	if (node === base.initial) {
		return;
	}

	const current = base.initial.out.get(node);
	if (current === undefined) {
		base.initial.link(node, null);
	} else if (current === null) {
		return;
	} else {
		const newNode = factory.createNode();
		base.initial.link(newNode, null);
		newNode.link(node, null);
	}
}

function smartFactoryCopy<O>(factory: NodeFactory<ENFA.Node>, toCopy: TransitionIterable<O>): SubGraph {
	if (toCopy instanceof ENFA) {
		return factoryCopyOfSubGraph(factory, toCopy);
	} else {
		return factoryCopy(factory, toCopy.transitionIterator());
	}
}
function factoryCopyOfSubGraph(factory: NodeFactory<ENFA.Node>, toCopy: ReadonlySubGraph): SubGraph {
	const initial = factory.createNode();
	const final = factory.createNode();

	const translate = cachedFunc<ENFA.ReadonlyNode, ENFA.Node>(() => factory.createNode());
	translate.cache.set(toCopy.initial, initial);
	translate.cache.set(toCopy.final, final);

	traverse(toCopy.initial, (node, queue) => {
		const transNode = translate(node);

		node.out.forEach((charSet, to) => {
			queue.push(to);
			transNode.link(translate(to), charSet);
		});
	});

	const result = { initial, final };

	baseNormalize(factory, result);

	return result;
}
function factoryCopy<T>(factory: NodeFactory<ENFA.Node>, iter: TransitionIterator<T>): SubGraph {
	const initial = factory.createNode();
	const final = factory.createNode();

	const translate = cachedFunc<T, ENFA.Node>(() => factory.createNode());
	translate.cache.set(iter.initial, initial);

	traverse(iter.initial, (node, queue) => {
		const transNode = translate(node);

		if (iter.isFinal(node)) {
			transNode.link(final, null);
		}

		const out = iter.getOut(node);
		out.forEach((charSet, to) => {
			queue.push(to);
			transNode.link(translate(to), charSet);
		});
	});

	const result = { initial, final };

	baseNormalize(factory, result);

	return result;
}

/**
 * Alters `base` to accept no words.
 *
 * @param base
 */
function baseMakeEmpty(base: SubGraph): void {
	base.initial.in.clear();
	base.initial.out.clear();
	base.final.in.clear();
	base.final.out.clear();
}
/**
 * Alters `base` to accept only the empty word.
 *
 * @param base
 */
function baseMakeEmptyWord(base: SubGraph): void {
	baseMakeEmpty(base);

	base.initial.link(base.final, null);
}

function baseNormalize(factory: NodeFactory<ENFA.Node>, base: NonNormalSubGraph): asserts base is SubGraph {
	if (base.initial.in.size > 0) {
		const newInitial = factory.createNode();
		newInitial.link(base.initial, null);
		base.initial = newInitial;
	}

	if (base.final.out.size > 0) {
		const newFinal = factory.createNode();
		base.final.link(newFinal, null);
		base.final = newFinal;
	}

	if (base.initial === base.final) {
		const newFinal = factory.createNode();
		base.final.link(newFinal, null);
		base.final = newFinal;
	}
}

/**
 * Alters `base` to end with the `after` expression.
 *
 * `after` will be altered as well and cannot be used again after this operation.
 *
 * @param base
 * @param after
 */
function baseAppend(base: SubGraph, after: SubGraph): void {
	if (base.initial.out.size === 0 || base.final.in.size === 0) {
		// concat(EMPTY_LANGUAGE, after) == EMPTY_LANGUAGE
		baseMakeEmpty(base);
		return;
	}
	if (after.initial.out.size === 0 || after.final.in.size === 0) {
		// concat(base, EMPTY_LANGUAGE) == EMPTY_LANGUAGE
		baseMakeEmpty(base);
		return;
	}

	base.final.link(after.initial, null);
	base.final = after.final;
}

/**
 * Alters `base` to start with the `before` expression.
 *
 * `before` will be altered as well and cannot be used again after this operation.
 *
 * @param base
 * @param before
 */
function basePrepend(base: SubGraph, before: SubGraph): void {
	if (base.initial.out.size === 0 || base.final.in.size === 0) {
		// concat(before, EMPTY_LANGUAGE) == EMPTY_LANGUAGE
		baseMakeEmpty(base);
		return;
	}
	if (before.initial.out.size === 0 || before.final.in.size === 0) {
		// concat(EMPTY_LANGUAGE, base) == EMPTY_LANGUAGE
		baseMakeEmpty(base);
		return;
	}

	before.final.link(base.initial, null);
	base.initial = before.initial;
}

/**
 * Alters `base` to be repeated a certain number of times.
 *
 * @param factory
 * @param base
 * @param times
 */
function baseRepeat(factory: NodeFactory<ENFA.Node>, base: SubGraph, times: number): void {
	if (times === 0) {
		// trivial
		baseMakeEmptyWord(base);
		return;
	}
	if (times === 1) {
		// trivial
		return;
	}
	if (base.initial.out.size === 0 || base.final.in.size === 0) {
		// base can't match any word
		return;
	}

	const copy = factoryCopyOfSubGraph(factory, base);

	let final = base.final;
	for (let i = 2; i < times; i++) {
		const iterationCopy = factoryCopyOfSubGraph(factory, copy);
		final.link(iterationCopy.initial, null);
		final = iterationCopy.final;
	}

	final.link(copy.initial, null);
	base.final = copy.final;
}

/**
 * Alters `base` to be equal to `/(<base>)+/`.
 *
 * @param factory
 * @param base
 * @param lazy
 */
function basePlus(factory: NodeFactory<ENFA.Node>, base: SubGraph, lazy: boolean): void {
	const newFinal = factory.createNode();

	if (lazy) {
		base.final.link(newFinal, null);
		base.final.link(base.initial, null);
	} else {
		base.final.link(base.initial, null);
		base.final.link(newFinal, null);
	}

	base.final = newFinal;
}
/**
 * Alters `base` to be equal to `(<base>)*`.
 *
 * @param factory
 * @param base
 * @param lazy
 */
function baseStar(factory: NodeFactory<ENFA.Node>, base: SubGraph, lazy: boolean): void {
	const newInitial = factory.createNode();
	const newFinal = factory.createNode();

	if (lazy) {
		newInitial.link(newFinal, null);
		newInitial.link(base.initial, null);

		base.final.link(newFinal, null);
		base.final.link(base.initial, null);
	} else {
		newInitial.link(base.initial, null);
		newInitial.link(newFinal, null);

		base.final.link(base.initial, null);
		base.final.link(newFinal, null);
	}

	base.initial = newInitial;
	base.final = newFinal;
}

/**
 * Alters `base` to be equal to `(<base>){0,<max>}`.
 *
 * @param factory
 * @param base
 * @param max
 * @param lazy
 */
function baseMaximum(factory: NodeFactory<ENFA.Node>, base: SubGraph, max: number, lazy: boolean): void {
	if (max === Infinity) {
		// `(<base>){0,}`
		baseStar(factory, base, lazy);
	} else if (max === 0) {
		// `(<base>){0,0}`
		baseMakeEmptyWord(base);
	} else if (max === 1) {
		// `(<base>){0,1}`
		const newInitial = factory.createNode();
		if (lazy) {
			newInitial.link(base.final, null);
			newInitial.link(base.initial, null);
		} else {
			newInitial.link(base.initial, null);
			newInitial.link(base.final, null);
		}
		base.initial = newInitial;
	} else {
		// `(<base>){0,n}`
		debugAssert(max >= 2);

		const copies = [base];
		for (let i = 1; i < max; i++) {
			copies.push(factoryCopyOfSubGraph(factory, base));
		}

		const initial = factory.createNode();
		const final = copies[copies.length - 1].final;
		if (lazy) {
			initial.link(final, null);
			initial.link(copies[0].initial, null);
		} else {
			initial.link(copies[0].initial, null);
			initial.link(final, null);
		}

		for (let i = 1; i < max; i++) {
			const curr = copies[i - 1];
			const next = copies[i];

			if (lazy) {
				curr.final.link(final, null);
				curr.final.link(next.initial, null);
			} else {
				curr.final.link(next.initial, null);
				curr.final.link(final, null);
			}
		}

		base.initial = initial;
		base.final = final;
	}
}

function baseQuantify(factory: NodeFactory<ENFA.Node>, base: SubGraph, min: number, max: number, lazy: boolean): void {
	if (max === Infinity) {
		if (min > 1) {
			const prefix = factoryCopyOfSubGraph(factory, base);
			baseRepeat(factory, prefix, min - 1);
			basePlus(factory, base, lazy);
			basePrepend(base, prefix);
		} else if (min === 1) {
			basePlus(factory, base, lazy);
		} else {
			debugAssert(min === 0);
			baseStar(factory, base, lazy);
		}
	} else {
		if (min === max) {
			baseRepeat(factory, base, min);
		} else if (min === 0) {
			baseMaximum(factory, base, max, lazy);
		} else {
			const prefix = factoryCopyOfSubGraph(factory, base);
			baseRepeat(factory, prefix, min);
			baseMaximum(factory, base, max - min, lazy);
			basePrepend(base, prefix);
		}
	}
}

/**
 * Alters `base` to be equal to `<left>|<base>`.
 *
 * @param factory
 * @param base
 * @param left
 */
function baseUnionLeft(factory: NodeFactory<ENFA.Node>, base: SubGraph, left: SubGraph): void {
	const initial = factory.createNode();
	const final = factory.createNode();

	initial.link(left.initial, null);
	initial.link(base.initial, null);
	left.final.link(final, null);
	base.final.link(final, null);

	base.initial = initial;
	base.final = final;
}
/**
 * Alters `base` to be equal to `<base>|<right>`.
 *
 * @param base
 * @param right
 */
function baseUnionRight(base: SubGraph, right: SubGraph): void {
	base.initial.link(right.initial, null);
	right.final.link(base.final, null);
}

/**
 * All states which cannot be reached from the initial state or cannot reach (or are) a final state, will be
 * removed.
 *
 * @param base
 */
function baseRemoveUnreachable(base: NonNormalSubGraph): void {
	if (base.final.in.size === 0 || base.initial.out.size === 0) {
		baseMakeEmpty(base);
		return;
	}

	// 1) Get all nodes reachable from the initial state
	const reachableFromInitial = new Set<ENFA.Node>();
	traverse(base.initial, (node, queue) => {
		reachableFromInitial.add(node);
		queue.push(...node.out.keys());
	});

	// 2) Get all nodes reachable state
	const reachable = new Set<ENFA.Node>();
	traverse(base.final, (node, queue) => {
		if (!reachableFromInitial.has(node)) {
			return;
		}

		reachable.add(node);
		queue.push(...node.in.keys());
	});

	if (reachable.size === 0 || !reachable.has(base.initial)) {
		baseMakeEmpty(base);
		return;
	}

	// 3) Remove all unreachable states
	for (const node of reachable) {
		node.out.forEach((_, to) => {
			if (!reachable.has(to)) {
				to.unlinkAll();
			}
		});
		node.in.forEach((_, from) => {
			if (!reachable.has(from)) {
				from.unlinkAll();
			}
		});
	}
}
