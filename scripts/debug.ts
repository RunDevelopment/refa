import { combineTransformers, transform, NFA, DFA, ENFA, Words, JS, CharSet, CharacterClass, FiniteAutomaton, Expression, NoParent, Transformers } from "../src";
import { performance } from "perf_hooks";

// util functions
function toNFA(literal: JS.Literal): NFA {
	const parser = JS.Parser.fromLiteral(literal);
	const { expression, maxCharacter } = parser.parse();
	return NFA.fromRegex(expression, { maxCharacter }, { assertions: "disable" });
}
function toENFA(literal: JS.Literal): ENFA {
	const parser = JS.Parser.fromLiteral(literal);
	const { expression, maxCharacter } = parser.parse();
	return ENFA.fromRegex(expression, { maxCharacter }, { assertions: "disable" });
}
const toDFA = (literal: JS.Literal): DFA => DFA.fromFA(toNFA(literal));
function toCharSet(literal: JS.Literal): CharSet {
	const parser = JS.Parser.fromLiteral(literal);
	const { expression } = parser.parse();
	return (expression.alternatives[0].elements[0] as CharacterClass).characters;
}
function toRegExp(value: FiniteAutomaton | CharSet | NoParent<Expression>): RegExp {
	let literal;
	if (value instanceof CharSet) {
		literal = JS.toLiteral({ type: "Concatenation", elements: [{ type: "CharacterClass", characters: value }] });
	} else if ("toRegex" in value) {
		literal = JS.toLiteral(value.toRegex());
	} else {
		literal = JS.toLiteral(value);
	}
	return RegExp(literal.source, literal.flags);
}
function measure(fn: () => void, samples: number = 1, label?: string): void {
	const durations: number[] = [];
	for (let i = 0; i < samples; i++) {
		const start = performance.now();
		fn();
		durations.push(performance.now() - start);
	}
	const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
	const max = Math.max(...durations);
	console.log(`${label ? label + ":\t" : ""}avg=${+avg.toExponential(2)}ms\tmax=${+max.toExponential(2)}ms`);
}

// actual debug code
// DO NOT commit changes to this file
