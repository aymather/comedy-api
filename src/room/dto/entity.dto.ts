import { Expose } from 'class-transformer';
import { NanoId } from 'src/etc/nanoid';

export class PublicRoom {
	@Expose()
	room_uid: NanoId;

	@Expose()
	name: string;

	@Expose()
	profile_image_url: string | null;

	@Expose()
	description: string | null;
}
