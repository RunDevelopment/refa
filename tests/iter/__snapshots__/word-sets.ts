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
["62"]
["64"]
["0-ffff"]
["61-62","0-ffff"]
["63","0-ffff"]
["0-ffff","62"]
["0-ffff","61"]
["0-ffff","0-ffff"]
["64","62"]
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
["63"]
["62"]
["61"]
["61","63"]
["61","62"]
["61","61"]
["62","63"]
["62","62"]
["63","63"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /a+b*c+/"] = `
["61","63"]
["61","61","63"]
["61","62","63"]
["61","63","63"]
["61","63","63","63"]
["61","62","62","63"]
["61","62","63","63"]
["61","61","61","63"]
["61","61","62","63"]
["61","61","63","63"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /a+b+c+/"] = `
["61","62","63"]
["61","62","62","63"]
["61","62","63","63"]
["61","61","62","63"]
["61","61","62","62","63"]
["61","61","62","63","63"]
["61","61","61","62","63"]
["61","62","63","63","63"]
["61","62","62","62","63"]
["61","62","62","63","63"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /a+(?:d+|e+)?/"] = `
["61"]
["61","65"]
["61","64"]
["61","61"]
["61","61","65"]
["61","61","64"]
["61","61","61"]
["61","64","64"]
["61","65","65"]
["61","65","65","65"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> NFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
["30-39"]
["30-39","2e"]
["30-39","30-39"]
["2e","30-39"]
["2e","30-39","30-39"]
["30-39","30-39","2e"]
["30-39","30-39","30-39"]
["30-39","2e","30-39"]
["30-39","45 65","30-39"]
["30-39","45 65","2b 2d","30-39"]
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
["62","62"]
["64","64"]
["64","62"]
["63","0-ffff"]
["0-ffff","0-ffff"]
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
["62"]
["61"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /aa|b/"] = `
["62"]
["61","61"]
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
["63","63"]
["62","62"]
["62","63"]
["61","61"]
["61","62"]
["61","63"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /a+b*c+/"] = `
["61","63"]
["61","63","63"]
["61","62","63"]
["61","61","63"]
["61","61","63","63"]
["61","61","62","63"]
["61","61","61","63"]
["61","62","63","63"]
["61","62","62","63"]
["61","63","63","63"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /a+b+c+/"] = `
["61","62","63"]
["61","61","62","63"]
["61","62","63","63"]
["61","62","62","63"]
["61","62","62","63","63"]
["61","62","62","62","63"]
["61","62","63","63","63"]
["61","61","61","62","63"]
["61","61","62","63","63"]
["61","61","62","62","63"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /a+(?:d+|e+)?/"] = `
["61"]
["61","61"]
["61","64"]
["61","65"]
["61","65","65"]
["61","64","64"]
["61","61","61"]
["61","61","64"]
["61","61","65"]
["61","61","65","65"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> ENFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
["30-39"]
["2e","30-39"]
["30-39","30-39"]
["30-39","2e"]
["30-39","2e","30-39"]
["30-39","45 65","30-39"]
["30-39","30-39","30-39"]
["30-39","30-39","2e"]
["2e","30-39","30-39"]
["2e","30-39","45 65","30-39"]
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
["64"]
["63"]
["62"]
["61"]
["0-60 65-ffff"]
["0-60 65-ffff","62"]
["0-60 65-ffff","61"]
["0-60 65-ffff","0-60 63-ffff"]
["61","63"]
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
["63"]
["62"]
["61"]
["61","63"]
["61","62"]
["61","61"]
["62","63"]
["62","62"]
["63","63"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /a+b*c+/"] = `
["61","63"]
["61","61","63"]
["61","62","63"]
["61","63","63"]
["61","63","63","63"]
["61","62","62","63"]
["61","62","63","63"]
["61","61","61","63"]
["61","61","62","63"]
["61","61","63","63"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /a+b+c+/"] = `
["61","62","63"]
["61","62","62","63"]
["61","62","63","63"]
["61","61","62","63"]
["61","61","62","62","63"]
["61","61","62","63","63"]
["61","61","61","62","63"]
["61","62","63","63","63"]
["61","62","62","62","63"]
["61","62","62","63","63"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /a+(?:d+|e+)?/"] = `
["61"]
["61","65"]
["61","64"]
["61","61"]
["61","61","65"]
["61","61","64"]
["61","61","61"]
["61","64","64"]
["61","65","65"]
["61","65","65","65"]
`.slice(1, -1);

module.exports["word sets >> iterateWordSets >> DFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
["30-39"]
["2e","30-39"]
["30-39","30-39"]
["30-39","2e"]
["30-39","2e","30-39"]
["30-39","30-39","30-39"]
["30-39","30-39","2e"]
["30-39","45 65","30-39"]
["2e","30-39","30-39"]
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

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /[]/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /(?:)/"] = `
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /[^]?/"] = `
["0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /[^]*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /[^]+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /[^]{0,5}/"] = `
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /a/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /a|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /aa|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /a+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /a*/"] = `
["0-60 62-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /a*b*c*/"] = `
["0-60 64-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /a+b*c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /a+b+c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /a+(?:d+|e+)?/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> NFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /[]/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /(?:)/"] = `
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /[^]?/"] = `
["0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /[^]*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /[^]+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /[^]{0,5}/"] = `
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /a/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /a|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /aa|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /a+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /a*/"] = `
["0-60 62-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /a*b*c*/"] = `
["0-60 64-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /a+b*c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /a+b+c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /a+(?:d+|e+)?/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> ENFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /[]/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /(?:)/"] = `
["0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /[^]?/"] = `
["0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /[^]*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /[ab]{0,7}c?[^]+a*b?|d*b*/"] = `
none
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /[^]+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /[^]{0,5}/"] = `
["0-ffff","0-ffff","0-ffff","0-ffff","0-ffff","0-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /a/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /a|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /aa|b/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /a+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /a*/"] = `
["0-60 62-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /a*b*c*/"] = `
["0-60 64-ffff"]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /a+b*c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /a+b+c+/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /a+(?:d+|e+)?/"] = `
[]
`.slice(1, -1);

module.exports["word sets >> shortestRejectingWordSet >> DFA >> /(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?/i"] = `
[]
`.slice(1, -1);
