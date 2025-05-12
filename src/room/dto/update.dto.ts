import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicRoom } from './entity.dto';

export class UpdateRoomParamsDto {
	@IsNanoid()
	host_uid: NanoId;

	@IsNanoid()
	venue_uid: NanoId;

	@IsNanoid()
	room_uid: NanoId;
}

export class UpdateRoomBodyDto {
	@IsString({ allowUndefined: true })
	name: string;

	@IsString({ allowUndefined: true, nullable: true })
	description: string | null;

	@IsString({ allowUndefined: true, nullable: true })
	profile_image_url: string | null;
}

export class UpdateRoomResponseDto extends PublicRoom {}
