import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import {
	CreateVenueImageBodyDto,
	CreateVenueImageParamsDto,
	CreateVenueImageResponseDto
} from './dto/create.dto';
import {
	DeleteVenueImageParamsDto,
	DeleteVenueImageResponseDto
} from './dto/delete.dto';
import {
	UpdateVenueImageBodyDto,
	UpdateVenueImageParamsDto,
	UpdateVenueImageResponseDto
} from './dto/update.dto';
import { VenueImageService } from './venue-image.service';

@Controller()
export class VenueImageController {
	constructor(private readonly venueImageService: VenueImageService) {}

	@Post('host/:host_uid/venue/:venue_uid/venue-image')
	create(
		@Param() createVenueImageParamsDto: CreateVenueImageParamsDto,
		@Body() createVenueImageBodyDto: CreateVenueImageBodyDto
	): Promise<CreateVenueImageResponseDto> {
		return this.venueImageService.create(
			createVenueImageParamsDto,
			createVenueImageBodyDto
		);
	}

	@Delete('host/:host_uid/venue/:venue_uid/venue-image/:venue_image_uid')
	delete(
		@Param() deleteVenueImageParamsDto: DeleteVenueImageParamsDto
	): Promise<DeleteVenueImageResponseDto> {
		return this.venueImageService.delete(deleteVenueImageParamsDto);
	}

	@Put('host/:host_uid/venue/:venue_uid/venue-image/:venue_image_uid')
	update(
		@Param() updateVenueImageParamsDto: UpdateVenueImageParamsDto,
		@Body() updateVenueImageBodyDto: UpdateVenueImageBodyDto
	): Promise<UpdateVenueImageResponseDto> {
		return this.venueImageService.update(
			updateVenueImageParamsDto,
			updateVenueImageBodyDto
		);
	}
}
