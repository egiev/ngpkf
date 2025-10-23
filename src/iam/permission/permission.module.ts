import { Module } from '@nestjs/common';
import { PermissionInfrastructureModule } from '@/iam/permission/infrastructure/permission.infrastructure.module';

@Module({
  imports: [PermissionInfrastructureModule],
})
export class PermissionModule {}
