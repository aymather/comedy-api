import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicHost } from './entity.dto';

export class FindOneHostParamsDto {
	@IsNanoid()
	host_uid: NanoId;
}

export class FindOneHostResponseDto extends PublicHost {}
