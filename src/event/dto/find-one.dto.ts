import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicEvent } from './entity.dto';

export class FindOneEventParamsDto {
	@IsNanoid()
	event_uid: NanoId;
}

export class FindOneEventResponseDto extends PublicEvent {}
