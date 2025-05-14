import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put
} from '@nestjs/common';
import {
	CreateVenueBodyDto,
	CreateVenueParamsDto,
	CreateVenueResponseDto
} from './dto/create.dto';
import { DeleteVenueParamsDto, DeleteVenueResponseDto } from './dto/delete.dto';
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
import { VenueService } from './venue.service';

@Controller()
export class VenueController {
	constructor(private readonly venueService: VenueService) {}

	@Get('host/:host_uid/venue')
	async findAll(
		@Param() findAllVenueParamsDto: FindAllVenueParamsDto
	): Promise<FindAllVenueResponseDto> {
		return this.venueService.findAll(findAllVenueParamsDto);
	}

	@Get('host/:host_uid/venue/:venue_uid')
	async findOne(
		@Param() findOneVenueParamsDto: FindOneVenueParamsDto
	): Promise<FindOneVenueResponseDto> {
		return this.venueService.findOne(findOneVenueParamsDto);
	}

	@Post('host/:host_uid/venue')
	async create(
		@Param() createVenueParamsDto: CreateVenueParamsDto,
		@Body() createVenueBodyDto: CreateVenueBodyDto
	): Promise<CreateVenueResponseDto> {
		return this.venueService.create(createVenueParamsDto, createVenueBodyDto);
	}

	@Delete('host/:host_uid/venue/:venue_uid')
	async delete(
		@Param() deleteVenueParamsDto: DeleteVenueParamsDto
	): Promise<DeleteVenueResponseDto> {
		return this.venueService.delete(deleteVenueParamsDto);
	}

	@Put('host/:host_uid/venue/:venue_uid')
	async update(
		@Param() updateVenueParamsDto: UpdateVenueParamsDto,
		@Body() updateVenueBodyDto: UpdateVenueBodyDto
	): Promise<UpdateVenueResponseDto> {
		return this.venueService.update(updateVenueParamsDto, updateVenueBodyDto);
	}

	@Patch('host/:host_uid/venue/:venue_uid/location')
	async patchVenueLocation(
		@Param() patchVenueLocationParamsDto: PatchVenueLocationParamsDto,
		@Body() patchVenueLocationBodyDto: PatchVenueLocationBodyDto
	): Promise<PatchVenueLocationResponseDto> {
		return this.venueService.patchVenueLocation(
			patchVenueLocationParamsDto,
			patchVenueLocationBodyDto
		);
	}
}
