import { CharSet } from "./char-set";
import { rangesToString } from "./char-util";
import { assertNever } from "./util";

export interface SourceLocation {
	start: number;
	end: number;
}

export interface NodeBase {
	type: Node["type"];
	parent: Node["parent"];
	source: SourceLocation;
}
interface ParentNode extends NodeBase {
	alternatives: Concatenation[];
}
interface ElementNode extends NodeBase {
	parent: Concatenation;
}
interface ElementAndParentNode extends ParentNode {
	parent: Concatenation;
}

export type Element = CharacterClass | Alternation | Quantifier | Assertion;
export type Parent = Expression | Alternation | Quantifier | Assertion;
export type Node = Expression | CharacterClass | Alternation | Quantifier | Assertion | Concatenation;

export interface Alternation extends ElementAndParentNode {
	type: "Alternation";
}

export interface Assertion extends ElementAndParentNode {
	type: "Assertion";
	kind: "ahead" | "behind";
	negate: boolean;
}

export interface Quantifier extends ElementAndParentNode {
	type: "Quantifier";
	min: number;
	max: number;
}

export interface CharacterClass extends ElementNode {
	type: "CharacterClass";
	characters: CharSet;
}

export interface Expression extends ParentNode {
	parent: null;
	type: "Expression";
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
export type NoParent<T> = T extends NodeIdent ? NoParentNode<T> : T extends (infer U)[] ? NoParentArray<T> : T;

type NoSourceArray<T> = { [K in keyof T]: NoSource<T[K]> };
type NoSourceNode<T extends NodeIdent> = { [K in keyof NoSourceNodePick<T>]: NoSource<NoSourceNodePick<T>[K]> };
type NoSourceNodePick<T extends NodeIdent> = Pick<T, Exclude<keyof T, "source">>;
export type NoSource<T> = T extends NodeIdent ? NoSourceNode<T> : T extends (infer U)[] ? NoSourceArray<T> : T;

/**
 * A view on AST nodes such that `parent` and `source` properties are hidden.
 */
export type Simple<T> = NoParent<NoSource<T>>;

export function setSource<T extends Node>(node: T, source: SourceLocation): T;
export function setSource<T extends Node>(node: NoSource<T>, source: SourceLocation): T;
export function setSource<T extends Node>(node: NoParent<T>, source: SourceLocation): NoParent<T>;
export function setSource<T extends Node>(node: Simple<T>, source: SourceLocation): NoParent<T>;
export function setSource(node: Node, source: SourceLocation): Node {
	node.source = { start: source.start, end: source.end };

	switch (node.type) {
		case "Concatenation":
			node.elements.forEach(e => setSource(e, source));
			break;

		case "Alternation":
		case "Assertion":
		case "Expression":
		case "Quantifier":
			node.alternatives.forEach(c => setSource(c, source));
			break;

		case "CharacterClass":
			// no children
			break;

		default:
			throw assertNever(node);
	}

	return node;
}
export function setParent<T extends Node>(node: T, parent: T["parent"]): T;
export function setParent<T extends Node>(node: NoParent<T>, parent: T["parent"]): T;
export function setParent<T extends Node>(node: NoSource<T>, parent: T["parent"]): NoSource<T>;
export function setParent<T extends Node>(node: Simple<T>, parent: T["parent"]): NoSource<T>;
export function setParent(node: Node, parent: Node["parent"]): Node {
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

			node.elements.forEach(e => setParent(e, node));
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
				node.alternatives.forEach(c => setParent(c, node));
			}
			break;

		case "Expression":
			if (parent !== null)
				throw new Error(`The parent of an expression has to be null and cannot be a(n) ${parent.type}.`);

			node.parent = null;

			node.alternatives.forEach(c => setParent(c, node));
			break;

		default:
			throw assertNever(node);
	}

	return node;
}

/**
 * Sets the source location and parent for every expression in the whole expression subtree.
 *
 * The source location of all nodes will be set to the same given location.
 *
 * This will __NOT__ create new nodes. The returned node is the given one.
 *
 * @param node
 * @param parent
 * @param source
 */
export function desimplify(simple: Simple<Concatenation>, parent: Parent, source: SourceLocation): Concatenation;
export function desimplify(simple: Simple<Expression>, parent: null, source: SourceLocation): Expression;
export function desimplify(simple: Simple<Element>, parent: Concatenation, source: SourceLocation): Element;
export function desimplify<T extends Node>(simple: Simple<T>, parent: T["parent"], source: SourceLocation): T;
export function desimplify<T extends Node>(simple: Simple<T>, parent: T["parent"], source: SourceLocation): T {
	return setParent(setSource(simple, source), parent);
}

