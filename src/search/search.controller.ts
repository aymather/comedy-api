import { Controller, Get, Query } from '@nestjs/common';
import {
	SearchArtistsQueryDto,
	SearchArtistsResponseDto
} from './dto/search-artists.dto';
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
}
