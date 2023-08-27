import { itTest, regexSnapshot } from "../helper/transform";
import { applyAssertions, inline, removeDeadBranches } from "../../src/transformers";
import { combineTransformers } from "../../src/ast";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = applyAssertions();

		itTest(transformer, [
			/(?=\d)\wa/,
			/(?!\d)\wa/,
			/(?=\w[^9])a\d/,
			/\da(?<=[^9]\w)/,
			{
				literal: /(?!4)(?=\d)\w(?<!2)a(?<=[^9]a)/,
				options: { maxPasses: 1 },
			},

			/(?=aa)\wa/,
			/(?!aa)\wa/,
			/(?!a)aa/,
			/a$a/,
			/a^a/,

			/(?!\d)(?<!\w)\w/,

			/(?!\d)\w+/,
			/\w+(?<!\d)/,
			/(?=\da)\w+/,
			/\w+(?<=a\d)/,
			/(?!\d)\w{1,2}/,
			/(?!\d)\w*/,

			/(?!\d)(?:\w+|:|123)/,
			/(?=\d)\s*\w+/,
			/a$(?:a|b)/,
			/a$(?:a|b)?/,
			/a$(?:a|b|)/,

			/(?!\s)[^]*\S/,
			/(?=a)[^]*/,
			/(?=a)[^]*b/,
			/(?=a)[^]*a/,
			/(?=\d)[^]*\w/,
			/(?=\d)[^]*\w+/,
			/(?=\d)[^]?\w+/,
			/=begin\s[^]*^=end/m,
			/-?(?<!\w)\d+(?:\.\d+)?(?:E[-+]?\d+)?/i,
			/(?:a(?!\d)|foo(?=\w)|bar(?!\w)|b)\w+/i,
			/(?:\[)(?!\d)\w+(?=\])/i,

			/(?:^|[^&])(?<!\w)(?:TRUE|FALSE)/i,
		]);

		it("Prism regex snapshot", function () {
			const transformer = combineTransformers([applyAssertions(), inline(), removeDeadBranches()]);

			regexSnapshot(this, transformer);
		});
	});
});
