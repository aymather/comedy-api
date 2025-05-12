import { Transform } from 'class-transformer';
import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions
} from 'class-validator';

export interface IsEnumOptions {
	isArray?: boolean;
}

export function IsEnum(
	entity: object,
	options: IsEnumOptions = { isArray: false },
	validationOptions?: ValidationOptions
) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'isEnum',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any) {
					if (value === undefined) return true;

					// Transform value to array if isArray is true
					const values = options.isArray
						? (typeof value === 'string' ? value.split(',') : [value]).flat()
						: [value];

					// Get enum values
					const enumValues = Object.values(entity);

					// Check if all values are valid enum values
					return values.every((val) => enumValues.includes(val));
				},
				defaultMessage(args: ValidationArguments) {
					const enumValues = Object.values(entity);
					return options.isArray
						? `each value in ${args.property} must be one of the following values: ${enumValues.join(', ')}`
						: `${args.property} must be one of the following values: ${enumValues.join(', ')}`;
				}
			}
		});

		// Add transform decorator if isArray is true
		if (options.isArray) {
			Transform(({ value }) => {
				if (!value) return undefined;
				return typeof value === 'string' ? value.split(',') : [value];
			})(object, propertyName);
		}
	};
}
