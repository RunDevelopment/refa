import { Alternation, Assertion, Concatenation, NoParent, Parent } from "../../ast";
import { CreationOptions, noop, Transformer, TransformContext } from "../transformer";
import { isZeroLength } from "../../ast-analysis";
import { at, inRange } from "../util";

export interface PatternEdgeAssertionsCreationOptions extends CreationOptions {
	/**
	 * @default true
	 */
	inline?: boolean;
	/**
	 * @default false
	 */
	remove?: boolean;
}

/**
 * This transformer will only touch assertion that assert characters beyond the edge of the pattern.
 *
 * E.g. in `/(?<!\w)(?!\d)\w+(?=\s*<)/` only `(?<!\w)` and `(?=\s*<)` are pattern edge assertions.
 *
 * The transformer can inline non-negated assertions (e.g. `/(?<!\w)(?!\d)\w+(?=\s*<)/` => `/(?<!\w)(?!\d)\w+\s*</`)
 * and/or remove them (e.g. `/(?<!\w)(?!\d)\w+\s*</` => `/(?!\d)\w+\s*</`).
 *
 * If both inlining and removal are active, then inlining will be done first, e.g. `a(?=\w)(?!\d)` => `a(?!\d)\w`, which
 * may prevent some removal. If there are multiple assertions that can be inlined, the one closest to the edge will be
 * used, e.g. `a(?=\w)(?=\d)` => `a(?=\w)\d`.
 *
 * If neither inlining nor removal are active, then this transformer won't do anything.
 */
export function patternEdgeAssertions(options?: Readonly<PatternEdgeAssertionsCreationOptions>): Transformer {
	const inline = options?.inline ?? true;
	const remove = options?.remove ?? false;

	const enum Edge {
		START,
		END,
	}

	function handleEdgeAssertions({ elements }: NoParent<Concatenation>, context: TransformContext, edge: Edge): void {
		if (elements.length === 0) {
			return;
		}

		const compatibleKind: Assertion["kind"] = edge === Edge.START ? "behind" : "ahead";
		const increment = edge === Edge.START ? +1 : -1;
		const startIndex = edge === Edge.START ? 0 : -1;

		if (inline) {
			let assertion: NoParent<Assertion> | undefined = undefined;
			let assertionIndex = NaN;
			for (let i = startIndex; inRange(elements, i); i += increment) {
				const element = at(elements, i);
				if (element.type === "Assertion" && !element.negate && element.kind === compatibleKind) {
					assertion = element;
					assertionIndex = i;
					break;
				} else if (!isZeroLength(element)) {
					break;
				}
			}

			if (assertion) {
				context.signalMutation();
				elements.splice(assertionIndex, 1);
				const newAlternation: NoParent<Alternation> = {
					type: "Alternation",
					alternatives: assertion.alternatives,
					source: assertion.source,
				};
				handleEdge(newAlternation, context, edge);
				elements.splice(startIndex, 0, newAlternation);
			}
		}

		if (remove) {
			for (let i = startIndex; inRange(elements, i); i += increment) {
				const element = at(elements, i);
				if (element.type === "Assertion" && element.kind === compatibleKind) {
					context.signalMutation();
					elements.splice(i, 1);
					i -= increment;
				} else if (isZeroLength(element)) {
					// just continue
				} else if (element.type === "Alternation" || (element.type === "Quantifier" && element.max === 1)) {
					handleEdge(element, context, edge);
					break;
				} else {
					break;
				}
			}
		}
	}
	function handleEdge(parent: NoParent<Parent>, context: TransformContext, edge: Edge): void {
		parent.alternatives.forEach(alt => handleEdgeAssertions(alt, context, edge));
	}

	if (!inline && !remove) {
		return noop();
	} else {
		return {
			onExpression(node, context) {
				handleEdge(node, context, Edge.START);
				handleEdge(node, context, Edge.END);
			},
		};
	}
}
