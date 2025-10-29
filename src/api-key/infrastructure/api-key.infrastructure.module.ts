import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ServiceAccountRepositoryPort } from '@/api-key/domain/ports';
import { MikroormApiKeyRespositoryAdapter } from '@/api-key/infrastructure/persistence/adapters';
import { ServiceAccountEntity } from '@/api-key/infrastructure/persistence/entities';
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
