import { Inject } from '@nestjs/common';
import {
	DataSource,
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	RemoveEvent,
	UpdateEvent
} from 'typeorm';
import { SearchService } from '../search/search.service';
import { Venue } from './venue.entity';

@EventSubscriber()
export class VenueSubscriber implements EntitySubscriberInterface<Venue> {
	constructor(
		private readonly searchService: SearchService,
		@Inject(DataSource) private readonly dataSource: DataSource
	) {
		dataSource.subscribers.push(this);
	}

	listenTo() {
		return Venue;
	}

	async afterInsert(event: InsertEvent<Venue>) {
		this.searchService.upsertVenue(
			{
				venue_uid: event.entity.venue_uid
			},
			this.dataSource.createQueryBuilder(
				Venue,
				'venue',
				event.manager.queryRunner
			)
		);
	}

	async afterUpdate(event: UpdateEvent<Venue>) {
		this.searchService.upsertVenue(
			{
				venue_uid: event.entity.venue_uid
			},
			this.dataSource.createQueryBuilder(
				Venue,
				'venue',
				event.manager.queryRunner
			)
		);
	}

	async beforeRemove(event: RemoveEvent<Venue>) {
		this.searchService.removeVenue({
			venue_uid: event.entity.venue_uid
		});
	}
}
