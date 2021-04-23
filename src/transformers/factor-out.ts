import { Concatenation, Element, NoParent, Parent, TransformContext, Transformer } from "../ast";
import { MatchingDirection, structurallyEqual } from "../ast-analysis";
import { CharSet } from "../char-set";
import { minOf } from "../util";
import { CreationOptions } from "./creation-options";
import { copySource } from "./util";

function getPrefixAndSuffix(node: NoParent<Parent>): { prefix: NoParent<Element>[]; suffix: NoParent<Element>[] } {
	let prefixLength = 0;
	let suffixLength = 0;
	const shortest = minOf(node.alternatives, a => a.elements.length)!.elements;

	// find prefix length
	for (let i = 0; i < shortest.length; i++) {
		const e = shortest[i];
		if (node.alternatives.every(c => structurallyEqual(e, c.elements[i]))) {
			prefixLength++;
		} else {
			break;
		}
	}
	// find suffix length
	for (let i = 0; i < shortest.length - prefixLength; i++) {
		const e = shortest[shortest.length - 1 - i];
		if (node.alternatives.every(c => structurallyEqual(e, c.elements[c.elements.length - 1 - i]))) {
			suffixLength++;
		} else {
			break;
		}
	}

	const prefix = shortest.slice(0, prefixLength);
	const suffix = shortest.slice(shortest.length - suffixLength, shortest.length);
	return { prefix, suffix };
}

interface CharPrefix {
	readonly char: CharSet;
	readonly constant: number;
	readonly star: boolean;
}
function getConcatenationCharPrefix(
	alternative: NoParent<Concatenation>,
	direction: MatchingDirection,
	noLazyStar: boolean
): CharPrefix | undefined {
	if (alternative.elements.length === 0) {
		return undefined;
	}

	const firstIndex = direction === "ltr" ? 0 : alternative.elements.length - 1;
	const first = alternative.elements[firstIndex];
	if (first.type === "CharacterClass") {
		return {
			char: first.characters,
			constant: 1,
			star: false,
		};
	} else if (first.type === "Quantifier") {
		if (first.alternatives.length === 1 && first.alternatives[0].elements.length === 1) {
			const single = first.alternatives[0].elements[0];
			if (single.type === "CharacterClass") {
				return {
					char: single.characters,
					constant: first.min,
					star: !(first.lazy && noLazyStar) && first.max === Infinity,
				};
			}
		}
	}

	return undefined;
}
function unionCharPrefixes(a: CharPrefix | undefined, b: CharPrefix | undefined): CharPrefix | undefined {
	if (a !== undefined && b !== undefined && a.char.equals(b.char)) {
		const constant = Math.min(a.constant, b.constant);
		const star = a.star && b.star;
		if (star || constant > 0) {
			return { char: a.char, constant, star };
		}
	}
	return undefined;
}
function getCharPrefix(
	alternatives: NoParent<Concatenation>[],
	direction: MatchingDirection,
	noLazyStar: boolean
): CharPrefix | undefined {
	if (alternatives.length === 0) {
		return undefined;
	}

	let prefix: CharPrefix | undefined = getConcatenationCharPrefix(alternatives[0], direction, noLazyStar);
	for (let i = 1; i < alternatives.length && prefix !== undefined; i++) {
		const alternative = alternatives[i];
		prefix = unionCharPrefixes(prefix, getConcatenationCharPrefix(alternative, direction, noLazyStar));
	}
	return prefix;
}
function subtractConcatenationCharPrefix(
	alternative: NoParent<Concatenation>,
	prefix: CharPrefix,
	direction: MatchingDirection
): void {
	const firstIndex = direction === "ltr" ? 0 : alternative.elements.length - 1;
	const first = alternative.elements[firstIndex];
	if (first.type === "CharacterClass") {
		if (prefix.star || prefix.constant !== 1) {
			throw Error("Invalid prefix");
		}

		alternative.elements.splice(firstIndex, 1);
	} else if (first.type === "Quantifier") {
		if (prefix.constant > first.min || (prefix.star && first.max !== Infinity)) {
			throw Error("Invalid prefix");
		}

		first.min -= prefix.constant;
		if (prefix.star) {
			first.max = first.min;
		} else {
			first.max -= prefix.constant;
		}

		if (first.max === 0) {
			alternative.elements.splice(firstIndex, 1);
		} else if (first.min === 1 && first.max === 1) {
			// we know that it's a single-character quantifier
			alternative.elements[firstIndex] = first.alternatives[0].elements[0];
		}
	}
}
function subtractCharPrefix(
	alternatives: NoParent<Concatenation>[],
	prefix: CharPrefix,
	direction: MatchingDirection
): void {
	for (const alt of alternatives) {
		subtractConcatenationCharPrefix(alt, prefix, direction);
	}
}
function tryFactorOutQuantifiedCharacter(
	node: NoParent<Parent>,
	direction: MatchingDirection,
	noLazyStar: boolean
): boolean {
	const prefix = getCharPrefix(node.alternatives, direction, noLazyStar);
	if (prefix && (prefix.constant > 0 || prefix.star)) {
		subtractCharPrefix(node.alternatives, prefix, direction);
		let char: NoParent<Element>;
		if (prefix.star || prefix.constant !== 1) {
			char = {
				type: "Quantifier",
				lazy: false,
				min: prefix.constant,
				max: prefix.star ? Infinity : prefix.constant,
				alternatives: [
					{ type: "Concatenation", elements: [{ type: "CharacterClass", characters: prefix.char }] },
				],
			};
		} else {
			char = { type: "CharacterClass", characters: prefix.char };
		}

		const rest: NoParent<Element> = { type: "Alternation", alternatives: node.alternatives };

		const elements = direction === "ltr" ? [char, rest] : [rest, char];
		node.alternatives = [{ type: "Concatenation", source: copySource(node.source), elements }];
		return true;
	}
	return false;
}

