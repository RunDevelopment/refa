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
