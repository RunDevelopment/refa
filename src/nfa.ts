import { Concatenation, Element, Expression, NoParent, Node, Quantifier } from "./ast";
import { CharSet } from "./char-set";
import { assertNever, cachedFunc, debugAssert, swapRemove, traverse, traverseMultiRoot } from "./util";
import {
	FABuilder,
	FAIterator,
	FiniteAutomaton,
	NodeFactory,
	ToRegexOptions,
	TransitionIterable,
	TransitionIterator,
} from "./fa-types";
import * as Iter from "./iter";
import { Char, ReadonlyWord, Word } from "./char-types";
import { ReadonlyWordSet, WordSet } from "./word-set";
import { MaxCharacterError, TooManyNodesError } from "./errors";
import { wordSetsToWords } from "./words";
import { toAlternatives } from "./ast-analysis";

/**
 * A readonly {@link NFA}.
 */
export interface ReadonlyNFA extends FiniteAutomaton, TransitionIterable<NFA.ReadonlyNode> {
	/**
	 * The initial state of the NFA.
	 */
	readonly initial: NFA.ReadonlyNode;
	/**
	 * The set of final states of the NFA.
	 *
	 * This set may be empty or contain nodes not reachable from the initial state.
	 */
	readonly finals: ReadonlySet<NFA.ReadonlyNode>;

	/**
	 * Whether this NFA is in its normal form.
	 *
	 * @see {@link NFA}
	 */
	readonly isNormalized: boolean;

	stateIterator(): FAIterator<NFA.ReadonlyNode>;
	/**
	 * Yields all nodes reachable from the initial state including the initial state.
	 *
	 * This may include trap states, but it will not include unreachable final states.
	 *
	 * The order in which nodes will be returned is implementation defined and may change after any operation that
	 * modifies the NFA.
	 *
	 * Modifying the NFA while iterating will result in implementation-defined behavior. The implementation may stop the
	 * iteration or yield an nodes.
	 *
	 * This operation runs in _O(E + V)_ where _E_ is the number of nodes reachable from the initial state and _V_ is
	 * the number of transitions.
	 */
	nodes(): Iterable<NFA.ReadonlyNode>;

	/**
	 * Returns the number of nodes reachable from the initial state including the initial state.
	 *
	 * This returns the number of nodes returned by {@link nodes}.
	 */
	countNodes(): number;

	/**
	 * Create a mutable copy of this NFA.
	 *
	 * @param factory
	 */
	copy(factory?: NodeFactory<NFA.Node>): NFA;
}

/**
 * A [nondeterministic finite automaton](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton).
 *
 * This class implements NFAs with the following properties:
 *
 * - There is exactly one initial state.
 *
 * - There may be any number of final states.
 *
 *   This is implemented using a `Set` of states.
 *
 * - No epsilon transitions.
 *
 * - A transitions always consumes a character.
 *
 *   (All character sets are guaranteed to be non-empty.)
 *
 * - Transitions are unordered.
 *
 *   As a consequence, `/aa|bb/` and `/bb|aa/` have the same state machine in this NFA implementation.
 *
 *   (The underlying data structure may be a JavaScript `Map` but the key order is ignored.)
 *
 * - Between any two states, there can at most be one transition.
 *
 *   This means that all transitions between two nodes will be merged into one. This is implemented as a simple
 *   {@link CharSet.union}. As a consequence, `/a|a/` and `/a/` have the same state machine in this NFA implementation.
 *
 * ## Normal form
 *
 * The normal form of this NFA implementation has the following restriction:
 *
 * - The initial state must not have incoming transitions.
 *
 * Non-normalized NFAs will either be tolerated or normalized by operations.
 */
export class NFA implements ReadonlyNFA {
	readonly initial: NFA.Node;
	readonly finals: Set<NFA.Node>;
	readonly maxCharacter: Char;

	private constructor(initial: NFA.Node, finals: Set<NFA.Node>, maxCharacter: Char) {
		this.initial = initial;
		this.finals = finals;
		this.maxCharacter = maxCharacter;
	}

	get isEmpty(): boolean {
		return this.finals.size === 0;
	}
	get isFinite(): boolean {
		return this.isEmpty || Iter.languageIsFinite(this.stateIterator());
	}
	get isNormalized(): boolean {
		return this.initial.in.size === 0;
	}

	/**
	 * Brings this NFA is in its normal form.
	 *
	 * This operation will create at most 1 node with the given factory.
	 *
	 * @param factory
	 * @see {@link NFA}
	 */
	normalize(factory: NodeFactory<NFA.Node> = NFA.nodeFactory): void {
		baseNormalize(factory, this);
	}

	stateIterator(): FAIterator<NFA.ReadonlyNode> {
		const initial: NFA.ReadonlyNode = this.initial;
		const finals: ReadonlySet<NFA.ReadonlyNode> = this.finals;
		return {
			initial,
			getOut: n => n.out.keys(),
			stableOut: true,
			isFinal: n => finals.has(n),
		};
	}
	transitionIterator(): TransitionIterator<NFA.ReadonlyNode> {
		const initial: NFA.ReadonlyNode = this.initial;
		const finals: ReadonlySet<NFA.ReadonlyNode> = this.finals;
		return {
			initial,
			getOut: n => n.out,
			stableOut: true,
			isFinal: n => finals.has(n),
		};
	}
	nodes(): Iterable<NFA.Node> {
		return Iter.iterateStates({
			initial: this.initial,
			getOut: state => state.out.keys(),
			isFinal: state => this.finals.has(state),
		});
	}

