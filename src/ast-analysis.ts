import {
	Alternation,
	Assertion,
	CharacterClass,
	Concatenation,
	Element,
	Expression,
	NoParent,
	Node,
	Parent,
	Quantifier,
	Unknown,
} from "./ast";
import { CharSet } from "./char-set";
import { assertNever, isReadonlyArray } from "./util";

// Most of the functions here are copied from https://github.com/RunDevelopment/eslint-plugin-clean-regex

/**
 * Returns whether all paths of the given element do not consume any characters of the input string. The given node may
 * still assert characters of the input string.
 *
 * This essentially means that it's possible to wrap the given node into a look{ahead,behind} without changing the
 * meaning of the pattern.
 *
 * @param node
 */
export function isZeroLength(node: NoParent<Node> | NoParent<Concatenation>[]): boolean {
	if (Array.isArray(node)) {
		return node.every(isZeroLength);
	}

	switch (node.type) {
		case "Alternation":
		case "Expression":
			return isZeroLength(node.alternatives);

		case "Assertion":
			return true;

		case "CharacterClass":
			return false;

		case "Concatenation":
			return node.elements.every(isZeroLength);

		case "Quantifier":
			return node.max === 0 || isZeroLength(node.alternatives);

		case "Unknown":
			return false;

		default:
			assertNever(node);
	}
}
/**
 * Returns whether there is at least one path in the given element that does not consume any characters of the input
 * string.
 *
 * @param node
 */
export function isPotentiallyZeroLength(node: NoParent<Node> | NoParent<Concatenation>[]): boolean {
	if (Array.isArray(node)) {
		return node.some(isPotentiallyZeroLength);
	}

	switch (node.type) {
		case "Alternation":
		case "Expression":
			return isPotentiallyZeroLength(node.alternatives);

		case "Assertion":
			return true;

		case "CharacterClass":
			return false;

		case "Concatenation":
			return node.elements.every(isPotentiallyZeroLength);

		case "Quantifier":
			return node.min === 0 || isPotentiallyZeroLength(node.alternatives);

		case "Unknown":
			return false;

		default:
			assertNever(node);
	}
}

/**
 * Returns whether all (but at least one) paths of the given element accept without consuming any characters and
 * without asserting anything.
 *
 * This essentially means that the given node can be remove with the empty string (= empty concatenation) without
 * changing the meaning of the pattern.
 *
 * @param node
 */
export function isEmpty(node: NoParent<Node> | NoParent<Concatenation>[]): boolean {
	if (Array.isArray(node)) {
		return node.length >= 1 && node.every(isEmpty);
	}

	switch (node.type) {
		case "Alternation":
		case "Expression":
			return isEmpty(node.alternatives);

		case "Assertion":
			// only if the assertion is trivially accepting
			return isTriviallyAccepting(node);

		case "CharacterClass":
			return false;

		case "Concatenation":
			return node.elements.every(isEmpty);

		case "Quantifier":
			return node.max === 0 || isEmpty(node.alternatives);

		case "Unknown":
			return false;

		default:
			assertNever(node);
	}
}
/**
 * Returns whether there is at least one path in the given element that accepts without consuming any characters and
 * without asserting anything.
 *
 * @param node
 */
export function isPotentiallyEmpty(node: NoParent<Node> | NoParent<Concatenation>[]): boolean {
	if (Array.isArray(node)) {
		return node.some(isPotentiallyEmpty);
	}

	switch (node.type) {
		case "Alternation":
		case "Expression":
			return isPotentiallyEmpty(node.alternatives);

		case "Assertion":
			// only if the assertion is trivially accepting
			return isTriviallyAccepting(node);

		case "CharacterClass":
			return false;

		case "Concatenation":
			return node.elements.every(isPotentiallyEmpty);

		case "Quantifier":
			return node.min === 0 || isPotentiallyEmpty(node.alternatives);

		case "Unknown":
			return false;

		default:
			assertNever(node);
	}
}

/**
 * Returns whether there all of the given nodes are guaranteed to consume at least one character.
 *
 * If no unknown nodes are present, then this function will return `!isPotentiallyZeroLength(node)`.
 *
 * @param node
 */
export function alwaysConsumesCharacters(node: NoParent<Node> | NoParent<Concatenation>[]): boolean {
	if (Array.isArray(node)) {
		return node.every(alwaysConsumesCharacters);
	}

	switch (node.type) {
		case "Alternation":
		case "Expression":
			return alwaysConsumesCharacters(node.alternatives);

		case "Assertion":
			return false;

		case "CharacterClass":
			return true;

		case "Concatenation":
			return node.elements.some(alwaysConsumesCharacters);

		case "Quantifier":
			return node.min > 0 && alwaysConsumesCharacters(node.alternatives);

		case "Unknown":
			return false;

		default:
			assertNever(node);
	}
}

/**
 * Returns whether the given assertion will always trivially accept regardless of the input string and other RE AST
 * nodes in the regular expression.
 *
 * @param assertion
 */
export function isTriviallyAccepting(assertion: NoParent<Assertion>): boolean {
	if (assertion.negate) {
		return assertion.alternatives.length === 0;
	} else {
		return isPotentiallyEmpty(assertion.alternatives);
	}
}

