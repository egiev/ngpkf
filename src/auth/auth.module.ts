import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from '@/auth-user/infrastructure';
import { LoginWithCredentialsUseCase, RefreshTokenUseCase } from '@/auth/application';
import { JwtStrategy } from '@/auth/infrastructure/strategies';
import { HelperModule } from '@/common/helpers';

@Module({
  imports: [UserInfrastructureModule, HelperModule],
  providers: [JwtStrategy, LoginWithCredentialsUseCase, RefreshTokenUseCase],
  exports: [LoginWithCredentialsUseCase, RefreshTokenUseCase],
})
export class AuthModule {}
