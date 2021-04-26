import { assert } from "chai";
import { TransformOptions, Transformer, transform } from "../../src/ast";
import { TooManyNodesError } from "../../src/errors";
import { Literal, Parser, toLiteral } from "../../src/js";
import { CONFIG_RUN_TRANSFORMERS } from "./config";
import { literalToString } from "./fa";
import { PrismRegexes } from "./prism-regex-data";
import { assertEqualSnapshot } from "./snapshot";

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
				simplify: false,
			});
			const transformedExpression = transform(transformer, expression, options);
			const actual = toLiteral(transformedExpression);

			const actualStr = literalToString(actual);
			const expectedStr = typeof expected === "string" ? expected : literalToString(expected);

			assert.strictEqual(actualStr, expectedStr);
		});
	}
}

export function regexSnapshot(context: Mocha.Context, transformer: Transformer): void {
	if (!CONFIG_RUN_TRANSFORMERS) {
		return;
	}

	context.timeout(60 * 1000); // timeout after 1 minute

	const actual = PrismRegexes.map(re => {
		try {
			const { expression } = Parser.fromLiteral(re).parse({ backreferences: "unknown" });
			return literalToString(toLiteral(transform(transformer, expression)));
		} catch (e) {
			if (e instanceof TooManyNodesError) {
				return "TooManyNodesError";
			}
			throw e;
		}
	}).join("\n");

	assertEqualSnapshot(context, actual);
}
