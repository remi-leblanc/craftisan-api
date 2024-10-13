import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
	
	const httpsOptions = {
		key: fs.readFileSync('./src/cert/key.pem'),
		cert: fs.readFileSync('./src/cert/cert.pem'),
	  };

	const app = await NestFactory.create(AppModule, { httpsOptions });

	app.setGlobalPrefix('api');

	app.use(cookieParser());

	app.enableCors({
		origin: [
		   'https://localhost:3000',
		],
		credentials: true,
	 });

	await app.listen(4000);
}
bootstrap();
