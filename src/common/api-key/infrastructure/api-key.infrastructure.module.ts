import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ServiceAccountRepositoryPort } from '@/common/api-key/domain/ports/service-account.repository.port';
import { MikroormApiKeyRespositoryAdapter } from '@/common/api-key/infrastructure/persisntence/adapters/mikoorm.service-account.respository.adapter';
import { ServiceAccountEntity } from '@/common/api-key/infrastructure/persisntence/entities/service-account.entity';
import { ENUM_CONFIG_KEY } from '@/configs';

@Module({
  imports: [MikroOrmModule.forFeature([ServiceAccountEntity], ENUM_CONFIG_KEY.Postgres)],
  providers: [
    {
      provide: ServiceAccountRepositoryPort,
      useClass: MikroormApiKeyRespositoryAdapter,
    },
  ],
  exports: [ServiceAccountRepositoryPort],
})
export class ApiKeyInfrastructureModule {}
