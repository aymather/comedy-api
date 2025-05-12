import { IsOptional } from 'class-validator';
import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicEvent } from './entity.dto';

export class FindAllEventsQueryDto {
	@IsOptional()
	@IsNanoid()
	host_uid?: NanoId;

	@IsOptional()
	@IsNanoid()
	venue_uid?: NanoId;

	@IsOptional()
	@IsNanoid()
	room_uid?: NanoId;

	@IsString({ type: 'date', allowUndefined: true, nullable: true })
	date?: string;
}

export class FindAllEventsResponseDto extends Array<PublicEvent> {}
