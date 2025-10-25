import { Module } from '@nestjs/common';
import { UserHttpModule } from '@/auth-user/presentation/http';
import { ServiceAccountHttpModule } from '@/common/api-key/presentation/http/service-account.http.module';
import { AuthHttpModule } from '@/common/auth/presentation/http/auth.http.module';

@Module({
  imports: [AuthHttpModule, UserHttpModule, ServiceAccountHttpModule],
})
export class HttpApiModule {}
