import { Expose } from 'class-transformer';
import { IsNanoid } from 'src/etc/nanoid';
import { Location } from '../location.entity';

export class DeleteLocationParamsDto {
	@Expose()
	@IsNanoid()
	location_uid: string;
}

export class DeleteLocationResponseDto extends Location {}
