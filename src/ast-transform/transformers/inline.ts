import { Concatenation, Parent, Assertion, NoParent } from "../../ast";
import { CreationOptions, TransformContext, Transformer } from "../transformer";
import { tryInlineAssertions } from "../util";

function onConcatenation(node: NoParent<Concatenation>, { signalMutation }: TransformContext): void {
	for (let i = 0; i < node.elements.length; i++) {
		const current = node.elements[i];

		if (current.type === "Alternation") {
			if (current.alternatives.length === 1) {
				// inline alternatives with only a single alternative (e.g. a(?:bc)d == abcd)
				node.elements.splice(i, 1, ...current.alternatives[0].elements);
				signalMutation();
				i--;
			}
		} else if (current.type === "Quantifier") {
			if (current.max === 0) {
				// remove 0 quantifiers (e.g. ab{0}c == ac)
				node.elements.splice(i, 1);
				signalMutation();
				i--;
			} else if (current.min === 1 && current.max === 1) {
				// inline constant-one quantifiers (e.g. ab{1}c == abc)
				if (current.alternatives.length === 1) {
					node.elements.splice(i, 1, ...current.alternatives[0].elements);
					signalMutation();
					i--;
				} else {
					node.elements[i] = {
						type: "Alternation",
						alternatives: current.alternatives,
						source: current.source,
					};
					signalMutation();
				}
			}
		}
	}
}
function onParent(node: NoParent<Parent>, { signalMutation }: TransformContext): void {
	for (let i = 0; i < node.alternatives.length; i++) {
		const { elements } = node.alternatives[i];
		if (elements.length === 1) {
			const first = elements[0];
			if (first.type === "Alternation") {
				node.alternatives.splice(i, 1, ...first.alternatives);
				signalMutation();
				i--;
			}
		}
	}
}
function onAssertion(node: NoParent<Assertion>, context: TransformContext): void {
	onParent(node, context);

	if (node.alternatives.length === 1 && node.alternatives[0].elements.length === 1) {
		const single = node.alternatives[0].elements[0];
		if (single.type === "Assertion") {
			// inline simple nested assertions (e.g. (?!(?<=a)) == (?<!a))
			node.kind = single.kind;
			node.negate = node.negate !== single.negate;
			node.alternatives = single.alternatives;
			context.signalMutation();
			return;
		}
	}

	// inline nested assertions (e.g. (?=a(?=b)) == (?=ab))

	if (tryInlineAssertions(node.alternatives, node.kind)) {
		context.signalMutation();
	}
}

/**
 * This transformer will simplify the AST by doing trivial inlining operations.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function inline(_options?: Readonly<CreationOptions>): Transformer {
	// we can safely ignore the options as order and ambiguity are guaranteed to be preserved
	return {
		onConcatenation,
		onAssertion,

		onAlternation: onParent,
		onExpression: onParent,
		onQuantifier: onParent,
	};
}
