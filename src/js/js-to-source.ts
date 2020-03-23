import { Simple, Expression, Concatenation } from "../ast";
import { assertNever } from "../util";
import { CharSet, CharRange } from "../char-set";
import { DIGIT, WORD, SPACE, LINE_TERMINATOR } from "./js-util";

export function toSource(concat: Simple<Concatenation>): string;
export function toSource(expression: Simple<Expression>): string;
export function toSource(alternatives: readonly Simple<Concatenation>[]): string;
export function toSource(value: Simple<Concatenation> | Simple<Expression> | readonly Simple<Concatenation>[]): string {
	if (Array.isArray(value)) {
		const alternatives: readonly Simple<Concatenation>[] = value;

		return alternatives.map(c => toSource(c)).join("|");
	} else {
		const node = value as Simple<Expression> | Simple<Concatenation>;
		if (node.type === "Concatenation") {
			let s = "";
			for (const element of node.elements) {
				switch (element.type) {
					case "Alternation":
						s += "(?:" + toSource(element.alternatives) + ")";
						break;

					case "Assertion":
						s += "(?";
						if (element.kind === "behind") s += "<";
						s += element.negate ? "!" : "=";
						s += toSource(element.alternatives);
						s += ")";
						break;

					case "CharacterClass":
						s += printCharacters(element.characters);
						break;

					case "Quantifier":
						if (element.alternatives.length === 1 && element.alternatives[0].elements.length === 1) {
							s += toSource(element.alternatives[0]);
						} else {
							s += "(?:" + toSource(element.alternatives) + ")";
						}

						if (element.min === 0 && element.max === Infinity) {
							s += "*";
						} else if (element.min === 1 && element.max === Infinity) {
							s += "+";
						} else if (element.min === 0 && element.max === 1) {
							s += "?";
						} else if (element.max === Infinity) {
							s += `{${element.min},}`;
						} else if (element.min === element.max) {
							s += `{${element.min}}`;
						} else {
							s += `{${element.min},${element.max}}`;
						}
						break;

					default:
						throw assertNever(element);
				}
			}
			return s;
		} else {
			return toSource(node.alternatives);
		}
	}
}


const printableCharacters = new Map<number, string>();
function addPrintableCharacter(char: number | string, print: string): void {
	if (typeof char === "number") {
		printableCharacters.set(char, print);
	} else {
		printableCharacters.set(char.codePointAt(0)!, print);
	}
}
addPrintableCharacter(0, "\\0");
addPrintableCharacter("\n", "\\n");
addPrintableCharacter("\f", "\\f");
addPrintableCharacter("\t", "\\t");
addPrintableCharacter("\r", "\\r");

/**
 * A set of special characters which cannot be used unescaped in RegExp patterns.
 */
const specialJSRegExp = new Set<number>([..."()[]{}*+?|\\.^$/"].map(c => c.charCodeAt(0)));

const specialJSCharset = new Set<number>([..."\\]-^"].map(c => c.charCodeAt(0)));


function printAsHex(char: number): string {
	if (char < 256) {
		return "\\x" + char.toString(16).padStart(2, "0");
	}
	if (char < 65536) {
		return "\\u" + char.toString(16).padStart(4, "0");
	}
	return "\\u{" + char.toString(16) + "}";
}

function printInCharClass(char: number): string {
	// special characters
	const isSpecial = specialJSCharset.has(char);
	if (isSpecial) return "\\" + String.fromCharCode(char);

	const specialPrintable = printableCharacters.get(char);
	if (specialPrintable) return specialPrintable;

	if (char >= 32 && char < 127) {
		// printable ASCII chars
		return String.fromCharCode(char);
	}

	return printAsHex(char);
}

function printRange(range: CharRange): string {
	if (range.min === range.max) return printInCharClass(range.min);
	if (range.min === range.max - 1) return printInCharClass(range.min) + printInCharClass(range.max);
	return printInCharClass(range.min) + "-" + printInCharClass(range.max);
}

function printOutsideOfCharClass(char: number): string {
	if (specialJSRegExp.has(char)) {
		return "\\" + String.fromCharCode(char);
	}

	const specialPrint = printableCharacters.get(char);
	if (specialPrint) return specialPrint;

	if (char >= 32 && char < 127) {
		// printable ASCII chars
		return String.fromCharCode(char);
	}

	return printAsHex(char);
}

function rangeEqual(a: readonly CharRange[], b: readonly CharRange[]): boolean {
	const l = a.length;
	if (l !== b.length) return false;
	for (let i = 0; i < l; i++) {
		const aR = a[i];
		const bR = b[i];
		if (aR.min !== bR.min || aR.max !== bR.max) return false;
	}
	return true;
}

function hasEveryOf(set: CharSet, ranges: readonly CharRange[]): boolean {
	return ranges.every(r => set.hasEvery(r));
}

function printCharSetSimple(set: CharSet): string {
	let s = "";
	for (const range of set.ranges) {
		s += printRange(range);
	}
	return s;
}

function printCharSet(set: CharSet): string {
	/**
	 * The simplest approach would be to print all ranges but the resulting character class might not be minimal or
	 * readable, so we try to subtract common char sets first in an attempt to make it more readable.
	 */

	let reducedSet = set;
	let reducedPrefix = "";
	if (hasEveryOf(reducedSet, SPACE)) {
		reducedPrefix += "\\s";
		reducedSet = reducedSet.without(SPACE);
	}
	if (hasEveryOf(reducedSet, WORD)) {
		reducedPrefix += "\\w";
		reducedSet = reducedSet.without(WORD);
	}

	const setSource = printCharSetSimple(set);
	if (set !== reducedSet) {
		const reducedSource = reducedPrefix + printCharSetSimple(reducedSet);
		if (reducedSource.length < setSource.length) {
			return reducedSource;
		}
	}

	return setSource;
}

function printCharacters(chars: CharSet): string {
	if (chars.isAll) return "[\\s\\S]";
	if (chars.isEmpty) return "[^\\s\\S]";

	if (chars.ranges.length === 1 && chars.ranges[0].min === chars.ranges[0].max) {
		// a single character
		return printOutsideOfCharClass(chars.ranges[0].min);
	}

	// if the first min is 0, then it's most likely negated, so don't even bother checking non-negated char sets
	if (chars.ranges[0].min > 0) {
		if (rangeEqual(chars.ranges, [DIGIT])) return "\\d";
		if (rangeEqual(chars.ranges, WORD)) return "\\w";
		if (rangeEqual(chars.ranges, SPACE)) return "\\s";
	}

	const negated = chars.negate();
	if (rangeEqual(negated.ranges, LINE_TERMINATOR)) return ".";
	if (rangeEqual(negated.ranges, [DIGIT])) return "\\D";
	if (rangeEqual(negated.ranges, WORD)) return "\\W";
	if (rangeEqual(negated.ranges, SPACE)) return "\\S";

	const source = printCharSet(chars);
	const negatedSource = printCharSet(negated);

	if (source.length <= negatedSource.length) {
		return `[${source}]`;
	} else {
		return `[^${negatedSource}]`;
	}
}
