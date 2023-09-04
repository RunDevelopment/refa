import { CombinedTransformer } from "../ast";
import { applyAssertions } from "./apply-assertions";
import { CreationOptions } from "./creation-options";
import { factorOut } from "./factor-out";
import { inline } from "./inline";
import { makeGreedy } from "./make-greedy";
import { mergeWithQuantifier } from "./merge-with-quantifier";
import { moveUpEmpty } from "./move-up-empty";
import { nestedQuantifiers } from "./nested-quantifiers";
import { removeDeadBranches } from "./remove-dead-branches";
import { removeUnnecessaryAssertions } from "./remove-unnecessary-assertions";
import { sortAssertions } from "./sort-assertions";
import { unionCharacters } from "./union-characters";

/**
 * This transformer is a combined transformer with the goal of simplifying the AST as much as possible without
 * changing the semantics.
 *
 * The main purpose of this transformer is to provide a stable API. The specific functionality of individual
 * transformers may change over time, and transformers may depend on each other. This transformer will always
 * provide the same functionality. Namely, it will always simplify the AST.
 *
 * As with all transformers, creation option can be provided. Depending on the options, a different set of
 * underlying transformers may be used.
 *
 * @param options
 */
export function simplify(options?: Readonly<CreationOptions>): CombinedTransformer {
	return new CombinedTransformer([
		removeUnnecessaryAssertions(options),
		applyAssertions(options),
		sortAssertions(options),
		factorOut(options),
		makeGreedy(options),
		mergeWithQuantifier(options),
		moveUpEmpty(options),
		nestedQuantifiers(options),
		inline(options),
		removeDeadBranches(options),
		unionCharacters(options),
	]);
}
