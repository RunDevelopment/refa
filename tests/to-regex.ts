import { assert } from "chai";
import { literalToString, literalToNFA, nfaEqual } from "./helper/fa";
import { Literal, toLiteral } from "../src/js";
import { NFA } from "../src/nfa";
import { ToRegexOptions } from "../src/finite-automaton";

describe("toRegex", function () {
	describe("Literals", function () {
		test([
			{
				literal: /a+/,
				expected: String.raw`/a+/`,
			},
			{
				literal: /a+/,
				options: { maximumOptimizationPasses: 0 },
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
				literal: /\d+(?:\.\d*)?(?:[eE][+-]\d+)?/,
				expected: String.raw`/\d+(?:(?:\.|(?:\.\d*)?E[-+]\d)\d*)?/i`,
			},
			{
				literal: /\d+(?:\.\d*)?(?:[eE][+-]\d+)?/,
				options: { maximumOptimizationPasses: 0 },
				expected: String.raw`/\d+(?:|\.(?:|\d+)|(?:|\.(?:|\d+))E[-+]\d\d*)/i`,
			},
		]);

		interface TestCase {
			literal: Literal;
			options?: ToRegexOptions;
			expected: string;
		}

		function test(cases: TestCase[]): void {
			for (const { literal, options, expected } of cases) {
				it(literalToString(literal), function () {
					const nfa = literalToNFA(literal);
					const re = nfa.toRegex(options);
					const actual = toLiteral(re);
					assert.strictEqual(`/${actual.source}/${actual.flags}`, expected);
					assert.isTrue(nfaEqual(nfa, NFA.fromRegex(re, nfa.options)));
					assert.isTrue(nfaEqual(nfa, literalToNFA(actual)));
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
				expected: String.raw`/#[ei](?:\d+[Ee][-+]\d+i|\d+(?:[Ee]\d+)?i|\d+\/\d+i|[-+]\d+(?:(?:[Ee][-+]|[/Ee])\d+)?i|[-+]?\d+(?:[Ee]\d+)?[-+]\d+(?:[/Ee]\d+)?i|[-+]?\d+(?:[Ee]\d+)?|[-+]?\d+\/\d+(?:[-+]\d+(?:[/Ee]\d+)?i)?)/`,
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
					assert.isTrue(nfaEqual(inter, NFA.fromRegex(re, inter.options)));
					assert.isTrue(nfaEqual(inter, literalToNFA(actual)));
				});
			}
		}
	});

	it("should limit the number of AST nodes", function () {
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
		assert.throws(() => i.toRegex({ maximumNodes: 10_000 })); // default value
		assert.throws(() => i.toRegex({ maximumNodes: 100_000 }));
		assert.throws(() => i.toRegex({ maximumNodes: 1_000_000 }));
		// disabled so tests run faster
		// assert.throws(() => i.toRegex({ maximumNodes: 10_000_000 }));

		// increasing by another order of magnitude causes NodeJS to crash on my computer
	});
});
