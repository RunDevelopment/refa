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
	firstConsumedToLook,
	getFirstCharAfter,
	getFirstCharConsumedBy,
	invertMatchingDirection,
	isTriviallyAccepting,
	isZeroLength,
	stackPath,
	toMatchingDirection,
} from "../ast-analysis";
import { CharSet } from "../char-set";
import { debugAssert, filterMut } from "../util";
import { CreationOptions } from "./creation-options";
import {
	SingleCharacterParent,
	at,
	atInRange,
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
): NoParent<Element>[] | undefined {
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
			return withDirection(toMatchingDirection(assertion.kind), [assertion, char]);
		}

		for (const alt of assertion.alternatives) {
			const { elements } = alt;

			const firstIndex = firstIndexFor(direction);
			const first = at(elements, firstIndex);

			if (first && isCharConvertible(first)) {
				const firstChar = toCharElement(first).characters;

				// remove char from assertion branch
				context.signalMutation();
				if (first.type === "CharacterClass") {
					elements.splice(firstIndex, 1);
				} else {
					first.min--;
					first.max--;
				}

				// This uses the same trick as before with (?!foo|bar) == (?!foo)(?!bar) == (?!bar)(?!foo).
				// Since we found an alternative that we'd like to apply, we might have other alternatives that remain.
				// This array contains an assertion for the remaining alternatives.
				const remaining: NoParent<Element>[] =
					assertion.alternatives.length === 1
						? []
						: [
								{
									type: "Assertion",
									negate: assertion.negate,
									kind: assertion.kind,
									alternatives: assertion.alternatives.filter(a => a !== alt).map(copyNode),
									source: copySource(assertion.source),
								},
						  ];

				if (firstChar.isSupersetOf(char.characters)) {
					// e.g. (?!\wbc)a => a(?!bc)
					return withDirection(direction, [...remaining, char, assertion]);
				} else {
					// e.g. (?!foo)\w => (?:[a-eg-zA-Z0-9_]|f(?!oo))
					const intersection = firstChar.intersect(char.characters);
					if (intersection.isEmpty) {
						throw new Error("Rejecting branch wasn't removed properly.");
					}
					context.signalMutation();
					char.characters = char.characters.without(firstChar);
					return withDirection(direction, [
						...remaining,
						{
							type: "Alternation",
							alternatives: [
								{ type: "Concatenation", elements: [char] },
								{
									type: "Concatenation",
									elements: withDirection(direction, [
										{ type: "CharacterClass", characters: intersection },
										assertion,
									]),
								},
							],
						},
					]);
				}
			}
		}

		return undefined;
	} else {
		if (assertion.alternatives.length !== 1) {
			// It's not possible to do the intersection with more than 1 branches without increasing the number of nodes in
			// the regex.
			// Example: /(?=\wa|\db)\w\w/
			return undefined;
		} else {
			const { elements } = assertion.alternatives[0];

			const firstIndex = firstIndexFor(direction);
			const first = at(elements, firstIndex);

			if (first && isCharConvertible(first)) {
				const firstChar = toCharElement(first).characters;

				// remove char from assertion branch
				context.signalMutation();
				if (first.type === "CharacterClass") {
					elements.splice(firstIndex, 1);
				} else {
					first.min--;
					first.max--;
				}

				const intersection = firstChar.intersect(char.characters);
				if (intersection.isEmpty) {
					throw new Error("Rejecting branch wasn't removed properly.");
				}

				context.signalMutation();
				char.characters = intersection;
				return withDirection(toMatchingDirection(assertion.kind), [char, assertion]);
			}

			return undefined;
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
		const element = atInRange(elements, j);
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
		const assertion = atInRange(elements, i);
		if (assertion.type !== "Assertion" || assertion.kind !== kind) {
			continue;
		}

		const charConvertible = findNextCharConvertible(elements, i + inc, inc);
		if (charConvertible === undefined) {
			continue;
		}

		const char = toCharElement(charConvertible);
		let result = assertCharacter(assertion, char, context);

		if (result === undefined) {
			if (isTriviallyAccepting(assertion)) {
				// remove the assertion
				context.signalMutation();
				elements.splice(i, 1);
				i -= inc;
			}
		} else {
			// remove the assertion
			context.signalMutation();
			elements.splice(i, 1);
			i -= inc;

			// filter trivially accepting
			result = result.filter(element => element.type !== "Assertion" || !isTriviallyAccepting(element));

			if (charConvertible.type === "Quantifier") {
				charConvertible.min--;
				charConvertible.max--;

				pushBack(direction, result, charConvertible);
			}

			elements.splice(elements.indexOf(charConvertible), 1, ...result);
		}
	}
}

