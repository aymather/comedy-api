import { TableEntity } from 'src/etc/mixins/TableEntity';
import { generate_nanoid, NanoId, NanoIdColumnOptions } from 'src/etc/nanoid';
import { SerialRelationId } from 'src/etc/types';
import { Event } from 'src/event/event.entity';
import { Venue } from 'src/venue/venue.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';

@Entity('room')
export class Room extends TableEntity {
	@PrimaryGeneratedColumn()
	room_id: SerialRelationId;

	@Column(NanoIdColumnOptions)
	room_uid: NanoId = generate_nanoid();

	@ManyToOne(() => Venue, (venue) => venue.rooms, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'venue_id' })
	venue: Venue;

	@OneToMany(() => Event, (event) => event.room)
	events: Event[];

	@Column()
	name: string;

	@Column({ nullable: true })
	profile_image_url: string | null;
}
