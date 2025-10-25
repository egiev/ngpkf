import { Module } from '@nestjs/common';
import { ServiceAccountHttpModule } from '@/api-key/presentation/http';
import { UserHttpModule } from '@/auth-user/presentation/http';
import { AuthHttpModule } from '@/auth/presentation/http';

@Module({
  imports: [AuthHttpModule, UserHttpModule, ServiceAccountHttpModule],
})
export class HttpApiModule {}
