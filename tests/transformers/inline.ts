import { itTest } from "../helper/transform";
import { inline } from "../../src/transformers";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = inline();

		itTest([
			{
				literal: /a{0}a{1}(?:foo)/,
				transformer,
				expected: /afoo/,
			},
			{
				literal: /(?:a|(?:b))|c/,
				transformer,
				expected: /a|b|c/,
			},
			{
				literal: /(?=(?:a|(?:b)))/,
				transformer,
				expected: /(?=a|b)/,
			},

			{
				literal: /(?=a(?=b))/,
				transformer,
				expected: /(?=ab)/,
			},
			{
				literal: /(?=a(?:c(?=b)|foo)?)/,
				transformer,
				expected: /(?=a(?:cb|foo)?)/,
			},
			{
				literal: /(?=a(?:c(?=b)|f(?=oo)))/,
				transformer,
				expected: /(?=a(?:cb|foo))/,
			},
			{
				literal: /(?<!(?<=a)b)/,
				transformer,
				expected: /(?<!ab)/,
			},
			{
				literal: /(?=a(?!b))/,
				transformer,
				expected: /(?=a(?!b))/,
			},
			{
				literal: /(?=a(?<=b))/,
				transformer,
				expected: /(?=a(?<=b))/,
			},

			{
				literal: /(?=$)/,
				transformer,
				expected: /$/,
			},
			{
				literal: /(?!(?<=a))/,
				transformer,
				expected: /(?<!a)/,
			},
		]);
	});
});
