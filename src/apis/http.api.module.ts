import { Module } from '@nestjs/common';
import { AuthHttpModule } from '@/modules/auth/http';
import { UserHttpModule } from '@/modules/user/http';

@Module({
  imports: [AuthHttpModule, UserHttpModule],
})
export class HttpApiModule {}
