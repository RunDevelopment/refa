import { FAIterator } from "../common-types";
import { ensureDeterministicOut } from "./iterator";

/**
 * Removes all dead states and trap states from the given FA.
 *
 * Note: This will iteratively create a complete copy of the given FA. This method is an expensive operation.
 */
export function removeDead<S, O>(iter: FAIterator<S, Iterable<O>>, select: (item: O) => S): FAIterator<S, O[]> {
	const { initial, getOut: oldGetOut, isFinal } = ensureDeterministicOut(iter);

	const cache = new Map<S, boolean>();
	function canReachFinal(state: S): boolean {
		const cached = cache.get(state);
		if (cached !== undefined) {
			return cached;
		}

		if (isFinal(state)) {
			cache.set(state, true);
			return true;
		}

		const inMap = new Map<S, S[]>();
		const seen = new Set<S>([state]);
		let current: S[] = [state];

		while (current.length > 0) {
			const next: S[] = [];

			for (let i = 0, l = current.length; i < l; i++) {
				const from = current[i];
				for (const item of oldGetOut(from)) {
					const to = select(item);

					// update inMap
					let list = inMap.get(to);
					if (list === undefined) {
						list = [];
						inMap.set(to, list);
					}
					list.push(from);

					if (seen.has(to)) {
						// already seen
						continue;
					}
					seen.add(to);

					const toCached = cache.get(to);
					if (toCached === true || isFinal(to)) {
						// can reach final
						setAllToReachable(cache, to, inMap);
						return true;
					} else if (toCached === false) {
						// ignore dead state
						continue;
					}

					next.push(to);
				}
			}

			current = next;
		}

		// non of the seen states can reach a final state
		seen.forEach(s => cache.set(s, false));

		return false;
	}

	function getOut(state: S): O[] {
		const result: O[] = [];

		for (const item of oldGetOut(state)) {
			if (canReachFinal(select(item))) {
				result.push(item);
			}
		}

		return result;
	}

	return {
		initial,
		getOut,
		isFinal,
	};
}

function setAllToReachable<S>(cache: Map<S, boolean>, root: S, inMap: ReadonlyMap<S, S[]>): void {
	cache.set(root, true);

	let current: S[] = [root];
	while (current.length > 0) {
		const next: S[] = [];

		for (let i = 0, l = current.length; i < l; i++) {
			const state = current[i];

			inMap.get(state)?.forEach(s => {
				if (!cache.has(s)) {
					cache.set(s, true);
					next.push(s);
				}
			});
		}

		current = next;
	}
}
