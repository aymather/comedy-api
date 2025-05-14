import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Host } from 'src/host/host.entity';
import { LocationService } from 'src/location/location.service';
import { Repository } from 'typeorm';
import {
	CreateVenueBodyDto,
	CreateVenueParamsDto,
	CreateVenueResponseDto
} from './dto/create.dto';
import { DeleteVenueParamsDto, DeleteVenueResponseDto } from './dto/delete.dto';
import { PublicVenue } from './dto/entity.dto';
import {
	FindAllVenueParamsDto,
	FindAllVenueResponseDto
} from './dto/find-all.dto';
import {
	FindOneVenueParamsDto,
	FindOneVenueResponseDto
} from './dto/find-one.dto';
import {
	PatchVenueLocationBodyDto,
	PatchVenueLocationParamsDto,
	PatchVenueLocationResponseDto
} from './dto/patch-location.dto';
import {
	UpdateVenueBodyDto,
	UpdateVenueParamsDto,
	UpdateVenueResponseDto
} from './dto/update.dto';
import { Venue } from './venue.entity';

@Injectable()
export class VenueService {
	constructor(
		@InjectRepository(Venue)
		private readonly venuesRepository: Repository<Venue>,
		@InjectRepository(Host)
		private readonly hostsRepository: Repository<Host>,
		private readonly locationService: LocationService
	) {}

	async findAll(
		findAllVenueParamsDto: FindAllVenueParamsDto
	): Promise<FindAllVenueResponseDto> {
		const venues = await this.venuesRepository.find({
			where: {
				host: { host_uid: findAllVenueParamsDto.host_uid }
			},
			relations: ['rooms', 'images', 'host']
		});
		return venues.map((venue) => venue.cast(PublicVenue));
	}

	async findOne(
		findOneVenueParamsDto: FindOneVenueParamsDto
	): Promise<FindOneVenueResponseDto> {
		const venue = await this.venuesRepository.findOneOrFail({
			where: { venue_uid: findOneVenueParamsDto.venue_uid },
			relations: ['rooms', 'images', 'host']
		});
		return venue.cast(PublicVenue);
	}

	async create(
		createVenueParamsDto: CreateVenueParamsDto,
		createVenueBodyDto: CreateVenueBodyDto
	): Promise<CreateVenueResponseDto> {
		const host = await this.hostsRepository.findOneOrFail({
			where: { host_uid: createVenueParamsDto.host_uid }
		});

		const venue = this.venuesRepository.create({
			host,
			...createVenueBodyDto
		});
		await this.venuesRepository.save(venue);
		return venue.cast(PublicVenue);
	}

	async delete(
		deleteVenueParamsDto: DeleteVenueParamsDto
	): Promise<DeleteVenueResponseDto> {
		const venue = await this.venuesRepository.findOneOrFail({
			where: { venue_uid: deleteVenueParamsDto.venue_uid }
		});

		await this.venuesRepository.delete(venue.venue_id);
		return venue.cast(PublicVenue);
	}

	async update(
		updateVenueParamsDto: UpdateVenueParamsDto,
		updateVenueBodyDto: UpdateVenueBodyDto
	): Promise<UpdateVenueResponseDto> {
		const venue = await this.venuesRepository.findOneOrFail({
			where: { venue_uid: updateVenueParamsDto.venue_uid }
		});

		venue.update(updateVenueBodyDto);

		await this.venuesRepository.save(venue);
		return venue.cast(PublicVenue);
	}

	async patchVenueLocation(
		patchVenueLocationParamsDto: PatchVenueLocationParamsDto,
		patchVenueLocationBodyDto: PatchVenueLocationBodyDto
	): Promise<PatchVenueLocationResponseDto> {
		const venue = await this.venuesRepository.findOneOrFail({
			where: {
				venue_uid: patchVenueLocationParamsDto.venue_uid,
				host: { host_uid: patchVenueLocationParamsDto.host_uid }
			}
		});

		if (patchVenueLocationBodyDto.place_id === null) {
			venue.location = null;
		} else {
			venue.location = await this.locationService.create(
				patchVenueLocationBodyDto.place_id
			);
		}

		await this.venuesRepository.save(venue);
		return venue.cast(PublicVenue);
	}
}
