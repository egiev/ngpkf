import { Module } from '@nestjs/common';
import { AuthUserInfrastructureModule } from '@/auth-user/infrastructure/auth-user.infrastructure.module';
import { IsPermissionExistsConstraint } from '@/common/validation/rules';

@Module({
  imports: [AuthUserInfrastructureModule],
  providers: [IsPermissionExistsConstraint],
  exports: [IsPermissionExistsConstraint],
})
export class ValidationModule {}
