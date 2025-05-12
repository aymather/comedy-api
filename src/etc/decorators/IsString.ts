import {
	isEmail,
	isPhoneNumber,
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator';
import { getProfanityFilter } from '../esm';

export type StringType = 'date' | 'phone-number' | 'email';

export interface StringValidationOptions {
	minLength?: number;
	maxLength?: number;
	nullable?: boolean; // is the field allowed to be set to `null`? (default: false)
	type?: StringType;
	allowUndefined?: boolean; // is the field allowed to be undefined?
	profanityFilterEnabled?: boolean; // enable profanity filter (default: true)
}

@ValidatorConstraint({ name: 'IsString', async: true })
export class IsStringConstraint implements ValidatorConstraintInterface {
	private readonly iso8601NoMillisRegex =
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

	async validate(value: any, args: ValidationArguments) {
		const [options] = args.constraints as [StringValidationOptions];
		const {
			nullable = false,
			type,
			allowUndefined = false,
			profanityFilterEnabled = true
		} = options || {};

		// Handle undefined values
		if (value === undefined) {
			return allowUndefined === true;
		}

		// Handle null values
		if (value === null) {
			return nullable === true;
		}

		// Check if it's a string
		if (typeof value !== 'string') {
			return false;
		}

		// Validate based on type if specified
		if (type) {
			switch (type) {
				case 'date':
					return this.iso8601NoMillisRegex.test(value);
				case 'phone-number':
					return isPhoneNumber(value);
				case 'email':
					return isEmail(value);
				default:
					return false;
			}
		}

		const { minLength, maxLength } = options || {};

		// Check minimum length
		if (minLength !== undefined && value.length < minLength) {
			return false;
		}

		// Check maximum length
		if (maxLength !== undefined && value.length > maxLength) {
			return false;
		}

		// Check for profanity if enabled
		if (profanityFilterEnabled && getProfanityFilter().isProfane(value)) {
			return false;
		}

		return true;
	}

	defaultMessage(args: ValidationArguments) {
		const [options] = args.constraints as [StringValidationOptions];
		const {
			nullable = false,
			type,
			minLength,
			maxLength,
			profanityFilterEnabled = true
		} = options || {};

		const nullableText = nullable ? ' or null' : '';

		if (
			typeof args.value === 'string' &&
			profanityFilterEnabled &&
			getProfanityFilter().isProfane(args.value)
		) {
			return `${args.property} must not contain profane language${nullableText}`;
		}

		if (type) {
			switch (type) {
				case 'date':
					return `${args.property} must be a valid ISO 8601 date string in UTC without milliseconds${nullableText} (example: 2024-09-11T00:00:00Z)`;
				case 'phone-number':
					return `${args.property} must be a valid phone number${nullableText}`;
				case 'email':
					return `${args.property} must be a valid email address${nullableText}`;
			}
		}

		if (!options) {
			return `${args.property} must be a string${nullableText}`;
		}

		if (minLength !== undefined && maxLength !== undefined) {
			return `${args.property} must be a string between ${minLength} and ${maxLength} characters${nullableText}`;
		}

		if (minLength !== undefined) {
			return `${args.property} must be a string with minimum length of ${minLength} characters${nullableText}`;
		}

		if (maxLength !== undefined) {
			return `${args.property} must be a string with maximum length of ${maxLength} characters${nullableText}`;
		}

		return `${args.property} must be a string${nullableText}`;
	}
}

export function IsString(
	options?: StringValidationOptions,
	validationOptions?: ValidationOptions
) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'IsString',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [options],
			validator: IsStringConstraint
		});
	};
}
