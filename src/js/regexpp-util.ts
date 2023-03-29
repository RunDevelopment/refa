import { AST } from "@eslint-community/regexpp";
import { MatchingDirection } from "../ast-analysis";

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
export function inheritedMatchingDirection(node: AST.Node): MatchingDirection {
	let parent: AST.Node | null = node.parent;
	while (parent) {
		if (parent.type === "Assertion") {
			return parent.kind === "lookahead" ? "ltr" : "rtl";
		}
		parent = parent.parent;
	}
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
				if (inheritedMatchingDirection(node) === "ltr") {
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
 * @param backreference
 * @returns
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
				if (inheritedMatchingDirection(node) === "ltr") {
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
