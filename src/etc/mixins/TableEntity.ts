import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { isoUtcTransformerWithMilliseconds } from '../transformers/isoUtcTransformer';
import { BaseEntity } from './BaseEntity';

export abstract class TableEntity extends BaseEntity {
	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
		name: 'created_at',
		transformer: isoUtcTransformerWithMilliseconds
	})
	created_at: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
		name: 'updated_at',
		transformer: isoUtcTransformerWithMilliseconds
	})
	updated_at: Date;
}
