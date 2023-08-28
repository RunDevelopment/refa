import { itTest, regexSnapshot } from "../helper/transform";
import { inline, moveUpEmpty, removeDeadBranches } from "../../src/transformers";
import { combineTransformers } from "../../src/ast";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = moveUpEmpty({ ignoreAmbiguity: true, ignoreOrder: true });

		itTest(transformer, [
			{
				literal: /||a*|b/,
				expected: /(?:a+|b)?/,
			},
			{
				literal: /a*|b*|c*/,
				expected: /(?:a+|b+|c+)?/,
			},
			{
				literal: /a*|b*|c*|d*e?/,
				expected: /a+|b+|c+|d*e?/,
			},
			{
				literal: /a(?:|||)/,
				expected: /a(?:)/,
			},

			{
				literal: /a*|b*|/,
				transformer: moveUpEmpty(),
			},
			{
				literal: /|a*|b*|/,
				transformer: moveUpEmpty(),
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
