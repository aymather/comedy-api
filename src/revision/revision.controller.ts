import { Controller, Get, Param, Patch } from '@nestjs/common';
import { MarkEventAsRevisedParamsDto } from './dto/mark-event-as-revised.dto';
import { UndoLastEventRevisionResponseDto } from './dto/undo-last-revision.dto';
import { RevisionService } from './revision.service';

@Controller('revision')
export class RevisionController {
	constructor(private readonly revisionService: RevisionService) {}

	@Get('event')
	async getNextEventToRevise() {
		return this.revisionService.getNextEventToRevise();
	}

	@Patch('event/:event_uid/mark-as-revised')
	async markEventAsRevised(
		@Param() markEventAsRevisedParamsDto: MarkEventAsRevisedParamsDto
	) {
		return this.revisionService.markEventAsRevised(markEventAsRevisedParamsDto);
	}

	@Patch('event/undo-last-revision')
	async undoLastEventRevision(): Promise<UndoLastEventRevisionResponseDto> {
		return this.revisionService.undoLastEventRevision();
	}
}
