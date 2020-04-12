import { CharRange } from "../src/char-set";


export function printRanges(ranges: Iterable<CharRange>): string {
	return `JSON.parse(${JSON.stringify(JSON.stringify([...ranges]))})`;
}
