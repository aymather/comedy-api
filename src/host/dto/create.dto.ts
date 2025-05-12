import { IsString } from 'src/etc/decorators/IsString';
import { PublicHost } from './entity.dto';

export class CreateHostBodyDto {
	@IsString()
	name: string;
}

export class CreateHostResponseDto extends PublicHost {}
