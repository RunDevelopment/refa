export function prefixes(iter: Iterable<string>): Set<string> {
	const set = new Set<string>();

	for (const item of iter) {
		set.add(item);
		for (let i = 0, l = item.length; i < l; i++) {
			set.add(item.substr(0, i));
		}
	}

	return set;
}

export function suffixes(iter: Iterable<string>): Set<string> {
	const set = new Set<string>();

	for (const item of iter) {
		set.add(item);
		for (let i = 0, l = item.length; i < l; i++) {
			set.add(item.substr(i + 1));
		}
	}

	return set;
}
