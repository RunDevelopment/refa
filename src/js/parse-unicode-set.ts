import { Char, Word } from "../char-types";
import { CharRange, CharSet } from "../char-set";
import { assertNever, debugAssert } from "../util";
import { Flags, NonUnicodeSetsFlags, UnicodeSetsFlags } from "./flags";
import { getCharEnv } from "./char-env";
import { getStringProperty } from "./property";
import { ExtendedCharSet } from "./extended-char-set";
import { AST } from "@eslint-community/regexpp";
import { PredefinedCharacterSet, StringPropertyCharacterSet, createCharSet } from "./create-char-set";
import { ReadonlyWordSet, WordSet } from "../word-set";
import { StringSet } from "./string-set";

export class UnicodeSet {
	/**
	 * All single characters in the set.
	 */
	readonly chars: CharSet;
	/**
	 * All words in the set.
	 *
	 * The list is guaranteed to not contain any single-character words.
	 */
	readonly words: readonly ReadonlyWordSet[];

	private constructor(chars: CharSet, words: readonly ReadonlyWordSet[]) {
		this.chars = chars;
		this.words = words;
	}

	static fromChars(chars: CharSet): UnicodeSet {
		return new UnicodeSet(chars, []);
	}
	static from(chars: CharSet, words: readonly ReadonlyWordSet[]): UnicodeSet {
		if (words.some(w => w.length === 1)) {
			throw new Error("The given words contain single-character words.");
		}

		return new UnicodeSet(chars, words);
	}
}

export type CharacterElement =
	| AST.CharacterClass
	| AST.Character
	| AST.CharacterClassRange
	| AST.CharacterSet
	| AST.ClassSetOperand
	| AST.ExpressionCharacterClass["expression"];

export function parseUnicodeSet(element: CharacterElement, flags: Readonly<Flags>): UnicodeSet {
	if (!flags.unicodeSets) {
		if (
			element.type === "ExpressionCharacterClass" ||
			element.type === "ClassIntersection" ||
			element.type === "ClassSubtraction" ||
			element.type === "ClassStringDisjunction" ||
			(element.type === "CharacterClass" && element.unicodeSets) ||
			(element.type === "CharacterSet" && element.kind === "property" && element.strings)
		) {
			throw new Error(
				"Invalid flags. The AST contains elements exclusive to Unicode-sets mode even though the `v` flag is not set."
			);
		}

		return UnicodeSet.fromChars(parseCharSet(element, flags));
	} else {
		if (element.type === "CharacterClass" && !element.unicodeSets) {
			throw new Error(
				"Invalid flags. The AST contains elements exclusive to non-Unicode-sets mode even though the `v` flag is set."
			);
		}

		const charSet = compileElement(element, flags);
		const words: WordSet[] = [];
		for (const word of charSet.accept.values()) {
			debugAssert(word.length !== 1);
			words.push(word.map(char => createCharSetFromChar(char, flags)));
		}

		return UnicodeSet.from(charSet.chars, words);
	}
}

