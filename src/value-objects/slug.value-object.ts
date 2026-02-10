import { slugify } from "@caffeine/entity/helpers";
import { DefinedStringVO } from "./defined-string.value-object";
import type { IValueObjectMetadata } from "@/types/value-object-metadata.interface";

export class SlugVO extends DefinedStringVO {
	public static override make(
		value: string,
		info: IValueObjectMetadata,
	): SlugVO {
		const slugged = slugify(value);
		const newVO = new SlugVO(slugged, info);

		newVO.validate();

		return newVO;
	}
}
