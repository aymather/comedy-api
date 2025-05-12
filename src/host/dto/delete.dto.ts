import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicHost } from './entity.dto';

export class DeleteHostParamsDto {
	@IsNanoid()
	host_uid: NanoId;
}

export class DeleteHostResponseDto extends PublicHost {}
