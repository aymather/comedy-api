import { Expose, Type } from 'class-transformer';
import { NanoId } from 'src/etc/nanoid';
import { PublicEventArtistLink } from 'src/event-artist-link/dto/entity.dto';
import { PublicRoom } from 'src/room/dto/entity.dto';
import { PublicVenue } from 'src/venue/dto/entity.dto';

export class PublicEvent {
	@Expose()
	event_uid: NanoId;

	@Expose()
	@Type(() => PublicRoom)
	room: PublicRoom;

	@Expose()
	@Type(() => PublicEventArtistLink)
	artists: PublicEventArtistLink[];

	@Expose()
	@Type(() => PublicVenue)
	venue: PublicVenue;

	@Expose()
	name: string;

	@Expose()
	image_url: string | null;

	@Expose()
	description: string | null;

	@Expose()
	doors_time: Date | null;

	@Expose()
	start_time: Date | null;

	@Expose()
	end_time: Date | null;

	@Expose()
	two_drink_minimum: boolean;

	@Expose()
	phone_free_zone: boolean;

	@Expose()
	serves_alcohol: boolean;

	@Expose()
	serves_food: boolean;

	@Expose()
	twenty_one_plus: boolean;

	@Expose()
	sold_out: boolean | null;

	@Expose()
	event_link: string | null;

	@Expose()
	ticket_link: string | null;
}
