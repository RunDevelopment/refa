import { Element, Assertion, Simple } from "../ast";
import { CharSet } from "../char-set";
import { assertNever } from "../util";
import { LINE_TERMINATOR, WORD } from "./js-util";
import { AST } from "regexpp";


export type BoundaryAssertion = WordBoundaryAssertion | TextBoundaryAssertion;
export interface WordBoundaryAssertion {
	kind: "word";
	negate: boolean;
}
export interface TextBoundaryAssertion {
	kind: "end" | "start";
}

export function createAssertion(assertion: Readonly<BoundaryAssertion>, flags: Readonly<AST.Flags>): Simple<Element> {
	const maximum = flags.unicode ? 0x10FFFF : 0xFFFF;

	const newAssertion = (negate: boolean, kind: "ahead" | "behind", characters: CharSet): Simple<Assertion> => {
		return {
			type: "Assertion",
			negate,
			kind,
			alternatives: [
				{
					type: "Concatenation",
					elements: [
						{
							type: "CharacterClass",
							characters
						}
					]
				}
			]
		};
	};

	switch (assertion.kind) {
		case "end":
		case "start": {
			// /$/m == /(?!.)/
			// /$/  == /(?![^])/
			// /^/m == /(?<!.)/
			// /^/  == /(?<![^])/

			const charSet: CharSet = flags.multiline ?
				CharSet.empty(maximum).union(LINE_TERMINATOR).negate() :
				CharSet.all(maximum);
			return newAssertion(true, assertion.kind === "start" ? "behind" : "ahead", charSet);
		}

		case "word": {
			// /\b/ == /(?:(?<!\w)(?=\w)|(?<=\w)(?!\w))/
			// /\B/ == /(?:(?<=\w)(?=\w)|(?<!\w)(?!\w))/

			const charSet: CharSet = CharSet.empty(maximum).union(WORD);
			return {
				type: "Alternation",
				alternatives: [
					{
						type: "Concatenation",
						elements: [
							newAssertion(!assertion.negate, "behind", charSet),
							newAssertion(false, "ahead", charSet)
						]
					},
					{
						type: "Concatenation",
						elements: [
							newAssertion(assertion.negate, "behind", charSet),
							newAssertion(true, "ahead", charSet)
						]
					}
				]
			}
		}

		default:
			throw assertNever(assertion, 'Unknown assertion type');
	}
}
