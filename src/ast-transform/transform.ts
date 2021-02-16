import { Char } from "../core-types";
import { Expression, Node, NoParent, visitNodes } from "../ast";
import { Transformer, TransformContext } from "./transformer";

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
 * This operation ignores the `parent` properties of all nodes. The `parent` properties are __not__ maintained. If the
 * given expression is used without the `NoParent` view after this operation, the `parent` properties have to be
 * restored with the `setParent` function.
 *
 * @param transformer
 * @param ast
 * @param options
 */
export function transform(
	transformer: Transformer,
	ast: NoParent<Expression>,
	options?: Readonly<TransformOptions>
): void {
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

		transformer;
		const fn = transformer[fnName as keyof Transformer];
		if (fn) {
			fn(node as any, transformerContext);
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
