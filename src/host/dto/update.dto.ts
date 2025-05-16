import { IsString } from 'src/etc/decorators/IsString';
import { IsNanoid, NanoId } from 'src/etc/nanoid';
import { PublicHost } from './entity.dto';

export class UpdateHostParamsDto {
	@IsNanoid()
	host_uid: NanoId;
}

export class UpdateHostBodyDto {
	@IsString({ allowUndefined: true })
	name: string;

	@IsString({ allowUndefined: true, nullable: true })
	profile_image_url: string;

	@IsString({ allowUndefined: true, nullable: true })
	stage_image_url: string;

	@IsString({ allowUndefined: true, nullable: true })
	description: string;

	@IsString({ allowUndefined: true, nullable: true })
	website_url: string;

	@IsString({ allowUndefined: true, nullable: true })
	instagram_url: string;

	@IsString({ allowUndefined: true, nullable: true })
	twitter_url: string;

	@IsString({ allowUndefined: true, nullable: true })
	facebook_url: string;

	@IsString({ allowUndefined: true, nullable: true })
	youtube_url: string;

	@IsString({ allowUndefined: true, nullable: true })
	tiktok_url: string;

	@IsString({ allowUndefined: true, nullable: true })
	x_url: string;
}

export class UpdateHostResponseDto extends PublicHost {}
