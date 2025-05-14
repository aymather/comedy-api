import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Host } from 'src/host/host.entity';
import { LocationModule } from 'src/location/location.module';
import { VenueController } from './venue.controller';
import { Venue } from './venue.entity';
import { VenueService } from './venue.service';

@Module({
	imports: [TypeOrmModule.forFeature([Venue, Host]), LocationModule],
	controllers: [VenueController],
	providers: [VenueService]
})
export class VenueModule {}
