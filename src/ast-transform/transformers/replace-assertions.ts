import { NoParent, Parent } from "../../ast";
import { filterMut } from "../../util";
import { CreationOptions, TransformContext, Transformer } from "../transformer";

export interface RemoveAssertionsCreationOptions extends CreationOptions {
	/**
	 * @default "empty-set"
	 */
	replacement?: "empty-set" | "empty-word";
}

function onParent(node: NoParent<Parent>, context: TransformContext): void {
	filterMut(node.alternatives, alternative => {
		if (alternative.elements.some(e => e.type === "Assertion")) {
			context.signalMutation();
			return false;
		}
		return true;
	});
}

/**
 * This transformer will all assertions with either the empty set or the empty word.
 */
export function replaceAssertions(options?: Readonly<RemoveAssertionsCreationOptions>): Transformer {
	const replacement = options?.replacement ?? "empty-set";

	if (replacement === "empty-word") {
		return {
			onConcatenation(node, { signalMutation }) {
				filterMut(node.elements, element => {
					if (element.type === "Assertion") {
						signalMutation();
						return false;
					}
					return true;
				});
			},
		};
	} else {
		return {
			onAlternation: onParent,
			onExpression: onParent,
			onQuantifier: onParent,
		};
	}
}
