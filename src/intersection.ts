import { CharSet } from "./char-set";
import { Word } from "./core-types";
import * as Iter from "./iter";
import { MapFABuilderNode } from "./iter";
import { MaxCharacterError } from "./errors";
import { wordSetsToWords } from "./char-util";
import { IntersectionOptions, TransitionIterable, TransitionIterator } from "./common-types";

/**
 * Returns a lazily-created {@link TransitionIterator} for the intersection of the two given FA.
 *
 * The iterator will create states as it is traversed.
 *
 * @param other
 * @param options
 */
export function getIntersectionIterator<L, R>(
	left: TransitionIterable<L>,
	right: TransitionIterable<R>,
	options?: Readonly<IntersectionOptions>
): TransitionIterator<MapFABuilderNode> {
	MaxCharacterError.assert(left, right, "TransitionIterable");

	const maxNodes = options?.maxNodes ?? Infinity;
	const builder =
		maxNodes === Infinity
			? new Iter.MapFABuilder()
			: new Iter.MapFABuilder({ maxNodes, kind: "intersection operation" });

	return Iter.intersection(builder, left.transitionIterator(), right.transitionIterator());
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
 * @param other
 * @param options
 */
export function isDisjointWith<L, R>(
	left: TransitionIterable<L>,
	right: TransitionIterable<R>,
	options?: Readonly<IntersectionOptions>
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
 * 3. No character set of the yielded word sets is empty.
 *
 * This is roughly equivalent to `NFA.fromIntersection(left, right).wordSets()` but implemented more efficiently.
 */
export function getIntersectionWordSets<L, R>(
	left: TransitionIterable<L>,
	right: TransitionIterable<R>,
	options?: Readonly<IntersectionOptions>
): Iterable<CharSet[]> {
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
 */
export function getIntersectionWords<L, R>(
	left: TransitionIterable<L>,
	right: TransitionIterable<R>,
	options?: Readonly<IntersectionOptions>
): Iterable<Word> {
	return wordSetsToWords(getIntersectionWordSets(left, right, options));
}
