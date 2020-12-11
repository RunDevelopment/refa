import { Assertion, Concatenation, NoParent } from "../../ast";
import { CreationOptions, noop, Transformer } from "../transformer";
import { isZeroLength } from "../../ast-analysis";
import { at, inRange, tryInlineAssertions } from "../util";

function tryRemoveAssertions(alternatives: NoParent<Concatenation>[], kind: Assertion["kind"]): boolean {
	let changed = false;
	for (const alt of alternatives) {
		if (tryRemoveAssertionsConcat(alt, kind)) {
			changed = true;
		}
	}
	return changed;
}
function tryRemoveAssertionsConcat({ elements }: NoParent<Concatenation>, kind: Assertion["kind"]): boolean {
	if (elements.length === 0) {
		return false;
	}

	let changed = false;

	const increment = kind === "behind" ? +1 : -1;
	const startIndex = kind === "behind" ? 0 : -1;

	for (let i = startIndex; inRange(elements, i); i += increment) {
		const element = at(elements, i);
		if (element.type === "Assertion" && element.kind === kind) {
			changed = true;
			elements.splice(i, 1);
			i -= increment;
		} else if (isZeroLength(element)) {
			// just continue
		} else {
			break;
		}
	}

	if (inRange(elements, startIndex)) {
		const element = at(elements, startIndex);
		if (element.type === "Alternation" || (element.type === "Quantifier" && element.max === 1)) {
			if (tryRemoveAssertions(element.alternatives, kind)) {
				changed = true;
			}
		}
	}

	return changed;
}

export interface PatternEdgeAssertionsCreationOptions extends CreationOptions {
	/**
	 * @default true
	 */
	inline?: boolean;
	/**
	 * @default false
	 */
	remove?: boolean;
}

/**
 * This transformer will only touch assertion that assert characters beyond the edge of the pattern.
 *
 * E.g. in `/(?<!\w)(?!\d)\w+(?=\s*<)/` only `(?<!\w)` and `(?=\s*<)` are pattern edge assertions.
 *
 * The transformer can inline non-negated assertions (e.g. `/(?<!\w)(?!\d)\w+(?=\s*<)/` => `/(?<!\w)(?!\d)\w+\s*</`)
 * and/or remove them (e.g. `/(?<!\w)(?!\d)\w+\s*</` => `/(?!\d)\w+\s*</`).
 *
 * If both inlining and removal are active, then inlining will be done first, e.g. `a(?=\w)(?!\d)` => `a(?!\d)\w`, which
 * may prevent some removal. If there are multiple assertions that can be inlined, the one closest to the edge will be
 * used, e.g. `a(?=\w)(?=\d)` => `a(?=\w)\d`.
 *
 * If neither inlining nor removal are active, then this transformer won't do anything.
 */
export function patternEdgeAssertions(options?: Readonly<PatternEdgeAssertionsCreationOptions>): Transformer {
	const inline = options?.inline ?? true;
	const remove = options?.remove ?? false;

	if (!inline && !remove) {
		return noop();
	} else {
		return {
			onExpression(node, context) {
				if (inline) {
					if (
						tryInlineAssertions(node.alternatives, "ahead") ||
						tryInlineAssertions(node.alternatives, "behind")
					) {
						context.signalMutation();
					}
				}
				if (remove) {
					if (
						tryRemoveAssertions(node.alternatives, "ahead") ||
						tryRemoveAssertions(node.alternatives, "behind")
					) {
						context.signalMutation();
					}
				}
			},
		};
	}
}