export type Descendants<T extends Node> = T | RealDescendants<T>;
type RealDescendants<T extends Node> = T extends Expression
	? Element | Concatenation
	: T extends CharacterClass
	? never
	: Element | Concatenation;

/**
 * Returns whether any of the descendants of the given node fulfill the given condition.
 *
 * The descendants will be iterated in a DFS top-to-bottom manner from left to right with the first node being the
 * given node.
 *
 * This function is short-circuited, so as soon as any `conditionFn` returns `true`, `true` will be returned.
 *
 * @param node
 * @param conditionFn
 * @param descentConditionFn An optional function to decide whether the descendant of the given node will be checked as
 * well.
 */
export function hasSomeDescendant<T extends Node>(
	node: NoParent<T> & NoParent<Node>,
	conditionFn: (descendant: NoParent<Descendants<T>>) => boolean,
	descentConditionFn?: (descendant: NoParent<Descendants<T>>) => boolean
): boolean {
	if (conditionFn(node)) {
		return true;
	}

	if (descentConditionFn && !descentConditionFn(node)) {
		return false;
	}

	switch (node.type) {
		case "Alternation":
		case "Expression":
		case "Assertion":
		case "Quantifier":
			return node.alternatives.some(a => hasSomeDescendant(a, conditionFn, descentConditionFn));
		case "Concatenation":
			return node.elements.some(e => hasSomeDescendant(e, conditionFn, descentConditionFn));
	}
	return false;
}

type ChildOf<N extends Node> = N extends Parent ? Concatenation : N extends Concatenation ? Element : never;
/**
 * Represents the path from the root of the expression to a specific node.
 */
export interface Path<N extends Node, P = N["parent"]> {
	readonly node: NoParent<N>;
	/**
	 * Converts this path into its parent path, if possible.
	 *
	 * After calling this operation, `this` cannot be used anymore.
	 */
	toParentPath(): P extends Node ? Path<P> : null;
	/**
	 * Converts this path into the path of one of its children.
	 *
	 * After calling this operation, `this` cannot be used anymore.
	 */
	toChildPath<T extends ChildOf<N>>(child: NoParent<T>): Path<T>;
}

/**
 * Returns the natural path of the given node.
 *
 * The natural path is simply the path defined by the `parent` property of the given node.
 *
 * @param node
 */
export function naturalPath<N extends Node>(node: N): Path<N> {
	return new NaturalPathImpl<N>(node);
}
class NaturalPathImpl<N extends Node, P = N["parent"]> implements Path<N, P> {
	node: NoParent<N>;
	constructor(node: N) {
		this.node = node as never;
	}
	toParentPath(): P extends Node ? Path<P> : null {
		if (this.node.type === "Expression") {
			return null as never;
		} else {
			this.node = (this.node as N).parent as never;
			return this as never;
		}
	}
	toChildPath<T extends ChildOf<N>>(child: NoParent<T>): Path<T> {
		this.node = child as never;
		return this as never;
	}
}

export function stackPath<N extends Node>(stack: readonly NoParent<Node>[], node: NoParent<N>): Path<N> {
	return new StackPathImpl<N>([...stack, node]);
}
class StackPathImpl<N extends Node, P = N["parent"]> implements Path<N, P> {
	constructor(readonly stack: NoParent<Node>[]) {
		if (stack[0].type !== "Expression") {
			throw new Error("Invalid stack");
		}
	}
	get node(): NoParent<N> {
		return this.stack[this.stack.length - 1] as NoParent<N>;
	}
	toParentPath(): P extends Node ? Path<P> : null {
		this.stack.pop();
		if (this.stack.length === 0) {
			return null as never;
		} else {
			return this as never;
		}
	}
	toChildPath<T extends ChildOf<N>>(child: NoParent<T>): Path<T> {
		this.stack.push(child);
		return this as never;
	}
}

/**
 * Returns whether any of the ancestors of the given node fulfills the given condition.
 *
 * The ancestors will be iterated in the order from closest to farthest.
 * The condition function will not be called on the given node.
 *
 * @param nodePath
 * @param conditionFn
 */
export function hasSomeAncestor(
	nodePath: Path<Node>,
	conditionFn: (ancestor: NoParent<Parent | Concatenation>) => boolean
): boolean {
	let parentPath = nodePath.toParentPath();
	while (parentPath) {
		if (conditionFn(parentPath.node)) {
			return true;
		}
		parentPath = parentPath.toParentPath();
	}
	return false;
}

interface LengthRange {
	readonly min: number;
	readonly max: number;
}
const ZERO_LENGTH_RANG: LengthRange = { min: 0, max: 0 };
const ONE_LENGTH_RANG: LengthRange = { min: 1, max: 1 };

/**
 * Returns how many characters the given element can consume at most and has to consume at least.
 *
 * If `undefined`, then the given element can't consume any characters.
 *
 * This function doesn't take assertions into account.
 *
 * @param element
 */
