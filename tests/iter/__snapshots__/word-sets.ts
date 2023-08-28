/* eslint-disable */

var unescapeBackslashes = (str: string): string => {
	return str.replace(/(\\*)(`|\$\{|\\$)/g, (m, backslashes: string, c: string) => {
		return "\\".repeat(Math.floor(backslashes.length / 2)) + c;
	});
};
var lit = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(1, -1));
};
var n = (array: TemplateStringsArray): string => {
	return unescapeBackslashes(array.raw[0].slice(0, -1));
};

module.exports[n`word sets >> iterateWordSets >> NFA >> /[]/ `] = lit`

`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /(?:)/ `] = lit`
[]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /[^]?/ `] = lit`
[]
["0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /[^]*/ `] = lit`
[]
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/ `] = lit`
[]
["0-ffff"]
["64"]
["62"]
["61-62","0-ffff"]
["63","0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","61"]
["0-ffff","62"]
["64","64"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /[^]+/ `] = lit`
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /[^]{0,5}/ `] = lit`
[]
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /a/ `] = lit`
["61"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /a|b/ `] = lit`
["61-62"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /aa|b/ `] = lit`
["62"]
["61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /ab|ba/ `] = lit`
["61","62"]
["62","61"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /a+/ `] = lit`
["61"]
["61","61"]
["61","61","61"]
["61","61","61","61"]
["61","61","61","61","61"]
["61","61","61","61","61","61"]
["61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61","61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /a*/ `] = lit`
[]
["61"]
["61","61"]
["61","61","61"]
["61","61","61","61"]
["61","61","61","61","61"]
["61","61","61","61","61","61"]
["61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /a*b*c*/ `] = lit`
[]
["61"]
["62"]
["63"]
["61","61"]
["61","62"]
["61","63"]
["62","62"]
["62","63"]
["63","63"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /a+b*c+/ `] = lit`
["61","63"]
["61","61","63"]
["61","62","63"]
["61","63","63"]
["61","61","61","63"]
["61","61","62","63"]
["61","61","63","63"]
["61","62","62","63"]
["61","62","63","63"]
["61","63","63","63"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /a+b+c+/ `] = lit`
["61","62","63"]
["61","61","62","63"]
["61","62","62","63"]
["61","62","63","63"]
["61","61","61","62","63"]
["61","61","62","62","63"]
["61","61","62","63","63"]
["61","62","62","62","63"]
["61","62","62","63","63"]
["61","62","63","63","63"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /a+(?:d+|e+)?/ `] = lit`
["61"]
["61","61"]
["61","64"]
["61","65"]
["61","61","61"]
["61","61","64"]
["61","61","65"]
["61","64","64"]
["61","65","65"]
["61","61","61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> NFA >> /(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i `] = lit`
["30-39"]
["30-39","30-39"]
["30-39","2e"]
["2e","30-39"]
["30-39","30-39","30-39"]
["30-39","30-39","2e"]
["30-39","2e","30-39"]
["30-39","45 65","30-39"]
["2e","30-39","30-39"]
["30-39","30-39","30-39","30-39"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /[]/ `] = lit`

`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /(?:)/ `] = lit`
[]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /[^]?/ `] = lit`
[]
["0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /[^]*/ `] = lit`
[]
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/ `] = lit`
[]
["0-ffff"]
["64"]
["62"]
["61-62","0-ffff"]
["63","0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","61"]
["0-ffff","62"]
["64","64"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /[^]+/ `] = lit`
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /[^]{0,5}/ `] = lit`
[]
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /a/ `] = lit`
["61"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /a|b/ `] = lit`
["61"]
["62"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /aa|b/ `] = lit`
["62"]
["61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /ab|ba/ `] = lit`
["61","62"]
["62","61"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /a+/ `] = lit`
["61"]
["61","61"]
["61","61","61"]
["61","61","61","61"]
["61","61","61","61","61"]
["61","61","61","61","61","61"]
["61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61","61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /a*/ `] = lit`
[]
["61"]
["61","61"]
["61","61","61"]
["61","61","61","61"]
["61","61","61","61","61"]
["61","61","61","61","61","61"]
["61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /a*b*c*/ `] = lit`
[]
["61"]
["62"]
["63"]
["61","61"]
["61","62"]
["61","63"]
["62","62"]
["62","63"]
["63","63"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /a+b*c+/ `] = lit`
["61","63"]
["61","61","63"]
["61","62","63"]
["61","63","63"]
["61","61","61","63"]
["61","61","62","63"]
["61","61","63","63"]
["61","62","62","63"]
["61","62","63","63"]
["61","63","63","63"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /a+b+c+/ `] = lit`
["61","62","63"]
["61","61","62","63"]
["61","62","62","63"]
["61","62","63","63"]
["61","61","61","62","63"]
["61","61","62","62","63"]
["61","61","62","63","63"]
["61","62","62","62","63"]
["61","62","62","63","63"]
["61","62","63","63","63"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /a+(?:d+|e+)?/ `] = lit`
["61"]
["61","61"]
["61","64"]
["61","65"]
["61","61","61"]
["61","61","64"]
["61","61","65"]
["61","64","64"]
["61","65","65"]
["61","61","61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> ENFA >> /(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i `] = lit`
["30-39"]
["30-39","30-39"]
["30-39","2e"]
["2e","30-39"]
["30-39","30-39","30-39"]
["30-39","30-39","2e"]
["30-39","2e","30-39"]
["30-39","45 65","30-39"]
["2e","30-39","30-39"]
["30-39","30-39","30-39","30-39"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /[]/ `] = lit`

`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /(?:)/ `] = lit`
[]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /[^]?/ `] = lit`
[]
["0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /[^]*/ `] = lit`
[]
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/ `] = lit`
[]
["0-60 65-ffff"]
["61"]
["62"]
["63"]
["64"]
["0-60 65-ffff","0-60 63-ffff"]
["0-60 65-ffff","61"]
["0-60 65-ffff","62"]
["61","0-60 64-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /[^]+/ `] = lit`
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /[^]{0,5}/ `] = lit`
[]
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /a/ `] = lit`
["61"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /a|b/ `] = lit`
["61-62"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /aa|b/ `] = lit`
["62"]
["61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /ab|ba/ `] = lit`
["61","62"]
["62","61"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /a+/ `] = lit`
["61"]
["61","61"]
["61","61","61"]
["61","61","61","61"]
["61","61","61","61","61"]
["61","61","61","61","61","61"]
["61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61","61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /a*/ `] = lit`
[]
["61"]
["61","61"]
["61","61","61"]
["61","61","61","61"]
["61","61","61","61","61"]
["61","61","61","61","61","61"]
["61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61"]
["61","61","61","61","61","61","61","61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /a*b*c*/ `] = lit`
[]
["61"]
["62"]
["63"]
["61","61"]
["61","62"]
["61","63"]
["62","62"]
["62","63"]
["63","63"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /a+b*c+/ `] = lit`
["61","63"]
["61","61","63"]
["61","62","63"]
["61","63","63"]
["61","61","61","63"]
["61","61","62","63"]
["61","61","63","63"]
["61","62","62","63"]
["61","62","63","63"]
["61","63","63","63"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /a+b+c+/ `] = lit`
["61","62","63"]
["61","61","62","63"]
["61","62","62","63"]
["61","62","63","63"]
["61","61","61","62","63"]
["61","61","62","62","63"]
["61","61","62","63","63"]
["61","62","62","62","63"]
["61","62","62","63","63"]
["61","62","63","63","63"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /a+(?:d+|e+)?/ `] = lit`
["61"]
["61","61"]
["61","64"]
["61","65"]
["61","61","61"]
["61","61","64"]
["61","61","65"]
["61","64","64"]
["61","65","65"]
["61","61","61","61"]
`;

