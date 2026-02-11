import type { IValueObjectMetadata } from "@/types";
import { ValueObject } from "@/core";
import { StringSchema } from "@caffeine/models/schemas/primitives";
import type { StringDTO } from "@caffeine/models/dtos/primitives";
import type { Schema } from "@caffeine/schema";

export class DefinedStringVO extends ValueObject<string, typeof StringDTO> {
	protected override schema: Schema<typeof StringDTO> = StringSchema;

	public static make(
		value: string,
		info: IValueObjectMetadata,
	): DefinedStringVO {
		const newVO = new DefinedStringVO(value, info);

		newVO.validate();

		return newVO;
	}
}
