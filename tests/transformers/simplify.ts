import { itTest, regexSnapshot } from "../helper/transform";
import { simplify } from "../../src/transformers";

describe("Transformers", function () {
	const transformer = simplify();
	const transformerIgnore = simplify({ ignoreAmbiguity: true, ignoreOrder: true });

	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		itTest(transformer, [
			/\b(?!\d)\b\w+\b\s*\(/,
			/(?:^|@)\b\w+\b/,
			/"""(?:(?!""").)*"""/s,
			/"""((?!""")(?:[^\\]|\\"))*"""/,
			/<title>(?:(?!<\/title>).)*<\/title>/,

			{ literal: /\b(?:true|false)\b/, transformer: transformerIgnore, stepByStep: true },
		]);

		it("Prism regex snapshot", function () {
			regexSnapshot(this, transformer);
		});

		it("Prism regex snapshot ignoring order and ambiguity", function () {
			regexSnapshot(this, transformerIgnore);
		});
	});
});
