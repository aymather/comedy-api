import { Module } from '@nestjs/common';
import { DelegateModule } from 'src/delegates/delegates.module';
import { GoogleMapsController } from './google-maps.controller';
import { GoogleMapsService } from './google-maps.service';

@Module({
	imports: [DelegateModule],
	controllers: [GoogleMapsController],
	providers: [GoogleMapsService],
	exports: [GoogleMapsService]
})
export class GoogleMapsModule {}
