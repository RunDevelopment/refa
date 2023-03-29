import { Char } from "../char-types";
import { Alternation, Assertion, Concatenation, Expression, NoParent, Node, visitAst } from "../ast";
import { assertNever, cachedFunc, debugAssert } from "../util";
import { CharRange, CharSet } from "../char-set";
import { Flags } from "./flags";
import { Literal } from "./literal";
import { CharEnv, CharEnvIgnoreCase, UNICODE_MAXIMUM, UTF16_MAXIMUM, getCharEnv } from "./char-env";
import { UTF16Result, toUTF16 } from "./unicode-to-utf16";
import { UTF16CaseVarying } from "./utf16-case-folding";

export interface ToLiteralOptions {
	/**
	 * An optional template for the flags of the JavaScript RegExp literal to be created.
	 *
	 * All flags that are set to `false` are guaranteed to be disabled in the created literal. Likewise, all flags that
	 * are set to `true` are guaranteed to be enabled in the created literal.
	 *
	 * Flags that are `undefined` will be enabled/disabled depending on the implementation. While no guarantees are
	 * given, the implementation will generally try to choose flags such that it can create a literal that is as
	 * small/simple as possible.
	 *
	 * If the constraints on flags defined here make it impossible to create a literal, an error will be thrown.
	 */
	flags?: Flags;

	/**
	 * This will force the function to print characters as fast as possible.
	 *
	 * Literals created with this option will usually be created about 10x faster but the result will usually be very
	 * hard to read. The is option is intended to provide performance benefits when readability is not a concern.
	 *
	 * @default false
	 */
	fastCharacters?: boolean;
}

/**
 * Converts the given AST or AST subtree into a JS literal.
 *
 * The returned literal will be a literal representation of the given AST. However, assertions maybe converted to
 * builtin JS RegExp assertions (e.g `\b`, `$`) instead of using the literal lookahead/lookbehind form.
 *
 * @param node
 * @param options
 */
export function toLiteral(node: NoParent<Node>, options?: Readonly<ToLiteralOptions>): Literal;
export function toLiteral(
	alternatives: readonly NoParent<Concatenation>[],
	options?: Readonly<ToLiteralOptions>
): Literal;
export function toLiteral(
	value: NoParent<Node> | readonly NoParent<Concatenation>[],
	options?: Readonly<ToLiteralOptions>
): Literal {
	const fastCharacters = options?.fastCharacters ?? false;

	let nodes: readonly NoParent<Node>[];
	if (Array.isArray(value)) {
		nodes = value as readonly NoParent<Concatenation>[];
	} else {
		nodes = [value as NoParent<Expression> | NoParent<Concatenation>];
	}

	const result = getFlags(nodes, options, fastCharacters);
	const flags: Readonly<Flags> = result.flags;
	const { converter, inputUnicode } = result;

	const env = getCharEnv(flags);

	const printCharSet = createCharacterPrinter(fastCharacters, flags, env);

	const context: PrintContext = {
		flags,
		printCharSet,
		env: getCharEnv(flags),
		inputEnv: getCharEnv({ unicode: inputUnicode }),
		converter,
	};

	return {
		source: toSource(value, context),
		flags: toFlagsString(flags),
	};
}

function toFlagsString(flags: Readonly<Flags>): string {
	let flagsString = "";

	if (flags.hasIndices) {
		flagsString += "d";
	}
	if (flags.global) {
		flagsString += "g";
	}
	if (flags.ignoreCase) {
		flagsString += "i";
	}
	if (flags.multiline) {
		flagsString += "m";
	}
	if (flags.dotAll) {
		flagsString += "s";
	}
	if (flags.unicode) {
		flagsString += "u";
	}
	if (flags.sticky) {
		flagsString += "y";
	}

	return flagsString;
}

function createCharacterPrinter(
	fastCharacters: boolean,
	flags: Readonly<Flags>,
	env: CharEnv
): (value: CharSet) => string {
	if (fastCharacters) {
		return cachedFunc(printCharactersFast);
	} else {
		return cachedFunc<CharSet, string>(cs => printCharacters(cs, flags, env));
	}
}

interface PrintContext {
	readonly printCharSet: (value: CharSet) => string;
	readonly env: CharEnv;
	readonly inputEnv: CharEnv;
	readonly flags: Flags;
	readonly converter: CharSetConverter;
}

