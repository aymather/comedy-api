import { IsNanoid, NanoId } from 'src/etc/nanoid';

export class AddArtistParamsDto {
	@IsNanoid()
	host_uid: NanoId;

	@IsNanoid()
	venue_uid: NanoId;

	@IsNanoid()
	event_uid: NanoId;

	@IsNanoid()
	artist_uid: NanoId;
}
