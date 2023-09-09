import { Char } from "./char-types";
import { CharRange, CharSet } from "./char-set";
import { filterMut } from "./util";

export interface ReadonlyCharMap<T> extends Iterable<[CharRange, T]> {
	/**
	 * Returns whether this map is empty.
	 *
	 * This is equivalent to `this.size === 0` and `this.entryCount === 0`.
	 */
	readonly isEmpty: boolean;
	/**
	 * The number of characters in this map. This is different from {@link entryCount}.
	 *
	 * This is equivalent to `[...this.keys()].reduce((count, range) => count + range.max - range.min + 1, 0)`.
	 */
	readonly size: number;
	/**
	 * The number of entires in this map.
	 *
	 * This is different from {@link size}. In general, you should use {@link size}, because it has the same semantics
	 * as `Set#size` and `Map#size`.
	 *
	 * This is equivalent to `[...this.entries()].length`.
	 */
	readonly entryCount: number;

	/**
	 * Returns whether the given character is a key in the map.
	 *
	 * @param char
	 */
	has(char: Char): boolean;
	/**
	 * Returns whether every character in the given range is a key in the map.
	 *
	 * This is equivalent to: `[...chars].every(char => this.has(char))`.
	 *
	 * @param chars
	 */
	hasEvery(chars: CharRange): boolean;
	/**
	 * Returns whether some character in the given range is a key in the map.
	 *
	 * This is equivalent to: `[...chars].some(char => this.has(char))`.
	 *
	 * @param chars
	 */
	hasSome(chars: CharRange): boolean;

	/**
	 * Returns the value associated with the given character of `undefined` if the character is not key in the map.
	 *
	 * @param char
	 */
	get(char: Char): T | undefined;

	/**
	 * Invokes the given callback for every item of the character map.
	 *
	 * This method is implemented more efficiently than other iterator based methods, so chose `forEach` where every
	 * possible.
	 *
	 * @param callback
	 */
	forEach(callback: (value: T, chars: CharRange, map: ReadonlyCharMap<T>) => void): void;
	/**
	 * Returns all ranges of characters that are keys in the map.
	 *
	 * Keys will be returned in the same order as `this.entries()`.
	 */
	keys(): Iterable<CharRange>;
	/**
	 * Returns all values in the map. Values might not be unique if more than one range maps to the same value.
	 *
	 * Values will be returned in the same order as `this.entries()`.
	 */
	values(): Iterable<T>;
	/**
	 * Returns all key-value pairs in the map.
	 *
	 * Entries will be returned in the order of ascending ranges.
	 */
	entries(): Iterable<[CharRange, T]>;

	/**
	 * Returns a mapping from the values of this map to its keys.
	 */
	invert(maxCharacter: Char): Map<T, CharSet>;
}

interface Item<T> {
	range: CharRange;
	value: T;
}

interface InclusiveRange {
	start: number;
	stop: number;
}

/**
 * A map from characters to generic values.
 *
 * The map guarantees that there are no adjacent character ranges that map to the equal values, will always be iterated
 * as one character range. The equality of values is given by JavaScript's strict equality operator (`===`).
 */
export class CharMap<T> implements ReadonlyCharMap<T> {
	private _array: Item<T>[] = [];

	get isEmpty(): boolean {
		return this._array.length === 0;
	}
	get size(): number {
		let count = 0;
		for (const { range } of this._array) {
			count += range.max - range.min + 1;
		}
		return count;
	}
	get entryCount(): number {
		return this._array.length;
	}

	private _indexOf(char: Char): number | undefined {
		let l = 0;
		let h = this._array.length;

		while (l < h) {
			const m = l + ((h - l) >> 2);
			const r = this._array[m].range;

			if (char < r.min) {
				h = m;
			} else if (char > r.max) {
				l = m + 1;
			} else {
				return m;
			}
		}

		return undefined;
	}

	/**
	 * Returns the index of the item that contains the given char. If no such item exists, then it will return the
	 * index of the nearest item to the left of it. If no item is left of the given char, then `undefined` will be
	 * returned.
	 *
	 * @param char
	 */
	private _indexOfOrLeft(char: Char): number | undefined {
		let l = 0;
		let h = this._array.length;

		while (l < h) {
			const m = l + ((h - l) >> 2);
			const r = this._array[m].range;

			if (char < r.min) {
				h = m;
			} else if (char > r.max) {
				if (m + 1 === this._array.length || char < this._array[m + 1].range.min) {
					return m;
				}
				l = m + 1;
			} else {
				return m;
			}
		}

		return undefined;
	}
	/**
	 * Returns the index of the item that contains the given char. If no such item exists, then it will return the
	 * index of the nearest item to the right of it. If no item is right of the given char, then `undefined` will be
	 * returned.
	 *
	 * @param char
	 */
	private _indexOfOrRight(char: Char): number | undefined {
		if (this._array.length === 0) {
			return undefined;
		}

		const left = this._indexOfOrLeft(char);

		if (left === undefined) {
			if (this._array.length === 0) {
				return undefined;
			} else {
				return 0;
			}
		}

		if (char > this._array[left].range.max) {
			if (left + 1 < this._array.length) {
				return left + 1;
			} else {
				return undefined;
			}
		} else {
			return left;
		}
	}

