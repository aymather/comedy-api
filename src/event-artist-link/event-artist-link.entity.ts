import { Artist } from 'src/artist/artist.entity';
import { TableEntity } from 'src/etc/mixins/TableEntity';
import { SerialRelationId } from 'src/etc/types';
import { Event } from 'src/event/event.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique
} from 'typeorm';

@Entity('event_artist_link')
@Unique(['event_id', 'artist_id'])
export class EventArtistLink extends TableEntity {
	@PrimaryGeneratedColumn()
	event_artist_link_id: SerialRelationId;

	@Column()
	event_id: SerialRelationId;

	@ManyToOne(() => Event, (event) => event.artists, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'event_id' })
	event: Event;

	@Column()
	artist_id: SerialRelationId;

	@ManyToOne(() => Artist, (artist) => artist.events, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'artist_id' })
	artist: Artist;
}
