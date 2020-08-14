import { assert } from "chai";
import { Parser } from "../src/js";
import { PrismRegexes } from "./helper/prism-regex-data";
import { NFA } from "../src/nfa";
import { DFA } from "../src/dfa";
import { group } from "./helper/util";

describe("Regex stress test", function () {
	this.timeout(60 * 1000); // timeout after a minute

	const groupSize = 20;
	const groups = group(PrismRegexes, groupSize);

	groups.forEach((g, index) => {
		it(`Regexes ${1 + index * groupSize} to ${index * groupSize + g.length}`, function () {

			for (const literal of g) {
				const doesNotThrow = <T>(fn: () => T): T => {
					let result: T | undefined = undefined;
					assert.doesNotThrow(() => {
						result = fn();
					}, `Pattern: ${literal}`);
					return result!;
				};

				const parser = doesNotThrow(() => Parser.fromLiteral(literal));
				const { expression, maxCharacter } = doesNotThrow(() => parser.parse());
				const nfa = doesNotThrow(() => NFA.fromRegex(expression, { maxCharacter }, {
					disableLookarounds: true
				}));
				const dfa = doesNotThrow(() => DFA.fromNFA(nfa));
				doesNotThrow(() => dfa.minimize());
			}
		});
	});

});
