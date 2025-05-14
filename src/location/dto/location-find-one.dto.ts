import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsNanoid } from 'src/etc/nanoid';
import { Location } from '../location.entity';

export class FindOneLocationParamsDto {
	@Expose()
	@IsNotEmpty()
	@IsNanoid()
	location_uid: string;
}

export class FindOneLocationResponseDto extends Location {}
