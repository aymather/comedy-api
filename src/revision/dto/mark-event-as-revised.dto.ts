import { IsNanoid, NanoId } from 'src/etc/nanoid';

export class MarkEventAsRevisedParamsDto {
	@IsNanoid()
	event_uid: NanoId;
}