export function getLengthRange(element: NoParent<Node> | NoParent<Concatenation>[]): LengthRange | undefined {
	if (Array.isArray(element)) {
		let min = Infinity;
		let max = 0;

		for (const e of element) {
			const eRange = getLengthRange(e);
			if (eRange) {
				min = Math.min(min, eRange.min);
				max = Math.max(max, eRange.max);
			}
		}

		if (min > max) {
			return undefined;
		} else {
			return { min, max };
		}
	}

	switch (element.type) {
		case "Alternation":
		case "Expression":
			return getLengthRange(element.alternatives);

		case "Assertion":
			return ZERO_LENGTH_RANG;

		case "CharacterClass":
			if (element.characters.isEmpty) {
				return undefined;
			} else {
				return ONE_LENGTH_RANG;
			}

		case "Concatenation": {
			let min = 0;
			let max = 0;

			for (const e of element.elements) {
				const eRange = getLengthRange(e);
				if (!eRange) {
					return undefined;
				}
				min += eRange.min;
				max += eRange.max;
			}

			return { min, max };
		}

		case "Quantifier": {
			if (element.max === 0) {
				return ZERO_LENGTH_RANG;
			}
			const elementRange = getLengthRange(element.alternatives);
			if (!elementRange) {
				return element.min === 0 ? ZERO_LENGTH_RANG : undefined;
			}
			if (elementRange.max === 0) {
				return ZERO_LENGTH_RANG;
			}
			return { min: elementRange.min * element.min, max: elementRange.max * element.max };
		}

		case "Unknown":
			return undefined;

		default:
			throw assertNever(element);
	}
}
interface AssertRange extends LengthRange {
	/**
	 * The maximum reach of an assertion within the element.
	 *
	 * This will always be `>= max`.
	 */
	readonly assertMax: number;
}
const ZERO_ASSERT_RANGE: AssertRange = {
	min: 0,
	max: 0,
	assertMax: 0,
};
const ONE_ASSERT_RANGE: AssertRange = {
	min: 1,
	max: 1,
	assertMax: 1,
};
/**
 * Assuming that the given elements are part of an assertion, this function returns the number of characters the result
 * of the assertion can be affected by.
 *
 * @param element
 * @param kind
 */
export function getAssertRange(
	element: NoParent<Node> | NoParent<Concatenation>[],
	kind: Assertion["kind"]
): AssertRange | undefined {
	if (Array.isArray(element)) {
		let min = Infinity;
		let max = 0;
		let assertMax = 0;

		for (const e of element) {
			const eRange = getAssertRange(e, kind);
			if (eRange) {
				min = Math.min(min, eRange.min);
				max = Math.max(max, eRange.max);
				assertMax = Math.max(assertMax, eRange.assertMax);
			}
		}

		if (min > max) {
			return undefined;
		} else {
			return { min, max, assertMax };
		}
	}

	switch (element.type) {
		case "Alternation":
		case "Expression":
			return getAssertRange(element.alternatives, kind);

		case "Assertion":
			if (element.kind === kind) {
				return getAssertRange(element.alternatives, kind);
			} else {
				return ZERO_ASSERT_RANGE;
			}

		case "CharacterClass":
			if (element.characters.isEmpty) {
				return undefined;
			} else {
				return ONE_ASSERT_RANGE;
			}

		case "Concatenation": {
			let min = 0;
			let max = 0;
			let assertMax = 0;

			for (const e of element.elements) {
				const eRange = getAssertRange(e, kind);
				if (!eRange) {
					return undefined;
				}
				assertMax = Math.max(assertMax, max + eRange.assertMax);
				min += eRange.min;
				max += eRange.max;
			}

			return { min, max, assertMax };
		}

		case "Quantifier": {
			if (element.max === 0) {
				return ZERO_ASSERT_RANGE;
			}
			const elementRange = getAssertRange(element.alternatives, kind);
			if (!elementRange) {
				return element.min === 0 ? ZERO_ASSERT_RANGE : undefined;
			}
			if (elementRange.max === 0) {
				return ZERO_ASSERT_RANGE;
			}

			const max = elementRange.max * element.max;
			return {
				min: elementRange.min * element.min,
				max,
				assertMax:
					max + elementRange.assertMax === Infinity
						? Infinity
						: max + elementRange.assertMax - elementRange.max,
			};
		}

		case "Unknown":
			return undefined;

		default:
			throw assertNever(element);
	}
}

export type MatchingDirection = "ltr" | "rtl";
export function toMatchingDirection(direction: Assertion["kind"] | MatchingDirection): MatchingDirection {
	return direction === "ltr" || direction === "ahead" ? "ltr" : "rtl";
}
export function invertMatchingDirection(direction: Assertion["kind"] | MatchingDirection): MatchingDirection {
	return direction === "ltr" || direction === "ahead" ? "rtl" : "ltr";
}

export interface FirstLookChar {
	/**
	 * A super set of the first character.
	 *
	 * We can usually only guarantee a super set because assertions in the pattern may narrow down the actual character
	 * set.
	 */
	char: CharSet;
	/**
	 * If `true`, then the first character can be the start/end of the string.
	 */
	edge: boolean;
	/**
	 * If `true`, then `char` is guaranteed to be exactly the first character and not just a super set of it.
	 */
	exact: boolean;
}
export type FirstConsumedChar = FirstFullyConsumedChar | FirstPartiallyConsumedChar;
/**
 * This is equivalent to a regex fragment `[char]`.
 */
export interface FirstFullyConsumedChar {
	/**
	 * A super set of the first character.
	 *
	 * We can usually only guarantee a super set because assertions in the pattern may narrow down the actual character
	 * set.
	 */
	char: CharSet;
	/**
	 * If `true`, then the first character also includes the empty word.
	 */
	empty: false;
	/**
	 * If `true`, then `char` is guaranteed to be exactly the first character and not just a super set of it.
	 */
	exact: boolean;
}
/**
 * This is equivalent to a regex fragment `[char]|(?=[look.char])` or `[char]|(?=[look.char]|$)` depending on
 * `look.edge`.
 */
