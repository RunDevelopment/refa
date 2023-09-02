import { Char } from "../char-types";
import {
	Alternation,
	Assertion,
	CharacterClass,
	Concatenation,
	Expression,
	NoParent,
	Node,
	Quantifier,
	Unknown,
} from "./nodes";
import { visitAst } from "./visit";

/**
 * A transform is some algorithm that takes a AST subtree and makes any number of modifications to the given subtree.
 * They cannot see or modify anything outside the given subtree. Transformers are assumed to behave like a set of pure
 * functions.
 *
 * Transformers are always applied bottom-up.
 *
 * The most simple transformer is an empty object (`{}`). This is equivalent to a no-op transformer that does not change
 * the given AST.
 */
export interface Transformer {
	/**
	 * An optional name useful for diagnostics.
	 */
	readonly name?: string;
	onAlternation?(node: NoParent<Alternation>, context: TransformContext): void;
	onAssertion?(node: NoParent<Assertion>, context: TransformContext): void;
	onCharacterClass?(node: NoParent<CharacterClass>, context: TransformContext): void;
	onConcatenation?(node: NoParent<Concatenation>, context: TransformContext): void;
	onExpression?(node: NoParent<Expression>, context: TransformContext): void;
	onQuantifier?(node: NoParent<Quantifier>, context: TransformContext): void;
	onUnknown?(node: NoParent<Unknown>, context: TransformContext): void;
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

/**
 * A transformer that runs all given transformers in sequentially order.
 */
export class CombinedTransformer implements Transformer {
	readonly name = "CombinedTransformer";
	readonly transformers: readonly Transformer[];

	constructor(transformers: Iterable<Transformer>) {
		const list: Transformer[] = [];
		for (const t of transformers) {
			if (t instanceof CombinedTransformer) {
				list.push(...t.transformers);
			} else {
				list.push(t);
			}
		}
		this.transformers = list;
	}

	onAlternation(node: NoParent<Alternation>, context: TransformContext): void {
		for (const t of this.transformers) {
			if (t.onAlternation) {
				t.onAlternation(node, context);
			}
		}
	}

	onAssertion(node: NoParent<Assertion>, context: TransformContext): void {
		for (const t of this.transformers) {
			if (t.onAssertion) {
				t.onAssertion(node, context);
			}
		}
	}

	onCharacterClass(node: NoParent<CharacterClass>, context: TransformContext): void {
		for (const t of this.transformers) {
			if (t.onCharacterClass) {
				t.onCharacterClass(node, context);
			}
		}
	}

	onConcatenation(node: NoParent<Concatenation>, context: TransformContext): void {
		for (const t of this.transformers) {
			if (t.onConcatenation) {
				t.onConcatenation(node, context);
			}
		}
	}

	onExpression(node: NoParent<Expression>, context: TransformContext): void {
		for (const t of this.transformers) {
			if (t.onExpression) {
				t.onExpression(node, context);
			}
		}
	}

	onQuantifier(node: NoParent<Quantifier>, context: TransformContext): void {
		for (const t of this.transformers) {
			if (t.onQuantifier) {
				t.onQuantifier(node, context);
			}
		}
	}

	onUnknown(node: NoParent<Unknown>, context: TransformContext): void {
		for (const t of this.transformers) {
			if (t.onUnknown) {
				t.onUnknown(node, context);
			}
		}
	}
}
/**
 * Creates a new transformer that performs all given transformers in sequentially order.
 *
 * If only one transformer is given, the returned transformer will be functionally equivalent. If no transformers are
 * given, the returned transformer will be equivalent to a noop transformer.
 *
 * The given iterable can be changed and reused after this function returns.
 *
 * @param transformers
 * @deprecated Use `new CombinedTransformer(transformers)` instead.
 */
export function combineTransformers(transformers: Iterable<Transformer>): CombinedTransformer {
	return new CombinedTransformer(transformers);
}

export interface TransformEvents {
	/**
	 * An optional callback that will be called at the start of every pass.
	 *
	 * @param ast The AST that will be transformed.
	 * @param pass The number of the pass that will be performed. Starts at `1`.
	 */
	onPassStart?: (ast: NoParent<Expression>, pass: number) => void;
	/**
	 * An optional callback that will be called every time a transformer mutates the AST.
	 *
	 * @param ast The AST that was transformed.
	 * @param node The node that was mutated by the transformer. Descendants of this node may have been mutated as well.
	 * @param transformer The transformer that mutated the AST.
	 */
	onChange?: (ast: NoParent<Expression>, node: NoParent<Node>, transformer: Transformer) => void;
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

	/**
	 * Optional events to observe the transformation process.
	 */
	events?: TransformEvents;
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
	const { maxPasses = 10, events } = options ?? {};

	const context: Context = {
		transformer,
		ast,
		maxCharacter: determineMaxCharacter(ast),
		events: events,
	};

	for (let i = 1; i <= maxPasses; i++) {
		events?.onPassStart?.(ast, i);

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
		visitAst(ast, {
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
	events: TransformEvents | undefined;
}

function transformPass({ transformer, ast, maxCharacter, events }: Context): boolean {
	let changed = false;
	let leaveNode: (node: NoParent<Node>) => void;

	const transformers = transformer instanceof CombinedTransformer ? transformer.transformers : [transformer];
	const byKey: Record<`on${Node["type"]}`, Transformer[]> = {
		onAlternation: transformers.filter(t => t.onAlternation),
		onAssertion: transformers.filter(t => t.onAssertion),
		onCharacterClass: transformers.filter(t => t.onCharacterClass),
		onConcatenation: transformers.filter(t => t.onConcatenation),
		onExpression: transformers.filter(t => t.onExpression),
		onQuantifier: transformers.filter(t => t.onQuantifier),
		onUnknown: transformers.filter(t => t.onUnknown),
	};

	if (events?.onChange) {
		let changedPrivate = false;
		const transformerContext: TransformContext = {
			maxCharacter,
			signalMutation() {
				changed = changedPrivate = true;
			},
		};

		leaveNode = node => {
			const fnName = `on${node.type}` as const;

			for (const t of byKey[fnName]) {
				changedPrivate = false;
				t[fnName]!(node as never, transformerContext);
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (changedPrivate) {
					events.onChange!(ast, node, t);
				}
			}
		};
	} else {
		const transformerContext: TransformContext = {
			maxCharacter,
			signalMutation() {
				changed = true;
			},
		};

		leaveNode = node => {
			const fnName = `on${node.type}` as const;

			for (const t of byKey[fnName]) {
				t[fnName]!(node as never, transformerContext);
			}
		};
	}

	visitAst(ast, {
		onAlternationLeave: leaveNode,
		onAssertionLeave: leaveNode,
		onCharacterClassLeave: leaveNode,
		onConcatenationLeave: leaveNode,
		onExpressionLeave: leaveNode,
		onQuantifierLeave: leaveNode,
		onUnknownLeave: leaveNode,
	});

	return changed;
}
