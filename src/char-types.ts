/**
 * A character is a non-negative integer.
 *
 * This is one of the core concepts of refa. Instead of operating on JavaScript strings, UTF16 character codes, or
 * Unicode code points, this library uses plain numbers instead. This makes refa agnostic to text encodings and even
 * text in general since the integers used as character may represent arbitrary concepts.
 *
 * There are only 2 restrictions on the numbers that can be characters:
 *
 * 1.  They have to be non-negative integers.
 * 2.  They can be at most `Number.MAX_SAFE_INTEGER`.
 *
 * ---
 *
 * This type serves as a way to document characters. It is a clear way to signal that a value is not just any number.
 */
export type Char = number & { __char?: never };

/**
 * A word is finite sequence of {@link Char}s.
 *
 * This one of the core concepts of refa. Instead of operating on JavaScript strings, all functions operate on
 * {@link Char}s and char arrays (= words). This means that refa is agnostic to text encodings, the string
 * representation of JavaScript, and even text itself.
 *
 * This type serves as a way to document words. It should _not_ be used interchangeably with `Char[]` or `number[]`.
 */
export type Word = Char[];

/**
 * An immutable finite sequence of {@link Char}s.
 *
 * This is an immutable view on a {@link Word}.
 */
export type ReadonlyWord = readonly Char[];
