import { Expose } from 'class-transformer';
import { IsNanoid } from 'src/etc/nanoid';
import { Location } from '../location.entity';

export class UpdateLocationParamsDto {
	@Expose()
	@IsNanoid()
	location_uid: string;
}

export class UpdateLocationBodyDto {}

export class UpdateLocationResponseDto extends Location {}
