import { Expose } from 'class-transformer';
import { IsString } from 'src/etc/decorators/IsString';
import { GeocodeResponseDto } from './geocode.dto';

export class GeocodePlaceIdQueryDto {
	@Expose()
	@IsString()
	place_id: string;
}

export class GeocodePlaceIdResponseDto extends GeocodeResponseDto {}
