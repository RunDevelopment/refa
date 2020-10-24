import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default /** @type {import('rollup').RollupOptions[]} */ ([
	{
		input: ".out/index.js",
		external: ["regexpp"],
		output: {
			file: "index.js",
			format: "cjs",
		},
		plugins: [nodeResolve(), terser()],
	},
	{
		input: ".out/index.js",
		external: ["regexpp"],
		output: {
			file: "index.mjs",
			format: "es",
		},
		plugins: [nodeResolve(), terser()],
	},
]);

