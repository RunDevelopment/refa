export function group<T>(iter: Iterable<T>, groupSize: number): T[][] {
	const groups: T[][] = [];
	let currentGroup: T[] = [];
	for (const item of iter) {
		currentGroup.push(item);
		if (currentGroup.length >= groupSize) {
			groups.push(currentGroup);
			currentGroup = [];
		}
	}
	if (currentGroup.length > 0) {
		groups.push(currentGroup);
	}
	return groups;
}
