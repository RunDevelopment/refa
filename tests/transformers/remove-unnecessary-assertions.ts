import { itTest, regexSnapshot } from "../helper/transform";
import { CombinedTransformer } from "../../src/ast";
import { inline, removeDeadBranches, removeUnnecessaryAssertions } from "../../src/transformers";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = new CombinedTransformer([
			removeUnnecessaryAssertions(),
			removeDeadBranches(), // remove dead branches...
			inline(), // and inline, so the output regexes are cleaner
		]);

		itTest(transformer, [
			{
				literal: /(?=\s*)a|(?!\s*)b|c(?<=\s*)|d(?<!\s*)/,
				expected: /a|c/,
			},
			{
				literal: /(?=[])a|(?![])b|c(?<=[])|d(?<![])/,
				expected: /b|d/,
			},

			{
				literal: /\bfoo\b|\Bfoo\B/,
				expected: /(?<!\w)foo(?!\w)|(?<=\w)foo(?=\w)/,
			},

			{
				literal: /(?=\s*$|\S)[\s\S]+/,
				expected: /(?=\s*$|\S)[^]+/,
			},
			{
				literal: /(?=\s*$|\S)a+/,
				expected: /a+/,
			},
			{
				literal: /(?=\s?$|\S)a+/,
				expected: /a+/,
			},
			{
				literal: /(?=\s$|\S)a+/,
				expected: /a+/,
			},
			{
				literal: /(?=(?:\s|bb)$|\S)a+/,
				expected: /a+/,
			},
			{
				literal: /(?=(?:\s|b*b|)$|\S)a+/,
				expected: /a+/,
			},
			{
				literal: /(?!b)a+/,
				expected: /a+/,
			},
			{
				literal: /(?!b+)a+/,
				expected: /a+/,
			},

			{
				literal: /(?!\s*::|\d)\w+/,
				expected: /(?!\d)\w+/,
			},
			{
				literal: /(?=\s*::|\d)\w+/,
				expected: /(?=\d)\w+/,
			},

			{
				literal: /^^/,
				expected: /^/,
			},
			{
				literal: /$$$$$/,
				expected: /$/,
			},
			{
				literal: /(?!\w)$/,
				expected: /$/,
			},
			{
				literal: /$(?!\w)/,
				expected: /$/,
			},

			{
				literal: /^(?:@|(?<!\w))[A-Z_]\w*/i,
				expected: /^(?:@|)[A-Z_]\w*/i,
			},
			{
				literal: /^(?:@|(?<!\w)(?!\w))/i,
				expected: /^(?:@|(?!\w))/,
			},
			{
				literal: /^(?:@|(?<!\w)(?!\w))$/i,
				expected: /^(?:@|)$/,
			},
			{
				literal: /(?:@|(?<!\w)(?!\w))$/i,
				expected: /(?:@|(?<!\w))$/,
			},

			{
				literal: /^\bfoo\b$/,
				expected: /^foo$/,
			},
			{
				literal: /^\b(?:foo|bar)\b$/,
				expected: /^(?:foo|bar)$/,
			},
		]);

		it("Prism regex snapshot", function () {
			const transformer = new CombinedTransformer([
				removeUnnecessaryAssertions(),
				inline(),
				removeDeadBranches(),
			]);

			regexSnapshot(this, transformer);
		});
	});
});
