import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicRoom } from './entity.dto';

export class FindOneRoomParamsDto {
	@IsNanoid()
	host_uid: NanoId;

	@IsNanoid()
	venue_uid: NanoId;

	@IsNanoid()
	room_uid: NanoId;
}

export class FindOneRoomResponseDto extends PublicRoom {}
