import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicVenueImage } from './entity.dto';

export class DeleteVenueImageParamsDto {
	@IsNanoid()
	readonly host_uid: NanoId;

	@IsNanoid()
	readonly venue_uid: NanoId;

	@IsNanoid()
	readonly venue_image_uid: NanoId;
}

export class DeleteVenueImageResponseDto extends PublicVenueImage {}
