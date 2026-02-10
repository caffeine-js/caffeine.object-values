import { describe, expect, it } from "vitest";

import { InvalidPropertyException } from "@caffeine/errors/domain";
import { UuidArrayVO } from "./uuid-array.value-object";
import { generateUUID } from "@caffeine/entity/helpers";

describe("UuidArrayVO", () => {
	it("should create a valid instance with one UUID", () => {
		const uuid = generateUUID();
		const vo = UuidArrayVO.make([uuid], {
			name: "uuids",
			layer: "domain",
		});
		expect(vo.value).toEqual([uuid]);
	});

	it("should create a valid instance with multiple UUIDs", () => {
		const uuid1 = generateUUID();
		const uuid2 = generateUUID();
		const vo = UuidArrayVO.make([uuid1, uuid2], {
			name: "uuids",
			layer: "domain",
		});
		expect(vo.value).toEqual([uuid1, uuid2]);
	});

	it("should allow empty array if schema permits (assuming minItems default is 0)", () => {
		const vo = UuidArrayVO.make([], {
			name: "uuids",
			layer: "domain",
		});
		expect(vo.value).toEqual([]);
	});

	it("should throw InvalidPropertyException when array contains invalid UUID", () => {
		expect(() =>
			UuidArrayVO.make(["invalid-uuid"], { name: "uuids", layer: "domain" }),
		).toThrow(InvalidPropertyException);
	});
});
