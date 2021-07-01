import { FAIterator } from "../common-types";
import { iterToArray } from "../util";
import { ensureStableOut, iterateStates, mapOut, mapOutIter } from "./iterator";

/**
 * Returns a human readable string representation of the given FA. The FA has to have exactly one initial state.
 *
 * All states will be labeled with numbers. The initial state will **always** has the number 0. Each state will be
 * mapped to its outgoing states. The outgoing states may contain duplicates and are sorted alphabetically by their
 * transition string. The number of states will be surrounded by brackets - square brackets for final states and round
 * brackets for non-final states.
 *
 * A conversion function for the transitions may optionally be given. If no transition function is given, the native
 * `String` function will be used.
 *
 * ---
 *
 * Example output for an NFA of `a*d|bb*`
 *
 * ```text
 * (0) -> (1) : 'a'
 *     -> [2] : 'b'
 *     -> [3] : 'd'
 *
 * (1) -> [3] : 'd'
 *
 * [2] -> [2] : 'b'
 *
 * [3] -> none
 * ```
 */
export function toString<S, T>(
	iter: FAIterator<S, Iterable<[S, T]>>,
	toString: (value: T) => string = String,
	ordered: boolean = false
): string {
	const stableIter = ensureStableOut(
		mapOut(iter, out => {
			const mapped = iterToArray(out).map<[S, string]>(([k, v]) => [k, toString(v)]);
			if (!ordered) {
				mapped.sort(([, a], [, b]) => a.localeCompare(b));
			}
			return mapped;
		})
	);

	// get all states
	const states: S[] = [...iterateStates(mapOutIter(stableIter, ([s]) => s))];

	const index = new Map<S, number>(states.map((s, i) => [s, i]));
	const indexOf = (state: S): number => {
		return index.get(state)!;
	};
	const labelOf = (state: S): string => {
		const index = indexOf(state);
		return stableIter.isFinal(state) ? `[${index}]` : `(${index})`;
	};

	return states
		.map(state => {
			const label = labelOf(state);
			const out = stableIter.getOut(state);
			if (!ordered) {
				out.sort(([s1], [s2]) => indexOf(s1) - indexOf(s2));
			}

			if (out.length === 0) {
				return `${label} -> none`;
			} else {
				const spaces = " ".repeat(label.length);
				return out
					.map(([s, t], i) => {
						return `${i ? spaces : label} -> ${labelOf(s)} : ${t}`;
					})
					.join("\n");
			}
		})
		.join("\n\n");
}
