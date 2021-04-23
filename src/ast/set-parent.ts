import { NoParent, Node } from "./nodes";
import { assertNever } from "../util";

/**
 * Sets the `parent` properties of the given node and all of its child nodes.
 *
 * @param node
 * @param parent The parent of `node`.
 */
export function setParent<T extends Node>(node: T | NoParent<T>, parent: T["parent"]): asserts node is T {
	setParentImpl(node as Node, parent as Node["parent"]);
}
function setParentImpl(node: Node, parent: Node["parent"]): void {
	switch (node.type) {
		case "Concatenation":
			if (parent === null) throw new Error("The parent of a concatenation cannot be null.");

			switch (parent.type) {
				case "Alternation":
				case "Assertion":
				case "Expression":
				case "Quantifier":
					node.parent = parent;
					break;

				case "Concatenation":
					throw new Error("A concatenation cannot be parent of a concatenation.");

				default:
					throw assertNever(parent);
			}

			node.elements.forEach(e => setParentImpl(e, node));
			break;

		case "Alternation":
		case "Assertion":
		case "CharacterClass":
		case "Quantifier":
		case "Unknown":
			if (parent === null) throw new Error(`The parent of a(n) ${node.type} cannot be null.`);

			if (parent.type === "Concatenation") {
				node.parent = parent;
			} else {
				throw new Error(`A(n) ${parent.type} cannot be parent of a(n) ${node.type}.`);
			}

			if (node.type !== "CharacterClass" && node.type !== "Unknown") {
				node.alternatives.forEach(c => setParentImpl(c, node));
			}
			break;

		case "Expression":
			if (parent !== null)
				throw new Error(`The parent of an expression has to be null and cannot be a(n) ${parent.type}.`);

			node.parent = null;

			node.alternatives.forEach(c => setParentImpl(c, node));
			break;

		default:
			throw assertNever(node);
	}
}
