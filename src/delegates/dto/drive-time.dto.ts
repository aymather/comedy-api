import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DriveTimeQueryDto {
	@Expose()
	@Type(() => Number)
	@IsNotEmpty()
	to_latitude: number;

	@Expose()
	@Type(() => Number)
	@IsNotEmpty()
	to_longitude: number;

	@Expose()
	@Type(() => Number)
	@IsNotEmpty()
	from_latitude: number;

	@Expose()
	@Type(() => Number)
	@IsNotEmpty()
	from_longitude: number;
}

export class DriveTimeResponseDto {
	@Expose()
	@Type(() => Number)
	minutes: number;

	@Expose()
	@Type(() => Number)
	hours: number;
}