function compileElement(
	element: Exclude<CharacterElement, AST.ClassRangesCharacterClass>,
	flags: Readonly<UnicodeSetsFlags>
): ExtendedCharSet {
	switch (element.type) {
		case "Character": {
			return ExtendedCharSet.fromChars(createCharSetFromChar(element.value, flags));
		}
		case "CharacterClassRange": {
			return ExtendedCharSet.fromChars(
				createCharSet([{ min: element.min.value, max: element.max.value }], flags)
			);
		}
		case "CharacterSet": {
			if (element.kind === "property" && element.strings) {
				const env = getCharEnv(flags);
				debugAssert(env.unicode);
				return getStringProperty(element.key, env);
			} else {
				return ExtendedCharSet.fromChars(createCharSet([element], flags));
			}
		}
		case "CharacterClass": {
			const chars = compileClassElement(element.elements, flags);

			if (!element.negate) {
				return chars;
			}

			// negate
			if (!chars.accept.isEmpty) {
				throw new Error(
					"The character class " + element.raw + " cannot be negated because it contains strings."
				);
			}
			return ExtendedCharSet.fromChars(chars.chars.negate());
		}

		case "ClassIntersection": {
			const left = compileElement(element.left, flags);
			const right = compileElement(element.right, flags);
			return left.intersect(right);
		}
		case "ClassSubtraction": {
			const left = compileElement(element.left, flags);
			const right = compileElement(element.right, flags);
			return left.without(right);
		}
		case "ExpressionCharacterClass": {
			const expr = compileElement(element.expression, flags);

			if (!element.negate) {
				return expr;
			}

			// negate
			if (!expr.accept.isEmpty) {
				throw new Error(
					"The character class " + element.raw + " cannot be negated because it contains strings."
				);
			}
			return ExtendedCharSet.fromChars(expr.chars.negate());
		}

		case "ClassStringDisjunction": {
			const env = getCharEnv(flags);

			const words: Word[] = [];
			const chars: Char[] = [];

			for (const alternative of element.alternatives) {
				if (alternative.elements.length === 1) {
					chars.push(alternative.elements[0].value);
					continue;
				}

				if (env.ignoreCase) {
					words.push(alternative.elements.map(e => env.canonicalize(e.value)));
				} else {
					words.push(alternative.elements.map(e => e.value));
				}
			}

			let charSet = chars.length === 0 ? env.empty : createCharSet(chars, flags);
			if (env.ignoreCase) {
				charSet = env.withCaseVaryingCharacters(charSet);
			}
			return ExtendedCharSet.from(charSet, StringSet.from(words));
		}

		default:
			return assertNever(element, "Unsupported element");
	}
}
function compileClassElement(
	elements: readonly AST.UnicodeSetsCharacterClassElement[],
	flags: Readonly<UnicodeSetsFlags>
): ExtendedCharSet {
	const empty = ExtendedCharSet.empty(0x10ffff);

	if (elements.length === 0) {
		return empty;
	} else if (elements.length === 1) {
		return compileElement(elements[0], flags);
	}

	const singleChars: (Char | CharRange | Exclude<PredefinedCharacterSet, StringPropertyCharacterSet>)[] = [];
	const withStrings: ExtendedCharSet[] = [];

	for (const e of elements) {
		switch (e.type) {
			case "Character": {
				singleChars.push(e.value);
				break;
			}
			case "CharacterClassRange": {
				singleChars.push({ min: e.min.value, max: e.max.value });
				break;
			}
			case "CharacterSet":
				if (e.kind === "property" && e.strings) {
					withStrings.push(compileElement(e, flags));
				} else {
					singleChars.push(e);
				}
				break;
			default:
				withStrings.push(compileElement(e, flags));
				break;
		}
	}

	const chars = ExtendedCharSet.fromChars(createCharSet(singleChars, flags));
	if (withStrings.length === 0) {
		return chars;
	}

	withStrings.push(chars);
	return empty.union(...withStrings);
}

export function parseCharSet(
	element:
		| AST.ClassRangesCharacterClass
		| AST.Character
		| AST.CharacterClassRange
		| Exclude<AST.CharacterSet, AST.StringsUnicodePropertyCharacterSet>,
	flags: Readonly<NonUnicodeSetsFlags>
): CharSet {
	switch (element.type) {
		case "Character": {
			// e.g. a
			return createCharSetFromChar(element.value, flags);
		}
		case "CharacterClassRange": {
			// e.g. a
			return createCharSet([{ min: element.min.value, max: element.max.value }], flags);
		}
		case "CharacterSet": {
			// e.g. \w
			return createCharSet([element], flags);
		}
		case "CharacterClass": {
			// e.g. [^a-f\s]
			const characters = createCharSet(
				element.elements.map(e => {
					switch (e.type) {
						case "Character":
							return e.value;
						case "CharacterClassRange":
							return { min: e.min.value, max: e.max.value };
						case "CharacterSet":
							// https://github.com/eslint-community/regexpp/issues/121
							// TODO: remove this once the type has bee fixed
							if (e.kind === "property" && e.strings) {
								throw new Error("Invalid flags. The AST contains a Unicode property escape.");
							}
							return e;
						default:
							throw assertNever(e, "Unsupported element");
					}
				}),
				flags
			);

			return element.negate ? characters.negate() : characters;
		}
		default: {
			return assertNever(element);
		}
	}
}

function createCharSetFromChar(char: Char, flags: Readonly<Flags>): CharSet {
	const env = getCharEnv(flags);

	if (env.ignoreCase) {
		const eqClass = env.caseFolding[char];
		if (eqClass) {
			return CharSet.fromCharacters(env.maxCharacter, eqClass);
		}
	}

	return CharSet.fromCharacter(env.maxCharacter, char);
}
