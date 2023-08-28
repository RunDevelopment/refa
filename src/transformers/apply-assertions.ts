import {
	Alternation,
	Assertion,
	CharacterClass,
	Concatenation,
	Element,
	NoParent,
	Quantifier,
	TransformContext,
	Transformer,
} from "../ast";
import {
	MatchingDirection,
	alwaysConsumesCharacters,
	getFirstCharConsumedBy,
	isTriviallyAccepting,
	isZeroLength,
	toMatchingDirection,
} from "../ast-analysis";
import { CharSet } from "../char-set";
import { filterMut } from "../util";
import { CreationOptions } from "./creation-options";
import {
	SingleCharacterParent,
	at,
	copyNode,
	copySource,
	firstIndexFor,
	inRange,
	incrementFor,
	isSingleCharacterParent,
	lastIndexFor,
	setAt,
	tryRemoveRejectingAssertionBranches,
} from "./util";

function withDirection<T>(direction: MatchingDirection, arr: T[]): T[] {
	if (direction === "rtl") {
		arr.reverse();
	}
	return arr;
}
function pushBack<T>(direction: MatchingDirection, arr: T[], value: T): void {
	if (direction === "ltr") {
		arr.push(value);
	} else {
		arr.unshift(value);
	}
}
function pushFront<T>(direction: MatchingDirection, arr: T[], value: T): void {
	if (direction === "ltr") {
		arr.unshift(value);
	} else {
		arr.push(value);
	}
}

enum AssertCharacterResult {
	/** Nothing changed. */
	FAILED,
	/**
	 * The character has been successfully asserted and the assertion and character have been adjusted
	 * accordingly. The assertions should now be moved behind the character.
	 */
	MOVE_ASSERTION,
	/**
	 * The character has been successfully asserted and the assertion and character have been adjusted
	 * accordingly. The assertions should stay in place.
	 */
	KEEP_ASSERTION,
}

/**
 * This function is the meat of this transformer.
 *
 * Given an assertion and a character, this function will let the assertion assert the given character. If the function
 * returns `true`, the character has been successfully asserted and the assertion and character have been adjusted
 * accordingly. If `false` is returned, nothing has been changed.
 *
 * @param assertion
 * @param char
 * @param context
 */
function assertCharacter(
	assertion: NoParent<Assertion>,
	char: NoParent<CharacterClass>,
	context: TransformContext
): AssertCharacterResult {
	const direction = toMatchingDirection(assertion.kind);

	// remove rejecting branches
	if (tryRemoveRejectingAssertionBranches(assertion, char.characters, false, direction, context.maxCharacter)) {
		context.signalMutation();
	}

	if (assertion.negate) {
		// In general, it's not possible to apply negated assertions without negating the language of the assertion.

		// The key insight here is that (?!foo|bar) == (?!foo)(?!bar) == (?!bar)(?!foo). So we can apply the
		// alternatives one by one.
		const toRemove = new Set<NoParent<Concatenation>>();
		for (const alternative of assertion.alternatives) {
			if (alternative.elements.length === 1) {
				const single = alternative.elements[0];
				if (single.type === "CharacterClass") {
					// e.g. (?!a)\w => [0-9A-Zb-z_]
					char.characters = char.characters.without(single.characters);
					context.signalMutation();
					toRemove.add(alternative);
				}
			}
		}

		if (toRemove.size > 0) {
			assertion.alternatives = assertion.alternatives.filter(alt => !toRemove.has(alt));
			context.signalMutation();
			return AssertCharacterResult.KEEP_ASSERTION;
		}

		if (assertion.alternatives.length === 1) {
			const { elements } = assertion.alternatives[0];
			if (elements.length === 0) {
				return AssertCharacterResult.FAILED;
			}

			const firstIndex = firstIndexFor(direction);
			const first = at(elements, firstIndex);

			if (first.type === "CharacterClass") {
				if (first.characters.isSupersetOf(char.characters)) {
					// e.g. (?!\wbc)a => a(?!bc)
					context.signalMutation();
					elements.splice(firstIndex, 1);
					return AssertCharacterResult.MOVE_ASSERTION;
				}
			}
		}

		return AssertCharacterResult.FAILED;
	} else {
		if (assertion.alternatives.length !== 1) {
			// It's not possible to do the intersection with more than 1 branches without increasing the number of nodes in
			// the regex.
			// Example: /(?=\wa|\db)\w\w/
			return AssertCharacterResult.FAILED;
		} else {
			const { elements } = assertion.alternatives[0];
			if (elements.length === 0) {
				return AssertCharacterResult.FAILED;
			}

			const firstIndex = firstIndexFor(direction);
			const first = at(elements, firstIndex);

			if (first.type === "CharacterClass") {
				const intersection = first.characters.intersect(char.characters);
				if (intersection.isEmpty) {
					throw new Error("Rejecting branch wasn't removed properly.");
				} else {
					context.signalMutation();
					char.characters = intersection;
					elements.splice(firstIndex, 1);
					return AssertCharacterResult.MOVE_ASSERTION;
				}
			}

			return AssertCharacterResult.FAILED;
		}
	}
}