	countNodes(): number {
		let c = 0;
		traverse(this.initial, (n, queue) => {
			c++;
			queue.push(...n.out.keys());
		});
		return c;
	}

	copy(factory: NodeFactory<NFA.Node> = new NFA.LimitedNodeFactory()): NFA {
		const copy = factoryCopy(factory, this.transitionIterator());

		return new NFA(copy.initial, copy.finals, this.maxCharacter);
	}

	test(word: ReadonlyWord): boolean {
		// An implementation of Thompson's algorithm as described by Russ Cox
		// https://swtch.com/~rsc/regexp/regexp1.html
		let currentStates = [this.initial];
		const newStatesSet = new Set<NFA.Node>();

		for (const char of word) {
			const newStates: NFA.Node[] = [];
			newStatesSet.clear();

			for (const state of currentStates) {
				state.out.forEach((charSet, to) => {
					if (charSet.has(char) && !newStatesSet.has(to)) {
						newStates.push(to);
						newStatesSet.add(to);
					}
				});
			}

			currentStates = newStates;
		}

		return currentStates.some(state => this.finals.has(state));
	}

	wordSets(): Iterable<WordSet> {
		return Iter.iterateWordSets(this.transitionIterator());
	}
	words(): Iterable<Word> {
		return wordSetsToWords(this.wordSets());
	}

	toString(): string {
		return Iter.toString(this.transitionIterator(), cs => cs.toUnicodeString());
	}

	toRegex(options?: Readonly<ToRegexOptions>): NoParent<Expression> {
		return Iter.toRegex(this.transitionIterator(), options);
	}

	toDot(charSetToString?: (charSet: CharSet) => string): string {
		return Iter.toDot(
			this.transitionIterator(),
			Iter.createSimpleToDotOptions(charSetToString || (cs => cs.toUnicodeString()), false)
		);
	}

	/**
	 * Modifies this NFA to accept all words from this NFA and the given FA.
	 *
	 * @param other
	 * @param factory
	 */
	union<O>(other: TransitionIterable<O>, factory: NodeFactory<NFA.Node> = new NFA.LimitedNodeFactory()): void {
		MaxCharacterError.assert(this, other);

		if (this === (other as unknown)) {
			// do nothing
		} else {
			this.normalize(factory);
			baseUnion(this, factoryCopy(factory, other.transitionIterator()));
		}
	}

	/**
	 * Modifies this NFA to accept all words from this NFA and the given NFA.
	 *
	 * This is implemented by simply moving the nodes from the given NFA into this NFA. The given NFA will be empty
	 * after this operation as nodes are moved, not shared.
	 *
	 * @param other
	 * @param factory
	 */
	unionInto(other: NFA, factory: NodeFactory<NFA.Node> = NFA.nodeFactory): void {
		MaxCharacterError.assert(this, other);

		if (this === other) {
			throw new Error("Cannot union an NFA into itself.");
		}

		this.normalize(factory);
		other.normalize(factory);
		baseUnion(this, other);
		baseMakeEmpty(other);
	}

	/**
	 * Modifies this NFA to accept the concatenation of this NFA and the given FA.
	 *
	 * @param other
	 * @param factory
	 */
	append<O>(other: TransitionIterable<O>, factory: NodeFactory<NFA.Node> = new NFA.LimitedNodeFactory()): void {
		MaxCharacterError.assert(this, other);

		if (this === (other as unknown)) {
			this.quantify(2, 2, factory);
		} else {
			this.normalize(factory);
			baseAppend(this, factoryCopy(factory, other.transitionIterator()));
		}
	}

	/**
	 * Modifies this NFA to accept the concatenation of this NFA and the given FA.
	 *
	 * This is implemented by simply moving the nodes from the given NFA into this NFA. The given NFA will be empty
	 * after this operation as nodes are moved, not shared.
	 *
	 * @param other
	 * @param factory
	 */
	appendInto(other: NFA, factory: NodeFactory<NFA.Node> = NFA.nodeFactory): void {
		MaxCharacterError.assert(this, other);

		if (this === other) {
			throw new Error("Cannot append an NFA into itself.");
		}

		this.normalize(factory);
		other.normalize(factory);
		baseAppend(this, other);
		baseMakeEmpty(other);
	}

	/**
	 * Modifies this NFA to accept the concatenation of the given NFA and this FA.
	 *
	 * @param other
	 * @param factory
	 */
	prepend<O>(other: TransitionIterable<O>, factory: NodeFactory<NFA.Node> = new NFA.LimitedNodeFactory()): void {
		MaxCharacterError.assert(this, other);

		if (this === (other as unknown)) {
			this.quantify(2, 2, factory);
		} else {
			this.normalize(factory);
			basePrepend(this, factoryCopy(factory, other.transitionIterator()));
		}
	}

	/**
	 * Modifies this NFA to accept the concatenation of the given NFA and this FA.
	 *
	 * This is implemented by simply moving the nodes from the given NFA into this NFA. The given NFA will be empty
	 * after this operation as nodes are moved, not shared.
	 *
	 * @param other
	 * @param factory
	 */
	prependInto(other: NFA, factory: NodeFactory<NFA.Node> = NFA.nodeFactory): void {
		MaxCharacterError.assert(this, other);

		if (this === other) {
			throw new Error("Cannot prepend an NFA into itself.");
		}

		this.normalize(factory);
		other.normalize(factory);
		basePrepend(this, other);
		baseMakeEmpty(other);
	}

