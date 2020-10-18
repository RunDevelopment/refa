// @ts-check

// If won't use `@ts-check` - just remove that comments (with `@type` JSDoc below).

/** @type {import('dts-bundle-generator/config-schema').BundlerConfig} */
const config = {
	compilationOptions: {
		preferredConfigPath: './tsconfig.json',
	},

	entries: [
		{
			filePath: './.out/index.d.ts',
			outFile: './index.d.ts',
			libraries: {
				importedLibraries: [
					'regexpp',
					'regexpp/ast'
				]
			},
			output: {
				inlineDeclareGlobals: true,
				inlineDeclareExternals: true
			}
		},
	],
};

module.exports = config;
