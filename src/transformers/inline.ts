import { Assertion, Concatenation, NoParent, Parent, TransformContext, Transformer } from "../ast";
import { CreationOptions } from "./creation-options";
import { tryInlineAssertions } from "./util";

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
 *
 * It will:
 *
 * 1. Inline single-alternative alternations in concatenation (e.g. `a(?:b)c` => `abc`).
 * 2. Inline single-alternation concatenations (e.g. `(?:(?:a|b)|c)` => `(?:a|b|c)`).
 * 3. Inline constant-one quantifiers (e.g. `ab{1}c` => `abc`).
 * 4. Remove constant-zero quantifiers (e.g. `ab{0}c` => `ac`).
 * 5. Inline trivially nested assertions (e.g. `(?!(?<!a))` => `(?<=a)`).
 * 6. Inline nested assertions at the end of the expression tree (e.g. `(?!a(?=b))` => `(?!ab)`).
 *
 * ---
 *
 * This transformer should be used in combination with {@link removeDeadBranches} to handle trivial simplifications.
 *
 * @param _options
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
