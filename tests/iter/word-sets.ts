import { CharSet } from "../../src/char-set";
import { TransitionIterable } from "../../src/common-types";
import { approximateRejectingWordSet, iterateWordSets, shortestWordSet } from "../../src/iter";
import { literalToDFA, literalToENFA, literalToNFA } from "../helper/fa";
import { assertEqualSnapshot } from "../helper/snapshot";

describe("word sets", function () {
	const regexes: RegExp[] = [
		/[]/,
		/(?:)/,
		/[^]?/,
		/[^]*/,
		/[ab]{0,7}c?[^]+a*b?|d*b*/, // == [^]*
		/[^]+/,
		/[^]{0,5}/,
		/a/,
		/a|b/,
		/aa|b/,
		/ab|ba/,
		/a+/,
		/a*/,
		/a*b*c*/,
		/a+b*c+/,
		/a+b+c+/,
		/a+(?:d+|e+)?/,
		/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i,
	];

	function wordSetToString(wordSet: CharSet[]): string {
		return JSON.stringify(wordSet.map(rangesToString));
	}

	function firstN<T>(iter: Iterable<T>, n: number): T[] {
		const result: T[] = [];

		for (const item of iter) {
			result.push(item);
			if (result.length >= n) {
				break;
			}
		}

		return result;
	}

	describe(iterateWordSets.name, function () {
		function runTests<T>(name: string, toFA: (regex: RegExp) => TransitionIterable<T>): void {
			describe(name, function () {
				for (const regex of regexes) {
					it(`${regex}`, function () {
						const fa = toFA(regex);
						const wordSets = firstN(iterateWordSets(fa.transitionIterator()), 10);
						assertEqualSnapshot(this, wordSets.map(wordSetToString).join("\n"));
					});
				}
			});
		}

		runTests("NFA", literalToNFA);
		runTests("ENFA", literalToENFA);
		runTests("DFA", literalToDFA);
	});

	describe(shortestWordSet.name, function () {
		function runTests<T>(name: string, toFA: (regex: RegExp) => TransitionIterable<T>): void {
			describe(name, function () {
				for (const regex of regexes) {
					it(`${regex}`, function () {
						const fa = toFA(regex);
						const wordSet = shortestWordSet(fa.transitionIterator());
						assertEqualSnapshot(this, wordSet ? wordSetToString(wordSet) : "none");
					});
				}
			});
		}

		runTests("NFA", literalToNFA);
		runTests("ENFA", literalToENFA);
		runTests("DFA", literalToDFA);
	});

	describe(approximateRejectingWordSet.name, function () {
		function runTests<T>(name: string, toFA: (regex: RegExp) => TransitionIterable<T>): void {
			describe(name, function () {
				for (const regex of regexes) {
					it(`${regex}`, function () {
						const fa = toFA(regex);
						const wordSet = approximateRejectingWordSet(
							fa.transitionIterator(),
							regex.unicode ? CharSet.all(0x10ffff) : CharSet.all(0xffff)
						);
						assertEqualSnapshot(this, wordSet ? wordSetToString(wordSet) : "none");
					});
				}
			});
		}

		runTests("NFA", literalToNFA);
		runTests("ENFA", literalToENFA);
		runTests("DFA", literalToDFA);
		runTests("DFA complement", re => {
			const dfa = literalToDFA(re);
			dfa.complement();
			return dfa;
		});
	});
});

function rangesToString(ranges: CharSet): string {
	let s = "";
	for (const { min, max } of ranges.ranges) {
		if (s !== "") {
			s += " ";
		}
		if (min == max) {
			s += min.toString(16);
		} else {
			s += min.toString(16) + "-" + max.toString(16);
		}
	}
	return s;
}
