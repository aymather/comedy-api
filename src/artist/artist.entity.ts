import { TableEntity } from 'src/etc/mixins/TableEntity';
import { generate_nanoid, NanoId, NanoIdColumnOptions } from 'src/etc/nanoid';
import { EventArtistLink } from 'src/event-artist-link/event-artist-link.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class Artist extends TableEntity {
	@PrimaryGeneratedColumn()
	artist_id: number;

	@Column(NanoIdColumnOptions)
	artist_uid: NanoId = generate_nanoid();

	@Column()
	name: string;

	@Column({ nullable: true })
	profile_image_url: string | null;

	@OneToMany(
		() => EventArtistLink,
		(event_artist_link) => event_artist_link.artist
	)
	events: EventArtistLink[];
}
