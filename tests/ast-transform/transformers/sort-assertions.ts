import { itTest } from "../../helper/transform";
import { sortAssertions } from "../../../src/ast-transform/transformers/sort-assertions";

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
	});
});
