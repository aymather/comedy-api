import { IsEnum } from 'class-validator';
import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { VenueImageTag } from '../types';
import { PublicVenueImage } from './entity.dto';

export class CreateVenueImageParamsDto {
	@IsNanoid()
	readonly host_uid: NanoId;

	@IsNanoid()
	readonly venue_uid: NanoId;
}

export class CreateVenueImageBodyDto {
	@IsString()
	readonly url: string;

	@IsEnum(VenueImageTag)
	readonly tag: VenueImageTag;
}

export class CreateVenueImageResponseDto extends PublicVenueImage {}
