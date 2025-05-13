import { Expose } from 'class-transformer';
import { NanoId } from 'src/etc/nanoid';
import { VenueImageTag } from '../types';

export class PublicVenueImage {
	@Expose()
	venue_image_uid: NanoId;

	@Expose()
	url: string;

	@Expose()
	tag: VenueImageTag;
}