	/**
	 * Modifies this NFA to accept at least `min` and at most `max` concatenations of itself.
	 *
	 * Both `min` and `max` both have to be non-negative integers with `min <= max`.
	 * `max` is also allowed to be `Infinity`.
	 *
	 * @param min
	 * @param max
	 * @param factory
	 */
	quantify(min: number, max: number, factory: NodeFactory<NFA.Node> = new NFA.LimitedNodeFactory()): void {
		if (!Number.isInteger(min) || !(Number.isInteger(max) || max === Infinity) || min < 0 || min > max) {
			throw new RangeError("min and max both have to be non-negative integers with min <= max.");
		}

		this.normalize(factory);
		baseQuantify(factory, this, min, max);
	}

	/**
	 * Removes the empty word from the accepted languages of this NFA.
	 */
	withoutEmptyWord(): void {
		this.normalize();

		this.finals.delete(this.initial);
	}

	/**
	 * Removes all states that are unreachable.
	 *
	 * Only the following states will remain after this operation:
	 *
	 * 1. The initial state.
	 * 2. All states that are reachable from the initial state and can reach one of the final states.
	 */
	removeUnreachable(): void {
		baseRemoveUnreachable(this);
	}

	/**
	 * Modifies this NFA such that all prefixes of all accepted words are also accepted.
	 *
	 * If the language of this NFA is empty, then it will remain empty.
	 *
	 * Unreachable states will be removed by this operation.
	 */
	prefixes(): void {
		this.removeUnreachable();

		if (this.isEmpty) {
			return;
		}

		for (const node of this.nodes()) {
			this.finals.add(node);
		}
	}

	/**
	 * Modifies this NFA such that all suffixes of all accepted words are also accepted.
	 *
	 * If the language of this NFA is empty, then it will remain empty.
	 *
	 * Unreachable states will be removed by this operation.
	 */
	suffixes(): void {
		this.removeUnreachable();
		this.normalize();

		if (this.isEmpty) {
			return;
		}

		for (const node of this.nodes()) {
			if (node !== this.initial) {
				let total: CharSet | undefined = undefined;

				node.in.forEach(set => {
					if (total === undefined) {
						total = set;
					} else {
						total = total.union(set);
					}
				});

				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				debugAssert(total !== undefined, "The node doesn't have incoming transitions.");

				this.initial.link(node, total);
			}
		}
		this.finals.add(this.initial);
	}

	/**
	 * Modifies this NFA such that it accepts the reverse of all words it currently accepts.
	 *
	 * If the language of this NFA is empty, then it will remain empty.
	 *
	 * Unreachable states will be removed by this operation.
	 */
	reverse(): void {
		this.removeUnreachable();
		this.normalize();

		baseReverse(NFA.nodeFactory, this);
	}

	/**
	 * Creates a new NFA which matches no words. The language of the returned NFA is empty.
	 *
	 * This operation will create exactly 1 node with the given factory.
	 *
	 * @param options
	 * @param factory
	 */
	static empty(options: Readonly<NFA.Options>, factory: NodeFactory<NFA.Node> = NFA.nodeFactory): NFA {
		return new NFA(factory.createNode(), new Set(), options.maxCharacter);
	}

	/**
	 * Creates a new NFA which matches only the empty word.
	 *
	 * This operation will create exactly 1 node with the given factory.
	 *
	 * @param options
	 * @param factory
	 */
	static emptyWord(options: Readonly<NFA.Options>, factory: NodeFactory<NFA.Node> = NFA.nodeFactory): NFA {
		const initial = factory.createNode();
		return new NFA(initial, new Set([initial]), options.maxCharacter);
	}

	/**
	 * Creates a new NFA which matches all words.
	 *
	 * This operation will create exactly 1 node with the given factory.
	 *
	 * @param options
	 * @param factory
	 */
	static all(options: Readonly<NFA.Options>, factory: NodeFactory<NFA.Node> = NFA.nodeFactory): NFA {
		const initial = factory.createNode();
		initial.link(initial, CharSet.all(options.maxCharacter));
		return new NFA(initial, new Set([initial]), options.maxCharacter);
	}

	/**
	 * Creates a new NFA which matches the given characters.
	 *
	 * This operation will create at most 2 nodes with the given factory.
	 *
	 * @param charSet
	 * @param factory
	 */
	static fromCharSet(charSet: CharSet, factory: NodeFactory<NFA.Node> = NFA.nodeFactory): NFA {
		const initial = factory.createNode();

		if (charSet.isEmpty) {
			return new NFA(initial, new Set(), charSet.maximum);
		}

		const final = factory.createNode();
		initial.link(final, charSet);

		return new NFA(initial, new Set([final]), charSet.maximum);
	}

