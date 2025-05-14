import { Expose, Type } from 'class-transformer';
import { NanoId } from 'src/etc/nanoid';
import { PublicHost } from 'src/host/dto/entity.dto';
import { PublicLocation } from 'src/location/dto/location.entity';
import { PublicRoom } from 'src/room/dto/entity.dto';
import { PublicVenueImage } from 'src/venue-image/dto/entity.dto';

export class PublicVenue {
	@Expose()
	venue_uid: NanoId;

	@Expose()
	name: string;

	@Expose()
	place_id: string | null;

	@Expose()
	@Type(() => PublicRoom)
	rooms: PublicRoom[];

	@Expose()
	@Type(() => PublicHost)
	host: PublicHost;

	@Expose()
	description: string | null;

	@Expose()
	profile_image_url: string | null;

	@Expose()
	stage_image_url: string | null;

	@Expose()
	@Type(() => PublicVenueImage)
	images: PublicVenueImage[];

	@Expose()
	@Type(() => PublicLocation)
	location: PublicLocation | null;
}
