import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { ValueTransformer } from 'typeorm';

// Extend dayjs with the utc plugin
dayjs.extend(utc);

export const isoUtcTransformer: ValueTransformer = {
	from: (value: any) => {
		// Return null if the value is null, or format it as UTC otherwise
		return !value ? null : dayjs(value).utc().format();
	},
	to: (value: any) => {
		return value;
	}
};

export const isoUtcTransformerWithMilliseconds: ValueTransformer = {
	from: (value: any) => {
		return !value
			? null
			: dayjs(value).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
	},
	to: (value: any) => {
		return value;
	}
};
