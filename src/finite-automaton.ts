import type { Char, ReadonlyWord, Word } from "./core-types";
import type { Expression, NoParent } from "./ast";
import type { CharSet } from "./char-set";

export interface FiniteAutomaton {
	/**
	 * Returns whether this FA accepts the empty language meaning that it doesn't accept any words.
	 */
	readonly isEmpty: boolean;

	/**
	 * Returns whether the formal language accepted by this FA contains finitely many words.
	 *
	 * __Note__: Finite does not mean that all words can be iterated in practice. E.g. the set of all Unicode words with
	 * 10 or less characters contains 2.6e54 many words and can be accepted by a DFA with only 11 states.
	 */
	readonly isFinite: boolean;

	/**
	 * The maximum character that is part of the alphabet of the words that this FA can accept.
	 */
	readonly maxCharacter: Char;

	/**
	 * Returns whether this FA accepts the given word.
	 *
	 * @param word The characters of the word to test.
	 */
	test(word: ReadonlyWord): boolean;

	/**
	 * Returns an iterable that will yield all words accepted by this FA. Words are yielded by ascending length.
	 *
	 * If this FA accepts infinitely many words, the iterable will never end.
	 */
	words(): Iterable<Word>;
	/**
	 * Returns an iterable that will yield all word sets accepted by this FA. Word sets are yielded by ascending length.
	 *
	 * If you analyse the words of this FA, consider using this method instead of `words` because this method will yield
	 * at most `O(n^3)` word sets while `words` will yield at most `O(n^3 * m)` words (n = number of states, m = number
	 * of possible characters).
	 *
	 * If this FA accepts infinitely many words, the iterable will never end.
	 */
	wordSets(): Iterable<CharSet[]>;

	/**
	 * Returns a string representation of this FA.
	 */
	toString(): string;
	/**
	 * Returns the AST of a regular expression that accepts the same language as this FA.
	 *
	 * @param options
	 */
	toRegex(options?: Readonly<ToRegexOptions>): NoParent<Expression>;
}

export interface ToRegexOptions {
	/**
	 * The maximum number of RE AST nodes the implementation is allowed to create.
	 *
	 * If the implementation has to create more nodes to create the RE, a `TooManyNodesError` will be thrown. This
	 * maximum will be check before any optimization passes.
	 *
	 * @default 10000
	 */
	maxNodes?: number;
	/**
	 * The maximum number of optimization passes that will be done after the initial RE AST was created.
	 *
	 * The initial AST is usually a lot more complex than necessary. Optimizations are then applied in order to minimize
	 * the AST until this limit is reached or the AST can be optimized no further.
	 *
	 * The default number of passes is implementation defined.
	 */
	maxOptimizationPasses?: number;
}

/**
 * A graph iterator for all states of an FA with final states.
 *
 * @template S The type of a state in the FA to iterate.
 * @template O The type of the value each state maps to.
 */
export interface FAIterator<S, O = Iterable<S>> {
	/**
	 * The initial state of the FA.
	 */
	readonly initial: S;
	/**
	 * Returns the value a state maps to.
	 *
	 * This function is guaranteed to be deterministic during the time the iterator is used. Subsequent invocations will
	 * always return values that are equal to the first returned value. Equality is defined by
	 * [the key equality of the Map class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#key_equality).
	 * This function is also guaranteed to be sufficiently fast, usually `O(1)` can be assumed.
	 */
	readonly getOut: (state: S) => O;
	/**
	 * Returns whether the given state is a final state.
	 *
	 * This function is guaranteed to be deterministic during the time the iterator is used. It is also guaranteed to be
	 * sufficiently fast, usually `O(1)` can be assumed.
	 */
	readonly isFinal: (state: S) => boolean;
}

export interface TransitionIterable {
	readonly maxCharacter: Char;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly transitionIterator: () => FAIterator<any, ReadonlyMap<unknown, CharSet>>;
}

export interface TransitionIterableFA extends FiniteAutomaton, TransitionIterable {
	/**
	 * Returns whether the languages of this and the other FA are disjoint.
	 *
	 * The runtime of this algorithm is `O(n * m)` (n = number of states of this NFA, m = number of states of the other
	 * FA) but it's a lot faster in practice with the worst case being very rare.
	 *
	 * Since this uses the intersection operation, you can supply intersection options.
	 *
	 * @param other
	 * @param options
	 */
	isDisjointWith(other: TransitionIterable, options?: Readonly<IntersectionOptions>): boolean;
	/**
	 * This is equivalent to `NFA.fromIntersection(this, other).wordSets()` but implemented more efficiently.
	 */
	intersectionWordSets(other: TransitionIterable, options?: Readonly<IntersectionOptions>): Iterable<CharSet[]>;
	/**
	 * This is equivalent to `NFA.fromIntersection(this, other).words()` but implemented more efficiently.
	 */
	intersectionWords(other: TransitionIterable, options?: Readonly<IntersectionOptions>): Iterable<Word>;
}

export interface IntersectionOptions {
	/**
	 * The maximum number of nodes the intersection operation is allowed to create before throwing a
	 * `TooManyNodesError`.
	 *
	 * If the maximum number of nodes is unset or set to `Infinity`, the intersection operation may create as many nodes
	 * as necessary to construct the intersection. This might cause the machine to run out of memory.
	 *
	 * @default Infinity
	 */
	maxNodes?: number;
}

/**
 * An error that is thrown when an operation causes too many nodes to be created.
 *
 * Many FA operation have the potential to create a huge number of nodes (thousands and millions) which may result in
 * the JavaScript runtime running out of memory and/or crashing. This error will thrown before that happens to safely
 * abort an otherwise resource-intensive operation.
 */
export class TooManyNodesError extends Error {}
