import {
	Alternation,
	Assertion,
	CharacterClass,
	Concatenation,
	Element,
	NoParent,
	Node,
	Parent,
	SourceLocation,
} from "../ast";
import {
	MatchingDirection,
	getFirstCharConsumedBy,
	getLengthRange,
	hasSomeDescendant,
	isPotentiallyEmpty,
	isZeroLength,
	toMatchingDirection,
} from "../ast-analysis";
import { CharSet } from "../char-set";
import { Char } from "../char-types";
import { assertNever, filterMut } from "../util";

export function emptyAlternation(): NoParent<Alternation> {
	return {
		type: "Alternation",
		alternatives: [],
	};
}

export function copySource(source: Readonly<SourceLocation> | undefined): SourceLocation | undefined {
	if (source) {
		return { start: source.start, end: source.end };
	} else {
		return undefined;
	}
}
export function copyNode<N extends Node, T extends NoParent<N>>(node: T): NoParent<N> {
	return copyNodeImpl(node) as NoParent<N>;
}
function copyNodeImpl(node: NoParent<Node>): NoParent<Node> {
	const n = node as NoParent<Node>;
	switch (n.type) {
		case "Alternation":
			return {
				type: "Alternation",
				source: copySource(n.source),
				alternatives: n.alternatives.map(e => copyNode(e)),
			};
		case "Assertion":
			return {
				type: "Assertion",
				kind: n.kind,
				negate: n.negate,
				source: copySource(n.source),
				alternatives: n.alternatives.map(e => copyNode(e)),
			};
		case "CharacterClass":
			return {
				type: "CharacterClass",
				source: copySource(n.source),
				characters: n.characters,
			};
		case "Concatenation":
			return {
				type: "Concatenation",
				source: copySource(n.source),
				elements: n.elements.map(e => copyNode(e)),
			};
		case "Expression":
			return {
				type: "Expression",
				source: copySource(n.source),
				alternatives: n.alternatives.map(e => copyNode(e)),
			};
		case "Quantifier":
			return {
				type: "Quantifier",
				lazy: n.lazy,
				min: n.min,
				max: n.max,
				source: copySource(n.source),
				alternatives: n.alternatives.map(e => copyNode(e)),
			};
		case "Unknown":
			return {
				type: "Unknown",
				id: n.id,
				source: copySource(n.source),
			};
		default:
			assertNever(n);
	}
}

export function at<T>(arr: readonly T[], signedIndex: number): T {
	if (signedIndex < 0) {
		signedIndex += arr.length;
	}
	return arr[signedIndex];
}
export function setAt<T>(arr: T[], signedIndex: number, value: T): void {
	if (signedIndex < 0) {
		signedIndex += arr.length;
	}
	arr[signedIndex] = value;
}
export function inRange(arr: ReadonlyArray<unknown>, signedIndex: number): boolean {
	return signedIndex < arr.length && -signedIndex <= arr.length;
}
export function firstIndexFor(direction: MatchingDirection): 0 | -1 {
	return direction === "ltr" ? 0 : -1;
}
export function lastIndexFor(direction: MatchingDirection): 0 | -1 {
	return direction === "ltr" ? -1 : 0;
}
export function incrementFor(direction: MatchingDirection): 1 | -1 {
	return direction === "ltr" ? +1 : -1;
}

export type SingleCharacterParent<T extends Parent> = NoParent<T> & {
	alternatives: [{ elements: [NoParent<CharacterClass>] }];
};
export function isSingleCharacterParent<T extends Parent>(element: NoParent<T>): element is SingleCharacterParent<T> {
	return (
		element.alternatives.length === 1 &&
		element.alternatives[0].elements.length === 1 &&
		element.alternatives[0].elements[0].type === "CharacterClass"
	);
}

