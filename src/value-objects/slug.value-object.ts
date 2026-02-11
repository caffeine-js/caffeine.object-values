import { slugify } from "@caffeine/entity/helpers";
import type { IValueObjectMetadata } from "@/types/value-object-metadata.interface";
import { ValueObject } from "@/core";
import type { SlugDTO } from "@caffeine/models/dtos/primitives";
import { SlugSchema } from "@caffeine/models/schemas/primitives";
import type { Schema } from "@caffeine/schema";

export class SlugVO extends ValueObject<string, typeof SlugDTO> {
	protected override schema: Schema<typeof SlugDTO> = SlugSchema;

	public static make(value: string, info: IValueObjectMetadata): SlugVO {
		const newVO = new SlugVO(slugify(value), info);

		newVO.validate();

		return newVO;
	}
}
