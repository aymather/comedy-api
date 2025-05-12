import axios from 'axios';
import * as dayjs from 'dayjs';
import { Event } from 'src/event/event.entity';

export interface ShowclixEvent {
	event_id: string;
	title: string;
	date_title: string;
	time_title: string;
	category_id: string;
	image_url: string;
	listing_url: string;
	is_recurring_model: boolean;
	is_registration: boolean;
	custom_get_tickets_button_text: string | null;
	hide_ticket_date_and_time: boolean;
	date_title_hide: string;
	month_row: string;
	day_row: string;
	end_month_row: string;
	end_day_row: string;
	has_conflicting_venues: boolean;
	venue_name: string;
	venue_city_state: string;
	show_venue_info: boolean;
	price_range: string[];
	sold_out: boolean;
	age_limit: string;
	color_scheme_id: string;
	event_start: string;
	event_end: string | null;
	behavior_set: string;
	parent: string;
}

interface ShowclixEventsByDate {
	[date: string]: ShowclixEvent[];
}

interface ShowclixEventsByMonth {
	dates: ShowclixEventsByDate;
}

export interface ShowclixEventsResponse {
	events_by_month: {
		[yearMonth: string]: ShowclixEventsByMonth;
	};
}

const shouldProcessYearMonthKey = (yearMonthKey: string): boolean => {
	const today = dayjs();
	const [year, month] = yearMonthKey.split('-').map((i) => parseInt(i));
	const eventDate = dayjs(`${year}-${month}-01`);
	return eventDate.isAfter(today) || eventDate.isSame(today, 'month');
};

const shouldProcessDateKey = (
	yearMonthKey: string,
	dateKey: string
): boolean => {
	const today = dayjs();
	const [year, month] = yearMonthKey.split('-').map((i) => parseInt(i));
	const eventDate = dayjs(`${year}-${month}-${parseInt(dateKey)}`);
	return eventDate.isAfter(today) || eventDate.isSame(today, 'day');
};

const getShowclixRequest = async (
	venueId: string
): Promise<ShowclixEventsResponse> => {
	const formattedYear = dayjs().year().toString();
	const currentMonth = (dayjs().month() + 1).toString().padStart(2, '0');

	const response = await axios.get<ShowclixEventsResponse>(
		`https://www.showclix.com/events/${venueId}/${formattedYear}-${currentMonth}-01.json`
	);

	return response.data;
};

const flattenShowclixResponse = (
	data: ShowclixEventsResponse
): ShowclixEvent[] => {
	// Flatten out the structure
	const upcomingEvents: ShowclixEvent[] = [];
	const eventsByYearAndMonthKeys = Object.keys(data.events_by_month).filter(
		shouldProcessYearMonthKey
	);
	for (const yearMonthKey of eventsByYearAndMonthKeys) {
		const dateKeys = Object.keys(
			data.events_by_month[yearMonthKey].dates
		).filter((dateKey) => shouldProcessDateKey(yearMonthKey, dateKey));

		for (const dateKey of dateKeys) {
			const events = Object.values(
				data.events_by_month[yearMonthKey].dates[dateKey]
			) as ShowclixEvent[];
			upcomingEvents.push(...events);
		}
	}
	return upcomingEvents;
};

export const transformShowclixEvent = (showclixEvent: ShowclixEvent): Event => {
	const event = new Event();
	event.name = showclixEvent.title;
	event.external_id = showclixEvent.event_id;
	event.image_url = showclixEvent.image_url;
	event.sold_out = event.sold_out;
	event.start_time = dayjs(showclixEvent.event_start).toDate();
	event.event_link = showclixEvent.listing_url;
	return event;
};

export const getShowclixByVenueId = async (
	venueId: string
): Promise<ShowclixEvent[]> => {
	const response = await getShowclixRequest(venueId);
	return flattenShowclixResponse(response);
};
