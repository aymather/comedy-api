import { Expose } from 'class-transformer';
import { IsString } from 'src/etc/decorators/IsString';
import { GoogleMapsAutocompleteResult } from './autocomplete.dto';

export class AutocompleteSceneBodyDto {
	@Expose()
	@IsString()
	searchText: string;
}

export class GoogleMapsAutocompleteSceneResponseDto extends Array<GoogleMapsAutocompleteResult> {}
