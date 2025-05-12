import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { GoogleMapsAutocompleteResult } from './autocomplete.dto';

export class AutocompletePlaceBodyDto {
	@Expose()
	@IsString()
	searchText: string;
}

export interface AutocompletePlaceResponseDto
	extends Array<GoogleMapsAutocompleteResult> {}
