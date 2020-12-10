import { Assertion, CharacterClass, Concatenation, Element, Node, NoParent, Parent, Quantifier } from "../../ast";
import {
	getFirstCharConsumedBy,
	isTriviallyAccepting,
	isZeroLength,
	MatchingDirection,
	toMatchingDirection,
} from "../../ast-analysis";
import { Transformer, TransformContext } from "../transformer";
import { assertNever, filterMut } from "../../util";
import { CharSet } from "../../char-set";
import { at, copySource, findFirst, inRange } from "../util";

type SingleCharacterQuantifier = NoParent<Quantifier> & { alternatives: [{ elements: [NoParent<CharacterClass>] }] };
function isSingleCharacterQuantifier(element: NoParent<Node>): element is SingleCharacterQuantifier {
	return (
		element.type === "Quantifier" &&
		element.alternatives.length === 1 &&
		element.alternatives[0].elements.length === 1 &&
		element.alternatives[0].elements[0].type === "CharacterClass"
	);
}

function eliminateRejectingBranches(
	parent: NoParent<Parent>,
	char: CharSet,
	direction: MatchingDirection,
	context: TransformContext
): void {
	const enum EliminationResult {
		REMOVE_BRANCH,
		REMOVE_ELEMENT,
		KEEP,
	}
	function eliminateElement(element: NoParent<Element>): EliminationResult {
		switch (element.type) {
			case "Assertion": {
				return EliminationResult.KEEP;
			}
			case "Alternation": {
				eliminateRejectingBranches(element, char, direction, context);

				if (element.alternatives.length === 0) {
					return EliminationResult.REMOVE_BRANCH;
				} else {
					return EliminationResult.KEEP;
				}
			}
			case "CharacterClass": {
				if (element.characters.isDisjointWith(char)) {
					return EliminationResult.REMOVE_BRANCH;
				} else {
					return EliminationResult.KEEP;
				}
			}
			case "Quantifier": {
				if (element.max === 0) {
					return EliminationResult.REMOVE_ELEMENT;
				} else if (element.max === 1) {
					eliminateRejectingBranches(element, char, direction, context);

					if (element.alternatives.length === 0) {
						if (element.min === 0) {
							return EliminationResult.REMOVE_ELEMENT;
						} else {
							return EliminationResult.REMOVE_BRANCH;
						}
					} else {
						return EliminationResult.KEEP;
					}
				} else {
					const firstChar = getFirstCharConsumedBy(element.alternatives, direction, context.maxCharacter);
					if (!firstChar.empty && firstChar.char.isDisjointWith(char)) {
						if (element.min === 0) {
							return EliminationResult.REMOVE_ELEMENT;
						} else {
							return EliminationResult.REMOVE_BRANCH;
						}
					} else {
						return EliminationResult.KEEP;
					}
				}
			}
			default:
				assertNever(element);
		}
	}

	filterMut(parent.alternatives, alt => {
		let firstElement;
		while ((firstElement = findFirst(alt.elements, direction, e => e.type !== "Assertion"))) {
			const first = firstElement;
			const result = eliminateElement(first);

			if (result === EliminationResult.REMOVE_ELEMENT) {
				// remove & next round
				context.signalMutation();
				const index = alt.elements.indexOf(first);
				alt.elements.splice(index, 1);
				continue;
			} else if (result === EliminationResult.REMOVE_BRANCH) {
				context.signalMutation();
				return false;
			} else {
				if (
					(first.type === "Alternation" ||
						(first.type === "Quantifier" && first.min === 1 && first.max === 1)) &&
					first.alternatives.length === 1
				) {
					// inline & next round
					context.signalMutation();
					const index = alt.elements.indexOf(first);
					alt.elements.splice(index, 1, ...first.alternatives[0].elements);
					continue;
				} else {
					return true;
				}
			}
		}
		return true;
	});
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
	eliminateRejectingBranches(assertion, char.characters, direction, context);

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

			const firstIndex = direction === "ltr" ? 0 : -1;
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

type CharConvertible = NoParent<CharacterClass> | SingleCharacterQuantifier;
function findNextCharConvertible(
	elements: readonly NoParent<Element>[],
	start: number,
	inc: 1 | -1
): CharConvertible | undefined {
	for (let j = start; inRange(elements, j); j += inc) {
		const element = at(elements, j);
		if (element.type === "CharacterClass" || (isSingleCharacterQuantifier(element) && element.min >= 1)) {
			return element;
		} else if (!isZeroLength(element)) {
			break;
		}
	}
	return undefined;
}

function toChar(convertible: CharConvertible): NoParent<CharacterClass> {
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
 * This transformer will apply all trivial assertion (e.g. `/(?!0)\d/` => `/[1-9]/`) removes all branches in assertions
 * that are guaranteed to reject (e.g. `(?=\d+=|-)\w` => `(?=\d+=)\w`).
 */
export function applyAssertions(): Transformer {
	return {
		onConcatenation(node: NoParent<Concatenation>, context: TransformContext) {
			const elements = node.elements;

			function applyKind(kind: Assertion["kind"]): void {
				const direction = toMatchingDirection(kind);

				const firstIndex = direction === "ltr" ? 0 : -1;
				const inc = direction === "ltr" ? +1 : -1;

				for (let i = firstIndex; inRange(elements, i); i += inc) {
					const assertion = at(elements, i);
					if (assertion.type !== "Assertion" || assertion.kind !== kind) {
						continue;
					}

					const charConvertible = findNextCharConvertible(elements, i + inc, inc);
					if (charConvertible === undefined) {
						continue;
					}

					const char = toChar(charConvertible);
					if (assertCharacter(assertion, char, context)) {
						context.signalMutation();

						// remove the assertion
						elements.splice(i, 1);
						i -= inc;

						const replacement: NoParent<Element>[] = [char];
						if (!isTriviallyAccepting(assertion)) {
							replacement.push(assertion);
						}
						if (charConvertible.type === "Quantifier") {
							charConvertible.min--;
							charConvertible.max--;

							replacement.push(charConvertible);
						}

						if (kind === "behind") {
							replacement.reverse();
						}

						const charConvertibleIndex = elements.indexOf(charConvertible);
						elements.splice(charConvertibleIndex, 1, ...replacement);
					}
				}
			}

			applyKind("ahead");
			applyKind("behind");
		},
	};
}
