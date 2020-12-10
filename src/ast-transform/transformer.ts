import { Alternation, Assertion, CharacterClass, Concatenation, Expression, Quantifier, NoParent } from "../ast";

/**
 * A transform is some algorithm that takes a AST sub tree and makes any number of modifications to the given sub tree.
 * They cannot see or modify anything outside the given sub tree.
 *
 * Transformers are always applied bottom-up.
 */
export interface Transformer {
	onAlternation?(node: NoParent<Alternation>, context: TransformContext): void;
	onAssertion?(node: NoParent<Assertion>, context: TransformContext): void;
	onCharacterClass?(node: NoParent<CharacterClass>, context: TransformContext): void;
	onConcatenation?(node: NoParent<Concatenation>, context: TransformContext): void;
	onExpression?(node: NoParent<Expression>, context: TransformContext): void;
	onQuantifier?(node: NoParent<Quantifier>, context: TransformContext): void;
}

export interface TransformContext {
	/**
	 * The maximum character of all character sets in the AST.
	 */
	readonly maxCharacter: number;

	/**
	 * Signals that the transformer changed the AST.
	 */
	signalMutation(): void;
}

export interface CreationOptions {
	/**
	 * If `true`, then transformers are allowed to reorder alternatives.
	 *
	 * This may cause the behavior of the regex to change.
	 *
	 * @default false
	 */
	ignoreOrder?: boolean;
	/**
	 * If `true`, then transformers are allowed to reduce or increase the ambiguity of the regular expression.
	 *
	 * @default false
	 */
	ignoreAmbiguity?: boolean;
}

/**
 * Creates a new transformer that performs all given transformers in sequentially in order for each node.
 *
 * If only one transformer is given, the returned transformer will be functionally equivalent. If no transformers are
 * given, the returned transformer will be equivalent to a noop transformer.
 *
 * The given iterable can be changed and reused after this function returns.
 *
 * @param transformers
 */
export function combineTransformers(transformers: Iterable<Transformer>): Transformer {
	const array = [...transformers].filter(t => !isNoop(t));
	if (array.length === 0) {
		return noop();
	}

	type OnFunction = (path: never, context: TransformContext) => void;

	const functionLists: Partial<Record<keyof Transformer, OnFunction[]>> = {};
	for (const t of array) {
		for (const key of KEYS) {
			const fn = t[key];
			if (fn) {
				const list = (functionLists[key] = functionLists[key] ?? []);
				list.push(fn.bind(t));
			}
		}
	}

	function toFunction(key: keyof Transformer): OnFunction | undefined {
		const list = functionLists[key];
		if (list === undefined || list.length === 0) {
			return undefined;
		} else if (list.length === 1) {
			return list[0];
		} else {
			return function (path, context) {
				for (const fn of list) {
					fn(path, context);
				}
			};
		}
	}

	return {
		onAlternation: toFunction("onAlternation"),
		onAssertion: toFunction("onAssertion"),
		onCharacterClass: toFunction("onCharacterClass"),
		onConcatenation: toFunction("onConcatenation"),
		onExpression: toFunction("onExpression"),
		onQuantifier: toFunction("onQuantifier"),
	};
}

/**
 * Returns a transformer that does not modify the given AST sub trees.
 */
export function noop(): Transformer {
	return {};
}

const KEYS: readonly (keyof Transformer)[] = [
	"onAlternation",
	"onAssertion",
	"onCharacterClass",
	"onConcatenation",
	"onExpression",
	"onQuantifier",
];
function isNoop(transformer: Transformer): boolean {
	return KEYS.every(k => transformer[k] === undefined);
}
