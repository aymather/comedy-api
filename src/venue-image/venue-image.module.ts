import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from 'src/venue/venue.entity';
import { VenueImageController } from './venue-image.controller';
import { VenueImage } from './venue-image.entity';
import { VenueImageService } from './venue-image.service';

@Module({
	imports: [TypeOrmModule.forFeature([VenueImage, Venue])],
	controllers: [VenueImageController],
	providers: [VenueImageService]
})
export class VenueImageModule {}
