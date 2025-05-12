import { TableEntity } from 'src/etc/mixins/TableEntity';
import { generate_nanoid, NanoId, NanoIdColumnOptions } from 'src/etc/nanoid';
import { EventArtistLink } from 'src/event-artist-link/event-artist-link.entity';
import { Room } from 'src/room/room.entity';
import { Venue } from 'src/venue/venue.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';

@Entity('event')
export class Event extends TableEntity {
	@PrimaryGeneratedColumn()
	event_id: number;

	@Column(NanoIdColumnOptions)
	event_uid: NanoId = generate_nanoid();

	@Column({ unique: true })
	external_id: string;

	@Column()
	venue_id: number;

	@ManyToOne(() => Venue, (venue) => venue.events)
	@JoinColumn({ name: 'venue_id' })
	venue: Venue;

	@Column({ nullable: true })
	room_id: number | null;

	@ManyToOne(() => Room, (room) => room.events, { nullable: true })
	@JoinColumn({ name: 'room_id' })
	room: Room | null;

	@OneToMany(
		() => EventArtistLink,
		(event_artist_link) => event_artist_link.event
	)
	artists: EventArtistLink[];

	@Column()
	name: string;

	@Column({ nullable: true })
	image_url: string | null;

	@Column({ nullable: true })
	description: string | null;

	@Column({ nullable: true })
	doors_time: Date | null;

	@Column({ nullable: true })
	start_time: Date | null;

	@Column({ nullable: true })
	end_time: Date | null;

	@Column({ type: 'boolean', default: false })
	two_drink_minimum: boolean;

	@Column({ type: 'boolean', default: false })
	phone_free_zone: boolean;

	@Column({ type: 'boolean', default: false })
	serves_alcohol: boolean;

	@Column({ type: 'boolean', default: false })
	serves_food: boolean;

	@Column({ nullable: true })
	minimum_age: number | null;

	@Column({ type: 'boolean', nullable: true })
	sold_out: boolean | null;

	@Column({ nullable: true })
	event_link: string | null;

	@Column({ nullable: true })
	ticket_link: string | null;

	/**
	 * Pipeline columns
	 */
	@Column({ type: 'boolean', default: true })
	needs_revision: boolean;

	@Column({ nullable: true })
	last_revised_at: Date | null;

	@Column({ type: 'boolean', default: true })
	artists_needs_revision: boolean;
}
