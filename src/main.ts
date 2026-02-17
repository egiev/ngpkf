import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import adminInit from './admin';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/pipes';
import kafkaInit from './kafka';
import swaggerInit from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await adminInit(app);

  await kafkaInit(app);

  swaggerInit(app);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new CustomValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
