import { Concatenation, Element, Node, Parent, NoParent, TransformContext, Transformer } from "../ast";
import { assertNever } from "../util";
import { CreationOptions } from "./creation-options";

function isDead(node: NoParent<Node>): boolean {
	switch (node.type) {
		case "Alternation":
		case "Expression":
			return node.alternatives.every(a => isDead(a));

		case "Assertion":
		case "Unknown":
			// this transformer doesn't deal with assertions and unknowns
			return false;

		case "CharacterClass":
			return node.characters.isEmpty;

		case "Concatenation":
			// this is an optimization
			// we will make sure that all dead concatenation have exactly one element, so we can ignore a lot of
			// non-dead branches without having to look at their contents
			return node.elements.length === 1 && isDead(node.elements[0]);

		case "Quantifier":
			return node.min > 0 && node.alternatives.every(a => isDead(a));

		default:
			assertNever(node);
	}
}

function onConcatenation(node: NoParent<Concatenation>, { signalMutation }: TransformContext): void {
	let dead: NoParent<Element> | null = null;

	for (let i = 0; i < node.elements.length && !dead; i++) {
		const current = node.elements[i];
		if (current.type === "Quantifier") {
			if (current.alternatives.every(a => isDead(a))) {
				// dead inside
				if (current.min === 0) {
					node.elements.splice(i, 1);
					signalMutation();
					i--;
				} else {
					dead = current;
				}
			}
		} else if (isDead(current)) {
			dead = current;
		}
	}

	if (dead && node.elements.length > 1) {
		// remove all elements except for the dead on
		node.elements = [dead];
		signalMutation();
	}
}
function onParent(node: NoParent<Parent>, { signalMutation }: TransformContext): void {
	for (let i = 0; i < node.alternatives.length; i++) {
		const current = node.alternatives[i];
		if (isDead(current)) {
			node.alternatives.splice(i, 1);
			signalMutation();
			i--;
		}
	}
}

/**
 * This removes dead branches in the AST.
 *
 * Dead branches are parts of the regex that can never accept on any given input string (e.g. `[]a|b` => `b`).
 *
 * This operation may produce parent nodes with 0 alternatives. Quantifiers with 0 alternatives and a minimum of 0 will
 * be replaced with the empty concatenation (e.g. `a(?:[]b)?c` => `ac`).
 *
 * ---
 *
 * This transformer should be used in combination with {@link inline} to handle trivial simplifications.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function removeDeadBranches(_options?: Readonly<CreationOptions>): Transformer {
	return {
		onConcatenation,

		onAlternation: onParent,
		onAssertion: onParent,
		onExpression: onParent,
		onQuantifier: onParent,
	};
}
