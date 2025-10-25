import { Module } from '@nestjs/common';
import { ServiceAccountHttpModule } from '@/common/api-key/presentation/http/service-account.http.module';
import { AuthHttpModule } from '@/common/auth/presentation/http/auth.http.module';
import { UserHttpModule } from '@/iam/user/presentation/http';

@Module({
  imports: [AuthHttpModule, UserHttpModule, ServiceAccountHttpModule],
})
export class HttpApiModule {}
