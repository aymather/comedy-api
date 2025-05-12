import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicVenue } from './entity.dto';

export class FindAllVenueParamsDto {
	@IsNanoid()
	host_uid: NanoId;
}

export class FindAllVenueResponseDto extends Array<PublicVenue> {}
