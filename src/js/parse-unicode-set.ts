import { Char, Word } from "../char-types";
import { CharRange, CharSet } from "../char-set";
import { assertNever, debugAssert } from "../util";
import { Flags, UnicodeSetsFlags } from "./flags";
import { getCharEnv } from "./char-env";
import { getStringProperty } from "./property";
import { UnicodeSet } from "./unicode-set";
import { AST } from "@eslint-community/regexpp";
import { PredefinedCharacterSet, StringPropertyCharacterSet, createCharSet } from "./create-char-set";
import { StringSet } from "./string-set";
import { Maximum } from "./maximum";

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

		return compileElement(element, flags);
	}
}

function compileElement(
	element: Exclude<CharacterElement, AST.ClassRangesCharacterClass>,
	flags: Readonly<UnicodeSetsFlags>
): UnicodeSet {
	switch (element.type) {
		case "Character": {
			return UnicodeSet.fromChars(createCharSetFromChar(element.value, flags));
		}
		case "CharacterClassRange": {
			return UnicodeSet.fromChars(createCharSet([{ min: element.min.value, max: element.max.value }], flags));
		}
		case "CharacterSet": {
			if (element.kind === "property" && element.strings) {
				const env = getCharEnv(flags);
				debugAssert(env.unicode);
				return getStringProperty(element.key, env);
			} else {
				return UnicodeSet.fromChars(createCharSet([element], flags));
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
			return UnicodeSet.fromChars(chars.chars.negate());
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
			return UnicodeSet.fromChars(expr.chars.negate());
		}

		case "ClassStringDisjunction": {
			const env = getCharEnv(flags);

			const words: Word[] = [];
			const chars: Char[] = [];

			for (const alternative of element.alternatives) {
				if (alternative.elements.length === 1) {
					chars.push(alternative.elements[0].value);
				} else {
					words.push(alternative.elements.map(e => e.value));
				}
			}

			let charSet = chars.length === 0 ? env.empty : createCharSet(chars, flags);
			if (env.ignoreCase) {
				charSet = env.withCaseVaryingCharacters(charSet);
			}
			return UnicodeSet.from(charSet, StringSet.from(words, env.charCaseFolding));
		}

		default:
			return assertNever(element, "Unsupported element");
	}
}
function compileClassElement(
	elements: readonly AST.UnicodeSetsCharacterClassElement[],
	flags: Readonly<UnicodeSetsFlags>
): UnicodeSet {
	const empty = UnicodeSet.empty(Maximum.UNICODE);

	if (elements.length === 0) {
		return empty;
	} else if (elements.length === 1) {
		return compileElement(elements[0], flags);
	}

	const singleChars: (Char | CharRange | Exclude<PredefinedCharacterSet, StringPropertyCharacterSet>)[] = [];
	const withStrings: UnicodeSet[] = [];

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

	const chars = UnicodeSet.fromChars(createCharSet(singleChars, flags));
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
	flags: Readonly<Flags>
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
