import { CharRange, CharSet } from "../char-set";
import { Char, ReadonlyWord } from "../char-types";
import { assertNever } from "../util";
import { CharEnv, CharEnvIgnoreCase, CharEnvUnicode } from "./char-env";
import { UnicodeSet } from "./unicode-set";
import { StringSet } from "./string-set";
import { Alias, Binary_Property, General_Category, PropertiesOfStrings, Script, Script_Extensions } from "./unicode";
import { Maximum } from "./maximum";
import { getCharCaseFolding } from "./char-case-folding";

interface CacheEntry {
	readonly value: CharSet;
	readonly negated: CharSet;
}

const ignoreCaseCache = new Map<string, CacheEntry>();
const ignoreCaseUnicodeSetsCache = new Map<string, CacheEntry>();
const nonIgnoreCaseCache = new Map<string, CacheEntry>();

export function getCharacterProperty(
	key: string,
	value: string | null,
	negated: boolean,
	env: CharEnv & CharEnvUnicode,
	unicodeSets: boolean
): CharSet {
	const cache = env.ignoreCase ? (unicodeSets ? ignoreCaseCache : ignoreCaseUnicodeSetsCache) : nonIgnoreCaseCache;
	const cacheKey = key + "=" + value;

	let entry = cache.get(cacheKey);
	if (entry === undefined) {
		entry = getCharacterPropertyUncached(key, value, env, unicodeSets);
		cache.set(cacheKey, entry);
	}

	if (negated) {
		return entry.negated;
	} else {
		return entry.value;
	}
}
function getCharacterPropertyUncached(
	key: string,
	value: string | null,
	env: CharEnv & CharEnvUnicode,
	unicodeSets: boolean
): CacheEntry {
	const rawData = getPropertyData(key, value);
	if (!rawData.accept.isEmpty) {
		throw new Error(
			`The given property ${key} is a property of strings, which is invalid for 'getCharacterProperty'.`
		);
	}
	const set = rawData.chars;

	if (env.ignoreCase) {
		if (unicodeSets) {
			const value = env.withCaseVaryingCharacters(set);
			return { value: value, negated: value.negate() };
		} else {
			return { value: env.withCaseVaryingCharacters(set), negated: env.withCaseVaryingCharacters(set.negate()) };
		}
	} else {
		return { value: set, negated: set.negate() };
	}
}

const ignoreCaseStringCache = new Map<string, UnicodeSet>();

export function getStringProperty(key: string, env: CharEnv & CharEnvUnicode): UnicodeSet {
	if (!env.ignoreCase) {
		return getPropertyData(key, null);
	}

	let entry = ignoreCaseStringCache.get(key);
	if (entry === undefined) {
		entry = getStringPropertyUncached(key, env);
		ignoreCaseStringCache.set(key, entry);
	}
	return entry;
}
function getStringPropertyUncached(key: string, env: CharEnv & CharEnvUnicode & CharEnvIgnoreCase): UnicodeSet {
	const data = getPropertyData(key, null);

	const chars = env.withCaseVaryingCharacters(data.chars);
	const words = StringSet.from(data.accept.words, env.charCaseFolding);

	return UnicodeSet.from(chars, words);
}

const propertyDataCache = new Map<string, UnicodeSet>();
export function getPropertyData(key: string, value: string | null): UnicodeSet {
	const cacheKey = key + "=" + value;
	let cached = propertyDataCache.get(cacheKey);
	if (cached === undefined) {
		cached = getPropertyDataUncached(key, value);
		propertyDataCache.set(cacheKey, cached);
	}
	return cached;
}
function getPropertyDataUncached(key: string, value: string | null): UnicodeSet {
	if (value === null) {
		const strings = getPropertyStrings(key);
		if (strings) {
			return stringsToUnicodeSet(strings);
		}
	}

	const ranges = getPropertyRanges(key, value);
	const chars = CharSet.empty(Maximum.UNICODE).union(ranges);
	return UnicodeSet.fromChars(chars);
}

function stringsToUnicodeSet(strings: readonly ReadonlyWord[]): UnicodeSet {
	const chars: Char[] = [];
	const words: ReadonlyWord[] = [];

	for (const str of strings) {
		if (str.length === 1) {
			chars.push(str[0]);
		} else {
			words.push(str);
		}
	}

	// characters are sorted (see create-unicode.ts)
	const charSet = CharSet.fromCharacters(Maximum.UNICODE, chars);

	return UnicodeSet.from(charSet, StringSet.from(words, getCharCaseFolding(true, false)));
}

function getPropertyStrings(key: string): readonly ReadonlyWord[] | undefined {
	if (key in Alias.Binary_Property_Of_String) {
		// binary property of strings
		const name = Alias.Binary_Property_Of_String[key as keyof typeof Alias.Binary_Property_Of_String];
		return PropertiesOfStrings[name as keyof typeof PropertiesOfStrings];
	}
	return undefined;
}
function getPropertyRanges(key: string, value: string | null): readonly CharRange[] {
	if (value == null) {
		if (key in Alias.Binary_Property) {
			// binary property
			const name = Alias.Binary_Property[key as keyof typeof Alias.Binary_Property];
			return Binary_Property[name as keyof typeof Binary_Property];
		} else if (key in Alias.General_Category) {
			// value from the general category
			const name = Alias.General_Category[key as keyof typeof Alias.General_Category];
			return General_Category[name as keyof typeof General_Category];
		} else {
			throw new Error(`Unknown lone Unicode property name or value ${key}.`);
		}
	} else {
		// key=value

		if (!(key in Alias.NonBinaryProperty)) {
			throw new Error(`Unknown Unicode property name ${key}.`);
		}
		const keyName = Alias.NonBinaryProperty[key as keyof typeof Alias.NonBinaryProperty];

		let categoryAliases: Record<string, string>;
		let categoryValues: Record<string, readonly CharRange[]>;
		if (keyName === "General_Category") {
			categoryAliases = Alias.General_Category;
			categoryValues = General_Category;
		} else if (keyName === "Script") {
			categoryAliases = Alias.ScriptAndScript_Extensions;
			categoryValues = Script;
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		} else if (keyName === "Script_Extensions") {
			categoryAliases = Alias.ScriptAndScript_Extensions;
			categoryValues = Script_Extensions;
		} else {
			throw assertNever(keyName);
		}

		if (!(value in categoryAliases)) {
			throw new Error(`Unknown Unicode property value ${value} for the name ${key}.`);
		}
		const valueName = categoryAliases[value];

		return categoryValues[valueName];
	}
}
