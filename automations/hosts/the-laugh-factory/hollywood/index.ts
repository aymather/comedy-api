import { initScrapeSession } from 'automations/shared/initScrapeSession';
import { Event } from 'src/event/event.entity';
import { In } from 'typeorm';
import { gatherEvents } from './etc';

const VENUE_ID = 1;

(async () => {
	try {
		const { eventRepository, db } = await initScrapeSession();

		const data = await gatherEvents();

		const events: Event[] = [];
		for (const scrapedEvent of data) {
			const event = new Event();
			event.external_id = scrapedEvent.id.toString();
			event.venue_id = VENUE_ID;
			event.name = scrapedEvent.name;
			event.image_url = scrapedEvent.flyerUrl;
			event.start_time = new Date(scrapedEvent.startDate);
			event.end_time = new Date(scrapedEvent.endDate);
			event.event_link = scrapedEvent.url;
			event.two_drink_minimum = true;
			event.phone_free_zone = false;
			event.minimum_age = 21;
			event.serves_alcohol = true;
			event.serves_food = true;
			event.needs_revision = true;
			events.push(event);
		}

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

		console.log(events.length, existingEvents.length);

		// Log the number of events that need revision
		console.log(
			events.filter((event) => event.needs_revision).length,
			'events need revision'
		);

		// Log the number of events that don't need revision
		console.log(
			events.filter((event) => !event.needs_revision).length,
			"events don\'t need revision"
		);

		console.log(events.filter((event) => event.needs_revision));

		// await eventRepository.upsert(events, ['external_id']);
		// console.log(`Upserted ${events.length} events`);

		await db.destroy();
	} catch (error) {
		console.error('Error fetching or processing events:', error);
	}
})();
