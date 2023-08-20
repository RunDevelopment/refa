/**
 * Classes and functions to convert JavaScript RegExp to refa AST and vise versa.
 *
 * All classes and functions in this module/namespace are specific to JavaScript regular expressions as defined by the
 * ECMAScript standard.
 *
 * @see {@link Parser}: A class to convert from JS RegExp to refa AST.
 * @see {@link toLiteral}: A function to convert from refa AST to JS RegExp.
 *
 * @module
 */

export * from "./create-assertion";
export * from "./create-char-set";
export * from "./to-literal";
export * from "./flags";
export * from "./literal";
export * from "./parser";
export * from "./parse-unicode-set";
