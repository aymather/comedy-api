import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from 'src/search/search.module';
import { ArtistController } from './artist.controller';
import { Artist } from './artist.entity';
import { ArtistService } from './artist.service';
import { ArtistSubscriber } from './artist.subscriber';

@Module({
	imports: [TypeOrmModule.forFeature([Artist]), SearchModule],
	controllers: [ArtistController],
	providers: [ArtistService, ArtistSubscriber]
})
export class ArtistModule {}
