import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { initDynamicImports } from './etc/esm';
import { EntityNotFoundFilter } from './etc/exceptions/EntityNotFoundFilter';
import initializeEnvironment from './etc/initializeEnvironment';

dotenv.config({ path: '.env' });

async function bootstrap() {
	await initializeEnvironment(['db', 'google-maps']);
	await initDynamicImports();

	const app = await NestFactory.create(AppModule);

	// Validation pipe config
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
			disableErrorMessages: false, // Show detailed error messages
			validationError: { target: false } // Do not expose the value in the error output
		})
	);

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
