import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigManagerService } from './config-manager.service';

@Module({
	imports: [
		ConfigModule.forRoot({}) // you must leave this blank in order for the .env file to be loaded properly
	],
	providers: [ConfigManagerService],
	exports: [ConfigManagerService]
})
export class ConfigManagerModule {}
