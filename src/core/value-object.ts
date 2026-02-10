import type { IValueObjectMetadata } from "@/types";
import { InvalidPropertyException } from "@caffeine/errors/domain";
import type { Schema } from "@caffeine/schema";
import type { t } from "@caffeine/models";

export abstract class ValueObject<ValueType, SchemaType extends t.TSchema> {
	protected abstract readonly schema: Schema<SchemaType>;

	protected constructor(
		public readonly value: ValueType,
		protected readonly info: IValueObjectMetadata,
	) {}

	protected validate(): void {
		if (!this.schema.match(this.value))
			throw new InvalidPropertyException(this.info.name, this.info.layer);
	}
}
