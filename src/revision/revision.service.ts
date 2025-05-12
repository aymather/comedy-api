import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicEvent } from 'src/event/dto/entity.dto';
import { Event } from 'src/event/event.entity';
import { Repository } from 'typeorm';
import { MarkEventAsRevisedParamsDto } from './dto/mark-event-as-revised.dto';
import { UndoLastEventRevisionResponseDto } from './dto/undo-last-revision.dto';

@Injectable()
export class RevisionService {
	constructor(
		@InjectRepository(Event)
		private readonly eventsRepository: Repository<Event>
	) {}

	async getNextEventToRevise() {
		const event = await this.eventsRepository.findOne({
			where: {
				needs_revision: true
			}
		});

		// Get the number of events that need revision
		const numberOfEventsToRevise = await this.eventsRepository.count({
			where: {
				needs_revision: true
			}
		});

		return {
			event_uid: event?.event_uid || null,
			numberOfEventsToRevise
		};
	}

	async markEventAsRevised(
		markEventAsRevisedParamsDto: MarkEventAsRevisedParamsDto
	) {
		const event = await this.eventsRepository.findOneByOrFail({
			event_uid: markEventAsRevisedParamsDto.event_uid
		});

		event.needs_revision = false;
		event.last_revised_at = new Date();
		await this.eventsRepository.save(event);
	}

	async undoLastEventRevision(): Promise<UndoLastEventRevisionResponseDto> {
		const event = await this.eventsRepository.findOne({
			where: {
				needs_revision: false
			},
			order: {
				last_revised_at: 'DESC'
			}
		});

		event.needs_revision = true;
		event.last_revised_at = null;
		await this.eventsRepository.save(event);

		return event.cast(PublicEvent);
	}
}
