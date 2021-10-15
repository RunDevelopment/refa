import { Literal } from "../../src/js";

export type LiteralPair = readonly [Literal, Literal];

const data: LiteralPair[] = [
	[/ab/, /ba/],
	[/foo/, /bar/],
	[/a/, /a*/],
	[/a*/, /a*b*c*/],
	[/a|b|c{2}/, /a{2}|b{2}|c/],
];

export const TEST_PAIRS: readonly LiteralPair[] = [
	// interesting combinations
	[/()/, /()/],
	[/()/, /b/],
	[/()/, /b?/],
	[/()/, /b*/],
	[/()/, /b+/],
	[/a/, /()/],
	[/a/, /b/],
	[/a/, /b?/],
	[/a/, /b*/],
	[/a/, /b+/],
	[/a?/, /()/],
	[/a?/, /b/],
	[/a?/, /b?/],
	[/a?/, /b*/],
	[/a?/, /b+/],
	[/a*/, /()/],
	[/a*/, /b/],
	[/a*/, /b?/],
	[/a*/, /b*/],
	[/a*/, /b+/],
	[/a+/, /()/],
	[/a+/, /b/],
	[/a+/, /b?/],
	[/a+/, /b*/],
	[/a+/, /b+/],

	// data
	...data,
	...data.map<LiteralPair>(([a, b]) => [b, a]),
];
