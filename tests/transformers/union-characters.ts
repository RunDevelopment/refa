import { itTest, regexSnapshot } from "../helper/transform";
import { inline, removeDeadBranches, unionCharacters } from "../../src/transformers";
import { CombinedTransformer } from "../../src/ast";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		itTest(null, [
			{
				literal: /(a|b|c) (a|b|dd|\w) (a||b) ([a-d]|do|[c-f])/,
				transformer: unionCharacters({}),
				expected: /(?:[abc]) (?:[ab]|dd|\w) (?:a||b) (?:[a-d]|do|[c-f])/,
			},
			{
				literal: /(a|b|c) (a|b|dd|\w) (a||b) ([a-d]|do|[c-f])/,
				transformer: unionCharacters({ ignoreOrder: true }),
				expected: /(?:[abc]) (?:\w|dd|[ab]) (?:[ab]|) (?:[a-f]|do|[cd])/,
			},
			{
				literal: /(a|b|c) (a|b|dd|\w) (a||b) ([a-d]|do|[c-f])/,
				transformer: unionCharacters({ ignoreOrder: true, ignoreAmbiguity: true }),
				expected: /(?:[abc]) (?:\w|dd) (?:[ab]|) (?:[a-f]|do)/,
			},
			{
				literal: /(a|b|c) (a|b|dd|\w) (a||b) ([a-d]|do|[c-f])/,
				transformer: unionCharacters({ ignoreAmbiguity: true }),
				expected: /(?:[abc]) (?:[ab]|dd|\w) (?:a||b) (?:[a-d]|do|[c-f])/,
			},
		]);

		it("Prism regex snapshot", function () {
			const transformer = new CombinedTransformer([unionCharacters(), inline(), removeDeadBranches()]);

			regexSnapshot(this, transformer);
		});
	});
});
