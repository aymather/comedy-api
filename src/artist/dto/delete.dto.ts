import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicArtist } from './entity.dto';

export class DeleteArtistParamsDto {
	@IsNanoid()
	readonly artist_uid: NanoId;
}

export class DeleteArtistResponseDto extends PublicArtist {}
