import { NoParent, Node, Quantifier, TransformContext, Transformer, visitAst } from "../ast";
import {
	MatchingDirection,
	getFirstCharAfter,
	getFirstCharConsumedBy,
	stackPath,
	toMatchingDirection,
} from "../ast-analysis";
import { CreationOptions } from "./creation-options";

function tryMakeGreedy(
	quant: NoParent<Quantifier>,
	parents: readonly NoParent<Node>[],
	context: TransformContext
): void {
	if (!quant.lazy) {
		return;
	}

	let direction: MatchingDirection = "ltr";
	for (let i = parents.length - 1; i >= 0; i--) {
		const p = parents[i];
		if (p.type === "Assertion") {
			direction = toMatchingDirection(p.kind);
			break;
		}
	}

	const consumed = getFirstCharConsumedBy(quant.alternatives, direction, context.maxCharacter);
	if (consumed.empty) {
		return;
	}

	const after = getFirstCharAfter(stackPath(parents, quant), direction, context.maxCharacter);

	if (after.char.isDisjointWith(consumed.char)) {
		context.signalMutation();
		quant.lazy = false;
	}
}
/**
 * This transformer will try to make quantifiers greedy whenever possible.
 *
 * Note: If `ignoreOrder` is `true`, then quantifiers will always be made greedy.
 *
 * @param options
 */
export function makeGreedy(options?: Readonly<CreationOptions>): Transformer {
	const { ignoreOrder = false } = options ?? {};

	if (ignoreOrder) {
		return {
			name: "makeGreedy",
			onQuantifier(node, { signalMutation }) {
				if (node.lazy) {
					signalMutation();
					node.lazy = false;
				}
			},
		};
	}

	// we can safely ignore the options as order and ambiguity are guaranteed to be preserved
	return {
		name: "makeGreedy",

		onQuantifier(node, { signalMutation }) {
			if (node.lazy && node.min === node.max) {
				signalMutation();
				node.lazy = false;
			}
		},

		onExpression(node, context) {
			const stack: NoParent<Node>[] = [];
			function enter(node: never): void {
				stack.push(node);
			}
			function leave(): void {
				stack.pop();
			}

			visitAst(node, {
				onAlternationEnter: enter,
				onAssertionEnter: enter,
				onConcatenationEnter: enter,
				onExpressionEnter: enter,
				onQuantifierEnter: enter,

				onAlternationLeave: leave,
				onAssertionLeave: leave,
				onConcatenationLeave: leave,
				onExpressionLeave: leave,
				onQuantifierLeave(quant) {
					leave();

					tryMakeGreedy(quant, stack, context);
				},
			});
		},
	};
}
