import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicVenue } from './entity.dto';

export class CreateVenueParamsDto {
	@IsNanoid()
	host_uid: NanoId;
}

export class CreateVenueBodyDto {
	@IsString()
	name: string;

	@IsString()
	place_id: string;
}

export class CreateVenueResponseDto extends PublicVenue {}
