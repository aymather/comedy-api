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
import { Artist } from './artist.entity';

@EventSubscriber()
export class ArtistSubscriber implements EntitySubscriberInterface<Artist> {
	constructor(
		private readonly searchService: SearchService,
		@Inject(DataSource) private readonly dataSource: DataSource
	) {
		dataSource.subscribers.push(this);
	}

	listenTo() {
		return Artist;
	}

	async afterInsert(event: InsertEvent<Artist>) {
		this.searchService.upsertArtist(
			{
				artist_uid: event.entity.artist_uid
			},
			this.dataSource.createQueryBuilder(
				Artist,
				'artist',
				event.manager.queryRunner
			)
		);
	}

	async afterUpdate(event: UpdateEvent<Artist>) {
		this.searchService.upsertArtist(
			{
				artist_uid: event.entity.artist_uid
			},
			this.dataSource.createQueryBuilder(
				Artist,
				'artist',
				event.manager.queryRunner
			)
		);
	}

	async beforeRemove(event: RemoveEvent<Artist>) {
		this.searchService.removeArtist({
			artist_uid: event.entity.artist_uid
		});
	}
}
