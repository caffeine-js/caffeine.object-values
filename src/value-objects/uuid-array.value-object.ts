import { ValueObject } from "@/core";
import type { IValueObjectMetadata } from "@/types";
import type { UuidArrayDTO } from "@caffeine/models/dtos/primitives";
import { UuidArraySchema } from "@caffeine/models/schemas/primitives";
import type { Schema } from "@caffeine/schema";

export class UuidArrayVO extends ValueObject<string[], typeof UuidArrayDTO> {
	protected override schema: Schema<typeof UuidArrayDTO> = UuidArraySchema;

	public static make(value: string[], info: IValueObjectMetadata): UuidArrayVO {
		const newVO = new UuidArrayVO(value, info);

		newVO.validate();

		return newVO;
	}
}
