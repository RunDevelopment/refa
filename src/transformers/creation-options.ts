export interface CreationOptions {
	/**
	 * If `true`, then transformers are allowed to reorder alternatives. This may cause the behavior of the regex to
	 * change.
	 *
	 * @default false
	 */
	ignoreOrder?: boolean;
	/**
	 * If `true`, then transformers are allowed to reduce or increase the ambiguity of the regular expression.
	 *
	 * @default false
	 */
	ignoreAmbiguity?: boolean;
}
