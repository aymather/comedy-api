import {
	AddressType,
	Client,
	PlaceAutocompleteType
} from '@googlemaps/google-maps-services-js';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { ConfigManagerService } from 'src/config-manager/config-manager.service';
import { GoogleMapsConfig } from 'src/etc/types/config-manager';
import {
	AutocompleteSceneBodyDto,
	GoogleMapsAutocompleteSceneResponseDto
} from '../location/dto/autocomplete-scene.dto';
import {
	DriveTimeQueryDto,
	DriveTimeResponseDto
} from '../location/dto/drive-time.dto';
import {
	GeocodeLatLngQueryDto,
	GeocodeLatLngResponseDto
} from '../location/dto/geocode-lat-lng.dto';
import {
	GeocodePlaceIdQueryDto,
	GeocodePlaceIdResponseDto
} from '../location/dto/geocode-place-id.dto';
import {
	GoogleMapsAutocompletePlaceBodyDto,
	GoogleMapsAutocompletePlaceResponseDto
} from '../location/dto/google-maps-autocomplete-place.dto';
import {
	GetLocationDetailsByPlaceIdBodyDto,
	LocationDetailsByPlaceIdResponseDto
} from '../location/dto/location-details-by-place-id.dto';
import {
	GetPlacePolygonBodyDto,
	PlacePolygonResponseDto
} from '../location/dto/polygon.dto';
import { HttpBaseDelegate } from './base.delegate';

@Injectable()
export class GoogleMapsServiceDelegate extends HttpBaseDelegate {
	protected readonly httpClient: AxiosInstance;
	private readonly googleMapsConfig: GoogleMapsConfig;
	private readonly client: Client;
	constructor(private configManagerService: ConfigManagerService) {
		super();
		this.googleMapsConfig = configManagerService.initGoogleMapsConfig();
		this.client = new Client();
	}

	async autocompletePlace(
		googleMapsAutocompletePlaceBodyDto: GoogleMapsAutocompletePlaceBodyDto
	): Promise<GoogleMapsAutocompletePlaceResponseDto> {
		try {
			const response = await this.client.placeAutocomplete({
				params: {
					input: googleMapsAutocompletePlaceBodyDto.searchText,
					key: this.googleMapsConfig.apiKey
				}
			});

			if (!response.data.predictions) {
				return [];
			}

			return response.data.predictions.map((prediction) => ({
				place_id: prediction.place_id,
				description: prediction.description,
				main_text: prediction.structured_formatting.main_text,
				secondary_text: prediction.structured_formatting.secondary_text
			}));
		} catch (error) {
			throw new Error(`Failed to autocomplete place: ${error.message}`);
		}
	}

	async autocompleteScene(
		autocompleteSceneBodyDto: AutocompleteSceneBodyDto
	): Promise<GoogleMapsAutocompleteSceneResponseDto> {
		try {
			const response = await this.client.placeAutocomplete({
				params: {
					input: autocompleteSceneBodyDto.searchText,
					key: this.googleMapsConfig.apiKey,
					types: PlaceAutocompleteType.cities
				}
			});

			if (!response.data.predictions) {
				return [];
			}

			return response.data.predictions.map((prediction) => ({
				place_id: prediction.place_id,
				description: prediction.description,
				main_text: prediction.structured_formatting.main_text,
				secondary_text: prediction.structured_formatting.secondary_text
			}));
		} catch (error) {
			throw new Error(
				`Failed to autocomplete scene location: ${error.message}`
			);
		}
	}

