
/**
 * Returns a human readable string representation of the given FA. The FA has to have exactly one initial state.
 *
 * Example output: for `a*d|bb*`
 * ```
 * (0) -> (1) : 'a'
 *     -> [2] : 'd'
 *     -> [3] : 'b'
 *
 * (1) -> [2] : ['d']
 *
 * [2] -> none
 *
 * [3] -> [3] : 'b'
 * ```
 *
 * @param states All states of the FA. The first state in the array has to be the initial state.
 * @param initialState The initial state of the FA. This will be starting point of a BFS to get the list of all states.
 * @param getOutTransitions Returns the outgoing transitions of a state and the labels of these transitions.
 * @param final Determines whether a given state is final.
 */
export function faToString<T>(initialState: T, getOutTransitions: (state: T) => Iterable<[T, string]>,
	final: (state: T) => boolean): string;
export function faToString<T>(states: T[], getOutTransitions: (state: T) => Iterable<[T, string]>,
	final: (state: T) => boolean): string;
export function faToString<T>(states: T | T[], getOutTransitions: (state: T) => Iterable<[T, string]>,
	final: (state: T) => boolean): string {

	if (!Array.isArray(states)) {
		const initial: T = states;
		states = [];

		const outCache = new Map<T, [T, string][]>();
		const cachedGetOutTransitions = (state: T): [T, string][] => {
			let out = outCache.get(state);
			if (out === undefined) {
				out = [...getOutTransitions(state)];
				outCache.set(state, out);
			}
			return out;
		};

		// BFS to get all states
		const visited: Set<T> = new Set();
		let toVisit: T[] = [initial];
		while (toVisit.length > 0) {
			const newToVisit: T[] = [];
			for (let i = 0, l = toVisit.length; i < l; i++) {
				const state = toVisit[i];
				if (!visited.has(state)) {
					visited.add(state);
					states.push(state);

					newToVisit.push(...cachedGetOutTransitions(state).map(([s]) => s));
				}
			}
			toVisit = newToVisit;
		}

		getOutTransitions = cachedGetOutTransitions;
	}

	if (states.length === 0) {
		return "Empty."
	}

	const index = new Map<T, number>(states.map((s, i) => [s, i]));
	const finals = new Set<T>(states.filter(s => final(s)));

	const labelOf = (state: T): string => {
		if (finals.has(state)) {
			return `[${index.get(state)}]`;
		} else {
			return `(${index.get(state)})`;
		}
	};

	return states.map(state => {
		const label = labelOf(state);
		const out = [...getOutTransitions(state)].sort((a, b) => index.get(a[0])! - index.get(b[0])!);

		if (out.length === 0) {
			return `${label} -> none`;
		} else {
			const spaces = " ".repeat(label.length);
			return out.map(([s, t], i) => {
				return `${i ? spaces : label} -> ${labelOf(s)} : ${t}`;
			}).join("\n");
		}
	}).join("\n\n");
}
