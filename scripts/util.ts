import { CharRange } from "../src/char-set";

export function printRanges(ranges: Iterable<CharRange>): string {
	return `JSON.parse('${JSON.stringify([...ranges])}')`;
}

export function logDurations(durations: number[], label?: string): void {
	durations.sort((a, b) => a - b);

	const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
	const max = Math.max(...durations);

	const median =
		durations.length % 2 === 0
			? (durations[durations.length / 2 - 1] + durations[durations.length / 2]) / 2
			: durations[(durations.length - 1) / 2];

	const parts: string[] = [];
	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
	if (label) {
		parts.push(label);
	}

	parts.push(`avg=${+avg.toExponential(2)}ms`);
	parts.push(`med=${+median.toExponential(2)}ms`);
	parts.push(`max=${+max.toExponential(2)}ms`);

	console.log(parts.join("\t"));
}
