import { CharSet } from "../../src/char-set";
import { toLiteral } from "../../src/js";
import { literalToDFA, literalToENFA, literalToNFA, literalToString } from "../helper/fa";
import { assertEqualSnapshot } from "../helper/snapshot";

describe("toDot", function () {
	describe("from regexes", function () {
		const regexes: RegExp[] = [
			/a/,
			/abc/i,
			/a*b+c*/,
			/\d+(?:\.\d+)?(?:e[+-]?\d+)/i,
			/\/\*[\s\S]*?\*\//,
			/((ab)+){3,}/,
			// We need to escape the front slashes here to workaround a NodeJS <= v10 bug.
			// eslint-disable-next-line no-useless-escape
			/<\/?[^\s\d>\/=$<%][^\s>\/=$<%]*(?:\s+[^\s>\/=]+(?:=(?:"(?:\\[\s\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\"])*"|[^\s'">=]+))?)*\s*\/?>/,
		];

		const toStringFuncs: { name: string; fn?: (cs: CharSet) => string }[] = [
			{ name: "default" },
			{
				name: "JS",
				fn(cs) {
					return toLiteral(
						{ type: "Concatenation", elements: [{ type: "CharacterClass", characters: cs }] },
						{ flags: { ignoreCase: false, dotAll: false } }
					).source;
				},
			},
		];

		for (const re of regexes) {
			for (const { name, fn } of toStringFuncs) {
				it(`DFA (${name}): ${literalToString(re)}`, function () {
					const dfa = literalToDFA(re);
					dfa.minimize();
					assertEqualSnapshot(this, dfa.toDot(fn));
				});
				it(`ENFA (${name}): ${literalToString(re)}`, function () {
					assertEqualSnapshot(this, literalToENFA(re).toDot(fn));
				});
				it(`NFA (${name}): ${literalToString(re)}`, function () {
					assertEqualSnapshot(this, literalToNFA(re).toDot(fn));
				});
			}
		}
	});
});
