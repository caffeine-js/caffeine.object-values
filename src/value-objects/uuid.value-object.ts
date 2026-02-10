import { ValueObject } from "@/core";
import type { IValueObjectMetadata } from "@/types";
import { UuidDTO } from "@caffeine/models/dtos/primitives";
import { UuidSchema } from "@caffeine/models/schemas/primitives";
import { t } from "@caffeine/models";
import type { Schema } from "@caffeine/schema";

export class UuidVO extends ValueObject<string, typeof UuidDTO> {
	protected override schema: Schema<typeof UuidDTO> = UuidSchema;

	public static make(value: string, info: IValueObjectMetadata): UuidVO {
		const newVO = new UuidVO(value, info);

		newVO.validate();

		return newVO;
	}
}
