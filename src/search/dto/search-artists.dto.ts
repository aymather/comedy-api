import { Expose, Type } from 'class-transformer';
import { MeilisearchSearchArtistsQueryDto } from 'src/delegates/dto/meilisearch.dto';
import { NanoId } from 'src/etc/nanoid';
import { SearchType } from '../types';

export class SearchArtistsQueryDto extends MeilisearchSearchArtistsQueryDto {}

export class ArtistSearchItem {
	@Expose()
	readonly artist_uid: NanoId;

	@Expose()
	readonly name: string;

	@Expose()
	readonly searchType = SearchType.artist;

	@Expose()
	readonly profile_image_url: string;
}

export class SearchArtistsResponseDto {
	@Expose()
	@Type(() => ArtistSearchItem)
	readonly hits: ArtistSearchItem[];

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
