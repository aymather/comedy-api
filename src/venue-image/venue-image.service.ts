import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from 'src/venue/venue.entity';
import { Repository } from 'typeorm';
import {
	CreateVenueImageBodyDto,
	CreateVenueImageParamsDto,
	CreateVenueImageResponseDto
} from './dto/create.dto';
import {
	DeleteVenueImageParamsDto,
	DeleteVenueImageResponseDto
} from './dto/delete.dto';
import { PublicVenueImage } from './dto/entity.dto';
import {
	UpdateVenueImageBodyDto,
	UpdateVenueImageParamsDto,
	UpdateVenueImageResponseDto
} from './dto/update.dto';
import { VenueImage } from './venue-image.entity';

@Injectable()
export class VenueImageService {
	constructor(
		@InjectRepository(VenueImage)
		private readonly venueImageRepository: Repository<VenueImage>,
		@InjectRepository(Venue)
		private readonly venueRepository: Repository<Venue>
	) {}

	async create(
		createVenueImageParamsDto: CreateVenueImageParamsDto,
		createVenueImageBodyDto: CreateVenueImageBodyDto
	): Promise<CreateVenueImageResponseDto> {
		const venue = await this.venueRepository.findOneByOrFail({
			venue_uid: createVenueImageParamsDto.venue_uid,
			host: {
				host_uid: createVenueImageParamsDto.host_uid
			}
		});

		const newVenueImage = this.venueImageRepository.create({
			venue,
			...createVenueImageBodyDto
		});

		await this.venueImageRepository.save(newVenueImage);
		return newVenueImage.cast(PublicVenueImage);
	}

	async delete(
		deleteVenueImageParamsDto: DeleteVenueImageParamsDto
	): Promise<DeleteVenueImageResponseDto> {
		const venueImage = await this.venueImageRepository.findOneByOrFail({
			venue_image_uid: deleteVenueImageParamsDto.venue_image_uid,
			venue: {
				venue_uid: deleteVenueImageParamsDto.venue_uid,
				host: {
					host_uid: deleteVenueImageParamsDto.host_uid
				}
			}
		});

		await this.venueImageRepository.remove(venueImage);
		return venueImage.cast(PublicVenueImage);
	}

	async update(
		updateVenueImageParamsDto: UpdateVenueImageParamsDto,
		updateVenueImageBodyDto: UpdateVenueImageBodyDto
	): Promise<UpdateVenueImageResponseDto> {
		const venueImage = await this.venueImageRepository.findOneByOrFail({
			venue_image_uid: updateVenueImageParamsDto.venue_image_uid,
			venue: {
				venue_uid: updateVenueImageParamsDto.venue_uid,
				host: {
					host_uid: updateVenueImageParamsDto.host_uid
				}
			}
		});

		venueImage.update(updateVenueImageBodyDto);
		await this.venueImageRepository.save(venueImage);
		return venueImage.cast(PublicVenueImage);
	}
}
