import { ValueObject } from "@/core";
import type { IValueObjectMetadata } from "@/types";
import type { DateTimeDTO } from "@caffeine/models/dtos/primitives";
import { DateTimeSchema } from "@caffeine/models/schemas/primitives";
import type { Schema } from "@caffeine/schema";

export class DateTimeVO extends ValueObject<string, typeof DateTimeDTO> {
	protected override schema: Schema<typeof DateTimeDTO> = DateTimeSchema;

	public static make(value: string, info: IValueObjectMetadata): DateTimeVO {
		const newVO = new DateTimeVO(value, info);

		newVO.validate();

		return newVO;
	}
}
