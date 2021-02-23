import { Concatenation, NoParent, Parent, SourceLocation, TransformContext, Transformer } from "../ast";
import { isEmpty, isPotentiallyEmpty } from "../ast-analysis";
import { filterMut } from "../util";
import { CreationOptions } from "./creation-options";
import { copySource } from "./util";

function makeContentOptional(
	alternatives: NoParent<Concatenation>[],
	source: Readonly<SourceLocation> | undefined
): void {
	if (alternatives.length === 0) {
		// `[]?` == `ε`
		alternatives.push({
			type: "Concatenation",
			elements: [],
			source: copySource(source),
		});
		return;
	}

	if (alternatives.length === 1 && alternatives[0].elements.length === 1) {
		const single = alternatives[0].elements[0];
		if (single.type === "Quantifier" && single.min === 1) {
			single.min = 0;
			return;
		}
	}

	const copy = [...alternatives];
	alternatives.length = 0;
	alternatives.push({
		type: "Concatenation",
		elements: [
			{
				type: "Quantifier",
				lazy: false,
				min: 0,
				max: 1,
				alternatives: copy,
				source: copySource(source),
			},
		],
		source: copySource(source),
	});
}

function onParent(node: NoParent<Parent>, { signalMutation }: TransformContext): void {
	if (node.alternatives.length < 2) {
		return;
	}

	let mutated = false;
	let needQuantifier = true;
	filterMut(node.alternatives, alt => {
		if (isEmpty(alt)) {
			signalMutation();
			mutated = true;
			return false;
		}

		if (alt.elements.length === 1) {
			const first = alt.elements[0];
			if (first.type === "Quantifier" && first.min === 0 && first.max > 0) {
				signalMutation();
				mutated = true;
				first.min = 1;
				if (first.max === 1 && first.alternatives.length === 1) {
					// trivial inlining
					alt.elements = first.alternatives[0].elements;
				}
				return true;
			}
		}

		if (isPotentiallyEmpty(alt)) {
			needQuantifier = false;
		}
		return true;
	});

	if (mutated && needQuantifier) {
		makeContentOptional(node.alternatives, node.source);
	}
}

/**
 * This tries to simplify how a given sub-expression accepts the empty string. The goal is to modify the sub-expression
 * such that exactly one path accepts the empty string. This has the emergent result that the operator that causes the
 * sub-expression to accept the empty string moves closer to the root of the tree.
 *
 * Examples:
 *
 * - `a(?:b*|d?)` => `a(?:b+|d)?`
 * - `||a*|b` => `(?:a+|b)?`
 *
 * This operation largely ignores the order of alternatives and usually reduces the ambiguity of the expression. If
 * order or ambiguity have to be preserved, then the effectiveness of this transformer will be greatly reduced.
 */
export function moveUpEmpty(options?: Readonly<CreationOptions>): Transformer {
	if (!options?.ignoreOrder || !options?.ignoreAmbiguity) {
		return {}; // noop
	} else {
		return {
			onAlternation: onParent,
			onAssertion: onParent,
			onExpression: onParent,
			onQuantifier: onParent,
		};
	}
}
