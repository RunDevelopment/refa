import { assert } from "chai";
import { CharSet } from "../../src/char-set";
import { ReadonlyWord } from "../../src/char-types";
import { DFA } from "../../src/dfa";
import { ENFA } from "../../src/enfa";
import { TransitionIterable } from "../../src/fa-types";
import { fromWordSets, fromWords } from "../../src/iter";
import { Parser } from "../../src/js";
import { NFA } from "../../src/nfa";
import { ReadonlyWordSet, WordSet } from "../../src/word-set";
import { fromStringToUnicode } from "../../src/words";
import { assertEqualSnapshot } from "../helper/snapshot";

const WORDS_LIST: string[][] = [
	[],
	[""],
	["", "a"],
	["", "a", "aa", "", "a", "aa"],
	"foo bar foo bar baz food".split(/\s/g),
	" a b c d e f g".split(/\s/g),
	"a b ab ba aa bb aaa aab aba abb baa bab bba bbb".split(/\s/g),
];

const WORD_SETS_LIST: RegExp[] = [
	/[]/u,
	/||||/u,
	/a|b|c|abc|bca|cba|cab|aa|caa/i,
	/|a|b|c|abc|bca|cba|cab|aa|caa/i,
	/foo|food|bar|bar|\wd|\d\w/,
];

describe(fromWords.name, function () {
	function getNFA(words: Iterable<ReadonlyWord>, maxCharacter: number): NFA {
		const total = NFA.empty({ maxCharacter });

		for (const word of words) {
			const w = NFA.fromTransitionIterator(
				{
					initial: 0,
					getOut: s => {
						const out = new Map<number, CharSet>();
						if (s < word.length) {
							out.set(s + 1, CharSet.fromCharacters(maxCharacter, [word[s]]));
						}
						return out;
					},
					isFinal: s => s === word.length,
				},
				{ maxCharacter }
			);
			total.union(w);
		}

		return total;
	}

	function test(getActual: (words: Iterable<ReadonlyWord>, maxCharacter: number) => DFA | NFA | ENFA): void {
		const maxCharacter = 0x10ffff;
		for (const wordStrings of WORDS_LIST) {
			it(JSON.stringify(wordStrings), function () {
				const words = wordStrings.map(fromStringToUnicode);
				const fa = getActual(words, maxCharacter);

				// assert FA
				assertEqualSnapshot(this, fa.toString());

				// compare language
				const actual = DFA.fromFA(fa as TransitionIterable<unknown>);
				const expected = DFA.fromFA(getNFA(words, maxCharacter));
				actual.minimize();
				expected.minimize();
				assert.strictEqual(actual.toString(), expected.toString());
			});
		}
	}

	describe("DFA", function () {
		test((words, maxCharacter) => DFA.fromWords(words, { maxCharacter }));
	});

	describe("ENFA", function () {
		test((words, maxCharacter) => ENFA.fromWords(words, { maxCharacter }));
	});

	describe("NFA", function () {
		test((words, maxCharacter) => NFA.fromWords(words, { maxCharacter }));
	});
});

describe(fromWordSets.name, function () {
	function getNFA(wordSets: Iterable<ReadonlyWordSet>, maxCharacter: number): NFA {
		const total = NFA.empty({ maxCharacter });

		for (const wordSet of wordSets) {
			const w = NFA.fromTransitionIterator(
				{
					initial: 0,
					getOut: s => {
						const out = new Map<number, CharSet>();
						if (s < wordSet.length) {
							out.set(s + 1, wordSet[s]);
						}
						return out;
					},
					isFinal: s => s === wordSet.length,
				},
				{ maxCharacter }
			);
			total.union(w);
		}

		return total;
	}

	function test(getActual: (wordSets: Iterable<ReadonlyWordSet>, maxCharacter: number) => DFA | NFA | ENFA): void {
		for (const regex of WORD_SETS_LIST) {
			it(regex.toString(), function () {
				const { expression, maxCharacter } = Parser.fromLiteral(regex).parse();
				const wordSets: WordSet[] = [];

				for (const alt of expression.alternatives) {
					const wordSet: WordSet = [];
					for (const e of alt.elements) {
						if (e.type === "CharacterClass") {
							if (e.characters.isEmpty) {
								continue;
							} else {
								wordSet.push(e.characters);
							}
						} else {
							throw new Error("Unexpected element. Only characters are supported");
						}
					}
					wordSets.push(wordSet);
				}

				const fa = getActual(wordSets, maxCharacter);

				// assert FA
				assertEqualSnapshot(this, fa.toString());

				// compare language
				const actual = DFA.fromFA(fa as TransitionIterable<unknown>);
				const expected = DFA.fromFA(getNFA(wordSets, maxCharacter));
				actual.minimize();
				expected.minimize();
				assert.strictEqual(actual.toString(), expected.toString());
			});
		}
	}

	describe("DFA", function () {
		test((wordSets, maxCharacter) => DFA.fromWordSets(wordSets, { maxCharacter }));
	});

	describe("ENFA", function () {
		test((wordSets, maxCharacter) => ENFA.fromWordSets(wordSets, { maxCharacter }));
	});

	describe("NFA", function () {
		test((wordSets, maxCharacter) => NFA.fromWordSets(wordSets, { maxCharacter }));
	});
});
