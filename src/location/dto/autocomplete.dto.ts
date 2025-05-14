import { Expose } from 'class-transformer';

export class GoogleMapsAutocompleteResult {
	@Expose()
	place_id: string;

	@Expose()
	description: string;

	@Expose()
	main_text: string;

	@Expose()
	secondary_text: string;
}
