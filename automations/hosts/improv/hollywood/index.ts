import { initScrapeSession } from 'automations/shared/initScrapeSession';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { Event } from 'src/event/event.entity';

dayjs.extend(customParseFormat);

const VENUE_ID = 3;

const THE_LAB_ID = 5;
const THE_MAIN_ROOM_ID = 6;

const getRoomId = (room: string) => {
	if (room === 'the lab') return THE_LAB_ID;
	if (room === 'the main room') return THE_MAIN_ROOM_ID;
	throw new Error(`Unknown room: ${room}`);
};

(async () => {
	try {
		const { eventRepository, db } = await initScrapeSession();

		console.log('Gathering events...');
		const response = await axios.get('https://improv.com/hollywood/calendar/');

		// Load the HTML content into cheerio
		const $ = cheerio.load(response.data);

		// Select all 'a' tags descending from the div with class 'cal-list'
		const links = $('.cal-list a');

		console.log(`Found ${links.length} links in the cal-list div`);

		// Process each link
		const events: Event[] = [];

		links.each((index, element) => {
			const $element = $(element);

			// Extract event ID from the id attribute
			const id = $element.attr('id') || '';

			// Extract event name from the h3 tag
			const name = $element.find('h3').text().trim();

			// Extract date and time
			const currentYear = new Date().getFullYear();
			const month = $element.find('.maindate dl dt').text().trim();
			const day = $element
				.find('.maindate dl dd')
				.clone()
				.children('i')
				.remove()
				.end()
				.text()
				.trim();
			const time = $element.find('.times span').text().trim();
			const startDateTime = dayjs(
				`${month} ${day}, ${currentYear} ${time}`,
				'MMM D, YYYY h:mma'
			).toDate();

			// Extract room name (from the city div)
			const room = $element.find('.city').text().replace('@', '').trim();
			const room_id = getRoomId(room.toLowerCase());

			// Extract event link
			const eventLink = $element.attr('href') || '';
			const fullEventLink = eventLink.startsWith('http')
				? eventLink
				: `https://improv.com${eventLink}`;

			// Extract image URL
			const imageUrl = $element.find('.bgimage').attr('data-src') || '';

			const event = eventRepository.create({
				external_id: id,
				venue_id: VENUE_ID,
				name,
				start_time: startDateTime,
				room_id: room_id,
				event_link: fullEventLink,
				image_url: imageUrl,
				phone_free_zone: true,
				two_drink_minimum: true,
				serves_food: true,
				minimum_age: 21
			});

			events.push(event);
		});

		await eventRepository.upsert(events, ['external_id']);
		console.log(`Successfully upserted ${events.length} events`);

		await db.destroy();
	} catch (error) {
		console.error('Error fetching or parsing data:', error);
	}
})();
