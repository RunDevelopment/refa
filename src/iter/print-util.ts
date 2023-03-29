import { FAIterator } from "../fa-types";
import { iterToArray } from "../util";
import { ensureStableOut, iterateStates, mapOut, mapOutIter } from "./iterator";

export interface NodeInfo<S> {
	isInitial(node: S): boolean;
	isFinal(node: S): boolean;
	getId(node: S): number;
	getNumberOfOutgoingEdges(node: S): number;
}

export interface SimplePrintOptions<T> {
	/**
	 * Returns the string representation of the given transition.
	 *
	 * @param transition
	 * @returns
	 */
	transitionToString: (transition: T) => string;
	/**
	 * Whether transitions are ordered.
	 *
	 * @default false
	 */
	ordered?: boolean;
}

export interface IndexNodes<S, T> {
	stableIter: FAIterator<S, readonly [S, T][]>;
	states: readonly S[];
	info: NodeInfo<S>;
}

export function indexNodes<S, T>(iter: FAIterator<S, Iterable<[S, T]>>): IndexNodes<S, T> {
	const stableIter = ensureStableOut(mapOut(iter, iterToArray));
	const states: readonly S[] = [...iterateStates(mapOutIter(stableIter, ([s]) => s))];
	const indexMap = new Map<S, number>(states.map((s, i) => [s, i]));

	return {
		stableIter,
		states,
		info: {
			isInitial: s => s === stableIter.initial,
			isFinal: stableIter.isFinal,
			getId: (state: S): number => indexMap.get(state)!,
			getNumberOfOutgoingEdges: s => stableIter.getOut(s).length,
		},
	};
}
