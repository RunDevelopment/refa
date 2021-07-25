import { CharRange, CharSet } from "../char-set";
import { assertNever } from "../util";
import { CharEnv, CharEnvUnicode } from "./char-env";
import { Alias, Binary_Property, General_Category, Script, Script_Extensions } from "./unicode";

interface CacheEntry {
	readonly value: CharSet;
	readonly negated: CharSet;
}

export function getProperty(
	key: string,
	value: string | null,
	negated: boolean,
	env: CharEnv & CharEnvUnicode
): CharSet {
	const entry = getCacheEntry(key, value, env);
	if (negated) {
		return entry.negated;
	} else {
		return entry.value;
	}
}

const ignoreCaseCache = new Map<string, CacheEntry>();
const nonIgnoreCaseCache = new Map<string, CacheEntry>();

function getCacheEntry(key: string, value: string | null, env: CharEnv & CharEnvUnicode): CacheEntry {
	const cache = env.ignoreCase ? ignoreCaseCache : nonIgnoreCaseCache;
	const cacheKey = key + "=" + value;

	let entry = cache.get(cacheKey);
	if (entry === undefined) {
		entry = newCacheEntry(key, value, env);
		cache.set(cacheKey, entry);
	}

	return entry;
}

function newCacheEntry(key: string, value: string | null, env: CharEnv & CharEnvUnicode): CacheEntry {
	const set = env.empty.union(getPropertyRanges(key, value));
	if (env.ignoreCase) {
		return { value: env.withCaseVaryingCharacters(set), negated: env.withCaseVaryingCharacters(set.negate()) };
	} else {
		return { value: set, negated: set.negate() };
	}
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
