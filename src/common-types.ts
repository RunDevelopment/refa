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
	/**
	 * Returns the string representation of this FA in the
	 * [DOT format](https://en.wikipedia.org/wiki/DOT_(graph_description_language)).
	 *
	 * The output of this function can passed to any graph visualization program. This can be a
	 * [local installation](https://graphviz.org/download/) or an [online editor](https://edotor.net/).
	 *
	 * By default, a hexadecimal range form will be used to represent {@link CharSet}s. It's possible to provide a
	 * custom stringify function using the `charSetToString` parameter.
	 *
	 * @param charSetToString
	 */
	toDot(charSetToString?: (charSet: CharSet) => string): string;
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
	 * @see {@link deterministicOut}
	 */
	readonly getOut: (state: S) => O;
	/**
	 * Whether the {@link getOut} function is deterministic during the lifetime of the iterator.
	 *
	 * Deterministic means that if the `getOut` gets called for the same state twice (or more), it will always return
	 * equal values. The equality of states is defined by
	 * [the key equality of the Map class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#key_equality).
	 * Value equality depends on the iterator.
	 *
	 * The equality relation of returned values is not defined by this interface. I.e. a deterministic `getOut` function
	 * may return new collections/iterators on subsequent invocations as long as the collections/iterators are
	 * considered equal (e.g. equal could be defined as "same elements").
	 *
	 * It is also assumed that deterministic `getOut` functions are sufficiently fast for subsequent invocations
	 * (usually `O(1)` can be assumed).
	 *
	 * @default false
	 */
	readonly deterministicOut?: boolean;
	/**
	 * Returns whether the given state is a final state.
	 *
	 * This function is guaranteed to be deterministic during the time the iterator is used. It is also guaranteed to be
	 * sufficiently fast, usually `O(1)` can be assumed.
	 */
	readonly isFinal: (state: S) => boolean;
}

/**
 * An FA builder has the responsibility of constructing a finite automata.
 *
 * The constructed FA is always owned by the builder.
 *
 * @template S The type of a state.
 * @template O The type of the value each state maps to.
 */
export interface FABuilder<S, T> {
	/**
	 * The initial state of the FA.
	 */
	readonly initial: S;
	/**
	 * Makes the given state behave like a final state of this FA.
	 *
	 * This does not necessarily mean that the given state will be a final state. I.e. calling `makeFinal(s)` does not
	 * necessitate that `isFinal(s)` is true.
	 *
	 * The implementation has to guarantee that calling this method for the same state more than once is allowed.
	 */
	readonly makeFinal: (state: S) => void;
	/**
	 * Returns whether the given state is a final state.
	 *
	 * This operation is assumed to be semantically equivalent to {@link FAIterator#isFinal}.
	 */
	readonly isFinal: (state: S) => boolean;
	/**
	 * Creates a new state owned by the builder.
	 *
	 * @throws {@link TooManyNodesError}
	 * May be thrown if the number of created nodes exceeds some limit.
	 */
	readonly createNode: () => S;
	/**
	 * Links to the two given states using the given transition.
	 *
	 * Calling this operations more than once for the given `from` and `to` states is not guaranteed to succeed.
	 */
	readonly linkNodes: (from: S, to: S, transition: T) => void;
}

/**
 * An {@link FAIterator} where transitions are map of states to character sets.
 *
 * This is a commonly used interface when dealing with FA. It's the common core all currently implemented FA support.
 */
export type TransitionIterator<T> = FAIterator<T, ReadonlyMap<T, CharSet>>;

/**
 * A graph or FA that con create a {@link TransitionIterator}.
 */
export interface TransitionIterable<T> {
	readonly maxCharacter: Char;
	readonly transitionIterator: () => TransitionIterator<T>;
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
