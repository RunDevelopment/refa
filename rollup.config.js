import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import Package from "./package.json";

const banner = `/*! refa v${Package.version} */`;

export default /** @type {import('rollup').RollupOptions[]} */ ([
	{
		input: ".out/index.js",
		external: ["regexpp"],
		output: {
			file: "index.js",
			format: "cjs",
			banner,
		},
		plugins: [nodeResolve(), terser()],
	},
	{
		input: ".out/index.js",
		external: ["regexpp"],
		output: {
			file: "index.mjs",
			format: "es",
			banner,
		},
		plugins: [nodeResolve(), terser()],
	},
]);

