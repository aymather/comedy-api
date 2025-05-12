import { initScrapeSession } from 'automations/shared/initScrapeSession';
import {
	getShowclixByVenueId,
	transformShowclixEvent
} from 'automations/shared/showclix';
import { In } from 'typeorm';

const VENUE_ID = 25;
const MAIN_ROOM_ID = 1;
const ORIGINAL_ROOM_ID = 2;
const BELLY_ROOM_ID = 3;

export const getRoomId = (roomName: string): number | null => {
	if (roomName.includes('Main')) return MAIN_ROOM_ID;
	if (roomName.includes('Original')) return ORIGINAL_ROOM_ID;
	if (roomName.includes('Belly')) return BELLY_ROOM_ID;
	return null;
};

(async () => {
	try {
		const { eventRepository, db } = await initScrapeSession();

		const data = await getShowclixByVenueId('30111');
		const events = data.map((showclixEvent) => {
			const tempEvent = transformShowclixEvent(showclixEvent);
			tempEvent.venue_id = VENUE_ID;
			tempEvent.room_id = getRoomId(showclixEvent.venue_name);
			tempEvent.two_drink_minimum = true;
			tempEvent.phone_free_zone = true;
			tempEvent.serves_food = true;
			tempEvent.serves_alcohol = true;
			tempEvent.minimum_age = 21;
			tempEvent.needs_revision = true;
			return tempEvent;
		});

		const existingEvents = await eventRepository.find({
			where: {
				external_id: In(events.map((event) => event.external_id))
			}
		});

		// Check if fields are different
		events.forEach((event) => {
			const existingEvent = existingEvents.find(
				(e) => e.external_id === event.external_id
			);

			if (existingEvent) {
				if (
					existingEvent.name === event.name &&
					existingEvent.image_url === event.image_url
				) {
					event.needs_revision = false;
				}
			}
		});

		await eventRepository.upsert(events, ['external_id']);
		console.log(`Upserted ${events.length} upcoming events`);

		await db.destroy();
	} catch (error) {
		console.error('Error fetching or processing events:', error);
	}
})();
