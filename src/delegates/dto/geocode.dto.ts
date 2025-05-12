import { GeocodeResult } from '@googlemaps/google-maps-services-js';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Polygon } from 'typeorm';

export class GeocodeResponseDto {
	@Expose()
	@IsNotEmpty()
	place_id: string;

	@Expose()
	@IsNotEmpty()
	cityResult: GeocodeResult;

	@Expose()
	@IsNotEmpty()
	polygon: Polygon;
}
