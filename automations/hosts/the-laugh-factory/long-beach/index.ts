import { initScrapeSession } from 'automations/shared/initScrapeSession';
import { Event } from 'src/event/event.entity';
import { gatherEvents } from './etc';

const VENUE_ID = 2;

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
			events.push(event);
		}
		await eventRepository.upsert(events, ['external_id']);
		console.log(`Upserted ${events.length} events`);

		await db.destroy();
	} catch (error) {
		console.error('Error fetching or processing events:', error);
	}
})();
