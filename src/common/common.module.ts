import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { HelperModule } from '@/common/helpers/helper.module';
import { ValidationModule } from '@/common/validation/validation.module';

@Module({
  imports: [AuthModule, ValidationModule, HelperModule],
  exports: [AuthModule, ValidationModule, HelperModule],
})
export class CommonModule {}
