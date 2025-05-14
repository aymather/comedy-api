import { Expose } from 'class-transformer';
import { IsString } from 'src/etc/decorators/IsString';
import { GoogleMapsAutocompleteResult } from './autocomplete.dto';

export class GoogleMapsAutocompletePlaceBodyDto {
	@Expose()
	@IsString()
	searchText: string;
}

export interface GoogleMapsAutocompletePlaceResponseDto
	extends Array<GoogleMapsAutocompleteResult> {}
