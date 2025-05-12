import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicRoom } from './entity.dto';

export class FindAllRoomParamsDto {
	@IsNanoid()
	host_uid: NanoId;
}

export class FindAllRoomResponseDto extends Array<PublicRoom> {}