export interface FirstPartiallyConsumedChar {
	/**
	 * A super set of the first character.
	 *
	 * We can usually only guarantee a super set because assertions in the pattern may narrow down the actual character
	 * set.
	 */
	char: CharSet;
	/**
	 * If `true`, then the first character also includes the empty word.
	 */
	empty: true;
	/**
	 * If `true`, then `char` is guaranteed to be exactly the first character and not just a super set of it.
	 */
	exact: boolean;
	/**
	 * A set of characters that may come after the consumed character
	 */
	look: FirstLookChar;
}

/**
 * If a character is returned, it guaranteed to be a super set of the actual character. If the given element is
 * always of zero length, then the empty character set will be returned.
 *
 * If `exact` is `true` then it is guaranteed that the returned character is guaranteed to be the actual
 * character at all times if this element is not influenced by assertions outside itself.
 *
 * @param node
 * @param direction
 * @param maxCharacter
 */
export function getFirstCharConsumedBy(
	node: NoParent<Node> | NoParent<Concatenation>[],
	direction: MatchingDirection,
	maxCharacter: number
): FirstConsumedChar {
	if (Array.isArray(node)) {
		return firstConsumedCharUnion(
			node.map(e => getFirstCharConsumedBy(e, direction, maxCharacter)),
			maxCharacter
		);
	}

	switch (node.type) {
		case "Alternation":
		case "Expression":
			return getFirstCharConsumedBy(node.alternatives, direction, maxCharacter);

		case "Assertion":
			if (toMatchingDirection(node.kind) === direction) {
				if (node.negate) {
					// we can only meaningfully analyse negative assertions of the form `(?![a])`
					if (hasSomeDescendant(node, d => d !== node && d.type === "Assertion")) {
						return misdirectedAssertion();
					}
					const firstChar = getFirstCharConsumedBy(node.alternatives, direction, maxCharacter);
					const range = getLengthRange(node.alternatives);
					if (firstChar.empty || !range) {
						// trivially rejecting
						return { char: CharSet.empty(maxCharacter), empty: false, exact: true };
					}

					if (!firstChar.exact || range.max !== 1) {
						// the goal to to convert `(?![a])` to `(?=[^a]|$)` but this negation is only correct
						// if the characters are exact and if the assertion asserts at most one character
						// E.g. `(?![a][b])` == `(?=$|[^a]|[a][^b])`
						return misdirectedAssertion();
					} else {
						return emptyWord({ char: firstChar.char.negate(), edge: true, exact: true });
					}
				} else {
					const firstChar = getFirstCharConsumedBy(node.alternatives, direction, maxCharacter);
					return emptyWord(firstConsumedToLook(firstChar));
				}
			} else {
				return misdirectedAssertion();
			}

		case "CharacterClass":
			return { char: node.characters, empty: false, exact: true };

		case "Concatenation": {
			let elements = node.elements;
			if (direction === "rtl") {
				elements = [...elements];
				elements.reverse();
			}

			return firstConsumedCharConcat(
				(function* (): Iterable<FirstConsumedChar> {
					for (const e of elements) {
						yield getFirstCharConsumedBy(e, direction, maxCharacter);
					}
				})(),
				maxCharacter
			);
		}

		case "Quantifier": {
			if (node.max === 0) {
				return emptyWord();
			}

			const firstChar = getFirstCharConsumedBy(node.alternatives, direction, maxCharacter);
			if (node.min === 0) {
				return firstConsumedCharUnion([emptyWord(), firstChar], maxCharacter);
			} else {
				return firstChar;
			}
		}

		case "Unknown":
			// Since we have no information about this node, we will return a first character
			// that accepts everything but is inexact.
			// While the unknown may also accept the empty word, we will not make it empty because the results of
			// `isEmpty` and this method should be consistent.
			return { char: CharSet.all(maxCharacter), empty: false, exact: false };

		default:
			throw assertNever(node);
	}

	/**
	 * The result for an assertion that (partly) assert for the wrong matching direction.
	 */
	function misdirectedAssertion(): FirstPartiallyConsumedChar {
		return emptyWord({
			char: CharSet.all(maxCharacter),
			edge: true,
			// This is the important part.
			// Since the allowed chars depend on the previous chars, we don't know which will be allowed.
			exact: false,
		});
	}
	function emptyWord(look?: FirstLookChar): FirstPartiallyConsumedChar {
		return firstConsumedCharEmptyWord(maxCharacter, look);
	}
}
/**
 * Returns first-look-char that is equivalent to a trivially-accepting assertion.
 *
 * @param maxCharacter
 */
function firstLookCharTriviallyAccepting(maxCharacter: number): FirstLookChar {
	return { char: CharSet.all(maxCharacter), edge: true, exact: true };
}
/**
 * Returns first-consumed-char that is equivalent to consuming nothing (the empty word) followed by a trivially
 * accepting assertion.
 *
 * @param maxCharacter
 * @param look
 */
