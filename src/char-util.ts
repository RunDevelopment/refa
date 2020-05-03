import { CharRange, CharSet } from "./char-set";
import { CharMap } from "./char-map";


/**
 * Converts the given iterable of sorted unique numbers to a optimal iterable of character ranges.
 *
 * @param chars
 */
export function* runEncodeCharacters(chars: Iterable<number>): Iterable<CharRange> {
	let start = -1;
	let length = 0;

	for (const i of chars) {
		if (start === -1) {
			start = i;
			length = 1;
		} else if (i === start + length) {
			length++;
		} else {
			yield { min: start, max: start + length - 1 };
			start = i;
			length = 1;
		}
	}

	if (length > 0) {
		yield { min: start, max: start + length - 1 };
	}
}


export function invertCharMap<T>(charMap: CharMap<T>, maximum: number): Map<T, CharSet> {
	const rangeMap = new Map<T, CharRange[]>();

	for (const [range, value] of charMap) {
		let array = rangeMap.get(value);
		if (array === undefined) {
			rangeMap.set(value, array = []);
		}
		array.push(range);
	}

	const map = new Map<T, CharSet>();
	for (const [value, ranges] of rangeMap) {
		map.set(value, CharSet.empty(maximum).union(ranges));
	}
	return map;
}


const LATIN_LOWER: CharRange = { min: 0x61, max: 0x7A };
const LATIN_UPPER: CharRange = { min: 0x41, max: 0x5A };
const LATIN_DIGIT: CharRange = { min: 0x30, max: 0x39 };
const LATIN_UNDERSCORE = 0x5F;
const ASCII_SPACE = 0x5F;
const ASCII_NEWLINE = 0xA;
const ASCII_WITHOUT_SPACE_AND_CONTROL: CharRange = { min: 0x21, max: 0x7E };

const READABLE_CHARACTERS = CharSet.empty(0x10FFFF).union([
	LATIN_LOWER, LATIN_UPPER, LATIN_DIGIT, { min: LATIN_UNDERSCORE, max: LATIN_UNDERSCORE }
]);

/**
 * Returns a readable character from the given character set.
 *
 * There are no guarantees as to what character will be returned.
 *
 * @param charset
 * @throws If the given character set is empty.
 */
export function getReadableCharacter(charset: CharSet): number {
	if (charset.isEmpty) {
		throw new Error("Cannot get a character from an empty character set.");
	}

	// trivial case
	if (charset.ranges.length == 1 && charset.ranges[0].min == charset.ranges[0].max) {
		return charset.ranges[0].min;
	}

	// check \w characters
	if (!charset.isDisjointWith(LATIN_UPPER)) {
		return charset.intersect([LATIN_UPPER]).ranges[0].min;
	}
	if (!charset.isDisjointWith(LATIN_LOWER)) {
		return charset.intersect([LATIN_LOWER]).ranges[0].min;
	}
	if (!charset.isDisjointWith(LATIN_DIGIT)) {
		return charset.intersect([LATIN_DIGIT]).ranges[0].min;
	}
	if (charset.has(LATIN_UNDERSCORE)) {
		return LATIN_UNDERSCORE;
	}

	// I'm sorry for all non-english languages, but I don't want this function to be too complex.
	// More efficient approaches are welcome of course.

	// check non-space characters
	if (!charset.isDisjointWith(ASCII_WITHOUT_SPACE_AND_CONTROL)) {
		return charset.intersect([ASCII_WITHOUT_SPACE_AND_CONTROL]).ranges[0].min;
	}

	// space
	if (charset.has(ASCII_SPACE)) {
		return ASCII_SPACE;
	}
	if (charset.has(ASCII_NEWLINE)) {
		return ASCII_NEWLINE;
	}

	// just anything
	const { min, max } = charset.ranges[charset.ranges.length >> 3];
	return min + ((max - min) >> 3); // unicode can be quite empty, so try get lower code points
}

/**
 * Returns a string representation of the given character ranges.
 *
 * @param ranges
 * @param printReadable Whether to also output readable characters as characters.
 */
export function rangesToString(ranges: Iterable<CharRange>, printReadable: boolean = false): string {
	function stringify(char: number): string {
		if (printReadable && char !== /* ',' */ 44 && char !== /* ' */ 39 && READABLE_CHARACTERS.has(char)) {
			return `${char.toString(16)} '${String.fromCodePoint(char)}'`;
		}
		return char.toString(16);
	}

	let s = "";
	for (const range of ranges) {
		if (s !== "") s += ", ";
		if (range.min == range.max) {
			s += stringify(range.min);
		} else {
			s += stringify(range.min) + ".." + stringify(range.max);
		}
	}
	return s;
}
/**
 * Parses the string representation of character ranges and returns the represented ranges.
 *
 * @param string
 */
export function rangesFromString(string: string): CharRange[] {
	function parse(s: string): number {
		return parseInt(s, 16);
	}

	return string.trim().split(/\s*,\s*/g).map(r => {
		const [min, max] = r.split("..");
		if (max === undefined) {
			const parsed = parse(min);
			return { min: parsed, max: parsed };
		} else {
			return { min: parse(min), max: parse(max) };
		}
	});
}