/**
 * This will remove optional branches that are know to reject because of assertions. E.g. `(?=\d)\s*\w+` => `(?=\d)\w+`.
 *
 * @param parentConcatenation
 * @param kind
 * @param context
 */
function removeRejectedBranches(
	parentConcatenation: NoParent<Concatenation>,
	kind: Assertion["kind"],
	context: TransformContext
): void {
	const { elements } = parentConcatenation;
	if (elements.length < 2) {
		return;
	}

	const direction = toMatchingDirection(kind);

	const firstIndex = firstIndexFor(direction);
	const inc = incrementFor(direction);

	function findNextParent(startIndex: number): NoParent<Alternation | Quantifier> | undefined {
		for (let j = startIndex; inRange(elements, j); j += inc) {
			const element = atInRange(elements, j);
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
		const assertion = atInRange(elements, i);
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

		if (parentElement.type === "Quantifier" && parentElement.min === 0 && parentElement.max >= 1) {
			const parentElementFirst = getFirstCharConsumedBy(
				parentElement.alternatives,
				direction,
				context.maxCharacter
			);

			if (!parentElementFirst.empty) {
				if (parentElementFirst.char.isDisjointWith(char)) {
					// e.g. (?=\d)\s*\w+ => (?=\d)\w+
					// remove element
					context.signalMutation();
					elements.splice(elements.indexOf(parentElement), 1);
					continue;
				}

				// e.g. (?=\d)\w*\s+ => (?=\d)\w+\s+
				const after = getFirstCharAfter(
					stackPath(
						[{ type: "Expression", alternatives: [parentConcatenation] }, parentConcatenation],
						parentElement
					),
					direction,
					context.maxCharacter
				);
				const disjointWithAfter = after.char.isDisjointWith(char) && !(after.edge && edge);
				if (disjointWithAfter) {
					context.signalMutation();
					parentElement.min = 1;
					continue;
				}
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
		const assertion = atInRange(elements, assertionIndex);
		if (assertion.type !== "Assertion" || assertion.kind !== kind || !isSingleCharacterParent(assertion)) {
			continue;
		}

		const quantifierIndex = i;
		const quantifier = atInRange(elements, quantifierIndex);
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
 * Converts an optional quantifier (min=0, max=1) into an alternation. The quantifier will be destroyed.
 *
 * @param quant
 * @returns
 */
function optionalQuantifierIntoAlternation(quant: NoParent<Quantifier>): NoParent<Alternation> {
	debugAssert(quant.min === 0 && quant.max === 1);

	const alternation: NoParent<Alternation> = {
		type: "Alternation",
		alternatives: quant.alternatives,
		source: copySource(quant.source),
	};

	const empty: NoParent<Concatenation> = {
		type: "Concatenation",
		elements: [],
		source: copySource(quant.source),
	};
	if (quant.lazy) {
		alternation.alternatives.unshift(empty);
	} else {
		alternation.alternatives.push(empty);
	}

	return alternation;
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

	const getAssertion = (alt: NoParent<Concatenation>): SingleCharacterParent<Assertion> | undefined => {
		const assertionIndex = lastIndexFor(direction);
		const assertion = at(alt.elements, assertionIndex);
		if (
			assertion !== undefined &&
			assertion.type === "Assertion" &&
			assertion.kind === kind &&
			isSingleCharacterParent(assertion)
		) {
			return assertion;
		} else {
			return undefined;
		}
	};

	for (let i = firstIndex + inc; inRange(elements, i); i += inc) {
		const charConvertibleIndex = i;
		const nextElement = atInRange(elements, charConvertibleIndex);
		let charConvertible: CharConvertible;
		if (isCharConvertible(nextElement)) {
			charConvertible = nextElement;
		} else {
			continue;
		}

		const alternationIndex = i - inc;
		const element = atInRange(elements, alternationIndex);
		let alternation: NoParent<Alternation>;
		if (element.type === "Alternation") {
			alternation = element;
		} else if (
			element.type === "Quantifier" &&
			element.min === 0 &&
			element.max === 1 &&
			element.alternatives.some(getAssertion)
		) {
			// convert quantifier to alternation
			alternation = optionalQuantifierIntoAlternation(element);

			context.signalMutation();
			setAt(elements, alternationIndex, alternation);
		} else {
			continue;
		}

		const char = getCharacters(charConvertible);
		const appendChars = new Map<NoParent<Concatenation>, CharSet>();
		filterMut(alternation.alternatives, alternative => {
			const assertion = getAssertion(alternative);
			if (assertion !== undefined) {
				const rawChar = assertion.alternatives[0].elements[0].characters;
				const assertionChar = assertion.negate ? rawChar.negate() : rawChar;

				if (assertionChar.isDisjointWith(char)) {
					// remove alternative (trivial reject)
					context.signalMutation();
					return false;
				} else if (char.isSubsetOf(assertionChar)) {
					// remove assertion (trivial accept)
					context.signalMutation();
					alternative.elements.splice(alternative.elements.indexOf(assertion), 1);
					return true;
				} else {
					// append intersected character
					context.signalMutation();
					alternative.elements.splice(alternative.elements.indexOf(assertion), 1);
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
		const assertion = atInRange(elements, assertionIndex);
		if (assertion.type !== "Assertion" || assertion.kind !== kind) {
			continue;
		}

		const alternationIndex = i;
		const element = atInRange(elements, alternationIndex);
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
			elements.splice(elements.indexOf(element), 1, ...replacement);

			// remove assertion
			context.signalMutation();
			elements.splice(elements.indexOf(assertion), 1);
		} else if (
			element.type === "Quantifier" &&
			element.min === 0 &&
			element.max === 1 &&
			// we already handle this simple case elsewhere
			!isSingleCharacterParent(element)
		) {
			// convert `(?:a|b)?` => `(?:a|b|)` and then use the new alternation
			alternation = optionalQuantifierIntoAlternation(element);

			// replace quantifier and remove assertion
			setAt(elements, alternationIndex, alternation);
			context.signalMutation();
			elements.splice(assertionIndex, 1);
		} else {
			continue;
		}

		let assertionChar: CharSet | undefined = undefined;
		let assertionCharComplete = false;
		if (isSingleCharacterParent(assertion)) {
			const assertionRawChar = assertion.alternatives[0].elements[0].characters;
			assertionChar = assertion.negate ? assertionRawChar.negate() : assertionRawChar;
			assertionCharComplete = true;
		} else if (!assertion.negate) {
			const firstChar = firstConsumedToLook(
				getFirstCharConsumedBy(assertion.alternatives, direction, context.maxCharacter)
			);
			if (!firstChar.edge) {
				assertionChar = firstChar.char;
				assertionCharComplete = true;
			}
		}

		// move it into alternatives
		filterMut(alternation.alternatives, alt => {
			if (assertionChar) {
				const firstChar = getFirstCharConsumedBy(alt, direction, context.maxCharacter);
				if (!firstChar.empty) {
					if (firstChar.char.isDisjointWith(assertionChar)) {
						// trivial reject
						return false;
					} else if (assertionCharComplete && firstChar.char.isSubsetOf(assertionChar)) {
						// trivial accept
						return true;
					}
				}
			}

			pushFront(direction, alt.elements, copyNode(assertion));
			return true;
		});
	}
}

/**
 * This will transform `(a(?!b))+` => `a((?!b)a)*(?!b)` and
 * `(a(?!b))*` => `(?:(a(?!b))+)?` => `(?:a((?!b)a)*(?!b))?`.
 *
 * Note that if `(?!b)` in `(?!b)a` trivially accepts, then an optimization kicks in and we get
 * `(a(?!b))+` => `a+(?!b)` and `(a(?!b))*` => `(?:a+(?!b))?` instead.
 *
 * @param elements
 * @param kind
 * @param context
 */
function moveAssertionOutsideLoop(
	elements: NoParent<Element>[],
	kind: Assertion["kind"],
	context: TransformContext
): void {
	const direction = toMatchingDirection(kind);

	const getAssertion = (alt: NoParent<Concatenation>): SingleCharacterParent<Assertion> | undefined => {
		const inc = incrementFor(invertMatchingDirection(direction));
		for (let i = firstIndexFor(invertMatchingDirection(direction)); inRange(alt.elements, i); i += inc) {
			const element = atInRange(alt.elements, i);
			if (element.type === "Assertion" && element.kind === kind && isSingleCharacterParent(element)) {
				return element;
			}
			if (!isZeroLength(element)) {
				break;
			}
		}
		return undefined;
	};

	for (let i = 0; i < elements.length; i++) {
		const quant = elements[i];
		if (
			quant.type !== "Quantifier" ||
			quant.alternatives.length !== 1 ||
			quant.max < 2 ||
			!alwaysConsumesCharacters(quant.alternatives)
		) {
			continue;
		}

		// find a fitting assertion
		const alt = quant.alternatives[0];
		const assertion = getAssertion(alt);
		if (!assertion) {
			// we couldn't find a fitting assertion
			continue;
		}

		// trivially accepting?
		let assertionChar = assertion.alternatives[0].elements[0].characters;
		assertionChar = assertion.negate ? assertionChar.negate() : assertionChar;
		const firstChar = getFirstCharConsumedBy(alt, direction, context.maxCharacter);
		const triviallyAccepting = !firstChar.empty && firstChar.char.isSubsetOf(assertionChar);

		// remove the assertion
		context.signalMutation();
		alt.elements.splice(alt.elements.indexOf(assertion), 1);

		let replacement: NoParent<Element>[];
		if (triviallyAccepting) {
			// `(a(?!b))+` => `a+(?!b)`
			// the assertion has already been removed
			replacement = withDirection(direction, [quant, assertion]);
		} else {
			// `(a(?!b))+` => `a((?!b)a)*(?!b)`
			const prefix = copyNode(alt).elements;
			const innerAssertion = copyNode(assertion);
			pushFront(direction, alt.elements, innerAssertion);
			if (direction === "ltr") {
				replacement = [...prefix, quant, assertion];
			} else {
				replacement = [assertion, quant, ...prefix];
			}
		}

		if (quant.min === 0) {
			// we need to wrap it in an optional group
			quant.min = 1;
			replacement = [
				{
					type: "Quantifier",
					min: 0,
					max: 1,
					lazy: quant.lazy,
					alternatives: [
						{
							type: "Concatenation",
							elements: replacement,
							source: copySource(quant.source),
						},
					],
					source: copySource(quant.source),
				},
			];
		}

		elements.splice(i, 1, ...replacement);
	}
}

/**
 * This will apply an assertion at the end of a loop. This is a generalization of `moveAssertionOutsideLoop` for `*`
 * quantifiers.
 *
 * The general transformations is this: `(?:a|b(?=c))*` => `/(?:a|bB*A)*(?:bB*(?=c))?/` where `A=(?=c)a` and `B=(?=c)b`.
 *
 * Note that this transformation does not actually apply the assertion. It only rewrites the loop to make it easier to
 * apply the assertion.
 *
 * @param elements
 * @param kind
 * @param context
 */
function rewriteLoopAssertion(elements: NoParent<Element>[], kind: Assertion["kind"], context: TransformContext): void {
	const direction = toMatchingDirection(kind);

	const getAssertion = (alt: NoParent<Concatenation>): SingleCharacterParent<Assertion> | undefined => {
		const inc = incrementFor(invertMatchingDirection(direction));
		for (let i = firstIndexFor(invertMatchingDirection(direction)); inRange(alt.elements, i); i += inc) {
			const element = atInRange(alt.elements, i);
			if (element.type === "Assertion" && element.kind === kind && isSingleCharacterParent(element)) {
				return element;
			}
			if (!isZeroLength(element)) {
				break;
			}
		}
		return undefined;
	};
	const concatToElement = (concat: NoParent<Concatenation>): NoParent<Element> => {
		if (concat.elements.length === 1) {
			return concat.elements[0];
		} else {
			return {
				type: "Alternation",
				alternatives: [concat],
				source: copySource(concat.source),
			};
		}
	};

	for (let i = 0; i < elements.length; i++) {
		const quant = elements[i];
		if (
			quant.type !== "Quantifier" ||
			quant.alternatives.length < 2 ||
			quant.max !== Infinity ||
			!alwaysConsumesCharacters(quant.alternatives)
		) {
			continue;
		}

		// in order to preserve order, we can only use the first or last alternative
		let alternative = quant.alternatives[0];
		let assertion = getAssertion(alternative);
		if (!assertion) {
			alternative = quant.alternatives[quant.alternatives.length - 1];
			assertion = getAssertion(alternative);
		}
		if (!assertion) {
			// we couldn't find a fitting assertion
			continue;
		}
		const isFirst = alternative === quant.alternatives[0];

		// From this point onwards, we know that we are going to apply the transformation. There is no backing out now.
		context.signalMutation();

		// make the quantifier a star by unrolling `min` iterations
		const quantifierMinUnroll: NoParent<Quantifier>[] = [];
		if (quant.min > 0) {
			const unrolled = copyNode(quant);
			unrolled.max = unrolled.min;
			unrolled.lazy = false;
			quantifierMinUnroll.push(unrolled);
			quant.min = 0;
		}

		// we already have our assertion, so let's assemble the other pieces as well.
		const a = quant.alternatives.filter(alt => alt !== alternative);
		const b = alternative;
		b.elements.splice(b.elements.indexOf(assertion), 1);

		// `(?=c)a`
		const A: NoParent<Concatenation> = {
			type: "Concatenation",
			elements: withDirection(direction, [
				copyNode(assertion),
				{ type: "Alternation", alternatives: a.map(copyNode), source: copySource(quant.source) },
			]),
			source: copySource(quant.source),
		};
		const B = copyNode(b);
		pushFront(direction, B.elements, copyNode(assertion));

		// `B*`
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const BStar: NoParent<Quantifier> = {
			type: "Quantifier",
			min: 0,
			max: Infinity,
			lazy: quant.lazy,
			alternatives: [copyNode(B)],
			source: copySource(quant.source),
		};
		// `bB*A`
		const prefixInner: NoParent<Concatenation> = {
			type: "Concatenation",
			elements: withDirection(direction, [copyNode(concatToElement(b)), copyNode(BStar), concatToElement(A)]),
			source: copySource(quant.source),
		};
		// `(?:a|bB*A)*`
		const prefix: NoParent<Quantifier> = {
			type: "Quantifier",
			min: 0,
			max: Infinity,
			lazy: quant.lazy,
			alternatives: isFirst ? [prefixInner, ...a] : [...a, prefixInner],
			source: copySource(quant.source),
		};
		// `(?:bB*(?=c))?`
		const suffix: NoParent<Quantifier> = {
			type: "Quantifier",
			min: 0,
			max: 1,
			lazy: quant.lazy,
			alternatives: [
				{
					type: "Concatenation",
					elements: withDirection(direction, [concatToElement(b), BStar, assertion]),
					source: copySource(quant.source),
				},
			],
			source: copySource(quant.source),
		};

		elements.splice(i, 1, ...withDirection(direction, [...quantifierMinUnroll, prefix, suffix]));
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
		name: "applyAssertions",
		onConcatenation(node: NoParent<Concatenation>, context: TransformContext) {
			const elements = node.elements;

			applySingleCharacterAssertion(elements, "ahead", context);
			applySingleCharacterAssertion(elements, "behind", context);

			moveAssertionOutsideLoop(elements, "ahead", context);
			moveAssertionOutsideLoop(elements, "behind", context);

			rewriteLoopAssertion(elements, "ahead", context);
			rewriteLoopAssertion(elements, "behind", context);

			moveAssertionIntoAlternation(elements, "ahead", context);
			moveAssertionIntoAlternation(elements, "behind", context);

			applyOneCharacter(elements, "ahead", context);
			applyOneCharacter(elements, "behind", context);

			removeRejectedBranches(node, "ahead", context);
			removeRejectedBranches(node, "behind", context);

			moveCharacterIntoAlternation(elements, "ahead", context);
			moveCharacterIntoAlternation(elements, "behind", context);
		},
	};
}
