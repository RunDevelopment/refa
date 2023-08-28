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

module.exports[n`toDot >> from regexes >> DFA (default): /a/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (default): /a/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
}
`;

module.exports[n`toDot >> from regexes >> NFA (default): /a/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
}
`;

module.exports[n`toDot >> from regexes >> DFA (JS): /a/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (JS): /a/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
}
`;

module.exports[n`toDot >> from regexes >> NFA (JS): /a/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
}
`;

module.exports[n`toDot >> from regexes >> DFA (default): /abc/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="A a"];
	n1 -> n2 [label="B b"];
	n2 -> n3 [label="C c"];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (default): /abc/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="A a"];
	n1 -> n2 [label="B b"];
	n2 -> n3 [label="C c"];
}
`;

module.exports[n`toDot >> from regexes >> NFA (default): /abc/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="A a"];
	n1 -> n2 [label="B b"];
	n2 -> n3 [label="C c"];
}
`;

module.exports[n`toDot >> from regexes >> DFA (JS): /abc/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="[Aa]"];
	n1 -> n2 [label="[Bb]"];
	n2 -> n3 [label="[Cc]"];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (JS): /abc/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="[Aa]"];
	n1 -> n2 [label="[Bb]"];
	n2 -> n3 [label="[Cc]"];
}
`;

module.exports[n`toDot >> from regexes >> NFA (JS): /abc/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="[Aa]"];
	n1 -> n2 [label="[Bb]"];
	n2 -> n3 [label="[Cc]"];
}
`;

module.exports[n`toDot >> from regexes >> DFA (default): /a*b+c*/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=doublecircle];
	n2 [label="2", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n0 [label=a];
	n0 -> n1 [label=b];
	n1 -> n1 [label=b];
	n1 -> n2 [label=c];
	n2 -> n2 [label=c];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (default): /a*b+c*/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=doublecircle];
	n9 [label="9", shape=circle];

	// edges
	null -> n0;
	n0 -> n1 [label="", taillabel="1"];
	n0 -> n2 [label="", taillabel="2"];
	n1 -> n3 [label=a];
	n2 -> n4 [label=""];
	n3 -> n1 [label="", taillabel="1"];
	n3 -> n2 [label="", taillabel="2"];
	n4 -> n5 [label=b];
	n5 -> n4 [label="", taillabel="1"];
	n5 -> n6 [label="", taillabel="2"];
	n6 -> n7 [label="", taillabel="1"];
	n6 -> n8 [label="", taillabel="2"];
	n7 -> n9 [label=c];
	n9 -> n7 [label="", taillabel="1"];
	n9 -> n8 [label="", taillabel="2"];
}
`;

module.exports[n`toDot >> from regexes >> NFA (default): /a*b+c*/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=doublecircle];
	n3 [label="3", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
	n0 -> n2 [label=b];
	n1 -> n1 [label=a];
	n1 -> n2 [label=b];
	n2 -> n2 [label=b];
	n2 -> n3 [label=c];
	n3 -> n3 [label=c];
}
`;

module.exports[n`toDot >> from regexes >> DFA (JS): /a*b+c*/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=doublecircle];
	n2 [label="2", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n0 [label=a];
	n0 -> n1 [label=b];
	n1 -> n1 [label=b];
	n1 -> n2 [label=c];
	n2 -> n2 [label=c];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (JS): /a*b+c*/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=doublecircle];
	n9 [label="9", shape=circle];

	// edges
	null -> n0;
	n0 -> n1 [label="", taillabel="1"];
	n0 -> n2 [label="", taillabel="2"];
	n1 -> n3 [label=a];
	n2 -> n4 [label=""];
	n3 -> n1 [label="", taillabel="1"];
	n3 -> n2 [label="", taillabel="2"];
	n4 -> n5 [label=b];
	n5 -> n4 [label="", taillabel="1"];
	n5 -> n6 [label="", taillabel="2"];
	n6 -> n7 [label="", taillabel="1"];
	n6 -> n8 [label="", taillabel="2"];
	n7 -> n9 [label=c];
	n9 -> n7 [label="", taillabel="1"];
	n9 -> n8 [label="", taillabel="2"];
}
`;

module.exports[n`toDot >> from regexes >> NFA (JS): /a*b+c*/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=doublecircle];
	n3 [label="3", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
	n0 -> n2 [label=b];
	n1 -> n1 [label=a];
	n1 -> n2 [label=b];
	n2 -> n2 [label=b];
	n2 -> n3 [label=c];
	n3 -> n3 [label=c];
}
`;

module.exports[n`toDot >> from regexes >> DFA (default): /\d+(?:\.\d+)?(?:e[+-]?\d+)/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="0-9"];
	n1 -> n2 [label="'.'"];
	n1 -> n1 [label="0-9"];
	n1 -> n3 [label="E e"];
	n2 -> n4 [label="0-9"];
	n3 -> n5 [label="'+' '-'"];
	n3 -> n6 [label="0-9"];
	n4 -> n4 [label="0-9"];
	n4 -> n3 [label="E e"];
	n5 -> n6 [label="0-9"];
	n6 -> n6 [label="0-9"];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (default): /\d+(?:\.\d+)?(?:e[+-]?\d+)/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=circle];
	n9 [label="9", shape=circle];
	n10 [label="10", shape=circle];
	n11 [label="11", shape=circle];
	n12 [label="12", shape=circle];
	n13 [label="13", shape=circle];
	n14 [label="14", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=""];
	n1 -> n2 [label="0-9"];
	n2 -> n1 [label="", taillabel="1"];
	n2 -> n3 [label="", taillabel="2"];
	n3 -> n4 [label="'.'", taillabel="1"];
	n3 -> n5 [label="", taillabel="2"];
	n4 -> n6 [label=""];
	n5 -> n7 [label="E e"];
	n6 -> n8 [label="0-9"];
	n7 -> n9 [label="'+' '-'", taillabel="1"];
	n7 -> n10 [label="", taillabel="2"];
	n8 -> n6 [label="", taillabel="1"];
	n8 -> n11 [label="", taillabel="2"];
	n9 -> n10 [label=""];
	n10 -> n12 [label=""];
	n11 -> n5 [label=""];
	n12 -> n13 [label="0-9"];
	n13 -> n12 [label="", taillabel="1"];
	n13 -> n14 [label="", taillabel="2"];
}
`;

module.exports[n`toDot >> from regexes >> NFA (default): /\d+(?:\.\d+)?(?:e[+-]?\d+)/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="0-9"];
	n1 -> n1 [label="0-9"];
	n1 -> n2 [label="'.'"];
	n1 -> n3 [label="E e"];
	n2 -> n4 [label="0-9"];
	n3 -> n5 [label="'+' '-'"];
	n3 -> n6 [label="0-9"];
	n4 -> n4 [label="0-9"];
	n4 -> n3 [label="E e"];
	n5 -> n6 [label="0-9"];
	n6 -> n6 [label="0-9"];
}
`;

module.exports[n`toDot >> from regexes >> DFA (JS): /\d+(?:\.\d+)?(?:e[+-]?\d+)/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="\\d"];
	n1 -> n2 [label="\\."];
	n1 -> n1 [label="\\d"];
	n1 -> n3 [label="[Ee]"];
	n2 -> n4 [label="\\d"];
	n3 -> n5 [label="[-+]"];
	n3 -> n6 [label="\\d"];
	n4 -> n4 [label="\\d"];
	n4 -> n3 [label="[Ee]"];
	n5 -> n6 [label="\\d"];
	n6 -> n6 [label="\\d"];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (JS): /\d+(?:\.\d+)?(?:e[+-]?\d+)/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=circle];
	n9 [label="9", shape=circle];
	n10 [label="10", shape=circle];
	n11 [label="11", shape=circle];
	n12 [label="12", shape=circle];
	n13 [label="13", shape=circle];
	n14 [label="14", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=""];
	n1 -> n2 [label="\\d"];
	n2 -> n1 [label="", taillabel="1"];
	n2 -> n3 [label="", taillabel="2"];
	n3 -> n4 [label="\\.", taillabel="1"];
	n3 -> n5 [label="", taillabel="2"];
	n4 -> n6 [label=""];
	n5 -> n7 [label="[Ee]"];
	n6 -> n8 [label="\\d"];
	n7 -> n9 [label="[-+]", taillabel="1"];
	n7 -> n10 [label="", taillabel="2"];
	n8 -> n6 [label="", taillabel="1"];
	n8 -> n11 [label="", taillabel="2"];
	n9 -> n10 [label=""];
	n10 -> n12 [label=""];
	n11 -> n5 [label=""];
	n12 -> n13 [label="\\d"];
	n13 -> n12 [label="", taillabel="1"];
	n13 -> n14 [label="", taillabel="2"];
}
`;

module.exports[n`toDot >> from regexes >> NFA (JS): /\d+(?:\.\d+)?(?:e[+-]?\d+)/i `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="\\d"];
	n1 -> n1 [label="\\d"];
	n1 -> n2 [label="\\."];
	n1 -> n3 [label="[Ee]"];
	n2 -> n4 [label="\\d"];
	n3 -> n5 [label="[-+]"];
	n3 -> n6 [label="\\d"];
	n4 -> n4 [label="\\d"];
	n4 -> n3 [label="[Ee]"];
	n5 -> n6 [label="\\d"];
	n6 -> n6 [label="\\d"];
}
`;

module.exports[n`toDot >> from regexes >> DFA (default): /\/\*[\s\S]*?\*\// `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="'/'"];
	n1 -> n2 [label="'*'"];
	n2 -> n2 [label="not '*'"];
	n2 -> n3 [label="'*'"];
	n3 -> n2 [label="not '*' '/'"];
	n3 -> n3 [label="'*'"];
	n3 -> n4 [label="'/'"];
	n4 -> n2 [label="not '*'"];
	n4 -> n3 [label="'*'"];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (default): /\/\*[\s\S]*?\*\// `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="'/'"];
	n1 -> n2 [label="'*'"];
	n2 -> n3 [label="", taillabel="1"];
	n2 -> n4 [label="", taillabel="2"];
	n3 -> n5 [label="'*'"];
	n4 -> n6 [label=all];
	n5 -> n7 [label="'/'"];
	n6 -> n3 [label="", taillabel="1"];
	n6 -> n4 [label="", taillabel="2"];
}
`;

module.exports[n`toDot >> from regexes >> NFA (default): /\/\*[\s\S]*?\*\// `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="'/'"];
	n1 -> n2 [label="'*'"];
	n2 -> n3 [label=all];
	n2 -> n4 [label="'*'"];
	n3 -> n3 [label=all];
	n3 -> n4 [label="'*'"];
	n4 -> n5 [label="'/'"];
}
`;

module.exports[n`toDot >> from regexes >> DFA (JS): /\/\*[\s\S]*?\*\// `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="\\/"];
	n1 -> n2 [label="\\*"];
	n2 -> n2 [label="[^*]"];
	n2 -> n3 [label="\\*"];
	n3 -> n2 [label="[^*/]"];
	n3 -> n3 [label="\\*"];
	n3 -> n4 [label="\\/"];
	n4 -> n2 [label="[^*]"];
	n4 -> n3 [label="\\*"];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (JS): /\/\*[\s\S]*?\*\// `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="\\/"];
	n1 -> n2 [label="\\*"];
	n2 -> n3 [label="", taillabel="1"];
	n2 -> n4 [label="", taillabel="2"];
	n3 -> n5 [label="\\*"];
	n4 -> n6 [label="[^]"];
	n5 -> n7 [label="\\/"];
	n6 -> n3 [label="", taillabel="1"];
	n6 -> n4 [label="", taillabel="2"];
}
`;

module.exports[n`toDot >> from regexes >> NFA (JS): /\/\*[\s\S]*?\*\// `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="\\/"];
	n1 -> n2 [label="\\*"];
	n2 -> n3 [label="[^]"];
	n2 -> n4 [label="\\*"];
	n3 -> n3 [label="[^]"];
	n3 -> n4 [label="\\*"];
	n4 -> n5 [label="\\/"];
}
`;

module.exports[n`toDot >> from regexes >> DFA (default): /((ab)+){3,}/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
	n1 -> n2 [label=b];
	n2 -> n3 [label=a];
	n3 -> n4 [label=b];
	n4 -> n5 [label=a];
	n5 -> n6 [label=b];
	n6 -> n5 [label=a];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (default): /((ab)+){3,}/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=circle];
	n9 [label="9", shape=circle];
	n10 [label="10", shape=circle];
	n11 [label="11", shape=circle];
	n12 [label="12", shape=circle];
	n13 [label="13", shape=circle];
	n14 [label="14", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=""];
	n1 -> n2 [label=a];
	n2 -> n3 [label=b];
	n3 -> n1 [label="", taillabel="1"];
	n3 -> n4 [label="", taillabel="2"];
	n4 -> n5 [label=""];
	n5 -> n6 [label=a];
	n6 -> n7 [label=b];
	n7 -> n5 [label="", taillabel="1"];
	n7 -> n8 [label="", taillabel="2"];
	n8 -> n9 [label=""];
	n9 -> n10 [label=""];
	n10 -> n11 [label=a];
	n11 -> n12 [label=b];
	n12 -> n10 [label="", taillabel="1"];
	n12 -> n13 [label="", taillabel="2"];
	n13 -> n9 [label="", taillabel="1"];
	n13 -> n14 [label="", taillabel="2"];
}
`;

module.exports[n`toDot >> from regexes >> NFA (default): /((ab)+){3,}/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
	n1 -> n2 [label=b];
	n2 -> n3 [label=a];
	n3 -> n4 [label=b];
	n4 -> n5 [label=a];
	n5 -> n6 [label=b];
	n6 -> n5 [label=a];
}
`;

module.exports[n`toDot >> from regexes >> DFA (JS): /((ab)+){3,}/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
	n1 -> n2 [label=b];
	n2 -> n3 [label=a];
	n3 -> n4 [label=b];
	n4 -> n5 [label=a];
	n5 -> n6 [label=b];
	n6 -> n5 [label=a];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (JS): /((ab)+){3,}/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=circle];
	n9 [label="9", shape=circle];
	n10 [label="10", shape=circle];
	n11 [label="11", shape=circle];
	n12 [label="12", shape=circle];
	n13 [label="13", shape=circle];
	n14 [label="14", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=""];
	n1 -> n2 [label=a];
	n2 -> n3 [label=b];
	n3 -> n1 [label="", taillabel="1"];
	n3 -> n4 [label="", taillabel="2"];
	n4 -> n5 [label=""];
	n5 -> n6 [label=a];
	n6 -> n7 [label=b];
	n7 -> n5 [label="", taillabel="1"];
	n7 -> n8 [label="", taillabel="2"];
	n8 -> n9 [label=""];
	n9 -> n10 [label=""];
	n10 -> n11 [label=a];
	n11 -> n12 [label=b];
	n12 -> n10 [label="", taillabel="1"];
	n12 -> n13 [label="", taillabel="2"];
	n13 -> n9 [label="", taillabel="1"];
	n13 -> n14 [label="", taillabel="2"];
}
`;

module.exports[n`toDot >> from regexes >> NFA (JS): /((ab)+){3,}/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label=a];
	n1 -> n2 [label=b];
	n2 -> n3 [label=a];
	n3 -> n4 [label=b];
	n4 -> n5 [label=a];
	n5 -> n6 [label=b];
	n6 -> n5 [label=a];
}
`;

module.exports[n`toDot >> from regexes >> DFA (default): /<\/?[^\s\d>\/=$<%][^\s>\/=$<%]*(?:\s+[^\s>\/=]+(?:=(?:"(?:\\[\s\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\"])*"|[^\s'">=]+))?)*\s*\/?>/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=doublecircle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=circle];
	n9 [label="9", shape=circle];
	n10 [label="10", shape=circle];
	n11 [label="11", shape=circle];
	n12 [label="12", shape=circle];
	n13 [label="13", shape=circle];
	n14 [label="14", shape=circle];
	n15 [label="15", shape=circle];
	n16 [label="16", shape=circle];
	n17 [label="17", shape=circle];
	n18 [label="18", shape=circle];
	n19 [label="19", shape=circle];
	n20 [label="20", shape=doublecircle];
	n21 [label="21", shape=circle];
	n22 [label="22", shape=circle];
	n23 [label="23", shape=circle];
	n24 [label="24", shape=circle];
	n25 [label="25", shape=circle];
	n26 [label="26", shape=circle];
	n27 [label="27", shape=circle];
	n28 [label="28", shape=circle];
	n29 [label="29", shape=circle];
	n30 [label="30", shape=circle];
	n31 [label="31", shape=circle];
	n32 [label="32", shape=circle];
	n33 [label="33", shape=circle];
	n34 [label="34", shape=circle];
	n35 [label="35", shape=circle];
	n36 [label="36", shape=doublecircle];
	n37 [label="37", shape=circle];
	n38 [label="38", shape=circle];
	n39 [label="39", shape=circle];
	n40 [label="40", shape=circle];
	n41 [label="41", shape=circle];
	n42 [label="42", shape=circle];
	n43 [label="43", shape=circle];
	n44 [label="44", shape=circle];
	n45 [label="45", shape=doublecircle];
	n46 [label="46", shape=circle];
	n47 [label="47", shape=circle];
	n48 [label="48", shape=circle];
	n49 [label="49", shape=circle];
	n50 [label="50", shape=doublecircle];
	n51 [label="51", shape=circle];
	n52 [label="52", shape=circle];
	n53 [label="53", shape=circle];
	n54 [label="54", shape=circle];
	n55 [label="55", shape=circle];
	n56 [label="56", shape=circle];
	n57 [label="57", shape=circle];
	n58 [label="58", shape=circle];
	n59 [label="59", shape=circle];
	n60 [label="60", shape=circle];
	n61 [label="61", shape=circle];
	n62 [label="62", shape=circle];
	n63 [label="63", shape=doublecircle];
	n64 [label="64", shape=circle];
	n65 [label="65", shape=circle];
	n66 [label="66", shape=circle];
	n67 [label="67", shape=circle];
	n68 [label="68", shape=circle];
	n69 [label="69", shape=circle];
	n70 [label="70", shape=circle];
	n71 [label="71", shape=doublecircle];
	n72 [label="72", shape=circle];
	n73 [label="73", shape=circle];
	n74 [label="74", shape=circle];
	n75 [label="75", shape=circle];
	n76 [label="76", shape=circle];
	n77 [label="77", shape=circle];
	n78 [label="78", shape=doublecircle];
	n79 [label="79", shape=circle];
	n80 [label="80", shape=circle];
	n81 [label="81", shape=circle];
	n82 [label="82", shape=circle];
	n83 [label="83", shape=circle];
	n84 [label="84", shape=circle];
	n85 [label="85", shape=circle];
	n86 [label="86", shape=doublecircle];
	n87 [label="87", shape=circle];
	n88 [label="88", shape=circle];
	n89 [label="89", shape=circle];
	n90 [label="90", shape=circle];
	n91 [label="91", shape=doublecircle];
	n92 [label="92", shape=circle];
	n93 [label="93", shape=circle];
	n94 [label="94", shape=circle];
	n95 [label="95", shape=circle];
	n96 [label="96", shape=circle];
	n97 [label="97", shape=circle];
	n98 [label="98", shape=circle];
	n99 [label="99", shape=circle];
	n100 [label="100", shape=doublecircle];
	n101 [label="101", shape=circle];
	n102 [label="102", shape=circle];
	n103 [label="103", shape=circle];
	n104 [label="104", shape=circle];
	n105 [label="105", shape=circle];
	n106 [label="106", shape=circle];
	n107 [label="107", shape=circle];
	n108 [label="108", shape=circle];
	n109 [label="109", shape=circle];
	n110 [label="110", shape=circle];
	n111 [label="111", shape=circle];
	n112 [label="112", shape=circle];
	n113 [label="113", shape=doublecircle];
	n114 [label="114", shape=circle];
	n115 [label="115", shape=circle];
	n116 [label="116", shape=circle];
	n117 [label="117", shape=circle];
	n118 [label="118", shape=circle];
	n119 [label="119", shape=circle];
	n120 [label="120", shape=circle];
	n121 [label="121", shape=doublecircle];
	n122 [label="122", shape=circle];
	n123 [label="123", shape=circle];
	n124 [label="124", shape=circle];
	n125 [label="125", shape=circle];
	n126 [label="126", shape=circle];
	n127 [label="127", shape=circle];
	n128 [label="128", shape=circle];
	n129 [label="129", shape=circle];
	n130 [label="130", shape=circle];
	n131 [label="131", shape=circle];
	n132 [label="132", shape=circle];
	n133 [label="133", shape=circle];
	n134 [label="134", shape=doublecircle];
	n135 [label="135", shape=circle];
	n136 [label="136", shape=circle];
	n137 [label="137", shape=circle];
	n138 [label="138", shape=circle];
	n139 [label="139", shape=doublecircle];
	n140 [label="140", shape=circle];
	n141 [label="141", shape=circle];
	n142 [label="142", shape=circle];
	n143 [label="143", shape=circle];
	n144 [label="144", shape=circle];
	n145 [label="145", shape=circle];
	n146 [label="146", shape=circle];
	n147 [label="147", shape=circle];
	n148 [label="148", shape=circle];
	n149 [label="149", shape=doublecircle];
	n150 [label="150", shape=circle];
	n151 [label="151", shape=circle];
	n152 [label="152", shape=circle];
	n153 [label="153", shape=circle];
	n154 [label="154", shape=circle];

	// edges
	null -> n0;
	n0 -> n1 [label="'<'"];
	n1 -> n2 [label="U+0-U+8 U+E-U+1F U+21-U+23 U+26-U+2E ':' ';' U+3F-U+9F U+A1-U+167F U+1681-U+1FFF U+200B-U+2027 U+202A-U+202E U+2030-U+205E U+2060-U+2FFF U+3001-U+FEFE U+FF00-U+FFFF"];
	n1 -> n3 [label="'/'"];
	n2 -> n2 [label="U+0-U+8 U+E-U+1F U+21-U+23 U+26-U+2E U+30-U+3B U+3F-U+9F U+A1-U+167F U+1681-U+1FFF U+200B-U+2027 U+202A-U+202E U+2030-U+205E U+2060-U+2FFF U+3001-U+FEFE U+FF00-U+FFFF"];
	n2 -> n4 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n2 -> n5 [label="'/'"];
	n2 -> n6 [label="'>'"];
	n3 -> n2 [label="U+0-U+8 U+E-U+1F U+21-U+23 U+26-U+2E ':' ';' U+3F-U+9F U+A1-U+167F U+1681-U+1FFF U+200B-U+2027 U+202A-U+202E U+2030-U+205E U+2060-U+2FFF U+3001-U+FEFE U+FF00-U+FFFF"];
	n4 -> n7 [label="not U+9-U+D U+20 '/' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n4 -> n4 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n4 -> n5 [label="'/'"];
	n4 -> n6 [label="'>'"];
	n5 -> n6 [label="'>'"];
	n7 -> n7 [label="not U+9-U+D U+20 '/' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n7 -> n4 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n7 -> n5 [label="'/'"];
	n7 -> n8 [label="'='"];
	n7 -> n6 [label="'>'"];
	n8 -> n9 [label="not U+9-U+D U+20 '\"' ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n8 -> n10 [label="'\"'"];
	n9 -> n9 [label="not U+9-U+D U+20 '\"' ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n9 -> n4 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n9 -> n6 [label="'>'"];
	n10 -> n10 [label="not '\"' '\\' '{'"];
	n10 -> n11 [label="'\"'"];
	n10 -> n12 [label="'\\'"];
	n10 -> n13 [label="'{'"];
	n11 -> n4 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n11 -> n5 [label="'/'"];
	n11 -> n6 [label="'>'"];
	n12 -> n10 [label=all];
	n13 -> n13 [label="not '\"' '\\' '{' '}'"];
	n13 -> n14 [label="'\"'"];
	n13 -> n15 [label="'\\'"];
	n13 -> n16 [label="'{'"];
	n13 -> n10 [label="'}'"];
	n14 -> n17 [label="not U+9-U+D U+20 '/' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n14 -> n18 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n14 -> n19 [label="'/'"];
	n14 -> n20 [label="'>'"];
	n14 -> n21 [label="'{'"];
	n14 -> n10 [label="'}'"];
	n15 -> n13 [label="not '{' '}'"];
	n15 -> n22 [label="'{'"];
	n15 -> n10 [label="'}'"];
	n16 -> n16 [label="not '\"' '\\' '{' '}'"];
	n16 -> n23 [label="'\"'"];
	n16 -> n24 [label="'\\'"];
	n16 -> n25 [label="'{'"];
	n16 -> n13 [label="'}'"];
	n17 -> n17 [label="not '{' '}'"];
	n17 -> n21 [label="'{'"];
	n17 -> n10 [label="'}'"];
	n18 -> n26 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n18 -> n18 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n18 -> n19 [label="'/'"];
	n18 -> n17 [label="'='"];
	n18 -> n20 [label="'>'"];
	n18 -> n27 [label="'{'"];
	n18 -> n28 [label="'}'"];
	n19 -> n17 [label="not '>' '{' '}'"];
	n19 -> n20 [label="'>'"];
	n19 -> n21 [label="'{'"];
	n19 -> n10 [label="'}'"];
	n20 -> n17 [label="not '{' '}'"];
	n20 -> n21 [label="'{'"];
	n20 -> n10 [label="'}'"];
	n21 -> n21 [label="not '{' '}'"];
	n21 -> n29 [label="'{'"];
	n21 -> n17 [label="'}'"];
	n22 -> n22 [label="not '\"' '\\' '{' '}'"];
	n22 -> n30 [label="'\"'"];
	n22 -> n31 [label="'\\'"];
	n22 -> n32 [label="'{'"];
	n22 -> n13 [label="'}'"];
	n23 -> n33 [label="not U+9-U+D U+20 '/' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n23 -> n34 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n23 -> n35 [label="'/'"];
	n23 -> n36 [label="'>'"];
	n23 -> n37 [label="'{'"];
	n23 -> n13 [label="'}'"];
	n24 -> n16 [label="not '{' '}'"];
	n24 -> n38 [label="'{'"];
	n24 -> n13 [label="'}'"];
	n25 -> n25 [label="not '\"' '\\' '}'"];
	n25 -> n39 [label="'\"'"];
	n25 -> n40 [label="'\\'"];
	n25 -> n16 [label="'}'"];
	n26 -> n26 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n26 -> n18 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n26 -> n19 [label="'/'"];
	n26 -> n41 [label="'='"];
	n26 -> n20 [label="'>'"];
	n26 -> n27 [label="'{'"];
	n26 -> n28 [label="'}'"];
	n27 -> n27 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n27 -> n42 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n27 -> n43 [label="'/'"];
	n27 -> n44 [label="'='"];
	n27 -> n45 [label="'>'"];
	n27 -> n46 [label="'{'"];
	n27 -> n26 [label="'}'"];
	n28 -> n28 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n28 -> n47 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n28 -> n7 [label="'\"'"];
	n28 -> n48 [label="'/'"];
	n28 -> n49 [label="'='"];
	n28 -> n50 [label="'>'"];
	n28 -> n51 [label="'\\'"];
	n28 -> n52 [label="'{'"];
	n29 -> n29 [label="not '{' '}'"];
	n29 -> n21 [label="'}'"];
	n30 -> n21 [label="not U+9-U+D U+20 '/' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n30 -> n42 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n30 -> n43 [label="'/'"];
	n30 -> n45 [label="'>'"];
	n30 -> n29 [label="'{'"];
	n30 -> n17 [label="'}'"];
	n31 -> n22 [label="not '{' '}'"];
	n31 -> n53 [label="'{'"];
	n31 -> n13 [label="'}'"];
	n32 -> n32 [label="not '\"' '\\' '{' '}'"];
	n32 -> n54 [label="'\"'"];
	n32 -> n55 [label="'\\'"];
	n32 -> n16 [label="'{'"];
	n32 -> n22 [label="'}'"];
	n33 -> n33 [label="not '{' '}'"];
	n33 -> n37 [label="'{'"];
	n33 -> n13 [label="'}'"];
	n34 -> n56 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n34 -> n34 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n34 -> n35 [label="'/'"];
	n34 -> n33 [label="'='"];
	n34 -> n36 [label="'>'"];
	n34 -> n57 [label="'{'"];
	n34 -> n52 [label="'}'"];
	n35 -> n33 [label="not '>' '{' '}'"];
	n35 -> n36 [label="'>'"];
	n35 -> n37 [label="'{'"];
	n35 -> n13 [label="'}'"];
	n36 -> n33 [label="not '{' '}'"];
	n36 -> n37 [label="'{'"];
	n36 -> n13 [label="'}'"];
	n37 -> n37 [label="not '{' '}'"];
	n37 -> n29 [label="'{'"];
	n37 -> n33 [label="'}'"];
	n38 -> n38 [label="not '\"' '\\' '{' '}'"];
	n38 -> n58 [label="'\"'"];
	n38 -> n59 [label="'\\'"];
	n38 -> n32 [label="'{'"];
	n38 -> n16 [label="'}'"];
	n39 -> n60 [label="not U+9-U+D U+20 '/' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n39 -> n61 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n39 -> n62 [label="'/'"];
	n39 -> n63 [label="'>'"];
	n39 -> n37 [label="'{'"];
	n39 -> n16 [label="'}'"];
	n40 -> n25 [label="not '{' '}'"];
	n40 -> n38 [label="'{'"];
	n40 -> n16 [label="'}'"];
	n41 -> n64 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n41 -> n17 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n41 -> n13 [label="'\"'"];
	n41 -> n65 [label="'{'"];
	n41 -> n66 [label="'}'"];
	n42 -> n27 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n42 -> n42 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n42 -> n43 [label="'/'"];
	n42 -> n21 [label="'='"];
	n42 -> n45 [label="'>'"];
	n42 -> n46 [label="'{'"];
	n42 -> n26 [label="'}'"];
	n43 -> n21 [label="not '>' '{' '}'"];
	n43 -> n45 [label="'>'"];
	n43 -> n29 [label="'{'"];
	n43 -> n17 [label="'}'"];
	n44 -> n65 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n44 -> n21 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n44 -> n22 [label="'\"'"];
	n44 -> n67 [label="'{'"];
	n44 -> n64 [label="'}'"];
	n45 -> n21 [label="not '{' '}'"];
	n45 -> n29 [label="'{'"];
	n45 -> n17 [label="'}'"];
	n46 -> n46 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n46 -> n68 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n46 -> n69 [label="'/'"];
	n46 -> n70 [label="'='"];
	n46 -> n71 [label="'>'"];
	n46 -> n7 [label="'{'"];
	n46 -> n27 [label="'}'"];
	n47 -> n28 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n47 -> n47 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n47 -> n7 [label="'\"'"];
	n47 -> n48 [label="'/'"];
	n47 -> n10 [label="'='"];
	n47 -> n50 [label="'>'"];
	n47 -> n51 [label="'\\'"];
	n47 -> n52 [label="'{'"];
	n48 -> n10 [label="not '\"' '>' '\\' '{'"];
	n48 -> n11 [label="'\"'"];
	n48 -> n50 [label="'>'"];
	n48 -> n12 [label="'\\'"];
	n48 -> n13 [label="'{'"];
	n49 -> n66 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n49 -> n10 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n49 -> n72 [label="'\"'"];
	n49 -> n73 [label="'\\'"];
	n49 -> n74 [label="'{'"];
	n50 -> n10 [label="not '\"' '\\' '{'"];
	n50 -> n11 [label="'\"'"];
	n50 -> n12 [label="'\\'"];
	n50 -> n13 [label="'{'"];
	n51 -> n28 [label="not U+9-U+D U+20 '/' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n51 -> n47 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n51 -> n48 [label="'/'"];
	n51 -> n49 [label="'='"];
	n51 -> n50 [label="'>'"];
	n52 -> n52 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n52 -> n75 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n52 -> n26 [label="'\"'"];
	n52 -> n76 [label="'/'"];
	n52 -> n77 [label="'='"];
	n52 -> n78 [label="'>'"];
	n52 -> n79 [label="'\\'"];
	n52 -> n80 [label="'{'"];
	n52 -> n28 [label="'}'"];
	n53 -> n53 [label="not '\"' '\\' '{' '}'"];
	n53 -> n81 [label="'\"'"];
	n53 -> n82 [label="'\\'"];
	n53 -> n13 [label="'{'"];
	n53 -> n22 [label="'}'"];
	n54 -> n83 [label="not U+9-U+D U+20 '/' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n54 -> n84 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n54 -> n85 [label="'/'"];
	n54 -> n86 [label="'>'"];
	n54 -> n21 [label="'{'"];
	n54 -> n22 [label="'}'"];
	n55 -> n32 [label="not '{' '}'"];
	n55 -> n22 [label="'{' '}'"];
	n56 -> n56 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n56 -> n34 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n56 -> n35 [label="'/'"];
	n56 -> n87 [label="'='"];
	n56 -> n36 [label="'>'"];
	n56 -> n57 [label="'{'"];
	n56 -> n52 [label="'}'"];
	n57 -> n57 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n57 -> n88 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n57 -> n89 [label="'/'"];
	n57 -> n90 [label="'='"];
	n57 -> n91 [label="'>'"];
	n57 -> n46 [label="'{'"];
	n57 -> n56 [label="'}'"];
	n58 -> n37 [label="not U+9-U+D U+20 '/' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n58 -> n88 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n58 -> n89 [label="'/'"];
	n58 -> n91 [label="'>'"];
	n58 -> n29 [label="'{'"];
	n58 -> n33 [label="'}'"];
	n59 -> n38 [label="not '{' '}'"];
	n59 -> n53 [label="'{'"];
	n59 -> n16 [label="'}'"];
	n60 -> n60 [label="not '{' '}'"];
	n60 -> n37 [label="'{'"];
	n60 -> n16 [label="'}'"];
	n61 -> n92 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n61 -> n61 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n61 -> n62 [label="'/'"];
	n61 -> n60 [label="'='"];
	n61 -> n63 [label="'>'"];
	n61 -> n57 [label="'{'"];
	n61 -> n80 [label="'}'"];
	n62 -> n60 [label="not '>' '{' '}'"];
	n62 -> n63 [label="'>'"];
	n62 -> n37 [label="'{'"];
	n62 -> n16 [label="'}'"];
	n63 -> n60 [label="not '{' '}'"];
	n63 -> n37 [label="'{'"];
	n63 -> n16 [label="'}'"];
	n64 -> n64 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n64 -> n18 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n64 -> n17 [label="'\"' ''' '='"];
	n64 -> n20 [label="'>'"];
	n64 -> n65 [label="'{'"];
	n64 -> n66 [label="'}'"];
	n65 -> n65 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n65 -> n42 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n65 -> n21 [label="'\"' ''' '='"];
	n65 -> n45 [label="'>'"];
	n65 -> n67 [label="'{'"];
	n65 -> n64 [label="'}'"];
	n66 -> n66 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n66 -> n47 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n66 -> n11 [label="'\"'"];
	n66 -> n10 [label="''' '='"];
	n66 -> n50 [label="'>'"];
	n66 -> n73 [label="'\\'"];
	n66 -> n74 [label="'{'"];
	n67 -> n67 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n67 -> n68 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n67 -> n29 [label="'\"' ''' '='"];
	n67 -> n71 [label="'>'"];
	n67 -> n9 [label="'{'"];
	n67 -> n65 [label="'}'"];
	n68 -> n46 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n68 -> n68 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n68 -> n69 [label="'/'"];
	n68 -> n29 [label="'='"];
	n68 -> n71 [label="'>'"];
	n68 -> n7 [label="'{'"];
	n68 -> n27 [label="'}'"];
	n69 -> n29 [label="not '>' '{' '}'"];
	n69 -> n71 [label="'>'"];
	n69 -> n21 [label="'}'"];
	n70 -> n67 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n70 -> n29 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n70 -> n53 [label="'\"'"];
	n70 -> n9 [label="'{'"];
	n70 -> n65 [label="'}'"];
	n71 -> n29 [label="not '{' '}'"];
	n71 -> n21 [label="'}'"];
	n72 -> n10 [label="not U+9-U+D U+20 '\"' '/' '>' '\\' '{' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n72 -> n47 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n72 -> n11 [label="'\"'"];
	n72 -> n48 [label="'/'"];
	n72 -> n50 [label="'>'"];
	n72 -> n12 [label="'\\'"];
	n72 -> n13 [label="'{'"];
	n73 -> n66 [label="not U+9-U+D U+20 '\"' ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n73 -> n47 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n73 -> n10 [label="'\"' ''' '='"];
	n73 -> n50 [label="'>'"];
	n74 -> n74 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n74 -> n75 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n74 -> n14 [label="'\"'"];
	n74 -> n13 [label="''' '='"];
	n74 -> n78 [label="'>'"];
	n74 -> n93 [label="'\\'"];
	n74 -> n94 [label="'{'"];
	n74 -> n66 [label="'}'"];
	n75 -> n52 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n75 -> n75 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n75 -> n26 [label="'\"'"];
	n75 -> n76 [label="'/'"];
	n75 -> n13 [label="'='"];
	n75 -> n78 [label="'>'"];
	n75 -> n79 [label="'\\'"];
	n75 -> n80 [label="'{'"];
	n75 -> n28 [label="'}'"];
	n76 -> n13 [label="not '\"' '>' '\\' '{' '}'"];
	n76 -> n14 [label="'\"'"];
	n76 -> n78 [label="'>'"];
	n76 -> n15 [label="'\\'"];
	n76 -> n16 [label="'{'"];
	n76 -> n10 [label="'}'"];
	n77 -> n74 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n77 -> n13 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n77 -> n95 [label="'\"'"];
	n77 -> n93 [label="'\\'"];
	n77 -> n94 [label="'{'"];
	n77 -> n66 [label="'}'"];
	n78 -> n13 [label="not '\"' '\\' '{' '}'"];
	n78 -> n14 [label="'\"'"];
	n78 -> n15 [label="'\\'"];
	n78 -> n16 [label="'{'"];
	n78 -> n10 [label="'}'"];
	n79 -> n52 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n79 -> n75 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n79 -> n76 [label="'/'"];
	n79 -> n77 [label="'='"];
	n79 -> n78 [label="'>'"];
	n79 -> n96 [label="'{'"];
	n79 -> n28 [label="'}'"];
	n80 -> n80 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n80 -> n97 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n80 -> n56 [label="'\"'"];
	n80 -> n98 [label="'/'"];
	n80 -> n99 [label="'='"];
	n80 -> n100 [label="'>'"];
	n80 -> n101 [label="'\\'"];
	n80 -> n102 [label="'{'"];
	n80 -> n52 [label="'}'"];
	n81 -> n29 [label="not U+9-U+D U+20 '/' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n81 -> n68 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n81 -> n69 [label="'/'"];
	n81 -> n71 [label="'>'"];
	n81 -> n21 [label="'}'"];
	n82 -> n53 [label="not '{' '}'"];
	n82 -> n10 [label="'{'"];
	n82 -> n22 [label="'}'"];
	n83 -> n83 [label="not '{' '}'"];
	n83 -> n21 [label="'{'"];
	n83 -> n22 [label="'}'"];
	n84 -> n103 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n84 -> n84 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n84 -> n85 [label="'/'"];
	n84 -> n83 [label="'='"];
	n84 -> n86 [label="'>'"];
	n84 -> n27 [label="'{'"];
	n84 -> n96 [label="'}'"];
	n85 -> n83 [label="not '>' '{' '}'"];
	n85 -> n86 [label="'>'"];
	n85 -> n21 [label="'{'"];
	n85 -> n22 [label="'}'"];
	n86 -> n83 [label="not '{' '}'"];
	n86 -> n21 [label="'{'"];
	n86 -> n22 [label="'}'"];
	n87 -> n104 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n87 -> n33 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n87 -> n16 [label="'\"'"];
	n87 -> n105 [label="'{'"];
	n87 -> n74 [label="'}'"];
	n88 -> n57 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n88 -> n88 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n88 -> n89 [label="'/'"];
	n88 -> n37 [label="'='"];
	n88 -> n91 [label="'>'"];
	n88 -> n46 [label="'{'"];
	n88 -> n56 [label="'}'"];
	n89 -> n37 [label="not '>' '{' '}'"];
	n89 -> n91 [label="'>'"];
	n89 -> n29 [label="'{'"];
	n89 -> n33 [label="'}'"];
	n90 -> n105 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n90 -> n37 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n90 -> n38 [label="'\"'"];
	n90 -> n67 [label="'{'"];
	n90 -> n104 [label="'}'"];
	n91 -> n37 [label="not '{' '}'"];
	n91 -> n29 [label="'{'"];
	n91 -> n33 [label="'}'"];
	n92 -> n92 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n92 -> n61 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n92 -> n62 [label="'/'"];
	n92 -> n106 [label="'='"];
	n92 -> n63 [label="'>'"];
	n92 -> n57 [label="'{'"];
	n92 -> n80 [label="'}'"];
	n93 -> n74 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n93 -> n75 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n93 -> n13 [label="'\"' ''' '='"];
	n93 -> n78 [label="'>'"];
	n93 -> n107 [label="'{'"];
	n93 -> n66 [label="'}'"];
	n94 -> n94 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n94 -> n97 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n94 -> n23 [label="'\"'"];
	n94 -> n16 [label="''' '='"];
	n94 -> n100 [label="'>'"];
	n94 -> n108 [label="'\\'"];
	n94 -> n109 [label="'{'"];
	n94 -> n74 [label="'}'"];
	n95 -> n13 [label="not U+9-U+D U+20 '\"' '/' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n95 -> n75 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n95 -> n14 [label="'\"'"];
	n95 -> n76 [label="'/'"];
	n95 -> n78 [label="'>'"];
	n95 -> n15 [label="'\\'"];
	n95 -> n16 [label="'{'"];
	n95 -> n10 [label="'}'"];
	n96 -> n96 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n96 -> n110 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n96 -> n27 [label="'\"'"];
	n96 -> n111 [label="'/'"];
	n96 -> n112 [label="'='"];
	n96 -> n113 [label="'>'"];
	n96 -> n114 [label="'\\'"];
	n96 -> n115 [label="'{'"];
	n96 -> n52 [label="'}'"];
	n97 -> n80 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n97 -> n97 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n97 -> n56 [label="'\"'"];
	n97 -> n98 [label="'/'"];
	n97 -> n16 [label="'='"];
	n97 -> n100 [label="'>'"];
	n97 -> n101 [label="'\\'"];
	n97 -> n102 [label="'{'"];
	n97 -> n52 [label="'}'"];
	n98 -> n16 [label="not '\"' '>' '\\' '{' '}'"];
	n98 -> n23 [label="'\"'"];
	n98 -> n100 [label="'>'"];
	n98 -> n24 [label="'\\'"];
	n98 -> n25 [label="'{'"];
	n98 -> n13 [label="'}'"];
	n99 -> n94 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n99 -> n16 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n99 -> n116 [label="'\"'"];
	n99 -> n108 [label="'\\'"];
	n99 -> n109 [label="'{'"];
	n99 -> n74 [label="'}'"];
	n100 -> n16 [label="not '\"' '\\' '{' '}'"];
	n100 -> n23 [label="'\"'"];
	n100 -> n24 [label="'\\'"];
	n100 -> n25 [label="'{'"];
	n100 -> n13 [label="'}'"];
	n101 -> n80 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n101 -> n97 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n101 -> n98 [label="'/'"];
	n101 -> n99 [label="'='"];
	n101 -> n100 [label="'>'"];
	n101 -> n117 [label="'{'"];
	n101 -> n52 [label="'}'"];
	n102 -> n102 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n102 -> n118 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n102 -> n92 [label="'\"'"];
	n102 -> n119 [label="'/'"];
	n102 -> n120 [label="'='"];
	n102 -> n121 [label="'>'"];
	n102 -> n122 [label="'\\'"];
	n102 -> n80 [label="'}'"];
	n103 -> n103 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n103 -> n84 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n103 -> n85 [label="'/'"];
	n103 -> n123 [label="'='"];
	n103 -> n86 [label="'>'"];
	n103 -> n27 [label="'{'"];
	n103 -> n96 [label="'}'"];
	n104 -> n104 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n104 -> n34 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n104 -> n33 [label="'\"' ''' '='"];
	n104 -> n36 [label="'>'"];
	n104 -> n105 [label="'{'"];
	n104 -> n74 [label="'}'"];
	n105 -> n105 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n105 -> n88 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n105 -> n37 [label="'\"' ''' '='"];
	n105 -> n91 [label="'>'"];
	n105 -> n67 [label="'{'"];
	n105 -> n104 [label="'}'"];
	n106 -> n124 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n106 -> n60 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n106 -> n25 [label="'\"'"];
	n106 -> n105 [label="'{'"];
	n106 -> n94 [label="'}'"];
	n107 -> n107 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n107 -> n110 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n107 -> n30 [label="'\"'"];
	n107 -> n22 [label="''' '='"];
	n107 -> n113 [label="'>'"];
	n107 -> n125 [label="'\\'"];
	n107 -> n126 [label="'{'"];
	n107 -> n74 [label="'}'"];
	n108 -> n94 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n108 -> n97 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n108 -> n16 [label="'\"' ''' '='"];
	n108 -> n100 [label="'>'"];
	n108 -> n127 [label="'{'"];
	n108 -> n74 [label="'}'"];
	n109 -> n109 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n109 -> n118 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n109 -> n39 [label="'\"'"];
	n109 -> n25 [label="''' '='"];
	n109 -> n121 [label="'>'"];
	n109 -> n128 [label="'\\'"];
	n109 -> n94 [label="'}'"];
	n110 -> n96 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n110 -> n110 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n110 -> n27 [label="'\"'"];
	n110 -> n111 [label="'/'"];
	n110 -> n22 [label="'='"];
	n110 -> n113 [label="'>'"];
	n110 -> n114 [label="'\\'"];
	n110 -> n115 [label="'{'"];
	n110 -> n52 [label="'}'"];
	n111 -> n22 [label="not '\"' '>' '\\' '{' '}'"];
	n111 -> n30 [label="'\"'"];
	n111 -> n113 [label="'>'"];
	n111 -> n31 [label="'\\'"];
	n111 -> n32 [label="'{'"];
	n111 -> n13 [label="'}'"];
	n112 -> n107 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n112 -> n22 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n112 -> n129 [label="'\"'"];
	n112 -> n125 [label="'\\'"];
	n112 -> n126 [label="'{'"];
	n112 -> n74 [label="'}'"];
	n113 -> n22 [label="not '\"' '\\' '{' '}'"];
	n113 -> n30 [label="'\"'"];
	n113 -> n31 [label="'\\'"];
	n113 -> n32 [label="'{'"];
	n113 -> n13 [label="'}'"];
	n114 -> n96 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n114 -> n110 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n114 -> n111 [label="'/'"];
	n114 -> n112 [label="'='"];
	n114 -> n113 [label="'>'"];
	n114 -> n130 [label="'{'"];
	n114 -> n52 [label="'}'"];
	n115 -> n115 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n115 -> n131 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n115 -> n103 [label="'\"'"];
	n115 -> n132 [label="'/'"];
	n115 -> n133 [label="'='"];
	n115 -> n134 [label="'>'"];
	n115 -> n135 [label="'\\'"];
	n115 -> n80 [label="'{'"];
	n115 -> n96 [label="'}'"];
	n116 -> n16 [label="not U+9-U+D U+20 '\"' '/' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n116 -> n97 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n116 -> n23 [label="'\"'"];
	n116 -> n98 [label="'/'"];
	n116 -> n100 [label="'>'"];
	n116 -> n24 [label="'\\'"];
	n116 -> n25 [label="'{'"];
	n116 -> n13 [label="'}'"];
	n117 -> n117 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n117 -> n136 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n117 -> n57 [label="'\"'"];
	n117 -> n137 [label="'/'"];
	n117 -> n138 [label="'='"];
	n117 -> n139 [label="'>'"];
	n117 -> n140 [label="'\\'"];
	n117 -> n115 [label="'{'"];
	n117 -> n80 [label="'}'"];
	n118 -> n102 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n118 -> n118 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n118 -> n92 [label="'\"'"];
	n118 -> n119 [label="'/'"];
	n118 -> n25 [label="'='"];
	n118 -> n121 [label="'>'"];
	n118 -> n122 [label="'\\'"];
	n118 -> n80 [label="'}'"];
	n119 -> n25 [label="not '\"' '>' '\\' '}'"];
	n119 -> n39 [label="'\"'"];
	n119 -> n121 [label="'>'"];
	n119 -> n40 [label="'\\'"];
	n119 -> n16 [label="'}'"];
	n120 -> n109 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n120 -> n25 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n120 -> n141 [label="'\"'"];
	n120 -> n128 [label="'\\'"];
	n120 -> n94 [label="'}'"];
	n121 -> n25 [label="not '\"' '\\' '}'"];
	n121 -> n39 [label="'\"'"];
	n121 -> n40 [label="'\\'"];
	n121 -> n16 [label="'}'"];
	n122 -> n102 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n122 -> n118 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n122 -> n119 [label="'/'"];
	n122 -> n120 [label="'='"];
	n122 -> n121 [label="'>'"];
	n122 -> n117 [label="'{'"];
	n122 -> n80 [label="'}'"];
	n123 -> n142 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n123 -> n83 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n123 -> n32 [label="'\"'"];
	n123 -> n65 [label="'{'"];
	n123 -> n107 [label="'}'"];
	n124 -> n124 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n124 -> n61 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n124 -> n60 [label="'\"' ''' '='"];
	n124 -> n63 [label="'>'"];
	n124 -> n105 [label="'{'"];
	n124 -> n94 [label="'}'"];
	n125 -> n107 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n125 -> n110 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n125 -> n22 [label="'\"' ''' '='"];
	n125 -> n113 [label="'>'"];
	n125 -> n143 [label="'{'"];
	n125 -> n74 [label="'}'"];
	n126 -> n126 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n126 -> n131 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n126 -> n54 [label="'\"'"];
	n126 -> n32 [label="''' '='"];
	n126 -> n134 [label="'>'"];
	n126 -> n144 [label="'\\'"];
	n126 -> n94 [label="'{'"];
	n126 -> n107 [label="'}'"];
	n127 -> n127 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n127 -> n136 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n127 -> n58 [label="'\"'"];
	n127 -> n38 [label="''' '='"];
	n127 -> n139 [label="'>'"];
	n127 -> n145 [label="'\\'"];
	n127 -> n126 [label="'{'"];
	n127 -> n94 [label="'}'"];
	n128 -> n109 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n128 -> n118 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n128 -> n25 [label="'\"' ''' '='"];
	n128 -> n121 [label="'>'"];
	n128 -> n127 [label="'{'"];
	n128 -> n94 [label="'}'"];
	n129 -> n22 [label="not U+9-U+D U+20 '\"' '/' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n129 -> n110 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n129 -> n30 [label="'\"'"];
	n129 -> n111 [label="'/'"];
	n129 -> n113 [label="'>'"];
	n129 -> n31 [label="'\\'"];
	n129 -> n32 [label="'{'"];
	n129 -> n13 [label="'}'"];
	n130 -> n130 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n130 -> n146 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n130 -> n46 [label="'\"'"];
	n130 -> n147 [label="'/'"];
	n130 -> n148 [label="'='"];
	n130 -> n149 [label="'>'"];
	n130 -> n150 [label="'\\'"];
	n130 -> n52 [label="'{'"];
	n130 -> n96 [label="'}'"];
	n131 -> n115 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n131 -> n131 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n131 -> n103 [label="'\"'"];
	n131 -> n132 [label="'/'"];
	n131 -> n32 [label="'='"];
	n131 -> n134 [label="'>'"];
	n131 -> n135 [label="'\\'"];
	n131 -> n80 [label="'{'"];
	n131 -> n96 [label="'}'"];
	n132 -> n32 [label="not '\"' '>' '\\' '{' '}'"];
	n132 -> n54 [label="'\"'"];
	n132 -> n134 [label="'>'"];
	n132 -> n55 [label="'\\'"];
	n132 -> n16 [label="'{'"];
	n132 -> n22 [label="'}'"];
	n133 -> n126 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n133 -> n32 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n133 -> n151 [label="'\"'"];
	n133 -> n144 [label="'\\'"];
	n133 -> n94 [label="'{'"];
	n133 -> n107 [label="'}'"];
	n134 -> n32 [label="not '\"' '\\' '{' '}'"];
	n134 -> n54 [label="'\"'"];
	n134 -> n55 [label="'\\'"];
	n134 -> n16 [label="'{'"];
	n134 -> n22 [label="'}'"];
	n135 -> n115 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n135 -> n131 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n135 -> n132 [label="'/'"];
	n135 -> n133 [label="'='"];
	n135 -> n134 [label="'>'"];
	n135 -> n96 [label="'{' '}'"];
	n136 -> n117 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n136 -> n136 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n136 -> n57 [label="'\"'"];
	n136 -> n137 [label="'/'"];
	n136 -> n38 [label="'='"];
	n136 -> n139 [label="'>'"];
	n136 -> n140 [label="'\\'"];
	n136 -> n115 [label="'{'"];
	n136 -> n80 [label="'}'"];
	n137 -> n38 [label="not '\"' '>' '\\' '{' '}'"];
	n137 -> n58 [label="'\"'"];
	n137 -> n139 [label="'>'"];
	n137 -> n59 [label="'\\'"];
	n137 -> n32 [label="'{'"];
	n137 -> n16 [label="'}'"];
	n138 -> n127 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n138 -> n38 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n138 -> n152 [label="'\"'"];
	n138 -> n145 [label="'\\'"];
	n138 -> n126 [label="'{'"];
	n138 -> n94 [label="'}'"];
	n139 -> n38 [label="not '\"' '\\' '{' '}'"];
	n139 -> n58 [label="'\"'"];
	n139 -> n59 [label="'\\'"];
	n139 -> n32 [label="'{'"];
	n139 -> n16 [label="'}'"];
	n140 -> n117 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n140 -> n136 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n140 -> n137 [label="'/'"];
	n140 -> n138 [label="'='"];
	n140 -> n139 [label="'>'"];
	n140 -> n130 [label="'{'"];
	n140 -> n80 [label="'}'"];
	n141 -> n25 [label="not U+9-U+D U+20 '\"' '/' '>' '\\' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n141 -> n118 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n141 -> n39 [label="'\"'"];
	n141 -> n119 [label="'/'"];
	n141 -> n121 [label="'>'"];
	n141 -> n40 [label="'\\'"];
	n141 -> n16 [label="'}'"];
	n142 -> n142 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n142 -> n84 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n142 -> n83 [label="'\"' ''' '='"];
	n142 -> n86 [label="'>'"];
	n142 -> n65 [label="'{'"];
	n142 -> n107 [label="'}'"];
	n143 -> n143 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n143 -> n146 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n143 -> n81 [label="'\"'"];
	n143 -> n53 [label="''' '='"];
	n143 -> n149 [label="'>'"];
	n143 -> n153 [label="'\\'"];
	n143 -> n74 [label="'{'"];
	n143 -> n107 [label="'}'"];
	n144 -> n126 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n144 -> n131 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n144 -> n32 [label="'\"' ''' '='"];
	n144 -> n134 [label="'>'"];
	n144 -> n107 [label="'{' '}'"];
	n145 -> n127 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n145 -> n136 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n145 -> n38 [label="'\"' ''' '='"];
	n145 -> n139 [label="'>'"];
	n145 -> n143 [label="'{'"];
	n145 -> n94 [label="'}'"];
	n146 -> n130 [label="not U+9-U+D U+20 '\"' '/' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n146 -> n146 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n146 -> n46 [label="'\"'"];
	n146 -> n147 [label="'/'"];
	n146 -> n53 [label="'='"];
	n146 -> n149 [label="'>'"];
	n146 -> n150 [label="'\\'"];
	n146 -> n52 [label="'{'"];
	n146 -> n96 [label="'}'"];
	n147 -> n53 [label="not '\"' '>' '\\' '{' '}'"];
	n147 -> n81 [label="'\"'"];
	n147 -> n149 [label="'>'"];
	n147 -> n82 [label="'\\'"];
	n147 -> n13 [label="'{'"];
	n147 -> n22 [label="'}'"];
	n148 -> n143 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n148 -> n53 [label="U+9-U+D U+20 ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n148 -> n154 [label="'\"'"];
	n148 -> n153 [label="'\\'"];
	n148 -> n74 [label="'{'"];
	n148 -> n107 [label="'}'"];
	n149 -> n53 [label="not '\"' '\\' '{' '}'"];
	n149 -> n81 [label="'\"'"];
	n149 -> n82 [label="'\\'"];
	n149 -> n13 [label="'{'"];
	n149 -> n22 [label="'}'"];
	n150 -> n130 [label="not U+9-U+D U+20 '/' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n150 -> n146 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n150 -> n147 [label="'/'"];
	n150 -> n148 [label="'='"];
	n150 -> n149 [label="'>'"];
	n150 -> n28 [label="'{'"];
	n150 -> n96 [label="'}'"];
	n151 -> n32 [label="not U+9-U+D U+20 '\"' '/' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n151 -> n131 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n151 -> n54 [label="'\"'"];
	n151 -> n132 [label="'/'"];
	n151 -> n134 [label="'>'"];
	n151 -> n55 [label="'\\'"];
	n151 -> n16 [label="'{'"];
	n151 -> n22 [label="'}'"];
	n152 -> n38 [label="not U+9-U+D U+20 '\"' '/' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n152 -> n136 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n152 -> n58 [label="'\"'"];
	n152 -> n137 [label="'/'"];
	n152 -> n139 [label="'>'"];
	n152 -> n59 [label="'\\'"];
	n152 -> n32 [label="'{'"];
	n152 -> n16 [label="'}'"];
	n153 -> n143 [label="not U+9-U+D U+20 '\"' ''' '=' '>' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n153 -> n146 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n153 -> n53 [label="'\"' ''' '='"];
	n153 -> n149 [label="'>'"];
	n153 -> n66 [label="'{'"];
	n153 -> n107 [label="'}'"];
	n154 -> n53 [label="not U+9-U+D U+20 '\"' '/' '>' '\\' '{' '}' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n154 -> n146 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n154 -> n81 [label="'\"'"];
	n154 -> n147 [label="'/'"];
	n154 -> n149 [label="'>'"];
	n154 -> n82 [label="'\\'"];
	n154 -> n13 [label="'{'"];
	n154 -> n22 [label="'}'"];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (default): /<\/?[^\s\d>\/=$<%][^\s>\/=$<%]*(?:\s+[^\s>\/=]+(?:=(?:"(?:\\[\s\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\"])*"|[^\s'">=]+))?)*\s*\/?>/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=circle];
	n9 [label="9", shape=circle];
	n10 [label="10", shape=circle];
	n11 [label="11", shape=circle];
	n12 [label="12", shape=circle];
	n13 [label="13", shape=circle];
	n14 [label="14", shape=circle];
	n15 [label="15", shape=circle];
	n16 [label="16", shape=circle];
	n17 [label="17", shape=circle];
	n18 [label="18", shape=doublecircle];
	n19 [label="19", shape=circle];
	n20 [label="20", shape=circle];
	n21 [label="21", shape=circle];
	n22 [label="22", shape=circle];
	n23 [label="23", shape=circle];
	n24 [label="24", shape=circle];
	n25 [label="25", shape=circle];
	n26 [label="26", shape=circle];
	n27 [label="27", shape=circle];
	n28 [label="28", shape=circle];
	n29 [label="29", shape=circle];
	n30 [label="30", shape=circle];
	n31 [label="31", shape=circle];
	n32 [label="32", shape=circle];
	n33 [label="33", shape=circle];
	n34 [label="34", shape=circle];
	n35 [label="35", shape=circle];
	n36 [label="36", shape=circle];
	n37 [label="37", shape=circle];
	n38 [label="38", shape=circle];
	n39 [label="39", shape=circle];
	n40 [label="40", shape=circle];
	n41 [label="41", shape=circle];
	n42 [label="42", shape=circle];
	n43 [label="43", shape=circle];
	n44 [label="44", shape=circle];
	n45 [label="45", shape=circle];
	n46 [label="46", shape=circle];
	n47 [label="47", shape=circle];
	n48 [label="48", shape=circle];
	n49 [label="49", shape=circle];
	n50 [label="50", shape=circle];
	n51 [label="51", shape=circle];
	n52 [label="52", shape=circle];

	// edges
	null -> n0;
	n0 -> n1 [label="'<'"];
	n1 -> n2 [label="'/'", taillabel="1"];
	n1 -> n3 [label="", taillabel="2"];
	n2 -> n3 [label=""];
	n3 -> n4 [label="U+0-U+8 U+E-U+1F U+21-U+23 U+26-U+2E ':' ';' U+3F-U+9F U+A1-U+167F U+1681-U+1FFF U+200B-U+2027 U+202A-U+202E U+2030-U+205E U+2060-U+2FFF U+3001-U+FEFE U+FF00-U+FFFF"];
	n4 -> n5 [label="", taillabel="1"];
	n4 -> n6 [label="", taillabel="2"];
	n5 -> n7 [label="U+0-U+8 U+E-U+1F U+21-U+23 U+26-U+2E U+30-U+3B U+3F-U+9F U+A1-U+167F U+1681-U+1FFF U+200B-U+2027 U+202A-U+202E U+2030-U+205E U+2060-U+2FFF U+3001-U+FEFE U+FF00-U+FFFF"];
	n6 -> n8 [label="", taillabel="1"];
	n6 -> n9 [label="", taillabel="2"];
	n7 -> n5 [label="", taillabel="1"];
	n7 -> n6 [label="", taillabel="2"];
	n8 -> n10 [label=""];
	n9 -> n11 [label="", taillabel="1"];
	n9 -> n12 [label="", taillabel="2"];
	n10 -> n13 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n11 -> n14 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n12 -> n15 [label="'/'", taillabel="1"];
	n12 -> n16 [label="", taillabel="2"];
	n13 -> n10 [label="", taillabel="1"];
	n13 -> n17 [label="", taillabel="2"];
	n14 -> n11 [label="", taillabel="1"];
	n14 -> n12 [label="", taillabel="2"];
	n15 -> n16 [label=""];
	n16 -> n18 [label="'>'"];
	n17 -> n19 [label=""];
	n19 -> n20 [label="not U+9-U+D U+20 '/' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n20 -> n19 [label="", taillabel="1"];
	n20 -> n21 [label="", taillabel="2"];
	n21 -> n22 [label="'='", taillabel="1"];
	n21 -> n23 [label="", taillabel="2"];
	n22 -> n24 [label="'\"'", taillabel="1"];
	n22 -> n25 [label="", taillabel="2"];
	n23 -> n8 [label="", taillabel="1"];
	n23 -> n9 [label="", taillabel="2"];
	n24 -> n26 [label="", taillabel="1"];
	n24 -> n27 [label="", taillabel="2"];
	n25 -> n28 [label="not U+9-U+D U+20 '\"' ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n26 -> n29 [label="'\\'", taillabel="1"];
	n26 -> n30 [label="'{'", taillabel="2"];
	n26 -> n31 [label="not '\"' '\\'", taillabel="3"];
	n27 -> n32 [label="'\"'"];
	n28 -> n25 [label="", taillabel="1"];
	n28 -> n33 [label="", taillabel="2"];
	n29 -> n34 [label=all];
	n30 -> n35 [label=""];
	n31 -> n36 [label=""];
	n32 -> n37 [label=""];
	n33 -> n37 [label=""];
	n34 -> n36 [label=""];
	n35 -> n38 [label="'{'", taillabel="1"];
	n35 -> n39 [label="not '{' '}'", taillabel="2"];
	n36 -> n26 [label="", taillabel="1"];
	n36 -> n27 [label="", taillabel="2"];
	n37 -> n23 [label=""];
	n38 -> n40 [label="", taillabel="1"];
	n38 -> n41 [label="", taillabel="2"];
	n39 -> n42 [label=""];
	n40 -> n43 [label="'{'", taillabel="1"];
	n40 -> n44 [label="not '{' '}'", taillabel="2"];
	n41 -> n45 [label="'}'"];
	n42 -> n35 [label="", taillabel="1"];
	n42 -> n46 [label="", taillabel="2"];
	n43 -> n47 [label="", taillabel="1"];
	n43 -> n48 [label="", taillabel="2"];
	n44 -> n49 [label=""];
	n45 -> n42 [label=""];
	n46 -> n50 [label="'}'"];
	n47 -> n51 [label="not '{' '}'"];
	n48 -> n52 [label="'}'"];
	n49 -> n40 [label="", taillabel="1"];
	n49 -> n41 [label="", taillabel="2"];
	n50 -> n36 [label=""];
	n51 -> n47 [label="", taillabel="1"];
	n51 -> n48 [label="", taillabel="2"];
	n52 -> n49 [label=""];
}
`;

module.exports[n`toDot >> from regexes >> NFA (default): /<\/?[^\s\d>\/=$<%][^\s>\/=$<%]*(?:\s+[^\s>\/=]+(?:=(?:"(?:\\[\s\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\"])*"|[^\s'">=]+))?)*\s*\/?>/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=doublecircle];
	n9 [label="9", shape=circle];
	n10 [label="10", shape=circle];
	n11 [label="11", shape=circle];
	n12 [label="12", shape=circle];
	n13 [label="13", shape=circle];
	n14 [label="14", shape=circle];
	n15 [label="15", shape=circle];
	n16 [label="16", shape=circle];
	n17 [label="17", shape=circle];
	n18 [label="18", shape=circle];
	n19 [label="19", shape=circle];
	n20 [label="20", shape=circle];
	n21 [label="21", shape=circle];

	// edges
	null -> n0;
	n0 -> n1 [label="'<'"];
	n1 -> n2 [label="'/'"];
	n1 -> n3 [label="U+0-U+8 U+E-U+1F U+21-U+23 U+26-U+2E ':' ';' U+3F-U+9F U+A1-U+167F U+1681-U+1FFF U+200B-U+2027 U+202A-U+202E U+2030-U+205E U+2060-U+2FFF U+3001-U+FEFE U+FF00-U+FFFF"];
	n2 -> n3 [label="U+0-U+8 U+E-U+1F U+21-U+23 U+26-U+2E ':' ';' U+3F-U+9F U+A1-U+167F U+1681-U+1FFF U+200B-U+2027 U+202A-U+202E U+2030-U+205E U+2060-U+2FFF U+3001-U+FEFE U+FF00-U+FFFF"];
	n3 -> n4 [label="U+0-U+8 U+E-U+1F U+21-U+23 U+26-U+2E U+30-U+3B U+3F-U+9F U+A1-U+167F U+1681-U+1FFF U+200B-U+2027 U+202A-U+202E U+2030-U+205E U+2060-U+2FFF U+3001-U+FEFE U+FF00-U+FFFF"];
	n3 -> n5 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n3 -> n6 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n3 -> n7 [label="'/'"];
	n3 -> n8 [label="'>'"];
	n4 -> n4 [label="U+0-U+8 U+E-U+1F U+21-U+23 U+26-U+2E U+30-U+3B U+3F-U+9F U+A1-U+167F U+1681-U+1FFF U+200B-U+2027 U+202A-U+202E U+2030-U+205E U+2060-U+2FFF U+3001-U+FEFE U+FF00-U+FFFF"];
	n4 -> n5 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n4 -> n6 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n4 -> n7 [label="'/'"];
	n4 -> n8 [label="'>'"];
	n5 -> n5 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n5 -> n9 [label="not U+9-U+D U+20 '/' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n6 -> n6 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n6 -> n7 [label="'/'"];
	n6 -> n8 [label="'>'"];
	n7 -> n8 [label="'>'"];
	n9 -> n9 [label="not U+9-U+D U+20 '/' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n9 -> n10 [label="'='"];
	n9 -> n5 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n9 -> n6 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n9 -> n7 [label="'/'"];
	n9 -> n8 [label="'>'"];
	n10 -> n11 [label="'\"'"];
	n10 -> n12 [label="not U+9-U+D U+20 '\"' ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n11 -> n13 [label="'\\'"];
	n11 -> n14 [label="'{'"];
	n11 -> n15 [label="not '\"' '\\'"];
	n11 -> n16 [label="'\"'"];
	n12 -> n12 [label="not U+9-U+D U+20 '\"' ''' '=' '>' U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n12 -> n5 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n12 -> n6 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n12 -> n7 [label="'/'"];
	n12 -> n8 [label="'>'"];
	n13 -> n15 [label=all];
	n14 -> n17 [label="'{'"];
	n14 -> n18 [label="not '{' '}'"];
	n15 -> n13 [label="'\\'"];
	n15 -> n14 [label="'{'"];
	n15 -> n15 [label="not '\"' '\\'"];
	n15 -> n16 [label="'\"'"];
	n16 -> n5 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n16 -> n6 [label="U+9-U+D U+20 U+A0 U+1680 U+2000-U+200A U+2028 U+2029 U+202F U+205F U+3000 U+FEFF"];
	n16 -> n7 [label="'/'"];
	n16 -> n8 [label="'>'"];
	n17 -> n19 [label="'{'"];
	n17 -> n20 [label="not '{' '}'"];
	n17 -> n18 [label="'}'"];
	n18 -> n17 [label="'{'"];
	n18 -> n18 [label="not '{' '}'"];
	n18 -> n15 [label="'}'"];
	n19 -> n21 [label="not '{' '}'"];
	n19 -> n20 [label="'}'"];
	n20 -> n19 [label="'{'"];
	n20 -> n20 [label="not '{' '}'"];
	n20 -> n18 [label="'}'"];
	n21 -> n21 [label="not '{' '}'"];
	n21 -> n20 [label="'}'"];
}
`;

module.exports[n`toDot >> from regexes >> DFA (JS): /<\/?[^\s\d>\/=$<%][^\s>\/=$<%]*(?:\s+[^\s>\/=]+(?:=(?:"(?:\\[\s\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\"])*"|[^\s'">=]+))?)*\s*\/?>/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=doublecircle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=circle];
	n9 [label="9", shape=circle];
	n10 [label="10", shape=circle];
	n11 [label="11", shape=circle];
	n12 [label="12", shape=circle];
	n13 [label="13", shape=circle];
	n14 [label="14", shape=circle];
	n15 [label="15", shape=circle];
	n16 [label="16", shape=circle];
	n17 [label="17", shape=circle];
	n18 [label="18", shape=circle];
	n19 [label="19", shape=circle];
	n20 [label="20", shape=doublecircle];
	n21 [label="21", shape=circle];
	n22 [label="22", shape=circle];
	n23 [label="23", shape=circle];
	n24 [label="24", shape=circle];
	n25 [label="25", shape=circle];
	n26 [label="26", shape=circle];
	n27 [label="27", shape=circle];
	n28 [label="28", shape=circle];
	n29 [label="29", shape=circle];
	n30 [label="30", shape=circle];
	n31 [label="31", shape=circle];
	n32 [label="32", shape=circle];
	n33 [label="33", shape=circle];
	n34 [label="34", shape=circle];
	n35 [label="35", shape=circle];
	n36 [label="36", shape=doublecircle];
	n37 [label="37", shape=circle];
	n38 [label="38", shape=circle];
	n39 [label="39", shape=circle];
	n40 [label="40", shape=circle];
	n41 [label="41", shape=circle];
	n42 [label="42", shape=circle];
	n43 [label="43", shape=circle];
	n44 [label="44", shape=circle];
	n45 [label="45", shape=doublecircle];
	n46 [label="46", shape=circle];
	n47 [label="47", shape=circle];
	n48 [label="48", shape=circle];
	n49 [label="49", shape=circle];
	n50 [label="50", shape=doublecircle];
	n51 [label="51", shape=circle];
	n52 [label="52", shape=circle];
	n53 [label="53", shape=circle];
	n54 [label="54", shape=circle];
	n55 [label="55", shape=circle];
	n56 [label="56", shape=circle];
	n57 [label="57", shape=circle];
	n58 [label="58", shape=circle];
	n59 [label="59", shape=circle];
	n60 [label="60", shape=circle];
	n61 [label="61", shape=circle];
	n62 [label="62", shape=circle];
	n63 [label="63", shape=doublecircle];
	n64 [label="64", shape=circle];
	n65 [label="65", shape=circle];
	n66 [label="66", shape=circle];
	n67 [label="67", shape=circle];
	n68 [label="68", shape=circle];
	n69 [label="69", shape=circle];
	n70 [label="70", shape=circle];
	n71 [label="71", shape=doublecircle];
	n72 [label="72", shape=circle];
	n73 [label="73", shape=circle];
	n74 [label="74", shape=circle];
	n75 [label="75", shape=circle];
	n76 [label="76", shape=circle];
	n77 [label="77", shape=circle];
	n78 [label="78", shape=doublecircle];
	n79 [label="79", shape=circle];
	n80 [label="80", shape=circle];
	n81 [label="81", shape=circle];
	n82 [label="82", shape=circle];
	n83 [label="83", shape=circle];
	n84 [label="84", shape=circle];
	n85 [label="85", shape=circle];
	n86 [label="86", shape=doublecircle];
	n87 [label="87", shape=circle];
	n88 [label="88", shape=circle];
	n89 [label="89", shape=circle];
	n90 [label="90", shape=circle];
	n91 [label="91", shape=doublecircle];
	n92 [label="92", shape=circle];
	n93 [label="93", shape=circle];
	n94 [label="94", shape=circle];
	n95 [label="95", shape=circle];
	n96 [label="96", shape=circle];
	n97 [label="97", shape=circle];
	n98 [label="98", shape=circle];
	n99 [label="99", shape=circle];
	n100 [label="100", shape=doublecircle];
	n101 [label="101", shape=circle];
	n102 [label="102", shape=circle];
	n103 [label="103", shape=circle];
	n104 [label="104", shape=circle];
	n105 [label="105", shape=circle];
	n106 [label="106", shape=circle];
	n107 [label="107", shape=circle];
	n108 [label="108", shape=circle];
	n109 [label="109", shape=circle];
	n110 [label="110", shape=circle];
	n111 [label="111", shape=circle];
	n112 [label="112", shape=circle];
	n113 [label="113", shape=doublecircle];
	n114 [label="114", shape=circle];
	n115 [label="115", shape=circle];
	n116 [label="116", shape=circle];
	n117 [label="117", shape=circle];
	n118 [label="118", shape=circle];
	n119 [label="119", shape=circle];
	n120 [label="120", shape=circle];
	n121 [label="121", shape=doublecircle];
	n122 [label="122", shape=circle];
	n123 [label="123", shape=circle];
	n124 [label="124", shape=circle];
	n125 [label="125", shape=circle];
	n126 [label="126", shape=circle];
	n127 [label="127", shape=circle];
	n128 [label="128", shape=circle];
	n129 [label="129", shape=circle];
	n130 [label="130", shape=circle];
	n131 [label="131", shape=circle];
	n132 [label="132", shape=circle];
	n133 [label="133", shape=circle];
	n134 [label="134", shape=doublecircle];
	n135 [label="135", shape=circle];
	n136 [label="136", shape=circle];
	n137 [label="137", shape=circle];
	n138 [label="138", shape=circle];
	n139 [label="139", shape=doublecircle];
	n140 [label="140", shape=circle];
	n141 [label="141", shape=circle];
	n142 [label="142", shape=circle];
	n143 [label="143", shape=circle];
	n144 [label="144", shape=circle];
	n145 [label="145", shape=circle];
	n146 [label="146", shape=circle];
	n147 [label="147", shape=circle];
	n148 [label="148", shape=circle];
	n149 [label="149", shape=doublecircle];
	n150 [label="150", shape=circle];
	n151 [label="151", shape=circle];
	n152 [label="152", shape=circle];
	n153 [label="153", shape=circle];
	n154 [label="154", shape=circle];

	// edges
	null -> n0;
	n0 -> n1 [label="<"];
	n1 -> n2 [label="[^\\s\\d$%/<=>]"];
	n1 -> n3 [label="\\/"];
	n2 -> n2 [label="[^\\s$%/<=>]"];
	n2 -> n4 [label="\\s"];
	n2 -> n5 [label="\\/"];
	n2 -> n6 [label=">"];
	n3 -> n2 [label="[^\\s\\d$%/<=>]"];
	n4 -> n7 [label="[^\\s/=>]"];
	n4 -> n4 [label="\\s"];
	n4 -> n5 [label="\\/"];
	n4 -> n6 [label=">"];
	n5 -> n6 [label=">"];
	n7 -> n7 [label="[^\\s/=>]"];
	n7 -> n4 [label="\\s"];
	n7 -> n5 [label="\\/"];
	n7 -> n8 [label="="];
	n7 -> n6 [label=">"];
	n8 -> n9 [label="[^\\s\"'=>]"];
	n8 -> n10 [label="\""];
	n9 -> n9 [label="[^\\s\"'=>]"];
	n9 -> n4 [label="\\s"];
	n9 -> n6 [label=">"];
	n10 -> n10 [label="[^\"\\\\{]"];
	n10 -> n11 [label="\""];
	n10 -> n12 [label="\\\\ "];
	n10 -> n13 [label="\\{"];
	n11 -> n4 [label="\\s"];
	n11 -> n5 [label="\\/"];
	n11 -> n6 [label=">"];
	n12 -> n10 [label="[^]"];
	n13 -> n13 [label="[^\"\\\\{}]"];
	n13 -> n14 [label="\""];
	n13 -> n15 [label="\\\\ "];
	n13 -> n16 [label="\\{"];
	n13 -> n10 [label="\\}"];
	n14 -> n17 [label="[^\\s/>{}]"];
	n14 -> n18 [label="\\s"];
	n14 -> n19 [label="\\/"];
	n14 -> n20 [label=">"];
	n14 -> n21 [label="\\{"];
	n14 -> n10 [label="\\}"];
	n15 -> n13 [label="[^{}]"];
	n15 -> n22 [label="\\{"];
	n15 -> n10 [label="\\}"];
	n16 -> n16 [label="[^\"\\\\{}]"];
	n16 -> n23 [label="\""];
	n16 -> n24 [label="\\\\ "];
	n16 -> n25 [label="\\{"];
	n16 -> n13 [label="\\}"];
	n17 -> n17 [label="[^{}]"];
	n17 -> n21 [label="\\{"];
	n17 -> n10 [label="\\}"];
	n18 -> n26 [label="[^\\s/=>{}]"];
	n18 -> n18 [label="\\s"];
	n18 -> n19 [label="\\/"];
	n18 -> n17 [label="="];
	n18 -> n20 [label=">"];
	n18 -> n27 [label="\\{"];
	n18 -> n28 [label="\\}"];
	n19 -> n17 [label="[^>{}]"];
	n19 -> n20 [label=">"];
	n19 -> n21 [label="\\{"];
	n19 -> n10 [label="\\}"];
	n20 -> n17 [label="[^{}]"];
	n20 -> n21 [label="\\{"];
	n20 -> n10 [label="\\}"];
	n21 -> n21 [label="[^{}]"];
	n21 -> n29 [label="\\{"];
	n21 -> n17 [label="\\}"];
	n22 -> n22 [label="[^\"\\\\{}]"];
	n22 -> n30 [label="\""];
	n22 -> n31 [label="\\\\ "];
	n22 -> n32 [label="\\{"];
	n22 -> n13 [label="\\}"];
	n23 -> n33 [label="[^\\s/>{}]"];
	n23 -> n34 [label="\\s"];
	n23 -> n35 [label="\\/"];
	n23 -> n36 [label=">"];
	n23 -> n37 [label="\\{"];
	n23 -> n13 [label="\\}"];
	n24 -> n16 [label="[^{}]"];
	n24 -> n38 [label="\\{"];
	n24 -> n13 [label="\\}"];
	n25 -> n25 [label="[^\"\\\\}]"];
	n25 -> n39 [label="\""];
	n25 -> n40 [label="\\\\ "];
	n25 -> n16 [label="\\}"];
	n26 -> n26 [label="[^\\s/=>{}]"];
	n26 -> n18 [label="\\s"];
	n26 -> n19 [label="\\/"];
	n26 -> n41 [label="="];
	n26 -> n20 [label=">"];
	n26 -> n27 [label="\\{"];
	n26 -> n28 [label="\\}"];
	n27 -> n27 [label="[^\\s/=>{}]"];
	n27 -> n42 [label="\\s"];
	n27 -> n43 [label="\\/"];
	n27 -> n44 [label="="];
	n27 -> n45 [label=">"];
	n27 -> n46 [label="\\{"];
	n27 -> n26 [label="\\}"];
	n28 -> n28 [label="[^\\s\"/=>\\\\{]"];
	n28 -> n47 [label="\\s"];
	n28 -> n7 [label="\""];
	n28 -> n48 [label="\\/"];
	n28 -> n49 [label="="];
	n28 -> n50 [label=">"];
	n28 -> n51 [label="\\\\ "];
	n28 -> n52 [label="\\{"];
	n29 -> n29 [label="[^{}]"];
	n29 -> n21 [label="\\}"];
	n30 -> n21 [label="[^\\s/>{}]"];
	n30 -> n42 [label="\\s"];
	n30 -> n43 [label="\\/"];
	n30 -> n45 [label=">"];
	n30 -> n29 [label="\\{"];
	n30 -> n17 [label="\\}"];
	n31 -> n22 [label="[^{}]"];
	n31 -> n53 [label="\\{"];
	n31 -> n13 [label="\\}"];
	n32 -> n32 [label="[^\"\\\\{}]"];
	n32 -> n54 [label="\""];
	n32 -> n55 [label="\\\\ "];
	n32 -> n16 [label="\\{"];
	n32 -> n22 [label="\\}"];
	n33 -> n33 [label="[^{}]"];
	n33 -> n37 [label="\\{"];
	n33 -> n13 [label="\\}"];
	n34 -> n56 [label="[^\\s/=>{}]"];
	n34 -> n34 [label="\\s"];
	n34 -> n35 [label="\\/"];
	n34 -> n33 [label="="];
	n34 -> n36 [label=">"];
	n34 -> n57 [label="\\{"];
	n34 -> n52 [label="\\}"];
	n35 -> n33 [label="[^>{}]"];
	n35 -> n36 [label=">"];
	n35 -> n37 [label="\\{"];
	n35 -> n13 [label="\\}"];
	n36 -> n33 [label="[^{}]"];
	n36 -> n37 [label="\\{"];
	n36 -> n13 [label="\\}"];
	n37 -> n37 [label="[^{}]"];
	n37 -> n29 [label="\\{"];
	n37 -> n33 [label="\\}"];
	n38 -> n38 [label="[^\"\\\\{}]"];
	n38 -> n58 [label="\""];
	n38 -> n59 [label="\\\\ "];
	n38 -> n32 [label="\\{"];
	n38 -> n16 [label="\\}"];
	n39 -> n60 [label="[^\\s/>{}]"];
	n39 -> n61 [label="\\s"];
	n39 -> n62 [label="\\/"];
	n39 -> n63 [label=">"];
	n39 -> n37 [label="\\{"];
	n39 -> n16 [label="\\}"];
	n40 -> n25 [label="[^{}]"];
	n40 -> n38 [label="\\{"];
	n40 -> n16 [label="\\}"];
	n41 -> n64 [label="[^\\s\"'=>{}]"];
	n41 -> n17 [label="[\\s'=>]"];
	n41 -> n13 [label="\""];
	n41 -> n65 [label="\\{"];
	n41 -> n66 [label="\\}"];
	n42 -> n27 [label="[^\\s/=>{}]"];
	n42 -> n42 [label="\\s"];
	n42 -> n43 [label="\\/"];
	n42 -> n21 [label="="];
	n42 -> n45 [label=">"];
	n42 -> n46 [label="\\{"];
	n42 -> n26 [label="\\}"];
	n43 -> n21 [label="[^>{}]"];
	n43 -> n45 [label=">"];
	n43 -> n29 [label="\\{"];
	n43 -> n17 [label="\\}"];
	n44 -> n65 [label="[^\\s\"'=>{}]"];
	n44 -> n21 [label="[\\s'=>]"];
	n44 -> n22 [label="\""];
	n44 -> n67 [label="\\{"];
	n44 -> n64 [label="\\}"];
	n45 -> n21 [label="[^{}]"];
	n45 -> n29 [label="\\{"];
	n45 -> n17 [label="\\}"];
	n46 -> n46 [label="[^\\s/=>{}]"];
	n46 -> n68 [label="\\s"];
	n46 -> n69 [label="\\/"];
	n46 -> n70 [label="="];
	n46 -> n71 [label=">"];
	n46 -> n7 [label="\\{"];
	n46 -> n27 [label="\\}"];
	n47 -> n28 [label="[^\\s\"/=>\\\\{]"];
	n47 -> n47 [label="\\s"];
	n47 -> n7 [label="\""];
	n47 -> n48 [label="\\/"];
	n47 -> n10 [label="="];
	n47 -> n50 [label=">"];
	n47 -> n51 [label="\\\\ "];
	n47 -> n52 [label="\\{"];
	n48 -> n10 [label="[^\">\\\\{]"];
	n48 -> n11 [label="\""];
	n48 -> n50 [label=">"];
	n48 -> n12 [label="\\\\ "];
	n48 -> n13 [label="\\{"];
	n49 -> n66 [label="[^\\s\"'=>\\\\{]"];
	n49 -> n10 [label="[\\s'=>]"];
	n49 -> n72 [label="\""];
	n49 -> n73 [label="\\\\ "];
	n49 -> n74 [label="\\{"];
	n50 -> n10 [label="[^\"\\\\{]"];
	n50 -> n11 [label="\""];
	n50 -> n12 [label="\\\\ "];
	n50 -> n13 [label="\\{"];
	n51 -> n28 [label="[^\\s/=>]"];
	n51 -> n47 [label="\\s"];
	n51 -> n48 [label="\\/"];
	n51 -> n49 [label="="];
	n51 -> n50 [label=">"];
	n52 -> n52 [label="[^\\s\"/=>\\\\{}]"];
	n52 -> n75 [label="\\s"];
	n52 -> n26 [label="\""];
	n52 -> n76 [label="\\/"];
	n52 -> n77 [label="="];
	n52 -> n78 [label=">"];
	n52 -> n79 [label="\\\\ "];
	n52 -> n80 [label="\\{"];
	n52 -> n28 [label="\\}"];
	n53 -> n53 [label="[^\"\\\\{}]"];
	n53 -> n81 [label="\""];
	n53 -> n82 [label="\\\\ "];
	n53 -> n13 [label="\\{"];
	n53 -> n22 [label="\\}"];
	n54 -> n83 [label="[^\\s/>{}]"];
	n54 -> n84 [label="\\s"];
	n54 -> n85 [label="\\/"];
	n54 -> n86 [label=">"];
	n54 -> n21 [label="\\{"];
	n54 -> n22 [label="\\}"];
	n55 -> n32 [label="[^{}]"];
	n55 -> n22 [label="[{}]"];
	n56 -> n56 [label="[^\\s/=>{}]"];
	n56 -> n34 [label="\\s"];
	n56 -> n35 [label="\\/"];
	n56 -> n87 [label="="];
	n56 -> n36 [label=">"];
	n56 -> n57 [label="\\{"];
	n56 -> n52 [label="\\}"];
	n57 -> n57 [label="[^\\s/=>{}]"];
	n57 -> n88 [label="\\s"];
	n57 -> n89 [label="\\/"];
	n57 -> n90 [label="="];
	n57 -> n91 [label=">"];
	n57 -> n46 [label="\\{"];
	n57 -> n56 [label="\\}"];
	n58 -> n37 [label="[^\\s/>{}]"];
	n58 -> n88 [label="\\s"];
	n58 -> n89 [label="\\/"];
	n58 -> n91 [label=">"];
	n58 -> n29 [label="\\{"];
	n58 -> n33 [label="\\}"];
	n59 -> n38 [label="[^{}]"];
	n59 -> n53 [label="\\{"];
	n59 -> n16 [label="\\}"];
	n60 -> n60 [label="[^{}]"];
	n60 -> n37 [label="\\{"];
	n60 -> n16 [label="\\}"];
	n61 -> n92 [label="[^\\s/=>{}]"];
	n61 -> n61 [label="\\s"];
	n61 -> n62 [label="\\/"];
	n61 -> n60 [label="="];
	n61 -> n63 [label=">"];
	n61 -> n57 [label="\\{"];
	n61 -> n80 [label="\\}"];
	n62 -> n60 [label="[^>{}]"];
	n62 -> n63 [label=">"];
	n62 -> n37 [label="\\{"];
	n62 -> n16 [label="\\}"];
	n63 -> n60 [label="[^{}]"];
	n63 -> n37 [label="\\{"];
	n63 -> n16 [label="\\}"];
	n64 -> n64 [label="[^\\s\"'=>{}]"];
	n64 -> n18 [label="\\s"];
	n64 -> n17 [label="[\"'=]"];
	n64 -> n20 [label=">"];
	n64 -> n65 [label="\\{"];
	n64 -> n66 [label="\\}"];
	n65 -> n65 [label="[^\\s\"'=>{}]"];
	n65 -> n42 [label="\\s"];
	n65 -> n21 [label="[\"'=]"];
	n65 -> n45 [label=">"];
	n65 -> n67 [label="\\{"];
	n65 -> n64 [label="\\}"];
	n66 -> n66 [label="[^\\s\"'=>\\\\{]"];
	n66 -> n47 [label="\\s"];
	n66 -> n11 [label="\""];
	n66 -> n10 [label="['=]"];
	n66 -> n50 [label=">"];
	n66 -> n73 [label="\\\\ "];
	n66 -> n74 [label="\\{"];
	n67 -> n67 [label="[^\\s\"'=>{}]"];
	n67 -> n68 [label="\\s"];
	n67 -> n29 [label="[\"'=]"];
	n67 -> n71 [label=">"];
	n67 -> n9 [label="\\{"];
	n67 -> n65 [label="\\}"];
	n68 -> n46 [label="[^\\s/=>{}]"];
	n68 -> n68 [label="\\s"];
	n68 -> n69 [label="\\/"];
	n68 -> n29 [label="="];
	n68 -> n71 [label=">"];
	n68 -> n7 [label="\\{"];
	n68 -> n27 [label="\\}"];
	n69 -> n29 [label="[^>{}]"];
	n69 -> n71 [label=">"];
	n69 -> n21 [label="\\}"];
	n70 -> n67 [label="[^\\s\"'=>{}]"];
	n70 -> n29 [label="[\\s'=>]"];
	n70 -> n53 [label="\""];
	n70 -> n9 [label="\\{"];
	n70 -> n65 [label="\\}"];
	n71 -> n29 [label="[^{}]"];
	n71 -> n21 [label="\\}"];
	n72 -> n10 [label="[^\\s\"/>\\\\{]"];
	n72 -> n47 [label="\\s"];
	n72 -> n11 [label="\""];
	n72 -> n48 [label="\\/"];
	n72 -> n50 [label=">"];
	n72 -> n12 [label="\\\\ "];
	n72 -> n13 [label="\\{"];
	n73 -> n66 [label="[^\\s\"'=>]"];
	n73 -> n47 [label="\\s"];
	n73 -> n10 [label="[\"'=]"];
	n73 -> n50 [label=">"];
	n74 -> n74 [label="[^\\s\"'=>\\\\{}]"];
	n74 -> n75 [label="\\s"];
	n74 -> n14 [label="\""];
	n74 -> n13 [label="['=]"];
	n74 -> n78 [label=">"];
	n74 -> n93 [label="\\\\ "];
	n74 -> n94 [label="\\{"];
	n74 -> n66 [label="\\}"];
	n75 -> n52 [label="[^\\s\"/=>\\\\{}]"];
	n75 -> n75 [label="\\s"];
	n75 -> n26 [label="\""];
	n75 -> n76 [label="\\/"];
	n75 -> n13 [label="="];
	n75 -> n78 [label=">"];
	n75 -> n79 [label="\\\\ "];
	n75 -> n80 [label="\\{"];
	n75 -> n28 [label="\\}"];
	n76 -> n13 [label="[^\">\\\\{}]"];
	n76 -> n14 [label="\""];
	n76 -> n78 [label=">"];
	n76 -> n15 [label="\\\\ "];
	n76 -> n16 [label="\\{"];
	n76 -> n10 [label="\\}"];
	n77 -> n74 [label="[^\\s\"'=>\\\\{}]"];
	n77 -> n13 [label="[\\s'=>]"];
	n77 -> n95 [label="\""];
	n77 -> n93 [label="\\\\ "];
	n77 -> n94 [label="\\{"];
	n77 -> n66 [label="\\}"];
	n78 -> n13 [label="[^\"\\\\{}]"];
	n78 -> n14 [label="\""];
	n78 -> n15 [label="\\\\ "];
	n78 -> n16 [label="\\{"];
	n78 -> n10 [label="\\}"];
	n79 -> n52 [label="[^\\s/=>{}]"];
	n79 -> n75 [label="\\s"];
	n79 -> n76 [label="\\/"];
	n79 -> n77 [label="="];
	n79 -> n78 [label=">"];
	n79 -> n96 [label="\\{"];
	n79 -> n28 [label="\\}"];
	n80 -> n80 [label="[^\\s\"/=>\\\\{}]"];
	n80 -> n97 [label="\\s"];
	n80 -> n56 [label="\""];
	n80 -> n98 [label="\\/"];
	n80 -> n99 [label="="];
	n80 -> n100 [label=">"];
	n80 -> n101 [label="\\\\ "];
	n80 -> n102 [label="\\{"];
	n80 -> n52 [label="\\}"];
	n81 -> n29 [label="[^\\s/>{}]"];
	n81 -> n68 [label="\\s"];
	n81 -> n69 [label="\\/"];
	n81 -> n71 [label=">"];
	n81 -> n21 [label="\\}"];
	n82 -> n53 [label="[^{}]"];
	n82 -> n10 [label="\\{"];
	n82 -> n22 [label="\\}"];
	n83 -> n83 [label="[^{}]"];
	n83 -> n21 [label="\\{"];
	n83 -> n22 [label="\\}"];
	n84 -> n103 [label="[^\\s/=>{}]"];
	n84 -> n84 [label="\\s"];
	n84 -> n85 [label="\\/"];
	n84 -> n83 [label="="];
	n84 -> n86 [label=">"];
	n84 -> n27 [label="\\{"];
	n84 -> n96 [label="\\}"];
	n85 -> n83 [label="[^>{}]"];
	n85 -> n86 [label=">"];
	n85 -> n21 [label="\\{"];
	n85 -> n22 [label="\\}"];
	n86 -> n83 [label="[^{}]"];
	n86 -> n21 [label="\\{"];
	n86 -> n22 [label="\\}"];
	n87 -> n104 [label="[^\\s\"'=>{}]"];
	n87 -> n33 [label="[\\s'=>]"];
	n87 -> n16 [label="\""];
	n87 -> n105 [label="\\{"];
	n87 -> n74 [label="\\}"];
	n88 -> n57 [label="[^\\s/=>{}]"];
	n88 -> n88 [label="\\s"];
	n88 -> n89 [label="\\/"];
	n88 -> n37 [label="="];
	n88 -> n91 [label=">"];
	n88 -> n46 [label="\\{"];
	n88 -> n56 [label="\\}"];
	n89 -> n37 [label="[^>{}]"];
	n89 -> n91 [label=">"];
	n89 -> n29 [label="\\{"];
	n89 -> n33 [label="\\}"];
	n90 -> n105 [label="[^\\s\"'=>{}]"];
	n90 -> n37 [label="[\\s'=>]"];
	n90 -> n38 [label="\""];
	n90 -> n67 [label="\\{"];
	n90 -> n104 [label="\\}"];
	n91 -> n37 [label="[^{}]"];
	n91 -> n29 [label="\\{"];
	n91 -> n33 [label="\\}"];
	n92 -> n92 [label="[^\\s/=>{}]"];
	n92 -> n61 [label="\\s"];
	n92 -> n62 [label="\\/"];
	n92 -> n106 [label="="];
	n92 -> n63 [label=">"];
	n92 -> n57 [label="\\{"];
	n92 -> n80 [label="\\}"];
	n93 -> n74 [label="[^\\s\"'=>{}]"];
	n93 -> n75 [label="\\s"];
	n93 -> n13 [label="[\"'=]"];
	n93 -> n78 [label=">"];
	n93 -> n107 [label="\\{"];
	n93 -> n66 [label="\\}"];
	n94 -> n94 [label="[^\\s\"'=>\\\\{}]"];
	n94 -> n97 [label="\\s"];
	n94 -> n23 [label="\""];
	n94 -> n16 [label="['=]"];
	n94 -> n100 [label=">"];
	n94 -> n108 [label="\\\\ "];
	n94 -> n109 [label="\\{"];
	n94 -> n74 [label="\\}"];
	n95 -> n13 [label="[^\\s\"/>\\\\{}]"];
	n95 -> n75 [label="\\s"];
	n95 -> n14 [label="\""];
	n95 -> n76 [label="\\/"];
	n95 -> n78 [label=">"];
	n95 -> n15 [label="\\\\ "];
	n95 -> n16 [label="\\{"];
	n95 -> n10 [label="\\}"];
	n96 -> n96 [label="[^\\s\"/=>\\\\{}]"];
	n96 -> n110 [label="\\s"];
	n96 -> n27 [label="\""];
	n96 -> n111 [label="\\/"];
	n96 -> n112 [label="="];
	n96 -> n113 [label=">"];
	n96 -> n114 [label="\\\\ "];
	n96 -> n115 [label="\\{"];
	n96 -> n52 [label="\\}"];
	n97 -> n80 [label="[^\\s\"/=>\\\\{}]"];
	n97 -> n97 [label="\\s"];
	n97 -> n56 [label="\""];
	n97 -> n98 [label="\\/"];
	n97 -> n16 [label="="];
	n97 -> n100 [label=">"];
	n97 -> n101 [label="\\\\ "];
	n97 -> n102 [label="\\{"];
	n97 -> n52 [label="\\}"];
	n98 -> n16 [label="[^\">\\\\{}]"];
	n98 -> n23 [label="\""];
	n98 -> n100 [label=">"];
	n98 -> n24 [label="\\\\ "];
	n98 -> n25 [label="\\{"];
	n98 -> n13 [label="\\}"];
	n99 -> n94 [label="[^\\s\"'=>\\\\{}]"];
	n99 -> n16 [label="[\\s'=>]"];
	n99 -> n116 [label="\""];
	n99 -> n108 [label="\\\\ "];
	n99 -> n109 [label="\\{"];
	n99 -> n74 [label="\\}"];
	n100 -> n16 [label="[^\"\\\\{}]"];
	n100 -> n23 [label="\""];
	n100 -> n24 [label="\\\\ "];
	n100 -> n25 [label="\\{"];
	n100 -> n13 [label="\\}"];
	n101 -> n80 [label="[^\\s/=>{}]"];
	n101 -> n97 [label="\\s"];
	n101 -> n98 [label="\\/"];
	n101 -> n99 [label="="];
	n101 -> n100 [label=">"];
	n101 -> n117 [label="\\{"];
	n101 -> n52 [label="\\}"];
	n102 -> n102 [label="[^\\s\"/=>\\\\}]"];
	n102 -> n118 [label="\\s"];
	n102 -> n92 [label="\""];
	n102 -> n119 [label="\\/"];
	n102 -> n120 [label="="];
	n102 -> n121 [label=">"];
	n102 -> n122 [label="\\\\ "];
	n102 -> n80 [label="\\}"];
	n103 -> n103 [label="[^\\s/=>{}]"];
	n103 -> n84 [label="\\s"];
	n103 -> n85 [label="\\/"];
	n103 -> n123 [label="="];
	n103 -> n86 [label=">"];
	n103 -> n27 [label="\\{"];
	n103 -> n96 [label="\\}"];
	n104 -> n104 [label="[^\\s\"'=>{}]"];
	n104 -> n34 [label="\\s"];
	n104 -> n33 [label="[\"'=]"];
	n104 -> n36 [label=">"];
	n104 -> n105 [label="\\{"];
	n104 -> n74 [label="\\}"];
	n105 -> n105 [label="[^\\s\"'=>{}]"];
	n105 -> n88 [label="\\s"];
	n105 -> n37 [label="[\"'=]"];
	n105 -> n91 [label=">"];
	n105 -> n67 [label="\\{"];
	n105 -> n104 [label="\\}"];
	n106 -> n124 [label="[^\\s\"'=>{}]"];
	n106 -> n60 [label="[\\s'=>]"];
	n106 -> n25 [label="\""];
	n106 -> n105 [label="\\{"];
	n106 -> n94 [label="\\}"];
	n107 -> n107 [label="[^\\s\"'=>\\\\{}]"];
	n107 -> n110 [label="\\s"];
	n107 -> n30 [label="\""];
	n107 -> n22 [label="['=]"];
	n107 -> n113 [label=">"];
	n107 -> n125 [label="\\\\ "];
	n107 -> n126 [label="\\{"];
	n107 -> n74 [label="\\}"];
	n108 -> n94 [label="[^\\s\"'=>{}]"];
	n108 -> n97 [label="\\s"];
	n108 -> n16 [label="[\"'=]"];
	n108 -> n100 [label=">"];
	n108 -> n127 [label="\\{"];
	n108 -> n74 [label="\\}"];
	n109 -> n109 [label="[^\\s\"'=>\\\\}]"];
	n109 -> n118 [label="\\s"];
	n109 -> n39 [label="\""];
	n109 -> n25 [label="['=]"];
	n109 -> n121 [label=">"];
	n109 -> n128 [label="\\\\ "];
	n109 -> n94 [label="\\}"];
	n110 -> n96 [label="[^\\s\"/=>\\\\{}]"];
	n110 -> n110 [label="\\s"];
	n110 -> n27 [label="\""];
	n110 -> n111 [label="\\/"];
	n110 -> n22 [label="="];
	n110 -> n113 [label=">"];
	n110 -> n114 [label="\\\\ "];
	n110 -> n115 [label="\\{"];
	n110 -> n52 [label="\\}"];
	n111 -> n22 [label="[^\">\\\\{}]"];
	n111 -> n30 [label="\""];
	n111 -> n113 [label=">"];
	n111 -> n31 [label="\\\\ "];
	n111 -> n32 [label="\\{"];
	n111 -> n13 [label="\\}"];
	n112 -> n107 [label="[^\\s\"'=>\\\\{}]"];
	n112 -> n22 [label="[\\s'=>]"];
	n112 -> n129 [label="\""];
	n112 -> n125 [label="\\\\ "];
	n112 -> n126 [label="\\{"];
	n112 -> n74 [label="\\}"];
	n113 -> n22 [label="[^\"\\\\{}]"];
	n113 -> n30 [label="\""];
	n113 -> n31 [label="\\\\ "];
	n113 -> n32 [label="\\{"];
	n113 -> n13 [label="\\}"];
	n114 -> n96 [label="[^\\s/=>{}]"];
	n114 -> n110 [label="\\s"];
	n114 -> n111 [label="\\/"];
	n114 -> n112 [label="="];
	n114 -> n113 [label=">"];
	n114 -> n130 [label="\\{"];
	n114 -> n52 [label="\\}"];
	n115 -> n115 [label="[^\\s\"/=>\\\\{}]"];
	n115 -> n131 [label="\\s"];
	n115 -> n103 [label="\""];
	n115 -> n132 [label="\\/"];
	n115 -> n133 [label="="];
	n115 -> n134 [label=">"];
	n115 -> n135 [label="\\\\ "];
	n115 -> n80 [label="\\{"];
	n115 -> n96 [label="\\}"];
	n116 -> n16 [label="[^\\s\"/>\\\\{}]"];
	n116 -> n97 [label="\\s"];
	n116 -> n23 [label="\""];
	n116 -> n98 [label="\\/"];
	n116 -> n100 [label=">"];
	n116 -> n24 [label="\\\\ "];
	n116 -> n25 [label="\\{"];
	n116 -> n13 [label="\\}"];
	n117 -> n117 [label="[^\\s\"/=>\\\\{}]"];
	n117 -> n136 [label="\\s"];
	n117 -> n57 [label="\""];
	n117 -> n137 [label="\\/"];
	n117 -> n138 [label="="];
	n117 -> n139 [label=">"];
	n117 -> n140 [label="\\\\ "];
	n117 -> n115 [label="\\{"];
	n117 -> n80 [label="\\}"];
	n118 -> n102 [label="[^\\s\"/=>\\\\}]"];
	n118 -> n118 [label="\\s"];
	n118 -> n92 [label="\""];
	n118 -> n119 [label="\\/"];
	n118 -> n25 [label="="];
	n118 -> n121 [label=">"];
	n118 -> n122 [label="\\\\ "];
	n118 -> n80 [label="\\}"];
	n119 -> n25 [label="[^\">\\\\}]"];
	n119 -> n39 [label="\""];
	n119 -> n121 [label=">"];
	n119 -> n40 [label="\\\\ "];
	n119 -> n16 [label="\\}"];
	n120 -> n109 [label="[^\\s\"'=>\\\\}]"];
	n120 -> n25 [label="[\\s'=>]"];
	n120 -> n141 [label="\""];
	n120 -> n128 [label="\\\\ "];
	n120 -> n94 [label="\\}"];
	n121 -> n25 [label="[^\"\\\\}]"];
	n121 -> n39 [label="\""];
	n121 -> n40 [label="\\\\ "];
	n121 -> n16 [label="\\}"];
	n122 -> n102 [label="[^\\s/=>{}]"];
	n122 -> n118 [label="\\s"];
	n122 -> n119 [label="\\/"];
	n122 -> n120 [label="="];
	n122 -> n121 [label=">"];
	n122 -> n117 [label="\\{"];
	n122 -> n80 [label="\\}"];
	n123 -> n142 [label="[^\\s\"'=>{}]"];
	n123 -> n83 [label="[\\s'=>]"];
	n123 -> n32 [label="\""];
	n123 -> n65 [label="\\{"];
	n123 -> n107 [label="\\}"];
	n124 -> n124 [label="[^\\s\"'=>{}]"];
	n124 -> n61 [label="\\s"];
	n124 -> n60 [label="[\"'=]"];
	n124 -> n63 [label=">"];
	n124 -> n105 [label="\\{"];
	n124 -> n94 [label="\\}"];
	n125 -> n107 [label="[^\\s\"'=>{}]"];
	n125 -> n110 [label="\\s"];
	n125 -> n22 [label="[\"'=]"];
	n125 -> n113 [label=">"];
	n125 -> n143 [label="\\{"];
	n125 -> n74 [label="\\}"];
	n126 -> n126 [label="[^\\s\"'=>\\\\{}]"];
	n126 -> n131 [label="\\s"];
	n126 -> n54 [label="\""];
	n126 -> n32 [label="['=]"];
	n126 -> n134 [label=">"];
	n126 -> n144 [label="\\\\ "];
	n126 -> n94 [label="\\{"];
	n126 -> n107 [label="\\}"];
	n127 -> n127 [label="[^\\s\"'=>\\\\{}]"];
	n127 -> n136 [label="\\s"];
	n127 -> n58 [label="\""];
	n127 -> n38 [label="['=]"];
	n127 -> n139 [label=">"];
	n127 -> n145 [label="\\\\ "];
	n127 -> n126 [label="\\{"];
	n127 -> n94 [label="\\}"];
	n128 -> n109 [label="[^\\s\"'=>{}]"];
	n128 -> n118 [label="\\s"];
	n128 -> n25 [label="[\"'=]"];
	n128 -> n121 [label=">"];
	n128 -> n127 [label="\\{"];
	n128 -> n94 [label="\\}"];
	n129 -> n22 [label="[^\\s\"/>\\\\{}]"];
	n129 -> n110 [label="\\s"];
	n129 -> n30 [label="\""];
	n129 -> n111 [label="\\/"];
	n129 -> n113 [label=">"];
	n129 -> n31 [label="\\\\ "];
	n129 -> n32 [label="\\{"];
	n129 -> n13 [label="\\}"];
	n130 -> n130 [label="[^\\s\"/=>\\\\{}]"];
	n130 -> n146 [label="\\s"];
	n130 -> n46 [label="\""];
	n130 -> n147 [label="\\/"];
	n130 -> n148 [label="="];
	n130 -> n149 [label=">"];
	n130 -> n150 [label="\\\\ "];
	n130 -> n52 [label="\\{"];
	n130 -> n96 [label="\\}"];
	n131 -> n115 [label="[^\\s\"/=>\\\\{}]"];
	n131 -> n131 [label="\\s"];
	n131 -> n103 [label="\""];
	n131 -> n132 [label="\\/"];
	n131 -> n32 [label="="];
	n131 -> n134 [label=">"];
	n131 -> n135 [label="\\\\ "];
	n131 -> n80 [label="\\{"];
	n131 -> n96 [label="\\}"];
	n132 -> n32 [label="[^\">\\\\{}]"];
	n132 -> n54 [label="\""];
	n132 -> n134 [label=">"];
	n132 -> n55 [label="\\\\ "];
	n132 -> n16 [label="\\{"];
	n132 -> n22 [label="\\}"];
	n133 -> n126 [label="[^\\s\"'=>\\\\{}]"];
	n133 -> n32 [label="[\\s'=>]"];
	n133 -> n151 [label="\""];
	n133 -> n144 [label="\\\\ "];
	n133 -> n94 [label="\\{"];
	n133 -> n107 [label="\\}"];
	n134 -> n32 [label="[^\"\\\\{}]"];
	n134 -> n54 [label="\""];
	n134 -> n55 [label="\\\\ "];
	n134 -> n16 [label="\\{"];
	n134 -> n22 [label="\\}"];
	n135 -> n115 [label="[^\\s/=>{}]"];
	n135 -> n131 [label="\\s"];
	n135 -> n132 [label="\\/"];
	n135 -> n133 [label="="];
	n135 -> n134 [label=">"];
	n135 -> n96 [label="[{}]"];
	n136 -> n117 [label="[^\\s\"/=>\\\\{}]"];
	n136 -> n136 [label="\\s"];
	n136 -> n57 [label="\""];
	n136 -> n137 [label="\\/"];
	n136 -> n38 [label="="];
	n136 -> n139 [label=">"];
	n136 -> n140 [label="\\\\ "];
	n136 -> n115 [label="\\{"];
	n136 -> n80 [label="\\}"];
	n137 -> n38 [label="[^\">\\\\{}]"];
	n137 -> n58 [label="\""];
	n137 -> n139 [label=">"];
	n137 -> n59 [label="\\\\ "];
	n137 -> n32 [label="\\{"];
	n137 -> n16 [label="\\}"];
	n138 -> n127 [label="[^\\s\"'=>\\\\{}]"];
	n138 -> n38 [label="[\\s'=>]"];
	n138 -> n152 [label="\""];
	n138 -> n145 [label="\\\\ "];
	n138 -> n126 [label="\\{"];
	n138 -> n94 [label="\\}"];
	n139 -> n38 [label="[^\"\\\\{}]"];
	n139 -> n58 [label="\""];
	n139 -> n59 [label="\\\\ "];
	n139 -> n32 [label="\\{"];
	n139 -> n16 [label="\\}"];
	n140 -> n117 [label="[^\\s/=>{}]"];
	n140 -> n136 [label="\\s"];
	n140 -> n137 [label="\\/"];
	n140 -> n138 [label="="];
	n140 -> n139 [label=">"];
	n140 -> n130 [label="\\{"];
	n140 -> n80 [label="\\}"];
	n141 -> n25 [label="[^\\s\"/>\\\\}]"];
	n141 -> n118 [label="\\s"];
	n141 -> n39 [label="\""];
	n141 -> n119 [label="\\/"];
	n141 -> n121 [label=">"];
	n141 -> n40 [label="\\\\ "];
	n141 -> n16 [label="\\}"];
	n142 -> n142 [label="[^\\s\"'=>{}]"];
	n142 -> n84 [label="\\s"];
	n142 -> n83 [label="[\"'=]"];
	n142 -> n86 [label=">"];
	n142 -> n65 [label="\\{"];
	n142 -> n107 [label="\\}"];
	n143 -> n143 [label="[^\\s\"'=>\\\\{}]"];
	n143 -> n146 [label="\\s"];
	n143 -> n81 [label="\""];
	n143 -> n53 [label="['=]"];
	n143 -> n149 [label=">"];
	n143 -> n153 [label="\\\\ "];
	n143 -> n74 [label="\\{"];
	n143 -> n107 [label="\\}"];
	n144 -> n126 [label="[^\\s\"'=>{}]"];
	n144 -> n131 [label="\\s"];
	n144 -> n32 [label="[\"'=]"];
	n144 -> n134 [label=">"];
	n144 -> n107 [label="[{}]"];
	n145 -> n127 [label="[^\\s\"'=>{}]"];
	n145 -> n136 [label="\\s"];
	n145 -> n38 [label="[\"'=]"];
	n145 -> n139 [label=">"];
	n145 -> n143 [label="\\{"];
	n145 -> n94 [label="\\}"];
	n146 -> n130 [label="[^\\s\"/=>\\\\{}]"];
	n146 -> n146 [label="\\s"];
	n146 -> n46 [label="\""];
	n146 -> n147 [label="\\/"];
	n146 -> n53 [label="="];
	n146 -> n149 [label=">"];
	n146 -> n150 [label="\\\\ "];
	n146 -> n52 [label="\\{"];
	n146 -> n96 [label="\\}"];
	n147 -> n53 [label="[^\">\\\\{}]"];
	n147 -> n81 [label="\""];
	n147 -> n149 [label=">"];
	n147 -> n82 [label="\\\\ "];
	n147 -> n13 [label="\\{"];
	n147 -> n22 [label="\\}"];
	n148 -> n143 [label="[^\\s\"'=>\\\\{}]"];
	n148 -> n53 [label="[\\s'=>]"];
	n148 -> n154 [label="\""];
	n148 -> n153 [label="\\\\ "];
	n148 -> n74 [label="\\{"];
	n148 -> n107 [label="\\}"];
	n149 -> n53 [label="[^\"\\\\{}]"];
	n149 -> n81 [label="\""];
	n149 -> n82 [label="\\\\ "];
	n149 -> n13 [label="\\{"];
	n149 -> n22 [label="\\}"];
	n150 -> n130 [label="[^\\s/=>{}]"];
	n150 -> n146 [label="\\s"];
	n150 -> n147 [label="\\/"];
	n150 -> n148 [label="="];
	n150 -> n149 [label=">"];
	n150 -> n28 [label="\\{"];
	n150 -> n96 [label="\\}"];
	n151 -> n32 [label="[^\\s\"/>\\\\{}]"];
	n151 -> n131 [label="\\s"];
	n151 -> n54 [label="\""];
	n151 -> n132 [label="\\/"];
	n151 -> n134 [label=">"];
	n151 -> n55 [label="\\\\ "];
	n151 -> n16 [label="\\{"];
	n151 -> n22 [label="\\}"];
	n152 -> n38 [label="[^\\s\"/>\\\\{}]"];
	n152 -> n136 [label="\\s"];
	n152 -> n58 [label="\""];
	n152 -> n137 [label="\\/"];
	n152 -> n139 [label=">"];
	n152 -> n59 [label="\\\\ "];
	n152 -> n32 [label="\\{"];
	n152 -> n16 [label="\\}"];
	n153 -> n143 [label="[^\\s\"'=>{}]"];
	n153 -> n146 [label="\\s"];
	n153 -> n53 [label="[\"'=]"];
	n153 -> n149 [label=">"];
	n153 -> n66 [label="\\{"];
	n153 -> n107 [label="\\}"];
	n154 -> n53 [label="[^\\s\"/>\\\\{}]"];
	n154 -> n146 [label="\\s"];
	n154 -> n81 [label="\""];
	n154 -> n147 [label="\\/"];
	n154 -> n149 [label=">"];
	n154 -> n82 [label="\\\\ "];
	n154 -> n13 [label="\\{"];
	n154 -> n22 [label="\\}"];
}
`;

module.exports[n`toDot >> from regexes >> ENFA (JS): /<\/?[^\s\d>\/=$<%][^\s>\/=$<%]*(?:\s+[^\s>\/=]+(?:=(?:"(?:\\[\s\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\"])*"|[^\s'">=]+))?)*\s*\/?>/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=circle];
	n9 [label="9", shape=circle];
	n10 [label="10", shape=circle];
	n11 [label="11", shape=circle];
	n12 [label="12", shape=circle];
	n13 [label="13", shape=circle];
	n14 [label="14", shape=circle];
	n15 [label="15", shape=circle];
	n16 [label="16", shape=circle];
	n17 [label="17", shape=circle];
	n18 [label="18", shape=doublecircle];
	n19 [label="19", shape=circle];
	n20 [label="20", shape=circle];
	n21 [label="21", shape=circle];
	n22 [label="22", shape=circle];
	n23 [label="23", shape=circle];
	n24 [label="24", shape=circle];
	n25 [label="25", shape=circle];
	n26 [label="26", shape=circle];
	n27 [label="27", shape=circle];
	n28 [label="28", shape=circle];
	n29 [label="29", shape=circle];
	n30 [label="30", shape=circle];
	n31 [label="31", shape=circle];
	n32 [label="32", shape=circle];
	n33 [label="33", shape=circle];
	n34 [label="34", shape=circle];
	n35 [label="35", shape=circle];
	n36 [label="36", shape=circle];
	n37 [label="37", shape=circle];
	n38 [label="38", shape=circle];
	n39 [label="39", shape=circle];
	n40 [label="40", shape=circle];
	n41 [label="41", shape=circle];
	n42 [label="42", shape=circle];
	n43 [label="43", shape=circle];
	n44 [label="44", shape=circle];
	n45 [label="45", shape=circle];
	n46 [label="46", shape=circle];
	n47 [label="47", shape=circle];
	n48 [label="48", shape=circle];
	n49 [label="49", shape=circle];
	n50 [label="50", shape=circle];
	n51 [label="51", shape=circle];
	n52 [label="52", shape=circle];

	// edges
	null -> n0;
	n0 -> n1 [label="<"];
	n1 -> n2 [label="\\/", taillabel="1"];
	n1 -> n3 [label="", taillabel="2"];
	n2 -> n3 [label=""];
	n3 -> n4 [label="[^\\s\\d$%/<=>]"];
	n4 -> n5 [label="", taillabel="1"];
	n4 -> n6 [label="", taillabel="2"];
	n5 -> n7 [label="[^\\s$%/<=>]"];
	n6 -> n8 [label="", taillabel="1"];
	n6 -> n9 [label="", taillabel="2"];
	n7 -> n5 [label="", taillabel="1"];
	n7 -> n6 [label="", taillabel="2"];
	n8 -> n10 [label=""];
	n9 -> n11 [label="", taillabel="1"];
	n9 -> n12 [label="", taillabel="2"];
	n10 -> n13 [label="\\s"];
	n11 -> n14 [label="\\s"];
	n12 -> n15 [label="\\/", taillabel="1"];
	n12 -> n16 [label="", taillabel="2"];
	n13 -> n10 [label="", taillabel="1"];
	n13 -> n17 [label="", taillabel="2"];
	n14 -> n11 [label="", taillabel="1"];
	n14 -> n12 [label="", taillabel="2"];
	n15 -> n16 [label=""];
	n16 -> n18 [label=">"];
	n17 -> n19 [label=""];
	n19 -> n20 [label="[^\\s/=>]"];
	n20 -> n19 [label="", taillabel="1"];
	n20 -> n21 [label="", taillabel="2"];
	n21 -> n22 [label="=", taillabel="1"];
	n21 -> n23 [label="", taillabel="2"];
	n22 -> n24 [label="\"", taillabel="1"];
	n22 -> n25 [label="", taillabel="2"];
	n23 -> n8 [label="", taillabel="1"];
	n23 -> n9 [label="", taillabel="2"];
	n24 -> n26 [label="", taillabel="1"];
	n24 -> n27 [label="", taillabel="2"];
	n25 -> n28 [label="[^\\s\"'=>]"];
	n26 -> n29 [label="\\\\ ", taillabel="1"];
	n26 -> n30 [label="\\{", taillabel="2"];
	n26 -> n31 [label="[^\"\\\\]", taillabel="3"];
	n27 -> n32 [label="\""];
	n28 -> n25 [label="", taillabel="1"];
	n28 -> n33 [label="", taillabel="2"];
	n29 -> n34 [label="[^]"];
	n30 -> n35 [label=""];
	n31 -> n36 [label=""];
	n32 -> n37 [label=""];
	n33 -> n37 [label=""];
	n34 -> n36 [label=""];
	n35 -> n38 [label="\\{", taillabel="1"];
	n35 -> n39 [label="[^{}]", taillabel="2"];
	n36 -> n26 [label="", taillabel="1"];
	n36 -> n27 [label="", taillabel="2"];
	n37 -> n23 [label=""];
	n38 -> n40 [label="", taillabel="1"];
	n38 -> n41 [label="", taillabel="2"];
	n39 -> n42 [label=""];
	n40 -> n43 [label="\\{", taillabel="1"];
	n40 -> n44 [label="[^{}]", taillabel="2"];
	n41 -> n45 [label="\\}"];
	n42 -> n35 [label="", taillabel="1"];
	n42 -> n46 [label="", taillabel="2"];
	n43 -> n47 [label="", taillabel="1"];
	n43 -> n48 [label="", taillabel="2"];
	n44 -> n49 [label=""];
	n45 -> n42 [label=""];
	n46 -> n50 [label="\\}"];
	n47 -> n51 [label="[^{}]"];
	n48 -> n52 [label="\\}"];
	n49 -> n40 [label="", taillabel="1"];
	n49 -> n41 [label="", taillabel="2"];
	n50 -> n36 [label=""];
	n51 -> n47 [label="", taillabel="1"];
	n51 -> n48 [label="", taillabel="2"];
	n52 -> n49 [label=""];
}
`;

module.exports[n`toDot >> from regexes >> NFA (JS): /<\/?[^\s\d>\/=$<%][^\s>\/=$<%]*(?:\s+[^\s>\/=]+(?:=(?:"(?:\\[\s\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\"])*"|[^\s'">=]+))?)*\s*\/?>/ `] = lit`
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=circle];
	n2 [label="2", shape=circle];
	n3 [label="3", shape=circle];
	n4 [label="4", shape=circle];
	n5 [label="5", shape=circle];
	n6 [label="6", shape=circle];
	n7 [label="7", shape=circle];
	n8 [label="8", shape=doublecircle];
	n9 [label="9", shape=circle];
	n10 [label="10", shape=circle];
	n11 [label="11", shape=circle];
	n12 [label="12", shape=circle];
	n13 [label="13", shape=circle];
	n14 [label="14", shape=circle];
	n15 [label="15", shape=circle];
	n16 [label="16", shape=circle];
	n17 [label="17", shape=circle];
	n18 [label="18", shape=circle];
	n19 [label="19", shape=circle];
	n20 [label="20", shape=circle];
	n21 [label="21", shape=circle];

	// edges
	null -> n0;
	n0 -> n1 [label="<"];
	n1 -> n2 [label="\\/"];
	n1 -> n3 [label="[^\\s\\d$%/<=>]"];
	n2 -> n3 [label="[^\\s\\d$%/<=>]"];
	n3 -> n4 [label="[^\\s$%/<=>]"];
	n3 -> n5 [label="\\s"];
	n3 -> n6 [label="\\s"];
	n3 -> n7 [label="\\/"];
	n3 -> n8 [label=">"];
	n4 -> n4 [label="[^\\s$%/<=>]"];
	n4 -> n5 [label="\\s"];
	n4 -> n6 [label="\\s"];
	n4 -> n7 [label="\\/"];
	n4 -> n8 [label=">"];
	n5 -> n5 [label="\\s"];
	n5 -> n9 [label="[^\\s/=>]"];
	n6 -> n6 [label="\\s"];
	n6 -> n7 [label="\\/"];
	n6 -> n8 [label=">"];
	n7 -> n8 [label=">"];
	n9 -> n9 [label="[^\\s/=>]"];
	n9 -> n10 [label="="];
	n9 -> n5 [label="\\s"];
	n9 -> n6 [label="\\s"];
	n9 -> n7 [label="\\/"];
	n9 -> n8 [label=">"];
	n10 -> n11 [label="\""];
	n10 -> n12 [label="[^\\s\"'=>]"];
	n11 -> n13 [label="\\\\ "];
	n11 -> n14 [label="\\{"];
	n11 -> n15 [label="[^\"\\\\]"];
	n11 -> n16 [label="\""];
	n12 -> n12 [label="[^\\s\"'=>]"];
	n12 -> n5 [label="\\s"];
	n12 -> n6 [label="\\s"];
	n12 -> n7 [label="\\/"];
	n12 -> n8 [label=">"];
	n13 -> n15 [label="[^]"];
	n14 -> n17 [label="\\{"];
	n14 -> n18 [label="[^{}]"];
	n15 -> n13 [label="\\\\ "];
	n15 -> n14 [label="\\{"];
	n15 -> n15 [label="[^\"\\\\]"];
	n15 -> n16 [label="\""];
	n16 -> n5 [label="\\s"];
	n16 -> n6 [label="\\s"];
	n16 -> n7 [label="\\/"];
	n16 -> n8 [label=">"];
	n17 -> n19 [label="\\{"];
	n17 -> n20 [label="[^{}]"];
	n17 -> n18 [label="\\}"];
	n18 -> n17 [label="\\{"];
	n18 -> n18 [label="[^{}]"];
	n18 -> n15 [label="\\}"];
	n19 -> n21 [label="[^{}]"];
	n19 -> n20 [label="\\}"];
	n20 -> n19 [label="\\{"];
	n20 -> n20 [label="[^{}]"];
	n20 -> n18 [label="\\}"];
	n21 -> n21 [label="[^{}]"];
	n21 -> n20 [label="\\}"];
}
`;
