import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicArtist } from './entity.dto';

export class UpdateArtistParamsDto {
	@IsNanoid()
	artist_uid: NanoId;
}

export class UpdateArtistBodyDto {
	@IsString({ allowUndefined: true, nullable: false })
	name: string;

	@IsString({ allowUndefined: true, nullable: true })
	image_url: string;
}

export class UpdateArtistResponseDto extends PublicArtist {}
