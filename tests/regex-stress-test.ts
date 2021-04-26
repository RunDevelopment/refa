import { assert } from "chai";
import { ParseOptions, Parser } from "../src/js";
import { PrismRegexes } from "./helper/prism-regex-data";
import { NFA } from "../src/nfa";
import { DFA, ReadonlyDFA } from "../src/dfa";
import { Expression, NoParent } from "../src/ast";
import { CONFIG_ALL_PARSE_OPTIONS, CONFIG_RUN_STRESS_TEST } from "./helper/config";
import { TooManyNodesError } from "../src/errors";

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

const maxNodes = 100_000;

function equalLanguage(expected: ReadonlyDFA, re: NoParent<Expression>, maxCharacter: number): void {
	const nfa = NFA.fromRegex(re, { maxCharacter }, { assertions: "disable" });
	const dfa = DFA.fromFA(nfa, { maxNodes });
	dfa.minimize();

	assert.isTrue(expected.structurallyEqual(dfa));
}

const parseOptions: ParseOptions[] = [];
if (CONFIG_ALL_PARSE_OPTIONS) {
	for (const assertions of ["parse", "disable", "unknown"] as ParseOptions["assertions"][]) {
		for (const backreferences of ["disable", "unknown"] as ParseOptions["backreferences"][]) {
			for (const maxBackreferenceWords of [0, 1, 10, 100]) {
				for (const simplify of [true, false]) {
					parseOptions.push({
						assertions,
						backreferences,
						maxBackreferenceWords,
						maxNodes,
						simplify,
					});
				}
			}
		}
	}
} else {
	parseOptions.push({ backreferences: "disable", maxNodes });
}

describe("Regex stress test", function () {
	if (!CONFIG_RUN_STRESS_TEST) {
		return;
	}

	this.timeout(60 * 1000); // timeout after a minute

	parseOptions.forEach(options => {
		describe("Parser config: " + JSON.stringify(options), function () {
			PrismRegexes.forEach((literal, index) => {
				let patternPreview = String(literal);
				if (patternPreview.length > 80) {
					patternPreview = patternPreview.substr(0, 80) + "...";
				}
				it(`[${index}]: ${patternPreview}`, function () {
					try {
						const { expression, maxCharacter } = Parser.fromLiteral(literal).parse(options);
						const nfa = NFA.fromRegex(
							expression,
							{ maxCharacter },
							{ assertions: "disable", unknowns: "disable", maxNodes }
						);
						nfa.nodes.count();

						const re1 = nfa.toRegex({ maxNodes });

						const dfa = DFA.fromFA(nfa, { maxNodes });
						const dfaOriginalCount = dfa.nodes.count();
						dfa.minimize();
						assert.isTrue(dfa.nodes.count() <= dfaOriginalCount);

						if (CHECK_RE_LANGUAGE) {
							equalLanguage(dfa, re1, maxCharacter);
						}

						const re2 = dfa.toRegex({ maxNodes });
						if (CHECK_RE_LANGUAGE) {
							equalLanguage(dfa, re2, maxCharacter);
						}
					} catch (e) {
						if (!(e instanceof TooManyNodesError)) {
							throw e;
						}
					}
				});
			});
		});
	});
});
