import { NFA, DFA, JS } from "../src";
import { PrismRegexes } from "../tests/helper/prism-regex-data";
import { performance } from "perf_hooks";


function perfTest(): void {
	const durationRecord: Record<string, number[]> = {};
	function measure<T>(label: string, fn: () => T): T {
		const start = performance.now();
		const result = fn();
		const duration = performance.now() - start;
		(durationRecord[label] = durationRecord[label] || []).push(duration);
		return result;
	}
	function showResult(): void {
		for (const key in durationRecord) {
			const durations = durationRecord[key];
			const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
			const max = Math.max(...durations);

			console.log(`${key}:\tavg=${Number(avg.toExponential(2))}ms\tmax=${Number(max.toExponential(2))}ms`);
		}
	}

	let errors = 0;
	let counter = 0;
	for (const literal of PrismRegexes) {
		process.stdout.write(`\r${++counter}/${PrismRegexes.length}`);
		if (counter === PrismRegexes.length) {
			console.log();
		}

		try {
			const parser = measure("Create parser", () => JS.Parser.fromLiteral(literal));
			const { expression, maxCharacter } = measure("parse", () =>
				parser.parse({
					backreferences: "disable",
					assertions: "disable",
				})
			);
			const nfa = measure("Create NFA", () =>
				NFA.fromRegex(
					expression,
					{ maxCharacter },
					{ assertions: "disable" }
				)
			);
			const dfa = measure("Create DFA", () => DFA.fromFA(nfa));
			measure("Minimize DFA", () => dfa.minimize());
		} catch (error) {
			errors++;
			console.log(`Error in ${literal}`);
			//throw error;
		}
	}


	showResult();
	console.log(`${errors} errors`);
}

perfTest();
