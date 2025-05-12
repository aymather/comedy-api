import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicVenue } from './entity.dto';

export class FindOneVenueParamsDto {
	@IsNanoid()
	host_uid: NanoId;

	@IsNanoid()
	venue_uid: NanoId;
}

export class FindOneVenueResponseDto extends PublicVenue {}
