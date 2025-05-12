// src/filters/entity-not-found.filter.ts
import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
	catch(exception: EntityNotFoundError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const status = HttpStatus.NOT_FOUND;

		response.status(status).json({
			statusCode: status,
			message:
				'The requested entity was not found or does not belong to the current user.'
		});
	}
}
