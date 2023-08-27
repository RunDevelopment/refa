import { assert } from "chai";
import { TransformOptions, Transformer, transform } from "../../src/ast";
import { TooManyNodesError } from "../../src/errors";
import { Literal, Parser, toLiteral } from "../../src/js";
import { CONFIG_RUN_TRANSFORMERS } from "./config";
import { literalToString } from "./fa";
import { PrismRegexes } from "./prism-regex-data";
import { assertEqualSnapshot } from "./snapshot";

export interface TransformTestCase {
	literal: Literal | string;
	transformer?: Transformer;
	options?: TransformOptions;
	expected?: Literal | string;
	debug?: boolean;
}

function toTestCase(literal: TransformTestCase | Literal | string): TransformTestCase {
	if (typeof literal === "string") {
		return { literal };
	} else if ("literal" in literal) {
		return literal;
	} else {
		return { literal };
	}
}

export function itTest(defaultTransformer: Transformer, cases: Iterable<TransformTestCase | Literal | string>): void;
export function itTest(
	defaultTransformer: null,
	cases: Iterable<TransformTestCase & { transformer: Transformer }>
): void;
export function itTest(
	defaultTransformer: Transformer | null,
	cases: Iterable<TransformTestCase | Literal | string>
): void {
	for (const { literal, transformer = defaultTransformer, options, expected, debug } of [...cases].map(toTestCase)) {
		it(literalToString(literal), function () {
			if (debug) {
				// eslint-disable-next-line no-debugger
				debugger;
			}

			if (!transformer) {
				throw new Error("No transformer");
			}

			const { expression } = Parser.fromLiteral(literal).parse({
				backreferences: "throw",
				assertions: "parse",
				simplify: false,
			});
			const transformedExpression = transform(transformer, expression, options);
			const actual = toLiteral(transformedExpression);

			const actualStr = literalToString(actual);

			if (expected === undefined) {
				assertEqualSnapshot(this, actualStr);
			} else {
				const expectedStr = literalToString(expected);
				assert.strictEqual(actualStr, expectedStr);
			}
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
