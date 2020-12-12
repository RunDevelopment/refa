import { itTest } from "../../helper/transform";
import { removeUnnecessaryAssertions } from "../../../src/ast-transform/transformers/remove-unnecessary-assertions";
import { combineTransformers } from "../../../src/ast-transform/transformer";
import { removeDeadBranches } from "../../../src/ast-transform/transformers/remove-dead-branches";
import { inline } from "../../../src/ast-transform/transformers/inline";

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
		]);
	});
});
