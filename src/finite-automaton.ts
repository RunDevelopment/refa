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
	 * Returns a string representation of this FA.
	 */
	toString(): string;
}
