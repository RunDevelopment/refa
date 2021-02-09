import { Char } from "../core-types";
import { CharSet, CharRange } from "../char-set";
import { runEncodeCharacters } from "../char-util";
import { UnicodeCaseFolding, UnicodeCaseVarying } from "./unicode";
import { AST } from "regexpp";
import { Expression, Alternation, Quantifier } from "../ast";

export const UNICODE_MAXIMUM = 0x10ffff;
export const UTF16_MAXIMUM = 0xffff;

/**
 * Returns a character set which includes all characters of the given character set and all their case variations.
 *
 * @param cs
 * @param caseFolding
 * @param caseVarying
 */
export function withCaseVaryingCharacters(
	cs: CharSet,
	caseFolding: Readonly<Record<number, readonly Char[]>>,
	caseVarying: CharSet
): CharSet {
	if (cs.isSupersetOf(caseVarying)) {
		// this set already includes all case varying characters
		return cs;
	}

	const actualCaseVarying = cs.intersect(caseVarying);
	if (actualCaseVarying.isEmpty) {
		return cs;
	}

	const caseVariationSet = new Set<Char>();
	for (const { min, max } of actualCaseVarying.ranges) {
		for (let i = min; i <= max; i++) {
			const fold = caseFolding[i];
			for (let j = 0, l = fold.length; j < l; j++) {
				caseVariationSet.add(fold[j]);
			}
		}
	}
	const caseVariationArray = [...caseVariationSet];
	caseVariationArray.sort((a, b) => a - b);

	return cs.union(runEncodeCharacters(caseVariationArray));
}

export const DIGIT: readonly CharRange[] = [
	{ min: 0x30, max: 0x39 }, // 0-9
];
export const SPACE: readonly CharRange[] = [
	{ min: 0x09, max: 0x0d }, // \t \n \v \f \r
	{ min: 0x20, max: 0x20 }, // space
	{ min: 0xa0, max: 0xa0 }, // non-breaking space
	{ min: 0x1680, max: 0x1680 },
	{ min: 0x2000, max: 0x200a },
	{ min: 0x2028, max: 0x2029 },
	{ min: 0x202f, max: 0x202f },
	{ min: 0x205f, max: 0x205f },
	{ min: 0x3000, max: 0x3000 },
	{ min: 0xfeff, max: 0xfeff },
];
export const WORD: readonly CharRange[] = [
	{ min: 0x30, max: 0x39 }, // 0-9
	{ min: 0x41, max: 0x5a }, // A-Z
	{ min: 0x5f, max: 0x5f }, // _
	{ min: 0x61, max: 0x7a }, // a-z
];
export const LINE_TERMINATOR: readonly CharRange[] = [
	{ min: 0x0a, max: 0x0a }, // \n
	{ min: 0x0d, max: 0x0d }, // \r
	{ min: 0x2028, max: 0x2029 },
];
export const WORD_IU: readonly CharRange[] = withCaseVaryingCharacters(
	CharSet.empty(UNICODE_MAXIMUM).union(WORD),
	UnicodeCaseFolding,
	UnicodeCaseVarying
).ranges;

/**
 * Returns whether any of the descendants of the given node fulfill the given condition.
 *
 * The descendants will be iterated in a DFS top-to-bottom manner from left to right with the first node being the
 * given node.
 *
 * This function is short-circuited, so as soon as any `conditionFn` returns `true`, `true` will be returned.
 *
 * @param node
 * @param conditionFn
 */
export function hasSomeDescendant(node: AST.Node, conditionFn: (node: AST.Node) => boolean): boolean {
	if (conditionFn(node)) {
		return true;
	}

	switch (node.type) {
		case "Alternative":
			return node.elements.some(e => hasSomeDescendant(e, conditionFn));
		case "Assertion":
			if (node.kind === "lookahead" || node.kind === "lookbehind") {
				return node.alternatives.some(a => hasSomeDescendant(a, conditionFn));
			}
			return false;
		case "CapturingGroup":
		case "Group":
		case "Pattern":
			return node.alternatives.some(a => hasSomeDescendant(a, conditionFn));
		case "CharacterClass":
			return node.elements.some(e => hasSomeDescendant(e, conditionFn));
		case "CharacterClassRange":
			return hasSomeDescendant(node.min, conditionFn) || hasSomeDescendant(node.max, conditionFn);
		case "Quantifier":
			return hasSomeDescendant(node.element, conditionFn);
		case "RegExpLiteral":
			return hasSomeDescendant(node.pattern, conditionFn) || hasSomeDescendant(node.flags, conditionFn);
	}
	return false;
}

/**
 * Returns whether any of the ancestors of the given node fulfills the given condition.
 *
 * The ancestors will be iterated in the order from closest to farthest.
 * The condition function will not be called on the given node.
 *
 * @param node
 * @param conditionFn
 */
export function hasSomeAncestor(node: AST.Node, conditionFn: (node: AST.BranchNode) => boolean): boolean {
	let parent = node.parent;
	while (parent) {
		if (conditionFn(parent)) {
			return true;
		}
		parent = parent.parent;
	}
	return false;
}

/**
 * Returns the direction which which the given node will be matched relative to the closest parent alternative.
 *
 * @param node
 */
