import { DFA } from "../src/dfa";
import { NFA } from "../src/nfa";
import { assert } from "chai";
import { parse } from "../src/js/js-regex";


describe('DFA', function () {

	describe('fromWords', function () {

		test([
			{
				words: [],
				expected: `
					(0) -> none`
			},
			{
				words: []
			},
			{
				words: "",
				expected: `
					[0] -> none`
			},
			{
				words: ""
			},
			{
				words: "foo bar foo bar baz food",
				expected: `
					(0) -> (1) : 62
					    -> (2) : 66

					(1) -> (3) : 61

					(2) -> (4) : 6f

					(3) -> [5] : 72
					    -> [6] : 7a

					(4) -> [7] : 6f

					[5] -> none

					[6] -> none

					[7] -> [8] : 64

					[8] -> none`
			},
			{
				words: "foo bar foo bar baz food"
			},
			{
				// the space at the beginning will include the empty word
				words: " a b c d e f g"
			},
			{
				// the space at the beginning will include the empty word
				words: "a b ab ba aa bb aaa aab aba abb baa bab bba bbb"
			},
		]);

		interface TestCase {
			words: Iterable<string> | string;
			expected?: string;
		}

		function test(cases: TestCase[]): void {
			for (const { words, expected } of cases) {
				const persistentWords = typeof words === "string" ? words.split(/\s+/g) : [...words];
				const title = persistentWords.map(w => JSON.stringify(w)).join(", ");
				const chars = persistentWords.map(w => [...w].map(c => c.charCodeAt(0)));
				const dfa = DFA.fromWords(chars, { maxCharacter: 0x10FFFF });
				it(title, function () {
					if (expected === undefined) {
						const unique = [...new Set<string>(persistentWords)];
						assert.sameMembers(getWords(dfa), unique);
					} else {
						assert.strictEqual(dfa.toString(), removeIndentation(expected));
					}
				});
			}
		}

	});

});


interface Literal {
	source: string;
	flags: string;
}

function literalToDFA(literal: Literal): DFA {
	const parsed = parse(literal);
	return DFA.fromNFA(NFA.fromRegex(parsed.pattern, { maxCharacter: parsed.flags.unicode ? 0x10FFFF : 0xFFFF }));
}

function literalToString(literal: Literal): string {
	return `/${literal.source}/${literal.flags}`;
}

function removeIndentation(expected: string): string {
	// remove trailing spaces and initial line breaks
	expected = expected.replace(/^[\r\n]+|\s+$/g, "");

	const lines = expected.split(/\r\n?|\n/g);
	const indentation = /^[ \t]*/.exec(lines[0])![0];

	if (indentation) {
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];
			if (line.startsWith(indentation)) {
				line = line.substr(indentation.length);
			}
			lines[i] = line;
		}
	}

	return lines.join("\n");
}

function getWords(dfa: DFA): string[] {
	const words = new Set<string>();
	for (const word of dfa.words()) {
		words.add(word.map(i => String.fromCodePoint(i)).join(""));
	}
	return [...words];
}
