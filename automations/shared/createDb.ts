import * as dotenv from 'dotenv';
import * as ora from 'ora';
import { DataSource } from 'typeorm';

dotenv.config({ path: '.env' });

export const createDb = async (): Promise<DataSource> => {
	const spinner = ora('Initializing environment').start();
	const {
		DATABASE_HOST,
		DATABASE_PORT,
		DATABASE_USERNAME,
		DATABASE_PASSWORD,
		DATABASE_NAME,
		DATABASE_SCHEMA
	} = process.env;

	// Database Config
	spinner.start('Connecting to database');
	const ds = new DataSource({
		type: 'postgres',
		host: DATABASE_HOST,
		port: parseInt(DATABASE_PORT),
		username: DATABASE_USERNAME,
		password: DATABASE_PASSWORD,
		database: DATABASE_NAME,
		schema: DATABASE_SCHEMA,
		entities: ['src/**/*.entity.ts'],
		synchronize: true,
		extra: {
			// This is a hacky way to set the search path to the schema we want
			// This is actually necessary to enable the `postgis` extension because
			// i guess by default it's not enabled in the schema... (don't ask me why)
			options: `-c search_path=${DATABASE_SCHEMA}`
		}
	});
	await ds.initialize();
	spinner.succeed('Connected to database');

	return ds;
};
