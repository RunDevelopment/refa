import { DFA } from "../../src/dfa";
import { NFA, ReadonlyNFA } from "../../src/nfa";
import { ENFA } from "../../src/enfa";
import { Literal, Parser } from "../../src/js";
import * as Iter from "../../src/iter";
import { TransitionIterable } from "../../src/fa-types";

export function literalToString(literal: Literal): string {
	return `/${literal.source}/${literal.flags}`;
}

export function literalToDFA(literal: Literal): DFA {
	const parsed = Parser.fromLiteral(literal).parse();
	return DFA.fromFA(NFA.fromRegex(parsed.expression, { maxCharacter: parsed.maxCharacter }));
}

export function literalToNFA(literal: Literal): NFA {
	const parsed = Parser.fromLiteral(literal).parse();
	return NFA.fromRegex(parsed.expression, { maxCharacter: parsed.maxCharacter });
}

export function literalToENFA(literal: Literal): ENFA {
	const parsed = Parser.fromLiteral(literal).parse();
	return ENFA.fromRegex(parsed.expression, { maxCharacter: parsed.maxCharacter });
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

export function reachableFinalStates(nfa: ReadonlyNFA): number {
	const iter = Iter.iterateStates({
		initial: nfa.nodes.initial,
		getOut(node) {
			return node.out.keys();
		},
		isFinal(node) {
			return nfa.nodes.finals.has(node);
		},
	});

	let count = 0;
	for (const final of iter) {
		if (nfa.nodes.finals.has(final)) {
			count++;
		}
	}
	return count;
}

export function faEqual<A, B>(a: TransitionIterable<A>, b: TransitionIterable<B>): boolean {
	const dfaA = DFA.fromFA(a);
	const dfaB = DFA.fromFA(b);
	dfaA.minimize();
	dfaB.minimize();
	return dfaA.structurallyEqual(dfaB);
}
