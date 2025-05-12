import { Module, Provider } from '@nestjs/common';
import { ConfigManagerModule } from 'src/config-manager/config-manager.module';
import { GoogleMapsServiceDelegate } from './google-maps.service';
import { MeilisearchServiceDelegate } from './meilisearch.service';

const delegates: Provider[] = [
	GoogleMapsServiceDelegate,
	MeilisearchServiceDelegate
];

@Module({
	imports: [ConfigManagerModule],
	providers: delegates,
	exports: delegates
})
export class DelegateModule {}
