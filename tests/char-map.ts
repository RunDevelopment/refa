import { assert } from "chai";
import { CharMap } from "../src/char-map";
import { CharRange } from "../src/char-set";

describe("CharMap", function () {
	it("single element operations", function () {
		const map = new CharMap<string>();
		map.set(1, "a");
		map.set(2, "b");
		map.set(3, "a");
		map.set(2, "c");
		map.set(3, "d");

		assert.isTrue(map.delete(1));
		assert.isFalse(map.delete(1));
		assert.isFalse(map.delete(100));

		map.set(12, "f");

		assert.strictEqual(map.has(0), false);
		assert.strictEqual(map.has(1), false);
		assert.strictEqual(map.has(2), true);
		assert.strictEqual(map.has(3), true);
		assert.strictEqual(map.has(4), false);

		assert.strictEqual(map.has(2.5), false);
		assert.strictEqual(map.has(100), false);

		assert.strictEqual(map.get(0), undefined);
		assert.strictEqual(map.get(1), undefined);
		assert.strictEqual(map.get(2), "c");
		assert.strictEqual(map.get(3), "d");
		assert.strictEqual(map.get(4), undefined);

		assert.strictEqual(map.get(2.5), undefined);
		assert.strictEqual(map.get(100), undefined);

		assert.strictEqual(map.delete(2.5), false);
		assert.strictEqual(map.delete(100), false);

		assertEqual(map, [
			[{ min: 2, max: 2 }, "c"],
			[{ min: 3, max: 3 }, "d"],
			[{ min: 12, max: 12 }, "f"],
		]);

		map.filter(value => value !== "d");

		assertEqual(map, [
			[{ min: 2, max: 2 }, "c"],
			[{ min: 12, max: 12 }, "f"],
		]);
	});

	it("range operations", function () {
		const map = new CharMap<string>();
		map.setRange({ min: 0, max: 1 }, "a");
		map.setRange({ min: 4, max: 16 }, "b");

		map.deleteRange({ min: 2, max: 3 });

		assertEqual(map, [
			[{ min: 0, max: 1 }, "a"],
			[{ min: 4, max: 16 }, "b"],
		]);

		map.deleteRange({ min: 1, max: 4 });

		assertEqual(map, [
			[{ min: 0, max: 0 }, "a"],
			[{ min: 5, max: 16 }, "b"],
		]);

		map.clear();

		assertEqual(map, []);
	});

	it("merge adjacent", function () {
		const map = new CharMap<number>();

		map.set(1, 0);
		map.set(2, 0);

		assertEqual(map, [[{ min: 1, max: 2 }, 0]]);

		map.setRange({ min: 4, max: 9 }, 0);

		assertEqual(map, [
			[{ min: 1, max: 2 }, 0],
			[{ min: 4, max: 9 }, 0],
		]);

		map.set(3, 0);

		assertEqual(map, [[{ min: 1, max: 9 }, 0]]);
	});

	function assertEqual<T>(charMap: CharMap<T>, expected: Iterable<[CharRange, T]>): void {
		assert.deepEqual([...charMap], [...expected]);
	}
});
