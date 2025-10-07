import { Module } from '@nestjs/common';
import { HelperModule } from '@/common/helpers/helper.module';

@Module({
  imports: [HelperModule],
  exports: [HelperModule],
})
export class CommonModule {}
