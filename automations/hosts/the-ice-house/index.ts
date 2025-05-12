// import { initScrapeSession } from 'automations/shared/initScrapeSession';
// import {
// 	getShowclixByVenueId,
// 	transformShowclixEvent
// } from 'automations/shared/showclix';

// const VENUE_ID = 25;

// // export const getRoomId = (roomName: string): number | null => {
// // 	// TODO
// // };

// (async () => {
// 	try {
// 		const { eventRepository, db } = await initScrapeSession();

// 		const data = await getShowclixByVenueId('31004');
// 		const events = data.map((showclixEvent) => {
// 			const tempEvent = transformShowclixEvent(showclixEvent);
// 			tempEvent.venue_id = VENUE_ID;
// 			tempEvent.room_id = getRoomId(showclixEvent.venue_name);
// 			tempEvent.two_drink_minimum = true;
// 			tempEvent.phone_free_zone = true;
// 			tempEvent.serves_food = true;
// 			tempEvent.serves_alcohol = true;
// 			tempEvent.minimum_age = 21;
// 			tempEvent.needs_revision = true;
// 			return tempEvent;
// 		});

// 		await eventRepository.upsert(events, {
// 			conflictPaths: ['external_id'],
// 			skipUpdateIfNoValuesChanged: true
// 		});
// 		console.log(`Upserted ${events.length} upcoming events`);

// 		await db.destroy();
// 	} catch (error) {
// 		console.error('Error fetching or processing events:', error);
// 	}
// })();