function firstConsumedCharEmptyWord(maxCharacter: number, look?: FirstLookChar): FirstPartiallyConsumedChar {
	return {
		char: CharSet.empty(maxCharacter),
		empty: true,
		exact: true,
		look: look ?? firstLookCharTriviallyAccepting(maxCharacter),
	};
}
class CharUnion {
	char: CharSet;
	exact: boolean;
	constructor(maximum: number) {
		this.char = CharSet.empty(maximum);
		this.exact = true;
	}
	add(char: CharSet, exact: boolean): void {
		// basic idea here is that the union or an exact superset with an inexact subset will be exact
		if (this.exact && !exact && !this.char.isSupersetOf(char)) {
			this.exact = false;
		} else if (!this.exact && exact && char.isSupersetOf(this.char)) {
			this.exact = true;
		}

		this.char = this.char.union(char);
	}
}
function firstConsumedCharUnion(iter: Iterable<Readonly<FirstConsumedChar>>, maxCharacter: number): FirstConsumedChar {
	const union = new CharUnion(maxCharacter);
	const looks: FirstLookChar[] = [];

	for (const itemChar of iter) {
		union.add(itemChar.char, itemChar.exact);
		if (itemChar.empty) {
			looks.push(itemChar.look);
		}
	}

	if (looks.length > 0) {
		// This means that the unioned elements look something like this:
		//   (a|(?=g)|b?|x)
		//
		// Adding the trivially accepting look after all all alternatives that can be empty, we'll get:
		//   (a|(?=g)|b?|x)
		//   (a|(?=g)|b?(?=[^]|$)|x)
		//   (a|(?=g)|b(?=[^]|$)|(?=[^]|$)|x)
		//
		// Since we are only interested in the first character, the look in `b(?=[^]|$)` can be removed.
		//   (a|(?=g)|b|(?=[^]|$)|x)
		//   (a|b|x|(?=g)|(?=[^]|$))
		//   ([abx]|(?=g)|(?=[^]|$))
		//
		// To union the looks, we can simply use the fact that `(?=a)|(?=b)` == `(?=a|b)`
		//   ([abx]|(?=g)|(?=[^]|$))
		//   ([abx]|(?=g|[^]|$))
		//   ([abx]|(?=[^]|$))
		//
		// And with that we are done. This is exactly the form of a first partial char. Getting the exactness of the
		// union of normal chars and look chars follows the same rules.

		const lookUnion = new CharUnion(maxCharacter);
		let edge = false;
		for (const look of looks) {
			lookUnion.add(look.char, look.exact);
			edge = edge || look.edge;
		}
		return {
			char: union.char,
			exact: union.exact,
			empty: true,
			look: { char: lookUnion.char, exact: lookUnion.exact, edge },
		};
	} else {
		return { char: union.char, exact: union.exact, empty: false };
	}
}
function firstConsumedCharConcat(iter: Iterable<Readonly<FirstConsumedChar>>, maxCharacter: number): FirstConsumedChar {
	const union = new CharUnion(maxCharacter);
	let look = firstLookCharTriviallyAccepting(maxCharacter);

	for (const item of iter) {
		union.add(item.char.intersect(look.char), look.exact && item.exact);

		if (item.empty) {
			// This is the hard case. We need to convert the expression
			//   (a|(?=b))(c|(?=d))
			// into an expression
			//   e|(?=f)
			// (we will completely ignore edge assertions for now)
			//
			// To do that, we'll use the following idea:
			//   (a|(?=b))(c|(?=d))
			//   a(c|(?=d))|(?=b)(c|(?=d))
			//   ac|a(?=d)|(?=b)c|(?=b)(?=d)
			//
			// Since we are only interested in the first char, we can remove the `c` in `ac` and the `(?=d)` in
			// `a(?=d)`. Furthermore, `(?=b)c` is a single char, so let's call it `C` for now.
			//   ac|a(?=d)|(?=b)c|(?=b)(?=d)
			//   a|a|C|(?=b)(?=d)
			//   [aC]|(?=b)(?=d)
			//   [aC]|(?=(?=b)d)
			//
			// This is *almost* the desired form. We now have to convert `(?=(?=b)d)` to an expression of the form
			// `(?=f)`. This is the point where we can't ignore edge assertions any longer. Let's look at all possible
			// cases and see how it plays out. Also, let `D` be the char intersection of `b` and `d`.
			//   (1) (?=(?=b)d)
			//       (?=D)
			//
			//   (2) (?=(?=b)(d|$))
			//       (?=(?=b)d|(?=b)$)
			//       (?=D)
			//
			//   (3) (?=(?=b|$)d)
			//       (?=((?=b)|$)d)
			//       (?=(?=b)d|$d)
			//       (?=D)
			//
			//   (4) (?=(?=b|$)(d|$))
			//       (?=((?=b)|$)(d|$))
			//       (?=(?=b)(d|$)|$(d|$))
			//       (?=(?=b)d|(?=b)$|$d|$$)
			//       (?=D|$)
			//
			// As we can see, the look char is always `D` and the edge is only accepted if it's accepted by both.

			const charIntersection = look.char.intersect(item.look.char);
			look = {
				char: charIntersection,
				exact: (look.exact && item.look.exact) || charIntersection.isEmpty,
				edge: look.edge && item.look.edge,
			};
		} else {
			return { char: union.char, exact: union.exact, empty: false };
		}
	}
	return { char: union.char, exact: union.exact, empty: true, look };
}
/**
 * This wraps the first-consumed-char object in a look.
 *
 * @param first
 */
