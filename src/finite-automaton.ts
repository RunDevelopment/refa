import type { Expression, Simple } from "./ast";
import type { CharSet } from "./char-set";
import type { FAIterator } from "./fa-iterator";


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
	readonly maxCharacter: number;

	/**
	 * Returns whether this FA accepts the given word.
	 *
	 * @param word The characters of the word to test.
	 */
	test(word: Iterable<number>): boolean;

	/**
	 * Returns an iterable that will yield all words accepted by this FA. Words are yielded by ascending length.
	 *
	 * If this FA accepts infinitely many words, the iterable will never end.
	 */
	words(): Iterable<number[]>;
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
	toRegex(options?: Readonly<ToRegexOptions>): Simple<Expression>;
}

export interface ToRegexOptions {
	/**
	 * The maximum number of RE AST nodes the implementation is allowed to create.
	 *
	 * If the implementation has to create more nodes to create the RE, a `TooManyNodesError` will be thrown. This
	 * maximum will be check before any optimization passes.
	 *
	 * By default, this value is set to `10000`.
	 */
	maximumNodes?: number;
	/**
	 * The maximum number of optimization passes that will be done after the initial RE AST was created.
	 *
	 * The initial AST is usually a lot more complex than necessary. Optimizations are then applied in order to minimize
	 * the AST until this limit is reached or the AST can be optimized no further.
	 *
	 * By default, this value is set to `Infinity`.
	 */
	maximumOptimizationPasses?: number;
}

export interface TransitionIterable {
	readonly maxCharacter: number;
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
	isDisjointWith(other: TransitionIterable, options?: ReadonlyIntersectionOptions): boolean;
	/**
	 * This is equivalent to `NFA.fromIntersection(this, other).wordSets()` but implemented more efficiently.
	 */
	intersectionWordSets(other: TransitionIterable, options?: ReadonlyIntersectionOptions): Iterable<CharSet[]>;
	/**
	 * This is equivalent to `NFA.fromIntersection(this, other).words()` but implemented more efficiently.
	 */
	intersectionWords(other: TransitionIterable, options?: ReadonlyIntersectionOptions): Iterable<number[]>;
}

export interface IntersectionOptions {
	/**
	 * The maximum number of nodes the intersection operation is allowed to create before throwing a
	 * `TooManyNodesError`.
	 *
	 * If the maximum number of nodes is unset or set to `Infinity`, the intersection operation may create as many nodes
	 * as necessary to construct the intersection. This might cause the machine to run out of memory.
	 */
	maxNodes?: number;
}

export type ReadonlyIntersectionOptions = Readonly<IntersectionOptions>;

export class TooManyNodesError extends Error { }
