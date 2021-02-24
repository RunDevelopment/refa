import { assert } from "chai";
import { transform, TransformOptions, Transformer } from "../../src/ast";
import { Literal, Parser, toLiteral } from "../../src/js";
import { literalToString } from "./fa";

export type TransformTestCase = LiteralTestCase;

interface LiteralTestCase {
	literal: Literal;
	transformer: Transformer;
	options?: TransformOptions;
	expected: Literal | string;
	debug?: boolean;
}

export function itTest(cases: Iterable<TransformTestCase>): void {
	for (const { literal, transformer, options, expected, debug } of cases) {
		it(literalToString(literal), function () {
			if (debug) {
				// eslint-disable-next-line no-debugger
				debugger;
			}

			const { expression } = Parser.fromLiteral(literal).parse({
				backreferences: "throw",
				assertions: "parse",
				disableOptimizations: true,
			});
			const transformedExpression = transform(transformer, expression, options);
			const actual = toLiteral(transformedExpression);

			const actualStr = literalToString(actual);
			const expectedStr = typeof expected === "string" ? expected : literalToString(expected);

			assert.strictEqual(actualStr, expectedStr);
		});
	}
}