export function firstConsumedToLook(first: Readonly<FirstConsumedChar>): FirstLookChar {
	if (first.empty) {
		// We have 2 cases:
		//   (1) (?=a|(?=b))
		//       (?=a|b)
		//       (?=[ab])
		//   (2) (?=a|(?=b|$))
		//       (?=a|b|$)
		//       (?=[ab]|$)
		const union = new CharUnion(first.char.maximum);
		union.add(first.char, first.exact);
		union.add(first.look.char, first.look.exact);

		return {
			char: union.char,
			exact: union.exact,
			edge: first.look.edge,
		};
	} else {
		// It's already in the correct form:
		//   (?=a)
		return {
			char: first.char,
			exact: first.exact,
			edge: false,
		};
	}
}

export interface FollowOperations<S> {
	/**
	 * Split off a new path from the given one.
	 *
	 * The given state should not be modified. If the state is immutable, then `fork` may be implemented as the identify
	 * function in regard to `state`.
	 */
	fork(state: S, direction: MatchingDirection): S;
	/**
	 * Joins any number but of paths to create a combined path.
	 */
	join(states: S[], direction: MatchingDirection): S;
	/**
	 * This function is called when dealing with assertions.
	 */
	assert?: (state: S, direction: MatchingDirection, assertion: S, assertionDirection: MatchingDirection) => S;

	enter?: (element: NoParent<Element>, state: S, direction: MatchingDirection) => S;
	leave?: (element: NoParent<Element>, state: S, enterState: S, direction: MatchingDirection) => S;
	endPath?: (state: S, direction: MatchingDirection, reason: "expression" | "assertion") => S;

	/**
	 * Whether the current path should go into the given element (return `true`) or whether it should be skipped
	 * (return `false`). If the element is skipped, the given state will not be changed and passed as-is to the `leave`
	 * function.
	 *
	 * You shouldn't modify state in this function. Modify state in the `enter` function instead.
	 */
	continueInto?: (element: NoParent<Element>, state: S, direction: MatchingDirection) => boolean;
	/**
	 * Whether the current path should continue after the given element (return `true`) or whether all elements that
	 * follow this element should be skipped (return `false`).
	 *
	 * If the current path is a fork path, then only the elements until the fork is joined will be skipped. A stopped
	 * fork path will be joined with all other forks like normal.
	 *
	 * You shouldn't modify state in this function. Modify state in the `leave` function instead.
	 */
	continueAfter?: (element: NoParent<Element>, state: S, direction: MatchingDirection) => boolean;
}
/**
 * This function goes to all elements reachable from the given `start`.
 *
 * ## Paths
 *
 * The function uses _paths_ for this. A path is an [execution path](https://en.wikipedia.org/wiki/Symbolic_execution)
 * that is described by a sequence of regex elements.
 *
 * I.e. there are two paths to go from `a` to `b` in the pattern `/a(\w|dd)b/`. The first path is `a \w b` and the
 * second path is `a d d b`.
 *
 * However, the problem with paths is that there can be exponentially many because of combinatorial explosion (e.g. the
 * pattern `/(a|b)(a|b)(a|b)(a|b)(a|b)/` has 32 paths). To solve this problem, this function will _join_ paths together
 * again.
 *
 * I.e. In the pattern `/a(\w|dd)b/`, first element of all paths will be `a`. After `a`, the path splits into two. We
 * call each of the split paths a _fork_. The two forks will be `a ( \w` and `a ( d d`. The `(` is used to indicate that
 * a fork was made. Since both paths come together after the group ends, they will be _joined_. The joined path of
 * `a ( \w` and `a ( d d` will be written as `a ( \w | d d )`. The `)` is used to indicate that forks have been joined.
 * The final path will be `a ( \w | d d ) b`.
 *
 * This method of forking and joining works for alternations but it won't work for quantifiers. This is why quantifiers
 * will be treated as single elements that can be entered. By default, a quantifier `q` will be interpreted as `( q | )`
 * if its minimum is zero and as `( q )` otherwise.
 *
 * ### State
 *
 * Paths are thought of as a sequence of elements and they are represented by state (type parameter `S`). All operations
 * that fork, join, or assert paths will operate on state and not a sequence of elements.
 *
 * State allows flow operations to be implemented more efficiently and ensures that only necessary data is passed
 * around. Flow analysis for paths usually tracks properties and analyses how these properties change, the current
 * values of these properties is state.
 *
 * ## Flow operations
 *
 * Flow operations are specific to the type of the state and act upon the state. The define how the state of paths
 * changes when encountering elements and how paths fork, join, and continue.
 *
 * ### Operation sequence
 *
 * To follow all paths, two operations are necessary: one operations that enters elements and one that determines the
 * next element. These operations will be called `Enter` and `Next` respectively. The operation will call the given
 * flow operations like this:
 *
 * ```txt
 * function Enter(element, state):
 *     operations.enter
 *     if operations.continueInto:
 *         if elementType == GROUP:
 *             operations.join(
 *                 alternatives.map(e => Enter(e, operations.fork(state)))
 *             )
 *         if elementType == QUANTIFIER:
 *             if quantifierMin == 0:
 *                 operations.join([
 *                     state,
 *                     Enter(quantifier, operations.fork(state))
 *                 ])
 *         if elementType == ASSERTION:
 *             operations.assert(
 *                 state,
 *                 operations.join(
 *                     alternatives.map(e => Enter(e, operations.fork(state)))
 *                 )
 *             )
 *     operations.leave
 *     Next(element, state)
 *
 * function Next(element, state):
 *     if operations.continueAfter:
 *         if noNextElement:
 *             operations.endPath
 *         else:
 *             Enter(nextElement, state)
 * ```
 *
 * (This is just simplified pseudo code but the general order of operations will be the same.)
 *
 * ## Runtime
 *
 * If `n` elements can be reached from the given starting element, then the average runtime will be `O(n)` and the
 * worst-case runtime will be `O(n^2)`.
 *
 * @param startPath
 * @param startMode If "enter", then the first element to be entered will be the starting element. If "leave", then the
 * first element to continue after will be the starting element.
 * @param initialState
 * @param operations
 * @param direction
 */
