import { TableEntity } from 'src/etc/mixins/TableEntity';
import { generate_nanoid, NanoId, NanoIdColumnOptions } from 'src/etc/nanoid';
import { SerialRelationId } from 'src/etc/types';
import { Venue } from 'src/venue/venue.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HostType } from './dto/types';

@Entity('host')
export class Host extends TableEntity {
	@PrimaryGeneratedColumn()
	host_id: SerialRelationId;

	@Column(NanoIdColumnOptions)
	host_uid: NanoId = generate_nanoid();

	@Column()
	name: string;

	@Column({ nullable: true })
	profile_image_url: string | null;

	@Column({ nullable: true })
	stage_image_url: string | null;

	@Column({ type: 'enum', enum: HostType })
	type: HostType;

	@OneToMany(() => Venue, (venue) => venue.host)
	venues: Venue[];

	@Column({ nullable: true })
	description: string | null;

	@Column({ nullable: true })
	website_url: string | null;

	@Column({ nullable: true })
	instagram_url: string | null;

	@Column({ nullable: true })
	instagram_handle: string | null;

	@Column({ nullable: true })
	tiktok_url: string | null;

	@Column({ nullable: true })
	tiktok_handle: string | null;

	@Column({ nullable: true })
	facebook_url: string | null;

	@Column({ nullable: true })
	facebook_handle: string | null;

	@Column({ nullable: true })
	x_url: string | null;

	@Column({ nullable: true })
	x_handle: string | null;

	@Column({ nullable: true })
	youtube_url: string | null;

	@Column({ nullable: true })
	youtube_handle: string | null;
}
