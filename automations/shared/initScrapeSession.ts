import initializeEnvironment from 'src/etc/initializeEnvironment';
import { Event } from 'src/event/event.entity';
import { DataSource, Repository } from 'typeorm';
import { createDb } from './createDb';

export const initScrapeSession = async (): Promise<{
	db: DataSource;
	eventRepository: Repository<Event>;
}> => {
	await initializeEnvironment(['db']);
	const db = await createDb();
	const eventRepository = db.getRepository(Event);

	return {
		db,
		eventRepository
	};
};
