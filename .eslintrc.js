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
		"prettier"
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		ecmaFeatures: {
			node: true,
			spread: true
		}
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

		"no-empty-character-class": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/indent": "off",
	},
	overrides: [
		{
			files: [
				"scripts/**"
			],
			env: {
				browser: false,
				node: true,
				es6: true
			},
			rules: {
				"@typescript-eslint/no-var-requires": "off"
			}
		}
	],
	ignorePatterns: [
		"scripts/**",
		"*.js",
		"index.d.ts",
		"src/js/unicode/**"
	]
}
