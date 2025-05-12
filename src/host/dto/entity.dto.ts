import { Expose, Type } from 'class-transformer';
import { NanoId } from 'src/etc/nanoid';
import { PublicVenue } from 'src/venue/dto/entity.dto';
import { HostType } from './types';

export class PublicHost {
	@Expose()
	host_uid: NanoId;

	@Expose()
	name: string;

	@Expose()
	profile_image_url: string | null;

	@Expose()
	type: HostType;

	@Expose()
	@Type(() => PublicVenue)
	venues: PublicVenue[];

	@Expose()
	place_id: string | null;

	@Expose()
	website_url: string | null;

	@Expose()
	instagram_url: string | null;

	@Expose()
	instagram_handle: string | null;

	@Expose()
	tiktok_url: string | null;

	@Expose()
	tiktok_handle: string | null;

	@Expose()
	facebook_url: string | null;

	@Expose()
	facebook_handle: string | null;

	@Expose()
	x_url: string | null;

	@Expose()
	x_handle: string | null;

	@Expose()
	youtube_url: string | null;

	@Expose()
	youtube_handle: string | null;
}