	/**
	 * Returns a new NFA which is equivalent to the intersection of the two given FA.
	 *
	 * @param left
	 * @param right
	 * @param factory
	 */
	static fromIntersection<L, R>(
		left: TransitionIterable<L>,
		right: TransitionIterable<R>,
		factory: NodeFactory<NFA.Node> = new NFA.LimitedNodeFactory()
	): NFA {
		MaxCharacterError.assert(left, right, "TransitionIterable");

		const builder = new NFA.Builder(factory);

		const iter = Iter.intersection(builder, left.transitionIterator(), right.transitionIterator());
		Iter.forEach(Iter.mapOut(iter, n => n.out.keys()));

		// A cleanup still has to be performed because while all states are connected to the initial state, they might
		// not be able to reach a final state. This will remove such trap states.
		baseRemoveUnreachable(builder);

		baseNormalize(factory, builder);

		// Try to merge as many final states as possible. This won't greatly reduce the overall number of states but
		// having less final states will make a lot of the NFA operations more efficient.
		baseOptimizationReuseFinalStates(builder);

		return NFA.fromBuilder(builder, left);
	}

	static fromRegex(
		concat: NoParent<Node>,
		options: Readonly<NFA.Options>,
		creationOptions?: Readonly<NFA.FromRegexOptions>,
		factory?: NodeFactory<NFA.Node>
	): NFA;
	static fromRegex(
		alternatives: readonly NoParent<Concatenation>[],
		options: Readonly<NFA.Options>,
		creationOptions?: Readonly<NFA.FromRegexOptions>,
		factory?: NodeFactory<NFA.Node>
	): NFA;
	static fromRegex(
		value: NoParent<Node> | readonly NoParent<Concatenation>[],
		options: Readonly<NFA.Options>,
		creationOptions: Readonly<NFA.FromRegexOptions> = {},
		factory: NodeFactory<NFA.Node> = new NFA.LimitedNodeFactory()
	): NFA {
		const { initial, finals } = createGraphFromRegex(toAlternatives(value), options, creationOptions, factory);
		return new NFA(initial, finals, options.maxCharacter);
	}

	/**
	 * Creates a new NFA which matches all and only all of the given words.
	 *
	 * @param words
	 * @param options
	 * @param factory
	 */
	static fromWords(
		words: Iterable<ReadonlyWord>,
		options: Readonly<NFA.Options>,
		factory: NodeFactory<NFA.Node> = new NFA.LimitedNodeFactory()
	): NFA {
		const { maxCharacter } = options;

		const builder = new NFA.Builder(factory);

		Iter.fromWords(
			builder,
			(node, char) => {
				for (const [to, chars] of node.out) {
					if (chars.has(char)) {
						return to;
					}
				}
				return undefined;
			},
			words,
			maxCharacter
		);

		baseOptimizationReuseFinalStates(builder);
		baseOptimizationMergeSuffixes(builder);

		return NFA.fromBuilder(builder, options);
	}

	/**
	 * Creates a new NFA which matches all and only all of the given word sets.
	 *
	 * @param wordSets
	 * @param options
	 * @param factory
	 */
	static fromWordSets(
		wordSets: Iterable<ReadonlyWordSet>,
		options: Readonly<NFA.Options>,
		factory: NodeFactory<NFA.Node> = new NFA.LimitedNodeFactory()
	): NFA {
		const { maxCharacter } = options;

		const builder = new NFA.Builder(factory);

		Iter.fromWordSets(builder, wordSets, maxCharacter);

		baseOptimizationReuseFinalStates(builder);
		baseOptimizationMergeSuffixes(builder);

		return NFA.fromBuilder(builder, options);
	}

	static fromFA<InputNode>(fa: TransitionIterable<InputNode>, factory?: NodeFactory<NFA.Node>): NFA {
		return NFA.fromTransitionIterator(fa.transitionIterator(), fa, factory);
	}

	static fromTransitionIterator<InputNode>(
		iter: TransitionIterator<InputNode>,
		options: Readonly<NFA.Options>,
		factory: NodeFactory<NFA.Node> = new NFA.LimitedNodeFactory()
	): NFA {
		const { maxCharacter } = options;

		const initial = factory.createNode();
		const finals = new Set<NFA.Node>();

		const translate = cachedFunc<InputNode, NFA.Node>(() => factory.createNode());
		translate.cache.set(iter.initial, initial);

		traverse(iter.initial, (node, queue) => {
			const transNode = translate(node);

			if (iter.isFinal(node)) {
				finals.add(transNode);
			}

			const out = iter.getOut(node);
			out.forEach((charSet, outDfaNode) => {
				if (charSet.maximum !== maxCharacter) {
					throw new Error("Some character sets do not conform to the given maximum.");
				}
				queue.push(outDfaNode);
				transNode.link(translate(outDfaNode), charSet);
			});
		});

		return new NFA(initial, finals, maxCharacter);
	}

	static fromBuilder(builder: NFA.Builder, options: Readonly<NFA.Options>): NFA {
		return new NFA(builder.initial, builder.finals, options.maxCharacter);
	}
}

