import { DFA } from "../../src/dfa";
import { NFA } from "../../src/nfa";
import { Parser } from "../../src/js";

export interface Literal {
	source: string;
	flags: string;
}

export function literalToString(literal: Literal): string {
	return `/${literal.source}/${literal.flags}`;
}

export function literalToDFA(literal: Literal): DFA {
	const parsed = new Parser(literal).parse();
	return DFA.fromNFA(NFA.fromRegex(parsed.expression, { maxCharacter: parsed.maxCharacter }));
}

export function literalToNFA(literal: Literal): NFA {
	const parsed = new Parser(literal).parse();
	return NFA.fromRegex(parsed.expression, { maxCharacter: parsed.maxCharacter });
}

export function removeIndentation(expected: string): string {
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
