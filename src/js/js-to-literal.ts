import { Char } from "../core-types";
import { NoParent, Node, Expression, Concatenation, visitAst, Element, Assertion, Alternation } from "../ast";
import { assertNever } from "../util";
import { CharSet, CharRange } from "../char-set";
import {
	DIGIT,
	WORD,
	SPACE,
	LINE_TERMINATOR,
	withCaseVaryingCharacters,
	WORD_IU,
	UNICODE_MAXIMUM,
	UTF16_MAXIMUM,
} from "./js-util";
import { Flags } from "./js-flags";
import { UnicodeCaseVarying, UnicodeCaseFolding } from "./unicode";
import { UTF16CaseVarying, UTF16CaseFolding } from "./utf16-case-folding";
import { Literal } from "./parser";

export interface ToLiteralOptions {
	/**
	 * An optional template for the flags of the JavaScript RegExp literal to be created.
	 *
	 * All flags that are set to `false` are guaranteed to be disabled in the created literal. Likewise, all flags that
	 * are set to `true` are guaranteed to be enabled in the created literal.
	 *
	 * Flags that are undefined will be enabled/disabled depending on the implementation. While no guarantees are given,
	 * the implementation will generally try to choose flags such that it can create literal that is as small as
	 * possible.
	 *
	 * If the constraints on the flags defined here make it impossible to create a literal, an error will be thrown.
	 */
	flags?: Flags;

	/**
	 * This will use cause the function to convert `CharSet`s as fast as possible.
	 *
	 * Literal will usually be created about 10x faster if this option is enabled but the result is usually not humanly
	 * readable.
	 */
	fastCharacters?: boolean;
}

export function toLiteral(concat: NoParent<Concatenation>, options?: Readonly<ToLiteralOptions>): Literal;
export function toLiteral(expression: NoParent<Expression>, options?: Readonly<ToLiteralOptions>): Literal;
export function toLiteral(
	alternatives: readonly NoParent<Concatenation>[],
	options?: Readonly<ToLiteralOptions>
): Literal;
export function toLiteral(
	value: NoParent<Concatenation> | NoParent<Expression> | readonly NoParent<Concatenation>[],
	options?: Readonly<ToLiteralOptions>
): Literal {
	const fastCharacters = options?.fastCharacters ?? false;

	let flags;
	if (Array.isArray(value)) {
		const alternatives: readonly NoParent<Concatenation>[] = value;
		flags = getFlags(alternatives, options, fastCharacters);
	} else {
		const node = value as NoParent<Expression> | NoParent<Concatenation>;
		flags = getFlags([node], options, fastCharacters);
	}

	let flagsString = "";
	if (flags.global) flagsString += "g";
	if (flags.ignoreCase) flagsString += "i";
	if (flags.multiline) flagsString += "m";
	if (flags.dotAll) flagsString += "s";
	if (flags.unicode) flagsString += "u";
	if (flags.sticky) flagsString += "y";

	const printOptions: PrintOptions = {
		fastCharacters,
		predefinedCS: getPredefinedCharacterSets(flags),
	};

	return {
		source: toSource(value, flags, printOptions),
		flags: flagsString,
	};
}

interface PrintOptions {
	readonly fastCharacters: boolean;
	readonly predefinedCS: PredefinedCharacterSets;
}

