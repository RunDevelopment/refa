import { Alternation, NoParent, SourceLocation } from "../ast";
import { MatchingDirection } from "../ast-analysis";

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
