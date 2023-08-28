import { NoParent, Quantifier, TransformContext, Transformer } from "../ast";
import { CreationOptions } from "./creation-options";

function combineNestedQuantifiers(
	parent: NoParent<Quantifier>,
	child: Readonly<NoParent<Quantifier>>,
	signalMutation: () => void
): void {
	if (parent.max === 0 || child.max === 0) {
		// This rule doesn't deal with inlining
		return;
	}

	// Explanation of the following condition:
	//
	// We are currently given a regular expression of the form `(R{a,b}){c,d}` with a<=b, c<=d, b>0, and d>0. The
	// question is: For what numbers a,b,c,d is `(R{a,b}){c,d}` == `R{a*c,b*d}`?
	//
	// Let's reformulate the question in terms of integer intervals. First, some definitions:
	//   x∈[a,b] ⇔ a <= x <= b
	//   [a,b]*x = [a*x, b*x] for x != 0
	//           = [0, 0] for x == 0
	//
	// The question: For what intervals [a, b] and [c, d] is X=Y for
	//   X = [a*c, b*d] and
	//   Y = { x | x ∈ [a,b]*i where i∈[c,d] } ?
	//
	// The first thing to note is that X ⊇ Y, so we only have to show X\Y = ∅. We can think of the elements X\Y as
	// holes in Y. Holes can only appear between intervals [a,b]*j and [a,b]*(j+1), so let's look at a hole h
	// between [a,b]*c and [a,b]*(c+1):
	//
	// 1.  We can see that [a,b]*(c+1) ⊆ Y iff c+1 <= d ⇔ c != d since we are dealing with integers only and know that
	//     c<=d.
	// 2.  h > b*c and h < a*(c+1). Let's just pick h=b*c+1, then we'll get b*c+1 < a*(c+1).
	//
	// The condition for _no_ hole between [a,b]*c and [a,b]*(c+1) is:
	//   c=d or b*c+1 >= a*(c+1)
	//
	// However, this condition is not defined for b=∞ and c=0. Since [a,b]*x = [0, 0] for x == 0, we will just define
	// 0*∞ = 0. It makes sense for our problem, so the condition for b=∞ and c=0 is:
	//   a <= 1
	//
	// Now to proof that it's sufficient to only check for a hole between the first two intervals. We want to show
	// that if h=b*c+1 is not a hole then there will be no j, c<j<d such that b*j+1 is a hole. The first thing to
	// not that j can only exist if c!=d, so the condition for h to not exist simplifies to b*c+1 >= a*(c+1).
	//
	// 1)  b=∞ and c=0:
	//     b*c+1 >= a*(c+1) ⇔ 1 >= a ⇔ a <= 1. If a <= 1, then h does not exist but since b=∞, we know that the
	//     union of the next interval [a, ∞]*1 = [a, ∞] and [0, 0] = [a, ∞]*0 is [0, ∞]. [0, ∞] is the largest
	//     possible interval meaning that there could not possibly be any holes after it. Therefore, a j, c<j<d
	//     cannot exist.
	// 2)  b==∞ and c>0:
	//     b*c+1 >= a*(c+1) ⇔ ∞ >= a*(c+1) is trivially true, so the hole h between [a,b]*c and [a,b]*(c+1) cannot
	//     exist. There can also be no other holes because [a,b]*c = [a*c,∞] ⊇ [a,b]*i = [a*i,∞] for all i>c.
	// 3)  b<∞:
	//     b*c+1 >= a*(c+1). If c+x is also not a hole for any x >= 0, then there can be no holes.
	//     b*(c+x)+1 >= a*(c+x+1) ⇔ b >= a + (a-1)/(c+x). We know that this is true for x=0 and increasing x will
	//     only make (a-1)/(c+x) smaller, so it is always true. Therefore, there can be no j c<j<d such that b*j+1
	//     is a hole.
	//
	// We've shown that if there is no hole h between the first and second interval, then there can be no other
	// holes. Therefore it is sufficient to only check for the first hole.

	const a = child.min;
	const b = child.max;
	const c = parent.min;
	const d = parent.max;
	const condition = b === Infinity && c === 0 ? a <= 1 : c === d || b * c + 1 >= a * (c + 1);

	if (condition) {
		signalMutation();
		parent.min = a * c;
		parent.max = b * d;
		parent.alternatives = child.alternatives;
	}
}

function optimizeChildQuantifier(
	parent: Readonly<NoParent<Quantifier>>,
	child: NoParent<Quantifier>,
	signalMutation: () => void
): void {
	if (parent.max === 0 || child.max === 0) {
		// This rule doesn't deal with inlining
		return;
	}

	if (child.min === 0 && parent.min === 0) {
		signalMutation();
		child.min = 1;
	}
	if (child.max > 1 && parent.max === Infinity && child.min <= 1) {
		signalMutation();
		child.max = 1;
	}
}

/**
 * This merges/optimizes nested quantifiers.
 *
 * Examples:
 *
 * - `(?:a+)*` => `a*`
 * - `(?:a{2,4})+` => `a{2,}`
 * - `(?:a{4}){8}` => `a{32}`
 * - `(?:a*|b+c|f+)*` => `(?:a{1}|b+c|f{1})*`
 *
 * This operation largely ignores the order of alternatives and usually reduces the ambiguity of the expression. If
 * order or ambiguity have to be preserved, then the effectiveness of this transformer will be greatly reduced.
 *
 * @param options
 */
export function nestedQuantifiers(options?: Readonly<CreationOptions>): Transformer {
	if (!options?.ignoreAmbiguity) {
		return {
			name: "nestedQuantifiers",
			onQuantifier(node: NoParent<Quantifier>, { signalMutation }: TransformContext): void {
				if (node.alternatives.length === 1 && node.alternatives[0].elements.length === 1) {
					const nested = node.alternatives[0].elements[0];
					if (nested.type === "Quantifier") {
						// (Almost) all changes will decrease the ambiguity of the regular expression
						// and may change matching order. Pretty much the only safe transformation is
						// `(?:a+)?` => `a*` and `(?:a+?)??` => `a*?`.
						if (node.lazy === nested.lazy && node.min === 0 && node.max === 1 && nested.min === 1) {
							signalMutation();
							node.max = nested.max;
							node.alternatives = nested.alternatives;
						}
					}
				}
			},
		};
	}

	const { ignoreOrder } = options;

	return {
		name: "nestedQuantifiers",
		onQuantifier(node: NoParent<Quantifier>, { signalMutation }: TransformContext): void {
			if (node.max === 0) {
				return;
			}

			if (node.alternatives.length === 1) {
				// try to go for the case of simple nested quantifiers (e.g. /(?:a*)+/)
				const first = node.alternatives[0];
				if (first.elements.length === 1) {
					const nested = first.elements[0];
					if (nested.type === "Quantifier") {
						if (ignoreOrder || node.lazy === nested.lazy) {
							combineNestedQuantifiers(node, nested, signalMutation);
						}
					}
				}
			} else {
				// we might still be able to simplify some quantifiers.
				if (ignoreOrder) {
					for (const alt of node.alternatives) {
						if (alt.elements.length === 1) {
							const element = alt.elements[0];
							if (element.type === "Quantifier") {
								optimizeChildQuantifier(node, element, signalMutation);
							}
						}
					}
				}
			}
		},
	};
}
