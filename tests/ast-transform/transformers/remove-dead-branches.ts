import { itTest } from "../../helper/transform";
import { removeDeadBranches } from "../../../src/ast-transform/transformers/remove-dead-branches";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = removeDeadBranches();

		itTest([
			{
				literal: /(?:[])*foo|[]bar|ab?c[]/,
				transformer,
				expected: /foo/,
			},
			{
				literal: /(?:[])+foo|[]?bar|abc(?:[]|(?:[]|[]+){3,5}|def)/,
				transformer,
				expected: /bar|abc(?:def)/,
			},
		]);
	});
});