module.exports[n`word sets >> iterateWordSets >> DFA >> /(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i `] = lit`
["30-39"]
["2e","30-39"]
["30-39","2e"]
["30-39","30-39"]
["2e","30-39","30-39"]
["30-39","2e","30-39"]
["30-39","30-39","2e"]
["30-39","30-39","30-39"]
["30-39","45 65","30-39"]
["2e","30-39","30-39","30-39"]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /[]/ `] = lit`
none
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /(?:)/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /[^]?/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /[^]*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /[^]+/ `] = lit`
["0-ffff"]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /[^]{0,5}/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /a/ `] = lit`
["61"]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /a|b/ `] = lit`
["61-62"]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /aa|b/ `] = lit`
["62"]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /ab|ba/ `] = lit`
["61","62"]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /a+/ `] = lit`
["61"]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /a*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /a*b*c*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /a+b*c+/ `] = lit`
["61","63"]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /a+b+c+/ `] = lit`
["61","62","63"]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /a+(?:d+|e+)?/ `] = lit`
["61"]
`;

module.exports[n`word sets >> shortestWordSet >> NFA >> /(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i `] = lit`
["30-39"]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /[]/ `] = lit`
none
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /(?:)/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /[^]?/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /[^]*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /[^]+/ `] = lit`
["0-ffff"]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /[^]{0,5}/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /a/ `] = lit`
["61"]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /a|b/ `] = lit`
["61"]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /aa|b/ `] = lit`
["62"]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /ab|ba/ `] = lit`
["61","62"]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /a+/ `] = lit`
["61"]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /a*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /a*b*c*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /a+b*c+/ `] = lit`
["61","63"]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /a+b+c+/ `] = lit`
["61","62","63"]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /a+(?:d+|e+)?/ `] = lit`
["61"]
`;

