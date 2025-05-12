import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SearchResponse } from 'meilisearch';
import { Artist } from 'src/artist/artist.entity';
import { MeilisearchArtistDocument } from 'src/delegates/dto/meilisearch.dto';
import { MeilisearchServiceDelegate } from 'src/delegates/meilisearch.service';
import { SelectQueryBuilder } from 'typeorm';
import { FindOneArtistDocumentDto } from './dto/find-one-artist-document.dto';
import {
	ArtistSearchItem,
	SearchArtistsQueryDto,
	SearchArtistsResponseDto
} from './dto/search-artists.dto';
import { SearchType } from './types';

@Injectable()
export class SearchService {
	constructor(private meilisearchServiceDelegate: MeilisearchServiceDelegate) {}

	async searchArtists(
		searchArtistsQueryDto: SearchArtistsQueryDto
	): Promise<SearchArtistsResponseDto> {
		const search: SearchResponse<MeilisearchArtistDocument> =
			await this.meilisearchServiceDelegate.searchArtists({
				q: searchArtistsQueryDto.q
			});

		return plainToInstance(SearchArtistsResponseDto, {
			...search,
			hits: search.hits.map(
				(hit) => {
					return plainToInstance(
						ArtistSearchItem,
						{
							artist_uid: hit.artist_uid,
							name: hit.name,
							searchType: hit.search_type,
							rankingScore: hit._rankingScore,
							profile_image_url: hit.profile_image_url
						},
						{ excludeExtraneousValues: true }
					);
				},
				{ excludeExtraneousValues: true }
			)
		});
	}

	async upsertArtist(
		findOneArtistDocumentDto: FindOneArtistDocumentDto,
		selectQueryBuilder: SelectQueryBuilder<Artist>
	) {
		const artist = await selectQueryBuilder
			.setFindOptions({
				where: {
					artist_uid: findOneArtistDocumentDto.artist_uid
				}
			})
			.getOne();

		if (!artist) {
			console.warn(
				`Artist not found for artist_uid: ${findOneArtistDocumentDto.artist_uid}`
			);
			return;
		}

		const document: MeilisearchArtistDocument = {
			artist_uid: artist.artist_uid,
			name: artist.name,
			search_type: SearchType.artist,
			profile_image_url: artist.profile_image_url
		};

		this.meilisearchServiceDelegate.upsertArtists([document]);
	}

	async removeArtist(findOneArtistDocumentDto: FindOneArtistDocumentDto) {
		this.meilisearchServiceDelegate.removeArtist(
			findOneArtistDocumentDto.artist_uid
		);
	}
}
