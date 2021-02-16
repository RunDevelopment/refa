/**
 * A light-weight representation of a
 * [JavaScript RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object.
 *
 * This interface only requires the `source` and `flags` properties of a RegExp object.
 */
export interface Literal {
	readonly source: string;
	readonly flags: string;
}
