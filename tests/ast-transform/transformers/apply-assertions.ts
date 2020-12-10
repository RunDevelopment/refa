import { itTest } from "../../helper/transform";
import { applyAssertions } from "../../../src/ast-transform/transformers/apply-assertions";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = applyAssertions();

		itTest([
			{
				literal: /(?=\d)\wa/,
				transformer,
				expected: /\da/,
			},
			{
				literal: /(?!\d)\wa/,
				transformer,
				expected: /[A-Z_a-z]a/,
			},
			{
				literal: /(?=\w[^9])a\d/,
				transformer,
				expected: /a[0-8]/,
			},
			{
				literal: /\da(?<=[^9]\w)/,
				transformer,
				expected: /[0-8]a/,
			},
			{
				literal: /(?!4)(?=\d)\w(?<!2)a(?<=[^9]a)/,
				transformer,
				options: { maxPasses: 1 },
				expected: /[0135-8]a/,
			},

			{
				literal: /(?=aa)\wa/,
				transformer,
				expected: /aa/,
			},
			{
				literal: /(?!aa)\wa/,
				transformer,
				expected: /(?!aa)\wa/,
			},
			{
				literal: /(?!a)aa/,
				transformer,
				expected: /[]a/,
			},
			{
				literal: /a$a/,
				transformer,
				expected: /a[]/,
			},
			{
				literal: /a^a/,
				transformer,
				expected: /[]a/,
			},

			{
				literal: /(?!\d)(?<!\w)\w/,
				transformer,
				expected: /(?<!\w)[A-Z_]/i,
			},

			{
				literal: /(?!\d)\w+/,
				transformer,
				expected: /[A-Z_]\w*/i,
			},
			{
				literal: /\w+(?<!\d)/,
				transformer,
				expected: /\w*[A-Z_]/i,
			},
			{
				literal: /(?=\da)\w+/,
				transformer,
				expected: /\d(?=a)\w*/,
			},
			{
				literal: /\w+(?<=a\d)/,
				transformer,
				expected: /\w*(?<=a)\d/,
			},
			{
				literal: /(?!\d)\w{1,2}/,
				transformer,
				expected: /[A-Z_]\w?/i,
			},
			{
				literal: /(?!\d)\w*/,
				transformer,
				expected: /(?!\d)\w*/i,
			},
		]);
	});
});