type CharConvertible = NoParent<CharacterClass> | SingleCharacterParent<Quantifier>;
function isCharConvertible(element: NoParent<Element>): element is CharConvertible {
	return (
		element.type === "CharacterClass" ||
		(element.type === "Quantifier" && element.min >= 1 && isSingleCharacterParent(element))
	);
}
function findNextCharConvertible(
	elements: readonly NoParent<Element>[],
	start: number,
	inc: 1 | -1
): CharConvertible | undefined {
	for (let j = start; inRange(elements, j); j += inc) {
		const element = at(elements, j);
		if (isCharConvertible(element)) {
			return element;
		} else if (!isZeroLength(element)) {
			break;
		}
	}
	return undefined;
}
function getCharacters(convertible: CharConvertible): CharSet {
	if (convertible.type === "CharacterClass") {
		return convertible.characters;
	} else {
		return convertible.alternatives[0].elements[0].characters;
	}
}
function toCharElement(convertible: CharConvertible): NoParent<CharacterClass> {
	if (convertible.type === "CharacterClass") {
		return convertible;
	} else {
		const char = convertible.alternatives[0].elements[0];
		return {
			type: "CharacterClass",
			characters: char.characters,
			source: copySource(char.source),
		};
	}
}

/**
 * This will apply assertions one character at a time. E.g. `(?=\da)\w\w` => `\d(?=a)\w` => `\da`.
 *
 * @param elements
 * @param kind
 * @param context
 */
function applyOneCharacter(elements: NoParent<Element>[], kind: Assertion["kind"], context: TransformContext): void {
	if (elements.length < 2) {
		return;
	}

	const direction = toMatchingDirection(kind);

	const firstIndex = firstIndexFor(direction);
	const inc = incrementFor(direction);

	for (let i = firstIndex; inRange(elements, i); i += inc) {
		const assertion = at(elements, i);
		if (assertion.type !== "Assertion" || assertion.kind !== kind) {
			continue;
		}

		const charConvertible = findNextCharConvertible(elements, i + inc, inc);
		if (charConvertible === undefined) {
			continue;
		}

		const char = toCharElement(charConvertible);
		const result = assertCharacter(assertion, char, context);
		const triviallyAccepting = isTriviallyAccepting(assertion);

		if (result === AssertCharacterResult.FAILED) {
			if (triviallyAccepting) {
				// remove the assertion
				context.signalMutation();
				elements.splice(i, 1);
				i -= inc;
			}
		} else {
			context.signalMutation();

			if (result === AssertCharacterResult.MOVE_ASSERTION || triviallyAccepting) {
				// remove the assertion
				elements.splice(i, 1);
				i -= inc;
			}

			const replacement: NoParent<Element>[] = [char];
			if (!triviallyAccepting && result === AssertCharacterResult.MOVE_ASSERTION) {
				pushBack(direction, replacement, assertion);
			}
			if (charConvertible.type === "Quantifier") {
				charConvertible.min--;
				charConvertible.max--;

				pushBack(direction, replacement, charConvertible);
			}

			elements.splice(elements.indexOf(charConvertible), 1, ...replacement);
		}
	}
}

/**
 * This will remove optional branches that are know to reject because of assertions. E.g. `(?=\d)\s*\w+` => `(?=\d)\w+`.
 *
 * @param elements
 * @param kind
 * @param context
 */