export function matchingDirection(node: AST.Element): "ltr" | "rtl" {
	let closestLookaround: AST.LookaroundAssertion | undefined;
	hasSomeAncestor(node, a => {
		if (a.type === "Assertion") {
			closestLookaround = a;
			return true;
		}
		return false;
	});

	if (closestLookaround !== undefined && closestLookaround.kind === "lookbehind") {
		// the matching direction in a lookbehind is right to left
		return "rtl";
	}
	// the standard matching direction is left to right
	return "ltr";
}

/**
 * Returns whether there is at least one path from the referenced group to the given backreference.
 *
 * @param backreference
 */
export function somePathToBackreference(backreference: AST.Backreference): boolean {
	const group = backreference.resolved;

	if (hasSomeAncestor(backreference, a => a === group)) {
		// if the backreference is element of the referenced group
		return false;
	}

	// Now for the hard part:
	// If there exists a path through the regular expression which connect the group and the backreference, then
	// the backreference can capture the group iff we only move up, down, or right relative to the group.

	function findBackreference(node: AST.Element): boolean {
		const parent = node.parent;

		switch (parent.type) {
			case "Alternative": {
				// if any elements right to the given node contain or are the backreference, we found it.
				const index = parent.elements.indexOf(node);

				// we have to take the current matching direction into account
				let next;
				if (matchingDirection(node) === "ltr") {
					// the next elements to match will be right to the given node
					next = parent.elements.slice(index + 1);
				} else {
					// the next elements to match will be left to the given node
					next = parent.elements.slice(0, index);
				}

				if (next.some(e => hasSomeDescendant(e, d => d === backreference))) {
					return true;
				}

				// no luck. let's go up!
				const parentParent = parent.parent;
				if (parentParent.type === "Pattern") {
					// can't go up.
					return false;
				} else {
					return findBackreference(parentParent);
				}
			}

			case "Quantifier":
				return findBackreference(parent);

			default:
				throw new Error("What happened?");
		}
	}

	return findBackreference(group);
}

/**
 * Returns whether the given backreference is always matched __after__ the referenced group was matched.
 *
 * If there exists any accepting path which goes through the backreference but not through the referenced group,
 * this will return `false`.
 *
 * @param {Backreference} backreference
 * @returns {boolean}
 */
export function backreferenceAlwaysAfterGroup(backreference: AST.Backreference): boolean {
	const group = backreference.resolved;

	if (hasSomeAncestor(backreference, a => a === group)) {
		// if the backreference is element of the referenced group
		return false;
	}

	function findBackreference(node: AST.Element): boolean {
		const parent = node.parent;

		switch (parent.type) {
			case "Alternative": {
				// if any elements right to the given node contain or are the backreference, we found it.
				const index = parent.elements.indexOf(node);

				// we have to take the current matching direction into account
				let next;
				if (matchingDirection(node) === "ltr") {
					// the next elements to match will be right to the given node
					next = parent.elements.slice(index + 1);
				} else {
					// the next elements to match will be left to the given node
					next = parent.elements.slice(0, index);
				}

				if (next.some(e => hasSomeDescendant(e, d => d === backreference))) {
					return true;
				}

				// no luck. let's go up!
				const parentParent = parent.parent;
				if (parentParent.type === "Pattern") {
					// can't go up.
					return false;
				} else {
					if (parentParent.alternatives.length > 1) {
						// e.g.: (?:a|(a))+b\1
						return false;
					}
					return findBackreference(parentParent);
				}
			}

			case "Quantifier":
				if (parent.min === 0) {
					// e.g.: (a+)?b\1
					return false;
				}
				return findBackreference(parent);

			default:
				throw new Error("What happened?");
		}
	}

	return findBackreference(group);
}

export function removeLeadingLookbehinds(element: Expression | Alternation | Quantifier): void {
	for (const alt of element.alternatives) {
		while (alt.elements.length > 0) {
			const element = alt.elements[0];

			if (element.type === "Assertion" && element.kind === "behind") {
				alt.elements.splice(0, 1);
				continue;
			}

			if (element.type === "Alternation" || element.type === "Quantifier") {
				removeLeadingLookbehinds(element);
				if (element.alternatives.length === 1 && element.alternatives[0].elements.length === 0) {
					// empty quantifier or alternative that can only match the empty word
					alt.elements.splice(0, 1);
					continue;
				}
			}

			break;
		}
	}

	removeDuplicateEmptyAlternative(element);
}
export function removeTrailingLookaheads(element: Expression | Alternation | Quantifier): void {
	for (const alt of element.alternatives) {
		while (alt.elements.length > 0) {
			const element = alt.elements[alt.elements.length - 1];

			if (element.type === "Assertion" && element.kind === "ahead") {
				alt.elements.pop();
				continue;
			}

			if (element.type === "Alternation" || element.type === "Quantifier") {
				removeTrailingLookaheads(element);
				if (element.alternatives.length === 1 && element.alternatives[0].elements.length === 0) {
					// empty quantifier or alternative that can only match the empty word
					alt.elements.pop();
					continue;
				}
			}

			break;
		}
	}

	removeDuplicateEmptyAlternative(element);
}
function removeDuplicateEmptyAlternative(element: Expression | Alternation | Quantifier): void {
	let hasEmpty = false;
	element.alternatives = element.alternatives.filter(alt => {
		if (alt.elements.length === 0) {
			if (hasEmpty) {
				return false;
			} else {
				hasEmpty = true;
				return true;
			}
		}
		// keep all non-empty
		return true;
	});
}
