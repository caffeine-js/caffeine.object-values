import { describe, expect, it } from "vitest";

import { InvalidPropertyException } from "@caffeine/errors/domain";
import { UrlVO } from "./url.value-object";

describe("UrlVO", () => {
	it("should create a valid instance", () => {
		const vo = UrlVO.make("http://example.com/cover.jpg", {
			name: "cover",
			layer: "domain",
		});
		expect(vo.value).toBe("http://example.com/cover.jpg");
	});

	it("should throw InvalidPropertyException when value is not a valid URL", () => {
		expect(() =>
			UrlVO.make("invalid-url", { name: "cover", layer: "domain" }),
		).toThrow(InvalidPropertyException);
	});
});
