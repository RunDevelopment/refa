import { DFA } from "../src/dfa";
import { assert } from "chai";
import { literalToString } from "./helper/fa";
import { Parser } from "../src/js";
import { NFA } from "../src/nfa";
import { PrismRegexes } from "./helper/prism-regex-data";
import { combineTransformers, transform } from "../src/ast";
import * as Transformers from "../src/transformers";
import { TooManyNodesError } from "../src/errors";
import { CONFIG_RUN_STRESS_TEST } from "./helper/config";
import { assertEqualSnapshot } from "./helper/snapshot";
import { createHash } from "crypto";
import { toString } from "../src/iter";

describe("DFA minimization", function () {
	if (!CONFIG_RUN_STRESS_TEST) {
		return;
	}

	const candidates = PrismRegexes.map((r, i) => ({ regex: r, id: i })).filter(
		({ regex }) => regex.source.length < 1e3
	);

	function toDFA(regex: RegExp): DFA {
		const result = Parser.fromLiteral(regex).parse({ backreferences: "disable" });

		const applyTransformer = combineTransformers([
			Transformers.inline(),
			Transformers.removeDeadBranches(),
			Transformers.removeUnnecessaryAssertions(),
			Transformers.sortAssertions(),
			Transformers.applyAssertions(),
			Transformers.removeUnnecessaryAssertions(),
		]);
		const modifiedExpression = transform(applyTransformer, result.expression);

		const finalExpression = transform(Transformers.patternEdgeAssertions({ remove: true }), modifiedExpression);

		const nfa = NFA.fromRegex(finalExpression, result, { assertions: "disable", unknowns: "disable" });

		return DFA.fromFA(nfa);
	}

	for (const { regex, id } of candidates) {
		// node v10 has a bug where all "/" chars are escaped. This escapes all "/" chars to make the
		// result consistent across versions.
		const source = regex.source.replace(/([^\\](?:\\{2})*)(?=\/)/g, "$1\\");

		const preview = literalToString({ source, flags: regex.flags })
			// max length of 80
			.replace(/^([^]{80})[^]+/, "$1...");

		it(`${id}: ${preview}`, function () {
			this.timeout(10_000);

			let dfa;
			try {
				dfa = toDFA(regex);
			} catch (error) {
				if (error instanceof TooManyNodesError) {
					return;
				}
				throw error;
			}

			dfa.minimize();

			// minimize(minimize(dfa)) == minimize(dfa)
			// This is just a basic sanity check
			const copy = dfa.copy();
			assert.isTrue(copy.structurallyEqual(dfa), "Copy is not equal to original");
			copy.minimize();

			if (!copy.structurallyEqual(dfa)) {
				assert.equal(copy.toDot(), dfa.toDot());
				assert.fail("structurally equal doesn't work");
			}

			// This way we can detect when the DFA minimization produces incorrect results.
			// We could also store the DFA string itself but this results in mega bytes of snapshots.
			assertEqualSnapshot(
				this,
				createHash("sha256")
					.update(toString(dfa.transitionIterator(), cs => cs.toRangesString()))
					.digest("base64")
			);
		});
	}
});
