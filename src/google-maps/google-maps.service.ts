import { Injectable } from '@nestjs/common';
import { AutocompletePlaceBodyDto } from 'src/delegates/dto/autocomplete-place.dto';
import {
	GetLocationDetailsByPlaceIdBodyDto,
	LocationDetailsByPlaceIdResponseDto
} from 'src/delegates/dto/location-details-by-place-id.dto';
import {
	GetPlacePolygonBodyDto,
	PlacePolygonResponseDto
} from 'src/delegates/dto/polygon.dto';
import { GoogleMapsServiceDelegate } from 'src/delegates/google-maps.service';

@Injectable()
export class GoogleMapsService {
	constructor(
		private readonly googleMapsServiceDelegate: GoogleMapsServiceDelegate
	) {}

	async autocompletePlace(autocompletePlaceBodyDto: AutocompletePlaceBodyDto) {
		return this.googleMapsServiceDelegate.autocompletePlace(
			autocompletePlaceBodyDto
		);
	}

	async getLocationDetailsByPlaceId(
		getLocationDetailsByPlaceIdBodyDto: GetLocationDetailsByPlaceIdBodyDto
	): Promise<LocationDetailsByPlaceIdResponseDto> {
		return this.googleMapsServiceDelegate.getLocationDetailsByPlaceId(
			getLocationDetailsByPlaceIdBodyDto
		);
	}

	async getPolygonForPlace(
		getPlacePolygonBodyDto: GetPlacePolygonBodyDto
	): Promise<PlacePolygonResponseDto | null> {
		return this.googleMapsServiceDelegate.getPolygonForPlace(
			getPlacePolygonBodyDto
		);
	}
}
