import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { DatabaseModule } from './database/database.module';
import { EventArtistLinkModule } from './event-artist-link/event-artist-link.module';
import { EventModule } from './event/event.module';
import { HostModule } from './host/host.module';
import { LocationModule } from './location/location.module';
import { RevisionModule } from './revision/revision.module';
import { RoomModule } from './room/room.module';
import { SearchModule } from './search/search.module';
import { VenueImageModule } from './venue-image/venue-image.module';
import { VenueModule } from './venue/venue.module';

@Module({
	imports: [
		DatabaseModule,
		HostModule,
		VenueModule,
		RoomModule,
		EventModule,
		EventArtistLinkModule,
		ArtistModule,
		RevisionModule,
		SearchModule,
		VenueImageModule,
		LocationModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
