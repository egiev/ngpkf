import { Module } from '@nestjs/common';
import { IssueServiceTokenUseCase } from '@/common/api-key/application/issue-service-token.use-case';
import { ApiKeyInfrastructureModule } from '@/common/api-key/infrastructure/api-key.infrastructure.module';
import { HelperModule } from '@/common/helpers/helper.module';

@Module({
  imports: [ApiKeyInfrastructureModule, HelperModule],
  providers: [IssueServiceTokenUseCase],
  exports: [IssueServiceTokenUseCase],
})
export class ApiKeyModule {}
