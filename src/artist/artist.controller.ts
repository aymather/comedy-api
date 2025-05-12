import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistBodyDto, CreateArtistResponseDto } from './dto/create.dto';
import {
	DeleteArtistParamsDto,
	DeleteArtistResponseDto
} from './dto/delete.dto';
import { FindOneArtistParamsDto } from './dto/find-one.dto';
import {
	UpdateArtistBodyDto,
	UpdateArtistParamsDto,
	UpdateArtistResponseDto
} from './dto/update.dto';

@Controller('artist')
export class ArtistController {
	constructor(private readonly artistService: ArtistService) {}

	@Get(':artist_uid')
	findOneArtist(@Param() findOneArtistParamsDto: FindOneArtistParamsDto) {
		return this.artistService.findOneArtist(findOneArtistParamsDto);
	}

	@Post()
	createArtist(
		@Body() createArtistBodyDto: CreateArtistBodyDto
	): Promise<CreateArtistResponseDto> {
		return this.artistService.createArtist(createArtistBodyDto);
	}

	@Delete(':artist_uid')
	deleteArtist(
		@Param() deleteArtistParamsDto: DeleteArtistParamsDto
	): Promise<DeleteArtistResponseDto> {
		return this.artistService.deleteArtist(deleteArtistParamsDto);
	}

	@Put(':artist_uid')
	updateArtist(
		@Param() updateArtistParamsDto: UpdateArtistParamsDto,
		@Body() updateArtistBodyDto: UpdateArtistBodyDto
	): Promise<UpdateArtistResponseDto> {
		return this.artistService.updateArtist(
			updateArtistParamsDto,
			updateArtistBodyDto
		);
	}
}
