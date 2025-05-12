import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { CreateArtistBodyDto } from './dto/create.dto';
import {
	DeleteArtistParamsDto,
	DeleteArtistResponseDto
} from './dto/delete.dto';
import { PublicArtist } from './dto/entity.dto';
import { FindOneArtistParamsDto } from './dto/find-one.dto';
import {
	UpdateArtistBodyDto,
	UpdateArtistParamsDto,
	UpdateArtistResponseDto
} from './dto/update.dto';

@Injectable()
export class ArtistService {
	constructor(
		@InjectRepository(Artist)
		private artistRepository: Repository<Artist>
	) {}

	async findOneArtist(findOneArtistParamsDto: FindOneArtistParamsDto) {
		const artist = await this.artistRepository.findOneByOrFail({
			artist_uid: findOneArtistParamsDto.artist_uid
		});
		return artist.cast(PublicArtist);
	}

	async createArtist(createArtistBodyDto: CreateArtistBodyDto) {
		const artist = this.artistRepository.create(createArtistBodyDto);
		await this.artistRepository.save(artist);
		return artist.cast(PublicArtist);
	}

	async deleteArtist(
		deleteArtistParamsDto: DeleteArtistParamsDto
	): Promise<DeleteArtistResponseDto> {
		const artist = await this.artistRepository.findOneByOrFail({
			artist_uid: deleteArtistParamsDto.artist_uid
		});
		await this.artistRepository.remove(artist);
		return artist.cast(PublicArtist);
	}

	async updateArtist(
		updateArtistParamsDto: UpdateArtistParamsDto,
		updateArtistBodyDto: UpdateArtistBodyDto
	): Promise<UpdateArtistResponseDto> {
		const artist = await this.artistRepository.findOneByOrFail({
			artist_uid: updateArtistParamsDto.artist_uid
		});
		artist.update(updateArtistBodyDto);
		await this.artistRepository.save(artist);
		return artist.cast(PublicArtist);
	}
}
