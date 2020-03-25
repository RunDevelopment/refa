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
