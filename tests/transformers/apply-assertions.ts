import { itTest, regexSnapshot } from "../helper/transform";
import { applyAssertions, inline, removeDeadBranches } from "../../src/transformers";
import { CombinedTransformer } from "../../src/ast";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = applyAssertions();
		const optimizedTransformer = new CombinedTransformer([applyAssertions(), inline(), removeDeadBranches()]);

		itTest(transformer, [
			/(?=\d)\wa/,
			/(?!\d)\wa/,
			/(?=\w[^9])a\d/,
			/\da(?<=[^9]\w)/,
			{
				literal: /(?!4)(?=\d)\w(?<!2)a(?<=[^9]a)/,
				options: { maxPasses: 1 },
			},

			/(?=a)\wa/,
			/(?=aa)\wa/,
			/(?=aaa)\wa/,
			/(?!a)aa/,
			/(?!aa)\wa/,
			/(?!aaa)\wa/,
			/a$a/,
			/a^a/,

			/(?!a|""")./s,
			/(?!a)(?!""")./s,

			/(?=foo)foo/i,
			/(?!foo)bar/i,
			/(?!food)foo/i,
			/(?!food)foot/i,
			/(?!food|foobar)foot/i,
			/(?!food)foo\w/i,
			/(?!food|foot)foo\w/i,
			/(?!fo{6})foo\w/i,

			/\(\s*(?!\s)(?:[^()]|\([^()]*\))*?(?=\s*\))/,
			/\(\s*(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,

			/(?!\d)(?<!\w)\w/,

			/(?!\d)\w+/,
			/\w+(?<!\d)/,
			/(?=\da)\w+/,
			/\w+(?<=a\d)/,
			/(?!\d)\w{1,2}/,
			/(?!\d)\w*/,

			/(?=foobar)\w*\s/,
			/(?=foobar)\w*(?!\w)/,
			/(?=foobar)\w*(?![bfo])/,
			/(?=foobar)\w*$/,
			/(?=fo{4})\w*$/,
			/(?!foobar)\w*\s/,
			/(?!foobar)\w*(?!\w)/,
			/(?!foobar)\w*(?![bfo])/,
			/(?!foobar)\w*$/,

			/(?!\d)(?:\w+|:|123)/,
			/(?=\d)\s*\w+/,
			/a$(?:a|b)/,
			/a$(?:a|b)?/,
			/a$(?:a|b|)/,

			/(a(?!b))+/,
			/(a(?!b))*/,
			/(a(?!b))*?/,
			/(a(?!b)){0,4}/,
			/(a(?!b)){1,2}/,
			/(\w(?=\d))*/,

			/(?:fo(?=o)|ba(?=r))\w+/,
			/(?:fo(?=o)|ba(?=r))?\w+/,
			/(?:fo(?=o)|ba(?=r))??\w+/,
			/(?:f(?=oo)|ba(?=r))\w+/,
			/(?:f(?=oo)|ba(?=r))?\w+/,

			/(?!\s)[^]*\S/,
			/(?=a)[^]*/,
			/(?=a)[^]*?/,
			/(?!a)[^]*?/,
			/(?=a)[^]*b/,
			/(?=a)[^]*a/,
			/(?=\d)[^]*\w/,
			/(?=\d)[^]*\w+/,
			/(?=\d)[^]?\w+/,
			/=begin\s[^]*^=end/m,
			/-?(?<!\w)\d+(?:\.\d+)?(?:E[-+]?\d+)?/i,
			/(?:a(?!\d)|foo(?=\w)|bar(?!\w)|b)\w+/i,
			/(?:\[)(?!\d)\w+(?=\])/i,

			/(?:^|[^&])(?<!\w)(?:TRUE|FALSE)/i,

			{ literal: /""((?!"").)*""/s, stepByStep: true, transformer: optimizedTransformer },
			{ literal: /""(.(?<!""))*""/s, stepByStep: true, transformer: optimizedTransformer },
			/""((?!"")(?:[^\\]|\\"))*""/s,
			/""((?!"")(?:[^\\]|\\"))+""/s,
			/"""((?!""").)*"""/s,
			/"""((?!""").)+"""/s,

			/(?:^|[^.]|\.\.\.\s*)(?<!\w)(?:as|async(?=\s*(?:function(?!\w)|\(|[\w$\xa0-\uffff]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|[gs]et(?=\s*[\w$[\xa0-\uffff])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?!\w)/,
			{
				literal: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
				transformer: optimizedTransformer,
				stepByStep: true,
			},
		]);

		it("Prism regex snapshot", function () {
			const transformer = new CombinedTransformer([applyAssertions(), inline(), removeDeadBranches()]);

			regexSnapshot(this, transformer);
		});
	});
});
