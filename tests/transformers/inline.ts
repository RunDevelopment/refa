import { itTest } from "../helper/transform";
import { inline } from "../../src/transformers";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = inline();

		itTest(transformer, [
			{
				literal: /a{0}a{1}(?:foo)/,
				expected: /afoo/,
			},
			{
				literal: /(?:a|(?:b))|c/,
				expected: /a|b|c/,
			},
			{
				literal: /(?=(?:a|(?:b)))/,
				expected: /(?=a|b)/,
			},

			{
				literal: /(?=a(?=b))/,
				expected: /(?=ab)/,
			},
			{
				literal: /(?=a(?:c(?=b)|foo)?)/,
				expected: /(?=a(?:cb|foo)?)/,
			},
			{
				literal: /(?=a(?:c(?=b)|f(?=oo)))/,
				expected: /(?=a(?:cb|foo))/,
			},
			{
				literal: /(?<!(?<=a)b)/,
				expected: /(?<!ab)/,
			},
			{
				literal: /(?=a(?!b))/,
				transformer,
				expected: /(?=a(?!b))/,
			},
			{
				literal: /(?=a(?<=b))/,
				expected: /(?=a(?<=b))/,
			},

			{
				literal: /(?=$)/,
				expected: /$/,
			},
			{
				literal: /(?!(?<=a))/,
				expected: /(?<!a)/,
			},
		]);
	});
});
