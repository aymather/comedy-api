import { Expose } from 'class-transformer';
import { IsNanoid, NanoId } from 'src/etc/nanoid';

export class FindOneArtistDocumentDto {
	@Expose()
	@IsNanoid()
	readonly artist_uid: NanoId;
}
