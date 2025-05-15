import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SearchResponse } from 'meilisearch';
import { Artist } from 'src/artist/artist.entity';
import {
	MeilisearchArtistDocument,
	MeilisearchVenueDocument
} from 'src/delegates/dto/meilisearch.dto';
import { MeilisearchServiceDelegate } from 'src/delegates/meilisearch.service';
import { Venue } from 'src/venue/venue.entity';
import { SelectQueryBuilder } from 'typeorm';
import { FindOneArtistDocumentDto } from './dto/find-one-artist-document.dto';
import { FindOneVenueDocumentDto } from './dto/find-one-venue-document.dto';
import {
	ArtistSearchItem,
	SearchArtistsQueryDto,
	SearchArtistsResponseDto
} from './dto/search-artists.dto';
import {
	SearchVenuesQueryDto,
	SearchVenuesResponseDto,
	VenueSearchItem
} from './dto/search-venues.dto';
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

	async searchVenues(
		searchVenuesQueryDto: SearchVenuesQueryDto
	): Promise<SearchVenuesResponseDto> {
		const search: SearchResponse<MeilisearchVenueDocument> =
			await this.meilisearchServiceDelegate.searchVenues({
				q: searchVenuesQueryDto.q
			});

		return plainToInstance(SearchVenuesResponseDto, {
			...search,
			hits: search.hits.map(
				(hit) => {
					return plainToInstance(
						VenueSearchItem,
						{
							venue_uid: hit.venue_uid,
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

	async upsertVenue(
		findOneVenueDocumentDto: FindOneVenueDocumentDto,
		selectQueryBuilder: SelectQueryBuilder<Venue>
	) {
		const venue = await selectQueryBuilder
			.setFindOptions({
				where: {
					venue_uid: findOneVenueDocumentDto.venue_uid
				}
			})
			.getOne();

		if (!venue) {
			console.warn(
				`Venue not found for venue_uid: ${findOneVenueDocumentDto.venue_uid}`
			);
			return;
		}

		const document: MeilisearchVenueDocument = {
			venue_uid: venue.venue_uid,
			name: venue.name,
			search_type: SearchType.venue,
			profile_image_url: venue.profile_image_url
		};

		this.meilisearchServiceDelegate.upsertVenues([document]);
	}

	async removeVenue(findOneVenueDocumentDto: FindOneVenueDocumentDto) {
		this.meilisearchServiceDelegate.removeVenue(
			findOneVenueDocumentDto.venue_uid
		);
	}
}
