import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleMapsServiceDelegate } from 'src/delegates/google-maps.service';
import { Repository } from 'typeorm';
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
import { Location } from './location.entity';

@Injectable()
export class LocationService {
	constructor(
		@InjectRepository(Location)
		private readonly locationRepository: Repository<Location>,
		private readonly googleMapsServiceDelegate: GoogleMapsServiceDelegate
	) {}

	async create(place_id: string): Promise<Location> {
		const placeDetails = await this.getLocationDetailsByPlaceId({
			place_id
		});
		if (!placeDetails) {
			throw new BadRequestException('Place details not found');
		}
		const polygon = await this.getPolygonForPlace({ place_id });
		const location = this.locationRepository.create({
			place_id: place_id,
			boundary: polygon,
			...placeDetails
		});
		await this.locationRepository.upsert(location, ['place_id']);
		return location;
	}

	autocompleteAddress(
		autocompletePlaceBodyDto: AutocompletePlaceBodyDto
	): Promise<AutocompletePlaceResponseDto> {
		return this.googleMapsServiceDelegate.autocompletePlace(
			autocompletePlaceBodyDto
		);
	}

	autocompleteScene(
		autocompleteSceneBodyDto: AutocompleteSceneBodyDto
	): Promise<GoogleMapsAutocompleteSceneResponseDto> {
		return this.googleMapsServiceDelegate.autocompleteScene(
			autocompleteSceneBodyDto
		);
	}

	getLocationDetailsByPlaceId(
		getLocationDetailsByPlaceIdBodyDto: GetLocationDetailsByPlaceIdBodyDto
	): Promise<LocationDetailsByPlaceIdResponseDto> {
		return this.googleMapsServiceDelegate.getLocationDetailsByPlaceId(
			getLocationDetailsByPlaceIdBodyDto
		);
	}

	getPolygonForPlace(
		getPlacePolygonBodyDto: GetPlacePolygonBodyDto
	): Promise<PlacePolygonResponseDto> {
		return this.googleMapsServiceDelegate.getPolygonForPlace(
			getPlacePolygonBodyDto
		);
	}

	getDriveTime(
		driveTimeQueryDto: DriveTimeQueryDto
	): Promise<DriveTimeResponseDto> {
		return this.googleMapsServiceDelegate.getDriveTime(driveTimeQueryDto);
	}

	geocodeLatLng(
		geocodeLatLngQueryDto: GeocodeLatLngQueryDto
	): Promise<GeocodeLatLngResponseDto> {
		return this.googleMapsServiceDelegate.geocodeLatLng(geocodeLatLngQueryDto);
	}

	geocodePlaceId(
		geocodePlaceIdQueryDto: GeocodePlaceIdQueryDto
	): Promise<GeocodePlaceIdResponseDto> {
		return this.googleMapsServiceDelegate.geocodePlaceId(
			geocodePlaceIdQueryDto
		);
	}
}
