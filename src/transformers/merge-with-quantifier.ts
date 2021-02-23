import { Element, Quantifier, NoParent, TransformContext, Transformer } from "../ast";
import { MatchingDirection, structurallyEqual, structurallyEqualToQuantifiedElement } from "../ast-analysis";
import { filterMut } from "../util";
import { CreationOptions } from "./creation-options";

function consumeUsingInfiniteQuantifier(
	quant: Readonly<NoParent<Quantifier>>,
	after: NoParent<Element>,
	direction: MatchingDirection,
	context: TransformContext
): void {
	const { signalMutation } = context;

	if (
		// quant = a{n,}
		quant.max === Infinity &&
		// after = (a|b) or (a|b){0,1}
		(after.type === "Alternation" || (after.type === "Quantifier" && after.max === 1))
	) {
		for (const alt of after.alternatives) {
			const firstIndex = direction === "ltr" ? 0 : alt.elements.length - 1;
			const first: NoParent<Element> | undefined = alt.elements[firstIndex];
			if (first) {
				if (
					first.type === "Quantifier" &&
					first.max !== first.min &&
					structurallyEqual(quant.alternatives, first.alternatives)
				) {
					// we found a nested quantifier we can (partially) consume
					first.max = first.min;
					if (first.max === 0) {
						// remove the quantifier
						alt.elements.splice(firstIndex, 1);
					}
					signalMutation();
				} else if (first.type === "Alternation" || (first.type === "Quantifier" && first.max === 1)) {
					// go into
					// e.g. /a*((a*|b)c|d)/, here we go from ((a*|b)c|d) into (a*|b)
					consumeUsingInfiniteQuantifier(quant, first, direction, context);
				}
			}
		}
	}
}

/**
 * This operation tries to merge as many elements as possible with existing quantifiers.
 *
 * Examples:
 *
 * - `/a*a/` => `/a+/`
 * - `/a*(?:a+|c)/` => `/a*(?:a|c)/`
 */
export function mergeWithQuantifier(options?: Readonly<CreationOptions>): Transformer {
	// This will preserve the order of alternatives ASSUMING that there are no greedy vs lazy quantifiers.
	// This has to be changed as soon as lazy/greedy quantifiers are added.

	const { ignoreAmbiguity = false, ignoreOrder = false } = options ?? {};

	function consumeNonQuantifier(
		elements: NoParent<Element>[],
		direction: MatchingDirection,
		context: TransformContext
	): void {
		if (direction === "rtl") {
			elements.reverse();
		}

		// make e.g. a*a -> a+
		filterMut(elements, (after, before) => {
			if (before && before.type === "Quantifier" && structurallyEqualToQuantifiedElement(before, after)) {
				// e.g. a*a
				before.min++;
				before.max++;
				context.signalMutation();
				return false;
			} else {
				return true;
			}
		});

		// make e.g. a*(a+|b*)? -> a*(a|b*)
		if (ignoreAmbiguity) {
			for (let i = 1; i < elements.length; i++) {
				const quant = elements[i - 1];
				const after = elements[i];
				if (quant.type === "Quantifier" && (ignoreOrder || (!quant.lazy && quant.max === Infinity))) {
					consumeUsingInfiniteQuantifier(quant, after, direction, context);
				}
			}
		}

		if (direction === "rtl") {
			elements.reverse();
		}
	}

	return {
		onConcatenation(node, context) {
			const elements = node.elements;
			const { signalMutation } = context;

			consumeNonQuantifier(elements, "ltr", context);
			consumeNonQuantifier(elements, "rtl", context);

			// make e.g. a*a+ -> a+
			filterMut(elements, (after, before) => {
				if (before && before.type === "Quantifier" && after.type === "Quantifier") {
					const beforeConst = before.min === before.max;
					const afterConst = after.min === after.max;

					if (!ignoreAmbiguity && !(beforeConst || afterConst)) {
						// If ambiguity can't be ignored, at least one of the two quantifiers has to be constant
						return true;
					}
					if (
						!ignoreOrder &&
						!(
							beforeConst ||
							afterConst ||
							before.lazy === after.lazy ||
							(!before.lazy && before.max === Infinity) ||
							(!after.lazy && after.max === Infinity)
						)
					) {
						// If order can't be ignored, at least one of the two quantifiers has to be constant or both
						// have to have the same laziness or at least one of them is greedy and is unbounded
						return true;
					}

					if (structurallyEqual(before.alternatives, after.alternatives)) {
						// e.g. a+a* -> a+ , a{2,6}a{1,3} -> a{3,9}
						before.min += after.min;
						before.max += after.max;
						signalMutation();
						return false;
					}
				}
				return true;
			});
		},
	};
}
