import {
	AddressComponent,
	LatLngBounds
} from '@googlemaps/google-maps-services-js';
import { TableEntity } from 'src/etc/mixins/TableEntity';
import { SerialRelationId } from 'src/etc/types';
import {
	Column,
	Entity,
	Index,
	Polygon,
	PrimaryGeneratedColumn,
	Unique
} from 'typeorm';

@Entity()
@Unique(['place_id'])
export class Location extends TableEntity {
	@PrimaryGeneratedColumn()
	location_id: SerialRelationId;

	@Column()
	place_id: string;

	// For point locations (always present for any type of location)
	@Column('decimal', { precision: 10, scale: 8 })
	latitude: number;

	@Column('decimal', { precision: 11, scale: 8 })
	longitude: number;

	@Column({ nullable: true })
	name: string | null;

	@Column({ nullable: true })
	formatted_address: string;

	// For polygon areas (like city boundaries)
	@Column('geometry', {
		spatialFeatureType: 'Polygon',
		srid: 4326,
		nullable: true
	})
	@Index({ spatial: true })
	boundary: Polygon;

	// For address components (international support)
	@Column('jsonb', { nullable: true })
	address_components: AddressComponent[];

	@Column('jsonb', { nullable: true })
	viewport: LatLngBounds;
}
