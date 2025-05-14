import 'reflect-metadata';

import axios from 'axios';
import * as dotenv from 'dotenv';
import initializeEnvironment from 'src/etc/initializeEnvironment';
import { Venue } from 'src/venue/venue.entity';
import { createDb } from './meilisearch/shared';

dotenv.config({ path: '.env' });

(async () => {
	await initializeEnvironment(['db']);

	const db = await createDb();

	const venueRepository = db.getRepository(Venue);

	const venues = await venueRepository.find({
		relations: ['host']
	});

	let i = 0;
	for (const venue of venues) {
		console.log(`Working on ${i}/${venues.length}`);
		const place_id = venue.place_id;
		if (place_id) {
			await axios.patch(
				`http://localhost:8080/host/${venue.host.host_uid}/venue/${venue.venue_uid}/location`,
				{ place_id }
			);
		}
		i++;
	}

	await db.destroy();
	console.log('Database connection closed');
})();
