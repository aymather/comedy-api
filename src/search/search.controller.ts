import { Controller, Get, Query } from '@nestjs/common';
import {
	SearchArtistsQueryDto,
	SearchArtistsResponseDto
} from './dto/search-artists.dto';
import {
	SearchVenuesQueryDto,
	SearchVenuesResponseDto
} from './dto/search-venues.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get('artists')
	searchArtists(
		@Query() searchArtistsQueryDto: SearchArtistsQueryDto
	): Promise<SearchArtistsResponseDto> {
		return this.searchService.searchArtists(searchArtistsQueryDto);
	}

	@Get('venues')
	searchVenues(
		@Query() searchVenuesQueryDto: SearchVenuesQueryDto
	): Promise<SearchVenuesResponseDto> {
		return this.searchService.searchVenues(searchVenuesQueryDto);
	}
}