function toPatternConcatenation(concat: Simple<Concatenation>): string {
	let s = "";
	const elements = concat.elements;
	for (let i = 0, l = elements.length; i < l; i++) {
		s += toPatternElement(elements[i]);
	}
	return s;
}
function toPatternElement(element: Simple<Element>): string {
	switch (element.type) {
		case "Alternation": {
			return "(?:" + toPatternAlternatives(element.alternatives) + ")";
		}
		case "Assertion": {
			const kind = element.kind === "ahead" ? "" : "<";
			const negate = element.negate ? "!" : "=";
			return `(?${kind}${negate}${toPatternAlternatives(element.alternatives)})`;
		}
		case "CharacterClass": {
			return `[${rangesToString(element.characters.ranges)}]`;
		}
		case "Quantifier": {
			let quant: string;
			if (element.max === Infinity) {
				if (element.min === 0) {
					quant = "*";
				} else if (element.min === 1) {
					quant = "+";
				} else {
					quant = `{${element.min},}`;
				}
			} else if (element.max === 1) {
				if (element.min === 0) {
					quant = "?";
				} /* if (element.min === 1) */ else {
					quant = "{1}";
				}
			} else if (element.min === element.max) {
				quant = `{${element.min}}`;
			} else {
				quant = `{${element.min},${element.max}}`;
			}

			let content: string;
			if (
				element.alternatives.length === 1 &&
				element.alternatives[0].elements.length === 1 &&
				element.alternatives[0].elements[0].type === "CharacterClass"
			) {
				content = toPatternConcatenation(element.alternatives[0]);
			} else {
				content = "(?:" + toPatternAlternatives(element.alternatives) + ")";
			}

			if (!content) {
				content = "(?:)";
			}

			return content + quant;
		}
		default:
			throw assertNever(element, "Invalid element");
	}
}
function toPatternAlternatives(expressions: readonly Simple<Concatenation>[]): string {
	return expressions.map(toPatternConcatenation).join("|");
}

export function toPatternString(node: Simple<Node>): string {
	switch (node.type) {
		case "Expression":
			return toPatternAlternatives(node.alternatives);
		case "Concatenation":
			return toPatternConcatenation(node);
		default:
			return toPatternElement(node);
	}
}

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
}
export interface VisitNoSourceAstHandler {
	onAlternationEnter?(node: NoSource<Alternation>): void;
	onAlternationLeave?(node: NoSource<Alternation>): void;
	onAssertionEnter?(node: NoSource<Assertion>): void;
	onAssertionLeave?(node: NoSource<Assertion>): void;
	onCharacterClassEnter?(node: NoSource<CharacterClass>): void;
	onCharacterClassLeave?(node: NoSource<CharacterClass>): void;
	onConcatenationEnter?(node: NoSource<Concatenation>): void;
	onConcatenationLeave?(node: NoSource<Concatenation>): void;
	onExpressionEnter?(node: NoSource<Expression>): void;
	onExpressionLeave?(node: NoSource<Expression>): void;
	onQuantifierEnter?(node: NoSource<Quantifier>): void;
	onQuantifierLeave?(node: NoSource<Quantifier>): void;
}
export interface VisitSimpleAstHandler {
	onAlternationEnter?(node: Simple<Alternation>): void;
	onAlternationLeave?(node: Simple<Alternation>): void;
	onAssertionEnter?(node: Simple<Assertion>): void;
	onAssertionLeave?(node: Simple<Assertion>): void;
	onCharacterClassEnter?(node: Simple<CharacterClass>): void;
	onCharacterClassLeave?(node: Simple<CharacterClass>): void;
	onConcatenationEnter?(node: Simple<Concatenation>): void;
	onConcatenationLeave?(node: Simple<Concatenation>): void;
	onExpressionEnter?(node: Simple<Expression>): void;
	onExpressionLeave?(node: Simple<Expression>): void;
	onQuantifierEnter?(node: Simple<Quantifier>): void;
	onQuantifierLeave?(node: Simple<Quantifier>): void;
}

export function visitAst(node: Node, handler: VisitAstHandler): void;
export function visitAst(node: NoParent<Node>, handler: VisitNoParentAstHandler): void;
export function visitAst(node: NoSource<Node>, handler: VisitNoSourceAstHandler): void;
export function visitAst(node: Simple<Node>, handler: VisitSimpleAstHandler): void;
export function visitAst(node: Simple<Node>, handler: Record<string, any>): void {
	const enter = handler["on" + node.type + "Enter"];
	if (enter) {
		enter(node);
	}

	switch (node.type) {
		case "Alternation":
		case "Assertion":
		case "Expression":
		case "Quantifier":
			for (const concat of node.alternatives) {
				visitAst(concat, handler);
			}
			break;

		case "Concatenation":
			for (const element of node.elements) {
				visitAst(element, handler);
			}
			break;

		default:
			break;
	}

	const leave = handler["on" + node.type + "Leave"];
	if (leave) {
		leave(node);
	}
}