	async getLocationDetailsByPlaceId(
		getLocationDetailsByPlaceIdBodyDto: GetLocationDetailsByPlaceIdBodyDto
	): Promise<LocationDetailsByPlaceIdResponseDto | null> {
		try {
			const response = await this.client.placeDetails({
				params: {
					place_id: getLocationDetailsByPlaceIdBodyDto.place_id,
					key: this.googleMapsConfig.apiKey,
					fields: [
						'geometry',
						'formatted_address',
						'address_components',
						'place_id',
						'name'
					]
				}
			});

			if (!response.data.result) {
				throw new Error('No location details found');
			}

			const result = response.data.result;

			return {
				place_id: result.place_id,
				name: result.name,
				formatted_address: result.formatted_address,
				latitude: result.geometry.location.lat,
				longitude: result.geometry.location.lng,
				viewport: {
					northeast: {
						lat: result.geometry.viewport.northeast.lat,
						lng: result.geometry.viewport.northeast.lng
					},
					southwest: {
						lat: result.geometry.viewport.southwest.lat,
						lng: result.geometry.viewport.southwest.lng
					}
				},
				address_components: result.address_components
			};
		} catch (error) {
			if (
				error.response?.data?.status === 'INVALID_REQUEST' ||
				error.response?.data?.status === 'NOT_FOUND'
			) {
				return null;
			}

			throw new Error(`Failed to get location details: ${error.message}`);
		}
	}

	async getPolygonForPlace(
		getPlacePolygonBodyDto: GetPlacePolygonBodyDto
	): Promise<PlacePolygonResponseDto | null> {
		try {
			// Get more detailed boundary using Geocoding API
			const geocodeResponse = await this.client.geocode({
				params: {
					place_id: getPlacePolygonBodyDto.place_id,
					key: this.googleMapsConfig.apiKey
				}
			});

			const bounds = geocodeResponse.data.results?.[0]?.geometry?.bounds;

			if (!bounds) {
				return null;
			}

			// Create polygon from bounds
			return {
				type: 'Polygon',
				coordinates: [
					[
						[bounds.southwest.lng, bounds.southwest.lat],
						[bounds.northeast.lng, bounds.southwest.lat],
						[bounds.northeast.lng, bounds.northeast.lat],
						[bounds.southwest.lng, bounds.northeast.lat],
						[bounds.southwest.lng, bounds.southwest.lat]
					]
				]
			};
		} catch (error) {
			console.log(`Failed to get place polygon: ${error.message}`);
			return null;
		}
	}

	async getDriveTime(
		driveTimeQueryDto: DriveTimeQueryDto
	): Promise<DriveTimeResponseDto> {
		const response = await this.client.directions({
			params: {
				origin: `${driveTimeQueryDto.from_latitude},${driveTimeQueryDto.from_longitude}`,
				destination: `${driveTimeQueryDto.to_latitude},${driveTimeQueryDto.to_longitude}`,
				key: this.googleMapsConfig.apiKey
			}
		});

		if (!response.data.routes?.[0]?.legs?.[0]?.duration) {
			throw new Error('No drive time found');
		}

		const durationInSeconds = response.data.routes[0].legs[0].duration.value;
		const totalMinutes = Math.round(durationInSeconds / 60);

		return {
			hours: Math.floor(totalMinutes / 60),
			minutes: totalMinutes % 60
		};
	}

	async geocodeLatLng(
		geocodeLatLngQueryDto: GeocodeLatLngQueryDto
	): Promise<GeocodeLatLngResponseDto> {
		const response = await this.client.geocode({
			params: {
				address: `${geocodeLatLngQueryDto.latitude},${geocodeLatLngQueryDto.longitude}`,
				key: this.googleMapsConfig.apiKey
			}
		});
		const cityResult = response.data.results.find(
			(result) =>
				result.types.includes(AddressType.locality) ||
				result.types.includes(AddressType.administrative_area_level_1)
		);
		if (!cityResult) {
			throw new BadRequestException('No city found');
		}
		const { place_id } = cityResult;
		const polygon = await this.getPolygonForPlace({ place_id });
		return {
			place_id,
			cityResult,
			polygon
		};
	}

	async geocodePlaceId(
		geocodePlaceIdQueryDto: GeocodePlaceIdQueryDto
	): Promise<GeocodePlaceIdResponseDto> {
		const response = await this.client.geocode({
			params: {
				place_id: geocodePlaceIdQueryDto.place_id,
				key: this.googleMapsConfig.apiKey
			}
		});
		const cityResult = response.data.results[0];
		if (!cityResult) {
			throw new BadRequestException('No result found');
		}
		const polygon = await this.getPolygonForPlace({
			place_id: geocodePlaceIdQueryDto.place_id
		});
		return {
			place_id: cityResult.place_id,
			cityResult: cityResult,
			polygon
		};
	}
}
