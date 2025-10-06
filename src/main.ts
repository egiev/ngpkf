import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import adminInit from '@/infra/admin/admin.setup';
import kafkaInit from '@/infra/kafka/kafka.setup';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await adminInit(app);

  await kafkaInit(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
