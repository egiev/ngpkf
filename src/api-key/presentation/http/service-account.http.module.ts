import { Module } from '@nestjs/common';
import { ApiKeyModule } from '@/api-key';
import { ServiceAuthHttpController } from '@/api-key/presentation/http';

@Module({
  imports: [ApiKeyModule],
  controllers: [ServiceAuthHttpController],
})
export class ServiceAccountHttpModule {}
