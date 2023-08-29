import {
	Assertion,
	Concatenation,
	Element,
	Expression,
	NoParent,
	Node,
	Parent,
	TransformContext,
	Transformer,
	visitAst,
} from "../ast";
import {
	FirstLookChar,
	MatchingDirection,
	firstConsumedToLook,
	getFirstCharAfter,
	getFirstCharConsumedBy,
	getLengthRange,
	hasSomeDescendant,
	invertMatchingDirection,
	isPotentiallyEmpty,
	stackPath,
	toMatchingDirection,
} from "../ast-analysis";
import {
	SingleCharacterParent,
	at,
	emptyAlternation,
	firstIndexFor,
	inRange,
	incrementFor,
	isSingleCharacterParent,
	tryRemoveRejectingAssertionBranches,
} from "./util";
import { CharSet } from "../char-set";
import { CreationOptions } from "./creation-options";

const enum Result {
	ACCEPT,
	REJECT,
	DEPENDS,
}
/**
 * Returns whether the assertion always trivially accepts/rejects no matter the input string and surrounding assertions.
 *
 * @param assertion
 */
function getTrivialResult(assertion: NoParent<Assertion>): Result {
	// the idea here is that a negate assertion accepts when non-negated version reject and vise versa.
	const ACCEPT = assertion.negate ? Result.REJECT : Result.ACCEPT;
	const REJECT = assertion.negate ? Result.ACCEPT : Result.REJECT;

	if (assertion.alternatives.length === 0) {
		// the body of the assertion can never accept any input string
		return REJECT;
	} else if (isPotentiallyEmpty(assertion.alternatives)) {
		// the body of the assertion can always accept any input string
		return ACCEPT;
	} else {
		return Result.DEPENDS;
	}
}
/**
 * Returns whether the assertion always trivially accepts/rejects because the next character after it is known.
 *
 * @param assertion
 * @param after
 * @param context
 */