export function followPaths<S>(
	startPath: Path<Element>,
	startMode: "enter" | "next",
	initialState: NonNullable<S>,
	operations: FollowOperations<NonNullable<S>>,
	direction: MatchingDirection
): NonNullable<S> {
	function opEnter(element: NoParent<Element>, state: NonNullable<S>, direction: MatchingDirection): NonNullable<S> {
		state = operations.enter?.(element, state, direction) ?? state;
		const enterState = state;

		const continueInto = operations.continueInto?.(element, state, direction) ?? true;
		if (continueInto) {
			switch (element.type) {
				case "Alternation": {
					state = operations.join(
						element.alternatives.map(a =>
							enterConcatenation(a, operations.fork(state, direction), direction)
						),
						direction
					);
					break;
				}
				case "Assertion": {
					const assertionDirection = toMatchingDirection(element.kind);
					const assertion = operations.join(
						element.alternatives.map(a =>
							enterConcatenation(a, operations.fork(state, direction), assertionDirection)
						),
						assertionDirection
					);
					state = operations.endPath?.(state, assertionDirection, "assertion") ?? state;
					state = operations.assert?.(state, direction, assertion, assertionDirection) ?? state;
					break;
				}
				case "Quantifier": {
					if (element.max === 0) {
						// do nothing
					} else {
						const paths = element.alternatives.map(a =>
							enterConcatenation(a, operations.fork(state, direction), direction)
						);
						if (element.min === 0) {
							paths.push(state);
						}
						state = operations.join(paths, direction);
					}
					break;
				}
			}
		}

		state = operations.leave?.(element, state, enterState, direction) ?? state;
		return state;
	}
	function enterConcatenation(
		concat: NoParent<Concatenation>,
		state: NonNullable<S>,
		direction: MatchingDirection
	): NonNullable<S> {
		let i = direction === "ltr" ? 0 : concat.elements.length - 1;
		const increment = direction === "ltr" ? +1 : -1;
		for (; 0 <= i && i < concat.elements.length; i += increment) {
			const element = concat.elements[i];
			state = opEnter(element, state, direction);

			const continueAfter = operations.continueAfter?.(element, state, direction) ?? true;
			if (!continueAfter) {
				break;
			}
		}

		return state;
	}

	function opNext(elementPath: Path<Element>, state: NonNullable<S>, direction: MatchingDirection): NonNullable<S> {
		type NextElement = false | Path<Element> | "expression" | "assertion" | [NoParent<Quantifier>, NextElement];
		function getNextElement(elementPath: Path<Element>): NextElement {
			const element = elementPath.node;
			const continuePath = operations.continueAfter?.(element, state, direction) ?? true;
			if (!continuePath) {
				return false;
			}

			const parentPath: Path<Concatenation> = elementPath.toParentPath();
			const parent = parentPath.node;

			const nextIndex = parent.elements.indexOf(element) + (direction === "ltr" ? +1 : -1);
			const nextElement = parent.elements[nextIndex] as NoParent<Element> | undefined;

			if (nextElement) {
				return parentPath.toChildPath<Element>(nextElement);
			} else {
				const parentParentPath: Path<Parent> = parentPath.toParentPath();
				const parentParent: NoParent<Parent> = parentParentPath.node;
				if (parentParent.type === "Expression") {
					return "expression";
				} else if (parentParent.type === "Assertion") {
					return "assertion";
				} else if (parentParent.type === "Alternation") {
					return getNextElement(parentParentPath as Path<Alternation>);
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				} else if (parentParent.type === "Quantifier") {
					// This is difficult.
					// The main problem is that paths coming out of the quantifier might loop back into itself. This means that
					// we have to consider the path that leaves the quantifier and the path that goes back into the quantifier.
					if (parentParent.max <= 1) {
						// Can't loop, so we only have to consider the path going out of the quantifier.
						return getNextElement(parentParentPath as Path<Quantifier>);
					} else {
						return [parentParent, getNextElement(parentParentPath as Path<Quantifier>)];
					}
				}
				throw assertNever(parentParent);
			}
		}

		for (;;) {
			let after = getNextElement(elementPath);
			while (Array.isArray(after)) {
				const [quant, other] = after;
				state = operations.join(
					[state, opEnter(quant, operations.fork(state, direction), direction)],
					direction
				);
				after = other;
			}

			if (after === false) {
				return state;
			} else if (after === "assertion" || after === "expression") {
				state = operations.endPath?.(state, direction, after) ?? state;
				return state;
			} else {
				state = opEnter(after.node, state, direction);
				elementPath = after;
			}
		}
	}

	if (startMode === "enter") {
		initialState = opEnter(startPath.node, initialState, direction);
	}
	return opNext(startPath, initialState, direction);
}

