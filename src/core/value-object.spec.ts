import { describe, expect, it } from "vitest";

import { InvalidPropertyException } from "@caffeine/errors/domain";
import { ValueObject } from "./value-object";
import { StringSchema } from "@caffeine/models/schemas/primitives";
import type { StringDTO } from "@caffeine/models/dtos/primitives";

class TestVO extends ValueObject<string, typeof StringDTO> {
	protected schema = StringSchema;

	public static make(value: string) {
		const vo = new TestVO(value, { name: "test", source: "domain" });
		vo.validate();
		return vo;
	}
}

describe("ValueObject", () => {
	it("should create a valid instance", () => {
		const vo = TestVO.make("valid");
		expect(vo.value).toBe("valid");
	});

	it("should throw InvalidPropertyException when validation fails", () => {
		expect(() => TestVO.make("")).toThrow(InvalidPropertyException);
	});
});
