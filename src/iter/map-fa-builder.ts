import { CharSet } from "../char-set";
import { FABuilder } from "../fa-types";
import { TooManyNodesError } from "../errors";

interface Limit {
	current: number;
	readonly maxNodes: number;
	readonly kind: string;
}

/**
 * An FA builder that uses `Map` objects as nodes. Each node is the map of its outgoing transitions.
 */
export class MapFABuilder implements FABuilder<MapFABuilderNode, CharSet> {
	private readonly _limit: Limit | undefined;
	readonly initial: MapFABuilderNode = new Map();
	readonly finals = new Set<MapFABuilderNode>();

	constructor(maxNodes: number = Infinity, kind?: string) {
		if (maxNodes < Infinity) {
			this._limit = { current: 0, maxNodes, kind: kind ?? "MapFABuilder" };
		}
	}

	makeFinal(state: MapFABuilderNode): void {
		this.finals.add(state);
	}
	isFinal(state: MapFABuilderNode): boolean {
		return this.finals.has(state);
	}
	createNode(): MapFABuilderNode {
		const limit = this._limit;
		if (limit) {
			TooManyNodesError.assert(++limit.current, limit.maxNodes, limit.kind);
		}

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
