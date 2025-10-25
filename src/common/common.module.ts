import { Module } from '@nestjs/common';
import { GuardModule } from '@/common/guards';
import { HelperModule } from '@/common/helpers';
import { ValidationModule } from '@/common/validation';

@Module({
  imports: [ValidationModule, HelperModule, GuardModule],
  exports: [ValidationModule, HelperModule, GuardModule],
})
export class CommonModule {}
