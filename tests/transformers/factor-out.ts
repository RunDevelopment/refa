import { itTest } from "../helper/transform";
import { factorOut } from "../../src/transformers";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = factorOut();

		itTest([
			{
				literal: /air|after/,
				transformer,
				expected: /a(?:i|fte)r/,
			},
			{
				literal: /abc|abc|abc/,
				transformer,
				expected: /abc(?:||)/,
			},
			{
				literal: /(?:a|b)*b\w+|(?:a|b)*a\w+/,
				transformer,
				expected: /(?:a|b)*(?:b|a)\w+/,
			},
			{
				literal: /\w+|\w*|\w{3,}/,
				transformer,
				expected: /\w*(?:\w||\w{3})/i,
			},
			{
				literal: /\w+|\w{2,3}/,
				transformer,
				expected: /\w(?:\w*|\w{1,2})/i,
			},
			{
				literal: /\w{2,4}|\w{2,3}/,
				transformer,
				expected: /\w{2}(?:\w{0,2}|\w?)/i,
			},
		]);
	});
});
