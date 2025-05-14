import {
	AddressComponent,
	LatLngBounds
} from '@googlemaps/google-maps-services-js';
import { Expose } from 'class-transformer';
import { IsString } from 'src/etc/decorators/IsString';

export class GetLocationDetailsByPlaceIdBodyDto {
	@Expose()
	@IsString()
	place_id: string;
}

export class LocationDetails {
	@Expose()
	place_id: string;

	@Expose()
	name: string;

	@Expose()
	formatted_address: string;

	@Expose()
	latitude: number;

	@Expose()
	longitude: number;

	@Expose()
	viewport: LatLngBounds;

	@Expose()
	address_components: AddressComponent[];
}

export class LocationDetailsByPlaceIdResponseDto extends LocationDetails {}
