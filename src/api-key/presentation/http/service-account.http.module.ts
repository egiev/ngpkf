import { Module } from '@nestjs/common';
import { ApiKeyModule } from '@/api-key/api-key.module';
import { ServiceAuthHttpController } from '@/api-key/presentation/http/service-account.http.controller';

@Module({
  imports: [ApiKeyModule],
  controllers: [ServiceAuthHttpController],
})
export class ServiceAccountHttpModule {}
