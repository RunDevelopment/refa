export interface FiniteAutomaton {

	/**
	 * Returns whether this FA accepts the empty language meaning that it doesn't accept any words.
	 */
	isEmpty: boolean;

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
