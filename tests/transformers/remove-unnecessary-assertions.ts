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
			/(?=\s*)a|(?!\s*)b|c(?<=\s*)|d(?<!\s*)/,
			/(?=[])a|(?![])b|c(?<=[])|d(?<![])/,

			/\bfoo\b|\Bfoo\B/,

			/(?=\s*$|\S)[\s\S]+/,
			/(?=\s*$|\S)a+/,
			/(?=\s?$|\S)a+/,
			/(?=\s$|\S)a+/,
			/(?=(?:\s|bb)$|\S)a+/,
			/(?=(?:\s|b*b|)$|\S)a+/,
			/(?!b)a+/,
			/(?!b+)a+/,

			/(?!\s*::|\d)\w+/,
			/(?=\s*::|\d)\w+/,

			/^^/,
			/$$$$$/,
			/(?!\w)$/,
			/$(?!\w)/,

			/^(?:@|(?<!\w))[A-Z_]\w*/i,
			/^(?:@|(?<!\w)(?!\w))/i,
			/^(?:@|(?<!\w)(?!\w))$/i,
			/(?:@|(?<!\w)(?!\w))$/i,

			/^\bfoo\b$/,
			/^\b(?:foo|bar)\b$/,
			// /\w+(?=\s*%)\b/,
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
