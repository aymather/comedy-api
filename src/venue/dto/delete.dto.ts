import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicVenue } from './entity.dto';

export class DeleteVenueParamsDto {
	@IsNanoid()
	host_uid: NanoId;

	@IsNanoid()
	venue_uid: NanoId;
}

export class DeleteVenueResponseDto extends PublicVenue {}
