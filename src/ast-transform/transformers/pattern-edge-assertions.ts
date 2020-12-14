import { Assertion, Concatenation, Node, NoParent } from "../../ast";
import { CreationOptions, noopTransformer, Transformer } from "../transformer";
import {
	followPaths,
	getAssertRange,
	invertMatchingDirection,
	isZeroLength,
	Path,
	stackPath,
} from "../../ast-analysis";
import { at, inRange, tryInlineAssertions } from "../util";

/**
 * Returns whether a previous assertion may also assert the same characters as the given assertion.
 */
function influencedByPreviousAssertion(path: Path<Assertion>): boolean {
	const { kind } = path.node;

	const INFLUENCE_FOUND = true;
	const DEAD_BRANCH = false;
	type MinConsumedCharacters = number;
	type State = MinConsumedCharacters | typeof INFLUENCE_FOUND | typeof DEAD_BRANCH;

	const result = followPaths<State>(
		path,
		"next",
		0,
		{
			fork: s => s,
			join(states: State[]): State {
				let min = Infinity;
				for (const state of states) {
					if (state === INFLUENCE_FOUND) {
						return INFLUENCE_FOUND;
					} else if (state === DEAD_BRANCH) {
						// skip
					} else {
						min = Math.min(min, state);
					}
				}
				return min === Infinity ? DEAD_BRANCH : min;
			},

			enter(element, state): State {
				if (state === INFLUENCE_FOUND || state === DEAD_BRANCH) {
					return state;
				}

				if (element.type === "CharacterClass") {
					if (element.characters.isEmpty) {
						return DEAD_BRANCH;
					} else {
						return state + 1;
					}
				}

				if (element.type === "Assertion" && element.kind === kind) {
					const range = getAssertRange(element.alternatives, kind);
					if ((range?.assertMax ?? 0) > state) {
						return INFLUENCE_FOUND;
					}
				}

				return state;
			},
			leave(element, state, enterState): State {
				if (element.type === "Quantifier" && element.min > 1) {
					if (state === INFLUENCE_FOUND || state === DEAD_BRANCH) {
						return state;
					}
					if (enterState === INFLUENCE_FOUND || enterState === DEAD_BRANCH || enterState > state) {
						throw Error();
					}

					return enterState + (state - enterState) * element.min;
				}
				return state;
			},

			continueAfter(_, state): boolean {
				return state !== INFLUENCE_FOUND && state !== DEAD_BRANCH;
			},
			continueInto(element, state): boolean {
				return state !== INFLUENCE_FOUND && state !== DEAD_BRANCH && element.type !== "Assertion";
			},
		},
		invertMatchingDirection(kind)
	);

	return result === INFLUENCE_FOUND;
}

function tryRemoveAssertions(
	alternatives: NoParent<Concatenation>[],
	stack: NoParent<Node>[],
	kind: Assertion["kind"],
	inline: boolean
): boolean {
	let changed = false;
	for (const alt of alternatives) {
		stack.push(alt);
		if (tryRemoveAssertionsConcat(alt, stack, kind, inline)) {
			changed = true;
		}
		stack.pop();
	}
	return changed;
}
function tryRemoveAssertionsConcat(
	{ elements }: NoParent<Concatenation>,
	stack: NoParent<Node>[],
	kind: Assertion["kind"],
	inline: boolean
): boolean {
	if (elements.length === 0) {
		return false;
	}

	let changed = false;

	const increment = kind === "behind" ? +1 : -1;
	const startIndex = kind === "behind" ? 0 : -1;

	for (let i = startIndex; inRange(elements, i); i += increment) {
		const element = at(elements, i);
		if (element.type === "Assertion" && element.kind === kind) {
			if (inline && influencedByPreviousAssertion(stackPath(stack, element))) {
				// Some other assertion (that might be inlined later) also asserts characters beyond the patterns edge.
				// This means that we can't just remove this or other assertions (in this concatenation).
				return false;
			}

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
			stack.push(element);
			if (tryRemoveAssertions(element.alternatives, stack, kind, inline)) {
				changed = true;
			}
			stack.pop();
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
 * may prevent some removal. Some assertions will not be removed because another may be inlined later. E.g. the `(?!\d)`
 * in `(?=\w)a?(?!\d)` will not be removed because the pattern may be transformed to `(?:a|(?=\w))(?!\d)` =>
 * `a(?!\d)|(?=\w)(?!\d)` which can be inlined to `a(?!\d)|(?!\d)\w` and transformed to `a(?!\d)|[A-Z_a-z]`.
 *
 * If neither inlining nor removal are active, then this transformer won't do anything.
 */
export function patternEdgeAssertions(options?: Readonly<PatternEdgeAssertionsCreationOptions>): Transformer {
	const inline = options?.inline ?? true;
	const remove = options?.remove ?? false;

	if (!inline && !remove) {
		return noopTransformer();
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
						tryRemoveAssertions(node.alternatives, [node], "ahead", inline) ||
						tryRemoveAssertions(node.alternatives, [node], "behind", inline)
					) {
						context.signalMutation();
					}
				}
			},
		};
	}
}
