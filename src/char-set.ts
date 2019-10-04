export interface CharRange {
	readonly min: number;
	readonly max: number;
}

const emptyCache = new Map<number, CharSet>();
const allCache = new Map<number, CharSet>();

/**
 * An immutable set of characters.
 *
 * All characters in the set have to be between and including 0 and the maximum.
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
	 * Returns `true` if all characters in the range from 0 to `this.maximum`, including 0 and `this.maximum`, are in the set.
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
		for (let i = 0, l = this.ranges.length; i < l; i++) {
			const { min, max } = this.ranges[i];
			s += min;
			if (max > min) {
				s += "-" + max;
			}
			s += " ";
		}
		return `CharSet (${this.maximum}) [ ${s}]`; // TODO:
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


	private static *negateRanges(ranges: readonly CharRange[], maximum: number): Iterable<CharRange> {
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

	private toRanges(value: CharSet | Iterable<CharRange>): Iterable<CharRange> {
		if (value instanceof CharSet) {
			if (value.maximum !== this.maximum) {
				throw new RangeError(`The maximum of the other set has to be equal the maximum of this set.`);
			}
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

	/**
	 * Given an array of character ranges, it will remove any duplicates and join overlapping and adjacent ranges.
	 *
	 * While the array itself will be modified, the range objects will not.
	 *
	 * @param ranges
	 */
	private static optimizeRanges(ranges: CharRange[]): void {
		ranges.sort((a, b) => a.min - b.min);

		let deleteCount = 0;
		for (let i = 0; i < ranges.length - 1; i++) {
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

		ranges.splice(ranges.length - deleteCount, deleteCount);
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
		return new CharSet(this.maximum, [...CharSet.negateRanges(this.ranges, this.maximum)]);
	}

	union(...data: (Iterable<CharRange> | CharSet)[]): CharSet {
		const newRanges: CharRange[] = this.ranges.slice();
		for (const rangesOrSet of data) {
			for (const range of this.toRanges(rangesOrSet)) {
				newRanges.push(this.checkRange(range));
			}
		}

		CharSet.optimizeRanges(newRanges);
		return new CharSet(this.maximum, newRanges);
	}

	intersect(set: CharSet): CharSet;
	intersect(ranges: Iterable<CharRange>): CharSet;
	intersect(data: Iterable<CharRange> | CharSet): CharSet {
		// TODO: more efficient approach
		const set = data instanceof CharSet ? data : CharSet.empty(this.maximum).union(data);
		return this.negate().union(CharSet.negateRanges(set.ranges, set.maximum)).negate();
	}

	without(set: CharSet): CharSet;
	without(ranges: Iterable<CharRange>): CharSet;
	without(data: Iterable<CharRange> | CharSet): CharSet {
		// TODO: more efficient approach
		const set = data instanceof CharSet ? data : CharSet.empty(this.maximum).union(data);
		return set.union(CharSet.negateRanges(this.ranges, this.maximum)).negate();
	}


	has(character: number): boolean {
		return this.hasEvery({ min: character, max: character });
	}
	hasEvery(range: CharRange): boolean {
		const ranges = this.ranges;
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
	hasSome(range: CharRange): boolean {
		const ranges = this.ranges;
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

}
