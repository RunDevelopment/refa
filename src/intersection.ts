import { Word } from "./char-types";
import { WordSet } from "./word-set";
import * as Iter from "./iter";
import { MapFABuilderNode } from "./iter";
import { MaxCharacterError } from "./errors";
import { FACreationOptions, TransitionIterable, TransitionIterator } from "./fa-types";
import { wordSetsToWords } from "./words";

/**
 * Returns a lazily-created {@link TransitionIterator} for the intersection of the two given FA.
 *
 * The iterator will create states as it is traversed.
 *
 * @param left
 * @param right
 * @param options
 */
export function getIntersectionIterator<L, R>(
	left: TransitionIterable<L>,
	right: TransitionIterable<R>,
	options?: Readonly<FACreationOptions>
): TransitionIterator<MapFABuilderNode> {
	MaxCharacterError.assert(left, right, "TransitionIterable");

	return Iter.intersection(
		new Iter.MapFABuilder(options?.maxNodes ?? 10_000),
		left.transitionIterator(),
		right.transitionIterator()
	);
}

/**
 * Returns whether the languages of this and the other FA are disjoint.
 *
 * The runtime of this algorithm is `O(n * m)` (n = number of states of this NFA, m = number of states of the other
 * FA) but it's a lot faster in practice with the worst case being very rare.
 *
 * Since this uses the intersection operation, you can supply intersection options.
 *
 * This is equivalent to `NFA.fromIntersection(left, right).isEmpty` but implemented more efficiently.
 *
 * @param left
 * @param right
 * @param options
 */
export function isDisjointWith<L, R>(
	left: TransitionIterable<L>,
	right: TransitionIterable<R>,
	options?: Readonly<FACreationOptions>
): boolean {
	const iter = getIntersectionIterator(left, right, options);

	return !Iter.canReachFinal(Iter.mapOut(iter, n => n.keys()));
}
/**
 * Returns a potentially infinite iterable of word sets accepted by both given transition iterables.
 *
 * This function provides the following guarantees:
 *
 * 1. Word sets are guaranteed to be yielded in the order of increasing length. (Word sets of equal lengths may be
 *    yielded in any order.)
 * 2. No character set of the yielded word sets is empty.
 *
 * This is roughly equivalent to `NFA.fromIntersection(left, right).wordSets()` but implemented more efficiently.
 *
 * @param left
 * @param right
 * @param options
 */
export function getIntersectionWordSets<L, R>(
	left: TransitionIterable<L>,
	right: TransitionIterable<R>,
	options?: Readonly<FACreationOptions>
): Iterable<WordSet> {
	const iter = getIntersectionIterator(left, right, options);

	return Iter.iterateWordSets(iter);
}
/**
 * Returns a potentially infinite iterable of words accepted by both given transition iterables.
 *
 * This function provides the following guarantees:
 *
 * 1. Words are guaranteed to be yielded in the order of increasing length. (Words of equal lengths may be yielded in
 *    any order.)
 *
 * This is roughly equivalent to `NFA.fromIntersection(left, right).words()` but implemented more efficiently.
 *
 * @param left
 * @param right
 * @param options
 */
export function getIntersectionWords<L, R>(
	left: TransitionIterable<L>,
	right: TransitionIterable<R>,
	options?: Readonly<FACreationOptions>
): Iterable<Word> {
	return wordSetsToWords(getIntersectionWordSets(left, right, options));
}
