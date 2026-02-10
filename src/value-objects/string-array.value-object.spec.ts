import { describe, expect, it } from "vitest";

import { StringArrayVO } from "./string-array.value-object";

describe("StringArrayVO", () => {
	it("should create a valid instance with strings", () => {
		const vo = StringArrayVO.make(["one", "two"], {
			name: "tags",
			layer: "domain",
		});
		expect(vo.value).toEqual(["one", "two"]);
	});

	it("should create a valid instance with empty array", () => {
		const vo = StringArrayVO.make([], {
			name: "tags",
			layer: "domain",
		});
		expect(vo.value).toEqual([]);
	});
});
