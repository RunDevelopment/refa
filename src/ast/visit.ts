import {
	Alternation,
	Assertion,
	CharacterClass,
	Concatenation,
	Expression,
	NoParent,
	Node,
	Quantifier,
	Unknown,
} from "./nodes";

export interface VisitAstHandler {
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
	onUnknownEnter?(node: Unknown): void;
	onUnknownLeave?(node: Unknown): void;
}
export interface VisitNoParentAstHandler {
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
	onUnknownEnter?(node: NoParent<Unknown>): void;
	onUnknownLeave?(node: NoParent<Unknown>): void;
}
/**
 * Calls the given visitor on the given node and all of its children.
 *
 * If the given visitor throws an error, the traversal will stop and the error will be re-thrown.
 *
 * @param node
 * @param visitor
 */
export function visitAst(node: Node, visitor: VisitAstHandler): void;
export function visitAst(node: NoParent<Node>, visitor: VisitNoParentAstHandler): void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function visitAst(node: NoParent<Node>, visitor: Record<string, any>): void {
	type Fn = (node: NoParent<Node>) => void;
	const enter: Fn | undefined = visitor["on" + node.type + "Enter"];
	if (enter) {
		enter(node);
	}

	switch (node.type) {
		case "Alternation":
		case "Assertion":
		case "Expression":
		case "Quantifier":
			for (const concat of node.alternatives) {
				visitAst(concat, visitor);
			}
			break;

		case "Concatenation":
			for (const element of node.elements) {
				visitAst(element, visitor);
			}
			break;

		default:
			break;
	}

	const leave: Fn | undefined = visitor["on" + node.type + "Leave"];
	if (leave) {
		leave(node);
	}
}
