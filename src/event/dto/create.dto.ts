import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicEvent } from './entity.dto';

export class CreateEventParamsDto {
	@IsNanoid()
	host_uid: NanoId;

	@IsNanoid()
	venue_uid: NanoId;

	@IsNanoid()
	room_uid: NanoId;
}

export class CreateEventBodyDto {
	@IsString()
	name: string;
}

export class CreateEventResponseDto extends PublicEvent {}
