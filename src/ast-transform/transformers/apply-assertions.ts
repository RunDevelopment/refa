import { Assertion, CharacterClass, Concatenation, Element, NoParent, Parent } from "../../ast";
import { getFirstCharConsumedBy, MatchingDirection, toMatchingDirection } from "../../ast-analysis";
import { NodePath, Transformer, TransformContext } from "../transformer";
import { assertNever, filterMut } from "../../util";
import { CharSet } from "../../char-set";
import { findFirst } from "../util";

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
		let first;
		while ((first = findFirst(alt.elements, direction, e => e.type !== "Assertion"))) {
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
	}

	const direction = toMatchingDirection(assertion.kind);

	// remove rejecting branches
	eliminateRejectingBranches(assertion, char.characters, direction, context);

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

		const firstIndex = direction === "ltr" ? 0 : elements.length - 1;
		const first = elements[firstIndex];

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

/**
 * This transformer will apply all trivial assertion (e.g. `/(?!0)\d/` => `/[1-9]/`) removes all branches in assertions
 * that are guaranteed to reject (e.g. `(?=\d+=|-)\w` => `(?=\d+=)\w`).
 */
export function applyAssertions(): Transformer {
	return {
		onConcatenation({ node }: NodePath<Concatenation>, context: TransformContext) {
			const elements = node.elements;

			// lookaheads
			for (let i = 1; i < elements.length; i++) {
				const assertion = elements[i - 1];
				const char = elements[i];
				if (
					assertion.type === "Assertion" &&
					assertion.kind === "ahead" &&
					char.type === "CharacterClass" &&
					assertCharacter(assertion, char, context)
				) {
					context.signalMutation();
					elements[i - 1] = char;
					elements[i] = assertion;
				}
			}

			// lookbehinds
			for (let i = elements.length - 1; i > 0; i--) {
				const char = elements[i - 1];
				const assertion = elements[i];
				if (
					assertion.type === "Assertion" &&
					assertion.kind === "behind" &&
					char.type === "CharacterClass" &&
					assertCharacter(assertion, char, context)
				) {
					context.signalMutation();
					elements[i - 1] = assertion;
					elements[i] = char;
				}
			}
		},
	};
}