module.exports[n`word sets >> shortestWordSet >> ENFA >> /(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i `] = lit`
["30-39"]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /[]/ `] = lit`
none
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /(?:)/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /[^]?/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /[^]*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /[^]+/ `] = lit`
["0-ffff"]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /[^]{0,5}/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /a/ `] = lit`
["61"]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /a|b/ `] = lit`
["61-62"]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /aa|b/ `] = lit`
["62"]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /ab|ba/ `] = lit`
["61","62"]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /a+/ `] = lit`
["61"]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /a*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /a*b*c*/ `] = lit`
[]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /a+b*c+/ `] = lit`
["61","63"]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /a+b+c+/ `] = lit`
["61","62","63"]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /a+(?:d+|e+)?/ `] = lit`
["61"]
`;

module.exports[n`word sets >> shortestWordSet >> DFA >> /(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i `] = lit`
["30-39"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /[]/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /(?:)/ `] = lit`
["0-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /[^]?/ `] = lit`
["0-ffff","0-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /[^]*/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /[^]+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /[^]{0,5}/ `] = lit`
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /a/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /a|b/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /aa|b/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /ab|ba/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /a+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /a*/ `] = lit`
["0-60 62-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /a*b*c*/ `] = lit`
["0-60 64-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /a+b*c+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /a+b+c+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /a+(?:d+|e+)?/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> NFA >> /(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /[]/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /(?:)/ `] = lit`
["0-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /[^]?/ `] = lit`
["0-ffff","0-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /[^]*/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /[^]+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /[^]{0,5}/ `] = lit`
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /a/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /a|b/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /aa|b/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /ab|ba/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /a+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /a*/ `] = lit`
["0-60 62-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /a*b*c*/ `] = lit`
["0-60 64-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /a+b*c+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /a+b+c+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /a+(?:d+|e+)?/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> ENFA >> /(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /[]/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /(?:)/ `] = lit`
["0-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /[^]?/ `] = lit`
["0-ffff","0-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /[^]*/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /[^]+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /[^]{0,5}/ `] = lit`
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /a/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /a|b/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /aa|b/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /ab|ba/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /a+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /a*/ `] = lit`
["0-60 62-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /a*b*c*/ `] = lit`
["0-60 64-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /a+b*c+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /a+b+c+/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /a+(?:d+|e+)?/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA >> /(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /[]/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /(?:)/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /[^]?/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /[^]*/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /[ab]{0,7}c?[^]+a*b?|d*b*/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /[^]+/ `] = lit`
["0-ffff"]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /[^]{0,5}/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /a/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /a|b/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /aa|b/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /ab|ba/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /a+/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /a*/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /a*b*c*/ `] = lit`
[]
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /a+b*c+/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /a+b+c+/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /a+(?:d+|e+)?/ `] = lit`
none
`;

module.exports[n`word sets >> approximateRejectingWordSet >> DFA complement >> /(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i `] = lit`
none
`;
