import { CharSet } from "./char-set";
import { assertNever } from "./util";

export interface SourceLocation {
	start: number;
	end: number;
}

export interface NodeBase {
	type: Node["type"];
	parent: Node["parent"];
	source?: SourceLocation;
}

export type Element = CharacterClass | Alternation | Quantifier | Assertion;
export type Parent = Expression | Alternation | Quantifier | Assertion;
export type Node = Expression | CharacterClass | Alternation | Quantifier | Assertion | Concatenation;

export interface Alternation extends NodeBase {
	type: "Alternation";
	parent: Concatenation;
	alternatives: Concatenation[];
}

export interface Assertion extends NodeBase {
	type: "Assertion";
	parent: Concatenation;
	alternatives: Concatenation[];
	kind: "ahead" | "behind";
	negate: boolean;
}

export interface Quantifier extends NodeBase {
	type: "Quantifier";
	parent: Concatenation;
	alternatives: Concatenation[];
	min: number;
	max: number;
}

export interface CharacterClass extends NodeBase {
	type: "CharacterClass";
	parent: Concatenation;
	characters: CharSet;
}

export interface Expression extends NodeBase {
	type: "Expression";
	parent: null;
	alternatives: Concatenation[];
}

export interface Concatenation extends NodeBase {
	type: "Concatenation";
	parent: Parent;
	elements: Element[];
}

type NodeIdent = { type: Node["type"] };

type NoParentArray<T> = { [K in keyof T]: NoParent<T[K]> };
type NoParentNode<T extends NodeIdent> = { [K in keyof NoParentNodePick<T>]: NoParent<NoParentNodePick<T>[K]> };
type NoParentNodePick<T extends NodeIdent> = Pick<T, Exclude<keyof T, "parent">>;
/**
 * A view of an AST node that hides the `parent` property.
 */
export type NoParent<T> = T extends NodeIdent ? NoParentNode<T> : T extends unknown[] ? NoParentArray<T> : T;

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
			if (parent === null) throw new Error(`The parent of a(n) ${node.type} cannot be null.`);

			if (parent.type === "Concatenation") {
				node.parent = parent;
			} else {
				throw new Error(`A(n) ${parent.type} cannot be parent of a(n) ${node.type}.`);
			}

			if (node.type !== "CharacterClass") {
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
			// no children
			break;

		default:
			throw assertNever(node);
	}
}

export interface VisitNodesHandler {
	onAlternationEnter?(node: Alternation): void;
	onAlternationLeave?(node: Alternation): void;
	onAssertionEnter?(node: Assertion): void;
	onAssertionLeave?(node: Assertion): void;
	onCharacterClassEnter?(node: CharacterClass): void;
	onCharacterClassLeave?(node: CharacterClass): void;
	onConcatenationEnter?(node: Concatenation): void;
	onConcatenationLeave?(node: Concatenation): void;
	onExpressionEnter?(node: Expression): void;
	onExpressionLeave?(node: Expression): void;
	onQuantifierEnter?(node: Quantifier): void;
	onQuantifierLeave?(node: Quantifier): void;
}
export interface VisitNoParentNodesHandler {
	onAlternationEnter?(node: NoParent<Alternation>): void;
	onAlternationLeave?(node: NoParent<Alternation>): void;
	onAssertionEnter?(node: NoParent<Assertion>): void;
	onAssertionLeave?(node: NoParent<Assertion>): void;
	onCharacterClassEnter?(node: NoParent<CharacterClass>): void;
	onCharacterClassLeave?(node: NoParent<CharacterClass>): void;
	onConcatenationEnter?(node: NoParent<Concatenation>): void;
	onConcatenationLeave?(node: NoParent<Concatenation>): void;
	onExpressionEnter?(node: NoParent<Expression>): void;
	onExpressionLeave?(node: NoParent<Expression>): void;
	onQuantifierEnter?(node: NoParent<Quantifier>): void;
	onQuantifierLeave?(node: NoParent<Quantifier>): void;
}
/**
 * Calls the given visitor on the given node and all of its children.
 *
 * If the given visitor throws an error, the traversal will stop and the error will be re-thrown.
 *
 * @param node
 * @param visitor
 */
export function visitNodes(node: Node, visitor: VisitNodesHandler): void;
export function visitNodes(node: NoParent<Node>, visitor: VisitNoParentNodesHandler): void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function visitNodes(node: NoParent<Node>, visitor: Record<string, any>): void {
	const enter = visitor["on" + node.type + "Enter"];
	if (enter) {
		enter(node);
	}

	switch (node.type) {
		case "Alternation":
		case "Assertion":
		case "Expression":
		case "Quantifier":
			for (const concat of node.alternatives) {
				visitNodes(concat, visitor);
			}
			break;

		case "Concatenation":
			for (const element of node.elements) {
				visitNodes(element, visitor);
			}
			break;

		default:
			break;
	}

	const leave = visitor["on" + node.type + "Leave"];
	if (leave) {
		leave(node);
	}
}
