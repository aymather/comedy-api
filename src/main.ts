import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { EntityNotFoundFilter } from './etc/exceptions/EntityNotFoundFilter';
import initializeEnvironment from './etc/initializeEnvironment';

dotenv.config({ path: '.env' });

async function bootstrap() {
	await initializeEnvironment(['db', 'google-maps']);
	const app = await NestFactory.create(AppModule);

	const enabledOrigins = [];
	enabledOrigins.push('http://localhost:5173');

	app.useGlobalFilters(new EntityNotFoundFilter());

	app.enableCors({
		origin: enabledOrigins,
		credentials: true
	});

	await app.listen(8080);
}

bootstrap();