/**
 * This will factor out common prefixes and suffixes in parent nodes.
 *
 * Examples:
 *
 * - `(?:abc|aba)` => `(?:ab(?:c|a))`
 * - `(?<!air|after)` => `(?<!a(?:i|fte)r)`
 *
 * The order of alternatives and the ambiguity of the regular expression are guaranteed to be preserved. One non-obvious
 * case where ambiguity is preserved is the case of duplicate alternatives. In this case, a group with multiple empty
 * alternatives will be left.
 *
 * E.g. `(?:abc|abc|abc)` => `(?:abc(?:||))`
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function factorOut(options?: Readonly<CreationOptions>): Transformer {
	const { ignoreOrder = false } = options ?? {};

	function onParent(node: NoParent<Parent>, { signalMutation }: TransformContext): void {
		if (node.alternatives.length < 2) {
			return;
		}

		const { prefix, suffix } = getPrefixAndSuffix(node);

		if (prefix.length > 0 || suffix.length > 0) {
			signalMutation();

			// remove prefix and suffix
			const alternatives = node.alternatives;
			for (const alt of alternatives) {
				alt.elements.splice(0, prefix.length);
				alt.elements.splice(alt.elements.length - suffix.length, suffix.length);
			}

			node.alternatives = [
				{
					type: "Concatenation",
					elements: [
						...prefix,
						{
							type: "Alternation",
							alternatives,
							source: copySource(node.source),
						},
						...suffix,
					],
					source: copySource(node.source),
				},
			];
		} else {
			const noLazyStar = !ignoreOrder;
			if (tryFactorOutQuantifiedCharacter(node, "ltr", noLazyStar)) {
				signalMutation();
			}
			if (tryFactorOutQuantifiedCharacter(node, "rtl", noLazyStar)) {
				signalMutation();
			}
		}
	}

	return {
		onAlternation: onParent,
		onAssertion: onParent,
		onExpression: onParent,
		onQuantifier: onParent,
	};
}
