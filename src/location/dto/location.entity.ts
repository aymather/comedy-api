import { AddressComponent, LatLng } from '@googlemaps/google-maps-services-js';
import { Expose } from 'class-transformer';
import { Polygon } from 'typeorm';

export class PublicLocation {
	@Expose()
	readonly latitude: number;

	@Expose()
	readonly longitude: number;

	@Expose()
	readonly place_id: string | null;

	@Expose()
	readonly name: string | null;

	@Expose()
	readonly formatted_address: string | null;

	@Expose()
	readonly boundary: Polygon | null;

	@Expose()
	readonly address_components: AddressComponent[] | null;

	@Expose()
	readonly viewport: LatLng | null;
}
