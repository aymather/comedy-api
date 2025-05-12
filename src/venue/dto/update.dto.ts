import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicVenue } from './entity.dto';

export class UpdateVenueParamsDto {
	@IsNanoid()
	host_uid: NanoId;

	@IsNanoid()
	venue_uid: NanoId;
}

export class UpdateVenueBodyDto {
	@IsString({ allowUndefined: true })
	name: string;

	@IsString({ allowUndefined: true, nullable: true })
	place_id: string | null;

	@IsString({ allowUndefined: true, nullable: true })
	description: string | null;

	@IsString({ allowUndefined: true, nullable: true })
	profile_image_url: string | null;

	@IsString({ allowUndefined: true, nullable: true })
	stage_image_url: string | null;
}

export class UpdateVenueResponseDto extends PublicVenue {}
