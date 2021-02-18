import * as Transformers from "../../src/transformers";

describe("Transformers", function () {
	it("should all accept CreationOptions", function () {
		const options: Readonly<Transformers.CreationOptions> = {};

		Transformers.applyAssertions(options);
		Transformers.factorOut(options);
		Transformers.inline(options);
		Transformers.mergeWithQuantifier(options);
		Transformers.moveUpEmpty(options);
		Transformers.nestedQuantifiers(options);
		Transformers.patternEdgeAssertions(options);
		Transformers.removeDeadBranches(options);
		Transformers.removeUnnecessaryAssertions(options);
		Transformers.replaceAssertions(options);
		Transformers.sortAssertions(options);
		Transformers.unionCharacters(options);
	});
});
