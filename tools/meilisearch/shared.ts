import { Meilisearch, MeiliSearch } from 'meilisearch';
import * as ora from 'ora';
import { DataSource } from 'typeorm';

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

export const createMs = async (): Promise<MeiliSearch> => {
	const spinner = ora('Initializing environment').start();
	const { MEILISEARCH_URL, MEILISEARCH_MASTER_KEY } = process.env;

	// Meilisearch Config
	spinner.start('Connecting to Meilisearch');
	const meilisearchClient = new MeiliSearch({
		host: MEILISEARCH_URL,
		apiKey: MEILISEARCH_MASTER_KEY
	});
	spinner.succeed('Connected to Meilisearch');

	return meilisearchClient;
};

export const uploadInChunks = async (
	data: Array<any>,
	ms: Meilisearch,
	index: string
) => {
	const spinner = ora('Uploading data to Meilisearch').start();
	const chunkSize = 10000;
	const totalChunks = Math.ceil(data.length / chunkSize);

	for (let i = 0; i < data.length; i += chunkSize) {
		const chunk = data.slice(i, i + chunkSize);
		const chunkNumber = Math.floor(i / chunkSize) + 1;

		spinner.start(
			`Uploading chunk ${chunkNumber}/${totalChunks} (${chunk.length} artists)`
		);

		await ms.index(index).addDocuments(chunk);

		spinner.succeed(`Uploaded chunk ${chunkNumber}/${totalChunks}`);
	}

	spinner.succeed('Uploaded all chunks');
};
