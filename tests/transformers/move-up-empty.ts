import { itTest, regexSnapshot } from "../helper/transform";
import { inline, moveUpEmpty, removeDeadBranches } from "../../src/transformers";
import { combineTransformers } from "../../src/ast";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = moveUpEmpty({ ignoreAmbiguity: true, ignoreOrder: true });

		itTest([
			{
				literal: /||a*|b/,
				transformer,
				expected: /(?:a+|b)?/,
			},
			{
				literal: /a*|b*|c*/,
				transformer,
				expected: /(?:a+|b+|c+)?/,
			},
			{
				literal: /a*|b*|c*|d*e?/,
				transformer,
				expected: /a+|b+|c+|d*e?/,
			},
			{
				literal: /a(?:|||)/,
				transformer,
				expected: /a(?:)/,
			},
		]);

		it("Prism regex snapshot", function () {
			const transformer = combineTransformers([
				moveUpEmpty({ ignoreAmbiguity: true, ignoreOrder: true }),
				inline(),
				removeDeadBranches(),
			]);

			regexSnapshot(this, transformer);
		});
	});
});
