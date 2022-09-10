import * as fs from "fs";
import * as path from "path";
import { CharSet } from "../src/char-set";
import * as aliases from "../src/js/unicode/alias";
import { printRanges } from "./util";

const UNICODE_SRC_DIR = path.join(__dirname, "../src/js/unicode");

createDataFile(Object.values(aliases.Binary_Property), "Binary_Property", "binary-property-data.ts");
createDataFile(Object.values(aliases.General_Category), "General_Category", "general-category-data.ts");
createDataFile(Object.values(aliases.ScriptAndScript_Extensions), "Script", "script-data.ts");
createDataFile(Object.values(aliases.ScriptAndScript_Extensions), "Script_Extensions", "script-extensions-data.ts");

function createDataFile(properties: Iterable<string>, category: string, filename: string): void {
	console.log(`Creating ${filename}`);

	const values = new Set(properties);

	let code = `/* eslint-disable */

// DO NOT EDIT!
// THIS FILE IS GENERATED BY scripts/create-unicode.js

// Category: ${category}
// Exported ranges: ${[...values].join(", ")}

import { CharRange } from "../../char-set";


`;

	for (const prop of values) {
		const codePoints: number[] = require(`@unicode/unicode-15.0.0/${category}/${prop}/code-points`);
		const ranges = CharSet.fromCharacters(0x10ffff, codePoints).ranges;

		code += `export const ${prop}: readonly CharRange[] = ${printRanges(ranges)};\n`;
	}

	fs.writeFileSync(path.join(UNICODE_SRC_DIR, filename), code, "utf-8");
}
