import { Alternation, Assertion, Concatenation, Element, NoParent, SourceLocation } from "../ast";
import { isZeroLength, MatchingDirection } from "../ast-analysis";

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

export function findFirst<T>(
	arr: readonly T[],
	direction: MatchingDirection,
	predicate?: (item: T) => boolean
): T | undefined {
	if (!predicate) {
		if (arr.length === 0) {
			return undefined;
		} else {
			return direction === "ltr" ? arr[0] : arr[arr.length - 1];
		}
	} else {
		if (direction === "ltr") {
			return arr.find(predicate);
		} else {
			for (let i = arr.length - 1; i >= 0; i--) {
				if (predicate(arr[i])) {
					return arr[i];
				}
			}
			return undefined;
		}
	}
}

export function at<T>(arr: readonly T[], signedIndex: number): T {
	if (signedIndex < 0) {
		signedIndex += arr.length;
	}
	return arr[signedIndex];
}
export function inRange(arr: ReadonlyArray<unknown>, signedIndex: number): boolean {
	return signedIndex < arr.length && -signedIndex <= arr.length;
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
