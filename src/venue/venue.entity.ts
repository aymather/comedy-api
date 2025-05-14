import { TableEntity } from 'src/etc/mixins/TableEntity';
import { generate_nanoid, NanoId, NanoIdColumnOptions } from 'src/etc/nanoid';
import { SerialRelationId } from 'src/etc/types';
import { Event } from 'src/event/event.entity';
import { Host } from 'src/host/host.entity';
import { Location } from 'src/location/location.entity';
import { Room } from 'src/room/room.entity';
import { VenueImage } from 'src/venue-image/venue-image.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';

@Entity('venue')
export class Venue extends TableEntity {
	@PrimaryGeneratedColumn()
	venue_id: SerialRelationId;

	@Column(NanoIdColumnOptions)
	venue_uid: NanoId = generate_nanoid();

	@OneToMany(() => Room, (room) => room.venue)
	rooms: Room[];

	@OneToMany(() => Event, (event) => event.venue)
	events: Event[];

	@ManyToOne(() => Host, (host) => host.venues, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'host_id' })
	host: Host;

	@Column()
	name: string;

	@Column({ nullable: true })
	profile_image_url: string | null;

	@Column({ nullable: true })
	stage_image_url: string | null;

	@Column({ nullable: true })
	place_id: string | null;

	@OneToMany(() => VenueImage, (image) => image.venue)
	images: VenueImage[];

	@ManyToOne(() => Location, {
		nullable: true,
		eager: true,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'location_id' })
	location: Location | null;
}
