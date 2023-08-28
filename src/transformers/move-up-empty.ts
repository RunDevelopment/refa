import { Concatenation, NoParent, Parent, Quantifier, SourceLocation, TransformContext, Transformer } from "../ast";
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

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (mutated && needQuantifier) {
		makeContentOptional(node.alternatives, node.source);
	}
}

function onParentSafe(node: NoParent<Parent>, { signalMutation }: TransformContext): void {
	if (node.alternatives.length < 2) {
		return;
	}

	if (node.alternatives[0].elements.length === 0) {
		// e.g. `(?:|a|b)` => `(?:a|b)??`
		const quant: NoParent<Quantifier> = {
			type: "Quantifier",
			lazy: true,
			min: 0,
			max: 1,
			alternatives: node.alternatives.slice(1),
			source: copySource(node.source),
		};
		node.alternatives = [
			{
				type: "Concatenation",
				elements: [quant],
				source: copySource(node.source),
			},
		];
		signalMutation();
		return;
	}

	if (node.alternatives[node.alternatives.length - 1].elements.length === 0) {
		// e.g. `(?:a|b|)` => `(?:a|b)?`
		const quant: NoParent<Quantifier> = {
			type: "Quantifier",
			lazy: false,
			min: 0,
			max: 1,
			alternatives: node.alternatives.slice(0, -1),
			source: copySource(node.source),
		};
		node.alternatives = [
			{
				type: "Concatenation",
				elements: [quant],
				source: copySource(node.source),
			},
		];
		signalMutation();
		return;
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
 *
 * @param options
 */
export function moveUpEmpty(options?: Readonly<CreationOptions>): Transformer {
	if (!options?.ignoreOrder || !options.ignoreAmbiguity) {
		return {
			onAlternation: onParentSafe,
			onAssertion: onParentSafe,
			onExpression: onParentSafe,
			onQuantifier: onParentSafe,
		};
	} else {
		return {
			onAlternation: onParent,
			onAssertion: onParent,
			onExpression: onParent,
			onQuantifier: onParent,
		};
	}
}
