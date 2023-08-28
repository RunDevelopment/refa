import { itTest, regexSnapshot } from "../helper/transform";
import { inline, mergeWithQuantifier, removeDeadBranches } from "../../src/transformers";
import { CombinedTransformer } from "../../src/ast";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = mergeWithQuantifier();
		const transformerIgnoreAmbiguity = mergeWithQuantifier({ ignoreAmbiguity: true });

		itTest(transformer, [
			{
				literal: /a*a/,
				expected: /a+/,
			},
			{
				literal: /a*a/,
				transformer: transformerIgnoreAmbiguity,
				expected: /a+/,
			},

			{
				literal: /a*a+/,
				expected: /a*a+/,
			},
			{
				literal: /a*a+/,
				transformer: transformerIgnoreAmbiguity,
				expected: /a+/,
			},

			{
				literal: /a*(?:a?|a+|a{1,2})/,
				expected: /a*(?:a?|a+|a{1,2})/,
			},
			{
				literal: /a*(?:a?|a+|a{1,2})/,
				transformer: transformerIgnoreAmbiguity,
				expected: /a*(?:|a{1}|a{1})/,
			},
		]);

		it("Prism regex snapshot", function () {
			const transformer = new CombinedTransformer([mergeWithQuantifier(), inline(), removeDeadBranches()]);

			regexSnapshot(this, transformer);
		});
	});
});