/**
 * A namespace for NFA-specific classes and interfaces.
 *
 * @see {@link NFA} (class)
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NFA {
	export interface ReadonlyNode {
		readonly out: ReadonlyMap<ReadonlyNode, CharSet>;
		readonly in: ReadonlyMap<ReadonlyNode, CharSet>;
	}

	export class Node implements ReadonlyNode {
		readonly out = new Map<Node, CharSet>();
		readonly in = new Map<Node, CharSet>();

		link(to: Node, via: CharSet): void {
			if (via.isEmpty) {
				throw new Error("You can't link nodes with the empty character set.");
			}

			this._linkNodesAddImpl(this.out, to, via);
			this._linkNodesAddImpl(to.in, this, via);
		}
		private _linkNodesAddImpl(map: Map<NFA.Node, CharSet>, to: NFA.Node, characters: CharSet): void {
			const current = map.get(to);
			if (current === undefined) {
				map.set(to, characters);
			} else {
				map.set(to, current.union(characters));
			}
		}

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
			TooManyNodesError.assert(++this._counter, this.limit, "NFA");
			return new Node();
		}
	}

	export class Builder implements FABuilder<Node, CharSet> {
		readonly initial: Node;
		readonly finals = new Set<Node>();
		readonly factory: NodeFactory<Node>;

		constructor(factory: NodeFactory<Node>) {
			this.factory = factory;
			this.initial = factory.createNode();
		}

		makeFinal(state: Node): void {
			this.finals.add(state);
		}
		isFinal(state: Node): boolean {
			return this.finals.has(state);
		}
		linkNodes(from: Node, to: Node, transition: CharSet): void {
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
		 * How to handle assertions when construction the NFA.
		 *
		 * - `"throw"`
		 *
		 *   This method will throw an error when encountering an assertion.
		 *
		 * - `"disable"`
		 *
		 *   This method will replace any assertion with an empty character class, effectively removing it.
		 *
		 * - `"ignore"`
		 *
		 *   This method will replace any assertion with an empty group.
		 *
		 * @default "throw"
		 */
		assertions?: "disable" | "ignore" | "throw";
		/**
		 * How to handle unknowns when construction the NFA.
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

interface NonNormalSubGraph {
	readonly initial: NFA.Node;
	readonly finals: Set<NFA.Node>;
}
/**
 * This interface guarantees that the initial state does not have incoming transitions.
 */
interface SubGraph {
	readonly initial: NFA.Node;
	readonly finals: Set<NFA.Node>;
}
interface ReadonlySubGraph {
	readonly initial: NFA.ReadonlyNode;
	readonly finals: ReadonlySet<NFA.ReadonlyNode>;
}

function createGraphFromRegex(
	expression: readonly NoParent<Concatenation>[],
	options: Readonly<NFA.Options>,
	creationOptions: Readonly<NFA.FromRegexOptions>,
	factory: NodeFactory<NFA.Node>
): SubGraph {
	const infinityThreshold = creationOptions.infinityThreshold ?? Infinity;
	const assertions = creationOptions.assertions ?? "throw";
	const unknowns = creationOptions.unknowns ?? "throw";

	return handleAlternation(expression);

	// All sub graphs guarantee that the initial node has no incoming edges.

	function handleAlternation(alternatives: readonly NoParent<Concatenation>[]): SubGraph {
		if (alternatives.length === 0) {
			return { initial: factory.createNode(), finals: new Set<NFA.Node>() };
		}

		const base = handleConcatenation(alternatives[0]);
		for (let i = 1, l = alternatives.length; i < l; i++) {
			baseUnion(base, handleConcatenation(alternatives[i]));
		}

		return base;
	}

	function handleConcatenation(concatenation: NoParent<Concatenation>): SubGraph {
		const elements = concatenation.elements;

		if (elements.length === 0) {
			const base: SubGraph = { initial: factory.createNode(), finals: new Set<NFA.Node>() };
			base.finals.add(base.initial);
			return base;
		}

		const base = createElement(elements[0]);
		if (base === null) {
			return { initial: factory.createNode(), finals: new Set<NFA.Node>() };
		}

		for (let i = 1, l = elements.length; i < l; i++) {
			if (base.finals.size === 0) {
				// Since base is the empty language, concatenation has no effect, so let's stop early
				break;
			}

			appendElement(elements[i], base);
		}

		return base;
	}

	function handleQuantifier(quant: NoParent<Quantifier>): SubGraph {
		const base = handleAlternation(quant.alternatives);
		let max = quant.max;
		if (max >= infinityThreshold) {
			max = Infinity;
		}
		baseQuantify(factory, base, quant.min, max);
		return base;
	}

	function appendElement(element: NoParent<Element>, base: SubGraph): void {
		switch (element.type) {
			case "CharacterClass": {
				const chars = element.characters;
				checkCharacters(chars);

				if (chars.isEmpty) {
					// the whole concatenation can't go anywhere
					baseMakeEmpty(base);
				} else {
					// we know that base.final isn't empty, so just link all former finals to a new final node
					const s = factory.createNode();
					base.finals.forEach(f => f.link(s, chars));
					base.finals.clear();
					base.finals.add(s);
				}
				break;
			}

			case "Quantifier": {
				if (element.max > 0) {
					baseAppend(base, handleQuantifier(element));
				}
				break;
			}

			default: {
				const after = createElement(element);
				if (after === null) {
					baseMakeEmpty(base);
				} else {
					baseAppend(base, after);
				}
			}
		}
	}
	function createElement(element: NoParent<Element>): SubGraph | null {
		switch (element.type) {
			case "Alternation":
				return handleAlternation(element.alternatives);

			case "Assertion":
				switch (assertions) {
					case "disable":
						return null;
					case "ignore": {
						const base: SubGraph = { initial: factory.createNode(), finals: new Set<NFA.Node>() };
						base.finals.add(base.initial);
						return base;
					}
					case "throw":
						throw new Error("Assertions are not supported yet.");
					default:
						throw assertNever(assertions);
				}

			case "CharacterClass": {
				const chars = element.characters;
				checkCharacters(chars);

				if (chars.isEmpty) {
					return null;
				} else {
					const i = factory.createNode();
					const f = factory.createNode();
					i.link(f, chars);
					return { initial: i, finals: new Set([f]) };
				}
			}
			case "Quantifier":
				return handleQuantifier(element);

			case "Unknown":
				switch (unknowns) {
					case "disable":
						return null;
					case "throw":
						throw new Error("Unknowns are not supported.");
					default:
						throw assertNever(unknowns);
				}

			default:
				throw assertNever(element);
		}
	}
	function checkCharacters(chars: CharSet): void {
		if (chars.maximum !== options.maxCharacter) {
			throw new Error(`The maximum of all character sets has to be ${options.maxCharacter}.`);
		}
	}
}

