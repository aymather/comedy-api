import { ValueTransformer } from 'typeorm';

export const bigintTransformer: ValueTransformer = {
	from: (value: any) => parseInt(value),
	to: (value: any) => value
};
