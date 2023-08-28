import { itTest, regexSnapshot } from "../helper/transform";
import {
	applyAssertions,
	factorOut,
	inline,
	mergeWithQuantifier,
	moveUpEmpty,
	nestedQuantifiers,
	removeDeadBranches,
	removeUnnecessaryAssertions,
	sortAssertions,
	unionCharacters,
} from "../../src/transformers";
import { combineTransformers } from "../../src/ast";

describe("Transformers", function () {
	const transformer = combineTransformers([
		applyAssertions(),
		removeUnnecessaryAssertions(),
		sortAssertions(),
		factorOut(),
		mergeWithQuantifier(),
		moveUpEmpty(),
		nestedQuantifiers(),
		inline(),
		removeDeadBranches(),
		unionCharacters(),
	]);

	describe("all transformers together", function () {
		itTest(transformer, []);

		it("Prism regex snapshot", function () {
			regexSnapshot(this, transformer);
		});
	});
});
