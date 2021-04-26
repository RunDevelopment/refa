import { Assertion, Element, NoParent } from "../ast";
import { CharSet } from "../char-set";
import { assertNever } from "../util";
import { Flags } from "./flags";
import { getCharEnv } from "./char-env";

export type BoundaryAssertion = WordBoundaryAssertion | TextBoundaryAssertion;
export interface WordBoundaryAssertion {
	kind: "word";
	negate: boolean;
}
export interface TextBoundaryAssertion {
	kind: "end" | "start";
}

export function createAssertion(assertion: Readonly<BoundaryAssertion>, flags: Readonly<Flags>): NoParent<Element> {
	const env = getCharEnv(flags);

	switch (assertion.kind) {
		case "end":
		case "start": {
			// /$/m == /(?!.)/
			// /$/  == /(?![^])/
			// /^/m == /(?<!.)/
			// /^/  == /(?<![^])/

			const charSet: CharSet = flags.multiline ? env.nonLineTerminator : env.all;
			return newAssertion(true, assertion.kind === "start" ? "behind" : "ahead", charSet);
		}

		case "word": {
			// /\b/ == /(?:(?<!\w)(?=\w)|(?<=\w)(?!\w))/
			// /\B/ == /(?:(?<=\w)(?=\w)|(?<!\w)(?!\w))/

			return {
				type: "Alternation",
				alternatives: [
					{
						type: "Concatenation",
						elements: [
							newAssertion(!assertion.negate, "behind", env.word),
							newAssertion(false, "ahead", env.word),
						],
					},
					{
						type: "Concatenation",
						elements: [
							newAssertion(assertion.negate, "behind", env.word),
							newAssertion(true, "ahead", env.word),
						],
					},
				],
			};
		}

		default:
			throw assertNever(assertion, "Unknown assertion type");
	}
}

function newAssertion(negate: boolean, kind: "ahead" | "behind", characters: CharSet): NoParent<Assertion> {
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
						characters,
					},
				],
			},
		],
	};
}
