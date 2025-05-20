import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Artist } from 'src/artist/artist.entity';
import { EventArtistLink } from 'src/event-artist-link/event-artist-link.entity';
import { Room } from 'src/room/room.entity';
import { Between, Repository } from 'typeorm';
import { AddArtistParamsDto } from './dto/add-artist.dto';
import {
	CreateEventBodyDto,
	CreateEventParamsDto,
	CreateEventResponseDto
} from './dto/create.dto';
import { DeleteEventParamsDto, DeleteEventResponseDto } from './dto/delete.dto';
import { DropArtistParamsDto } from './dto/drop-artist.dto';
import { PublicEvent } from './dto/entity.dto';
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
import { Event } from './event.entity';

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(Event)
		private readonly eventsRepository: Repository<Event>,
		@InjectRepository(Room)
		private readonly roomsRepository: Repository<Room>,
		@InjectRepository(EventArtistLink)
		private readonly eventArtistLinksRepository: Repository<EventArtistLink>,
		@InjectRepository(Artist)
		private readonly artistsRepository: Repository<Artist>
	) {}

	async findAll(
		findAllEventsQueryDto: FindAllEventsQueryDto
	): Promise<FindAllEventsResponseDto> {
		const where: any = {
			room: {
				room_uid: findAllEventsQueryDto.room_uid
			},
			venue: {
				venue_uid: findAllEventsQueryDto.venue_uid,
				host: {
					host_uid: findAllEventsQueryDto.host_uid
				}
			}
		};

		// Add date filtering if date is provided
		if (findAllEventsQueryDto.date) {
			// Create date in local timezone
			const searchDate = dayjs(findAllEventsQueryDto.date);
			const startOfDay = searchDate.startOf('day').toDate();
			const endOfDay = searchDate.endOf('day').toDate();

			where.start_time = Between(startOfDay, endOfDay);
		}

		const events = await this.eventsRepository.find({
			where,
			relations: ['room', 'venue', 'venue.host', 'venue.images']
		});

		return events.map((event) => event.cast(PublicEvent));
	}

	async findOne(
		findOneEventParamsDto: FindOneEventParamsDto
	): Promise<FindOneEventResponseDto> {
		const event = await this.eventsRepository.findOneOrFail({
			where: { event_uid: findOneEventParamsDto.event_uid },
			relations: [
				'room',
				'artists',
				'artists.artist',
				'venue',
				'venue.host',
				'venue.location',
				'venue.images'
			]
		});

		return event.cast(PublicEvent);
	}

	async create(
		createEventParamsDto: CreateEventParamsDto,
		createEventBodyDto: CreateEventBodyDto
	): Promise<CreateEventResponseDto> {
		const room = await this.roomsRepository.findOneOrFail({
			where: {
				room_uid: createEventParamsDto.room_uid,
				venue: {
					venue_uid: createEventParamsDto.venue_uid,
					host: {
						host_uid: createEventParamsDto.host_uid
					}
				}
			}
		});

		const event = this.eventsRepository.create({
			room,
			...createEventBodyDto
		});
		await this.eventsRepository.save(event);
		return event.cast(PublicEvent);
	}

	async delete(
		deleteEventParamsDto: DeleteEventParamsDto
	): Promise<DeleteEventResponseDto> {
		const event = await this.eventsRepository.findOneOrFail({
			where: { event_uid: deleteEventParamsDto.event_uid }
		});

		await this.eventsRepository.delete(event.event_id);
		return event.cast(PublicEvent);
	}

	async update(
		updateEventParamsDto: UpdateEventParamsDto,
		updateEventBodyDto: UpdateEventBodyDto
	): Promise<UpdateEventResponseDto> {
		const event = await this.eventsRepository.findOneOrFail({
			where: { event_uid: updateEventParamsDto.event_uid }
		});

		event.update(updateEventBodyDto);
		await this.eventsRepository.save(event);

		return event.cast(PublicEvent);
	}

	async addArtist(addArtistParamsDto: AddArtistParamsDto): Promise<void> {
		const event = await this.eventsRepository.findOneOrFail({
			where: { event_uid: addArtistParamsDto.event_uid }
		});

		const artist = await this.artistsRepository.findOneOrFail({
			where: { artist_uid: addArtistParamsDto.artist_uid }
		});

		await this.eventArtistLinksRepository.upsert(
			{
				event: { event_id: event.event_id },
				artist: { artist_id: artist.artist_id }
			},
			['event_id', 'artist_id']
		);
	}

	async dropArtist(dropArtistParamsDto: DropArtistParamsDto): Promise<void> {
		const eventArtistLink = await this.eventArtistLinksRepository.findOneOrFail(
			{
				where: {
					event: {
						event_uid: dropArtistParamsDto.event_uid
					},
					artist: {
						artist_uid: dropArtistParamsDto.artist_uid
					}
				}
			}
		);

		await this.eventArtistLinksRepository.delete(
			eventArtistLink.event_artist_link_id
		);
	}
}