function toSource(value: NoParent<Node> | readonly NoParent<Concatenation>[], context: PrintContext): string {
	if (Array.isArray(value)) {
		return alternativesToSource(value as readonly NoParent<Concatenation>[], context);
	} else {
		return nodeToSource(value as NoParent<Node>, context);
	}
}
function alternativesToSource(alternatives: readonly NoParent<Concatenation>[], context: PrintContext): string {
	if (alternatives.length === 0) {
		return "[]";
	} else {
		let s = "";
		let first = true;
		for (const a of alternatives) {
			if (first) {
				first = false;
			} else {
				s += "|";
			}
			s += nodeToSource(a, context);
		}
		return s;
	}
}
function nodeToSource(node: NoParent<Node>, context: PrintContext): string {
	switch (node.type) {
		case "Alternation": {
			const assertion = isBoundaryAssertion(node, context.env);
			if (assertion !== false) {
				return assertion;
			}

			return "(?:" + alternativesToSource(node.alternatives, context) + ")";
		}
		case "Assertion": {
			if (isEdgeAssertion(node, context.flags, context.inputEnv)) {
				return node.kind === "behind" ? "^" : "$";
			}

			if (node.negate) {
				const chars = getSingleCharSetInAssertion(node);
				if (chars) {
					// try to give ^ $ an efficient representation even if their required flag isn't present
					const dir = node.kind === "ahead" ? "" : "<";
					if (context.inputEnv.nonLineTerminator.equals(chars)) {
						return `(?${dir}!${context.printCharSet(context.env.nonLineTerminator)})`;
					}
					if (chars.isAll) {
						return `(?${dir}!${context.printCharSet(context.env.all)})`;
					}
				}
			}

			let s = "(?";
			if (node.kind === "behind") {
				s += "<";
			}
			s += node.negate ? "!" : "=";
			s += alternativesToSource(node.alternatives, context);
			s += ")";
			return s;
		}
		case "CharacterClass": {
			if (node.characters.maximum !== context.inputEnv.maxCharacter) {
				throw new Error(`All characters were expected to have a maximum of ${context.inputEnv.maxCharacter}.`);
			}

			if (node.characters.maximum === UNICODE_MAXIMUM && !context.flags.unicode) {
				// convert Unicode character set to UTF16
				debugAssert(context.converter instanceof UnicodeToUTF16CharSetConverter);
				const utf16Result = context.converter.getUTF16Result(node.characters);

				if (utf16Result.astral.length === 0 && utf16Result.high.isEmpty && utf16Result.low.isEmpty) {
					// in this case, the Unicode and UTF16 character set are equivalent
					return context.printCharSet(utf16Result.bmp);
				}

				let s = "";
				if (!utf16Result.bmp.isEmpty) {
					s += context.printCharSet(utf16Result.bmp) + "|";
				}
				for (const [high, low] of utf16Result.astral) {
					s += context.printCharSet(high) + context.printCharSet(low) + "|";
				}
				if (!utf16Result.high.isEmpty) {
					s += context.printCharSet(utf16Result.high) + "(?![\\udc00-\\udfff])|";
				}
				if (!utf16Result.low.isEmpty) {
					s += "(?<![\\uda00-\\udbff])" + context.printCharSet(utf16Result.low) + "|";
				}

				debugAssert(s !== "");

				return `(?:${s.slice(0, -1)})`;
			} else {
				return context.printCharSet(node.characters);
			}
		}
		case "Concatenation": {
			let s = "";
			for (const element of node.elements) {
				s += nodeToSource(element, context);
			}
			return s;
		}
		case "Expression": {
			return alternativesToSource(node.alternatives, context);
		}
		case "Quantifier": {
			let s;
			if (node.alternatives.length === 1 && node.alternatives[0].elements.length === 1) {
				const e = node.alternatives[0].elements[0];
				if (e.type === "Alternation" || e.type === "CharacterClass") {
					s = nodeToSource(node.alternatives[0], context);
				} else {
					s = "(?:" + alternativesToSource(node.alternatives, context) + ")";
				}
			} else {
				s = "(?:" + alternativesToSource(node.alternatives, context) + ")";
			}

			if (node.min === 0 && node.max === Infinity) {
				s += "*";
			} else if (node.min === 1 && node.max === Infinity) {
				s += "+";
			} else if (node.min === 0 && node.max === 1) {
				s += "?";
			} else if (node.max === Infinity) {
				s += `{${node.min},}`;
			} else if (node.min === node.max) {
				s += `{${node.min}}`;
			} else {
				s += `{${node.min},${node.max}}`;
			}
			if (node.lazy) {
				s += "?";
			}
			return s;
		}
		case "Unknown": {
			return (
				"[]Unknown:" +
				node.id
					.replace(/[\\/|[\](){}+*?^$.]/g, m => "\\" + m)
					// eslint-disable-next-line no-control-regex
					.replace(/[\0-\x1F]/g, m => "\\x" + m.charCodeAt(0).toString(16).padStart(2, "0")) +
				"[]"
			);
		}
		default:
			throw assertNever(node);
	}
}
function isEdgeAssertion(assertion: NoParent<Assertion>, flags: Flags, env: CharEnv): boolean {
	if (assertion.negate) {
		const chars = getSingleCharSetInAssertion(assertion);
		if (chars) {
			debugAssert(chars.maximum === env.maxCharacter);
			return (flags.multiline && env.nonLineTerminator.equals(chars)) || (!flags.multiline && chars.isAll);
		}
	}
	return false;
}
function isBoundaryAssertion(alternation: NoParent<Alternation>, env: CharEnv): "\\b" | "\\B" | false {
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

	const word = env.word.resize(c00.maximum);
	if (!c00.equals(word) || !c01.equals(word) || !c10.equals(word) || !c11.equals(word)) {
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

function makeIgnoreCaseSingleChar(char: Char, env: CharEnv & CharEnvIgnoreCase): CharSet | null {
	const folding = env.caseFolding[char];
	if (folding) {
		return env.empty.union(folding.map(c => ({ min: c, max: c })));
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

const UTF16_ASCII_CASE_VARYING = CharSet.empty(UTF16_MAXIMUM).union([
	{ min: 0x41, max: 0x5a }, // A-Z
	{ min: 0x61, max: 0x7a }, // a-z
]);
const UTF16_NON_ASCII_CASE_VARYING = UTF16CaseVarying.without(UTF16_ASCII_CASE_VARYING);
const enum GetIgnoreCaseFlagResult {
	DONT_CARE,
	BENEFICIAL,
	FORBIDDEN,
}
function getIgnoreCaseFlag(
	value: readonly NoParent<Node>[],
	unicode: boolean,
	converter: CharSetConverter
): GetIgnoreCaseFlagResult {
	const env = getCharEnv({ unicode, ignoreCase: true });
	debugAssert(env.ignoreCase === true);

	let beneficial = false as boolean;

	try {
		for (const node of value) {
			visitAst(node, {
				onCharacterClassEnter(node) {
					const cs = converter.getCaseVaryingPart(node.characters);

					if (cs.isDisjointWith(env.caseVarying) || cs.isSupersetOf(env.caseVarying)) {
						// The char set either contains none or all case-varying characters.
						// This means that we don't have to worry about casing. The character printer might be able to
						// print a smaller character class if the i flag was enabled but that's unlikely.
						return;
					}

					if (!unicode) {
						// For non-Unicode regexes, we have to do a bit more work to avoid unnecessary i flags.
						// The problem is that \w's won't be caught by the above condition (they were in Unicode mode),
						// so we have to get creative or all regexes containing \w's will get an i flag (unless
						// forbidden).
						//
						// The trick we use lies in the canonicalization algorithm for non-Unicode regexes. The
						// algorithm explicitly distinguishes between ASCII and non-ASCII characters. The case folding
						// maps for those two character types are completely disjoint. This means that we can split the
						// case-varying condition to check for ASCII and non-ASCII separately.
						//
						// However, this will actually give a few too many false positives, so we will use a little
						// hack to gear this condition specifically towards \w: We will assume that all \w characters
						// are case-varying. That's false of course, but it prevents a few false positives.
						if (
							((cs.isDisjointWith(env.word) || cs.isSupersetOf(env.word)) &&
								cs.isDisjointWith(UTF16_NON_ASCII_CASE_VARYING)) ||
							cs.isSupersetOf(UTF16_NON_ASCII_CASE_VARYING)
						) {
							return;
						}
					}

					beneficial = true;

					if (!cs.equals(env.withCaseVaryingCharacters(cs))) {
						throw GetIgnoreCaseFlagResult.FORBIDDEN;
					}
				},
			});
		}
	} catch (e) {
		if (e === GetIgnoreCaseFlagResult.FORBIDDEN) {
			return GetIgnoreCaseFlagResult.FORBIDDEN;
		}
		throw e;
	}

	return beneficial ? GetIgnoreCaseFlagResult.BENEFICIAL : GetIgnoreCaseFlagResult.DONT_CARE;
}

function getMultilineFlag(value: readonly NoParent<Node>[], env: CharEnv): boolean | undefined {
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
							} else if (env.nonLineTerminator.equals(chars)) {
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
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (lineStartAssertion) {
		return true;
	}
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (stringStartAssertion) {
		return false;
	}

	// try to avoid (?!.), so we can enable the s flag
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (lineEndAssertion) {
		return true;
	}
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (stringEndAssertion) {
		return false;
	}

	return undefined;
}
function getFlags(
	value: readonly NoParent<Node>[],
	options: Readonly<ToLiteralOptions> | undefined,
	fastCharacters: boolean
): { flags: Flags; converter: CharSetConverter; inputUnicode: boolean } {
	const template = options?.flags ?? {};

	// u flag
	const inputUnicode: boolean = getUnicodeFlag(value) ?? template.unicode ?? false;
	const unicode: boolean = template.unicode ?? inputUnicode;
	if (inputUnicode === false && unicode === true) {
		throw new Error(
			`Incompatible flags: The u flag is required by the flags options but a UTF16 regex cannot be converted to a Unicode regex.`
		);
	}

	const converter: CharSetConverter =
		unicode === inputUnicode ? new NoopCharConverter() : new UnicodeToUTF16CharSetConverter();

	// i flag
	let ignoreCase: boolean;
	if (template.ignoreCase === true) {
		// check that it's actually possible to enable the i flag
		if (getIgnoreCaseFlag(value, unicode, converter) === GetIgnoreCaseFlagResult.FORBIDDEN) {
			throw new Error(
				`Incompatible flags: The i flag is forbidden to create a literal but required by the flags options.`
			);
		}
		ignoreCase = true;
	} else if (template.ignoreCase === false) {
		// it's always possible to not use the i flag
		ignoreCase = false;
	} else {
		// we can choose
		if (fastCharacters) {
			ignoreCase = false;
		} else {
			const result = getIgnoreCaseFlag(value, unicode, converter);
			ignoreCase = result === GetIgnoreCaseFlagResult.BENEFICIAL ? true : false;
		}
	}

	// m flag
	let multiline = template.multiline;
	if (multiline === undefined) {
		multiline = getMultilineFlag(value, getCharEnv({ unicode: inputUnicode }));
	}

	return {
		flags: {
			dotAll: template.dotAll,
			global: template.global,
			hasIndices: template.hasIndices,
			ignoreCase,
			multiline,
			sticky: template.sticky,
			unicode,
		},
		converter,
		inputUnicode,
	};
}

interface CharSetConverter {
	/**
	 * Returns a character set that is a subset of the given character set and a superset of a case-varying characters
	 * in the given character set.
	 */
	getCaseVaryingPart(value: CharSet): CharSet;
}
class NoopCharConverter implements CharSetConverter {
	getCaseVaryingPart(value: CharSet): CharSet {
		return value;
	}
}
class UnicodeToUTF16CharSetConverter implements CharSetConverter {
	private readonly _cache = new Map<CharSet, UTF16Result>();
	getUTF16Result(value: CharSet): UTF16Result {
		let result = this._cache.get(value);
		if (result === undefined) {
			result = toUTF16(value);
			this._cache.set(value, result);
		}
		return result;
	}
	getCaseVaryingPart(value: CharSet): CharSet {
		return this.getUTF16Result(value).bmp;
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
	if (specialPrintable !== undefined) {
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
	if (specialPrint !== undefined) {
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
	if (l !== b.length) {
		return false;
	}
	for (let i = 0; i < l; i++) {
		const aR = a[i];
		const bR = b[i];
		if (aR.min !== bR.min || aR.max !== bR.max) {
			return false;
		}
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
function printCharClassContentSimpleIgnoreCase(set: CharSet, env: CharEnv & CharEnvIgnoreCase): string {
	let hasAlready = env.empty;

	let s = "";
	for (const range of set.ranges) {
		if (!hasAlready.isSupersetOf(range)) {
			s += printCharRange(range);
			hasAlready = hasAlready.union(env.withCaseVaryingCharacters(env.empty.union([range])));
		}
	}
	return s;
}

function shortest(a: string, b: string): string {
	return a.length <= b.length ? a : b;
}

function printCharClassContent(set: CharSet, env: CharEnv): string {
	type CandidateCreator = (set: CharSet) => string;

	const simpleCreator: CandidateCreator = set => {
		let s = printCharClassContentSimple(set);
		if (env.ignoreCase) {
			s = shortest(s, printCharClassContentSimpleIgnoreCase(set, env));
		}
		return s;
	};
	const reducedCreator: CandidateCreator = set => {
		// The simplest approach would be to print all ranges but the resulting character class might not be minimal or
		// readable, so we try to subtract common char sets first in an attempt to make it more readable.

		let reducedSet = set;
		let reducedPrefix = "";
		if (reducedSet.isSupersetOf(env.space)) {
			reducedPrefix += "\\s";
			reducedSet = reducedSet.without(env.space);
		}
		if (reducedSet.isSupersetOf(env.word)) {
			reducedPrefix += "\\w";
			reducedSet = reducedSet.without(env.word);
		}
		if (reducedSet.isSupersetOf(env.digit)) {
			reducedPrefix += "\\d";
			reducedSet = reducedSet.without(env.digit);
		}

		if (set === reducedSet || reducedSet.ranges.length > set.ranges.length * 2 + 2) {
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
			const withoutDash = set.without({ min: 45, max: 45 });
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
			const withoutCaret = set.without({ min: 94, max: 94 });
			return shortest(moveDashCreator(set), moveDashCreator(withoutCaret) + "^");
		} else {
			return moveDashCreator(set);
		}
	};

	return moveCaretCreator(set);
}

function printCharacters(chars: CharSet, flags: Readonly<Flags>, env: CharEnv): string {
	// print
	if (chars.isAll) {
		return flags.dotAll ? "." : "[^]";
	}
	if (chars.isEmpty) {
		return "[]";
	}

	const min: Char = chars.ranges[0].min;
	if (chars.ranges.length === 1 && min === chars.ranges[0].max) {
		// a single character
		return printOutsideOfCharClass(min);
	} else if (env.ignoreCase) {
		const minIgnoreCase = makeIgnoreCaseSingleChar(min, env);
		if (minIgnoreCase && minIgnoreCase.equals(chars)) {
			// single character because
			return printOutsideOfCharClass(min);
		}
	}

	// if the first min is 0, then it's most likely negated, so don't even bother checking non-negated char sets
	if (min !== 0) {
		if (rangeEqual(chars.ranges, env.digit.ranges)) {
			return "\\d";
		}
		if (rangeEqual(chars.ranges, env.space.ranges)) {
			return "\\s";
		}
		if (rangeEqual(chars.ranges, env.word.ranges)) {
			return "\\w";
		}
	} else {
		if (rangeEqual(chars.ranges, env.nonDigit.ranges)) {
			return "\\D";
		}
		if (rangeEqual(chars.ranges, env.nonSpace.ranges)) {
			return "\\S";
		}
		if (rangeEqual(chars.ranges, env.nonWord.ranges)) {
			return "\\W";
		}
		if (!flags.dotAll && rangeEqual(chars.ranges, env.nonLineTerminator.ranges)) {
			return ".";
		}
	}

	const source = printCharClassContent(chars, env);
	const negatedSource = printCharClassContent(chars.negate(), env);

	if (source.length <= negatedSource.length) {
		return `[${source}]`;
	} else {
		return `[^${negatedSource}]`;
	}
}
function printCharactersFast(chars: CharSet): string {
	return `[${printCharClassContentSimple(chars)}]`;
}