export function tryInlineAssertions(alternatives: NoParent<Concatenation>[], kind: Assertion["kind"]): boolean {
	let changed = false;
	for (const alt of alternatives) {
		if (tryInlineAssertionsConcat(alt, kind)) {
			changed = true;
		}
	}
	return changed;
}
function tryInlineAssertionsConcat({ elements }: NoParent<Concatenation>, kind: Assertion["kind"]): boolean {
	if (elements.length === 0) {
		return false;
	}

	const increment = kind === "behind" ? +1 : -1;
	const startIndex = kind === "behind" ? 0 : -1;

	let assertion: NoParent<Assertion> | undefined = undefined;
	let assertionIndex = NaN;
	for (let i = startIndex; inRange(elements, i); i += increment) {
		const element = at(elements, i);
		if (element.type === "Assertion" && !element.negate && element.kind === kind) {
			assertion = element;
			assertionIndex = i;
			break;
		} else if (!isZeroLength(element)) {
			break;
		}
	}

	if (assertion) {
		elements.splice(assertionIndex, 1);

		tryInlineAssertions(assertion.alternatives, kind);

		const inlineElements: NoParent<Element>[] =
			assertion.alternatives.length === 1
				? assertion.alternatives[0].elements
				: [
						{
							type: "Alternation",
							alternatives: assertion.alternatives,
							source: assertion.source,
						},
				  ];
		if (kind === "behind") {
			elements.unshift(...inlineElements);
		} else {
			elements.push(...inlineElements);
		}

		return true;
	} else {
		if (inRange(elements, startIndex)) {
			const element = at(elements, startIndex);
			if (element.type === "Alternation" || (element.type === "Quantifier" && element.max === 1)) {
				return tryInlineAssertions(element.alternatives, kind);
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}

export function tryRemoveRejectingAssertionBranches(
	parent: NoParent<Parent>,
	char: CharSet,
	edge: boolean,
	direction: MatchingDirection,
	maxCharacter: Char
): boolean {
	let changed = false;

	const enum EliminationResult {
		REMOVE_BRANCH,
		REMOVE_ELEMENT,
		KEEP,
	}
	function eliminateElement(element: NoParent<Element>): EliminationResult {
		switch (element.type) {
			case "Assertion": {
				if (!edge || !element.negate) {
					const reject = element.negate ? EliminationResult.REMOVE_ELEMENT : EliminationResult.REMOVE_BRANCH;
					const accept = element.negate ? EliminationResult.REMOVE_BRANCH : EliminationResult.REMOVE_ELEMENT;

					if (element.alternatives.length === 0) {
						return reject;
					} else if (isPotentiallyEmpty(element.alternatives)) {
						return accept;
					}

					if (toMatchingDirection(element.kind) === direction) {
						if (tryRemoveRejectingAssertionBranches(element, char, edge, direction, maxCharacter)) {
							changed = true;

							if (element.alternatives.length === 0) {
								return reject;
							}
						}

						const firstOf = getFirstCharConsumedBy(element.alternatives, direction, maxCharacter);
						if (firstOf.empty) {
							return EliminationResult.KEEP;
						} else if (char.isDisjointWith(firstOf.char)) {
							return reject;
						}

						// if this contains another assertion then that might reject. It's out of our control
						if (!hasSomeDescendant(element, d => d !== element && d.type === "Assertion")) {
							const range = getLengthRange(element.alternatives);
							// we only check the first character, so it's only correct if the assertion requires only one
							// character
							if (range && range.max === 1) {
								// require exactness
								if (firstOf.exact && char.isSubsetOf(firstOf.char)) {
									return accept;
								}
							}
						}
					}
				}

				return EliminationResult.KEEP;
			}
			case "Alternation": {
				if (tryRemoveRejectingAssertionBranches(element, char, edge, direction, maxCharacter)) {
					changed = true;
				}

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
					if (tryRemoveRejectingAssertionBranches(element, char, edge, direction, maxCharacter)) {
						changed = true;
					}

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
					const firstChar = getFirstCharConsumedBy(element.alternatives, direction, maxCharacter);
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
			case "Unknown": {
				return EliminationResult.KEEP;
			}
			default:
				assertNever(element);
		}
	}

	filterMut(parent.alternatives, alt => {
		const startIndex = direction === "ltr" ? 0 : -1;
		const inc = direction === "ltr" ? +1 : -1;

		for (let i = startIndex; inRange(alt.elements, i); i += inc) {
			const element = at(alt.elements, i);
			const result = eliminateElement(element);

			if (result === EliminationResult.REMOVE_ELEMENT) {
				// remove & next round
				changed = true;
				alt.elements.splice(i, 1);
				i -= inc;
			} else if (result === EliminationResult.REMOVE_BRANCH) {
				changed = true;
				return false;
			} else if (element.type === "Assertion") {
				// just move on the the next element
			} else {
				if (
					(element.type === "Alternation" ||
						(element.type === "Quantifier" && element.min === 1 && element.max === 1)) &&
					element.alternatives.length === 1
				) {
					// inline & next round
					changed = true;
					alt.elements.splice(i, 1, ...element.alternatives[0].elements);
					i -= inc;
				} else {
					return true;
				}
			}
		}

		return true;
	});

	return changed;
}
