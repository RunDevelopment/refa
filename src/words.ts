import { CharSet } from "./char-set";

export function fromUTF16ToString(word: Iterable<number>): string {
	return String.fromCharCode(...word);
}

export function fromUnicodeToString(word: Iterable<number>): string {
	return String.fromCodePoint(...word);
}

export function fromStringToUTF16(string: string): number[] {
	const word: number[] = new Array<number>(string.length);

	for (let i = 0, l = string.length; i < l; i++) {
		word.push(string.charCodeAt(i));
	}

	return word;
}

export function fromStringToUnicode(string: string): number[] {
	// https://stackoverflow.com/a/21409165/7595472

	const word: number[] = [];

	for (let i = 0, l = string.length; i < l; i++) {
		const c1 = string.charCodeAt(i);
		if (c1 >= 0xD800 && c1 < 0xDC00 && i + 1 < l) {
			const c2 = string.charCodeAt(i + 1);
			if (c2 >= 0xDC00 && c2 < 0xE000) {
				word.push(0x10000 + ((c1 - 0xD800) << 10) + (c2 - 0xDC00));
				i++;
				continue;
			}
		}
		word.push(c1);
	}

	return word;
}

/**
 * Iterates all words which can be constructed from the given word set (array of character sets).
 *
 * @param wordSet
 */
export function* wordSetToWords(wordSet: readonly CharSet[]): IterableIterator<number[]> {
	if (wordSet.length === 0) {
		yield [];
	} else {
		const charsArray: number[][] = [];
		for (const set of wordSet) {
			const chars: number[] = [];
			for (const { min, max } of set.ranges) {
				for (let i = min; i <= max; i++) {
					chars.push(i);
				}
			}
			charsArray.push(chars);
		}
		yield* nestedIteration(charsArray);
	}
}

function* nestedIteration<T>(arrays: T[][]): IterableIterator<T[]> {
	const indexes: number[] = [];

	for (let i = 0; i < arrays.length; i++) {
		const array = arrays[i];
		if (array.length === 0) {
			return;
		}
		indexes[i] = 0;
	}

	function hasNext(): boolean {
		let i = arrays.length - 1;
		while (true) {
			if (i < 0) {
				return false;
			}
			const index = ++indexes[i];
			if (index >= arrays[i].length) {
				indexes[i] = 0;
				i--;
			} else {
				break;
			}
		}
		return true;
	}

	do {
		const res: T[] = [];
		for (let i = 0; i < indexes.length; i++) {
			res[i] = arrays[i][indexes[i]];
		}
		yield res;
	} while (hasNext());
}
