/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert } from "chai";
import { faEqual, literalToENFA, literalToNFA, literalToString } from "../helper/fa";
import { Literal, toLiteral } from "../../src/js";
import { NFA } from "../../src/nfa";
import { FiniteAutomaton, ToRegexOptions, TransitionIterable } from "../../src/common-types";

describe("toRegex", function () {
	describe("Literals", function () {
		test([
			{
				literal: /a+/,
				expected: String.raw`/a+/`,
			},
			{
				literal: /a+/,
				options: { maxOptimizationPasses: 0 },
				expected: String.raw`/a+/`,
			},
			{
				literal: /a+a+a*/,
				expected: String.raw`/a{2,}/`,
			},
			{
				literal: /a+ba+/,
				expected: String.raw`/a+ba+/`,
			},
			{
				literal: /a{2,}b*a{2,}/,
				expected: String.raw`/a{2,}b*a{2,}/`,
			},
			{
				literal: /(?:a+b+|a)/,
				expected: String.raw`/a(?:a*b+)?/`,
			},
			{
				literal: /(?:a+b+|a*)/,
				expected: String.raw`/(?:a+b*)?/`,
			},
			{
				literal: /(?:a+b+|a*)/,
				toFA: literalToENFA,
				expected: String.raw`/a*(?:ab+)?/`,
			},
			{
				literal: /\d+(?:\.\d*)?(?:[eE][+-]\d+)?/,
				expected: String.raw`/\d+(?:(?:\.|(?:\.\d*)?E[-+]\d)\d*)?/i`,
			},
			{
				literal: /\d+(?:\.\d*)?(?:[eE][+-]\d+)?/,
				toFA: literalToENFA,
				expected: String.raw`/\d+(?:\.\d*)?(?:E[-+]\d+)?/i`,
			},
			{
				literal: /\d+(?:\.\d*)?(?:[eE][+-]\d+)?/,
				options: { maxOptimizationPasses: 0 },
				expected: String.raw`/\d+(?:\.\d*|(?:|\.(?:|\d+))E[-+]\d+)?/i`,
			},
			{
				literal: /\d+(?:\.\d*)?(?:[eE][+-]\d+)?/,
				options: { maxOptimizationPasses: 0 },
				toFA: literalToENFA,
				expected: String.raw`/\d+(?:|\.(?:|\d+))(?:E[-+]\d+)?/i`,
			},
		]);

		interface TestCase {
			literal: Literal;
			options?: ToRegexOptions;
			toFA?: (literal: Literal) => FiniteAutomaton & TransitionIterable<any>;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, options, expected, toFA } of cases) {
				it(literalToString(literal), function () {
					const nfa = (toFA ?? literalToNFA)(literal);
					const re = nfa.toRegex(options);
					const actual = toLiteral(re);
					assert.strictEqual(`/${actual.source}/${actual.flags}`, expected);
					assert.isTrue(faEqual(nfa, NFA.fromRegex(re, nfa)));
					assert.isTrue(faEqual(nfa, literalToNFA(actual)));
				});
			}
		}
	});

	describe("Intersections", function () {
		test([
			{
				literals: [/a+/, /a*/],
				expected: String.raw`/a+/`,
			},
			{
				literals: [/a+ba*|cbc/, /a*ba+/],
				expected: String.raw`/a+ba+/`,
			},
			{
				literals: [/\s\.\s|[a.]*\.[a.]+/, /[a.]+\.[a.]*/],
				expected: String.raw`/(?:\.[.a]*\.|[.a]+\.(?:(?:[.a]*\.)?[.a]|[.a]*\.))[.a]*/`,
			},
			{
				literals: [/[&.]*\.[&.]+/, /[&.]+\.[&.]*/],
				expected: String.raw`/[&.]*(?:[&.]\.(?:[&.]*\.)?[&.]|\.[&.]*\.)[&.]*/i`,
			},
			{
				literals: [
					/(?:#d(?:#[ei])?|#[ei](?:#d)?)?[+-]?(?:(?:\d*\.?\d+(?:[eE][+-]?\d+)?|\d+\/\d+)(?:[+-](?:\d*\.?\d+(?:[eE][+-]?\d+)?|\d+\/\d+)i)?|(?:\d*\.?\d+(?:[eE][+-]?\d+)?|\d+\/\d+)i)/,
					/(?:#[box](?:#[ei])?|#[ei](?:#[box])?)[+-]?(?:[\da-fA-F]+(?:\/[\da-fA-F]+)?(?:[+-][\da-fA-F]+(?:\/[\da-fA-F]+)?i)?|[\da-fA-F]+(?:\/[\da-fA-F]+)?i)/,
				],
				expected: String.raw`/#[ei][-+]?\d+(?:[Ee]\d+|(?:(?:[Ee][-+]?|\/)\d+|(?:[Ee]\d+)?[-+]\d+(?:[/Ee]\d+)?)?i|\/\d+(?:[-+]\d+(?:[/Ee]\d+)?i)?)?/`,
			},
		]);

		interface TestCase {
			literals: readonly Literal[];
			options?: ToRegexOptions;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literals, options, expected } of cases) {
				it(literals.map(literalToString).join(" ∩ "), function () {
					let inter = literalToNFA(literals[0]);
					for (let i = 1; i < literals.length; i++) {
						inter = NFA.fromIntersection(inter, literalToNFA(literals[i]));
					}

					const re = inter.toRegex(options);
					const actual = toLiteral(re);
					assert.strictEqual(`/${actual.source}/${actual.flags}`, expected);
					assert.isTrue(faEqual(inter, NFA.fromRegex(re, inter.options)));
					assert.isTrue(faEqual(inter, literalToNFA(actual)));
				});
			}
		}
	});

	it("should limit the number of AST nodes", function () {
		this.timeout(60 * 1000);
		this.slow(1000);

		const a = literalToNFA(
			// eslint-disable-next-line max-len
			/\\.|\$\{(?:[^<()"']|\((?:[^<()"']|\((?:[^<()"']|\((?:[^<()"']|\((?:[^\s\S])*\)|<#--(?:[^-])*-->|"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*')*\)|<#--(?:[^-])*-->|"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*')*\)|<#--(?:[^-])*-->|"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*')*\)|<#--(?:[^-])*-->|"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*')*?\}/
		);
		const b = a.copy();
		b.quantify(2, Infinity);

		// This intersection has about 1500 states but it seems to be some kind of worst case of the state elimination
		// method that powers toRegex.
		const i = NFA.fromIntersection(a, b);

		assert.throws(() => i.toRegex()); // safe by default
		assert.throws(() => i.toRegex({ maxNodes: 10_000 })); // default value
		assert.throws(() => i.toRegex({ maxNodes: 100_000 }));
		assert.throws(() => i.toRegex({ maxNodes: 1_000_000 }));
		// disabled so tests run faster
		// assert.throws(() => i.toRegex({ maxNodes: 10_000_000 }));

		// increasing by another order of magnitude causes NodeJS to crash on my computer
	});
});
