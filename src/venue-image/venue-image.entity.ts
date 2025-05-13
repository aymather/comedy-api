import { TableEntity } from 'src/etc/mixins/TableEntity';
import { generate_nanoid, NanoId, NanoIdColumnOptions } from 'src/etc/nanoid';
import { Venue } from 'src/venue/venue.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { VenueImageTag } from './types';

@Entity('venue_image')
export class VenueImage extends TableEntity {
	@PrimaryGeneratedColumn()
	venue_image_id: number;

	@Column(NanoIdColumnOptions)
	venue_image_uid: NanoId = generate_nanoid();

	@Column()
	url: string;

	@Column({
		type: 'enum',
		enum: VenueImageTag
	})
	tag: VenueImageTag;

	@Column()
	venue_id: number;

	@ManyToOne(() => Venue, (venue) => venue.images)
	@JoinColumn({ name: 'venue_id' })
	venue: Venue;
}
