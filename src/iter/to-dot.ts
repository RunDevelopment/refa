import { FAIterator } from "../fa-types";
import { NodeInfo, SimplePrintOptions } from "./print-common";
import { indexNodes } from "./print-util";

export function toDot<S, T>(
	iter: FAIterator<S, Iterable<[S, T]>>,
	options: ToDotOptions<S, T> | SimplePrintOptions<T>
): string {
	const {
		getEdgeAttributes,
		getGraphAttributes = DEFAULT_GRAPH_ATTRIBUTES,
		getNodeAttributes = DEFAULT_GET_NODE_ATTRIBUTES,
	} = "transitionToString" in options ? fromSimpleOptions(options) : options;

	const { stableIter, states, info } = indexNodes(iter);

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
	function writeAttrs(attrs: Readonly<ToDotAttrs>): void {
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
		s += "n" + info.getId(node);
	}
	function writeNodeLabelFromIndex(index: number): void {
		s += "n" + index;
	}

	s += "digraph ";
	s += "{\n";

	// graph attributes
	s += "\t// graph attributes\n";
	const graphAttrs = getGraphAttributes();
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

	// nodes
	s += "\n\t// nodes\n";
	s += "\tnull [shape=point];\n";
	states.forEach((node, i) => {
		s += "\t";
		writeNodeLabelFromIndex(i);
		s += " ";
		writeAttrs(getNodeAttributes(node, info));
		s += ";\n";
	});

	// edges
	s += "\n\t// edges\n";
	s += "\tnull -> n0;\n";
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

export type ToDotAttrs = Record<string, string | number | undefined>;
export interface ToDotOptions<S, T> {
	getEdgeAttributes: (transition: T, nth: number, from: S, to: S, info: NodeInfo<S>) => Readonly<ToDotAttrs>;
	getGraphAttributes?: () => Readonly<ToDotAttrs>;
	getNodeAttributes?: (node: S, info: NodeInfo<S>) => Readonly<ToDotAttrs>;
}

function fromSimpleOptions<S, T>({ transitionToString, ordered = false }: SimplePrintOptions<T>): ToDotOptions<S, T> {
	return {
		getEdgeAttributes(trans, nth, from, _, info) {
			const attrs: ToDotAttrs = {
				label: transitionToString(trans),
			};

			if (ordered && info.getNumberOfOutgoingEdges(from) > 1) {
				attrs["tail" + "label"] = String(nth + 1);
			}

			return attrs;
		},
	};
}

const DEFAULT_GET_NODE_ATTRIBUTES: NonNullable<ToDotOptions<unknown, never>["getNodeAttributes"]> = (node, info) => {
	return {
		label: String(info.getId(node)),
		shape: info.isFinal(node) ? "doublecircle" : "circle",
	};
};

const DEFAULT_GRAPH_ATTRIBUTES: NonNullable<ToDotOptions<unknown, never>["getGraphAttributes"]> = () => {
	return { rankdir: "LR" };
};