	/**
	 * Returns an inclusive range of all indexes of all items that intersect with the given range.
	 *
	 * This will return `undefined` if no such items exist.
	 *
	 * @param range
	 */
	private _indexInRange(range: CharRange): InclusiveRange | undefined {
		const start = this._indexOfOrRight(range.min);
		if (start === undefined) {
			return undefined;
		}

		const stop = this._indexOfOrLeft(range.max);
		if (stop === undefined) {
			return undefined;
		}

		if (stop < start) {
			return undefined;
		}

		return { start, stop };
	}

	private _insert(range: CharRange, value: T): void {
		if (this._array.length === 0 || this._array[this._array.length - 1].range.max + 1 < range.min) {
			this._array.push({ range, value });
			return;
		}

		const left = this._indexOfOrLeft(range.min);

		if (left === undefined) {
			// there is no item to the left of the given range
			const first = this._array[0];

			if (first.range.min === range.max + 1 && first.value === value) {
				// join
				first.range = { min: range.min, max: first.range.max };
			} else {
				// insert at start
				this._array.unshift({ range, value });
			}
			return;
		}

		const right = left + 1;
		if (right === this._array.length) {
			// there is no item to the right of the given range
			const last = this._array[left];

			if (last.range.max === range.min - 1 && last.value === value) {
				// join
				last.range = { min: last.range.min, max: range.max };
			} else {
				// insert at end
				this._array.push({ range, value });
			}

			return;
		}

		const leftItem = this._array[left];
		const rightItem = this._array[right];

		if (rightItem.range.min === range.max + 1 && rightItem.value === value) {
			if (leftItem.range.max === range.min - 1 && leftItem.value === value) {
				// join both
				leftItem.range = { min: leftItem.range.min, max: rightItem.range.max };
				this._array.splice(right, 1);
			} else {
				// join right
				rightItem.range = { min: range.min, max: rightItem.range.max };
			}
		} else {
			if (leftItem.range.max === range.min - 1 && leftItem.value === value) {
				// join left
				leftItem.range = { min: leftItem.range.min, max: range.max };
			} else {
				// insert
				this._array.splice(right, 0, { range, value });
			}
		}
	}

	has(char: Char): boolean {
		return this._indexOf(char) !== undefined;
	}
	hasEvery(chars: CharRange): boolean {
		const range = this._indexInRange(chars);
		if (!range) {
			return false;
		}

		// try to find gaps
		for (let i = range.start; i < range.stop; i++) {
			if (this._array[i].range.max + 1 !== this._array[i + 1].range.min) {
				return false;
			}
		}

		return true;
	}
	hasSome(chars: CharRange): boolean {
		return this._indexInRange(chars) !== undefined;
	}

	get(char: Char): T | undefined {
		const index = this._indexOf(char);
		return index !== undefined ? this._array[index].value : undefined;
	}

	set(char: Char, value: T): void {
		this.delete(char);
		this._insert({ min: char, max: char }, value);
	}

	/**
	 * Sets the value for all characters in the given range.
	 *
	 * This is equivalent to `[...chars].forEach(char => this.set(char, value))`.
	 *
	 * @param chars
	 * @param value
	 */
	setRange(chars: CharRange, value: T): void {
		this.deleteRange(chars);
		this._insert(chars, value);
	}

	/**
	 * Sets the value for all characters in the given character set.
	 *
	 * This is equivalent to `[...charSet.characters()].forEach(char => this.set(char, value))`.
	 *
	 * @param charSet
	 * @param value
	 */
	setCharSet(charSet: CharSet, value: T): void {
		if (this._array.length > 0) {
			for (const range of charSet.ranges) {
				this.deleteRange(range);
			}
		}

		if (this._array.length === 0) {
			for (const range of charSet.ranges) {
				this._array.push({ range, value });
			}
		} else {
			for (const range of charSet.ranges) {
				this._insert(range, value);
			}
		}
	}

	delete(char: Char): boolean {
		const index = this._indexOf(char);
		if (index === undefined) {
			return false;
		} else {
			const item = this._array[index];

			if (item.range.min === item.range.max) {
				this._array.splice(index, 1);
			} else if (item.range.min === char) {
				item.range = { min: item.range.min + 1, max: item.range.max };
			} else if (item.range.max === char) {
				item.range = { min: item.range.min, max: item.range.max - 1 };
			} else {
				this._array.splice(
					index,
					1,
					{ range: { min: item.range.min, max: char - 1 }, value: item.value },
					{ range: { min: char + 1, max: item.range.max }, value: item.value }
				);
			}

			return true;
		}
	}

