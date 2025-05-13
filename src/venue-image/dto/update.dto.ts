import { IsEnum, IsOptional } from 'class-validator';
import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { VenueImageTag } from '../types';
import { PublicVenueImage } from './entity.dto';

export class UpdateVenueImageParamsDto {
	@IsNanoid()
	readonly host_uid: NanoId;

	@IsNanoid()
	readonly venue_uid: NanoId;

	@IsNanoid()
	readonly venue_image_uid: NanoId;
}

export class UpdateVenueImageBodyDto {
	@IsString({ allowUndefined: true })
	readonly url?: string;

	@IsOptional()
	@IsEnum(VenueImageTag)
	readonly tag?: VenueImageTag;
}

export class UpdateVenueImageResponseDto extends PublicVenueImage {}