export function getFirstConsumedCharAfter(
	afterThis: Path<Element>,
	direction: MatchingDirection,
	maxCharacter: number
): FirstConsumedChar {
	type State = Readonly<FirstConsumedChar>;
	const result = followPaths<State>(
		afterThis,
		"next",
		firstConsumedCharEmptyWord(maxCharacter),
		{
			fork(state): State {
				return state;
			},
			join(states): State {
				return firstConsumedCharUnion(states, maxCharacter);
			},

			enter(element, state, direction): State {
				const first = getFirstCharConsumedBy(element, direction, maxCharacter);
				return firstConsumedCharConcat([state, first], maxCharacter);
			},

			continueInto(): boolean {
				return false;
			},
			continueAfter(_, state): boolean {
				return state.empty;
			},
		},
		direction
	);

	return result;
}

/**
 * Returns the first character after the given element.
 *
 * What "after" means depends the on the given direction which will be interpreted as the current matching
 * direction. You can use this to get the previous character of an element as well.
 *
 * @param afterThis
 * @param direction
 * @param maxCharacter
 */
export function getFirstCharAfter(
	afterThis: Path<Element>,
	direction: MatchingDirection,
	maxCharacter: number
): FirstLookChar {
	const result = getFirstConsumedCharAfter(afterThis, direction, maxCharacter);
	return firstConsumedToLook(result);
}

export function structurallyEqual(
	a: NoParent<Node> | NoParent<Concatenation>[],
	b: NoParent<Node> | NoParent<Concatenation>[]
): boolean {
	if (Array.isArray(a)) {
		if (Array.isArray(b)) {
			return structurallyEqualAlternatives(a, b);
		} else {
			return false;
		}
	} else if (Array.isArray(b)) {
		return false;
	} else if (a.type !== b.type) {
		return false;
	}

	switch (a.type) {
		case "Alternation":
		case "Expression": {
			const other = b as NoParent<Alternation>;
			return structurallyEqualAlternatives(a.alternatives, other.alternatives);
		}
		case "Assertion": {
			const other = b as NoParent<Assertion>;
			if (a.kind !== other.kind || a.negate !== other.negate) {
				return false;
			}
			return structurallyEqualAlternatives(a.alternatives, other.alternatives);
		}
		case "CharacterClass": {
			const other = b as NoParent<CharacterClass>;
			return a.characters.equals(other.characters);
		}
		case "Concatenation": {
			const other = b as NoParent<Concatenation>;
			const l = a.elements.length;
			if (l !== other.elements.length) {
				return false;
			}
			for (let i = 0; i < l; i++) {
				if (!structurallyEqual(a.elements[i], other.elements[i])) {
					return false;
				}
			}
			return true;
		}
		case "Quantifier": {
			const other = b as NoParent<Quantifier>;
			if (a.min !== other.min || a.max !== other.max || a.lazy !== other.lazy) {
				return false;
			}
			return structurallyEqualAlternatives(a.alternatives, other.alternatives);
		}
		case "Unknown": {
			const other = b as NoParent<Unknown>;
			return a.id === other.id;
		}
		default:
			throw assertNever(a);
	}
}
function structurallyEqualAlternatives(a: NoParent<Concatenation>[], b: NoParent<Concatenation>[]): boolean {
	const l = a.length;
	if (l !== b.length) {
		return false;
	}
	for (let i = 0; i < l; i++) {
		if (!structurallyEqual(a[i], b[i])) {
			return false;
		}
	}
	return true;
}

export function structurallyEqualToQuantifiedElement(
	quant: NoParent<Quantifier>,
	element: NoParent<Node> | NoParent<Concatenation>[]
): boolean {
	if (Array.isArray(element)) {
		return structurallyEqualAlternatives(quant.alternatives, element);
	} else if (element.type === "Alternation") {
		return structurallyEqualAlternatives(quant.alternatives, element.alternatives);
	} else if (element.type === "Concatenation") {
		if (element.elements.length === 1) {
			return structurallyEqualToQuantifiedElement(quant, element.elements[0]);
		} else {
			return quant.alternatives.length === 1 && structurallyEqual(quant.alternatives[0], element);
		}
	} else {
		if (quant.alternatives.length === 1) {
			const alt = quant.alternatives[0];
			if (alt.elements.length === 1) {
				return structurallyEqual(alt.elements[0], element);
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}

/**
 * Converts the given value into an alternatives array.
 *
 * @param value
 */
export function toAlternatives(
	value: NoParent<Node> | readonly NoParent<Concatenation>[]
): readonly NoParent<Concatenation>[] {
	if (isReadonlyArray(value)) {
		return value;
	} else {
		switch (value.type) {
			case "Expression":
				return value.alternatives;
			case "Concatenation":
				return [value];
			default:
				return [
					{
						type: "Concatenation",
						elements: [value],
						source: value.source,
					},
				];
		}
	}
}
