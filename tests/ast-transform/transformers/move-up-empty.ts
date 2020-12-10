import { itTest } from "../../helper/transform";
import { moveUpEmpty } from "../../../src/ast-transform/transformers/move-up-empty";

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
	});
});
