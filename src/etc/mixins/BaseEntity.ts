import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';

export abstract class BaseEntity {
	cast<T>(cls: ClassConstructor<T>): T {
		return plainToInstance(cls, this, {
			excludeExtraneousValues: true
		});
	}

	update<T>(data: Partial<T>): void {
		// Iterate through provided fields, skipping undefined values
		// undefined = field should not be modified (absent from request, or explicitly set to undefined)
		// null = field should explicitly be set to null
		Object.keys(data).forEach((key) => {
			if (data[key] !== undefined) {
				this[key] = data[key];
			}
		});
	}
}
