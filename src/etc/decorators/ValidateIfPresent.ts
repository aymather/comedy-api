import { Transform, TransformFnParams } from 'class-transformer';
import { ValidateIf } from 'class-validator';

export function ValidateIfPresent() {
	return function (target: any, propertyKey: string) {
		// Transform the property first
		Transform(
			({ obj, key, value }: TransformFnParams) => {
				// If the property isn't in the original object, set it to undefined
				// This will prevent validation from occurring
				if (!(key in obj)) {
					return undefined;
				}
				return value;
			},
			{ toClassOnly: true }
		)(target, propertyKey);

		// Then validate only if the property isn't undefined
		ValidateIf((obj, value) => value !== undefined)(target, propertyKey);
	};
}
