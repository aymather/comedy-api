import { Expose } from 'class-transformer';
import { IsNanoid } from 'src/etc/nanoid';

export class FindOneArtistDocumentDto {
	@Expose()
	@IsNanoid()
	readonly artist_uid: string;
}
