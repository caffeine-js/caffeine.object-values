import { ValueObject } from "@/core";
import type { IValueObjectMetadata } from "@/types";
import type { UrlDTO } from "@caffeine/models/dtos/primitives";
import { UrlSchema } from "@caffeine/models/schemas/primitives";
import type { Schema } from "@caffeine/schema";

export class UrlVO extends ValueObject<string, typeof UrlDTO> {
	protected override schema: Schema<typeof UrlDTO> = UrlSchema;

	public static make(value: string, info: IValueObjectMetadata): UrlVO {
		const newVO = new UrlVO(value, info);

		newVO.validate();

		return newVO;
	}
}
