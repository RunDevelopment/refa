import { unionCharacters } from "../../../src/ast-transform/transformers/union-characters";
import { itTest } from "../../helper/transform";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		itTest([
			{
				literal: /(a|b|c) (a|b|dd|\w) (a||b) ([a-d]|do|[c-f])/,
				transformer: unionCharacters({}),
				expected: /(?:[abc]) (?:[ab]|dd|\w) (?:a||b) (?:[a-d]|do|[c-f])/,
			},
			{
				literal: /(a|b|c) (a|b|dd|\w) (a||b) ([a-d]|do|[c-f])/,
				transformer: unionCharacters({ ignoreOrder: true }),
				expected: /(?:[abc]) (?:\w|dd|[ab]) (?:[ab]|) (?:[a-f]|do|[cd])/,
			},
			{
				literal: /(a|b|c) (a|b|dd|\w) (a||b) ([a-d]|do|[c-f])/,
				transformer: unionCharacters({ ignoreOrder: true, ignoreAmbiguity: true }),
				expected: /(?:[abc]) (?:\w|dd) (?:[ab]|) (?:[a-f]|do)/,
			},
			{
				literal: /(a|b|c) (a|b|dd|\w) (a||b) ([a-d]|do|[c-f])/,
				transformer: unionCharacters({ ignoreAmbiguity: true }),
				expected: /(?:[abc]) (?:[ab]|dd|\w) (?:a||b) (?:[a-d]|do|[c-f])/,
			},
		]);
	});
});
