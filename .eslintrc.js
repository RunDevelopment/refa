/** @type {import("eslint").Linter.Config} */
module.exports = {
	env: {
		browser: true,
		es6: true
	},
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"prettier",
		"jsdoc"
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		ecmaFeatures: {
			node: true,
			spread: true
		},
		project: "./tsconfig.json"
	},
	rules: {
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: "default",
				format: ["camelCase"]
			},
			{
				selector: ["class", "interface", "typeAlias", "enum", "typeParameter"],
				format: ["PascalCase"]
			},
			{
				selector: "enumMember",
				format: ["UPPER_CASE"]
			},
			{
				selector: "variable",
				modifiers: ["const"],
				format: ["UPPER_CASE", "camelCase"]
			},
			{
				selector: ["classProperty", "classMethod"],
				modifiers: ["private"],
				format: ["camelCase"],
				leadingUnderscore: "require"
			},
			{
				selector: ["variable", "parameter"],
				modifiers: ["unused"],
				format: null,
				leadingUnderscore: "allow"
			},
			{
				selector: "typeProperty",
				format: ["camelCase"],
				leadingUnderscore: "allowDouble"
			}
		],

		"curly": "error",

		"no-constant-condition": ["error", { checkLoops: false }],
		"sort-imports": ["error", { ignoreDeclarationSort: true }],
		"@typescript-eslint/no-inferrable-types": ["error", { ignoreParameters: true, ignoreProperties: true }],
		"@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
		"@typescript-eslint/no-unnecessary-condition": "warn",
		"@typescript-eslint/strict-boolean-expressions": ["warn", { allowNullableBoolean: true }],

		"jsdoc/no-types": "error",
		"jsdoc/no-bad-blocks": "error",
		"jsdoc/newline-after-description": "error",
		"jsdoc/multiline-blocks": "error",
		"jsdoc/empty-tags": "error",
		"jsdoc/check-param-names": ["error", { enableFixer: true }],
		"jsdoc/require-param": "error",

		"no-empty-character-class": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/indent": "off",
	},
	settings: {
		jsdoc: {
			mode: "typescript"
		}
	},
	overrides: [
		{
			files: ["scripts/**"],
			env: {
				browser: false,
				node: true,
				es6: true
			},
			parserOptions: {
				project: "./scripts/tsconfig.json"
			},
			rules: {
				"@typescript-eslint/no-var-requires": "off"
			}
		},
		{
			files: ["tests/**"],
			parserOptions: {
				project: "./tests/tsconfig.json"
			}
		}
	],
	ignorePatterns: [
		"*.js",
		"index.d.ts",
		"src/js/unicode/**"
	]
}