	/**
	 * Deletes all characters in the given range.
	 *
	 * This is equivalent to `[...range].forEach(char => this.delete(char))`.
	 *
	 * @param range
	 */
	deleteRange(range: CharRange): void {
		const indexes = this._indexInRange(range);
		if (!indexes) {
			return;
		}

		if (indexes.start === indexes.stop) {
			// this is special because we might have to split an item
			const item = this._array[indexes.start];

			if (range.min <= item.range.min && item.range.max <= range.max) {
				// delete item
				this._array.splice(indexes.start, 1);
			} else if (item.range.min < range.min && range.max < item.range.max) {
				// split item into two
				this._array.splice(indexes.start + 1, 0, {
					range: { min: range.max + 1, max: item.range.max },
					value: item.value,
				});
				item.range = { min: item.range.min, max: range.min + 1 };
			} else {
				// both overlap
				if (range.max < item.range.max) {
					item.range = { min: range.max + 1, max: item.range.max };
				} else {
					item.range = { min: item.range.min, max: range.min - 1 };
				}
			}
		} else {
			// handle edges
			const start = this._array[indexes.start];
			if (start.range.min < range.min) {
				start.range = { min: start.range.min, max: range.min - 1 };
				indexes.start++;
			}
			const stop = this._array[indexes.stop];
			if (stop.range.max > range.max) {
				stop.range = { min: range.max + 1, max: stop.range.max };
				indexes.stop--;
			}

			// remove items
			this._array.splice(indexes.start, indexes.stop - indexes.start + 1);
		}
	}

	/**
	 * Deletes all entries in the map.
	 */
	clear(): void {
		this._array = [];
	}

	map(mapFn: (value: T, chars: CharRange, map: ReadonlyCharMap<T>) => T): void {
		for (const item of this._array) {
			item.value = mapFn(item.value, item.range, this);
		}

		// merge adjacent
		filterMut(this._array, (item, prev) => {
			if (prev && prev.range.max + 1 === item.range.min && prev.value === item.value) {
				prev.range = { min: prev.range.min, max: item.range.max };
				return false;
			}
			return true;
		});
	}
	mapRange(
		range: CharRange,
		mapFn: (value: T | undefined, chars: CharRange, map: ReadonlyCharMap<T>) => T | undefined
	): void {
		const output: Item<T>[] = [];

		function add(range: CharRange, value: T | undefined): void {
			if (value === undefined) {
				return;
			}

			const last = output[output.length - 1] as Item<T> | undefined;
			if (last && last.range.max + 1 === range.min && last.value === value) {
				last.range = { min: last.range.min, max: range.max };
			} else {
				output.push({ range, value });
			}
		}

		const count = this._array.length;
		if (count === 0) {
			add(range, mapFn(undefined, range, this));
		} else {
			const first = this._array[0];

			const min = first.range.min;
			const max = this._array[count - 1].range.max;

			if (!(range.min <= min && max <= range.max)) {
				throw new Error("Partial range maps aren't supported yet");
			}

			if (range.min < min) {
				const r: CharRange = { min: range.min, max: min - 1 };
				add(r, mapFn(undefined, r, this));
			}

			add(first.range, mapFn(first.value, first.range, this));

			for (let i = 1; i < count; i++) {
				const prev = this._array[i - 1];
				const curr = this._array[i];

				const r: CharRange = { min: prev.range.max + 1, max: curr.range.min - 1 };
				if (r.min <= r.max) {
					add(r, mapFn(undefined, r, this));
				}

				add(curr.range, mapFn(curr.value, curr.range, this));
			}

			if (max < range.max) {
				const r: CharRange = { min: max + 1, max: range.max };
				add(r, mapFn(undefined, r, this));
			}
		}

		this._array = output;
	}

	filter(conditionFn: (value: T, chars: CharRange, map: ReadonlyCharMap<T>) => boolean): void {
		filterMut(this._array, item => {
			return conditionFn(item.value, item.range, this);
		});
	}

	invert(maxCharacter: Char): Map<T, CharSet> {
		const rangeMap = new Map<T, CharRange[]>();

		for (const { range, value } of this._array) {
			let array = rangeMap.get(value);
			if (array === undefined) {
				rangeMap.set(value, (array = []));
			}
			array.push(range);
		}

		const map = new Map<T, CharSet>();
		for (const [value, ranges] of rangeMap) {
			map.set(value, CharSet.empty(maxCharacter).union(ranges));
		}
		return map;
	}

	forEach(callback: (value: T, chars: CharRange, map: ReadonlyCharMap<T>) => void): void {
		for (const item of this._array) {
			callback(item.value, item.range, this);
		}
	}
	*keys(): IterableIterator<CharRange> {
		for (const { range } of this._array) {
			yield range;
		}
	}
	*values(): IterableIterator<T> {
		for (const { value } of this._array) {
			yield value;
		}
	}
	*entries(): IterableIterator<[CharRange, T]> {
		for (const { range, value } of this._array) {
			yield [range, value];
		}
	}
	[Symbol.iterator](): IterableIterator<[CharRange, T]> {
		return this.entries();
	}
}
