import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicVenue } from './entity.dto';

export class PatchVenueLocationParamsDto {
	@IsNanoid()
	host_uid: NanoId;

	@IsNanoid()
	venue_uid: NanoId;
}

export class PatchVenueLocationBodyDto {
	@IsString({ allowUndefined: true, nullable: true })
	place_id: string | null;
}

export class PatchVenueLocationResponseDto extends PublicVenue {}
