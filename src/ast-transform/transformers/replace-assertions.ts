import { CreationOptions, PureTransformer } from "../transformer";

export interface RemoveAssertionsCreationOptions extends CreationOptions {
	/**
	 * @default "empty-set"
	 */
	replacement?: "empty-set" | "empty-word";
}

/**
 * This transformer will all assertions with either the empty set or the empty word.
 */
export function replaceAssertions(options?: Readonly<RemoveAssertionsCreationOptions>): PureTransformer {
	const replacement = options?.replacement ?? "empty-set";

	return {
		onConcatenation({ node }, { signalMutation }) {
			for (let i = 0; i < node.elements.length; i++) {
				const element = node.elements[i];

				if (element.type === "Assertion") {
					signalMutation();
					if (replacement === "empty-word") {
						node.elements.splice(i, 1);
						i--;
					} else {
						node.elements = [{ type: "Alternation", alternatives: [] }];
						return;
					}
				}
			}
		},
	};
}
