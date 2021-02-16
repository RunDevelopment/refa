/**
 * Contains all AST transformer implementations of refa.
 *
 * All transformer factory functions implemented here will optionally take {@link CreationOptions} or a sub-class of it.
 * This can be used to control the behavior of the created transformers.
 *
 * @module
 */

export * from "./creation-options";

export * from "./apply-assertions";
export * from "./factor-out";
export * from "./inline";
export * from "./merge-with-quantifier";
export * from "./move-up-empty";
export * from "./nested-quantifiers";
export * from "./pattern-edge-assertions";
export * from "./remove-dead-branches";
export * from "./remove-unnecessary-assertions";
export * from "./replace-assertions";
export * from "./sort-assertions";
export * from "./union-characters";
