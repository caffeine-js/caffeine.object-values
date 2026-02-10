import { describe, expect, it } from "vitest";

import { DefinedStringVO } from "./defined-string.value-object";
import { InvalidPropertyException } from "@caffeine/errors/domain";

describe("DefinedStringVO", () => {
	it("should create a valid instance", () => {
		const vo = DefinedStringVO.make("test", {
			name: "test",
			layer: "domain",
		});
		expect(vo.value).toBe("test");
	});

	it("should throw InvalidPropertyException when value is empty", () => {
		expect(() =>
			DefinedStringVO.make("", { name: "test", layer: "domain" }),
		).toThrow(InvalidPropertyException);
	});
});
