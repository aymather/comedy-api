import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventArtistLink } from './event-artist-link.entity';

@Module({
	imports: [TypeOrmModule.forFeature([EventArtistLink])]
})
export class EventArtistLinkModule {}
