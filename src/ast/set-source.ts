import { Node, NoParent, SourceLocation } from "./nodes";
import { assertNever } from "../util";

/**
 * Sets the `source` property of the given node and all of its child nodes.
 *
 * If `source` is not a function, then the source object will be copied for all `source` properties to be set. The
 * object will be copied using the `start` and `end` properties alone, other properties will not be copied.
 *
 * @param node
 * @param source
 * @param overwrite
 */
export function setSource(
	node: NoParent<Node>,
	source: SourceLocation | (() => SourceLocation),
	overwrite?: boolean
): void {
	if (typeof source !== "function") {
		const { start, end } = source;
		source = () => ({ start, end });
	}

	setSourceImpl(node, source, overwrite);
}
function setSourceImpl(node: NoParent<Node>, getSource: () => SourceLocation, overwrite?: boolean): void {
	if (overwrite || !node.source) {
		node.source = getSource();
	} else {
		const { start, end } = node.source;
		getSource = () => ({ start, end });
	}

	switch (node.type) {
		case "Concatenation":
			node.elements.forEach(e => setSourceImpl(e, getSource, overwrite));
			break;

		case "Alternation":
		case "Assertion":
		case "Expression":
		case "Quantifier":
			node.alternatives.forEach(c => setSourceImpl(c, getSource, overwrite));
			break;

		case "CharacterClass":
		case "Unknown":
			// no children
			break;

		default:
			throw assertNever(node);
	}
}
