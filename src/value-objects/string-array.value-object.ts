import { ValueObject } from "@/core";
import type { IValueObjectMetadata } from "@/types";
import type { StringArrayDTO } from "@caffeine/models/dtos/primitives";
import { StringArraySchema } from "@caffeine/models/schemas/primitives";
import type { Schema } from "@caffeine/schema";

export class StringArrayVO extends ValueObject<
	string[],
	typeof StringArrayDTO
> {
	protected override schema: Schema<typeof StringArrayDTO> = StringArraySchema;

	public static make(
		value: string[],
		info: IValueObjectMetadata,
	): StringArrayVO {
		const newVO = new StringArrayVO(value, info);

		newVO.validate();

		return newVO;
	}
}
