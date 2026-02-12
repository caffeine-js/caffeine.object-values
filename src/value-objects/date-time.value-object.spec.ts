import { describe, expect, it } from "vitest";

import { InvalidPropertyException } from "@caffeine/errors/domain";
import { DateTimeVO } from "./date-time.value-object";

describe("DateTimeVO", () => {
	it("should create a valid instance", () => {
		const validDate = new Date().toISOString();
		const vo = DateTimeVO.make(validDate, {
			name: "createdAt",
			source: "domain",
		});
		expect(vo.value).toBe(validDate);
	});

	it("should throw InvalidPropertyException when value is not a valid ISO date", () => {
		expect(() =>
			DateTimeVO.make("invalid-date-string", {
				name: "createdAt",
				source: "domain",
			}),
		).toThrow(InvalidPropertyException);
	});
});
