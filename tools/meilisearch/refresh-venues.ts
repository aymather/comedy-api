import 'reflect-metadata';

import * as dotenv from 'dotenv';
import * as ora from 'ora';
import { MeilisearchVenueDocument } from 'src/delegates/dto/meilisearch.dto';
import initializeEnvironment from 'src/etc/initializeEnvironment';
import { SearchType } from '../../src/search/types';
import { Venue } from '../../src/venue/venue.entity';
import { createDb, createMs, uploadInChunks } from './shared';

dotenv.config({ path: '.env' });

(async () => {
	await initializeEnvironment(['db']);

	const { MEILISEARCH_VENUES_INDEX } = process.env;

	const db = await createDb();
	const ms = await createMs();

	const venueRepository = db.getRepository(Venue);

	// Fetch venues from the db
	const spinner = ora('Fetching venues from database').start();
	const data = await venueRepository.createQueryBuilder('venue').getMany();

	const venues: MeilisearchVenueDocument[] = [];
	for (const venue of data) {
		venues.push({
			venue_uid: venue.venue_uid,
			name: venue.name,
			search_type: SearchType.venue,
			profile_image_url: venue.profile_image_url
		});
	}
	spinner.succeed(`Fetched ${venues.length} venues from database`);

	// Delete and recreate index
	spinner.start('Preparing Meilisearch index');
	await ms.deleteIndex(MEILISEARCH_VENUES_INDEX);
	await ms.createIndex(MEILISEARCH_VENUES_INDEX, {
		primaryKey: 'venue_uid'
	});
	await ms.index(MEILISEARCH_VENUES_INDEX).updateSettings({
		searchableAttributes: ['name'],
		sortableAttributes: [],
		rankingRules: ['words', 'typo', 'attribute', 'sort', 'proximity']
	});
	spinner.succeed('Meilisearch index prepared');

	await uploadInChunks(venues, ms, MEILISEARCH_VENUES_INDEX);

	spinner.succeed(`All ${venues.length} venues uploaded to Meilisearch`);

	await db.destroy();
	console.log('Database connection closed');
})();
