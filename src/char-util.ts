import { CharRange, CharSet } from "./char-set";


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
		} else if (i === start + length + 1) {
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
		throw new Error('Cannot get a character from an empty character set.');
	}

	// trivial case
	if (charset.ranges.length == 1 && charset.ranges[0].min == charset.ranges[0].max) {
		return charset.ranges[0].min;
	}

	// check \w characters
	if (charset.hasSome(LATIN_UPPER)) {
		return charset.intersect([LATIN_UPPER]).ranges[0].min;
	}
	if (charset.hasSome(LATIN_LOWER)) {
		return charset.intersect([LATIN_LOWER]).ranges[0].min;
	}
	if (charset.hasSome(LATIN_DIGIT)) {
		return charset.intersect([LATIN_DIGIT]).ranges[0].min;
	}
	if (charset.has(LATIN_UNDERSCORE)) {
		return LATIN_UNDERSCORE;
	}

	// I'm sorry for all non-english languages, but I don't want this function to be too complex.
	// More efficient approaches are welcome of course.

	// check non-space characters
	if (charset.hasSome(ASCII_WITHOUT_SPACE_AND_CONTROL)) {
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



const UTF16_RANGES = String.raw`
41..5a, 61..7a, b5, c0..f5, f8..18b, 18e..1a8, 1ac..1b9, 1bc..1be, 1c4..232, 23a..256, 259..25b, 260..262,
265..26b, 26f..271, 275, 27d, 280, 283, 287..28c, 292, 29d..29e, 345, 370..373, 376..377, 37b..37e, 386..389,
38c..3a0, 3a3..3d1, 3d5..3fa, 3fd..481, 48a..555, 561..587, 10a0..10c6, 10cd, 10d0..10fa, 10fd..10ff,
13a0..13f5, 13f8..13fd, 1c80..1c88, 1c90..1cba, 1cbd..1cbf, 1d79, 1d7d, 1e00..1e9b, 1e9e..1f14, 1f18..1f1d,
1f20..1f45, 1f48..1f4d, 1f50..1f58, 1f5b..1f5c, 1f5f..1f7d, 1f80..1fbb, 1fbe, 1fc2..1fcb, 1fd0..1fd3,
1fd6..1fdb, 1fe0..1fec, 1ff2..1ffb, 2126, 212a..212b, 2132, 214e, 2160..217f, 2183..2184, 24b6..24e9,
2c00..2c5d, 2c60..2c72, 2c75..2c76, 2c7e..2ce3, 2ceb..2cee, 2cf2..2cf3, 2d00..2d26, 2d2d, a640..a66d,
a680..a69b, a722..a72f, a732..a76f, a779..a787, a78b..a78d, a790..a793, a796..a7b8, ab53, ab70..abbf,
fb00..fb06, fb13..fb17, ff21..ff3a, ff41..ff5a
`;
const UNICODE_RANGES = String.raw`${UTF16_RANGES},
10400..1044f, 104b0..104d3, 104d8..104fb, 10c80..10cb2, 10cc0..10cf2, 118a0..118df, 16e40..16e7f, 1e900..1e943
`;

const CASE_VARYING_CHARACTER_RANGES_CACHE = new Map<number, CharRange[]>();
CASE_VARYING_CHARACTER_RANGES_CACHE.set(0xFFFF, rangesFromString(UTF16_RANGES));
CASE_VARYING_CHARACTER_RANGES_CACHE.set(0x10FFFF, rangesFromString(UNICODE_RANGES));

function getCaseVariantCharacters(maximum: number): CharSet {
	function* iterateCaseVariantCharacters(): Iterable<number> {
		const max = maximum;
		for (let i = 0; i <= max; i++) {
			const s = String.fromCodePoint(i);
			if (s.toLowerCase() != s.toUpperCase()) {
				yield i;
			}
		}
	}

	let ranges = CASE_VARYING_CHARACTER_RANGES_CACHE.get(maximum);
	if (ranges === undefined) {
		ranges = [...runEncodeCharacters(iterateCaseVariantCharacters())];
		CASE_VARYING_CHARACTER_RANGES_CACHE.set(maximum, ranges);
	}

	return CharSet.empty(maximum).union(ranges);
}
export const UTF16_CASE_VARYING_CHARACTERS: CharSet = getCaseVariantCharacters(0xFFFF);
export const UNICODE_CASE_VARYING_CHARACTERS: CharSet = getCaseVariantCharacters(0x10FFFF);

function getUnicodeCaseVariations(): Map<number, number[]> {
	const caseVariation = new Map<number, number[]>();
	function addCaseVariation(source: number, target: number): void {
		let sourceVariations = caseVariation.get(source);
		if (sourceVariations === undefined) {
			caseVariation.set(source, sourceVariations = []);
		}
		sourceVariations.push(target);

		let targetVariations = caseVariation.get(target);
		if (targetVariations === undefined) {
			caseVariation.set(target, targetVariations = []);
		}
		targetVariations.push(source);
	}

	for (let i = 0; i <= 0x10FFFF; i++) {
		const s = String.fromCodePoint(i);
		const lower = s.toLowerCase();
		const upper = s.toUpperCase();

		let l: number | undefined = undefined;
		let u: number | undefined = undefined;
		if (lower.codePointAt(1) === undefined) {
			l = lower.codePointAt(0);
		}
		if (upper.codePointAt(1) === undefined) {
			u = upper.codePointAt(0);
		}
		if (l !== undefined && l < i) addCaseVariation(i, l);
		if (u !== undefined && u < i) addCaseVariation(i, u);
	}

	return caseVariation;
}
export const CASE_VARIATIONS: ReadonlyMap<number, number[]> = getUnicodeCaseVariations();
