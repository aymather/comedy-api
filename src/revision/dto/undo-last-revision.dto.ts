import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicEvent } from 'src/event/dto/entity.dto';

export class UndoLastEventRevisionParamsDto {
	@IsNanoid()
	event_uid: NanoId;
}

export class UndoLastEventRevisionResponseDto extends PublicEvent {}
