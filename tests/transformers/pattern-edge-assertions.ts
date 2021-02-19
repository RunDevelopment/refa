import { itTest } from "../helper/transform";
import { patternEdgeAssertions } from "../../src/transformers";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		itTest([
			{
				literal: /(?<!\w)(?=\w)a(?=\w)|^f(?=\w)oo(?=sb)(?!\s*\w)(?<!\d)/,
				transformer: patternEdgeAssertions({ inline: true, remove: true }),
				expected: /(?=\w)a\w|f(?=\w)oo(?!\s*\w)(?<!\d)sb/,
			},
			{
				literal: /(?<!\w)(?=\w)a(?=\w)|^f(?=\w)oo(?=sb)(?!\s*\w)(?<!\d)/,
				transformer: patternEdgeAssertions({ inline: true, remove: false }),
				expected: /(?<!\w)(?=\w)a\w|^f(?=\w)oo(?!\s*\w)(?<!\d)sb/,
			},
			{
				literal: /(?<!\w)(?=\w)a(?=\w)|^f(?=\w)oo(?=sb)(?!\s*\w)(?<!\d)/,
				transformer: patternEdgeAssertions({ inline: false, remove: true }),
				expected: /(?=\w)a|f(?=\w)oo(?<!\d)/,
			},
			{
				literal: /(?<!\w)(?=\w)a(?=\w)|^f(?=\w)oo(?=sb)(?!\s*\w)(?<!\d)/,
				transformer: patternEdgeAssertions({ inline: false, remove: false }), // noop
				expected: /(?<!\w)(?=\w)a(?=\w)|^f(?=\w)oo(?=sb)(?!\s*\w)(?<!\d)/,
			},

			{
				literal: /foo(?:a(?=b)|c(?=d))/,
				transformer: patternEdgeAssertions({ inline: true, remove: true }),
				expected: /foo(?:ab|cd)/,
			},
			{
				literal: /foo(?:a(?=b|c)|c(?=d))?/,
				transformer: patternEdgeAssertions({ inline: true, remove: true }),
				expected: /foo(?:a(?:b|c)|cd)?/,
			},
			{
				literal: /foo(?:a(?=b)|c(?=d))+/,
				transformer: patternEdgeAssertions({ inline: true, remove: true }),
				expected: /foo(?:a(?=b)|c(?=d))+/,
			},
			{
				literal: /(?<=abc)/,
				transformer: patternEdgeAssertions({ inline: true, remove: true }),
				expected: /abc/,
			},
			{
				literal: /(?=ab(?=c))/,
				transformer: patternEdgeAssertions({ inline: true, remove: true }),
				expected: /abc/,
			},
			{
				literal: /\bfoo\b/,
				transformer: patternEdgeAssertions({ inline: true, remove: false }),
				expected: /(?:(?<!\w)(?=\w)|\w(?!\w))foo(?:(?<!\w)\w|(?<=\w)(?!\w))/,
			},
			{
				literal: /\bfoo\b/,
				transformer: patternEdgeAssertions({ inline: true, remove: true }),
				expected: /(?:(?=\w)|\w(?!\w))foo(?:(?<!\w)\w|(?<=\w))/,
			},

			{
				literal: /(?=a)\w?(?!\s)/,
				transformer: patternEdgeAssertions({ inline: true, remove: true }),
				expected: /(?=a)\w?(?!\s)/,
			},
			{
				literal: /(?=a)\w(?!\s)/,
				transformer: patternEdgeAssertions({ inline: true, remove: true }),
				expected: /(?=a)\w/,
			},
			{
				literal: /(?=a{4})\w{4}(?!\s)/,
				transformer: patternEdgeAssertions({ inline: true, remove: true }),
				expected: /(?=a{4})\w{4}/,
			},
			{
				literal: /(?=a{5})\w{4}(?!\s)/,
				transformer: patternEdgeAssertions({ inline: true, remove: true }),
				debug: true,
				expected: /(?=a{5})\w{4}(?!\s)/,
			},
		]);
	});
});
