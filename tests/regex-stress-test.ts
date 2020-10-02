import { assert } from "chai";
import { Parser } from "../src/js";
import { PrismRegexes } from "./helper/prism-regex-data";
import { NFA } from "../src/nfa";
import { DFA, ReadonlyDFA } from "../src/dfa";
import { Expression, Simple } from "../src/ast";

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
	const nfa = NFA.fromRegex(re, { maxCharacter }, {
		disableLookarounds: true
	});
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
			const nfa = NFA.fromRegex(expression, { maxCharacter }, {
				disableLookarounds: true
			});
			const dfa = DFA.fromFA(nfa);
			dfa.minimize();

			const re = nfa.toRegex();

			if (CHECK_RE_LANGUAGE) {
				equalLanguage(dfa, re, maxCharacter);
			}
		});
	});

});
