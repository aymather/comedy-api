import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicHost } from './entity.dto';

export class UpdateHostParamsDto {
	@IsNanoid()
	host_uid: NanoId;
}

export class UpdateHostBodyDto {
	@IsString({ allowUndefined: true })
	name: string;

	@IsString({ allowUndefined: true })
	profile_image_url: string;
}

export class UpdateHostResponseDto extends PublicHost {}
