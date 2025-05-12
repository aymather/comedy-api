import { IsBoolean, IsOptional } from 'class-validator';
import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicEvent } from './entity.dto';

export class UpdateEventParamsDto {
	@IsNanoid()
	host_uid: NanoId;

	@IsNanoid()
	venue_uid: NanoId;

	@IsNanoid()
	room_uid: NanoId;

	@IsNanoid()
	event_uid: NanoId;
}

export class UpdateEventBodyDto {
	@IsString({ allowUndefined: true })
	name: string;

	@IsString({ allowUndefined: true })
	description: string;

	@IsString({ allowUndefined: true, type: 'date' })
	doors_time: Date;

	@IsString({ allowUndefined: true, type: 'date' })
	start_time: Date;

	@IsString({ allowUndefined: true, type: 'date' })
	end_time: Date;

	@IsBoolean()
	@IsOptional()
	two_drink_minimum: boolean;

	@IsBoolean()
	@IsOptional()
	phone_free_zone: boolean;

	@IsBoolean()
	@IsOptional()
	serves_alcohol: boolean;

	@IsBoolean()
	@IsOptional()
	serves_food: boolean;

	@IsBoolean()
	@IsOptional()
	twenty_one_plus: boolean;
}

export class UpdateEventResponseDto extends PublicEvent {}