/**
 * Creates a copy of `toCopy` in the given nodes returning the created sub NFA.
 *
 * @param factory
 * @param toCopy
 */
function factoryCopyOfSubGraph(factory: NodeFactory<NFA.Node>, toCopy: ReadonlySubGraph): SubGraph {
	return factoryCopy(factory, {
		initial: toCopy.initial,
		getOut: n => n.out,
		isFinal: n => toCopy.finals.has(n),
	});
}
function factoryCopy<T>(factory: NodeFactory<NFA.Node>, iter: TransitionIterator<T>): SubGraph {
	const initial = factory.createNode();
	const finals = new Set<NFA.Node>();

	const translate = cachedFunc<T, NFA.Node>(() => factory.createNode());
	translate.cache.set(iter.initial, initial);

	traverse(iter.initial, (node, queue) => {
		const trans = translate(node);

		if (iter.isFinal(node)) {
			finals.add(trans);
		}

		const out = iter.getOut(node);
		for (const [to, characters] of out) {
			queue.push(to);
			trans.link(translate(to), characters);
		}
	});

	const result = { initial, finals };

	// The initial state might be non-normalized

	baseNormalize(factory, result);

	return result;
}

/**
 * Alters `base` to end with the `after` expression.
 *
 * `after` will be in an invalid state after this operation but `baseMakeEmpty` can make it valid again.
 *
 * @param base
 * @param after
 */
function baseAppend(base: SubGraph, after: SubGraph): void {
	if (base.finals.size === 0) {
		// concat(EMPTY_LANGUAGE, after) == EMPTY_LANGUAGE
		return;
	}
	if (after.finals.size === 0) {
		// concat(base, EMPTY_LANGUAGE) == EMPTY_LANGUAGE
		baseMakeEmpty(base);
		return;
	}

	// replace after initial with base finals
	const initialEdges = [...after.initial.out];
	for (const baseFinal of base.finals) {
		for (const [to, characters] of initialEdges) {
			baseFinal.link(to, characters);
		}
	}
	// unlink after initial
	for (const [to] of initialEdges) {
		after.initial.unlink(to);
	}

	// If the initial of after isn't final, we have to clear the base finals
	if (!after.finals.has(after.initial)) {
		base.finals.clear();
	}
	// transfer finals
	after.finals.forEach(n => {
		if (n !== after.initial) {
			base.finals.add(n);
		}
	});
}

/**
 * Alters `base` to start with the `before` expression.
 *
 * `before` will be in an invalid state after this operation but `baseMakeEmpty` can make it valid again.
 *
 * @param base
 * @param before
 */
function basePrepend(base: SubGraph, before: SubGraph): void {
	if (base.finals.size === 0) {
		// concat(before, EMPTY_LANGUAGE) == EMPTY_LANGUAGE
		return;
	}
	if (before.finals.size === 0) {
		// concat(EMPTY_LANGUAGE, base) == EMPTY_LANGUAGE
		baseMakeEmpty(base);
		return;
	}

	// replace base initial with before finals
	const initialEdges = [...base.initial.out];
	for (const beforeFinal of before.finals) {
		for (const [to, characters] of initialEdges) {
			beforeFinal.link(to, characters);
		}
	}
	// unlink base initial
	for (const [to] of initialEdges) {
		base.initial.unlink(to);
	}
	// link before initial out to base initial
	for (const [to, characters] of before.initial.out) {
		base.initial.link(to, characters);
		// and unlink before before initial
		before.initial.unlink(to);
	}

	if (base.finals.has(base.initial)) {
		base.finals.delete(base.initial);

		before.finals.forEach(n => {
			if (n === before.initial) {
				base.finals.add(base.initial);
			} else {
				base.finals.add(n);
			}
		});
	}
}

/**
 * Alters `base` to be the union of itself and the given alternative.
 *
 * `alternative` will be in an invalid state after this operation but `baseMakeEmpty` can make it valid again.
 *
 * @param base
 * @param alternative
 */
function baseUnion(base: SubGraph, alternative: SubGraph): void {
	// add finals
	alternative.finals.forEach(n => {
		base.finals.add(n === alternative.initial ? base.initial : n);
	});

	// transfer nodes to base
	alternative.initial.out.forEach((via, to) => {
		base.initial.link(to, via);
	});
	alternative.initial.unlinkAllOut();

	// optional optimization to reduce the number of nodes
	baseOptimizationReuseFinalStates(base);
	baseOptimizationMergePrefixes(base);
	baseOptimizationMergeSuffixes(base); // suffixes should to be done after ReuseFinalStates
}

