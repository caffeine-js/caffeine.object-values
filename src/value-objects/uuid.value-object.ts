import { ValueObject } from "@/core";
import type { IValueObjectMetadata } from "@/types";
import { generateUUID } from "@caffeine/entity/helpers";
import type { UuidDTO } from "@caffeine/models/dtos/primitives";
import { UuidSchema } from "@caffeine/models/schemas/primitives";

import type { Schema } from "@caffeine/schema";

export class UuidVO extends ValueObject<string, typeof UuidDTO> {
	protected override schema: Schema<typeof UuidDTO> = UuidSchema;

	public static make(value: string, info: IValueObjectMetadata): UuidVO {
		const newVO = new UuidVO(value, info);

		newVO.validate();

		return newVO;
	}

	public static generate(info: IValueObjectMetadata): UuidVO {
		return UuidVO.make(generateUUID(), info);
	}
}
