import { Expose, Type } from 'class-transformer';
import { PublicArtist } from 'src/artist/dto/entity.dto';
import { PublicEvent } from 'src/event/dto/entity.dto';

export class PublicEventArtistLink {
	@Expose()
	@Type(() => PublicArtist)
	artist: PublicArtist;

	@Expose()
	@Type(() => PublicEvent)
	event: PublicEvent;
}
