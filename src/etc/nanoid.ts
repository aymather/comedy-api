import {
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator
} from 'class-validator';
import { ColumnOptions } from 'typeorm';

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';

const symbols = uppercase + lowercase + numbers;

export const NANOID_SIZE = 24;

/**
 * Generates a nanoid with the specified length.
 *
 * This function generates a globally unique identifier similar to a UUID but shorter.
 * Given a length of 24 characters, the probability of collision is extremely low,
 * ensuring high uniqueness even with large volumes of IDs.
 *
 * Mathematical explanation:
 *
 * 1. Total number of unique nanoids:
 *    The character set consists of 62 characters (26 uppercase + 26 lowercase + 10 numbers).
 *    For a nanoid length of 24 characters, the total number of possible unique nanoids is:
 *    N = 62^24 ≈ 7.378 x 10^35
 *
 * 2. Probability of collision:
 *    Using the Birthday Problem approximation, the probability P of at least one collision
 *    among n nanoids is:
 *    P ≈ 1 - e^(-n^2 / 2N)
 *
 *    For n = 10^10 nanoids:
 *    N = 62^24
 *    P ≈ 1 - e^(-(10^10)^2 / 2 * 62^24)
 *      ≈ 1 - e^(-10^24 / 2 * 7.378 x 10^35)
 *      ≈ 1 - e^(-1.551 x 10^-16)
 *      ≈ 1 - (1 - 1.551 x 10^-16) (using the approximation e^x ≈ 1 + x for small x)
 *      ≈ 1.551 x 10^-16
 *
 *    Converting this to a percentage:
 *    P ≈ 1.551 x 10^-16 * 100
 *      ≈ 1.551 x 10^-14%
 *
 *    This extremely low probability of collision (1.551 x 10^-14%) ensures that the 24-character nanoids
 *    are highly likely to be globally unique even with the generation of 10 billion nanoids.
 *
 * 	Note: We changed the default size to NANOID_SIZE to increase the uniqueness.
 *
 * @param {number} size - The length of the nanoid (default is 24 for uniqueness calculated above).
 * @returns {string} - The generated nanoid.
 */
export const generate_nanoid = (): string => {
	let result = '';
	for (let i = 0; i < NANOID_SIZE; i++) {
		result += symbols[Math.floor(Math.random() * symbols.length)];
	}
	return result;
};

export const NanoIdColumnOptions: ColumnOptions = {
	type: 'varchar',
	nullable: false,
	unique: true,
	length: NANOID_SIZE
};

@ValidatorConstraint({ async: false })
class IsNanoidConstraint implements ValidatorConstraintInterface {
	validate(value: any) {
		return isNanoid(value);
	}

	defaultMessage(args: ValidationArguments) {
		const fieldName = args.property;
		return `Nanoid ${fieldName} must be a string of ${NANOID_SIZE} characters containing only uppercase letters, lowercase letters, and numbers.`;
	}
}

export function IsNanoid(
	size: number = NANOID_SIZE,
	validationOptions?: ValidationOptions
) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [size],
			validator: IsNanoidConstraint
		});
	};
}

export function IsNanoidList(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: {
				validate(value: any) {
					if (!Array.isArray(value)) {
						return false;
					}

					return isNanoidList(value);
				},
				defaultMessage(args: ValidationArguments) {
					const fieldName = args.property;
					return `Nanoid list ${fieldName} must be an array of strings, each containing ${NANOID_SIZE} characters with only uppercase letters, lowercase letters, and numbers.`;
				}
			}
		});
	};
}

export function isNanoid(value: string) {
	if (typeof value !== 'string' || value.length !== NANOID_SIZE) {
		return false;
	}

	for (let i = 0; i < value.length; i++) {
		if (!symbols.includes(value[i])) {
			return false;
		}
	}
	return true;
}

export function isNanoidList(value: string[]) {
	return value.every(isNanoid);
}

export type NanoId = string;
