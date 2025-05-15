import { Expose } from 'class-transformer';
import { IsNanoid, NanoId } from 'src/etc/nanoid';

export class FindOneVenueDocumentDto {
	@Expose()
	@IsNanoid()
	readonly venue_uid: NanoId;
}
