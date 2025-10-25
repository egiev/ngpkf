import { Module } from '@nestjs/common';
import { ServiceAccountHttpModule } from '@/api-key/presentation/http/service-account.http.module';
import { UserHttpModule } from '@/auth-user/presentation/http';
import { AuthHttpModule } from '@/common/auth/presentation/http/auth.http.module';

@Module({
  imports: [AuthHttpModule, UserHttpModule, ServiceAccountHttpModule],
})
export class HttpApiModule {}
