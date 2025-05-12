import 'reflect-metadata';

import * as dotenv from 'dotenv';
import * as ora from 'ora';
import { MeilisearchArtistDocument } from 'src/delegates/dto/meilisearch.dto';
import initializeEnvironment from 'src/etc/initializeEnvironment';
import { Artist } from '../../src/artist/artist.entity';
import { SearchType } from '../../src/search/types';
import { createDb, createMs, uploadInChunks } from './shared';

dotenv.config({ path: '.env' });

(async () => {
	await initializeEnvironment(['db']);

	const { MEILISEARCH_ARTISTS_INDEX } = process.env;

	const db = await createDb();
	const ms = await createMs();

	const artistRepository = db.getRepository(Artist);

	// Fetch artists from the db
	const spinner = ora('Fetching artists from database').start();
	const data = await artistRepository.createQueryBuilder('artist').getMany();

	const artists: MeilisearchArtistDocument[] = [];
	for (const artist of data) {
		artists.push({
			artist_uid: artist.artist_uid,
			name: artist.name,
			search_type: SearchType.artist,
			profile_image_url: artist.profile_image_url
		});
	}
	spinner.succeed(`Fetched ${artists.length} artists from database`);

	// Delete and recreate index
	spinner.start('Preparing Meilisearch index');
	await ms.deleteIndex(MEILISEARCH_ARTISTS_INDEX);
	await ms.createIndex(MEILISEARCH_ARTISTS_INDEX, {
		primaryKey: 'artist_uid'
	});
	await ms.index(MEILISEARCH_ARTISTS_INDEX).updateSettings({
		searchableAttributes: ['name'],
		sortableAttributes: [],
		rankingRules: ['words', 'typo', 'attribute', 'sort', 'proximity']
	});
	spinner.succeed('Meilisearch index prepared');

	await uploadInChunks(artists, ms, MEILISEARCH_ARTISTS_INDEX);

	spinner.succeed(`All ${artists.length} artists uploaded to Meilisearch`);

	await db.destroy();
	console.log('Database connection closed');
})();
