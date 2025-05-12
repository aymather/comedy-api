import { Body, Controller, Post } from '@nestjs/common';
import { AutocompletePlaceBodyDto } from 'src/delegates/dto/autocomplete-place.dto';
import { GoogleMapsAutocompletePlaceResponseDto } from 'src/delegates/dto/google-maps-autocomplete-place.dto';
import {
	GetLocationDetailsByPlaceIdBodyDto,
	LocationDetailsByPlaceIdResponseDto
} from 'src/delegates/dto/location-details-by-place-id.dto';
import {
	GetPlacePolygonBodyDto,
	PlacePolygonResponseDto
} from 'src/delegates/dto/polygon.dto';
import { GoogleMapsService } from './google-maps.service';

@Controller('google-maps')
export class GoogleMapsController {
	constructor(private readonly googleMapsService: GoogleMapsService) {}

	@Post('autocomplete-place')
	async autocompletePlace(
		@Body() autocompletePlaceBodyDto: AutocompletePlaceBodyDto
	): Promise<GoogleMapsAutocompletePlaceResponseDto> {
		return this.googleMapsService.autocompletePlace(autocompletePlaceBodyDto);
	}

	@Post('place-details')
	async getLocationDetailsByPlaceId(
		@Body()
		getLocationDetailsByPlaceIdBodyDto: GetLocationDetailsByPlaceIdBodyDto
	): Promise<LocationDetailsByPlaceIdResponseDto> {
		return this.googleMapsService.getLocationDetailsByPlaceId(
			getLocationDetailsByPlaceIdBodyDto
		);
	}

	@Post('place-polygon')
	async getPolygonForPlace(
		@Body() getPlacePolygonBodyDto: GetPlacePolygonBodyDto
	): Promise<PlacePolygonResponseDto> {
		return this.googleMapsService.getPolygonForPlace(getPlacePolygonBodyDto);
	}
}
