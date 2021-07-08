/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert } from "chai";
import { TransitionIterable } from "../src/fa-types";
import { ReadonlyWord } from "../src/char-types";
import { DFA } from "../src/dfa";
import { ENFA } from "../src/enfa";
import { getIntersectionWordSets, getIntersectionWords, isDisjointWith } from "../src/intersection";
import { Literal } from "../src/js";
import { NFA } from "../src/nfa";
import { iterToArray } from "../src/util";
import { fromUnicodeToString } from "../src/words";
import { literalToDFA, literalToENFA, literalToNFA, literalToString } from "./helper/fa";

describe("intersection", function () {
	const cases: RegExp[] = [
		/a/,
		/b/,
		/a*/,
		/A/i,
		/b*(ab+)*a/,
		/a*(ba+)*/,
		/a+/,
		/(?:a+){2,}/,
		/(?:[^>"'[\]]|"[^"]*"|'[^']*')/,
		/(?:[^>"'[\]]|"[^"]*"|'[^']*'){2,}/,
		/"(?:[^"\\r\n]|\\.)*"/,
		/\/\*[^]*?\*\//,
	];

	type FA = { nfa: NFA; dfa: DFA; enfa: ENFA };
	const FA_TYPE_KEYS: (keyof FA)[] = ["nfa", "dfa", "enfa"];
	function toFA(literal: Literal): FA {
		const nfa = literalToNFA(literal);
		const dfa = literalToDFA(literal);
		const enfa = literalToENFA(literal);

		return { nfa, dfa, enfa };
	}

	function testAllCombinations<E>(
		getTitle: (left: string, right: string) => string,
		getExpected: (a: FA, b: FA) => E,
		getActual: <A, B>(a: TransitionIterable<A>, b: TransitionIterable<B>) => E
	): void {
		for (const left of cases) {
			for (const right of cases) {
				it(getTitle(literalToString(left), literalToString(right)), function () {
					const l = toFA(left);
					const r = toFA(right);

					const expected = getExpected(l, r);

					for (const lKey of FA_TYPE_KEYS) {
						for (const rKey of FA_TYPE_KEYS) {
							const combination = `${lKey} and ${rKey}`;
							const actual = getActual<any, any>(l[lKey], r[rKey]);
							assert.deepStrictEqual(actual, expected, combination);
						}
					}
				});
			}
		}
	}

	describe(isDisjointWith.name, function () {
		testAllCombinations(
			(left, right) => `${left} ∩ ${right} = ∅`,
			(left, right) => NFA.fromIntersection(left.nfa, right.nfa).isEmpty,
			(a, b) => isDisjointWith(a, b)
		);
	});

	describe(getIntersectionWordSets.name, function () {
		function isFiniteIterable<T>(iter: Iterable<T>, upperLimit: number = 1000): boolean {
			let counter = 0;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			for (const _ of iter) {
				if (++counter > upperLimit) {
					return false;
				}
			}
			return true;
		}

		testAllCombinations(
			(left, right) => `${left} ∩ ${right} is finite`,
			(left, right) => NFA.fromIntersection(left.nfa, right.nfa).isFinite,
			(a, b) => isFiniteIterable(getIntersectionWordSets(a, b))
		);
	});

	describe(getIntersectionWords.name, function () {
		function takeAtMostOrNothing<T>(iter: Iterable<T>, upperLimit: number = 100): T[] | null {
			const results: T[] = [];
			for (const item of iter) {
				results.push(item);
				if (results.length > upperLimit) {
					return null;
				}
			}
			return results;
		}

		function toStrings(iter: Iterable<ReadonlyWord> | null): string[] | null {
			if (!iter) {
				return null;
			}
			return iterToArray(iter).map(fromUnicodeToString).sort();
		}

		testAllCombinations(
			(left, right) => `${left} ∩ ${right}`,
			(left, right) => toStrings(takeAtMostOrNothing(NFA.fromIntersection(left.nfa, right.nfa).words())),
			(a, b) => toStrings(takeAtMostOrNothing(getIntersectionWords(a, b)))
		);
	});
});
