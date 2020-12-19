import { Alternation, Assertion, CharacterClass, Concatenation, Element, NoParent, Quantifier } from "../../ast";
import {
	getFirstCharConsumedBy,
	isTriviallyAccepting,
	isZeroLength,
	MatchingDirection,
	toMatchingDirection,
} from "../../ast-analysis";
import { CharSet } from "../../char-set";
import { filterMut } from "../../util";
import { Transformer, TransformContext } from "../transformer";
import {
	at,
	copyNode,
	copySource,
	firstIndexFor,
	incrementFor,
	inRange,
	lastIndexFor,
	setAt,
	SingleCharacterParent,
	isSingleCharacterParent,
	tryRemoveRejectingAssertionBranches,
} from "../util";

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

/**
 * This function is the meat of this transformer.
 *
 * Given an assertion and a character, this function will let the assertion assert the given character. If the function
 * returns `true`, the character has been successfully asserted and the assertion and character have been adjusted
 * accordingly. If `false` is returned, nothing has been changed.
 *
 * @param assertion
 * @param char
 */
function assertCharacter(
	assertion: NoParent<Assertion>,
	char: NoParent<CharacterClass>,
	context: TransformContext
): boolean {
	const direction = toMatchingDirection(assertion.kind);

	// remove rejecting branches
	if (tryRemoveRejectingAssertionBranches(assertion, char.characters, false, direction, context.maxCharacter)) {
		context.signalMutation();
	}

	if (assertion.negate) {
		// In general, it's not possible to apply negated assertions without negating the language of the assertion.

		if (assertion.alternatives.length === 1 && assertion.alternatives[0].elements.length === 1) {
			const single = assertion.alternatives[0].elements[0];
			if (single.type === "CharacterClass") {
				// e.g. (?!a)\w => [0-9A-Zb-z_]
				char.characters = char.characters.without(single.characters);
				assertion.alternatives = [];
				context.signalMutation();
				return true;
			}
		}

		return false;
	} else {
		if (assertion.alternatives.length !== 1) {
			// It's not possible to do the intersection with more than 1 branches without increasing the number of nodes in
			// the regex.
			// Example: /(?=\wa|\db)\w\w/
			return false;
		} else {
			const { elements } = assertion.alternatives[0];
			if (elements.length === 0) {
				return false;
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
					return true;
				}
			}

			return false;
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
		if (assertCharacter(assertion, char, context)) {
			context.signalMutation();

			// remove the assertion
			elements.splice(i, 1);
			i -= inc;

			const replacement: NoParent<Element>[] = [char];
			if (!isTriviallyAccepting(assertion)) {
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

		if (parentElement.type === "Alternation" || (parentElement.type === "Quantifier" && parentElement.max === 1)) {
			if (tryRemoveRejectingAssertionBranches(parentElement, char, edge, direction, context.maxCharacter)) {
				context.signalMutation();
			}
		}
	}
}

/**
 * This will transform `(?!\s)[^]*` => `(?:\S[^]*|(?!\s))`.
 */
function applySingleCharacterQuantifier(
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

		const quantifierIndex = i;
		const quantifier = at(elements, quantifierIndex);
		if (
			quantifier.type !== "Quantifier" ||
			!(quantifier.min === 0 && quantifier.max > 0) ||
			!isSingleCharacterParent(quantifier)
		) {
			continue;
		}
		const quantifierChar = quantifier.alternatives[0].elements[0].characters;

		// adjust quantifier
		context.signalMutation();
		quantifier.max -= 1;

		// `(?=a)[^]*` => `(?:a[^]*|(?=a))`
		setAt(elements, assertionIndex, {
			type: "Alternation",
			alternatives: [
				{
					type: "Concatenation",
					elements: withDirection<NoParent<Element>>(direction, [
						{ type: "CharacterClass", characters: quantifierChar.intersect(assertionChar) },
						quantifier,
					]),
				},
				{ type: "Concatenation", elements: [assertion] },
			],
		});
		elements.splice(quantifierIndex, 1);
	}
}

/**
 * This will transform `(?:\S[^]*|(?!\s))a` => `(?:\S[^]*a|a)`.
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
				assertion &&
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
 * This will transform `(?!\d)(?:\w+|:|123)` => `(?:(?!\d)\w+|:|[])`.
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

		const alternationIndex = i;
		const alternation = at(elements, alternationIndex);
		if (alternation.type !== "Alternation") {
			continue;
		}

		const assertionRawChar = assertion.alternatives[0].elements[0].characters;
		const assertionChar = assertion.negate ? assertionRawChar.negate() : assertionRawChar;

		const toAdd: NoParent<Concatenation>[] = [];
		let canApply = false;
		filterMut(alternation.alternatives, alt => {
			const firstChar = getFirstCharConsumedBy(alt, direction, context.maxCharacter);
			if (!firstChar.empty) {
				if (firstChar.char.isDisjointWith(assertionChar)) {
					// trivial reject
					context.signalMutation();
					return false;
				} else if (firstChar.char.isSubsetOf(assertionChar)) {
					// trivial accept
					return true;
				}
			}

			if (alt.elements.length > 0 && isCharConvertible(at(alt.elements, firstIndex))) {
				canApply = true;
			}

			toAdd.push(alt);
			return true;
		});

		if (toAdd.length > 0 && (toAdd.length < alternation.alternatives.length || canApply)) {
			context.signalMutation();
			elements.splice(assertionIndex, 1);

			pushFront(direction, toAdd[0].elements, assertion);
			for (let i = 1; i < toAdd.length; i++) {
				pushFront(direction, toAdd[i].elements, copyNode(assertion));
			}
		}
	}
}

/**
 * This transformer will apply all trivial assertion (e.g. `/(?!0)\d/` => `/[1-9]/`) and remove all branches in
 * assertions that are guaranteed to reject (e.g. `(?=\d+=|-)\w` => `(?=\d+=)\w`).
 */
export function applyAssertions(): Transformer {
	return {
		onConcatenation(node: NoParent<Concatenation>, context: TransformContext) {
			const elements = node.elements;

			moveAssertionIntoAlternation(elements, "ahead", context);
			moveAssertionIntoAlternation(elements, "behind", context);

			applyOneCharacter(elements, "ahead", context);
			applyOneCharacter(elements, "behind", context);

			removeRejectedBranches(elements, "ahead", context);
			removeRejectedBranches(elements, "behind", context);

			applySingleCharacterQuantifier(elements, "ahead", context);
			applySingleCharacterQuantifier(elements, "behind", context);

			moveCharacterIntoAlternation(elements, "ahead", context);
			moveCharacterIntoAlternation(elements, "behind", context);
		},
	};
}
