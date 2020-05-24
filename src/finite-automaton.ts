import type { Expression, Simple } from "./ast";
import type { CharSet } from "./char-set";


export interface FiniteAutomaton {

	/**
	 * Returns whether this FA accepts the empty language meaning that it doesn't accept any words.
	 */
	isEmpty: boolean;

	/**
	 * Returns whether the formal language accepted by this FA contains finitely many words.
	 */
	isFinite: boolean;

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
	toRegex(): Simple<Expression>;
}
