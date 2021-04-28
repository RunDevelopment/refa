import { CharSet } from "../char-set";
import { FABuilder } from "../common-types";

/**
 * An FA builder that uses `Map` objects as nodes. Each node is the map of its outgoing transitions.
 */
export class MapFABuilder implements FABuilder<MapFABuilderNode, CharSet> {
	readonly initial: MapFABuilderNode = new Map();
	readonly finals = new Set<MapFABuilderNode>();
	makeFinal(state: MapFABuilderNode): void {
		this.finals.add(state);
	}
	isFinal(state: MapFABuilderNode): boolean {
		return this.finals.has(state);
	}
	createNode(): MapFABuilderNode {
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
