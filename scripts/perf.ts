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
		const maxLen = Math.max(...Object.keys(durationRecord).map(s => s.length));
		for (const key in durationRecord) {
			const durations = durationRecord[key];
			const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
			const max = Math.max(...durations);

			console.log(
				`${(key + ":").padEnd(maxLen)}\tavg=${Number(avg.toExponential(2))}ms\tmax=${Number(max.toExponential(2))}ms`
			);
		}
	}

	let errors = 0;
	let counter = 0;
	for (const literal of PrismRegexes) {
		counter++;
		if (counter === 862) {
			// this regex creates a DFA with >500k states. The DFA just doesn't fit into Node's limit of 2GB memory
			continue;
		}
		process.stdout.write(`\r${counter}/${PrismRegexes.length}`);
		if (counter === PrismRegexes.length) {
			console.log();
		}

		try {
			const parser = measure("Create parser", () => JS.Parser.fromLiteral(literal));
			const { expression, maxCharacter } = measure("parse", () => parser.parse({ backreferences: "disable", maxNodes: 100_000 }));
			measure("toLiteral", () => JS.toLiteral(expression));
			measure("toLiteral fast", () => JS.toLiteral(expression, { fastCharacters: true }));

			const nfa = measure("Create NFA", () =>
				NFA.fromRegex(
					expression,
					{ maxCharacter },
					{ assertions: "disable" }
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
