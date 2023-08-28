import { itTest, regexSnapshot } from "../helper/transform";
import { inline, removeDeadBranches, sortAssertions } from "../../src/transformers";
import { CombinedTransformer } from "../../src/ast";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = sortAssertions();

		itTest(transformer, [
			{
				literal: /(?=a)(?!b)(?<!c)(?<=d)/,
				expected: /(?<!c)(?<=d)(?=a)(?!b)/,
			},
			{
				literal: /(?=a)(?<!c) (?!b)(?<=d)/,
				expected: /(?<!c)(?=a) (?<=d)(?!b)/,
			},
		]);

		it("Prism regex snapshot", function () {
			const transformer = new CombinedTransformer([sortAssertions(), inline(), removeDeadBranches()]);

			regexSnapshot(this, transformer);
		});
	});
});