function getTrivialResultWithAfter(
	assertion: NoParent<Assertion>,
	after: FirstLookChar,
	context: TransformContext
): Result {
	// the idea here is that a negate assertion accepts when non-negated version reject and vise versa.
	const ACCEPT = assertion.negate ? Result.REJECT : Result.ACCEPT;
	const REJECT = assertion.negate ? Result.ACCEPT : Result.REJECT;

	const direction = toMatchingDirection(assertion.kind);

	if (tryRemoveRejectingAssertionBranches(assertion, after.char, after.edge, direction, context.maxCharacter)) {
		context.signalMutation();

		if (assertion.alternatives.length === 0) {
			// the body of the assertion can never accept any input string
			return REJECT;
		}
	}

	if (after.edge) {
		return Result.DEPENDS;
	}

	const firstOf = getFirstCharConsumedBy(assertion.alternatives, direction, context.maxCharacter);
	if (firstOf.empty) {
		return Result.DEPENDS;
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

	return Result.DEPENDS;
}
/**
 * Returns whether the assertion always trivially accepts/rejects because of a single neighboring assertion
 * no matter the input string.
 *
 * @param concatStack
 * @param assertion
 * @param context
 */
function getTrivialResultBecauseOfNeighbor(
	concatStack: readonly NoParent<Node>[],
	assertion: NoParent<Assertion>,
	context: TransformContext
): Result {
	const parent = concatStack[concatStack.length - 1];
	if (parent.type !== "Concatenation") {
		throw new Error("Assertion is not a child of a concatenation");
	}

	const direction = toMatchingDirection(assertion.kind);

	const index = parent.elements.indexOf(assertion);
	const inc = incrementFor(invertMatchingDirection(direction));

	// the description of this function says "neighboring assertion", but we actually only need to check
	// the neighbors in the opposite direction of the assertion. The other direction is check by the
	// character check in `analyzeAssertion`
	for (let i = index + inc; i >= 0 && i < parent.elements.length; i += inc) {
		const element = parent.elements[i];
		if (element.type !== "Assertion") {
			break;
		}
		if (element.kind !== assertion.kind || element.negate) {
			continue;
		}

		const after = firstConsumedToLook(
			getFirstCharConsumedBy(element.alternatives, direction, context.maxCharacter)
		);
		const result = getTrivialResultWithAfter(assertion, after, context);
		if (result !== Result.DEPENDS) {
			return result;
		}
	}

	return Result.DEPENDS;
}
function analyzeAssertion(
	concatStack: readonly NoParent<Node>[],
	assertion: NoParent<Assertion>,
	context: TransformContext
): Result {
	const trivial = getTrivialResult(assertion);
	if (trivial !== Result.DEPENDS) {
		return trivial;
	}
	const trivialNeighbor = getTrivialResultBecauseOfNeighbor(concatStack, assertion, context);
	if (trivialNeighbor !== Result.DEPENDS) {
		return trivial;
	}

	// Now that the easy trivial cases are over, we have to be a little more clever. The basic idea here is that we
	// compare the first character that the regex consumes before/after the assertion can compare that character
	// with the first character the assertion asserts. This will filter out a lot of trivial assertions.

	const direction = toMatchingDirection(assertion.kind);
	const after = getFirstCharAfter(stackPath(concatStack, assertion), direction, context.maxCharacter);
	return getTrivialResultWithAfter(assertion, after, context);
}

function removeTrivialAssertions(
	node: NoParent<Concatenation>,
	isTrivial: (assertion: NoParent<Assertion>) => Result,
	{ signalMutation }: TransformContext
): void {
	for (let i = 0; i < node.elements.length; i++) {
		const element = node.elements[i];
		if (element.type === "Assertion") {
			const trivial = isTrivial(element);
			if (trivial === Result.ACCEPT) {
				// remove assertion
				signalMutation();
				node.elements.splice(i, 1);
				i--;
			} else if (trivial === Result.REJECT) {
				// remove branch
				signalMutation();
				node.elements = [emptyAlternation()];
				break;
			}
		}
	}
}
function isNegatedSingleCharAssertion(
	element: NoParent<Assertion>
): element is SingleCharacterParent<Assertion> & { negate: true } {
	return element.negate && isSingleCharacterParent(element);
}
/**
 * Removes adjacent assertions that can trivially be removed (e.g. `^^` => `^^`, `(?!\w)(?!\d)` => `(?!\w)`).
 *
 * @param elements
 * @param kind
 * @param context
 */
function removeAdjacentAssertions(
	elements: NoParent<Element>[],
	kind: Assertion["kind"],
	context: TransformContext
): void {
	if (elements.length < 2) {
		return;
	}

	function removeNested(node: NoParent<Parent>, direction: MatchingDirection, char: CharSet): void {
		const firstIndex = firstIndexFor(direction);
		const inc = incrementFor(direction);

		for (const { elements } of node.alternatives) {
			for (let i = firstIndex; inRange(elements, i); i += inc) {
				const element = at(elements, i);
				if (element.type === "Assertion") {
					if (element.kind === kind && isNegatedSingleCharAssertion(element)) {
						const elementChar = element.alternatives[0].elements[0].characters;
						if (elementChar.isSubsetOf(char)) {
							// remove
							context.signalMutation();
							elements.splice(i, 1);
							i -= inc;
						}
					}
				} else if (element.type === "Alternation" || (element.type === "Quantifier" && element.max === 1)) {
					removeNested(element, direction, char);
					break;
				} else {
					break;
				}
			}
		}
	}

	const direction = toMatchingDirection(kind);

	const firstIndex = firstIndexFor(direction);
	const inc = incrementFor(direction);

	for (let i = firstIndex; inRange(elements, i); i += inc) {
		const assertion = at(elements, i);
		if (assertion.type !== "Assertion" || assertion.kind !== kind || !isNegatedSingleCharAssertion(assertion)) {
			continue;
		}
		const assertionChar = assertion.alternatives[0].elements[0].characters;

		let assertionRemoved = false;
		for (let j = i + inc; inRange(elements, j); j += inc) {
			const other = at(elements, j);
			if (other.type === "Assertion") {
				if (other.kind === kind && isNegatedSingleCharAssertion(other)) {
					const otherChar = other.alternatives[0].elements[0].characters;
					if (otherChar.isSubsetOf(assertionChar)) {
						// remove the other assertion
						context.signalMutation();
						elements.splice(j, 1);
						j -= inc;
					} else if (otherChar.isSupersetOf(assertionChar)) {
						// remove the i assertion
						context.signalMutation();
						assertionRemoved = true;
						elements.splice(i, 1);
						i -= inc;
						break;
					}
				} else {
					// move to the next element
				}
			} else {
				break;
			}
		}

		if (!assertionRemoved) {
			for (let j = i + inc; inRange(elements, j); j += inc) {
				const other = at(elements, j);
				if (other.type === "Assertion") {
					// move to the next element
				} else if (other.type === "Alternation" || (other.type === "Quantifier" && other.max === 1)) {
					removeNested(other, direction, assertionChar);
					break;
				} else {
					break;
				}
			}
			for (let j = i - inc; inRange(elements, j); j -= inc) {
				const other = at(elements, j);
				if (other.type === "Assertion") {
					// move to the next element
				} else if (other.type === "Alternation" || (other.type === "Quantifier" && other.max === 1)) {
					removeNested(other, invertMatchingDirection(direction), assertionChar);
					break;
				} else {
					break;
				}
			}
		}
	}
}

/**
 * This will remove all assertions that are known to always reject/accept no matter the input string.
 *
 * @param _options
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function removeUnnecessaryAssertions(_options?: Readonly<CreationOptions>): Transformer {
	return {
		name: "removeUnnecessaryAssertions",

		onConcatenation(node, context) {
			removeTrivialAssertions(node, getTrivialResult, context);

			removeAdjacentAssertions(node.elements, "ahead", context);
			removeAdjacentAssertions(node.elements, "behind", context);
		},

		onExpression(node: NoParent<Expression>, context: TransformContext): void {
			const stack: NoParent<Node>[] = [];
			function enter(node: never): void {
				stack.push(node);
			}
			function leave(): void {
				stack.pop();
			}

			visitAst(node, {
				onAlternationEnter: enter,
				onAssertionEnter: enter,
				onConcatenationEnter: enter,
				onExpressionEnter: enter,
				onQuantifierEnter: enter,

				onAlternationLeave: leave,
				onAssertionLeave: leave,
				onConcatenationLeave(node) {
					removeTrivialAssertions(node, a => analyzeAssertion(stack, a, context), context);

					leave();
				},
				onExpressionLeave: leave,
				onQuantifierLeave: leave,
			});
		},
	};
}
