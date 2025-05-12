import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicRoom } from './entity.dto';

export class CreateRoomParamsDto {
	@IsNanoid()
	host_uid: NanoId;

	@IsNanoid()
	venue_uid: NanoId;
}

export class CreateRoomBodyDto {
	@IsString()
	name: string;
}

export class CreateRoomResponseDto extends PublicRoom {}
