import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	DatabaseConfig,
	GeneralConfig,
	GoogleMapsConfig,
	MeilisearchConfig
} from 'src/etc/types/config-manager';

@Injectable()
export class ConfigManagerService extends ConfigService {
	generalConfig: GeneralConfig;
	constructor() {
		super();

		this.generalConfig = {
			env: this.getEnv('ENV')
		};
	}

	public initDatabaseConfig(): DatabaseConfig {
		return {
			host: this.getEnv('DATABASE_HOST'),
			port: this.getEnv('DATABASE_PORT', { parser: parseInt }),
			username: this.getEnv('DATABASE_USERNAME'),
			password: this.getEnv('DATABASE_PASSWORD'),
			database: this.getEnv('DATABASE_NAME'),
			type: this.getEnv('DATABASE_CLIENT'),
			schema: this.getEnv('DATABASE_SCHEMA')
		};
	}

	public initGoogleMapsConfig(): GoogleMapsConfig {
		return {
			apiKey: this.getEnv('GOOGLE_MAPS_API_KEY')
		};
	}

	public initMeilisearchConfig(): MeilisearchConfig {
		return {
			host: this.getEnv('MEILISEARCH_URL'),
			apiKey: this.getEnv('MEILISEARCH_MASTER_KEY'),
			artistsIndex: this.getEnv('MEILISEARCH_ARTISTS_INDEX')
		};
	}

	/**
	 * Methods
	 */
	private getEnv<T>(
		key: string,
		options: {
			default?: T;
			parser?: (value: string) => T;
			oneOf?: T[];
		} = {}
	): T {
		const { default: defaultValue, parser, oneOf } = options;

		const value = this.get<string>(key);

		if (value === undefined || value === '') {
			if (defaultValue === undefined) {
				throw new Error(
					`Environment variable ${key} is required but not set or is empty.`
				);
			}
			return defaultValue;
		}

		let parsedValue: T;

		if (parser) {
			parsedValue = parser(value);
		} else {
			parsedValue = value as unknown as T;
		}

		if (oneOf && !oneOf.includes(parsedValue)) {
			throw new Error(
				`Environment variable ${key} must be one of [${oneOf.join(', ')}], but got ${parsedValue}`
			);
		}

		return parsedValue;
	}
}
