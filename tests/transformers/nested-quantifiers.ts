import { itTest, regexSnapshot } from "../helper/transform";
import { inline, nestedQuantifiers, removeDeadBranches } from "../../src/transformers";
import { combineTransformers } from "../../src/ast";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = nestedQuantifiers({ ignoreAmbiguity: true, ignoreOrder: true });

		itTest([
			{
				literal: /(?:a+)*/,
				transformer,
				expected: /a*/,
			},
			{
				literal: /(?:a*)+/,
				transformer,
				expected: /a*/,
			},
			{
				literal: /(?:a*)?/,
				transformer,
				expected: /a*/,
			},
			{
				literal: /(?:a?)?/,
				transformer,
				expected: /a?/,
			},
			{
				literal: /(?:a+)+/,
				transformer,
				expected: /a+/,
			},
			{
				literal: /(?:a{4}){8}/,
				transformer,
				expected: /a{32}/,
			},
			{
				literal: /(?:a{2,4})+/,
				transformer,
				expected: /a{2,}/,
			},
			{
				literal: /(?:a{2,4}){8}/,
				transformer,
				expected: /a{16,32}/,
			},
			{
				literal: /(?:a{8}){2,4}/,
				transformer,
				expected: /(?:a{8}){2,4}/,
			},

			{
				literal: /(?:a*|b+c|f+)*/,
				transformer,
				expected: /(?:a{1}|b+c|f{1})*/,
			},
			{
				literal: /(?:a*|b+c|f+)?/,
				transformer,
				expected: /(?:a+|b+c|f+)?/,
			},
		]);

		it("Prism regex snapshot", function () {
			const transformer = combineTransformers([
				nestedQuantifiers({ ignoreAmbiguity: true, ignoreOrder: true }),
				inline(),
				removeDeadBranches(),
			]);

			regexSnapshot(this, transformer);
		});
	});
});
