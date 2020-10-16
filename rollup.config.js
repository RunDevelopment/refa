import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
	input: "dist/index.js",
	external: ["regexpp"],
	output: {
		file: "index.js",
		format: "cjs",
	},
	plugins: [nodeResolve()],
};

