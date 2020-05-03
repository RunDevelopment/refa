export interface CharRange {
	readonly min: number;
	readonly max: number;
}


/**
 * This optimizes the given ranges in O(n) time.
 *
 * @param ranges
 */
function optimizeSortedRanges(ranges: CharRange[]): void {
	let deleteCount = 0;
	for (let i = 0, max = ranges.length - 1; i < max; i++) {
		const current = ranges[i - deleteCount];
		const next = ranges[i + 1];

		if (current.max >= next.max) {
			// current completely contains next.
			deleteCount++;
		} else if (next.min <= current.max + 1) {
			// overlapping or adjacent.
			ranges[i - deleteCount] = { min: current.min, max: next.max };
			deleteCount++;
		} else {
			ranges[i - deleteCount + 1] = next;
		}
	}

	if (deleteCount) {
		ranges.length = ranges.length - deleteCount;
	}
}

/**
 * Given an array of character ranges, it will remove any duplicates and join overlapping and adjacent ranges.
 *
 * While the array itself will be modified, the range objects in the array will not.
 *
 * @param ranges
 */
export function optimizeRanges(ranges: CharRange[]): void {
	// runs in O(n * log(n)), n = ranges.length

	ranges.sort((a, b) => a.min - b.min);
	optimizeSortedRanges(ranges);
}

/**
 * Given an array of optimized character ranges, it will return an iterable of character ranges that matches the
 * complete of the given ranges.
 *
 * @param ranges
 * @param maximum
 */
export function* negateRanges(ranges: readonly CharRange[], maximum: number): Iterable<CharRange> {
	// runs in O(ranges.length)

	if (ranges.length === 0) {
		yield { min: 0, max: maximum };
	} else {
		const first = ranges[0], last = ranges[ranges.length - 1];
		if (first.min > 0) {
			yield { min: 0, max: first.min - 1 };
		}
		for (let i = 1; i < ranges.length; i++) {
			yield { min: ranges[i - 1].max + 1, max: ranges[i].min - 1 };
		}
		if (last.max < maximum) {
			yield { min: last.max + 1, max: maximum };
		}
	}
}


const emptyCache = new Map<number, CharSet>();
const allCache = new Map<number, CharSet>();

/**
 * An immutable set of characters.
 *
 * All characters in the set have to be between 0 (inclusive) and the maximum (inclusive).
 */
export class CharSet {

	/**
	 * The greatest code point which can be element of the set.
	 */
	readonly maximum: number;

	/**
	 * An array of ranges representing this character set.
	 *
	 * The array must be guaranteed to have the following properties at all times:
	 *
	 * 1. Any two ranges are disjoint.
	 * 2. Any two ranges are non-adjacent.
	 * 3. 0 <= `min` <= `max` <= `this.maximum` for all ranges.
	 * 4. All ranges are sorted by ascending `min`.
	 */
	readonly ranges: readonly CharRange[];

	/**
	 * Returns `true` if this set doesn't contain any characters.
	 */
	get isEmpty(): boolean {
		return this.ranges.length === 0;
	}
	/**
	 * Returns `true` if all characters in the range from 0 to `this.maximum`, including 0 and `this.maximum`, are in
	 * the set.
	 */
	get isAll(): boolean {
		return this.ranges.length === 1 && this.ranges[0].min === 0 && this.ranges[0].max === this.maximum;
	}


	private constructor(maximum: number, ranges: readonly CharRange[]) {
		this.maximum = maximum;
		this.ranges = ranges;
	}

	/**
	 * Returns a string representation of the character set.
	 */
	toString(): string {
		let s = "";
		for (const { min, max } of this.ranges) {
			if (s !== "") s += ", ";
			if (min == max) {
				s += min.toString(16);
			} else {
				s += min.toString(16) + ".." + max.toString(16);
			}
		}
		return `CharSet (${this.maximum}) [${s}]`;
	}

	/**
	 * Returns an empty character set with the given maximum.
	 *
	 * @param maximum The greatest code point which can be element of the set.
	 */
	static empty(maximum: number): CharSet {
		let emptySet = emptyCache.get(maximum);
		if (emptySet === undefined) {
			emptySet = new CharSet(maximum, []);
			emptyCache.set(maximum, emptySet);
		}
		return emptySet;
	}
	/**
	 * Returns a complete character set with the given maximum.
	 *
	 * @param maximum The greatest code point which will be element of the set.
	 */
	static all(maximum: number): CharSet {
		let allSet = allCache.get(maximum);
		if (allSet === undefined) {
			allSet = new CharSet(maximum, [{ min: 0, max: maximum }]);
			allCache.set(maximum, allSet);
		}
		return allSet;
	}


