import { FAIterator } from "../finite-automaton";
import { iterToArray } from "../util";
import { ensureDeterministicOut, iterateStates, mapOut, mapOutIter } from "./iterator";

export function toDot<S, T>(iter: FAIterator<S, Iterable<[S, T]>>, options: toDot.Options<S, T>): string {
	const { getEdgeAttributes, getGraphAttributes, getNodeAttributes = DEFAULT_GET_NODE_ATTRIBUTES } = options;

	const stableIter = ensureDeterministicOut(mapOut(iter, iterToArray));
	const states: S[] = [...iterateStates(mapOutIter(stableIter, ([s]) => s))];

	const index = new Map<S, number>(states.map((s, i) => [s, i]));
	const indexOf = (state: S): number => {
		return index.get(state)!;
	};

	let s = "";

	function writeID(value: string): void {
		if (/^[a-zA-Z_]\w*$/.test(value)) {
			s += value;
		} else {
			let escaped = value.replace(/[\\"]/g, m => "\\" + m);
			if (escaped[escaped.length - 1] === "\\") {
				escaped += " ";
			}
			s += '"' + escaped + '"';
		}
	}
	function writeValue(value: string | number): void {
		if (typeof value === "number") {
			const strValue = String(value);
			if (/^-?(?:\.\d+|\d+(?:\.\d*)?)$/.test(strValue)) {
				s += strValue;
			} else {
				writeID(strValue);
			}
		} else {
			writeID(value);
		}
	}
	function writeAttrs(attrs: Readonly<toDot.Attrs>): void {
		s += "[";
		let first = true;
		for (const key in attrs) {
			if (Object.prototype.hasOwnProperty.call(attrs, key)) {
				const value = attrs[key];
				if (value === undefined) {
					continue;
				}

				if (first) {
					first = false;
				} else {
					s += ", ";
				}

				writeID(key);
				s += "=";
				writeValue(value);
			}
		}
		s += "]";
	}
	function writeNodeLabel(node: S): void {
		s += "n" + indexOf(node);
	}
	function writeNodeLabelFromIndex(index: number): void {
		s += "n" + index;
	}

	s += "digraph ";
	s += "{\n";

	// graph attributes
	s += "\t// graph attributes\n";
	const graphAttrs = getGraphAttributes?.() || {};
	for (const key in graphAttrs) {
		if (Object.prototype.hasOwnProperty.call(graphAttrs, key)) {
			const value = graphAttrs[key];
			if (value === undefined) {
				continue;
			}

			s += "\t";
			writeID(key);
			s += "=";
			writeValue(value);
			s += ";\n";
		}
	}

	const info: toDot.Info<S> = {
		isInitial: s => s === stableIter.initial,
		isFinal: stableIter.isFinal,
		getId: indexOf,
		getNumberOfOutgoingEdges: s => stableIter.getOut(s).length,
	};

	// nodes
	s += "\n\t// nodes\n";
	states.forEach((node, i) => {
		s += "\t";
		writeNodeLabelFromIndex(i);
		s += " ";
		writeAttrs(getNodeAttributes(node, info));
		s += ";\n";
	});

	// edges
	s += "\n\t// edges\n";
	states.forEach((node, i) => {
		stableIter.getOut(node).forEach(([to, trans], nth) => {
			s += "\t";
			writeNodeLabelFromIndex(i);
			s += " -> ";
			writeNodeLabel(to);
			s += " ";
			writeAttrs(getEdgeAttributes(trans, nth, node, to, info));
			s += ";\n";
		});
	});

	s += "}";

	return s;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace toDot {
	export type Attrs = Record<string, string | number | undefined>;
	export interface Options<S, T> {
		getEdgeAttributes: (transition: T, nth: number, from: S, to: S, info: Info<S>) => Readonly<Attrs>;
		getGraphAttributes?: () => Readonly<Attrs>;
		getNodeAttributes?: (node: S, info: Info<S>) => Readonly<Attrs>;
	}
	export interface Info<S> {
		isInitial(node: S): boolean;
		isFinal(node: S): boolean;
		getId(node: S): number;
		getNumberOfOutgoingEdges(node: S): number;
	}

	export function simpleOptions<T>(
		toString: (transition: T) => string,
		ordered: boolean = false
	): Options<unknown, T> {
		return {
			getEdgeAttributes(trans, nth, from, _, info) {
				const attrs: Attrs = {
					label: toString(trans),
				};

				if (ordered && info.getNumberOfOutgoingEdges(from) > 1) {
					attrs["tail" + "label"] = String(nth + 1);
				}

				return attrs;
			},
		};
	}
}

const DEFAULT_GET_NODE_ATTRIBUTES: NonNullable<toDot.Options<unknown, never>["getNodeAttributes"]> = (node, info) => {
	return {
		label: info.isInitial(node) ? "X" : String(info.getId(node)),
		peripheries: info.isFinal(node) ? 2 : undefined,
	};
};
