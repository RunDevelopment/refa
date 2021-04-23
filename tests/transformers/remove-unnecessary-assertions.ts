import { itTest, regexSnapshot } from "../helper/transform";
import { combineTransformers } from "../../src/ast";
import { inline, removeDeadBranches, removeUnnecessaryAssertions } from "../../src/transformers";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = combineTransformers([
			removeUnnecessaryAssertions(),
			removeDeadBranches(), // remove dead branches...
			inline(), // and inline, so the output regexes are cleaner
		]);

		itTest([
			{
				literal: /(?=\s*)a|(?!\s*)b|c(?<=\s*)|d(?<!\s*)/,
				transformer,
				expected: /a|c/,
			},
			{
				literal: /(?=[])a|(?![])b|c(?<=[])|d(?<![])/,
				transformer,
				expected: /b|d/,
			},

			{
				literal: /\bfoo\b|\Bfoo\B/,
				transformer,
				expected: /(?<!\w)foo(?!\w)|(?<=\w)foo(?=\w)/,
			},

			{
				literal: /(?=\s*$|\S)[\s\S]+/,
				transformer,
				expected: /(?=\s*$|\S)[^]+/i,
			},
			{
				literal: /(?=\s*$|\S)a+/,
				transformer,
				expected: /a+/,
			},
			{
				literal: /(?=\s?$|\S)a+/,
				transformer,
				expected: /a+/,
			},
			{
				literal: /(?=\s$|\S)a+/,
				transformer,
				expected: /a+/,
			},
			{
				literal: /(?=(?:\s|bb)$|\S)a+/,
				transformer,
				expected: /a+/,
			},
			{
				literal: /(?=(?:\s|b*b|)$|\S)a+/,
				transformer,
				expected: /a+/,
			},
			{
				literal: /(?!b)a+/,
				transformer,
				expected: /a+/,
			},
			{
				literal: /(?!b+)a+/,
				transformer,
				expected: /a+/,
			},

			{
				literal: /(?!\s*::|\d)\w+/,
				transformer,
				expected: /(?!\d)\w+/i,
			},
			{
				literal: /(?=\s*::|\d)\w+/,
				transformer,
				expected: /(?=\d)\w+/i,
			},

			{
				literal: /^^/,
				transformer,
				expected: /^/i,
			},
			{
				literal: /$$$$$/,
				transformer,
				expected: /$/i,
			},
			{
				literal: /(?!\w)$/,
				transformer,
				expected: /$/i,
			},
			{
				literal: /$(?!\w)/,
				transformer,
				expected: /$/i,
			},

			{
				literal: /^(?:@|(?<!\w))[A-Z_]\w*/i,
				transformer,
				expected: /^(?:@|)[A-Z_]\w*/i,
			},
			{
				literal: /^(?:@|(?<!\w)(?!\w))/i,
				transformer,
				expected: /^(?:@|(?!\w))/i,
			},
			{
				literal: /^(?:@|(?<!\w)(?!\w))$/i,
				transformer,
				expected: /^(?:@|)$/i,
			},
			{
				literal: /(?:@|(?<!\w)(?!\w))$/i,
				transformer,
				expected: /(?:@|(?<!\w))$/i,
			},

			{
				literal: /^\bfoo\b$/,
				transformer,
				expected: /^foo$/,
			},
			{
				literal: /^\b(?:foo|bar)\b$/,
				transformer,
				expected: /^(?:foo|bar)$/,
			},
		]);

		it("Prism regex snapshot", function () {
			const transformer = combineTransformers([removeUnnecessaryAssertions(), inline(), removeDeadBranches()]);

			regexSnapshot(this, transformer);
		});
	});
});
