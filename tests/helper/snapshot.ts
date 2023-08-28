import { assert } from "chai";
import { basename, dirname, join } from "path";
import { mkdirSync, writeFileSync } from "fs";
import { CONFIG_UPDATE } from "./config";

function getSnapshotFilePath(testFile: string): string {
	return join(dirname(testFile), "__snapshots__", basename(testFile));
}

function getTitlePath(test: Mocha.Runnable): string {
	const path = [test.title];
	for (let x = test.parent; x; x = x.parent) {
		path.push(x.title);
	}
	path.pop();
	path.reverse();
	return path.join(" >> ");
}

function getSnapshot(file: string, title: string): string {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const snap = require(file);

	if (!Object.prototype.hasOwnProperty.call(snap, title)) {
		throw new Error(`Cannot find snapshot for test ${title}`);
	}

	const value = snap[title];
	if (typeof value !== "string") {
		throw new Error(`Cannot find snapshot for test ${title}`);
	}

	return value;
}

function getRoot(test: Mocha.Runnable): Mocha.Suite {
	let p = test.parent;
	if (!p) {
		throw new Error();
	}
	while (p.parent) {
		p = p.parent;
	}
	return p;
}

const toUpdate = new Map<string, Map<string, string>>();

function escapeBackslashes(value: string): string {
	return value.replace(/(\\*)(`|\$\{)/g, (m, backslashes: string, c: string) => {
		return backslashes + backslashes + "\\" + c;
	});
}

function createSnapshot(values: Map<string, string>): string {
	let s = `/* eslint-disable */

var unescapeBackslashes = (str: string): string => {
	return str.replace(${/(\\*)(`|\$\{|\\$)/g}, (m, backslashes: string, c: string) => {
		return "\\\\".repeat(Math.floor(backslashes.length / 2)) + c;
	});
};
var lit = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(1, -1));
};
var n = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(0, -1));
};
`;

	for (const [title, value] of values) {
		s += `\nmodule.exports[n\`${escapeBackslashes(title)} \`] = lit\`\n${escapeBackslashes(value)}\n\`;\n`;
	}

	return s;
}

const registered = new Set<Mocha.Suite>();
function register(suite: Mocha.Suite): void {
	if (registered.has(suite)) {
		return;
	}
	registered.add(suite);

	suite.afterAll(() => {
		for (const [file, values] of toUpdate) {
			mkdirSync(dirname(file), { recursive: true });
			writeFileSync(file, createSnapshot(values), "utf8");
		}
	});
}

function updateSnapshot(test: Mocha.Runnable, file: string, title: string, value: string): void {
	register(getRoot(test));

	let map = toUpdate.get(file);
	if (map === undefined) {
		map = new Map();
		toUpdate.set(file, map);
	}

	if (map.has(title)) {
		throw new Error("There can be only one snapshot value per test case.");
	}
	map.set(title, value);
}

export function assertEqualSnapshot(context: Mocha.Context, actual: string, message?: string): void {
	const { test } = context;
	if (!test) {
		throw new Error("`test` property not set.");
	}

	const file = getSnapshotFilePath(test.file!);
	const title = getTitlePath(test);

	if (CONFIG_UPDATE) {
		updateSnapshot(test, file, title, actual);
	} else {
		assert.strictEqual(actual, getSnapshot(file, title), message);
	}
}
