import { Module } from '@nestjs/common';
import { AuthUserHttpModule } from '@/auth-user/presentation/http';
import { AuthHttpModule } from '@/auth/presentation/http';

@Module({
  imports: [AuthHttpModule, AuthUserHttpModule],
  exports: [],
})
export class HttpApiModule {}
