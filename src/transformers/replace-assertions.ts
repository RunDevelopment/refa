import { NoParent, Parent, TransformContext, Transformer } from "../ast";
import { filterMut } from "../util";
import { CreationOptions } from "./creation-options";

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
 *
 * @param options
 */
export function replaceAssertions(options?: Readonly<RemoveAssertionsCreationOptions>): Transformer {
	const replacement = options?.replacement ?? "empty-set";

	if (replacement === "empty-word") {
		return {
			name: "replaceAssertions",
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
			name: "replaceAssertions",
			onAlternation: onParent,
			onExpression: onParent,
			onQuantifier: onParent,
		};
	}
}
