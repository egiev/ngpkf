import { Module } from '@nestjs/common';
import { AuthHttpModule } from '@/common/auth/presentation/http/auth.http.module';
import { UserHttpModule } from '@/iam/user/presentation/http';

@Module({
  imports: [AuthHttpModule, UserHttpModule],
})
export class HttpApiModule {}
