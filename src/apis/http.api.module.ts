import { Module } from '@nestjs/common';
import { UserHttpModule } from '@/modules/user/http';

@Module({
  imports: [UserHttpModule],
})
export class HttpApiModule {}
