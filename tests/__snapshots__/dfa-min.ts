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

module.exports[n`DFA minimization >> 0: /<!--[\s\S]*?-->/ `] = lit`
Pj2XNiUh2RAKJIx1+UfXBSfctIdaGuGl5/VxhoQo0EE=
`;

module.exports[n`DFA minimization >> 1: /<\?[\s\S]+?\?>/ `] = lit`
5/BSkQvMJ7jFlEYaUhyQSWDEi52ve0HWeZ1qH+3bZE4=
`;

module.exports[n`DFA minimization >> 2: /<!\[CDATA\[[\s\S]*?]]>/i `] = lit`
RSDOoVta4/01XJw8LiVAp64QRt3w2HuhnFfzEH7JBCE=
`;

module.exports[n`DFA minimization >> 3: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--... `] = lit`
2STSfPUgo0XxNdq2LFjInmBjxzfwuH5zfiWBF4myJXI=
`;

module.exports[n`DFA minimization >> 4: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"... `] = lit`
i9AXU7FEHDH8AW+yp3T7egcPjoadjIYKh5v/5VSQzB8=
`;

module.exports[n`DFA minimization >> 5: /&#x?[\da-f]{1,8};/i `] = lit`
tfySmZtBT6BqNJ2zTeu+FIJX9Hb7seqLsYAPbPIgXqA=
`;

module.exports[n`DFA minimization >> 6: /^<!|>$|[[\]]/ `] = lit`
2DASRJ8g4XT7p7+jLXL+iz8UF2VauP7abSOyJMVt1ps=
`;

module.exports[n`DFA minimization >> 7: /^DOCTYPE/ `] = lit`
x14YUfI6AK62FSMsrBF9xUTywhs/HZ1NVMJ97Dmynu8=
`;

module.exports[n`DFA minimization >> 8: /[^\s<>'"]+/ `] = lit`
D5xs4mw8ckN6mcr4Bj/5VgxbTyQ0AP8CwLGrawNW5hE=
`;

module.exports[n`DFA minimization >> 9: /\/?>/ `] = lit`
+fVFzMDWEvr8fmlpdvRqM/8xlsng4MOfD6CrYL97mSc=
`;

module.exports[n`DFA minimization >> 10: /&[\da-z]{1,8};/i `] = lit`
b8otTJ0l3vvwTEF5ByHwQ3d/iHCSuuj91FrG2AKgZnY=
`;

module.exports[n`DFA minimization >> 11: /(\[)[\s\S]+(?=\]>$)/ `] = lit`
TjDXkFCwMJM6uZdVBxkMFsfYXxHS6jgbG0LkI1jLs+Y=
`;

module.exports[n`DFA minimization >> 12: /"[^"]*"|'[^']*'/ `] = lit`
ZRpEwG/Wb2ql6peH48ZpaKjiLofTHQH48nhnY0aBM2M=
`;

module.exports[n`DFA minimization >> 13: /^<\/?[^\s>\/]+/ `] = lit`
K4Td0yGmpHOVngTtNJ+9cXY6YbkucXOFruGrqEQgiKg=
`;

module.exports[n`DFA minimization >> 14: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/ `] = lit`
0LoycgVpIgz+wm/w2YNNcHJgCycW+j5YQMAgns5xxfw=
`;

module.exports[n`DFA minimization >> 15: /[^\s>\/]+/ `] = lit`
BQxHMPq3y4Qtq3p34ljnAvptANavUmGPB6edVZHCtaU=
`;

module.exports[n`DFA minimization >> 16: /^<\/?/ `] = lit`
cVPeHFBVALAtgGK4NUV62WF/gzb+MpCP9GyVBDkuIj0=
`;

module.exports[n`DFA minimization >> 17: /^[^\s>\/:]+:/ `] = lit`
ibhz2KrwCC5xXAAaDb/DClN4ILh3cBevb6ecibMvw4k=
`;

module.exports[n`DFA minimization >> 18: /"|'/ `] = lit`
g6McrMH9hSG6PDcxY+s6WbLo0aQlCWFBNZyiHnazkFc=
`;

module.exports[n`DFA minimization >> 19: /^=/ `] = lit`
4aMh4gnPQjcDMSEx3iJeyM08ndzynUUGu4GyE+j1fZY=
`;

module.exports[n`DFA minimization >> 20: /\/\*[\s\S]*?\*\// `] = lit`
3/QnJVu/NaSTsyjzJIizqXhHW15xAsckn/miJLAUw2M=
`;

module.exports[n`DFA minimization >> 21: /[^{}\s](?:[^{};"']|("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1)*?(?=\s*\{)/ `] = lit`
S45zv4WD/Hp1eugKznlpQ5MHNXAsH6CcS+n5vk82EK8=
`;

module.exports[n`DFA minimization >> 22: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i `] = lit`
fk4D6q6zfeYERYdfKKBXGamaXOnQDL76TiDInR/sGTY=
`;

module.exports[n`DFA minimization >> 23: /!important\b/i `] = lit`
QVRWf6lY43X6zd9fSlD8YXOYBlXtpKh8n8KCM0Zl3PM=
`;

module.exports[n`DFA minimization >> 24: /[-a-z0-9]+(?=\()/i `] = lit`
w8eIVm8CYquFrFShnyUpxHqK/VXyzQSJjYBp/MxI1ao=
`;

module.exports[n`DFA minimization >> 25: /[(){};:,]/ `] = lit`
ZkZiLdOFTS5+qtb/TrUrW9BWRm12bb/+Nkjy3tX7GRw=
`;

module.exports[n`DFA minimization >> 26: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/ `] = lit`
jBmN4hiUGUiiACXhrmIPJA4iFzjX5DoQ/bZVeJoY6+o=
`;

module.exports[n`DFA minimization >> 27: /\burl\((?:("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|(?:[^\\\r\n()"']|\\[\s\... `] = lit`
GRhSdfznhnZWpzvhXRWJNRJuatVYtAvLEenWZUpe8Rg=
`;

module.exports[n`DFA minimization >> 28: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/ `] = lit`
Q5UebfbnC2qWVSIrnOyuIvXQv00m3dSvbFbNUeRgE6w=
`;

module.exports[n`DFA minimization >> 29: /^@[\w-]+/ `] = lit`
UvVdAz28J9+suPHrEuu14CDXvIF+J4nik+TZnW0QQio=
`;

module.exports[n`DFA minimization >> 30: /^url/i `] = lit`
U7f2g5KIvA470DMya4Zpds2V+LYL54rcX7iYlKNWnNU=
`;

module.exports[n`DFA minimization >> 31: /^\(|\)$/ `] = lit`
iAI7/Su0bzosQ0vbEy+aXVSrow0ZALjLD4H9+bGxiKw=
`;

module.exports[n`DFA minimization >> 32: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 33: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/ `] = lit`
U8G3uRYATe/QWGRpEYxFpElQfaA4Xscq4y/uT1Ovg8Q=
`;

module.exports[n`DFA minimization >> 34: /^("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1$/ `] = lit`
Q5UebfbnC2qWVSIrnOyuIvXQv00m3dSvbFbNUeRgE6w=
`;

module.exports[n`DFA minimization >> 35: /(<style[\s\S]*?>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])... `] = lit`
DpyMJrNYBkG4H7p08NZvTs52xjT3mlCUPX1wnyLP9h8=
`;

module.exports[n`DFA minimization >> 36: /<!\[CDATA\[[\s\S]*?\]\]>/i `] = lit`
RSDOoVta4/01XJw8LiVAp64QRt3w2HuhnFfzEH7JBCE=
`;

module.exports[n`DFA minimization >> 37: /[\s\S]+/ `] = lit`
jaSRELIgS9Ix2MehB//+JgZzneU7n2hA/cvXMvg5QUw=
`;

module.exports[n`DFA minimization >> 38: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i `] = lit`
UtwQb1Q4LurP3iKu9Hh0VkeRSQKuN30BqD64D2LJyz0=
`;

module.exports[n`DFA minimization >> 39: /^<!\[CDATA\[|\]\]>$/i `] = lit`
95MmAS8cfbpOL0w5WzL+gYOrxkkTLDrJ9kLgI69pEMo=
`;

module.exports[n`DFA minimization >> 40: /^\s*=\s*['"]|['"]\s*$/ `] = lit`
zkt0+AM4xva68f5/3Ewbznm8L10r6LAv+RKO2lwmZ6Y=
`;

module.exports[n`DFA minimization >> 41: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i `] = lit`
oNlddsrexPmC8fanma0DT/vu21n3gk/HkYC2nZgPC5c=
`;

module.exports[n`DFA minimization >> 42: /^\s*style/i `] = lit`
KwCWClLYcDO8ILUlJgNcz3TRMk6SmZL0vSFc2A/denE=
`;

module.exports[n`DFA minimization >> 43: /.+/i `] = lit`
rIhgRGY3kbL2VTfMGEqLkvsM/LV0ZOa8GsFYtkNr61w=
`;

module.exports[n`DFA minimization >> 44: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|fin... `] = lit`
JL6ybFY9vE7xb8UQbvZTDfe1OGEKL6kiAIhyS1tOHQg=
`;

module.exports[n`DFA minimization >> 45: /\b(?:true|false)\b/ `] = lit`
Y0ERb5x2lDpLVTFFKD4wZHkx7MNvFlYJJQCWPpf4OeI=
`;

module.exports[n`DFA minimization >> 46: /\w+(?=\()/ `] = lit`
UAgPJf0Lc8wZiLiOJNtXuWpzaXIWtsQlZyWok5MgdEQ=
`;

module.exports[n`DFA minimization >> 47: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i `] = lit`
vnm9KEc1j+lkhic0scUimNWlHobK9Ufk6ZCzoipLchY=
`;

module.exports[n`DFA minimization >> 48: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*\/~^%]/ `] = lit`
fCV4oTilLWLSSMqRCwaSvVoTgFPV8USgKVzUwTBRRgQ=
`;

module.exports[n`DFA minimization >> 49: /[{}[\];(),.:]/ `] = lit`
OHFTBemCtRyoCZfb2i6ku3etAe4ylzURp1HkiTlm7Ew=
`;

module.exports[n`DFA minimization >> 50: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/ `] = lit`
Q5UebfbnC2qWVSIrnOyuIvXQv00m3dSvbFbNUeRgE6w=
`;

module.exports[n`DFA minimization >> 51: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()... `] = lit`
R/VAXl0vDut64I7yeU61W/86BC/8pq4h1sLB0gnKR38=
`;

module.exports[n`DFA minimization >> 52: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/ `] = lit`
OBfC+SARE7Az++Sju6vgdTmum/eoGFna2OUaeVmni7Q=
`;

module.exports[n`DFA minimization >> 53: /(^|[^\\:])\/\/.*/ `] = lit`
/VNo7dkGBpbh1nRpyxZY09h9ICY57bTyVP6WuQu/Tuw=
`;

module.exports[n`DFA minimization >> 54: /[.\\]/ `] = lit`
K+AYGahUqn4v99Nwq+GZ8ZQmU+sGjvO9TFTOhdYvwFE=
`;

module.exports[n`DFA minimization >> 55: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ `] = lit`
SATPue1ZaksNYo2kUfGOzF4/20klUopvF6jogqEp/Zc=
`;

module.exports[n`DFA minimization >> 56: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\... `] = lit`
NfYlwcutyWAS/zPxcEYnQBRdQFwXy0M1RKPLcwNHCkY=
`;

module.exports[n`DFA minimization >> 57: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[... `] = lit`
D8ts4vT+6f2woFj/cVXqYRxAQEOO17il9b5msO3Jvzc=
`;

module.exports[n`DFA minimization >> 58: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*\/%&|^!=<>]=?|\.{3}|\?\?=?... `] = lit`
gb/+RP8I5cnaY3KNvlLYRzG6TI1bWE4UHpBWxys8DhA=
`;

module.exports[n`DFA minimization >> 59: /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/ `] = lit`
htCGxJFb+Kw5jqPcac4jaozDVkOSweVZ8Ijd5eHYw+o=
`;

module.exports[n`DFA minimization >> 60: /\`(?:\\[\s\S]|\\\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\\\${)[^\\\\\`])*\`/ `] = lit`
9FBe+O8fa31vFwQtOxoJQ5HARNkYFZz4FzTZQOtvb30=
`;

module.exports[n`DFA minimization >> 61: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\... `] = lit`
KYOCL0BT1w9e4z4ZGwvK/tPmaVD4ZExvOBoZrMz0NRE=
`;

module.exports[n`DFA minimization >> 62: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction... `] = lit`
prPL1fgVtvMHLnHGbG8x82ES7xkdsKXky/LGyi9ecqk=
`;

module.exports[n`DFA minimization >> 63: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|const... `] = lit`
6pNIF6OclaoiTLh6JEr3aQGliISoV7aPgaY9DE8RVBE=
`;

module.exports[n`DFA minimization >> 64: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|... `] = lit`
0KTaR5ot7Gh/nAqzdfUrm7r7xew430djOQIkT0cwvME=
`;

module.exports[n`DFA minimization >> 65: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i `] = lit`
9eLCIOMf4sN1/i57hSSLygUUVQ5R3noqPBIK911tFKo=
`;

module.exports[n`DFA minimization >> 66: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/ `] = lit`
gthF1oF/g/9KI+2PcB+HrTr/dn7VaRN17sPIs+ci/pY=
`;

module.exports[n`DFA minimization >> 67: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger... `] = lit`
6/SxgRv68LNsidecDaWA6L59I7jUTXaV73BrnfkdfaY=
`;

module.exports[n`DFA minimization >> 68: /((?:^|})\s*)(?:catch|finally)\b/ `] = lit`
A0EKZZi+JrnBIDvLSHUHIie/BjXSk7Y1wvxiCNCng2A=
`;

module.exports[n`DFA minimization >> 69: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|awai... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 70: /^\`|\`$/ `] = lit`
p7FHTHsk4i8OrXD2TLtQOWczKGLQTkhVODrqnTj/Yio=
`;

module.exports[n`DFA minimization >> 71: /((?:^|[^\\])(?:\\{2})*)\\\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/ `] = lit`
hqkMXgjpkqBJo7tuYyr8McEJLXFdFf/16MrElFWvLZQ=
`;

module.exports[n`DFA minimization >> 72: /^\\\${|}$/ `] = lit`
1M59/tycAMO4/JORJr3jTgBMP1AstPG+Rn21YQNNcW0=
`;

module.exports[n`DFA minimization >> 73: /(<script[\s\S]*?>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S]... `] = lit`
dCIeiJiUsE38ZYDs9URQ8nWCF3NOfjmMdGsTJ0ntFQc=
`;

module.exports[n`DFA minimization >> 74: /^\*.*/m `] = lit`
XESUycysWeTghZq8Y+HLtj0H61vOQA1yUZdbQcnlpm4=
`;

module.exports[n`DFA minimization >> 75: /(\`|')(?:\\.|(?!\1)[^\\\r\n])*\1/m `] = lit`
Bbx7o55KnVX08/XazVQtGQZXTgX/2SLHyNuVid2V9Ws=
`;

module.exports[n`DFA minimization >> 76: /\b\d+\b/ `] = lit`
T1tiIJjbJgPlEh6hZSYJgpqFViePCmBeCxRBY6JwWD0=
`;

module.exports[n`DFA minimization >> 77: /[,.:()]/ `] = lit`
UFK5iKxjqHmuC7mJGFgMUI3twmuK4J75oGUd+XSHLWY=
`;

module.exports[n`DFA minimization >> 78: /([|}])(?:\\.|[^\\|{\r\n])*(?=[|{])/ `] = lit`
OCNRct0c3CjDqI8+KAYQMW32IEymnB/PEUThzjgzrG8=
`;

module.exports[n`DFA minimization >> 79: /(^|\s)".*/m `] = lit`
v4Q4rjIeCI30rySs7rjR+gkLEA6Qz2eq0C1SvXTZGyg=
`;

module.exports[n`DFA minimization >> 81: /(\s)(?:\*\*?|<[=>]?|>=?|\?=|[-+\/=])(?=\s)/ `] = lit`
tsg3PGQGxCfDVrv5nyN/MCq1JJu0XJ8pQftJTwj+hOo=
`;

module.exports[n`DFA minimization >> 82: /(\s)&&?(?=\s)/ `] = lit`
R+rGsXl6joiIbRoH07ZKCJM/QU1Go6kkswjiiwnxTrI=
`;

module.exports[n`DFA minimization >> 83: /(\w)(?:->?|=>|[~|{}])(?=\w)/ `] = lit`
N5RntDF9JalXxk6litRAvo05OzD5wVtGG0hYtsCWX0E=
`;

module.exports[n`DFA minimization >> 84: /[|{}]/ `] = lit`
jz26ixptUFYttxbtInuFZqxTa+T6Rs8Wrm+8GC5cqt8=
`;

module.exports[n`DFA minimization >> 85: /;.*/ `] = lit`
/PoR6ZGPtYpU4SyeXidmnvJ6rhMHusfjHCA2g501ADM=
`;

module.exports[n`DFA minimization >> 86: /=\/?|\// `] = lit`
jsdC3yEA8noGkAunRnjNiT1LKhOtham5upc2Dx/4J8s=
`;

module.exports[n`DFA minimization >> 87: /[()\[\]]/ `] = lit`
Uw1iOUHxAKCfVL9YQwf5/+dHHFWXarYny8nZukmarNc=
`;

module.exports[n`DFA minimization >> 88: /(?:%[is])?"[^"\n\r]*"/ `] = lit`
9H/1TPInA5zes5gONm1TuGsehZUaiHT57d+a8ujDYYg=
`;

module.exports[n`DFA minimization >> 89: /%(?:b[01]+-[01]+|d\d+-\d+|x[A-F\d]+-[A-F\d]+)/i `] = lit`
cwhjacr3D5pItFaCiXW4txvCIZxy410KYDLim6x8v2A=
`;

module.exports[n`DFA minimization >> 90: /%(?:b[01]+(?:\.[01]+)*|d\d+(?:\.\d+)*|x[A-F\d]+(?:\.[A-F\d]+)*)/i `] = lit`
cKGDnPMZVOuEgFvTEOCCYKky9wLjwPpTu+im8Nm6WUA=
`;

module.exports[n`DFA minimization >> 91: /(^|[^\w-])(?:\d*\*\d*|\d+)/ `] = lit`
3gbZWiL5f6fOlUPui9QW5AN61z9Bz9tSsNs5ZeGsugw=
`;

module.exports[n`DFA minimization >> 92: /(^[ \t]*)(?:[a-z][\w-]*|<[^>\r\n]*>)(?=\s*=)/m `] = lit`
Q2kLKRSAt1/bG0oYx6LVz36CnjYD7uy8GDpzYkB9a/c=
`;

module.exports[n`DFA minimization >> 93: /(?:(^|[^<\w-])(?:ALPHA|BIT|CHAR|CR|CRLF|CTL|DIGIT|DQUOTE|HEXDIG|HTAB|LF|LWSP|OC... `] = lit`
fh6OVEPp8NZ9WnX2GDWk35HJ4lUNEqPjWD4vNvyzmKc=
`;

module.exports[n`DFA minimization >> 94: /(^|[^<\w-])[a-z][\w-]*|<[^>\r\n]*>/i `] = lit`
gpYBkubNV7skzRqVJIht2RzAMqovNXlmavFlEeY0rBo=
`;

module.exports[n`DFA minimization >> 95: /^%[is]/ `] = lit`
6qYqe+6b6Us+xxgxlCaAdo8IbsE/7zbfLWjayUnaHuE=
`;

module.exports[n`DFA minimization >> 96: /<|>/ `] = lit`
lV3wbmWVnhQXvq3YGN0Hd+DsQ8tEFC0VLhPKTWIrf1g=
`;

module.exports[n`DFA minimization >> 97: /\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for... `] = lit`
mHYInfDPJVP7gvrlkdycyIqFBRm0chhRzyouMlV8Z7k=
`;

module.exports[n`DFA minimization >> 98: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/ `] = lit`
Szpnb7o8nz7KwTmekdkGGtD5TwSGSY63xDccEfncspY=
`;

module.exports[n`DFA minimization >> 99: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/ `] = lit`
8iMhFbe3iyCTtra4Ju5NY6yqeE0oGzuj+bzpBic+T68=
`;

module.exports[n`DFA minimization >> 100: /--.*/ `] = lit`
SscIXrnwT1CzkHHjSw2O7nNhh1mkL1h1JEM/ejmvrVU=
`;

module.exports[n`DFA minimization >> 101: /"(?:""|[^"\r\f\n])*"/i `] = lit`
BZjDOQrUMaWtsxz4xJ+FJpQyrJEVFRThBEDDGsj0TVY=
`;

module.exports[n`DFA minimization >> 102: /\b'\w+/i `] = lit`
wEEKTJWw9huUPRObWXBOE21HzX1Fe/ay+YeowJ2xZNE=
`;

module.exports[n`DFA minimization >> 103: /\b(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|... `] = lit`
LmH6X4IZQMK4jjpKX/yXd66NuWJI9sOWd5iymOrPJgg=
`;

module.exports[n`DFA minimization >> 104: /\b(?:true|false)\b/i `] = lit`
kPiBOQvqbACAoKWacUeiIbdyS5DG8ByS7p6jUbRTaMI=
`;

module.exports[n`DFA minimization >> 105: /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/ `] = lit`
ZN62r1I8H63kSEfsjmg6D92A2HoONFvC7EN0wk/3uuQ=
`;

module.exports[n`DFA minimization >> 106: /\.\.?|[,;():]/ `] = lit`
XbGhbXG49yN/40+hk4Oxn5w1IHABJ92Amiy5YPt++8A=
`;

module.exports[n`DFA minimization >> 107: /'.'/ `] = lit`
4/9Q+R0zvFSawFFAFJ+89K4ZOHbhviJiazsMDltotGg=
`;

module.exports[n`DFA minimization >> 108: /\b[a-z](?:[_a-z\d])*\b/i `] = lit`
nQXGykkIH4U+y9Xl5CPghJ0lpUk4G5LNxvoKoZBxjFQ=
`;

module.exports[n`DFA minimization >> 109: /\b\d(?:_?\d)*#[\dA-F](?:_?[\dA-F])*(?:\.[\dA-F](?:_?[\dA-F])*)?#(?:E[+-]?\d(?:_... `] = lit`
GO6CNNWsT20+VvP3xF9mhBBYB2nWD+nN2GK7vwCzSRk=
`;

module.exports[n`DFA minimization >> 110: /\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:E[+-]?\d(?:_?\d)*)?\b/i `] = lit`
2GmfyP+Sh/GqB9dAPxO6xgAbhdGu6dVLfTAxSLTUDdg=
`;

module.exports[n`DFA minimization >> 111: /\{-[\s\S]*?(?:-\}|$)|--.*/ `] = lit`
cXUEkMSds8vYuSyb4gbNIT9xJ1He0kxedNtgjGq0nrA=
`;

module.exports[n`DFA minimization >> 112: /[(){}⦃⦄.;@]/ `] = lit`
BSqnQdmsSBS1YS45f8G5uL086k4gVR0pN7TxYkm0mt8=
`;

module.exports[n`DFA minimization >> 113: /\b(?:Set|abstract|constructor|data|eta-equality|field|forall|forall|hiding|impo... `] = lit`
7pZJN7UDBMg1+iH6JyyC/i+U9H+9dHRwepRakoi0dy4=
`;

module.exports[n`DFA minimization >> 114: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/ `] = lit`
X/VsFRO+bZjM6c4Dxc8SFvJc2/Z2V+dkzimQc8HUz5E=
`;

module.exports[n`DFA minimization >> 115: /((?:data|record) +)\S+/ `] = lit`
L+uC2XDG54ixXuWQpFQG70aC8Q+8J1suw1Jh8v8Q6Fs=
`;

module.exports[n`DFA minimization >> 116: /(^[ \t]*)[^:\r\n]+?(?=:)/m `] = lit`
KQY9CWQOb8AG39h+9JaK7cNItaZpcT3Zb7wfPysYZqo=
`;

module.exports[n`DFA minimization >> 117: /(^\s*|\s)(?:[=|:∀→λ\\?_]|->)(?=\s)/ `] = lit`
9fQ8weurQEEMbyNluMfCVi7e5OykpPfRQmTQl7ed+a4=
`;

module.exports[n`DFA minimization >> 118: /\/\/.*|\/\*[\s\S]*?\*\// `] = lit`
H7ZJEYBnhxKwCUevQceWv4B/nrFP6Rw0PPwY3o9tRsQ=
`;

module.exports[n`DFA minimization >> 119: /\b(?:0x[\da-f]+|(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(?:F|U(?:LL?)?|LL?)?\b/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 120: /\b(?:false|true)\b/i `] = lit`
kPiBOQvqbACAoKWacUeiIbdyS5DG8ByS7p6jUbRTaMI=
`;

module.exports[n`DFA minimization >> 121: /\b(?:Curr(?:FieldNo|Page|Report)|RequestOptionsPage|x?Rec)\b/ `] = lit`
YThURjOxBU+DHFtotHVPh0PkdcZfquSrPCnap7Nv1FI=
`;

module.exports[n`DFA minimization >> 123: /\.\.|:[=:]|[-+*\/]=?|<>|[<>]=?|=|\b(?:and|div|mod|not|or|xor)\b/i `] = lit`
5NcmfgvKhTyoKdSjjQi3ZTT9kRYe/YFekoWlwpEl/L0=
`;

module.exports[n`DFA minimization >> 124: /[()\[\]{}:.;,]/ `] = lit`
OHFTBemCtRyoCZfb2i6ku3etAe4ylzURp1HkiTlm7Ew=
`;

module.exports[n`DFA minimization >> 125: /'(?:''|[^'\r\n])*'(?!')|"(?:""|[^"\r\n])*"(?!")/ `] = lit`
8E6VwCZI4xnqwWbCq1DfmE0JU8SWmJSn1J4a1Jhq8ss=
`;

module.exports[n`DFA minimization >> 126: /(\b(?:event|procedure|trigger)\s+|(?:^|[^.])\.\s*)[a-z_]\w*(?=\s*\()/i `] = lit`
RngMje5Jr66tBp81iLyUTjQbVub1OheswKg6z9IphTA=
`;

module.exports[n`DFA minimization >> 127: /\b(?:array|asserterror|begin|break|case|do|downto|else|end|event|exit|for|forea... `] = lit`
VS92lTtzb/P9SkjqIpB3ho1PTWYR54VkqWtZm1w1EHU=
`;

module.exports[n`DFA minimization >> 128: /\b(?:action|actions|addafter|addbefore|addfirst|addlast|area|assembly|chartpart... `] = lit`
e3sellx+Sp/TZ44WmKYr8a4n8+B4o7IG2AqzugiexSw=
`;

module.exports[n`DFA minimization >> 129: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/ `] = lit`
JDZdALH3mqqbFycM6PuijeVJ+CSzOXRhAlXjYWvEUWs=
`;

module.exports[n`DFA minimization >> 130: /\b(?:catch|channels|finally|fragment|grammar|import|lexer|locals|mode|options|p... `] = lit`
nXD+KfGmrwwOX1TAU/XgI2n8xT4bbfBFCYMAFZsCxy4=
`;

module.exports[n`DFA minimization >> 131: /\b[A-Z][A-Z_]*\b/ `] = lit`
HGyK1JiUk/7sKETSlXCeAc2H9amCmfsvDU1+GNTc4nQ=
`;

module.exports[n`DFA minimization >> 132: /\.\.|->|[|~]|[*+?]\??/ `] = lit`
Vf9mZ2Ad71u0fHpEBHZc+phYEnxG81snOJhTLXAhyGo=
`;

module.exports[n`DFA minimization >> 133: /[;:()=]/ `] = lit`
Ly60sRgSExFHInKAaf5fKZTaIrQb2FtgwnS6s3sZzRs=
`;

module.exports[n`DFA minimization >> 134: /'(?:\\.|[^\\'\r\n])*'/ `] = lit`
tJehzulrEzsAjHy3PS5oK30Fm7MRSmb5799H1g0dc34=
`;

module.exports[n`DFA minimization >> 135: /\[(?:\\.|[^\\\]\r\n])*\]/ `] = lit`
N67agwgCsdEW+0hT1jYzWVcfcGyQCjouKzvFYvUeRQI=
`;

module.exports[n`DFA minimization >> 136: /\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\}/ `] = lit`
J/3nl82wKhDeTKU5sp3Cop394sPBXrOn971FH3Pqots=
`;

module.exports[n`DFA minimization >> 137: /(->\s*)(?:\s*(?:,\s*)?\b[a-z]\w*(?:\s*\([^()\r\n]*\))?)+(?=\s*;)/i `] = lit`
T/QEgaOvnJB1YD8EBGE0JeXf6j9QLQOow+oeECz88ZA=
`;

module.exports[n`DFA minimization >> 138: /@\w+(?:::\w+)*/ `] = lit`
2amRjZ2KFT4TefdTjb9PL3fHK0sTI0c3QrkEeabfh9I=
`;

module.exports[n`DFA minimization >> 139: /#[ \t]*\w+/ `] = lit`
N9Q6BGEhLTrfLRQiY5psHCgv2AIQpnm/DvcHfMR6T/U=
`;

module.exports[n`DFA minimization >> 140: /\\(?:u(?:[a-fA-F\d]{4}|\{[a-fA-F\d]+\})|[pP]\{[=\w-]+\}|[^\r\nupP])/ `] = lit`
kI1hn0Y5Jqa3LKgjGgNmaO2dBvX7qpsbgQkvUlvM9PU=
`;

module.exports[n`DFA minimization >> 141: /[\[\]]/ `] = lit`
h2hNyvq8E7GII+4Vx2B8al2oqPqB4oghiz6rLKBHsrY=
`;

module.exports[n`DFA minimization >> 142: /[{}]/ `] = lit`
W4AY52cBoSQcGVz0+lDanHZsFAo9JSCbKL809xmRCVc=
`;

module.exports[n`DFA minimization >> 143: /\b\w+(?=\s*(?:[,(]|$))/ `] = lit`
rEynkVTjmvHMzITJt7OQ0AASWn7DFZdffxDx1OZvTt4=
`;

module.exports[n`DFA minimization >> 144: /[,()]/ `] = lit`
TWrJo+kPSRUdjngo30EkkcLjbUydEbPRs7HPeRs0vCM=
`;

module.exports[n`DFA minimization >> 145: /\b[a-z]\w*(?=\s*:)/ `] = lit`
CcRblFCwZwz+UUj2l4IKyjhTCB5IdzXtFZ4GVi6t4to=
`;

module.exports[n`DFA minimization >> 146: /\b[A-Z]\w*(?=\s*:)/ `] = lit`
iG9MrJ9UQL/UPTpcF/Z9XF+pLoEC8jpqaZ6BbC4MMd0=
`;

module.exports[n`DFA minimization >> 147: /([^[]|(?:^|[^\\])(?:\\\\)*\\\[)-(?!\])/ `] = lit`
/4tv15z5oZmg/49zQGaSPif8X784WQkO7d2iYKYnucs=
`;

module.exports[n`DFA minimization >> 148: /(\{)[\s\S]+(?=\})/ `] = lit`
MuTQ8xtrscFhkgzH8zUaeJqz5z26gkVD8jcjm0PkDLA=
`;

module.exports[n`DFA minimization >> 149: /#.*/ `] = lit`
b/uLXXb070yRLX6+0FI02AevcjQLDBY4msyLeMN7nBk=
`;

module.exports[n`DFA minimization >> 150: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ `] = lit`
nKEuq7+I0gUyYA9FaaBisCpGGCndf76zRj+fK/zHet8=
`;

module.exports[n`DFA minimization >> 151: /\^?.*\$|\^.*\$?/ `] = lit`
0EFvj5+MkyHAUbGZPahTVMeorxIMvbXoZ4mFyxFgckc=
`;

module.exports[n`DFA minimization >> 153: /<\/?\b(?:Auth[nz]ProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|Files... `] = lit`
M5fPp1WV59fXygUcryfEylVlUUaED//KQ5ftIPpcZMc=
`;

module.exports[n`DFA minimization >> 154: /\[(?:\w,?)+\]/ `] = lit`
S7g/pxi+B1RtxDmCZMK6NzgoQtv2AuOhFbtIVRe6eWs=
`;

module.exports[n`DFA minimization >> 155: /("|').*\1/ `] = lit`
dibihUd8PEklcwa5an6OxIjliH+vFT7mMaCxP8VyLrQ=
`;

module.exports[n`DFA minimization >> 156: />/ `] = lit`
iR25j2af2vUSCU8wve5sz9XONgTTSSz7qWFqe7SfQSI=
`;

module.exports[n`DFA minimization >> 157: /^<\/?\w+/ `] = lit`
ckA46cB6sK0h5v/kazb/Tcb9pEodHCUdSsYVwvamRSg=
`;

module.exports[n`DFA minimization >> 158: /.*[^>]/ `] = lit`
xUsPZrRNBJea72F34T9z0wngycnPgWesfLSd85CIok4=
`;

module.exports[n`DFA minimization >> 159: /:/ `] = lit`
gwaQCkXxPWUSEYeW+09l3l+4TOJc1EmyLFMyRC6rH5I=
`;

module.exports[n`DFA minimization >> 160: /(?:⍝|#[! ]).*$/m `] = lit`
CC9JVqldZ3bdktiPaoGm27Tar1KTCvZBFZQvgvVffOk=
`;

module.exports[n`DFA minimization >> 161: /¯?(?:\d*\.?\b\d+(?:e[+¯]?\d+)?|¯|∞)(?:j¯?(?:\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞))?/i `] = lit`
2vmHoZIuI3hD5HJ/uK3p/kpePi8hrt2HspgZwy8G2aM=
`;

module.exports[n`DFA minimization >> 162: /:[A-Z][a-z][A-Za-z]*\b/ `] = lit`
86P6UaI5URdwD0ZiLPixRd2ncQNJ+5Qdr2lovKcpnEk=
`;

module.exports[n`DFA minimization >> 163: /[⍬⌾#⎕⍞]/ `] = lit`
kUAD9Gb1XLQ1FNzAzLO6IPbyg9di5u/wsDn5IXwEjBw=
`;

module.exports[n`DFA minimization >> 164: /[-+×÷⌈⌊∣|⍳⍸?*⍟○!⌹<≤=>≥≠≡≢∊⍷∪∩~∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⊆⊇⌷⍋⍒⊤⊥⍕⍎⊣⊢⍁⍂≈⍯↗¤→]/ `] = lit`
yv9Asxo+ITQ/QdDSkYlWqVJ719f09Q4x/t9CXw3krA8=
`;

module.exports[n`DFA minimization >> 165: /[\[;\]()◇⋄]/ `] = lit`
3ErCbbno4lbpxBjp2QmPxBE34aXjbisgz9eD4nsXal0=
`;

module.exports[n`DFA minimization >> 166: /'(?:[^'\r\n]|'')*'/ `] = lit`
fpr8ze6p/+SF14UEZw7UGAjtaMQiaZfOl5VfU8kEnp8=
`;

module.exports[n`DFA minimization >> 167: /⎕[A-Z]+/i `] = lit`
DKie18a7mPX4i3ZdDebNv/QSJAv7hpNUmIPxWTds9y0=
`;

module.exports[n`DFA minimization >> 168: /[\\\/⌿⍀¨⍨⌶&∥]/ `] = lit`
mAs1PwYnmJRoGteLUWfcoeW1BWdQ/ccVWvlmlG5TZ1E=
`;

module.exports[n`DFA minimization >> 169: /[.⍣⍠⍤∘⌸@⌺⍥]/ `] = lit`
UpIycPKyHdHFUF6DDQOxPi7+3x7vTAcgQOMzG5WYYjA=
`;

module.exports[n`DFA minimization >> 170: /←/ `] = lit`
I+g3r0GzbTFXYk482LYTs2w+vdV8tTjripQvXKcBP2o=
`;

module.exports[n`DFA minimization >> 171: /[{}⍺⍵⍶⍹∇⍫:]/ `] = lit`
8NOm7k1HKTUfimELfTHrCzzTzkzT6hy1E20bqF7aV/w=
`;

module.exports[n`DFA minimization >> 172: /"(?:\\.|[^"\\\r\n])*"/ `] = lit`
vAWlB1EdyUqSGPPC0ql3/BUjpcILwwRJYbUAuqQM8gY=
`;

module.exports[n`DFA minimization >> 173: /(?:\b\d+\.?\d*|\B\.\d+)(?:e-?\d+)?\b/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 174: /\b(?:about|above|after|against|apart from|around|aside from|at|back|before|begi... `] = lit`
8EwFwPj29XOdCsWyOpUwfa70WsKNyswm+QnWXM0xiE0=
`;

module.exports[n`DFA minimization >> 175: /[{}():,¬«»《》]/ `] = lit`
wdCGHacXYyYhNH7iFkyc+mfHjXxnwVMWCjHBh//6eCE=
`;

module.exports[n`DFA minimization >> 176: /\(\*(?:\(\*(?:[^*]|\*(?!\)))*\*\)|(?!\(\*)[\s\S])*?\*\)/ `] = lit`
dnyPh7/vchiRZXJk7BiK9tYmwJ8nMj+OkH2P2CVzWBU=
`;

module.exports[n`DFA minimization >> 177: /--.+/ `] = lit`
d4Yp7C+OSSvg4A5IihYeAyF6CtCeFI6wZiNVfoZ7w/g=
`;

module.exports[n`DFA minimization >> 178: /#.+/ `] = lit`
9dLwZjklX7pujBibLzucsV6FD+7/v4SPOtG9scElYFo=
`;

module.exports[n`DFA minimization >> 179: /[&=≠≤≥*+\-\/÷^]|[<>]=?/ `] = lit`
N1shqfDO9AIxVkt8szxa6FwNFbnbzvysXk3abhJ1xQE=
`;

module.exports[n`DFA minimization >> 180: /\b(?:(?:start|begin|end)s? with|(?:(?:does not|doesn't) contain|contains?)|(?:i... `] = lit`
KvK9gi/6bKj+bEjGsYpAYV1VGSohQMmaOGVnN3CR/9Y=
`;

module.exports[n`DFA minimization >> 181: /\b(?:alias|application|boolean|class|constant|date|file|integer|list|number|POS... `] = lit`
TokYfWn7JEsh0J4y+EBR8RKN4M2RQQFl612FK1MTxdo=
`;

module.exports[n`DFA minimization >> 182: /@@?\w+/ `] = lit`
75NtaKjPur29nGiTsW8UwWwoNxWOpjZbVp7QzY5m++0=
`;

module.exports[n`DFA minimization >> 183: /(?!\d)\w+(?=\s*\()/ `] = lit`
Pzj56ooZK2dcyafycKwYDm3OyTvuhVK39Cp0cgWIiQI=
`;

module.exports[n`DFA minimization >> 184: /(?:true|false)/i `] = lit`
kPiBOQvqbACAoKWacUeiIbdyS5DG8ByS7p6jUbRTaMI=
`;

module.exports[n`DFA minimization >> 185: /(?:\B\.\d+|\b(?:0|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?/i `] = lit`
vAwilgvCZiJSNc6tFRBDDo/m6XC8dTR87rrDh3qzSmA=
`;

module.exports[n`DFA minimization >> 186: /\*{2,}|[=!]~|[!=<>]=?|&&|\|\||[-+*\/%]/ `] = lit`
7S7DirgZYsxgEbuvGuM5K5+X49MhzFzfwC7xKik+OS0=
`;

module.exports[n`DFA minimization >> 187: /::|[?.:,;()[\]{}]/ `] = lit`
thRQ65pK/MEmd9jU2Hx9QI8A8z9viXBKBOh526tVoXE=
`;

module.exports[n`DFA minimization >> 188: /([{,]\s*)(?:(?!\d)\w+|(["'´\`])(?:(?!\2)[^\\\r\n]|\\.)*\2)(?=\s*:)/ `] = lit`
350WHlPDEAgrWzNXJmfsbf3xPpYbd3YEvm4mIIgW/vQ=
`;

module.exports[n`DFA minimization >> 189: /(["'´\`])(?:(?!\1)[^\\\r\n]|\\.)*\1/ `] = lit`
GVxvSaoJeR2zH7SfFJ3Joa8bsYv7KghO0hoNt0l3XpE=
`;

module.exports[n`DFA minimization >> 190: /\b(?:AGGREGATE|ALL|AND|ANY|ASC|COLLECT|DESC|DISTINCT|FILTER|FOR|GRAPH|IN|INBOUN... `] = lit`
grdR2N1ZmFf9j+K0u64rXGkE3WcTeMflsNJZucj09nw=
`;

module.exports[n`DFA minimization >> 191: /\.\./ `] = lit`
KAulacIDAmvmID6TZEiwO0HBTEF2+YC6EkK4mR6EaYY=
`;

module.exports[n`DFA minimization >> 192: /(\bWITH\s+)COUNT(?=\s+INTO\b)/i `] = lit`
+Z8v82BmE3m2hobQ3E0LIqcPmtnqkglsYK5q2DrNGNU=
`;

module.exports[n`DFA minimization >> 193: /(^|[^\w.[])(?:KEEP|PRUNE|SEARCH|TO)\b/i `] = lit`
d3bXeY7RPlF+PeD/1/Y/ACqLoBr8bkciOV7180aFuEc=
`;

module.exports[n`DFA minimization >> 194: /(^|[^\w.[])(?:CURRENT|NEW|OLD)\b/ `] = lit`
zvnFaJ+L8XUE94IhXxr8gHPaaD85YGKJVV/0bU6Kbyo=
`;

module.exports[n`DFA minimization >> 195: /\bOPTIONS(?=\s*{)/i `] = lit`
vcVXbCmg4L8RlwaAq2lGeXGxIszBnGNlP3J+MN3fDq8=
`;

module.exports[n`DFA minimization >> 196: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_C... `] = lit`
ZeOx2LET9F2y2ml1KUMIwmgy5/ObCENYYe3O/UAVV0o=
`;

module.exports[n`DFA minimization >> 197: /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary... `] = lit`
8oVBhjqFTBwpvMgn0tlMd0wY+vpUIrP320dXjc23PRo=
`;

module.exports[n`DFA minimization >> 198: /[a-z_]\w*(?=\s*\()/i `] = lit`
Pzj56ooZK2dcyafycKwYDm3OyTvuhVK39Cp0cgWIiQI=
`;

module.exports[n`DFA minimization >> 199: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)... `] = lit`
CyxRTQoPalu4rzC6H++s1SymNgWFqXEkXp+muli2u8U=
`;

module.exports[n`DFA minimization >> 200: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*\/%&|^!=<>]=?/ `] = lit`
25SDP7T6v5Tt67ZAijafoqtojw7Im6rEXDU3gxCTz+0=
`;

module.exports[n`DFA minimization >> 201: /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char3... `] = lit`
Wm7Nwn5iYe7sjYs2ps4+xHO+FnRyd4jdCotDhQ79tEY=
`;

module.exports[n`DFA minimization >> 202: />>=?|<<=?|->|([-+&|:])\1|[?:~]|<=>|[-+*\/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bit... `] = lit`
YwOGcUIpQ/7mgRxSCMQkf5u96q8C4gTD+Xak5z03Qh8=
`;

module.exports[n`DFA minimization >> 203: /\b(?:DIGITAL_MESSAGE|FIRMATA_STRING|ANALOG_MESSAGE|REPORT_DIGITAL|REPORT_ANALOG... `] = lit`
JOGLKNVzdk4uWwbiPFQUOgDTZuiuJ/OYhZ4z5wdEiHI=
`;

module.exports[n`DFA minimization >> 204: /\b(?:setup|if|else|while|do|for|return|in|instanceof|default|function|loop|goto... `] = lit`
WTOd07gNbF8aB6JnYFxG9lOt5v7Mqau62GvSmGyvYUM=
`;

module.exports[n`DFA minimization >> 206: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/ `] = lit`
lmRZz9DKSJj4QzFTQkT3ETbK234SzW4gUTwhdTBNjXQ=
`;

module.exports[n`DFA minimization >> 207: /(^\s*)#\s*[a-z]+(?:[^\r\n\\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\... `] = lit`
4jsbccUZ3rVs02yhx3Fpxi6YyW+yrTYlrmv9Ura3Dhs=
`;

module.exports[n`DFA minimization >> 208: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+/ `] = lit`
ZvD03Vb3s++eXg3azpjOeo/btRWuylqA7Nu7oumPD2Q=
`;

module.exports[n`DFA minimization >> 209: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 210: /(\b(?:class|struct)\s+\w+\s*:\s*)(?:[^;{}"'])+?(?=\s*[;{])/ `] = lit`
XAFNs3C/hAyA2yLbFj6JOhlzYSWw5sgSRNXSYiwXL1M=
`;

module.exports[n`DFA minimization >> 211: /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/ `] = lit`
RqdY09b+tjcpytKxUddERzYp4r+IJRyOlvpu21Cy6IE=
`;

module.exports[n`DFA minimization >> 212: /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i `] = lit`
YB0JxFn7fe5ugQqK9eIJr/nyeLDzJZbqd0ThuA73sNU=
`;

module.exports[n`DFA minimization >> 213: /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/ `] = lit`
J6hW+ppCdukH6rLWGyafosl8mJI32CqJPCcl/x+bUos=
`;

module.exports[n`DFA minimization >> 214: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[... `] = lit`
UXITbcmMOSRC1UMUXdX2vLFq5lfZ3B1iHzNYNNx70UQ=
`;

module.exports[n`DFA minimization >> 215: /^#/ `] = lit`
iTSkK/WN4wjCrvJicCGzg2A5zUfYwUiirQ5qvIdS2Ws=
`;

module.exports[n`DFA minimization >> 216: /##|\\(?=[\r\n])/ `] = lit`
JQcf2lSKnzo5XdT3fUEcIoA+5ieAkvwnaJSC+6gk8mo=
`;

module.exports[n`DFA minimization >> 217: /\b[a-z_]\w*\b(?!\s*::)/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 218: /(\b(?:class|concept|enum|struct|typename)\s+)(?!\b(?:alignas|alignof|asm|auto|b... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 219: /^(#\s*)[a-z]+/ `] = lit`
8B8iv1nHBhpFDL43zChPBsdI39Ds5DPWclc7jqwLs68=
`;

module.exports[n`DFA minimization >> 220: /\S[\s\S]*/ `] = lit`
rxtHNZLAO3ei5jjXjPAhgCXswtBrASUmO4opKZ48yw8=
`;

module.exports[n`DFA minimization >> 221: /^(#\s*include\s*)<[^>]+>/ `] = lit`
zLsxuLNDq/o8oLOW00A0QCjG9kI91LiINcAqsWLV2D4=
`;

module.exports[n`DFA minimization >> 222: /%.*/ `] = lit`
N51T6qjEvqpKWIRrooURbO+MyxbDBIeldCBQVywmXws=
`;

module.exports[n`DFA minimization >> 223: /@(?:attribute|data|end|relation)\b/i `] = lit`
+peCFTCLyiJ5ogtP1wUQDe4yRL86v/v/5sJch4QZQu0=
`;

module.exports[n`DFA minimization >> 224: /\b\d+(?:\.\d+)?\b/ `] = lit`
BUUB+E0cSs2HJg/bnfkRb9zOkiIJyaWTgS3PqQb6wCc=
`;

module.exports[n`DFA minimization >> 225: /[{},]/ `] = lit`
XVkGzns+0+JDzNh69kwOcB2b/3ZdPca2ewFVzsmGS3Y=
`;

module.exports[n`DFA minimization >> 226: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/ `] = lit`
q2BJHXfAE0k/7oyqfcfI/g0WoLdyZTDaC8xv4du9lFM=
`;

module.exports[n`DFA minimization >> 227: /^\/\/.*/m `] = lit`
JdbUZd7MyF80bJQmmk3EFLhwqUPbwpT8nQRQrqnqagg=
`;

module.exports[n`DFA minimization >> 228: /&#?[\da-z]{1,8};/i `] = lit`
25QXXFthw2Zgj6SvNiS3x0sNRwZMmWaUpfVZuGx2JjA=
`;

module.exports[n`DFA minimization >> 229: /^(\/{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 230: /^\|={3,}(?:(?:\r?\n|\r).*)*?(?:\r?\n|\r)\|={3,}$/m `] = lit`
I1Lngh+DWrPtf/Zejg1TgGXTQ1TFGKtJD7L8qwoF0dA=
`;

module.exports[n`DFA minimization >> 231: /^(\+{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 232: /^(-{4,}|\.{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 233: /^(--|\*{4,}|_{4,}|={4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 234: /(^[ \t]*)(?:-|\*{1,5}|\.{1,5}|(?:[a-z]|\d+)\.|[xvi]+\))(?= )/im `] = lit`
cui35s2qYzVfpWFgsb//O8XdgKDSOg3XEEeLBc7362Y=
`;

module.exports[n`DFA minimization >> 235: /(^[ \t]*)[a-z\d].+(?::{2,4}|;;)(?=\s)/im `] = lit`
hKjH6v29u//RmDFCFRClN+lXCXIKtKs2A2lsfL0q//A=
`;

module.exports[n`DFA minimization >> 236: /((\r?\n|\r)\2)([ \t]+)\S.*(?:(?:\r?\n|\r)\3.+)*(?=\2{2}|$)/ `] = lit`
RkIhr/ebbVFK6i00gHvuIa72tWNM+LDBaXRK+XUf9s4=
`;

module.exports[n`DFA minimization >> 237: /^.+(?:\r?\n|\r)(?:={3,}|-{3,}|~{3,}|\^{3,}|\+{3,})$|^={1,5} +.+|^\.(?![\s.]).*/... `] = lit`
kRmtJMBrWJTVmkampJfQkYb7vDeIrgs6/qtuPfWhgqA=
`;

module.exports[n`DFA minimization >> 238: /^:[^:\r\n]+:(?: .*?(?: \+(?:\r?\n|\r).*?)*)?$/m `] = lit`
GMOVXXPfLhtTOOVg2NX6N3Qy2cmdb18S4kluzEHKHT8=
`;

module.exports[n`DFA minimization >> 239: /(^[ \t]*)\[(?!\[)(?:(["'$\`])(?:(?!\2)[^\\]|\\.)*\2|\[(?:[^\]\\]|\\.)*\]|[^\]\\]... `] = lit`
7BYV6b9BeerUyGPN3mwYdhQ1eCUvgC2KB6cXCCoCQe8=
`;

module.exports[n`DFA minimization >> 240: /^'{3,}$/m `] = lit`
c8P9ms86qDWKLsNKo7FqnCbYI9jzlVdTYf7FTD5gIfU=
`;

module.exports[n`DFA minimization >> 241: /^<{3,}$/m `] = lit`
cVR+hcdrAjPJ4dlQRdoxXhefJpWTNTj14tbUSoDa6j0=
`;

module.exports[n`DFA minimization >> 242: /^(?:TIP|NOTE|IMPORTANT|WARNING|CAUTION):/m `] = lit`
S3c1yXjRk4nkjEMK1FWjX3pIYeZL2iZUu8iFyrbzfwM=
`;

module.exports[n`DFA minimization >> 243: /\b[a-z\d][a-z\d-]*::?(?:(?:\S+)??\[(?:[^\]\\"]|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.... `] = lit`
+B4djJlhQWGJVX23r0xklVD4TR7lUh1wFQGz+Kfy0j0=
`;

module.exports[n`DFA minimization >> 245: /\((?:C|TM|R)\)/ `] = lit`
nmOo9+FjnGGge3k8ndGWOhXc5Mjw0Y0RmWjHlMKI0as=
`;

module.exports[n`DFA minimization >> 246: /(^| )\+$/m `] = lit`
CEhmrFz9LOPX1FVp9BUxot1OO168pIFvY5n1XABSAmk=
`;

module.exports[n`DFA minimization >> 247: /^\++|\++$/ `] = lit`
gwGFRRrjeGxMygKSfH9oCZZUbJ7c0yA7GodzAJ1m2K0=
`;

module.exports[n`DFA minimization >> 248: /^(?:-+|\.+)|(?:-+|\.+)$/ `] = lit`
n8vn0Ct+O+fef1m1qHHNJzEpuTGE3/8muwNb02a+Y7k=
`;

module.exports[n`DFA minimization >> 249: /^(?:-+|\*+|_+|=+)|(?:-+|\*+|_+|=+)$/ `] = lit`
CuyMTmcLY8PRml5mbf1g86VRAv19s1fM41Rm2tAjba8=
`;

module.exports[n`DFA minimization >> 250: /^(?:\.|=+)|(?:=+|-+|~+|\^+|\++)$/ `] = lit`
4kW6E6h9p3oDFPch5elf37/s54039KYHmGeSQ8XOEJk=
`;

module.exports[n`DFA minimization >> 251: /"(?:[^"\\]|\\.)*"/ `] = lit`
NBJW5CrJdsoEdhgCZrk2vcnHTAjHhudOUJ724Qvv0Ag=
`;

module.exports[n`DFA minimization >> 252: /\w+(?==)/ `] = lit`
jo1oRZjExp5/Xd9qikRI11WB7oY58NOaNr1ZCmONS0U=
`;

module.exports[n`DFA minimization >> 253: /^\[|\]$|,/ `] = lit`
Q8KaxlacIh9cVDtBeG4LTcM1C91vl+uCVfPR3Sr2Fdk=
`;

module.exports[n`DFA minimization >> 254: /=/ `] = lit`
4aMh4gnPQjcDMSEx3iJeyM08ndzynUUGu4GyE+j1fZY=
`;

module.exports[n`DFA minimization >> 255: /(?!^\s+$).+/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 256: /(^[ \t]*)<?\d*>/m `] = lit`
v/skwjY1O6s37V2msnbNkbNzZIu4PX6kew/O1DwklH4=
`;

module.exports[n`DFA minimization >> 257: /<\d+>/ `] = lit`
yXmvTbamcWagcUtRSckV5w1dZa/7UF4YrV3rp9eDpDE=
`;

module.exports[n`DFA minimization >> 258: /^[a-z\d-]+(?=:)/ `] = lit`
vIzKCELQViQLfT1OTEbJm+TKLOTA10ROZ7GQI4lqNtk=
`;

module.exports[n`DFA minimization >> 259: /^::?/ `] = lit`
Bz8mdsl+75Yfq9OT7+bngbTeFb3hXvcFhDDFjRui0Ts=
`;

module.exports[n`DFA minimization >> 260: /^(?:\`\`?|\+{1,3}|##?|\$\$|[~^]|\(\(\(?)|(?:''?|\+{1,3}|##?|\$\$|[~^\`]|\)?\)\))$/ `] = lit`
P3qu/Y7cFk7xEbn4qQ74sOTMr9DY+lRIJnywmnEjFeE=
`;

module.exports[n`DFA minimization >> 261: /(?!\|)(?:(?:(?:\d+(?:\.\d+)?|\.\d+)[+*])?(?:[<^>](?:\.[<^>])?|\.[<^>])?[a-z]*)(... `] = lit`
WIqhUdMqIJMtr/xSEicU4Y6/6LfAHYyrliqWW6mXWV0=
`;

module.exports[n`DFA minimization >> 262: /(^|[^\\])[|!]=*/ `] = lit`
Ki9bZXeKqFAj6ZuiO55XyzPo4xR7gOU4s2mLoIkX6kI=
`;

module.exports[n`DFA minimization >> 263: /([$\`])(?:(?!\1)[^\\]|\\.)*\1/ `] = lit`
j0o9t4BKBZPPNRf+lKSAcjtYmiJQ1QA6/qG7odgJYvo=
`;

module.exports[n`DFA minimization >> 264: /'(?:[^'\\]|\\.)*'/ `] = lit`
xdCl0R0cRUlh0CAxEROhCS54enDiwfmslRD17Ph7Hdw=
`;

module.exports[n`DFA minimization >> 265: /(?:\[(?:[^\]\\"]|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/ `] = lit`
YaCMJAo5ZVjphVewGHhoH37etKUN91gXOEqrAvp/9Wo=
`;

module.exports[n`DFA minimization >> 266: /^(?:\[\[\[?.+?\]?\]\]|<<.+?>>)$/ `] = lit`
InZuAgnb+BJP7ujEp2WUo4a+flOxB1zigT77aRtvjRY=
`;

module.exports[n`DFA minimization >> 267: /^\{.+\}$/ `] = lit`
TOqsYWy72CszmCHFbgCfSRm3/MNnHAD2tBrJrnibvjA=
`;

module.exports[n`DFA minimization >> 268: /^(['_])[\s\S]+\1$/ `] = lit`
NkKbWAVWr1/Tv01dJRzoSubwKuWb/Pfurb/93AIxYSA=
`;

module.exports[n`DFA minimization >> 269: /^\*[\s\S]+\*$/ `] = lit`
FoVC5o7GtKgdHqjK8Awh+UMj9PDYcWXhBgkNSGRQDfg=
`;

module.exports[n`DFA minimization >> 270: /^[$\`]|[$\`]$/ `] = lit`
VQFtRf7QG1U4toOpDOG7BaBgpm66FMSVamvfA+foGew=
`;

module.exports[n`DFA minimization >> 271: /^'|'$/ `] = lit`
K4QabsgJfrym3XGCQfrFWI7SDpJrFObfLYprcfWmQ1o=
`;

module.exports[n`DFA minimization >> 272: /^(?:\[\[\[?|<<)|(?:\]\]\]?|>>)$/ `] = lit`
GRG8S2tOELKwiFyXUEUKSU7rdEGDDJDmLidUA2QTMOk=
`;

module.exports[n`DFA minimization >> 273: /^[=?!#%@$]|!(?=[:}])/ `] = lit`
XuEgdi05nxN8V6tEHPaJ8fdmS6cbAGZnikOW65ASxJM=
`;

module.exports[n`DFA minimization >> 274: /^\{|\}$|::?/ `] = lit`
VIrKc1hL5Z3iPRaa+SuQKjYAMjYWDo2PQtAj63xQOhE=
`;

module.exports[n`DFA minimization >> 275: /^(?:''?|__?)|(?:''?|__?)$/ `] = lit`
ddqXUFcGvJ9gQfk/z95PVhPoug+SLfSG7VDiGMnCgqM=
`;

module.exports[n`DFA minimization >> 276: /^\*\*?|\*\*?$/ `] = lit`
gSF+UrlYMco8YdOaPUoX6yveUzo9/OVSJ41idYCNsbY=
`;

module.exports[n`DFA minimization >> 277: /(^\{)[a-z\d,+_-]+/ `] = lit`
Qy5Gvvz9U2RGVnfGafE+pIoWRQGbxOcXty9CYO9uESU=
`;

module.exports[n`DFA minimization >> 278: /\b(?:bool|byte|char|decimal|double|dynamic|float|int|long|object|sbyte|short|st... `] = lit`
XqU5PBXUOm+dKAN01Ijd9hqoXJQMTugUQOVAk1fHwhg=
`;

module.exports[n`DFA minimization >> 279: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:... `] = lit`
1rPXEVDLO+OMZ+gvmaKaeakzVlbX468b+QuItFBHQM0=
`;

module.exports[n`DFA minimization >> 280: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*\/%&|^!=<>]=?/ `] = lit`
o4oRleti7vvki+fLbm8qTatNDfH9xyc7mtBZBgduSuU=
`;

module.exports[n`DFA minimization >> 281: /\?\.?|::|[{}[\];(),.:]/ `] = lit`
wqR+6SL9UbasOzjROTDIjtm2QBl0tYKbdC5bY7ckJJ8=
`;

module.exports[n`DFA minimization >> 282: /(\b(?:namespace|using)\s+)(?:@?\b[A-Za-z_]\w*\b)(?:\s*\.\s*(?:@?\b[A-Za-z_]\w*\... `] = lit`
EBBTYwGz2k+TDF8X1WMrjQRFv9B0tlcktzY179XgU74=
`;

module.exports[n`DFA minimization >> 283: /(\b(?:default|typeof|sizeof)\s*\(\s*)(?:[^()\s]|\s(?!\s*\))|(?:\((?:[^()]|(?:\(... `] = lit`
Jwv0TAJtU0a6aepuFaEP6LSIo+Z2eGNNQhSo2S10Ttw=
`;

module.exports[n`DFA minimization >> 286: /(?:@?\b[A-Za-z_]\w*\b)\s*(?:<(?:[^<>;=+\-*\/%&|^]|(?:<(?:[^<>;=+\-*\/%&|^]|(?:<... `] = lit`
tZokMIa2qemP4r2ag+CoPtX+PjvweMMJ3gFPWZ8Uy9I=
`;

module.exports[n`DFA minimization >> 288: /(^\s*)#.*/m `] = lit`
PRUhYiO3wsN/2Yw0eHz1mE5LkFOOuGqzxQgZSsQk3Po=
`;

module.exports[n`DFA minimization >> 290: /([(,]\s*)(?:@?\b[A-Za-z_]\w*\b)(?=\s*:)/ `] = lit`
2kMmu3dlTA+UxRSRB3MStRicSVh4XRZ0UB7vRcvJ2Zg=
`;

module.exports[n`DFA minimization >> 291: /<%--[\s\S]*?--%>/ `] = lit`
N0CpKsaXJlOVxCVz1im0t2QBd+rO/C4luRtBqMvZo24=
`;

module.exports[n`DFA minimization >> 292: /(<script(?=.*runat=['"]?server['"]?)[\s\S]*?>)[\s\S]*?(?=<\/script>)/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 293: /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'... `] = lit`
atU/FMJI3TNZ86PEDm9BJ9obDOw7CpbHFEgjChCHaFQ=
`;

module.exports[n`DFA minimization >> 294: /<%\s*@.*%>/i `] = lit`
E/EAy5GI4AumEe1a5cltlvJ5JEpDfxLZDubcKHF7+h0=
`;

module.exports[n`DFA minimization >> 295: /<%.*%>/i `] = lit`
DeO+GecOj1pt4ZaePF7QGmnxXmCwcxGkgRfS/qvYWU4=
`;

module.exports[n`DFA minimization >> 296: /(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|(?:\{(?!\{)(?:(?![}:])(?:[^"'\/()]|(?:... `] = lit`
F/VUkQv2KL4H5Se7cuFBs2UNZCnPOXeossyo4uhMSGk=
`;

module.exports[n`DFA minimization >> 297: /(^|[^@\\])\$"(?:\\.|\{\{|(?:\{(?!\{)(?:(?![}:])(?:[^"'\/()]|\/(?!\*)|\/\*(?:[^*... `] = lit`
SIci8ER/mYTgV/HQ78jTRQZpZaOC/hg3+a3G3JsMO9Q=
`;

module.exports[n`DFA minimization >> 298: /(^|[^$\\])(?:@"(?:""|\\[\s\S]|[^\\"])*"(?!"))/ `] = lit`
nC6WW8ZrEvMvtp+URh6YK5OlLdGqeOwQggdFgZU9Okg=
`;

module.exports[n`DFA minimization >> 299: /(^|[^@$\\])(?:"(?:\\.|[^\\"\r\n])*")/ `] = lit`
LIhk5FaXv66QC9azaIGeKDV7M35eZQ58BnpfFTnE5kk=
`;

module.exports[n`DFA minimization >> 300: /'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/ `] = lit`
0x1wPHLA3AtqcJ4Vs/unGLGt1SPdkruMX+mwTs/wAzc=
`;

module.exports[n`DFA minimization >> 301: /\./ `] = lit`
yqynYCQiA/bsfBoJxFQiC7GdC6KdML6X3cHVWcoe3YA=
`;

module.exports[n`DFA minimization >> 302: /[<>()?,.:[\]]/ `] = lit`
pQj7j6LxvzhsGRPcsHiZykt5VP7StektD595srF3TeA=
`;

module.exports[n`DFA minimization >> 303: /^(?:@?\b[A-Za-z_]\w*\b)/ `] = lit`
Eq2RRPj+JnvDa7soNWwHhYI1Jcfl1yVeb4T3iZGsEAk=
`;

module.exports[n`DFA minimization >> 304: /,/ `] = lit`
7cQkfFCmBem5aeuw7RHUwf+RgTkKjLleF0ADaMVXXeA=
`;

module.exports[n`DFA minimization >> 305: /[:,]/ `] = lit`
fAkVcTPngrPKzfkwpnYuI9x0DkMh2IILaQ3Q1wGzIvk=
`;

module.exports[n`DFA minimization >> 306: /(\busing\s+static\s+)(?:(?!(?:\b(?:class|enum|interface|struct|add|alias|and|as... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 308: /(\busing\s+)(?:@?\b[A-Za-z_]\w*\b)(?=\s*=)/ `] = lit`
m8Uz/LionWZ2KP/GuXsE3U1nPs48vRFfWcdpWVYEgoM=
`;

module.exports[n`DFA minimization >> 309: /(\b(?:\b(?:class|enum|interface|struct)\b)\s+)(?:(?:@?\b[A-Za-z_]\w*\b)(?:\s*(?... `] = lit`
bupa83MP6k5KyZegm9jwOFI+PjaqikgB6rMmTYlt3bY=
`;

module.exports[n`DFA minimization >> 310: /(\bcatch\s*\(\s*)(?:(?!(?:\b(?:class|enum|interface|struct|add|alias|and|ascend... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 311: /(\bwhere\s+)(?:@?\b[A-Za-z_]\w*\b)/ `] = lit`
EnJT0T0z/shmn5mPhOFKRN+4hJbRIbldhD77RwuEYnQ=
`;

module.exports[n`DFA minimization >> 312: /(\b(?:is(?:\s+not)?|as)\s+)(?:(?:(?!(?:\b(?:class|enum|interface|struct|add|ali... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 314: /<(?:[^<>;=+\-*\/%&|^]|(?:<(?:[^<>;=+\-*\/%&|^]|(?:<(?:[^<>;=+\-*\/%&|^]|(?:<(?:... `] = lit`
mkYadARQeci224Ngls9CDhPM0GfFiM2mSxpXzEI7NNY=
`;

module.exports[n`DFA minimization >> 316: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|w... `] = lit`
h9YT4+jBmAJOa19eY4SPzrvqEVIxXI09VJISNJSZEPc=
`;

module.exports[n`DFA minimization >> 317: /^(?:\b(?:assembly|event|field|method|module|param|property|return|type)\b)(?=\s... `] = lit`
50a311b7ym3wWHeGI79e2tJi2LlHlJUMjqNiGGrzSPo=
`;

module.exports[n`DFA minimization >> 318: /\((?:[^"'\/()]|(?:\/(?![*\/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|(?:... `] = lit`
GwjMPhqQ/AxGNoZvItVNPTsWRI+TsZDspkeDhyBrD6Q=
`;

module.exports[n`DFA minimization >> 319: /(?!(?:\b(?:class|enum|interface|struct|add|alias|and|ascending|async|await|by|d... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 320: /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page... `] = lit`
nZrwrbZmRyWhj9VXsRiS7HfB6zA8MlfeVjWSFBmFJf8=
`;

module.exports[n`DFA minimization >> 321: /<%\s*?[$=%#:]{0,2}|%>/i `] = lit`
Tnfw9L3PQhwgrbwgzq/DVlqHT58X7mieP7zcG3kNKRo=
`;

module.exports[n`DFA minimization >> 322: /((?:^|[^{])(?:\{\{)*)(?:\{(?!\{)(?:(?![}:])(?:[^"'\/()]|(?:\/(?![*\/])|\/\/[^\r... `] = lit`
fEMEHh/tVKvJeqZh+2aDUmDOAxSAydYLCVbOhKMw7ag=
`;

module.exports[n`DFA minimization >> 323: /((?:^|[^{])(?:\{\{)*)(?:\{(?!\{)(?:(?![}:])(?:[^"'\/()]|\/(?!\*)|\/\*(?:[^*]|\*... `] = lit`
u1CQwdVh3VB7Jz59gjEsh2hh/E/wVH+YbPJKwMD9JQs=
`;

module.exports[n`DFA minimization >> 324: /^\{|\}$/ `] = lit`
W4AY52cBoSQcGVz0+lDanHZsFAo9JSCbKL809xmRCVc=
`;

module.exports[n`DFA minimization >> 325: /(^\{(?:(?![}:])(?:[^"'\/()]|(?:\/(?![*\/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!... `] = lit`
a0KCsWD4d57F0QvHwwQ4tNAEcmUZ5J7Fy8klNcBzF6w=
`;

module.exports[n`DFA minimization >> 326: /(^\{(?:(?![}:])(?:[^"'\/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|(?:"(?:\\.|[^\\... `] = lit`
+cRF/ncGik7CBnkfzFH1eWJ7S/5XVhDHMhXjkEkYfk8=
`;

module.exports[n`DFA minimization >> 327: /^:/ `] = lit`
gwaQCkXxPWUSEYeW+09l3l+4TOJc1EmyLFMyRC6rH5I=
`;

module.exports[n`DFA minimization >> 328: /(["'\`])(?:\\.|(?!\1)[^\\\r\n])*\1/ `] = lit`
m+2Iy7QB9l/SkKeNY9O3WxgSWA/4U1Yg02/83TLC/V4=
`;

module.exports[n`DFA minimization >> 329: /\.\w+(?= )/ `] = lit`
IbOTFqhoIIssVCuMUs/SlSM3Er+839mCYwFmMw6kVIU=
`;

module.exports[n`DFA minimization >> 330: /\b(?:adc|and|asl|bcc|bcs|beq|bit|bmi|bne|bpl|brk|bvc|bvs|clc|cld|cli|clv|cmp|cp... `] = lit`
FSFyYytBmAdeeIx2TkHECOb0Du2VYRLzX9xpeOLEOYk=
`;

module.exports[n`DFA minimization >> 331: /#?\$[\da-f]{2,4}\b/i `] = lit`
4iZ9D3/vZKNX6J9Iazp5Y86gO5pCQmJx14MiP7HY8S0=
`;

module.exports[n`DFA minimization >> 332: /#?%[01]+\b/ `] = lit`
a3jRxfN0pz5Bc0/ceWOv8RHuoD292UlXkeK16Q5romU=
`;

module.exports[n`DFA minimization >> 333: /#?\b\d+\b/ `] = lit`
XPAuP32W9AcU9J76EVMnIzQ5QuxIsmjHc0C7nWvpbo0=
`;

module.exports[n`DFA minimization >> 334: /\b[xya]\b/i `] = lit`
/yEPjXzTBnGH4qMX2hP71fYro/7l3zRnA8SsIGfSOPs=
`;

module.exports[n`DFA minimization >> 335: /"(?:[^"\n\r]|"")*"/m `] = lit`
RmivvYL9So/4kBHqas3x0SYyu+0CBSc4YqttwKbIUVA=
`;

module.exports[n`DFA minimization >> 336: /^[ \t]*[^\s:]+?(?=:(?:[^:]|$))/m `] = lit`
xJ2yIiDpIhPrggYP294WaS6zamPUJSZY5f236BoLgSU=
`;

module.exports[n`DFA minimization >> 337: /%\w+%/ `] = lit`
bj9MtJlx4M6vZj54qsGNS1+mCqOQiK7wclm2Uz78Jk4=
`;

module.exports[n`DFA minimization >> 338: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/ `] = lit`
8K42ZNaLHxL9U1Kq85XGcB65ja/OCwAKFRPbZX8Jp7I=
`;

module.exports[n`DFA minimization >> 339: /\?|\/\/?=?|:=|\|[=|]?|&[=&]?|\+[=+]?|-[=-]?|\*[=*]?|<(?:<=?|>|=)?|>>?=?|[.^!=~]... `] = lit`
egOe2SAcDSMqUkmvK+3mDdqpykpxW2HyA4VAHRJV+n8=
`;

module.exports[n`DFA minimization >> 342: /\b(?:abs|acos|asc|asin|atan|ceil|chr|class|comobjactive|comobjarray|comobjconne... `] = lit`
5gmQlv54hBKdI8jw0ipSHuUaaSxddoKql2LoQt9WvTs=
`;

module.exports[n`DFA minimization >> 344: /#\b(?:AllowSameLineComments|ClipboardTimeout|CommentFlag|DerefChar|ErrorStdOut|... `] = lit`
PWrvngAqgXRQGrhmMFoGSUI8JHSVnM0rSXgFHAqmVGQ=
`;

module.exports[n`DFA minimization >> 346: /[^(); \t,\n+*\-=?>:\\\/<&%\[\]]+?(?=\()/m `] = lit`
iXpzaEc7is2PuG+sUStRtWBd0sq++jrKGVhpnSG1sdE=
`;

module.exports[n`DFA minimization >> 347: /[{}[\]():,]/ `] = lit`
pAZA6+ZFKJmh5l+Ab+9nQmPChuQgNGdkL3emESob52E=
`;

module.exports[n`DFA minimization >> 348: /(^|\s);.*/ `] = lit`
digCU8YCmXsR52o/fGo2Qy6xERucU6/HRMXZXtJbbGo=
`;

module.exports[n`DFA minimization >> 349: /(^\s*)\/\*[^\r\n]*(?:[\r\n](?![ \t]*\*\/)|[^\r\n])*(?:[\r\n][ \t]*\*\/)?/m `] = lit`
23qahxySfcbrROR2BlBfKCbTaw3UpZ6nDfdRzq4pGN8=
`;

module.exports[n`DFA minimization >> 350: /\b\w+(?=\()/ `] = lit`
UAgPJf0Lc8wZiLiOJNtXuWpzaXIWtsQlZyWok5MgdEQ=
`;

module.exports[n`DFA minimization >> 351: /[$@]\w+/ `] = lit`
gR6gIg4fw8lqhXvU4L2LYm8Jes/LRns88Qlr5S29W2w=
`;

module.exports[n`DFA minimization >> 352: /\b(?:Case|Const|Continue(?:Case|Loop)|Default|Dim|Do|Else(?:If)?|End(?:Func|If|... `] = lit`
/yI5MeexS0DKOteYTjNOLON01G7isC54Bf0gvIXYMvg=
`;

module.exports[n`DFA minimization >> 353: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i `] = lit`
XrQYcegWH4IAE6q5AmMh6HR8DKLSb28bdoztEZB4UeY=
`;

module.exports[n`DFA minimization >> 354: /\b(?:True|False)\b/i `] = lit`
kPiBOQvqbACAoKWacUeiIbdyS5DG8ByS7p6jUbRTaMI=
`;

module.exports[n`DFA minimization >> 355: /<[=>]?|[-+*\/=&>]=?|[?^]|\b(?:And|Or|Not)\b/i `] = lit`
qWdWvI9i7lIfqmO1NPhk8HwR+iRyYlRt3Hxq/b0Lqyk=
`;

module.exports[n`DFA minimization >> 356: /[\[\]().,:]/ `] = lit`
F+6KkUtnocy+T3YrGC8OnnYaQuZnRk8TUSAHRWBoMQ8=
`;

module.exports[n`DFA minimization >> 357: /(^\s*#include\s+)(?:<[^\r\n>]+>|"[^\r\n"]+")/m `] = lit`
nEf2+rtIXz3xW1c9Uf8X+ZJWOv4oZ7ZNSzh/Z8S0yt0=
`;

module.exports[n`DFA minimization >> 358: /(["'])(?:\1\1|(?!\1)[^\r\n])*\1/ `] = lit`
8E6VwCZI4xnqwWbCq1DfmE0JU8SWmJSn1J4a1Jhq8ss=
`;

module.exports[n`DFA minimization >> 359: /(^\s*)#\w+/m `] = lit`
Z/plMnJqdrkEuwo7TXizYBmqzQPCLdjwFxNNDhInW4c=
`;

module.exports[n`DFA minimization >> 360: /(^\s*)#(?:comments-start|cs)[\s\S]*?^\s*#(?:comments-end|ce)/m `] = lit`
522FYOOvFTj9N0aVgfApdWVzYckysICxxuv1flRqS3E=
`;

module.exports[n`DFA minimization >> 361: /([%$@])\w+\1/ `] = lit`
v0lk557K8fekScekWgjyX2jlGORmZqFmdcf8B/xqXBo=
`;

module.exports[n`DFA minimization >> 362: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/ `] = lit`
SfQYcypXF0zNO5j6mdTbgMjBoPJbcVoladrpNHQRZII=
`;

module.exports[n`DFA minimization >> 363: /^#!\s*\/.*/ `] = lit`
J1TetvQC+QNxdoiIozU+MP33yWGQKDnXK4DgqsJ0ODs=
`;

module.exports[n`DFA minimization >> 364: /(^|[^"{\\$])#.*/ `] = lit`
d14VLpVtyAeM4um3B/hup6dgw6Mp4A3SEM4YRM3bHiU=
`;

module.exports[n`DFA minimization >> 365: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/ `] = lit`
yJva3yTd90A2uNJHQ04kEvDwPSZ6mlXV6FciTll/leE=
`;

module.exports[n`DFA minimization >> 366: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/ `] = lit`
wTKvXclOa2/NajjekPhYLH4LlAnrg83Ba+GxobEFTZQ=
`;

module.exports[n`DFA minimization >> 368: /\$(?:\w+|[#?*!@$])/ `] = lit`
+xJ4weOhnr0M/OeYKSwXsxYSr6sSewK/BsBkNM09Ymg=
`;

module.exports[n`DFA minimization >> 370: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|selec... `] = lit`
ERYEhodzqaOvcUSaVIXcIY5bCenxcarm0+pa1oHW9/8=
`;

module.exports[n`DFA minimization >> 371: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|... `] = lit`
4e8UiCsEprn1c6P4mTElW/4UzB8i7snHq2yZ9iY3oBQ=
`;

module.exports[n`DFA minimization >> 372: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/ `] = lit`
SYHPtU01oHl79aoJ5TfmNwQHHeGohZp6rMyOjIKnB0o=
`;

module.exports[n`DFA minimization >> 373: /\B&\d\b/ `] = lit`
nqpKE0Z3ROdUJ08xEUBsXd4vh1yztgBGhOP+IMT318U=
`;

module.exports[n`DFA minimization >> 374: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/ `] = lit`
RZAMlTvSdwpNItGTcKtGefFgKKqGJIiSa4Xwu0hbAx8=
`;

module.exports[n`DFA minimization >> 375: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/ `] = lit`
mjPqd4gg3QqAXladaSMYIHrgLILJuLtecZQJ8eIeARg=
`;

module.exports[n`DFA minimization >> 376: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/ `] = lit`
zTZspSFBzT7doTcQXsbBB4l2AqZOT+lWIskUhi+8RUM=
`;

module.exports[n`DFA minimization >> 377: /\b\w+(?=\s*\(\s*\)\s*\{)/ `] = lit`
FysJgcgdASQHWeMKC14JepW/s6sUpZ0hMV73g0FjzxU=
`;

module.exports[n`DFA minimization >> 378: /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\2/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 379: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\3/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 380: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|\`[^\`]+\`|(?!\2)[^\\])*\2/ `] = lit`
QNpDWK+02ag6mJV2mtButbm4SR5SEQHUsHCBKkSPYdE=
`;

module.exports[n`DFA minimization >> 381: /\$?\(\([\s\S]+?\)\)/ `] = lit`
VWeLb8fuOpoA9xTTsDZzgOUeSm3zxqphv7SxJwiaB/8=
`;

module.exports[n`DFA minimization >> 382: /\$\((?:\([^)]+\)|[^()])+\)|\`[^\`]+\`/ `] = lit`
WBsfmuwg3AUNokSpA3fawhmXmgu5SDpJjX8ags46+G8=
`;

module.exports[n`DFA minimization >> 383: /\$\{[^}]+\}/ `] = lit`
j1/v+uTIVzzTUr0/0nGY3jAVuTYNmj76e+0DzE/YAEM=
`;

module.exports[n`DFA minimization >> 385: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F... `] = lit`
Cw+9qYzTvbpxgcLkjvQCRHv6SS/vYSg7BZ8iNb4ibvo=
`;

module.exports[n`DFA minimization >> 386: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\... `] = lit`
ACR8hDSoEEHKw2FzmWoiYhmDqSCyWxTrWJEPdg4rox8=
`;

module.exports[n`DFA minimization >> 387: /\(\(?|\)\)?|,|;/ `] = lit`
RKg0UcBQYrw5uZhNMaW83WLthJ6M1lsAKYPd+56Ny74=
`;

module.exports[n`DFA minimization >> 388: /^\$\(|^\`|\)$|\`$/ `] = lit`
1dobQZJt+z3wUP0MXwYqN7XCKhFmKlpxl05vGRKyJEc=
`;

module.exports[n`DFA minimization >> 389: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/ `] = lit`
eEiUrYApdT/GgvNBCSDfCoW+lu6XkRJXSo53tiAMDXg=
`;

module.exports[n`DFA minimization >> 390: /^\d/ `] = lit`
XKmWUJu2GHXvgheawB9y/S1FmiGCnQW8u2UQu8HuS/I=
`;

module.exports[n`DFA minimization >> 392: /^\$\(\(/ `] = lit`
8YEDW1+2BvlVqvo4WDlvEPTIU+mIHcQytzJeHdDNm38=
`;

module.exports[n`DFA minimization >> 394: /(^\$\(\([\s\S]+)\)\)/ `] = lit`
oQnl/RitMQVJYcGt6MhK8q+BNWNEDAj+z8Tr1X6zoYA=
`;

module.exports[n`DFA minimization >> 395: /(?:\b\d+\.?\d*|\B\.\d+)(?:E[+-]?\d+)?/i `] = lit`
/CMCC0Vt/DT0NahQrLDQBfipknVriSoOdfB5yXtoduM=
`;

module.exports[n`DFA minimization >> 396: /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|CO... `] = lit`
CSpoySbAxuBR0McY1OXp1ldtPMLLU0SXVkOWlVqrNMI=
`;

module.exports[n`DFA minimization >> 397: /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BRE... `] = lit`
mJ/684pfEkvPz2WibfoF3vwCEqmHnzAKlKsrGso5eRg=
`;

module.exports[n`DFA minimization >> 398: /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i `] = lit`
Vhmu3E7YwFUOpO6IM9YPIbqYDyehGbkqtkDFPYTT6VA=
`;

module.exports[n`DFA minimization >> 399: /[,;:()]/ `] = lit`
sMq7dGe9qorKqMR1A15207TzRknA71gx9vMke19GuwA=
`;

module.exports[n`DFA minimization >> 400: /(?:!|REM\b).+/i `] = lit`
sxEc/M5Z71KD6x7/6T2QC6yh7fQS6BAzzdfMdsnwKFQ=
`;

module.exports[n`DFA minimization >> 401: /"(?:""|[!#$%&'()*,\/:;<=>?^_ +\-.A-Z\d])*"/i `] = lit`
aAj1Ay0Qa2VFLSm8ZSZKm6N7HmEBTQvd5fBNdQIKXmA=
`;

module.exports[n`DFA minimization >> 402: /^REM/i `] = lit`
d/YvYT6lzIdvjP+UiX1ydM6U8ejx5OIpc6yIkoCdK0g=
`;

module.exports[n`DFA minimization >> 403: /[&@]/ `] = lit`
LTocufUutfyVJ8XCaKScvWP/WW2avyuTTH5biaiqJXM=
`;

module.exports[n`DFA minimization >> 404: /[()']/ `] = lit`
7j/BfXid3NZKb53102OzSoKh2QBZxAmJW5ZoFiWa1Ts=
`;

module.exports[n`DFA minimization >> 405: /^::.*/m `] = lit`
DiZ9TReD+zedPmJK5mqtfNB6+GWI8I5ceCdxcoVERao=
`;

module.exports[n`DFA minimization >> 406: /^:.*/m `] = lit`
MKX68GYFzO3KfgLId9OsLKTDf/s2lydQLA90xNUnCP4=
`;

module.exports[n`DFA minimization >> 407: /((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im `] = lit`
KiBIdM5vYRiXnQVUvbG8k19xlo996S0ThWph9bdLfro=
`;

module.exports[n`DFA minimization >> 408: /((?:^|[&(])[ \t]*)for(?: ?\/[a-z?](?:[ :](?:"[^"]*"|\S+))?)* \S+ in \([^)]+\) d... `] = lit`
hWDa1su7YHiOnjVoIQifypFp/ztSJ7TAU2WMg1AJmaQ=
`;

module.exports[n`DFA minimization >> 409: /((?:^|[&(])[ \t]*)if(?: ?\/[a-z?](?:[ :](?:"[^"]*"|\S+))?)* (?:not )?(?:cmdextv... `] = lit`
yzflDyL0JvjdRNi2YkAlyZE8iCFQlqPp0f0s/oaVTf0=
`;

module.exports[n`DFA minimization >> 410: /((?:^|[&()])[ \t]*)else\b/im `] = lit`
4BP9dUmAtYG6zUpvl10glXOAVdzjHGZrgo51UXamH9A=
`;

module.exports[n`DFA minimization >> 411: /((?:^|[&(])[ \t]*)set(?: ?\/[a-z](?:[ :](?:"[^"]*"|\S+))?)* (?:[^^&)\r\n]|\^(?:... `] = lit`
m0yXxrDZsT/5fWF1auBGkQhOkdbLxR4qVaA4MHNYy30=
`;

module.exports[n`DFA minimization >> 412: /((?:^|[&(])[ \t]*@?)\w+\b(?:"(?:[\\"]"|[^"])*"(?!")|[^"^&)\r\n]|\^(?:\r\n|[\s\S... `] = lit`
JY5a44TSoj5FI2LakuuEv6071A7ePViX0pZhkDX+Uno=
`;

module.exports[n`DFA minimization >> 413: /^for\b|\b(?:in|do)\b/i `] = lit`
090MvjY6HvtCBoGENKHkhYsBA6BCkYOHWvDV3SPpO7A=
`;

module.exports[n`DFA minimization >> 414: /"(?:[\\"]"|[^"])*"(?!")/ `] = lit`
zmSqSDCgypGZavShlVGtJPDJYPjh7ZWkNfZdKFzJsEA=
`;

module.exports[n`DFA minimization >> 415: /%%?[~:\w]+%?|!\S+!/ `] = lit`
VIVKi8n25MgyWvAyFFz3WTvE6mdd2W5JGG9l4rhX6/Y=
`;

module.exports[n`DFA minimization >> 416: /(?:\b|-)\d+\b/ `] = lit`
xpkdLzw5ez8SHErzRNYsvOvNmJctMGnYe5IJd03R39M=
`;

module.exports[n`DFA minimization >> 417: /[()',]/ `] = lit`
O6SEbjfFi3PBxYu0fQz3BYBjZqZMYWh3U0fXxENWcMc=
`;

module.exports[n`DFA minimization >> 418: /^if\b|\b(?:not|cmdextversion|defined|errorlevel|exist)\b/i `] = lit`
sdtdAMdd4IN8IZlYkTQLzSrp6pFv0AtF4TyW5yU7doU=
`;

module.exports[n`DFA minimization >> 419: /\^|==|\b(?:equ|neq|lss|leq|gtr|geq)\b/i `] = lit`
7c7+x+xM838MHr/RdEc1uDcOqGQqZkja+rMBHawRfik=
`;

module.exports[n`DFA minimization >> 420: /^else\b/i `] = lit`
9JYLraRTValPhMZt7Qs3im8JM8Lb7tlCFJeBbVBAf44=
`;

module.exports[n`DFA minimization >> 421: /^set\b/i `] = lit`
qyQ+0OAxpJEicAuXydrpm+M7Yi4CUc+FpI886+UWo+0=
`;

module.exports[n`DFA minimization >> 422: /[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/ `] = lit`
rkZplWCOcH4eumKDevGQAynP6G7nr6cuRYKWjHUMZHM=
`;

module.exports[n`DFA minimization >> 423: /^\w+\b/i `] = lit`
G7q1DZSuo68ahopKRciJi+dd+0bshV5qEIbLHV+5XF4=
`;

module.exports[n`DFA minimization >> 424: /\^/ `] = lit`
CVdySI3rRN4OzetKjj5JjJ5ymGvSmCZs7I+6hRqdnSU=
`;

module.exports[n`DFA minimization >> 425: /\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im `] = lit`
DufU9NZnXO/7TxxViMDXqnxQJKCo7ibUdI08fkZMY5g=
`;

module.exports[n`DFA minimization >> 426: /\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/ `] = lit`
o9CY/s7BXne75NjerufsRR8ISvOocsuaiagCwKbr7oY=
`;

module.exports[n`DFA minimization >> 427: /(^\s*):\S+/m `] = lit`
6NlejmTNZ0Zue2LyqlYblFrGYAkciBuE3nxz7EVs/dk=
`;

module.exports[n`DFA minimization >> 428: /\[\/?[^\s=\]]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+))?(?:\s+[^\s=\]]+\s*=\s*... `] = lit`
jXfZj6SAg1426fwpeswjOh9LgiBWySBCGGdHXhEn/Uc=
`;

module.exports[n`DFA minimization >> 429: /\]/ `] = lit`
jgQOyk6cWXtA1sieHMpftVgKsg/+h8mNoHy3arWgsGg=
`;

module.exports[n`DFA minimization >> 430: /[^\s=\]]+/ `] = lit`
IIYR/jPK/BTqkDeN71Hcdl6i97ZGVNowv72ixRfUMM4=
`;

module.exports[n`DFA minimization >> 431: /^\[\/?[^\s=\]]+/ `] = lit`
V97EYK9W4mcF2tuAKM5NwaxYZkpmVWNx+8ij1aSb314=
`;

module.exports[n`DFA minimization >> 432: /=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+)/i `] = lit`
Wvdhcs40vQb52nh/n9IYKTBWSpEgsgFXSRjApbq1Rq4=
`;

module.exports[n`DFA minimization >> 433: /^\[\/?/ `] = lit`
Ejk+KYThEFiyjO/WPiTUULdpz5XilxZgOFiqTsIXV8A=
`;

module.exports[n`DFA minimization >> 434: /^(\s*)["']|["']$/ `] = lit`
mqpvPuKPjS703OrUCCSHHm/kuTapVWMJdhcvVcjs8Kk=
`;

module.exports[n`DFA minimization >> 435: /^[\s\S]*?%%[\s\S]*?%%/ `] = lit`
qo6bWOf9FjZG3M4u9KHwSXf0hBfiXtZj+48CHLltWUQ=
`;

module.exports[n`DFA minimization >> 436: /\S+(?=:)/ `] = lit`
rn8sD05eYpSV1zw/mlsHNdedku2ZTQL2zIPHwgBIkV4=
`;

module.exports[n`DFA minimization >> 437: /%\w+/ `] = lit`
/EydPJ9elZ4mLj7GAW6jOc0FkkhPJISczb56mkHVfUk=
`;

module.exports[n`DFA minimization >> 438: /%[%?]|[|:;\[\]<>]/ `] = lit`
dl8xhT6ToYyfqrqnf44pKO7uU4aZgyQ9vVOe1g8CLDI=
`;

module.exports[n`DFA minimization >> 439: /%\{[\s\S]*?%\}|\{(?:\{[^}]*\}|[^{}])*\}/ `] = lit`
4UlZ2SlzOMScPRKHUyYXcq2Pi/tlY4jP9X/uOr5RfzE=
`;

module.exports[n`DFA minimization >> 440: /(^|[^@])\b(?:0x[\da-f]+|\d+)/i `] = lit`
oqAJ4I4D8zhYs0+xxG0Sg9DUHpCmfWMShf2pS1vczBo=
`;

module.exports[n`DFA minimization >> 441: /^%?\{|%?\}$/ `] = lit`
t93bu+ruhkRLVo2W0wRuhyLnHzAmsUBO4zKGp+cTj/g=
`;

module.exports[n`DFA minimization >> 442: /[$@](?:<[^\s>]+>)?[\w$]+/ `] = lit`
Z5BC1f/GTaTu5GFKI4d35hgbOdZPZ/qitvXnt6RRw/0=
`;

module.exports[n`DFA minimization >> 443: /::=|[|()[\]{}*+?]|\.{3}/ `] = lit`
JaTpX+Aa6FGrYP+82VFyTR/s0m2h8r3zMofou9ZKzr8=
`;

module.exports[n`DFA minimization >> 444: /"[^\r\n"]*"|'[^\r\n']*'/ `] = lit`
jvkP18LHgJ+SnFBQl2C7GLOuB7g3uzpWt+3V1fYDsOs=
`;

module.exports[n`DFA minimization >> 445: /<[^<>\r\n\t]+>(?=\s*::=)/ `] = lit`
lf/NFP7QPeFgQ/WnJTUYl9DD3Y+IDkpnzkySQG3N8IQ=
`;

module.exports[n`DFA minimization >> 446: /<[^<>\r\n\t]+>/ `] = lit`
qDjMQYojU76W7Ea2rBYfNGBd8RZO4mWbJ+9GTqVu/w0=
`;

module.exports[n`DFA minimization >> 447: /^<|>$/ `] = lit`
lV3wbmWVnhQXvq3YGN0Hd+DsQ8tEFC0VLhPKTWIrf1g=
`;

module.exports[n`DFA minimization >> 448: /[.,]/ `] = lit`
sGL+nN5FRynK4TDrbA47Hcca7HR5FpU5k6kNarXrHyA=
`;

module.exports[n`DFA minimization >> 449: /\S+/ `] = lit`
hPej3e0ijHrkLuZr6FXN8D5fiIMQPnfHQNNZZ50/hwg=
`;

module.exports[n`DFA minimization >> 450: /\+/ `] = lit`
Kt6PTtl36n1I5n80jAPEOSaTgrMkuV2XfQvpc92vbxc=
`;

module.exports[n`DFA minimization >> 451: /-/ `] = lit`
tz2YQI5zN6NrDYnH/TaJbQ1nhYDvyJxHWDPkPpAtr8o=
`;

module.exports[n`DFA minimization >> 452: /\[|\]/ `] = lit`
h2hNyvq8E7GII+4Vx2B8al2oqPqB4oghiz6rLKBHsrY=
`;

module.exports[n`DFA minimization >> 453: /(?:\brem|').*/i `] = lit`
cGWPgsClcuN+cS8gB7avfpirCE76ZXabm93/rpuFysM=
`;

module.exports[n`DFA minimization >> 454: /\b(?:As|Dim|Each|Else|Elseif|End|Exit|For|Function|Goto|If|In|Print|Return|Step... `] = lit`
I+li6PENfYb1gdTA/f1OFFq39OOKi3dTELHhQj+Fx7g=
`;

module.exports[n`DFA minimization >> 455: /\b(?!\d)\w+(?=[\t ]*\()/i `] = lit`
OkjgzGY/eAgqqz4XGr8h2zNHqswIj8z0eVd6ozeCXY4=
`;

module.exports[n`DFA minimization >> 456: /(?:\b\d+(?:\.\d+)?(?:[ed][+-]\d+)?|&h[a-f\d]+)\b[%&!#]?/i `] = lit`
Cx8XZtJP6G2cShsfFDEClXMsOTsq+ZqMMD+H3NCf4CE=
`;

module.exports[n`DFA minimization >> 457: /--|\+\+|>>=?|<<=?|<>|[-+*\/\\<>]=?|[:^=?]|\b(?:and|mod|not|or)\b/i `] = lit`
Qsuaj4oyCTml81nzavDZrUwqtxXDqmVzwyO58g91Row=
`;

module.exports[n`DFA minimization >> 458: /[.,;()[\]{}]/ `] = lit`
cL2HxM2p/FcOqSmfqb0J4OVMJEPHlnV3HJO5n9O96gg=
`;

module.exports[n`DFA minimization >> 459: /\b(?:LINE_NUM)\b/i `] = lit`
8Qtv7icR0WPf0z+Z23PYrxBLTKKkJ3+s6I/mD9WyJVk=
`;

module.exports[n`DFA minimization >> 460: /(^[\t ]*)#(?:const|else(?:[\t ]+if)?|end[\t ]+if|error|if).*/im `] = lit`
bpVL8sbg5JyIG/olZTIE1Ikxew3BHVhASAIXnFhJ5lo=
`;

module.exports[n`DFA minimization >> 461: /([\r\n{,][\t ]*)(?:(?!\d)\w+|"(?:[^"\r\n]|"")*"(?!"))(?=[ \t]*:)/ `] = lit`
6USToKprrR2IXmVJkrs84zipxUh/8txuLewKIzuJ/Fw=
`;

module.exports[n`DFA minimization >> 462: /"(?:[^"\r\n]|"")*"(?!")/ `] = lit`
RmivvYL9So/4kBHqas3x0SYyu+0CBSc4YqttwKbIUVA=
`;

module.exports[n`DFA minimization >> 463: /(\bAs[\t ]+)\w+/i `] = lit`
H8fxUxHe5VLpJzWbBpnFCOGutZPJ5zknrsLBwryqeXI=
`;

module.exports[n`DFA minimization >> 464: /(^#error).+/ `] = lit`
xdztc+67c0Dfa5aAnTXna09xM6y76jib+fA5QGTRlY4=
`;

module.exports[n`DFA minimization >> 465: /^#(?:const|else(?:[\t ]+if)?|end[\t ]+if|error|if)/ `] = lit`
cLk8R0AkofaxUv9HaJD7cnDY/TLaDusMe8mp01RjkHg=
`;

module.exports[n`DFA minimization >> 466: /\b[TF]\b/ `] = lit`
5NLDpQeixJmf9Ni8uj/HCNGGIXIPDltAhFsuNNQhnKo=
`;

module.exports[n`DFA minimization >> 467: /(?:@(?:load(?:-(?:sigs|plugin))?|unload|prefixes|ifn?def|else|(?:end)?if|DIR|FI... `] = lit`
iug6lxvknstKXNRn67aCkVjy1eApRzzJ2WTQw9IqPAg=
`;

module.exports[n`DFA minimization >> 468: /\b(?:break|next|continue|alarm|using|of|add|delete|export|print|return|schedule... `] = lit`
14f+MtHauNyKn8pdMti/jHNgEjsEt3azO80gD9L3LCY=
`;

module.exports[n`DFA minimization >> 469: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&|\|\|?|\?|\*|\/|~|\^|%/ `] = lit`
/2kP3JQu+uFoKDI8SXvRrPOaE+qdny3h8QtgmhY5DcM=
`;

module.exports[n`DFA minimization >> 470: /(^|[^\\$])#.*/ `] = lit`
8lBzzCCze65dDQj30dwsx0UmfqoYlgo4+9LTjqYevwc=
`;

module.exports[n`DFA minimization >> 471: /(?:function|hook|event) \w+(?:::\w+)?/ `] = lit`
ydAU2goLb/sKzdeatKQJ/bva4enmeR1YJH9ucAwlngs=
`;

module.exports[n`DFA minimization >> 472: /(?:global|local) \w+/i `] = lit`
n1ZoWTdhkkpPrQSMUFOWAT/ocP9RwjULt+JF4BKA0u8=
`;

module.exports[n`DFA minimization >> 473: /const \w+/i `] = lit`
pvrPyi9SfmEjfjvSfeuli1e7X4wKIfd8+b5UGUooGaM=
`;

module.exports[n`DFA minimization >> 474: /\b(?:TODO|FIXME|XXX)\b/ `] = lit`
bp7xmYD5CUR28TLWLlOVBUyd8DVdIqYgvakcXbswrfQ=
`;

module.exports[n`DFA minimization >> 475: /^(?:function|hook|event)/ `] = lit`
Aw1FihL3YptjEGowB6o10GdAnEfvpIlZtMZv+HF6vrc=
`;

module.exports[n`DFA minimization >> 476: /(?:global|local)/ `] = lit`
ZOnAZW7aFG9g9bAQNugtx55o3jBi/0VcYst3gqJM8d4=
`;

module.exports[n`DFA minimization >> 477: /const/ `] = lit`
N10dMZttKJOc00V2YiJj1loFO5sP4bNtXFu5Da0IYWI=
`;

module.exports[n`DFA minimization >> 478: /\/\/.*/ `] = lit`
JdbUZd7MyF80bJQmmk3EFLhwqUPbwpT8nQRQrqnqagg=
`;

module.exports[n`DFA minimization >> 479: /\[[\w\.]+\]/ `] = lit`
qs3/cSXAWD6IUXsH4yDn1QFoK4knEb/DDj8bX1ACCmM=
`;

module.exports[n`DFA minimization >> 480: /\b(?:abstract|ansi|assembly|auto|autochar|beforefieldinit|bool|bstr|byvalstr|ca... `] = lit`
x1iGmBG+WUQj85oGclQ2s5kLAayDkdCLllRw2/DwpcU=
`;

module.exports[n`DFA minimization >> 482: /\b-?(?:0x[0-9a-fA-F]+|[0-9]+)(?:\.[0-9a-fA-F]+)?\b/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 483: /[{}[\];(),:=]|IL_[0-9A-Za-z]+/ `] = lit`
iey7K/31HjwVJcRe2U7WZvlEqquEXzDqLRsyYXgFK4Q=
`;

module.exports[n`DFA minimization >> 484: /(^|\W)\.[a-z]+(?=\s)/ `] = lit`
OiMOKfe73M6aQKuG9ZX3urHcx4lAjSIZZjMOzgBGaTM=
`;

module.exports[n`DFA minimization >> 485: /(?:::|[:|'])\b[a-z][\w*+!?-]*\b/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 486: /\b(?:true|false|nil)\b/ `] = lit`
MDpSCdWicrR8bQ7ZqFBoQ/JcfUSWU7ImKSbjNQNhw38=
`;

module.exports[n`DFA minimization >> 487: /\b[\da-f]+\b/i `] = lit`
aZKPoQb+d5N46vQ6SSCi2lBaZW4Ocy+ElCHLJVNDvK4=
`;

module.exports[n`DFA minimization >> 488: /[{}\[\](),]/ `] = lit`
iglKt0sw55oGX36OeEv6h6ML3VYcy2o/r8eRjdtkOhE=
`;

module.exports[n`DFA minimization >> 493: /\b(?:ON|OFF|TRUE|FALSE)\b/ `] = lit`
S6nd9xyhm12XuFZwxlhgkP9V2fcR6wgxLslGQkWb9fE=
`;

module.exports[n`DFA minimization >> 494: /\b(?:PROPERTIES|SHARED|PRIVATE|STATIC|PUBLIC|INTERFACE|TARGET_OBJECTS)\b/ `] = lit`
7WEELivDw7mpTleBrtsiLDEInlZzMNahWqgK5HoF0RM=
`;

module.exports[n`DFA minimization >> 495: /\b(?:NOT|AND|OR|MATCHES|LESS|GREATER|EQUAL|STRLESS|STRGREATER|STREQUAL|VERSION_... `] = lit`
nQB3M5SuhBqzS8sX+BIFD4rsIMNP+8KuCS9zf5xprBA=
`;

module.exports[n`DFA minimization >> 496: /\b\d+(?:\.\d+)*\b/ `] = lit`
RKDXb81h7ByTF8I61P9i/U+XZggHy0KNEilS24U+NqU=
`;

module.exports[n`DFA minimization >> 497: /\b[a-z_]\w*(?=\s*\()\b/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 498: /[()>}]|\$[<{]/ `] = lit`
LgMvs9SsM3H/OvbGiKLFmsEW3UGgt+Zlp/N4Hpkij/c=
`;

module.exports[n`DFA minimization >> 499: /"(?:[^\\"]|\\.)*"/ `] = lit`
NBJW5CrJdsoEdhgCZrk2vcnHTAjHhudOUJ724Qvv0Ag=
`;

module.exports[n`DFA minimization >> 500: /\b\w+::\w+\b/ `] = lit`
X8qohb+aWObhAR9FWSdHzyDyBjQbI6j8Q5BmPySscKg=
`;

module.exports[n`DFA minimization >> 501: /\\\${(?:[^{}$]|\\\${[^{}$]*})*}/ `] = lit`
MaR7hfb6Uguyr3QTPUytObyeRfF9Gr6/jaR6/rxIBec=
`;

module.exports[n`DFA minimization >> 502: /\\\${|}/ `] = lit`
1M59/tycAMO4/JORJr3jTgBMP1AstPG+Rn21YQNNcW0=
`;

module.exports[n`DFA minimization >> 503: /\w+/ `] = lit`
G7q1DZSuo68ahopKRciJi+dd+0bshV5qEIbLHV+5XF4=
`;

module.exports[n`DFA minimization >> 504: /#(?!\{).+/ `] = lit`
4RVkfNHOHARECj0F7aCtMe3uDthP1qk83bHSwXipHvM=
`;

module.exports[n`DFA minimization >> 505: /(?!\d)\w+(?=\s*:(?!:))/ `] = lit`
bqeNOU77nwQTXoEJBxrY/zh4+Ro6Ir7DZuGhpOt1QXw=
`;

module.exports[n`DFA minimization >> 506: /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|exte... `] = lit`
YsOG55o5m4ZE7ANJPN4Av7uSzjUNV8BtH6cpzZIHJXw=
`;

module.exports[n`DFA minimization >> 507: /###[\s\S]+?###/ `] = lit`
SmpfPlaNZaQJfctFRVRYJYvuqH8yPe5hoWIUo2FgWoM=
`;

module.exports[n`DFA minimization >> 508: /\/{3}[\s\S]*?\/{3}/ `] = lit`
1slLBUAFMzdFXzsopIvP+P1Hnc7LZe7tiZrKkSizZrs=
`;

module.exports[n`DFA minimization >> 509: /\`(?:\\[\s\S]|[^\\\\\`])*\`/ `] = lit`
CWxF3Jcf9QROgVzIXp5JFn1pHmwwD9m0EyitKpgHRuc=
`;

module.exports[n`DFA minimization >> 510: /@(?!\d)\w+/ `] = lit`
BmOEJJ17Hsvm/uT6h9xoxwf4Mjm1z8bJICbkjyJDmBQ=
`;

module.exports[n`DFA minimization >> 511: /'''[\s\S]*?'''/ `] = lit`
LxCgY3QqQ5JDHsHEV1afb0rglWHFF3YwaDnq+ZZ4Ib4=
`;

module.exports[n`DFA minimization >> 512: /"""[\s\S]*?"""/ `] = lit`
dJQPF/GUmbK+uY+/CpGCPgnn6IM5eI1mT78cGWRHbTY=
`;

module.exports[n`DFA minimization >> 513: /'(?:\\[\s\S]|[^\\'])*'/ `] = lit`
D547X8KZ44dtJLwcTjCZDS+2/WcVUHbpxGIAR2njePA=
`;

module.exports[n`DFA minimization >> 514: /"(?:\\[\s\S]|[^\\"])*"/ `] = lit`
901gjCaUOwjwFLfIL54nMX9rgHEl6ouvkBv/aY0K38w=
`;

module.exports[n`DFA minimization >> 515: /#\{[^}]+\}/ `] = lit`
BZW472HjiAfcrfZu7oJftBjyauGM8foxWe4CxQJIhOI=
`;

module.exports[n`DFA minimization >> 516: /\b(?:abstract|actor|also|annotation|assert|async|await|bool|boolean|break|byte|... `] = lit`
O4OZWAx0HthxScJGobESNcTxu4dHRlL7xzjOcx6AsAs=
`;

module.exports[n`DFA minimization >> 517: /\b(?:false|true)\b/ `] = lit`
Y0ERb5x2lDpLVTFFKD4wZHkx7MNvFlYJJQCWPpf4OeI=
`;

module.exports[n`DFA minimization >> 518: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d... `] = lit`
K909+JV7ZoWqPuBHBu8LDuEmJWiXnxRFJzpTq1cFg1o=
`;

module.exports[n`DFA minimization >> 519: /<==|>==|=>|->|<-|<>|\^|&==|&<>|!|\?|\?:|\.\?|\+\+|--|[-+*\/=<>]=?|\b(?:and|as|b... `] = lit`
cl8zWT3ZK6LIXVDuaabaGdxo3LyLpfN2VrWGzJPACaQ=
`;

module.exports[n`DFA minimization >> 520: /[rs]?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/ `] = lit`
2ulLdY3BZ3MK2qDLEvG+PDm7qvn0osRUStzm1Ysk/Rs=
`;

module.exports[n`DFA minimization >> 521: /\w+\s*\|\|[\s\S]+?\|\|/ `] = lit`
1DV2NwMt5z86oFN9rtf9mx4mnsGtym46b6tUWG3KNA4=
`;

module.exports[n`DFA minimization >> 522: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/ `] = lit`
IlSwaRtcpu++jAGPxSJdXZhVXemc8pgr6ti4HF1GZ+Y=
`;

module.exports[n`DFA minimization >> 523: /@(?:\w+:)?(?:\w*|\[[^\]]+\])/ `] = lit`
xfOzz7rBcF2h/xt9u9qhEjNMeT9rH6r+Yqruj+u+3cw=
`;

module.exports[n`DFA minimization >> 524: /((?:^|[^\\])(?:\\{2})*){(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/ `] = lit`
gy8kl1T92bbOm6YdyEqU/P62qxsOyTM3WGigV8Iq5cs=
`;

module.exports[n`DFA minimization >> 525: /\b(?:base-uri|block-all-mixed-content|(?:child|connect|default|font|frame|img|m... `] = lit`
2hmBPN/Gy+u5i/7Zh6XSKFmoZqFzYj9B8EzCGW5/qy4=
`;

module.exports[n`DFA minimization >> 526: /'(?:self|none|strict-dynamic|(?:nonce-|sha(?:256|384|512)-)[a-zA-Z\d+=\/]+)'/ `] = lit`
jAvXilMUzzLECKB/+g7T5qWYmmTt66OrmXEvyN6RTxM=
`;

module.exports[n`DFA minimization >> 527: /(?:'unsafe-inline'|'unsafe-eval'|'unsafe-hashed-attributes'|\*)/ `] = lit`
yhgvaXFENwkNXoo5sgKI6r5qqezWUX57A95eOFd9IlY=
`;

module.exports[n`DFA minimization >> 528: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/ `] = lit`
0rjpWtNZkiJ8W7oNTUgQ3onjmMXkZUvAF9s1l6GfbdA=
`;

module.exports[n`DFA minimization >> 529: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|e... `] = lit`
tVtBojNLtn+i6TwD99b+M8RVuQzWsvM+oBG/894IJDk=
`;

module.exports[n`DFA minimization >> 530: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat... `] = lit`
BIBqzXkU3V7/dsPALHzlhVCtCn9P6iS/Lm/w6gAfur8=
`;

module.exports[n`DFA minimization >> 531: /\b[A-Z]\w*(?:[?!]|\b)/ `] = lit`
HVbL28S8uiq/w0+6PwsjZaOMKVwIVL8ufiLnxFnt0Mo=
`;

module.exports[n`DFA minimization >> 532: /\b(?:0b[01_]*[01]|0o[0-7_]*[0-7]|0x[\da-fA-F_]*[\da-fA-F]|(?:\d(?:[\d_]*\d)?)(?... `] = lit`
YygZtexFUsCrgwpquMPMod2BTwC0OW/8oskg87AVBf8=
`;

module.exports[n`DFA minimization >> 533: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i `] = lit`
6JwqA6k8WgF3n+Z+5rAXzyRFQgyXnwaVtHBcZRJArAo=
`;

module.exports[n`DFA minimization >> 534: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/ `] = lit`
ZC/ACkO//Z1TV8CBgqFfZR+bRaxhzux3EFnbI/WB42o=
`;

module.exports[n`DFA minimization >> 535: /(\bdef\s+)[\w.]+/ `] = lit`
q2/DLSxArgu8iupIS4EfO+HcCQO3DshYgQ+TPksrtXI=
`;

module.exports[n`DFA minimization >> 536: /@\[.+?\]/ `] = lit`
aWt6kN2r76FHFZBHzMTtPWYfivOIU/Xex2gIRUu1DOE=
`;

module.exports[n`DFA minimization >> 537: /\b(?:abstract|alias|as|asm|begin|break|case|class|def|do|else|elsif|end|ensure|... `] = lit`
zy3slhrVz8wSWh28iAH0N3OIdPei0EgyqTi/EwohhZI=
`;

module.exports[n`DFA minimization >> 538: /^=begin\s[\s\S]*?^=end/m `] = lit`
3or3TF5+Jm4h8gbbVfpjxup6oZhsjwjKKUFnO2WN+ls=
`;

module.exports[n`DFA minimization >> 539: /%[qQiIwWxs]?(?:([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1|\((?:[^()\\]|\\... `] = lit`
LCdT81RW5mni3/k2kXURjDEfvTq2i0eW7so47ODIZJw=
`;

module.exports[n`DFA minimization >> 540: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/ `] = lit`
if5aeCU//eChC2yVbROPUuTYS/NP74HAm5dsnq17Pew=
`;

module.exports[n`DFA minimization >> 541: /%r(?:([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}|\((?:[^()\\]|\\... `] = lit`
kPE/nWyJ3MjNSaJorbDrcxOIIygqfbXUXTs7sOu48g4=
`;

module.exports[n`DFA minimization >> 542: /(^|[^\/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[\/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r... `] = lit`
cweeGB0DBJqltq/H8DweTga+H2lz9no4Uyutriad3/Y=
`;

module.exports[n`DFA minimization >> 543: /\w+$/ `] = lit`
G7q1DZSuo68ahopKRciJi+dd+0bshV5qEIbLHV+5XF4=
`;

module.exports[n`DFA minimization >> 544: /\{\{.+?\}\}/ `] = lit`
8smmXNg8QYnwlQYUyfqRD+4uj5EvSOEEDGQ2FCfG/wU=
`;

module.exports[n`DFA minimization >> 545: /\{%.+?%\}/ `] = lit`
9gm5j7V2v4yQ4p4GyzQURMSFbmK/GMKX6+g1opWsA/Y=
`;

module.exports[n`DFA minimization >> 546: /(\.\s*)(?:is_a|responds_to)\?/ `] = lit`
VeKmiQAzzuT7B8kVo0yR5hxtJG7D7ZW9y6Hwc9Bmf/4=
`;

module.exports[n`DFA minimization >> 547: /^@\[|\]$/ `] = lit`
1kQ+TQnzvIffc1gaiDqmym83IP0MoW+MfutdZdiOcYI=
`;

module.exports[n`DFA minimization >> 548: /^\{\{|\}\}$/ `] = lit`
zdmjsfjYiyh5uYAmOiKDhNYZXTNdeY7achalcqoWcEE=
`;

module.exports[n`DFA minimization >> 549: /^\{%|%\}$/ `] = lit`
lWg31LG4z/MpPtxalgiIQoM4hA/QrX2akbLTuoOLXF0=
`;

module.exports[n`DFA minimization >> 550: /^#\{|\}$/ `] = lit`
smXVmDKNHBB86N4ysLr6o94EnvqQhWPNYbwo1M5RZAo=
`;

module.exports[n`DFA minimization >> 551: /\\[\da-f]{1,8}/i `] = lit`
1bvJoGRuwt8Z10+Jj7SvRIQukEe8CsYydQw/VeZYr9k=
`;

module.exports[n`DFA minimization >> 552: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i `] = lit`
0gdMZXieHQVJjij/hkKBAeBugRpg7NooiKJ1fVrE0AM=
`;

module.exports[n`DFA minimization >> 553: /(\s)[+\-*\/](?=\s)/ `] = lit`
MH9zSBDJvjJMBnlk/bOfHePKU77cnZ0ycti4Oeq/bjc=
`;

module.exports[n`DFA minimization >> 554: /\B#(?:[\da-f]{1,2}){3,4}\b/i `] = lit`
t13NhHneOq4CmVwdEWSagCq2VqGqk6dTwSBjXF5Pp+U=
`;

module.exports[n`DFA minimization >> 556: /(\b\d+)(?:%|[a-z]+\b)/ `] = lit`
cx0XFq2coUgpGBsZRYPRgynPpRF1mrDcATDagqEMRT0=
`;

module.exports[n`DFA minimization >> 557: /(^|[^\w.-])-?\d*\.?\d+/ `] = lit`
h5OfhiXfiszjs59BAIDdqil7iA/JoVzhdQk/fa8WOgM=
`;

module.exports[n`DFA minimization >> 558: /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/ `] = lit`
6QsMbNdXTIOQ1Hvu993u9Dz8nVJTla4BlzQx2Ux0dKM=
`;

module.exports[n`DFA minimization >> 559: /:[-\w]+/ `] = lit`
9Wo+7MZIFApYjUPM62uONCQva7dRsN8gTZ3RdkR0wj0=
`;

module.exports[n`DFA minimization >> 560: /\.[-\w]+/ `] = lit`
L7ZR/nSSNBrPHNw7jJkFgRVczgi/4KxjuGnXJLKvPYQ=
`;

module.exports[n`DFA minimization >> 561: /#[-\w]+/ `] = lit`
mR+VyCZsnA9ZGh1nhBNBKl625SxeVRh8WsVtxvnrga4=
`;

module.exports[n`DFA minimization >> 562: />|\+|~|\|\|/ `] = lit`
33hjhAQewkIGc8emOlQQXla6IleG8HubQVyvjsbm+J4=
`;

module.exports[n`DFA minimization >> 563: /[(),]/ `] = lit`
TWrJo+kPSRUdjngo30EkkcLjbUydEbPRs7HPeRs0vCM=
`;

module.exports[n`DFA minimization >> 564: /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a... `] = lit`
JWpP+eNfEsZGuf/SdtOHL42555OQc3cohrJ5kausV78=
`;

module.exports[n`DFA minimization >> 565: /\[(?:[^[\]"']|("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1)*\]/ `] = lit`
vzZI7onFyElsg4t1Sc6M5QjivPVYbXyEAMrqXWW43+M=
`;

module.exports[n`DFA minimization >> 566: /[\w-]+(?=\()/ `] = lit`
T0B8Dui/4kquyhQpOnlfE8HpSYlrRX6BsOy2n12Kt5M=
`;

module.exports[n`DFA minimization >> 567: /^\[|\]$/ `] = lit`
h2hNyvq8E7GII+4Vx2B8al2oqPqB4oghiz6rLKBHsrY=
`;

module.exports[n`DFA minimization >> 568: /[|~*^$]?=/ `] = lit`
X4x2NHVqztxbtPo3At8lOQFr5hf/H9xl70seqYiEp2w=
`;

module.exports[n`DFA minimization >> 569: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/ `] = lit`
4CZjnVqERaI9ltaGoW/qtrLUlARa/PVYSLuJwa7OLMc=
`;

module.exports[n`DFA minimization >> 570: /(\(\s*)(?:even|odd)(?=\s*\))/i `] = lit`
c9yNi9ZbAF3WkKZnU2P/KGYrNScwnTDsNDiAAcHskvk=
`;

module.exports[n`DFA minimization >> 571: /(\s)[si]$/i `] = lit`
K8x7wTi/YL+SoNnpxN9DaYsaHcVqcmxjp/q0w/T+zlY=
`;

module.exports[n`DFA minimization >> 572: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/ `] = lit`
ajM6b1LoKHtCtlETyA/ea0U8BNxX+pHV+sUAMczx8Kw=
`;

module.exports[n`DFA minimization >> 573: /^(\s*)[-\w\xA0-\uFFFF]+/ `] = lit`
GjtQwTuTjy0GBWO74zLXo2BZ6aLa9xbaTocfcTPE+v0=
`;

module.exports[n`DFA minimization >> 574: /[\dn]+/ `] = lit`
yh+TkrwwFn2B+1znYvY5rfqWqtntACtFGjCxSvxQjME=
`;

module.exports[n`DFA minimization >> 575: /[+-]/ `] = lit`
9CwxFYt5Ut4fzH7O8kMVX3B+zs0mPqXCEJGE5uTg/9A=
`;

module.exports[n`DFA minimization >> 576: /\|$/ `] = lit`
5swum4M2wdhut02BzRvFGhfm5cLyBZW/r5A1GP9qhJk=
`;

module.exports[n`DFA minimization >> 577: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/ `] = lit`
RnEpC1IIFS2jU8dirk+5+1gZuqJ3L16zW6hOMWwlSa8=
`;

module.exports[n`DFA minimization >> 578: /\$\w+/ `] = lit`
RQJC+6hkWbDXNo5naUkdYhLDRPuqQa8CZNP/KrZmQto=
`;

module.exports[n`DFA minimization >> 579: /\b(?:ADD|ALL|AND|AS|ASC|ASCENDING|ASSERT|BY|CALL|CASE|COMMIT|CONSTRAINT|CONTAIN... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 580: /\b\w+\b(?=\s*\()/ `] = lit`
o6lXUcNyzD/nzKnl9btnLf5BYKIC3oqCVwGcFsU1zhQ=
`;

module.exports[n`DFA minimization >> 581: /\b(?:true|false|null)\b/i `] = lit`
onV315PQyobmKMFdSwieFHNIPEEhtBiEuUD5jmRykEk=
`;

module.exports[n`DFA minimization >> 582: /\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/ `] = lit`
PbZXPIp+SwErZIKzuFC/Td2jekB1R0k/oUi01Yt/1S8=
`;

module.exports[n`DFA minimization >> 583: /:|<--?|--?>?|<>|=~?|[<>]=?|[+*\/%^|]|\.\.\.?/ `] = lit`
lJzCIIJ/ItyxXHltDQVraJQrnyMp4PVlqJKRlHX9Yfs=
`;

module.exports[n`DFA minimization >> 584: /[()[\]{},;.]/ `] = lit`
cL2HxM2p/FcOqSmfqb0J4OVMJEPHlnV3HJO5n9O96gg=
`;

module.exports[n`DFA minimization >> 585: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/ `] = lit`
q2BJHXfAE0k/7oyqfcfI/g0WoLdyZTDaC8xv4du9lFM=
`;

module.exports[n`DFA minimization >> 586: /(:\s*)(?:\w+|\`(?:[^\`\\\r\n])*\`)(?=\s*[{):])/ `] = lit`
MAHDSyEIo4Q/g31snswrZniVgEKvuL6RCutzmV7N/3A=
`;

module.exports[n`DFA minimization >> 587: /(-\[\s*(?:\w+\s*|\`(?:[^\`\\\r\n])*\`\s*)?:\s*|\|\s*:\s*)(?:\w+|\`(?:[^\`\\\r\n])*\`)... `] = lit`
CVxwi4z3ZZYKyZ6SqSokmS996QVYAvH/JeW2fChi9UQ=
`;

module.exports[n`DFA minimization >> 588: /\`(?:[^\`\\\r\n])*\`/ `] = lit`
hxe26yJwbVwoYieDXWdf9VtK4YvZ873A/JmhQa2Q44s=
`;

module.exports[n`DFA minimization >> 589: /\B@\w*/ `] = lit`
yAghdg4CxpnS6TCyxHCXG0lGq8bqS9xSIHVHfPhdF10=
`;

module.exports[n`DFA minimization >> 590: /\$|\b(?:abstract|alias|align|asm|assert|auto|body|bool|break|byte|case|cast|cat... `] = lit`
Nb6ospAMXRal5cCMyG2TL9JxgfMSkZSU2eZ2mVyX0GY=
`;

module.exports[n`DFA minimization >> 591: /\|[|=]?|&[&=]?|\+[+=]?|-[-=]?|\.?\.\.|=[>=]?|!(?:i[ns]\b|<>?=?|>=?|=)?|\bi[ns]\... `] = lit`
cbLfLy76BfvGpblnawsRPvQuaVXYsWPapIPsoSP5Y4I=
`;

module.exports[n`DFA minimization >> 592: /\b(?:[ABCD][LHX]|E[ABCD]X|E?(?:BP|SP|DI|SI)|[ECSDGF]S|CR[0234]|DR[012367]|TR[3-... `] = lit`
YhFI3cTqpJ3nEAbcKLLUILUk2xD9BUbxciaDgRriJh8=
`;

module.exports[n`DFA minimization >> 593: /\b0x\.?[a-f\d_]+(?:(?!\.\.)\.[a-f\d_]*)?(?:p[+-]?[a-f\d_]+)?[ulfi]*/i `] = lit`
kU/KfHxqngvsbwZO5cYUBi9sZzeduZYSdTLjb8O6LRc=
`;

module.exports[n`DFA minimization >> 594: /^\s*#!.+/ `] = lit`
RgtMQ/A4EEmU4tsL5OHdoJ7ukXqOLa2fbxOQNvcfhfU=
`;

module.exports[n`DFA minimization >> 595: /(^|[^\\])(?:\/\+(?:\/\+(?:[^+]|\+(?!\/))*\+\/|(?!\/\+)[\s\S])*?\+\/|\/\/.*|\/\*... `] = lit`
YTXa+TkZ64QtnSAlRHVAG/xRIgaDPmQH5xPYNT4MPvA=
`;

module.exports[n`DFA minimization >> 596: /\b[rx]"(?:\\[\s\S]|[^\\"])*"[cwd]?|\bq"(?:\[[\s\S]*?\]|\([\s\S]*?\)|<[\s\S]*?>|... `] = lit`
MErqgovcPUObPjzVBV7+hAaLeN5Cbta3hoZYw9ce/1k=
`;

module.exports[n`DFA minimization >> 597: /\bq\{(?:\{[^{}]*\}|[^{}])*\}/ `] = lit`
lgHfMEAtx9Wyjjd1KD4mAGJmwOQKhK55MSZfThTotNk=
`;

module.exports[n`DFA minimization >> 598: /((?:\.\.)?)(?:\b0b\.?|\b|\.)\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:e[+-]?\d[\d_]*)?[ul... `] = lit`
pp/q+NaVy/78+AfzZPETxMTFoGZQF2LX4YUh8PAg3NA=
`;

module.exports[n`DFA minimization >> 599: /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/ `] = lit`
yCtByhd+2MUQa7MLyWP+HjRDmzX/zGLj/5KXX2wO1SU=
`;

module.exports[n`DFA minimization >> 600: /\b(?:async|sync|yield)\*/ `] = lit`
LDvxtkicxBBzkZFJuMo2VXr1P8U91xKe/1NJ4emkc+s=
`;

module.exports[n`DFA minimization >> 601: /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covarian... `] = lit`
KHjy2GhNBsSWf+1YkcD7elFh5RK2OdfdQffweMVBe1Y=
`;

module.exports[n`DFA minimization >> 602: /@\w+/ `] = lit`
ilIvR/2/jC3viAYCo4Q48z8zDnY/6Qk+n6wKjfC3jFc=
`;

module.exports[n`DFA minimization >> 603: /r?("""|''')[\s\S]*?\1/ `] = lit`
InfBv5KvKkntDIALxfwE2BIIuQHah3EcUSwX6skvnmU=
`;

module.exports[n`DFA minimization >> 604: /r?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/ `] = lit`
56x7/ElWIjLHi2tvF7poLfruGLXUJ7nbenwddSSTs+w=
`;

module.exports[n`DFA minimization >> 606: /\b(?:DEFINE|MEASURE|EVALUATE|ORDER\s+BY|RETURN|VAR|START\s+AT|ASC|DESC)\b/i `] = lit`
MiTGd3d2QWOrv9lAtFX6b0sR5c7Jk+avXtBhhn5jMdE=
`;

module.exports[n`DFA minimization >> 607: /\b\d+\.?\d*|\B\.\d+\b/i `] = lit`
4xgGwB66D1BzKmYqhp2N3Zk6/ITlfUugRFYhM2zlYss=
`;

module.exports[n`DFA minimization >> 608: /:=|[-+*\/=^]|&&?|\|\||<(?:=>?|<|>)?|>[>=]?|\b(?:IN|NOT)\b/i `] = lit`
iJcEE4lo7nWDzkGp+OtH9cUtpZ9YP/DXZ1UjU0esvUk=
`;

module.exports[n`DFA minimization >> 609: /[;\[\](){}\`,.]/ `] = lit`
5giS8Z1bpjYkodY4ECMscYMmDEbmoJVqoehnUcNRCQ0=
`;

module.exports[n`DFA minimization >> 610: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/).*)/ `] = lit`
ZD/ImayusrzcMO/5+srsSpcyMk46Og0wGcHuCpawBJI=
`;

module.exports[n`DFA minimization >> 611: /'(?:[^']|'')*'(?!')(?:\[[ \w\xA0-\uFFFF]+\])?|\w+\[[ \w\xA0-\uFFFF]+\]/ `] = lit`
fVCSNmTfhVnuH8xB5tM5fY6skHrsVS8+VsvgJptLndg=
`;

module.exports[n`DFA minimization >> 612: /\[[ \w\xA0-\uFFFF]+\]/ `] = lit`
jJ5ruNBivF4VsQxEAgQkqumZ6iaHV4svGXeU1op0N98=
`;

module.exports[n`DFA minimization >> 613: /"(?:[^"]|"")*"(?!")/ `] = lit`
TUaMaltJ8o/aI6ZLfs0TjLDqmDVt6pibeIZowuGTkng=
`;

module.exports[n`DFA minimization >> 614: /\b(?:TRUE|FALSE|NULL)\b/i `] = lit`
onV315PQyobmKMFdSwieFHNIPEEhtBiEuUD5jmRykEk=
`;

module.exports[n`DFA minimization >> 615: /--.*|\{-(?:[^-{]|-(?!\})|\{(?!-)|\{-(?:[^-{]|-(?!\})|\{(?!-))*-\})*-\}/ `] = lit`
MxexZDi9i8VUbNqHHIv7a+N5SjvIx23Svld04+1SQ8g=
`;

module.exports[n`DFA minimization >> 616: /\b(?:as|assert|else|forall|if|in|let|merge|missing|then|toMap|using|with)\b|\\u2... `] = lit`
bfSvM9ZkBA3VdN4gsYi8MW6gzQdglpGN3bKYOuII478=
`;

module.exports[n`DFA minimization >> 617: /\b(?:Some|None)\b/ `] = lit`
BLlFKIzuLhSiH6vRu+kbg06Etzlsy7DmOO8ia3NvRRM=
`;

module.exports[n`DFA minimization >> 618: /\b(?:False|True)\b/ `] = lit`
fUjx0fSBuAUdqzIpfdvA/dF1dxHvSCtOCyXJllag6Ok=
`;

module.exports[n`DFA minimization >> 619: /\bNaN\b|-?\bInfinity\b|[+-]?\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/ `] = lit`
iiZsjCuzD1OSdKv9e8+V+FzVFjAQsF2wOSfhSaQHCFA=
`;

module.exports[n`DFA minimization >> 620: /\/\\|\/\/\\\\|&&|\|\||[!=]=|===|\/\/|->|\+\+|::|[+*#@=:?<>|\\\u2227\u2a53\u2261... `] = lit`
+8mO4ZO6fRr5VdRipVhv1C+cojlDJiQJ1lfq3h3oqf4=
`;

module.exports[n`DFA minimization >> 621: /\.\.|[{}\[\](),.\/]/ `] = lit`
polnrVttcOzVzyAnM6D2kwxTR8PxhmNu7Jpu5gfu+0E=
`;

module.exports[n`DFA minimization >> 622: /\b[A-Z]\w*\b/ `] = lit`
Ye1IBpG9ZARUu5zhItXFiGwfWUmbeqmESVDcqbuJnCY=
`;

module.exports[n`DFA minimization >> 623: /"(?:[^"\\]|\\.)*"|''(?:[^']|'(?!')|'''|''\$\{)*''(?!'|\$)/ `] = lit`
0LvhJ68FdiUhgLEgkDkNyh8w5hHAvH+8OYKl8wwNZL4=
`;

module.exports[n`DFA minimization >> 624: /\`[^\`]*\`/ `] = lit`
wqrwXonvhUKrYj6GGJfYIs9z3+Y6VCQXAHh7jGYQVuQ=
`;

module.exports[n`DFA minimization >> 625: /\bhttps?:\/\/[\w.:%!$&'*+;=@~-]+(?:\/[\w.:%!$&'*+;=@~-]*)*(?:\?[\/?\w.:%!$&'*+;... `] = lit`
FXgToPC7c3GZTrd3Tjxyt0nwhmAQRmuPUnhiTjj2x/A=
`;

module.exports[n`DFA minimization >> 626: /\benv:(?:(?!\d)\w+|"(?:[^"\\=]|\\.)*")/ `] = lit`
Y9oalAC6DQzTgd7vsPUC9B1SaM7Rwoby+8M/rD3btPU=
`;

module.exports[n`DFA minimization >> 627: /\bsha256:[\da-fA-F]{64}\b/ `] = lit`
vzZANNae1M2giVteWhgFnrQBXh4WS9HC4lucaawCjzQ=
`;

module.exports[n`DFA minimization >> 628: /^env/ `] = lit`
D7/MEuzrQmQTcmkAYzf/nE2o7Q0EfMRZWNUuhYHPtvs=
`;

module.exports[n`DFA minimization >> 629: /sha256/ `] = lit`
wf/atCMh+IZQCSkkiSm6sLJvDpMLBSizhzwyaHCOFwA=
`;

module.exports[n`DFA minimization >> 630: /[\da-fA-F]{64}/ `] = lit`
a8WAW0kWZoFPePpCFpSnF1fY0prHdmP907C8aBIrth8=
`;

module.exports[n`DFA minimization >> 631: /\$\{[^{}]*\}/ `] = lit`
C1cRn1dEAg9nGBuXhnmSvVLl77kH/W9qKh7oFHIOrJA=
`;

module.exports[n`DFA minimization >> 632: /\$\{|\}/ `] = lit`
1M59/tycAMO4/JORJr3jTgBMP1AstPG+Rn21YQNNcW0=
`;

module.exports[n`DFA minimization >> 633: /(^\$\{)[\s\S]+(?=\}$)/ `] = lit`
6DphdHwfduXEGGEZDP8KbmDa4bMpC3MHQ9NVp7LhGYY=
`;

module.exports[n`DFA minimization >> 634: /^(?:\*{3}|-{3}|\+{3}).*$/m `] = lit`
nqMKUEyOqjdwE65IaYWTajJdTpOHeuJ1jgYXptjuQ/g=
`;

module.exports[n`DFA minimization >> 635: /^@@.*@@$/m `] = lit`
YRS8FitgGB2sxG6NvMf/Ig+fYwQfOPJeiydwNcjKVLk=
`;

module.exports[n`DFA minimization >> 636: /^\d+.*$/m `] = lit`
zfOp0XQac23ApbkC5dcU1HCAwaOszhYxKJjro6B6Zjk=
`;

module.exports[n`DFA minimization >> 637: /^(?:[-].*(?:\r\n?|\n|(?![\s\S])))+/m `] = lit`
dWkN58JvOaFXXx9iAXAxX94sBOey6pfeQB+V7bZulvY=
`;

module.exports[n`DFA minimization >> 638: /^(?:[<].*(?:\r\n?|\n|(?![\s\S])))+/m `] = lit`
wBirxwJkJX7/u+SlkCdVnw6ikKsojqbKcGYTw+ayZms=
`;

module.exports[n`DFA minimization >> 639: /^(?:[+].*(?:\r\n?|\n|(?![\s\S])))+/m `] = lit`
0D4mhCA0sNg0FxR29MlaR+N0SBKHAmmSvXDERMyOLbg=
`;

module.exports[n`DFA minimization >> 640: /^(?:[>].*(?:\r\n?|\n|(?![\s\S])))+/m `] = lit`
cZIniKuJRKKxhr8SwcJmEmS5OY49Tp2vbNwR9T6SyFc=
`;

module.exports[n`DFA minimization >> 641: /^(?:[ ].*(?:\r\n?|\n|(?![\s\S])))+/m `] = lit`
e0sZSo++zWkFHlXaSpJjxuyG2ax/c2pwPYQUmdAxqew=
`;

module.exports[n`DFA minimization >> 642: /^(?:[!].*(?:\r\n?|\n|(?![\s\S])))+/m `] = lit`
/+dMVvhsc/Q9E0zyDOBHw2m/eil8Oex8iOlCv3E97Io=
`;

module.exports[n`DFA minimization >> 643: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/ `] = lit`
qGMS5gwdR40mZLeoUvuzzof8gTSF6hIcxsSNNtX+8AQ=
`;

module.exports[n`DFA minimization >> 644: /[\s\S]/ `] = lit`
oOms04J0tUZu36NnFEyi9iATfROV+nyJP6c5/mY36mc=
`;

module.exports[n`DFA minimization >> 645: /^{#[\s\S]*?#}$/ `] = lit`
oqcZ1KoYTlvK9MH9OVIoA0w75xQk2Bg3xcsr1OAq0vY=
`;

module.exports[n`DFA minimization >> 646: /\b[a-z_]\w+(?=\s*\()/i `] = lit`
CyM2YO0tc/nYHcCHgx7qtXuFOfC12ns3L3yhRGx2xX8=
`;

module.exports[n`DFA minimization >> 647: /\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/ `] = lit`
4Qsr0/75Ze2Orxa9HaBNgkhcw1M6U4w2iHSnh5oEHoE=
`;

module.exports[n`DFA minimization >> 648: /[-+*\/%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/ `] = lit`
XF90SeHc4i7yRHQPxG+dmqFWNtUqY/6++OU+F8ZGZDY=
`;

module.exports[n`DFA minimization >> 649: /[Tt]rue|[Ff]alse|[Nn]one/ `] = lit`
BkAeHnNWahMv9aLrWvv/bEapimyBzIF3t74IdMqYA00=
`;

module.exports[n`DFA minimization >> 650: /\b\w+?\b/ `] = lit`
G7q1DZSuo68ahopKRciJi+dd+0bshV5qEIbLHV+5XF4=
`;

module.exports[n`DFA minimization >> 651: /[{}[\](),.:;]/ `] = lit`
OHFTBemCtRyoCZfb2i6ku3etAe4ylzURp1HkiTlm7Ew=
`;

module.exports[n`DFA minimization >> 652: /(^{%[+-]?\s*)\w+/ `] = lit`
0u61mQWy+6ERHztaFbc25U97yJoLMwyOt3JSK2LsuBI=
`;

module.exports[n`DFA minimization >> 653: /^{[{%][+-]?|[+-]?[}%]}$/ `] = lit`
cfOXXN5ftvwh618HCRepiy80VrLkRTfhXWX574SUABQ=
`;

module.exports[n`DFA minimization >> 654: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/ `] = lit`
q2BJHXfAE0k/7oyqfcfI/g0WoLdyZTDaC8xv4du9lFM=
`;

module.exports[n`DFA minimization >> 655: /(\|)\w+/ `] = lit`
asxHyI7/SLX1eKZSB/kMMw70WYCafUZVGEQVbk+8+Z8=
`;

module.exports[n`DFA minimization >> 656: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 657: /^\$(?:ORIGIN|INCLUDE|TTL)(?=\s|$)/m `] = lit`
3HAmeiLvNTUxBbS++p/IXB4jT20SDFHWDOc3r87Nwlo=
`;

module.exports[n`DFA minimization >> 658: /[()]/ `] = lit`
iAI7/Su0bzosQ0vbEy+aXVSrow0ZALjLD4H9+bGxiKw=
`;

module.exports[n`DFA minimization >> 659: /(^|\s)(?:IN|CH|CS|HS)(?=\s|$)/ `] = lit`
nKlAjSloqlCP5KypaSnUOgvVJAwrbCap9S2VBuULIDU=
`;

module.exports[n`DFA minimization >> 660: /(^|\s)(?:A|A6|AAAA|AFSDB|APL|ATMA|CAA|CDNSKEY|CDS|CERT|CNAME|DHCID|DLV|DNAME|DN... `] = lit`
h9Jw7ep3NoHQ1lRF42CdSG2zVbrr8CBuIaJ6h1CqT0k=
`;

module.exports[n`DFA minimization >> 661: /(^\$ORIGIN[ \t]+)\S+/m `] = lit`
EDknivbKEe1zU5EKxmRWoxggUYvoXxlBo1hbtA8zdEg=
`;

module.exports[n`DFA minimization >> 662: /(^|\s)@(?=\s|$)/ `] = lit`
6JshxzTH3PcXVgHHiNosrf8sG6/C3Hs0inJ0SA/ZzsU=
`;

module.exports[n`DFA minimization >> 663: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/ `] = lit`
Q5UebfbnC2qWVSIrnOyuIvXQv00m3dSvbFbNUeRgE6w=
`;

module.exports[n`DFA minimization >> 664: /---|\.\.\.|[:[\]{}\-,|>?]/ `] = lit`
LmkdjCZGgXFS8yEI7u2vNmqtZ2mz+IE98kncuNCLC04=
`;

module.exports[n`DFA minimization >> 665: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAIN... `] = lit`
0Cp2H3GEGvJ782T5uTY30rucfYxAW1cytK7xH/tt5y8=
`;

module.exports[n`DFA minimization >> 666: /\(\*[\s\S]*?\*\)/ `] = lit`
RMt5TYlGr0q9sEtoJlUvDj75mYDpZWuE8JxhfU0nr8E=
`;

module.exports[n`DFA minimization >> 667: /\b[a-z]\w*(?:[ \t]+[a-z]\w*)*\b/i `] = lit`
r0n0w9tNIrNJ2zulkWpMYNdg0QZ9pNTCFwRir+x9kS0=
`;

module.exports[n`DFA minimization >> 668: /\([:\/]|[:\/]\)|[.,;()[\]{}]/ `] = lit`
xtdcO31zMXoLaXNd9MezybG0YoEOP575RnPOdUzNZvI=
`;

module.exports[n`DFA minimization >> 669: /[-=|*\/!]/ `] = lit`
Saa823xE7KFjMr9tTUqTnXMFbRJLipdI4k217rk9zDk=
`;

module.exports[n`DFA minimization >> 670: /"[^"\r\n]*"|'[^'\r\n]*'/ `] = lit`
jvkP18LHgJ+SnFBQl2C7GLOuB7g3uzpWt+3V1fYDsOs=
`;

module.exports[n`DFA minimization >> 671: /\?[^?\r\n]*\?/ `] = lit`
dg6rNohMhSuZCDIlkQqMquTA3T9QicG+7BXgbIQfAkE=
`;

module.exports[n`DFA minimization >> 672: /^(\s*)[a-z]\w*(?:[ \t]+[a-z]\w*)*(?=\s*=)/im `] = lit`
5HRpQT5cNYpD1M8cxil+2vyBD29SKvvBYDky4e0nOwY=
`;

module.exports[n`DFA minimization >> 673: /[;#].*/ `] = lit`
gycqu4rcMC34M38nnbgZbYZYXxYg4BLCqTF8M3UoCBc=
`;

module.exports[n`DFA minimization >> 674: /(^[ \t]*)\[.+]/m `] = lit`
WqshGJ6NAfcOaM+Omg57MYAhxCbNFU23dhulRXR+k7I=
`;

module.exports[n`DFA minimization >> 675: /(^[ \t]*)[^\s=]+(?=[ \t]*=)/m `] = lit`
sxjY6QzDarGacieJdb4HhKdCcw+RN/gQVqm25yK6hw4=
`;

module.exports[n`DFA minimization >> 676: /=.*/ `] = lit`
NLrlGHXpNRmrrlZV9rw0lW/+PMBQye0TqbtRP5OyAOU=
`;

module.exports[n`DFA minimization >> 677: /\\\\[\[\]{},!?.*]/ `] = lit`
HnagtARW6MWTw/MPiQ26gRxE/vBmdo703ZNhPCExgv8=
`;

module.exports[n`DFA minimization >> 678: /[!?]|\.\.|\*{1,2}/ `] = lit`
CK0UiJYwM0p3MjilCgaMq4wrodDxNJ/Oe9iqeAvhRKE=
`;

module.exports[n`DFA minimization >> 679: /[\[\]{},]/ `] = lit`
l8yHixblpPQpHfrS/PFUryfpfmMuRMhhusxjwhbjlz0=
`;

module.exports[n`DFA minimization >> 680: /'(?:%.|[^%'\r\n])+'/ `] = lit`
Da6z+B6vZac17/w7tnNguwKBIJ8ygKnCwX9UvZ5qM1A=
`;

module.exports[n`DFA minimization >> 681: /\b(?:across|agent|alias|all|and|attached|as|assign|attribute|check|class|conver... `] = lit`
MyubF1Pd2d8NinQ2J7L7WeEHSBcueQmt4YbQi4q3LOQ=
`;

module.exports[n`DFA minimization >> 682: /:=|<<|>>|\(\||\|\)|->|\.(?=\w)|[{}[\];(),:?]/ `] = lit`
wpoZ/oWL0amEUPf7bjaHEkFTeVeIInLfd2H7Z5XVcRI=
`;

module.exports[n`DFA minimization >> 683: /\\\\|\|\.\.\||\.\.|\/[~\/=]?|[><]=?|[-+*^=~]/ `] = lit`
8/yZdfXrjsmVG56+Qgz6td0bizYr/+P4MfmeAuK7fs4=
`;

module.exports[n`DFA minimization >> 684: /\b[A-Z][\dA-Z_]*\b/ `] = lit`
UcIDU2iHr2KOagvx0q01C1TjLtgmoYFKP4gj/qvdv4c=
`;

module.exports[n`DFA minimization >> 685: /\b0[xcb][\da-f](?:_*[\da-f])*\b/i `] = lit`
5LJtxPzciICOdYnDl6tZsSIJfuE3dnclobTTBN7CWrE=
`;

module.exports[n`DFA minimization >> 686: /(?:\b\d(?:_*\d)*)?\.(?:(?:\d(?:_*\d)*)?e[+-]?)?\d(?:_*\d)*\b|\b\d(?:_*\d)*\b\.?... `] = lit`
74LchrOr2pqbNeVjrWNxsSeROipMVbBwUM+bmIC6LB4=
`;

module.exports[n`DFA minimization >> 687: /"([^[]*)\[[\s\S]*?\]\1"/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 688: /"([^{]*)\{[\s\S]*?\}\1"/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 689: /"(?:%\s*\n\s*%|%.|[^%"\r\n])*"/ `] = lit`
nOasBRDB6/uO+Rq3Uw95Cz8No/JwLTZRkyvRrYaU514=
`;

module.exports[n`DFA minimization >> 690: /^#[\s\S]*/ `] = lit`
k9UYgMPWoUzKx86aplpEFInBpYCmLO3I20oRYsDkPbE=
`;

module.exports[n`DFA minimization >> 691: /^<%[-_=]?|[-_]?%>$/ `] = lit`
ozGj9p8Ual1BpB3y6uYmtGVO2airm77VH7PZy95Ot/c=
`;

module.exports[n`DFA minimization >> 692: /#.*/m `] = lit`
b/uLXXb070yRLX6+0FI02AevcjQLDBY4msyLeMN7nBk=
`;

module.exports[n`DFA minimization >> 693: /\w+\??:(?!:)/ `] = lit`
arIv0tRV062el6zygajeuFR9xx5EksgQkSEWpSpAVdA=
`;

module.exports[n`DFA minimization >> 694: /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i `] = lit`
jlnYxogenwkdHtbK6DSPaAoxoXVbis56SQEF6F73y4A=
`;

module.exports[n`DFA minimization >> 695: /\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|pro... `] = lit`
oFbAre9iwV5LN33V/BgQfotE95a/MkNAIjJKXxSLag8=
`;

module.exports[n`DFA minimization >> 696: /<<|>>|[.,%\[\]{}()]/ `] = lit`
NapRp9SkjW16lvCv8rNJMdAQHaWOWsltnkvg3gYHqI4=
`;

module.exports[n`DFA minimization >> 697: /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\... `] = lit`
raO+I6WlD04ShRVusjIz5o9cQXlR9B53C+CFUe2RNaw=
`;

module.exports[n`DFA minimization >> 698: /(^|[^:]):\w+/ `] = lit`
Q0faWphtFzBQKFwrRBakO+rdRd3rZG7nYaAoYSoe4Tg=
`;

module.exports[n`DFA minimization >> 699: /(^|[^&])&(?:[^&\s\d()][^\s()]*|(?=\())/ `] = lit`
XixwTbyp7qlcK+OTi8HcrQ/VHbRyQfDTohlGxIYqU6M=
`;

module.exports[n`DFA minimization >> 700: /(^|[^&])&\d+/ `] = lit`
m3rptyj8SXHO0V25/DEp9d47BopY3mVrTvkYnDH/zjQ=
`;

module.exports[n`DFA minimization >> 701: /\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~]... `] = lit`
7P4H2sDspxlYG3L5BLpEzZwCa2pKATA2qIEQnVmwy3w=
`;

module.exports[n`DFA minimization >> 702: /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n... `] = lit`
NPSME6oz4ICurdXFhliEvm3cf857oS3cVsOsE25xYs8=
`;

module.exports[n`DFA minimization >> 703: /("""|''')[\s\S]*?\1/ `] = lit`
I8fCVkvh9OVmLKeWxt9Pu7cySmvoqv2UWEM4K0EsOKc=
`;

module.exports[n`DFA minimization >> 704: /([^<])<(?!<)/ `] = lit`
Vl7FAYb4G7ztrgJpBCRpwDkHbFSy22tBLWzCYK2nGNI=
`;

module.exports[n`DFA minimization >> 705: /([^>])>(?!>)/ `] = lit`
6q7uZbSIWLnr4ulFbaXSPLhTgHD+vSkUTtw5U6epT1s=
`;

module.exports[n`DFA minimization >> 706: /--.*|{-[\s\S]*?-}/ `] = lit`
ZdiEWno1Gc1doEAxXJw27YqOfC3aZ0Wt15LQZOCkBqc=
`;

module.exports[n`DFA minimization >> 707: /\b(?:alias|as|case|else|exposing|if|in|infixl|infixr|let|module|of|then|type)\b... `] = lit`
SXFdIcAVzUrUdM4CIz6s6FlD5wqDtFzcHo34mA/0c8E=
`;

module.exports[n`DFA minimization >> 708: /\b(?:abs|acos|always|asin|atan|atan2|ceiling|clamp|compare|cos|curry|degrees|e|... `] = lit`
IoZxdw9W7y4CPlZ7JNCwnA0m5dBTiCo9rXdocBArjcU=
`;

module.exports[n`DFA minimization >> 709: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[0-9a-f]+)\b/i `] = lit`
XrQYcegWH4IAE6q5AmMh6HR8DKLSb28bdoztEZB4UeY=
`;

module.exports[n`DFA minimization >> 710: /\s\.\s|[+\-\/*=.$<>:&|^?%#@~!]{2,}|[+\-\/*=$<>:&|^?%#@~!]/ `] = lit`
9yMxhqLPEHeL1afU1mzywV3PtP1YpSJGtR2iotg51/0=
`;

module.exports[n`DFA minimization >> 711: /\b(?:[A-Z]\w*\.)*[a-z]\w*\b/ `] = lit`
z/ZvkdPDLRkKQpA0RA+Qg6zpjfIChWDi3/Wt7ovuaAE=
`;

module.exports[n`DFA minimization >> 712: /\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/ `] = lit`
iSw3gucFKDRTZEwcbvJFMBBy/oHvxXa7C5qIfn2eBLg=
`;

module.exports[n`DFA minimization >> 713: /[{}[\]|(),.:]/ `] = lit`
5tApa0xDBKSzJOwSOXyMFZtDfrpFTcGM+wy8uJaOBzc=
`;

module.exports[n`DFA minimization >> 714: /'(?:[^\\'\r\n]|\\(?:[abfnrtv\\']|\d+|x[0-9a-fA-F]+))'/ `] = lit`
6ALwjrbDrOjda28LPHVU1IsgF4jAJEELdhE/1/RC9Ic=
`;

module.exports[n`DFA minimization >> 715: /^\s*import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+(?:[A-Z]\w*)(?:\.[A-Z]\w*)*)?(?:... `] = lit`
m/4Oc/k/zrXrLFLT6zMReKx45dPmjTnecYiAHJmdq3w=
`;

module.exports[n`DFA minimization >> 716: /"(?:[^\\"\r\n]|\\(?:[abfnrtv\\"]|\d+|x[0-9a-fA-F]+))*"/ `] = lit`
s9/jal3csteUCZlX7zvx20/PfKtPnpsk8an6nvvzykY=
`;

module.exports[n`DFA minimization >> 717: /\b(?:import|as|exposing)\b/ `] = lit`
QJuXSeGGoljkO701I7w/MQPekNwYdlQzgEPVmbWOqbY=
`;

module.exports[n`DFA minimization >> 718: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m `] = lit`
+2oUSwJPUeCyoxMAjP1kVryIPHcQ9OGCjPjTZ3g9y/Y=
`;

module.exports[n`DFA minimization >> 719: /\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B... `] = lit`
UUPqeIVIkEIzpiDN1VMnpedDibObkecs0/eJTeYcoWM=
`;

module.exports[n`DFA minimization >> 720: /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|o... `] = lit`
W2OA+MQiqsA1sH+o/LXadmsfY2SfTLmmKqll1XkPbPo=
`;

module.exports[n`DFA minimization >> 721: /(?!\d)\w+(?=\s*(?:[({]))/ `] = lit`
GT1pGE19dDLy1DbQltPnY4X6jAUFTlD2QqwC9E6OCCs=
`;

module.exports[n`DFA minimization >> 722: /[\[\](){},;]|\.+|:+/ `] = lit`
Ms7VWz5vgE1uG3l6Y3nStitLjErBRktmqfmU59z5v1w=
`;

module.exports[n`DFA minimization >> 723: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\... `] = lit`
YT37HpwdvwjR2naqT0Gr8kcTsE7zugKUFyoztwHkSh4=
`;

module.exports[n`DFA minimization >> 724: /[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/ `] = lit`
LciYQu09mY2itTgZ0yoMnUqMP8UuXH7sX/pGeH2jL3g=
`;

module.exports[n`DFA minimization >> 725: /^<%[-=]?|-?%>$/ `] = lit`
uscvRl/fhdBw3raOxYqFmHgEbJUFj/zJKdBSQKoMn9o=
`;

module.exports[n`DFA minimization >> 726: /(^|[^.])\.\.(?!\.)/ `] = lit`
TDIs2DOQCnUOrkuj4tgoIcBxJmUk8VNT7I29mTXC4zM=
`;

module.exports[n`DFA minimization >> 727: /^<%=?|%>$/ `] = lit`
JmRG8vUUXvVgu4qrMRSS0ZzCsHcL+nJ7mkO1e+InavY=
`;

module.exports[n`DFA minimization >> 728: /%.+/ `] = lit`
V2Aku1fd8YjA1mBTU9bIoO30Ud2vcTxGWgqhdnf+kZE=
`;

module.exports[n`DFA minimization >> 729: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/ `] = lit`
akImaX1oeIs946lp1rDxmhD7L8YOCu1eRG4eC6MnJbI=
`;

module.exports[n`DFA minimization >> 730: /\b[a-z][\w@]*(?=\()/ `] = lit`
8jIVLowP+x30Kxph8XJauR6AcOt5sXdbbMqZwZT4YcA=
`;

module.exports[n`DFA minimization >> 731: /\b[a-z][\w@]*/ `] = lit`
cucFahMfZIh3mHdQuqr8kXRGCuJTwH7z4EgbfHq3xQc=
`;

module.exports[n`DFA minimization >> 732: /[()[\]{}:;,.#|]|<<|>>/ `] = lit`
vR2lWKWEsNxoVBgq40dlhXSK6l/cnhSzpHYDHChd3JU=
`;

module.exports[n`DFA minimization >> 733: /"(?:\\.|[^\\"\r\n])*"/ `] = lit`
vAWlB1EdyUqSGPPC0ql3/BUjpcILwwRJYbUAuqQM8gY=
`;

module.exports[n`DFA minimization >> 734: /'(?:\\.|[^\\'\r\n])+'(?=\()/ `] = lit`
tzkDCFxo1wPfE1HLLdmUzBeGclY6lMytd07FhsfzjqI=
`;

module.exports[n`DFA minimization >> 735: /'(?:\\.|[^\\'\r\n])+'/ `] = lit`
y50xYTKlRVMwr1GUEHx7DoZoyDNRcjhDd74TdkSg0/w=
`;

module.exports[n`DFA minimization >> 736: /\$\\?./ `] = lit`
l9VRozhy8Dq/1AcWc2IgsD97hTLlCeM9JwFHgsCf3c0=
`;

module.exports[n`DFA minimization >> 737: /\d+#[a-z0-9]+/i `] = lit`
ghkJ3xQEV5pdD6m+aNO+ETW35tl53WmwSobJHbV9k0s=
`;

module.exports[n`DFA minimization >> 738: /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i `] = lit`
/CMCC0Vt/DT0NahQrLDQBfipknVriSoOdfB5yXtoduM=
`;

module.exports[n`DFA minimization >> 739: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/ `] = lit`
4q0j5rQ1UAjuzszIxRlWjKBlyooaVcaKUZN9gSBWDvY=
`;

module.exports[n`DFA minimization >> 740: /[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not... `] = lit`
brMI4Z3xanvnGLtSkmKLkHsvdKzhpJOKPdLo9BloE+c=
`;

module.exports[n`DFA minimization >> 741: /(^|[^<])<(?!<)/ `] = lit`
YdWxOvQgoU7CAPMZu8J4877qIv1zF283CGTBhrivOCo=
`;

module.exports[n`DFA minimization >> 742: /(^|[^>])>(?!>)/ `] = lit`
MA5qTip3/9OBuQxVdPWX1mpxoQ3oWLrEHkoaLXNqcwQ=
`;

module.exports[n`DFA minimization >> 743: /(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e[+-]?\d+)?\b/i `] = lit`
yAyhJIeO33ZjlX2cNmJWHDoppBbF6FoaTtA9WLaTIUI=
`;

module.exports[n`DFA minimization >> 744: /\b(?:TRUE|FALSE)\b/i `] = lit`
kPiBOQvqbACAoKWacUeiIbdyS5DG8ByS7p6jUbRTaMI=
`;

module.exports[n`DFA minimization >> 745: /[-+*\/^%=&,]|<[=>]?|>=?/ `] = lit`
5BrU1OrPfJniBtsPyv+YUR/ZXyL/hT+oRPKInZENgS4=
`;

module.exports[n`DFA minimization >> 746: /[[\]();{}|]/ `] = lit`
s0CUwG2CGaVAxTMIa2f+y3NDs69NccTO1ha1b6QzkPg=
`;

module.exports[n`DFA minimization >> 747: /(\bN\(\s*)"(?:[^"]|"")*"(?=\s*\))/i `] = lit`
YW4ZnEZ+tEX9NeZbLZ6HVYVoOGjPNoZBi7WUJZDw2HU=
`;

module.exports[n`DFA minimization >> 748: /(?:'[^']*'|(?:[^\s()[\]{}<>*?"';,$&]*\[[^^\s()[\]{}<>*?"']+\])?\w+)!/ `] = lit`
lurgBhEg1pgCDZq6sRcIfK3E+KQzNVfxakWITZyXuaw=
`;

module.exports[n`DFA minimization >> 749: /\b[A-Z]\w*(?=\()/i `] = lit`
R5i5wW2J9yqoWe5/lu42BpzA8dXwyUUDprma8KmnOdQ=
`;

module.exports[n`DFA minimization >> 750: /\$?\b(?:[A-Z]+\$?\d+:\$?[A-Z]+\$?\d+|[A-Z]+:\$?[A-Z]+|\d+:\$?\d+)\b/i `] = lit`
oqz5xob/IPkGfoH7XPxmRVp5Rs106Yj1NbqvSD/GdP8=
`;

module.exports[n`DFA minimization >> 751: /\b[A-Z]+\d+\b|\$[A-Za-z]+\$?\d+\b|\b[A-Za-z]+\$\d+\b/ `] = lit`
a0h6Z2GEKDrtV94Hs9i8iOOsDW7mlgXL8kAC27TZ4CI=
`;

module.exports[n`DFA minimization >> 752: /!$/ `] = lit`
N2lpB7h4Z9aZR3CFHpsfBecofCeu1bFqySvoSf6q8aU=
`;

module.exports[n`DFA minimization >> 753: /'/ `] = lit`
K4QabsgJfrym3XGCQfrFWI7SDpJrFObfLYprcfWmQ1o=
`;

module.exports[n`DFA minimization >> 754: /\$?[A-Z]+\$?\d+/i `] = lit`
t8mUplu0G8llqmmiWql3fSXF3GtB+NIl07bYv8xnRhY=
`;

module.exports[n`DFA minimization >> 755: /\$?[A-Z]+/i `] = lit`
iwbMCaYgky4qWGF5yezz4YpOKNpp/lmWCbrqgZtiJWo=
`;

module.exports[n`DFA minimization >> 756: /\$?\d+/ `] = lit`
RFnC6F8Sso+K5aJoLRpUR116i1pH6EtCvGCjFkQEb5g=
`;

module.exports[n`DFA minimization >> 757: /[^[\]]+$/ `] = lit`
bjmzsyHdANDvmNgGvQa02npmJhUtzhhlAvDzhpZUWsY=
`;

module.exports[n`DFA minimization >> 758: /\[[^[\]]+\]$/ `] = lit`
7Qc6GRp07AXKs+wJFmxa53epLRfM8mFdMAwCEenfLVc=
`;

module.exports[n`DFA minimization >> 759: /[[\]]/ `] = lit`
h2hNyvq8E7GII+4Vx2B8al2oqPqB4oghiz6rLKBHsrY=
`;

module.exports[n`DFA minimization >> 760: /\b(?:let|return|use|yield)(?:!\B|\b)|\b(?:abstract|and|as|assert|base|begin|cla... `] = lit`
Ri8md3MbgYIhaQBupV/NiTi9s5NGsDfQwkMxH8X29II=
`;

module.exports[n`DFA minimization >> 761: /([<>~&^])\1\1|([*.:<>&])\2|<-|->|[!=:]=|<?\|{1,3}>?|\??(?:<=|>=|<>|[-+*\/%=<>])... `] = lit`
mcDEUjizRyrvAXEzxbOxTB9GhnEiHBL+q93Zo6zfjPY=
`;

module.exports[n`DFA minimization >> 762: /\[<.+?>\]/ `] = lit`
CszL9yYQ7HEaNDtnhpNYPGlETn3GJexL/wdROhYA7l0=
`;

module.exports[n`DFA minimization >> 763: /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|"(?:\\[\s\S]|[^\\"])*")B?|'(?:[^\\']|\\(?:.|\... `] = lit`
OBr0RKv8Vbu5GGGQqxa38x4NN62kETYkOJ1o/6MSBtg=
`;

module.exports[n`DFA minimization >> 764: /(\b(?:exception|inherit|interface|new|of|type)\s+|\w\s*:\s*|\s:\??>\s*)[.\w]+\b... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 765: /^[^\r\n\S]*#.*/m `] = lit`
/Eb69wdtI3zqirclq0G2ktZnbf3AI7+Q1Liq6wPDVGM=
`;

module.exports[n`DFA minimization >> 766: /\b0x[\da-fA-F]+(?:un|lf|LF)?\b/ `] = lit`
4i1xcZuXkh6zCR9BeewIg8hFn9P1th7TQN86uwMELLU=
`;

module.exports[n`DFA minimization >> 767: /\b0b[01]+(?:y|uy)?\b/ `] = lit`
dq6K9Fb+SLmDA57JfrT+eXqOIZxOJdYxk492rOHxv/k=
`;

module.exports[n`DFA minimization >> 768: /(?:\b\d+\.?\d*|\B\.\d+)(?:[fm]|e[+-]?\d+)?\b/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 769: /\b\d+(?:[IlLsy]|u[lsy]?|UL)?\b/ `] = lit`
jBnWNOQExULCd/8Oz9YncRJaJojwi8esmnYHMbkyoY8=
`;

module.exports[n`DFA minimization >> 770: /[_a-z]\w*(?=\s*\{)/i `] = lit`
V3LxTRXqBatAJedQcaRK+j2Bmr20X6LSIJb1KpXbWpw=
`;

module.exports[n`DFA minimization >> 771: /(^|[^\\])\(\*[\s\S]*?\*\)/ `] = lit`
gwPjeoxHoeA/LTVAFCf1mAk6pxZBJ75uM/W9meU8Nuw=
`;

module.exports[n`DFA minimization >> 772: /^\[<|>\]$/ `] = lit`
2tHoQG8ypC9dZquEfxE2Hq4FeJs17GXcLjehGGEMgos=
`;

module.exports[n`DFA minimization >> 773: /->|\*/ `] = lit`
yTvdSPEKxB4ti60wZaR3fnBJL5Mwu0XKnRPYyw2Ymok=
`;

module.exports[n`DFA minimization >> 774: /^\w+$|(^|;\s*)[A-Z]\w*(?=\()/ `] = lit`
kUxXFUkRizPKmEYTvJANF4DHY4WOSTZKLN0my6ACACI=
`;

module.exports[n`DFA minimization >> 775: /(\s*#)\b(?:else|endif|if|light|line|nowarn)\b/ `] = lit`
LPfyM8GOH7W6w6LWgjAYFQ6JHP9MFudehWOXrgVCrkE=
`;

module.exports[n`DFA minimization >> 776: /(^|\s)R\/\s+(?:\\\S|[^\\\/])*\/(?:[idmsr]*|[idmsr]+-[idmsr]+)(?=\s|$)/ `] = lit`
2G/9Ky3ajA3O5K8+1iBNqXD+97lSo46d+z4CoIVNG+o=
`;

module.exports[n`DFA minimization >> 777: /(^|\s)[tf](?=\s|$)/ `] = lit`
+kcDjpEtPYIwqlrowEeEHbiFIb6mlKKMCrsc70Y5sfg=
`;

module.exports[n`DFA minimization >> 778: /(^|\s)[A-Z0-9\-]+"\s(?:\\\S|[^"\\])*"/ `] = lit`
4P9QfRDlKCs98b1yF1i35di8Bu00Oe0LUZrcFNxQ/hQ=
`;

module.exports[n`DFA minimization >> 779: /(^|\s)USING:(?:\s\S+)*(?=\s+;(?:\s|$))/ `] = lit`
IMbIdCanhyBzK+28d0W/8vBX92tGk0DWHHFAV7WJv4Y=
`;

module.exports[n`DFA minimization >> 781: /(^|\s)(?:or|2nipd|4drop|tuck|wrapper|nip|wrapper\?|callstack>array|die|dupd|cal... `] = lit`
q7cAfbWbv9PSKdwwVQO9AfY9dkpPefBk/pwA7l+WrpE=
`;

module.exports[n`DFA minimization >> 783: /(^|\s)(?:number=|next\-power\-of\-2|\?1\+|fp\-special\?|imaginary\-part|float>b... `] = lit`
48v3pLy5nv8U3M11EjgroazvBiR0auDqbsufyb5f2zE=
`;

module.exports[n`DFA minimization >> 784: /(^|\s)<(?!=+>|-+>)\S+>(?=\s|$)/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 785: /(^|\s)(?:=======|recursive|flushable|>>|<<<<<<|M\\|B|PRIVATE>|\\|======|final|i... `] = lit`
gKz3q9TGAlF9Q8/Q+8OCYUeVZGIyn/+9We6+OjTLu0k=
`;

module.exports[n`DFA minimization >> 786: /(^|\s)(?!")(?:(?:set|change|with|new)-\S+|\$\S+|>[^>\s]+|[^:>\s]+>|[^>\s]+>[^>\... `] = lit`
g9C5v85D8UjOp/i0Y0e8+MUWoTUf2UqMX/c+rdfAiWI=
`;

module.exports[n`DFA minimization >> 787: /(^|\s)(?:[A-Z0-9\-]+#?)?:{1,2}\s+(?:;\S+|(?!;)\S+)(?=\s|$)/ `] = lit`
AUBqpooOBoIvwvc9q1J+NOLqcJ8YQsiR38hTJrAvsbM=
`;

module.exports[n`DFA minimization >> 788: /(\s)(?:;|:>)(?=\s|$)/ `] = lit`
GrmaPzWRdbdRrBpH4wwOu0CQMHG6up5l0N5L/j01PfM=
`;

module.exports[n`DFA minimization >> 789: /(^|\s)[^"\s]\S*(?=\s|$)/ `] = lit`
uo/4+3tmWkuknZEnpHS+7yjba2iQFriFg+joVOdXwP4=
`;

module.exports[n`DFA minimization >> 790: /"(?:\\\S|[^"\\])*"/ `] = lit`
Bu4aoDuHS9mjCBpY7WBk0Xrl6Orhq81ZvMk4Yi5Obmo=
`;

module.exports[n`DFA minimization >> 791: /(^|\s)(?:! .*|!$)/ `] = lit`
D/tOjFObgyDaw1rb3IILm3OgXnUSUH20xapr8waSDTg=
`;

module.exports[n`DFA minimization >> 792: /(^|\s)\/\*\s[\s\S]*?\*\/(?=\s|$)/ `] = lit`
cjvXG0YK12A3+tzclstgcd/c7E5qoys/8ZuVNiS2ICc=
`;

module.exports[n`DFA minimization >> 793: /(^|\s)!\[(={0,6})\[\s[\s\S]*?\]\2\](?=\s|$)/ `] = lit`
Ds9vj4vkiJY5P0VSGJxNec0uRjSd8csSOlJkgU7Gf10=
`;

module.exports[n`DFA minimization >> 794: /(^|\s)[+-]?\d+(?=\s|$)/ `] = lit`
U6+f6RMAzO/1C9Tpcol89NhMwurMVdlLj05kAMlhg84=
`;

module.exports[n`DFA minimization >> 795: /(^|\s)[+-]?0(?:b[01]+|o[0-7]+|d\d+|x[\dA-F]+)(?=\s|$)/i `] = lit`
DwwMbv+sAJfm7UndAIqIjMOgg035F2IpL78LIfZwgIY=
`;

module.exports[n`DFA minimization >> 796: /(^|\s)[+-]?\d+\/\d+\.?(?=\s|$)/ `] = lit`
8Q2BBLXexHf+Ww5Ypd/aYPbIlywvO56OXKWCp4DhW14=
`;

module.exports[n`DFA minimization >> 797: /(^|\s)\+?\d+\+\d+\/\d+(?=\s|$)/ `] = lit`
XlGolbnIWMTGl3XH7+jGAlCN3htCU8zS+e5YcAubs/M=
`;

module.exports[n`DFA minimization >> 798: /(^|\s)-\d+-\d+\/\d+(?=\s|$)/ `] = lit`
9HSvW2LEPaq4RFajwXQ9eOsHUzqehb7xGCFkZGWjwOU=
`;

module.exports[n`DFA minimization >> 799: /(^|\s)[+-]?(?:\d*\.\d+|\d+\.\d*|\d+)(?:e[+-]?\d+)?(?=\s|$)/i `] = lit`
wSV4cJ9dPt3XwYz0gpKoXaI6Kc1Wk7XEa0m2Tmz5M0M=
`;

module.exports[n`DFA minimization >> 800: /(^|\s)NAN:\s+[\da-fA-F]+(?=\s|$)/ `] = lit`
YfVEFKeDdlYg7Amhr+MlT7Em6AXtH01A0AtaZrvxjt8=
`;

module.exports[n`DFA minimization >> 801: /(^|\s)[+-]?0(?:b1\.[01]*|o1\.[0-7]*|d1\.\d*|x1\.[\dA-F]*)p\d+(?=\s|$)/i `] = lit`
ySu7Ar5x4EX1M3rN0Y9pyI4+PKvnzLhE3QgqPZXj22U=
`;

module.exports[n`DFA minimization >> 802: /\\\S/ `] = lit`
NGIEtCk8tPilpDm9aH41KrBhnStJDr5ho4FuYZo+nuI=
`;

module.exports[n`DFA minimization >> 803: /[+?*\[\]^$(){}.|]/ `] = lit`
82ZwgqTxC/c6tqWc9r4dCYgvnRrV/85+6fa161eELZg=
`;

module.exports[n`DFA minimization >> 804: /\\\S|%\w|\// `] = lit`
Bgs6kuhOlUGsadHJC0pSdlSpIX0XTmnopoVWA/ecqHs=
`;

module.exports[n`DFA minimization >> 805: /(^|\s)STRING:\s+\S+(?:\n|\r\n).*(?:\n|\r\n)\s*;(?=\s|$)/ `] = lit`
TMxZtekj9DstKT0ipAVdVye4874H697SYKE/G13RC7M=
`;

module.exports[n`DFA minimization >> 806: /(^|\s)HEREDOC:\s+\S+(?:\n|\r\n).*(?:\n|\r\n)\s*\S+(?=\s|$)/ `] = lit`
EdCVQroMHxuOsPbH0bGoLG6RUqez3KRh4PApZiuvZq0=
`;

module.exports[n`DFA minimization >> 807: /(^|\s)\[(={0,6})\[\s[\s\S]*?\]\2\](?=\s|$)/ `] = lit`
m1i6ptJtQ8gM4C+CU+5wWi5z7+BD2DmhIj/tfb/17dA=
`;

module.exports[n`DFA minimization >> 808: /(^|\s)(?:call|execute|eval)?\((?=\s)/ `] = lit`
v1QccQqNcWZ7l7ftoIhEOlBReBQ8bPh0ZrG7TRFo9Hw=
`;

module.exports[n`DFA minimization >> 809: /(\s)--(?=\s)/ `] = lit`
pJZcfEPL3pP47swNgdLBEg5sAcom4a/cm4lof9UQf8w=
`;

module.exports[n`DFA minimization >> 810: /(\s)\)(?=\s|$)/ `] = lit`
x+737S2NZq+q3eb9IObwJI7JLelPhQJB+qj2c/cFpJk=
`;

module.exports[n`DFA minimization >> 811: /(^|\s)[a-z]*\{(?=\s)/i `] = lit`
Ry9NX8RlndJTjAhJhxnRBn303tk2WCQ6Qmzgp2KxdHA=
`;

module.exports[n`DFA minimization >> 812: /(\s)\}(?=\s|$)/ `] = lit`
4yt0eBDtjqrYfBk2XsGp6I00u9JzyxWqFTM9jZD1mWI=
`;

module.exports[n`DFA minimization >> 813: /(^|\s)\[(?=\s)/ `] = lit`
RKQ1bi5DcSqjbK8c0WS2z0EbwWxA00NzIjdcOzwoh1o=
`;

module.exports[n`DFA minimization >> 814: /(\s)\](?=\s|$)/ `] = lit`
EjCl9ugj0gVLpx76So4rSy7lXNJT6gZG4Y5LIamIr/I=
`;

module.exports[n`DFA minimization >> 815: /\\[^\s']|%\w/ `] = lit`
2os/KTvw/kXZYBWQp6kmTNyINPCPUWeNRk7KC7OHLhc=
`;

module.exports[n`DFA minimization >> 816: /\b(?:TODOS?|FIX(?:MES?)?|NOTES?|BUGS?|XX+|HACKS?|WARN(?:ING)?|\?{2,}|!{2,})\b/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 817: /(\/)[idmsr]+(?:-[idmsr]+)?/ `] = lit`
upRwmZZH2cwz/XBMumpLZyzr1fPkmTQMmnlGOfvduxM=
`;

module.exports[n`DFA minimization >> 818: /(\s)[^:\s]+/ `] = lit`
FLJPew4BY6vhAaxU2Em7Bxk5wmHXbaWwiK0pomOb30E=
`;

module.exports[n`DFA minimization >> 819: /((?:\n|\r\n)\s*);(?=\s|$)/ `] = lit`
GWcZHXSZrBrxctHa4IGDiUztZv53/CLQUKDz3Q8eaYQ=
`;

module.exports[n`DFA minimization >> 820: /\b(?:allow|function|if|match|null|return|rules_version|service)\b/ `] = lit`
a9GKIdnKrf9RCEholscVGGUU+SfPdDGGXaT15nct7Xw=
`;

module.exports[n`DFA minimization >> 821: /&&|\|\||[<>!=]=?|[-+*\/%=]|\b(?:in|is)\b/ `] = lit`
jzzPrOkAKLPaxDucrtJ//GWc3GriTiSHZmY+nWEHGpU=
`;

module.exports[n`DFA minimization >> 822: /(^|[\s(),])(?:\/(?:[\w\xA0-\uFFFF]+|\{[\w\xA0-\uFFFF]+(?:=\*\*)?\}|\$\([\w\xA0-... `] = lit`
B6aOP7jguAExZOGiDXKV50K2tj0X2VmBkcVQ2qCEonA=
`;

module.exports[n`DFA minimization >> 823: /(\ballow\s+)[a-z]+(?:\s*,\s*[a-z]+)*(?=\s*[:;])/ `] = lit`
Ln027EuDYNMdCye96Xszv9OFzIZED3rvSiWj+ul13cg=
`;

module.exports[n`DFA minimization >> 824: /[\/]/ `] = lit`
6c0qv2Vd5FCWwFQc50hf+iGXtDiS4c+TyfmZQbyGrR8=
`;

module.exports[n`DFA minimization >> 825: /\{[\w\xA0-\uFFFF]+(?:=\*\*)?\}|\$\([\w\xA0-\uFFFF.]+\)/ `] = lit`
UqWPAljMCiwwgZom6Ne2MU9xReYhEm/JmKedE9kjsbk=
`;

module.exports[n`DFA minimization >> 826: /\*\*/ `] = lit`
H1tIkQYswt/1fv0M8Z5VXujI/sd+13i+/6+SJM7n0kk=
`;

module.exports[n`DFA minimization >> 827: /[.$(){}]/ `] = lit`
8w2DgWaN/bkLWf4ROyTZ3s+KMdRwUDTKUsL8nldHpBc=
`;

module.exports[n`DFA minimization >> 828: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:... `] = lit`
YurFzJuV1fJQpGFc7JhVqrVjvq7z6rM4IEo/iy6Imk4=
`;

module.exports[n`DFA minimization >> 829: /\{\||\|\}/ `] = lit`
V8jlIJYH0dYwTf86qy1HoBX/R5V8YhMMDb6yAxwaT28=
`;

module.exports[n`DFA minimization >> 830: /\b(?:[Nn]umber|[Ss]tring|[Bb]oolean|Function|any|mixed|null|void)\b/ `] = lit`
GslNNtDv5AeYYR/W/logR0taQ1Xi31bRKppIP+6Svnw=
`;

module.exports[n`DFA minimization >> 831: /(^|[^$]\b)(?:type|opaque|declare|Class)\b(?!\$)/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 832: /(^|[^$]\B)\$(?:await|Diff|Exact|Keys|ObjMap|PropertyType|Shape|Record|Supertype... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 833: /\.(?:TRUE|FALSE)\.(?:_\w+)?/i `] = lit`
ReVzaV7XVy0KsFCSr4+diVHvfvOUmi5HeKekfYRVH5o=
`;

module.exports[n`DFA minimization >> 834: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[ED][+-]?\d+)?(?:_\w+)?/i `] = lit`
N/G1g/My1Vy+vME0IfgYtQjZPAlDUCnPlTl9BBEWbcw=
`;

module.exports[n`DFA minimization >> 835: /\(\/|\/\)|[(),;:&]/ `] = lit`
FxgPVCDtGV4HUE5Cxpk7BwZJa2YbgU8M//kEO8YAcR4=
`;

module.exports[n`DFA minimization >> 836: /[BOZ](['"])[A-F0-9]+\1/i `] = lit`
e37tfXuXZLe+zq5Oravn3dXy3fUMIt4zDJVROtEwmSY=
`;

module.exports[n`DFA minimization >> 837: /(?:\w+_)?(['"])(?:\1\1|&(?:\r\n?|\n)(?:\s*!.+(?:\r\n?|\n))?|(?!\1).)*(?:\1|&)/ `] = lit`
LTGyAhi7AJTVpgamgqBs1P+OEbDBXkHQoLUYuRMlx/o=
`;

module.exports[n`DFA minimization >> 838: /!.*/ `] = lit`
qDYivRBcxcwxyYH5sJ6Me+SdNel2JFbwBfg+imGPU/w=
`;

module.exports[n`DFA minimization >> 839: /\b(?:INTEGER|REAL|DOUBLE ?PRECISION|COMPLEX|CHARACTER|LOGICAL)\b/i `] = lit`
3/g5sJprcfcxkGAIRFXR+wMaPraM4K11e9VDuo/0CpA=
`;

module.exports[n`DFA minimization >> 840: /\b(?:END ?)?(?:BLOCK ?DATA|DO|FILE|FORALL|FUNCTION|IF|INTERFACE|MODULE(?! PROCE... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 841: /\b(?:ALLOCATABLE|ALLOCATE|BACKSPACE|CALL|CASE|CLOSE|COMMON|CONTAINS|CONTINUE|CY... `] = lit`
XHrL4nqkDqYHQ/yr0Is8cU+1ZRCwg9eyc7eONxej8Wk=
`;

module.exports[n`DFA minimization >> 842: /\b(?:ASSIGNMENT|DEFAULT|ELEMENTAL|ELSE|ELSEWHERE|ELSEIF|ENTRY|IN|INCLUDE|INOUT|... `] = lit`
tl0/GMY/cKAqEFMkhXkn2/d8AvBKjDnz7fEsmiUNPc4=
`;

module.exports[n`DFA minimization >> 843: /\*\*|\/\/|=>|[=\/]=|[<>]=?|::|[+\-*=%]|\.(?:EQ|NE|LT|LE|GT|GE|NOT|AND|OR|EQV|NE... `] = lit`
Zc0quokLVJNF8mVeU61P+eLhtBDroA0Om7x8dyuHGK0=
`;

module.exports[n`DFA minimization >> 844: /(^|(?!\().)\/(?!\))/ `] = lit`
fQleDHQRCfpPd0Dz9eNop6AfrUaSpaVU6nm5FIv2XPE=
`;

module.exports[n`DFA minimization >> 845: /(&(?:\r\n?|\n)\s*)!.*/ `] = lit`
Hc91U0X7hey4ondRBZBxzI7HPm5uS83O8wiH/we6RWM=
`;

module.exports[n`DFA minimization >> 846: /^<#--[\s\S]*/ `] = lit`
xQVDC6DW51ZrWq2kSDPnrKAzWVf+/6iguTC/X4FNSmI=
`;

module.exports[n`DFA minimization >> 847: /^<[\s\S]+>$/ `] = lit`
N3s/gFATl8yzlQFi1XrmLI5tnMfhdnGx0LZ4PhqJGq4=
`;

module.exports[n`DFA minimization >> 848: /^\$\{[\s\S]*\}$/ `] = lit`
SLKd1cqiN8QWLzA4rjzrE2DosACsB/fNi7zLUNJOo88=
`;

module.exports[n`DFA minimization >> 849: /^<\/?|\/?>$/ `] = lit`
Lb5t2vVjhYXMCaCxD8BvaSyenubSg9QiIAJdWwdfvds=
`;

module.exports[n`DFA minimization >> 850: /^\$\{|\}$/ `] = lit`
1M59/tycAMO4/JORJr3jTgBMP1AstPG+Rn21YQNNcW0=
`;

module.exports[n`DFA minimization >> 851: /(^<\/?)[#@][a-z]\w*/i `] = lit`
EaYa0QDeOp4poFRUZBx2HhqIglGE2Rczv+SwWzxJfOI=
`;

module.exports[n`DFA minimization >> 852: /[\s\S]*\S[\s\S]*/ `] = lit`
wS4Th089eezMiO+dQqY6duAlMooRa0c4plvjPb3OjuA=
`;

module.exports[n`DFA minimization >> 853: /<#--[\s\S]*?-->/ `] = lit`
zkynHlm3IaONrzkyTwZgeK4y6DhfUWv4sutTU3MlvTA=
`;

module.exports[n`DFA minimization >> 854: /\b(?:as)\b/ `] = lit`
u809pXl6b9hLiuSt5hUkIbmods3Jmep7Uv6BscqUxNI=
`;

module.exports[n`DFA minimization >> 855: /\w+(?=\s*\()/ `] = lit`
o6lXUcNyzD/nzKnl9btnLf5BYKIC3oqCVwGcFsU1zhQ=
`;

module.exports[n`DFA minimization >> 856: /\d+(?:\.\d+)?/ `] = lit`
BUUB+E0cSs2HJg/bnfkRb9zOkiIJyaWTgS3PqQb6wCc=
`;

module.exports[n`DFA minimization >> 857: /\.\.[<*!]?|->|--|\+\+|&&|\|\||\?{1,2}|[-+*\/%!=<>]=?|\b(?:gt|gte|lt|lte)\b/ `] = lit`
8+Z1eZ6gjES1c1YKueXxcbDt2lHAwmhHIlnN9falk80=
`;

module.exports[n`DFA minimization >> 858: /[,;.:()[\]{}]/ `] = lit`
OHFTBemCtRyoCZfb2i6ku3etAe4ylzURp1HkiTlm7Ew=
`;

module.exports[n`DFA minimization >> 859: /((?:^|[^?])\?\s*)\w+/ `] = lit`
xeO+L+h426RfgxkeDXWhODi5WdceXG6SJ8E5b85+rgQ=
`;

module.exports[n`DFA minimization >> 860: /\br("|')(?:(?!\1)[^\\]|\\.)*\1/ `] = lit`
0034MBFFUQ0oC2Gtr5Coe8ukiGbARBxVsh/TWzpCAFo=
`;

module.exports[n`DFA minimization >> 862: /((?:^|[^\\])(?:\\\\)*)\$\{(?:[^<()"']|\((?:[^<()"']|\((?:[^<()"']|\((?:[^<()"']... `] = lit`
/HCjWncN0c/eOYJjTsBz74KwoXGBgpVuzjtyeBwBEyE=
`;

module.exports[n`DFA minimization >> 863: /\b(?:if|else|switch|case|default|break|for|repeat|while|do|until|continue|exit|... `] = lit`
JJz0KVZlC8q1vbXCxZru/8DFYOlM+svHsx8xpMMEGE4=
`;

module.exports[n`DFA minimization >> 864: /(?:\b0x[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ulf]*/i `] = lit`
AIqNfXJy0q5OoXDslY3ou+FBT1Po6CM8/XJ8lxkvK9c=
`;

module.exports[n`DFA minimization >> 865: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not|with|at|xor|n... `] = lit`
pCl0pWdeZSuY03hRi9rzIUPzWgMia0Voxr5O5b8bxbQ=
`;

module.exports[n`DFA minimization >> 868: /;.*|\B\(.*?\)\B/ `] = lit`
LlGVgfBrXx7H0Wn/XEiFJf/QC5R1dxpxG1AQVhZA0TY=
`;

module.exports[n`DFA minimization >> 869: /\b[GM]\d+(?:\.\d+)?\b/ `] = lit`
6KIx+7g4RTBwKv16Zyp403AtdqoC1tmzWPagiudpBZg=
`;

module.exports[n`DFA minimization >> 870: /\b[A-Z]/ `] = lit`
wYSvULFe5K+VaCl3shsEBSKJd4lDSG9Hls8M674RzBQ=
`;

module.exports[n`DFA minimization >> 871: /"(?:""|[^"])*"/ `] = lit`
TUaMaltJ8o/aI6ZLfs0TjLDqmDVt6pibeIZowuGTkng=
`;

module.exports[n`DFA minimization >> 872: /\*\d+/ `] = lit`
sIAwQAICU/BA6GSHsAxiEgeDHe2ba7YT6qXfOGPkFm8=
`;

module.exports[n`DFA minimization >> 873: /\b(?:and|as|assert|break|breakpoint|class|class_name|const|continue|elif|else|e... `] = lit`
H9KYpOA1XDjMjhYEIWv/yvGP839Ijhmeoi47galZ9PQ=
`;

module.exports[n`DFA minimization >> 874: /[a-z_]\w*(?=[ \t]*\()/i `] = lit`
OkjgzGY/eAgqqz4XGr8h2zNHqswIj8z0eVd6ozeCXY4=
`;

module.exports[n`DFA minimization >> 875: /\b[A-Z][A-Z_\d]*\b/ `] = lit`
UcIDU2iHr2KOagvx0q01C1TjLtgmoYFKP4gj/qvdv4c=
`;

module.exports[n`DFA minimization >> 876: /->|:=|&&|\|\||<<|>>|[-+*\/%&|!<>=]=?|[~^]/ `] = lit`
DmtMZBTv2seSs/NQlMBVwoP9LLOiVGX884KaY7JX/eE=
`;

module.exports[n`DFA minimization >> 877: /[.:,;()[\]{}]/ `] = lit`
OHFTBemCtRyoCZfb2i6ku3etAe4ylzURp1HkiTlm7Ew=
`;

module.exports[n`DFA minimization >> 878: /@?(?:("|')(?:(?!\1)[^\n\\]|\\[\s\S])*\1(?!"|')|"""(?:[^\\]|\\[\s\S])*?""")/ `] = lit`
Pn+85UftG+n7oXlNWlRQEGHNE53ygu9kwAkff+NueWQ=
`;

module.exports[n`DFA minimization >> 879: /(^(?:class_name|class|extends)[ \t]+|^export\([ \t]*|\bas[ \t]+|(?:\b(?:const|v... `] = lit`
gaZus/O5NQYBAR+dCGN0gu/Uu+va7E3ec4Vrk7KeMTA=
`;

module.exports[n`DFA minimization >> 880: /\b0b[01_]+\b|\b0x[\da-fA-F_]+\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.[\d_]+)(?:e[+-]?... `] = lit`
kxNY5MkEajv+HZ08LScMJXK886Cv86T1X+Mk5ZP/qDo=
`;

module.exports[n`DFA minimization >> 881: /\b(?:INF|NAN|PI|TAU)\b/ `] = lit`
BrbpKRfQXKHF74R2V+CJOxoekugtTaP5WEyugQzrB4w=
`;

module.exports[n`DFA minimization >> 882: /(^\s*\d+ +(?:@\w[\w!"$%&'()*+,\-.\/:;<=>?[\\\]^\`{|}~\x80-\xfe #]*@ +)?\w+ +).+/... `] = lit`
cgE44Qg1Kxui0x7YHY4PcnDALyqm9X8NmedsdBhbrLE=
`;

module.exports[n`DFA minimization >> 883: /(^\s*\d+ +(?:@\w[\w!"$%&'()*+,\-.\/:;<=>?[\\\]^\`{|}~\x80-\xfe #]*@ +)?)\w+/m `] = lit`
TZcJg/xsMPpSmnVaox+A0XT/uRixN7o2R1jtbPC9NAk=
`;

module.exports[n`DFA minimization >> 884: /(^\s*)\d+/m `] = lit`
aNwcaI3hYovu4fo+iASLtqRoytatH3W0WwP5U1bqlYc=
`;

module.exports[n`DFA minimization >> 885: /@\w[\w!"$%&'()*+,\-.\/:;<=>?[\\\]^\`{|}~\x80-\xfe #]*@/ `] = lit`
Y6S+zhPkljPMGCHl1nGJOk6n00z9OcCpZrai/WPNemY=
`;

module.exports[n`DFA minimization >> 886: /^@\w[\w!"$%&'()*+,\-.\/:;<=>?[\\\]^\`{|}~\x80-\xfe #]*@$/ `] = lit`
Y6S+zhPkljPMGCHl1nGJOk6n00z9OcCpZrai/WPNemY=
`;

module.exports[n`DFA minimization >> 887: /("""|''')[\s\S]+?\1/ `] = lit`
vWRmjqG17AjbhGl/XujDMdrf7SoDweu8jPmQaeXp9Tk=
`;

module.exports[n`DFA minimization >> 888: /(^[ \t]*)#.*/m `] = lit`
hCqnct6maygLhL0uLrIEF8FHf+M7Vj4nCibi7BrUJR8=
`;

module.exports[n`DFA minimization >> 889: /(^[ \t]*)@\S*/m `] = lit`
07SqyFUVD/EZ9V/0+8moPWl7ONqxDv4OtsaipexasXo=
`;

module.exports[n`DFA minimization >> 890: /((?:^|\r?\n|\r)[ \t]*)(?:Ability|Ahoy matey!|Arwedd|Aspekt|Besigheid Behoefte|B... `] = lit`
aK0iTptKSW7O2V3aXLaW6ldloGAWn6lCQgZo99CJDlk=
`;

module.exports[n`DFA minimization >> 892: /((?:\r?\n|\r)[ \t]*\|.+\|.*)(?:(?:\r?\n|\r)[ \t]*\|.+\|.*)+/ `] = lit`
Ej8Qv2h+r3gXF1XiYRQlpHuC9TltmES5jVzzq+O52+0=
`;

module.exports[n`DFA minimization >> 893: /(?:\r?\n|\r)[ \t]*\|.+\|.*/ `] = lit`
nh7gC9GRkQ5cbG2emypxxVjuKeWPdgqnmhrOMZY26Bw=
`;

module.exports[n`DFA minimization >> 895: /"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*'/ `] = lit`
q2BJHXfAE0k/7oyqfcfI/g0WoLdyZTDaC8xv4du9lFM=
`;

module.exports[n`DFA minimization >> 896: /<[^>]+?>/ `] = lit`
1wwgf8779NKBQXH1BrEMm8tkBqn8P61pssbxhIMOTE4=
`;

module.exports[n`DFA minimization >> 897: /[^:\r\n]+:/ `] = lit`
KQY9CWQOb8AG39h+9JaK7cNItaZpcT3Zb7wfPysYZqo=
`;

module.exports[n`DFA minimization >> 898: /\|/ `] = lit`
5swum4M2wdhut02BzRvFGhfm5cLyBZW/r5A1GP9qhJk=
`;

module.exports[n`DFA minimization >> 899: /(:)[^\r\n]+/ `] = lit`
HRPMSaJo6pV1z9oUWGm/yKzo2cUcQQZbsxKuKt5kNvs=
`;

module.exports[n`DFA minimization >> 900: /(:)[^\r\n]*/ `] = lit`
G/JZOzHfpf4W2a1zM5HMGe8xntHYiBmide0cboCiQso=
`;

module.exports[n`DFA minimization >> 901: /\s*[^\s|][^|]*/ `] = lit`
jjJtEaEQPT0A49JOHM6TTCn+k987afYXOygqx113fb4=
`;

module.exports[n`DFA minimization >> 902: /^#.*/m `] = lit`
b/uLXXb070yRLX6+0FI02AevcjQLDBY4msyLeMN7nBk=
`;

module.exports[n`DFA minimization >> 903: /^[-–].*/m `] = lit`
AJO06+2Z2uS2tbkl3ahoiP1ahDhuLGgLZolL/E0Y0Po=
`;

module.exports[n`DFA minimization >> 904: /^\+.*/m `] = lit`
fBYj2YpWNtXEiUgLamtKfJ8kCWXi95AxV8+FALbV6cs=
`;

module.exports[n`DFA minimization >> 905: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m `] = lit`
q2BJHXfAE0k/7oyqfcfI/g0WoLdyZTDaC8xv4du9lFM=
`;

module.exports[n`DFA minimization >> 906: /^commit \w{40}$/m `] = lit`
MSsAaxHeaeajusb99tJ/RveSaqVHgyxIQ0M/A6c9wgU=
`;

module.exports[n`DFA minimization >> 907: /^.*\$ git .*$/m `] = lit`
jxqAb20tf2JElcG/1dP4MFNCPrqV1VZfWO2gOq1LhJA=
`;

module.exports[n`DFA minimization >> 908: /\s--?\w+/m `] = lit`
yz9yRpc4PSpHgtH7GiEJh0EmHK5TDTL7IdO07eBTgXk=
`;

module.exports[n`DFA minimization >> 910: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(... `] = lit`
fi7vHfCZl3+iaP5yt95b0ttSYZ2+UR0eJZHN/wHAx7w=
`;

module.exports[n`DFA minimization >> 911: /\b(?:_|iota|nil|true|false)\b/ `] = lit`
m1KcZaf9ujNfVZCDBoMc6JJ+go1Ao0sKfHAkqblEDYA=
`;

module.exports[n`DFA minimization >> 912: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i `] = lit`
rAFOD0F3QSm3tFqp2XVLkIymnffrBZMeR9DPRWKrpJ0=
`;

module.exports[n`DFA minimization >> 913: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|... `] = lit`
xyo9xV2uokDjqxfNLpRa2et8Jr+fyST9TtBDcdumX14=
`;

module.exports[n`DFA minimization >> 914: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|... `] = lit`
dm1cG1219XPWb4JiqaWFF8mcSZ5sUars2qR1T3x+Vpg=
`;

module.exports[n`DFA minimization >> 915: /(["'\`])(?:\\[\s\S]|(?!\1)[^\\])*\1/ `] = lit`
/sanqiktN0zXLFKeq55m28Ic8bN4MXZnq8aFWCPPBvA=
`;

module.exports[n`DFA minimization >> 916: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i `] = lit`
ddhcchiUdUeWGiQMIbfhePX82fcKSvmwaoF5qBe/t5E=
`;

module.exports[n`DFA minimization >> 917: /\$[a-z_]\w*/i `] = lit`
E2noJSdMsx8QIMd0D9sqOoY4Nj4zqcRTdAz3aYX8uFY=
`;

module.exports[n`DFA minimization >> 918: /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|quer... `] = lit`
VQWfJvz/86ZtWCddFzuTyow2P1xofV9/VKnfLSvsKLE=
`;

module.exports[n`DFA minimization >> 919: /[!=|&]|\.{3}/ `] = lit`
v05XbqJJpgVC1bpJdXxkQbJpEj1NWbZAUdVdqrwrGzg=
`;

module.exports[n`DFA minimization >> 920: /[!(){}\[\]:=,]/ `] = lit`
NWmNwco+C3zAx8o7WkxMZVxpmPi2AoevM2ydVkhWpg4=
`;

module.exports[n`DFA minimization >> 921: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 922: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i `] = lit`
ofeb39fcrEmBE8IE9jdfSyfPcfJQ+RQrPP3+fvXUeo4=
`;

module.exports[n`DFA minimization >> 923: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/ `] = lit`
FBv4e9SEDhh1TQm5eXr7smFUSDOJke3PLMKUxJbtjDo=
`;

module.exports[n`DFA minimization >> 924: /@[a-z_]\w*/i `] = lit`
BmOEJJ17Hsvm/uT6h9xoxwf4Mjm1z8bJICbkjyJDmBQ=
`;

module.exports[n`DFA minimization >> 925: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i `] = lit`
IU0i0+2MsaWIyoEw3faZVIgDBJPQMlUczCmGilyoN4s=
`;

module.exports[n`DFA minimization >> 926: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*)[a-zA-Z_]\w*/ `] = lit`
IG6NKOnC9Xg1eqG4CkYvSBKrRwK3tika4JtLqgJOLIM=
`;

module.exports[n`DFA minimization >> 927: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/ `] = lit`
7EezsGapGLwCxS3oFcOkZFn1c985fvpFKN2+/MLeGlE=
`;

module.exports[n`DFA minimization >> 928: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 929: /^>(?:[\t ]*>)*/m `] = lit`
FcoWVEvraNnIajCdY/p+wDeIFUWwLMLLx7mqrSD+sas=
`;

module.exports[n`DFA minimization >> 930: /^\|?(?:\\.|\`\`(?:[^\`\r\n]|\`(?!\`))+\`\`|\`[^\`\r\n]+\`|[^\\|\r\n\`])+(?:\|(?:\\.|\`\`(?:[... `] = lit`
MZeErS6fgMW49wwiifRthFUrIc7iU9Z8+lG/BeofozE=
`;

module.exports[n`DFA minimization >> 931: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m `] = lit`
a8z9GrmRkw1z0zLiklV+Nuzn5dKmrId9rdRQzGu1+F0=
`;

module.exports[n`DFA minimization >> 932: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m `] = lit`
7rdIR5+2tbmZmuJxcDbK8TJyzLJt7AvBFjF+JW5H03k=
`;

module.exports[n`DFA minimization >> 933: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\... `] = lit`
TyDWOJ7VMJQHP4mVedU/MfEBc1Sq6pOHGKla3FsoMXk=
`;

module.exports[n`DFA minimization >> 934: /((?:^|[^\\])(?:\\{2})*)(?:\b__(?:(?!_)(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?)... `] = lit`
jBJVHXkDhkZDy9B+1sl85jEeqwzBtC080r1OIgiKWoc=
`;

module.exports[n`DFA minimization >> 935: /((?:^|[^\\])(?:\\{2})*)(?:\b_(?:(?!_)(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))... `] = lit`
3c8qA3J9mXXzhVPtHEaODzjK0RL4D+6vO9Y5sSeKeCs=
`;

module.exports[n`DFA minimization >> 936: /((?:^|[^\\])(?:\\{2})*)(?:(~~?)(?:(?!~)(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?... `] = lit`
mllHfnC+ZokkoID2V3nIyuuQR7OrLhFaljcnXbTY4GI=
`;

module.exports[n`DFA minimization >> 937: /((?:^|[^\\])(?:\\{2})*)(?:!?\[(?:(?!\])(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?... `] = lit`
FrpTgqMWT2BLViNJpAYHxZ+45vTT39v1jXTy+GsyqCk=
`;

module.exports[n`DFA minimization >> 938: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t... `] = lit`
8QJqNz39l0TwkmAICerjlPuFSS3pWEty7LskGStroJs=
`;

module.exports[n`DFA minimization >> 939: /\`\`.+?\`\`|\`[^\`\r\n]+\`/ `] = lit`
vTvGB2rw06unP5SysXLlK2AhGeqk61vrbbfY/Rb4KKY=
`;

module.exports[n`DFA minimization >> 940: /^\`\`\`[\s\S]*?^\`\`\`$/m `] = lit`
T/AZx+4/UHJSyBJFnur7bHhtE006l+mq7nBcgO9/3EU=
`;

module.exports[n`DFA minimization >> 941: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m `] = lit`
idRb+fokVegCqjfLjM/BuGM6P5LHsvYLQbZNNQ2HVew=
`;

module.exports[n`DFA minimization >> 942: /(^\s*)#+.+/m `] = lit`
MbJz1xAUHaN+wo1APwK+VTI6s5rJFcCPe+cTdgFTV3E=
`;

module.exports[n`DFA minimization >> 943: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/ `] = lit`
Pw/voFLn4GSPKpzE8a/N5loIlMOrLvNephHekFXr1q8=
`;

module.exports[n`DFA minimization >> 944: /^[\[\]!:]|[<>]/ `] = lit`
VudReuPfvH4aswVSZiXgdVtxU5OB+PMz0zu4vaTyrRM=
`;

module.exports[n`DFA minimization >> 945: /\*\*|__/ `] = lit`
yiMp/Ghy0FRuc4OoqCyr3neHZprRwXw4Z303/EqEySA=
`;

module.exports[n`DFA minimization >> 946: /[*_]/ `] = lit`
VkyYxvYOC2YnwI/WfkGNXWk2GJyYv802IfVczWsmV/E=
`;

module.exports[n`DFA minimization >> 947: /~~?/ `] = lit`
tfZITnXJzLBgP0N7x4ABvgEecXFoaXpeZgcbwxSSwcY=
`;

module.exports[n`DFA minimization >> 948: /^(\|?(?:\\.|\`\`(?:[^\`\r\n]|\`(?!\`))+\`\`|\`[^\`\r\n]+\`|[^\\|\r\n\`])+(?:\|(?:\\.|\`\`(?:... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 949: /^(\|?(?:\\.|\`\`(?:[^\`\r\n]|\`(?!\`))+\`\`|\`[^\`\r\n]+\`|[^\\|\r\n\`])+(?:\|(?:\\.|\`\`(?:... `] = lit`
gyw01QlMHEZORO/LCrQbTwUdqYbuJlun1tnwik9OBi8=
`;

module.exports[n`DFA minimization >> 950: /^\|?(?:\\.|\`\`(?:[^\`\r\n]|\`(?!\`))+\`\`|\`[^\`\r\n]+\`|[^\\|\r\n\`])+(?:\|(?:\\.|\`\`(?:[... `] = lit`
DMAalOyc5C/reboYLNeCW1JJcw9eAXuYVdbd7dFLIMA=
`;

module.exports[n`DFA minimization >> 951: /\`\`\`/ `] = lit`
zZ7exB1wp4/XWpTT74v6lQhVX7jDWfVw8VwqDPUs+Ig=
`;

module.exports[n`DFA minimization >> 952: /==+$|--+$/ `] = lit`
ZXT/w+dKlbm802Y+zDd4P6qokuL2tNOBkdAMBtWs8FQ=
`;

module.exports[n`DFA minimization >> 953: /^#+|#+$/ `] = lit`
EPVuSxOkyZyX5GQ587KCyMlei/9V7wTTnSc0EZ62fT8=
`;

module.exports[n`DFA minimization >> 954: /^(!?\[)[^\]]+/ `] = lit`
iOPK2p8nCkO35GNL4OLP8aAhjZO8zDoYP80zbU4XcVI=
`;

module.exports[n`DFA minimization >> 955: /(^..)[\s\S]+(?=..$)/ `] = lit`
0YK0SMsJGuXuXLVyKGIb35nLtXCFsGmRSxnxdCamXoU=
`;

module.exports[n`DFA minimization >> 956: /(^.)[\s\S]+(?=.$)/ `] = lit`
L1F//Qd+7UVSoBkALeQ28PbpTGGL1dtXcovTadq+LZY=
`;

module.exports[n`DFA minimization >> 957: /(^~~?)[\s\S]+(?=\1$)/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 958: /(\[)[^\]]+(?=\]$)/ `] = lit`
RIM1aPjHhllNP6LoHmC3rFWtXsyVhOP3LCXBMu/j1T0=
`;

module.exports[n`DFA minimization >> 959: /(^!?\[)[^\]]+(?=\])/ `] = lit`
5SdYDrPKAn7mWhrBduL0+JLbKTeK1/eFNB7D9Y7vwV4=
`;

module.exports[n`DFA minimization >> 960: /"(?:\\.|[^"\\])*"(?=\)$)/ `] = lit`
WitVXYK/9eFM/PnqaJa6LNrkiendrH9PA16K/lCsnU8=
`;

module.exports[n`DFA minimization >> 961: /\||:?-{3,}:?/ `] = lit`
/39YY1oymYnFNcn5yLW6Z5wezH3AESCXhdJybvJYjyU=
`;

module.exports[n`DFA minimization >> 962: /^(\`\`\`.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^\`\`\`$)/m `] = lit`
zq0Fvf2G/1HWnanZrXqMXo/Cr8MpNB5SDH8cqEL5soM=
`;

module.exports[n`DFA minimization >> 963: /^(\`\`\`).+/ `] = lit`
8HpzPUGTMK68GzjNdiA1d/2pqKEOxnmGuZnuYhzHSx8=
`;

module.exports[n`DFA minimization >> 964: /(?:\\.|\`\`(?:[^\`\r\n]|\`(?!\`))+\`\`|\`[^\`\r\n]+\`|[^\\|\r\n\`])+/ `] = lit`
f7z3Pl5Kp9x3Xus7F+rd6t5vqbM6xm2fGLmfs8sDSlY=
`;

module.exports[n`DFA minimization >> 965: /\b(?:as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|c... `] = lit`
KOlwU/rTm+fLyaV8HMB9tAY34/VEklRCloQZ8DHkkRQ=
`;

module.exports[n`DFA minimization >> 966: /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?[\d]+)... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 967: /\b(?:setup|given|when|then|and|cleanup|expect|where):/ `] = lit`
+/W4nJQiypknMe+oEtDOnDDLn3pX7OLr4r0BsOfrlsc=
`;

module.exports[n`DFA minimization >> 968: /\.+|[{}[\];(),.:$]/ `] = lit`
nr/yE5HunOe+Sml6HdR8LmdNyhSJLGjePzWSfnJKapg=
`;

module.exports[n`DFA minimization >> 969: /#!.+/ `] = lit`
+pZbPYMe9gL6wAqRCx6l2bLSy58hUa+UMNCqlVtovuo=
`;

module.exports[n`DFA minimization >> 970: /(^|[^.])@\w+/ `] = lit`
ghWwAS6kO2L8NvBAAhW5FkOhgu+ICdzkQuZjbtJlNbc=
`;

module.exports[n`DFA minimization >> 971: /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[... `] = lit`
Y8/6oTY9F/HDox/NM78lApiC0DsIkCyRoROtWKkdaWU=
`;

module.exports[n`DFA minimization >> 972: /("""|''')(?:[^\\]|\\[\s\S])*?\1|\$\/(?:[^\/$]|\$(?:[\/$]|(?![\/$]))|\/(?!\$))*\... `] = lit`
+AGo8AJ8MXMr/UKp2b9qJBSuevu2JueO8Um87exCbQw=
`;

module.exports[n`DFA minimization >> 973: /(["'\/])(?:\\.|(?!\1)[^\\\r\n])*\1/ `] = lit`
8vQ97DZZZa/xytPX8I5mSLOMX5SeRAq0NK5gkCZ/WS4=
`;

module.exports[n`DFA minimization >> 974: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ]+.+)*/ `] = lit`
6QOyzaoOKUVe8iQX/5jz80APvahh2FAHXcVns5u1gaY=
`;

module.exports[n`DFA minimization >> 975: /((?:^|\r?\n|\r)([\t ]*)):ruby(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 976: /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 977: /((?:^|\r?\n|\r)[\t ]*)<.+/ `] = lit`
OAk48U6YK9goplAztGIor6LVWzuuXZ4k8XyK37xxP4g=
`;

module.exports[n`DFA minimization >> 978: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/ `] = lit`
TVxMJJIe0t6sDF6yPya9OZlqoK4xFG6xpgwVQfTTKAU=
`;

module.exports[n`DFA minimization >> 979: /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^}])+\}|... `] = lit`
ZuoLAoil8f6c/S5D1hFdNCDA8YkVWflviGo2cjmuDf4=
`;

module.exports[n`DFA minimization >> 980: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/ `] = lit`
2y0mpH0bumm2Nw0fW4e7CmHvb69A2Rk0/rKcq1eEQZA=
`;

module.exports[n`DFA minimization >> 981: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/ `] = lit`
F9wkC7FZXMjLxnoZgpXFpLNNT2iBJX+nLm4QhbttFBs=
`;

module.exports[n`DFA minimization >> 982: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*,[\t ]... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 983: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*\|[\t... `] = lit`
ykJYpLBVaAq3GCcKzLbkxzyCQJoCdjrx9hl+pbBP6Ls=
`;

module.exports[n`DFA minimization >> 984: /[<>]/ `] = lit`
lV3wbmWVnhQXvq3YGN0Hd+DsQ8tEFC0VLhPKTWIrf1g=
`;

module.exports[n`DFA minimization >> 985: /^:[\w-]+/ `] = lit`
9Wo+7MZIFApYjUPM62uONCQva7dRsN8gTZ3RdkR0wj0=
`;

module.exports[n`DFA minimization >> 986: /(^|[^#])\{(?:\{[^}]+\}|[^}])+\}/ `] = lit`
iQAp2XO/+EMYYqgzhqwFvaHRfl3OyG5blqvpVb/GkGY=
`;

module.exports[n`DFA minimization >> 987: /\([^)]+\)/ `] = lit`
QdBYMtS2ZvFTyoMhp0nQwoTbfnzDaL7KDwUbIRXaQmA=
`;

module.exports[n`DFA minimization >> 988: /\[[^\]]+\]/ `] = lit`
RIM1aPjHhllNP6LoHmC3rFWtXsyVhOP3LCXBMu/j1T0=
`;

module.exports[n`DFA minimization >> 989: /[\w:-]+(?=\s*!?=|\s*[,)])/ `] = lit`
mZidxFCrMuE30RKSM3ECXTysyabzih8LaU7+CPImlOA=
`;

module.exports[n`DFA minimization >> 990: /[=(),]/ `] = lit`
TOR6RfkGm8GHf5EO+sAN7XvLDLI11iiln9l4fo5FQvM=
`;

module.exports[n`DFA minimization >> 991: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/ `] = lit`
54WINeb6trtEcBeEYWBkIggBHzhAw/3M3l2s+jPJfx8=
`;

module.exports[n`DFA minimization >> 992: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i `] = lit`
YMNEspVuzQSusnYUHfdCmZQ1DxuuEGpeDs1tUGnI9Sc=
`;

module.exports[n`DFA minimization >> 993: /[+\-*\/]/ `] = lit`
GZOdjnRRTrYpxrmr+5UKMPn1MdalUk7jDW/g10ozDSY=
`;

module.exports[n`DFA minimization >> 994: /(?:[-a-z]+-)?url(?=\()/i `] = lit`
ajhR30wAa6usglJrabfM8lmrA3+zK+U0JBvoGNEZCp8=
`;

module.exports[n`DFA minimization >> 995: /\$[-\w]+|#\{\$[-\w]+\}/ `] = lit`
Rba1t4XIYet0czuPAV6RHhgImjDEVK8fQnfZGjp/+iM=
`;

module.exports[n`DFA minimization >> 996: /@[\w-]+?(?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};])*?(?=\s*\{)/ `] = lit`
gNssOoi3avxMC+uLs29IR07pXo/H9u6YuoeXlwEm1Ho=
`;

module.exports[n`DFA minimization >> 997: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@]... `] = lit`
+OdmA1+I8FbE9IcjHDacnNkrqTP4PCd8h6dyfCvyt0E=
`;

module.exports[n`DFA minimization >> 998: /@@?[\w-]+/ `] = lit`
CtOvr8NCfYKpKYjqnTr4qzWrIDSmysAb4sgJ9QjCdyo=
`;

module.exports[n`DFA minimization >> 999: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/ `] = lit`
Jk8loJQxifn/DmdKIl9ju6K08emHrmt+aAfhHlfj4r4=
`;

module.exports[n`DFA minimization >> 1000: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/ `] = lit`
wUS0o3mGY+HZPdtDo83pRtR5j0PLaGdeSO/qphpEBow=
`;

module.exports[n`DFA minimization >> 1001: /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|funct... `] = lit`
KbWk7Msl9pwzaPmf5sdzWrjWZ+mv/6ex6cNQ46w83uY=
`;

module.exports[n`DFA minimization >> 1002: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/ `] = lit`
y5rZQEa6SPuiKX17Dni2u1Mghb1TebRnrxWwysUh2NY=
`;

module.exports[n`DFA minimization >> 1003: /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m `] = lit`
mXy5luc/oYwOn82lgbOSoxq3PqMvm3H5LNpGFzE3wcY=
`;

module.exports[n`DFA minimization >> 1004: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/ `] = lit`
cMDhUqg3aJQWIy1JuzUhGmvLEeNYFFg0G24T14BHbVg=
`;

module.exports[n`DFA minimization >> 1005: /%[-\w]+/ `] = lit`
pVK3s8I2SJjW3KV4oaMcN6UuIxZqXmcC6MJunmaMz2I=
`;

module.exports[n`DFA minimization >> 1006: /\B!(?:default|optional)\b/i `] = lit`
QKe5ELJaRHNsy5ZDZMeKiniaqQG4Ght0YrT1GWdpT6w=
`;

module.exports[n`DFA minimization >> 1007: /\bnull\b/ `] = lit`
bYu959kBI1/+bl4Segmj7dgehinmfmnl0JwXQ1G5ui4=
`;

module.exports[n`DFA minimization >> 1008: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/ `] = lit`
ekl7/ZjXAm578vxozvF7LdfWyjJD4OZoZ1NhTPLZtWw=
`;

module.exports[n`DFA minimization >> 1009: /<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s... `] = lit`
5JnX0p7OkYgaH3OkLqN2AgDMelk6u1aHZBnQnkhZVeE=
`;

module.exports[n`DFA minimization >> 1010: /(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/ `] = lit`
tF1Fz7zTYKfXCU3SWNO8/KHK1CW0qDs5yQE5IvThM80=
`;

module.exports[n`DFA minimization >> 1011: /((?:^|\r?\n|\r)([\t ]*)):css(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1012: /((?:^|\r?\n|\r)([\t ]*)):coffee(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1013: /((?:^|\r?\n|\r)([\t ]*)):erb(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1014: /((?:^|\r?\n|\r)([\t ]*)):javascript(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1015: /((?:^|\r?\n|\r)([\t ]*)):less(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1016: /((?:^|\r?\n|\r)([\t ]*)):markdown(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r))... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1017: /((?:^|\r?\n|\r)([\t ]*)):scss(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1018: /((?:^|\r?\n|\r)([\t ]*)):textile(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1019: /(^|[^\\])\/\/.*/ `] = lit`
ZkCYs/NLjjL1tLyiWVDBSQxYMDSLvF9ylHTndOgT2k8=
`;

module.exports[n`DFA minimization >> 1020: /[:()]/ `] = lit`
yBl+QgF44jBRrkQbcE/p4t9TxHkEPmjeJFAFJ71nNqM=
`;

module.exports[n`DFA minimization >> 1021: /@+[\w-]+/ `] = lit`
B86HC4rZUB12EOKxYMEnGa2AtUD3S1/NwWGVJQLCwG0=
`;

module.exports[n`DFA minimization >> 1022: /@[\w-]+\s*:/ `] = lit`
E+A2NCfRJk4W7yg+H5NuZVG/W/lB1+/4kk7Tpcd9lOs=
`;

module.exports[n`DFA minimization >> 1023: /( +)(?:from|through)(?= )/ `] = lit`
OLT/9uR7+BpsDV5MB61V9mNVQj+M0jGJmGMIV9S0GyU=
`;

module.exports[n`DFA minimization >> 1024: /@[\w-]+/ `] = lit`
UvVdAz28J9+suPHrEuu14CDXvIF+J4nik+TZnW0QQio=
`;

module.exports[n`DFA minimization >> 1025: /&/ `] = lit`
ityjxWTZbGuQvabZhLkDjlX9+Tlh0Q7+71z56pL5VHg=
`;

module.exports[n`DFA minimization >> 1026: /^[a-z]\w*(?:(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})|(?:\)|\((?![^|()\n]+\)))... `] = lit`
uzNYfMiKlWBTXf2rfI99oTekJI9c3Qvvd0hgp7VRYas=
`;

module.exports[n`DFA minimization >> 1027: /^[*#]+(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})*\s+.+/m `] = lit`
+DThzVz6EzKKbfWzqTS9ecOHEozEB0HIXQ5aZwmlkMc=
`;

module.exports[n`DFA minimization >> 1028: /^(?:(?:(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})|(?:\)|\((?![^|()\n]+\)))|[<>=... `] = lit`
IxwzecF64fIRgnAF6cumalMR+WSkW608PaAnzIlx3LM=
`;

module.exports[n`DFA minimization >> 1029: /(^|[^a-zA-Z\d])(\*\*|__|\?\?|[*_%@+\-^~])(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]... `] = lit`
A/S2jQhW75i8y9TbZMT05zR13fGkCPgv5sWvYrATYmU=
`;

module.exports[n`DFA minimization >> 1030: /^\[[^\]]+\]\S+$/m `] = lit`
I4ygAR1INIj3fH3MSmVdH+oAy5ZwiP0g+oPZXPh0EW4=
`;

module.exports[n`DFA minimization >> 1031: /"(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})*[^"]+":.+?(?=[^\w\/]?(?:\s|$))/ `] = lit`
OmWj2BNbK9XzoUvjhcV1/XIlBiWbKi19DjE1OQ+TgoQ=
`;

module.exports[n`DFA minimization >> 1032: /!(?:(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})|(?:\)|\((?![^|()\n]+\)))|[<>=])*... `] = lit`
pDSLSmTS0NiQ66KwuFNj3EGXGCOUs6uVoXABmMeO1Hg=
`;

module.exports[n`DFA minimization >> 1033: /\b\[\d+\]/ `] = lit`
D4ChXrocsCVgRmR3N+HtkLfGnuyBk2k6sGdIBJVLcT8=
`;

module.exports[n`DFA minimization >> 1034: /\b[A-Z\d]+\([^)]+\)/ `] = lit`
J7o4o+754QWjZshTY9AcaHFvrIT25ZikPxz5VuSXeRk=
`;

module.exports[n`DFA minimization >> 1035: /\b\((?:TM|R|C)\)/ `] = lit`
qZmw/tRVBjRCS7nnAErpgo7OunPxB6feDHjpFohc6bU=
`;

module.exports[n`DFA minimization >> 1036: /^[a-z]\w*/ `] = lit`
0EwVrR9mzhMIjML4teAovoYDSnNnBuHwKogOxvZjtVY=
`;

module.exports[n`DFA minimization >> 1037: /\.$/ `] = lit`
yqynYCQiA/bsfBoJxFQiC7GdC6KdML6X3cHVWcoe3YA=
`;

module.exports[n`DFA minimization >> 1038: /^[*#]+/ `] = lit`
B6ctSBOuN6LpJUN8vmSqMnM3lS8uzJQppBAR+KRBDvY=
`;

module.exports[n`DFA minimization >> 1039: /\||^\./ `] = lit`
zyQTZb5DhCJA+eAXV5bjpzCZ7/4OybfT4uNMECOHrVg=
`;

module.exports[n`DFA minimization >> 1040: /[*_%?@+\-^~]+/ `] = lit`
9djzCxsOIhJR/yC6tmgHQMahg5xV0q2hwYgQBWGo5Kw=
`;

module.exports[n`DFA minimization >> 1041: /[":]/ `] = lit`
q4tZ1E+KZ+IEWp5llqU79Pk7zc9SNaxX9Qzo9Qrv80o=
`;

module.exports[n`DFA minimization >> 1042: /[!:]/ `] = lit`
oae9QeWLqQaljZnUSuQMG7t9Bu5zV1XPzL+i9b9hoVU=
`;

module.exports[n`DFA minimization >> 1043: /(^[a-z]\w*)(?:(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})|(?:\)|\((?![^|()\n]+\)... `] = lit`
51izG+AWUS2DZC+pZ14POIIAacj5u6/GlMTk3ZB9vlE=
`;

module.exports[n`DFA minimization >> 1044: /(^[*#]+)(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})+/ `] = lit`
HIPtcGMxwboKQCzYQIXA4uaXjNuy61vq+Rk7Q2ODyt8=
`;

module.exports[n`DFA minimization >> 1045: /(^|\|(?:\r?\n|\r)?)(?:(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})|(?:\)|\((?![^|... `] = lit`
UwsPT8FjqmsX1jYs9Aw7R0vdD7Jgh+RMraJ09A+gILg=
`;

module.exports[n`DFA minimization >> 1046: /(^(\*\*?)(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})*).+?(?=\2)/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1047: /(^(__?)(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})*).+?(?=\2)/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1048: /(^\?\?(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})*).+?(?=\?\?)/ `] = lit`
C4SITxa4gg72MbUFj9b/4Yw8NHu2S+y57T/ZDU0OM64=
`;

module.exports[n`DFA minimization >> 1049: /(^@(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})*).+?(?=@)/ `] = lit`
88gpR+6stGe+ab4G+oavH5m1EfxIAeZCn+VZD04u79A=
`;

module.exports[n`DFA minimization >> 1050: /(^\+(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})*).+?(?=\+)/ `] = lit`
McQW64c/Ag3edSigosr2a0VaFjWFSXJBFkt6HoOZF8s=
`;

module.exports[n`DFA minimization >> 1051: /(^-(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})*).+?(?=-)/ `] = lit`
LesdzspmsCW0nxJfBW9EJhYJv0m4zQ8IYqzfznjeed8=
`;

module.exports[n`DFA minimization >> 1052: /(^%(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})*).+?(?=%)/ `] = lit`
7fwyF5DYtiDvYPmNswd99lxmeo+27mGl6aqKv4Hwn3E=
`;

module.exports[n`DFA minimization >> 1053: /(^\*\*|__|\?\?|[*_%@+\-^~])(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})+/ `] = lit`
yiL/3Xr1WRQOo+61oe9jhsDlV8KVVhfhnmuwvNJUi7g=
`;

module.exports[n`DFA minimization >> 1054: /(\[)[^\]]+(?=\])/ `] = lit`
RIM1aPjHhllNP6LoHmC3rFWtXsyVhOP3LCXBMu/j1T0=
`;

module.exports[n`DFA minimization >> 1055: /(\])\S+$/ `] = lit`
rif1oUG4aMYs1VDnniz/O8fKrCJmP9iUlJq0x9LkVb8=
`;

module.exports[n`DFA minimization >> 1056: /(^"(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})*)[^"]+(?=")/ `] = lit`
WjCgSlaBCdcnGXOBeeL9wM+JLbOO6lshw5wKxFV+KgY=
`;

module.exports[n`DFA minimization >> 1057: /(^")(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})+/ `] = lit`
7qn/b50AwjnKf5oY4M+b3yspoWu7og5f8rxcG2OVrww=
`;

module.exports[n`DFA minimization >> 1058: /(:).+/ `] = lit`
HrBmOa6MMTcKY99g1pevWrkS/2vAKBIMOrE6PaLwwVc=
`;

module.exports[n`DFA minimization >> 1059: /(^!(?:(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})|(?:\)|\((?![^|()\n]+\)))|[<>=]... `] = lit`
TwU/XlWABL258uIF8a3/cFRT8gnu/E7xF7ir+oLMnAM=
`;

module.exports[n`DFA minimization >> 1060: /(^!)(?:(?:\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\})|(?:\)|\((?![^|()\n]+\)))|[<>=... `] = lit`
VVnOhoC/g5fYsi7PFF5AiuSdorUk25ToECceUpXbQuI=
`;

module.exports[n`DFA minimization >> 1061: /(\()[^)]+(?=\))/ `] = lit`
QdBYMtS2ZvFTyoMhp0nQwoTbfnzDaL7KDwUbIRXaQmA=
`;

module.exports[n`DFA minimization >> 1062: /[\\\/]\d+|\S/ `] = lit`
qsOt/ELF0rOHvWj71NPcsxR5VhDAjgjLhyamKO+7HhQ=
`;

module.exports[n`DFA minimization >> 1063: /\{[^}]+\}/ `] = lit`
d6N1LqBUwi96yGfhKRhDFsfeMMWSKkVXWQ4eAViIgo4=
`;

module.exports[n`DFA minimization >> 1064: /\{\{![\s\S]*?\}\}/ `] = lit`
LueVJozlkNE7yN4Mw0Zo8WWkrCLiwXw5jpbe6mp57rE=
`;

module.exports[n`DFA minimization >> 1065: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/ `] = lit`
kfKOfFOyjgCBZmC5DIDn4XQk7E3TUUr0MOS1oxqTO9c=
`;

module.exports[n`DFA minimization >> 1066: /[!"#%&':()*+,.\/;<=>@\[\\\]^\`{|}~]/ `] = lit`
4ga/lxsHjsjj0JyXtGSXZw3mi/y6KaRrRoMBqhhaZmc=
`;

module.exports[n`DFA minimization >> 1067: /[^!"#%&'()*+,\/;<=>@\[\\\]^\`{|}~\s]+/ `] = lit`
NE9hnOvJaeDbtS2mykl+3y3QJIgynHUSKH7qxcGvSWQ=
`;

module.exports[n`DFA minimization >> 1068: /^\{\{\{?|\}\}\}?$/i `] = lit`
wCZVQ5Z3QURht/FHYsZ6p5W5RPDM5zPAG335yFCu9yU=
`;

module.exports[n`DFA minimization >> 1069: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i `] = lit`
nDVIRxa+poqs0sIbhPHJgz1VKLPVzbw6SX3hFBwu+dg=
`;

module.exports[n`DFA minimization >> 1070: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS... `] = lit`
fNf5g35bj0tRc+xI0rXv74bb//KIvvT/q0SXXY6hzKk=
`;

module.exports[n`DFA minimization >> 1071: /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|n... `] = lit`
ur6Fm7+ppDAXw8uL7BtzE4ISr7EOVOzUoydIsStu3WQ=
`;

module.exports[n`DFA minimization >> 1073: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i `] = lit`
rEEHFSrP1sA7cgN1SqNZ4expj4YLO+Zan63EQ9mX39U=
`;

module.exports[n`DFA minimization >> 1074: /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^... `] = lit`
1g36aCcYPwG8xCU/EffCwvKcOpfaJKtm5TVxwpld+bQ=
`;

module.exports[n`DFA minimization >> 1075: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1076: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1077: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--[^-!#$%*+=?&@|~.:<>^\\\/].*|{-[\s\S]*?-})/m `] = lit`
XO8ghlv2QuKSNM+So/z5vM7+c5T98fx/lAey3ppa9oQ=
`;

module.exports[n`DFA minimization >> 1078: /"(?:[^\\"]|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS... `] = lit`
35TS7PUr7Uo90D97R/TMyRZ25mV8tOGA3EnxxOrU39k=
`;

module.exports[n`DFA minimization >> 1079: /((?:\r?\n|\r|^)\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(... `] = lit`
JjoTecBkeX7/Ujnz9ASsLWNQRcaZCu2xg//b5S9RioE=
`;

module.exports[n`DFA minimization >> 1080: /\b(?:import|qualified|as|hiding)\b/ `] = lit`
rC5lBGCboJIdwRB8IAg9HjsXJdW0Ef8nM9p5s/9KnIA=
`;

module.exports[n`DFA minimization >> 1081: /\bthis\b|\b(?:abstract|as|break|case|cast|catch|class|continue|default|do|dynam... `] = lit`
XnwpKZ9KrO4ir5Kb3aYDg5WHRBWyB+QxPXNKRthRf74=
`;

module.exports[n`DFA minimization >> 1082: /\.{3}|\+\+?|-[->]?|[=!]=?|&&?|\|\|?|<[<=]?|>[>=]?|[*\/%~^]/ `] = lit`
jY31fvVDq/aRTRqQatoTDeIU7bwYa/N25pOBY63FytI=
`;

module.exports[n`DFA minimization >> 1083: /(["'])(?:(?!\1)[^\\]|\\[\s\S])*\1/ `] = lit`
k4svf2S33O4huwtZh9fr/cqBP+sP2Y4OZp2uni/DvAQ=
`;

module.exports[n`DFA minimization >> 1084: /~\/(?:[^\/\\\r\n]|\\.)+\/[igmsu]*/ `] = lit`
8FhmRWfQpqUw9GkhyY53SMSC8WyxS9daRxBpY/gVKuM=
`;

module.exports[n`DFA minimization >> 1085: /#\w+/ `] = lit`
68v9J3ODe9Zv+yldcqT6TmMLMDaCYISVNWp6/qeF+Co=
`;

module.exports[n`DFA minimization >> 1086: /@:?\w+/ `] = lit`
qaoIydw3d8lXoreVxFfF4DGgZrqxA0OOZpgk67/tVOg=
`;

module.exports[n`DFA minimization >> 1087: /\$(?:\w+|(?=\{))/ `] = lit`
WOn5KkorG4fg1em2+rP5n9heo+QlG7wMQrq5v4kWGa4=
`;

module.exports[n`DFA minimization >> 1088: /(^|[^\\])\$(?:\w+|\{[^}]+\})/ `] = lit`
Re8E8xnzQ0QslX1CPKRXFn9ytFkzyoSqKgbXb53pMjs=
`;

module.exports[n`DFA minimization >> 1089: /^\$\w*/ `] = lit`
2qpJyzpkH4o3KOjbCK15JOyBeE7kYdHxsOkLnDPET3E=
`;

module.exports[n`DFA minimization >> 1090: /(?:\/\/|#).*|\/\*[\s\S]*?(?:\*\/|$)/ `] = lit`
klsfdl1usggkWDTA2gdjfyunRjxd9Mr/5WzT7L6RjTk=
`;

module.exports[n`DFA minimization >> 1091: /\b0x[\da-f]+\b|\b\d+\.?\d*(?:e[+-]?\d+)?/i `] = lit`
3V9HBuCXSPBklqX0jRyQFiO0AOuDiAZN0kjKgMt5FUY=
`;

module.exports[n`DFA minimization >> 1092: /[=\[\]{}]/ `] = lit`
pa4yMUOIzpLpcqbtFnLO3yOO8Yyz0ObYSreDRs4hHqQ=
`;

module.exports[n`DFA minimization >> 1093: /<<-?(\w+)[\s\S]*?^\s*\1/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1094: /[\w-]+(?=\s+{)/ `] = lit`
hv1cipT04J8bVNeBujcm5F1ZPmNFRvQWdsxUTnhxdlc=
`;

module.exports[n`DFA minimization >> 1095: /[\w-\.]+(?=\s*=(?!=))/ `] = lit`
SYxZM21v86Cj3DIpQqAFA3WbWIXAYvDWTHrsDEz5BpY=
`;

module.exports[n`DFA minimization >> 1096: /"(?:\\[\s\S]|[^\\"])+"(?=\s*[:=])/ `] = lit`
qDB0GdLVvLMf9tJNOnBnINPV4fDtSCGkifhjCO0SbPw=
`;

module.exports[n`DFA minimization >> 1097: /"(?:[^\\$"]|\\[\s\S]|\$(?:(?=")|\$+|[^"\${])|\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*... `] = lit`
BRoKkI/sSBSKcy956RIV4b3Wbua3lFnalSwYL1fHaKE=
`;

module.exports[n`DFA minimization >> 1098: /(?:resource|data)\s+(?:"(?:\\[\s\S]|[^\\"])*")(?=\s+"[\w-]+"\s+{)/i `] = lit`
tLsdhgwNHjl82N9pSDfe1Bf27u4JofgCkF0faQjRFU4=
`;

module.exports[n`DFA minimization >> 1099: /(?:provider|provisioner|variable|output|module|backend)\s+(?:[\w-]+|"(?:\\[\s\S... `] = lit`
Mcv4CtcwxDfok/4GT37S50QYqdwUL0ZUdFwRM9oFRj0=
`;

module.exports[n`DFA minimization >> 1100: /(^|[^$])\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*")*\}/ `] = lit`
Rfd2GK5KaCdLTLIKX36TFrJLukPkzfKfwC7GAT3lJU4=
`;

module.exports[n`DFA minimization >> 1101: /(resource|data|\s+)(?:"(?:\\[\s\S]|[^\\"])*")/i `] = lit`
LqODXchR8PPaD/GvP0Evxux6CMdYu1TYkzvfBxkQ4vQ=
`;

module.exports[n`DFA minimization >> 1102: /(provider|provisioner|variable|output|module|backend)\s+(?:[\w-]+|"(?:\\[\s\S]|... `] = lit`
bTCTRKjlgTxEjcgn/FztZWY+rTA1yfW5FQOEE4HZSFc=
`;

module.exports[n`DFA minimization >> 1103: /\b(?:terraform|var|self|count|module|path|data|local)\b/i `] = lit`
1c4p9n+/k4mEGWkGa+VGa2KpVp2LwNhrDAEx8tLKAXo=
`;

module.exports[n`DFA minimization >> 1104: /[!\$#%&'()*+,.\/;<=>@\[\\\]^\`{|}~?:]/ `] = lit`
9SdcOwNQwvgkEW1d29z89WO1/22/KBX8Y16oku+v1B4=
`;

module.exports[n`DFA minimization >> 1105: /(\b(?:terraform|var|self|count|module|path|data|local)\b\.)[\w\*]+/i `] = lit`
clGbdjF2/iminazMhB6aorkfiAiWk+kt9/b2a8chzwI=
`;

module.exports[n`DFA minimization >> 1106: /(?:(?:\b\d+\.?\d*|\B\.\d+)(?:[eE][+-]?\d+)?|\b0x[\da-fA-F]+)[fFhHlLuU]?\b/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1107: /\b(?:AppendStructuredBuffer|BlendState|Buffer|ByteAddressBuffer|CompileShader|C... `] = lit`
SstiVfZM75ifqewvoE1FS1TQK+ql5/k3JUMRg9s1PFA=
`;

module.exports[n`DFA minimization >> 1108: /\b(?:asm|asm_fragment|auto|break|case|catch|cbuffer|centroid|char|class|column_... `] = lit`
mJ8Qva/2SbwkCErAENs0/GsoxE6gkS9+Pd8/JVn0tfU=
`;

module.exports[n`DFA minimization >> 1109: /\b(?:bool|double|dword|float|half|int|min(?:10float|12int|16(?:float|int|uint))... `] = lit`
itLHc3HbL2tL+q8Q+4FqohcXHPAX+sFVojKqDS4D2nM=
`;

module.exports[n`DFA minimization >> 1110: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHT... `] = lit`
m44yviimj/BSS05MR2pMRXSRAPqbpBHEtzau7JwH+EA=
`;

module.exports[n`DFA minimization >> 1111: /^HTTP\/1.[01] \d+.*/m `] = lit`
RGL4aUDzWQbi57Nl1hQt3iNULc0CXDfdYUjRQfZ2kxc=
`;

module.exports[n`DFA minimization >> 1112: /^[\w-]+:(?=.)/m `] = lit`
a9nEbK0ewtTmi0TBVuzTNXyg/ynWQe2WSpyHAFXG45U=
`;

module.exports[n`DFA minimization >> 1113: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/ `] = lit`
5YWjtXvizJUhnrqDdE9DBrTxYcPZkU1VHOdfYEuRtN0=
`;

module.exports[n`DFA minimization >> 1114: /:\w+/ `] = lit`
2N1WOoS7J2CeW2kHSBd5Vp3l3sFoegt/DZPDaluhvl8=
`;

module.exports[n`DFA minimization >> 1115: /(^HTTP\/1.[01] )\d+.*/i `] = lit`
aTNTzlQ6Sb1ujmLaVVFVlBvywplNCxF7fThHMP2IIlE=
`;

module.exports[n`DFA minimization >> 1116: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i `] = lit`
ddhcchiUdUeWGiQMIbfhePX82fcKSvmwaoF5qBe/t5E=
`;

module.exports[n`DFA minimization >> 1117: /[{}[\],]/ `] = lit`
l8yHixblpPQpHfrS/PFUryfpfmMuRMhhusxjwhbjlz0=
`;

module.exports[n`DFA minimization >> 1118: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/ `] = lit`
rSwHzrzQXcNkfv6igx3nWbliVDorK2aIVgShCy8HuQY=
`;

module.exports[n`DFA minimization >> 1119: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/ `] = lit`
vAWlB1EdyUqSGPPC0ql3/BUjpcILwwRJYbUAuqQM8gY=
`;

module.exports[n`DFA minimization >> 1120: /(content-type:\s*application\/javascript[\s\S]*?)(?:\r?\n|\r){2}[\s\S]*/i `] = lit`
5lxKonrTP7DN3d13MSa7rk/j5/f975lDsl4fblAq3ZM=
`;

module.exports[n`DFA minimization >> 1121: /(content-type:\s*(?:application\/json|\w+\/(?:[\w.-]+\+)+json(?![+\w.-]))[\s\S]... `] = lit`
SIdRaG73cxiAUtpy6SPeCXCpMOYQKJ+ufqmP/Klv38A=
`;

module.exports[n`DFA minimization >> 1122: /(content-type:\s*(?:application\/xml|\w+\/(?:[\w.-]+\+)+xml(?![+\w.-]))[\s\S]*?... `] = lit`
geP71EK+ytprQu7ObY1uXLXaDbBS/rpAGptF6p0ZT8g=
`;

module.exports[n`DFA minimization >> 1123: /(content-type:\s*text\/xml[\s\S]*?)(?:\r?\n|\r){2}[\s\S]*/i `] = lit`
RhWoHMPX5YSfzLPlHnkQCJUR1SfmeQ+8hEJmQgH9r/E=
`;

module.exports[n`DFA minimization >> 1124: /(content-type:\s*text\/html[\s\S]*?)(?:\r?\n|\r){2}[\s\S]*/i `] = lit`
QrFcEv0z908TeR+DG+lou7gzXIMiioOSRujBXKR3LGI=
`;

module.exports[n`DFA minimization >> 1125: /(content-type:\s*text\/css[\s\S]*?)(?:\r?\n|\r){2}[\s\S]*/i `] = lit`
OdeqpWcmAViqDIBxkUntV1cMuvUuwZyZjBPyvZkSHDk=
`;

module.exports[n`DFA minimization >> 1126: /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=\/]+"|(... `] = lit`
ER9OxJybYBzr0rO0l+t+Eamk7l6u9dijVa4u2x8RY/8=
`;

module.exports[n`DFA minimization >> 1127: /\b\d{7,}\b/ `] = lit`
+0m+Utup+ubzFyuPwWVisyRCD5jCtCxws4afKKhE1R4=
`;

module.exports[n`DFA minimization >> 1128: /\b\d{1,6}\b/ `] = lit`
FrBR8k0boiaYJu7ZNqWFn7X7RiEwBG7ZZ4aPPL6P8BA=
`;

module.exports[n`DFA minimization >> 1129: /\b(?:max-age=|includeSubDomains|preload)/ `] = lit`
0vwin5MSqQBlmmedCiBL8zz6VfAlSes3KB9ViwvTlLA=
`;

module.exports[n`DFA minimization >> 1130: /\b\d{8,}\b/ `] = lit`
ytwxvxlavC+6ol5Vng6c7kVjaD2I2AY+mHN88y3g1ms=
`;

module.exports[n`DFA minimization >> 1131: /\b\d{1,7}\b/ `] = lit`
CZltS1jgOKzZ689GMxSs2vZRqsbxvOQ9nygMKE2HrnQ=
`;

module.exports[n`DFA minimization >> 1132: /(?:\B'|REM)(?:[^\n\r]*)/i `] = lit`
pxJNjxq20E1ftEW7ihNa5ArTxtQ8HN4VI4xbpA53l28=
`;

module.exports[n`DFA minimization >> 1133: /\B#[0-9A-F]+|\B\`[01]+|(?:\b\d+\.?\d*|\B\.\d+)(?:E[+-]?\d+)?/i `] = lit`
lD4IdDf/BOYHG5qFKbZak/PlexwXlszlTdJ1vVgqJwg=
`;

module.exports[n`DFA minimization >> 1134: /\b(?:BEEP|BPS|CASE|CLEAR|CLK|CLO|CLP|CLS|CLT|CLV|CONT|COPY|ELSE|END|FILE|FILES|... `] = lit`
cKVAvL+sVbxrSKdKh7i06TdIhuW4HcbJzy0FVCy0aFk=
`;

module.exports[n`DFA minimization >> 1135: /\b(?:ABS|ANA|ASC|BIN|BTN|DEC|END|FREE|HELP|HEX|I2CR|I2CW|IN|INKEY|LEN|LINE|PEEK... `] = lit`
QQ0I4ITFrab5iTjBK++XXYgmbXDG46Vfwk6tsS9Q6k4=
`;

module.exports[n`DFA minimization >> 1136: /(?:\B@[^\s]+)/i `] = lit`
zEDo4CpOSRXg/fDzf93Dgtqc7+mTpCi55ctMj2B0WU8=
`;

module.exports[n`DFA minimization >> 1137: /<[=>]?|>=?|\|\||&&|[+\-*\/=|&^~!]|\b(?:AND|NOT|OR)\b/i `] = lit`
Fzc79GlNTBZlXDGR4DsuSZ/nISbJ+hAr1k8YE3T+72A=
`;

module.exports[n`DFA minimization >> 1138: /[\[,;:()\]]/ `] = lit`
FBcixEQjLEb7L3AMkonK0EqRw8rKUkf6lmx6GnOvoks=
`;

module.exports[n`DFA minimization >> 1139: /\b(?:\d+r[a-z\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\.\d+\b/i `] = lit`
5cUA3/L/f4xncnMmj4SjKG3bgl+T8xzIgF2p3f5k+Xc=
`;

module.exports[n`DFA minimization >> 1140: /\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invo... `] = lit`
5m2Rw/avJJI+HAvhb1JiNXgi2G/VR+mOPAfqhKZcUhI=
`;

module.exports[n`DFA minimization >> 1141: /(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/ `] = lit`
YYBknKxL1FB13uzzQ9F7hpTW0DPmQpRLwMSdsmphWn0=
`;

module.exports[n`DFA minimization >> 1142: /[+-]:(?!=)|(?:[\/?@^%&]|\+\+?|--?|==?=?|~==?=?|\*\*?|\|\|\|?|<(?:->?|<?=?)|>>?=... `] = lit`
Oi+Li3tkUQ56OXCSm89/D+5b0jY47xKnPJ54cBMVmXg=
`;

module.exports[n`DFA minimization >> 1143: /[\[\](){},;]/ `] = lit`
0PFMHC+DvccriYdqAJ2Uo+HWzTlnMVJNLOnj6j/5ppM=
`;

module.exports[n`DFA minimization >> 1144: /(["'])(?:(?!\1)[^\\\r\n_]|\\.|_(?!\1)(?:\r\n|[\s\S]))*\1/ `] = lit`
eETdSsR+o+L/uPnTEqrYhx6CIj2emtJpGp3YwOm0E9o=
`;

module.exports[n`DFA minimization >> 1145: /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|... `] = lit`
9O/UJAzEGAqBSAjqXopz1Bw3XmnqsknH6RcJGt3q3Bg=
`;

module.exports[n`DFA minimization >> 1146: /\S(?:.*(?:(?:\\ )|\S))?/ `] = lit`
p29Pi+fuhI9BmHl8jZIuOnsAn7+LRb+bjeZISIP1NHs=
`;

module.exports[n`DFA minimization >> 1147: /^!|\*\*?|\?/ `] = lit`
3G22zc99sZNfwwbcNFJZOimmu6azYbFJPOGaciIHGk8=
`;

module.exports[n`DFA minimization >> 1148: /\// `] = lit`
6c0qv2Vd5FCWwFQc50hf+iGXtDiS4c+TyfmZQbyGrR8=
`;

module.exports[n`DFA minimization >> 1149: /(^|[^\\])\[[^\[\]]*\]/ `] = lit`
4e2maiTLdocpWGLWLbCXOxgqP5eyjU+ED43Jwi21eH4=
`;

module.exports[n`DFA minimization >> 1150: /[.,:;(){}]/ `] = lit`
9xJfDVj+7dZO8NBeYNiUGDWUTZLqBKmnwBGsBJek2PY=
`;

module.exports[n`DFA minimization >> 1151: /"[^"]*"/ `] = lit`
HANgfZfKHaSKv1EiA5n0bsOD1RQJm1mLEXzdFMG/3+4=
`;

module.exports[n`DFA minimization >> 1152: /^[ \t]*(?:volume|book|part(?! of)|chapter|section|table)\b.+/im `] = lit`
Egb+b42Fg83JlhXO1zQTXtIx2t/rT92b3wpYnRfPrBk=
`;

module.exports[n`DFA minimization >> 1153: /(^|[^-])(?:\b\d+(?:\.\d+)?(?:\^\d+)?\w*|\b(?:one|two|three|four|five|six|seven|... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1154: /(^|[^-])\b(?:applying to|are|attacking|answering|asking|be(?:ing)?|burning|buyi... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1155: /(^|[^-])\b(?:after|before|carry out|check|continue the action|definition(?= *:)... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1156: /(^|[^-])\b(?:adjacent(?! to)|carried|closed|concealed|contained|dark|described|... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1157: /(^|[^-])\b(?:above|adjacent to|back side of|below|between|down|east|everywhere|... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1158: /(^|[^-])\b(?:actions?|activit(?:y|ies)|actors?|animals?|backdrops?|containers?|... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1159: /\S(?:\s*\S)*/ `] = lit`
r7fpOEgIGQ3P61cZwH9UN1tF50DNchzVUb2XQos5Ft0=
`;

module.exports[n`DFA minimization >> 1160: /^[ \t]*[;#].*$/m `] = lit`
X2euVCVA1D1fZNx1CuD5RKzQqI5Jvtp80qIsujX88v0=
`;

module.exports[n`DFA minimization >> 1161: /^[ \t]*\[.*?\]/m `] = lit`
98E59hXhP9+Ae+dbQ2vMQSa7rXDdLkuas32YIE/CXhY=
`;

module.exports[n`DFA minimization >> 1162: /^[ \t]*[^\s=]+?(?=[ \t]*=)/m `] = lit`
sxjY6QzDarGacieJdb4HhKdCcw+RN/gQVqm25yK6hw4=
`;

module.exports[n`DFA minimization >> 1163: /^[=]/ `] = lit`
4aMh4gnPQjcDMSEx3iJeyM08ndzynUUGu4GyE+j1fZY=
`;

module.exports[n`DFA minimization >> 1164: /\b(?:activate|activeCoroCount|asString|block|break|catch|clone|collectGarbage|c... `] = lit`
Bdoae9GIDausdYiKmjskHG6ohvZaYQo4PRcHwmSriYQ=
`;

module.exports[n`DFA minimization >> 1165: /\b(?:Array|AudioDevice|AudioMixer|Block|Box|Buffer|CFunction|CGI|Color|Curses|D... `] = lit`
tE2Yp1q0nnN+p6HoFanh8Ur9M8WpQvypiydZj//mfgU=
`;

module.exports[n`DFA minimization >> 1166: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e-?\d+)?/i `] = lit`
wG10JoqPaZgKZyzfsEQwVSLeSVDoYlXuUkPMv9hf+Kk=
`;

module.exports[n`DFA minimization >> 1167: /[=!*\/%+\-^&|]=|>>?=?|<<?=?|:?:?=|\+\+?|--?|\*\*?|\/\/?|%|\|\|?|&&?|\b(?:return... `] = lit`
6bvP88PAf4L7fftqkJT8EK9vmWIL7CgeQi7Sz+milcA=
`;

module.exports[n`DFA minimization >> 1168: /"""(?:\\[\s\S]|(?!""")[^\\])*"""/ `] = lit`
3PVKCP5ZGq3euPU4sVOtvODyRqChH4jAVwnxlMcaxRk=
`;

module.exports[n`DFA minimization >> 1169: /"(?:\\.|[^\\\r\n"])*"/ `] = lit`
vAWlB1EdyUqSGPPC0ql3/BUjpcILwwRJYbUAuqQM8gY=
`;

module.exports[n`DFA minimization >> 1170: /(^|[^\\])#.*/ `] = lit`
7FFQH5rdX0J3jugR8ferC9qCouujbBnoQI+5j573gwI=
`;

module.exports[n`DFA minimization >> 1171: /\bNB\..*/ `] = lit`
8zXYUwtwVZdApxBDgiht7VQAXNBk+9Xh7fjOSf3DWZQ=
`;

module.exports[n`DFA minimization >> 1172: /\b(?:(?:adverb|conjunction|CR|def|define|dyad|LF|monad|noun|verb)\b|(?:assert|b... `] = lit`
x3Z6bifrX0ju+nC6BUtFBXQnq8b6rshFirfpoTbi0s0=
`;

module.exports[n`DFA minimization >> 1173: /\b_?(?:(?!\d:)\d+(?:\.\d+)?(?:(?:[ejpx]|ad|ar)_?\d+(?:\.\d+)?)*(?:b_?[\da-z]+(?... `] = lit`
HP1+QCm5nYzNT5yeZmeHUu77F0+3SVoSSsn1m0eTk9Y=
`;

module.exports[n`DFA minimization >> 1174: /[=a][.:]|_\./ `] = lit`
4ynF3zKLcMNp03KtStzjftIANBe97G2nmp4OK7VJK/8=
`;

module.exports[n`DFA minimization >> 1175: /'(?:''|[^'\r\n])*'/ `] = lit`
fpr8ze6p/+SF14UEZw7UGAjtaMQiaZfOl5VfU8kEnp8=
`;

module.exports[n`DFA minimization >> 1176: /(?!\^:|;\.|[=!][.:])(?:\{(?:\.|::?)?|p(?:\.\.?|:)|[=!\]]|[<>+*\-%$|,#][.:]?|[?^... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1177: /[~}]|[\/\\]\.?|[bfM]\.|t[.:]/ `] = lit`
54QzDMKw7CNlXqCzAF1Ff+AI2IWsn14lY3KpoEkLN/o=
`;

module.exports[n`DFA minimization >> 1178: /&(?:\.:?|:)?|[.:@][.:]?|[!D][.:]|[;dHT]\.|\`:?|[\^LS]:|"/ `] = lit`
NmDwlMIC4HCqo6bSaXiV20tfvrwXOLwfH6OqtabJyDU=
`;

module.exports[n`DFA minimization >> 1179: /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|de... `] = lit`
kbB4HdxQK3KSmeyYKKCwMbrkVmCB+qNQ2+5lqxnS0BA=
`;

module.exports[n`DFA minimization >> 1180: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d... `] = lit`
yjEgYfFjAlhP9j18GOG+vMtJBnmzDsXnouBgbO4uG3Y=
`;

module.exports[n`DFA minimization >> 1181: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/ `] = lit`
Kg2ypn3Vwpje0V8zznaDHprp/BGbyq5bsYM51H1pKeI=
`;

module.exports[n`DFA minimization >> 1182: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1183: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/ `] = lit`
9YQOSPgOpudiAX3oTuPJwxN3mFHBLO3GmmRKxuQs8+4=
`;

module.exports[n`DFA minimization >> 1184: /\b[A-Z](?:\w*[a-z]\w*)?\b/ `] = lit`
YuS2N5y75WZQ+DyaJHVGS5FZOP9oDLE9ZQrzLcjuFxQ=
`;

module.exports[n`DFA minimization >> 1185: /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/ `] = lit`
5RN6F56s4cDe+Ml9jsyiFrFWNQGzAZG8n+YMHkC1Isg=
`;

module.exports[n`DFA minimization >> 1186: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*\/%&|^!=<>]=?)/m `] = lit`
4euJZ69lrlAeqKtektI63TuL5Tolzd04GGlmIAYDlxQ=
`;

module.exports[n`DFA minimization >> 1187: /[<>(),.:]/ `] = lit`
GYUXUqUIokaNPG5lxLtvEitK9qJG4hZKegUTuf0Ez0A=
`;

module.exports[n`DFA minimization >> 1188: /[?&|]/ `] = lit`
yl97V7tUXfUM/+zO8/kfW2NZDxy2+BiUVW6HNK7jIr4=
`;

module.exports[n`DFA minimization >> 1189: /(\:\:)[a-z_]\w*/ `] = lit`
mtw0xBXQrgoM1WNtZSxia42EOMaQ09LEUSnREiBhqyk=
`;

module.exports[n`DFA minimization >> 1190: /(^|[^\\])\/\*\*[^\/][\s\S]*?(?:\*\/|$)/ `] = lit`
CpzWQMbXPbm2DGjJ6B0cnQlOsnmFPZ30q9waivEt26o=
`;

module.exports[n`DFA minimization >> 1191: /(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m `] = lit`
sBK1onWpJuxLkCT2gRq+0iMTmxHiPfHRWAV4Htu0uds=
`;

module.exports[n`DFA minimization >> 1192: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m `] = lit`
OvinhPsbJRBWj0DOxK+1RAwET2UOsrFFb48e0H6DWOg=
`;

module.exports[n`DFA minimization >> 1193: /(@(?:exception|throws|see|link|linkplain|value)\s+(?:\*\s*)?)(?:(?:[a-zA-Z]\w+\... `] = lit`
1r8VenEzLGzMlW+CnOZRol/73ABPSOb+yO/D0S+RcJ8=
`;

module.exports[n`DFA minimization >> 1194: /(@param\s+)<[A-Z]\w*>/ `] = lit`
Cf+7SZBUM5xPiaO7Vqr3TZKBF/ISQdkRZMOsYQEAdCo=
`;

module.exports[n`DFA minimization >> 1195: /\b[A-Z]\w*/ `] = lit`
Ye1IBpG9ZARUu5zhItXFiGwfWUmbeqmESVDcqbuJnCY=
`;

module.exports[n`DFA minimization >> 1196: /[#()[\],.]/ `] = lit`
axnRX/z+kH2AeanGZ1HoV+TpKS4hHZp+dCuvzYWAqZo=
`;

module.exports[n`DFA minimization >> 1197: /[.<>]/ `] = lit`
dyWW0YpK0XtDFT7xjihfA5QsIaQ7twCB84OPVHFtU1k=
`;

module.exports[n`DFA minimization >> 1198: /(\{@code\s+)(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\})+?... `] = lit`
yISBxRQmrZPqV1Bsr5a6s0ZvGauDBDr2iiuD9Ld1uJA=
`;

module.exports[n`DFA minimization >> 1199: /(<(code|pre|tt)>(?!<code>)\s*)[\s\S]+?(?=\s*<\/\2>)/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1200: /(#\s*)\w+(?=\s*\()/ `] = lit`
TlJUCpB449LECPNizrZ4vpCSeqjAnQRR8whzagqeYUU=
`;

module.exports[n`DFA minimization >> 1201: /(#\s*)\w+/ `] = lit`
QtVgv5TnoL8Kn16xmIO/NuI1PFQsuK90eGlqadO4VLs=
`;

module.exports[n`DFA minimization >> 1202: /\b(?:[a-z]\w*\s*\.\s*)+/ `] = lit`
8adCQOv+wGtqQ+ku7x16Y3DMqhh/sWsFJ6O1oDY70kU=
`;

module.exports[n`DFA minimization >> 1203: /(^(?:\s*(?:\*\s*)*)).*[^*\s].*$/m `] = lit`
9vYv/pivdbxix4eVqZNEVXa0WCm8VqXdOymnkmp50wc=
`;

module.exports[n`DFA minimization >> 1204: /.+/ `] = lit`
rIhgRGY3kbL2VTfMGEqLkvsM/LV0ZOa8GsFYtkNr61w=
`;

module.exports[n`DFA minimization >> 1205: /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forS... `] = lit`
EAA1wVsJHjuuY236zGuhwqvtc9gS/pWE8Vy84QFX/w4=
`;

module.exports[n`DFA minimization >> 1206: /\b0x[\da-f]*\.?[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e\d+)?[dfl]?/i `] = lit`
aKAthtTBMHCimtjXtzBNwWaxshXQcEESFZgBLyw5C3s=
`;

module.exports[n`DFA minimization >> 1207: /\b(?:String|Int|Long|Short|Byte|Boolean|Double|Float|Char|Any|AnyRef|AnyVal|Uni... `] = lit`
7t0qla/3UyAQgA+qS61C4Trni7qA/2mJsfN8zO6xj8U=
`;

module.exports[n`DFA minimization >> 1208: /'[^\d\s\\]\w*/ `] = lit`
47DI6/+gym4mjt+mPFWwrTg+qfOq49bJre7W2N7gOQc=
`;

module.exports[n`DFA minimization >> 1209: /\$+(?:\w+\b|(?={))/i `] = lit`
45PpxINQFDolmzR89PTO7EV/Uy0B9rntgW5mrFRIXW0=
`;

module.exports[n`DFA minimization >> 1210: /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clon... `] = lit`
zCYAQRLnJc0+B/AgVrm7vKualr+E2ocrQfbtIwXn30E=
`;

module.exports[n`DFA minimization >> 1211: /\?>$|^<\?(?:php(?=\s)|=)?/i `] = lit`
w4K7a84eISzT7cm5WYmznUl+PfLfl7jOgmhpA/QYPTM=
`;

module.exports[n`DFA minimization >> 1212: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1213: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1214: /(\\|namespace\s+|use\s+)[\w\\]+/ `] = lit`
hvQKKRnqjLQ9bi3/2yecJYT36WC9da8M5iL2fHa7seM=
`;

module.exports[n`DFA minimization >> 1215: /(->)[\w]+/ `] = lit`
QZnX39EzA5oHG5VxiboO5YKgukmEtGi8ORGiHWBz6ys=
`;

module.exports[n`DFA minimization >> 1216: /\b[A-Z_][A-Z0-9_]*\b/ `] = lit`
Ry3r3sbzG3/gdvXz2PZqCHjwx1BPcSxI3frFfvi9dFI=
`;

module.exports[n`DFA minimization >> 1217: /\b(?:null)\b/i `] = lit`
ZHrD3UdyZbdEkJM1DZtZRMU3v5uNwK55VoT/PlfNfoQ=
`;

module.exports[n`DFA minimization >> 1218: /\\/ `] = lit`
puLSgWdy/KnH7ew8SQuX3rvKJhZD9Mgx9qCyqaJPZH8=
`;

module.exports[n`DFA minimization >> 1219: /^<<<'[^']+'|[a-z_]\w*;$/i `] = lit`
7FSKMWeMTlS21cqeZUK1wJ5iKZgIebDwq4a+VlkAO80=
`;

module.exports[n`DFA minimization >> 1220: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i `] = lit`
kSAxM5wplQZukT27mG8xFKxcfHzWa9g6hCkyJK5tSaQ=
`;

module.exports[n`DFA minimization >> 1221: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\... `] = lit`
IgZZhFwuuXoSu3My/uuCSGU9OJSfTBshcQxCxACpXYc=
`;

module.exports[n`DFA minimization >> 1222: /^<<<'?|[';]$/ `] = lit`
Z34sCltfdejfTZgnJEBVMEh27HT9flbgjazRFGh/dg8=
`;

module.exports[n`DFA minimization >> 1223: /^<<<"?|[";]$/ `] = lit`
kPejf3PFjbSX3HEZwZ0EgHyS5t+jZgf4G9UWapxi8ns=
`;

module.exports[n`DFA minimization >> 1224: /^[\t ]*(?:(?:Caused by:|Suppressed:|Exception in thread "[^"]*")[\t ]+)?[\w$.]+... `] = lit`
2suc1Sj2Xvza0inq4oHWVyDLHo3yiaewZwZcEO4KcmE=
`;

module.exports[n`DFA minimization >> 1225: /^[\t ]*at [\w$.]+(?:<init>)?\([^()]*\)/m `] = lit`
bbiRv5zCpLWtWF9Ebo7PG5HcUQC5zt2hZzKSiwEZnro=
`;

module.exports[n`DFA minimization >> 1226: /^[\t ]*\.{3} \d+ [a-z]+(?: [a-z]+)*/m `] = lit`
f6zb0WT8dOtifE1jhosu0Esv2TDZXQHVmUUVun0zntA=
`;

module.exports[n`DFA minimization >> 1227: /[:]/ `] = lit`
gwaQCkXxPWUSEYeW+09l3l+4TOJc1EmyLFMyRC6rH5I=
`;

module.exports[n`DFA minimization >> 1228: /[\w$]+(?=\.(?:<init>|[\w$]+)\()/ `] = lit`
Fy0Qn3hXfuhnn9JF18neWXD1Mx8SI2BJtaRHD1d3Rqw=
`;

module.exports[n`DFA minimization >> 1229: /(?:<init>|[\w$]+)(?=\()/ `] = lit`
4kNg1ZeY5sCZlKp2kQXq6b0PJsaJ3MCQfTuFqDE9K84=
`;

module.exports[n`DFA minimization >> 1230: /[a-z]\w*/ `] = lit`
0EwVrR9mzhMIjML4teAovoYDSnNnBuHwKogOxvZjtVY=
`;

module.exports[n`DFA minimization >> 1231: /[.()]/ `] = lit`
RpN0MGbObmTE11XB2XqTfj1MiU+sbq73qp5fuIVBk48=
`;

module.exports[n`DFA minimization >> 1232: /\.{3}/ `] = lit`
jFUaKSEaKOLlSg9wUWQ88qG+nhM/agcxCdFCFI6TxYk=
`;

module.exports[n`DFA minimization >> 1233: /\d+/ `] = lit`
T1tiIJjbJgPlEh6hZSYJgpqFViePCmBeCxRBY6JwWD0=
`;

module.exports[n`DFA minimization >> 1234: /\b[a-z]+(?: [a-z]+)*\b/ `] = lit`
IG+jPcKy2wpZtvKEc3YBI0aS8teoADmJaIW5uvQ9Ne4=
`;

module.exports[n`DFA minimization >> 1235: /^(\s*)(?:(?:Caused by|Suppressed)(?=:)|Exception in thread)/m `] = lit`
UKzJSnDwfKGKhQNSHAdhi1wHv2eI1hAAA6W7Kw+T+OQ=
`;

module.exports[n`DFA minimization >> 1236: /^(\s*)"[^"]*"/ `] = lit`
ZOZffRyuEkDk1TM44BQTc4Dqlbq5UWzWce/TfktiEKg=
`;

module.exports[n`DFA minimization >> 1237: /^(:?\s*)[\w$.]+(?=:|$)/ `] = lit`
NVfPFX8VriYnJCZ6D9TjiWGqUSCxXdbJdo2GjOEpPho=
`;

module.exports[n`DFA minimization >> 1238: /(:\s*)\S.*/ `] = lit`
XF0mJcradLG1yAaKrAEUOD+Mq+K/6T3sfZSGF3Z6Zl4=
`;

module.exports[n`DFA minimization >> 1239: /^(\s*)at/ `] = lit`
yxrcwk7udHRL433l2WFMFi13Cmf90alJN1uAIGSMOmk=
`;

module.exports[n`DFA minimization >> 1240: /[\w$]+(?=$|:)/ `] = lit`
TvLyYDcszGFoxQTFM7B0wnVKV11fk2Maom3M+g+qqiQ=
`;

module.exports[n`DFA minimization >> 1241: /[.:]/ `] = lit`
ASeCz/zGJWlP6+bVgaO3zlJak/rHsH7RqdR6zaCIZ3c=
`;

module.exports[n`DFA minimization >> 1242: /(\()\w+.\w+:\d+(?=\))/ `] = lit`
iw2AUe0nbdPIO1Rlyz85hZekj5HYVdhbVXYhAem7/0g=
`;

module.exports[n`DFA minimization >> 1243: /(\()[^()]*(?=\))/ `] = lit`
7hLUQtrVWDOt/fjCE8JKAYt3FunvfBM1rTzeIK+BU0I=
`;

module.exports[n`DFA minimization >> 1244: /^\w+\.\w+/ `] = lit`
SwH92l6dB/XWbHFDWbSCqDcTBTfTh3FdEEuc3Ro5HOU=
`;

module.exports[n`DFA minimization >> 1245: /^(?:Unknown Source|Native Method)$/ `] = lit`
sS/C07wF5Ie8ftXlP9+lIA6Fw9IfgpED5KWPfzQsKsY=
`;

module.exports[n`DFA minimization >> 1246: /\b(?:include|define|is_defined|undef|main|init|outputPort|inputPort|Location|Pr... `] = lit`
8jyh3DT6Wj8f/sbQLWHytiXDKFIHI1rDgVl2y9oWpZM=
`;

module.exports[n`DFA minimization >> 1247: /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?l?/i `] = lit`
TQW+b9AY1kFr3M1Q69RIkJ0NOOR8l1liTrf+msj2zgs=
`;

module.exports[n`DFA minimization >> 1248: /-[-=>]?|\+[+=]?|<[<=]?|[>=*!]=?|&&|\|\||[:?\/%^]/ `] = lit`
WIlyG2pX9DnlZ5+SG0psUZzYIEBs3mwqPQWTJ2YRPXE=
`;

module.exports[n`DFA minimization >> 1249: /[,.]/ `] = lit`
sGL+nN5FRynK4TDrbA47Hcca7HR5FpU5k6kNarXrHyA=
`;

module.exports[n`DFA minimization >> 1250: /\b(?:undefined|string|int|void|long|Byte|bool|double|float|char|any)\b/ `] = lit`
uSMsC5rkvUtylFJE4X4gDEEsxJZfRt/27L9bcUqcyFo=
`;

module.exports[n`DFA minimization >> 1251: /[|;@]/ `] = lit`
ZH4ACPocP7QqTpa7JKkTWB5Oqs9ut5oFgU0inVMSHCE=
`;

module.exports[n`DFA minimization >> 1252: /((?:\b(?:outputPort|inputPort|in|service|courier)\b|@)\s*)\w+/ `] = lit`
xHLavUwPZHqGjx1DtSnFBb06Ar5eHMdn0hT5CYKK3cs=
`;

module.exports[n`DFA minimization >> 1253: /(\bAggregates\s*:\s*)(?:\w+(?:\s+with\s+\w+)?\s*,\s*)*\w+(?:\s+with\s+\w+)?/ `] = lit`
phKKUTwbLqcyKtxY1Q/8zw1j7nkHPu7WYgKG08+m+yM=
`;

module.exports[n`DFA minimization >> 1254: /(\bRedirects\s*:\s*)(?:\w+\s*=>\s*\w+\s*,\s*)*(?:\w+\s*=>\s*\w+)/ `] = lit`
ZJ42D49UsSzugQ2Mo5vXhMAflr83D8Uy499wvZ0vtik=
`;

module.exports[n`DFA minimization >> 1255: /\bwith\s+\w+/ `] = lit`
7M+Z8eBwZ8KNnaFFVYpznnEbUaaDBjFeBdJGJwUlj1M=
`;

module.exports[n`DFA minimization >> 1256: /=>/ `] = lit`
+YDr1KDwxKEqNkrMdogbwJv4QNXH3RpafFzuw1CcKIY=
`;

module.exports[n`DFA minimization >> 1257: /\bwith\b/ `] = lit`
1rYkCzRLWT+Iu+fP4tobPBd8HDZDtfqCzRx8DHjszdM=
`;

module.exports[n`DFA minimization >> 1258: /\B\$\w+/ `] = lit`
RQJC+6hkWbDXNo5naUkdYhLDRPuqQa8CZNP/KrZmQto=
`;

module.exports[n`DFA minimization >> 1259: /\b(?:as|break|catch|def|elif|else|end|foreach|if|import|include|label|module|mo... `] = lit`
0o9dNehq871SsDXnEO1aXjAiDnrVaM5FsPQzb+gFO00=
`;

module.exports[n`DFA minimization >> 1260: /(?:\b\d+\.|\B\.)?\b\d+(?:[eE][+-]?\d+)?\b/ `] = lit`
yAyhJIeO33ZjlX2cNmJWHDoppBbF6FoaTtA9WLaTIUI=
`;

module.exports[n`DFA minimization >> 1261: /::|[()\[\]{},:;]|\.(?=\s*[\[\w$])/ `] = lit`
8MSQfJIbc7Foxc9zdtTcseBy31hJ9JKkg2grl7oN1RA=
`;

module.exports[n`DFA minimization >> 1262: /"(?:[^"\r\n\\]|\\[^\r\n(]|\\\((?:[^()]|\([^()]*\))*\))*"(?=\s*:(?!:))/ `] = lit`
6cgrsmDlSAYsNsTjDgZplc8mWbtjRiqT+pkGGPs6tlE=
`;

module.exports[n`DFA minimization >> 1263: /"(?:[^"\r\n\\]|\\[^\r\n(]|\\\((?:[^()]|\([^()]*\))*\))*"/ `] = lit`
0KfdAJbAdSRiSbmxsghTt9DfPphK8v87oula7i3goUg=
`;

module.exports[n`DFA minimization >> 1264: /(\bdef\s+)[a-z_]\w+/i `] = lit`
hVRbkPTaA5txuvuseCABch7L7C+ZGTsARMc4U+GTJy0=
`;

module.exports[n`DFA minimization >> 1265: /\b[a-z_]\w*(?=\s*:(?!:))/i `] = lit`
bqeNOU77nwQTXoEJBxrY/zh4+Ro6Ir7DZuGhpOt1QXw=
`;

module.exports[n`DFA minimization >> 1266: /\.\.|[!=<>]?=|\?\/\/|\/\/=?|[-+*\/%]=?|[<>?]|\b(?:and|or|not)\b/ `] = lit`
z/TtQm3pRY4ZCv0ALojkuldtzPF2hKCUCW1EVsxP7ww=
`;

module.exports[n`DFA minimization >> 1267: /\b[a-z_]\w*(?=\s*\()/i `] = lit`
Pzj56ooZK2dcyafycKwYDm3OyTvuhVK39Cp0cgWIiQI=
`;

module.exports[n`DFA minimization >> 1268: /\|=?/ `] = lit`
wMV1mgVdsNAOAbGbTEhn5j6It59gJfXvFvtbUM4eOXw=
`;

module.exports[n`DFA minimization >> 1269: /((?:^|[^\\])(?:\\{2})*)\\\((?:[^()]|\([^()]*\))*\)/ `] = lit`
XvThindlHefC4sqiDsJ1gMPgozpomXKbTPteEdxShOM=
`;

module.exports[n`DFA minimization >> 1270: /^\\\(|\)$/ `] = lit`
hleiMX5JETfldD7Xbbt2XJOrwKSCgW4eo2AJkh4q/r8=
`;

module.exports[n`DFA minimization >> 1271: /^(\\\()[\s\S]+(?=\)$)/ `] = lit`
goyDmJZMeHLvOnao/I0l8EEzeG0iohVFJzDcOtMBxRA=
`;

module.exports[n`DFA minimization >> 1272: /\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|c... `] = lit`
bEAfreiEcW7wAUluFTFh4lOafH4IA+sasb9KUkHXS/A=
`;

module.exports[n`DFA minimization >> 1273: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|ne... `] = lit`
8XfSQuFTNthoXVX0u3SOE45/zo5s8t9Dl4S6/bGXI6c=
`;

module.exports[n`DFA minimization >> 1274: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)[_$... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1275: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?... `] = lit`
e0mpEHOqMfoFhyPQX92fFKEHBq2yAieEOZDOUVNd1c0=
`;

module.exports[n`DFA minimization >> 1276: /(@(?:param|arg|argument|property)\s+(?:{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}\s+)?)... `] = lit`
WY48enFDlrGpKWDCWJrIqhnsFgPMASHcAkWIlqqibs4=
`;

module.exports[n`DFA minimization >> 1277: /(@(?:param|arg|argument|property)\s+(?:{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}\s+)?)... `] = lit`
KYxOTcoRPyJfEQoq/BMCdesX50exc3q7SL6E4CS9+ck=
`;

module.exports[n`DFA minimization >> 1278: /(@example\s+)[^@]+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/ `] = lit`
q54Wuf8GvHLG0WgDRajf7wbIUj75lq1Qrw9VpiPqVMQ=
`;

module.exports[n`DFA minimization >> 1279: /^#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/ `] = lit`
ZdM8LmJuWefG7c0pHYbuz1jz+itha6Rs3QOL4NXd4OY=
`;

module.exports[n`DFA minimization >> 1280: /[=[\]]/ `] = lit`
76adNdF3rb+0QK4y9iufJVAfBrwdt+/4s06rXVWQ/ho=
`;

module.exports[n`DFA minimization >> 1281: /(@(?:augments|extends|class|interface|memberof!?|template|this|typedef)\s+(?:{(... `] = lit`
EJNr+Eo3RXecTTpOsZj6DK+R7jAWgQ241wjOC9aGus8=
`;

module.exports[n`DFA minimization >> 1282: /(@[a-z]+\s+){(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}/ `] = lit`
JWAeyKBsh2LkFulJeX39ZdQ0Cl2VdsfEwlp5mt3KT8s=
`;

module.exports[n`DFA minimization >> 1283: /<[\s\S]+/ `] = lit`
hNvy2s0EmYw7PM24WXcHYbse5hBGs2dkzr8pGfF0Ics=
`;

module.exports[n`DFA minimization >> 1284: /(^\[)[$\w\xA0-\uFFFF\.]+/ `] = lit`
Jn5AOpc1JyS7zt5d0pEqDHJiTl3UG2QROcHROtGlWsI=
`;

module.exports[n`DFA minimization >> 1285: /(=)[\s\S]*(?=\]$)/ `] = lit`
4pJtmh9DompD/gcl6dKgtSV+/4qTvlZ3d1injuMY5n8=
`;

module.exports[n`DFA minimization >> 1286: /=>|\.\.\.|[&|?:*]/ `] = lit`
TmUTr2TY53Ing1c1A/t7gV1bZsNcT7Bkmqo3n1I6CQw=
`;

module.exports[n`DFA minimization >> 1287: /[.,;=<>{}()[\]]/ `] = lit`
TX5ry5GJqEOmS+llWpPstgL82rGoMKw7Vnyw2a6Lzso=
`;

module.exports[n`DFA minimization >> 1288: /^(\s*(?:\*\s*)?).+$/m `] = lit`
Jczs6H5OHrLft6rtq/L7VmAXmpsGiXGq0ZfG1L3JDv0=
`;

module.exports[n`DFA minimization >> 1289: /(\.\s*)#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bf... `] = lit`
EEv2TMdwlTZNQCMSDRnUZI/8LhFiCoiA7Oo9zV+UCnM=
`;

module.exports[n`DFA minimization >> 1290: /(\.\s*)#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call... `] = lit`
EWrFQO3HOqMfJi8+xPlpY7DfNcvI25NMbDKApHNBkq0=
`;

module.exports[n`DFA minimization >> 1291: /(\.\s*)#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/ `] = lit`
A+WMEIFdsJVnsb6qToyf3vlQ0LGonwVru7Zv0KmdkvM=
`;

module.exports[n`DFA minimization >> 1292: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/ `] = lit`
tEbPi2ipjdVe5dc3UarK5kt2F2wbkXpVO9RLWT1kwy0=
`;

module.exports[n`DFA minimization >> 1293: /\b(?:document|location|navigator|performance|(?:local|session)Storage|window)\b... `] = lit`
036tEER3ShCC0X/cJdVexvBlTAivpkTB1fr1jYZ0aM8=
`;

module.exports[n`DFA minimization >> 1294: /\bconsole(?=\s*\.)/ `] = lit`
9J43ujJN+QtXk0fuANwVHykvHKWRznCBtkk15MBITKk=
`;

module.exports[n`DFA minimization >> 1295: /^[A-Z][\s\S]*/ `] = lit`
j9Hr8fbLzSwIfWphg8/yJCs5O4ecA9E3/Cf6XOD/6rI=
`;

module.exports[n`DFA minimization >> 1296: /\b(?:(?:(?:Uint|Int)(?:8|16|32)|Uint8Clamped|Float(?:32|64))?Array|ArrayBuffer|... `] = lit`
do8+JcwfHECe99wkz1kYZFRRfelMAIz98T2CbN9AVJo=
`;

module.exports[n`DFA minimization >> 1297: /\b(?:[A-Z]\w*)Error\b/ `] = lit`
FxNcphl5TgqXRd406PZYFoNr0SMJx0JcS7h67b6RyTk=
`;

module.exports[n`DFA minimization >> 1298: /\b(?:as|default|export|from|import)\b/ `] = lit`
zC7w51SFzTx+WmqWz4kpGbo6qzgA3pCCVytnCj/RfgM=
`;

module.exports[n`DFA minimization >> 1299: /\bundefined\b/ `] = lit`
eeblowWuzxSV6T11M/sl4I4HfdYmOzU1qIu5m43o8oU=
`;

module.exports[n`DFA minimization >> 1300: /\b(?:any|Array|boolean|break|case|catch|class|const|constructor|continue|debugg... `] = lit`
8aCAExevTx7QoVyoodsGQeOhfIFoN5x2yVMQXXxbg1s=
`;

module.exports[n`DFA minimization >> 1301: /@+\w+/ `] = lit`
0L9yxLzW19Hm9j+wvViRFhsS5eaaHtGGltDkntjzOKs=
`;

module.exports[n`DFA minimization >> 1302: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+\.?\d*|\B\.\d+)(?:[eE][+-]... `] = lit`
hgH2IZjYIHoToOSVwTBJ/yaMIYWNgIir6yAF0tajKRU=
`;

module.exports[n`DFA minimization >> 1303: /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/ `] = lit`
OUP0TJ7X6gP3K9XGjp4HqS2yX54t5/vhPcyTYXsfsro=
`;

module.exports[n`DFA minimization >> 1304: /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1(?=\s*:)/ `] = lit`
CgoUl2rJQB6FepL78okPumpsUFajR504FZ/DCU901TE=
`;

module.exports[n`DFA minimization >> 1305: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*:)/ `] = lit`
MVwTQZAnYk9Kp9UkUIzbiTfd0EIuAl8AaE083WjJwBQ=
`;

module.exports[n`DFA minimization >> 1306: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/ `] = lit`
/isXkmOYxoLWiaLCvKJDiBfuhTWAkaCQZ1len9BDhc4=
`;

module.exports[n`DFA minimization >> 1307: /[{}[\]();,.]/ `] = lit`
cL2HxM2p/FcOqSmfqb0J4OVMJEPHlnV3HJO5n9O96gg=
`;

module.exports[n`DFA minimization >> 1308: /^\S.*/m `] = lit`
OX3K41p3Pyj269A9pgyoIvUSSWlRPyJq4FO47j+CyB8=
`;

module.exports[n`DFA minimization >> 1309: /^[ \t]+at[ \t]+.*/m `] = lit`
a8ArX73Hi2p417cxTD9A7aE2FuAh/ICyJJZZvl4Wnpg=
`;

module.exports[n`DFA minimization >> 1310: /\b(?:at|new)\b/ `] = lit`
pYRjH7HAhEMS22Ik2ngVpBClwBl7zWSw5PxRdHWe55k=
`;

module.exports[n`DFA minimization >> 1311: /[ \t]+at[ \t]+(?:node\.js|\<unknown\>|.*(?:node_modules|\(\<anonymous\>\)|\(\<u... `] = lit`
ImBO0NGiOK7fsOoxftAIHusdxKlJMmZ4jRT7sqexZJA=
`;

module.exports[n`DFA minimization >> 1312: /(\bat\s+|\()(?:[a-zA-Z]:)?[^():]+(?=:)/ `] = lit`
9IHqPEnhSw2TNho/OxQuYHimgBGT3yicePKQ0GR07eU=
`;

module.exports[n`DFA minimization >> 1313: /(at\s+(?:new\s+)?)[_$a-zA-Z\xA0-\uFFFF<][.$\w\xA0-\uFFFF<>]*/ `] = lit`
fIPVPlNijamnIVjH1gOTYicCLXjVRjYwM3hAT/Zu2Vw=
`;

module.exports[n`DFA minimization >> 1314: /\[(?:as\s+)?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\]/ `] = lit`
cxIzHP6FRVHO11eMk0Q7w5CUGommYaik8VYsSEPTtnQ=
`;

module.exports[n`DFA minimization >> 1315: /:[0-9]+(?::[0-9]+)?\b/ `] = lit`
ZK4N3tTZLLd7F//eBD8aK4fNzA3osGcpMYMThXYxvkg=
`;

module.exports[n`DFA minimization >> 1316: /((?:\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:gl... `] = lit`
PgYiDYyE/3jkPbVAWp3j/xK8VCmiwksIfajjrPgYgwY=
`;

module.exports[n`DFA minimization >> 1317: /((?:\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=)\s*)\`(?:\\[\s\S]|\\\${(?:[^{}]|{(?:[^{... `] = lit`
Od6J1Lb7VH1ShuqFIFJx2W13pYh3nK1PO++yWWnaRiM=
`;

module.exports[n`DFA minimization >> 1318: /((?:\bsvg)\s*)\`(?:\\[\s\S]|\\\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\\\${)[^\\\\\`])*\`... `] = lit`
RyeJu0DCBIv1wE5TCeQsUjQcdgJQahBbGpdbJckjynU=
`;

module.exports[n`DFA minimization >> 1319: /((?:\b(?:md|markdown))\s*)\`(?:\\[\s\S]|\\\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\... `] = lit`
da/552VgnPHnF4cTFltfRBMssLTa8h/e6fo1UtFdksE=
`;

module.exports[n`DFA minimization >> 1320: /((?:\b(?:gql|graphql(?:\s*\.\s*experimental)?))\s*)\`(?:\\[\s\S]|\\\${(?:[^{}]|{(?... `] = lit`
l4AOzwfSgoA/+EaAo8ZNKDrnq5rdKVThIJIGQzZieAc=
`;

module.exports[n`DFA minimization >> 1321: /\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|els... `] = lit`
d611Q0T3tQ/hyllZ8/x3vgAGwLOwx+gnj9FVFPO0Oyw=
`;

module.exports[n`DFA minimization >> 1322: /(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+(?:_[\da-f]+)*\.?(?:\d+(?:_\d+)*)?|\... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1323: /&&|\|\||[-+*^%÷⊻&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:|])?|>(?:=|>>?=?)?|==... `] = lit`
IYLGCJ/aKDqn440UQ31FIvlS7zANWu5RG+KXLYFpJCU=
`;

module.exports[n`DFA minimization >> 1324: /::?|[{}[\]();,.?]/ `] = lit`
thRQ65pK/MEmd9jU2Hx9QI8A8z9viXBKBOh526tVoXE=
`;

module.exports[n`DFA minimization >> 1325: /\b(?:(?:NaN|Inf)(?:16|32|64)?|im|pi|e|catalan|eulergamma|golden)\b|[πℯγφ]/ `] = lit`
QIv5fh7U2J01d1004sVWRDzgUYEYs0H4tFWev9B2/HI=
`;

module.exports[n`DFA minimization >> 1326: /(^|[^\\])(?:#=(?:[^#=]|=(?!#)|#(?!=)|#=(?:[^#=]|=(?!#)|#(?!=))*=#)*=#|#.*)/ `] = lit`
CNCQDVIDx3el0QtTiWzRFSQj8weiFtxx97y+yBziE0w=
`;

module.exports[n`DFA minimization >> 1327: /r"(?:\\.|[^"\\\r\n])*"[imsx]{0,4}/ `] = lit`
/oy5Gj0dUxW6DFrVEmHZqMUtXEHx3xVcHj/ftfPHAII=
`;

module.exports[n`DFA minimization >> 1328: /"""[\s\S]+?"""|\w*"(?:\\.|[^"\\\r\n])*"|(^|[^\w'])'(?:\\[^\r\n][^'\r\n]*|[^\\\r... `] = lit`
HDI5dLofjmfbqnhIvYmpVjG1huWeafgguqMxAEHHUY4=
`;

module.exports[n`DFA minimization >> 1329: /\bc\s.*/i `] = lit`
Jm2IJK35pwGDe0SDG0RmWyhojA3fGWtfUeX22aeoD/I=
`;

module.exports[n`DFA minimization >> 1330: /\[\s*(?:(?:CTRL|SHIFT|ALT|LCTRL|RCTRL|LALT|RALT|CAPS|NCAPS)\s+)*(?:[TKU]_[\w?]+... `] = lit`
UpjEMszLthSusCTItYQ7iL7R1YnMN7q6A/90I/Z0ugI=
`;

module.exports[n`DFA minimization >> 1331: /("|').*?\1/ `] = lit`
dibihUd8PEklcwa5an6OxIjliH+vFT7mMaCxP8VyLrQ=
`;

module.exports[n`DFA minimization >> 1332: /\b(?:any|baselayout|beep|call|context|deadkey|dk|if|index|layer|notany|nul|outs... `] = lit`
+eA5EGNyEvpIxiLVXUuQRYRMf+nkVT83pcYx/eZK4fg=
`;

module.exports[n`DFA minimization >> 1333: /\b(?:ansi|begin|unicode|group|using keys|match|nomatch)\b/i `] = lit`
EsQmrFrh4mj65NRFoW8jQ+cZUOZyZqWN/ZJb/PzGYYU=
`;

module.exports[n`DFA minimization >> 1334: /\b(?:U\+[\dA-F]+|d\d+|x[\da-f]+|\d+)\b/i `] = lit`
ociqsBXnzWbZ5FNHDy0ap+9Wej0Mj9bGdEnm0DgxxTc=
`;

module.exports[n`DFA minimization >> 1335: /[+>\\,()]/ `] = lit`
VFkr7toxbQSc4KEtXYa0ePQUnapF3b88ht2w4s4HivM=
`;

module.exports[n`DFA minimization >> 1336: /\$(?:keyman|kmfl|weaver|keymanweb|keymanonly):/i `] = lit`
srjfb6ZkbxXbB9D+05MQE/P1RvFwSqkuwwrGdcwph+U=
`;

module.exports[n`DFA minimization >> 1337: /&(?:baselayout|bitmap|capsononly|capsalwaysoff|shiftfreescaps|copyright|ethnolo... `] = lit`
uYaoqv83+cRIpFpJlrMHnDXgUJi+0QLrC78A+PBne0k=
`;

module.exports[n`DFA minimization >> 1338: /\b(?:bitmap|bitmaps|caps on only|caps always off|shift frees caps|copyright|hot... `] = lit`
mCjdmmWSHN5K76fREp30dVrhfhYmQ0YTQCojq1IrTYs=
`;

module.exports[n`DFA minimization >> 1339: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\... `] = lit`
5BnmmRfr9Ak52XizdKx+RTjM1UOgidtimxXQ1uDCbuU=
`;

module.exports[n`DFA minimization >> 1340: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|o... `] = lit`
nYmPg+MSIPRSd8oi60J7sHcH/mSMHL4XimPUWlrn3Wg=
`;

module.exports[n`DFA minimization >> 1341: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/ `] = lit`
XiqcxFunvsYaiPu6Z+EynJHUIN7hPhKZHJW7oor0LLk=
`;

module.exports[n`DFA minimization >> 1342: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const... `] = lit`
ZdLb1trLlECX/B0DuRU8B4AP95A5UnApS3yJcN2zbBk=
`;

module.exports[n`DFA minimization >> 1343: /\w+@|@\w+/ `] = lit`
JCCZ4flCF8uRCTCViZefu49W1icuBnBnQ8DZFuJmkuU=
`;

module.exports[n`DFA minimization >> 1344: /(\.)\w+(?=\s*\{)/ `] = lit`
1+c+TFMcKQ5pAz0Vn5XRGZP+1GaQgt1FHqnzboJ+X4c=
`;

module.exports[n`DFA minimization >> 1345: /%.*/m `] = lit`
N51T6qjEvqpKWIRrooURbO+MyxbDBIeldCBQVywmXws=
`;

module.exports[n`DFA minimization >> 1346: /[[\]{}&]/ `] = lit`
KJru+PRm7HrmftaQvmArqSHvIC+mX350Df8a51f+0u4=
`;

module.exports[n`DFA minimization >> 1347: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1348: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+... `] = lit`
2Q4Asbot6nGOUNGsrVFNnGUZ+iixVHWEvi78onBixz8=
`;

module.exports[n`DFA minimization >> 1349: /(\\\\url\{)[^}]+(?=\})/ `] = lit`
oXVoB+AmMSpUmgk6omEVyjDOeCCrZ/+V+FOP6B9pTE0=
`;

module.exports[n`DFA minimization >> 1350: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subpar... `] = lit`
WT4JIpNJ+9H7fJz+GPcrH/CfoERHgKGsO7TUrw+UOUw=
`;

module.exports[n`DFA minimization >> 1351: /\\(?:[^a-z()[\]]|[a-z*]+)/i `] = lit`
2h0RtEsd9hVJUzuFEPuVMtrBXQWntoJDZJ60rh+pMWA=
`;

module.exports[n`DFA minimization >> 1352: /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\... `] = lit`
rkI1ifPKBREWXsEPZ4ccE10B5JAsXXMBGFbl1iXu8+4=
`;

module.exports[n`DFA minimization >> 1353: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1354: /^\{\*[\s\S]*/ `] = lit`
E4QhnqKJhFTXO32JePEsJGyWh01L9ViXr05G49/XlLY=
`;

module.exports[n`DFA minimization >> 1355: /^\{(?:[=_]|\/?(?!\d|\w+\()\w+|)/ `] = lit`
PCgNOWeq9amJT0NdiYcV955PKvF6KUcYdXQRymDQE98=
`;

module.exports[n`DFA minimization >> 1356: /\}$/ `] = lit`
NwnMtGEq7SbXmOD/yKIKF6cVRWP02p/ECTIM5e6zuOM=
`;

module.exports[n`DFA minimization >> 1357: /\S(?:[\s\S]*\S)?/ `] = lit`
r7fpOEgIGQ3P61cZwH9UN1tF50DNchzVUb2XQos5Ft0=
`;

module.exports[n`DFA minimization >> 1358: /^\{\/?/ `] = lit`
RZvAOWtU+/ZWoeDYSjkKPIepO3SYjUt0MIcGq6Xuogw=
`;

module.exports[n`DFA minimization >> 1359: /%(?:(?!\{).*|\{[\s\S]*?%\})/ `] = lit`
Vrxwzh+drpbWeIUqUuCuytYRt46sElYaVT0yVebCX7s=
`;

module.exports[n`DFA minimization >> 1360: /[=|]|<<|>>/ `] = lit`
JTEaKQwpt5JyJyM+OLezcBpa2L+xrYjjFAweFfsWDzs=
`;

module.exports[n`DFA minimization >> 1361: /\b\d+(?:\/\d+)?\b/ `] = lit`
MfEW2bQIDx8VnVYpYDCqAQZghw+BDr7LdBbn7nU9+zs=
`;

module.exports[n`DFA minimization >> 1362: /'[^()#'\s]+/ `] = lit`
bwOlyj1tjvTXL7vg2SGRjn4TyMgLnT3mncU5LJoa9cU=
`;

module.exports[n`DFA minimization >> 1363: /#\\(?:[ux][a-fA-F\d]+|[-a-zA-Z]+|\S)/ `] = lit`
YNc1ajISraQG5YKVW5F3hJvNMIfPlXjeQE8yj2BCN4w=
`;

module.exports[n`DFA minimization >> 1364: /(\()(?:define(?:-library|-macro|-syntax|-values)?|defmacro|(?:case-)?lambda|let... `] = lit`
lglk7ebwjvwGqV0W6Q8A6kJc+btsKurI9lcJ2l0J7V0=
`;

module.exports[n`DFA minimization >> 1365: /(\()(?:(?:cons|car|cdr|list|call-with-current-continuation|call\/cc|append|abs|... `] = lit`
1jyHqFNE0+cQRnEarg16muN9IITHXseVH3CQT9bNzp8=
`;

module.exports[n`DFA minimization >> 1366: /(^|[\s()])(?:(?:#d(?:#[ei])?|#[ei](?:#d)?)?[+-]?(?:(?:\d*\.?\d+(?:[eE][+-]?\d+)... `] = lit`
bY59DwxUJfAgn2qAikoZqArHCMB0igdTAhym/Katysg=
`;

module.exports[n`DFA minimization >> 1367: /(^|[\s()])#[ft](?=[()\s]|$)/ `] = lit`
ymutriJRCfWRULwmE4bZFPj8CYPRNTBxEBGdgLHcdv8=
`;

module.exports[n`DFA minimization >> 1368: /(\()(?:[-+*%\/]|[<>]=?|=>?)(?=[()\s]|$)/ `] = lit`
CdfTRniRqfX+yuV6zOw1SUTl+oFZL5veSTT7tGx5C0o=
`;

module.exports[n`DFA minimization >> 1369: /(\()[^()'\s]+(?=[()\s]|$)/ `] = lit`
bS7lq8m/lyq2U4F+5J9E0iXPMauPwu5F3M0rqlJ0Duc=
`;

module.exports[n`DFA minimization >> 1371: /(\\new\s+)[\w-]+/ `] = lit`
83eeQdQ4ah/dW0Eofyngt5yU5KB32JRxPmjaFy2GsJ4=
`;

module.exports[n`DFA minimization >> 1372: /\\[a-z][-\w]*/i `] = lit`
OjOI4B4kTRKtBUaq7kBDrWdaj7VC6LSA7OuXN12dJKI=
`;

module.exports[n`DFA minimization >> 1373: /(^|[a-z\d])(?:'+|,+|[_^]?-[_^]?(?:[-+^!>._]|(?=\d))|[_^]\.?|[.!])|[{}()[\]<>^~]... `] = lit`
/vbApkOJfoVkBrmz95Ckw1E2bpLnUO1u0jw8I6czzdc=
`;

module.exports[n`DFA minimization >> 1374: /(\(lambda\s+)[^()'\s]+/ `] = lit`
9GAYbFpXbJ5VbGFGjdkmqEQrP75+RWEhKf6O37DBEq4=
`;

module.exports[n`DFA minimization >> 1375: /(\(lambda\s+\()[^()']+/ `] = lit`
qrkd3s6t8y1GrBwzmjWVRrwmIlUN/5x9dzm3dHUM/Dw=
`;

module.exports[n`DFA minimization >> 1376: /#/ `] = lit`
iTSkK/WN4wjCrvJicCGzg2A5zUfYwUiirQ5qvIdS2Ws=
`;

module.exports[n`DFA minimization >> 1377: /^\\/ `] = lit`
puLSgWdy/KnH7ew8SQuX3rvKJhZD9Mgx9qCyqaJPZH8=
`;

module.exports[n`DFA minimization >> 1378: /^(#)[\s\S]+$/ `] = lit`
aaLUd7GyQef+u+w70m5ne3JeeY753OjbCsiGcDYi8KE=
`;

module.exports[n`DFA minimization >> 1379: /#\{[\s\S]*?#\}/ `] = lit`
FfNNWWPHMhovbkLoZ/Mz15KFu4vv0WbYYN1xd3yFSdY=
`;

module.exports[n`DFA minimization >> 1380: /^#\{|#\}$/ `] = lit`
OvJHJJ8vqxU02ZpoWR1G8BHOA/KVlJq+G4vejRDXn/U=
`;

module.exports[n`DFA minimization >> 1381: /\b(?:comment|endcomment|if|elsif|else|endif|unless|endunless|for|endfor|case|en... `] = lit`
AonOshnFUHZfbUghkP0lxHTstLl36W6JetfZ+PjGwRo=
`;

module.exports[n`DFA minimization >> 1382: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[d... `] = lit`
Td3zsCttNeeLsUMJNdREvFEtKejTxZSoyPXoGvR61H8=
`;

module.exports[n`DFA minimization >> 1383: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^... `] = lit`
hmGESO0rLhPX9C7a1PxaxZaoeJa+f4jdnMIoFYn6f80=
`;

module.exports[n`DFA minimization >> 1384: /(^|[\s;|&])(?:append|prepend|capitalize|cycle|cols|increment|decrement|abs|at_l... `] = lit`
XuEcTOcL/UPhTnv9BYjW2vYw74/xKni1fYVI4KycUG4=
`;

module.exports[n`DFA minimization >> 1385: /;;;.*/ `] = lit`
RCvRIycbWi79u0SuJ7Ue4dCDB4Rq8WaYOWI4Uz6v2mE=
`;

module.exports[n`DFA minimization >> 1386: /#?'[-+*\/_~!@$%^=<>{}\w]+/ `] = lit`
vdInqlCuV/dkZKUscqi4i+bobCSi7lOqQ8h8JNDnHk4=
`;

module.exports[n`DFA minimization >> 1387: /:[-+*\/_~!@$%^=<>{}\w]+/ `] = lit`
FeQQ/Yc/vE6eKUlcFoU8jcCF0QsM2y5vW8MXKCFqidY=
`;

module.exports[n`DFA minimization >> 1388: /,@?[-+*\/_~!@$%^=<>{}\w]+/ `] = lit`
5xwssbYgmdJx+yFcyWmSXmP0h1obXatN5F43JjV2SpA=
`;

module.exports[n`DFA minimization >> 1389: /(\()declare(?=[\s\)])/ `] = lit`
o9jmjiPT+JMEecBffY473OHUgOqmCjuk+pr8BC+WA5Y=
`;

module.exports[n`DFA minimization >> 1390: /(\()interactive(?=[\s\)])/ `] = lit`
rQ6fnVP9BbDMqufBdsdJ0elT/cdryh2FItjN8FvUxNA=
`;

module.exports[n`DFA minimization >> 1391: /([\s([])(?:t|nil)(?=[\s)])/ `] = lit`
vlreIkTQ4zyiqi0ZdM/gFCNE/eYxge9gMao5HDBoEgQ=
`;

module.exports[n`DFA minimization >> 1392: /([\s([])[-+]?\d+(?:\.\d*)?(?=[\s)])/ `] = lit`
oTIJ2mnWzZ7+FD3ckbiDADNjfanGb0o1IrsoCclq5Ng=
`;

module.exports[n`DFA minimization >> 1393: /(\()def(?:var|const|custom|group)\s+[-+*\/_~!@$%^=<>{}\w]+/ `] = lit`
QDC5R9psqZsEKMxRTwz1OuW7FBxrqUKPAuU7SMYTzhs=
`;

module.exports[n`DFA minimization >> 1394: /(\()(?:cl-)?(?:defun\*?|defmacro)\s+[-+*\/_~!@$%^=<>{}\w]+\s+\([\s\S]*?\)/ `] = lit`
MUZy04AqdIP5LYqkRCCd633G9INPttm36z9dUQi5Us8=
`;

module.exports[n`DFA minimization >> 1395: /(\()lambda\s+\((?:&?[-+*\/_~!@$%^=<>{}\w]+\s*)*\)/ `] = lit`
WM5CUfg2sU7Hi+UJ4fC4dWE1XbKoH4O39uH9aj8O6TM=
`;

module.exports[n`DFA minimization >> 1396: /(\()[-+*\/_~!@$%^=<>{}\w]+/ `] = lit`
yZtSQVbBOEpeoilWpXkannWUTqWngO3FsXhC+TSj5gQ=
`;

module.exports[n`DFA minimization >> 1397: /(?:['\`,]?\(|[)\[\]])/ `] = lit`
uWy2FQEh+aKpaSzxLca5pBHvHUaC6ODpVYxYbdFDtjY=
`;

module.exports[n`DFA minimization >> 1398: /[-A-Z]+(?=[.,\s])/ `] = lit`
QqW5WokwedbRwbHfJsmzXxyIYkurSY6AArzPUueezBc=
`;

module.exports[n`DFA minimization >> 1399: /\`[-+*\/_~!@$%^=<>{}\w]+'/ `] = lit`
3JDTBLUXPZE1WN+aFr/1x9kTA0MeVbPiWfM7C9TrGsI=
`;

module.exports[n`DFA minimization >> 1400: /(\()(?:(?:lexical-)?let\*?|(?:cl-)?letf|if|when|while|unless|cons|cl-loop|and|o... `] = lit`
EDte1E2+9bMlZcTxK/g8DjoyekIc9fuHmC7kyBa8Icw=
`;

module.exports[n`DFA minimization >> 1401: /(\()(?:for|do|collect|return|finally|append|concat|in|by)(?=\s)/ `] = lit`
f9B1nOamY6kELAJrX+EdJVSKg0QjoU7n/Io+/Uy6nPg=
`;

module.exports[n`DFA minimization >> 1402: /^def[a-z]+/ `] = lit`
RjqSUMiFy6635NAU27NUorJcrWE5rk/UdDsE1DtHqac=
`;

module.exports[n`DFA minimization >> 1403: /[-+*\/_~!@$%^=<>{}\w]+/ `] = lit`
uwVrYJUtOJinDPPLH58Zj+0ZXScQycLElWs2YUeeXjk=
`;

module.exports[n`DFA minimization >> 1404: /^(?:cl-)?def\S+/ `] = lit`
s6/Yamf9r8U7pQHjqrm6VxFquTo6L9bn07QyboD4E4o=
`;

module.exports[n`DFA minimization >> 1405: /^lambda/ `] = lit`
HwAeno4u18S1mVMSAmVOzEGgrXbrEK428GN7AfeHZiA=
`;

module.exports[n`DFA minimization >> 1406: /(\s)\.(?=\s)/ `] = lit`
byRL7aoxr2Y6QQFFdw1VpkQCwtRq6YTIcvGsDaN3f1k=
`;

module.exports[n`DFA minimization >> 1407: /(\()[\s\S]*(?=\))/ `] = lit`
2IvA5Ro0+Gp04wMiEX0z6l9MH/YIlOY9U4IneLrPrXg=
`;

module.exports[n`DFA minimization >> 1408: /(^\s)[-+*\/_~!@$%^=<>{}\w]+/ `] = lit`
aZlDHIa1WdTNu4nM2hJzhiDV3mlLSfbs0wh7v8whRSU=
`;

module.exports[n`DFA minimization >> 1409: /&(?:rest|body)\s+\S+(?:\s+\S+)*/ `] = lit`
jhXWzat/axL4CV34bDHAAa/efM96IXgkY0ePzzqzufs=
`;

module.exports[n`DFA minimization >> 1410: /&(?:optional|aux)\s+\S+(?:\s+\S+)*/ `] = lit`
+ytg/Xr9EtazfNNNrRrVFYlrpyB1iZlsewUGXgOfHGo=
`;

module.exports[n`DFA minimization >> 1411: /&key\s+\S+(?:\s+\S+)*(?:\s+&allow-other-keys)?/ `] = lit`
CH5wZi4sLl45zpRmd0aKTt8p1sbPJwueI5yrTfuDOss=
`;

module.exports[n`DFA minimization >> 1412: /&[-+*\/_~!@$%^=<>{}\w]+/ `] = lit`
4QN7JEeY+Mg0AjnhGyLkyAijaxCiRFPosYYKur0AvHM=
`;

module.exports[n`DFA minimization >> 1413: /(\()[-+*\/_~!@$%^=<>{}\w]+\s+\S[\s\S]*(?=\))/ `] = lit`
opfwG/oGde0ds/XnRoxJ8DZ8GY4iPydRY9RjO7pWTNM=
`;

module.exports[n`DFA minimization >> 1414: /\b(?:\d+~[\da-z]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[a-z]\w*)?)/i `] = lit`
GvnvdklNX2Z+gTuODlQgfuK7E/RbwyyLv5l4gINrpsk=
`;

module.exports[n`DFA minimization >> 1415: /[a-z_](?:-?[a-z]|[\d_])*/i `] = lit`
27HA9uQ76B3PAQBCfjS/KJndXRZ/OeNkPEsd3BtZW4c=
`;

module.exports[n`DFA minimization >> 1416: /[(){}\[\]|.,:;\`]/ `] = lit`
ypvqOu93PWPWclh6E8qGyUi8siD/NhrasU6Rf4Ttdn8=
`;

module.exports[n`DFA minimization >> 1417: /(^|[^"])("""|")(?:\\[\s\S]|(?!\2)[^\\])*\2(?!")/ `] = lit`
LOFD+6s2eCdV/QJmwoYS+NU6qunJh2QP6lFRbnhKVGo=
`;

module.exports[n`DFA minimization >> 1418: /\\[^\s,;\])}]+/ `] = lit`
c+WfkT+IW4y/dHCicg5xrhwMNfTcK+EgTtxXUyue52s=
`;

module.exports[n`DFA minimization >> 1419: /(^|(?!-).)\b(?:break|case|catch|class|const|continue|default|do|else|extends|fa... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1420: /(^|[^-])\b(?:(?:delete|require|typeof)!|(?:and|by|delete|export|from|import(?: ... `] = lit`
FDehOxQypbG1NSKALtU9iGdQMq+UTh3e7sMN4vDIacU=
`;

module.exports[n`DFA minimization >> 1421: /(^|[^-])\b(?:false|no|off|on|true|yes)(?!-)\b/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1422: /(^|(?!\.&\.)[^&])&(?!&)\d*/m `] = lit`
s6sGwA3HcmbO0QATu/jLqRr0tLEKDf6e7MGSluoWv1Q=
`;

module.exports[n`DFA minimization >> 1423: /\.(?:[=~]|\.\.?)|\.(?:[&|^]|<<|>>>?)\.|:(?:=|:=?)|&&|\|[|>]|<(?:<<?<?|--?!?|~~?... `] = lit`
LrCCd4y8TIgnidy9KHhaPNTWSanc5facdFf4h0unMVE=
`;

module.exports[n`DFA minimization >> 1424: /(^|[^\\])\/\*[\s\S]*?\*\// `] = lit`
T9n8faXydDsZ7hooTAvPDvKSVmp2Ie5MlhgWHyBUdzU=
`;

module.exports[n`DFA minimization >> 1425: /('''|')(?:\\[\s\S]|(?!\1)[^\\])*\1/ `] = lit`
CcTIMa57Si9hA7msQJcXVw1YyX6NeJZndVzSy/QOtXw=
`;

module.exports[n`DFA minimization >> 1426: /<\[[\s\S]*?\]>/ `] = lit`
x/hDZpw57ST9LP4btBWQlrKkDcl/xhGVBkKY2vUxea4=
`;

module.exports[n`DFA minimization >> 1427: /\/\/(?:\[[^\r\n\]]*\]|\\.|(?!\/\/)[^\\\[])+\/\/[gimyu]{0,5}/ `] = lit`
3l3Ui6JCVvgxsPccVhowM+AZqSXsdYwDqR2ldXf0LL8=
`;

module.exports[n`DFA minimization >> 1428: /\/(?:\[[^\r\n\]]*\]|\\.|[^\/\\\r\n\[])+\/[gimyu]{0,5}/ `] = lit`
yDmOk1yA11MtdGoK4+2OAqftRH4rmBiydeIOXFYls4s=
`;

module.exports[n`DFA minimization >> 1429: /( )\.(?= )/ `] = lit`
LxkKaQHwgkMkbiBvAK929MNPs9Sknom+ghphBtj7YBo=
`;

module.exports[n`DFA minimization >> 1430: /(^|[^\\])#[a-z_](?:-?[a-z]|[\d_])*/m `] = lit`
ypJmElAhoukQVs6eGjgnmLlENCHwQB+EkcbO119vjo0=
`;

module.exports[n`DFA minimization >> 1431: /(^|[^\\])#\{[^}]+\}/m `] = lit`
EQyk8LXe/MrOV9HZLG1OiHUl9DTWEgyOkZSHYB5lkjA=
`;

module.exports[n`DFA minimization >> 1432: /[%@!#](?:(?!\d)(?:[-$.\w]|\\[a-f\d]{2})+|\d+)/i `] = lit`
+HJOOcmZMtjnMSMY9aC3WoTlrE1EccT8OE0/vjwZsNc=
`;

module.exports[n`DFA minimization >> 1433: /(?!\d)(?:[-$.\w]|\\[a-f\d]{2})+:/i `] = lit`
qXbZqLHK/KzkpxyQUll8r8BuD4V64Ymv70OlfSvAASA=
`;

module.exports[n`DFA minimization >> 1434: /\b[a-z_][a-z_0-9]*\b/ `] = lit`
N+1zyb5vMITCWbDDsM5VVvBBr8krpujO6+l5I+qhcFU=
`;

module.exports[n`DFA minimization >> 1435: /[+-]?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[\dA-Fa-f]+\b|\b0xK[\dA-Fa-f]{20}\b... `] = lit`
jhwaqez2oa6KH2IjpGKgT9WEqGs26XGCfY2DjQeOSnk=
`;

module.exports[n`DFA minimization >> 1436: /[{}[\];(),.!*=<>]/ `] = lit`
81K/7b0ZiYB2jeCxr88aIy1v7WZFj2QZtF1+p/mLgTY=
`;

module.exports[n`DFA minimization >> 1437: /\b(?:double|float|fp128|half|i[1-9]\d*|label|metadata|ppc_fp128|token|void|x86_... `] = lit`
UOY4guaDuy4Q4/4U/DBiZ5wqsDu9a6KTLtzwzf7zLnc=
`;

module.exports[n`DFA minimization >> 1438: /(?:\B-)?(?:\b\d+\.?\d*|\B\.\d+)/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1439: /\.{3}|…|,|!/ `] = lit`
Yf9l+o9ZXTTiNjbmI89/PPLxpoOpY74QEieUt+REaUA=
`;

module.exports[n`DFA minimization >> 1440: /\bOBTW\s+[\s\S]*?\s+TLDR\b/ `] = lit`
VcYgGZjQH/a62/4xbZggsXBdiJrYNZ0+KKdZw6TpCbY=
`;

module.exports[n`DFA minimization >> 1441: /\bBTW.+/ `] = lit`
esR+Psl4oMcYbfiBl8m99KshC7xwg21IiqDmixXYamc=
`;

module.exports[n`DFA minimization >> 1442: /"(?::.|[^":])*"/ `] = lit`
CkmzjTjJcYZJ+D1Upn3VxJV1Cy9W5TVWurWUtEgmkYk=
`;

module.exports[n`DFA minimization >> 1443: /(^|\s)(?:A )?(?:YARN|NUMBR|NUMBAR|TROOF|BUKKIT|NOOB)(?=\s|,|$)/ `] = lit`
vPcsmCOqKiMEXHzDUYv8XhE9JlEywdxJGKAKr6lP+C4=
`;

module.exports[n`DFA minimization >> 1444: /((?:^|\s)(?:IM IN YR|IM OUTTA YR) )[a-zA-Z]\w*/ `] = lit`
L+Dr9Bst2ISo7ayjF4GaR4hiatCAa8uRhNOVxmwgigc=
`;

module.exports[n`DFA minimization >> 1445: /((?:^|\s)(?:I IZ|HOW IZ I|IZ) )[a-zA-Z]\w*/ `] = lit`
0o0fSoMkB+jPEYm4uWx9R2jEKqYcG+deTlVsXpe3DYo=
`;

module.exports[n`DFA minimization >> 1446: /'Z(?=\s|,|$)/ `] = lit`
3/CpZxtvNtZhMp+z2BEHD/th0VLBDzDhpNFPoYaiNf4=
`;

module.exports[n`DFA minimization >> 1447: /(^|\s)(?:WIN|FAIL)(?=\s|,|$)/ `] = lit`
2WdOZxmAaI5wn0/iYkZ2Wrt38/IDlQtDt778iReVgo8=
`;

module.exports[n`DFA minimization >> 1448: /(^|\s)IT(?=\s|,|$)/ `] = lit`
S0s2bTrS6it2fnfeubHZSO0izpzRhoXSfBh28ZvK+I8=
`;

module.exports[n`DFA minimization >> 1449: /(^|\s)(?:NOT|BOTH SAEM|DIFFRINT|(?:SUM|DIFF|PRODUKT|QUOSHUNT|MOD|BIGGR|SMALLR|B... `] = lit`
DBIar33Sx64SgdlIGULVTEGkaSGV3Uf5XI/K6WjXTpw=
`;

module.exports[n`DFA minimization >> 1450: /:\{[^}]+\}/ `] = lit`
DDatnOuddR/EAkAj7V+kcXmaM1WpSNa9PfWCTnlETgg=
`;

module.exports[n`DFA minimization >> 1451: /A(?=\s)/ `] = lit`
2VH4aMQPkm/59D8UkXrrOTnuRjxIvNmM9S2zUTeQePc=
`;

module.exports[n`DFA minimization >> 1452: /(^|\s)(?:O HAI IM|KTHX|HAI|KTHXBYE|I HAS A|ITZ(?: A)?|R|AN|MKAY|SMOOSH|MAEK|IS ... `] = lit`
cPWXs3EvBqmKkm7nF/YMQOeTv3R7veH3qI7CVjMU0M0=
`;

module.exports[n`DFA minimization >> 1453: /:\([a-f\d]+\)/i `] = lit`
aWM9JF5l91tllM5Bbm71pBE9CZDpn/RyBrBoPnRq5zI=
`;

module.exports[n`DFA minimization >> 1454: /:\[[^\]]+\]/ `] = lit`
BN7yxypYUppEM4PybmSoxf6n7RAYSfJOcm1VZGHpijk=
`;

module.exports[n`DFA minimization >> 1455: /:[)>o":]/ `] = lit`
amErkzCFMDPeahUPjWzvl7gKpR69517o+oFH1sWcUwI=
`;

module.exports[n`DFA minimization >> 1456: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/ `] = lit`
i8LroXLhKu2I76H0IaOsXGy1AP0FH31T7PO5w4oOG8Q=
`;

module.exports[n`DFA minimization >> 1457: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/ `] = lit`
RNwdrp+9F6bu0fbROSXbq6rgAdzm2XdEf44YrOV+5L0=
`;

module.exports[n`DFA minimization >> 1458: /(?:::|[?:+!])?=|[|@]/ `] = lit`
pImd3jP52iBajAXeUvasQM7wjg0ZmNYj5sM0oTonv9A=
`;

module.exports[n`DFA minimization >> 1459: /[:;(){}]/ `] = lit`
xLhllOQ5ZIqwtoJgvMYfklp6z8z61h79TC3Oo7bX0Hk=
`;

module.exports[n`DFA minimization >> 1460: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/ `] = lit`
mHTl3BloiKt31dkLMNAfEkH1nP/wlwW2KFlmv0k60ig=
`;

module.exports[n`DFA minimization >> 1461: /^[^:=\r\n]+(?=\s*:(?!=))/m `] = lit`
Sbgbw/1xSivZDa3D2j++E83x6x24FB7IT0tRDfLPyIw=
`;

module.exports[n`DFA minimization >> 1462: /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|... `] = lit`
xjEcTkKjPD9T+m80eYC09K2LmlqZ1V9xlUkMzI5fXFs=
`;

module.exports[n`DFA minimization >> 1463: /\$+(?:[^(){}:#=\s]+|(?=[({]))/ `] = lit`
en6oXVY8Aa6RQCHF1t9b8U7z61VFTwNm0mu4c+dIOwI=
`;

module.exports[n`DFA minimization >> 1464: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|... `] = lit`
vMk4FgichelkVsKfYd88Ibru6oMcQHj/WOEWsuNwayc=
`;

module.exports[n`DFA minimization >> 1465: /(?:\b\d+\.?\d*|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/ `] = lit`
TWJHecGDqEtQjOGlszzldd56y81Be+6gPRKoL5upjz8=
`;

module.exports[n`DFA minimization >> 1466: /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwis... `] = lit`
sJoXdPFFHXD0ko8WBIzQGqLc7gqD+xCRfWW8+WLbfOc=
`;

module.exports[n`DFA minimization >> 1467: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/ `] = lit`
10DBhYBpDPJoB2ultmf+K+AMUSwJNi+ObjfbBctQsJg=
`;

module.exports[n`DFA minimization >> 1468: /\.{3}|[.,;\[\](){}!]/ `] = lit`
PuplYmwsw4q0SH1qmWXcKHEgS1iOBVtdMEmksbuv4CI=
`;

module.exports[n`DFA minimization >> 1469: /%\{[\s\S]*?\}%/ `] = lit`
dnzLHE71cg5P9REAmL+T0FulcFwfsG2xDtsfOtXfOj4=
`;

module.exports[n`DFA minimization >> 1470: /\B'(?:''|[^'\r\n])*'/ `] = lit`
fpr8ze6p/+SF14UEZw7UGAjtaMQiaZfOl5VfU8kEnp8=
`;

module.exports[n`DFA minimization >> 1471: /\b0x[\da-fA-F]+\b|\b\d+\.?\d*|\B\.\d+/ `] = lit`
jDAoxKnAQgL//+DN+2cXfLn1Z8VD7F3iWZxUlZHhP/k=
`;

module.exports[n`DFA minimization >> 1472: /\b(?:break|case|continue|default|do|else|float|for|global|if|in|int|matrix|proc... `] = lit`
QwV0QigrpGwtOlXtAtq0+ZmHYzp7BP5+TVi1nbQp5Gw=
`;

module.exports[n`DFA minimization >> 1474: /<<|>>|[.,:;?\[\](){}]/ `] = lit`
1GioMaoY9KvKFVRr+RFwcBjkNWRHa/6Uhnr8AGYEFQw=
`;

module.exports[n`DFA minimization >> 1475: /\`(?:\\.|[^\\\\\`\r\n])*\`/ `] = lit`
Qi0q9PSUW8GeOTbX+jzvhJb8ekaI8PnJrUT/TIPVMHE=
`;

module.exports[n`DFA minimization >> 1476: /-[^\d\W]\w*/ `] = lit`
bDrAErCiFUHD7gfzd7dv5FGZbFvDCAW6Lw/yLSDXX4U=
`;

module.exports[n`DFA minimization >> 1477: /\+[+=]?|-[-=]?|&&|\|\||[<>]=|[*\/!=]=?|[%^]/ `] = lit`
YwzHEDPbRItsCAvTf2gyl2+2zVri6MN5FSz8vDZkWww=
`;

module.exports[n`DFA minimization >> 1478: /::.+/ `] = lit`
NzE1+ULQ2gyeY1E3Si8Vt5bnZF5Wmk75iDWMddJM1Lk=
`;

module.exports[n`DFA minimization >> 1479: /@proof\b|\b(?:according|aggregate|all|and|antonym|are|as|associativity|assume|a... `] = lit`
5fdKg4wOnwV+7Y7/fGmKRCl0EMTemhZZifOpitlidCo=
`;

module.exports[n`DFA minimization >> 1480: /\w+(?=:)/ `] = lit`
3dwV+KAGedQmwakNN3Y5Av02mYwHcEk6INvc5A75aoo=
`;

module.exports[n`DFA minimization >> 1481: /\.\.\.|->|&|\.?=/ `] = lit`
faXCXpvA32zafBqT8ZdKvZq2h055j5rwTQoVvMxsTEA=
`;

module.exports[n`DFA minimization >> 1482: /\(#|#\)|[,:;\[\](){}]/ `] = lit`
nt+H+sYmqBTIe8EX/+LOIulvkZK5CRA5a/bCq/cdeis=
`;

module.exports[n`DFA minimization >> 1483: /\$(?:10|\d)/ `] = lit`
Bh+1kTnCEglPrcNTlU9S8YkbC9n9tEbW4XwiaaSeC8U=
`;

module.exports[n`DFA minimization >> 1484: /"[^"\r\n]*"/ `] = lit`
kGSWTytEBPEJ+KorH4wy+qTwNYCH2mNg6EyKLWIwi1Y=
`;

module.exports[n`DFA minimization >> 1485: /\b(?:Void|Strict|Public|Private|Property|Bool|Int|Float|String|Array|Object|Con... `] = lit`
drHAsepqHEPsGWKHn0ASlnkpAyBYWGorvSWJWBWvVM8=
`;

module.exports[n`DFA minimization >> 1486: /\.\.|<[=>]?|>=?|:?=|(?:[+\-*\/&~|]|\b(?:Mod|Shl|Shr)\b)=?|\b(?:And|Not|Or)\b/i `] = lit`
O78rBVdwGSsnzCKBEyxHyRp6F2d4evTsrYs+AZGAslw=
`;

module.exports[n`DFA minimization >> 1487: /[.,:;()\[\]]/ `] = lit`
Na/CIDtjDVWPjKmFIdw0sz9CklPxUWlk2ZOMQTForBY=
`;

module.exports[n`DFA minimization >> 1488: /(^[ \t]*)#.+/m `] = lit`
LF+Y3oY8L41TXS1aM+ApS25D7sbBslRpuSbZAD9AI5k=
`;

module.exports[n`DFA minimization >> 1489: /(\w)[?%#$]/ `] = lit`
U0Q06VKmkbsUuy2Ls3NPxVytFiuNbqhtqLOHzsMRZ3s=
`;

module.exports[n`DFA minimization >> 1490: /((?:\.\.)?)(?:(?:\b|\B-\.?|\B\.)\d+(?:(?!\.\.)\.\d*)?|\$[\da-f]+)/i `] = lit`
SXdPjn134KOxO+1XP5NHDTXo3v2Phin+U0yvqM7hPUY=
`;

module.exports[n`DFA minimization >> 1491: /^#Rem\s+[\s\S]*?^#End/im `] = lit`
Ouvs7ni1ln34IcG5Tbx6hLAhqVSp6zY3H5nlc/KFo9c=
`;

module.exports[n`DFA minimization >> 1492: /'.+/ `] = lit`
xF3/JlSNcviDwItdO7sJrvvZe6B82nNd8zqMchmRXKk=
`;

module.exports[n`DFA minimization >> 1493: /\b(?:class|continue|do|else|elseif|export|extends|for|from|if|import|in|local|n... `] = lit`
t5sQy/bru+I69EM5ARsuVuluzYhoF4hSOhXpdLpfj7k=
`;

module.exports[n`DFA minimization >> 1494: /@@?\w*/ `] = lit`
jWbJICe2n/m9jLUuN/sr6EC4eqQvwVS7F08bjeY+WME=
`;

module.exports[n`DFA minimization >> 1495: /(?:\B\.\d+|\b\d+\.\d+|\b\d+(?=[eE]))(?:[eE][-+]?\d+)?\b|\b(?:0x[a-fA-F\d]+|\d+)... `] = lit`
XodjL5JIz4asBnd6gQ0ORZ32PMZVkSczqTVrVSmAxuI=
`;

module.exports[n`DFA minimization >> 1496: /\.{3}|[-=]>|~=|(?:[-+*\/%<>!=]|\.\.)=?|[:#^]|\b(?:and|or)\b=?|\b(?:not)\b/ `] = lit`
t4WR/jE2EDvq10Z+lEiiwTmLdikIGPLVAC0j7JwGg0Q=
`;

module.exports[n`DFA minimization >> 1497: /[.,()[\]{}\\]/ `] = lit`
HJR2bgObFB7btBBy8nUim5sjE+8cGInqjH38u/FxzHw=
`;

module.exports[n`DFA minimization >> 1498: /\b(?!\d)\w+(?=:)|(:)(?!\d)\w+/ `] = lit`
h49vosF/PVUmeJ181wFOf59LGuwob300S9JjL0tedu0=
`;

module.exports[n`DFA minimization >> 1499: /\b(?:_G|_VERSION|assert|collectgarbage|coroutine\.(?:running|create|resume|stat... `] = lit`
gmm/SANHXXMfAli3aa1AN4tmnYgDOzW7fyLIqDs8JZQ=
`;

module.exports[n`DFA minimization >> 1500: /'[^']*'|\[(=*)\[[\s\S]*?\]\1\]/ `] = lit`
msAOOWij6aNkJAjTYbu840QMFx8R9K9j+H8f3zc825I=
`;

module.exports[n`DFA minimization >> 1501: /(\b(?:class|extends)[ \t]+)\w+/ `] = lit`
qpovLNtFOqbHUOLJmLLtc/Sn2V4H6b/BgAjh2S2rkvI=
`;

module.exports[n`DFA minimization >> 1502: /#\{[^{}]*\}/ `] = lit`
ZXiClpNklDSZcBCQdy6JO20P/k39y+jlEDdwvrr/GLk=
`;

module.exports[n`DFA minimization >> 1503: /(^#\{)[\s\S]+(?=\})/ `] = lit`
WbFz1fcq9M6Wn+fC4OoUYJOt9V5cHH+jWYvpMemDvi0=
`;

module.exports[n`DFA minimization >> 1504: /#\{|\}/ `] = lit`
smXVmDKNHBB86N4ysLr6o94EnvqQhWPNYbwo1M5RZAo=
`;

module.exports[n`DFA minimization >> 1505: /\/\*[\s\S]*?(?:$|\*\/)/ `] = lit`
76hWEYQHJx6zFHl2n5C2hfO11sFFewRAAJwmMZYL/bM=
`;

module.exports[n`DFA minimization >> 1506: /\$[\w.]+/ `] = lit`
edJ0ejQdHF6JEtRlrzLhQuS8pFBFAIdgahKhFpE21dQ=
`;

module.exports[n`DFA minimization >> 1509: /(?:\b\d+\.|\B\.)\d+e[+\-]?\d+\b|\b\d+\.?\d*|\B\.\d+\b/i `] = lit`
V9IFUn1kp/BpwgCNe+BY0ktTeo5A3O3kgy/fAZSlIOY=
`;

module.exports[n`DFA minimization >> 1510: /[-+*\/=%]|!=|==?|\|\||<[>=]?|>=?|\b(?:AND|ANY|ARRAY|BETWEEN|CASE|ELSE|END|EVERY... `] = lit`
cgsL3/Q4T+L86coaknTmzG/UrrAI/JN01+na1PBOYdM=
`;

module.exports[n`DFA minimization >> 1511: /[;[\](),.{}:]/ `] = lit`
OHFTBemCtRyoCZfb2i6ku3etAe4ylzURp1HkiTlm7Ew=
`;

module.exports[n`DFA minimization >> 1512: /(["'])(?:\\[\s\S]|(?!\1)[^\\]|\1\1)*\1/ `] = lit`
Zh+1kgkq26AELLDuVx2mrze+w27l2h3EzC59ctoX6sc=
`;

module.exports[n`DFA minimization >> 1513: /\`(?:\\[\s\S]|[^\\\\\`]|\`\`)*\`/ `] = lit`
MkwekHiEbt9hK8o4qnC+yq+fjxKAumF7xsFV4FaOd78=
`;

module.exports[n`DFA minimization >> 1514: /\b(?:CHIP|IN|OUT|PARTS|BUILTIN|CLOCKED)\b/ `] = lit`
jkTvhg/86ix05G3MZui7Lapgd5+Ff4dFwlReCognDXU=
`;

module.exports[n`DFA minimization >> 1515: /[A-Za-z][A-Za-z0-9]*(?=\()/ `] = lit`
Hv2iJ0t5Ff/seEUEKF4X2At9pyBA1QbAwmluDN/9zuU=
`;

module.exports[n`DFA minimization >> 1516: /=|\.\./ `] = lit`
Fh2FyN+W4KopYNQOsJejkc8R2r+OTmYmtgK92OpbEpo=
`;

module.exports[n`DFA minimization >> 1517: /[{}[\];(),:]/ `] = lit`
BcW2jl+LTpQFuWdxPnJQkKHX9Z0/VP8e3uhZR2e8e2Y=
`;

module.exports[n`DFA minimization >> 1518: /^([\t ]*);.*/m `] = lit`
yRjXsxT4+uGRIc+HZuHaPyrmioZ1SYfRd2n/nRBNUcI=
`;

module.exports[n`DFA minimization >> 1519: /^>.+/m `] = lit`
ziNVGl84CajMdpNRoXoAO/jgLOywHD8PTSnPp4P2nWo=
`;

module.exports[n`DFA minimization >> 1520: /^([\t ]*)#[\t ]*\w+[\t ]*$/m `] = lit`
LtFlvSgcUGldl4X3MEkWlyxDjhQ8MShWYg3LGbcstr0=
`;

module.exports[n`DFA minimization >> 1521: /^([\t ]*)@\w+(?=[\t ]|$).*/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1522: /(^[ \t]*)[^#@>;\s].*/m `] = lit`
zgSnGu6kdcWVyE2pKjRAcs068xMojgc0VW9eQk14Vys=
`;

module.exports[n`DFA minimization >> 1523: /^@\w+/ `] = lit`
ilIvR/2/jC3viAYCo4Q48z8zDnY/6Qk+n6wKjfC3jFc=
`;

module.exports[n`DFA minimization >> 1524: /\\[{}\[\]"]/ `] = lit`
LpXH/Yy5bySDaevLMiXTplJxbSGc3+EjiVvwVuqUn7k=
`;

module.exports[n`DFA minimization >> 1525: /(^>\w+[\t ]+)(?!\s)[^{}\r\n]+/ `] = lit`
UOd4aoegN/VTyL4gQnb4pRD/7yZJ+ARMnuekgdy6fsU=
`;

module.exports[n`DFA minimization >> 1526: /(^>)\w+/ `] = lit`
fglgw5xl5vZGbGBxqoIopiB94/kc81QcZjU4BlZrpy8=
`;

module.exports[n`DFA minimization >> 1527: /\{[^\r\n\[\]{}]*\}/ `] = lit`
KLs4GnzLILWkWUA6z2NHmpFUiD2CkkiAmp4YwfFAv80=
`;

module.exports[n`DFA minimization >> 1528: /\[[\t ]*\w+[^\r\n\[\]]*\]/ `] = lit`
cI78CosW29tmut6tAcnXmFrV0x2P7UkZEurOgtFproA=
`;

module.exports[n`DFA minimization >> 1529: /(\s)\w+:/ `] = lit`
nYD4kEzODUBqaLie10gH3clPx92ILUuZwIucNOslwtI=
`;

module.exports[n`DFA minimization >> 1530: /(^\[[\t ]*\w+\b)[\s\S]+(?=\]$)/ `] = lit`
iduKQOz8lh+g9tOJJqXWoS4NhPj7UkAjKZVSyp5hc5Y=
`;

module.exports[n`DFA minimization >> 1531: /^(\[[\t ]*)\w+/ `] = lit`
QgX2LG3F4Ux9dSfwQmRs6yHDbfMhqpzulaxgi0l3La0=
`;

module.exports[n`DFA minimization >> 1532: /([\t ])\S+/ `] = lit`
PBBNtvN+pFESpbNA+/UCspUdhddi4gMO6e0ht63scpY=
`;

module.exports[n`DFA minimization >> 1533: /\S(?:.*\S)?/ `] = lit`
vUJQRrUxXqt/RvRB401hp6egmeapmz+Q5Jdusvdnh3k=
`;

module.exports[n`DFA minimization >> 1534: /;.*$/m `] = lit`
/PoR6ZGPtYpU4SyeXidmnvJ6rhMHusfjHCA2g501ADM=
`;

module.exports[n`DFA minimization >> 1535: /(?:\b|(?=\$))(?:0[hx][\da-f]*\.?[\da-f]+(?:p[+-]?\d+)?|\d[\da-f]+[hx]|\$\d[\da-... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1536: /[\[\]*+\-\/%<>=&|$!]/ `] = lit`
KFHM3OkUlu9uUtXpTCZbvTgMWZmIiXxA01QpVgTL51M=
`;

module.exports[n`DFA minimization >> 1537: /(^\s*)[A-Za-z._?$][\w.?$@~#]*:/m `] = lit`
5xT8SqNIggL/B/ZfZY0gkqwVBa+wFbNOkPcet8mudc4=
`;

module.exports[n`DFA minimization >> 1538: /\[?BITS (?:16|32|64)\]?/ `] = lit`
vtIWV6W16LxYduMGpY5EYkU/LEKXVRAOKFiKO8QDaOk=
`;

module.exports[n`DFA minimization >> 1539: /(?:extern|global)[^;\r\n]*/i `] = lit`
oYYstLe6b7wvzpjdNclO9PPLXsRTgj9Qeei2ZjOHH8c=
`;

module.exports[n`DFA minimization >> 1540: /(?:CPU|FLOAT|DEFAULT).*$/m `] = lit`
EOmnSH7xz1ZXzpeTjlxtzzLLttNkNf7Dp4NzNhb6Sdg=
`;

module.exports[n`DFA minimization >> 1541: /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp... `] = lit`
CuPF36ylEi3GcPZx3AIKTy2C8LWH3V0aOpS4NOfDFfU=
`;

module.exports[n`DFA minimization >> 1542: /(^\s*)section\s*[a-zA-Z.]+:?/im `] = lit`
SNfURi7jcbjotmtpniwAk0/JC1ECLLGCNZLkPYxZZTs=
`;

module.exports[n`DFA minimization >> 1543: /[,:=[\]{}()-]/ `] = lit`
ScvIco+J7DvLDAEH98befW6QG/40H+FP08QBIMuWGN8=
`;

module.exports[n`DFA minimization >> 1544: /(^|[[{(=:,\s])\d\d\d\d-\d\d?-\d\d?(?:(?:[Tt]| +)\d\d?:\d\d:\d\d(?:\.\d*)? *(?:Z... `] = lit`
/NF/LHCN3tOKEmb9nVD17m3Bp2h+kzt4jJscwKQz1ps=
`;

module.exports[n`DFA minimization >> 1545: /(^|[[{(,\s])[^,:=[\]{}()'"\s]+(?=\s*:(?:$|[\]}),\s])|\s*=)/ `] = lit`
k480BHIk8JNlaemeveXfsOVRjoA22919dT12TmbJpms=
`;

module.exports[n`DFA minimization >> 1546: /(^|[[{(=:,\s])[+-]?(?:0x[\da-fA-F]+|0o[0-7]+|0b[01]+|(?:\d+\.?\d*|\.?\d+)(?:[eE... `] = lit`
3pUX+gpL6ZxTtkzygYi6VZJJ1iLoh70hXbB7v3y8vqE=
`;

module.exports[n`DFA minimization >> 1547: /(^|[[{(=:,\s])(?:true|false|yes|no)(?=$|[\]}),:=\s])/i `] = lit`
P2flunCJFe1jPARUKcDFeiIOnMo3jkgt7PcIKr/Vyf0=
`;

module.exports[n`DFA minimization >> 1548: /(^|[[{(=:,\s])(?:null)(?=$|[\]}),:=\s])/i `] = lit`
MnCzOmktn7hehD2oOZX3UtVyRV1awfEgeHvDjpLvODg=
`;

module.exports[n`DFA minimization >> 1549: /(^|[[{(=:,\s])(?:('''|""")\r?\n(?:(?:[^\r\n]|\r?\n(?![\t ]*\2))*\r?\n)?[\t ]*\2... `] = lit`
cbkL/Au43kRvIrQy2Tr+t3787fG/BBjFmcYkPaubT7s=
`;

module.exports[n`DFA minimization >> 1550: /(^|[[{(=:,\s])(?:[^#"\',:=[\]{}()\s\`-]|[:-][^"\',=[\]{}()\s])(?:[^,:=\]})(\s]+|... `] = lit`
4tgbcxeEp0UR9/IXrHIGObyeTKz95ceWypOwrhVBDa0=
`;

module.exports[n`DFA minimization >> 1551: /\$[a-z_]+/i `] = lit`
+hqR4sKAw4OfICk5tiYjPYJMRoWJ4ragu53spUKmtHQ=
`;

module.exports[n`DFA minimization >> 1553: /(^|[^"{\\])#.*/ `] = lit`
mBDxXJzHtqtmc4ViycZ7dGmly1SBB2Iug/RAgq1D/Q8=
`;

module.exports[n`DFA minimization >> 1554: /\b(?:0[xXoObB][\da-fA-F_]+|\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)... `] = lit`
fONkhb25iSQheAVUC3ab+HIEqIlv2dR52BwHItdza6c=
`;

module.exports[n`DFA minimization >> 1555: /\b(?:addr|as|asm|atomic|bind|block|break|case|cast|concept|const|continue|conve... `] = lit`
25fmb6FuNL7OkHuw3M2z2PHTMoQvh/9f98q/Nijf+Uk=
`;

module.exports[n`DFA minimization >> 1556: /[({\[]\.|\.[)}\]]|[\`(){}\[\],:]/ `] = lit`
djw2fyKHPwxjMJ26jbzWsFk3g0jpeHWGGWa4v2DW7ZI=
`;

module.exports[n`DFA minimization >> 1557: /(?:(?:\b(?!\d)(?:\w|\\x[8-9a-fA-F][0-9a-fA-F])+)?(?:"""[\s\S]*?"""(?!")|"(?:\\[... `] = lit`
BLfY/z4d1SnMExaBW+xK5XoCLEw+JMXJFPPfAr5MVeA=
`;

module.exports[n`DFA minimization >> 1558: /(?:(?!\d)(?:\w|\\x[8-9a-fA-F][0-9a-fA-F])+|\`[^\`\r\n]+\`)\*?(?:\[[^\]]+\])?(?=\s*... `] = lit`
DFX8vZVS+kJ8AcVpOCaB49T4m7HnaJStW4Oeb9vZrHw=
`;

module.exports[n`DFA minimization >> 1559: /\`[^\`\r\n]+\`/ `] = lit`
dsJ8GFwZpTobx4KyksMVPBqFVZUeq00CcwP+aj42BeM=
`;

module.exports[n`DFA minimization >> 1560: /(^|[({\[](?=\.\.)|(?![({\[]\.).)(?:(?:[=+\-*\/<>@$~&%|!?^:\\]|\.\.|\.(?![)}\]])... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1561: /\*$/ `] = lit`
giUA77QaleuzEkaX62LbqhZhlumrRrdrmGXspD9PiLc=
`;

module.exports[n`DFA minimization >> 1562: /\`/ `] = lit`
p7FHTHsk4i8OrXD2TLtQOWczKGLQTkhVODrqnTj/Yio=
`;

module.exports[n`DFA minimization >> 1563: /\/\*[\s\S]*?\*\/|#.*/ `] = lit`
q9G0EBxu6SwPQHL3H89YpcoUnQb6pGlt34R4Sf2YlJA=
`;

module.exports[n`DFA minimization >> 1564: /\b(?:assert|builtins|else|if|in|inherit|let|null|or|then|with)\b/ `] = lit`
rdLEyKkrcM5ttcstUs8DgMY0Vy5IszL71svsQJISVCo=
`;

module.exports[n`DFA minimization >> 1565: /\b(?:abort|add|all|any|attrNames|attrValues|baseNameOf|compareVersions|concatLi... `] = lit`
ta+w4IDPhmR/C/zOPv1MIt+X48aSF3pnNv58V8PuWI0=
`;

module.exports[n`DFA minimization >> 1566: /[=!<>]=?|\+\+?|\|\||&&|\/\/|->?|[?@]/ `] = lit`
3jHmA91nJgtaGig8sfDvTsxkXvocoJSuK6o28Owy4tE=
`;

module.exports[n`DFA minimization >> 1567: /[{}()[\].,:;]/ `] = lit`
OHFTBemCtRyoCZfb2i6ku3etAe4ylzURp1HkiTlm7Ew=
`;

module.exports[n`DFA minimization >> 1568: /"(?:[^"\\]|\\[\s\S])*"|''(?:(?!'')[\s\S]|''(?:'|\\|\$\{))*''/ `] = lit`
Hw3KIoiFpZgoD3aO+CY4C/XALUpfRERxe2wTJofHLS8=
`;

module.exports[n`DFA minimization >> 1569: /\b(?:[a-z]{3,7}:\/\/)[\w\-+%~\/.:#=?&]+/ `] = lit`
yjJwGuJ7lsy7iCmeX8aYgYXwU+E9ynDSXfX77tHC5b8=
`;

module.exports[n`DFA minimization >> 1570: /\$(?=\{)/ `] = lit`
rAnvF26m+nvkZwGuEbviBwnYEyOV9aEeJkFvDTQPcNs=
`;

module.exports[n`DFA minimization >> 1571: /([^\/])(?:[\w\-+%~.:#=?&]*(?!\/\/)[\w\-+%~\/.:#=?&])?(?!\/\/)\/[\w\-+%~\/.:#=?&... `] = lit`
VVsgk6x90R2vhU2RsTxOnshHauzqYIsPdg8pka6kAQw=
`;

module.exports[n`DFA minimization >> 1572: /(^|(?:^|(?!'').)[^\\])\$\{(?:[^}]|\{[^}]*\})*}/ `] = lit`
PjWI5mD89LLq4PhSP0fl3mE0JGaToQTwdGbh2F0v4E8=
`;

module.exports[n`DFA minimization >> 1573: /^\$(?=\{)/ `] = lit`
rAnvF26m+nvkZwGuEbviBwnYEyOV9aEeJkFvDTQPcNs=
`;

module.exports[n`DFA minimization >> 1574: /\b(?:admin|all|auto|both|colored|false|force|hide|highest|lastused|leave|liston... `] = lit`
OeTpsa3Dlu5PhFpGlvt/w401u9f6I5O8vtHzRakCHvA=
`;

module.exports[n`DFA minimization >> 1575: /\\\${[\w\.:\^-]+}|\$\([\w\.:\^-]+\)/i `] = lit`
L5cukWdn/O84NCGSyiif9GIVUunBNufcQjdzuE7+RTY=
`;

module.exports[n`DFA minimization >> 1576: /\$\w+/i `] = lit`
RQJC+6hkWbDXNo5naUkdYhLDRPuqQa8CZNP/KrZmQto=
`;

module.exports[n`DFA minimization >> 1577: /--?|\+\+?|<=?|>=?|==?=?|&&?|\|\|?|[?*\/~^%]/ `] = lit`
afNhrxioi5zUgHpt0LD2VxxH6mtsox8usagKbQJ5Gl4=
`;

module.exports[n`DFA minimization >> 1578: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|[#;].*)/ `] = lit`
V+fCiWnWyhdIK/5NHVXpCgOMWtCGu7QYQGzHgavpLf4=
`;

module.exports[n`DFA minimization >> 1580: /(^\s*)!(?:addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|end... `] = lit`
P843SuGlD9FBrf7DJ6fB6QkGqGCVYTlJmR0RZUnOzOk=
`;

module.exports[n`DFA minimization >> 1581: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n]... `] = lit`
JBVkuDZDDr9B+R6TtXFKgue6Kj5rwvWQ2137oepITuM=
`;

module.exports[n`DFA minimization >> 1582: /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|el... `] = lit`
fMQuwYbWwrdRlC5IOQts1Iu7gsX2/yYpXroHZCoCz7g=
`;

module.exports[n`DFA minimization >> 1583: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/ `] = lit`
bY9kclhfo8vpXvtCbrryeBI0ztw6hsG/XL9YEojgYvg=
`;

module.exports[n`DFA minimization >> 1584: /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i `] = lit`
7JjXr//5LGUnDw8UUZ5R+W1vXo6eit0kVwTcEvAwD/k=
`;

module.exports[n`DFA minimization >> 1585: /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|externa... `] = lit`
6yflPWOUqSB3ZNIQ8mVEHADnnDJck0latTgPmSrB140=
`;

module.exports[n`DFA minimization >> 1586: /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lx... `] = lit`
9HICAb20Vk0aA/8ENotYgjhLZd4SMbgcAYD0qU/HSWQ=
`;

module.exports[n`DFA minimization >> 1587: /[(){}\[\]|.,:;]|\b_\b/ `] = lit`
HLJU8/B6xfY6xgitCiD9lqk3BkdIJdgZAuGgBNTRuTY=
`;

module.exports[n`DFA minimization >> 1588: /\B#\w+/ `] = lit`
68v9J3ODe9Zv+yldcqT6TmMLMDaCYISVNWp6/qeF+Co=
`;

module.exports[n`DFA minimization >> 1589: /\B~\w+/ `] = lit`
6KD4WcmR2Iu5H7CFosmkWOfeCnShWLKr1FU6LLoM6HE=
`;

module.exports[n`DFA minimization >> 1590: /\B'\w+/ `] = lit`
hQ6ISfwfkujv7xRUCp63u6hVMJqZct9wCSXkNeEa39A=
`;

module.exports[n`DFA minimization >> 1591: /\`\w+/ `] = lit`
dqdC/I2glWJVoH+WSCyGhalGIB8hQ4oGZ6t7yXOUFKk=
`;

module.exports[n`DFA minimization >> 1592: /\b[A-Z]\w+/ `] = lit`
kNMYxDU6qvpFx2lLAjD6nh0uzoQ3CUd54+mPcJ2RxoU=
`;

module.exports[n`DFA minimization >> 1593: /(['\`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i `] = lit`
pCeuBhUlXgqvdNWcLCoOD3fm2D22TGEZRm6nwaqbA+U=
`;

module.exports[n`DFA minimization >> 1594: /\b(?:__attribute__|(?:__)?(?:constant|global|kernel|local|private|read_only|rea... `] = lit`
anCd2E5TQWMTtVuQpBDYbEwaBg4+o2qtJXD39orVvFc=
`;

module.exports[n`DFA minimization >> 1595: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)... `] = lit`
s5jY1Wsi8B9/zFn73ZQ5xzMPOcrV9bAmG8iBAlanwSg=
`;

module.exports[n`DFA minimization >> 1596: /\b(?:cl_(?:GLenum|GLint|GLuin|addressing_mode|bitfield|bool|buffer_create_type|... `] = lit`
YdRFIBzWBlu2PeTL3qb64NAa/SllcAmtckH/Z5jF3hg=
`;

module.exports[n`DFA minimization >> 1597: /\bCL_(?:TRUE|FALSE)\b/ `] = lit`
An1pWwrUb0lTkayeCJmVj5Ki9RjDTrA1N2TpopRHy4U=
`;

module.exports[n`DFA minimization >> 1600: /\b(?:CHAR_(?:BIT|MAX|MIN)|CLK_(?:ADDRESS_(?:CLAMP(?:_TO_EDGE)?|NONE|REPEAT)|FIL... `] = lit`
9PxvnKeJ5sChTMK/pavxXp+UniDqlN3x8vcOZxMp/8Y=
`;

module.exports[n`DFA minimization >> 1601: /\b(?:Buffer|BufferGL|BufferRenderGL|CommandQueue|Context|Device|DeviceCommandQu... `] = lit`
RjTuWGyA1/3HK3ndcULtfFCeHsuhU9lmJHRINVMbaEk=
`;

module.exports[n`DFA minimization >> 1602: /\/\*[\s\S]*?\*\/|%.*/ `] = lit`
caIQnmdzsPE7RfrbyK2zq0qXhRSPnOf+zp/F2lhxTdY=
`;

module.exports[n`DFA minimization >> 1603: /\$|\[\]|\b(?:_|at|attr|case|catch|choice|class|cond|declare|define|dis|else(?:c... `] = lit`
3FeEPe7k3ZDgl25OtOkUSbk3Opljqpuf04LnbjdTtHk=
`;

module.exports[n`DFA minimization >> 1604: /\b(?:0[bx][\da-f]+|\d+\.?\d*(?:e~?\d+)?)\b|&(?:[^\\]|\\(?:\d{3}|.))/i `] = lit`
z9OiiYW43OQN2kV7u/fgZ67M+Y6QmGJa4W7nLPE4vCU=
`;

module.exports[n`DFA minimization >> 1605: /\b[A-Z][A-Za-z\d]*|\`(?:[^\`\\]|\\.)+\`/ `] = lit`
VE50U6sTWVSJ/nAcAEWQ5mt2bBGX5bSAP1XgpuBkEdU=
`;

module.exports[n`DFA minimization >> 1606: /:(?:=|::?)|<[-:=]?|=(?:=|<?:?)|>=?:?|\\=:?|!!?|[|#+\-*\/,~^@]|\b(?:andthen|div|... `] = lit`
ztCCtNjAFcjbXcpdOmVJJ0fmUUPpk0NlHdBIMh0Z1EM=
`;

module.exports[n`DFA minimization >> 1607: /[\[\](){}.:;?]/ `] = lit`
hh9TWwQqBJr0xYzX52+Gw+8bMdLkc8jIEQ4b+4btJeU=
`;

module.exports[n`DFA minimization >> 1608: /"(?:[^"\\]|\\[\s\S])*"/ `] = lit`
901gjCaUOwjwFLfIL54nMX9rgHEl6ouvkBv/aY0K38w=
`;

module.exports[n`DFA minimization >> 1609: /'(?:[^'\\]|\\[\s\S])*'/ `] = lit`
D547X8KZ44dtJLwcTjCZDS+2/WcVUHbpxGIAR2njePA=
`;

module.exports[n`DFA minimization >> 1610: /\b[a-z][A-Za-z\d]*(?=\()/ `] = lit`
X5gyjdvWSEb//iOfY8C6ZhOCOeYYOFMTSj0MmVLbBkc=
`;

module.exports[n`DFA minimization >> 1611: /(\{)[A-Z][A-Za-z\d]*\b/ `] = lit`
3vAqj6ijHj41Uff3PQu++eBoXv+9cyoT36wUhrlaQGQ=
`;

module.exports[n`DFA minimization >> 1612: /\/\*[\s\S]*?\*\/|\\\\.*/ `] = lit`
pfsQmv1nAo+aMU/vyaCHtEaIdGOM6x9tg/Pcy5wHNhs=
`;

module.exports[n`DFA minimization >> 1613: /\b(?:b *r *e *a *k *p *o *i *n *t|b *r *e *a *k|d *b *g *_ *d *o *w *n|d *b *g ... `] = lit`
av09LU6/bMvGgs1H98DnFnqe73iqfTP5q9YwzkU1A8I=
`;

module.exports[n`DFA minimization >> 1614: /\w[\w ]*?(?= *\()/ `] = lit`
d5CaNdithIMEYCYYWgRGKesVHl79Eq6jHEceNJt4OsQ=
`;

module.exports[n`DFA minimization >> 1615: /\. *\.|[*\/!](?: *=)?|%(?: *=|(?: *#)?(?: *')*)?|\+(?: *[+=])?|-(?: *[-=>])?|<(... `] = lit`
TuIWeqQuGCGJlAWoP0v3msVp1M8pRxOB3Eha+aapvVg=
`;

module.exports[n`DFA minimization >> 1616: /[\[\]{}().,:;|]/ `] = lit`
jLIQTDIiDKncUhQ2pLsYL77igYwrrZ0a/O1ASt6l3hE=
`;

module.exports[n`DFA minimization >> 1617: /"(?:[^"\\\r\n]|\\.)*"/ `] = lit`
vAWlB1EdyUqSGPPC0ql3/BUjpcILwwRJYbUAuqQM8gY=
`;

module.exports[n`DFA minimization >> 1618: /((?:\. *\. *)?)(?:\b\d(?: *\d)*(?: *(?!\. *\.)\.(?: *\d)*)?|\. *\d(?: *\d)*)(?:... `] = lit`
OPUm4fF3ip1bw2sbxpZdGFzOIg734pQ+RQAEQSkLfIo=
`;

module.exports[n`DFA minimization >> 1619: /[\[\](){};]/ `] = lit`
shnDSjYmMCVMm3QOuG92jSEC39aqWEGBHBrYWqUGXHs=
`;

module.exports[n`DFA minimization >> 1620: /(\s)#.*/ `] = lit`
QTZheWpwRPeSrSuqV8E7JKBWr4VPdBW1vMr4sryCdWQ=
`;

module.exports[n`DFA minimization >> 1621: /(^|[^^])\((?:[^()]|\((?:[^()]|\((?:[^()])*\))*\))*\)/ `] = lit`
hONzFd2aItuy7yFRZ3FlzAmunzWa32lYdGrMHtcLV74=
`;

module.exports[n`DFA minimization >> 1622: /(^|[^^])(?:\^(?:case|eval|for|if|switch|throw)\b|@(?:BASE|CLASS|GET(?:_DEFAULT)... `] = lit`
nUVTT1c8Z5XWInULakvOSPDrhpB3hlnMXAOdNbxWMqs=
`;

module.exports[n`DFA minimization >> 1623: /(^|[^^])\B\$(?:\w+|(?=[.{]))(?:(?:\.|::?)\w+)*(?:\.|::?)?/ `] = lit`
bUAx7gd+9/Eo0bnwA0gtBKdKo4g43JkzL3CFb52/aa8=
`;

module.exports[n`DFA minimization >> 1624: /(^|[^^])\B[@^]\w+(?:(?:\.|::?)\w+)*(?:\.|::?)?/ `] = lit`
3TlRya/olseqzBAbaQztxWlgc4uAG9s5B8dVazKCKlk=
`;

module.exports[n`DFA minimization >> 1625: /\^(?:[$^;@()\[\]{}"':]|#[a-f\d]*)/i `] = lit`
vfPp5LRqeoUkJ1N6di1fd15xhudwHuyhCFJGVfmWdwY=
`;

module.exports[n`DFA minimization >> 1626: /\b(?:0x[a-f\d]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1627: /[~+*\/\\%]|!(?:\|\|?|=)?|&&?|\|\|?|==|<[<=]?|>[>=]?|-[fd]?|\b(?:def|eq|ge|gt|in... `] = lit`
l9/M0kQ9uIo2ESDsaSRQg/TQd8n1y3nykJH3P5frEIc=
`;

module.exports[n`DFA minimization >> 1628: /\.|:+/ `] = lit`
Gfk8XyC1jEtafq/Rz/q5qVuq3X3z9fLzn1F+ijWFuP4=
`;

module.exports[n`DFA minimization >> 1629: /(^|[^^])(["'])(?:(?!\2)[^^]|\^[\s\S])*\2/ `] = lit`
vFAayNiodc1ex4JK6h8OYpKJ9P9eJiRPL/D6U7d2Qv8=
`;

module.exports[n`DFA minimization >> 1630: /(^@)(?:GET_|SET_)/ `] = lit`
tGzqJIe3h1H2lwCyldb2PXttMaYbYk0Fn9DmyNcJ1bU=
`;

module.exports[n`DFA minimization >> 1631: /\(\.|\.\)|[()\[\]:;,.]/ `] = lit`
mGWi+4qccdM2ApG5djS4ppl7D4fmTUw+ZjQZTCas3uc=
`;

module.exports[n`DFA minimization >> 1632: /\(\*[\s\S]+?\*\)/ `] = lit`
TN008ZYd1IQnPNs2UMHGO/RzQuuHd3AEPSsMzmO6SlE=
`;

module.exports[n`DFA minimization >> 1633: /\{[\s\S]+?\}/ `] = lit`
MuTQ8xtrscFhkgzH8zUaeJqz5z26gkVD8jcjm0PkDLA=
`;

module.exports[n`DFA minimization >> 1634: /(?:'(?:''|[^'\r\n])*'(?!')|#[&$%]?[a-f\d]+)+|\^[a-z]/i `] = lit`
+68Z+1GJyp5d0ydhthHW2oZJ9qwlZ6NXQnUmD+fgSAI=
`;

module.exports[n`DFA minimization >> 1635: /(?:[&%]\d+|\$[a-f\d]+)/i `] = lit`
fVUuuXiaEgi8lPTGp1/D7Wc90gxam37gkmCveDu1b1k=
`;

module.exports[n`DFA minimization >> 1636: /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?/i `] = lit`
3/clMOAxgJqO3gw7g8LQKChBLrOfuiwhA44J/sZjUzI=
`;

module.exports[n`DFA minimization >> 1637: /\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=]/i `] = lit`
IDfD5QMPbYctM50xboYbzIj2kWqDV3yIQw9cxm43U4Q=
`;

module.exports[n`DFA minimization >> 1638: /(^|[^&])\b(?:absolute|array|asm|begin|case|const|constructor|destructor|do|down... `] = lit`
3P1EYv4TbYAZ6pG5Kvdm2ICmMu1cI0v+AcBdbgQHJKA=
`;

module.exports[n`DFA minimization >> 1639: /(^|[^&])\b(?:dispose|exit|false|new|true)\b/i `] = lit`
g88nF/oSPsnAk6mKAjpCj9YuVx3GfoaoAxdnCQKUOCM=
`;

module.exports[n`DFA minimization >> 1640: /(^|[^&])\b(?:class|dispinterface|except|exports|finalization|finally|initializa... `] = lit`
OPWs5k9oWZv0ch+pXjHuDjDwP9abI4YJqYYtdmzOcoY=
`;

module.exports[n`DFA minimization >> 1641: /(^|[^&])\b(?:absolute|abstract|alias|assembler|bitpacked|break|cdecl|continue|c... `] = lit`
GWn4Qbmrd7wN77W5kqPWDa59qbnmAxjJFBRV6baCAYo=
`;

module.exports[n`DFA minimization >> 1642: /(^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|or|shl|shr|xor)\b/ `] = lit`
ndu7BvDrJmis19xCOnNcLHApZS7sLT//dU/+U51HqlM=
`;

module.exports[n`DFA minimization >> 1643: /\(\*[\s\S]+?\*\)|\/\/.*/ `] = lit`
zdXSHDhnkdQHDS2MAuItNfIm7R/gvnjLmOs3BB9OUVo=
`;

module.exports[n`DFA minimization >> 1644: /\w+(?=\s*\()/i `] = lit`
o6lXUcNyzD/nzKnl9btnLf5BYKIC3oqCVwGcFsU1zhQ=
`;

module.exports[n`DFA minimization >> 1645: /->|=\/=|\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=|]|\b(?:and|mod|or)\b/ `] = lit`
YKSlGb1mBN7G61xAwx9rnNJ+EKr4lvAr4tk9RCaUN/Y=
`;

module.exports[n`DFA minimization >> 1646: /\(\.|\.\)|[()\[\]:;,.{}]/ `] = lit`
WOl+icuapgKcKJ5a6mS4qaEZyqMhwOC5uRzP1lJd1CE=
`;

module.exports[n`DFA minimization >> 1647: /(["'\`])(?:\\[\s\S]|(?!\1)[^\\])*\1|\^[a-z]/i `] = lit`
cCS47yuNTZ/cG5R0oQDjD8stiy75stCGsKDrIO+RdZM=
`;

module.exports[n`DFA minimization >> 1648: /(^|[^&])\b(?:begin|block|case|const|else|end|fail|for|from|function|if|is|nil|o... `] = lit`
xthO3nDlPe+1/LuSPplWhtyIogFQjGoKA0xmIivB0Zw=
`;

module.exports[n`DFA minimization >> 1649: /(^|[^&])\b(?:True|False)\b/i `] = lit`
72hNZeAduiAAb9ZlfP9TnvC2g2hcd1/aYX5q82oibHw=
`;

module.exports[n`DFA minimization >> 1650: /(^|[^&])\b(?:bool|int|list|map|nat|record|string|unit)\b/i `] = lit`
O2+qPwsx6iiYmiE79auPKQ3+/JfTPcnq8RCnpnJOLkc=
`;

module.exports[n`DFA minimization >> 1651: /%[01]+|&[0-7]+|\$[a-f\d]+/i `] = lit`
6wdZ5mF/30PllH9x6Mx3QOrCfV9P3uUySpHf3/jBQnQ=
`;

module.exports[n`DFA minimization >> 1652: /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?(?:mtz|n)?/i `] = lit`
07+9FJWPPv5jK5mOo/i+7kHIErcAq2FJs5fMT/jnKHs=
`;

module.exports[n`DFA minimization >> 1653: /(\btype\s+\w+\s+is\s+)(?:\w+(?:\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))?|\((?:... `] = lit`
lKmyrKdkVam55I+GVx7261T5kiXeH8Mfr647LvZRFv4=
`;

module.exports[n`DFA minimization >> 1654: /(?:\w+(?:\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))?|\((?:[^()]|\((?:[^()]|\([^(... `] = lit`
N3eLsMkePy1Fje8MncMBBpv6ECHcUpMbQcdE6Vf0Gj0=
`;

module.exports[n`DFA minimization >> 1655: /(:\s*)(?:\w+(?:\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))?|\((?:[^()]|\((?:[^()]... `] = lit`
80wSR206RDNI+uKPZgh3jGdWIKA6RnyzfghoRVVrRzM=
`;

module.exports[n`DFA minimization >> 1656: /[;,]/ `] = lit`
ks1vBUT876FtEaqH+NuSIhU+5MsXdf7ila2pgUoncUg=
`;

module.exports[n`DFA minimization >> 1657: /YES|NO/ `] = lit`
7nHh0KxaTGq7YnXH1vO0N9w3rgBD7sTGsxrojcNWOFw=
`;

module.exports[n`DFA minimization >> 1658: /((?:^|;)\s*)[-A-Z\d]+(?:\s*\[[-\w]+\])?(?:\s*\("[^"]*"(?:,\s*"[^"]*")*\))?(?=\s... `] = lit`
VSFSK/hOFc6aE1O4u6zW+zlmuE8b+lqteGEU4h5g7hI=
`;

module.exports[n`DFA minimization >> 1659: /TLIST\s*\(\s*\w+(?:(?:\s*,\s*"[^"]*")+|\s*,\s*"[^"]*"-"[^"]*")?\s*\)/ `] = lit`
Tb4EsDajHHEwzKE8Vt6Ky3Ay4+/QhbU4UnbTE8Szhhg=
`;

module.exports[n`DFA minimization >> 1660: /(^|\s)\d+(?:\.\d+)?(?!\S)/ `] = lit`
+/m6mrskM5ln9JGPnw6PV1RoEsCjzfTiHCgB/E27VeU=
`;

module.exports[n`DFA minimization >> 1661: /^[-A-Z\d]+/ `] = lit`
mV5QFe/cqII++jk6qLlQ2C3BHhiWO7PPmZcgWUAcMhk=
`;

module.exports[n`DFA minimization >> 1662: /^TLIST/ `] = lit`
VbioUdnxwJvwETZEUgblFtuwfSB/AwPln9GGx/dLPXs=
`;

module.exports[n`DFA minimization >> 1663: /^(\s*)\[[-\w]+\]/ `] = lit`
u9cZ7kbwYLRdGqQgbsXKCYJzA6s3av0OzjfP8Cg6twQ=
`;

module.exports[n`DFA minimization >> 1664: /^(\s*)[\s\S]+/ `] = lit`
jaSRELIgS9Ix2MehB//+JgZzneU7n2hA/cvXMvg5QUw=
`;

module.exports[n`DFA minimization >> 1665: /^(\s*\(\s*)\w+/ `] = lit`
4qQeTrhKqpPR+jIrrFasM0Y57/fYzQSgQqw1mg50hm0=
`;

module.exports[n`DFA minimization >> 1666: /[-\w]+/ `] = lit`
1OPOdMqiC81t9FAVQswT4fdh2oe+rztEOW4a5HJdycc=
`;

module.exports[n`DFA minimization >> 1667: /^\(|\)$|,/ `] = lit`
TWrJo+kPSRUdjngo30EkkcLjbUydEbPRs7HPeRs0vCM=
`;

module.exports[n`DFA minimization >> 1668: /\/\*[\s\S]*?\*\/|\bREM[^;]*;|<\*(?:[^<*]|\*(?!>)|<(?!\*)|<\*(?:(?!\*>)[\s\S])*\... `] = lit`
ZnzDLwXFZyfcYG/wBj73aZsxnvN/q1/LyXpe4xD16rg=
`;

module.exports[n`DFA minimization >> 1669: /\b(?:abstract|alias|as|catch|class|component|constant|create|declare|else|end-(... `] = lit`
pljhNcSPssnPG1fStUgT6fQDEoW8yATE26OiXiMw8eY=
`;

module.exports[n`DFA minimization >> 1670: /[_a-z]\w*(?=\s*\()/i `] = lit`
Pzj56ooZK2dcyafycKwYDm3OyTvuhVK39Cp0cgWIiQI=
`;

module.exports[n`DFA minimization >> 1671: /<>|[<>]=?|!=|\*\*|[-+*\/|=@]/ `] = lit`
Emm0UIAwS8jntbWPZAT7inqCV5f0JzazEaKN6KZMlYs=
`;

module.exports[n`DFA minimization >> 1672: /[:.;,()[\]]/ `] = lit`
Na/CIDtjDVWPjKmFIdw0sz9CklPxUWlk2ZOMQTForBY=
`;

module.exports[n`DFA minimization >> 1673: /((?:^|[^\w-])(?:function|method)\s+)\w+/i `] = lit`
JRtbX5YEnZ3qZmojbPO0FUNLL82UcXGD6dgofBAIDPc=
`;

module.exports[n`DFA minimization >> 1674: /((?:^|[^-\w])(?:as|catch|class|component|create|extends|global|implements|insta... `] = lit`
dG9bLcYvmhsbIX6SmzWDx+2HFN1L/CXXF7zRrZME4tg=
`;

module.exports[n`DFA minimization >> 1675: /\b(?:and|not|or)\b/i `] = lit`
HP1RWD0wTlOtEw4Yh4F85qB/PzegqDoV1lDU/3NXy+U=
`;

module.exports[n`DFA minimization >> 1676: /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given... `] = lit`
pDiineWtsUYn9WRBbq6qgvkVFkLzjuu+bwjnROdRfZY=
`;

module.exports[n`DFA minimization >> 1677: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1678: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?... `] = lit`
HD3NTk2QzrjmpMcloU4tuglw3kziKKPZqoU5dVPHXFI=
`;

module.exports[n`DFA minimization >> 1679: /[&*$@%]\{\^[A-Z]+\}/ `] = lit`
VnqFqPmJTvgWBXOTNWb+t+GtIJSQpJNlYVvDsKPflBQ=
`;

module.exports[n`DFA minimization >> 1680: /[&*$@%]\^[A-Z_]/ `] = lit`
tP4w2Zj7vUPrtWsxIH3cXXgBzuMeR6QY3BxV4yYKCWU=
`;

module.exports[n`DFA minimization >> 1681: /[&*$@%]#?(?=\{)/ `] = lit`
EuASvuwV4q5Zb37U1OusVpFcv/NudY3oQgAncA0Fc24=
`;

module.exports[n`DFA minimization >> 1682: /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/i `] = lit`
0fWGimG8uNW1jbKVvzwMjPrhaTMmVDNJAUaCo+cUcVE=
`;

module.exports[n`DFA minimization >> 1683: /[&*$@%]\d+/ `] = lit`
sO1qAoCXEPImost/QvZPullbQSY8MiZruz99KXAQK/s=
`;

module.exports[n`DFA minimization >> 1684: /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_\`{|}~]/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1685: /<(?![<=])\S*>|\b_\b/ `] = lit`
8cihx3Bp/9qJSUcwa1TCKH3HGmqG7O1O2DF5NIVRPqA=
`;

module.exports[n`DFA minimization >> 1686: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/ `] = lit`
GIFEELpSjwCmieV027SeFNx4ZVROmBkDPCFZwmSUhyk=
`;

module.exports[n`DFA minimization >> 1687: /sub [a-z0-9_]+/i `] = lit`
ZoyvQwWFSsKMwcFJkkfTRM/c9eEtbkKh8vPIkO/DF3A=
`;

module.exports[n`DFA minimization >> 1688: /(^\s*)=\w+[\s\S]*?=cut.*/m `] = lit`
ll/iiMwt3g4feudT2G5AY8rlaMXqlbBCu5rPwQ7qyOM=
`;

module.exports[n`DFA minimization >> 1689: /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1690: /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1/ `] = lit`
No10iu8UKB1bJDsPWUBdfUpwn+04EN86w3dfL0XV2ag=
`;

module.exports[n`DFA minimization >> 1691: /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/ `] = lit`
cXulw6C2q5WsLYUPbPKoUlJUYQy8SXi4CgADol7Br7w=
`;

module.exports[n`DFA minimization >> 1692: /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/ `] = lit`
a1iTtfVjVTfIfpvcUeR0gDFoHnhUSLrBezOeT2Z6hlM=
`;

module.exports[n`DFA minimization >> 1693: /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/ `] = lit`
iXBrRnDPuKbeMEE8nkNORU/UjeThXeoVS2rEaVtGPac=
`;

module.exports[n`DFA minimization >> 1694: /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/ `] = lit`
2d65ITLjQpwNr3tt92YP4367eKvvKsq/g2tUwdgMYmU=
`;

module.exports[n`DFA minimization >> 1695: /("|\`)(?:(?!\1)[^\\]|\\[\s\S])*\1/ `] = lit`
9kycROjFj4JsuGf2c8WFqFNu43gtONkNC3wbyMOgp78=
`;

module.exports[n`DFA minimization >> 1696: /'(?:[^'\\\r\n]|\\.)*'/ `] = lit`
tJehzulrEzsAjHy3PS5oK30Fm7MRSmb5799H1g0dc34=
`;

module.exports[n`DFA minimization >> 1697: /\b(?:m|qr)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1698: /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/ `] = lit`
8esIzt3+rAzmohFR8E1qu+8P9WvRRM8RX6uxnSqbbsw=
`;

module.exports[n`DFA minimization >> 1699: /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/ `] = lit`
1CEwWk227EpNOwT3iBwnL+JHApjh6GoFJy5LBaNVRWQ=
`;

module.exports[n`DFA minimization >> 1700: /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/ `] = lit`
A3hhooI4aH6JNNJMT8rSIVxXgOVaYRMmSnBar68CLLg=
`;

module.exports[n`DFA minimization >> 1701: /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/ `] = lit`
V21Qz+g1Jsr+PlPC/KQzoswoJtVDAAdJMBjR1Y10GKg=
`;

module.exports[n`DFA minimization >> 1702: /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/ `] = lit`
cz3yD6YDEqZ/mErM9awU8XmU3eGoTgELQKYS4vpUw3I=
`;

module.exports[n`DFA minimization >> 1703: /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1704: /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\... `] = lit`
EiOH7lWwWEBbqerCZfwJj2Q3S1DowFKjuVogNGiG8pk=
`;

module.exports[n`DFA minimization >> 1705: /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[ms... `] = lit`
sj0p8xvaAg/3KuFmxkHGY+kC56aOn4lmNcvuL0/+p5g=
`;

module.exports[n`DFA minimization >> 1706: /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[ms... `] = lit`
j+UiltmPTsbgtpA6CFEQ3QpBRGQzKL5Qk6jg26gu7yc=
`;

module.exports[n`DFA minimization >> 1707: /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][... `] = lit`
U1LJ2x+lzzy52LoxS0ALiIxxkteX3b5CUEdCz6Ygg3Q=
`;

module.exports[n`DFA minimization >> 1708: /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpo... `] = lit`
yWYdVDD+0Ut+615l35mJI9YNr5FPKuXy5qwfRwoq5Qo=
`;

module.exports[n`DFA minimization >> 1709: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:l... `] = lit`
MFQSyLkijIT201RFIMd2SIneLljXhsPhdvQDkTSlqqQ=
`;

module.exports[n`DFA minimization >> 1710: /sub/ `] = lit`
PlJNYm72Sdht2QqhLoyMcFXaLeG+H+FPth9FlNQuwsk=
`;

module.exports[n`DFA minimization >> 1711: /(@(?:global|param|property(?:-read|-write)?|var)\s+(?:(?:\b[a-zA-Z]\w*|[|\\[\]]... `] = lit`
GR1AkVvhV9gqZI6sbRtqtsCdrexeCQ2BHB4BxjUCfDE=
`;

module.exports[n`DFA minimization >> 1712: /(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|va... `] = lit`
KpsXa3QFdYyLjUn6mlUSIPkDKR+ZZNe3x9SFvY7294w=
`;

module.exports[n`DFA minimization >> 1713: /\b(?:callback|resource|boolean|integer|double|object|string|array|false|float|m... `] = lit`
6ohDCjoFA64dx5GaBppVi2ft9shKt8H3Yek2FyLCaUQ=
`;

module.exports[n`DFA minimization >> 1714: /[|\\[\]()]/ `] = lit`
OxbUpqP09bY+d++XDH/z+YfDhnfnQ+9cu3iKe54aR28=
`;

module.exports[n`DFA minimization >> 1715: /\$this\b/ `] = lit`
9t5b/K0IgqVKqy2pTCm2f+7WtL9PEw9h0JKkkiXH6RQ=
`;

module.exports[n`DFA minimization >> 1716: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POS... `] = lit`
U8oiyl1a5AeADOZyp750d0Cqa09ApGVvW2R7DdOBQ/0=
`;

module.exports[n`DFA minimization >> 1717: /\b[\w\\]+::/ `] = lit`
LfKnAXcTIGI3CwwbPGXHVUm+6sxVRaBqZw3hpr7S09g=
`;

module.exports[n`DFA minimization >> 1718: /static|self|parent/ `] = lit`
I+GGL37S4s1v3zsd3yRsZW2u+3eFnY9mcFzC5IxI7Us=
`;

module.exports[n`DFA minimization >> 1719: /::|\\/ `] = lit`
G19s2cBIUkN22SNJafScC9SV/FDbSjW5SEetT/6W1Ss=
`;

module.exports[n`DFA minimization >> 1720: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)... `] = lit`
HQJfy2nx/hotkl+7Evp06a0k8h+CJNOwS0dtJPXYfHE=
`;

module.exports[n`DFA minimization >> 1722: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i `] = lit`
7ZjccXe8oeT8+iIQOzzR34+uGYnlHhC3we7JWk7K0pM=
`;

module.exports[n`DFA minimization >> 1723: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|... `] = lit`
9XXKiVV2drG2WRbGVVh21toF1G7bUg0KtG8P6MUiPIU=
`;

module.exports[n`DFA minimization >> 1724: /[;[\]()\`,.]/ `] = lit`
LPPcPRcSpYOkAdCiDiz1dqEmyg4WPwkH2gYVOIkKWxs=
`;

module.exports[n`DFA minimization >> 1725: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/ `] = lit`
BwczitZlB+OdjiQetDELpYgvgJ5WMWxwZ8eKgvSvM24=
`;

module.exports[n`DFA minimization >> 1726: /@[\w.$]+/ `] = lit`
NLNS3KELBLojZrTLJdN0EKQDJTR9T1z3bCWN7dpS7Ws=
`;

module.exports[n`DFA minimization >> 1727: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/ `] = lit`
9hazWTcGrOoF6Jbrx1/KPNqe7v9Ks64Nultq5p01Hig=
`;

module.exports[n`DFA minimization >> 1729: /:=/ `] = lit`
rqspkmfhclDjP18gPpfITefAVT5FAYEcWvKTonb48pI=
`;

module.exports[n`DFA minimization >> 1730: /@(["'\`])(?:\\[\s\S]|(?!\1)[^\\])+\1/ `] = lit`
pqm5slEuNgRMVAhWjNHPDVq26KWqwp9NxfghjQYNWt4=
`;

module.exports[n`DFA minimization >> 1731: /\b(?:and|as|each|else|error|if|in|is|let|meta|not|nullable|optional|or|otherwis... `] = lit`
LH6dXKwxnZloKptNQCjAS06BNkvg4NnbwPfp7oLVkcI=
`;

module.exports[n`DFA minimization >> 1732: /[-+*\/&?@^]|<(?:=>?|>)?|>=?|=>?|\.\.\.?/ `] = lit`
lLyyNgVA8N5mAA0uaipRXZIvyMLOZcTSUn/dmiGJfpE=
`;

module.exports[n`DFA minimization >> 1733: /[,;\[\](){}]/ `] = lit`
0PFMHC+DvccriYdqAJ2Uo+HWzTlnMVJNLOnj6j/5ppM=
`;

module.exports[n`DFA minimization >> 1734: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:\/\/).*)/ `] = lit`
wUS0o3mGY+HZPdtDo83pRtR5j0PLaGdeSO/qphpEBow=
`;

module.exports[n`DFA minimization >> 1735: /#"(?:[^"\r\n]|"")*"(?!")/ `] = lit`
Mv12ofwsdT67VhVDq9R7uduBFRd6LzuCQwC4VzQ13so=
`;

module.exports[n`DFA minimization >> 1736: /\bDay\.(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/ `] = lit`
uBLrWT+bWbdYTl56q5YjwQt7rj3mDSaD7QgM+VE/MfA=
`;

module.exports[n`DFA minimization >> 1737: /\bTraceLevel\.(?:Critical|Error|Information|Verbose|Warning)\b/ `] = lit`
+0hpTtaZjRygIba2C/twXbhiCxLo726dbysWPBC6ul0=
`;

module.exports[n`DFA minimization >> 1738: /\bOccurrence\.(?:First|Last|All)\b/ `] = lit`
EoAAmqE6FdbrRWonEYwKphfad1MQYPaUNKobaDfUzlI=
`;

module.exports[n`DFA minimization >> 1739: /\bOrder\.(?:Ascending|Descending)\b/ `] = lit`
sFPfjtX81pmjN8HE8i5fHuLbCOXyGHvKKCvV9wDgzrY=
`;

module.exports[n`DFA minimization >> 1740: /\bRoundingMode\.(?:AwayFromZero|Down|ToEven|TowardZero|Up)\b/ `] = lit`
KQDmnbJ7yby5PnXOyBJ/NM4y+SgNd773tG2p0aBsE5A=
`;

module.exports[n`DFA minimization >> 1741: /\bMissingField\.(?:Error|Ignore|UseNull)\b/ `] = lit`
DoHmIK5VoIXgHJAUFFlWE54m6rxnQRUr2vTWOXCMSdk=
`;

module.exports[n`DFA minimization >> 1742: /\bQuoteStyle\.(?:Csv|None)\b/ `] = lit`
/tL8QGgiOvArEOYixI6mv1a/AGQLavL83QW7LLYrOdM=
`;

module.exports[n`DFA minimization >> 1743: /\bJoinKind\.(?:Inner|LeftOuter|RightOuter|FullOuter|LeftAnti|RightAnti)\b/ `] = lit`
ZOvhWuDWp2/327eEgqWFfhO38X0ZL0oT+LfloOCj0Io=
`;

module.exports[n`DFA minimization >> 1744: /\bGroupKind\.(?:Global|Local)\b/ `] = lit`
sW3MusMdYO+Ile+q9gXH3LQDrV3odBXWBKYOHSReEU0=
`;

module.exports[n`DFA minimization >> 1745: /\bExtraValues\.(?:List|Ignore|Error)\b/ `] = lit`
ITXVWsiNBLWUab4gIpwZ1YTAk2W89BazrPKYd3t8o/I=
`;

module.exports[n`DFA minimization >> 1746: /\bJoinAlgorithm\.(?:Dynamic|PairwiseHash|SortMerge|LeftHash|RightHash|LeftIndex... `] = lit`
4cO4/hmKWPWe2US+6phglE2AqwfFhFedCV/0qXokjTw=
`;

module.exports[n`DFA minimization >> 1747: /\bJoinSide\.(?:Left|Right)\b/ `] = lit`
0wUj+kIs2SOYgi0IDvbRB/GwehKQT7KyBhCLt4y9L+U=
`;

module.exports[n`DFA minimization >> 1748: /\bPrecision\.(?:Double|Decimal)\b/ `] = lit`
KAdYiTGe0SoccPTAdP8ia9lu7YgdI27scFOi6/nt4EQ=
`;

module.exports[n`DFA minimization >> 1749: /\bRelativePosition\.From(?:End|Start)\b/ `] = lit`
bzZjE6uGS0vKh0OGVnZIPXu7E1okMVtUskIiCz3ArGw=
`;

module.exports[n`DFA minimization >> 1750: /\bTextEncoding\.(?:Ascii|BigEndianUnicode|Unicode|Utf8|Utf16|Windows)\b/ `] = lit`
Dn739JDHbL7ZjdXeV2/sJeRwUeT7dEMwegU5ZhPKa7Q=
`;

module.exports[n`DFA minimization >> 1751: /\b(?:Any|Binary|Date|DateTime|DateTimeZone|Duration|Int8|Int16|Int32|Int64|Func... `] = lit`
i70j445wo8AOUzDkOdutY7W0J4+Iw4XmAEaKO7VU7BA=
`;

module.exports[n`DFA minimization >> 1752: /(^|[^#\w.])(?!\d)[\w.]+(?=\s*\()/ `] = lit`
ZECyCg4DH7qpzHDBHl30SJnhFKk1hTlFKcNRyY1kTNE=
`;

module.exports[n`DFA minimization >> 1753: /\b(?:any|anynonnull|binary|date|datetime|datetimezone|duration|function|list|lo... `] = lit`
Qw0VgvN6MuM9il0ub65Wu2zEnZTY6tW//P+hinJdypI=
`;

module.exports[n`DFA minimization >> 1754: /\b0x[\da-f]+\b|(?:[+-]?(?:\b\d+\.)?\b\d+|[+-]\.\d+|(^|[^.])\B\.\d+)(?:e[+-]?\d+... `] = lit`
luAsinf0aJlDCGXp4taNCHZpHtP8quS/e+jU/j+d25g=
`;

module.exports[n`DFA minimization >> 1755: /\[[a-z](?:\[(?:\[[^\]]*]|[^\[\]])*]|[^\[\]])*]/i `] = lit`
qEovOJdUjPDm7mjmK2LlDAOJ271XoRriR53I8kJ344k=
`;

module.exports[n`DFA minimization >> 1756: /\$(?:true|false)\b/i `] = lit`
E//V91qF9b2BYla43qLE+Ygk22c9aqxcJsImOo4IByI=
`;

module.exports[n`DFA minimization >> 1757: /\$\w+\b/ `] = lit`
RQJC+6hkWbDXNo5naUkdYhLDRPuqQa8CZNP/KrZmQto=
`;

module.exports[n`DFA minimization >> 1758: /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|E... `] = lit`
PQijYJC8YM8wFpIVekQVdWzkCTi2KljZ9ou6juc8fjc=
`;

module.exports[n`DFA minimization >> 1759: /[|{}[\];(),.]/ `] = lit`
D97cEBxPYQKYUsUuTqYgwRvzPdROP8fGCJfNCBIruck=
`;

module.exports[n`DFA minimization >> 1760: /\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Co... `] = lit`
g7DhbXPYgUX/Zj6uGtkFrn5vQ4jM2ixNJVfgLYWaagY=
`;

module.exports[n`DFA minimization >> 1761: /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir... `] = lit`
Vdj+s15q4M5WXu6f/kmqIy4EuqMl7fN3nuEGuDAQsZs=
`;

module.exports[n`DFA minimization >> 1762: /(\W?)(?:!|-(?:eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match... `] = lit`
Bof+WVytnrgP5WXNVhuGtLyQiFqvgM0IvMVGLgZZ7Fs=
`;

module.exports[n`DFA minimization >> 1763: /(^|[^\`])<#[\s\S]*?#>/ `] = lit`
hdg5m+Ols8Xm7d6wlY62EU6jz4rwDucq/VIee12Kpmc=
`;

module.exports[n`DFA minimization >> 1764: /(^|[^\`])#.*/ `] = lit`
duEdRjLR2gyxzWie15olCez4NjaqcPrc6PLbbkLwVtc=
`;

module.exports[n`DFA minimization >> 1765: /"(?:\`[\s\S]|[^\`"])*"/ `] = lit`
5K1zuabjw2m7G26IUIfT6WOvVjaf13esyEJkyxT84GI=
`;

module.exports[n`DFA minimization >> 1766: /'(?:[^']|'')*'/ `] = lit`
OSHWhWgHeo4xD+CoR/FNrMLmUKeazUVBJgQHJPZvv5Y=
`;

module.exports[n`DFA minimization >> 1767: /(^|[^\`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/ `] = lit`
tHu8TSUcGQcZpDbVWlwZeNKwTIDPMmj8byDBfKuqwnw=
`;

module.exports[n`DFA minimization >> 1768: /\b(?:break|catch|case|class|continue|default|else|extends|final|for|if|implemen... `] = lit`
tpCxS8WhplbJcHTUJgjGazkLOGKfyXkv8OUSmJdVUwE=
`;

module.exports[n`DFA minimization >> 1769: /\b(?!XML\b)[A-Z][A-Z\d_]+\b/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1770: /<[<=]?|>[>=]?|&&?|\|\|?|[%?]|[!=+\-*\/]=?/ `] = lit`
ymqkjl0KbapHlqWg//+ViscrHSweNCg4N6A6dvpK+E4=
`;

module.exports[n`DFA minimization >> 1771: /\b(?:boolean|byte|char|color|double|float|int|XML|[A-Z]\w*)\b/ `] = lit`
F01G5LORFrF39YuOJI5sks3/ohxM3RbnbWP6bFLrF+Q=
`;

module.exports[n`DFA minimization >> 1772: /\b(?:fx|fy|xf[xy]?|yfx?)\b/ `] = lit`
wFNyqaXlH/lkU96PaQ5NmgNs/FtlbrWGcat/jGDSI6U=
`;

module.exports[n`DFA minimization >> 1773: /\b[A-Z_]\w*/ `] = lit`
mJJ3BOz91xlfDCaiJjjvPdLtxESZWyAony2UmbEreaw=
`;

module.exports[n`DFA minimization >> 1774: /\b[a-z]\w*(?:(?=\()|\/\d+)/ `] = lit`
cVwzqbgV8Iy84TPtdwbKdFQfZDTQfVcodT9xksbamcs=
`;

module.exports[n`DFA minimization >> 1775: /\b\d+\.?\d*/ `] = lit`
M+D1xPQWkcPMzj23cvNzSSPvUPLjERydOQWizRQATHU=
`;

module.exports[n`DFA minimization >> 1776: /[:\\=><\-?*@\/;+^|!$.]+|\b(?:is|mod|not|xor)\b/ `] = lit`
j20PnK3hyM5r5bxRYH0x/5f/nIGs4M03GkVxzlzA40U=
`;

module.exports[n`DFA minimization >> 1777: /[(){}\[\],]/ `] = lit`
iglKt0sw55oGX36OeEv6h6ML3VYcy2o/r8eRjdtkOhE=
`;

module.exports[n`DFA minimization >> 1778: /(["'])(?:\1\1|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/ `] = lit`
LIrjeC/TEc9//DKTEVXoUhLS3BGBvzy3w8/sKTtRrwM=
`;

module.exports[n`DFA minimization >> 1779: /^[ \t]*[#!].*$/m `] = lit`
JQHYZPuwOFCDgegdGv0ZRAq26vMxrkHyOeb07t+6J7M=
`;

module.exports[n`DFA minimization >> 1780: /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?= *[=:] *| )/m `] = lit`
YB7hIQUoVcBW+ijqTrLVzzMrgQxNNIRuWL1Et9hAT5k=
`;

module.exports[n`DFA minimization >> 1781: /[=:]/ `] = lit`
c6C5h5UUVujI79/PUNroJnVWJh5I4E/fqDkr6E77lt8=
`;

module.exports[n`DFA minimization >> 1782: /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?: *[=:] *| ))(?:\\(?:\r\n|[\s\S])|[^... `] = lit`
MLewVfRWMBzZF0FT4ldH+8aWE23dDkMknQ1vZgg7FYI=
`;

module.exports[n`DFA minimization >> 1783: /\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1784: /\b(?:double|float|[su]?int(?:32|64)|s?fixed(?:32|64)|bool|string|bytes)\b/ `] = lit`
wSZFc7e6fvKEKyRhg0UaCZ1bKVOs1tvcmGuutmpvHhg=
`;

module.exports[n`DFA minimization >> 1785: /\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[a-z_]\w*\s*[=;])/i `] = lit`
Q4T7YcwULPn6Q0AM1yiuOLZ/nUWrAYzAch2IjIMK/qM=
`;

module.exports[n`DFA minimization >> 1786: /(?:\b|\B\.)[a-z_]\w*(?:\.[a-z_]\w*)*(?=\s+[a-z_]\w*\s*[=;])/i `] = lit`
2t5U4Z8nUpqlsMfOqzBB29k8hdi3EuqLd3rL5LXjvrA=
`;

module.exports[n`DFA minimization >> 1787: /(\[\s*)[a-z_]\w*(?=\s*=)/i `] = lit`
TVFo5ZKB18y44Z/dDzlBN8VFJQxScf9k8zzQ1BD7lpw=
`;

module.exports[n`DFA minimization >> 1788: /(\b(?:enum|extend|message|service)\s+)[A-Za-z_]\w*(?=\s*\{)/ `] = lit`
EK/wo9Tvc8VjzrkTud92tzH0EGTCTUzmt+JwUOPGIY4=
`;

module.exports[n`DFA minimization >> 1789: /(\b(?:rpc\s+\w+|returns)\s*\(\s*(?:stream\s+)?)\.?[A-Za-z_]\w*(?:\.[A-Za-z_]\w*... `] = lit`
hF0V3kZYdcjCbCl73y2QbdQtmdeAnpJnk4XAitab5Wg=
`;

module.exports[n`DFA minimization >> 1790: /[<>.,]/ `] = lit`
x+Na3pzalo4FC5Bnzc78p7M1CJIWgX1Y5DDCfxuu+bY=
`;

module.exports[n`DFA minimization >> 1791: /[.\-!=|]+/ `] = lit`
cJrKFQGby14FbwVK6CKKasUnYEpnnD9iKHbAXpUnAQs=
`;

module.exports[n`DFA minimization >> 1792: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m `] = lit`
+3PWUKleFm+R8gzMjiGeLiPAfdf3ZUx6S22ku/uZGAU=
`;

module.exports[n`DFA minimization >> 1793: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1794: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1795: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1796: /(^[\t ]*)<.+/m `] = lit`
KcEAST+TElFWukZ2kDmswCHa/OvbSWWScFTfh1rllro=
`;

module.exports[n`DFA minimization >> 1797: /((?:^|\n)[\t ]*)doctype(?: .+)?/ `] = lit`
L+8bAzkfdkWkZ6/DyWM4IvkOz/UvDUZWK9QuyfzSGSs=
`;

module.exports[n`DFA minimization >> 1798: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m `] = lit`
kVH32+iWfQQwpxKAsgzDGH3Qf7iajdlJz2119DITH6A=
`;

module.exports[n`DFA minimization >> 1799: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m `] = lit`
rMZnqvEQEhKdG8rbVqSeI2QvGQ07BVNE6AYzu4Qg26c=
`;

module.exports[n`DFA minimization >> 1800: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m `] = lit`
TZyiBlkiiNWUUzTtC2wDMPbt8JFP30pI85qHTEWGS74=
`;

module.exports[n`DFA minimization >> 1801: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m `] = lit`
bVzEZAxIoZuH28Un6gKoHN04E46bx9+BZjb1HRS0/iY=
`;

module.exports[n`DFA minimization >> 1802: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m `] = lit`
m8kALa5WPcZ0WxaN0l4if3antMjiKSAKT3tmWZt2yxA=
`;

module.exports[n`DFA minimization >> 1803: /(^[\t ]*)mixin .+/m `] = lit`
6ugO8OGtZrw7whmhUY1ygJH2S+eG1xAGWSHDTRHMCqs=
`;

module.exports[n`DFA minimization >> 1804: /(^[\t ]*)\+.+/m `] = lit`
vx1yRLnh3AmsYMecwejbSmL7k6vzHp3P4+4QCVLrDxE=
`;

module.exports[n`DFA minimization >> 1805: /#[\w\-]+/ `] = lit`
mR+VyCZsnA9ZGh1nhBNBKl625SxeVRh8WsVtxvnrga4=
`;

module.exports[n`DFA minimization >> 1806: /\.[\w\-]+/ `] = lit`
L7ZR/nSSNBrPHNw7jJkFgRVczgi/4KxjuGnXJLKvPYQ=
`;

module.exports[n`DFA minimization >> 1807: /(^[\t ]*(?:-|!?=)).+/m `] = lit`
lWleHBHc4nQljVAQquSy63lZL42kHPQd4xHOa+kU21E=
`;

module.exports[n`DFA minimization >> 1808: /^each .+? in\b/ `] = lit`
GwHizM2alcMjdKVlPxUUUULn1Zc+zqj+Odkzt6igtgE=
`;

module.exports[n`DFA minimization >> 1809: /^(?:if|unless|else|case|when|default|while)\b/ `] = lit`
UwLH0K1xfZFCrdNx/gPMLElX+oBRtH+w2MirlxdCHSg=
`;

module.exports[n`DFA minimization >> 1810: /^mixin/ `] = lit`
QcK61mGDGFlXyPs3StrcqOFBhLlgcreVkF3lOvACwgk=
`;

module.exports[n`DFA minimization >> 1811: /\w+(?=\s*\(|\s*$)/ `] = lit`
THuOiM+siVV4G/1MAGc8Uz6/r1pKYVjdRSd3UsqjnL0=
`;

module.exports[n`DFA minimization >> 1812: /[(),.]/ `] = lit`
u1Sz7nz4vMrqxaMQRV31FvX/WSp9PWFE8qcoMYbbCkc=
`;

module.exports[n`DFA minimization >> 1813: /\b(?:each|in)\b/ `] = lit`
1i3G1QN8mpRYEIXPdotTbBpIk65SFj8HFiXoOngndmQ=
`;

module.exports[n`DFA minimization >> 1814: /^\+\w+/ `] = lit`
2TRocn+miMBf6jWiLCnXJChzluiGVj56g0Jli5N6mio=
`;

module.exports[n`DFA minimization >> 1815: /&[^(]+\([^)]+\)/ `] = lit`
DUYC1o3EHv9nLVvDJV0VvO4sexsEp1arzesPIyjXn3w=
`;

module.exports[n`DFA minimization >> 1816: /[\w-]+(?=\s*!?=|\s*[,)])/ `] = lit`
9k9b6vALgQ67m+z0gV7j16Rv9RGWOFuXyaW7eX2L5o8=
`;

module.exports[n`DFA minimization >> 1817: /[!=(),]+/ `] = lit`
UmmrRJXuICUiNXmDpUqGJeDcqxwKPjZTHQDI2hap6uk=
`;

module.exports[n`DFA minimization >> 1818: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/ `] = lit`
5MQN1TVdmyDaWqC2UXKYb4J9IPtiGlKz/7tfKNyy5v8=
`;

module.exports[n`DFA minimization >> 1819: /[{}()\[\];:.]/ `] = lit`
Yk8+vEwAndw3gD0UE+yb+k1flN99PkxnfkAOmVNTfh4=
`;

module.exports[n`DFA minimization >> 1820: /\{#[\s\S]*?#\}/ `] = lit`
oqcZ1KoYTlvK9MH9OVIoA0w75xQk2Bg3xcsr1OAq0vY=
`;

module.exports[n`DFA minimization >> 1821: /(^\s*)@.+/m `] = lit`
bt8lWzLmG2x2PQQnGA+1cLo7my+Q5dIPYAGFYoYAIhQ=
`;

module.exports[n`DFA minimization >> 1822: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m `] = lit`
qtRFdUDGBcoHQzrzrzHkAWEo/9ZsojhcPWwnLqnjlRk=
`;

module.exports[n`DFA minimization >> 1823: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m `] = lit`
uWkIScfTXOgvuZjBJmPHbjuR9dqCBU/gwpqjv0ljVNU=
`;

module.exports[n`DFA minimization >> 1824: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r... `] = lit`
4MFXZ+1RJoxaJpI36WRtNjoco1y75ujeZMMnyS7tq/4=
`;

module.exports[n`DFA minimization >> 1825: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(... `] = lit`
wZBFYEbqv0guodlOu83OLQ8AVu0MSlGYj+//0nrd/Rg=
`;

module.exports[n`DFA minimization >> 1826: /[\w-]+\([^)]*\).*/ `] = lit`
BU7dhhQfIGiCMojIzfGEMVlMYO0Sz1sD/RExRN627Dw=
`;

module.exports[n`DFA minimization >> 1827: /\{[^\r\n}:]+\}/ `] = lit`
fhj19TqLy3IcOe7Az8QtQRAJYFn5xSm7xLw6idyQovQ=
`;

module.exports[n`DFA minimization >> 1828: /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/ `] = lit`
s2vDELNWGahHIXx2KJ+sWIIGK9dm7L2mQQopEGSr/YM=
`;

module.exports[n`DFA minimization >> 1829: /(^([\t ]*)):atpl(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1830: /(^([\t ]*)):coffee(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1831: /(^([\t ]*)):ejs(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1832: /(^([\t ]*)):handlebars(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1833: /(^([\t ]*)):less(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1834: /(^([\t ]*)):livescript(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1835: /(^([\t ]*)):markdown(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1836: /(^([\t ]*)):sass(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1837: /(^([\t ]*)):stylus(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1838: /^\S+/ `] = lit`
hPej3e0ijHrkLuZr6FXN8D5fiIMQPnfHQNNZZ50/hwg=
`;

module.exports[n`DFA minimization >> 1839: /^[^(]+/ `] = lit`
KG+Wnx5pViN+s+dXrls8teAnuZF8XF+cXekSIQc/PLQ=
`;

module.exports[n`DFA minimization >> 1840: /\b(?:even|if|odd)\b/ `] = lit`
qUSDpo9aA5Omio3X5N0if4EOiguWokF3QfAkLFTIKOs=
`;

module.exports[n`DFA minimization >> 1841: /\b(?:true|false|null)\b/ `] = lit`
Mae4Qu+dZcrgYs2Oz2E8YNID9zsiOwo03A1FnlotfjA=
`;

module.exports[n`DFA minimization >> 1842: /\b0x[\dA-Fa-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+)?/ `] = lit`
kfKOfFOyjgCBZmC5DIDn4XQk7E3TUUr0MOS1oxqTO9c=
`;

module.exports[n`DFA minimization >> 1843: /\b[a-zA-Z_]\w*\b/ `] = lit`
y9c0YdbMlRuhocalMZzZ/d9rzWu4akQXSoO7HHk2UjU=
`;

module.exports[n`DFA minimization >> 1844: /[()\[\]{}:.,]/ `] = lit`
JN/fCHc79rY3Es/Q+sH2dz76lJv4HXs1LkjcFwcPQpU=
`;

module.exports[n`DFA minimization >> 1845: /\B!(?:important|optional)\b/i `] = lit`
oMdNFx33caaB/naWXN6OsfPxkNGq9+AJ6Tqn/o1xzYI=
`;

module.exports[n`DFA minimization >> 1846: /#[\da-f]{3,6}/i `] = lit`
8mrnsbboC8MNW7ZRgrefjKQ2bJXdAO4+tTb5SggPofI=
`;

module.exports[n`DFA minimization >> 1847: /[{}()\[\];:,]/ `] = lit`
BcW2jl+LTpQFuWdxPnJQkKHX9Z0/VP8e3uhZR2e8e2Y=
`;

module.exports[n`DFA minimization >> 1848: /^[^\s:]+/ `] = lit`
bBDgluSfEDNOp6ST9vwqpPyYA9EogXZBS8tqJdZfeAY=
`;

module.exports[n`DFA minimization >> 1849: /^{|}$/ `] = lit`
W4AY52cBoSQcGVz0+lDanHZsFAo9JSCbKL809xmRCVc=
`;

module.exports[n`DFA minimization >> 1850: /^(?:\{\{-?|\{%-?\s*\w+)/ `] = lit`
Qm4mGcXp4YwGkC2l3y+hSEcXX+jo7HvD58wganCAZDs=
`;

module.exports[n`DFA minimization >> 1851: /-?(?:%\}|\}\})$/ `] = lit`
sq4MIJpas+xzAExMlX7Gt/Dgg58HiBm2D5ad0JLmHXI=
`;

module.exports[n`DFA minimization >> 1852: /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/ `] = lit`
OntV19dDLTive5kwH1dg69ugveR2JwTX3anXF8FlLKc=
`;

module.exports[n`DFA minimization >> 1853: /url\((["']?).*?\1\)/i `] = lit`
n7XCNtAxDgcVc3+esWMes/N7+k2tdAuy1gZ/ocgppRU=
`;

module.exports[n`DFA minimization >> 1854: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/ `] = lit`
/M8mhyDCIy+aGG42Pg7i9ZYDxyZbJWJc9KKQrxlfv+w=
`;

module.exports[n`DFA minimization >> 1855: /(\b\d+)(?:%|[a-z]+)/ `] = lit`
cx0XFq2coUgpGBsZRYPRgynPpRF1mrDcATDagqEMRT0=
`;

module.exports[n`DFA minimization >> 1856: /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| define... `] = lit`
OL9wvncePszHWTAKxsVI7k6ZHPjTbMTONnGP8EV7R4A=
`;

module.exports[n`DFA minimization >> 1857: /^(?:\{\{|\{%)-?/ `] = lit`
mNHnaSBae5MPYJp4MIhTBup0J+bC5gv27KEl2tZ3ncE=
`;

module.exports[n`DFA minimization >> 1858: /^['"]|['"]$/ `] = lit`
g6McrMH9hSG6PDcxY+s6WbLo0aQlCWFBNZyiHnazkFc=
`;

module.exports[n`DFA minimization >> 1859: /(\s)(?:and|b-and|b-xor|b-or|ends with|in|is|matches|not|or|same as|starts with)... `] = lit`
EwJo+ZGB2OKw+TVu1DWLmbupD/fs5e6ZgUJaBxHRz+s=
`;

module.exports[n`DFA minimization >> 1860: /(?:\w+|\*)(?=\s*=>)/ `] = lit`
c7Sl0t8Om0RJDOV4ycGexXIGh3zySh0lr95lAkfBp4s=
`;

module.exports[n`DFA minimization >> 1861: /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?(?:e-?\d+)?)\b/i `] = lit`
3x1vwFqbCOmOMTJQ2RYd+GklMdDdXsPnWTQxdZzPczs=
`;

module.exports[n`DFA minimization >> 1862: /\b(?:application|attr|case|class|consumes|default|define|else|elsif|function|if... `] = lit`
28i2VWQent/9awmorcXGwhFxLSIpfdjFKPdm7Yy3wFY=
`;

module.exports[n`DFA minimization >> 1863: /=[=~>]?|![=~]?|<(?:<\|?|[=~|-])?|>[>=]?|->?|~>|\|>?>?|[*\/%+?]|\b(?:and|in|or)\... `] = lit`
zpc+i5CV+GccvnMg6idqPWicChf9lFPLwV8kXsnP9S4=
`;

module.exports[n`DFA minimization >> 1864: /[\[\]{}().,;]|:+/ `] = lit`
W1uBieguVLapdL5040RWdpH5leudRwbz+RaI01uMXA8=
`;

module.exports[n`DFA minimization >> 1865: /((?:\bnode\s+|[~=\(\[\{,]\s*|[=+]>\s*|^\s*))\/(?:[^\/\\]|\\[\s\S])+\/(?:[imx]+\... `] = lit`
46BGTBXl9rQrtw1YJw2u7f3Ro+/oPuBQT2UTbJgIYo8=
`;

module.exports[n`DFA minimization >> 1866: /(["'])(?:\$\{(?:[^'"}]|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}|(?!\1)[^\\]|\\[\s\... `] = lit`
Sk4ljhyaSrpu9HEPwZR1ILUTuQCZTZ7Ox/ABj11O5U8=
`;

module.exports[n`DFA minimization >> 1867: /\$(?:::)?\w+(?:::\w+)*/ `] = lit`
e75+c/ojlBEzvsaIXP7wX86Oj3DdYiagAczp+JxYd0s=
`;

module.exports[n`DFA minimization >> 1868: /\b(?:contain|debug|err|fail|include|info|notice|realize|require|tag|warning)\b|... `] = lit`
9VIPW0Sr3mpNtS2nIl70YfZyPNuet9fGh0gzZnLaR1E=
`;

module.exports[n`DFA minimization >> 1869: /\b(?:Any|Array|Boolean|Callable|Catalogentry|Class|Collection|Data|Default|Enum... `] = lit`
6b/reH0QFD3k2o7Vub6oHrBSrWPuvlaULlKA2VHgeGg=
`;

module.exports[n`DFA minimization >> 1870: /(@\("([^"\r\n\/):]+)"(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r))*?[ \t... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1871: /(@\(([^"\r\n\/):]+)(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r))*?[ \t]*... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1872: /@\("?(?:[^"\r\n\/):]+)"?(?:\/[nrts$uL]*)?\)/ `] = lit`
Em9KaZ6SDOgI2viWwDNB+38OtMfLmaERqYOdHx9CvQ4=
`;

module.exports[n`DFA minimization >> 1873: /::/ `] = lit`
an1yT/lHhXWdaUAa+TzXEckIV45dQ+zUDYmZLMewQQU=
`;

module.exports[n`DFA minimization >> 1874: /(\.)(?!\d)\w+/ `] = lit`
4ECgLJYUhglw2904kO/VhoYlcMdLb26Kvia9YUst4fo=
`;

module.exports[n`DFA minimization >> 1875: /(?=\S).*\S(?= *$)/ `] = lit`
fqRLozyGIJhOZXF3a9BMaF3rsLQInwuiYJFoH94ZfWI=
`;

module.exports[n`DFA minimization >> 1876: /^\/(?:[^\/\\]|\\[\s\S])+\/[im]*x[im]*$/ `] = lit`
Rj3x6ESPNogFTT1OhoD08bSnau2myke/rn3AwRNx28U=
`;

module.exports[n`DFA minimization >> 1877: /^"[\s\S]*"$/ `] = lit`
tewT8ZB5XpVjrHrcQcRUeKo7ARZCLcJRXm7zuwDot/8=
`;

module.exports[n`DFA minimization >> 1878: /(\().+?(?=\))/ `] = lit`
sCV6GQfN+1k164UZLH/dJ0xZluyTAm2OYaPEFRUlEXA=
`;

module.exports[n`DFA minimization >> 1879: /(^|[^\\])\$\{(?:[^'"{}]|\{[^}]*\}|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}/ `] = lit`
hogxl+fJfaqEmxDsdwex2jDbBN82a7uaqKbWSSJ7svs=
`;

module.exports[n`DFA minimization >> 1880: /(^|[^\\])\$(?:::)?\w+(?:::\w+)*/ `] = lit`
rTbr8OFEBUEziwWIrxVKicK3uEqB5ZwbOP/oThUMsoA=
`;

module.exports[n`DFA minimization >> 1881: /(^\$\{)(?!\w+\()(?:::)?\w+(?:::\w+)*/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1882: /^\$/ `] = lit`
h+83OPIyGjau4l311cB3um/sp043OT4wA/3xoZDgxGE=
`;

module.exports[n`DFA minimization >> 1883: /\b(?:ans|break|bt|case|catch|cd|clear|const|def|del|dump|else|end|exit|extern|f... `] = lit`
XBmbJ9iqiyt1YsbbWqb1JWeyGIcDRDmLFwqhHD1cP6k=
`;

module.exports[n`DFA minimization >> 1885: /(?:[!"#$%&'*+,\-.\/:<=>?@\\^\`|~\u00a1-\u00bf\u00d7-\u00f7\u20d0-\u2bff]|\b_+\b)... `] = lit`
9VUpcYVETFoHd2rg78bgo/vBMpA5Kqn2PhXAvhV4miQ=
`;

module.exports[n`DFA minimization >> 1886: /[(){}\[\];,|]/ `] = lit`
pMNVrK47diNgCkuYavdj8E2Wl/9cNxI9FJliJTi+E08=
`;

module.exports[n`DFA minimization >> 1887: /%<[\s\S]+?%>/ `] = lit`
uhzg1WpSUY22h7gk94u3Hm6pgvv5a8mTQZTGn+OWO4A=
`;

module.exports[n`DFA minimization >> 1888: /((?:\.\.)?)(?:\b(?:inf|nan)\b|\b0x[\da-f]+|(?:\b(?:0b)?\d+(?:\.\d)?|\B\.\d)\d*(... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1889: /\b__[a-z]+__\b/i `] = lit`
Lv7wLJGjwn+L4JXaxE0lzrGoo2O64hK55hzeQqwVTIc=
`;

module.exports[n`DFA minimization >> 1890: /(^%< *)-\*-.+?-\*-/ `] = lit`
lWp8/0meoIwCIoapp0N/9RJdHJHplsWhp9OPiHQnSeA=
`;

module.exports[n`DFA minimization >> 1891: /^%<.*|%>$/ `] = lit`
azlYPVI6przdFFt4EOMbzVkhzmNEQyTYnmlt+YZwlxA=
`;

module.exports[n`DFA minimization >> 1892: /%< *-\*- *c\d* *-\*-[\s\S]+?%>/i `] = lit`
HFJhGl6Y1iFIEj1axqPwEg4Gdg1GkYAFQem7fweOJQA=
`;

module.exports[n`DFA minimization >> 1893: /%< *-\*- *c\+\+\d* *-\*-[\s\S]+?%>/i `] = lit`
3JxVxnbUUC9usPWRH0I6FQgUwD48lxtRFw3GlOY/dlw=
`;

module.exports[n`DFA minimization >> 1894: /%< *-\*- *fortran\d* *-\*-[\s\S]+?%>/i `] = lit`
D73Z0RwN1Ew4U5kZ5wu5Eq7vu/7bskvtnd4P64GzXIQ=
`;

module.exports[n`DFA minimization >> 1895: /\b(?:declarecdll|declaredll|compilerselect|compilercase|compilerdefault|compile... `] = lit`
CW4BeCdPFxvv5zY6TxV5kfAJg58fGfk4RBNMnOQtcWE=
`;

module.exports[n`DFA minimization >> 1896: /\b\w+(?:\.\w+)?\s*(?=\()/ `] = lit`
RM81t7YXIDlevUqEiecwwpwMWFhKr4IabtLuBXP7A3I=
`;

module.exports[n`DFA minimization >> 1897: /(?:\$[\da-f]+|\b-?\d*\.?\d+(?:e[+-]?\d+)?)\b/i `] = lit`
a4l4VxNpeQqZ4fiKHWKVE5uQ+1TgbBCOpWZM0d0QTso=
`;

module.exports[n`DFA minimization >> 1898: /(?:@\*?|\?|\*)\w+|-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*\/@]/ `] = lit`
GIXQZ7zNK40pz+oXqLZBYOLKXD2VIpRr1oWo1tZVzMU=
`;

module.exports[n`DFA minimization >> 1899: /(^\s*)!.*/m `] = lit`
k3hJaO/bjeoVMB1V8gS2lYYcJ2HSigd4wyXvj7OfTEI=
`;

module.exports[n`DFA minimization >> 1900: /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp... `] = lit`
LJ0cRz5jJhra4O4VLzAOB992bFn3XNg7pTB2GDFp7/s=
`;

module.exports[n`DFA minimization >> 1901: /(?:\b|-|(?=\$))(?:0[hx][\da-f]*\.?[\da-f]+(?:p[+-]?\d+)?|\d[\da-f]+[hx]|\$\d[\d... `] = lit`
gUzCYnljPlrb88uo3aR8mmmbuiks0SOpMF+XevwvtrQ=
`;

module.exports[n`DFA minimization >> 1902: /[\[\]*+\-\/%<>=&|$!,.:]/ `] = lit`
UnmdV9KFgMXPg7BN9zG1vDeWNueQSNFAyFbDdZA+d2Y=
`;

module.exports[n`DFA minimization >> 1903: /(\s*!\s*j[a-z]+\s+)@[fb]/i `] = lit`
/DesWAbZowdqvtqnKrHsIwMvJfW8bfHN7p5fnap/zcc=
`;

module.exports[n`DFA minimization >> 1904: /(\s*!\s*j[a-z]+\s+)[A-Z._?$@][\w.?$@~#]*/i `] = lit`
F+l61W4kMHTMRy4mkqEgxWcr6YPeN4i7zHxkPx0EOj8=
`;

module.exports[n`DFA minimization >> 1905: /^(\s*!\s*)[\da-z]+(?=\s|$)/im `] = lit`
OY58JBRUhtUkVDGUPVJUWSwlPoN94L7orXEQyaGr6Zk=
`;

module.exports[n`DFA minimization >> 1906: /(\s*:\s*)[\da-z]+(?=\s)/i `] = lit`
swfj2DU95virchiWUiDR0AgG3rCq4CWYb9S02/YAm7c=
`;

module.exports[n`DFA minimization >> 1907: /^(\s*!\s*)[A-Za-z._?$@][\w.?$@~#]*(?=:)/m `] = lit`
HQzO7+JkOtxD6cyCTlMDnvf3yeVKHwUd1PzTAgJbylk=
`;

module.exports[n`DFA minimization >> 1908: /(?:extern|extern|global)[^;\r\n]*/i `] = lit`
oYYstLe6b7wvzpjdNclO9PPLXsRTgj9Qeei2ZjOHH8c=
`;

module.exports[n`DFA minimization >> 1909: /(?:CPU|FLOAT|DEFAULT).*/ `] = lit`
EOmnSH7xz1ZXzpeTjlxtzzLLttNkNf7Dp4NzNhb6Sdg=
`;

module.exports[n`DFA minimization >> 1910: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|ex... `] = lit`
V4I8DxEg9aWQWpCi6l5PfWJKQ6YyTUjmLpJPH6ezmws=
`;

module.exports[n`DFA minimization >> 1911: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|by... `] = lit`
2BkJN31sVyfbUg/r1wJX6Ta8h3fC1qJh6Td/oWW6iqc=
`;

module.exports[n`DFA minimization >> 1912: /\b(?:True|False|None)\b/ `] = lit`
NwoesIFPP0rKBrdbgUGCtYAehw+vCGWuQmS2xfJErDg=
`;

module.exports[n`DFA minimization >> 1913: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1914: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/ `] = lit`
XF90SeHc4i7yRHQPxG+dmqFWNtUqY/6++OU+F8ZGZDY=
`;

module.exports[n`DFA minimization >> 1915: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i `] = lit`
w3EQyoHAkTChP/95vtpGvHAReO2klIOfgHyViwNsyMo=
`;

module.exports[n`DFA minimization >> 1916: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i `] = lit`
R1nZBC4kY7/qlH0NRrums2zTTQ397IAVejGeYwavcas=
`;

module.exports[n`DFA minimization >> 1917: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i `] = lit`
a3lJD5sws/RUKkZXfjkiqsDvdEA2AFFRPC2xRKOpupc=
`;

module.exports[n`DFA minimization >> 1918: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g `] = lit`
IlSwaRtcpu++jAGPxSJdXZhVXemc8pgr6ti4HF1GZ+Y=
`;

module.exports[n`DFA minimization >> 1919: /(\bclass\s+)\w+/i `] = lit`
rNowu+fBkCNpIvi5dqboEWJ3m+oyUIaC4IVR3i1jYbQ=
`;

module.exports[n`DFA minimization >> 1920: /(^\s*)@\w+(?:\.\w+)*/im `] = lit`
sqr56HTdHgoJ/sQhT+y2ax6kM2tyRi6B8gkVzm/sE6Q=
`;

module.exports[n`DFA minimization >> 1921: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/ `] = lit`
gxRbzUVb/fAz1CidUf7pGYndAL7DNKVGevDCzF6iu6Q=
`;

module.exports[n`DFA minimization >> 1922: /(:)[^:(){}]+(?=}$)/ `] = lit`
5MD/ieK6BtC2n/UqsQc7yE2WAVrsbV5OE8rZmm/BY3c=
`;

module.exports[n`DFA minimization >> 1923: /![sra](?=[:}]$)/ `] = lit`
2unXd7U+ZuhQDJZ/oASDande0FT2hlmd80lpBoepfcg=
`;

module.exports[n`DFA minimization >> 1924: /\`(?::\S+|[\w.]*)/ `] = lit`
Pbzczg2ik9IXaz4QDYirbJiZX4EhguTP5qqDj2RHuXk=
`;

module.exports[n`DFA minimization >> 1925: /\b(?![01]:)(?:0[wn]|0W[hj]?|0N[hje]?|0x[\da-fA-F]+|\d+\.?\d*(?:e[+-]?\d+)?[hjfe... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1926: /\\\w+\b|\b(?:abs|acos|aj0?|all|and|any|asc|asin|asof|atan|attr|avgs?|binr?|by|c... `] = lit`
hXepCC+QcWW4N+yWzgLI02kkZ0BMwyW5fYLVgh6JcsQ=
`;

module.exports[n`DFA minimization >> 1927: /[(){}\[\];.]/ `] = lit`
uxRdPKcHfsjKpUcWGIFEBSQlX2f5vjCSaE7LdGfZjoM=
`;

module.exports[n`DFA minimization >> 1928: /0N[mdzuvt]|0W[dtz]|\d{4}\.\d\d(?:m|\.\d\d(?:T(?:\d\d(?::\d\d(?::\d\d(?:[.:]\d\d... `] = lit`
zy/po6rfJqvRjDOfOakCoQY4e9gpFRbYe2eliqe9yDI=
`;

module.exports[n`DFA minimization >> 1929: /['\/\\]:?|\beach\b/ `] = lit`
Kjz0/L/EAwViZc4Mt4L8ykPZ4WJb/I8j6t0MoBa+6qA=
`;

module.exports[n`DFA minimization >> 1930: /(?:\B\.\B|\b[01]:|<[=>]?|>=?|[:+\-*%,!?~=|$&#@^]):?|\b_\b:?/ `] = lit`
YVc/tjtXs/jgJ5KOCm6XLPALvVE5jgB7WHPONgOt3f8=
`;

module.exports[n`DFA minimization >> 1931: /([\t )\]}])\/.*/ `] = lit`
uJQD26J2z7C13kEfLICn7swbKBXFCgM+eiNJ0u2iThk=
`;

module.exports[n`DFA minimization >> 1932: /(^|\r?\n|\r)\/[\t ]*(?:(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?(?:\\(?=[\t ]*(?:\r?\n|\... `] = lit`
OZ4t2F0RdJUDA+8CtEzPho3mrVu8OHq06ROmLjpA6V8=
`;

module.exports[n`DFA minimization >> 1933: /^\\[\t ]*(?:\r?\n|\r)[\s\S]+/m `] = lit`
usHKlXinagMvLXD54L0jYchaPIBEZPQeF/Is1AVuZDY=
`;

module.exports[n`DFA minimization >> 1934: /^#!.+/m `] = lit`
+pZbPYMe9gL6wAqRCx6l2bLSy58hUa+UMNCqlVtovuo=
`;

module.exports[n`DFA minimization >> 1935: /\b(?:as|import|on)\b/ `] = lit`
A5dmmArrYsM5CDAkbdtRB6wozyEdd9zXXI3z53I5R88=
`;

module.exports[n`DFA minimization >> 1936: /[{}[\]:;,]/ `] = lit`
KO8sTvWMvVasNzU9TwaRQQH4uBijtn+Pr1hV39YPskc=
`;

module.exports[n`DFA minimization >> 1938: /((?:^|[:;])[ \t]*)(?!\d)\w+(?=[ \t]*\{|[ \t]+on\b)/m `] = lit`
qIe085crz6zfL6/zyBz64CUdEczZyhom//YbiXxUIiE=
`;

module.exports[n`DFA minimization >> 1940: /((?:^|[;{])[ \t]*)(?!\d)\w+(?:\.\w+)*(?=[ \t]*:)/m `] = lit`
xjabJvHSVAj7bICSHubXUrVnVOIWOD4sfY2uDnhRf3s=
`;

module.exports[n`DFA minimization >> 1941: /((?:^|[;{])[ \t]*)property[ \t]+(?!\d)\w+(?:\.\w+)*[ \t]+(?!\d)\w+(?:\.\w+)*(?=... `] = lit`
8P3Lzc7b5MKBiCE5F/S1VS6GniBX1BTqB1ZCa00tMH8=
`;

module.exports[n`DFA minimization >> 1942: /^property/ `] = lit`
MqFpW8uq6P4BPb78NWKSdMHYWRMKgQOXfpc+yLmwRRM=
`;

module.exports[n`DFA minimization >> 1943: /\w+(?:\.\w+)*/ `] = lit`
7dOYwbc8NkGqjELQkIMUirVosrY9PVGAx3VAv/mmy1A=
`;

module.exports[n`DFA minimization >> 1944: /\b(?:abstract|any|assert|binary|bool|boolean|break|byte|case|catch|char|class|c... `] = lit`
jd3WiW1QBYzX2eotzKsDIRcAyr674uYfI6jX24JJftc=
`;

module.exports[n`DFA minimization >> 1945: /\$?\b(?!\d)\w+(?=\()/ `] = lit`
WblRqwQwjTbOGCs2eCGSD7vbAKHVUXrSbm2nlg9SgIs=
`;

module.exports[n`DFA minimization >> 1946: /\b(?:0b[01]+|0x[\da-f]*\.?[\da-fp\-]+|\d*\.?\d+e?\d*[df]|\d*\.?\d+)\b/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1947: /\$(?!\d)\w+\b/ `] = lit`
E2noJSdMsx8QIMd0D9sqOoY4Nj4zqcRTdAz3aYX8uFY=
`;

module.exports[n`DFA minimization >> 1948: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:\/\/|#).*)/ `] = lit`
ERvKWDGcCQCcDxUy1DgVtctSs4uwBEAYlDt+TywpDSE=
`;

module.exports[n`DFA minimization >> 1949: /("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/ `] = lit`
k4svf2S33O4huwtZh9fr/cqBP+sP2Y4OZp2uni/DvAQ=
`;

module.exports[n`DFA minimization >> 1950: /(^|[^.])(?:\+[+=]?|-[-=]?|[!=](?:==?|~)?|>>?=?|<(?:=>?|<=?)?|&[&=]?|\|[|=]?|[*\... `] = lit`
U45C6EEzmgczPoDCGqeSezGtFTkcbTF3Vc8aBinjyZM=
`;

module.exports[n`DFA minimization >> 1951: /\b(?:TRUE|FALSE)\b/ `] = lit`
zDCAra5oiWgfik89x+aIxaxJSYn+G6sbioLWkmOAZYE=
`;

module.exports[n`DFA minimization >> 1952: /\.\.(?:\.|\d+)/ `] = lit`
P6fzBIe6NBN1GHHw9NyzeEYkJ/AuD0GzRGij7emMiVY=
`;

module.exports[n`DFA minimization >> 1953: /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_rea... `] = lit`
WbBAZWJxd+/L11eJlE5HhkrcgLVd0Ud6SXcMub+/HoQ=
`;

module.exports[n`DFA minimization >> 1954: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/ `] = lit`
BYbfp3az/q1g6Aq5VGfa+Z2i26V7Y8eESTlVD+0Y0lQ=
`;

module.exports[n`DFA minimization >> 1955: /[(){}\[\],;]/ `] = lit`
0PFMHC+DvccriYdqAJ2Uo+HWzTlnMVJNLOnj6j/5ppM=
`;

module.exports[n`DFA minimization >> 1956: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/ `] = lit`
q2BJHXfAE0k/7oyqfcfI/g0WoLdyZTDaC8xv4du9lFM=
`;

module.exports[n`DFA minimization >> 1957: /%[^%\s]*%/ `] = lit`
cGLgC/KpjK0EKo7ZjoAZaRWXsNebU08N4QrnCZwKzx4=
`;

module.exports[n`DFA minimization >> 1958: /\b(?:NaN|Inf)\b/ `] = lit`
ggAUM8OahHD11zffAyyxnew7JRd8louV4rWXShtuHIY=
`;

module.exports[n`DFA minimization >> 1959: /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+\.?\d*|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/ `] = lit`
2dSSPB3KdyiXLrfOhNX5seHseR5zX6BFVA45OuDubCo=
`;

module.exports[n`DFA minimization >> 1960: /[([)\]']/ `] = lit`
iFjMfnH1UKXltVNQ5BjgAZ0ZrojhlrPfk+V2+lx88BU=
`;

module.exports[n`DFA minimization >> 1961: /^#lang.+/m `] = lit`
CpAYAYNsWWP2XoeoQjMIX7uNp1GoILN65YL8ltFPQpQ=
`;

module.exports[n`DFA minimization >> 1962: /'[^([)\]#'\s]+/ `] = lit`
Jy4lLMbZTbMSv+3OZJR/bfjf/TYrmjlbpY/f4r9ZdTg=
`;

module.exports[n`DFA minimization >> 1963: /([([]lambda\s+[([])[^([)\]'\s]+/ `] = lit`
GTDxpNWN+jXwXAMqgw6GhsyQ3A+LpVgqFui3GdlWF0M=
`;

module.exports[n`DFA minimization >> 1964: /([([])(?:define(?:-library|-macro|-syntax|-values)?|defmacro|(?:case-)?lambda|l... `] = lit`
DLM5Gbm94ib61vmEXymne/XE9TlcJg05T8U+dr+a+W8=
`;

module.exports[n`DFA minimization >> 1965: /([([])(?:(?:cons|car|cdr|list|call-with-current-continuation|call\/cc|append|ab... `] = lit`
dT8Q2sFa8r+snRQ1AjSZrbmMTMOO0hoRza7d6oB73vI=
`;

module.exports[n`DFA minimization >> 1966: /(^|[\s([)\]])(?:(?:#d(?:#[ei])?|#[ei](?:#d)?)?[+-]?(?:(?:\d*\.?\d+(?:[eE][+-]?\... `] = lit`
wTOpxtU101vJ6JkFUpUX1eUUFWShfiua314wCyzVl0M=
`;

module.exports[n`DFA minimization >> 1967: /(^|[\s([)\]])#[ft](?=[([)\]\s]|$)/ `] = lit`
PuA/sINclM2PqVzGAGLPd4PG0UwLNVP4s8/p/1EXVv0=
`;

module.exports[n`DFA minimization >> 1968: /([([])(?:[-+*%\/]|[<>]=?|=>?)(?=[([)\]\s]|$)/ `] = lit`
2zNOt0QmoM1EXAsI0qJq3ZNYyrWqgYV16FBmZf/JWTQ=
`;

module.exports[n`DFA minimization >> 1969: /([([])[^([)\]'\s]+(?=[([)\]\s]|$)/ `] = lit`
w/l6UnSPXEFwwNegIuqFc/uQmeivPuHAiD5oEvUWrT4=
`;

module.exports[n`DFA minimization >> 1970: /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:$-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\... `] = lit`
81Jeu1s9nHpf8BqwxRk+8yfWQkQGL9w9k4avYi+2R58=
`;

module.exports[n`DFA minimization >> 1971: /^<\/?[^\s>\/]*/i `] = lit`
j/qbUVn85Inwz2qt3Biim1qCN7LaUlfU910HlLPcPKg=
`;

module.exports[n`DFA minimization >> 1972: /=(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\})/i `] = lit`
Vw2CInQJZSFSPtRGu18PudWK5s3KyXCu1/5P0kjVjyE=
`;

module.exports[n`DFA minimization >> 1973: /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i `] = lit`
vbnpI7Vzqk3GdDeWV2vOnK5lLlKHlft64VAw1Prn6UU=
`;

module.exports[n`DFA minimization >> 1974: /\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}/ `] = lit`
a7kRFVNFTvpNqFqpO/LecCXfN67j536F3gc1eipCMKg=
`;

module.exports[n`DFA minimization >> 1975: /^[A-Z]\w*(?:\.[A-Z]\w*)*$/ `] = lit`
iSw3gucFKDRTZEwcbvJFMBBy/oHvxXa7C5qIfn2eBLg=
`;

module.exports[n`DFA minimization >> 1976: /\.{3}|[{}.]/ `] = lit`
foJepr8dQ25EX+TrTa0eTxCmA0c8KzlvN133Ouw74eY=
`;

module.exports[n`DFA minimization >> 1977: /^=(?={)/ `] = lit`
9acW8aIDKp3Z3HCp/qOJsz0q0V0fEHYtB4X1hd1nxTA=
`;

module.exports[n`DFA minimization >> 1978: /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|ext... `] = lit`
+HHQrCaD3lg94+mFy4b5nXiyMLQexQtWMEg0pGR6VTk=
`;

module.exports[n`DFA minimization >> 1979: /\.{3}|:[:=]|\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~\`]|[+\-*\/]\.?|\b(?:mod|land|lor... `] = lit`
9JeGSzmLW5LqvNL7bPb3w4znl/aS5L/W3dPSzp23vJ8=
`;

module.exports[n`DFA minimization >> 1980: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/ `] = lit`
MMLItOnbMxy8cqMleQqqoCds31j1Iv2BpUuvQKuJWhA=
`;

module.exports[n`DFA minimization >> 1981: /\b[A-Z]\w*\b(?!\s*\.)/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1982: /\b[a-z]\w*(?=::)/ `] = lit`
adN+STQ/eyetLk1QkeeldgA242K707P9mJYqSIeTiQ4=
`;

module.exports[n`DFA minimization >> 1983: /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|c[a-zA-Z]|0[0-7]{0,2}|[123]... `] = lit`
lVY3KBuIgnc08aF5G1+yWBfd+NCgCbKhHL1/uqUsLYI=
`;

module.exports[n`DFA minimization >> 1984: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/ `] = lit`
0gfQFmU6BRVqmU/3PQjqDMhimAVP1n6ZYXem2dExmYo=
`;

module.exports[n`DFA minimization >> 1985: /\\[\\(){}[\]^$+*?|.]/ `] = lit`
Xxqx4eEkedAFwyvE4AWAlP+9d1wDDclbxG87M00EfKM=
`;

module.exports[n`DFA minimization >> 1986: /\.|\\[wsd]|\\p{[^{}]+}/i `] = lit`
TEncd9fCAnlUvG+lF1Bynt+zvD+Tf0OakIW3S3Sn2RM=
`;

module.exports[n`DFA minimization >> 1987: /[$^]|\\[ABbGZz]/ `] = lit`
n4Aep2IdCHCePzmNxgb1YthPcbEfPHlPnPZJ8Xrs+Wo=
`;

module.exports[n`DFA minimization >> 1988: /(?:[+*?]|\{(?:\d+,?\d*)\})[?+]?/ `] = lit`
NsGwy14n/j3RdSKqMC/kvMmHZe6G248YqyMwNnNTKNE=
`;

module.exports[n`DFA minimization >> 1989: /\\(?![123][0-7]{2})[1-9]/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 1990: /\\k<[^<>']+>/ `] = lit`
/hGG1XRqTCvuSyaTc3ce1eEUEEZfxIW6dyeQxOfekRw=
`;

module.exports[n`DFA minimization >> 1991: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/ `] = lit`
xJFJ8T5UVmtu+FtCg8O3gA9bOg5lQ2fzHJp8Rk67U6o=
`;

module.exports[n`DFA minimization >> 1992: /\)/ `] = lit`
RqaSAooI0q6WOQnYwkcQLqrupLKdTsKLYwB4a13SRnw=
`;

module.exports[n`DFA minimization >> 1993: /(^\[)\^/ `] = lit`
3W0P4ecrMepCaoIyP6G29EU1zpIDDIpK/0z5BaJ+9mM=
`;

module.exports[n`DFA minimization >> 1994: /(?:[^\\-]|\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|c[a-zA-Z]|0[0-7]{... `] = lit`
b+3nPprdj7P+Y5YFuQxt7lvEx+9NiEgyvsYARH21hsE=
`;

module.exports[n`DFA minimization >> 1995: /\\[wsd]|\\p{[^{}]+}/i `] = lit`
3N8VX+Gcl3hMnPgYuxaOe9Or74EoaLPmlQwhQDee2UA=
`;

module.exports[n`DFA minimization >> 1996: /(<|')[^<>']+(?=[>']$)/ `] = lit`
E3MH887b3eTV1F37TsUtKwDuxXwCHmjzHYKdG1bJH0Y=
`;

module.exports[n`DFA minimization >> 1997: /\b(?:bool|char|double|float|null|size_t|ssize_t|string|unichar|void|int|int8|in... `] = lit`
JfphgcYJSVv5vjOFO/kZocHnAm2KCneZQJ4uWRwc1W8=
`;

module.exports[n`DFA minimization >> 1998: /(?:\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)(?:f|u?l?)?/i `] = lit`
Dy0tYb9FfQeJIY64JKyE/t1RbBiunAzYFAli7hN9cjg=
`;

module.exports[n`DFA minimization >> 1999: /\+\+|--|&&|\|\||<<=?|>>=?|=>|->|~|[+\-*\/%&^|=!<>]=?|\?\??|\.\.\./ `] = lit`
mONofRtZcQDYcRWgkESA38eCsyBjoWpUXHM7XpDxPsk=
`;

module.exports[n`DFA minimization >> 2000: /\b[A-Z0-9_]+\b/ `] = lit`
NOeIFBVNbw18dm/IiqxwvEK3qiGNOfmqAJeRuDB/LXw=
`;

module.exports[n`DFA minimization >> 2001: /@"[\s\S]*?"/ `] = lit`
a7bmkCIHzAUn20IgdvH6aFzhGtngU3IhzwPXe6M6Iq4=
`;

module.exports[n`DFA minimization >> 2002: /\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^\/\\\[\r\n])+\/[imsx]{0,4}(?=\s*(?:$|[\r\n,.... `] = lit`
FDRy9sz61F42+y96oqExfOmzjmr5YkZ4+UhuDwv23zo=
`;

module.exports[n`DFA minimization >> 2003: /[a-z]+$/i `] = lit`
/QKab46UgG+CPdykObAmyqV7Pc44UR0lUzKB2MHTXK8=
`;

module.exports[n`DFA minimization >> 2004: /^\/|\/$/ `] = lit`
6c0qv2Vd5FCWwFQc50hf+iGXtDiS4c+TyfmZQbyGrR8=
`;

module.exports[n`DFA minimization >> 2005: /\b[A-Z]\w*(?:\.\w+)*\b(?=(?:\?\s+|\*?\s+\*?)\w+)/ `] = lit`
OyleS/SovDMPkyQ0RjDbWXLTgWA2NSpT9FWJinr5ODA=
`;

module.exports[n`DFA minimization >> 2006: /(\[)[A-Z]\w*(?:\.\w+)*\b/ `] = lit`
cAIO1Dy4owndlzWoYc8CZemPmygVZmCFEuKPIvTNGrg=
`;

module.exports[n`DFA minimization >> 2007: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/ `] = lit`
7m5P0kr0Jye+fRDX92mSNEdCt2zL35DiPFxqsZf2spU=
`;

module.exports[n`DFA minimization >> 2008: /((?:\b(?:class|interface|new|struct|enum)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*... `] = lit`
0R11cod43uPnQ5HJqIvRXwVDS8Xi1uyo8sJbSdYhH3Q=
`;

module.exports[n`DFA minimization >> 2009: /^(\/)[\s\S]+(?=\/[a-z]*$)/i `] = lit`
0HvnxhyKwYM1lKqX6u88AJJSUpiYaEi+VyQHcsFnhtc=
`;

module.exports[n`DFA minimization >> 2010: /\$(?:\([^)]*\)|[a-zA-Z]\w*)/ `] = lit`
xFd9E+xsuehqla/6NH2kOIavVaaCIRDIBZHhJkWS1VA=
`;

module.exports[n`DFA minimization >> 2011: /^\$\(?|\)$/ `] = lit`
5N0F8EbxWCjaLVqat7K13+MnvQ6X4hMbRnQbfc4UZgA=
`;

module.exports[n`DFA minimization >> 2012: /[a-z_]\w*(?=\()/i `] = lit`
/l7UkHjRum1rPOFJgyMZoSE7VfJNOicvlONUHZ/xhLs=
`;

module.exports[n`DFA minimization >> 2014: /\b(?:label|image|menu|[hv]box|frame|text|imagemap|imagebutton|bar|vbar|screen|t... `] = lit`
sf1qdqDcQc3EvjHq4BsPWOE9/kr5mIE9lhUQwRzRx8U=
`;

module.exports[n`DFA minimization >> 2015: /\b(?:as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|f... `] = lit`
ER4RfM+KBWvzHnQMImecnRf2fBKOFqzfG47sGBHB3HU=
`;

module.exports[n`DFA minimization >> 2016: /\b(?:[Tt]rue|[Ff]alse)\b/ `] = lit`
VSYB/JwdmnC76JECfn4Nn5yP1X2ZGA0pl9vthTvhzAg=
`;

module.exports[n`DFA minimization >> 2017: /(?:\b(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*)|\B\.\d+)(?:e[+-]?\d+)?j?/i `] = lit`
wtJk9tBTpaY+aJml1iswU7nod6SnNRyvIbXgAHkG0Uo=
`;

module.exports[n`DFA minimization >> 2018: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not|with|at)\b/ `] = lit`
GuW3hcWJSaWUkX2oFIUo8Ax2l7tbY5quo4bTmsDmfL4=
`;

module.exports[n`DFA minimization >> 2019: /(^|[^\\])#.+/ `] = lit`
+idmrHUQR1xNJS4Jm3KVfnRHCnf2NSetCrR6b9y3DaU=
`;

module.exports[n`DFA minimization >> 2020: /("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2|(?:^#?(?:(?:[0-9a-fA-F]{2})... `] = lit`
vMaRthpbLhBmTox4AT+gRxwDNbg5GO7Nk19ximn/L4Y=
`;

module.exports[n`DFA minimization >> 2021: /(^\s*\.\. )\|(?:[^|\s](?:[^|]*[^|\s])?)\| [^:]+::/m `] = lit`
zHR49mLpnKk+ZYl9wvLKPyE7TGhlzmJDp89KQkZba9Y=
`;

module.exports[n`DFA minimization >> 2022: /(^\s*\.\. )[^:]+::/m `] = lit`
PNCgJSh2Rv7rUxWsvA12VJD8q4UvjPA4FSEGSlBXomc=
`;

module.exports[n`DFA minimization >> 2023: /(^\s*\.\.)(?:(?: .+)?(?:(?:\r?\n|\r).+)+| .+)(?=(?:\r?\n|\r){2}|$)/m `] = lit`
r62nXRXilF3XcTV4BzBzJHuJmxWpWqA7Yc//EHEjpzU=
`;

module.exports[n`DFA minimization >> 2024: /((?:\r?\n|\r){2})([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_\`{|}~])\2{3,}(?=(?:\r?\n|\r)... `] = lit`
YteW4XoTYAzvBbua2wKQOO2J+pfHbTfMJ/KWR/jtVM4=
`;

module.exports[n`DFA minimization >> 2025: /(^\s*):[^:\r\n]+:(?= )/m `] = lit`
5KvS+hvf5ihpHCsEXF6rSCx+jvDe/tjPOgu5a3E3Rtw=
`;

module.exports[n`DFA minimization >> 2026: /(^\s*)(?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?(?:, (... `] = lit`
AKu1lGqkXfy9KXlD7GjsjzaUnijMWe72VVmXCruBAwY=
`;

module.exports[n`DFA minimization >> 2027: /::(?:\r?\n|\r){2}([ \t]+).+(?:(?:\r?\n|\r)\1.+)*/ `] = lit`
uRrwS3LMH386kyBUWJ+39oBCzbANTolk4lQAUeq6fv4=
`;

module.exports[n`DFA minimization >> 2028: /::(?:\r?\n|\r){2}([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_\`{|}~]).*(?:(?:\r?\n|\r)\1.*... `] = lit`
IaXqfctBtLWglYxDO5n2IKsCWGsjgbA7a+Pg6kVwTMQ=
`;

module.exports[n`DFA minimization >> 2029: /(^\s*)(?:[*+\-•‣⁃]|\(?(?:\d+|[a-z]|[ivxdclm]+)\)|(?:\d+|[a-z]|[ivxdclm]+)\.)(?=... `] = lit`
mg/UfAUqlqPQ2DSFUx4DhO/CBqwYf+bsZ4g2GOutblI=
`;

module.exports[n`DFA minimization >> 2030: /(^\s*)>>> .+(?:(?:\r?\n|\r).+)*/m `] = lit`
dG4dM0hvxNnYsphLQ0ogV6r1e/GX1pr8MVK1HC73HyI=
`;

module.exports[n`DFA minimization >> 2031: /(^\s*)(?:\|(?= |$)|(?:---?|—|\.\.|__)(?= )|\.\.$)/m `] = lit`
EdQSlhHd9b/4JJNeA3nkvCcBum5yfQI44BFno7zZUZg=
`;

module.exports[n`DFA minimization >> 2032: /(\s*)(?:\+[=-]+)+\+(?:\r?\n|\r)(?:\1(?:[+|].+)+[+|](?:\r?\n|\r))+\1(?:\+[=-]+)+... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2033: /(\s*)(?:=+ +)+=+(?:(?:\r?\n|\r)\1.+)+(?:\r?\n|\r)\1(?:=+ +)+=+(?=(?:\r?\n|\r){2... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2034: /(^\s*\.\. )\[[^\]]+\]/m `] = lit`
wiXda/dU5TQkOviMDazN2/nM1Mc6li3e7By6oaNIkao=
`;

module.exports[n`DFA minimization >> 2035: /(^\s*\.\. )_(?:\`[^\`]+\`|(?:[^:\\]|\\.)+):/m `] = lit`
6GKZDy1xixFg6aUyDwpF4HYITxv1kZzOwjyaKAxJR5Q=
`;

module.exports[n`DFA minimization >> 2036: /::$/ `] = lit`
an1yT/lHhXWdaUAa+TzXEckIV45dQ+zUDYmZLMewQQU=
`;

module.exports[n`DFA minimization >> 2037: /^(([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_\`{|}~])\2+)(?:\r?\n|\r).+(?:\r?\n|\r)\1$/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2038: /(^|(?:\r?\n|\r){2}).+(?:\r?\n|\r)([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_\`{|}~])\2+(?... `] = lit`
gJtifKo57SU6tF/qsR5uRHPg0e61IVTdGwfKvP7GLdo=
`;

module.exports[n`DFA minimization >> 2039: /^>>>/ `] = lit`
mDIf8Mx1LGaSKuLkYQlrUdc41ncrPaRpy7lfMHYEmSE=
`;

module.exports[n`DFA minimization >> 2040: /(^|[\s\-:\/'"<(\[{])(?::[^:]+:\`.*?\`|\`.*?\`:[^:]+:|(\*\*?|\`\`?|\|)(?!\s).*?[^\s]\2... `] = lit`
pK4EjenUNJt7Zc4ukWbev4LZ3J4G9BcF4OdS8ixX12M=
`;

module.exports[n`DFA minimization >> 2041: /\[[^\]]+\]_(?=[\s\-.,:;!?\\\/'")\]}]|$)/ `] = lit`
fNJ7fAF7URiibCEjJLBmLF/ybGgZhr/MRfCg4qcptsI=
`;

module.exports[n`DFA minimization >> 2042: /(?:\b[a-z\d]+(?:[_.:+][a-z\d]+)*_?_|\`[^\`]+\`_?_|_\`[^\`]+\`)(?=[\s\-.,:;!?\\\/'")\]... `] = lit`
U3wN82u05f1VK0IHVE2gZ/QVSWM4RcxyU/qGE26HTaA=
`;

module.exports[n`DFA minimization >> 2043: /\||(?:\+[=-]+)+\+/ `] = lit`
Tl4Rrmq/FuMCP5iJCF+f6CcGRHS15jAV44yvLJgOS8c=
`;

module.exports[n`DFA minimization >> 2044: /[=-]+/ `] = lit`
o3GyhXqAwBF4OKDfY1sueDcK086KcCMrptSeS3Y/ofo=
`;

module.exports[n`DFA minimization >> 2045: /^\|(?:[^|\s]|[^|\s][^|]*[^|\s])\|/ `] = lit`
+uQ3YueXn0nwt4xe8apSZWKTL8ozsFqoIs3udsNtZVI=
`;

module.exports[n`DFA minimization >> 2046: /( +)[^:]+::/ `] = lit`
KUFj50tmHvs5x8w69hGvCarpRdO6D/R7HvMuBSTrZC8=
`;

module.exports[n`DFA minimization >> 2047: /^_|:$/ `] = lit`
xzUnt96osNPiE5HkfQ464takBsyClO4r3ENL70p9muQ=
`;

module.exports[n`DFA minimization >> 2048: /^[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_\`{|}~]+|[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_\`{|}... `] = lit`
tmUL+G4SzrlESq/eoG+TjcPAULAMa8Q5Fohm533Ngik=
`;

module.exports[n`DFA minimization >> 2049: /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_\`{|}~]+$/ `] = lit`
tmUL+G4SzrlESq/eoG+TjcPAULAMa8Q5Fohm533Ngik=
`;

module.exports[n`DFA minimization >> 2050: /^::/ `] = lit`
an1yT/lHhXWdaUAa+TzXEckIV45dQ+zUDYmZLMewQQU=
`;

module.exports[n`DFA minimization >> 2051: /^(?:::|([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_\`{|}~])\1*)/m `] = lit`
pNQ7bZQQKRMIiu88J9PoxssDaNeyzRNo8kwcSwHPxnA=
`;

module.exports[n`DFA minimization >> 2052: /\*\*?|\`\`?|\|/ `] = lit`
g4Wj9/+fqp82LAR7gRrz1sF1Vm/xoyRyRd8Hl5OE4w4=
`;

module.exports[n`DFA minimization >> 2053: /^\[|\]_$/ `] = lit`
xj7AXFgaW+VApfOsPMXuIudWSshI44es1UHh2uE06aw=
`;

module.exports[n`DFA minimization >> 2054: /^_?\`|\`$|\`?_?_$/ `] = lit`
zxwrT8jbpxUqywRFTnaM8UzOIb2WMuNKc17TMsDA9Rk=
`;

module.exports[n`DFA minimization >> 2055: /^\||\|$/ `] = lit`
5swum4M2wdhut02BzRvFGhfm5cLyBZW/r5A1GP9qhJk=
`;

module.exports[n`DFA minimization >> 2056: /(^\*\*).+(?=\*\*$)/ `] = lit`
ODBgy69IgH0eYYc9FyWoOX1ZuloqdFhA0LBtJAXqB9I=
`;

module.exports[n`DFA minimization >> 2057: /(^\*).+(?=\*$)/ `] = lit`
uUMJtch3w5Bn4UhdYu7lnED69vF+EmZoOtQOzfIwbaw=
`;

module.exports[n`DFA minimization >> 2058: /(^\`\`).+(?=\`\`$)/ `] = lit`
McLss3JEJVpajdl3FEPDgt4kB9+ALxB6pjoPr4bz6uM=
`;

module.exports[n`DFA minimization >> 2059: /^:[^:]+:|:[^:]+:$/ `] = lit`
CGkw3A6/dPic31Zj7ItutVaY8fX3Rykrnd/LVajiBYA=
`;

module.exports[n`DFA minimization >> 2060: /(^\`).+(?=\`$)/ `] = lit`
Dl5Ri+WZiIwYkQYihmeJAsc76gmCbh0pn8knm8USiEQ=
`;

module.exports[n`DFA minimization >> 2061: /(^\|).+(?=\|$)/ `] = lit`
6/oYFUVVgnHqnspzlfdIkeUpAosVWFVxfEC7BvcjZ1o=
`;

module.exports[n`DFA minimization >> 2062: /^:|:$/ `] = lit`
gwaQCkXxPWUSEYeW+09l3l+4TOJc1EmyLFMyRC6rH5I=
`;

module.exports[n`DFA minimization >> 2063: /(?:=>|->)|\b(?:class|if|else|switch|case|return|exit|try|catch|finally|raise)\b... `] = lit`
mkWIVKgtwURrbq/MajpB0lfvl7/abKujIUYYpOuVjmU=
`;

module.exports[n`DFA minimization >> 2064: /@|\bSystem\b/ `] = lit`
k6lLJYeAHDU2EwVU4f/vT1Tda3ui0AcHplj9SMVWKUM=
`;

module.exports[n`DFA minimization >> 2065: /\b\d{4}-\d{2}-\d{2}\b/ `] = lit`
JBdsJsQyL+1sN3UHFxFUDnRbR7gzdJdzzxISCT4b+BU=
`;

module.exports[n`DFA minimization >> 2066: /\b\d{2}:\d{2}:\d{2}\b/ `] = lit`
m4JH9X9ML+Fxarf61w5IBzKjaScmIzEb0jhoXmSrUg0=
`;

module.exports[n`DFA minimization >> 2067: /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/ `] = lit`
W90n2WIojBu2A1DpXG0DvfCBMZ0jwzyEX3bF5OUGh4c=
`;

module.exports[n`DFA minimization >> 2068: /\B\`[^\s\`'",.:;#\/\\()<>\[\]{}]\b/ `] = lit`
gvvwD5xfwtjeimQlUKih9qKInYTJ6VoKWY32fxqe+bI=
`;

module.exports[n`DFA minimization >> 2069: /:[^\d\s\`'",.:;#\/\\()<>\[\]{}][^\s\`'",.:;#\/\\()<>\[\]{}]*/ `] = lit`
5BwHUS1yX09fbMlkdhRuRVrDWvVwzpncrtdN/gV3ugg=
`;

module.exports[n`DFA minimization >> 2070: /[+-]?\b(?:\d+\.\d+|\d+)\b/ `] = lit`
4aTvZGRZrv6METzTiDmnQQTx9VxeMOb3xZud1wcrjC8=
`;

module.exports[n`DFA minimization >> 2071: /(?:\.{2,3})|[\`,.:;=\/\\()<>\[\]{}]/ `] = lit`
KEZBgGxGyqEA/ptwL1odGDYkwVItO7vBMWqYQFynNWo=
`;

module.exports[n`DFA minimization >> 2072: /[^\d\s\`'",.:;#\/\\()<>\[\]{}][^\s\`'",.:;#\/\\()<>\[\]{}]*/ `] = lit`
GJb8pgMmgRjd8W0nDvEQlZ+VstApGpm/0b8zNOPSIlo=
`;

module.exports[n`DFA minimization >> 2073: /(^|[^\/])\/(?!\/)(?:\[[^\n\r\]]*\]|\\.|[^\/\\\r\n\[])+\/(?=\s*(?:$|[\r\n,.;})])... `] = lit`
xiQYb+fh+GLbbIoyTsj+RSm/OTDhHPw6giG8Kyy83T8=
`;

module.exports[n`DFA minimization >> 2074: /[\w.-]+(?=[ \t]*:)/ `] = lit`
xxqSkAMdsyuHfzdvhD4DOKv0PYCYrevCSSQgLfNtmWI=
`;

module.exports[n`DFA minimization >> 2075: /[{},.;:=]/ `] = lit`
E9pWStvcz6+LPh+lKTFJYG06GFbujj+3zFUdlBq6JSo=
`;

module.exports[n`DFA minimization >> 2076: /(^|\s)(?:(?:facet|instance of)(?=[ \t]+[\w-]+[ \t]*\{)|(?:external|import)\b)/ `] = lit`
oTvMnTTlBR77FmhssduvctnnxW3G+A9q0is+VaOX8Nc=
`;

module.exports[n`DFA minimization >> 2077: /[\w-]+(?=[ \t]*\{)/ `] = lit`
Wt/UhQ5BuVJRlLMHrQD6PFuPi6gGoKyhG6Tpzpd8mE4=
`;

module.exports[n`DFA minimization >> 2078: /(=[ \t]*)[^,;]+/ `] = lit`
XfVpZ08gFwFFPoZlKRrGct3jWVTdo6zcZ/qCzE38G3Y=
`;

module.exports[n`DFA minimization >> 2079: /\(optional\)/ `] = lit`
/DMLJjmM6IBUzSz1NwFaulAA0l74VFPsth5HVATJdzw=
`;

module.exports[n`DFA minimization >> 2080: /(\.)\*/ `] = lit`
4RNO2c2KYCJIxt1aLjnhbQZ5ASM97mfLzwj/bWlmkeg=
`;

module.exports[n`DFA minimization >> 2081: /^ ?\*{3}[ \t]*Settings[ \t]*\*{3}(?:.|[\r\n](?!\*{3}))*/im `] = lit`
lflPo5s7/jJuUxnuA9fvyVTMjw6eGf0vjmGhLSw76DE=
`;

module.exports[n`DFA minimization >> 2082: /^ ?\*{3}[ \t]*Variables[ \t]*\*{3}(?:.|[\r\n](?!\*{3}))*/im `] = lit`
trm3uGRodCZI4WJ2o7r+ok1V2DxAJjrLbmqBdaivz10=
`;

module.exports[n`DFA minimization >> 2083: /^ ?\*{3}[ \t]*Test Cases[ \t]*\*{3}(?:.|[\r\n](?!\*{3}))*/im `] = lit`
rGShP1qDHvhQGLmHXuGuOu4qCB+2e/jRvBDQY5QlDxs=
`;

module.exports[n`DFA minimization >> 2084: /^ ?\*{3}[ \t]*Keywords[ \t]*\*{3}(?:.|[\r\n](?!\*{3}))*/im `] = lit`
n2TT8qSjHiacEXNFv/ZQTZhqS0uLWe7ZxWwMiOaQZJI=
`;

module.exports[n`DFA minimization >> 2085: /^ ?\*{3}[ \t]*Tasks[ \t]*\*{3}(?:.|[\r\n](?!\*{3}))*/im `] = lit`
R5TFUmMIw6yllKN6ZpGdlmjz9XfH4xfdPVxYHnG0PWM=
`;

module.exports[n`DFA minimization >> 2086: /(^[ \t]*| {2}|\t)#.*/m `] = lit`
hCqnct6maygLhL0uLrIEF8FHf+M7Vj4nCibi7BrUJR8=
`;

module.exports[n`DFA minimization >> 2087: /^ ?\*{3}.+?\*{3}/ `] = lit`
UxPzuv5ls5UDNVu38gLJL2wQQVCKb/Mv2mE8dxN4pK4=
`;

module.exports[n`DFA minimization >> 2088: /([\r\n] ?Documentation(?: {2}|\t)[ \t]*)(?![ \t]|#)(?:.|(?:\r\n?|\n)[ \t]*\.{3}... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2089: /([\r\n] ?)(?!\.{3}|#)(?:\S(?:[ \t]\S)*)+/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2090: /([\r\n](?: {2}|\t)[ \t]*)\[[-\w]+\]/ `] = lit`
kxV8D7ZvFTrXE8RK4TzhZdWuuO4ZklD2EwzWtF3iYUE=
`;

module.exports[n`DFA minimization >> 2091: /((?:^|[^\\])(?:\\{2})*)[$@&%]\{(?:[^{}\r\n]|\{[^{}\r\n]*\})*\}/ `] = lit`
sZwYAvjrW/HcceSVuEo+5g3PUtF7bieTvnGvEclaI5I=
`;

module.exports[n`DFA minimization >> 2092: /([\r\n] ?)(?!#)(?:\S(?:[ \t]\S)*)+/ `] = lit`
ik2y+lY/Q3d8rE90IMX42fFtD5XyvLze/mq4fqo1aTw=
`;

module.exports[n`DFA minimization >> 2093: /(\[Documentation\](?: {2}|\t)[ \t]*)(?![ \t]|#)(?:.|(?:\r\n?|\n)[ \t]*\.{3})+/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2094: /([\r\n](?: {2}|\t)[ \t]*)(?!\[|\.{3}|#)(?:\S(?:[ \t]\S)*)+/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2095: /^[$@&%]\{|\}$/ `] = lit`
SU8OXMW/zczrA0M7oAuazXB6rTHY/13Nq9oNIRbi0zc=
`;

module.exports[n`DFA minimization >> 2096: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/ `] = lit`
EGS/LQC3Q3ENKiQoO3HGkoAbrTgEV6eUjgsS1CuP9SY=
`;

module.exports[n`DFA minimization >> 2097: /\b[A-Z_][A-Z_\d]+\b/ `] = lit`
zMImyKpA3ecZ/PmERS1PVTFuh07gTi+R+FbcoKMM6pY=
`;

module.exports[n`DFA minimization >> 2098: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:\d(... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2099: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/ `] = lit`
59LU+Tn3YfGMXKEZNQmx9uVepwD131tra+bALhyrWlg=
`;

module.exports[n`DFA minimization >> 2100: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/ `] = lit`
Xu2JKiGSalT+FFIQpVMLe18gefJQumsJHMiDB4CT1VM=
`;

module.exports[n`DFA minimization >> 2101: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/ `] = lit`
nzTmCz6ASEwHoR78a5Z0bR1qYbxX5cF2xJ1ATomzh9Q=
`;

module.exports[n`DFA minimization >> 2102: /b?'(?:\\(?:x[0-7][\da-fA-F]|u{(?:[\da-fA-F]_*){1,6}|.)|[^\\\r\n\t'])'/ `] = lit`
wAU+nCaDwhdIXCxVgDbDSM/1Pb/lur9vm6G8P9CABcU=
`;

module.exports[n`DFA minimization >> 2103: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/ `] = lit`
V8q5JX3twC/1R9bNCs43or0prNSJyU1oJFaqVRxQHnw=
`;

module.exports[n`DFA minimization >> 2104: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/ `] = lit`
ZoDJyObqf6JYu4K5Ks4aCnUX9+FD2tFU2XabneJBKTY=
`;

module.exports[n`DFA minimization >> 2105: /'\w+/ `] = lit`
hQ6ISfwfkujv7xRUCp63u6hVMJqZct9wCSXkNeEa39A=
`;

module.exports[n`DFA minimization >> 2106: /(\$\w+:)[a-z]+/ `] = lit`
EbWLiO2Iig3wh8VIS1CxsCYHbIXYjaFfAq6fnBbG948=
`;

module.exports[n`DFA minimization >> 2107: /(\bfn\s+)\w+/ `] = lit`
s98KBhOni7sOv33cgU0GUkfLJaSMPr0ypMjLf49ay58=
`;

module.exports[n`DFA minimization >> 2108: /(\b(?:enum|struct|union)\s+)\w+/ `] = lit`
h7VQVGKY/+5ttl7OsqXTlwzQvG6GevfwWjJLyhjY64Q=
`;

module.exports[n`DFA minimization >> 2109: /\b(?:abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|... `] = lit`
w7DsNNkH5FXGvjJozi41K+y2tnbWYP46b/90sTxKWt8=
`;

module.exports[n`DFA minimization >> 2110: /\b(?:[ui](?:8|16|32|64|128|size)|f(?:32|64)|bool|char|str)\b/ `] = lit`
7gt3U536w0xtE0dcC9nzpHXRtcE5DGVx3XO8mkX+DsY=
`;

module.exports[n`DFA minimization >> 2111: /\w+!/ `] = lit`
hbzGo/IhQIGxlCgMcsJI3hbjPCAAN+6FRc9gQl2lNI0=
`;

module.exports[n`DFA minimization >> 2112: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/ `] = lit`
XAABLXQ4/pFvPAHFTKQddTB3H+x7LZTQGz9dz/UK1qA=
`;

module.exports[n`DFA minimization >> 2113: /(^|[^\\])\/\*(?:[^*\/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*\/]|\*(?!\/)|\/(?!\*)|\/\*(?... `] = lit`
qfRoqGTIF34YR/Mjtuz+T2wS6TehAaVM724nsNSgQ1U=
`;

module.exports[n`DFA minimization >> 2114: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/ `] = lit`
K881k8mx/djnACl+37olmme4WwjdziAse8ssV1UDvLI=
`;

module.exports[n`DFA minimization >> 2115: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*... `] = lit`
fqqki3uNGtonn59OANb95Wsztb7zdmY2D7E8cWT73lE=
`;

module.exports[n`DFA minimization >> 2116: /\b(?:\d[\da-f]*x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i `] = lit`
2yonDCEBabE/h7zy8Ofj+qYzdE5bDy83euhP0C4zwTQ=
`;

module.exports[n`DFA minimization >> 2117: /\*\*?|\|\|?|!!?|¦¦?|<[>=]?|>[<=]?|[-+\/=&]|[~¬^]=?/i `] = lit`
UvuhBcLMsHWC073kCEqTH/pKJuWwYpwgJ9xQBlbUR4Y=
`;

module.exports[n`DFA minimization >> 2118: /[$%@.(){}\[\];,\\]/ `] = lit`
8ZrHAE5ebMt4gOMu/iiE/w5m7XpUAQdEDKwWN3Lecdc=
`;

module.exports[n`DFA minimization >> 2119: /^(\s*)(?:(?:data)?lines|cards);[\s\S]+?^\s*;/im `] = lit`
kfJxW0UaQp1/0o9gaNCW51q3FO637ZfjE+mIVm2WjfM=
`;

module.exports[n`DFA minimization >> 2120: /(^proc\s+(?:fed)?sql(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|quit|run|data);|... `] = lit`
MmxzMob6OZycDz3hwe4FDXbni0Nd/FgpfydUIMtizbM=
`;

module.exports[n`DFA minimization >> 2121: /(^proc\s+groovy(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|quit|run|data);|(?![\... `] = lit`
ksK88amwtwot5X9Lz4Adspj+5h5uFNX1J3XUXSdEfuo=
`;

module.exports[n`DFA minimization >> 2122: /(^proc\s+lua(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|quit|run|data);|(?![\s\S... `] = lit`
LOVAmtqTA1VE8IVRruUJwYJl5+5U8uNtBcvSklaxqKI=
`;

module.exports[n`DFA minimization >> 2123: /(^proc\s+cas(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|quit|data);|(?![\s\S]))/... `] = lit`
ZxTQoUNhM+3Vt4g55NG3t65/+e9Gh+DG8YDJvTodG/M=
`;

module.exports[n`DFA minimization >> 2124: /(^proc\s+\w+\s+)(?!\s)(?:[^;"']|(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!')))+;/... `] = lit`
C3N3sRUj6fonPnOOLQ81Hbdm/ZK8i3UHKifTH7ckIwQ=
`;

module.exports[n`DFA minimization >> 2125: /((?:^|\s|=|\())%(?:ABORT|BY|CMS|COPY|DISPLAY|DO|ELSE|END|EVAL|GLOBAL|GO|GOTO|IF... `] = lit`
RaXQAFuVQbmoMJ7f9b2RXatPnhTvnxIAmsMHBpbnb+k=
`;

module.exports[n`DFA minimization >> 2126: /&[a-z_][a-z_0-9]*/i `] = lit`
Q5FNmSdaxrCbCfCc4m11QI4aW53ZKCUHL9Auy9PtF4U=
`;

module.exports[n`DFA minimization >> 2127: /((?:^|\s|=))%(?:NRBQUOTE|NRQUOTE|NRSTR|BQUOTE|QUOTE|STR)\(.*?(?:[^%]\))/i `] = lit`
RsK3A2bErOl6eqkgZUnG/pWMCi0hmX9103i1SLKJzZI=
`;

module.exports[n`DFA minimization >> 2128: /^%macro[^;]+(?=;)/im `] = lit`
0ny70UzeVHr3WEkWOdu7CHqoiyipQ+kW6jSyZp1Idjc=
`;

module.exports[n`DFA minimization >> 2129: /^%mend[^;]+(?=;)/im `] = lit`
J0jOGjSXVkk1HI13Wue047XmvGuLHAsz5lxAXrHJ4Cg=
`;

module.exports[n`DFA minimization >> 2130: /%_\w+(?=\()/ `] = lit`
HTmukP5HivzudaA2+zEsPrhMNvn5IpftWEtXK5hqflY=
`;

module.exports[n`DFA minimization >> 2131: /\binput\s+[-\w\s\/*.$&]+;/i `] = lit`
hUJcDvnrzhmJ9J9q8lVKx22sFOIPYq2XzBbdmfmI3nY=
`;

module.exports[n`DFA minimization >> 2132: /(^options)[-'"|\/\\<>*+=:()\w\s]*(?=;)/im `] = lit`
OrzmChide8Nyl0l9GMDK11cqHdOEYaImIjG4P0mlbEw=
`;

module.exports[n`DFA minimization >> 2134: /%?\w+(?=\()/ `] = lit`
fj03JBBVDWWuM9syMgkpoxSYFoRl01+WNOLvFxUWTrw=
`;

module.exports[n`DFA minimization >> 2135: /\b(?:format|put)\b=?[\w'$.]+/im `] = lit`
b+O8yAFqLUzuhxkbx5V5El+izSlpIsyn4QahxTzkLJM=
`;

module.exports[n`DFA minimization >> 2136: /\b(?:format|put)\s+[\w']+(?:\s+[$.\w]+)+(?=;)/i `] = lit`
WhZpWMAH5J6jSDw7V/ydXdyEK3wIr0FVHgnf6l2Sk0A=
`;

module.exports[n`DFA minimization >> 2137: /(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))[bx]/ `] = lit`
bFKvMakrCp5EcJV8KWr+ADuY0rS/c84T9u74PPyaFZs=
`;

module.exports[n`DFA minimization >> 2138: /(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))(?:dt?|t)/ `] = lit`
aOqj/rtFhTswHpDQGzaZIpcUzXu4O+lmfUrzx5WbrcA=
`;

module.exports[n`DFA minimization >> 2139: /(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))/ `] = lit`
XDgk2MtFZVwLoLf9u7Wo+8mBQ7TyBpMKM/HF9iDVbMI=
`;

module.exports[n`DFA minimization >> 2140: /(^|\s+)(?:proc\s+\w+|quit|run|data(?!\=))\b/i `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2141: /((?:^|\s)=?)(?:after|analysis|and|array|barchart|barwidth|begingraph|by|call|ca... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2142: /\b(?:eq|ne|gt|lt|ge|le|in|not)\b/i `] = lit`
itxHVVZIQaFkqAOsk1KgyovOMm3xNXETxIolkth4G5M=
`;

module.exports[n`DFA minimization >> 2143: /;/ `] = lit`
AyEXX3OjiD16S+3vdp5kAvMUOQAmGQbB2uS7iXer/Ds=
`;

module.exports[n`DFA minimization >> 2144: /%macro/i `] = lit`
FmszrrOx8O70KNQojGDJjvRfsD6i4ppjJQYqyYkYGes=
`;

module.exports[n`DFA minimization >> 2145: /%mend/i `] = lit`
2BtiMDo1kaQ30MeVUIIiA7LJJi855+56oS5e3Iby/uA=
`;

module.exports[n`DFA minimization >> 2147: /(^\s*|;\s*)\*[^;]*;/m `] = lit`
DYBbkordH5SFraZzngtQxli4qQECHAJ7LvjLZ590pSo=
`;

module.exports[n`DFA minimization >> 2148: /^(?:format|put)(?=\=)/i `] = lit`
OOUiVnVvCvzH4jjfrbkqexcZ5Iher1zbPuDuJeVnNNg=
`;

module.exports[n`DFA minimization >> 2149: /^(?:format|put)/i `] = lit`
18tt54O4/hrwpNRHMJUwBRSIL8r7+DW5BOnr5BvW2SQ=
`;

module.exports[n`DFA minimization >> 2150: /^(?:(?:data)?lines|cards)/i `] = lit`
o9V54m53zfk7hL+y7ZTHxl3WO2zacjhfcW/3vbhOja0=
`;

module.exports[n`DFA minimization >> 2151: /^[ \t]*(?:select|alter\s+table|(?:create|describe|drop)\s+(?:index|table(?:\s+c... `] = lit`
RRTm5tk0mApX1nQ7AV55WEaMAC6cvd/zatQjCy/skD0=
`;

module.exports[n`DFA minimization >> 2152: /((?:^|[\s])=?)(?:catname|checkpoint execute_always|dm|endsas|filename|footnote|... `] = lit`
o7YGyLdP5oAyU2xdzFQlW4xWDVeMNt3liAbpSet0OvI=
`;

module.exports[n`DFA minimization >> 2153: /(^|\s)(?:disconnect\s+from|exec(?:ute)?|begin|commit|rollback|reset|validate)\b... `] = lit`
FJTK18ZPar/oEncytFoxbVVZezrsQ/ubayHP7lpkIPI=
`;

module.exports[n`DFA minimization >> 2154: /(^[ \t]*submit(?:\s+(?:load|parseonly|norun))?)(?:(?:"(?:""|[^"])*"(?!")|'(?:''... `] = lit`
9qUPIq+5cw+H5GhB5vb4WDKgg9f5EIG88Toc65wsWbs=
`;

module.exports[n`DFA minimization >> 2155: /(^|\s)(?:submit(?:\s+(?:load|parseonly|norun))?|endsubmit)\b/i `] = lit`
053U3J6W6QqxFvrznKL/qWjSRACmvfcSkuBEUgqr6IU=
`;

module.exports[n`DFA minimization >> 2156: /((?:^|\s)=?)saveresult\s+[^;]+/im `] = lit`
DGaXfqoeRJUfUB4Z2UmKTOYL9idDzOs/6SE8Jg34A64=
`;

module.exports[n`DFA minimization >> 2157: /((?:^|\s)=?)(?:default|(?:un)?set|on|output|upload)[^;]+/im `] = lit`
vvVFYZ+x/uGTob6gZKJcNyzGw/bF00BcH1RvH4j1ejA=
`;

module.exports[n`DFA minimization >> 2158: /(\s*=\s*)[A-Z\.]+/i `] = lit`
pFA2xxo4NfyJQwqiSpJLRW1djMNnmiI4ur+IgefosH4=
`;

module.exports[n`DFA minimization >> 2159: /[A-Z]+/i `] = lit`
/QKab46UgG+CPdykObAmyqV7Pc44UR0lUzKB2MHTXK8=
`;

module.exports[n`DFA minimization >> 2160: /%(?:NRBQUOTE|NRQUOTE|NRSTR|BQUOTE|QUOTE|STR)/i `] = lit`
G/CZjurfYYgXERZ0lBGdrl9s5vV6laPb5Ehlqvt4uns=
`;

module.exports[n`DFA minimization >> 2161: /%['"()<>=¬^~;,#]/i `] = lit`
Z54tT99X00N47k+V2k7vAyPhGQGl0wisp1KaJo75tWg=
`;

module.exports[n`DFA minimization >> 2162: /^input/i `] = lit`
43FZgDV3h5FB37QXSt4vgzz+0iQk0I+JjP3RfwVVFjg=
`;

module.exports[n`DFA minimization >> 2163: /(?:action)/i `] = lit`
pSLihQlvSx8Vakg/x52oixO316UDPih58jnkcrhNuto=
`;

module.exports[n`DFA minimization >> 2164: /(?:\w|\$\d)+\.\d?/i `] = lit`
qRhx5B1/ZZjfb+tYyO0CYJC1DAeK2QvOmd+ob+DpuDY=
`;

module.exports[n`DFA minimization >> 2165: /[\w$]+\.\d?/ `] = lit`
RCfu4B5hFEBzrw3THHLMJAceYcRDeXaIuLA/0OrwiLM=
`;

module.exports[n`DFA minimization >> 2166: /^saveresult\s+\S+/i `] = lit`
bM9pXOMIHfdSULigZ7AMMvbPqj89neQpAgaG3EkM7BA=
`;

module.exports[n`DFA minimization >> 2167: /^(?:saveresult)/i `] = lit`
j50jS68GkJ/gdtAYKI6MNeuptlEQeaXBpfR8ymWOnrk=
`;

module.exports[n`DFA minimization >> 2168: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m `] = lit`
kGHI/H6Qy28xw4TCC5FMQr3mbkmBOjqaEpkAH8DThVg=
`;

module.exports[n`DFA minimization >> 2169: /^(?:[ \t]*)[@+=].+/m `] = lit`
eM3YTSfmuPb0lUzDcLgT3AWVX7HvXPCkb6GoYWnyU/s=
`;

module.exports[n`DFA minimization >> 2170: /^[ \t]*\$.+/m `] = lit`
sBy6httAn2AiVHZf7oA43Vecorp0yHe1yF2p94EHYV8=
`;

module.exports[n`DFA minimization >> 2171: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m `] = lit`
gmIJspLt18v/GUGeGiel8J3p+M1aEFWR7tsQgDjgFlE=
`;

module.exports[n`DFA minimization >> 2172: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/ `] = lit`
Vq+T/jER6azg5mWKTFyxxxhfe8cPH/mgkXGKKF1UYVI=
`;

module.exports[n`DFA minimization >> 2173: /(?:@[\w-]+|[+=])/m `] = lit`
wz9mXXCQF5XU/QxymGpyYCTRcS8VXx3TYc5JIwUUulU=
`;

module.exports[n`DFA minimization >> 2174: /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/ `] = lit`
/TqqJke10Ph5HY9i+ivSBpkXDP81lAruKZNw5K5U3FQ=
`;

module.exports[n`DFA minimization >> 2175: /[^:\s]+(?=\s*:)/ `] = lit`
zKbEtOuwU+jRWnGHFWSG9pqOasSM6++uZjuFQTr/be8=
`;

module.exports[n`DFA minimization >> 2176: /(\s+)-(?=\s)/ `] = lit`
EkTIQAGpfV90E8pSVKH11d2GSnyAUkJrt88cK58JxiI=
`;

module.exports[n`DFA minimization >> 2177: /(:)[^:\s]+/ `] = lit`
fvEFpWpj+DuermDz+vH1AvlvbNOkw9Q6JIKEJdCnPeU=
`;

module.exports[n`DFA minimization >> 2178: /.(?:.*(?:[\r\n]|.$))*/ `] = lit`
8tO5lDtmnlk5tZPzhzx9J0D+6MsA3+zO4Bd4peFJw0s=
`;

module.exports[n`DFA minimization >> 2179: /^[^\r\n$#*!]+(?=[$#])/m `] = lit`
ATVe0iw8haqhr5ljNyLL4oNYkvvtEmfWYsk9AkTAC+o=
`;

module.exports[n`DFA minimization >> 2180: /[$#](?:[^\\\r\n'"<]|\\.|(["'])(?:\\[\s\S]|\$\([^)]+\)|\`[^\`]+\`|(?!\1)[^\\])*\1|<... `] = lit`
RxDvJG4AfQ/Zj2hM52/EPaw9Gwyi932gSk0a/DnODHE=
`;

module.exports[n`DFA minimization >> 2181: /^[^\s@:$#*!\/\\]+@[^\s@:$#*!\/\\]+(?=:|$)/ `] = lit`
0OQQlFYaPY49g+ky2M/bUh8IyjG/aUrRaouMUvq5fRo=
`;

module.exports[n`DFA minimization >> 2182: /(:)[\s\S]+/ `] = lit`
vB+RQ1dUXPlYqy98RNRpH1WMY8CFjzPox3Meo/vCBTI=
`;

module.exports[n`DFA minimization >> 2183: /(^[$#]\s*)[\s\S]+/ `] = lit`
KlgrUnHYLBNJ8yJzWHp6olBSOI3EUOqMvUnIsQqSgO0=
`;

module.exports[n`DFA minimization >> 2184: /^[$#]/ `] = lit`
Cl+qzuwc4tpxaMJGEj+1Ud9fj5ej2vXOjOA8QNQ2/h4=
`;

module.exports[n`DFA minimization >> 2185: /->|\.\.|[\[=]/ `] = lit`
IZ4EPl2HqVyde04Sh2n09us19PPL6uV3iM8gObXjD1k=
`;

module.exports[n`DFA minimization >> 2186: /[{}(),;:]/ `] = lit`
ZkZiLdOFTS5+qtb/TrUrW9BWRm12bb/+Nkjy3tX7GRw=
`;

module.exports[n`DFA minimization >> 2187: /"(?:[^\r\n\\"]|\\.)*"|'(?:[^\r\n\\']|\\(?:.|u[\da-fA-F]{4}))'/ `] = lit`
1f1FlF3oW8ue3SGpFn5IXDINMH7VeuHoTsBrqjtSDGI=
`;

module.exports[n`DFA minimization >> 2188: /L(?:(?:\w+|\`[^\`\r\n]*\`)\/)*(?:[\w$]+|\`[^\`\r\n]*\`)(?=\s*;)/ `] = lit`
PEycRMvZedFx6df54p9c9Uz15DP00CfUU9KdeF5oKFE=
`;

module.exports[n`DFA minimization >> 2189: /(^|[^\w.-])(?:\w+|<[\w$-]+>)(?=\()/ `] = lit`
JQqFYeXuy1mPoKbbrza6v3vITEEh3lao8eOMnh3Sj9s=
`;

module.exports[n`DFA minimization >> 2190: /[\w$]+(?=:)/ `] = lit`
JWxg+q4QtXMzVEojedbEMkPmEXyeywuRHXO+bvbciS8=
`;

module.exports[n`DFA minimization >> 2191: /(^|[^\w.-])[vp]\d(?![\w.-])/ `] = lit`
PtUFCJ3ELKT/3WD4hPR2iQP/0tNIz3qdZZ+RfqsiEeU=
`;

module.exports[n`DFA minimization >> 2192: /(^|[^\w.-])(?:true|false)(?![\w.-])/ `] = lit`
UcWo9VF+ZIBrZpbS6uyykTgL43imjg5jPMFpP2Rwg2s=
`;

module.exports[n`DFA minimization >> 2193: /(^|[^\/\w.-])-?(?:NAN|INFINITY|0x(?:[\dA-F]+(?:\.[\dA-F]*)?|\.[\dA-F]+)(?:p[+-]... `] = lit`
o8PbsRISWjT9ivqnmWkNaUlb28rpxEe25tIO2a7RB8g=
`;

module.exports[n`DFA minimization >> 2194: /(:)\w+/ `] = lit`
2N1WOoS7J2CeW2kHSBd5Vp3l3sFoegt/DZPDaluhvl8=
`;

module.exports[n`DFA minimization >> 2195: /^L/ `] = lit`
L8s/HUh09wtZkrHcuf+8CQaLvajoyRuq+vr3Qv5mjJ8=
`;

module.exports[n`DFA minimization >> 2196: /([();\[])[BCDFIJSVZ]+/ `] = lit`
bjiNz7/0M1cheu7hndQRJfK/2DLFIwhYg4QTkS3yt/g=
`;

module.exports[n`DFA minimization >> 2197: /([\w$>]:)[BCDFIJSVZ]/ `] = lit`
YFzCdz4vTpPGD/2PGuPQmEokyRUGpbscmlgXMWvwC7c=
`;

module.exports[n`DFA minimization >> 2198: /(\.end\s+)[\w-]+/ `] = lit`
Qj57Gy4qol6Ik5/zkA4QL03h+Qn6aHpopDggBhJU7lE=
`;

module.exports[n`DFA minimization >> 2199: /(^|[^\w.-])\.(?!\d)[\w-]+/ `] = lit`
FkzZFeQARec4puYcjD9AwIk2EOxoETc2ayJe5G3HMEQ=
`;

module.exports[n`DFA minimization >> 2200: /(^|[^\w.-])(?:abstract|annotation|bridge|constructor|enum|final|interface|priva... `] = lit`
6IvadhihQ0JS6s2D8RP/QyM1RlOmvhCRKEcc7m+SF1g=
`;

module.exports[n`DFA minimization >> 2201: /(^L|\/)(?:[\w$]+|\`[^\`\r\n]*\`)$/ `] = lit`
3Clktmrg+A3MLJRG/QYUw5wQluR2fHCv8/qeKDZPx7E=
`;

module.exports[n`DFA minimization >> 2202: /^(L)(?:(?:\w+|\`[^\`\r\n]*\`)\/)+/ `] = lit`
4JI1MVsyq9uGC9NbrfYJtuzVjrsyEuvkLf5SO+JD+vA=
`;

module.exports[n`DFA minimization >> 2203: /'(?:''|[^'])*'/ `] = lit`
OSHWhWgHeo4xD+CoR/FNrMLmUKeazUVBJgQHJPZvv5Y=
`;

module.exports[n`DFA minimization >> 2204: /#[\da-z]+|#(?:-|([+\/\\*~<>=@%|&?!])\1?)|#(?=\()/i `] = lit`
s22llkH1sumX4lalpFICKfZ5RpAHSiLXq/3Jwh82iSQ=
`;

module.exports[n`DFA minimization >> 2205: /\b(?:nil|true|false|self|super|new)\b/ `] = lit`
5nDgulRPLQzXHQSDk3i+bnV/J7UlTAb4CvnkXr5brOU=
`;

module.exports[n`DFA minimization >> 2206: /[<=]=?|:=|~[~=]|\/\/?|\\\\|>[>=]?|[!^+\-*&|,@]/ `] = lit`
ui5+DDR27fjBA2lDulX0toLtNCjA/+QW0/dBZ9klFFk=
`;

module.exports[n`DFA minimization >> 2207: /[.;:?\[\](){}]/ `] = lit`
hh9TWwQqBJr0xYzX52+Gw+8bMdLkc8jIEQ4b+4btJeU=
`;

module.exports[n`DFA minimization >> 2208: /\$./ `] = lit`
I5NcHkBhQSFP177MIZGtzt1Dj8g5imp/6cY1fwaifDE=
`;

module.exports[n`DFA minimization >> 2209: /(\[\s*):[^\[|]*\|/ `] = lit`
Vdl1T7o3ugM+gvKPJy30ElfS6kS5dwl2sKRXqE1je1Y=
`;

module.exports[n`DFA minimization >> 2210: /\|[^|]+\|/ `] = lit`
55nZcOo9cPhOmVd+qmPSyGJ8lKRkT57zZ3RcNotO8Ro=
`;

module.exports[n`DFA minimization >> 2211: /\d+r-?[\dA-Z]+(?:\.[\dA-Z]+)?(?:e-?\d+)?/ `] = lit`
dE6QlYDiYvH5i80tLXvDkjIeBzVEAVthtm/1FcfYV8s=
`;

module.exports[n`DFA minimization >> 2212: /\b\d+(?:\.\d+)?(?:e-?\d+)?/ `] = lit`
90BJ7cjoVy1GNTyNgOqPerLnklgpG05jLgrzhyhsljs=
`;

module.exports[n`DFA minimization >> 2213: /:[\da-z]+/i `] = lit`
6aIuymN1pOo4z9bf1TyhfcDELbUGXmJJYy+d8Uz7qRI=
`;

module.exports[n`DFA minimization >> 2214: /[\da-z]+/i `] = lit`
EMI6iLxIooo0o7m4FJVZckeipQyKqxHG/iv4WnodX7I=
`;

module.exports[n`DFA minimization >> 2215: /\{\*[\s\S]*?\*\}/ `] = lit`
HDntGkRXavyYW9ladxR/0H2V3+TAv84bD1zjOFy0mmY=
`;

module.exports[n`DFA minimization >> 2216: /\b(?:false|off|on|no|true|yes)\b/ `] = lit`
7M9PecEgrQ/eLc3jiMD2n5R3+mK70ZGzeAoSIeHVicQ=
`;

module.exports[n`DFA minimization >> 2217: /^\{|\}$/i `] = lit`
W4AY52cBoSQcGVz0+lDanHZsFAo9JSCbKL809xmRCVc=
`;

module.exports[n`DFA minimization >> 2218: /\$(?!\d)\w+/ `] = lit`
E2noJSdMsx8QIMd0D9sqOoY4Nj4zqcRTdAz3aYX8uFY=
`;

module.exports[n`DFA minimization >> 2219: /#(?!\d)\w+#/ `] = lit`
yg8y/WfRkhq84fPRW0C3GvcY05oGJQgBLCJNIVt1jYA=
`;

module.exports[n`DFA minimization >> 2220: /^\/?(?!\d)\w+/ `] = lit`
0pNmDL5Dxjzwup0XNZp8HRVDrKNkiGg3aVTOqaTkL8E=
`;

module.exports[n`DFA minimization >> 2221: /(?!\d)\w+(?=\()/ `] = lit`
/l7UkHjRum1rPOFJgyMZoSE7VfJNOicvlONUHZ/xhLs=
`;

module.exports[n`DFA minimization >> 2222: /\w+\s*=\s*(?:(?!\d)\w+)?/ `] = lit`
EPG6QQezf+U+JkReUwHHrS/8fR0Ft7H0oHkJT/Q6vis=
`;

module.exports[n`DFA minimization >> 2223: /[\[\]().,:\`]|->/ `] = lit`
DjguOCDFkiH6sy2cdpzH6HpJLfujexkEKKWdx56AiyA=
`;

module.exports[n`DFA minimization >> 2224: /[+\-*\/%]|==?=?|[!<>]=?|&&|\|\|?/ `] = lit`
lw6NkwCfm/MZNCgwP3VragJKOw0mf9ptlacvSfGuHy4=
`;

module.exports[n`DFA minimization >> 2225: /\bis\s+(?:not\s+)?(?:div|even|odd)(?:\s+by)?\b/ `] = lit`
Bvc5oAuMmHiDukPb9yPn0k9bwGcDIMHtZ5xGyV/wF80=
`;

module.exports[n`DFA minimization >> 2226: /\b(?:eq|neq?|gt|lt|gt?e|lt?e|not|mod|or|and)\b/ `] = lit`
v13Zhdm04E1c6n8Dzd6tQmbpx/1/Uv7JH/0kg/WE95g=
`;

module.exports[n`DFA minimization >> 2227: /(\.|->)(?!\d)\w+/ `] = lit`
WmE8mAvgC5+f54H47WA4TsCcWb71RBzPb7a3QWzt4OI=
`;

module.exports[n`DFA minimization >> 2228: /(\[)(?!\d)\w+(?=\])/ `] = lit`
qck/YyAZSTwtFuYs9CuXVGKiU5ELuurUFLGCd/tGEUk=
`;

module.exports[n`DFA minimization >> 2229: /(\|\s*)@?(?!\d)\w+/ `] = lit`
CYW8+x0NpoNAlUENf/Cy3LLpt8R/pw7AX6k1cDCC0mE=
`;

module.exports[n`DFA minimization >> 2230: /(=\s*)(?!\d)\w+/ `] = lit`
kA3b+cjn120Og22GWCjzf/nGt5sHi6GbAyjwW6aQuys=
`;

module.exports[n`DFA minimization >> 2231: /\b(?:address|bool|string|u?int(?:8|16|24|32|40|48|56|64|72|80|88|96|104|112|120... `] = lit`
20HeAPKpYwvfpfKFjfJU1FshNOx052DO43uBI3rytWg=
`;

module.exports[n`DFA minimization >> 2232: /\b(?:_|anonymous|as|assembly|assert|break|calldata|case|constant|constructor|co... `] = lit`
gKAML2AvlK4CXBbU5zvPFx2fpu/6qwow7nB4DKtxCok=
`;

module.exports[n`DFA minimization >> 2233: /=>|->|:=|=:|\*\*|\+\+|--|\|\||&&|<<=?|>>=?|[-+*\/%^&|<>!=]=?|[~?]/ `] = lit`
GK2On5IkDgkN2lcstKW7wQYOycO7l4JVgrq30m0Hbgc=
`;

module.exports[n`DFA minimization >> 2234: /(\b(?:contract|enum|interface|library|new|struct|using)\s+)(?!\d)[\w$]+/ `] = lit`
RvUO9rGl2yyEjhrEZ3Gk4ed3NVnTOYiDnljrfUAItZY=
`;

module.exports[n`DFA minimization >> 2235: /([<>]=?|\^)\d+\.\d+\.\d+\b/ `] = lit`
8mf2oBqh69GRg/xBvyQ1YYNoKdCIJTnotXzmne1J9Us=
`;

module.exports[n`DFA minimization >> 2236: /\b(?:FALSE|TRUE)\b/ `] = lit`
zDCAra5oiWgfik89x+aIxaxJSYn+G6sbioLWkmOAZYE=
`;

module.exports[n`DFA minimization >> 2237: /^([ \t]*)(?:([A-Z]\w*)\b(?=.*(?:\r\n?|\n)(?:\1[ \t].*(?:\r\n?|\n))*\1End\2(?=[ ... `] = lit`
zrlWg8NTTuGJWYbLCgQOeyFqdpALvhu1nTbMRDoQXYI=
`;

module.exports[n`DFA minimization >> 2238: /^([ \t]*)[^\r\n"#=()]*[^\s"#=()](?=\s*=)/m `] = lit`
qvVQoiIGEDEoY0GNbfvJM2Bm52UvTuEV80yyqaLuQY8=
`;

module.exports[n`DFA minimization >> 2239: /\{[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}\}/i `] = lit`
iEDz/sEtJTwczmby/OVVtqHhytMV0GPhzZc8fSpo0gE=
`;

module.exports[n`DFA minimization >> 2240: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[\dA-F]+\b/ `] = lit`
UOtsXVd+7W6+oiPiVguFDBt1JqiNSQs4lKviPhTb+eg=
`;

module.exports[n`DFA minimization >> 2241: /\?:?|<=?|>=?|==?|!=|[+*\/%-]|\b(?:and|not|or)\b/ `] = lit`
4CIchLjbbvjQUc0xBMJVKt1jVHfk5rU2/rt1KKo1BBA=
`;

module.exports[n`DFA minimization >> 2242: /[{}()\[\]|.,:]/ `] = lit`
5tApa0xDBKSzJOwSOXyMFZtDfrpFTcGM+wy8uJaOBzc=
`;

module.exports[n`DFA minimization >> 2243: /({+\/?\s*(?:alias|call|delcall|delpackage|deltemplate|namespace|template)\s+)\.... `] = lit`
CeIXsa13TQgnQSfAdmGsHmRcUdtVLjJXx2x4wqTEjOg=
`;

module.exports[n`DFA minimization >> 2244: /({+\/?\s*@?param\??\s+)\.?[\w.]+/ `] = lit`
Uic52leTL49ATckUsC11n0hkwwBFGL3Z14k1kYjy3Wk=
`;

module.exports[n`DFA minimization >> 2245: /\b(?:any|as|attributes|bool|css|float|in|int|js|html|list|map|null|number|strin... `] = lit`
pizpaFmXWp35i+1q5dx8VwXI1wwjZ5RAjlEdHSJxgy8=
`;

module.exports[n`DFA minimization >> 2246: /^{+\/?|\/?}+$/ `] = lit`
bB/IHA90TIGmMEezZsgNyzspOA6+1KKZvdGs5aUDX2o=
`;

module.exports[n`DFA minimization >> 2247: /\$[^\W\d]\w*(?:\??(?:\.\w+|\[[^\]]+]))*/ `] = lit`
k4fBWUSh5VQSJkbFMgInN5ig0jIb5kX3Dbf1qJ77Kwo=
`;

module.exports[n`DFA minimization >> 2248: /(\s)\/\/.*/ `] = lit`
yWpZmRIXEfi08M0emO29/AcF7c1gjnqPu27XsaxNSrw=
`;

module.exports[n`DFA minimization >> 2249: /({+\/?[^\S\r\n]*)(?:\\[nrt]|alias|call|case|css|default|delcall|delpackage|delt... `] = lit`
IIH0ooTQpjAIo5GAqwE4AyTE56X7wnvPa2TnnoUQq/A=
`;

module.exports[n`DFA minimization >> 2250: /[\[\].?]/ `] = lit`
Ouh4rPG2Po586j8YD2nUX9Xix9m9G2t0SLUjHmYG83I=
`;

module.exports[n`DFA minimization >> 2251: /(\|[^\S\r\n]*)\w+/ `] = lit`
kc9xZ04owpVIcxUSMeD/DAqnJV2GIHDhKLrdm9jOZaE=
`;

module.exports[n`DFA minimization >> 2252: /[+-]?\b\d+\.?\d*(?:e[+-]?\d+)?/i `] = lit`
SJ+Hj7X46Mxa/daywuUehtX6EH+LVZ00fNqP5vFWn5k=
`;

module.exports[n`DFA minimization >> 2253: /[{}.,;()[\]]|\^\^/ `] = lit`
CvKpI40cGo1gltK3ZCMGQgS8/IoWEKYy3qbHrJM/Zwc=
`;

module.exports[n`DFA minimization >> 2254: /"""(?:(?:""?)?(?:[^"\\]|\\.))*"""|'''(?:(?:''?)?(?:[^'\\]|\\.))*'''/ `] = lit`
bAE/a6nrqEvEvC6UBxJODDiqGI9DP/V/OIT3ZeSZUn4=
`;

module.exports[n`DFA minimization >> 2255: /"(?:[^\\"\r\n]|\\.)*"|'(?:[^\\'\r\n]|\\.)*'/ `] = lit`
q2BJHXfAE0k/7oyqfcfI/g0WoLdyZTDaC8xv4du9lFM=
`;

module.exports[n`DFA minimization >> 2256: /<(?:[^\x00-\x20<>"{}|^\`\\]|\\(?:u[\da-fA-F]{4}|U[\da-fA-F]{8}))*>/ `] = lit`
mqYIBWIkFt2xDCgbtawPh/dRPFV93h5LikypVpulTpo=
`;

module.exports[n`DFA minimization >> 2257: /(?:(?![-.\d\xB7])[-.\w\xB7\xC0-\uFFFD]+)?:(?:(?![-.])(?:[-.:\w\xC0-\uFFFD]|%[\d... `] = lit`
svwBTqvvKhcBq9Q/pUxmpbYglBNIPdMjBw6zYxf+DMk=
`;

module.exports[n`DFA minimization >> 2258: /(?:\ba|@prefix|@base)\b|=/ `] = lit`
SzAxvVhaPcY8xZJ5TOIKK79osP5kzNSerAgJ2p94ilA=
`;

module.exports[n`DFA minimization >> 2259: /\b(?:graph|base|prefix)\b/i `] = lit`
uHnZ5XTRQ9Om1PtvFa6ndYHs07GXbmyUZ1JU/GFEwJ4=
`;

module.exports[n`DFA minimization >> 2260: /@[a-z]+(?:-[a-z\d]+)*/i `] = lit`
Q6aZfEFbPPW7C7A8BnUmm0nwIJlP3xJaW5OW83f3syU=
`;

module.exports[n`DFA minimization >> 2261: /\b(?:A|ADD|ALL|AS|ASC|ASK|BNODE|BY|CLEAR|CONSTRUCT|COPY|CREATE|DATA|DEFAULT|DEL... `] = lit`
npeh4/KcQod9y/2OssCFgF6gYnbHKUBlDxzJdowfFrk=
`;

module.exports[n`DFA minimization >> 2262: /\b(?:ABS|AVG|BIND|BOUND|CEIL|COALESCE|CONCAT|CONTAINS|COUNT|DATATYPE|DAY|ENCODE... `] = lit`
qHXQ9th3fpCo4NcazSVasbAdxyheM9ZvM6cnR+YSZKE=
`;

module.exports[n`DFA minimization >> 2263: /\b(?:GRAPH|BASE|PREFIX)\b/i `] = lit`
uHnZ5XTRQ9Om1PtvFa6ndYHs07GXbmyUZ1JU/GFEwJ4=
`;

module.exports[n`DFA minimization >> 2264: /[?$]\w+/ `] = lit`
ObCeLLVDwspPfN8nYJkDzQx2WUURlZT4NSCBZjniRY0=
`;

module.exports[n`DFA minimization >> 2265: /@/ `] = lit`
DaN3z4l9Mz1WDy4EP24sbb7jbXwSWwCA11xcZ8YkrHA=
`;

module.exports[n`DFA minimization >> 2266: /([^:]*:)[\s\S]+/ `] = lit`
raDLDoijlZWNJkAG18xSqEzqCTXyxfwe117j+7JFTLQ=
`;

module.exports[n`DFA minimization >> 2267: /\`comment\("(?:\\.|[^\\"])*"\)\`/ `] = lit`
SteZu4HUvg0ograH08cKSFG3duPHwI2Sd8oonNeKh4s=
`;

module.exports[n`DFA minimization >> 2269: /\w+(?=\s*=(?!=))/ `] = lit`
PX01OpWwgLikVwjPe4cOwnzZ/6ZDFiZRQM7byDI1Pug=
`;

module.exports[n`DFA minimization >> 2270: /\b(?:f|false|t|true)\b/i `] = lit`
aovF2/Rv4wkvMGC7JbvnxoHwspbS0MrBDxEHGiDX0F8=
`;

module.exports[n`DFA minimization >> 2271: /[<>=]=?|[-+*\/%|]/ `] = lit`
qb5KXg/plKMNdDeZEgh4tLo2buF4DemGipXrzOSzvGA=
`;

module.exports[n`DFA minimization >> 2272: /[()[\],]/ `] = lit`
/jAdX6h+lyP0DQlGL7QJKO/MyJdQTH801mu2B4ufIMU=
`;

module.exports[n`DFA minimization >> 2273: /"(?:\\.|[^\\"])*"/ `] = lit`
NBJW5CrJdsoEdhgCZrk2vcnHTAjHhudOUJ724Qvv0Ag=
`;

module.exports[n`DFA minimization >> 2274: /\b(?:and|as|by|not|or|xor)\b/i `] = lit`
3HZvnbnC/q84jng/id2DoFueqdlJF7AAb5rp3A0seVo=
`;

module.exports[n`DFA minimization >> 2275: /\b\d{1,2}\/\d{1,2}\/\d{1,4}(?:(?::\d{1,2}){3})?\b/ `] = lit`
JRho80HGwGeKyNg4p2IBWfANWfczF6OmC23R+2s+Oic=
`;

module.exports[n`DFA minimization >> 2276: /\b(?:breakOut|breakTo|call|case|catch|default|do|echo|else|execVM|execFSM|exitW... `] = lit`
iej8X7rdiw9RiPBcdmWlvIv0EgsqWpgoIz75584/ga8=
`;

module.exports[n`DFA minimization >> 2278: /(?:\$|\b0x)[\da-f]+\b|(?:\B\.\d+|\b\d+(?:\.\d+)?)(?:e[+-]?\d+)?\b/i `] = lit`
l7BPVR+O4ke+BConXG1RdXWwLhijp16S7bGAd18/3MM=
`;

module.exports[n`DFA minimization >> 2279: /##|>>|&&|\|\||[!=<>]=?|[-+*\/%#^]|\b(?:and|mod|not|or)\b/i `] = lit`
nAO5fwla3/eT4GAs+PZvYOCO5GQiqhKpg6nQqfkPwd8=
`;

module.exports[n`DFA minimization >> 2280: /\bDIK(?:_[a-z\d]+)+\b/i `] = lit`
rJSYcRw1FtatCJnezyo9TdSoTFPG6oBXrW6Kf+o0Jf0=
`;

module.exports[n`DFA minimization >> 2281: /(^\s*)#[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im `] = lit`
MGJrR+4G9uzcRv3/glYIKt5HZBtVBdPDiTK4tYPUK8w=
`;

module.exports[n`DFA minimization >> 2282: /"(?:(?:"")?[^"])*"(?!")|'(?:[^'])*'/ `] = lit`
4MAeZez3iLXN3rwfJcI8GD6F948pnrk6PsZMxNFD7mA=
`;

module.exports[n`DFA minimization >> 2283: /\b(?:_exception|_fnc_scriptName|_fnc_scriptNameParent|_forEachIndex|_this|_this... `] = lit`
8lbnrtYULrnhb5YQTg8nGOwltTJW5lRH5mHQidee4As=
`;

module.exports[n`DFA minimization >> 2284: /#[a-z]+\b/i `] = lit`
l9bWMG1vz5/cpdHRGcVA36Q7LR1wdSimwlVzSYPiWY8=
`;

module.exports[n`DFA minimization >> 2285: /\b(?:END_)?(?:PROGRAM|CONFIGURATION|INTERFACE|FUNCTION_BLOCK|FUNCTION|ACTION|TR... `] = lit`
2xNXc1p5cw19nU78LoE4LIjwyIyrNhAr6AT4l6J6204=
`;

module.exports[n`DFA minimization >> 2286: /\b(?:(?:END_)?(?:IF|WHILE|REPEAT|CASE|FOR)|ELSE|FROM|THEN|ELSIF|DO|TO|BY|PRIVAT... `] = lit`
K06fTKz5CqxzX9m7rsQkD5ItnN2VohpcnCrAKyxTWl0=
`;

module.exports[n`DFA minimization >> 2287: /\b(?:AT|BOOL|BYTE|(?:D|L)?WORD|U?(?:S|D|L)?INT|L?REAL|TIME(?:_OF_DAY)?|TOD|DT|D... `] = lit`
/d7n0Wfmp76N87E8kMjlWOBVHQxqDyVenIE8ikfg68U=
`;

module.exports[n`DFA minimization >> 2288: /%[IQM][XBWDL][\d.]*|%[IQ][\d.]*/ `] = lit`
cp/O4gGbs2UIdkViJTYpMmn4HFPAGJhRojtEp3bb4tw=
`;

module.exports[n`DFA minimization >> 2289: /\b(?:16#[\da-f]+|2#[01_]+|0x[\da-f]+)\b|\b(?:T|D|DT|TOD)#[\d_shmd:]*|\b[A-Z]*\#... `] = lit`
Uwxh//SmsJtDiU2DZ43MztYjiJgP2+aRnrkZzM0bzos=
`;

module.exports[n`DFA minimization >> 2290: /\b(?:TRUE|FALSE|NULL)\b/ `] = lit`
GzZmsD9uulg8Y8WPc716XlurnSuezroj6ctIn5f43uM=
`;

module.exports[n`DFA minimization >> 2291: /(?:S?R?:?=>?|&&?|\*\*?|<=?|>=?|[-:^\/+])|\b(?:OR|AND|MOD|NOT|XOR|LE|GE|EQ|NE|GE... `] = lit`
Oo02cHTpApcUafTV3gbRvAVBhRSZv00hCmFaU2rgVi4=
`;

module.exports[n`DFA minimization >> 2292: /[();]/ `] = lit`
6mBNN4T8mJRFffPVOfYaaUEEZn8RrTy4nUPVIp/jC00=
`;

module.exports[n`DFA minimization >> 2293: /(^|[^\\])(?:\/\*[\s\S]*?(?:\*\/|$)|\(\*[\s\S]*?(?:\*\)|$)|\{[\s\S]*?(?:\}|$))/ `] = lit`
kpRHl376Y11+/vldF4M/9qlWQncX/f05OWli11NouQk=
`;

module.exports[n`DFA minimization >> 2294: /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer... `] = lit`
VV0yXyOJRK4UOAg+z1Ov/D5mgek9gDUs5FaYAu54j28=
`;

module.exports[n`DFA minimization >> 2295: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/... `] = lit`
mHVK5/iZAX+gJdpmrkfHQMpKuzOOPDJyJtLgMfBUtuM=
`;

module.exports[n`DFA minimization >> 2296: /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/ `] = lit`
xxxH+eWwxHLzoJisR+FbGj4zdO21flkv3vDtJbbBg1o=
`;

module.exports[n`DFA minimization >> 2297: /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noretu... `] = lit`
JWKqIjqgLfojXbpplMsHbdk6+WQ8BBNxe+XVG3OYyBQ=
`;

module.exports[n`DFA minimization >> 2298: /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2299: /("|')(?:\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/ `] = lit`
CrF1olXE/iS+Na+OMhKq371vPzjMKbvy/6CU4QbxFXc=
`;

module.exports[n`DFA minimization >> 2300: /\\\((?:[^()]|\([^)]+\))+\)/ `] = lit`
SIKp0II2cSdlNY4JhHNnrza38gLJ4ExfenVT7QJk3Kw=
`;

module.exports[n`DFA minimization >> 2301: /<#[\s\S]+?#>/ `] = lit`
z74FDM84R9rKClQIbI+0OijxlPSWS7NVRd20uRmnON4=
`;

module.exports[n`DFA minimization >> 2302: /<#@[\s\S]*?#>/ `] = lit`
VLTuy7qZ6k7ymobdhI6dYLtHBnGSWfZPqcNJIksEbOE=
`;

module.exports[n`DFA minimization >> 2303: /<#=[\s\S]*?#>/ `] = lit`
yJPJSGBSDpl6TkS2/QTnBnAn04IMvYLEeu8hM1OUCuw=
`;

module.exports[n`DFA minimization >> 2304: /<#\+[\s\S]*?#>/ `] = lit`
vkG6v7AlLXJtO10JSomdkA8xPDYW8qDTNFAL430sGW4=
`;

module.exports[n`DFA minimization >> 2305: /<#[\s\S]*?#>/ `] = lit`
f7ZI2yy6pWuIDedSO7/wYlI/Mu5nQAjiGgwoB3AnfZo=
`;

module.exports[n`DFA minimization >> 2306: /^<#@|#>$/ `] = lit`
kEY7YU9pCjT06LnjAuTAN3TC7K3uVdEhA5GmCw6ug2Y=
`;

module.exports[n`DFA minimization >> 2307: /^<#=|#>$/ `] = lit`
LbfNAw5ZYZmlgbQn4OAtss7W28WIQb1dEUoMy4m5mvc=
`;

module.exports[n`DFA minimization >> 2308: /^<#\+|#>$/ `] = lit`
VhvP8JUDclE4+GGpvNtVWSGRinaIxnV1atYy//gH3RY=
`;

module.exports[n`DFA minimization >> 2309: /^<#|#>$/ `] = lit`
KYsi4t1+cHX95HUhH148TDMCOohvslvB/oz/NqolJb8=
`;

module.exports[n`DFA minimization >> 2310: /\w+(?=\s)/ `] = lit`
fO6QAPrCyvtusNES7Hdi3tGsYSlqSKecIkhVMsQ/cJU=
`;

module.exports[n`DFA minimization >> 2311: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/ `] = lit`
hbX23GqpZtZGTY3pyf7y/2xoeIkJtvd/8jYo3MEyodw=
`;

module.exports[n`DFA minimization >> 2312: /^=|^["']|["']$/ `] = lit`
GWn5pj+Zhdx+fy5HSGGOmFXAG/fYXkpLxJ/4zYkOE4s=
`;

module.exports[n`DFA minimization >> 2314: /(^|[^\\:])'.*/ `] = lit`
CP6jQ4ktE6acZQnhCRY/dh21GyDyAUVwIMEbuc3Lcqk=
`;

module.exports[n`DFA minimization >> 2315: /!(?:<[\w\-%#;\/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;\/?:@&=+$.~*'()]... `] = lit`
OpDyEPF/JNoR+/CRqOBSnFwcLfAIbNhnriv1t3iI2I8=
`;

module.exports[n`DFA minimization >> 2316: /[*&][^\s[\]{},]+/ `] = lit`
bXLMmJGkdbV7XWI34xaW6JfMGUxV5lpPgllddkZTE0g=
`;

module.exports[n`DFA minimization >> 2317: /---|[:[\]{}\-,|>?]|\.\.\./ `] = lit`
LmkdjCZGgXFS8yEI7u2vNmqtZ2mz+IE98kncuNCLC04=
`;

module.exports[n`DFA minimization >> 2318: /not ok[^#{\n\r]*/ `] = lit`
BH8i9VAYoeaziDwantW2StT8Tm8xJq6XcsICCIxfEI0=
`;

module.exports[n`DFA minimization >> 2319: /ok[^#{\n\r]*/ `] = lit`
NKrpkcLrasplsPRU0+F8VMuDrAQULzxHMC/toEGfLbM=
`;

module.exports[n`DFA minimization >> 2320: /pragma [+-][a-z]+/ `] = lit`
KtwTb6Dde04hnGlBXK0i64WOoPYUdJBCGlEdCKqxYgg=
`;

module.exports[n`DFA minimization >> 2321: /bail out!.*/i `] = lit`
/wHzxYZ792NShO1mdQW5rYnTMOXZ6GvwtsoUg7h5UdQ=
`;

module.exports[n`DFA minimization >> 2322: /TAP version \d+/i `] = lit`
ewKa3VC/ZMWoaaZs+MnnQk+fSYqgzLD1zLyxoETva2A=
`;

module.exports[n`DFA minimization >> 2323: /\d+\.\.\d+(?: +#.*)?/ `] = lit`
GS6BJbiIXP0+/mz0oO4SkAWTkSBc6Rfyubuphlgd3/k=
`;

module.exports[n`DFA minimization >> 2324: /([\-:]\s*(?:\s(?:!(?:<[\w\-%#;\/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#... `] = lit`
1vc4zxYQDihAIePeWuLwPGDeU8dtiskdWxLo5s8EnQQ=
`;

module.exports[n`DFA minimization >> 2325: /((?:^|[:\-,[{\r\n?])[ \t]*(?:(?:!(?:<[\w\-%#;\/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z... `] = lit`
3ULi/J768J+co20Q+IKwQmm1OBZJHRq7VHeNibz0xcw=
`;

module.exports[n`DFA minimization >> 2326: /(^[ \t]*)%.+/m `] = lit`
bc/8lnM2uJacMY1FUYHYKWQcMfd7V3iZFvFxs2jbO6U=
`;

module.exports[n`DFA minimization >> 2327: /([:\-,[{]\s*(?:\s(?:!(?:<[\w\-%#;\/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\... `] = lit`
LXV95mRkbAzSje5Wj8hwlNvlSeWRCNPunHtjVUmGyBA=
`;

module.exports[n`DFA minimization >> 2328: /([:\-,[{]\s*(?:\s(?:!(?:<[\w\-%#;\/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\... `] = lit`
dphai4mHR4+MrHZCK2PbRbuooyE+SpH2YsHji1lENNo=
`;

module.exports[n`DFA minimization >> 2329: /([:\-,[{]\s*(?:\s(?:!(?:<[\w\-%#;\/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\... `] = lit`
+Yh7acdI8iZ0t6EgZjHLmHo38XFrxc8TxVAv+Spzn3U=
`;

module.exports[n`DFA minimization >> 2330: /([:\-,[{]\s*(?:\s(?:!(?:<[\w\-%#;\/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\... `] = lit`
WX3qtfFvgTAKVnGsBccxqm6RkXcTFr3v/r7aiCM64ac=
`;

module.exports[n`DFA minimization >> 2331: /([:\-,[{]\s*(?:\s(?:!(?:<[\w\-%#;\/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\... `] = lit`
S6jMNQhNmVJYThwAypb6enXaCjWZdntDOnCkJneXoLg=
`;

module.exports[n`DFA minimization >> 2332: /# Subtest(?:: .*)?/ `] = lit`
ZO0HkntC0TwhdzSmUmLXrJwt9r763QXDMRi3i91xpFg=
`;

module.exports[n`DFA minimization >> 2333: /(^[^\S\r\n]*)---(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?[^\S\r\n]*\.\.\.$/m `] = lit`
ngHY89+WJ62f/z7xywMHhjdmFm9YdLwTkKtiaNj+m8E=
`;

module.exports[n`DFA minimization >> 2334: /!=?|\*\*?|==|&&?|\|\|?|<[=<]?|>[=>]?|[-+~\/%?^]|\b(?:eq|ne|in|ni)\b/ `] = lit`
YhMHYRYXLzvYAqdf/Yo+y+VR8HlQyDRS8nM1WYRxopM=
`;

module.exports[n`DFA minimization >> 2335: /[{}()\[\]]/ `] = lit`
S2A9xAKrNxYGhrILx4/Cl3AfU8uvFW3U+m9pBZpOrMo=
`;

module.exports[n`DFA minimization >> 2336: /"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"/ `] = lit`
X/VsFRO+bZjM6c4Dxc8SFvJc2/Z2V+dkzimQc8HUz5E=
`;

module.exports[n`DFA minimization >> 2337: /(^\s*proc[ \t]+)[^\s]+/m `] = lit`
ADoeF0VjTK1hia7R9Y6XRrhfIWRnwFA8GlcAK1o56XU=
`;

module.exports[n`DFA minimization >> 2338: /\b(?:elseif|else)\b/ `] = lit`
9cncXtWBFLzQkEYJtnsVPPP6E6GosCuw0DTir/cDZC8=
`;

module.exports[n`DFA minimization >> 2339: /(^\s*)(?:global|upvar|variable)\b/m `] = lit`
N3P8H3U6NKrSSQMeLabZ4vy7zHjwUZxxpIAWSbeoBDc=
`;

module.exports[n`DFA minimization >> 2340: /(^\s*|\[)(?:after|append|apply|array|auto_(?:execok|import|load|mkindex|qualify... `] = lit`
MYx3PTFwuxIvWEPIioTPqi8lvmXGqvg4jPbyHLcd6AQ=
`;

module.exports[n`DFA minimization >> 2341: /(\$)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/ `] = lit`
L1VBH2JzdmPUvSRQCUepqGnlo/cZLNGl0tYlMFHZdqE=
`;

module.exports[n`DFA minimization >> 2342: /(\$){[^}]+}/ `] = lit`
j1/v+uTIVzzTUr0/0nGY3jAVuTYNmj76e+0DzE/YAEM=
`;

module.exports[n`DFA minimization >> 2343: /(^\s*set[ \t]+)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/m `] = lit`
V3so3gsn9OwC4NRBg1hYTHde9Gz9/fD08ZG8RH065VM=
`;

module.exports[n`DFA minimization >> 2344: /(^\s*)(?:proc|return|class|error|eval|exit|for|foreach|if|switch|while|break|co... `] = lit`
y0/GLkwPzMlzhvH1gdRI84H6G/HYesL1I+QdoRO1B4E=
`;

module.exports[n`DFA minimization >> 2345: /#.*|\[%#[\s\S]*?%\]/ `] = lit`
F0kF8K7mbRjDrfQ2zYljFr/SHywJKfFUVtlgAnAWvvI=
`;

module.exports[n`DFA minimization >> 2346: /\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FORE... `] = lit`
jhb+L9o49Jt1Fi+ikpQewtIJMaJ3irLnvopySXw5BDY=
`;

module.exports[n`DFA minimization >> 2347: /=[>=]?|!=?|<=?|>=?|&&|\|\|?|\b(?:and|or|not)\b/ `] = lit`
6V7MCNk7NE1meQJcIp9Ocr2fWU+WRuwd145e/isva10=
`;

module.exports[n`DFA minimization >> 2348: /[[\]{},()]/ `] = lit`
iglKt0sw55oGX36OeEv6h6ML3VYcy2o/r8eRjdtkOhE=
`;

module.exports[n`DFA minimization >> 2349: /'[^\\']*(?:\\[\s\S][^\\']*)*'/ `] = lit`
D547X8KZ44dtJLwcTjCZDS+2/WcVUHbpxGIAR2njePA=
`;

module.exports[n`DFA minimization >> 2350: /"[^\\"]*(?:\\[\s\S][^\\"]*)*"/ `] = lit`
901gjCaUOwjwFLfIL54nMX9rgHEl6ouvkBv/aY0K38w=
`;

module.exports[n`DFA minimization >> 2351: /^(?:\[%|%%)-?|-?%]$/ `] = lit`
WcC0zDe3niPFoytBq4MSCFtobE1H7sWHZrFZBYMGk2I=
`;

module.exports[n`DFA minimization >> 2352: /\b[a-z]\w*(?:\s*\.\s*(?:\d+|\$?[a-z]\w*))*\b/i `] = lit`
AXBDPzYsgOb6+ySBbF9Pwnt+uTzj8XmkyzBCHExH9Y8=
`;

module.exports[n`DFA minimization >> 2353: /\$(?:[a-z]\w*(?:\.(?:\d+|\$?[a-z]\w*))*)/i `] = lit`
m9qr2nyQVZKQZtk0ZmxNWKZavTSr47GmZWibiVhYPUQ=
`;

module.exports[n`DFA minimization >> 2354: /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\... `] = lit`
fNc/rOqg7u0gP02ycmsgt9j4OxOsHEuCG4+3ZBODe5E=
`;

module.exports[n`DFA minimization >> 2355: /[.,=[\]{}]/ `] = lit`
XUvbLAUGqCXAYq6gwgMm0FdavTzI0Wb3f0RPiGAn7uE=
`;

module.exports[n`DFA minimization >> 2356: /(^\s*\[\s*(?:\[\s*)?)(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")(?:\s*\.\s*(?:... `] = lit`
kP7BJCoGukV4P4Myf/rYQtCkQjQRPb0rwhq7dqdWhKo=
`;

module.exports[n`DFA minimization >> 2357: /(^\s*|[{,]\s*)(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")(?:\s*\.\s*(?:[\w-]+|... `] = lit`
CMRl2v4vDea9g0Nr3dWkPEZsFH2hQdFtqfvPHn4CA2U=
`;

module.exports[n`DFA minimization >> 2358: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/ `] = lit`
3kvTHghL+av3L4nOXxNu9EDErra1Ox1/SCG3hYr0who=
`;

module.exports[n`DFA minimization >> 2359: /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\... `] = lit`
WPt4Hh4Jo31270/BeCBKFTwGiwMhwpJDtAgXsE+L/uY=
`;

module.exports[n`DFA minimization >> 2360: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/ `] = lit`
owMojDN3jLeMjN3TxEd2oPUtrSSABl3OMYP7mQXQRaQ=
`;

module.exports[n`DFA minimization >> 2361: /\b(?:abstract|actor|array|auto|autoexpandcategories|bool|break|byte|case|class|... `] = lit`
f13fyA90p742oliQg9XP/wXFLvLULgn4f+4U9t4Tyac=
`;

module.exports[n`DFA minimization >> 2362: />>|<<|--|\+\+|\*\*|[-+*\/~!=<>$@]=?|&&?|\|\|?|\^\^?|[?:%]|\b(?:Cross|Dot|Clockw... `] = lit`
O5sDaDNIsGWaUZr8/CcAEqC1wQL6lV2E9zsqAQ6TXBY=
`;

module.exports[n`DFA minimization >> 2363: /[()[\]{};,.]/ `] = lit`
cL2HxM2p/FcOqSmfqb0J4OVMJEPHlnV3HJO5n9O96gg=
`;

module.exports[n`DFA minimization >> 2364: /(\b(?:(?:autoexpand|hide|show)categories|var)\s*\()[^()]+(?=\))/ `] = lit`
akdecotern+3zZzTyyE/98TVdTQOX+0NwU/gT690v/c=
`;

module.exports[n`DFA minimization >> 2365: /(\w\s*)<\s*\w+\s*=[^<>|=\r\n]+(?:\|\s*\w+\s*=[^<>|=\r\n]+)*>/ `] = lit`
V9fl703/punq9TrzLmwFm6B9Sc9TRYXeKRLdINkxj+g=
`;

module.exports[n`DFA minimization >> 2366: /(\b(?:class|enum|extends|interface|state(?:\(\))?|struct|within)\s+)\w+/ `] = lit`
lWeyNAHg4q9Lh6hHrUfMvGVxazH0Awvoh5PZFMP34SE=
`;

module.exports[n`DFA minimization >> 2367: /\w+(?=\s*=)/ `] = lit`
PX01OpWwgLikVwjPe4cOwnzZ/6ZDFiZRQM7byDI1Pug=
`;

module.exports[n`DFA minimization >> 2368: /[<>|]/ `] = lit`
ev1Vwrdp2ZESIQ8ZhQrxYh6f9DDQ17+pCVO20mGrXwc=
`;

module.exports[n`DFA minimization >> 2369: /(^|[^\\])#\[\[[\s\S]*?]]#/ `] = lit`
fnKGuic7EH4hNxUipS9duJaMDCFt9Ag4E4rD1l2OTJU=
`;

module.exports[n`DFA minimization >> 2370: /(^|[^\\](?:\\\\)*)#@?(?:[a-z][\w-]*|{[a-z][\w-]*})(?:\s*\((?:[^()]|\([^()]*\))*... `] = lit`
ly3CPL/IulJHJbuOB7WlOWIDNysC+dMXaFmXcCXQ0Kk=
`;

module.exports[n`DFA minimization >> 2371: /(^|[^\\](?:\\\\)*)\$!?(?:[a-z][\w-]*(?:\([^)]*\))?(?:\.[a-z][\w-]*(?:\([^)]*\))... `] = lit`
UKUqzmu0BG4/dyvleMS9bjpUUwqfRy2ehjaEftzdblM=
`;

module.exports[n`DFA minimization >> 2372: /^#\[\[|]]#$/ `] = lit`
hMH8fKSNCCJ3wp53DuxmOvbnW857B7ScRrIVz/DwEwo=
`;

module.exports[n`DFA minimization >> 2373: /(^|[^\\])#\*[\s\S]*?\*#/ `] = lit`
WrqOuyItWOAlAy9O7vI79gtpa9z8/zv6VHE7IfrkIqg=
`;

module.exports[n`DFA minimization >> 2374: /(^|[^\\])##.*/ `] = lit`
xBjSG+La4uIrKTsrj+ggt48CEyeuADOzIDfDN/DZf3o=
`;

module.exports[n`DFA minimization >> 2375: /[(){}[\]:,.]/ `] = lit`
JN/fCHc79rY3Es/Q+sH2dz76lJv4HXs1LkjcFwcPQpU=
`;

module.exports[n`DFA minimization >> 2376: /^#@?(?:[a-z][\w-]*|{[a-z][\w-]*})|\bin\b/ `] = lit`
jPDjARg81KAI1qP/dQfWnNWVrIFqw/I3EFs0TeSvJ0w=
`;

module.exports[n`DFA minimization >> 2377: /[=!<>]=?|[+*\/%-]|&&|\|\||\.\.|\b(?:eq|g[et]|l[et]|n(?:e|ot))\b/ `] = lit`
1A4zx1/Y0x8VhOesd4Xk0NrNfY/jUiv1sszKj1aO4Fk=
`;

module.exports[n`DFA minimization >> 2378: /([^\w-])[a-z][\w-]*(?=\()/ `] = lit`
zLtqlVffHu31vJk7TthXtuwaTGpKH4ZQD21Hy7WhGu4=
`;

module.exports[n`DFA minimization >> 2379: /\B\$\w+\b/ `] = lit`
RQJC+6hkWbDXNo5naUkdYhLDRPuqQa8CZNP/KrZmQto=
`;

module.exports[n`DFA minimization >> 2380: /\B\`\w+\b/ `] = lit`
dqdC/I2glWJVoH+WSCyGhalGIB8hQ4oGZ6t7yXOUFKk=
`;

module.exports[n`DFA minimization >> 2382: /\b(?:always_latch|always_comb|always_ff|always)\b ?@?/ `] = lit`
vBF/y9w7C/uHysSRrdU35KjOruEbpUYfQhb0PGD3/SI=
`;

module.exports[n`DFA minimization >> 2383: /\B##?\d+|(?:\b\d+)?'[odbh] ?[\da-fzx_?]+|\b\d*[._]?\d+(?:e[-+]?\d+)?/i `] = lit`
muFI1sS3e+mwAaCb1c2RbqlhLogHX0/e6RDhLBnehqM=
`;

module.exports[n`DFA minimization >> 2384: /[-+{}^~%*\/?=!<>&|]+/ `] = lit`
++Mrs3WUKl6g9XRLgYM+w2ky0ktE2TxnwqtmNWmEjkA=
`;

module.exports[n`DFA minimization >> 2385: /[[\];(),.:]/ `] = lit`
Na/CIDtjDVWPjKmFIdw0sz9CklPxUWlk2ZOMQTForBY=
`;

module.exports[n`DFA minimization >> 2386: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/ `] = lit`
X/VsFRO+bZjM6c4Dxc8SFvJc2/Z2V+dkzimQc8HUz5E=
`;

module.exports[n`DFA minimization >> 2387: /"(?:[^\\"\r\n]|\\(?:\r\n|[\s\S]))*"/ `] = lit`
X/VsFRO+bZjM6c4Dxc8SFvJc2/Z2V+dkzimQc8HUz5E=
`;

module.exports[n`DFA minimization >> 2388: /\b(?:use|library)\b/i `] = lit`
2O7cEtgFNJsW0iSPAmY8mCKuHnTPKdw+hbeXjIfVTro=
`;

module.exports[n`DFA minimization >> 2389: /\b(?:'active|'ascending|'base|'delayed|'driving|'driving_value|'event|'high|'im... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2390: /'[01uxzwlh-]'|\b(?:\d+#[\da-f_.]+#|\d[\d_.]*)(?:e[-+]?\d+)?/i `] = lit`
UWucQgNcRDtjmxgFWyzqAXvBleTDDus+grZx/Ez0pWA=
`;

module.exports[n`DFA minimization >> 2391: /[<>]=?|:=|[-+*\/&=]|\b(?:abs|not|mod|rem|sll|srl|sla|sra|rol|ror|and|or|nand|xn... `] = lit`
Es2ZJgUPaoB+fgfMoPIIi6pG7xNHA/JO3xcR/M7LuCQ=
`;

module.exports[n`DFA minimization >> 2392: /\b[oxb]"[\da-f_]+"|"[01uxzwlh-]+"/i `] = lit`
8xj4nHkGHY3VPnjELWYlRN8gGXaUS8Sh4iPdfphWVes=
`;

module.exports[n`DFA minimization >> 2393: /"\S+?"(?=\()/ `] = lit`
l67m/CJ1gebNHb/AkQ+/NxxbldaPR0B+1T0tLmAO1hI=
`;

module.exports[n`DFA minimization >> 2394: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/ `] = lit`
4SoBxWi2PHGA0YWopwR5DeqxCOKMtrVay4lSZ47XTNI=
`;

module.exports[n`DFA minimization >> 2395: /".*/ `] = lit`
+/dgzpjR4XSF/6FTfuO+MGEa6r4xe3rF/jn26dPdFhM=
`;

module.exports[n`DFA minimization >> 2398: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i `] = lit`
cw0cn3nAj+K9uZAGJh84g/MvfzytpAhV/+sVhqlLMdo=
`;

module.exports[n`DFA minimization >> 2399: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/ `] = lit`
eKGrQl9H1fKlcXjCUm+5jVaf9edlB5PdRy/yrmLhp4E=
`;

module.exports[n`DFA minimization >> 2400: /[{}[\](),;:]/ `] = lit`
BcW2jl+LTpQFuWdxPnJQkKHX9Z0/VP8e3uhZR2e8e2Y=
`;

module.exports[n`DFA minimization >> 2401: /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[FRD])?/i `] = lit`
bTklgaAmbu316aTW6lykBwQNAznSO3BTXGYUX8fL7dI=
`;

module.exports[n`DFA minimization >> 2402: /\b(?:True|False|Nothing)\b/i `] = lit`
rZ34JpNz5yYw33z50Piww/91XfScfg3j1uASWZaQABw=
`;

module.exports[n`DFA minimization >> 2404: /[{}().,:?]/ `] = lit`
Q4OvlwdduxXRezHiMYOFSlZENsEz4M1zKqFpZoqWqPk=
`;

module.exports[n`DFA minimization >> 2405: /(?:['‘’]|REM\b)(?:[^\r\n_]|_(?:\r\n?|\n)?)*/i `] = lit`
NRQ51wPlK108ajGhks1aZLZGDf2ZDF1gqkQRxzmk5+o=
`;

module.exports[n`DFA minimization >> 2406: /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:[^\S\r\n... `] = lit`
SnnyQ2sUFi/jagamM9fqjY03wRk8THspuhc7udnZ2vA=
`;

module.exports[n`DFA minimization >> 2407: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]C?/i `] = lit`
Mi09duwEKVta9ZSEs53D0VDik7/8SkczwmXJDeU+vMc=
`;

module.exports[n`DFA minimization >> 2408: /#[^\S\r\n]*(?:\d+([\/-])\d+\1\d+(?:[^\S\r\n]+(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(... `] = lit`
9Yg6mXrfrqh4FuxtJHluiOXpQuCFACuOSQjTyDT2NS0=
`;

module.exports[n`DFA minimization >> 2409: /[+\-*\/\\^<=>&#@$%!]/ `] = lit`
BL1wjXGvVUAeFk33xF5tAjZSew5eYhzUN7P54P8JJlU=
`;

module.exports[n`DFA minimization >> 2410: /([^\S\r\n])_(?=[^\S\r\n]*[\r\n])/ `] = lit`
wZFHkAk4u4I/VWK4azwojEkgkwVKytzQaP9yJZqAzhw=
`;

module.exports[n`DFA minimization >> 2411: /#.*|\/\/.*|\/\*[\s\S]*?\*\// `] = lit`
IC+JeaJhlhT8kQBlZYghOXsC8Yg/wcabwivXaZiIX/g=
`;

module.exports[n`DFA minimization >> 2412: /\$\S+/ `] = lit`
YWyetQkvpa35TVpy9egxYVx7rsipzW+4LDPnG86wZSc=
`;

module.exports[n`DFA minimization >> 2413: /\b(?:BREAK|CHECKMACRO|CONTINUE|CUDF|DEFINED|DEFINEDMACRO|EVAL|FAIL|FOR|FOREACH|... `] = lit`
0yxXhJYWDMa/YiY5FiISl4O1LP19MNTtovWt3L35gCY=
`;

module.exports[n`DFA minimization >> 2414: /[+-]?\b(?:NaN|Infinity|\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?|0x[\da-fA-F]+|0b[01]+)\b/ `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2415: /\b(?:false|true|F|T)\b/ `] = lit`
Ogt7V+XIvfzmV+M+HVAxOEW4xdMFpR2P4FjWYGBdi7E=
`;

module.exports[n`DFA minimization >> 2416: /<%|%>|[{}[\]()]/ `] = lit`
qTR+9J/xNkPOGpUOLAqEPxg1FE2iFAPHST+zG/8crGI=
`;

module.exports[n`DFA minimization >> 2417: /==|&&?|\|\|?|\*\*?|>>>?|<<|==|[<>!~]=?|[-\/%^]|\+!?|\b(?:AND|NOT|OR)\b/ `] = lit`
ABU4jqGGrr+/xEDa96zje69Ad1RhcYh6YVYgddpaCKI=
`;

module.exports[n`DFA minimization >> 2418: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'|<'(?:[^\\']|'(?!>)|\\.)*'>/ `] = lit`
voeQVYzSY0aaNLdRneEJb2Bn3+ajEAYf+HETerFWUXs=
`;

module.exports[n`DFA minimization >> 2419: /@\S+/ `] = lit`
zEDo4CpOSRXg/fDzf93Dgtqc7+mTpCi55ctMj2B0WU8=
`;

module.exports[n`DFA minimization >> 2420: /\$[\w!#$%&'*+\-.\/:<=>?@\\^_\`|~]+/i `] = lit`
Sy4hZTQClj/Q2OWW4JkgWAiizAt+vIjVkmC7ZUWQJv0=
`;

module.exports[n`DFA minimization >> 2421: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?... `] = lit`
5EG/2ScUFcaXRmQ/RvkwgDwLoNessKtFqD3yJC7RRBc=
`;

module.exports[n`DFA minimization >> 2422: /\(;[\s\S]*?;\)/ `] = lit`
PITaUGE4GInmkBm4CGaL2Co53LZvKOc4aL4K0PaVVH8=
`;

module.exports[n`DFA minimization >> 2423: /"(?:\\[\s\S]|[^"\\])*"/ `] = lit`
901gjCaUOwjwFLfIL54nMX9rgHEl6ouvkBv/aY0K38w=
`;

module.exports[n`DFA minimization >> 2424: /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end... `] = lit`
qhofsVEfzI4tkikYY/rZsdI9/9/7BHVvlqcXz7ahr0A=
`;

module.exports[n`DFA minimization >> 2425: /;;.*/ `] = lit`
41LtHrYXKK1rBoOj1lnZYyJGZfEQoJazPUGm5t/29k0=
`;

module.exports[n`DFA minimization >> 2426: /\b(?:align|offset)=/ `] = lit`
a9+R7kfDQC/JcOWJOUF+8MOAJ4cGV6cQDZZQasEzEUM=
`;

module.exports[n`DFA minimization >> 2427: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32... `] = lit`
XMEcqAZ585mcwpaLzHzNcMEK7Z43QL6DaI9inLGJXCo=
`;

module.exports[n`DFA minimization >> 2428: /^(?:\{\||\|\}|\|-|[*#:;!|])|\|\||!!/m `] = lit`
fjoau9Lf35dswLjOSedH2c6jkYzwesUyyUZ/dFT3/N8=
`;

module.exports[n`DFA minimization >> 2429: /<(nowiki|pre|source)\b[\s\S]*?>[\s\S]*?<\/\1>/i `] = lit`
w9Yc+oh+zNY8aZ8pfkgot/i3IUtTfygbdb0ckBsRGuc=
`;

module.exports[n`DFA minimization >> 2430: /^(=+).+?\1/m `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2431: /('{2,5}).+?\1/ `] = lit`
tlJ+DAGrFr/TohKPwGh/Gcn8/fYrZeAL3+5m9fuw4DE=
`;

module.exports[n`DFA minimization >> 2432: /^-{4,}/m `] = lit`
FGvHzPi0gAA8H0atPGCtBrTX8p8ec99dYrgxpl9TrU8=
`;

module.exports[n`DFA minimization >> 2433: /ISBN +(?:97[89][ -]?)?(?:\d[ -]?){9}[\dx]\b|(?:RFC|PMID) +\d+/i `] = lit`
2NhpJS9ig4yh2QBK+4L2cAG2IhpVLRwuLuwC6Cii1v4=
`;

module.exports[n`DFA minimization >> 2434: /\[\[.+?\]\]|\[.+?\]/ `] = lit`
JDgriofi1Z4ki92didygBUMEccu2z/P1aTEDHxPGuCM=
`;

module.exports[n`DFA minimization >> 2435: /__[A-Z]+__/ `] = lit`
7Z78sa+TwLvYhAm6SSzEsWF1jBvUNlhM4ORMG8ryOUw=
`;

module.exports[n`DFA minimization >> 2436: /\{{3}.+?\}{3}/ `] = lit`
mXZWDbqNt7FnRDAUzN+sFR1AAzcFUeONTgm9TmuTZyo=
`;

module.exports[n`DFA minimization >> 2437: /^#redirect/im `] = lit`
55mhWnIOF1KjQ/I9NXQosLBYlKrMUzxi25sw/61EMBU=
`;

module.exports[n`DFA minimization >> 2438: /~{3,5}/ `] = lit`
6KBFSEdOgLUT+ZrhirbK9TiZZNeoZZ3R6rbvk4ykSFg=
`;

module.exports[n`DFA minimization >> 2439: /((?:^|[|!])[|!])[^|\r\n]+\|(?!\|)/m `] = lit`
9jH9jijjNI1pQoPbPTluk7Y3kzU1mXf3irrjxfJHxXA=
`;

module.exports[n`DFA minimization >> 2440: /^=+|=+$/ `] = lit`
fhtH6rB/FWdYL0kRUdBf7t8KT5XteTlzhA9BO4BPoMM=
`;

module.exports[n`DFA minimization >> 2441: /^''+|''+$/ `] = lit`
1WQhK+GTDq9BImsp/fYupaIjnMTUmf+CvPEJJx9Sk/w=
`;

module.exports[n`DFA minimization >> 2442: /<(?:nowiki|pre|source)\b[\s\S]*?>|<\/(?:nowiki|pre|source)>/i `] = lit`
SpJrLB3/zTbtpmE9Up/WfHYPEArFDjYH6Puvv/D0Ed4=
`;

module.exports[n`DFA minimization >> 2443: /(''''').+?(?=\1)/ `] = lit`
2iUUH+Wp1ZAityMVMZQDJIbc8qHN/jPiDbkkMRVZkLE=
`;

module.exports[n`DFA minimization >> 2444: /(''')[^'](?:.*?[^'])?(?=\1)/ `] = lit`
33Lefz6HB3hT3w3DQG48CqWebJLV4TCgSieqPqKKpHA=
`;

module.exports[n`DFA minimization >> 2445: /('')[^'](?:.*?[^'])?(?=\1)/ `] = lit`
04YU9i9hilOEMd4mDnvRluN3fIWAc54CofHjXVm6PLw=
`;

module.exports[n`DFA minimization >> 2446: /\$(?:DomainContents|PageRenderDuration)\$/ `] = lit`
SfpuwSFfCYi4ahlD1W/FT6ojBXWZeHBD3VOWDKXDICo=
`;

module.exports[n`DFA minimization >> 2447: /\$@?(?:#+|[-+*~=^])?[\w.]+\$/ `] = lit`
4NgIpho8hg08B77m4pHJXeq2byCcS24N8zAqPsLYxpM=
`;

module.exports[n`DFA minimization >> 2448: /\$F:[-\w.]+\?[-\w.]+(?:,(?:\|?(?:[-#.^+*~]*(?:[\w+][^$]*)|=(?:[\S+][^$]*)|@[-#]... `] = lit`
hfhbi07rpbtOH27ZLSRGRmvp5t8JKxDo/lUzbvYCLy0=
`;

module.exports[n`DFA minimization >> 2449: /\$XF:{[-\w.]+\?[-\w.]+(?:,(?:\|?(?:[-#.^+*~]*(?:[\w+][^$]*)|=(?:[\S+][^$]*)|@[-... `] = lit`
Pw9pCy8Hl9BjnE0SWhlpDoY9iGIAo4SZFyaz9Kf2TLg=
`;

module.exports[n`DFA minimization >> 2450: /\$\w(?:#\d+\+?)?(?:\[[-\w.]+])?:[-\/\w.]+\$/ `] = lit`
cqwqUAr3/UzapN07MlqloVL8XQ7+AhNORhIyPQwpgwM=
`;

module.exports[n`DFA minimization >> 2451: /\$\w+:{|\$\w(?:#\d+\+?)?(?:\[[-\w.]+])?:[-\w.]+:{(?:![A-Z]+)?/ `] = lit`
rAEusp/JmaMDVNdLrKkgq0z4s5b/PzoMxhaWQwDPafo=
`;

module.exports[n`DFA minimization >> 2452: /}:[-\w.]+:{/ `] = lit`
Ge6pvbJ5SV/iGHk70VhepqVGfihiPZd2bjMJO01hBdw=
`;

module.exports[n`DFA minimization >> 2453: /}:[-\w.]+\$/ `] = lit`
UTj4QeqBgtWmo9tIVkgKUOZ82Z31aKPEMfrbp5OC5Qw=
`;

module.exports[n`DFA minimization >> 2454: /\$/ `] = lit`
h+83OPIyGjau4l311cB3um/sp043OT4wA/3xoZDgxGE=
`;

module.exports[n`DFA minimization >> 2455: /[$.]/ `] = lit`
mX4qgGeIaW3RNnpCmGMBFf8GnM7WJlmqmkomPmf5Ahk=
`;

module.exports[n`DFA minimization >> 2456: /#+|[-+*~=^@]/ `] = lit`
NCQijtze9GgqfDjQMDsSchIcpiqzuz/M8zJk5rm6I/I=
`;

module.exports[n`DFA minimization >> 2457: /(?:[,|])@?(?:#+|[-+*~=^])?[\w.]+/ `] = lit`
RG8vb7S4gMAqemIl86v4TocUc6DGQJphWpfMSOGnsfw=
`;

module.exports[n`DFA minimization >> 2458: /\$\w:|[$:?.,|]/ `] = lit`
iIrvGCM6G9BWorBx3cv7WnFMXfE1lk19EmpiuzEx4qU=
`;

module.exports[n`DFA minimization >> 2459: /[$:{}?.,|]/ `] = lit`
YOPmdk68JFBFM22iAMqx+q/+Lslf1GsHmd4359AOSog=
`;

module.exports[n`DFA minimization >> 2460: /\$(?:\w:|C(?:\[|#\d))?|[:{[\]]/ `] = lit`
kZ0bHXdQdLtUy94j8aBpWaSRPbdA9uCDplBKqORprA0=
`;

module.exports[n`DFA minimization >> 2461: /![A-Z]+$/ `] = lit`
tWYj2jPVEciSjlIBlMMSD3EsrQM8FjEV3OtlxVtmLkY=
`;

module.exports[n`DFA minimization >> 2462: /[:{}]/ `] = lit`
JoLWTFDR5WibyUP6WUiMj85yvp+Z6uKK08PZyC9uppI=
`;

module.exports[n`DFA minimization >> 2463: /[:{}$]/ `] = lit`
u4DW3V/m9jmNztwJl4hLXGrqqVyFviYK48G/637zkWg=
`;

module.exports[n`DFA minimization >> 2464: /[,.|]/ `] = lit`
7bz1jihrQwBWhBSijccITeciqGZ++z5TDqUMwPWpqNE=
`;

module.exports[n`DFA minimization >> 2465: /#\d/ `] = lit`
0QgY8BOiXlNF3SQ392OQiuO/mHI1yeydrgRqWF09AtQ=
`;

module.exports[n`DFA minimization >> 2466: /!/ `] = lit`
N2lpB7h4Z9aZR3CFHpsfBecofCeu1bFqySvoSf6q8aU=
`;

module.exports[n`DFA minimization >> 2467: /\/\/\/.*/ `] = lit`
MaIOkWf1HfDdC29pigvePBMp/C2Jj4ki3darAMV5nT8=
`;

module.exports[n`DFA minimization >> 2468: /'''.*/ `] = lit`
DMnm4uGr8pQ+VS9FOtUX0B6nxY0CVwNQqhLZN0teeTQ=
`;

module.exports[n`DFA minimization >> 2469: /#(?:If|Else|ElseIf|Endif|Pragma)\b/i `] = lit`
VC6xHLU1Qhx/HH7jPqIRA3/jBqKQ5Cl8fDpKdBmeAzM=
`;

module.exports[n`DFA minimization >> 2470: /\b(?:AddHandler|App|Array|As(?:signs)?|By(?:Ref|Val)|Break|Call|Case|Catch|Cons... `] = lit`
lfpHVIMPflBycXm/2Tr0bmILvvvfr1sJCTBw00UsQWA=
`;

module.exports[n`DFA minimization >> 2471: /<[=>]?|>=?|[+\-*\/\\^=]|\b(?:AddressOf|And|Ctype|IsA?|Mod|New|Not|Or|Xor|WeakAd... `] = lit`
KByA5M4KZswLzXnyiJw6tioMOreydOKEtEUjOzCx9f4=
`;

module.exports[n`DFA minimization >> 2472: /[.,;:()]/ `] = lit`
H+eI7R+pzJrrTVmMyxCu8YxnT9Hmo2rZ7YJn1unyKGM=
`;

module.exports[n`DFA minimization >> 2473: /(?:'|\/\/|Rem\b).+/i `] = lit`
B+Hn4nhoPAhVrpf+b4ukoWr7pOczpZYP4NexSRItA2s=
`;

module.exports[n`DFA minimization >> 2474: /&[bchou][a-z\d]+/i `] = lit`
N9fjXtY9fyaPny+P7zFDwKFhDVyy+Pj+5kDvcqYFNb4=
`;

module.exports[n`DFA minimization >> 2475: /^Rem/i `] = lit`
d/YvYT6lzIdvjP+UiX1ydM6U8ejx5OIpc6yIkoCdK0g=
`;

module.exports[n`DFA minimization >> 2476: /\$[\w-:]+/ `] = lit`
rzpqyzutDP15c57O8ct3//nCtor7cQ3V3HFarDMe5PU=
`;

module.exports[n`DFA minimization >> 2477: /[\w-]+(?::[\w-]+)*(?=\s*\()/ `] = lit`
9HisA8r9QNlAxvP4s/gFcneQhqJWHIBe7r02BzVjIN4=
`;

module.exports[n`DFA minimization >> 2478: /\b\d+(?:\.\d+)?(?:E[+-]?\d+)?/ `] = lit`
N7Wii+nB35iaFi76u/UFYiHPqOx3HD0M1qPIPub2p1c=
`;

module.exports[n`DFA minimization >> 2479: /[[\](){},;:\/]/ `] = lit`
zP3pTq+bOoFOCzwlfW/z55vgwIn+IIwybwvzZAHB2BQ=
`;

module.exports[n`DFA minimization >> 2480: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|{(?!{)(?:{(?:{[^... `] = lit`
HKwy78BwzGUU+dfTdkKhAWQ5kxt/oKl8V/gDrT4EtJw=
`;

module.exports[n`DFA minimization >> 2481: /\(:[\s\S]*?:\)/ `] = lit`
pes0CDS5OyX0Ad4BaR+1eWBn4unWr8oArgmfht20RWQ=
`;

module.exports[n`DFA minimization >> 2482: /(["'])(?:\1\1|(?!\1)[\s\S])*\1/ `] = lit`
XDgk2MtFZVwLoLf9u7Wo+8mBQ7TyBpMKM/HF9iDVbMI=
`;

module.exports[n`DFA minimization >> 2483: /\(#.+?#\)/ `] = lit`
9r3A1McWv5MKfg/Ec7l5pehHow8lY8Nkn3X6eJU8pgY=
`;

module.exports[n`DFA minimization >> 2484: /(^|[^-])(?:ancestor(?:-or-self)?|attribute|child|descendant(?:-or-self)?|follow... `] = lit`
dXduCOWcI6oMC8OPIs0IztJhLLXPixB9oGbIhxhEH/o=
`;

module.exports[n`DFA minimization >> 2485: /(^|[^:-])\b(?:and|castable as|div|eq|except|ge|gt|idiv|instance of|intersect|is... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2486: /(^|[^:-])\b(?:as|ascending|at|base-uri|boundary-space|case|cast as|collation|co... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2487: /(element\s+)[\w-]+(?::[\w-]+)*/ `] = lit`
Q2Ey+dY3y6H+QdG1HZvUIgHa+YkQrvORVB4Tp2bmQMg=
`;

module.exports[n`DFA minimization >> 2488: /(attribute\s+)[\w-]+(?::[\w-]+)*/ `] = lit`
WqELIZz27X5u0NBd86Bx2k1w2YX+3zqGwT5KSjibIhU=
`;

module.exports[n`DFA minimization >> 2489: /(^|[^:-])\b(?:attribute|comment|document|element|processing-instruction|text|xs... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2490: /[+*=?|@]|\.\.?|:=|!=|<[=<]?|>[=>]?/ `] = lit`
SLcwPkxMfO6nFX6Oxkkx4iKlS1vZcqzVLwf3dK2QQJw=
`;

module.exports[n`DFA minimization >> 2491: /(\s)-(?=\s)/ `] = lit`
Lr/AjFfvNs9r78cpJ3eyQK9bHI0kRfgTTR7pdK3P5yE=
`;

module.exports[n`DFA minimization >> 2492: /=(?:("|')(?:\\[\s\S]|{(?!{)(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|(?!\1)[^\\])*\1|[^... `] = lit`
n11tlDLlOYHhzjmc2LxYIf9tn/OQ7g9QeCmE8eA9Jc0=
`;

module.exports[n`DFA minimization >> 2493: /^="|"$/ `] = lit`
BpydndKBY2LHbTxRJtXe41GDh02Yb3Wzh3xPGUoUnkU=
`;

module.exports[n`DFA minimization >> 2494: /{(?!{)(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}/ `] = lit`
NozH8Jtqh6fhutqY+xdsZc4w2UmB7YSnWSwd1T5dcgE=
`;

module.exports[n`DFA minimization >> 2495: /\/\*[\s\S]*?\*\/|\/\/.*/ `] = lit`
H7ZJEYBnhxKwCUevQceWv4B/nrFP6Rw0PPwY3o9tRsQ=
`;

module.exports[n`DFA minimization >> 2496: /[{};:]/ `] = lit`
lDB5HG7GuZTVahEvGVhhXhI5gqyIO4xujgXZWmSVUKk=
`;

module.exports[n`DFA minimization >> 2497: /"(?:[^\\"]|\\.)*"|'[^']*'/ `] = lit`
8vxnP1LTsR55Q4zSm81v4BaKcGNejAb4o5G8QbHU6rM=
`;

module.exports[n`DFA minimization >> 2498: /(^|[{};\r\n][ \t]*)[a-z_][\w.-]*/i `] = lit`
Tlv4wwAhBNU8DloWN8bzlTgGpp/ihnNXAD6KFZCD9WY=
`;

module.exports[n`DFA minimization >> 2499: /(\s)[a-z_][\w.-]*(?=:)/i `] = lit`
fkGDePm9q4JKlA6vcMjTPUyYUOGKK/iW5BIwp98/gzg=
`;

module.exports[n`DFA minimization >> 2500: /\B@(?!\d)\w+(?=\s*\()/ `] = lit`
3VfiRXPzBPX59YcDxyaoIHNHcf32Zr9uIT2wmy4zngs=
`;

module.exports[n`DFA minimization >> 2501: /\b(?:align|allowzero|and|asm|async|await|break|cancel|catch|comptime|const|cont... `] = lit`
38W8/sNF8xv7EldClner5wqDUZHUiFF+hYve/iHgt0w=
`;

module.exports[n`DFA minimization >> 2502: /\b(?!\d)\w+(?=\s*\()/ `] = lit`
Pzj56ooZK2dcyafycKwYDm3OyTvuhVK39Cp0cgWIiQI=
`;

module.exports[n`DFA minimization >> 2503: /\b(?:0b[01]+|0o[0-7]+|0x[a-fA-F\d]+\.?[a-fA-F\d]*(?:[pP][+-]?[a-fA-F\d]+)?|\d+\... `] = lit`
Bw4gYAa7MtaF7YCPSkJu1quiBjjkEtcDBYGSD0j6sH0=
`;

module.exports[n`DFA minimization >> 2504: /\.[*?]|\.{2,3}|[-=]>|\*\*|\+\+|\|\||(?:<<|>>|[-+*]%|[-+*\/%^&|<>!=])=?|[?~]/ `] = lit`
S47XQ0toswRy5rnJ/vfJlxz5bNiM4Ryxw7IZFKv8PmQ=
`;

module.exports[n`DFA minimization >> 2505: /[.:,;(){}[\]]/ `] = lit`
OHFTBemCtRyoCZfb2i6ku3etAe4ylzURp1HkiTlm7Ew=
`;

module.exports[n`DFA minimization >> 2506: /\/{2}.*/ `] = lit`
JdbUZd7MyF80bJQmmk3EFLhwqUPbwpT8nQRQrqnqagg=
`;

module.exports[n`DFA minimization >> 2507: /(\b(?:break|continue)\s*:\s*)\w+\b|\b(?!\d)\w+\b(?=\s*:\s*(?:\{|while\b))/ `] = lit`
JVRSMY8X8huSjqsJo3LI2qNyaEMHA/4MyR6h0fYSDdY=
`;

module.exports[n`DFA minimization >> 2508: /\b(?!\d)\w+(?=\s*=\s*(?:(?:extern|packed)\s+)?(?:enum|struct|union)\s*[({])/ `] = lit`
6nQyhoVDRncGcglNKgi+pTuzCP6fvZfnjvKjE0XWNmA=
`;

module.exports[n`DFA minimization >> 2509: /\b(?:anyerror|bool|c_u?(?:short|int|long|longlong)|c_longdouble|c_void|comptime... `] = lit`
p7SWhG1gT1C2Hyo+xrrTfoOj/5MCaWziAhv2gMeuP50=
`;

module.exports[n`DFA minimization >> 2510: /\/{3}.*/ `] = lit`
MaIOkWf1HfDdC29pigvePBMp/C2Jj4ki3darAMV5nT8=
`;

module.exports[n`DFA minimization >> 2511: /(^|[^\\@])c?"(?:[^"\\\r\n]|\\.)*"/ `] = lit`
Pa0Xgu0W809htHs8Q+kKU4sfSz8xQlj+K5g7rCMK1iY=
`;

module.exports[n`DFA minimization >> 2512: /([\r\n])([ \t]+c?\\{2}).*(?:(?:\r\n?|\n)\2.*)*/ `] = lit`
rBAqk6OSMFoIgO9otQ8RKk0aVc7c9s5uSGeF6EF8i24=
`;

module.exports[n`DFA minimization >> 2513: /(^|[^\\])'(?:[^'\\\r\n]|\\(?:.|x[a-fA-F\d]{2}|u\{[a-fA-F\d]{1,6}\}))'/ `] = lit`
Te9TU3zNTQuVixOgyZZQCMmj9HY7ZbZSAqVV7OVx0aA=
`;
