import { itTest, regexSnapshot } from "../helper/transform";
import { factorOut, inline, removeDeadBranches } from "../../src/transformers";
import { combineTransformers } from "../../src/ast";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = factorOut();

		itTest(transformer, [
			{
				literal: /air|after/,
				expected: /a(?:i|fte)r/,
			},
			{
				literal: /abc|abc|abc/,
				expected: /abc(?:||)/,
			},
			{
				literal: /(?:a|b)*b\w+|(?:a|b)*a\w+/,
				expected: /(?:a|b)*(?:b|a)\w+/,
			},
			{
				literal: /\w+|\w*|\w{3,}/,
				expected: /\w*(?:\w||\w{3})/,
			},
			{
				literal: /\w+|\w{2,3}/,
				expected: /\w(?:\w*|\w{1,2})/,
			},
			{
				literal: /\w{2,4}|\w{2,3}/,
				expected: /\w{2}(?:\w{0,2}|\w?)/,
			},
		]);

		it("Prism regex snapshot", function () {
			const transformer = combineTransformers([factorOut(), inline(), removeDeadBranches()]);

			regexSnapshot(this, transformer);
		});
	});
});
