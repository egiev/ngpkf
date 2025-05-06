import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundFilter } from './exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Global Exception Filter
  app.useGlobalFilters(new EntityNotFoundFilter());

  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
