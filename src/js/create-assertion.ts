import { Assertion, Element, NoParent } from "../ast";
import { CharSet } from "../char-set";
import { assertNever } from "../util";
import { LINE_TERMINATOR, UNICODE_MAXIMUM, UTF16_MAXIMUM, WORD, WORD_IU } from "./util";
import { Flags } from "./flags";

export type BoundaryAssertion = WordBoundaryAssertion | TextBoundaryAssertion;
export interface WordBoundaryAssertion {
	kind: "word";
	negate: boolean;
}
export interface TextBoundaryAssertion {
	kind: "end" | "start";
}

export function createAssertion(assertion: Readonly<BoundaryAssertion>, flags: Readonly<Flags>): NoParent<Element> {
	const maximum = flags.unicode ? UNICODE_MAXIMUM : UTF16_MAXIMUM;

	switch (assertion.kind) {
		case "end":
		case "start": {
			// /$/m == /(?!.)/
			// /$/  == /(?![^])/
			// /^/m == /(?<!.)/
			// /^/  == /(?<![^])/

			const charSet: CharSet = flags.multiline
				? CharSet.empty(maximum).union(LINE_TERMINATOR).negate()
				: CharSet.all(maximum);
			return newAssertion(true, assertion.kind === "start" ? "behind" : "ahead", charSet);
		}

		case "word": {
			// /\b/ == /(?:(?<!\w)(?=\w)|(?<=\w)(?!\w))/
			// /\B/ == /(?:(?<=\w)(?=\w)|(?<!\w)(?!\w))/

			const charRanges = flags.ignoreCase && flags.unicode ? WORD_IU : WORD;
			const charSet: CharSet = CharSet.empty(maximum).union(charRanges);
			return {
				type: "Alternation",
				alternatives: [
					{
						type: "Concatenation",
						elements: [
							newAssertion(!assertion.negate, "behind", charSet),
							newAssertion(false, "ahead", charSet),
						],
					},
					{
						type: "Concatenation",
						elements: [
							newAssertion(assertion.negate, "behind", charSet),
							newAssertion(true, "ahead", charSet),
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