	private checkCompatibility(value: CharSet): void {
		if (value.maximum !== this.maximum) {
			throw new RangeError(`The maximum of the other set (${value.maximum}) `
				+ `has to be equal the maximum of this set (${this.maximum}).`);
		}
	}

	private toRanges(value: CharSet): readonly CharRange[];
	private toRanges(value: CharSet | Iterable<CharRange>): Iterable<CharRange>;
	private toRanges(value: CharSet | Iterable<CharRange>): Iterable<CharRange> {
		if (value instanceof CharSet) {
			this.checkCompatibility(value);
			return value.ranges;
		} else {
			return value;
		}
	}

	private checkRange(range: CharRange): CharRange {
		if (range.min < 0 || range.min > range.max || range.max > this.maximum)
			throw new RangeError(`min=${range.min} has to be >= 0 and <= max.`);
		if (range.max > this.maximum)
			throw new RangeError(`max=${range.max} has to be <= maximum=${this.maximum}.`);
		return range;
	}


	equals(other: CharSet): boolean {
		if (other === this) return true;
		if (!(other instanceof CharSet)) return false;
		if (this.maximum !== other.maximum) return false;
		if (this.ranges.length !== other.ranges.length) return false;

		for (let i = 0, l = this.ranges.length; i < l; i++) {
			const thisR = this.ranges[i];
			const otherR = other.ranges[i];
			if (thisR.min !== otherR.min || thisR.max !== otherR.max) return false;
		}
		return true;
	}

	negate(): CharSet {
		return new CharSet(this.maximum, [...negateRanges(this.ranges, this.maximum)]);
	}

	union(...data: (Iterable<CharRange> | CharSet)[]): CharSet {
		const first = data[0];
		if (first instanceof CharSet && data.length === 1) {
			this.checkCompatibility(first);
			return this.unionOtherRanges(first.ranges);
		}

		const newRanges: CharRange[] = this.ranges.slice();
		for (const rangesOrSet of data) {
			for (const range of this.toRanges(rangesOrSet)) {
				newRanges.push(this.checkRange(range));
			}
		}

		optimizeRanges(newRanges);
		return new CharSet(this.maximum, newRanges);
	}

	/**
	 * This will create the union of this char set and the given ranges.
	 *
	 * __Note:__ The ranges are assumed to be optimized and compatible with this set.
	 *
	 * @param otherRanges
	 */
	private unionOtherRanges(otherRanges: readonly CharRange[]): CharSet {
		// now we can just merge the sorted ranges in O(n)
		const newRanges: CharRange[] = [];

		const thisRanges = this.ranges;
		let thisIndex = 0, otherIndex = 0;
		let thisR = thisRanges[thisIndex], otherR = otherRanges[otherIndex];
		while (thisR && otherR) {
			if (thisR.min <= otherR.min) {
				newRanges.push(thisR);
				thisR = thisRanges[++thisIndex];
			} else /* if (otherR.min < thisR.min) */ {
				newRanges.push(otherR);
				otherR = otherRanges[++otherIndex];
			}
		}

		// append rest
		for (; thisR; thisR = thisRanges[thisIndex++]) {
			newRanges.push(thisR);
		}
		for (; otherR; otherR = otherRanges[otherIndex++]) {
			newRanges.push(otherR);
		}

		// optimize
		optimizeSortedRanges(newRanges);

		return new CharSet(this.maximum, newRanges);
	}

	intersect(set: CharSet): CharSet;
	intersect(ranges: Iterable<CharRange>): CharSet;
	intersect(data: Iterable<CharRange> | CharSet): CharSet {
		let other: CharSet;
		if (data instanceof CharSet) {
			this.checkCompatibility(data);
			other = data;
		} else {
			// will be slower because the data has to be sorted and optimized which is done in O(n log n)
			other = CharSet.empty(this.maximum).union(data);
		}

		const newRanges: CharRange[] = [];

		// intersection done in O(n)

		const thisRanges = this.ranges, otherRanges = other.ranges;
		let thisIndex = 0, otherIndex = 0;
		let thisR = thisRanges[thisIndex], otherR = otherRanges[otherIndex];
		while (thisR && otherR) {
			// skip if thisR and otherR are disjoint
			if (thisR.max < otherR.min) {
				thisR = thisRanges[++thisIndex];
				continue;
			}
			if (otherR.max < thisR.min) {
				otherR = otherRanges[++otherIndex];
				continue;
			}

			// thisR and otherR overlap in at least one character

			// add intersection
			newRanges.push({ min: Math.max(thisR.min, otherR.min), max: Math.min(thisR.max, otherR.max) });

			// advance one the one with the lower max or both if their max is the same
			if (thisR.max < otherR.max) {
				thisR = thisRanges[++thisIndex];
			} else if (otherR.max < thisR.max) {
				otherR = otherRanges[++otherIndex];
			} else {
				thisR = thisRanges[++thisIndex];
				otherR = otherRanges[++otherIndex];
			}
		}

		if (newRanges.length === 0) {
			return CharSet.empty(this.maximum);
		}

		return new CharSet(this.maximum, newRanges);
	}

