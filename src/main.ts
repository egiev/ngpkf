import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import adminInit from './admin';
import { AppModule } from './app.module';
import kafkaInit from './kafka';
import swaggerInit from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await adminInit(app);

  await kafkaInit(app);

  swaggerInit(app);

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
