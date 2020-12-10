import { itTest } from "../../helper/transform";
import { mergeWithQuantifier } from "../../../src/ast-transform/transformers/merge-with-quantifier";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = mergeWithQuantifier();
		const transformerIgnoreAmbiguity = mergeWithQuantifier({ ignoreAmbiguity: true });

		itTest([
			{
				literal: /a*a/,
				transformer,
				expected: /a+/,
			},
			{
				literal: /a*a/,
				transformer: transformerIgnoreAmbiguity,
				expected: /a+/,
			},

			{
				literal: /a*a+/,
				transformer,
				expected: /a*a+/,
			},
			{
				literal: /a*a+/,
				transformer: transformerIgnoreAmbiguity,
				expected: /a+/,
			},

			{
				literal: /a*(?:a?|a+|a{1,2})/,
				transformer,
				expected: /a*(?:a?|a+|a{1,2})/,
			},
			{
				literal: /a*(?:a?|a+|a{1,2})/,
				transformer: transformerIgnoreAmbiguity,
				expected: /a*(?:|a{1}|a{1})/,
			},
		]);
	});
});
