import {
	Alternation,
	Assertion,
	CharacterClass,
	Concatenation,
	Element,
	Expression,
	Node,
	Quantifier,
	NoParent,
	SourceLocation,
} from "../ast";
import { MatchingDirection, Path, stackPath } from "../ast-analysis";
import { NodePath } from "./transformer";

export function emptyAlternation(): NoParent<Alternation> {
	return {
		type: "Alternation",
		alternatives: [],
	};
}

export function isExpression(path: NodePath<Node>): path is NodePath<Expression> {
	return path.node.type === "Expression";
}
export function isCharacterClass(path: NodePath<Node>): path is NodePath<CharacterClass> {
	return path.node.type === "CharacterClass";
}
export function isAlternation(path: NodePath<Node>): path is NodePath<Alternation> {
	return path.node.type === "Alternation";
}
export function isQuantifier(path: NodePath<Node>): path is NodePath<Quantifier> {
	return path.node.type === "Quantifier";
}
export function isAssertion(path: NodePath<Node>): path is NodePath<Assertion> {
	return path.node.type === "Assertion";
}
export function isConcatenation(path: NodePath<Node>): path is NodePath<Concatenation> {
	return path.node.type === "Concatenation";
}

export function toPath<N extends Node>(path: NodePath<N>): Path<N>;
export function toPath<N extends Element>(parentPath: NodePath<Concatenation>, element: NoParent<N>): Path<N>;
export function toPath(path: NodePath<Node>, element?: NoParent<Element>): Path<Node> {
	if (element) {
		if (!isConcatenation(path)) {
			throw new Error("The parent path of an element has to be the path of a concatenation.");
		}
		const elementPath: NodePath<Element> = {
			node: element,
			parent: path,
		};
		return nodePathToPath(elementPath);
	} else {
		return nodePathToPath(path);
	}
}
function nodePathToPath(path: NodePath<Node>): Path<Node> {
	if (isExpression(path)) {
		return stackPath([], path.node);
	} else {
		const stack: NoParent<Node>[] = [];
		let p: NodePath<Node> | null = path.parent;
		while (p) {
			stack.push(p.node);
			p = p.parent;
		}
		return stackPath<Node>(stack.reverse(), path.node);
	}
}

export function copySource(source: Readonly<SourceLocation> | undefined): SourceLocation | undefined {
	if (source) {
		return { start: source.start, end: source.end };
	} else {
		return undefined;
	}
}

export function findFirst<T>(
	arr: readonly T[],
	direction: MatchingDirection,
	predicate?: (item: T) => boolean
): T | undefined {
	if (!predicate) {
		if (arr.length === 0) {
			return undefined;
		} else {
			return direction === "ltr" ? arr[0] : arr[arr.length - 1];
		}
	} else {
		if (direction === "ltr") {
			return arr.find(predicate);
		} else {
			for (let i = arr.length - 1; i >= 0; i--) {
				if (predicate(arr[i])) {
					return arr[i];
				}
			}
			return undefined;
		}
	}
}
