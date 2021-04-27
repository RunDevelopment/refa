/* eslint-disable */

module.exports["toDot >> from regexes >> DFA (default): /a/"] = `
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="61"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (default): /a/"] = `
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="61"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (default): /a/"] = `
digraph {
	// graph attributes
	rankdir=LR;

	// nodes
	null [shape=point];
	n0 [label="0", shape=circle];
	n1 [label="1", shape=doublecircle];

	// edges
	null -> n0;
	n0 -> n1 [label="61"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (JS): /a/"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (JS): /a/"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (JS): /a/"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (default): /abc/i"] = `
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
	n0 -> n1 [label="41, 61"];
	n1 -> n2 [label="42, 62"];
	n2 -> n3 [label="43, 63"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (default): /abc/i"] = `
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
	n0 -> n1 [label="41, 61"];
	n1 -> n2 [label="42, 62"];
	n2 -> n3 [label="43, 63"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (default): /abc/i"] = `
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
	n0 -> n1 [label="41, 61"];
	n1 -> n2 [label="42, 62"];
	n2 -> n3 [label="43, 63"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (JS): /abc/i"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (JS): /abc/i"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (JS): /abc/i"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (default): /a*b+c*/"] = `
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
	n0 -> n0 [label="61"];
	n0 -> n1 [label="62"];
	n1 -> n1 [label="62"];
	n1 -> n2 [label="63"];
	n2 -> n2 [label="63"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (default): /a*b+c*/"] = `
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
	n1 -> n3 [label="61"];
	n2 -> n4 [label=""];
	n3 -> n1 [label="", taillabel="1"];
	n3 -> n2 [label="", taillabel="2"];
	n4 -> n5 [label="62"];
	n5 -> n4 [label="", taillabel="1"];
	n5 -> n6 [label="", taillabel="2"];
	n6 -> n7 [label="", taillabel="1"];
	n6 -> n8 [label="", taillabel="2"];
	n7 -> n9 [label="63"];
	n9 -> n7 [label="", taillabel="1"];
	n9 -> n8 [label="", taillabel="2"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (default): /a*b+c*/"] = `
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
	n0 -> n1 [label="61"];
	n0 -> n2 [label="62"];
	n1 -> n1 [label="61"];
	n1 -> n2 [label="62"];
	n2 -> n2 [label="62"];
	n2 -> n3 [label="63"];
	n3 -> n3 [label="63"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (JS): /a*b+c*/"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (JS): /a*b+c*/"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (JS): /a*b+c*/"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (default): /\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)/i"] = `
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
	n0 -> n1 [label="30..39"];
	n1 -> n2 [label="2e"];
	n1 -> n1 [label="30..39"];
	n1 -> n3 [label="45, 65"];
	n2 -> n4 [label="30..39"];
	n3 -> n5 [label="2b, 2d"];
	n3 -> n6 [label="30..39"];
	n4 -> n4 [label="30..39"];
	n4 -> n3 [label="45, 65"];
	n5 -> n6 [label="30..39"];
	n6 -> n6 [label="30..39"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (default): /\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)/i"] = `
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
	n1 -> n2 [label="30..39"];
	n2 -> n1 [label="", taillabel="1"];
	n2 -> n3 [label="", taillabel="2"];
	n3 -> n4 [label="2e", taillabel="1"];
	n3 -> n5 [label="", taillabel="2"];
	n4 -> n6 [label=""];
	n5 -> n7 [label="45, 65"];
	n6 -> n8 [label="30..39"];
	n7 -> n9 [label="2b, 2d", taillabel="1"];
	n7 -> n10 [label="", taillabel="2"];
	n8 -> n6 [label="", taillabel="1"];
	n8 -> n11 [label="", taillabel="2"];
	n9 -> n10 [label=""];
	n10 -> n12 [label=""];
	n11 -> n5 [label=""];
	n12 -> n13 [label="30..39"];
	n13 -> n12 [label="", taillabel="1"];
	n13 -> n14 [label="", taillabel="2"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (default): /\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)/i"] = `
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
	n0 -> n1 [label="30..39"];
	n1 -> n1 [label="30..39"];
	n1 -> n2 [label="2e"];
	n1 -> n3 [label="45, 65"];
	n2 -> n4 [label="30..39"];
	n3 -> n5 [label="2b, 2d"];
	n3 -> n6 [label="30..39"];
	n4 -> n4 [label="30..39"];
	n4 -> n3 [label="45, 65"];
	n5 -> n6 [label="30..39"];
	n6 -> n6 [label="30..39"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (JS): /\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)/i"] = `
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
	n0 -> n1 [label="\\\\d"];
	n1 -> n2 [label="\\\\."];
	n1 -> n1 [label="\\\\d"];
	n1 -> n3 [label="[Ee]"];
	n2 -> n4 [label="\\\\d"];
	n3 -> n5 [label="[-+]"];
	n3 -> n6 [label="\\\\d"];
	n4 -> n4 [label="\\\\d"];
	n4 -> n3 [label="[Ee]"];
	n5 -> n6 [label="\\\\d"];
	n6 -> n6 [label="\\\\d"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (JS): /\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)/i"] = `
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
	n1 -> n2 [label="\\\\d"];
	n2 -> n1 [label="", taillabel="1"];
	n2 -> n3 [label="", taillabel="2"];
	n3 -> n4 [label="\\\\.", taillabel="1"];
	n3 -> n5 [label="", taillabel="2"];
	n4 -> n6 [label=""];
	n5 -> n7 [label="[Ee]"];
	n6 -> n8 [label="\\\\d"];
	n7 -> n9 [label="[-+]", taillabel="1"];
	n7 -> n10 [label="", taillabel="2"];
	n8 -> n6 [label="", taillabel="1"];
	n8 -> n11 [label="", taillabel="2"];
	n9 -> n10 [label=""];
	n10 -> n12 [label=""];
	n11 -> n5 [label=""];
	n12 -> n13 [label="\\\\d"];
	n13 -> n12 [label="", taillabel="1"];
	n13 -> n14 [label="", taillabel="2"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (JS): /\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)/i"] = `
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
	n0 -> n1 [label="\\\\d"];
	n1 -> n1 [label="\\\\d"];
	n1 -> n2 [label="\\\\."];
	n1 -> n3 [label="[Ee]"];
	n2 -> n4 [label="\\\\d"];
	n3 -> n5 [label="[-+]"];
	n3 -> n6 [label="\\\\d"];
	n4 -> n4 [label="\\\\d"];
	n4 -> n3 [label="[Ee]"];
	n5 -> n6 [label="\\\\d"];
	n6 -> n6 [label="\\\\d"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (default): /\\/\\*[\\s\\S]*?\\*\\//"] = `
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
	n0 -> n1 [label="2f"];
	n1 -> n2 [label="2a"];
	n2 -> n2 [label="0..29, 2b..ffff"];
	n2 -> n3 [label="2a"];
	n3 -> n2 [label="0..29, 2b..2e, 30..ffff"];
	n3 -> n3 [label="2a"];
	n3 -> n4 [label="2f"];
	n4 -> n2 [label="0..29, 2b..ffff"];
	n4 -> n3 [label="2a"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (default): /\\/\\*[\\s\\S]*?\\*\\//"] = `
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
	n0 -> n1 [label="2f"];
	n1 -> n2 [label="2a"];
	n2 -> n3 [label="", taillabel="1"];
	n2 -> n4 [label="", taillabel="2"];
	n3 -> n5 [label="2a"];
	n4 -> n6 [label="0..ffff"];
	n5 -> n7 [label="2f"];
	n6 -> n3 [label="", taillabel="1"];
	n6 -> n4 [label="", taillabel="2"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (default): /\\/\\*[\\s\\S]*?\\*\\//"] = `
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
	n0 -> n1 [label="2f"];
	n1 -> n2 [label="2a"];
	n2 -> n3 [label="0..ffff"];
	n2 -> n4 [label="2a"];
	n3 -> n3 [label="0..ffff"];
	n3 -> n4 [label="2a"];
	n4 -> n5 [label="2f"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (JS): /\\/\\*[\\s\\S]*?\\*\\//"] = `
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
	n0 -> n1 [label="\\\\/"];
	n1 -> n2 [label="\\\\*"];
	n2 -> n2 [label="[^*]"];
	n2 -> n3 [label="\\\\*"];
	n3 -> n2 [label="[^*/]"];
	n3 -> n3 [label="\\\\*"];
	n3 -> n4 [label="\\\\/"];
	n4 -> n2 [label="[^*]"];
	n4 -> n3 [label="\\\\*"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (JS): /\\/\\*[\\s\\S]*?\\*\\//"] = `
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
	n0 -> n1 [label="\\\\/"];
	n1 -> n2 [label="\\\\*"];
	n2 -> n3 [label="", taillabel="1"];
	n2 -> n4 [label="", taillabel="2"];
	n3 -> n5 [label="\\\\*"];
	n4 -> n6 [label="[^]"];
	n5 -> n7 [label="\\\\/"];
	n6 -> n3 [label="", taillabel="1"];
	n6 -> n4 [label="", taillabel="2"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (JS): /\\/\\*[\\s\\S]*?\\*\\//"] = `
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
	n0 -> n1 [label="\\\\/"];
	n1 -> n2 [label="\\\\*"];
	n2 -> n3 [label="[^]"];
	n2 -> n4 [label="\\\\*"];
	n3 -> n3 [label="[^]"];
	n3 -> n4 [label="\\\\*"];
	n4 -> n5 [label="\\\\/"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (default): /((ab)+){3,}/"] = `
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
	n0 -> n1 [label="61"];
	n1 -> n2 [label="62"];
	n2 -> n3 [label="61"];
	n3 -> n4 [label="62"];
	n4 -> n5 [label="61"];
	n5 -> n6 [label="62"];
	n6 -> n5 [label="61"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (default): /((ab)+){3,}/"] = `
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
	n1 -> n2 [label="61"];
	n2 -> n3 [label="62"];
	n3 -> n1 [label="", taillabel="1"];
	n3 -> n4 [label="", taillabel="2"];
	n4 -> n5 [label=""];
	n5 -> n6 [label="61"];
	n6 -> n7 [label="62"];
	n7 -> n5 [label="", taillabel="1"];
	n7 -> n8 [label="", taillabel="2"];
	n8 -> n9 [label=""];
	n9 -> n10 [label=""];
	n10 -> n11 [label="61"];
	n11 -> n12 [label="62"];
	n12 -> n10 [label="", taillabel="1"];
	n12 -> n13 [label="", taillabel="2"];
	n13 -> n9 [label="", taillabel="1"];
	n13 -> n14 [label="", taillabel="2"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (default): /((ab)+){3,}/"] = `
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
	n0 -> n1 [label="61"];
	n1 -> n2 [label="62"];
	n2 -> n3 [label="61"];
	n3 -> n4 [label="62"];
	n4 -> n5 [label="61"];
	n5 -> n6 [label="62"];
	n6 -> n5 [label="61"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (JS): /((ab)+){3,}/"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (JS): /((ab)+){3,}/"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (JS): /((ab)+){3,}/"] = `
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
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (default): /<\\/?[^\\s\\d>\\/=$<%][^\\s>\\/=$<%]*(?:\\s+[^\\s>\\/=]+(?:=(?:\"(?:\\\\[\\s\\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\\\\"])*\"|[^\\s'\">=]+))?)*\\s*\\/?>/"] = `
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
	n0 -> n1 [label="3c"];
	n1 -> n2 [label="0..8, e..1f, 21..23, 26..2e, 3a..3b, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n1 -> n3 [label="2f"];
	n2 -> n2 [label="0..8, e..1f, 21..23, 26..2e, 30..3b, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n2 -> n4 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n2 -> n5 [label="2f"];
	n2 -> n6 [label="3e"];
	n3 -> n2 [label="0..8, e..1f, 21..23, 26..2e, 3a..3b, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n4 -> n7 [label="0..8, e..1f, 21..2e, 30..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n4 -> n4 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n4 -> n5 [label="2f"];
	n4 -> n6 [label="3e"];
	n5 -> n6 [label="3e"];
	n7 -> n7 [label="0..8, e..1f, 21..2e, 30..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n7 -> n4 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n7 -> n5 [label="2f"];
	n7 -> n8 [label="3d"];
	n7 -> n6 [label="3e"];
	n8 -> n9 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n8 -> n10 [label="22"];
	n9 -> n9 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n9 -> n4 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n9 -> n6 [label="3e"];
	n10 -> n10 [label="0..21, 23..5b, 5d..7a, 7c..ffff"];
	n10 -> n11 [label="22"];
	n10 -> n12 [label="5c"];
	n10 -> n13 [label="7b"];
	n11 -> n4 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n11 -> n5 [label="2f"];
	n11 -> n6 [label="3e"];
	n12 -> n10 [label="0..ffff"];
	n13 -> n13 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n13 -> n14 [label="22"];
	n13 -> n15 [label="5c"];
	n13 -> n16 [label="7b"];
	n13 -> n10 [label="7d"];
	n14 -> n17 [label="0..8, e..1f, 21..2e, 30..3d, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n14 -> n18 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n14 -> n19 [label="2f"];
	n14 -> n20 [label="3e"];
	n14 -> n21 [label="7b"];
	n14 -> n10 [label="7d"];
	n15 -> n13 [label="0..7a, 7c, 7e..ffff"];
	n15 -> n22 [label="7b"];
	n15 -> n10 [label="7d"];
	n16 -> n16 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n16 -> n23 [label="22"];
	n16 -> n24 [label="5c"];
	n16 -> n25 [label="7b"];
	n16 -> n13 [label="7d"];
	n17 -> n17 [label="0..7a, 7c, 7e..ffff"];
	n17 -> n21 [label="7b"];
	n17 -> n10 [label="7d"];
	n18 -> n26 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n18 -> n18 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n18 -> n19 [label="2f"];
	n18 -> n17 [label="3d"];
	n18 -> n20 [label="3e"];
	n18 -> n27 [label="7b"];
	n18 -> n28 [label="7d"];
	n19 -> n17 [label="0..3d, 3f..7a, 7c, 7e..ffff"];
	n19 -> n20 [label="3e"];
	n19 -> n21 [label="7b"];
	n19 -> n10 [label="7d"];
	n20 -> n17 [label="0..7a, 7c, 7e..ffff"];
	n20 -> n21 [label="7b"];
	n20 -> n10 [label="7d"];
	n21 -> n21 [label="0..7a, 7c, 7e..ffff"];
	n21 -> n29 [label="7b"];
	n21 -> n17 [label="7d"];
	n22 -> n22 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n22 -> n30 [label="22"];
	n22 -> n31 [label="5c"];
	n22 -> n32 [label="7b"];
	n22 -> n13 [label="7d"];
	n23 -> n33 [label="0..8, e..1f, 21..2e, 30..3d, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n23 -> n34 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n23 -> n35 [label="2f"];
	n23 -> n36 [label="3e"];
	n23 -> n37 [label="7b"];
	n23 -> n13 [label="7d"];
	n24 -> n16 [label="0..7a, 7c, 7e..ffff"];
	n24 -> n38 [label="7b"];
	n24 -> n13 [label="7d"];
	n25 -> n25 [label="0..21, 23..5b, 5d..7c, 7e..ffff"];
	n25 -> n39 [label="22"];
	n25 -> n40 [label="5c"];
	n25 -> n16 [label="7d"];
	n26 -> n26 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n26 -> n18 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n26 -> n19 [label="2f"];
	n26 -> n41 [label="3d"];
	n26 -> n20 [label="3e"];
	n26 -> n27 [label="7b"];
	n26 -> n28 [label="7d"];
	n27 -> n27 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n27 -> n42 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n27 -> n43 [label="2f"];
	n27 -> n44 [label="3d"];
	n27 -> n45 [label="3e"];
	n27 -> n46 [label="7b"];
	n27 -> n26 [label="7d"];
	n28 -> n28 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n28 -> n47 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n28 -> n7 [label="22"];
	n28 -> n48 [label="2f"];
	n28 -> n49 [label="3d"];
	n28 -> n50 [label="3e"];
	n28 -> n51 [label="5c"];
	n28 -> n52 [label="7b"];
	n29 -> n29 [label="0..7a, 7c, 7e..ffff"];
	n29 -> n21 [label="7d"];
	n30 -> n21 [label="0..8, e..1f, 21..2e, 30..3d, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n30 -> n42 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n30 -> n43 [label="2f"];
	n30 -> n45 [label="3e"];
	n30 -> n29 [label="7b"];
	n30 -> n17 [label="7d"];
	n31 -> n22 [label="0..7a, 7c, 7e..ffff"];
	n31 -> n53 [label="7b"];
	n31 -> n13 [label="7d"];
	n32 -> n32 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n32 -> n54 [label="22"];
	n32 -> n55 [label="5c"];
	n32 -> n16 [label="7b"];
	n32 -> n22 [label="7d"];
	n33 -> n33 [label="0..7a, 7c, 7e..ffff"];
	n33 -> n37 [label="7b"];
	n33 -> n13 [label="7d"];
	n34 -> n56 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n34 -> n34 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n34 -> n35 [label="2f"];
	n34 -> n33 [label="3d"];
	n34 -> n36 [label="3e"];
	n34 -> n57 [label="7b"];
	n34 -> n52 [label="7d"];
	n35 -> n33 [label="0..3d, 3f..7a, 7c, 7e..ffff"];
	n35 -> n36 [label="3e"];
	n35 -> n37 [label="7b"];
	n35 -> n13 [label="7d"];
	n36 -> n33 [label="0..7a, 7c, 7e..ffff"];
	n36 -> n37 [label="7b"];
	n36 -> n13 [label="7d"];
	n37 -> n37 [label="0..7a, 7c, 7e..ffff"];
	n37 -> n29 [label="7b"];
	n37 -> n33 [label="7d"];
	n38 -> n38 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n38 -> n58 [label="22"];
	n38 -> n59 [label="5c"];
	n38 -> n32 [label="7b"];
	n38 -> n16 [label="7d"];
	n39 -> n60 [label="0..8, e..1f, 21..2e, 30..3d, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n39 -> n61 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n39 -> n62 [label="2f"];
	n39 -> n63 [label="3e"];
	n39 -> n37 [label="7b"];
	n39 -> n16 [label="7d"];
	n40 -> n25 [label="0..7a, 7c, 7e..ffff"];
	n40 -> n38 [label="7b"];
	n40 -> n16 [label="7d"];
	n41 -> n64 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n41 -> n17 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n41 -> n13 [label="22"];
	n41 -> n65 [label="7b"];
	n41 -> n66 [label="7d"];
	n42 -> n27 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n42 -> n42 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n42 -> n43 [label="2f"];
	n42 -> n21 [label="3d"];
	n42 -> n45 [label="3e"];
	n42 -> n46 [label="7b"];
	n42 -> n26 [label="7d"];
	n43 -> n21 [label="0..3d, 3f..7a, 7c, 7e..ffff"];
	n43 -> n45 [label="3e"];
	n43 -> n29 [label="7b"];
	n43 -> n17 [label="7d"];
	n44 -> n65 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n44 -> n21 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n44 -> n22 [label="22"];
	n44 -> n67 [label="7b"];
	n44 -> n64 [label="7d"];
	n45 -> n21 [label="0..7a, 7c, 7e..ffff"];
	n45 -> n29 [label="7b"];
	n45 -> n17 [label="7d"];
	n46 -> n46 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n46 -> n68 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n46 -> n69 [label="2f"];
	n46 -> n70 [label="3d"];
	n46 -> n71 [label="3e"];
	n46 -> n7 [label="7b"];
	n46 -> n27 [label="7d"];
	n47 -> n28 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n47 -> n47 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n47 -> n7 [label="22"];
	n47 -> n48 [label="2f"];
	n47 -> n10 [label="3d"];
	n47 -> n50 [label="3e"];
	n47 -> n51 [label="5c"];
	n47 -> n52 [label="7b"];
	n48 -> n10 [label="0..21, 23..3d, 3f..5b, 5d..7a, 7c..ffff"];
	n48 -> n11 [label="22"];
	n48 -> n50 [label="3e"];
	n48 -> n12 [label="5c"];
	n48 -> n13 [label="7b"];
	n49 -> n66 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n49 -> n10 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n49 -> n72 [label="22"];
	n49 -> n73 [label="5c"];
	n49 -> n74 [label="7b"];
	n50 -> n10 [label="0..21, 23..5b, 5d..7a, 7c..ffff"];
	n50 -> n11 [label="22"];
	n50 -> n12 [label="5c"];
	n50 -> n13 [label="7b"];
	n51 -> n28 [label="0..8, e..1f, 21..2e, 30..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n51 -> n47 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n51 -> n48 [label="2f"];
	n51 -> n49 [label="3d"];
	n51 -> n50 [label="3e"];
	n52 -> n52 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n52 -> n75 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n52 -> n26 [label="22"];
	n52 -> n76 [label="2f"];
	n52 -> n77 [label="3d"];
	n52 -> n78 [label="3e"];
	n52 -> n79 [label="5c"];
	n52 -> n80 [label="7b"];
	n52 -> n28 [label="7d"];
	n53 -> n53 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n53 -> n81 [label="22"];
	n53 -> n82 [label="5c"];
	n53 -> n13 [label="7b"];
	n53 -> n22 [label="7d"];
	n54 -> n83 [label="0..8, e..1f, 21..2e, 30..3d, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n54 -> n84 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n54 -> n85 [label="2f"];
	n54 -> n86 [label="3e"];
	n54 -> n21 [label="7b"];
	n54 -> n22 [label="7d"];
	n55 -> n32 [label="0..7a, 7c, 7e..ffff"];
	n55 -> n22 [label="7b, 7d"];
	n56 -> n56 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n56 -> n34 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n56 -> n35 [label="2f"];
	n56 -> n87 [label="3d"];
	n56 -> n36 [label="3e"];
	n56 -> n57 [label="7b"];
	n56 -> n52 [label="7d"];
	n57 -> n57 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n57 -> n88 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n57 -> n89 [label="2f"];
	n57 -> n90 [label="3d"];
	n57 -> n91 [label="3e"];
	n57 -> n46 [label="7b"];
	n57 -> n56 [label="7d"];
	n58 -> n37 [label="0..8, e..1f, 21..2e, 30..3d, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n58 -> n88 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n58 -> n89 [label="2f"];
	n58 -> n91 [label="3e"];
	n58 -> n29 [label="7b"];
	n58 -> n33 [label="7d"];
	n59 -> n38 [label="0..7a, 7c, 7e..ffff"];
	n59 -> n53 [label="7b"];
	n59 -> n16 [label="7d"];
	n60 -> n60 [label="0..7a, 7c, 7e..ffff"];
	n60 -> n37 [label="7b"];
	n60 -> n16 [label="7d"];
	n61 -> n92 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n61 -> n61 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n61 -> n62 [label="2f"];
	n61 -> n60 [label="3d"];
	n61 -> n63 [label="3e"];
	n61 -> n57 [label="7b"];
	n61 -> n80 [label="7d"];
	n62 -> n60 [label="0..3d, 3f..7a, 7c, 7e..ffff"];
	n62 -> n63 [label="3e"];
	n62 -> n37 [label="7b"];
	n62 -> n16 [label="7d"];
	n63 -> n60 [label="0..7a, 7c, 7e..ffff"];
	n63 -> n37 [label="7b"];
	n63 -> n16 [label="7d"];
	n64 -> n64 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n64 -> n18 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n64 -> n17 [label="22, 27, 3d"];
	n64 -> n20 [label="3e"];
	n64 -> n65 [label="7b"];
	n64 -> n66 [label="7d"];
	n65 -> n65 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n65 -> n42 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n65 -> n21 [label="22, 27, 3d"];
	n65 -> n45 [label="3e"];
	n65 -> n67 [label="7b"];
	n65 -> n64 [label="7d"];
	n66 -> n66 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n66 -> n47 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n66 -> n11 [label="22"];
	n66 -> n10 [label="27, 3d"];
	n66 -> n50 [label="3e"];
	n66 -> n73 [label="5c"];
	n66 -> n74 [label="7b"];
	n67 -> n67 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n67 -> n68 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n67 -> n29 [label="22, 27, 3d"];
	n67 -> n71 [label="3e"];
	n67 -> n9 [label="7b"];
	n67 -> n65 [label="7d"];
	n68 -> n46 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n68 -> n68 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n68 -> n69 [label="2f"];
	n68 -> n29 [label="3d"];
	n68 -> n71 [label="3e"];
	n68 -> n7 [label="7b"];
	n68 -> n27 [label="7d"];
	n69 -> n29 [label="0..3d, 3f..7a, 7c, 7e..ffff"];
	n69 -> n71 [label="3e"];
	n69 -> n21 [label="7d"];
	n70 -> n67 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n70 -> n29 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n70 -> n53 [label="22"];
	n70 -> n9 [label="7b"];
	n70 -> n65 [label="7d"];
	n71 -> n29 [label="0..7a, 7c, 7e..ffff"];
	n71 -> n21 [label="7d"];
	n72 -> n10 [label="0..8, e..1f, 21, 23..2e, 30..3d, 3f..5b, 5d..7a, 7c..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n72 -> n47 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n72 -> n11 [label="22"];
	n72 -> n48 [label="2f"];
	n72 -> n50 [label="3e"];
	n72 -> n12 [label="5c"];
	n72 -> n13 [label="7b"];
	n73 -> n66 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n73 -> n47 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n73 -> n10 [label="22, 27, 3d"];
	n73 -> n50 [label="3e"];
	n74 -> n74 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n74 -> n75 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n74 -> n14 [label="22"];
	n74 -> n13 [label="27, 3d"];
	n74 -> n78 [label="3e"];
	n74 -> n93 [label="5c"];
	n74 -> n94 [label="7b"];
	n74 -> n66 [label="7d"];
	n75 -> n52 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n75 -> n75 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n75 -> n26 [label="22"];
	n75 -> n76 [label="2f"];
	n75 -> n13 [label="3d"];
	n75 -> n78 [label="3e"];
	n75 -> n79 [label="5c"];
	n75 -> n80 [label="7b"];
	n75 -> n28 [label="7d"];
	n76 -> n13 [label="0..21, 23..3d, 3f..5b, 5d..7a, 7c, 7e..ffff"];
	n76 -> n14 [label="22"];
	n76 -> n78 [label="3e"];
	n76 -> n15 [label="5c"];
	n76 -> n16 [label="7b"];
	n76 -> n10 [label="7d"];
	n77 -> n74 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n77 -> n13 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n77 -> n95 [label="22"];
	n77 -> n93 [label="5c"];
	n77 -> n94 [label="7b"];
	n77 -> n66 [label="7d"];
	n78 -> n13 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n78 -> n14 [label="22"];
	n78 -> n15 [label="5c"];
	n78 -> n16 [label="7b"];
	n78 -> n10 [label="7d"];
	n79 -> n52 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n79 -> n75 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n79 -> n76 [label="2f"];
	n79 -> n77 [label="3d"];
	n79 -> n78 [label="3e"];
	n79 -> n96 [label="7b"];
	n79 -> n28 [label="7d"];
	n80 -> n80 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n80 -> n97 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n80 -> n56 [label="22"];
	n80 -> n98 [label="2f"];
	n80 -> n99 [label="3d"];
	n80 -> n100 [label="3e"];
	n80 -> n101 [label="5c"];
	n80 -> n102 [label="7b"];
	n80 -> n52 [label="7d"];
	n81 -> n29 [label="0..8, e..1f, 21..2e, 30..3d, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n81 -> n68 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n81 -> n69 [label="2f"];
	n81 -> n71 [label="3e"];
	n81 -> n21 [label="7d"];
	n82 -> n53 [label="0..7a, 7c, 7e..ffff"];
	n82 -> n10 [label="7b"];
	n82 -> n22 [label="7d"];
	n83 -> n83 [label="0..7a, 7c, 7e..ffff"];
	n83 -> n21 [label="7b"];
	n83 -> n22 [label="7d"];
	n84 -> n103 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n84 -> n84 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n84 -> n85 [label="2f"];
	n84 -> n83 [label="3d"];
	n84 -> n86 [label="3e"];
	n84 -> n27 [label="7b"];
	n84 -> n96 [label="7d"];
	n85 -> n83 [label="0..3d, 3f..7a, 7c, 7e..ffff"];
	n85 -> n86 [label="3e"];
	n85 -> n21 [label="7b"];
	n85 -> n22 [label="7d"];
	n86 -> n83 [label="0..7a, 7c, 7e..ffff"];
	n86 -> n21 [label="7b"];
	n86 -> n22 [label="7d"];
	n87 -> n104 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n87 -> n33 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n87 -> n16 [label="22"];
	n87 -> n105 [label="7b"];
	n87 -> n74 [label="7d"];
	n88 -> n57 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n88 -> n88 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n88 -> n89 [label="2f"];
	n88 -> n37 [label="3d"];
	n88 -> n91 [label="3e"];
	n88 -> n46 [label="7b"];
	n88 -> n56 [label="7d"];
	n89 -> n37 [label="0..3d, 3f..7a, 7c, 7e..ffff"];
	n89 -> n91 [label="3e"];
	n89 -> n29 [label="7b"];
	n89 -> n33 [label="7d"];
	n90 -> n105 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n90 -> n37 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n90 -> n38 [label="22"];
	n90 -> n67 [label="7b"];
	n90 -> n104 [label="7d"];
	n91 -> n37 [label="0..7a, 7c, 7e..ffff"];
	n91 -> n29 [label="7b"];
	n91 -> n33 [label="7d"];
	n92 -> n92 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n92 -> n61 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n92 -> n62 [label="2f"];
	n92 -> n106 [label="3d"];
	n92 -> n63 [label="3e"];
	n92 -> n57 [label="7b"];
	n92 -> n80 [label="7d"];
	n93 -> n74 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n93 -> n75 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n93 -> n13 [label="22, 27, 3d"];
	n93 -> n78 [label="3e"];
	n93 -> n107 [label="7b"];
	n93 -> n66 [label="7d"];
	n94 -> n94 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n94 -> n97 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n94 -> n23 [label="22"];
	n94 -> n16 [label="27, 3d"];
	n94 -> n100 [label="3e"];
	n94 -> n108 [label="5c"];
	n94 -> n109 [label="7b"];
	n94 -> n74 [label="7d"];
	n95 -> n13 [label="0..8, e..1f, 21, 23..2e, 30..3d, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n95 -> n75 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n95 -> n14 [label="22"];
	n95 -> n76 [label="2f"];
	n95 -> n78 [label="3e"];
	n95 -> n15 [label="5c"];
	n95 -> n16 [label="7b"];
	n95 -> n10 [label="7d"];
	n96 -> n96 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n96 -> n110 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n96 -> n27 [label="22"];
	n96 -> n111 [label="2f"];
	n96 -> n112 [label="3d"];
	n96 -> n113 [label="3e"];
	n96 -> n114 [label="5c"];
	n96 -> n115 [label="7b"];
	n96 -> n52 [label="7d"];
	n97 -> n80 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n97 -> n97 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n97 -> n56 [label="22"];
	n97 -> n98 [label="2f"];
	n97 -> n16 [label="3d"];
	n97 -> n100 [label="3e"];
	n97 -> n101 [label="5c"];
	n97 -> n102 [label="7b"];
	n97 -> n52 [label="7d"];
	n98 -> n16 [label="0..21, 23..3d, 3f..5b, 5d..7a, 7c, 7e..ffff"];
	n98 -> n23 [label="22"];
	n98 -> n100 [label="3e"];
	n98 -> n24 [label="5c"];
	n98 -> n25 [label="7b"];
	n98 -> n13 [label="7d"];
	n99 -> n94 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n99 -> n16 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n99 -> n116 [label="22"];
	n99 -> n108 [label="5c"];
	n99 -> n109 [label="7b"];
	n99 -> n74 [label="7d"];
	n100 -> n16 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n100 -> n23 [label="22"];
	n100 -> n24 [label="5c"];
	n100 -> n25 [label="7b"];
	n100 -> n13 [label="7d"];
	n101 -> n80 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n101 -> n97 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n101 -> n98 [label="2f"];
	n101 -> n99 [label="3d"];
	n101 -> n100 [label="3e"];
	n101 -> n117 [label="7b"];
	n101 -> n52 [label="7d"];
	n102 -> n102 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n102 -> n118 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n102 -> n92 [label="22"];
	n102 -> n119 [label="2f"];
	n102 -> n120 [label="3d"];
	n102 -> n121 [label="3e"];
	n102 -> n122 [label="5c"];
	n102 -> n80 [label="7d"];
	n103 -> n103 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n103 -> n84 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n103 -> n85 [label="2f"];
	n103 -> n123 [label="3d"];
	n103 -> n86 [label="3e"];
	n103 -> n27 [label="7b"];
	n103 -> n96 [label="7d"];
	n104 -> n104 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n104 -> n34 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n104 -> n33 [label="22, 27, 3d"];
	n104 -> n36 [label="3e"];
	n104 -> n105 [label="7b"];
	n104 -> n74 [label="7d"];
	n105 -> n105 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n105 -> n88 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n105 -> n37 [label="22, 27, 3d"];
	n105 -> n91 [label="3e"];
	n105 -> n67 [label="7b"];
	n105 -> n104 [label="7d"];
	n106 -> n124 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n106 -> n60 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n106 -> n25 [label="22"];
	n106 -> n105 [label="7b"];
	n106 -> n94 [label="7d"];
	n107 -> n107 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n107 -> n110 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n107 -> n30 [label="22"];
	n107 -> n22 [label="27, 3d"];
	n107 -> n113 [label="3e"];
	n107 -> n125 [label="5c"];
	n107 -> n126 [label="7b"];
	n107 -> n74 [label="7d"];
	n108 -> n94 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n108 -> n97 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n108 -> n16 [label="22, 27, 3d"];
	n108 -> n100 [label="3e"];
	n108 -> n127 [label="7b"];
	n108 -> n74 [label="7d"];
	n109 -> n109 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n109 -> n118 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n109 -> n39 [label="22"];
	n109 -> n25 [label="27, 3d"];
	n109 -> n121 [label="3e"];
	n109 -> n128 [label="5c"];
	n109 -> n94 [label="7d"];
	n110 -> n96 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n110 -> n110 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n110 -> n27 [label="22"];
	n110 -> n111 [label="2f"];
	n110 -> n22 [label="3d"];
	n110 -> n113 [label="3e"];
	n110 -> n114 [label="5c"];
	n110 -> n115 [label="7b"];
	n110 -> n52 [label="7d"];
	n111 -> n22 [label="0..21, 23..3d, 3f..5b, 5d..7a, 7c, 7e..ffff"];
	n111 -> n30 [label="22"];
	n111 -> n113 [label="3e"];
	n111 -> n31 [label="5c"];
	n111 -> n32 [label="7b"];
	n111 -> n13 [label="7d"];
	n112 -> n107 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n112 -> n22 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n112 -> n129 [label="22"];
	n112 -> n125 [label="5c"];
	n112 -> n126 [label="7b"];
	n112 -> n74 [label="7d"];
	n113 -> n22 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n113 -> n30 [label="22"];
	n113 -> n31 [label="5c"];
	n113 -> n32 [label="7b"];
	n113 -> n13 [label="7d"];
	n114 -> n96 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n114 -> n110 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n114 -> n111 [label="2f"];
	n114 -> n112 [label="3d"];
	n114 -> n113 [label="3e"];
	n114 -> n130 [label="7b"];
	n114 -> n52 [label="7d"];
	n115 -> n115 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n115 -> n131 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n115 -> n103 [label="22"];
	n115 -> n132 [label="2f"];
	n115 -> n133 [label="3d"];
	n115 -> n134 [label="3e"];
	n115 -> n135 [label="5c"];
	n115 -> n80 [label="7b"];
	n115 -> n96 [label="7d"];
	n116 -> n16 [label="0..8, e..1f, 21, 23..2e, 30..3d, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n116 -> n97 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n116 -> n23 [label="22"];
	n116 -> n98 [label="2f"];
	n116 -> n100 [label="3e"];
	n116 -> n24 [label="5c"];
	n116 -> n25 [label="7b"];
	n116 -> n13 [label="7d"];
	n117 -> n117 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n117 -> n136 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n117 -> n57 [label="22"];
	n117 -> n137 [label="2f"];
	n117 -> n138 [label="3d"];
	n117 -> n139 [label="3e"];
	n117 -> n140 [label="5c"];
	n117 -> n115 [label="7b"];
	n117 -> n80 [label="7d"];
	n118 -> n102 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n118 -> n118 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n118 -> n92 [label="22"];
	n118 -> n119 [label="2f"];
	n118 -> n25 [label="3d"];
	n118 -> n121 [label="3e"];
	n118 -> n122 [label="5c"];
	n118 -> n80 [label="7d"];
	n119 -> n25 [label="0..21, 23..3d, 3f..5b, 5d..7c, 7e..ffff"];
	n119 -> n39 [label="22"];
	n119 -> n121 [label="3e"];
	n119 -> n40 [label="5c"];
	n119 -> n16 [label="7d"];
	n120 -> n109 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n120 -> n25 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n120 -> n141 [label="22"];
	n120 -> n128 [label="5c"];
	n120 -> n94 [label="7d"];
	n121 -> n25 [label="0..21, 23..5b, 5d..7c, 7e..ffff"];
	n121 -> n39 [label="22"];
	n121 -> n40 [label="5c"];
	n121 -> n16 [label="7d"];
	n122 -> n102 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n122 -> n118 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n122 -> n119 [label="2f"];
	n122 -> n120 [label="3d"];
	n122 -> n121 [label="3e"];
	n122 -> n117 [label="7b"];
	n122 -> n80 [label="7d"];
	n123 -> n142 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n123 -> n83 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n123 -> n32 [label="22"];
	n123 -> n65 [label="7b"];
	n123 -> n107 [label="7d"];
	n124 -> n124 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n124 -> n61 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n124 -> n60 [label="22, 27, 3d"];
	n124 -> n63 [label="3e"];
	n124 -> n105 [label="7b"];
	n124 -> n94 [label="7d"];
	n125 -> n107 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n125 -> n110 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n125 -> n22 [label="22, 27, 3d"];
	n125 -> n113 [label="3e"];
	n125 -> n143 [label="7b"];
	n125 -> n74 [label="7d"];
	n126 -> n126 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n126 -> n131 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n126 -> n54 [label="22"];
	n126 -> n32 [label="27, 3d"];
	n126 -> n134 [label="3e"];
	n126 -> n144 [label="5c"];
	n126 -> n94 [label="7b"];
	n126 -> n107 [label="7d"];
	n127 -> n127 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n127 -> n136 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n127 -> n58 [label="22"];
	n127 -> n38 [label="27, 3d"];
	n127 -> n139 [label="3e"];
	n127 -> n145 [label="5c"];
	n127 -> n126 [label="7b"];
	n127 -> n94 [label="7d"];
	n128 -> n109 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n128 -> n118 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n128 -> n25 [label="22, 27, 3d"];
	n128 -> n121 [label="3e"];
	n128 -> n127 [label="7b"];
	n128 -> n94 [label="7d"];
	n129 -> n22 [label="0..8, e..1f, 21, 23..2e, 30..3d, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n129 -> n110 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n129 -> n30 [label="22"];
	n129 -> n111 [label="2f"];
	n129 -> n113 [label="3e"];
	n129 -> n31 [label="5c"];
	n129 -> n32 [label="7b"];
	n129 -> n13 [label="7d"];
	n130 -> n130 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n130 -> n146 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n130 -> n46 [label="22"];
	n130 -> n147 [label="2f"];
	n130 -> n148 [label="3d"];
	n130 -> n149 [label="3e"];
	n130 -> n150 [label="5c"];
	n130 -> n52 [label="7b"];
	n130 -> n96 [label="7d"];
	n131 -> n115 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n131 -> n131 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n131 -> n103 [label="22"];
	n131 -> n132 [label="2f"];
	n131 -> n32 [label="3d"];
	n131 -> n134 [label="3e"];
	n131 -> n135 [label="5c"];
	n131 -> n80 [label="7b"];
	n131 -> n96 [label="7d"];
	n132 -> n32 [label="0..21, 23..3d, 3f..5b, 5d..7a, 7c, 7e..ffff"];
	n132 -> n54 [label="22"];
	n132 -> n134 [label="3e"];
	n132 -> n55 [label="5c"];
	n132 -> n16 [label="7b"];
	n132 -> n22 [label="7d"];
	n133 -> n126 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n133 -> n32 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n133 -> n151 [label="22"];
	n133 -> n144 [label="5c"];
	n133 -> n94 [label="7b"];
	n133 -> n107 [label="7d"];
	n134 -> n32 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n134 -> n54 [label="22"];
	n134 -> n55 [label="5c"];
	n134 -> n16 [label="7b"];
	n134 -> n22 [label="7d"];
	n135 -> n115 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n135 -> n131 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n135 -> n132 [label="2f"];
	n135 -> n133 [label="3d"];
	n135 -> n134 [label="3e"];
	n135 -> n96 [label="7b, 7d"];
	n136 -> n117 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n136 -> n136 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n136 -> n57 [label="22"];
	n136 -> n137 [label="2f"];
	n136 -> n38 [label="3d"];
	n136 -> n139 [label="3e"];
	n136 -> n140 [label="5c"];
	n136 -> n115 [label="7b"];
	n136 -> n80 [label="7d"];
	n137 -> n38 [label="0..21, 23..3d, 3f..5b, 5d..7a, 7c, 7e..ffff"];
	n137 -> n58 [label="22"];
	n137 -> n139 [label="3e"];
	n137 -> n59 [label="5c"];
	n137 -> n32 [label="7b"];
	n137 -> n16 [label="7d"];
	n138 -> n127 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n138 -> n38 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n138 -> n152 [label="22"];
	n138 -> n145 [label="5c"];
	n138 -> n126 [label="7b"];
	n138 -> n94 [label="7d"];
	n139 -> n38 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n139 -> n58 [label="22"];
	n139 -> n59 [label="5c"];
	n139 -> n32 [label="7b"];
	n139 -> n16 [label="7d"];
	n140 -> n117 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n140 -> n136 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n140 -> n137 [label="2f"];
	n140 -> n138 [label="3d"];
	n140 -> n139 [label="3e"];
	n140 -> n130 [label="7b"];
	n140 -> n80 [label="7d"];
	n141 -> n25 [label="0..8, e..1f, 21, 23..2e, 30..3d, 3f..5b, 5d..7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n141 -> n118 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n141 -> n39 [label="22"];
	n141 -> n119 [label="2f"];
	n141 -> n121 [label="3e"];
	n141 -> n40 [label="5c"];
	n141 -> n16 [label="7d"];
	n142 -> n142 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n142 -> n84 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n142 -> n83 [label="22, 27, 3d"];
	n142 -> n86 [label="3e"];
	n142 -> n65 [label="7b"];
	n142 -> n107 [label="7d"];
	n143 -> n143 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n143 -> n146 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n143 -> n81 [label="22"];
	n143 -> n53 [label="27, 3d"];
	n143 -> n149 [label="3e"];
	n143 -> n153 [label="5c"];
	n143 -> n74 [label="7b"];
	n143 -> n107 [label="7d"];
	n144 -> n126 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n144 -> n131 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n144 -> n32 [label="22, 27, 3d"];
	n144 -> n134 [label="3e"];
	n144 -> n107 [label="7b, 7d"];
	n145 -> n127 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n145 -> n136 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n145 -> n38 [label="22, 27, 3d"];
	n145 -> n139 [label="3e"];
	n145 -> n143 [label="7b"];
	n145 -> n94 [label="7d"];
	n146 -> n130 [label="0..8, e..1f, 21, 23..2e, 30..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n146 -> n146 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n146 -> n46 [label="22"];
	n146 -> n147 [label="2f"];
	n146 -> n53 [label="3d"];
	n146 -> n149 [label="3e"];
	n146 -> n150 [label="5c"];
	n146 -> n52 [label="7b"];
	n146 -> n96 [label="7d"];
	n147 -> n53 [label="0..21, 23..3d, 3f..5b, 5d..7a, 7c, 7e..ffff"];
	n147 -> n81 [label="22"];
	n147 -> n149 [label="3e"];
	n147 -> n82 [label="5c"];
	n147 -> n13 [label="7b"];
	n147 -> n22 [label="7d"];
	n148 -> n143 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n148 -> n53 [label="9..d, 20, 27, 3d..3e, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n148 -> n154 [label="22"];
	n148 -> n153 [label="5c"];
	n148 -> n74 [label="7b"];
	n148 -> n107 [label="7d"];
	n149 -> n53 [label="0..21, 23..5b, 5d..7a, 7c, 7e..ffff"];
	n149 -> n81 [label="22"];
	n149 -> n82 [label="5c"];
	n149 -> n13 [label="7b"];
	n149 -> n22 [label="7d"];
	n150 -> n130 [label="0..8, e..1f, 21..2e, 30..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n150 -> n146 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n150 -> n147 [label="2f"];
	n150 -> n148 [label="3d"];
	n150 -> n149 [label="3e"];
	n150 -> n28 [label="7b"];
	n150 -> n96 [label="7d"];
	n151 -> n32 [label="0..8, e..1f, 21, 23..2e, 30..3d, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n151 -> n131 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n151 -> n54 [label="22"];
	n151 -> n132 [label="2f"];
	n151 -> n134 [label="3e"];
	n151 -> n55 [label="5c"];
	n151 -> n16 [label="7b"];
	n151 -> n22 [label="7d"];
	n152 -> n38 [label="0..8, e..1f, 21, 23..2e, 30..3d, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n152 -> n136 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n152 -> n58 [label="22"];
	n152 -> n137 [label="2f"];
	n152 -> n139 [label="3e"];
	n152 -> n59 [label="5c"];
	n152 -> n32 [label="7b"];
	n152 -> n16 [label="7d"];
	n153 -> n143 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n153 -> n146 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n153 -> n53 [label="22, 27, 3d"];
	n153 -> n149 [label="3e"];
	n153 -> n66 [label="7b"];
	n153 -> n107 [label="7d"];
	n154 -> n53 [label="0..8, e..1f, 21, 23..2e, 30..3d, 3f..5b, 5d..7a, 7c, 7e..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n154 -> n146 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n154 -> n81 [label="22"];
	n154 -> n147 [label="2f"];
	n154 -> n149 [label="3e"];
	n154 -> n82 [label="5c"];
	n154 -> n13 [label="7b"];
	n154 -> n22 [label="7d"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (default): /<\\/?[^\\s\\d>\\/=$<%][^\\s>\\/=$<%]*(?:\\s+[^\\s>\\/=]+(?:=(?:\"(?:\\\\[\\s\\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\\\\"])*\"|[^\\s'\">=]+))?)*\\s*\\/?>/"] = `
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
	n0 -> n1 [label="3c"];
	n1 -> n2 [label="2f", taillabel="1"];
	n1 -> n3 [label="", taillabel="2"];
	n2 -> n3 [label=""];
	n3 -> n4 [label="0..8, e..1f, 21..23, 26..2e, 3a..3b, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n4 -> n5 [label="", taillabel="1"];
	n4 -> n6 [label="", taillabel="2"];
	n5 -> n7 [label="0..8, e..1f, 21..23, 26..2e, 30..3b, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n6 -> n8 [label="", taillabel="1"];
	n6 -> n9 [label="", taillabel="2"];
	n7 -> n5 [label="", taillabel="1"];
	n7 -> n6 [label="", taillabel="2"];
	n8 -> n10 [label=""];
	n9 -> n11 [label="", taillabel="1"];
	n9 -> n12 [label="", taillabel="2"];
	n10 -> n13 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n11 -> n14 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n12 -> n15 [label="2f", taillabel="1"];
	n12 -> n16 [label="", taillabel="2"];
	n13 -> n10 [label="", taillabel="1"];
	n13 -> n17 [label="", taillabel="2"];
	n14 -> n11 [label="", taillabel="1"];
	n14 -> n12 [label="", taillabel="2"];
	n15 -> n16 [label=""];
	n16 -> n18 [label="3e"];
	n17 -> n19 [label=""];
	n19 -> n20 [label="0..8, e..1f, 21..2e, 30..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n20 -> n19 [label="", taillabel="1"];
	n20 -> n21 [label="", taillabel="2"];
	n21 -> n22 [label="3d", taillabel="1"];
	n21 -> n23 [label="", taillabel="2"];
	n22 -> n24 [label="22", taillabel="1"];
	n22 -> n25 [label="", taillabel="2"];
	n23 -> n8 [label="", taillabel="1"];
	n23 -> n9 [label="", taillabel="2"];
	n24 -> n26 [label="", taillabel="1"];
	n24 -> n27 [label="", taillabel="2"];
	n25 -> n28 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n26 -> n29 [label="5c", taillabel="1"];
	n26 -> n30 [label="7b", taillabel="2"];
	n26 -> n31 [label="0..21, 23..5b, 5d..ffff", taillabel="3"];
	n27 -> n32 [label="22"];
	n28 -> n25 [label="", taillabel="1"];
	n28 -> n33 [label="", taillabel="2"];
	n29 -> n34 [label="0..ffff"];
	n30 -> n35 [label=""];
	n31 -> n36 [label=""];
	n32 -> n37 [label=""];
	n33 -> n37 [label=""];
	n34 -> n36 [label=""];
	n35 -> n38 [label="7b", taillabel="1"];
	n35 -> n39 [label="0..7a, 7c, 7e..ffff", taillabel="2"];
	n36 -> n26 [label="", taillabel="1"];
	n36 -> n27 [label="", taillabel="2"];
	n37 -> n23 [label=""];
	n38 -> n40 [label="", taillabel="1"];
	n38 -> n41 [label="", taillabel="2"];
	n39 -> n42 [label=""];
	n40 -> n43 [label="7b", taillabel="1"];
	n40 -> n44 [label="0..7a, 7c, 7e..ffff", taillabel="2"];
	n41 -> n45 [label="7d"];
	n42 -> n35 [label="", taillabel="1"];
	n42 -> n46 [label="", taillabel="2"];
	n43 -> n47 [label="", taillabel="1"];
	n43 -> n48 [label="", taillabel="2"];
	n44 -> n49 [label=""];
	n45 -> n42 [label=""];
	n46 -> n50 [label="7d"];
	n47 -> n51 [label="0..7a, 7c, 7e..ffff"];
	n48 -> n52 [label="7d"];
	n49 -> n40 [label="", taillabel="1"];
	n49 -> n41 [label="", taillabel="2"];
	n50 -> n36 [label=""];
	n51 -> n47 [label="", taillabel="1"];
	n51 -> n48 [label="", taillabel="2"];
	n52 -> n49 [label=""];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (default): /<\\/?[^\\s\\d>\\/=$<%][^\\s>\\/=$<%]*(?:\\s+[^\\s>\\/=]+(?:=(?:\"(?:\\\\[\\s\\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\\\\"])*\"|[^\\s'\">=]+))?)*\\s*\\/?>/"] = `
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
	n0 -> n1 [label="3c"];
	n1 -> n2 [label="2f"];
	n1 -> n3 [label="0..8, e..1f, 21..23, 26..2e, 3a..3b, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n2 -> n3 [label="0..8, e..1f, 21..23, 26..2e, 3a..3b, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n3 -> n4 [label="0..8, e..1f, 21..23, 26..2e, 30..3b, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n3 -> n5 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n3 -> n6 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n3 -> n7 [label="2f"];
	n3 -> n8 [label="3e"];
	n4 -> n4 [label="0..8, e..1f, 21..23, 26..2e, 30..3b, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n4 -> n5 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n4 -> n6 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n4 -> n7 [label="2f"];
	n4 -> n8 [label="3e"];
	n5 -> n5 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n5 -> n9 [label="0..8, e..1f, 21..2e, 30..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n6 -> n6 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n6 -> n7 [label="2f"];
	n6 -> n8 [label="3e"];
	n7 -> n8 [label="3e"];
	n9 -> n9 [label="0..8, e..1f, 21..2e, 30..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n9 -> n10 [label="3d"];
	n9 -> n5 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n9 -> n6 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n9 -> n7 [label="2f"];
	n9 -> n8 [label="3e"];
	n10 -> n11 [label="22"];
	n10 -> n12 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n11 -> n13 [label="5c"];
	n11 -> n14 [label="7b"];
	n11 -> n15 [label="0..21, 23..5b, 5d..ffff"];
	n11 -> n16 [label="22"];
	n12 -> n12 [label="0..8, e..1f, 21, 23..26, 28..3c, 3f..9f, a1..167f, 1681..1fff, 200b..2027, 202a..202e, 2030..205e, 2060..2fff, 3001..fefe, ff00..ffff"];
	n12 -> n5 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n12 -> n6 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n12 -> n7 [label="2f"];
	n12 -> n8 [label="3e"];
	n13 -> n15 [label="0..ffff"];
	n14 -> n17 [label="7b"];
	n14 -> n18 [label="0..7a, 7c, 7e..ffff"];
	n15 -> n13 [label="5c"];
	n15 -> n14 [label="7b"];
	n15 -> n15 [label="0..21, 23..5b, 5d..ffff"];
	n15 -> n16 [label="22"];
	n16 -> n5 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n16 -> n6 [label="9..d, 20, a0, 1680, 2000..200a, 2028..2029, 202f, 205f, 3000, feff"];
	n16 -> n7 [label="2f"];
	n16 -> n8 [label="3e"];
	n17 -> n19 [label="7b"];
	n17 -> n20 [label="0..7a, 7c, 7e..ffff"];
	n17 -> n18 [label="7d"];
	n18 -> n17 [label="7b"];
	n18 -> n18 [label="0..7a, 7c, 7e..ffff"];
	n18 -> n15 [label="7d"];
	n19 -> n21 [label="0..7a, 7c, 7e..ffff"];
	n19 -> n20 [label="7d"];
	n20 -> n19 [label="7b"];
	n20 -> n20 [label="0..7a, 7c, 7e..ffff"];
	n20 -> n18 [label="7d"];
	n21 -> n21 [label="0..7a, 7c, 7e..ffff"];
	n21 -> n20 [label="7d"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> DFA (JS): /<\\/?[^\\s\\d>\\/=$<%][^\\s>\\/=$<%]*(?:\\s+[^\\s>\\/=]+(?:=(?:\"(?:\\\\[\\s\\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\\\\"])*\"|[^\\s'\">=]+))?)*\\s*\\/?>/"] = `
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
	n1 -> n2 [label="[^\\\\s\\\\d\$%/<=>]"];
	n1 -> n3 [label="\\\\/"];
	n2 -> n2 [label="[^\\\\s\$%/<=>]"];
	n2 -> n4 [label="\\\\s"];
	n2 -> n5 [label="\\\\/"];
	n2 -> n6 [label=">"];
	n3 -> n2 [label="[^\\\\s\\\\d\$%/<=>]"];
	n4 -> n7 [label="[^\\\\s/=>]"];
	n4 -> n4 [label="\\\\s"];
	n4 -> n5 [label="\\\\/"];
	n4 -> n6 [label=">"];
	n5 -> n6 [label=">"];
	n7 -> n7 [label="[^\\\\s/=>]"];
	n7 -> n4 [label="\\\\s"];
	n7 -> n5 [label="\\\\/"];
	n7 -> n8 [label="="];
	n7 -> n6 [label=">"];
	n8 -> n9 [label="[^\\\\s\\"'=>]"];
	n8 -> n10 [label="\\""];
	n9 -> n9 [label="[^\\\\s\\"'=>]"];
	n9 -> n4 [label="\\\\s"];
	n9 -> n6 [label=">"];
	n10 -> n10 [label="[^\\"\\\\\\\\{]"];
	n10 -> n11 [label="\\""];
	n10 -> n12 [label="\\\\\\\\ "];
	n10 -> n13 [label="\\\\{"];
	n11 -> n4 [label="\\\\s"];
	n11 -> n5 [label="\\\\/"];
	n11 -> n6 [label=">"];
	n12 -> n10 [label="[^]"];
	n13 -> n13 [label="[^\\"\\\\\\\\{}]"];
	n13 -> n14 [label="\\""];
	n13 -> n15 [label="\\\\\\\\ "];
	n13 -> n16 [label="\\\\{"];
	n13 -> n10 [label="\\\\}"];
	n14 -> n17 [label="[^\\\\s/>{}]"];
	n14 -> n18 [label="\\\\s"];
	n14 -> n19 [label="\\\\/"];
	n14 -> n20 [label=">"];
	n14 -> n21 [label="\\\\{"];
	n14 -> n10 [label="\\\\}"];
	n15 -> n13 [label="[^{}]"];
	n15 -> n22 [label="\\\\{"];
	n15 -> n10 [label="\\\\}"];
	n16 -> n16 [label="[^\\"\\\\\\\\{}]"];
	n16 -> n23 [label="\\""];
	n16 -> n24 [label="\\\\\\\\ "];
	n16 -> n25 [label="\\\\{"];
	n16 -> n13 [label="\\\\}"];
	n17 -> n17 [label="[^{}]"];
	n17 -> n21 [label="\\\\{"];
	n17 -> n10 [label="\\\\}"];
	n18 -> n26 [label="[^\\\\s/=>{}]"];
	n18 -> n18 [label="\\\\s"];
	n18 -> n19 [label="\\\\/"];
	n18 -> n17 [label="="];
	n18 -> n20 [label=">"];
	n18 -> n27 [label="\\\\{"];
	n18 -> n28 [label="\\\\}"];
	n19 -> n17 [label="[^>{}]"];
	n19 -> n20 [label=">"];
	n19 -> n21 [label="\\\\{"];
	n19 -> n10 [label="\\\\}"];
	n20 -> n17 [label="[^{}]"];
	n20 -> n21 [label="\\\\{"];
	n20 -> n10 [label="\\\\}"];
	n21 -> n21 [label="[^{}]"];
	n21 -> n29 [label="\\\\{"];
	n21 -> n17 [label="\\\\}"];
	n22 -> n22 [label="[^\\"\\\\\\\\{}]"];
	n22 -> n30 [label="\\""];
	n22 -> n31 [label="\\\\\\\\ "];
	n22 -> n32 [label="\\\\{"];
	n22 -> n13 [label="\\\\}"];
	n23 -> n33 [label="[^\\\\s/>{}]"];
	n23 -> n34 [label="\\\\s"];
	n23 -> n35 [label="\\\\/"];
	n23 -> n36 [label=">"];
	n23 -> n37 [label="\\\\{"];
	n23 -> n13 [label="\\\\}"];
	n24 -> n16 [label="[^{}]"];
	n24 -> n38 [label="\\\\{"];
	n24 -> n13 [label="\\\\}"];
	n25 -> n25 [label="[^\\"\\\\\\\\}]"];
	n25 -> n39 [label="\\""];
	n25 -> n40 [label="\\\\\\\\ "];
	n25 -> n16 [label="\\\\}"];
	n26 -> n26 [label="[^\\\\s/=>{}]"];
	n26 -> n18 [label="\\\\s"];
	n26 -> n19 [label="\\\\/"];
	n26 -> n41 [label="="];
	n26 -> n20 [label=">"];
	n26 -> n27 [label="\\\\{"];
	n26 -> n28 [label="\\\\}"];
	n27 -> n27 [label="[^\\\\s/=>{}]"];
	n27 -> n42 [label="\\\\s"];
	n27 -> n43 [label="\\\\/"];
	n27 -> n44 [label="="];
	n27 -> n45 [label=">"];
	n27 -> n46 [label="\\\\{"];
	n27 -> n26 [label="\\\\}"];
	n28 -> n28 [label="[^\\\\s\\"/=>\\\\\\\\{]"];
	n28 -> n47 [label="\\\\s"];
	n28 -> n7 [label="\\""];
	n28 -> n48 [label="\\\\/"];
	n28 -> n49 [label="="];
	n28 -> n50 [label=">"];
	n28 -> n51 [label="\\\\\\\\ "];
	n28 -> n52 [label="\\\\{"];
	n29 -> n29 [label="[^{}]"];
	n29 -> n21 [label="\\\\}"];
	n30 -> n21 [label="[^\\\\s/>{}]"];
	n30 -> n42 [label="\\\\s"];
	n30 -> n43 [label="\\\\/"];
	n30 -> n45 [label=">"];
	n30 -> n29 [label="\\\\{"];
	n30 -> n17 [label="\\\\}"];
	n31 -> n22 [label="[^{}]"];
	n31 -> n53 [label="\\\\{"];
	n31 -> n13 [label="\\\\}"];
	n32 -> n32 [label="[^\\"\\\\\\\\{}]"];
	n32 -> n54 [label="\\""];
	n32 -> n55 [label="\\\\\\\\ "];
	n32 -> n16 [label="\\\\{"];
	n32 -> n22 [label="\\\\}"];
	n33 -> n33 [label="[^{}]"];
	n33 -> n37 [label="\\\\{"];
	n33 -> n13 [label="\\\\}"];
	n34 -> n56 [label="[^\\\\s/=>{}]"];
	n34 -> n34 [label="\\\\s"];
	n34 -> n35 [label="\\\\/"];
	n34 -> n33 [label="="];
	n34 -> n36 [label=">"];
	n34 -> n57 [label="\\\\{"];
	n34 -> n52 [label="\\\\}"];
	n35 -> n33 [label="[^>{}]"];
	n35 -> n36 [label=">"];
	n35 -> n37 [label="\\\\{"];
	n35 -> n13 [label="\\\\}"];
	n36 -> n33 [label="[^{}]"];
	n36 -> n37 [label="\\\\{"];
	n36 -> n13 [label="\\\\}"];
	n37 -> n37 [label="[^{}]"];
	n37 -> n29 [label="\\\\{"];
	n37 -> n33 [label="\\\\}"];
	n38 -> n38 [label="[^\\"\\\\\\\\{}]"];
	n38 -> n58 [label="\\""];
	n38 -> n59 [label="\\\\\\\\ "];
	n38 -> n32 [label="\\\\{"];
	n38 -> n16 [label="\\\\}"];
	n39 -> n60 [label="[^\\\\s/>{}]"];
	n39 -> n61 [label="\\\\s"];
	n39 -> n62 [label="\\\\/"];
	n39 -> n63 [label=">"];
	n39 -> n37 [label="\\\\{"];
	n39 -> n16 [label="\\\\}"];
	n40 -> n25 [label="[^{}]"];
	n40 -> n38 [label="\\\\{"];
	n40 -> n16 [label="\\\\}"];
	n41 -> n64 [label="[^\\\\s\\"'=>{}]"];
	n41 -> n17 [label="[\\\\s'=>]"];
	n41 -> n13 [label="\\""];
	n41 -> n65 [label="\\\\{"];
	n41 -> n66 [label="\\\\}"];
	n42 -> n27 [label="[^\\\\s/=>{}]"];
	n42 -> n42 [label="\\\\s"];
	n42 -> n43 [label="\\\\/"];
	n42 -> n21 [label="="];
	n42 -> n45 [label=">"];
	n42 -> n46 [label="\\\\{"];
	n42 -> n26 [label="\\\\}"];
	n43 -> n21 [label="[^>{}]"];
	n43 -> n45 [label=">"];
	n43 -> n29 [label="\\\\{"];
	n43 -> n17 [label="\\\\}"];
	n44 -> n65 [label="[^\\\\s\\"'=>{}]"];
	n44 -> n21 [label="[\\\\s'=>]"];
	n44 -> n22 [label="\\""];
	n44 -> n67 [label="\\\\{"];
	n44 -> n64 [label="\\\\}"];
	n45 -> n21 [label="[^{}]"];
	n45 -> n29 [label="\\\\{"];
	n45 -> n17 [label="\\\\}"];
	n46 -> n46 [label="[^\\\\s/=>{}]"];
	n46 -> n68 [label="\\\\s"];
	n46 -> n69 [label="\\\\/"];
	n46 -> n70 [label="="];
	n46 -> n71 [label=">"];
	n46 -> n7 [label="\\\\{"];
	n46 -> n27 [label="\\\\}"];
	n47 -> n28 [label="[^\\\\s\\"/=>\\\\\\\\{]"];
	n47 -> n47 [label="\\\\s"];
	n47 -> n7 [label="\\""];
	n47 -> n48 [label="\\\\/"];
	n47 -> n10 [label="="];
	n47 -> n50 [label=">"];
	n47 -> n51 [label="\\\\\\\\ "];
	n47 -> n52 [label="\\\\{"];
	n48 -> n10 [label="[^\\">\\\\\\\\{]"];
	n48 -> n11 [label="\\""];
	n48 -> n50 [label=">"];
	n48 -> n12 [label="\\\\\\\\ "];
	n48 -> n13 [label="\\\\{"];
	n49 -> n66 [label="[^\\\\s\\"'=>\\\\\\\\{]"];
	n49 -> n10 [label="[\\\\s'=>]"];
	n49 -> n72 [label="\\""];
	n49 -> n73 [label="\\\\\\\\ "];
	n49 -> n74 [label="\\\\{"];
	n50 -> n10 [label="[^\\"\\\\\\\\{]"];
	n50 -> n11 [label="\\""];
	n50 -> n12 [label="\\\\\\\\ "];
	n50 -> n13 [label="\\\\{"];
	n51 -> n28 [label="[^\\\\s/=>]"];
	n51 -> n47 [label="\\\\s"];
	n51 -> n48 [label="\\\\/"];
	n51 -> n49 [label="="];
	n51 -> n50 [label=">"];
	n52 -> n52 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n52 -> n75 [label="\\\\s"];
	n52 -> n26 [label="\\""];
	n52 -> n76 [label="\\\\/"];
	n52 -> n77 [label="="];
	n52 -> n78 [label=">"];
	n52 -> n79 [label="\\\\\\\\ "];
	n52 -> n80 [label="\\\\{"];
	n52 -> n28 [label="\\\\}"];
	n53 -> n53 [label="[^\\"\\\\\\\\{}]"];
	n53 -> n81 [label="\\""];
	n53 -> n82 [label="\\\\\\\\ "];
	n53 -> n13 [label="\\\\{"];
	n53 -> n22 [label="\\\\}"];
	n54 -> n83 [label="[^\\\\s/>{}]"];
	n54 -> n84 [label="\\\\s"];
	n54 -> n85 [label="\\\\/"];
	n54 -> n86 [label=">"];
	n54 -> n21 [label="\\\\{"];
	n54 -> n22 [label="\\\\}"];
	n55 -> n32 [label="[^{}]"];
	n55 -> n22 [label="[{}]"];
	n56 -> n56 [label="[^\\\\s/=>{}]"];
	n56 -> n34 [label="\\\\s"];
	n56 -> n35 [label="\\\\/"];
	n56 -> n87 [label="="];
	n56 -> n36 [label=">"];
	n56 -> n57 [label="\\\\{"];
	n56 -> n52 [label="\\\\}"];
	n57 -> n57 [label="[^\\\\s/=>{}]"];
	n57 -> n88 [label="\\\\s"];
	n57 -> n89 [label="\\\\/"];
	n57 -> n90 [label="="];
	n57 -> n91 [label=">"];
	n57 -> n46 [label="\\\\{"];
	n57 -> n56 [label="\\\\}"];
	n58 -> n37 [label="[^\\\\s/>{}]"];
	n58 -> n88 [label="\\\\s"];
	n58 -> n89 [label="\\\\/"];
	n58 -> n91 [label=">"];
	n58 -> n29 [label="\\\\{"];
	n58 -> n33 [label="\\\\}"];
	n59 -> n38 [label="[^{}]"];
	n59 -> n53 [label="\\\\{"];
	n59 -> n16 [label="\\\\}"];
	n60 -> n60 [label="[^{}]"];
	n60 -> n37 [label="\\\\{"];
	n60 -> n16 [label="\\\\}"];
	n61 -> n92 [label="[^\\\\s/=>{}]"];
	n61 -> n61 [label="\\\\s"];
	n61 -> n62 [label="\\\\/"];
	n61 -> n60 [label="="];
	n61 -> n63 [label=">"];
	n61 -> n57 [label="\\\\{"];
	n61 -> n80 [label="\\\\}"];
	n62 -> n60 [label="[^>{}]"];
	n62 -> n63 [label=">"];
	n62 -> n37 [label="\\\\{"];
	n62 -> n16 [label="\\\\}"];
	n63 -> n60 [label="[^{}]"];
	n63 -> n37 [label="\\\\{"];
	n63 -> n16 [label="\\\\}"];
	n64 -> n64 [label="[^\\\\s\\"'=>{}]"];
	n64 -> n18 [label="\\\\s"];
	n64 -> n17 [label="[\\"'=]"];
	n64 -> n20 [label=">"];
	n64 -> n65 [label="\\\\{"];
	n64 -> n66 [label="\\\\}"];
	n65 -> n65 [label="[^\\\\s\\"'=>{}]"];
	n65 -> n42 [label="\\\\s"];
	n65 -> n21 [label="[\\"'=]"];
	n65 -> n45 [label=">"];
	n65 -> n67 [label="\\\\{"];
	n65 -> n64 [label="\\\\}"];
	n66 -> n66 [label="[^\\\\s\\"'=>\\\\\\\\{]"];
	n66 -> n47 [label="\\\\s"];
	n66 -> n11 [label="\\""];
	n66 -> n10 [label="['=]"];
	n66 -> n50 [label=">"];
	n66 -> n73 [label="\\\\\\\\ "];
	n66 -> n74 [label="\\\\{"];
	n67 -> n67 [label="[^\\\\s\\"'=>{}]"];
	n67 -> n68 [label="\\\\s"];
	n67 -> n29 [label="[\\"'=]"];
	n67 -> n71 [label=">"];
	n67 -> n9 [label="\\\\{"];
	n67 -> n65 [label="\\\\}"];
	n68 -> n46 [label="[^\\\\s/=>{}]"];
	n68 -> n68 [label="\\\\s"];
	n68 -> n69 [label="\\\\/"];
	n68 -> n29 [label="="];
	n68 -> n71 [label=">"];
	n68 -> n7 [label="\\\\{"];
	n68 -> n27 [label="\\\\}"];
	n69 -> n29 [label="[^>{}]"];
	n69 -> n71 [label=">"];
	n69 -> n21 [label="\\\\}"];
	n70 -> n67 [label="[^\\\\s\\"'=>{}]"];
	n70 -> n29 [label="[\\\\s'=>]"];
	n70 -> n53 [label="\\""];
	n70 -> n9 [label="\\\\{"];
	n70 -> n65 [label="\\\\}"];
	n71 -> n29 [label="[^{}]"];
	n71 -> n21 [label="\\\\}"];
	n72 -> n10 [label="[^\\\\s\\"/>\\\\\\\\{]"];
	n72 -> n47 [label="\\\\s"];
	n72 -> n11 [label="\\""];
	n72 -> n48 [label="\\\\/"];
	n72 -> n50 [label=">"];
	n72 -> n12 [label="\\\\\\\\ "];
	n72 -> n13 [label="\\\\{"];
	n73 -> n66 [label="[^\\\\s\\"'=>]"];
	n73 -> n47 [label="\\\\s"];
	n73 -> n10 [label="[\\"'=]"];
	n73 -> n50 [label=">"];
	n74 -> n74 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n74 -> n75 [label="\\\\s"];
	n74 -> n14 [label="\\""];
	n74 -> n13 [label="['=]"];
	n74 -> n78 [label=">"];
	n74 -> n93 [label="\\\\\\\\ "];
	n74 -> n94 [label="\\\\{"];
	n74 -> n66 [label="\\\\}"];
	n75 -> n52 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n75 -> n75 [label="\\\\s"];
	n75 -> n26 [label="\\""];
	n75 -> n76 [label="\\\\/"];
	n75 -> n13 [label="="];
	n75 -> n78 [label=">"];
	n75 -> n79 [label="\\\\\\\\ "];
	n75 -> n80 [label="\\\\{"];
	n75 -> n28 [label="\\\\}"];
	n76 -> n13 [label="[^\\">\\\\\\\\{}]"];
	n76 -> n14 [label="\\""];
	n76 -> n78 [label=">"];
	n76 -> n15 [label="\\\\\\\\ "];
	n76 -> n16 [label="\\\\{"];
	n76 -> n10 [label="\\\\}"];
	n77 -> n74 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n77 -> n13 [label="[\\\\s'=>]"];
	n77 -> n95 [label="\\""];
	n77 -> n93 [label="\\\\\\\\ "];
	n77 -> n94 [label="\\\\{"];
	n77 -> n66 [label="\\\\}"];
	n78 -> n13 [label="[^\\"\\\\\\\\{}]"];
	n78 -> n14 [label="\\""];
	n78 -> n15 [label="\\\\\\\\ "];
	n78 -> n16 [label="\\\\{"];
	n78 -> n10 [label="\\\\}"];
	n79 -> n52 [label="[^\\\\s/=>{}]"];
	n79 -> n75 [label="\\\\s"];
	n79 -> n76 [label="\\\\/"];
	n79 -> n77 [label="="];
	n79 -> n78 [label=">"];
	n79 -> n96 [label="\\\\{"];
	n79 -> n28 [label="\\\\}"];
	n80 -> n80 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n80 -> n97 [label="\\\\s"];
	n80 -> n56 [label="\\""];
	n80 -> n98 [label="\\\\/"];
	n80 -> n99 [label="="];
	n80 -> n100 [label=">"];
	n80 -> n101 [label="\\\\\\\\ "];
	n80 -> n102 [label="\\\\{"];
	n80 -> n52 [label="\\\\}"];
	n81 -> n29 [label="[^\\\\s/>{}]"];
	n81 -> n68 [label="\\\\s"];
	n81 -> n69 [label="\\\\/"];
	n81 -> n71 [label=">"];
	n81 -> n21 [label="\\\\}"];
	n82 -> n53 [label="[^{}]"];
	n82 -> n10 [label="\\\\{"];
	n82 -> n22 [label="\\\\}"];
	n83 -> n83 [label="[^{}]"];
	n83 -> n21 [label="\\\\{"];
	n83 -> n22 [label="\\\\}"];
	n84 -> n103 [label="[^\\\\s/=>{}]"];
	n84 -> n84 [label="\\\\s"];
	n84 -> n85 [label="\\\\/"];
	n84 -> n83 [label="="];
	n84 -> n86 [label=">"];
	n84 -> n27 [label="\\\\{"];
	n84 -> n96 [label="\\\\}"];
	n85 -> n83 [label="[^>{}]"];
	n85 -> n86 [label=">"];
	n85 -> n21 [label="\\\\{"];
	n85 -> n22 [label="\\\\}"];
	n86 -> n83 [label="[^{}]"];
	n86 -> n21 [label="\\\\{"];
	n86 -> n22 [label="\\\\}"];
	n87 -> n104 [label="[^\\\\s\\"'=>{}]"];
	n87 -> n33 [label="[\\\\s'=>]"];
	n87 -> n16 [label="\\""];
	n87 -> n105 [label="\\\\{"];
	n87 -> n74 [label="\\\\}"];
	n88 -> n57 [label="[^\\\\s/=>{}]"];
	n88 -> n88 [label="\\\\s"];
	n88 -> n89 [label="\\\\/"];
	n88 -> n37 [label="="];
	n88 -> n91 [label=">"];
	n88 -> n46 [label="\\\\{"];
	n88 -> n56 [label="\\\\}"];
	n89 -> n37 [label="[^>{}]"];
	n89 -> n91 [label=">"];
	n89 -> n29 [label="\\\\{"];
	n89 -> n33 [label="\\\\}"];
	n90 -> n105 [label="[^\\\\s\\"'=>{}]"];
	n90 -> n37 [label="[\\\\s'=>]"];
	n90 -> n38 [label="\\""];
	n90 -> n67 [label="\\\\{"];
	n90 -> n104 [label="\\\\}"];
	n91 -> n37 [label="[^{}]"];
	n91 -> n29 [label="\\\\{"];
	n91 -> n33 [label="\\\\}"];
	n92 -> n92 [label="[^\\\\s/=>{}]"];
	n92 -> n61 [label="\\\\s"];
	n92 -> n62 [label="\\\\/"];
	n92 -> n106 [label="="];
	n92 -> n63 [label=">"];
	n92 -> n57 [label="\\\\{"];
	n92 -> n80 [label="\\\\}"];
	n93 -> n74 [label="[^\\\\s\\"'=>{}]"];
	n93 -> n75 [label="\\\\s"];
	n93 -> n13 [label="[\\"'=]"];
	n93 -> n78 [label=">"];
	n93 -> n107 [label="\\\\{"];
	n93 -> n66 [label="\\\\}"];
	n94 -> n94 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n94 -> n97 [label="\\\\s"];
	n94 -> n23 [label="\\""];
	n94 -> n16 [label="['=]"];
	n94 -> n100 [label=">"];
	n94 -> n108 [label="\\\\\\\\ "];
	n94 -> n109 [label="\\\\{"];
	n94 -> n74 [label="\\\\}"];
	n95 -> n13 [label="[^\\\\s\\"/>\\\\\\\\{}]"];
	n95 -> n75 [label="\\\\s"];
	n95 -> n14 [label="\\""];
	n95 -> n76 [label="\\\\/"];
	n95 -> n78 [label=">"];
	n95 -> n15 [label="\\\\\\\\ "];
	n95 -> n16 [label="\\\\{"];
	n95 -> n10 [label="\\\\}"];
	n96 -> n96 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n96 -> n110 [label="\\\\s"];
	n96 -> n27 [label="\\""];
	n96 -> n111 [label="\\\\/"];
	n96 -> n112 [label="="];
	n96 -> n113 [label=">"];
	n96 -> n114 [label="\\\\\\\\ "];
	n96 -> n115 [label="\\\\{"];
	n96 -> n52 [label="\\\\}"];
	n97 -> n80 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n97 -> n97 [label="\\\\s"];
	n97 -> n56 [label="\\""];
	n97 -> n98 [label="\\\\/"];
	n97 -> n16 [label="="];
	n97 -> n100 [label=">"];
	n97 -> n101 [label="\\\\\\\\ "];
	n97 -> n102 [label="\\\\{"];
	n97 -> n52 [label="\\\\}"];
	n98 -> n16 [label="[^\\">\\\\\\\\{}]"];
	n98 -> n23 [label="\\""];
	n98 -> n100 [label=">"];
	n98 -> n24 [label="\\\\\\\\ "];
	n98 -> n25 [label="\\\\{"];
	n98 -> n13 [label="\\\\}"];
	n99 -> n94 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n99 -> n16 [label="[\\\\s'=>]"];
	n99 -> n116 [label="\\""];
	n99 -> n108 [label="\\\\\\\\ "];
	n99 -> n109 [label="\\\\{"];
	n99 -> n74 [label="\\\\}"];
	n100 -> n16 [label="[^\\"\\\\\\\\{}]"];
	n100 -> n23 [label="\\""];
	n100 -> n24 [label="\\\\\\\\ "];
	n100 -> n25 [label="\\\\{"];
	n100 -> n13 [label="\\\\}"];
	n101 -> n80 [label="[^\\\\s/=>{}]"];
	n101 -> n97 [label="\\\\s"];
	n101 -> n98 [label="\\\\/"];
	n101 -> n99 [label="="];
	n101 -> n100 [label=">"];
	n101 -> n117 [label="\\\\{"];
	n101 -> n52 [label="\\\\}"];
	n102 -> n102 [label="[^\\\\s\\"/=>\\\\\\\\}]"];
	n102 -> n118 [label="\\\\s"];
	n102 -> n92 [label="\\""];
	n102 -> n119 [label="\\\\/"];
	n102 -> n120 [label="="];
	n102 -> n121 [label=">"];
	n102 -> n122 [label="\\\\\\\\ "];
	n102 -> n80 [label="\\\\}"];
	n103 -> n103 [label="[^\\\\s/=>{}]"];
	n103 -> n84 [label="\\\\s"];
	n103 -> n85 [label="\\\\/"];
	n103 -> n123 [label="="];
	n103 -> n86 [label=">"];
	n103 -> n27 [label="\\\\{"];
	n103 -> n96 [label="\\\\}"];
	n104 -> n104 [label="[^\\\\s\\"'=>{}]"];
	n104 -> n34 [label="\\\\s"];
	n104 -> n33 [label="[\\"'=]"];
	n104 -> n36 [label=">"];
	n104 -> n105 [label="\\\\{"];
	n104 -> n74 [label="\\\\}"];
	n105 -> n105 [label="[^\\\\s\\"'=>{}]"];
	n105 -> n88 [label="\\\\s"];
	n105 -> n37 [label="[\\"'=]"];
	n105 -> n91 [label=">"];
	n105 -> n67 [label="\\\\{"];
	n105 -> n104 [label="\\\\}"];
	n106 -> n124 [label="[^\\\\s\\"'=>{}]"];
	n106 -> n60 [label="[\\\\s'=>]"];
	n106 -> n25 [label="\\""];
	n106 -> n105 [label="\\\\{"];
	n106 -> n94 [label="\\\\}"];
	n107 -> n107 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n107 -> n110 [label="\\\\s"];
	n107 -> n30 [label="\\""];
	n107 -> n22 [label="['=]"];
	n107 -> n113 [label=">"];
	n107 -> n125 [label="\\\\\\\\ "];
	n107 -> n126 [label="\\\\{"];
	n107 -> n74 [label="\\\\}"];
	n108 -> n94 [label="[^\\\\s\\"'=>{}]"];
	n108 -> n97 [label="\\\\s"];
	n108 -> n16 [label="[\\"'=]"];
	n108 -> n100 [label=">"];
	n108 -> n127 [label="\\\\{"];
	n108 -> n74 [label="\\\\}"];
	n109 -> n109 [label="[^\\\\s\\"'=>\\\\\\\\}]"];
	n109 -> n118 [label="\\\\s"];
	n109 -> n39 [label="\\""];
	n109 -> n25 [label="['=]"];
	n109 -> n121 [label=">"];
	n109 -> n128 [label="\\\\\\\\ "];
	n109 -> n94 [label="\\\\}"];
	n110 -> n96 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n110 -> n110 [label="\\\\s"];
	n110 -> n27 [label="\\""];
	n110 -> n111 [label="\\\\/"];
	n110 -> n22 [label="="];
	n110 -> n113 [label=">"];
	n110 -> n114 [label="\\\\\\\\ "];
	n110 -> n115 [label="\\\\{"];
	n110 -> n52 [label="\\\\}"];
	n111 -> n22 [label="[^\\">\\\\\\\\{}]"];
	n111 -> n30 [label="\\""];
	n111 -> n113 [label=">"];
	n111 -> n31 [label="\\\\\\\\ "];
	n111 -> n32 [label="\\\\{"];
	n111 -> n13 [label="\\\\}"];
	n112 -> n107 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n112 -> n22 [label="[\\\\s'=>]"];
	n112 -> n129 [label="\\""];
	n112 -> n125 [label="\\\\\\\\ "];
	n112 -> n126 [label="\\\\{"];
	n112 -> n74 [label="\\\\}"];
	n113 -> n22 [label="[^\\"\\\\\\\\{}]"];
	n113 -> n30 [label="\\""];
	n113 -> n31 [label="\\\\\\\\ "];
	n113 -> n32 [label="\\\\{"];
	n113 -> n13 [label="\\\\}"];
	n114 -> n96 [label="[^\\\\s/=>{}]"];
	n114 -> n110 [label="\\\\s"];
	n114 -> n111 [label="\\\\/"];
	n114 -> n112 [label="="];
	n114 -> n113 [label=">"];
	n114 -> n130 [label="\\\\{"];
	n114 -> n52 [label="\\\\}"];
	n115 -> n115 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n115 -> n131 [label="\\\\s"];
	n115 -> n103 [label="\\""];
	n115 -> n132 [label="\\\\/"];
	n115 -> n133 [label="="];
	n115 -> n134 [label=">"];
	n115 -> n135 [label="\\\\\\\\ "];
	n115 -> n80 [label="\\\\{"];
	n115 -> n96 [label="\\\\}"];
	n116 -> n16 [label="[^\\\\s\\"/>\\\\\\\\{}]"];
	n116 -> n97 [label="\\\\s"];
	n116 -> n23 [label="\\""];
	n116 -> n98 [label="\\\\/"];
	n116 -> n100 [label=">"];
	n116 -> n24 [label="\\\\\\\\ "];
	n116 -> n25 [label="\\\\{"];
	n116 -> n13 [label="\\\\}"];
	n117 -> n117 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n117 -> n136 [label="\\\\s"];
	n117 -> n57 [label="\\""];
	n117 -> n137 [label="\\\\/"];
	n117 -> n138 [label="="];
	n117 -> n139 [label=">"];
	n117 -> n140 [label="\\\\\\\\ "];
	n117 -> n115 [label="\\\\{"];
	n117 -> n80 [label="\\\\}"];
	n118 -> n102 [label="[^\\\\s\\"/=>\\\\\\\\}]"];
	n118 -> n118 [label="\\\\s"];
	n118 -> n92 [label="\\""];
	n118 -> n119 [label="\\\\/"];
	n118 -> n25 [label="="];
	n118 -> n121 [label=">"];
	n118 -> n122 [label="\\\\\\\\ "];
	n118 -> n80 [label="\\\\}"];
	n119 -> n25 [label="[^\\">\\\\\\\\}]"];
	n119 -> n39 [label="\\""];
	n119 -> n121 [label=">"];
	n119 -> n40 [label="\\\\\\\\ "];
	n119 -> n16 [label="\\\\}"];
	n120 -> n109 [label="[^\\\\s\\"'=>\\\\\\\\}]"];
	n120 -> n25 [label="[\\\\s'=>]"];
	n120 -> n141 [label="\\""];
	n120 -> n128 [label="\\\\\\\\ "];
	n120 -> n94 [label="\\\\}"];
	n121 -> n25 [label="[^\\"\\\\\\\\}]"];
	n121 -> n39 [label="\\""];
	n121 -> n40 [label="\\\\\\\\ "];
	n121 -> n16 [label="\\\\}"];
	n122 -> n102 [label="[^\\\\s/=>{}]"];
	n122 -> n118 [label="\\\\s"];
	n122 -> n119 [label="\\\\/"];
	n122 -> n120 [label="="];
	n122 -> n121 [label=">"];
	n122 -> n117 [label="\\\\{"];
	n122 -> n80 [label="\\\\}"];
	n123 -> n142 [label="[^\\\\s\\"'=>{}]"];
	n123 -> n83 [label="[\\\\s'=>]"];
	n123 -> n32 [label="\\""];
	n123 -> n65 [label="\\\\{"];
	n123 -> n107 [label="\\\\}"];
	n124 -> n124 [label="[^\\\\s\\"'=>{}]"];
	n124 -> n61 [label="\\\\s"];
	n124 -> n60 [label="[\\"'=]"];
	n124 -> n63 [label=">"];
	n124 -> n105 [label="\\\\{"];
	n124 -> n94 [label="\\\\}"];
	n125 -> n107 [label="[^\\\\s\\"'=>{}]"];
	n125 -> n110 [label="\\\\s"];
	n125 -> n22 [label="[\\"'=]"];
	n125 -> n113 [label=">"];
	n125 -> n143 [label="\\\\{"];
	n125 -> n74 [label="\\\\}"];
	n126 -> n126 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n126 -> n131 [label="\\\\s"];
	n126 -> n54 [label="\\""];
	n126 -> n32 [label="['=]"];
	n126 -> n134 [label=">"];
	n126 -> n144 [label="\\\\\\\\ "];
	n126 -> n94 [label="\\\\{"];
	n126 -> n107 [label="\\\\}"];
	n127 -> n127 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n127 -> n136 [label="\\\\s"];
	n127 -> n58 [label="\\""];
	n127 -> n38 [label="['=]"];
	n127 -> n139 [label=">"];
	n127 -> n145 [label="\\\\\\\\ "];
	n127 -> n126 [label="\\\\{"];
	n127 -> n94 [label="\\\\}"];
	n128 -> n109 [label="[^\\\\s\\"'=>{}]"];
	n128 -> n118 [label="\\\\s"];
	n128 -> n25 [label="[\\"'=]"];
	n128 -> n121 [label=">"];
	n128 -> n127 [label="\\\\{"];
	n128 -> n94 [label="\\\\}"];
	n129 -> n22 [label="[^\\\\s\\"/>\\\\\\\\{}]"];
	n129 -> n110 [label="\\\\s"];
	n129 -> n30 [label="\\""];
	n129 -> n111 [label="\\\\/"];
	n129 -> n113 [label=">"];
	n129 -> n31 [label="\\\\\\\\ "];
	n129 -> n32 [label="\\\\{"];
	n129 -> n13 [label="\\\\}"];
	n130 -> n130 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n130 -> n146 [label="\\\\s"];
	n130 -> n46 [label="\\""];
	n130 -> n147 [label="\\\\/"];
	n130 -> n148 [label="="];
	n130 -> n149 [label=">"];
	n130 -> n150 [label="\\\\\\\\ "];
	n130 -> n52 [label="\\\\{"];
	n130 -> n96 [label="\\\\}"];
	n131 -> n115 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n131 -> n131 [label="\\\\s"];
	n131 -> n103 [label="\\""];
	n131 -> n132 [label="\\\\/"];
	n131 -> n32 [label="="];
	n131 -> n134 [label=">"];
	n131 -> n135 [label="\\\\\\\\ "];
	n131 -> n80 [label="\\\\{"];
	n131 -> n96 [label="\\\\}"];
	n132 -> n32 [label="[^\\">\\\\\\\\{}]"];
	n132 -> n54 [label="\\""];
	n132 -> n134 [label=">"];
	n132 -> n55 [label="\\\\\\\\ "];
	n132 -> n16 [label="\\\\{"];
	n132 -> n22 [label="\\\\}"];
	n133 -> n126 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n133 -> n32 [label="[\\\\s'=>]"];
	n133 -> n151 [label="\\""];
	n133 -> n144 [label="\\\\\\\\ "];
	n133 -> n94 [label="\\\\{"];
	n133 -> n107 [label="\\\\}"];
	n134 -> n32 [label="[^\\"\\\\\\\\{}]"];
	n134 -> n54 [label="\\""];
	n134 -> n55 [label="\\\\\\\\ "];
	n134 -> n16 [label="\\\\{"];
	n134 -> n22 [label="\\\\}"];
	n135 -> n115 [label="[^\\\\s/=>{}]"];
	n135 -> n131 [label="\\\\s"];
	n135 -> n132 [label="\\\\/"];
	n135 -> n133 [label="="];
	n135 -> n134 [label=">"];
	n135 -> n96 [label="[{}]"];
	n136 -> n117 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n136 -> n136 [label="\\\\s"];
	n136 -> n57 [label="\\""];
	n136 -> n137 [label="\\\\/"];
	n136 -> n38 [label="="];
	n136 -> n139 [label=">"];
	n136 -> n140 [label="\\\\\\\\ "];
	n136 -> n115 [label="\\\\{"];
	n136 -> n80 [label="\\\\}"];
	n137 -> n38 [label="[^\\">\\\\\\\\{}]"];
	n137 -> n58 [label="\\""];
	n137 -> n139 [label=">"];
	n137 -> n59 [label="\\\\\\\\ "];
	n137 -> n32 [label="\\\\{"];
	n137 -> n16 [label="\\\\}"];
	n138 -> n127 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n138 -> n38 [label="[\\\\s'=>]"];
	n138 -> n152 [label="\\""];
	n138 -> n145 [label="\\\\\\\\ "];
	n138 -> n126 [label="\\\\{"];
	n138 -> n94 [label="\\\\}"];
	n139 -> n38 [label="[^\\"\\\\\\\\{}]"];
	n139 -> n58 [label="\\""];
	n139 -> n59 [label="\\\\\\\\ "];
	n139 -> n32 [label="\\\\{"];
	n139 -> n16 [label="\\\\}"];
	n140 -> n117 [label="[^\\\\s/=>{}]"];
	n140 -> n136 [label="\\\\s"];
	n140 -> n137 [label="\\\\/"];
	n140 -> n138 [label="="];
	n140 -> n139 [label=">"];
	n140 -> n130 [label="\\\\{"];
	n140 -> n80 [label="\\\\}"];
	n141 -> n25 [label="[^\\\\s\\"/>\\\\\\\\}]"];
	n141 -> n118 [label="\\\\s"];
	n141 -> n39 [label="\\""];
	n141 -> n119 [label="\\\\/"];
	n141 -> n121 [label=">"];
	n141 -> n40 [label="\\\\\\\\ "];
	n141 -> n16 [label="\\\\}"];
	n142 -> n142 [label="[^\\\\s\\"'=>{}]"];
	n142 -> n84 [label="\\\\s"];
	n142 -> n83 [label="[\\"'=]"];
	n142 -> n86 [label=">"];
	n142 -> n65 [label="\\\\{"];
	n142 -> n107 [label="\\\\}"];
	n143 -> n143 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n143 -> n146 [label="\\\\s"];
	n143 -> n81 [label="\\""];
	n143 -> n53 [label="['=]"];
	n143 -> n149 [label=">"];
	n143 -> n153 [label="\\\\\\\\ "];
	n143 -> n74 [label="\\\\{"];
	n143 -> n107 [label="\\\\}"];
	n144 -> n126 [label="[^\\\\s\\"'=>{}]"];
	n144 -> n131 [label="\\\\s"];
	n144 -> n32 [label="[\\"'=]"];
	n144 -> n134 [label=">"];
	n144 -> n107 [label="[{}]"];
	n145 -> n127 [label="[^\\\\s\\"'=>{}]"];
	n145 -> n136 [label="\\\\s"];
	n145 -> n38 [label="[\\"'=]"];
	n145 -> n139 [label=">"];
	n145 -> n143 [label="\\\\{"];
	n145 -> n94 [label="\\\\}"];
	n146 -> n130 [label="[^\\\\s\\"/=>\\\\\\\\{}]"];
	n146 -> n146 [label="\\\\s"];
	n146 -> n46 [label="\\""];
	n146 -> n147 [label="\\\\/"];
	n146 -> n53 [label="="];
	n146 -> n149 [label=">"];
	n146 -> n150 [label="\\\\\\\\ "];
	n146 -> n52 [label="\\\\{"];
	n146 -> n96 [label="\\\\}"];
	n147 -> n53 [label="[^\\">\\\\\\\\{}]"];
	n147 -> n81 [label="\\""];
	n147 -> n149 [label=">"];
	n147 -> n82 [label="\\\\\\\\ "];
	n147 -> n13 [label="\\\\{"];
	n147 -> n22 [label="\\\\}"];
	n148 -> n143 [label="[^\\\\s\\"'=>\\\\\\\\{}]"];
	n148 -> n53 [label="[\\\\s'=>]"];
	n148 -> n154 [label="\\""];
	n148 -> n153 [label="\\\\\\\\ "];
	n148 -> n74 [label="\\\\{"];
	n148 -> n107 [label="\\\\}"];
	n149 -> n53 [label="[^\\"\\\\\\\\{}]"];
	n149 -> n81 [label="\\""];
	n149 -> n82 [label="\\\\\\\\ "];
	n149 -> n13 [label="\\\\{"];
	n149 -> n22 [label="\\\\}"];
	n150 -> n130 [label="[^\\\\s/=>{}]"];
	n150 -> n146 [label="\\\\s"];
	n150 -> n147 [label="\\\\/"];
	n150 -> n148 [label="="];
	n150 -> n149 [label=">"];
	n150 -> n28 [label="\\\\{"];
	n150 -> n96 [label="\\\\}"];
	n151 -> n32 [label="[^\\\\s\\"/>\\\\\\\\{}]"];
	n151 -> n131 [label="\\\\s"];
	n151 -> n54 [label="\\""];
	n151 -> n132 [label="\\\\/"];
	n151 -> n134 [label=">"];
	n151 -> n55 [label="\\\\\\\\ "];
	n151 -> n16 [label="\\\\{"];
	n151 -> n22 [label="\\\\}"];
	n152 -> n38 [label="[^\\\\s\\"/>\\\\\\\\{}]"];
	n152 -> n136 [label="\\\\s"];
	n152 -> n58 [label="\\""];
	n152 -> n137 [label="\\\\/"];
	n152 -> n139 [label=">"];
	n152 -> n59 [label="\\\\\\\\ "];
	n152 -> n32 [label="\\\\{"];
	n152 -> n16 [label="\\\\}"];
	n153 -> n143 [label="[^\\\\s\\"'=>{}]"];
	n153 -> n146 [label="\\\\s"];
	n153 -> n53 [label="[\\"'=]"];
	n153 -> n149 [label=">"];
	n153 -> n66 [label="\\\\{"];
	n153 -> n107 [label="\\\\}"];
	n154 -> n53 [label="[^\\\\s\\"/>\\\\\\\\{}]"];
	n154 -> n146 [label="\\\\s"];
	n154 -> n81 [label="\\""];
	n154 -> n147 [label="\\\\/"];
	n154 -> n149 [label=">"];
	n154 -> n82 [label="\\\\\\\\ "];
	n154 -> n13 [label="\\\\{"];
	n154 -> n22 [label="\\\\}"];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> ENFA (JS): /<\\/?[^\\s\\d>\\/=$<%][^\\s>\\/=$<%]*(?:\\s+[^\\s>\\/=]+(?:=(?:\"(?:\\\\[\\s\\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\\\\"])*\"|[^\\s'\">=]+))?)*\\s*\\/?>/"] = `
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
	n1 -> n2 [label="\\\\/", taillabel="1"];
	n1 -> n3 [label="", taillabel="2"];
	n2 -> n3 [label=""];
	n3 -> n4 [label="[^\\\\s\\\\d\$%/<=>]"];
	n4 -> n5 [label="", taillabel="1"];
	n4 -> n6 [label="", taillabel="2"];
	n5 -> n7 [label="[^\\\\s\$%/<=>]"];
	n6 -> n8 [label="", taillabel="1"];
	n6 -> n9 [label="", taillabel="2"];
	n7 -> n5 [label="", taillabel="1"];
	n7 -> n6 [label="", taillabel="2"];
	n8 -> n10 [label=""];
	n9 -> n11 [label="", taillabel="1"];
	n9 -> n12 [label="", taillabel="2"];
	n10 -> n13 [label="\\\\s"];
	n11 -> n14 [label="\\\\s"];
	n12 -> n15 [label="\\\\/", taillabel="1"];
	n12 -> n16 [label="", taillabel="2"];
	n13 -> n10 [label="", taillabel="1"];
	n13 -> n17 [label="", taillabel="2"];
	n14 -> n11 [label="", taillabel="1"];
	n14 -> n12 [label="", taillabel="2"];
	n15 -> n16 [label=""];
	n16 -> n18 [label=">"];
	n17 -> n19 [label=""];
	n19 -> n20 [label="[^\\\\s/=>]"];
	n20 -> n19 [label="", taillabel="1"];
	n20 -> n21 [label="", taillabel="2"];
	n21 -> n22 [label="=", taillabel="1"];
	n21 -> n23 [label="", taillabel="2"];
	n22 -> n24 [label="\\"", taillabel="1"];
	n22 -> n25 [label="", taillabel="2"];
	n23 -> n8 [label="", taillabel="1"];
	n23 -> n9 [label="", taillabel="2"];
	n24 -> n26 [label="", taillabel="1"];
	n24 -> n27 [label="", taillabel="2"];
	n25 -> n28 [label="[^\\\\s\\"'=>]"];
	n26 -> n29 [label="\\\\\\\\ ", taillabel="1"];
	n26 -> n30 [label="\\\\{", taillabel="2"];
	n26 -> n31 [label="[^\\"\\\\\\\\]", taillabel="3"];
	n27 -> n32 [label="\\""];
	n28 -> n25 [label="", taillabel="1"];
	n28 -> n33 [label="", taillabel="2"];
	n29 -> n34 [label="[^]"];
	n30 -> n35 [label=""];
	n31 -> n36 [label=""];
	n32 -> n37 [label=""];
	n33 -> n37 [label=""];
	n34 -> n36 [label=""];
	n35 -> n38 [label="\\\\{", taillabel="1"];
	n35 -> n39 [label="[^{}]", taillabel="2"];
	n36 -> n26 [label="", taillabel="1"];
	n36 -> n27 [label="", taillabel="2"];
	n37 -> n23 [label=""];
	n38 -> n40 [label="", taillabel="1"];
	n38 -> n41 [label="", taillabel="2"];
	n39 -> n42 [label=""];
	n40 -> n43 [label="\\\\{", taillabel="1"];
	n40 -> n44 [label="[^{}]", taillabel="2"];
	n41 -> n45 [label="\\\\}"];
	n42 -> n35 [label="", taillabel="1"];
	n42 -> n46 [label="", taillabel="2"];
	n43 -> n47 [label="", taillabel="1"];
	n43 -> n48 [label="", taillabel="2"];
	n44 -> n49 [label=""];
	n45 -> n42 [label=""];
	n46 -> n50 [label="\\\\}"];
	n47 -> n51 [label="[^{}]"];
	n48 -> n52 [label="\\\\}"];
	n49 -> n40 [label="", taillabel="1"];
	n49 -> n41 [label="", taillabel="2"];
	n50 -> n36 [label=""];
	n51 -> n47 [label="", taillabel="1"];
	n51 -> n48 [label="", taillabel="2"];
	n52 -> n49 [label=""];
}
`.slice(1, -1);

module.exports["toDot >> from regexes >> NFA (JS): /<\\/?[^\\s\\d>\\/=$<%][^\\s>\\/=$<%]*(?:\\s+[^\\s>\\/=]+(?:=(?:\"(?:\\\\[\\s\\S]|{(?:{(?:{[^{}]*}|[^{}])*}|[^{}])+}|[^\\\\\"])*\"|[^\\s'\">=]+))?)*\\s*\\/?>/"] = `
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
	n1 -> n2 [label="\\\\/"];
	n1 -> n3 [label="[^\\\\s\\\\d\$%/<=>]"];
	n2 -> n3 [label="[^\\\\s\\\\d\$%/<=>]"];
	n3 -> n4 [label="[^\\\\s\$%/<=>]"];
	n3 -> n5 [label="\\\\s"];
	n3 -> n6 [label="\\\\s"];
	n3 -> n7 [label="\\\\/"];
	n3 -> n8 [label=">"];
	n4 -> n4 [label="[^\\\\s\$%/<=>]"];
	n4 -> n5 [label="\\\\s"];
	n4 -> n6 [label="\\\\s"];
	n4 -> n7 [label="\\\\/"];
	n4 -> n8 [label=">"];
	n5 -> n5 [label="\\\\s"];
	n5 -> n9 [label="[^\\\\s/=>]"];
	n6 -> n6 [label="\\\\s"];
	n6 -> n7 [label="\\\\/"];
	n6 -> n8 [label=">"];
	n7 -> n8 [label=">"];
	n9 -> n9 [label="[^\\\\s/=>]"];
	n9 -> n10 [label="="];
	n9 -> n5 [label="\\\\s"];
	n9 -> n6 [label="\\\\s"];
	n9 -> n7 [label="\\\\/"];
	n9 -> n8 [label=">"];
	n10 -> n11 [label="\\""];
	n10 -> n12 [label="[^\\\\s\\"'=>]"];
	n11 -> n13 [label="\\\\\\\\ "];
	n11 -> n14 [label="\\\\{"];
	n11 -> n15 [label="[^\\"\\\\\\\\]"];
	n11 -> n16 [label="\\""];
	n12 -> n12 [label="[^\\\\s\\"'=>]"];
	n12 -> n5 [label="\\\\s"];
	n12 -> n6 [label="\\\\s"];
	n12 -> n7 [label="\\\\/"];
	n12 -> n8 [label=">"];
	n13 -> n15 [label="[^]"];
	n14 -> n17 [label="\\\\{"];
	n14 -> n18 [label="[^{}]"];
	n15 -> n13 [label="\\\\\\\\ "];
	n15 -> n14 [label="\\\\{"];
	n15 -> n15 [label="[^\\"\\\\\\\\]"];
	n15 -> n16 [label="\\""];
	n16 -> n5 [label="\\\\s"];
	n16 -> n6 [label="\\\\s"];
	n16 -> n7 [label="\\\\/"];
	n16 -> n8 [label=">"];
	n17 -> n19 [label="\\\\{"];
	n17 -> n20 [label="[^{}]"];
	n17 -> n18 [label="\\\\}"];
	n18 -> n17 [label="\\\\{"];
	n18 -> n18 [label="[^{}]"];
	n18 -> n15 [label="\\\\}"];
	n19 -> n21 [label="[^{}]"];
	n19 -> n20 [label="\\\\}"];
	n20 -> n19 [label="\\\\{"];
	n20 -> n20 [label="[^{}]"];
	n20 -> n18 [label="\\\\}"];
	n21 -> n21 [label="[^{}]"];
	n21 -> n20 [label="\\\\}"];
}
`.slice(1, -1);
