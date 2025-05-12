import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.entity';
import { EventArtistLink } from 'src/event-artist-link/event-artist-link.entity';
import { Room } from 'src/room/room.entity';
import { EventController } from './event.controller';
import { Event } from './event.entity';
import { EventService } from './event.service';

@Module({
	imports: [TypeOrmModule.forFeature([Event, Room, EventArtistLink, Artist])],
	controllers: [EventController],
	providers: [EventService]
})
export class EventModule {}
