import { describe, expect, it } from "vitest";

import { InvalidPropertyException } from "@caffeine/errors/domain";
import { UuidVO } from "./uuid.value-object";
import { generateUUID } from "@caffeine/entity/helpers";

describe("UuidVO", () => {
	it("should create a valid instance", () => {
		const uuid = generateUUID();
		const vo = UuidVO.make(uuid, { name: "id", source: "domain" });
		expect(vo.value).toBe(uuid);
	});

	it("should throw InvalidPropertyException when value is not a valid UUID", () => {
		expect(() =>
			UuidVO.make("invalid-uuid", { name: "id", source: "domain" }),
		).toThrow(InvalidPropertyException);
	});
});
