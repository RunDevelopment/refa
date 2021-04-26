import { Char } from "./core-types";

/**
 * An error that is thrown when the max characters of two or more FA or transition iterables is not the same.
 *
 * Operations on FA and transition iterables require the max characters of all given FA and transition iterables to be
 * the same and will throw this error if they are not.
 */
export class MaxCharacterError extends Error {
	/**
	 * Asserts the two given max characters are the same.
	 */
	static assert(a: Char | { maxCharacter: Char }, b: Char | { maxCharacter: Char }, kind?: string): void {
		let left: number | { maxCharacter: number } = a;
		let right: number | { maxCharacter: number } = b;

		if (typeof left !== "number") {
			left = left.maxCharacter;
		}
		if (typeof right !== "number") {
			right = right.maxCharacter;
		}

		if (left !== right) {
			if (kind) {
				throw new MaxCharacterError(`The two ${kind} do not have the same max character. ${left} != ${right}`);
			} else {
				throw new MaxCharacterError(`Different max character. ${left} != ${right}`);
			}
		}
	}
}

/**
 * An error that is thrown when an operation causes too many nodes to be created.
 *
 * Many FA operation have the potential to create a huge number of nodes (thousands and millions) which may result in
 * the JavaScript runtime running out of memory and/or crashing. This error will thrown before that happens to safely
 * abort an otherwise resource-intensive operation.
 */
export class TooManyNodesError extends Error {
	/**
	 * Asserts that the current number of created nodes does not exceed the limit.
	 */
	static assert(current: number, limit: number, kind: string): void {
		if (current > limit) {
			throw new TooManyNodesError(`The ${kind} is not allowed to create more than ${limit} nodes.`);
		}
	}
}
