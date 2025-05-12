import { SearchResponse } from 'meilisearch';
import { IsString } from 'src/etc/decorators/IsString';
import { NanoId } from 'src/etc/nanoid';
import { SearchType } from 'src/search/types';

export class MeilisearchArtistDocument {
	artist_uid: NanoId;
	profile_image_url: string;
	name: string;
	search_type: SearchType;
}

export class MeilisearchSearchArtistsQueryDto {
	@IsString({ allowUndefined: true, nullable: true })
	q: string;
}

export type MeilisearchSearchArtistsResponseDto =
	SearchResponse<MeilisearchArtistDocument>;
