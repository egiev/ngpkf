import { Module } from '@nestjs/common';
import { IsPermissionExistsConstraint } from '@/common/validation/rules';
import { PermissionInfrastructureModule } from '@/iam/permission/infrastructure/permission.infrastructure.module';

@Module({
  imports: [PermissionInfrastructureModule],
  providers: [IsPermissionExistsConstraint],
  exports: [IsPermissionExistsConstraint],
})
export class ValidationModule {}
