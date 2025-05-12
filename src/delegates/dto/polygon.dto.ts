import { Expose } from 'class-transformer';
import { IsString } from 'src/etc/decorators/IsString';
import { Polygon } from 'typeorm';

export class GetPlacePolygonBodyDto {
	@Expose()
	@IsString()
	place_id: string;
}

export interface PlacePolygonResponseDto extends Polygon {}
