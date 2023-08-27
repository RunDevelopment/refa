import { itTest } from "../helper/transform";
import { removeDeadBranches } from "../../src/transformers";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = removeDeadBranches();

		itTest(transformer, [
			{
				literal: /(?:[])*foo|[]bar|ab?c[]/,
				expected: /foo/,
			},
			{
				literal: /(?:[])+foo|[]?bar|abc(?:[]|(?:[]|[]+){3,5}|def)/,
				expected: /bar|abc(?:def)/,
			},
		]);
	});
});
