import { assert } from "chai";
import { literalToString, literalToNFA } from "./helper/fa";
import { Literal, toLiteral } from "../src/js";
import { NFA } from "../src/nfa";


describe("toRegex", function () {

	describe("Literals", function () {

		test([
			{
				literal: /a+/,
				expected: String.raw`/a+/`
			},
			{
				literal: /a+a+a*/,
				expected: String.raw`/a{2,}/`
			},
			{
				literal: /a+ba+/,
				expected: String.raw`/a+ba+/`
			},
			{
				literal: /a{2,}b*a{2,}/,
				expected: String.raw`/a{2,}b*a{2,}/`
			},
			{
				literal: /\d+(?:\.\d*)?(?:[eE][+-]\d+)?/,
				expected: String.raw`/\d+(?:\.\d*|(?:\.\d*)?E[+\-]\d+)?/i`
			},
		]);

		interface TestCase {
			literal: Literal;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, expected } of cases) {
				it(literalToString(literal), function () {
					const nfa = literalToNFA(literal);
					const actual = toLiteral(nfa.toRegex());
					assert.strictEqual(`/${actual.source}/${actual.flags}`, expected);
				});
			}
		}

	});

	describe("Intersections", function () {

		test([
			//{
			//	literals: [
			//		/a+/,
			//		/a*/,
			//	],
			//	expected: String.raw`/a+/`
			//},
			//{
			//	literals: [
			//		/a+ba*|cbc/,
			//		/a*ba+/,
			//	],
			//	expected: String.raw`/a+ba+/`
			//},
			//{
			//	literals: [
			//		/\s\.\s|[a.]*\.[a.]+/,
			//		/[a.]+\.[a.]*/,
			//	],
			//	expected: String.raw`/(?:\.[.a]*\.|[.a]+\.(?:(?:[.a]*\.)?|[.a]*\.))[.a]+/`
			//},
			{
				literals: [
					/[&.]*\.[&.]+/,
					/[&.]+\.[&.]*/,
				],
				expected: String.raw`/(?:\.[&.]*\.|[&.]+\.(?:(?:[&.]*\.)?|[&.]*\.))[&.]+/`
			},
		]);

		interface TestCase {
			literals: readonly Literal[];
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literals, expected } of cases) {
				it(literals.map(literalToString).join(" ∩ "), function () {
					let inter = literalToNFA(literals[0]);
					for (let i = 1; i < literals.length; i++) {
						inter = NFA.intersect(inter, literalToNFA(literals[i]))
					}
					console.log(inter.toString());

					const actual = toLiteral(inter.toRegex());
					assert.strictEqual(`/${actual.source}/${actual.flags}`, expected);
				});
			}
		}

	});

});
