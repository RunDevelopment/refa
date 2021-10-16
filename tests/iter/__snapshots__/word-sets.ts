/* eslint-disable */

module.exports["word sets >> iterateWordSets >> NFA >> /[]/"] = `

`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /(?:)/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /[^]?/"] = `
[]
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /[^]*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /[^]+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /[^]{0,5}/"] = `
[]
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /a/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /a|b/"] = `
["61-62"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /aa|b/"] = `
["62"]
["61","61"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /ab|ba/"] = `
["61","62"]
["62","61"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /a+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /a*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /a*b*c*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /a+b*c+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /a+b+c+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /a+(?:d+|e+)?/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /[]/"] = `

`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /(?:)/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /[^]?/"] = `
[]
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /[^]*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /[^]+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /[^]{0,5}/"] = `
[]
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /a/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /a|b/"] = `
["61"]
["62"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /aa|b/"] = `
["62"]
["61","61"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /ab|ba/"] = `
["61","62"]
["62","61"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /a+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /a*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /a*b*c*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /a+b*c+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /a+b+c+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /a+(?:d+|e+)?/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /[]/"] = `

`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /(?:)/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /[^]?/"] = `
[]
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /[^]*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /[^]+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /[^]{0,5}/"] = `
[]
["0-ffff"]
["0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff"]
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /a/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /a|b/"] = `
["61-62"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /aa|b/"] = `
["62"]
["61","61"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /ab|ba/"] = `
["61","62"]
["62","61"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /a+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /a*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /a*b*c*/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /a+b*c+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /a+b+c+/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /a+(?:d+|e+)?/"] = `
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
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
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
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /[]/"] = `
none
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /(?:)/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /[^]?/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /[^]*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /[^]+/"] = `
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /[^]{0,5}/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /a/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /a|b/"] = `
["61-62"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /aa|b/"] = `
["62"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /ab|ba/"] = `
["61","62"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /a+/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /a*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /a*b*c*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /a+b*c+/"] = `
["61","63"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /a+b+c+/"] = `
["61","62","63"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /a+(?:d+|e+)?/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> NFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
["30-39"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /[]/"] = `
none
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /(?:)/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /[^]?/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /[^]*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /[^]+/"] = `
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /[^]{0,5}/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /a/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /a|b/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /aa|b/"] = `
["62"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /ab|ba/"] = `
["61","62"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /a+/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /a*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /a*b*c*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /a+b*c+/"] = `
["61","63"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /a+b+c+/"] = `
["61","62","63"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /a+(?:d+|e+)?/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> ENFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
["30-39"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /[]/"] = `
none
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /(?:)/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /[^]?/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /[^]*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /[^]+/"] = `
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /[^]{0,5}/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /a/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /a|b/"] = `
["61-62"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /aa|b/"] = `
["62"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /ab|ba/"] = `
["61","62"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /a+/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /a*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /a*b*c*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /a+b*c+/"] = `
["61","63"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /a+b+c+/"] = `
["61","62","63"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /a+(?:d+|e+)?/"] = `
["61"]
`.slice(1, -1);

module.exports["word sets >> shortestWordSet >> DFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
["30-39"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /[]/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /(?:)/"] = `
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /[^]?/"] = `
["0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /[^]*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /[^]+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /[^]{0,5}/"] = `
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /a/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /a|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /aa|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /ab|ba/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /a+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /a*/"] = `
["0-60 62-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /a*b*c*/"] = `
["0-60 64-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /a+b*c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /a+b+c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /a+(?:d+|e+)?/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> NFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /[]/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /(?:)/"] = `
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /[^]?/"] = `
["0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /[^]*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /[^]+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /[^]{0,5}/"] = `
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /a/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /a|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /aa|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /ab|ba/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /a+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /a*/"] = `
["0-60 62-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /a*b*c*/"] = `
["0-60 64-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /a+b*c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /a+b+c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /a+(?:d+|e+)?/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> ENFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /[]/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /(?:)/"] = `
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /[^]?/"] = `
["0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /[^]*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /[^]+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /[^]{0,5}/"] = `
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /a/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /a|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /aa|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /ab|ba/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /a+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /a*/"] = `
["0-60 62-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /a*b*c*/"] = `
["0-60 64-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /a+b*c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /a+b+c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /a+(?:d+|e+)?/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /[]/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /(?:)/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /[^]?/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /[^]*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /[^]+/"] = `
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /[^]{0,5}/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /a/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /a|b/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /aa|b/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /ab|ba/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /a+/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /a*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /a*b*c*/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /a+b*c+/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /a+b+c+/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /a+(?:d+|e+)?/"] = `
none
`.slice(1, -1);

module.exports["word sets >> approximateRejectingWordSet >> DFA complement >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
none
`.slice(1, -1);
