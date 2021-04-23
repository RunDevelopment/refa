import { itTest, regexSnapshot } from "../helper/transform";
import { inline, removeDeadBranches, sortAssertions } from "../../src/transformers";
import { combineTransformers } from "../../src/ast";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = sortAssertions();

		itTest([
			{
				literal: /(?=a)(?!b)(?<!c)(?<=d)/,
				transformer,
				expected: /(?<!c)(?<=d)(?=a)(?!b)/,
			},
			{
				literal: /(?=a)(?<!c) (?!b)(?<=d)/,
				transformer,
				expected: /(?<!c)(?=a) (?<=d)(?!b)/,
			},
		]);

		it("Prism regex snapshot", function () {
			const transformer = combineTransformers([sortAssertions(), inline(), removeDeadBranches()]);

			regexSnapshot(this, transformer);
		});
	});
});
