import { Module } from '@nestjs/common';
import { GroupInfrastructureModule } from '@/iam/group/infrastructure/group.infrastructure.module';

@Module({
  imports: [GroupInfrastructureModule],
})
export class GroupModule {}
