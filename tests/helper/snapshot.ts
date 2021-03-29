import { assert } from "chai";
import { join, basename, dirname } from "path";
import { writeFileSync, mkdirSync } from "fs";

const UPDATE = process.argv.indexOf("--update") >= 0;

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

function toStringLiteral(value: string): string {
	return "`\n" + value.replace(/[`\\]/g, m => "\\" + m) + "\n`.slice(1, -1)";
}

function createSnapshot(values: Map<string, string>): string {
	let s = "";

	for (const [title, value] of values) {
		if (s) {
			s += "\n";
		}

		s += `module.exports[${JSON.stringify(title)}] = ${toStringLiteral(value)};\n`;
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
			console.log(file);

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

	if (UPDATE) {
		updateSnapshot(test, file, title, actual);
	} else {
		assert.strictEqual(actual, getSnapshot(file, title), message);
	}
}
