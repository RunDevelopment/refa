import { Concatenation, Element, Node, NoParent } from "../../src/ast";
import { rangesToString } from "../../src/char-util";
import { assertNever } from "../../src/util";

function toPatternConcatenation(concat: NoParent<Concatenation>): string {
	let s = "";
	const elements = concat.elements;
	for (let i = 0, l = elements.length; i < l; i++) {
		s += toPatternElement(elements[i]);
	}
	return s;
}
function toPatternElement(element: NoParent<Element>): string {
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
			if (element.lazy) {
				quant += "?";
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
		case "Unknown": {
			return `[]Unknown:${element.id}[]`;
		}
		default:
			throw assertNever(element, "Invalid element");
	}
}
function toPatternAlternatives(expressions: readonly NoParent<Concatenation>[]): string {
	if (expressions.length === 0) {
		return "[]";
	} else {
		return expressions.map(toPatternConcatenation).join("|");
	}
}

export function toPatternString(node: NoParent<Node>): string {
	switch (node.type) {
		case "Expression":
			return toPatternAlternatives(node.alternatives);
		case "Concatenation":
			return toPatternConcatenation(node);
		default:
			return toPatternElement(node);
	}
}
