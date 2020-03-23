import { DFA } from "../../src/dfa";
import { NFA } from "../../src/nfa";
import { parse } from "../../src/js/js-regex";

export interface Literal {
	source: string;
	flags: string;
}

export function literalToString(literal: Literal): string {
	return `/${literal.source}/${literal.flags}`;
}

export function literalToDFA(literal: Literal): DFA {
	const parsed = parse(literal);
	return DFA.fromNFA(NFA.fromRegex(parsed.pattern, { maxCharacter: parsed.flags.unicode ? 0x10FFFF : 0xFFFF }));
}

export function literalToNFA(literal: Literal): NFA {
	const parsed = parse(literal);
	return NFA.fromRegex(parsed.pattern, { maxCharacter: parsed.flags.unicode ? 0x10FFFF : 0xFFFF });
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
