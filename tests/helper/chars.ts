import { CharSet } from "../../src/char-set";


export function readableIntervalString(chars: CharSet): string {
	const makeReadable = (c: number): string | number => {
		if (/^[\w]$/.test(String.fromCodePoint(c))) {
			return String.fromCodePoint(c);
		} else {
			return c;
		}
	};

	return JSON.stringify(chars.ranges.map(({ min, max }) => {
		if (min === max) {
			return makeReadable(min);
		} else {
			return [makeReadable(min), makeReadable(max)]
		}
	})).replace(/"/g, "'");
}
