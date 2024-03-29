import type { Char, ReadonlyWord, Word } from "./char-types";
import type { Expression, NoParent } from "./ast";
import type { CharSet } from "./char-set";
import type { WordSet } from "./word-set";

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
	 * If this FA accepts infinitely many words, the iterable will never end. If this FA is finite, the iterable will
	 * end after at most `2^O(n)` word sets (`n` = number of states).
	 *
	 * If you analyse the words of an FA, consider using this method instead of `words`. If this method yields `k` word
	 * sets, then `words` will yield up to `O(k * m ^ l)` words (`m` = number of possible characters, `l` = the maximum
	 * length of any of the `k` word sets).
	 */
	wordSets(): Iterable<WordSet>;

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
	 * By default, {@link CharSet#toUnicodeString} is used to represent {@link CharSet}s. It's possible to provide a
	 * custom stringify function using the `charSetToString` parameter.
	 *
	 * @param charSetToString
	 */
	toDot(charSetToString?: (charSet: CharSet) => string): string;
	/**
	 * Returns the string representation of this FA in the [Mermaid format](https://mermaid.js.org/).
	 *
	 * By default, {@link CharSet#toUnicodeString} is used to represent {@link CharSet}s. It's possible to provide a
	 * custom stringify function using the `charSetToString` parameter.
	 *
	 * @param charSetToString
	 */
	toMermaid(charSetToString?: (charSet: CharSet) => string): string;
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
	 * Callers of this function are allowed to call the function **without** a `this` argument.
	 *
	 * @see {@link stableOut}
	 */
	readonly getOut: (state: S) => O;
	/**
	 * Whether the {@link getOut} function is stableOut during the lifetime of the iterator.
	 *
	 * Stable means that if `getOut` gets called for the same state more than once, it will always return the same
	 * value.
	 *
	 * The sameness of states is defined by
	 * [the key equality of the Map class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#key_equality).
	 *
	 * The sameness of returned values is not defined by this interface and depends of the iterator.
	 *
	 * I.e. a stable `getOut` function may return new collections/iterators on subsequent invocations as long as the
	 * collections/iterators are considered equal (e.g. equal could be defined as "same elements") by the consumer of
	 * the iterator.
	 *
	 * @default false
	 */
	readonly stableOut?: boolean;
	/**
	 * Returns whether the given state is a final state.
	 *
	 * This function is guaranteed to be deterministic during the time the iterator is used. It is also guaranteed to be
	 * sufficiently fast, usually `O(1)` can be assumed.
	 *
	 * Callers of this function are allowed to call the function **without** a `this` argument.
	 */
	readonly isFinal: (state: S) => boolean;
}

/**
 * A factory for the nodes of finite automata.
 */
export interface NodeFactory<S> {
	/**
	 * Creates a new state.
	 *
	 * @throws {@link TooManyNodesError}
	 * May be thrown if the number of created nodes exceeds some limit.
	 */
	readonly createNode: () => S;
}

/**
 * An FA builder has the responsibility of constructing a finite automaton.
 *
 * The constructed FA is always owned by the builder.
 *
 * @template S The type of a state.
 * @template T The transition type of the values linking states.
 */
export interface FABuilder<S, T> extends NodeFactory<S> {
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
	 * This operation is assumed to be semantically equivalent to {@link FAIterator.isFinal}.
	 */
	readonly isFinal: (state: S) => boolean;
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
 * A graph or FA that can create a {@link TransitionIterator}.
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
