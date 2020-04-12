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

type SimpleArray<T> = { readonly [K in keyof T]: Simple<T[K]>; };
type SimpleNode<T extends NodeBase> = { readonly [K in keyof SimpleNodePick<T>]: Simple<SimpleNodePick<T>[K]>; };
type SimpleNodePick<T extends NodeBase> = Pick<T, Exclude<keyof T, "parent" | "source">>;

/**
 * A view on AST nodes such that `parent` and `source` properties are hidden.
 */
export type Simple<T> =
	T extends NodeBase ? SimpleNode<T> :
	T extends (infer U)[] ? SimpleArray<T> :
	T;

type MutSimpleArray<T> = { [K in keyof T]: MutSimple<T[K]>; };
type MutSimpleNode<T extends NodeBase> = { [K in keyof MutSimpleNodePick<T>]: MutSimple<MutSimpleNodePick<T>[K]>; };
type MutSimpleNodePick<T extends NodeBase> = Pick<T, Exclude<keyof T, "parent" | "source">>;

/**
 * A view on AST nodes such that `parent` and `source` properties are hidden.
 */
export type MutSimple<T> =
	T extends NodeBase ? MutSimpleNode<T> :
	T extends (infer U)[] ? MutSimpleArray<T> :
	T;

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
export function desimplify(simple: Simple<Element>, parent: Concatenation, source: SourceLocation): Element;
export function desimplify(simple: Simple<Expression>, parent: null, source: SourceLocation): Expression;
export function desimplify(simple: Simple<Node>, parent: Parent | Concatenation | null, source: SourceLocation): Node {
	const node = simple as Node;

	node.source = source;

	switch (node.type) {
		case "Concatenation":
			if (parent === null)
				throw new Error("The parent of a concatenation cannot be null.");

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

			node.elements.forEach(e => desimplify(e, node, source));
			break;

		case "Alternation":
		case "Assertion":
		case "CharacterClass":
		case "Quantifier":
			if (parent === null)
				throw new Error(`The parent of a(n) ${node.type} cannot be null.`);

			if (parent.type === "Concatenation") {
				node.parent = parent;
			} else {
				throw new Error(`A(n) ${parent.type} cannot be parent of a(n) ${node.type}.`);
			}

			if (node.type !== "CharacterClass") {
				node.alternatives.forEach(c => desimplify(c, node, source));
			}
			break;

		case "Expression":
			if (parent !== null)
				throw new Error(`The parent of an expression has to be null and cannot be a(n) ${parent.type}.`);

			node.parent = null;

			node.alternatives.forEach(c => desimplify(c, node, source));
			break;

		default:
			throw assertNever(node);
	}

	return node;
}


function toPatternConcatenation(concat: Simple<Concatenation>): string {
	let s = "";
	const elements = concat.elements;
	for (let i = 0, l = elements.length; i < l; i++) {
		s += toPatternElement(elements[i])
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
					quant = `{${element.min},}`
				}
			} else if (element.max === 1) {
				if (element.min === 0) {
					quant = "?";
				} else /* if (element.min === 1) */ {
					quant = "";
				}
			} else if (element.min === element.max) {
				quant = `{${element.min}}`;
			} else {
				quant = `{${element.min},${element.max}}`;
			}

			let content: string;
			if (element.alternatives.length === 1) {
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

export function visitAst(node: Node, handler: VisitAstHandler): void;
export function visitAst(node: Node, handler: Record<string, any>): void {
	const enter = handler["on" + node.type + "Enter"];
	const leave = handler["on" + node.type + "Leave"];

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

	if (leave) {
		leave(node);
	}
}
