import { Assertion, Concatenation, NoParent } from "../../ast";
import {
	getFirstCharAfter,
	getFirstCharConsumedBy,
	getLengthRange,
	hasSomeDescendant,
	isPotentiallyEmpty,
	toMatchingDirection,
} from "../../ast-analysis";
import { emptyAlternation, toPath } from "../util";
import { NodePath, Transformer, TransformContext } from "../transformer";

const enum Result {
	ACCEPT,
	REJECT,
	DEPENDS_ON_INPUT,
}
function analyzeAssertion(
	parentPath: NodePath<Concatenation>,
	assertion: NoParent<Assertion>,
	maxCharacter: number
): Result {
	// the idea here is that a negate lookaround accepts when non-negated version reject and vise versa.
	const ACCEPT = assertion.negate ? Result.REJECT : Result.ACCEPT;
	const REJECT = assertion.negate ? Result.ACCEPT : Result.REJECT;

	if (assertion.alternatives.length === 0) {
		// the body of the assertion can never accept any input string
		return REJECT;
	} else if (isPotentiallyEmpty(assertion.alternatives)) {
		// the body of the assertion can always accept any input string
		return ACCEPT;
	} else {
		// Now that the easy trivial cases are over, we have to be a little more clever. The basic idea here is that we
		// compare the first character that the regex consumes before/after the assertion can compare that character
		// with the first character the assertion asserts. This will filter out a lot of trivial assertions.

		const direction = toMatchingDirection(assertion.kind);
		const after = getFirstCharAfter(toPath(parentPath, assertion), direction, maxCharacter);
		if (after.edge) {
			return Result.DEPENDS_ON_INPUT;
		}

		const firstOf = getFirstCharConsumedBy(assertion.alternatives, direction, maxCharacter);
		if (firstOf.empty) {
			return Result.DEPENDS_ON_INPUT;
		}

		// Careful now! If exact is false, we are only guaranteed to have a superset of the actual character.
		// False negatives are fine but we can't have false positives.

		if (after.char.isDisjointWith(firstOf.char)) {
			return REJECT;
		}

		// accept is harder because that can't generally be decided by the first character

		// if this contains another assertion then that might reject. It's out of our control
		if (!hasSomeDescendant(assertion, d => d !== assertion && d.type === "Assertion")) {
			const range = getLengthRange(assertion.alternatives);
			// we only check the first character, so it's only correct if the assertion requires only one
			// character
			if (range && range.max === 1) {
				// require exactness
				if (firstOf.exact && after.char.isSubsetOf(firstOf.char)) {
					return ACCEPT;
				}
			}
		}

		return Result.DEPENDS_ON_INPUT;
	}
}

/**
 * This will remove all assertions that are known to always reject/accept no matter the input string.
 */
export function removeUnnecessaryAssertions(): Transformer {
	return {
		onConcatenation(path: NodePath<Concatenation>, { signalMutation, maxCharacter }: TransformContext) {
			const { node } = path;

			for (let i = 0; i < node.elements.length; i++) {
				const current = node.elements[i];
				if (current.type === "Assertion") {
					const result = analyzeAssertion(path, current, maxCharacter);
					if (result === Result.ACCEPT) {
						// remove assertion
						node.elements.splice(i, 1);
						signalMutation();
						i--;
					} else if (result === Result.REJECT) {
						node.elements = [emptyAlternation()];
						signalMutation();
						break;
					} else {
						// do nothing
					}
				}
			}
		},
	};
}
