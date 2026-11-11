import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
const config = app.get(ConfigService);
const port = Number(config.get<string>('PORT') ?? '3000');
await app.listen(port);
console.log(`Application running on http://localhost:${port}`);
}
await bootstrap();
