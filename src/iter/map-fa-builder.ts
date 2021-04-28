import { CharSet } from "../char-set";
import { FABuilder } from "../common-types";

/**
 * An FA builder that uses `Map` objects as nodes. Each node is the map of its outgoing transitions.
 */
export class MapFABuilder implements FABuilder<MapFABuilder.Node, CharSet> {
	readonly initial: MapFABuilder.Node = new Map();
	readonly finals = new Set<MapFABuilder.Node>();
	makeFinal(state: MapFABuilder.Node): void {
		this.finals.add(state);
	}
	isFinal(state: MapFABuilder.Node): boolean {
		return this.finals.has(state);
	}
	createNode(): MapFABuilder.Node {
		return new Map();
	}
	linkNodes(from: MapFABuilder.Node, to: MapFABuilder.Node, transition: CharSet): void {
		const current = from.get(to);
		if (current === undefined) {
			from.set(to, transition);
		} else {
			from.set(to, current.union(transition));
		}
	}
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MapFABuilder {
	export type Node = Map<Node, CharSet>;
}
