import { NestFactory } from '@nestjs/core';
import { setupAdmin } from '@/adminjs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await setupAdmin(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
