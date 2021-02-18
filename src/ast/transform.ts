import { Char } from "../core-types";
import { Alternation, Assertion, CharacterClass, Concatenation, Expression, Node, NoParent, Quantifier } from "./nodes";
import { visitNodes } from "./visit";

/**
 * A transform is some algorithm that takes a AST sub tree and makes any number of modifications to the given sub tree.
 * They cannot see or modify anything outside the given sub tree.
 *
 * Transformers are always applied bottom-up.
 *
 * The most simple transformer is an empty object (`{}`). This is equivalent to a no-op transformer that does not change
 * the given AST.
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
	 *
	 * If the expression to transform does not contain any characters at the start of the transformation, then this
	 * value will be `0`.
	 */
	readonly maxCharacter: Char;

	/**
	 * Signals that the transformer changed the AST.
	 */
	readonly signalMutation: () => void;
}

const TRANSFORMER_KEYS: readonly (keyof Transformer)[] = [
	"onAlternation",
	"onAssertion",
	"onCharacterClass",
	"onConcatenation",
	"onExpression",
	"onQuantifier",
];
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
	type OnFunction = (path: never, context: TransformContext) => void;
	const functionLists: Partial<Record<keyof Transformer, OnFunction[]>> = {};

	for (const t of transformers) {
		for (const key of TRANSFORMER_KEYS) {
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

export interface TransformOptions {
	/**
	 * The maximum number of times the transformer will be applied to the AST.
	 *
	 * This is only a maximum. The transformer will be stopped before this number is reach if the AST isn't modified
	 * anymore.
	 *
	 * @default 10
	 */
	maxPasses?: number;
}

/**
 * Transforms the given expression according to the given transformer.
 *
 * __Do not__ use the given `ast` object again after calling this function, the object will be in an undefined state.
 *
 * @param transformer
 * @param ast
 * @param options
 */
export function transform(
	transformer: Transformer,
	ast: NoParent<Expression>,
	options?: Readonly<TransformOptions>
): NoParent<Expression> {
	options = options ?? {};
	let passesLeft = options.maxPasses ?? 10;

	const context: Context = {
		transformer,
		ast,
		maxCharacter: determineMaxCharacter(ast),
	};

	for (; passesLeft >= 1; passesLeft--) {
		if (!transformPass(context)) {
			break;
		}
	}

	return ast;
}

/**
 * The will return the maximum of the first charset is finds or 1 if no charset were found.
 *
 * @param ast
 */
function determineMaxCharacter(ast: NoParent<Expression>): Char {
	try {
		visitNodes(ast, {
			onCharacterClassEnter(node) {
				throw node.characters.maximum;
			},
		});
		return 0;
	} catch (e) {
		if (typeof e === "number") {
			return e;
		}
		throw e;
	}
}

interface Context {
	transformer: Transformer;
	ast: NoParent<Expression>;
	maxCharacter: Char;
}

function transformPass({ transformer, ast, maxCharacter }: Context): boolean {
	let changed = false;
	const transformerContext: TransformContext = {
		maxCharacter,
		signalMutation() {
			changed = true;
		},
	};

	function leaveNode(node: NoParent<Node>): void {
		const fnName = "on" + node.type;

		const fn = transformer[fnName as keyof Transformer];
		if (fn) {
			fn(node as never, transformerContext);
		}
	}

	visitNodes(ast, {
		onAlternationLeave: leaveNode,
		onAssertionLeave: leaveNode,
		onCharacterClassLeave: leaveNode,
		onConcatenationLeave: leaveNode,
		onExpressionLeave: leaveNode,
		onQuantifierLeave: leaveNode,
	});

	return changed;
}
