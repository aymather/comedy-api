import { Expose, Type } from 'class-transformer';
import { MeilisearchSearchVenuesQueryDto } from 'src/delegates/dto/meilisearch.dto';
import { NanoId } from 'src/etc/nanoid';
import { SearchType } from '../types';

export class SearchVenuesQueryDto extends MeilisearchSearchVenuesQueryDto {}

export class VenueSearchItem {
	@Expose()
	readonly venue_uid: NanoId;

	@Expose()
	readonly name: string;

	@Expose()
	readonly searchType = SearchType.venue;

	@Expose()
	readonly profile_image_url: string;
}

export class SearchVenuesResponseDto {
	@Expose()
	@Type(() => VenueSearchItem)
	readonly hits: VenueSearchItem[];

	@Expose()
	readonly query: string;

	@Expose()
	readonly processingTimeMs: number;

	@Expose()
	readonly limit: number;

	@Expose()
	readonly offset: number;

	@Expose()
	readonly estimatedTotalHits: number;
}
