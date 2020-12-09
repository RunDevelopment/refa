import { CharacterClass, Concatenation, Parent, NoParent } from "../../ast";
import { filterMut } from "../../util";
import { CreationOptions, TransformContext, PureTransformer, NodeObject } from "../transformer";

function isSingleCharacterAlternative(
	alt: NoParent<Concatenation>
): alt is { type: "Concatenation"; elements: [NoParent<CharacterClass>] } {
	return alt.elements.length === 1 && alt.elements[0].type === "CharacterClass";
}

/**
 * Combines single-character alternatives.
 *
 * This rule will try to combine as many character classes as possible to simplify the regular expression.
 * E.g. `a|b|c` => `[abc]`.
 */
export function unionCharacters(options?: Readonly<CreationOptions>): PureTransformer {
	const preserveOrder = !options?.ignoreOrder;
	const preserveAmbiguity = !options?.ignoreAmbiguity;

	function onParent({ node }: NodeObject<Parent>, { signalMutation }: TransformContext): void {
		const { alternatives } = node;
		if (alternatives.length < 2) {
			return;
		}

		let mainCharacter: NoParent<CharacterClass> | undefined = undefined;
		let adjacent = true;
		filterMut(alternatives, alternative => {
			if (isSingleCharacterAlternative(alternative)) {
				const element: NoParent<CharacterClass> = alternative.elements[0];

				if (
					mainCharacter === undefined ||
					// If order is to be preserved, character classes have to be adjacent. This works because we can
					// safely ignore the order of adjacent single-character alternatives
					// (e.g. /a|b/ == /b|a/ == /[ab]/). However, this is only true for single-character alternatives
					// (e.g. /a|bb|b/ != /a|b|bb/ == /[ab]|bb/).
					//
					// There are also cases where we could reorder alternatives without changing the regex
					// (e.g. /a|cc|b/ == /a|b|cc/ == /[ab]|cc/) but the current simple implementation seems to be good
					// enough for now.
					(!adjacent && preserveOrder)
				) {
					// this is the first single character class found
					mainCharacter = element;
					return true;
				}

				if (preserveAmbiguity) {
					// find the common characters. The regex is ambiguous for all of them. E.g. /\w|[a-z-]/
					const ambiguousChars = mainCharacter.characters.intersect(element.characters);
					if (element.characters.equals(ambiguousChars)) {
						// This means that the current character set is a subset of the main character set.
						// E.g. /\w|a/
						// In this case, we leave everything as is.
						return true;
					} else {
						signalMutation();
						mainCharacter.characters = mainCharacter.characters.union(element.characters);
						if (ambiguousChars.isEmpty) {
							// The two character sets are disjoint, so we can just remove the second one.
							// E.g. /a|b/ => /[ab]/
							return false;
						} else {
							// The two character sets are not disjoint. We will simplify the second one preserving
							// ambiguity. E.g. /[ab]|[bc]/ => /[abc]|b/
							element.characters = ambiguousChars;
							return true;
						}
					}
				} else {
					signalMutation();
					mainCharacter.characters = mainCharacter.characters.union(element.characters);
					return false;
				}
			} else {
				adjacent = false;
				return true;
			}
		});
	}

	return {
		onAlternation: onParent,
		onAssertion: onParent,
		onExpression: onParent,
		onQuantifier: onParent,
	};
}
