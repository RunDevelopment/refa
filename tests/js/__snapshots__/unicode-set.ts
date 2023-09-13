/* eslint-disable */

var unescapeBackslashes = (str: string): string => {
	return str.replace(/(\\*)(`|\$\{|\\u(?![a-fA-F0-9]{4}))/g, (m, backslashes: string, c: string) => {
		return "\\".repeat(Math.floor(backslashes.length / 2)) + c;
	});
};
var lit = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(1, -1));
};
var n = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(0, -1));
};

module.exports[n`JS.UnicodeSet >> equals `] = lit`
❌  /[]/v = /[\q{}]/v
❌  /[]/v = /[\q{}]/vi
❌  /[]/v = /a/v
❌  /[]/v = /A/v
❌  /[]/v = /[aA]/v
❌  /[]/v = /[aA]/vi
❌  /[]/v = /a/vi
❌  /[]/v = /[\q{aa}]/vi
❌  /[]/v = /[\q{aa|aA|Aa|AA}]/v
❌  /[]/v = /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[]/v = /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[]/v = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[]/v = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[]/v = /[\w\q{foo|bar}]/v
❌  /[]/v = /[\w\q{foo|bar}]/vi
❌  /[]/v = /[\w\q{foo|bar|food}]/v
❌  /[]/v = /[\w\q{foo|foot|food}]/v
❌  /[]/v = /[\q{foo|foot|food}]/v
❌  /[]/v = /[\w\q{foo|foot|food}]/vi
❌  /[]/v = /[\w\q{foo|bar|baz}]/vi
❌  /[]/v = /[\q{foo|bar|baz}]/vi
✔️  /[\q{}]/v = /[\q{}]/vi
❌  /[\q{}]/v = /a/v
❌  /[\q{}]/v = /A/v
❌  /[\q{}]/v = /[aA]/v
❌  /[\q{}]/v = /[aA]/vi
❌  /[\q{}]/v = /a/vi
❌  /[\q{}]/v = /[\q{aa}]/vi
❌  /[\q{}]/v = /[\q{aa|aA|Aa|AA}]/v
❌  /[\q{}]/v = /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\q{}]/v = /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{}]/v = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{}]/v = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{}]/v = /[\w\q{foo|bar}]/v
❌  /[\q{}]/v = /[\w\q{foo|bar}]/vi
❌  /[\q{}]/v = /[\w\q{foo|bar|food}]/v
❌  /[\q{}]/v = /[\w\q{foo|foot|food}]/v
❌  /[\q{}]/v = /[\q{foo|foot|food}]/v
❌  /[\q{}]/v = /[\w\q{foo|foot|food}]/vi
❌  /[\q{}]/v = /[\w\q{foo|bar|baz}]/vi
❌  /[\q{}]/v = /[\q{foo|bar|baz}]/vi
❌  /[\q{}]/vi = /a/v
❌  /[\q{}]/vi = /A/v
❌  /[\q{}]/vi = /[aA]/v
❌  /[\q{}]/vi = /[aA]/vi
❌  /[\q{}]/vi = /a/vi
❌  /[\q{}]/vi = /[\q{aa}]/vi
❌  /[\q{}]/vi = /[\q{aa|aA|Aa|AA}]/v
❌  /[\q{}]/vi = /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\q{}]/vi = /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{}]/vi = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{}]/vi = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{}]/vi = /[\w\q{foo|bar}]/v
❌  /[\q{}]/vi = /[\w\q{foo|bar}]/vi
❌  /[\q{}]/vi = /[\w\q{foo|bar|food}]/v
❌  /[\q{}]/vi = /[\w\q{foo|foot|food}]/v
❌  /[\q{}]/vi = /[\q{foo|foot|food}]/v
❌  /[\q{}]/vi = /[\w\q{foo|foot|food}]/vi
❌  /[\q{}]/vi = /[\w\q{foo|bar|baz}]/vi
❌  /[\q{}]/vi = /[\q{foo|bar|baz}]/vi
❌  /a/v = /A/v
❌  /a/v = /[aA]/v
❌  /a/v = /[aA]/vi
❌  /a/v = /a/vi
❌  /a/v = /[\q{aa}]/vi
❌  /a/v = /[\q{aa|aA|Aa|AA}]/v
❌  /a/v = /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /a/v = /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /a/v = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /a/v = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /a/v = /[\w\q{foo|bar}]/v
❌  /a/v = /[\w\q{foo|bar}]/vi
❌  /a/v = /[\w\q{foo|bar|food}]/v
❌  /a/v = /[\w\q{foo|foot|food}]/v
❌  /a/v = /[\q{foo|foot|food}]/v
❌  /a/v = /[\w\q{foo|foot|food}]/vi
❌  /a/v = /[\w\q{foo|bar|baz}]/vi
❌  /a/v = /[\q{foo|bar|baz}]/vi
❌  /A/v = /[aA]/v
❌  /A/v = /[aA]/vi
❌  /A/v = /a/vi
❌  /A/v = /[\q{aa}]/vi
❌  /A/v = /[\q{aa|aA|Aa|AA}]/v
❌  /A/v = /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /A/v = /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /A/v = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /A/v = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /A/v = /[\w\q{foo|bar}]/v
❌  /A/v = /[\w\q{foo|bar}]/vi
❌  /A/v = /[\w\q{foo|bar|food}]/v
❌  /A/v = /[\w\q{foo|foot|food}]/v
❌  /A/v = /[\q{foo|foot|food}]/v
❌  /A/v = /[\w\q{foo|foot|food}]/vi
❌  /A/v = /[\w\q{foo|bar|baz}]/vi
❌  /A/v = /[\q{foo|bar|baz}]/vi
✔️  /[aA]/v = /[aA]/vi
✔️  /[aA]/v = /a/vi
❌  /[aA]/v = /[\q{aa}]/vi
❌  /[aA]/v = /[\q{aa|aA|Aa|AA}]/v
❌  /[aA]/v = /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[aA]/v = /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[aA]/v = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[aA]/v = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[aA]/v = /[\w\q{foo|bar}]/v
❌  /[aA]/v = /[\w\q{foo|bar}]/vi
❌  /[aA]/v = /[\w\q{foo|bar|food}]/v
❌  /[aA]/v = /[\w\q{foo|foot|food}]/v
❌  /[aA]/v = /[\q{foo|foot|food}]/v
❌  /[aA]/v = /[\w\q{foo|foot|food}]/vi
❌  /[aA]/v = /[\w\q{foo|bar|baz}]/vi
❌  /[aA]/v = /[\q{foo|bar|baz}]/vi
✔️  /[aA]/vi = /a/vi
❌  /[aA]/vi = /[\q{aa}]/vi
❌  /[aA]/vi = /[\q{aa|aA|Aa|AA}]/v
❌  /[aA]/vi = /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[aA]/vi = /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[aA]/vi = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[aA]/vi = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[aA]/vi = /[\w\q{foo|bar}]/v
❌  /[aA]/vi = /[\w\q{foo|bar}]/vi
❌  /[aA]/vi = /[\w\q{foo|bar|food}]/v
❌  /[aA]/vi = /[\w\q{foo|foot|food}]/v
❌  /[aA]/vi = /[\q{foo|foot|food}]/v
❌  /[aA]/vi = /[\w\q{foo|foot|food}]/vi
❌  /[aA]/vi = /[\w\q{foo|bar|baz}]/vi
❌  /[aA]/vi = /[\q{foo|bar|baz}]/vi
❌  /a/vi = /[\q{aa}]/vi
❌  /a/vi = /[\q{aa|aA|Aa|AA}]/v
❌  /a/vi = /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /a/vi = /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /a/vi = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /a/vi = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /a/vi = /[\w\q{foo|bar}]/v
❌  /a/vi = /[\w\q{foo|bar}]/vi
❌  /a/vi = /[\w\q{foo|bar|food}]/v
❌  /a/vi = /[\w\q{foo|foot|food}]/v
❌  /a/vi = /[\q{foo|foot|food}]/v
❌  /a/vi = /[\w\q{foo|foot|food}]/vi
❌  /a/vi = /[\w\q{foo|bar|baz}]/vi
❌  /a/vi = /[\q{foo|bar|baz}]/vi
✔️  /[\q{aa}]/vi = /[\q{aa|aA|Aa|AA}]/v
❌  /[\q{aa}]/vi = /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\q{aa}]/vi = /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{aa}]/vi = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa}]/vi = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa}]/vi = /[\w\q{foo|bar}]/v
❌  /[\q{aa}]/vi = /[\w\q{foo|bar}]/vi
❌  /[\q{aa}]/vi = /[\w\q{foo|bar|food}]/v
❌  /[\q{aa}]/vi = /[\w\q{foo|foot|food}]/v
❌  /[\q{aa}]/vi = /[\q{foo|foot|food}]/v
❌  /[\q{aa}]/vi = /[\w\q{foo|foot|food}]/vi
❌  /[\q{aa}]/vi = /[\w\q{foo|bar|baz}]/vi
❌  /[\q{aa}]/vi = /[\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v = /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\q{aa|aA|Aa|AA}]/v = /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{aa|aA|Aa|AA}]/v = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v = /[\w\q{foo|bar}]/v
❌  /[\q{aa|aA|Aa|AA}]/v = /[\w\q{foo|bar}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v = /[\w\q{foo|bar|food}]/v
❌  /[\q{aa|aA|Aa|AA}]/v = /[\w\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA}]/v = /[\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA}]/v = /[\w\q{foo|foot|food}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v = /[\w\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v = /[\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v = /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v = /[\w\q{foo|bar}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v = /[\w\q{foo|bar}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v = /[\w\q{foo|bar|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v = /[\w\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v = /[\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v = /[\w\q{foo|foot|food}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v = /[\w\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v = /[\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = /[\w\q{foo|bar}]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = /[\w\q{foo|bar}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = /[\w\q{foo|bar|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = /[\w\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = /[\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = /[\w\q{foo|foot|food}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = /[\w\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = /[\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi = /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|bar}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|bar}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|bar|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi = /[\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|foot|food}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi = /[\q{foo|bar|baz}]/vi
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|bar}]/v
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|bar}]/vi
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|bar|food}]/v
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|foot|food}]/v
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi = /[\q{foo|foot|food}]/v
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|foot|food}]/vi
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi = /[\w\q{foo|bar|baz}]/vi
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi = /[\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|bar}]/v = /[\w\q{foo|bar}]/vi
❌  /[\w\q{foo|bar}]/v = /[\w\q{foo|bar|food}]/v
❌  /[\w\q{foo|bar}]/v = /[\w\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar}]/v = /[\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar}]/v = /[\w\q{foo|foot|food}]/vi
❌  /[\w\q{foo|bar}]/v = /[\w\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|bar}]/v = /[\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|bar}]/vi = /[\w\q{foo|bar|food}]/v
❌  /[\w\q{foo|bar}]/vi = /[\w\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar}]/vi = /[\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar}]/vi = /[\w\q{foo|foot|food}]/vi
❌  /[\w\q{foo|bar}]/vi = /[\w\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|bar}]/vi = /[\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|bar|food}]/v = /[\w\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar|food}]/v = /[\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar|food}]/v = /[\w\q{foo|foot|food}]/vi
❌  /[\w\q{foo|bar|food}]/v = /[\w\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|bar|food}]/v = /[\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|foot|food}]/v = /[\q{foo|foot|food}]/v
❌  /[\w\q{foo|foot|food}]/v = /[\w\q{foo|foot|food}]/vi
❌  /[\w\q{foo|foot|food}]/v = /[\w\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|foot|food}]/v = /[\q{foo|bar|baz}]/vi
❌  /[\q{foo|foot|food}]/v = /[\w\q{foo|foot|food}]/vi
❌  /[\q{foo|foot|food}]/v = /[\w\q{foo|bar|baz}]/vi
❌  /[\q{foo|foot|food}]/v = /[\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|foot|food}]/vi = /[\w\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|foot|food}]/vi = /[\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|bar|baz}]/vi = /[\q{foo|bar|baz}]/vi
`;

module.exports[n`JS.UnicodeSet >> isSupersetOf `] = lit`
✔️  /[]/v ⊇ /[]/v
❌  /[]/v ⊇ /[\q{}]/v
❌  /[]/v ⊇ /[\q{}]/vi
❌  /[]/v ⊇ /a/v
❌  /[]/v ⊇ /A/v
❌  /[]/v ⊇ /[aA]/v
❌  /[]/v ⊇ /[aA]/vi
❌  /[]/v ⊇ /a/vi
❌  /[]/v ⊇ /[\q{aa}]/vi
❌  /[]/v ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[]/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[]/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[]/v ⊇ /[\w\q{foo|bar}]/v
❌  /[]/v ⊇ /[\w\q{foo|bar}]/vi
❌  /[]/v ⊇ /[\w\q{foo|bar|food}]/v
❌  /[]/v ⊇ /[\w\q{foo|foot|food}]/v
❌  /[]/v ⊇ /[\q{foo|foot|food}]/v
❌  /[]/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[]/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[]/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\q{}]/v ⊇ /[]/v
✔️  /[\q{}]/v ⊇ /[\q{}]/v
✔️  /[\q{}]/v ⊇ /[\q{}]/vi
❌  /[\q{}]/v ⊇ /a/v
❌  /[\q{}]/v ⊇ /A/v
❌  /[\q{}]/v ⊇ /[aA]/v
❌  /[\q{}]/v ⊇ /[aA]/vi
❌  /[\q{}]/v ⊇ /a/vi
❌  /[\q{}]/v ⊇ /[\q{aa}]/vi
❌  /[\q{}]/v ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\q{}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\q{}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{}]/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{}]/v ⊇ /[\w\q{foo|bar}]/v
❌  /[\q{}]/v ⊇ /[\w\q{foo|bar}]/vi
❌  /[\q{}]/v ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\q{}]/v ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\q{}]/v ⊇ /[\q{foo|foot|food}]/v
❌  /[\q{}]/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\q{}]/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\q{}]/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\q{}]/vi ⊇ /[]/v
✔️  /[\q{}]/vi ⊇ /[\q{}]/v
✔️  /[\q{}]/vi ⊇ /[\q{}]/vi
❌  /[\q{}]/vi ⊇ /a/v
❌  /[\q{}]/vi ⊇ /A/v
❌  /[\q{}]/vi ⊇ /[aA]/v
❌  /[\q{}]/vi ⊇ /[aA]/vi
❌  /[\q{}]/vi ⊇ /a/vi
❌  /[\q{}]/vi ⊇ /[\q{aa}]/vi
❌  /[\q{}]/vi ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\q{}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\q{}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{}]/vi ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{}]/vi ⊇ /[\w\q{foo|bar}]/v
❌  /[\q{}]/vi ⊇ /[\w\q{foo|bar}]/vi
❌  /[\q{}]/vi ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\q{}]/vi ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\q{}]/vi ⊇ /[\q{foo|foot|food}]/v
❌  /[\q{}]/vi ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\q{}]/vi ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\q{}]/vi ⊇ /[\q{foo|bar|baz}]/vi
✔️  /a/v ⊇ /[]/v
❌  /a/v ⊇ /[\q{}]/v
❌  /a/v ⊇ /[\q{}]/vi
✔️  /a/v ⊇ /a/v
❌  /a/v ⊇ /A/v
❌  /a/v ⊇ /[aA]/v
❌  /a/v ⊇ /[aA]/vi
❌  /a/v ⊇ /a/vi
❌  /a/v ⊇ /[\q{aa}]/vi
❌  /a/v ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /a/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /a/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /a/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /a/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /a/v ⊇ /[\w\q{foo|bar}]/v
❌  /a/v ⊇ /[\w\q{foo|bar}]/vi
❌  /a/v ⊇ /[\w\q{foo|bar|food}]/v
❌  /a/v ⊇ /[\w\q{foo|foot|food}]/v
❌  /a/v ⊇ /[\q{foo|foot|food}]/v
❌  /a/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /a/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /a/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /A/v ⊇ /[]/v
❌  /A/v ⊇ /[\q{}]/v
❌  /A/v ⊇ /[\q{}]/vi
❌  /A/v ⊇ /a/v
✔️  /A/v ⊇ /A/v
❌  /A/v ⊇ /[aA]/v
❌  /A/v ⊇ /[aA]/vi
❌  /A/v ⊇ /a/vi
❌  /A/v ⊇ /[\q{aa}]/vi
❌  /A/v ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /A/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /A/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /A/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /A/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /A/v ⊇ /[\w\q{foo|bar}]/v
❌  /A/v ⊇ /[\w\q{foo|bar}]/vi
❌  /A/v ⊇ /[\w\q{foo|bar|food}]/v
❌  /A/v ⊇ /[\w\q{foo|foot|food}]/v
❌  /A/v ⊇ /[\q{foo|foot|food}]/v
❌  /A/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /A/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /A/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[aA]/v ⊇ /[]/v
❌  /[aA]/v ⊇ /[\q{}]/v
❌  /[aA]/v ⊇ /[\q{}]/vi
✔️  /[aA]/v ⊇ /a/v
✔️  /[aA]/v ⊇ /A/v
✔️  /[aA]/v ⊇ /[aA]/v
✔️  /[aA]/v ⊇ /[aA]/vi
✔️  /[aA]/v ⊇ /a/vi
❌  /[aA]/v ⊇ /[\q{aa}]/vi
❌  /[aA]/v ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[aA]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[aA]/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[aA]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[aA]/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[aA]/v ⊇ /[\w\q{foo|bar}]/v
❌  /[aA]/v ⊇ /[\w\q{foo|bar}]/vi
❌  /[aA]/v ⊇ /[\w\q{foo|bar|food}]/v
❌  /[aA]/v ⊇ /[\w\q{foo|foot|food}]/v
❌  /[aA]/v ⊇ /[\q{foo|foot|food}]/v
❌  /[aA]/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[aA]/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[aA]/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[aA]/vi ⊇ /[]/v
❌  /[aA]/vi ⊇ /[\q{}]/v
❌  /[aA]/vi ⊇ /[\q{}]/vi
✔️  /[aA]/vi ⊇ /a/v
✔️  /[aA]/vi ⊇ /A/v
✔️  /[aA]/vi ⊇ /[aA]/v
✔️  /[aA]/vi ⊇ /[aA]/vi
✔️  /[aA]/vi ⊇ /a/vi
❌  /[aA]/vi ⊇ /[\q{aa}]/vi
❌  /[aA]/vi ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[aA]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[aA]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[aA]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[aA]/vi ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[aA]/vi ⊇ /[\w\q{foo|bar}]/v
❌  /[aA]/vi ⊇ /[\w\q{foo|bar}]/vi
❌  /[aA]/vi ⊇ /[\w\q{foo|bar|food}]/v
❌  /[aA]/vi ⊇ /[\w\q{foo|foot|food}]/v
❌  /[aA]/vi ⊇ /[\q{foo|foot|food}]/v
❌  /[aA]/vi ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[aA]/vi ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[aA]/vi ⊇ /[\q{foo|bar|baz}]/vi
✔️  /a/vi ⊇ /[]/v
❌  /a/vi ⊇ /[\q{}]/v
❌  /a/vi ⊇ /[\q{}]/vi
✔️  /a/vi ⊇ /a/v
✔️  /a/vi ⊇ /A/v
✔️  /a/vi ⊇ /[aA]/v
✔️  /a/vi ⊇ /[aA]/vi
✔️  /a/vi ⊇ /a/vi
❌  /a/vi ⊇ /[\q{aa}]/vi
❌  /a/vi ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /a/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /a/vi ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /a/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /a/vi ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /a/vi ⊇ /[\w\q{foo|bar}]/v
❌  /a/vi ⊇ /[\w\q{foo|bar}]/vi
❌  /a/vi ⊇ /[\w\q{foo|bar|food}]/v
❌  /a/vi ⊇ /[\w\q{foo|foot|food}]/v
❌  /a/vi ⊇ /[\q{foo|foot|food}]/v
❌  /a/vi ⊇ /[\w\q{foo|foot|food}]/vi
❌  /a/vi ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /a/vi ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\q{aa}]/vi ⊇ /[]/v
❌  /[\q{aa}]/vi ⊇ /[\q{}]/v
❌  /[\q{aa}]/vi ⊇ /[\q{}]/vi
❌  /[\q{aa}]/vi ⊇ /a/v
❌  /[\q{aa}]/vi ⊇ /A/v
❌  /[\q{aa}]/vi ⊇ /[aA]/v
❌  /[\q{aa}]/vi ⊇ /[aA]/vi
❌  /[\q{aa}]/vi ⊇ /a/vi
✔️  /[\q{aa}]/vi ⊇ /[\q{aa}]/vi
✔️  /[\q{aa}]/vi ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\q{aa}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\q{aa}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{aa}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa}]/vi ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa}]/vi ⊇ /[\w\q{foo|bar}]/v
❌  /[\q{aa}]/vi ⊇ /[\w\q{foo|bar}]/vi
❌  /[\q{aa}]/vi ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\q{aa}]/vi ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\q{aa}]/vi ⊇ /[\q{foo|foot|food}]/v
❌  /[\q{aa}]/vi ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\q{aa}]/vi ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\q{aa}]/vi ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\q{aa|aA|Aa|AA}]/v ⊇ /[]/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\q{}]/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\q{}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /a/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /A/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[aA]/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[aA]/vi
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /a/vi
✔️  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\q{aa}]/vi
✔️  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\w\q{foo|bar}]/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\w\q{foo|bar}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA}]/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\q{}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\q{}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /a/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /A/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[aA]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[aA]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /a/vi
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\q{aa}]/vi
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\q{aa|aA|Aa|AA}]/v
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\w\q{foo|bar}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\w\q{foo|bar}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\q{}]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\q{}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /a/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /A/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[aA]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[aA]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /a/vi
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\q{aa}]/vi
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\q{aa|aA|Aa|AA}]/v
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\w\q{foo|bar}]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\w\q{foo|bar}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /a/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /A/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[aA]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[aA]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /a/vi
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{aa}]/vi
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{aa|aA|Aa|AA}]/v
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|bar}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|bar}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{foo|foot|food}]/v
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[]/v
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{}]/v
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{}]/vi
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /a/v
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /A/v
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[aA]/v
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[aA]/vi
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /a/vi
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{aa}]/vi
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{aa|aA|Aa|AA}]/v
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|bar}]/v
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|bar}]/vi
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{foo|foot|food}]/v
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\w\q{foo|bar}]/v ⊇ /[]/v
❌  /[\w\q{foo|bar}]/v ⊇ /[\q{}]/v
❌  /[\w\q{foo|bar}]/v ⊇ /[\q{}]/vi
✔️  /[\w\q{foo|bar}]/v ⊇ /a/v
✔️  /[\w\q{foo|bar}]/v ⊇ /A/v
✔️  /[\w\q{foo|bar}]/v ⊇ /[aA]/v
✔️  /[\w\q{foo|bar}]/v ⊇ /[aA]/vi
✔️  /[\w\q{foo|bar}]/v ⊇ /a/vi
❌  /[\w\q{foo|bar}]/v ⊇ /[\q{aa}]/vi
❌  /[\w\q{foo|bar}]/v ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\w\q{foo|bar}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\w\q{foo|bar}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\w\q{foo|bar}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\w\q{foo|bar}]/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
✔️  /[\w\q{foo|bar}]/v ⊇ /[\w\q{foo|bar}]/v
❌  /[\w\q{foo|bar}]/v ⊇ /[\w\q{foo|bar}]/vi
❌  /[\w\q{foo|bar}]/v ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\w\q{foo|bar}]/v ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar}]/v ⊇ /[\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar}]/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\w\q{foo|bar}]/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|bar}]/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\w\q{foo|bar}]/vi ⊇ /[]/v
❌  /[\w\q{foo|bar}]/vi ⊇ /[\q{}]/v
❌  /[\w\q{foo|bar}]/vi ⊇ /[\q{}]/vi
✔️  /[\w\q{foo|bar}]/vi ⊇ /a/v
✔️  /[\w\q{foo|bar}]/vi ⊇ /A/v
✔️  /[\w\q{foo|bar}]/vi ⊇ /[aA]/v
✔️  /[\w\q{foo|bar}]/vi ⊇ /[aA]/vi
✔️  /[\w\q{foo|bar}]/vi ⊇ /a/vi
❌  /[\w\q{foo|bar}]/vi ⊇ /[\q{aa}]/vi
❌  /[\w\q{foo|bar}]/vi ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\w\q{foo|bar}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\w\q{foo|bar}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\w\q{foo|bar}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\w\q{foo|bar}]/vi ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
✔️  /[\w\q{foo|bar}]/vi ⊇ /[\w\q{foo|bar}]/v
✔️  /[\w\q{foo|bar}]/vi ⊇ /[\w\q{foo|bar}]/vi
❌  /[\w\q{foo|bar}]/vi ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\w\q{foo|bar}]/vi ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar}]/vi ⊇ /[\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar}]/vi ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\w\q{foo|bar}]/vi ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|bar}]/vi ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\w\q{foo|bar|food}]/v ⊇ /[]/v
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\q{}]/v
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\q{}]/vi
✔️  /[\w\q{foo|bar|food}]/v ⊇ /a/v
✔️  /[\w\q{foo|bar|food}]/v ⊇ /A/v
✔️  /[\w\q{foo|bar|food}]/v ⊇ /[aA]/v
✔️  /[\w\q{foo|bar|food}]/v ⊇ /[aA]/vi
✔️  /[\w\q{foo|bar|food}]/v ⊇ /a/vi
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\q{aa}]/vi
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
✔️  /[\w\q{foo|bar|food}]/v ⊇ /[\w\q{foo|bar}]/v
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\w\q{foo|bar}]/vi
✔️  /[\w\q{foo|bar|food}]/v ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|bar|food}]/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\w\q{foo|foot|food}]/v ⊇ /[]/v
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\q{}]/v
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\q{}]/vi
✔️  /[\w\q{foo|foot|food}]/v ⊇ /a/v
✔️  /[\w\q{foo|foot|food}]/v ⊇ /A/v
✔️  /[\w\q{foo|foot|food}]/v ⊇ /[aA]/v
✔️  /[\w\q{foo|foot|food}]/v ⊇ /[aA]/vi
✔️  /[\w\q{foo|foot|food}]/v ⊇ /a/vi
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\q{aa}]/vi
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\w\q{foo|bar}]/v
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\w\q{foo|bar}]/vi
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\w\q{foo|bar|food}]/v
✔️  /[\w\q{foo|foot|food}]/v ⊇ /[\w\q{foo|foot|food}]/v
✔️  /[\w\q{foo|foot|food}]/v ⊇ /[\q{foo|foot|food}]/v
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|foot|food}]/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\q{foo|foot|food}]/v ⊇ /[]/v
❌  /[\q{foo|foot|food}]/v ⊇ /[\q{}]/v
❌  /[\q{foo|foot|food}]/v ⊇ /[\q{}]/vi
❌  /[\q{foo|foot|food}]/v ⊇ /a/v
❌  /[\q{foo|foot|food}]/v ⊇ /A/v
❌  /[\q{foo|foot|food}]/v ⊇ /[aA]/v
❌  /[\q{foo|foot|food}]/v ⊇ /[aA]/vi
❌  /[\q{foo|foot|food}]/v ⊇ /a/vi
❌  /[\q{foo|foot|food}]/v ⊇ /[\q{aa}]/vi
❌  /[\q{foo|foot|food}]/v ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\q{foo|foot|food}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\q{foo|foot|food}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{foo|foot|food}]/v ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{foo|foot|food}]/v ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{foo|foot|food}]/v ⊇ /[\w\q{foo|bar}]/v
❌  /[\q{foo|foot|food}]/v ⊇ /[\w\q{foo|bar}]/vi
❌  /[\q{foo|foot|food}]/v ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\q{foo|foot|food}]/v ⊇ /[\w\q{foo|foot|food}]/v
✔️  /[\q{foo|foot|food}]/v ⊇ /[\q{foo|foot|food}]/v
❌  /[\q{foo|foot|food}]/v ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\q{foo|foot|food}]/v ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\q{foo|foot|food}]/v ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\w\q{foo|foot|food}]/vi ⊇ /[]/v
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\q{}]/v
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\q{}]/vi
✔️  /[\w\q{foo|foot|food}]/vi ⊇ /a/v
✔️  /[\w\q{foo|foot|food}]/vi ⊇ /A/v
✔️  /[\w\q{foo|foot|food}]/vi ⊇ /[aA]/v
✔️  /[\w\q{foo|foot|food}]/vi ⊇ /[aA]/vi
✔️  /[\w\q{foo|foot|food}]/vi ⊇ /a/vi
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\q{aa}]/vi
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\w\q{foo|bar}]/v
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\w\q{foo|bar}]/vi
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\w\q{foo|bar|food}]/v
✔️  /[\w\q{foo|foot|food}]/vi ⊇ /[\w\q{foo|foot|food}]/v
✔️  /[\w\q{foo|foot|food}]/vi ⊇ /[\q{foo|foot|food}]/v
✔️  /[\w\q{foo|foot|food}]/vi ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\w\q{foo|bar|baz}]/vi
❌  /[\w\q{foo|foot|food}]/vi ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\w\q{foo|bar|baz}]/vi ⊇ /[]/v
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\q{}]/v
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\q{}]/vi
✔️  /[\w\q{foo|bar|baz}]/vi ⊇ /a/v
✔️  /[\w\q{foo|bar|baz}]/vi ⊇ /A/v
✔️  /[\w\q{foo|bar|baz}]/vi ⊇ /[aA]/v
✔️  /[\w\q{foo|bar|baz}]/vi ⊇ /[aA]/vi
✔️  /[\w\q{foo|bar|baz}]/vi ⊇ /a/vi
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\q{aa}]/vi
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
✔️  /[\w\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|bar}]/v
✔️  /[\w\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|bar}]/vi
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\q{foo|foot|food}]/v
❌  /[\w\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|foot|food}]/vi
✔️  /[\w\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|bar|baz}]/vi
✔️  /[\w\q{foo|bar|baz}]/vi ⊇ /[\q{foo|bar|baz}]/vi
✔️  /[\q{foo|bar|baz}]/vi ⊇ /[]/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\q{}]/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\q{}]/vi
❌  /[\q{foo|bar|baz}]/vi ⊇ /a/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /A/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /[aA]/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /[aA]/vi
❌  /[\q{foo|bar|baz}]/vi ⊇ /a/vi
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\q{aa}]/vi
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\q{aa|aA|Aa|AA}]/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\q{aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\q{a|aa|aA|Aa|AA|aaa}]/vi
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|bar}]/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|bar}]/vi
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|bar|food}]/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|foot|food}]/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\q{foo|foot|food}]/v
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|foot|food}]/vi
❌  /[\q{foo|bar|baz}]/vi ⊇ /[\w\q{foo|bar|baz}]/vi
✔️  /[\q{foo|bar|baz}]/vi ⊇ /[\q{foo|bar|baz}]/vi
`;

module.exports[n`JS.UnicodeSet >> isDisjointWith `] = lit`
✔️  /[]/v ∩ /[\q{}]/v = ∅
✔️  /[]/v ∩ /[\q{}]/vi = ∅
✔️  /[]/v ∩ /a/v = ∅
✔️  /[]/v ∩ /A/v = ∅
✔️  /[]/v ∩ /[aA]/v = ∅
✔️  /[]/v ∩ /[aA]/vi = ∅
✔️  /[]/v ∩ /a/vi = ∅
✔️  /[]/v ∩ /[\q{aa}]/vi = ∅
✔️  /[]/v ∩ /[\q{aa|aA|Aa|AA}]/v = ∅
✔️  /[]/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/v = ∅
✔️  /[]/v ∩ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = ∅
✔️  /[]/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
✔️  /[]/v ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
✔️  /[]/v ∩ /[\w\q{foo|bar}]/v = ∅
✔️  /[]/v ∩ /[\w\q{foo|bar}]/vi = ∅
✔️  /[]/v ∩ /[\w\q{foo|bar|food}]/v = ∅
✔️  /[]/v ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /[]/v ∩ /[\q{foo|foot|food}]/v = ∅
✔️  /[]/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
✔️  /[]/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /[]/v ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\q{}]/v ∩ /[\q{}]/vi = ∅
✔️  /[\q{}]/v ∩ /a/v = ∅
✔️  /[\q{}]/v ∩ /A/v = ∅
✔️  /[\q{}]/v ∩ /[aA]/v = ∅
✔️  /[\q{}]/v ∩ /[aA]/vi = ∅
✔️  /[\q{}]/v ∩ /a/vi = ∅
✔️  /[\q{}]/v ∩ /[\q{aa}]/vi = ∅
✔️  /[\q{}]/v ∩ /[\q{aa|aA|Aa|AA}]/v = ∅
✔️  /[\q{}]/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/v = ∅
✔️  /[\q{}]/v ∩ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = ∅
✔️  /[\q{}]/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
✔️  /[\q{}]/v ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
✔️  /[\q{}]/v ∩ /[\w\q{foo|bar}]/v = ∅
✔️  /[\q{}]/v ∩ /[\w\q{foo|bar}]/vi = ∅
✔️  /[\q{}]/v ∩ /[\w\q{foo|bar|food}]/v = ∅
✔️  /[\q{}]/v ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /[\q{}]/v ∩ /[\q{foo|foot|food}]/v = ∅
✔️  /[\q{}]/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
✔️  /[\q{}]/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /[\q{}]/v ∩ /[\q{foo|bar|baz}]/vi = ∅
✔️  /[\q{}]/vi ∩ /a/v = ∅
✔️  /[\q{}]/vi ∩ /A/v = ∅
✔️  /[\q{}]/vi ∩ /[aA]/v = ∅
✔️  /[\q{}]/vi ∩ /[aA]/vi = ∅
✔️  /[\q{}]/vi ∩ /a/vi = ∅
✔️  /[\q{}]/vi ∩ /[\q{aa}]/vi = ∅
✔️  /[\q{}]/vi ∩ /[\q{aa|aA|Aa|AA}]/v = ∅
✔️  /[\q{}]/vi ∩ /[\q{aa|aA|Aa|AA|aaa}]/v = ∅
✔️  /[\q{}]/vi ∩ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = ∅
✔️  /[\q{}]/vi ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
✔️  /[\q{}]/vi ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
✔️  /[\q{}]/vi ∩ /[\w\q{foo|bar}]/v = ∅
✔️  /[\q{}]/vi ∩ /[\w\q{foo|bar}]/vi = ∅
✔️  /[\q{}]/vi ∩ /[\w\q{foo|bar|food}]/v = ∅
✔️  /[\q{}]/vi ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /[\q{}]/vi ∩ /[\q{foo|foot|food}]/v = ∅
✔️  /[\q{}]/vi ∩ /[\w\q{foo|foot|food}]/vi = ∅
✔️  /[\q{}]/vi ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /[\q{}]/vi ∩ /[\q{foo|bar|baz}]/vi = ∅
✔️  /a/v ∩ /A/v = ∅
❌  /a/v ∩ /[aA]/v = ∅
❌  /a/v ∩ /[aA]/vi = ∅
❌  /a/v ∩ /a/vi = ∅
✔️  /a/v ∩ /[\q{aa}]/vi = ∅
✔️  /a/v ∩ /[\q{aa|aA|Aa|AA}]/v = ∅
✔️  /a/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/v = ∅
✔️  /a/v ∩ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = ∅
✔️  /a/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /a/v ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /a/v ∩ /[\w\q{foo|bar}]/v = ∅
❌  /a/v ∩ /[\w\q{foo|bar}]/vi = ∅
❌  /a/v ∩ /[\w\q{foo|bar|food}]/v = ∅
❌  /a/v ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /a/v ∩ /[\q{foo|foot|food}]/v = ∅
❌  /a/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
❌  /a/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /a/v ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /A/v ∩ /[aA]/v = ∅
❌  /A/v ∩ /[aA]/vi = ∅
❌  /A/v ∩ /a/vi = ∅
✔️  /A/v ∩ /[\q{aa}]/vi = ∅
✔️  /A/v ∩ /[\q{aa|aA|Aa|AA}]/v = ∅
✔️  /A/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/v = ∅
✔️  /A/v ∩ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = ∅
✔️  /A/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /A/v ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /A/v ∩ /[\w\q{foo|bar}]/v = ∅
❌  /A/v ∩ /[\w\q{foo|bar}]/vi = ∅
❌  /A/v ∩ /[\w\q{foo|bar|food}]/v = ∅
❌  /A/v ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /A/v ∩ /[\q{foo|foot|food}]/v = ∅
❌  /A/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
❌  /A/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /A/v ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[aA]/v ∩ /[aA]/vi = ∅
❌  /[aA]/v ∩ /a/vi = ∅
✔️  /[aA]/v ∩ /[\q{aa}]/vi = ∅
✔️  /[aA]/v ∩ /[\q{aa|aA|Aa|AA}]/v = ∅
✔️  /[aA]/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/v = ∅
✔️  /[aA]/v ∩ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = ∅
✔️  /[aA]/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /[aA]/v ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /[aA]/v ∩ /[\w\q{foo|bar}]/v = ∅
❌  /[aA]/v ∩ /[\w\q{foo|bar}]/vi = ∅
❌  /[aA]/v ∩ /[\w\q{foo|bar|food}]/v = ∅
❌  /[aA]/v ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /[aA]/v ∩ /[\q{foo|foot|food}]/v = ∅
❌  /[aA]/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
❌  /[aA]/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /[aA]/v ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[aA]/vi ∩ /a/vi = ∅
✔️  /[aA]/vi ∩ /[\q{aa}]/vi = ∅
✔️  /[aA]/vi ∩ /[\q{aa|aA|Aa|AA}]/v = ∅
✔️  /[aA]/vi ∩ /[\q{aa|aA|Aa|AA|aaa}]/v = ∅
✔️  /[aA]/vi ∩ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = ∅
✔️  /[aA]/vi ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /[aA]/vi ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /[aA]/vi ∩ /[\w\q{foo|bar}]/v = ∅
❌  /[aA]/vi ∩ /[\w\q{foo|bar}]/vi = ∅
❌  /[aA]/vi ∩ /[\w\q{foo|bar|food}]/v = ∅
❌  /[aA]/vi ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /[aA]/vi ∩ /[\q{foo|foot|food}]/v = ∅
❌  /[aA]/vi ∩ /[\w\q{foo|foot|food}]/vi = ∅
❌  /[aA]/vi ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /[aA]/vi ∩ /[\q{foo|bar|baz}]/vi = ∅
✔️  /a/vi ∩ /[\q{aa}]/vi = ∅
✔️  /a/vi ∩ /[\q{aa|aA|Aa|AA}]/v = ∅
✔️  /a/vi ∩ /[\q{aa|aA|Aa|AA|aaa}]/v = ∅
✔️  /a/vi ∩ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = ∅
✔️  /a/vi ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /a/vi ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /a/vi ∩ /[\w\q{foo|bar}]/v = ∅
❌  /a/vi ∩ /[\w\q{foo|bar}]/vi = ∅
❌  /a/vi ∩ /[\w\q{foo|bar|food}]/v = ∅
❌  /a/vi ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /a/vi ∩ /[\q{foo|foot|food}]/v = ∅
❌  /a/vi ∩ /[\w\q{foo|foot|food}]/vi = ∅
❌  /a/vi ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /a/vi ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\q{aa}]/vi ∩ /[\q{aa|aA|Aa|AA}]/v = ∅
❌  /[\q{aa}]/vi ∩ /[\q{aa|aA|Aa|AA|aaa}]/v = ∅
❌  /[\q{aa}]/vi ∩ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = ∅
❌  /[\q{aa}]/vi ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /[\q{aa}]/vi ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
✔️  /[\q{aa}]/vi ∩ /[\w\q{foo|bar}]/v = ∅
✔️  /[\q{aa}]/vi ∩ /[\w\q{foo|bar}]/vi = ∅
✔️  /[\q{aa}]/vi ∩ /[\w\q{foo|bar|food}]/v = ∅
✔️  /[\q{aa}]/vi ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /[\q{aa}]/vi ∩ /[\q{foo|foot|food}]/v = ∅
✔️  /[\q{aa}]/vi ∩ /[\w\q{foo|foot|food}]/vi = ∅
✔️  /[\q{aa}]/vi ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /[\q{aa}]/vi ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\q{aa|aA|Aa|AA}]/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/v = ∅
❌  /[\q{aa|aA|Aa|AA}]/v ∩ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = ∅
❌  /[\q{aa|aA|Aa|AA}]/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /[\q{aa|aA|Aa|AA}]/v ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA}]/v ∩ /[\w\q{foo|bar}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA}]/v ∩ /[\w\q{foo|bar}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA}]/v ∩ /[\w\q{foo|bar|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA}]/v ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA}]/v ∩ /[\q{foo|foot|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA}]/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA}]/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA}]/v ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ∩ /[\q{aa|aA|Aa|AA|aaa|aAa}]/v = ∅
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /[\q{aa|aA|Aa|AA|aaa}]/v ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ∩ /[\w\q{foo|bar}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ∩ /[\w\q{foo|bar}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ∩ /[\w\q{foo|bar|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ∩ /[\q{foo|foot|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/v ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ∩ /[\q{aa|aA|Aa|AA|aaa}]/vi = ∅
❌  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ∩ /[\w\q{foo|bar}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ∩ /[\w\q{foo|bar}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ∩ /[\w\q{foo|bar|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ∩ /[\q{foo|foot|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa|aAa}]/v ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\q{aa|aA|Aa|AA|aaa}]/vi ∩ /[\q{a|aa|aA|Aa|AA|aaa}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|bar}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|bar}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|bar|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ∩ /[\q{foo|foot|food}]/v = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|foot|food}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /[\q{aa|aA|Aa|AA|aaa}]/vi ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|bar}]/v = ∅
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|bar}]/vi = ∅
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|bar|food}]/v = ∅
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|foot|food}]/v = ∅
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ∩ /[\q{foo|foot|food}]/v = ∅
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|foot|food}]/vi = ∅
❌  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ∩ /[\w\q{foo|bar|baz}]/vi = ∅
✔️  /[\q{a|aa|aA|Aa|AA|aaa}]/vi ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\w\q{foo|bar}]/v ∩ /[\w\q{foo|bar}]/vi = ∅
❌  /[\w\q{foo|bar}]/v ∩ /[\w\q{foo|bar|food}]/v = ∅
❌  /[\w\q{foo|bar}]/v ∩ /[\w\q{foo|foot|food}]/v = ∅
❌  /[\w\q{foo|bar}]/v ∩ /[\q{foo|foot|food}]/v = ∅
❌  /[\w\q{foo|bar}]/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
❌  /[\w\q{foo|bar}]/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
❌  /[\w\q{foo|bar}]/v ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\w\q{foo|bar}]/vi ∩ /[\w\q{foo|bar|food}]/v = ∅
❌  /[\w\q{foo|bar}]/vi ∩ /[\w\q{foo|foot|food}]/v = ∅
❌  /[\w\q{foo|bar}]/vi ∩ /[\q{foo|foot|food}]/v = ∅
❌  /[\w\q{foo|bar}]/vi ∩ /[\w\q{foo|foot|food}]/vi = ∅
❌  /[\w\q{foo|bar}]/vi ∩ /[\w\q{foo|bar|baz}]/vi = ∅
❌  /[\w\q{foo|bar}]/vi ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\w\q{foo|bar|food}]/v ∩ /[\w\q{foo|foot|food}]/v = ∅
❌  /[\w\q{foo|bar|food}]/v ∩ /[\q{foo|foot|food}]/v = ∅
❌  /[\w\q{foo|bar|food}]/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
❌  /[\w\q{foo|bar|food}]/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
❌  /[\w\q{foo|bar|food}]/v ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\w\q{foo|foot|food}]/v ∩ /[\q{foo|foot|food}]/v = ∅
❌  /[\w\q{foo|foot|food}]/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
❌  /[\w\q{foo|foot|food}]/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
❌  /[\w\q{foo|foot|food}]/v ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\q{foo|foot|food}]/v ∩ /[\w\q{foo|foot|food}]/vi = ∅
❌  /[\q{foo|foot|food}]/v ∩ /[\w\q{foo|bar|baz}]/vi = ∅
❌  /[\q{foo|foot|food}]/v ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\w\q{foo|foot|food}]/vi ∩ /[\w\q{foo|bar|baz}]/vi = ∅
❌  /[\w\q{foo|foot|food}]/vi ∩ /[\q{foo|bar|baz}]/vi = ∅
❌  /[\w\q{foo|bar|baz}]/vi ∩ /[\q{foo|bar|baz}]/vi = ∅
`;
