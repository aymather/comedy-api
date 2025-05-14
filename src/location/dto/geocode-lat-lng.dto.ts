import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { GeocodeResponseDto } from './geocode.dto';

export class GeocodeLatLngQueryDto {
	@Expose()
	@IsNotEmpty()
	latitude: number;

	@Expose()
	@IsNotEmpty()
	longitude: number;
}

export class GeocodeLatLngResponseDto extends GeocodeResponseDto {}
