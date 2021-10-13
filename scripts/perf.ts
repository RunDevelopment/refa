import { NFA, DFA, JS, combineTransformers, Transformers, transform } from "../src";
import { PrismRegexes } from "../tests/helper/prism-regex-data";
import { performance } from "perf_hooks";
import { logDurations } from "./util";


function perfTest(): void {
	const durationRecord: Record<string, number[]> = {};
	function measure<T>(label: string, fn: () => T): T {
		const durations = (durationRecord[label] = durationRecord[label] || []);

		const start = performance.now();
		const result = fn();
		durations.push(performance.now() - start);

		return result;
	}
	function showResult(): void {
		const maxLen = Math.max(...Object.keys(durationRecord).map(s => s.length));
		for (const key in durationRecord) {
			logDurations(durationRecord[key], (key + ":").padEnd(maxLen));
		}
	}

	const TOO_BIG = new Set<number>([245, 862, 1474, 2278]);

	let errors = 0;
	let counter = 0;
	for (const literal of PrismRegexes) {
		counter++;
		process.stdout.write(`\r${counter}/${PrismRegexes.length}`);
		if (counter === PrismRegexes.length) {
			console.log();
		}

		if (TOO_BIG.has(counter)) {
			continue
		}

		try {
			const parser = measure("Create parser", () => JS.Parser.fromLiteral(literal));
			const { expression, maxCharacter } = measure("parse", () => parser.parse({ backreferences: "disable", maxNodes: 100_000 }));
			measure("toLiteral", () => JS.toLiteral(expression));
			measure("toLiteral fast", () => JS.toLiteral(expression, { fastCharacters: true }));

			const finalExpression = measure("transformers", () => {
				const applyTransformer = combineTransformers([
					Transformers.inline(),
					Transformers.removeDeadBranches(),
					Transformers.removeUnnecessaryAssertions(),
					Transformers.sortAssertions(),
					Transformers.applyAssertions(),
					Transformers.removeUnnecessaryAssertions(),
				]);
				const modifiedExpression = transform(applyTransformer, expression);

				return transform(
					Transformers.patternEdgeAssertions({ remove: true }),
					modifiedExpression
				);
			});

			const nfa = measure("Create NFA", () =>
				NFA.fromRegex(
					finalExpression,
					{ maxCharacter },
					{ assertions: "disable" },
					new NFA.LimitedNodeFactory(100_000)
				)
			);
			measure("toRegex NFA", () => nfa.toRegex({ maxNodes: 100_000 }));

			const dfa = measure("Create DFA", () => DFA.fromFA(nfa));
			measure("Minimize DFA", () => dfa.minimize());

			measure("toRegex mDFA", () => {
				try {
					dfa.toRegex({ maxNodes: 100_000 })
				} catch (error) {
					if (!String(error).includes("Too many RE AST nodes")) {
						throw error;
					}
				}
			});
		} catch (error) {
			errors++;
			console.log(`Error in ${literal}`);
			throw error;
		}
	}


	showResult();
	console.log(`${errors} errors`);
}

perfTest();
