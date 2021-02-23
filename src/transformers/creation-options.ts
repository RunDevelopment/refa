export interface CreationOptions {
	/**
	 * If `true`, transformers are allowed to reorder alternatives and to change/ignore the laziness of quantifiers.
	 * This may cause the behavior of the regex to change.
	 *
	 * @default false
	 */
	ignoreOrder?: boolean;
	/**
	 * If `true`, transformers are allowed to reduce or increase the ambiguity of the regular expression.
	 *
	 * @default false
	 */
	ignoreAmbiguity?: boolean;
}
