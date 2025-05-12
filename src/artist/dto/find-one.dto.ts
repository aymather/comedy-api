import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicArtist } from './entity.dto';

export class FindOneArtistParamsDto {
	@IsNanoid()
	readonly artist_uid: NanoId;
}

export class FindOneArtistResponseDto extends PublicArtist {}
