import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DelegateModule } from 'src/delegates/delegates.module';
import { LocationController } from './location.controller';
import { Location } from './location.entity';
import { LocationService } from './location.service';

@Module({
	imports: [TypeOrmModule.forFeature([Location]), DelegateModule],
	providers: [LocationService],
	controllers: [LocationController],
	exports: [LocationService]
})
export class LocationModule {}
