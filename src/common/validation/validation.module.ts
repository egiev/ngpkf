import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from '@/auth-user/infrastructure/user.infrastructure.module';
import { IsPermissionExistsConstraint } from '@/common/validation/rules';

@Module({
  imports: [UserInfrastructureModule],
  providers: [IsPermissionExistsConstraint],
  exports: [IsPermissionExistsConstraint],
})
export class ValidationModule {}