function toSource(
	value: NoParent<Concatenation> | NoParent<Expression> | readonly NoParent<Concatenation>[],
	flags: Flags,
	options: PrintOptions
): string {
	if (Array.isArray(value)) {
		const alternatives: readonly NoParent<Concatenation>[] = value;

		if (alternatives.length === 0) {
			return "[]";
		} else {
			return alternatives.map(c => toSource(c, flags, options)).join("|");
		}
	} else {
		const node = value as NoParent<Expression> | NoParent<Concatenation>;
		if (node.type === "Concatenation") {
			let s = "";
			for (const element of node.elements) {
				s += elementToSource(element, flags, options);
			}
			return s;
		} else {
			return toSource(node.alternatives, flags, options);
		}
	}
}
function elementToSource(element: NoParent<Element>, flags: Flags, options: PrintOptions): string {
	const maximum = flags.unicode ? UNICODE_MAXIMUM : UTF16_MAXIMUM;

	switch (element.type) {
		case "Alternation": {
			const assertion = isBoundaryAssertion(element, flags);
			if (assertion) {
				return assertion;
			}

			return "(?:" + toSource(element.alternatives, flags, options) + ")";
		}
		case "Assertion": {
			if (isEdgeAssertion(element, flags)) {
				return element.kind === "behind" ? "^" : "$";
			}
			let s = "(?";
			if (element.kind === "behind") s += "<";
			s += element.negate ? "!" : "=";
			s += toSource(element.alternatives, flags, options);
			s += ")";
			return s;
		}
		case "CharacterClass": {
			if (element.characters.maximum !== maximum) {
				throw new Error(`All characters were expected to have a maximum of ${maximum}.`);
			}

			if (options.fastCharacters) {
				return printCharactersFast(element.characters);
			} else {
				return printCharacters(element.characters, flags, options.predefinedCS);
			}
		}
		case "Quantifier": {
			let s;
			if (element.alternatives.length === 1 && element.alternatives[0].elements.length === 1) {
				const e = element.alternatives[0].elements[0];
				if (e.type === "Alternation" || e.type === "CharacterClass") {
					s = toSource(element.alternatives[0], flags, options);
				} else {
					s = "(?:" + toSource(element.alternatives, flags, options) + ")";
				}
			} else {
				s = "(?:" + toSource(element.alternatives, flags, options) + ")";
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
			return s;
		}
		default:
			throw assertNever(element);
	}
}
function isEdgeAssertion(assertion: NoParent<Assertion>, flags: Flags): boolean {
	if (assertion.negate) {
		const chars = getSingleCharSetInAssertion(assertion);
		if (chars) {
			return (flags.multiline && isNonLineTerminator(chars, flags.unicode)) || (!flags.multiline && chars.isAll);
		}
	}
	return false;
}
function isBoundaryAssertion(alternation: NoParent<Alternation>, flags: Flags): "\\b" | "\\B" | false {
	// \b == (?<!\w)(?=\w)|(?<=\w)(?!\w)
	// \B == (?<=\w)(?=\w)|(?<!\w)(?!\w)

	if (alternation.alternatives.length !== 2) {
		return false;
	}
	const alt0 = alternation.alternatives[0];
	const alt1 = alternation.alternatives[1];
	if (alt0.elements.length !== 2 || alt1.elements.length !== 2) {
		return false;
	}

	const e00 = alt0.elements[0];
	const e01 = alt0.elements[1];
	const e10 = alt1.elements[0];
	const e11 = alt1.elements[1];
	if (e00.type !== "Assertion" || e01.type !== "Assertion" || e10.type !== "Assertion" || e11.type !== "Assertion") {
		return false;
	}
	if (e00.kind === e01.kind || e10.kind === e11.kind) {
		// we need a lookahead-lookbehind pair in both alternatives
		return false;
	}

	const c00 = getSingleCharSetInAssertion(e00);
	const c01 = getSingleCharSetInAssertion(e01);
	const c10 = getSingleCharSetInAssertion(e10);
	const c11 = getSingleCharSetInAssertion(e11);
	if (!c00 || !c01 || !c10 || !c11) {
		return false;
	}

	const word = flags.unicode && flags.ignoreCase ? WORD_IU : WORD;
	if (
		!rangeEqual(c00.ranges, word) ||
		!rangeEqual(c01.ranges, word) ||
		!rangeEqual(c10.ranges, word) ||
		!rangeEqual(c11.ranges, word)
	) {
		return false;
	}

	if (e00.negate === e01.negate && e10.negate === e11.negate && e00.negate !== e10.negate) {
		return "\\B";
	}
	if (
		e00.negate !== e01.negate &&
		e10.negate !== e11.negate &&
		(e00.kind === e10.kind) !== (e00.negate === e10.negate)
	) {
		return "\\b";
	}
	return false;
}
function getSingleCharSetInAssertion(assertion: NoParent<Assertion>): CharSet | undefined {
	if (assertion.alternatives.length === 1) {
		const alt = assertion.alternatives[0];
		if (alt.elements.length === 1) {
			const e = alt.elements[0];
			if (e.type === "CharacterClass") {
				return e.characters;
			}
		}
	}
	return undefined;
}

function makeIgnoreCase(cs: CharSet, unicode: boolean): CharSet {
	if (unicode) {
		return withCaseVaryingCharacters(cs, UnicodeCaseFolding, UnicodeCaseVarying);
	} else {
		return withCaseVaryingCharacters(cs, UTF16CaseFolding, UTF16CaseVarying);
	}
}
function makeIgnoreCaseSingleChar(char: Char, unicode: boolean): CharSet | null {
	const caseFoldingMap = unicode ? UnicodeCaseFolding : UTF16CaseFolding;
	const folding: undefined | readonly Char[] = caseFoldingMap[char];
	if (folding) {
		return CharSet.empty(unicode ? UNICODE_MAXIMUM : UTF16_MAXIMUM).union(folding.map(c => ({ min: c, max: c })));
	} else {
		return null;
	}
}

function getUnicodeFlag(value: readonly NoParent<Node>[]): boolean | undefined {
	try {
		for (const node of value) {
			visitAst(node, {
				onCharacterClassEnter(node) {
					if (node.characters.maximum === UNICODE_MAXIMUM) {
						throw true;
					} else if (node.characters.maximum === UTF16_MAXIMUM) {
						throw false;
					} else {
						throw new Error("All character sets have to have a maximum of either 0xFFFF or 0x10FFFF.");
					}
				},
			});
		}
	} catch (e) {
		if (typeof e === "boolean") {
			return e;
		}
		throw e;
	}

	return undefined; // no characters
}
function getIgnoreCaseFlag(value: readonly NoParent<Node>[], unicode: boolean): false | undefined {
	let ignoreCase: false | undefined = undefined;

	try {
		for (const node of value) {
			visitAst(node, {
				onCharacterClassEnter(node) {
					const cs = node.characters;
					if (!cs.equals(makeIgnoreCase(cs, unicode))) {
						ignoreCase = false;
						throw new Error();
					}
				},
			});
		}
	} catch (e) {
		/* swallow error */
	}

	return ignoreCase;
}
function getMultilineFlag(value: readonly NoParent<Node>[], unicode: boolean): boolean | undefined {
	let stringStartAssertion = false;
	let stringEndAssertion = false;
	let lineStartAssertion = false;
	let lineEndAssertion = false;

	for (const node of value) {
		visitAst(node, {
			onAssertionEnter(assertion) {
				if (assertion.negate && assertion.alternatives.length === 1) {
					const alt = assertion.alternatives[0];
					if (alt.elements.length === 1) {
						const e = alt.elements[0];
						if (e.type === "CharacterClass") {
							const chars = e.characters;
							if (chars.isAll) {
								if (assertion.kind === "ahead") {
									stringEndAssertion = true;
								} else {
									stringStartAssertion = true;
								}
							} else if (isNonLineTerminator(chars, unicode)) {
								if (assertion.kind === "ahead") {
									lineEndAssertion = true;
								} else {
									lineStartAssertion = true;
								}
							}
						}
					}
				}
			},
		});
	}

	// try to avoid lookbehinds (browser support for them isn't great)
	if (lineStartAssertion) {
		return true;
	}
	if (stringStartAssertion) {
		return false;
	}

	// try to avoid (?!.), so we can enable the s flag
	if (lineEndAssertion) {
		return true;
	}
	if (stringEndAssertion) {
		return false;
	}

	return undefined;
}
function getFlags(
	value: readonly NoParent<Node>[],
	options: Readonly<ToLiteralOptions> | undefined,
	fastCharacters: boolean
): Flags {
	const template = options?.flags;

	const unicode = template?.unicode ?? getUnicodeFlag(value);

	const templateIgnoreCase = template?.ignoreCase;
	let ignoreCase: boolean | undefined;
	if (fastCharacters && !templateIgnoreCase) {
		ignoreCase = false;
	} else {
		ignoreCase = getIgnoreCaseFlag(value, !!unicode) ?? templateIgnoreCase;
	}
	if ((templateIgnoreCase ?? ignoreCase) !== ignoreCase) {
		throw new Error(
			`Incompatible flags: The i flag is ${ignoreCase ? "required" : "forbidden"} to create a literal but ${
				templateIgnoreCase ? "required" : "forbidden"
			} by the options.`
		);
	}

	return {
		dotAll: template?.dotAll,
		global: template?.global,
		ignoreCase: ignoreCase ?? true,
		multiline: template?.multiline ?? getMultilineFlag(value, !!unicode),
		sticky: template?.sticky,
		unicode,
	};
}

interface PredefinedCharacterSets {
	readonly digit: CharSet;
	readonly notDigit: CharSet;
	readonly space: CharSet;
	readonly notSpace: CharSet;
	readonly word: CharSet;
	readonly notWord: CharSet;
	readonly lineTerminator: CharSet;
	readonly notLineTerminator: CharSet;
}
const PREDEFINED_CS_UTF16: PredefinedCharacterSets = {
	digit: CharSet.empty(UTF16_MAXIMUM).union(DIGIT),
	notDigit: CharSet.empty(UTF16_MAXIMUM).union(DIGIT).negate(),
	space: CharSet.empty(UTF16_MAXIMUM).union(SPACE),
	notSpace: CharSet.empty(UTF16_MAXIMUM).union(SPACE).negate(),
	word: CharSet.empty(UTF16_MAXIMUM).union(WORD),
	notWord: CharSet.empty(UTF16_MAXIMUM).union(WORD).negate(),
	lineTerminator: CharSet.empty(UTF16_MAXIMUM).union(LINE_TERMINATOR),
	notLineTerminator: CharSet.empty(UTF16_MAXIMUM).union(LINE_TERMINATOR).negate(),
};
const PREDEFINED_CS_UNICODE_CASE_SENSITIVE: PredefinedCharacterSets = {
	digit: CharSet.empty(UNICODE_MAXIMUM).union(DIGIT),
	notDigit: CharSet.empty(UNICODE_MAXIMUM).union(DIGIT).negate(),
	space: CharSet.empty(UNICODE_MAXIMUM).union(SPACE),
	notSpace: CharSet.empty(UNICODE_MAXIMUM).union(SPACE).negate(),
	word: CharSet.empty(UNICODE_MAXIMUM).union(WORD),
	notWord: CharSet.empty(UNICODE_MAXIMUM).union(WORD).negate(),
	lineTerminator: CharSet.empty(UNICODE_MAXIMUM).union(LINE_TERMINATOR),
	notLineTerminator: CharSet.empty(UNICODE_MAXIMUM).union(LINE_TERMINATOR).negate(),
};
const PREDEFINED_CS_UNICODE_IGNORE_CASE: PredefinedCharacterSets = {
	digit: CharSet.empty(UNICODE_MAXIMUM).union(DIGIT),
	notDigit: CharSet.empty(UNICODE_MAXIMUM).union(DIGIT).negate(),
	space: CharSet.empty(UNICODE_MAXIMUM).union(SPACE),
	notSpace: CharSet.empty(UNICODE_MAXIMUM).union(SPACE).negate(),
	word: CharSet.empty(UNICODE_MAXIMUM).union(WORD_IU),
	notWord: CharSet.empty(UNICODE_MAXIMUM).union(WORD_IU).negate(),
	lineTerminator: CharSet.empty(UNICODE_MAXIMUM).union(LINE_TERMINATOR),
	notLineTerminator: CharSet.empty(UNICODE_MAXIMUM).union(LINE_TERMINATOR).negate(),
};
function getPredefinedCharacterSets(flags: Flags): PredefinedCharacterSets {
	if (flags.unicode) {
		if (flags.ignoreCase) {
			return PREDEFINED_CS_UNICODE_IGNORE_CASE;
		} else {
			return PREDEFINED_CS_UNICODE_CASE_SENSITIVE;
		}
	} else {
		return PREDEFINED_CS_UTF16;
	}
}

const UNICODE_NON_LINE_TERMINATOR = CharSet.empty(UNICODE_MAXIMUM).union(LINE_TERMINATOR).negate();
const NON_LINE_TERMINATOR = CharSet.empty(UTF16_MAXIMUM).union(LINE_TERMINATOR).negate();
function isNonLineTerminator(chars: CharSet, unicode: boolean | undefined): boolean {
	if (unicode) {
		return chars.equals(UNICODE_NON_LINE_TERMINATOR);
	} else {
		return chars.equals(NON_LINE_TERMINATOR);
	}
}

const PRINTABLE_CONTROL_CHARACTERS = new Map<Char, string>([
	["\n".charCodeAt(0), "\\n"],
	["\f".charCodeAt(0), "\\f"],
	["\t".charCodeAt(0), "\\t"],
	["\r".charCodeAt(0), "\\r"],
]);

function printAsHex(char: Char): string {
	if (char === 0) {
		return "\\0";
	} else if (char < 16) {
		return "\\x0" + char.toString(16);
	} else if (char < 256) {
		return "\\x" + char.toString(16);
	} else if (char < 4096) {
		return "\\u0" + char.toString(16);
	} else if (char < 65536) {
		return "\\u" + char.toString(16);
	} else {
		return "\\u{" + char.toString(16) + "}";
	}
}

const SPECIAL_IN_CHAR_CLASS = new Set<Char>([..."\\]-^"].map(c => c.charCodeAt(0)));
function printInCharClass(char: Char): string {
	// special characters
	if (SPECIAL_IN_CHAR_CLASS.has(char)) {
		return "\\" + String.fromCharCode(char);
	}

	const specialPrintable = PRINTABLE_CONTROL_CHARACTERS.get(char);
	if (specialPrintable) {
		return specialPrintable;
	}

	if (char >= 32 && char < 127) {
		// printable ASCII chars
		return String.fromCharCode(char);
	}

	return printAsHex(char);
}

const PRINTABLE_RANGES: readonly CharRange[] = [
	{ min: 0x30, max: 0x39 }, // 0-9
	{ min: 0x41, max: 0x5a }, // A-Z
	{ min: 0x61, max: 0x7a }, // a-z
];
const PRINTABLE_RANGES_MIN = Math.min(...PRINTABLE_RANGES.map(r => r.min));
const PRINTABLE_RANGES_MAX = Math.max(...PRINTABLE_RANGES.map(r => r.max));
function printAsRange(range: CharRange): string {
	if (
		PRINTABLE_RANGES_MIN <= range.min &&
		range.max <= PRINTABLE_RANGES_MAX &&
		PRINTABLE_RANGES.some(({ min, max }) => min <= range.min && range.max <= max)
	) {
		// printable ASCII char range
		return String.fromCharCode(range.min) + "-" + String.fromCharCode(range.max);
	} else {
		return printAsHex(range.min) + "-" + printAsHex(range.max);
	}
}
function printCharRange(range: CharRange): string {
	if (range.min === range.max) {
		return printInCharClass(range.min);
	}
	if (range.min === range.max - 1) {
		return printInCharClass(range.min) + printInCharClass(range.max);
	}

	const size = range.max - range.min + 1;
	if (size <= 6) {
		let s = "";
		for (let i = range.min; i <= range.max; i++) {
			s += printInCharClass(i);
		}

		return shortest(s, printAsRange(range));
	} else {
		return printAsRange(range);
	}
}

const SPECIAL_OUTSIDE_CHAR_CLASS = new Set<Char>([..."()[]{}*+?|\\.^$/"].map(c => c.charCodeAt(0)));
function printOutsideOfCharClass(char: Char): string {
	if (SPECIAL_OUTSIDE_CHAR_CLASS.has(char)) {
		return "\\" + String.fromCharCode(char);
	}

	const specialPrint = PRINTABLE_CONTROL_CHARACTERS.get(char);
	if (specialPrint) {
		return specialPrint;
	}

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

function printCharClassContentSimple(set: CharSet): string {
	let s = "";
	for (const range of set.ranges) {
		s += printCharRange(range);
	}
	return s;
}
function printCharClassContentSimpleIgnoreCase(set: CharSet): string {
	const unicode = set.maximum === UNICODE_MAXIMUM;
	let hasAlready = CharSet.empty(set.maximum);

	let s = "";
	for (const range of set.ranges) {
		if (!hasAlready.isSupersetOf(range)) {
			s += printCharRange(range);
			hasAlready = hasAlready.union(makeIgnoreCase(CharSet.empty(set.maximum).union([range]), unicode));
		}
	}
	return s;
}

function shortest(a: string, b: string): string {
	return a.length <= b.length ? a : b;
}

function printCharClassContent(set: CharSet, flags: Flags, predefinedCS: PredefinedCharacterSets): string {
	type CandidateCreator = (set: CharSet) => string;

	const simpleCreator: CandidateCreator = set => {
		let s = printCharClassContentSimple(set);
		if (flags.ignoreCase) {
			s = shortest(s, printCharClassContentSimpleIgnoreCase(set));
		}
		return s;
	};
	const reducedCreator: CandidateCreator = set => {
		// The simplest approach would be to print all ranges but the resulting character class might not be minimal or
		// readable, so we try to subtract common char sets first in an attempt to make it more readable.

		let reducedSet = set;
		let reducedPrefix = "";
		if (reducedSet.isSupersetOf(predefinedCS.space)) {
			reducedPrefix += "\\s";
			reducedSet = reducedSet.without(predefinedCS.space);
		}
		if (reducedSet.isSupersetOf(predefinedCS.word)) {
			reducedPrefix += "\\w";
			reducedSet = reducedSet.without(predefinedCS.word);
		}
		if (reducedSet.isSupersetOf(predefinedCS.digit)) {
			reducedPrefix += "\\d";
			reducedSet = reducedSet.without(predefinedCS.digit);
		}

		if (set === reducedSet || reducedSet.ranges.length < set.ranges.length * 2 + 2) {
			// couldn't be reduced or the reduced set is significantly more complex than the original set.
			return simpleCreator(set);
		} else {
			return shortest(simpleCreator(set), reducedPrefix + simpleCreator(reducedSet));
		}
	};
	const moveDashCreator: CandidateCreator = set => {
		// If the set contains a dash ("-"), then it might be a good idea to move the dash to the start of the set, so
		// we don't have to escape it.
		if (set.has(45 /* === "-".charCodeAt(0) */) && !set.has(46) /* "-" has to be at the end of a range */) {
			const withoutDash = set.without([{ min: 45, max: 45 }]);
			return shortest(reducedCreator(set), "-" + reducedCreator(withoutDash));
		} else {
			return reducedCreator(set);
		}
	};
	const moveCaretCreator: CandidateCreator = set => {
		// Similar idea to move dash but for the caret ("^")
		if (
			set.ranges.length > 1 /* there have to be at least 2 ranges for this */ &&
			set.has(94 /* === "^".charCodeAt(0) */) &&
			!set.has(93) /* "^" has to be at the start of a range */
		) {
			const withoutCaret = set.without([{ min: 94, max: 94 }]);
			return shortest(moveDashCreator(set), moveDashCreator(withoutCaret) + "^");
		} else {
			return moveDashCreator(set);
		}
	};

	return moveCaretCreator(set);
}

function printCharacters(chars: CharSet, flags: Flags, predefinedCS: PredefinedCharacterSets): string {
	// print
	if (chars.isAll) return flags.dotAll ? "." : "[^]";
	if (chars.isEmpty) return "[]";

	const min: Char = chars.ranges[0].min;
	if (chars.ranges.length === 1 && min === chars.ranges[0].max) {
		// a single character
		return printOutsideOfCharClass(min);
	} else if (flags.ignoreCase) {
		const minIgnoreCase = makeIgnoreCaseSingleChar(min, !!flags.unicode);
		if (minIgnoreCase && minIgnoreCase.equals(chars)) {
			// single character because
			return printOutsideOfCharClass(min);
		}
	}

	// if the first min is 0, then it's most likely negated, so don't even bother checking non-negated char sets
	if (min !== 0) {
		if (rangeEqual(chars.ranges, predefinedCS.digit.ranges)) return "\\d";
		if (rangeEqual(chars.ranges, predefinedCS.space.ranges)) return "\\s";
		if (rangeEqual(chars.ranges, predefinedCS.word.ranges)) return "\\w";
	} else {
		if (rangeEqual(chars.ranges, predefinedCS.notDigit.ranges)) return "\\D";
		if (rangeEqual(chars.ranges, predefinedCS.notSpace.ranges)) return "\\S";
		if (rangeEqual(chars.ranges, predefinedCS.notWord.ranges)) return "\\W";
		if (!flags.dotAll && rangeEqual(chars.ranges, predefinedCS.notLineTerminator.ranges)) return ".";
	}

	const source = printCharClassContent(chars, flags, predefinedCS);
	const negatedSource = printCharClassContent(chars.negate(), flags, predefinedCS);

	if (source.length <= negatedSource.length) {
		return `[${source}]`;
	} else {
		return `[^${negatedSource}]`;
	}
}
function printCharactersFast(chars: CharSet): string {
	return `[${printCharClassContentSimple(chars)}]`;
}
