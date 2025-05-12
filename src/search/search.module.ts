import { Module } from '@nestjs/common';
import { DelegateModule } from 'src/delegates/delegates.module';
import { ConfigManagerModule } from '../config-manager/config-manager.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
	imports: [ConfigManagerModule, DelegateModule],
	controllers: [SearchController],
	providers: [SearchService],
	exports: [SearchService]
})
export class SearchModule {}
