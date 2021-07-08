import type { CharSet } from "./char-set";

/**
 * A word set is finite sequence of non-empty {@link CharSet}s.
 *
 * All {@link CharSet}s are guaranteed to be non-empty and to have the same maximum.
 *
 * All FA and regex implementations are based on either {@link CharSet}s or {@link CharRange}s. This is necessary
 * because it's not practical to represent the large character sets used in every-day regexes using single characters.
 * Consequently, it is more efficient to work with {@link CharSet}s for them, so operations that yield the words of an
 * FA or regex typically yield {@link WordSet}s instead of {@link Word}s.
 *
 * This type serves as a way to document word sets. It should _not_ be used interchangeably with `CharSet[]`.
 */
export type WordSet = CharSet[];

/**
 * An immutable finite sequence of non-empty {@link CharSet}s.
 *
 * This is an immutable view on a {@link WordSet}.
 */
export type ReadonlyWordSet = readonly CharSet[];
