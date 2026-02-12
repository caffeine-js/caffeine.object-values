import { ValueObject } from "@/core";
import type { IValueObjectMetadata } from "@/types";
import type { BooleanDTO } from "@caffeine/models/dtos/primitives";
import { BooleanSchema } from "@caffeine/models/schemas/primitives";
import type { Schema } from "@caffeine/schema";

export class BooleanVO extends ValueObject<boolean, typeof BooleanDTO> {
	protected override schema: Schema<typeof BooleanDTO> = BooleanSchema;

	public static make(value: boolean, info: IValueObjectMetadata): BooleanVO {
		const newVO = new BooleanVO(value, info);

		newVO.validate();

		return newVO;
	}

	public static truthy(info: IValueObjectMetadata): BooleanVO {
		return BooleanVO.make(true, info);
	}

	public static falsy(info: IValueObjectMetadata): BooleanVO {
		return BooleanVO.make(false, info);
	}

	public static from(value: unknown, info: IValueObjectMetadata): BooleanVO {
		return BooleanVO.make(!!value, info);
	}
}
