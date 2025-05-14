import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigManagerModule } from 'src/config-manager/config-manager.module';
import { ConfigManagerService } from 'src/config-manager/config-manager.service';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigManagerModule],
			inject: [ConfigManagerService],
			useFactory: (configManager: ConfigManagerService) => ({
				...configManager.initDatabaseConfig(),
				logging: false,
				type: 'postgres',
				entities: [__dirname + '/../**/*.entity{.ts,.js}'],
				synchronize: true,
				extra: {
					options: `-c search_path=${configManager.initDatabaseConfig().schema},public`
				}

				/**
				 * For debugging SQL Queries
				 */
				// logger: 'advanced-console',
				// logging: ['query', 'error', 'schema']
			})
		})
	]
})
export class DatabaseModule {}
