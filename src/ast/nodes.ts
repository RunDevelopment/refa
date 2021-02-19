import { CharSet } from "../char-set";

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
