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
				expected: /\d(?:a\w*|(?=a))/,
			},
			{
				literal: /\w+(?<=a\d)/,
				transformer,
				expected: /(?:\w*a|(?<=a))\d/,
			},
			{
				literal: /(?!\d)\w{1,2}/,
				transformer,
				expected: /[A-Z_]\w?/i,
			},
			{
				literal: /(?!\d)\w*/,
				transformer,
				expected: /(?:[A-Z_]\w*|(?!\d))/i,
			},

			{
				literal: /(?!\d)(?:\w+|:|123)/,
				transformer,
				expected: /(?!\d)(?:\w+|:)/i,
			},
			{
				literal: /(?!\d)(?:\w+|:|123)/,
				transformer,
				expected: /(?!\d)(?:\w+|:)/i,
			},
			{
				literal: /(?=\d)\s*\w+/,
				transformer,
				expected: /\d\w*/i,
			},
			{
				literal: /a$(?:a|b)/,
				transformer,
				expected: /a$(?:[])/,
			},
			{
				literal: /a$(?:a|b)?/,
				transformer,
				expected: /a$/,
			},
			{
				literal: /a$(?:a|b|)/,
				transformer,
				expected: /a$(?:)/,
			},

			{
				literal: /(?!\s)[^]*\S/,
				transformer,
				expected: /(?:\S[^]*|)\S/i,
			},
			{
				literal: /(?=a)[^]*/,
				transformer,
				expected: /(?:a[^]*|(?=a))/,
			},
			{
				literal: /(?=a)[^]*b/,
				transformer,
				expected: /(?:a[^]*)b/,
			},
			{
				literal: /(?=a)[^]*a/,
				transformer,
				expected: /(?:a[^]*|)a/,
			},
			{
				literal: /(?=\d)[^]*\w/,
				transformer,
				expected: /(?:\d[^]*\w|\d)/i,
			},
			{
				literal: /(?=\d)[^]*\w+/,
				transformer,
				expected: /(?:\d[^]*\w|\d)\w*/i,
			},
			{
				literal: /(?=\d)[^]?\w+/,
				transformer,
				expected: /(?:\d[^]{0}\w|\d)\w*/i,
			},
			{
				literal: /=begin\s[^]*^=end/m,
				transformer,
				expected: /=begin(?:\s[^]*[\n\r\u2028\u2029]|[\n\r\u2028\u2029])=end/,
			},
			{
				literal: /-?(?<!\w)\d+(?:\.\d+)?(?:E[-+]?\d+)?/i,
				transformer,
				expected: /(?:-{0}-|(?<!\w))\d+(?:\.\d+)?(?:E[-+]?\d+)?/i,
			},
			{
				literal: /(?:a(?!\d)|foo(?=\w)|bar(?!\w)|b)\w+/i,
				transformer,
				expected: /(?:A[A-Z_]|FOO\w|B\w)\w*/i,
			},
			{
				literal: /(?:\[)(?!\d)\w+(?=\])/i,
				transformer,
				expected: /(?:\[)[A-Z_]\w*(?=\])/i,
			},

			{
				literal: /(?:^|[^&])(?<!\w)(?:TRUE|FALSE)/i,
				transformer,
				expected: /(?:^|[^&])(?<!\w)(?:TRUE|FALSE)/i,
			},
		]);
	});
});
