import { itTest, regexSnapshot } from "../helper/transform";
import { simplify } from "../../src/transformers";

describe("Transformers", function () {
	const transformer = simplify();

	describe(/[\w-]+(?=\.\w+)/i.exec(__filename)![0], function () {
		itTest(transformer, []);

		it("Prism regex snapshot", function () {
			regexSnapshot(this, transformer);
		});
	});
});
