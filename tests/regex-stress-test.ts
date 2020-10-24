import { assert } from "chai";
import { Parser } from "../src/js";
import { PrismRegexes } from "./helper/prism-regex-data";
import { NFA } from "../src/nfa";
import { DFA, ReadonlyDFA } from "../src/dfa";
import { Expression, Simple } from "../src/ast";
import { TooManyNodesError } from "../src/finite-automaton";

/**
 * Setting this to `true` will enable the check that verifies that the language of the generated RE from `toRegex` is
 * the same as the language of the NFA/DFA that created it.
 *
 * The generated RE tends to create NFA that are both large and very non-deterministic. This means that the conversion
 * to DFA will create __A LOT__ nodes (sometimes >10k). Both creating and minimizing the DFA takes time (up to a minute
 * for a single regex).
 *
 * Only set this to `true` if you have the time to run it.
 */
const CHECK_RE_LANGUAGE = false;

function equalLanguage(expected: ReadonlyDFA, re: Simple<Expression>, maxCharacter: number): void {
	const nfa = NFA.fromRegex(re, { maxCharacter }, { disableLookarounds: true });
	const dfa = DFA.fromFA(nfa, { maxNodes: 100000 });
	dfa.minimize();

	assert.isTrue(expected.structurallyEqual(dfa));
}

describe("Regex stress test", function () {
	this.timeout(60 * 1000); // timeout after a minute

	PrismRegexes.forEach((literal, index) => {
		let patternPreview = String(literal);
		if (patternPreview.length > 80) {
			patternPreview = patternPreview.substr(0, 80) + "...";
		}
		it(`[${index}]: ${patternPreview}`, function () {
			const { expression, maxCharacter } = Parser.fromLiteral(literal).parse();
			const nfa = NFA.fromRegex(expression, { maxCharacter }, { disableLookarounds: true });
			nfa.nodes.count();

			const dfa = DFA.fromFA(nfa);
			const dfaOriginalCount = dfa.nodes.count();
			dfa.minimize();
			assert.isTrue(dfa.nodes.count() <= dfaOriginalCount);

			const re1 = nfa.toRegex({ maximumNodes: Infinity });
			if (CHECK_RE_LANGUAGE) {
				equalLanguage(dfa, re1, maxCharacter);
			}

			let re2;
			try {
				re2 = dfa.toRegex({ maximumNodes: 100_000 });
			} catch (e) {
				if (!(e instanceof TooManyNodesError)) {
					throw e;
				}
			}
			if (CHECK_RE_LANGUAGE) {
				if (re2) {
					equalLanguage(dfa, re2, maxCharacter);
				}
			}
		});
	});
});
