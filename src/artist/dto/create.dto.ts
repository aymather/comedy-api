import { IsString } from 'src/etc/decorators/IsString';
import { PublicArtist } from './entity.dto';

export class CreateArtistBodyDto {
	@IsString()
	readonly name: string;
}

export class CreateArtistResponseDto extends PublicArtist {}
