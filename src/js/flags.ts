/**
 * An unchecked partial set of RegExp flags.
 *
 * Flags are not validated by TypeScript. You must ensure that the flags are valid.
 * Whenever possible, use the {@link Flags} type instead.
 */
export interface UncheckedFlags {
	/** @default false */
	dotAll?: boolean;
	/** @default false */
	global?: boolean;
	/** @default false */
	hasIndices?: boolean;
	/** @default false */
	ignoreCase?: boolean;
	/** @default false */
	multiline?: boolean;
	/** @default false */
	sticky?: boolean;
	/** @default false */
	unicode?: boolean;
	/** @default false */
	unicodeSets?: boolean;
}

export function isFlags(flags: UncheckedFlags): flags is Flags {
	const { unicode = false, unicodeSets = false } = flags;
	return (!unicode && !unicodeSets) || (unicode && !unicodeSets) || (!unicode && unicodeSets);
}

/**
 * A partial set of non-Unicode-sets RegExp flags. The `v` flag is guaranteed to be unset.
 */
export interface NonUnicodeSetsFlags extends UncheckedFlags {
	/** @default false */
	unicode?: boolean;
	/** @default false */
	unicodeSets?: false;
}
/**
 * A partial set of Unicode-sets RegExp flags. The `v` flag is guaranteed to be set.
 */
export interface UnicodeSetsFlags extends UncheckedFlags {
	/** @default false */
	unicode?: false;
	/** @default false */
	unicodeSets: true;
}

/**
 * A partial set of RegExp flags.
 */
export type Flags = NonUnicodeSetsFlags | UnicodeSetsFlags;
