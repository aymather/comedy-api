import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common';
import { AddArtistParamsDto } from './dto/add-artist.dto';
import {
	CreateEventBodyDto,
	CreateEventParamsDto,
	CreateEventResponseDto
} from './dto/create.dto';
import { DeleteEventParamsDto, DeleteEventResponseDto } from './dto/delete.dto';
import { DropArtistParamsDto } from './dto/drop-artist.dto';
import {
	FindAllEventsQueryDto,
	FindAllEventsResponseDto
} from './dto/find-all.dto';
import {
	FindOneEventParamsDto,
	FindOneEventResponseDto
} from './dto/find-one.dto';
import {
	UpdateEventBodyDto,
	UpdateEventParamsDto,
	UpdateEventResponseDto
} from './dto/update.dto';
import { EventService } from './event.service';

@Controller()
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Get('event')
	async findAll(
		@Query() findAllEventsQueryDto: FindAllEventsQueryDto
	): Promise<FindAllEventsResponseDto> {
		return this.eventService.findAll(findAllEventsQueryDto);
	}

	@Get('event/:event_uid')
	async findOne(
		@Param() findOneEventParamsDto: FindOneEventParamsDto
	): Promise<FindOneEventResponseDto> {
		return this.eventService.findOne(findOneEventParamsDto);
	}

	@Post('host/:host_uid/venue/:venue_uid/room/:room_uid/event')
	async create(
		@Param() createEventParamsDto: CreateEventParamsDto,
		@Body() createEventBodyDto: CreateEventBodyDto
	): Promise<CreateEventResponseDto> {
		return this.eventService.create(createEventParamsDto, createEventBodyDto);
	}

	@Delete('host/:host_uid/venue/:venue_uid/room/:room_uid/event/:event_uid')
	async delete(
		@Param() deleteEventParamsDto: DeleteEventParamsDto
	): Promise<DeleteEventResponseDto> {
		return this.eventService.delete(deleteEventParamsDto);
	}

	@Patch('host/:host_uid/venue/:venue_uid/room/:room_uid/event/:event_uid')
	async update(
		@Param() updateEventParamsDto: UpdateEventParamsDto,
		@Body() updateEventBodyDto: UpdateEventBodyDto
	): Promise<UpdateEventResponseDto> {
		return this.eventService.update(updateEventParamsDto, updateEventBodyDto);
	}

	@Post('host/:host_uid/venue/:venue_uid/event/:event_uid/artist/:artist_uid')
	async addArtist(
		@Param() addArtistParamsDto: AddArtistParamsDto
	): Promise<void> {
		return this.eventService.addArtist(addArtistParamsDto);
	}

	@Delete('host/:host_uid/venue/:venue_uid/event/:event_uid/artist/:artist_uid')
	async dropArtist(
		@Param() dropArtistParamsDto: DropArtistParamsDto
	): Promise<void> {
		return this.eventService.dropArtist(dropArtistParamsDto);
	}
}
