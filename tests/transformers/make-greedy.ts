import { itTest, regexSnapshot } from "../helper/transform";
import { makeGreedy } from "../../src/transformers";

describe("Transformers", function () {
	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		const transformer = makeGreedy();

		itTest(transformer, [/abc+/, /abc+?/, /abc+?c/, /abc+?$/, /abc+?d/, /abc{3,3}?/, /(?!cc+?d)/, /(?<!cc+?d)/]);

		it("Prism regex snapshot", function () {
			regexSnapshot(this, transformer);
		});
	});
});
