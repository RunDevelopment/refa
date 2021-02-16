import { Alternation, Assertion, CharacterClass, Concatenation, Expression, Quantifier, NoParent, Node } from "./nodes";

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
