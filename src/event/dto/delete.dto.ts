import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicEvent } from './entity.dto';

export class DeleteEventParamsDto {
	@IsNanoid()
	host_uid: NanoId;

	@IsNanoid()
	venue_uid: NanoId;

	@IsNanoid()
	room_uid: NanoId;

	@IsNanoid()
	event_uid: NanoId;
}

export class DeleteEventResponseDto extends PublicEvent {}
