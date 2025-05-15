import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface DatabaseConfig extends PostgresConnectionOptions {}

export interface GoogleMapsConfig {
	apiKey: string;
}

export interface MeilisearchConfig {
	host: string;
	apiKey: string;
	artistsIndex: string;
	venuesIndex: string;
}

export interface GeneralConfig {
	env: string;
}
