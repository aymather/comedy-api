import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
	AutocompletePlaceBodyDto,
	AutocompletePlaceResponseDto
} from './dto/autocomplete-place.dto';
import {
	AutocompleteSceneBodyDto,
	GoogleMapsAutocompleteSceneResponseDto
} from './dto/autocomplete-scene.dto';
import { DriveTimeQueryDto, DriveTimeResponseDto } from './dto/drive-time.dto';
import {
	GeocodeLatLngQueryDto,
	GeocodeLatLngResponseDto
} from './dto/geocode-lat-lng.dto';
import {
	GeocodePlaceIdQueryDto,
	GeocodePlaceIdResponseDto
} from './dto/geocode-place-id.dto';
import {
	GetLocationDetailsByPlaceIdBodyDto,
	LocationDetailsByPlaceIdResponseDto
} from './dto/location-details-by-place-id.dto';
import {
	GetPlacePolygonBodyDto,
	PlacePolygonResponseDto
} from './dto/polygon.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
	constructor(private readonly locationService: LocationService) {}

	@Post('autocomplete-place')
	autocompleteAddress(
		@Body() autocompleteAddressBodyDto: AutocompletePlaceBodyDto
	): Promise<AutocompletePlaceResponseDto> {
		return this.locationService.autocompleteAddress(autocompleteAddressBodyDto);
	}

	@Post('autocomplete-scene')
	autocompleteScene(
		@Body() autocompleteSceneBodyDto: AutocompleteSceneBodyDto
	): Promise<GoogleMapsAutocompleteSceneResponseDto> {
		return this.locationService.autocompleteScene(autocompleteSceneBodyDto);
	}

	@Post('place')
	getLocationDetailsByPlaceId(
		@Body()
		getLocationDetailsByPlaceIdBodyDto: GetLocationDetailsByPlaceIdBodyDto
	): Promise<LocationDetailsByPlaceIdResponseDto> {
		return this.locationService.getLocationDetailsByPlaceId(
			getLocationDetailsByPlaceIdBodyDto
		);
	}

	@Post('polygon')
	getPlacePolygon(
		@Body() getPlacePolygonBodyDto: GetPlacePolygonBodyDto
	): Promise<PlacePolygonResponseDto> {
		return this.locationService.getPolygonForPlace(getPlacePolygonBodyDto);
	}

	@Get('directions')
	getDriveTime(
		@Query() driveTimeQueryDto: DriveTimeQueryDto
	): Promise<DriveTimeResponseDto> {
		return this.locationService.getDriveTime(driveTimeQueryDto);
	}

	@Get('geocode/lat-lng')
	geocodeLatLng(
		@Query() geocodeLatLngQueryDto: GeocodeLatLngQueryDto
	): Promise<GeocodeLatLngResponseDto> {
		return this.locationService.geocodeLatLng(geocodeLatLngQueryDto);
	}

	@Get('geocode/place')
	geocodeByPlaceId(
		@Query() geocodePlaceIdQueryDto: GeocodePlaceIdQueryDto
	): Promise<GeocodePlaceIdResponseDto> {
		return this.locationService.geocodePlaceId(geocodePlaceIdQueryDto);
	}
}