function baseOptimizationReuseFinalStates(base: SubGraph): void {
	if (base.finals.size < 2) {
		return;
	}

	const reusable: NFA.Node[] = [];
	for (const f of base.finals) {
		if (f !== base.initial && f.out.size === 0) {
			reusable.push(f);
		}
	}

	if (reusable.length > 1) {
		const masterFinal: NFA.Node = reusable.pop()!;
		for (const toRemove of reusable) {
			base.finals.delete(toRemove);
			toRemove.in.forEach((via, from) => {
				from.out.delete(toRemove);
				from.link(masterFinal, via);
			});
		}
	}
}

function baseOptimizationMergePrefixes(base: SubGraph): void {
	/**
	 * The basic idea here to to merge suffixes and prefixes.
	 * So that e.g. /abc|abba/ will merged to /ab(c|ba)/ (similar to suffixes).
	 */

	const prefixNodes: NFA.Node[] = [base.initial];
	// we can just do this because we know the initial node doesn't have any incoming transitions

	while (prefixNodes.length > 0) {
		const node = prefixNodes.pop()!;
		if (node.out.size < 2) {
			continue;
		}

		const candidateOutNodes: NFA.Node[] = [];
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
				const otherIsFinal = base.finals.has(other);
				const otherCharSet = node.out.get(other)!;
				if (currentCharSet.equals(otherCharSet) && otherIsFinal == base.finals.has(current)) {
					// found a match -> remove `other`
					for (const [otherTo, otherToCharSet] of other.out) {
						current.link(otherTo, otherToCharSet);
						other.unlink(otherTo);
					}
					node.unlink(other);
					if (otherIsFinal) {
						base.finals.delete(other);
					}
					swapRemove(candidateOutNodes, i);

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
function baseOptimizationMergeSuffixes(base: SubGraph): void {
	// this will basically be the same as the prefix optimization but in the other direction

	const suffixNodes: NFA.Node[] = [];

	for (const final of base.finals) {
		if (final.out.size === 0) {
			suffixNodes.push(final);
		}
	}

	while (suffixNodes.length > 0) {
		const node = suffixNodes.pop()!;
		if (node.in.size < 2) {
			continue;
		}

		const candidateInNodes: NFA.Node[] = [];
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
				const otherIsFinal = base.finals.has(other);
				const otherCharSet = node.in.get(other)!;
				if (currentCharSet.equals(otherCharSet) && otherIsFinal == base.finals.has(current)) {
					// found a match -> remove other
					for (const [otherFrom, otherFromCharSet] of other.in) {
						otherFrom.link(current, otherFromCharSet);
						otherFrom.unlink(other);
					}
					other.unlink(node);
					if (otherIsFinal) {
						base.finals.delete(other);
					}
					swapRemove(candidateInNodes, i);

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
 * @param factory
 * @param base
 * @param times
 */
function baseRepeat(factory: NodeFactory<NFA.Node>, base: SubGraph, times: number): void {
	if (times === 0) {
		// trivial
		baseMakeEmpty(base);
		base.finals.add(base.initial);
		return;
	}
	if (times === 1) {
		// trivial
		return;
	}
	if (base.finals.size === 1 && base.finals.has(base.initial)) {
		// base can only match the empty string
		return;
	}
	if (base.finals.size === 0) {
		// base can't match any word
		return;
	}

	if (!base.finals.has(base.initial)) {
		const copy = factoryCopyOfSubGraph(factory, base);
		for (let i = times; i > 2; i--) {
			// use a copy of the original copy for concatenation
			// do this `times - 2` times
			baseAppend(base, factoryCopyOfSubGraph(factory, copy));
		}
		// use the original copy
		baseAppend(base, copy);
	} else {
		// We could use the above approach here as well but this would generate O(n^2) unnecessary transitions.
		// To get rid of these unnecessary transitions, we remove the initial states from the set of final states
		// and manually store the final states of each concatenation.

		const realFinal = new Set<NFA.Node>(base.finals);
		base.finals.delete(base.initial);

		const copy = factoryCopyOfSubGraph(factory, base);

		for (let i = times; i > 2; i--) {
			// use a copy of the original copy for concatenation
			// do this `times - 2` times
			baseAppend(base, factoryCopyOfSubGraph(factory, copy));
			base.finals.forEach(f => realFinal.add(f));
		}
		// use the original copy
		baseAppend(base, copy);
		base.finals.forEach(f => realFinal.add(f));

		// transfer the final states
		base.finals.clear();
		realFinal.forEach(f => base.finals.add(f));

		// NOTE: For this to be correct, it is assumed, that
		//  1) concatenation doesn't replace the initial state of base
		//  2) the final states of base aren't removed (they just have to be reachable from the initial state)
	}
}

/**
 * Alters `base` to be equal to `/(<base>)+/`.
 *
 * @param base
 */
function basePlus(base: SubGraph): void {
	// The basic idea here is that we copy all edges from the initial state state to every final state. This means that
	// all final states will then behave like the initial state.
	for (const f of base.finals) {
		if (f !== base.initial) {
			base.initial.out.forEach((characters, to) => {
				f.link(to, characters);
			});
		}
	}
}

/**
 * Returns whether the given base can be expressed as `A+` for some A.
 *
 * @param base
 */
function baseIsPlusExpression(base: ReadonlySubGraph): boolean {
	// The following condition have to be fulfilled:
	//
	// All Final states have to link to all and only to all directly outgoing states of the initial state.

	const initialOut = base.initial.out;

	// check condition
	for (const final of base.finals) {
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

function baseQuantify(factory: NodeFactory<NFA.Node>, base: SubGraph, min: number, max: number): void {
	if (max === 0) {
		// this is a special case, so handle it before everything else
		// e.g. /a{0}/
		baseMakeEmpty(base);
		base.finals.add(base.initial);
		return;
	}

	if (base.finals.has(base.initial)) {
		// if the initial state is also final, then `min` is effectively 0
		// e.g. /(a|)+/ == /(a|)*/
		min = 0;
	} else if (min === 0) {
		// if `min` is 0, then the initial state has to be final
		base.finals.add(base.initial);
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
		const aPlus = factoryCopyOfSubGraph(factory, base);

		// remove the + from the current A+
		for (const final of base.finals) {
			for (const finalOut of final.out.keys()) {
				final.unlink(finalOut);
			}
		}

		baseRepeat(factory, base, min - 1); // repeat A min-1 many times
		baseAppend(base, aPlus); // concat A{min-1} and A+
		return;
	}

	if (min === max) {
		// e.g. /a{4}/
		baseRepeat(factory, base, min);
	} else if (max < Infinity) {
		// e.g. /a{2,4}/
		// The basic idea here is that /a{m,n}/ == /a{m}(a|){n-m}/

		// make a copy of base and include the empty string
		const copy = factoryCopyOfSubGraph(factory, base);
		copy.finals.add(copy.initial);

		baseRepeat(factory, copy, max - min);
		baseRepeat(factory, base, min);
		baseAppend(base, copy);
	} else {
		if (min > 1) {
			// e.g. /a{4,}/
			// The basic idea here is that /a{4,}/ == /a{3}a+/

			// the plus part (has to be done first because base will be modified by repeat)
			const copy = factoryCopyOfSubGraph(factory, base);
			basePlus(copy);

			// repeat
			baseRepeat(factory, base, min - 1);

			baseAppend(base, copy);
		} else {
			// e.g. /a*/, /a+/
			// If `min` is 0 then the initial state will already be final because of the code above.
			// We can use the plus operator for star as well because /(<RE>)*/ == /(<RE>)+|/
			basePlus(base);
		}
	}
}

/**
 * Alters `base` to accept no words.
 *
 * @param base
 */
function baseMakeEmpty(base: NonNormalSubGraph): void {
	base.initial.unlinkAll();
	base.finals.clear();
}

function baseReverse(factory: NodeFactory<NFA.Node>, base: SubGraph): void {
	const { initial, finals } = base;

	if (finals.size === 0 || (finals.size === 1 && finals.has(initial))) {
		// either no finals (= empty language)
		// or only the initial state is final (= language with only the empty word)
		return;
	}

	// reverse the direction of all transitions
	const allNodes = [
		...Iter.iterateStates({
			initial: base.initial,
			getOut: n => n.out.keys(),
			isFinal: n => base.finals.has(n),
		}),
	];
	for (const node of allNodes) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mutableNode = node as any;
		const temp = mutableNode.out;
		mutableNode.out = mutableNode.in;
		mutableNode.in = temp;
	}

	// replace the former initial with a new node and make it final
	// this will make the initial "free" (no in/out transitions)
	const mainFinal = factory.createNode();
	initial.in.forEach((trans, from) => {
		from.unlink(initial);
		from.link(mainFinal, trans);
	});

	const newFinals = new Set<NFA.Node>([mainFinal]);
	if (finals.has(initial)) {
		finals.delete(initial);
		newFinals.add(initial);
	}

	// make the former initial the new initial
	for (const f of finals) {
		f.out.forEach((trans, to) => {
			initial.link(to, trans);
		});
		if (f.in.size === 0) {
			// remove f
			f.out.forEach((_, to) => {
				f.unlink(to);
			});
		}
	}

	// transfer finals
	finals.clear();
	newFinals.forEach(f => finals.add(f));
}

function baseNormalize(factory: NodeFactory<NFA.Node>, base: NonNormalSubGraph): void {
	if (base.initial.in.size === 0) {
		// already normalized
		return;
	}

	const i = factory.createNode();

	// make the new state equivalent to the initial state
	base.initial.out.forEach((via, to) => {
		i.link(to === base.initial ? i : to, via);
	});
	base.initial.in.forEach((via, from) => {
		from.link(i, via);
	});

	base.initial.unlinkAllIn();

	if (base.finals.has(base.initial)) {
		base.finals.add(i);
	}
}

/**
 * All states which cannot be reached from the initial state or cannot reach (or are) a final state, will be
 * removed.
 *
 * @param base
 */
function baseRemoveUnreachable(base: NonNormalSubGraph): void {
	if (base.finals.size === 0) {
		baseMakeEmpty(base);
		return;
	}

	// 1) Get all nodes reachable from the initial state
	const reachableFromInitial = new Set<NFA.Node>();
	traverse(base.initial, (node, queue) => {
		reachableFromInitial.add(node);
		queue.push(...node.out.keys());
	});

	// 2) Get all nodes reachable state
	const reachable = new Set<NFA.Node>();
	traverseMultiRoot(base.finals, (node, queue) => {
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
	for (const f of [...base.finals]) {
		if (!reachable.has(f)) {
			base.finals.delete(f);
		}
	}
}
