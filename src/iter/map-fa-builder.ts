import { CharSet } from "../char-set";
import { FABuilder } from "../fa-types";
import { TooManyNodesError } from "../errors";

/**
 * An FA builder that uses `Map` objects as nodes. Each node is the map of its outgoing transitions.
 */
export class MapFABuilder implements FABuilder<MapFABuilderNode, CharSet> {
	private readonly _limit: number;
	private _counter = 0;
	readonly initial: MapFABuilderNode = new Map();
	readonly finals = new Set<MapFABuilderNode>();

	constructor(maxNodes: number = Infinity) {
		this._limit = maxNodes;
	}

	makeFinal(state: MapFABuilderNode): void {
		this.finals.add(state);
	}
	isFinal(state: MapFABuilderNode): boolean {
		return this.finals.has(state);
	}
	createNode(): MapFABuilderNode {
		TooManyNodesError.assert(++this._counter, this._limit, "MapFABuilder");

		return new Map();
	}
	linkNodes(from: MapFABuilderNode, to: MapFABuilderNode, transition: CharSet): void {
		const current = from.get(to);
		if (current === undefined) {
			from.set(to, transition);
		} else {
			from.set(to, current.union(transition));
		}
	}
}

export type MapFABuilderNode = Map<MapFABuilderNode, CharSet>;