function removeRejectedBranches(
	elements: NoParent<Element>[],
	kind: Assertion["kind"],
	context: TransformContext
): void {
	if (elements.length < 2) {
		return;
	}

	const direction = toMatchingDirection(kind);

	const firstIndex = firstIndexFor(direction);
	const inc = incrementFor(direction);

	function findNextParent(startIndex: number): NoParent<Alternation | Quantifier> | undefined {
		for (let j = startIndex; inRange(elements, j); j += inc) {
			const element = at(elements, j);
			if (isZeroLength(element)) {
				// continue
			} else if (element.type === "Quantifier" || element.type === "Alternation") {
				return element;
			} else {
				break;
			}
		}
		return undefined;
	}

	for (let i = firstIndex; inRange(elements, i); i += inc) {
		const assertion = at(elements, i);
		if (assertion.type !== "Assertion" || assertion.kind !== kind) {
			continue;
		}
		if (assertion.negate && !isSingleCharacterParent(assertion)) {
			// Only single-character negated assertion can trivially negated
			continue;
		}

		const parentElement = findNextParent(i + inc);
		if (parentElement === undefined) {
			continue;
		}

		const firstChar = getFirstCharConsumedBy(assertion.alternatives, direction, context.maxCharacter);
		if (firstChar.empty) {
			continue;
		}
		const char = assertion.negate ? firstChar.char.negate() : firstChar.char;
		const edge = assertion.negate;

		if (parentElement.type === "Quantifier" && parentElement.min === 0) {
			const parentElementFirst = getFirstCharConsumedBy(
				parentElement.alternatives,
				direction,
				context.maxCharacter
			);

			if (!parentElementFirst.empty && parentElementFirst.char.isDisjointWith(char)) {
				// remove element
				context.signalMutation();
				elements.splice(elements.indexOf(parentElement), 1);
				continue;
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (parentElement.type === "Alternation" || (parentElement.type === "Quantifier" && parentElement.max === 1)) {
			if (tryRemoveRejectingAssertionBranches(parentElement, char, edge, direction, context.maxCharacter)) {
				context.signalMutation();
			}
		}
	}
}

/**
 * This will transform `(?=a).*` => `(?:(?=a).+|(?=a))`.
 *
 * @param elements
 * @param kind
 * @param context
 */
function applySingleCharacterAssertion(
	elements: NoParent<Element>[],
	kind: Assertion["kind"],
	context: TransformContext
): void {
	if (elements.length < 2) {
		return;
	}

	const direction = toMatchingDirection(kind);

	const firstIndex = firstIndexFor(direction);
	const inc = incrementFor(direction);

	for (let i = firstIndex + inc; inRange(elements, i); i += inc) {
		const assertionIndex = i - inc;
		const assertion = at(elements, assertionIndex);
		if (assertion.type !== "Assertion" || assertion.kind !== kind || !isSingleCharacterParent(assertion)) {
			continue;
		}

		const quantifierIndex = i;
		const quantifier = at(elements, quantifierIndex);
		if (
			quantifier.type !== "Quantifier" ||
			!(quantifier.min === 0 && quantifier.max > 0) ||
			!alwaysConsumesCharacters(quantifier.alternatives)
		) {
			continue;
		}

		// adjust quantifier
		context.signalMutation();
		quantifier.min++;

		// `(?=a).*` => `(?:(?=a).+|(?=a))`
		// `(?=a).*?` => `(?:(?=a)|(?=a).+?)`
		const group: NoParent<Alternation> = {
			type: "Alternation",
			alternatives: [
				{ type: "Concatenation", elements: withDirection(direction, [copyNode(assertion), quantifier]) },
				{ type: "Concatenation", elements: [assertion] },
			],
		};
		if (quantifier.lazy) {
			group.alternatives.reverse();
		}

		setAt(elements, assertionIndex, group);
		elements.splice(quantifierIndex, 1);
	}
}

/**
 * This will transform `(?:\S[^]*|(?!\s))a` => `(?:\S[^]*a|a)`.
 *
 * @param elements
 * @param kind
 * @param context
 */
function moveCharacterIntoAlternation(
	elements: NoParent<Element>[],
	kind: Assertion["kind"],
	context: TransformContext
): void {
	if (elements.length < 2) {
		return;
	}

	const direction = toMatchingDirection(kind);

	const firstIndex = firstIndexFor(direction);
	const inc = incrementFor(direction);

	for (let i = firstIndex + inc; inRange(elements, i); i += inc) {
		const alternationIndex = i - inc;
		const alternation = at(elements, alternationIndex);
		if (alternation.type !== "Alternation") {
			continue;
		}

		const charConvertibleIndex = i;
		const nextElement = at(elements, charConvertibleIndex);
		let charConvertible: CharConvertible;
		if (isCharConvertible(nextElement)) {
			// TS incorrectly narrows down the type and the `as any` will get rid of that
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			charConvertible = nextElement as any;
		} else {
			continue;
		}
		const char = getCharacters(charConvertible);

		const appendChars = new Map<NoParent<Concatenation>, CharSet>();
		filterMut(alternation.alternatives, alternative => {
			const assertionIndex = lastIndexFor(direction);
			const assertion = at(alternative.elements, assertionIndex);
			if (
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				assertion !== undefined &&
				assertion.type === "Assertion" &&
				assertion.kind === kind &&
				isSingleCharacterParent(assertion)
			) {
				const rawChar = assertion.alternatives[0].elements[0].characters;
				const assertionChar = assertion.negate ? rawChar.negate() : rawChar;

				if (assertionChar.isDisjointWith(char)) {
					// remove alternative (trivial reject)
					context.signalMutation();
					return false;
				} else if (char.isSubsetOf(assertionChar)) {
					// remove assertion (trivial accept)
					context.signalMutation();
					alternative.elements.splice(assertionIndex, 1);
					return true;
				} else {
					// append intersected character
					context.signalMutation();
					alternative.elements.splice(assertionIndex, 1);
					appendChars.set(alternative, assertionChar.intersect(char));
					return true;
				}
			} else {
				return true;
			}
		});

		if (appendChars.size > 0) {
			context.signalMutation();

			for (const alt of alternation.alternatives) {
				pushBack<NoParent<Element>>(direction, alt.elements, {
					type: "CharacterClass",
					characters: appendChars.get(alt) ?? char,
				});
			}

			if (charConvertible.type === "CharacterClass") {
				elements.splice(charConvertibleIndex, 1);
			} else {
				charConvertible.min--;
				charConvertible.max--;
			}
		}
	}
}

/**
 * This will transform `(?!\d)(?:\w+|:|123)` => `(?:(?!\d)\w+|:|[])` and
 * `(?!\d)(?:\w+|:|123)+` => `(?:(?!\d)\w+|:|[])(?:\w+|:|123)*`.
 *
 * @param elements
 * @param kind
 * @param context
 */
function moveAssertionIntoAlternation(
	elements: NoParent<Element>[],
	kind: Assertion["kind"],
	context: TransformContext
): void {
	if (elements.length < 2) {
		return;
	}

	const direction = toMatchingDirection(kind);

	const firstIndex = firstIndexFor(direction);
	const inc = incrementFor(direction);

	for (let i = firstIndex + inc; inRange(elements, i); i += inc) {
		const assertionIndex = i - inc;
		const assertion = at(elements, assertionIndex);
		if (assertion.type !== "Assertion" || assertion.kind !== kind || !isSingleCharacterParent(assertion)) {
			continue;
		}

		const assertionRawChar = assertion.alternatives[0].elements[0].characters;
		const assertionChar = assertion.negate ? assertionRawChar.negate() : assertionRawChar;

		const alternationIndex = i;
		const element = at(elements, alternationIndex);
		let alternation: NoParent<Alternation>;
		if (element.type === "Alternation" && !isZeroLength(element)) {
			alternation = element;

			// remove assertion
			context.signalMutation();
			elements.splice(assertionIndex, 1);
		} else if (
			element.type === "Quantifier" &&
			element.min >= 1 &&
			alwaysConsumesCharacters(element) &&
			// we already handle this simple case elsewhere
			!isSingleCharacterParent(element)
		) {
			// convert `(?:a|b)+` => `(?:(?:a|b)(?:a|b)*)` and then use the new alternation
			const quant = element;
			quant.min--;
			quant.max--;
			alternation = {
				type: "Alternation",
				alternatives: copyNode(quant).alternatives,
				source: copySource(quant.source),
			};
			const replacement = [alternation, quant];
			if (direction === "rtl") {
				replacement.reverse();
			}
			context.signalMutation();
			elements.splice(alternationIndex, 1, ...replacement);

			// remove assertion
			context.signalMutation();
			elements.splice(elements.indexOf(assertion), 1);
		} else {
			continue;
		}

		// move it into alternatives
		filterMut(alternation.alternatives, alt => {
			const firstChar = getFirstCharConsumedBy(alt, direction, context.maxCharacter);
			if (!firstChar.empty) {
				if (firstChar.char.isDisjointWith(assertionChar)) {
					// trivial reject
					return false;
				} else if (firstChar.char.isSubsetOf(assertionChar)) {
					// trivial accept
					return true;
				}
			}

			pushFront(direction, alt.elements, copyNode(assertion));
			return true;
		});
	}
}

/**
 * This transformer will apply all trivial assertion (e.g. `/(?!0)\d/` => `/[1-9]/`) and remove all branches in
 * assertions that are guaranteed to reject (e.g. `(?=\d+=|-)\w` => `(?=\d+=)\w`).
 *
 * @param _options
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function applyAssertions(_options?: Readonly<CreationOptions>): Transformer {
	return {
		onConcatenation(node: NoParent<Concatenation>, context: TransformContext) {
			const elements = node.elements;

			applySingleCharacterAssertion(elements, "ahead", context);
			applySingleCharacterAssertion(elements, "behind", context);

			moveAssertionIntoAlternation(elements, "ahead", context);
			moveAssertionIntoAlternation(elements, "behind", context);

			applyOneCharacter(elements, "ahead", context);
			applyOneCharacter(elements, "behind", context);

			removeRejectedBranches(elements, "ahead", context);
			removeRejectedBranches(elements, "behind", context);

			moveCharacterIntoAlternation(elements, "ahead", context);
			moveCharacterIntoAlternation(elements, "behind", context);
		},
	};
}
