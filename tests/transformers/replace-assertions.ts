import { itTest } from "../helper/transform";
import { replaceAssertions } from "../../src/transformers";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		itTest([
			{
				literal: /\bfoo\b|abc(?=abc$)|bar(?:\w(?<!b))*/,
				transformer: replaceAssertions(),
				expected: /(?:[])foo(?:[])|bar(?:[])*/,
			},
			{
				literal: /\bfoo\b|abc(?=abc$)|bar(?:\w(?<!b))*/,
				transformer: replaceAssertions({ replacement: "empty-set" }),
				expected: /(?:[])foo(?:[])|bar(?:[])*/,
			},

			{
				literal: /\bfoo\b|abc(?=abc$)|bar(?:\w(?<!b))*/,
				transformer: replaceAssertions({ replacement: "empty-word" }),
				expected: /(?:|)foo(?:|)|abc|bar\w*/,
			},
		]);
	});
});
