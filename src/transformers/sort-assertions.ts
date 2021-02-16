import { Assertion, NoParent, Transformer } from "../ast";
import { CreationOptions } from "./creation-options";

function compare(a: NoParent<Assertion>, b: NoParent<Assertion>): number {
	if (a.kind !== b.kind) {
		return a.kind === "ahead" ? 1 : -1;
	} else {
		return 0;
	}
}
/**
 * A simple implementation of a stable sorting method - selection sort.
 *
 * Returns whether the given array was changed.
 */
function stableSort<T>(array: T[], compareFn: (a: T, b: T) => number): boolean {
	const n = array.length;
	let changed = false;

	for (let i = 0; i < n - 1; i++) {
		let minIndex = i;
		for (let j = i + 1; j < n; j++) {
			if (compareFn(array[j], array[minIndex]) < 0) {
				minIndex = j;
			}
		}
		if (minIndex !== i) {
			changed = true;
			[array[minIndex], array[i]] = [array[i], array[minIndex]];
		}
	}

	return changed;
}

/**
 * Sorts adjacent assertions such that lookbehinds are always to the right of lookaheads.
 *
 * This is operation may be necessary for other transformers to pick up on certain patterns.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function sortAssertions(_options?: Readonly<CreationOptions>): Transformer {
	return {
		onConcatenation(node, { signalMutation }) {
			let runStart = 0;
			let runLength = 0;
			function sort(): void {
				const slice = node.elements.slice(runStart, runStart + runLength) as NoParent<Assertion>[];
				if (stableSort(slice, compare)) {
					node.elements.splice(runStart, runLength, ...slice);
					signalMutation();
				}
			}
			for (let i = 0; i < node.elements.length; i++) {
				const current = node.elements[i];
				if (current.type === "Assertion") {
					if (runLength === 0) {
						runStart = i;
					}
					runLength++;
				} else {
					if (runLength > 1) {
						sort();
					}
					runLength = 0;
				}
			}
			if (runLength > 1) {
				sort();
			}
		},
	};
}