	without(set: CharSet): CharSet;
	without(ranges: Iterable<CharRange>): CharSet;
	without(data: Iterable<CharRange> | CharSet): CharSet {
		// TODO: more efficient approach
		const set = data instanceof CharSet ? data : CharSet.empty(this.maximum).union(data);
		return set.union(negateRanges(this.ranges, this.maximum)).negate();
	}


	has(character: number): boolean {
		return hasEveryOfRange(this.ranges, { min: character, max: character });
	}

	isSupersetOf(other: CharSet | CharRange): boolean {
		if (!(other instanceof CharSet)) {
			return hasEveryOfRange(this.ranges, other);
		}

		// runs in O(this.ranges.length + other.ranges.length)

		const thisRanges = this.ranges;
		const otherRanges = this.toRanges(other);

		let i = 0, j = 0;
		let thisItem = thisRanges[i], otherItem = otherRanges[j];

		// try to disprove that other this the smaller set
		// we search for any character in other which is not in this

		while (thisItem && otherItem) {
			if (thisItem.min <= otherItem.min && thisItem.max >= otherItem.max) {
				// if thisItem fully contains otherItem
				otherItem = otherRanges[++j];
			} else if (thisItem.max < otherItem.min) {
				// [thisItem] ... [otherItem]
				thisItem = thisRanges[++i];
			} else {
				// thisItem and otherItem partially overlap
				// or thisItem is after otherItem
				return false;
			}
		}

		// otherItem is still defined that there are some chars in other which are not in this
		return !otherItem;
	}
	isSubsetOf(other: CharSet | CharRange): boolean {
		if (other instanceof CharSet) {
			return other.isSupersetOf(this);
		} else {
			if (this.isEmpty) {
				return true;
			} else {
				return other.min <= this.ranges[0].min && this.ranges[this.ranges.length - 1].max <= other.max;
			}
		}
	}

	/**
	 * Returns whether this set and the given set (or range) are disjoint.
	 *
	 * @param other
	 */
	isDisjointWith(other: CharSet | CharRange): boolean {
		if (!(other instanceof CharSet)) {
			return !hasSomeOfRange(this.ranges, other);
		}

		// runs in O(this.ranges.length + other.ranges.length)

		const thisRanges = this.ranges;
		const otherRanges = this.toRanges(other);

		let i = 0, j = 0;
		let thisItem = thisRanges[i], otherItem = otherRanges[j];

		while (thisItem && otherItem) {
			if (otherItem.max < thisItem.min) {
				// [otherItem] ... [thisItem]
				otherItem = otherRanges[++j];
			} else if (thisItem.max < otherItem.min) {
				// [thisItem] ... [otherItem]
				thisItem = thisRanges[++i];
			} else {
				// thisItem and otherItem have at least one character in common
				return false;
			}
		}

		return true;
	}

}

function hasEveryOfRange(ranges: readonly CharRange[], range: CharRange): boolean {
	// runs in O(log(ranges.length))

	const l = ranges.length;
	const { min, max } = range;

	// this is empty
	if (l == 0)
		return false;

	// out of range
	if (min < ranges[0].min || max > ranges[l - 1].max)
		return false;

	// the out of range check is enough in this case
	if (l == 1)
		return true;

	let low = 0; // inclusive
	let high = l; // exclusive
	while (low < high) {
		const m = low + ((high - low) >> 1);
		const mRange = ranges[m];
		const mMin = mRange.min;

		if (mMin == min) {
			return max <= mRange.max;
		} else if (mMin < min) {
			if (max <= mRange.max)
				return true;
			low = m + 1;
		} else /* if (mMin > min) */ {
			high = m;
		}
	}

	return false;
}
function hasSomeOfRange(ranges: readonly CharRange[], range: CharRange): boolean {
	// runs in O(log(ranges.length))

	const l = ranges.length;
	const { min, max } = range;

	// this is empty
	if (l == 0)
		return false;

	// out of range
	if (max < ranges[0].min || min > ranges[l - 1].max)
		return false;

	let low = 0; // inclusive
	let high = l; // exclusive
	while (low < high) {
		const m = low + ((high - low) >> 1);
		const mRange = ranges[m];
		const mMin = mRange.min;

		if (mMin == min) {
			return true; // range.min is in this set
		} else if (mMin < min) {
			if (min <= mRange.max)
				return true;
			low = m + 1;
		} else /* if (mMin > min) */ {
			if (mMin <= max)
				return true;
			high = m;
		}
	}

	return false;
}
