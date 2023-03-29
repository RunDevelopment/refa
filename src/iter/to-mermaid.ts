import { FAIterator } from "../fa-types";
import { NodeInfo, SimplePrintOptions } from "./print-common";
import { indexNodes } from "./print-util";

export function toMermaid<S, T>(
	iter: FAIterator<S, Iterable<[S, T]>>,
	options: ToMermaidOptions<S, T> | SimplePrintOptions<T>
): string {
	const { getEdgeAttributes, getNodeAttributes = DEFAULT_GET_NODE_ATTRIBUTES } =
		"transitionToString" in options ? fromSimpleOptions(options) : options;

	const { stableIter, states, info } = indexNodes(iter);

	let s = "";

	function writeText(text: string): void {
		if (text.length === 0) {
			s += " ";
		} else if (/^\w+$/.test(text)) {
			s += text;
		} else {
			s += '"' + text.replace(/"/g, "&quot") + '"';
		}
	}
	function writeNode(node: MermaidNode): void {
		s += node.shape[0];
		writeText(node.label);
		s += node.shape[1];
	}
	function writeEdge(edge: MermaidEdge): void {
		s += "-".repeat((edge.length ?? 1) + 1) + ">";
		if (edge.label !== undefined) {
			s += "|";
			writeText(edge.label);
			s += "|";
		}
	}
	function writeNodeLabel(node: S): void {
		s += "n" + info.getId(node);
	}
	function writeNodeLabelFromIndex(index: number): void {
		s += "n" + index;
	}

	s += "flowchart LR\n";

	// nodes
	s += "%% nodes\n";
	s += "\tnull(( ))\n";
	states.forEach((node, i) => {
		s += "\t";
		writeNodeLabelFromIndex(i);
		writeNode(getNodeAttributes(node, info));
		s += "\n";
	});

	// edges
	s += "\n%% edges\n";
	s += "\tnull -.-> n0\n";
	states.forEach((node, i) => {
		stableIter.getOut(node).forEach(([to, trans], nth) => {
			s += "\t";
			writeNodeLabelFromIndex(i);
			s += " ";
			writeEdge(getEdgeAttributes(trans, nth, node, to, info));
			s += " ";
			writeNodeLabel(to);
			s += "\n";
		});
	});

	return s.trim();
}

export interface ToMermaidOptions<S, T> {
	getNodeAttributes?: (node: S, info: NodeInfo<S>) => Readonly<MermaidNode>;
	getEdgeAttributes: (transition: T, nth: number, from: S, to: S, info: NodeInfo<S>) => MermaidEdge;
}

export interface MermaidNode {
	label: string;
	shape: [string, string];
}
export interface MermaidEdge {
	label?: string;
	length?: number;
}

function fromSimpleOptions<S, T>({
	transitionToString,
	ordered = false,
}: SimplePrintOptions<T>): ToMermaidOptions<S, T> {
	return {
		getEdgeAttributes(trans, nth, from, _, info) {
			let label = transitionToString(trans);
			let length = 1;

			if (ordered && info.getNumberOfOutgoingEdges(from) > 1) {
				label = `(${nth + 1}) ${label}`;
				length = nth + 1;
			}

			return { label, length };
		},
	};
}

const DEFAULT_GET_NODE_ATTRIBUTES: NonNullable<ToMermaidOptions<unknown, never>["getNodeAttributes"]> = (
	node,
	info
) => {
	return {
		label: String(info.getId(node)),
		shape: info.isFinal(node) ? ["(((", ")))"] : ["((", "))"],
	};
};
