import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserInfrastructureModule } from '@/auth-user/infrastructure/user.infrastructure.module';
import { LoginWithCredentialsUseCase } from '@/auth/application/login-with-credentials.use-case';
import { RefreshTokenUseCase } from '@/auth/application/refresh-token.use-case';
import { JwtStrategy } from '@/auth/infrastructure/strategies/jwt.strategy';
import { PERMISSION_OPTIONS_TOKEN, PermissionOptions } from '@/auth/infrastructure/types/permission-options.type';
import { JwtAuthGuard } from '@/auth/presentation/guards/auth.guard';
import { PermissionGuard } from '@/auth/presentation/guards/permission.guard';
import { SuperUserGuard } from '@/auth/presentation/guards/super-admin.guard';
import { HelperModule } from '@/common/helpers/helper.module';

@Module({
  imports: [UserInfrastructureModule, HelperModule],
  providers: [
    JwtStrategy,
    LoginWithCredentialsUseCase,
    RefreshTokenUseCase,
    {
      provide: PERMISSION_OPTIONS_TOKEN,
      useFactory: (configService: ConfigService): PermissionOptions => ({
        defaultDomain: configService.get<string>('PROJECT_NAME') || 'app',
      }),
      inject: [ConfigService],
    },
    JwtAuthGuard,
    SuperUserGuard,
    PermissionGuard,
  ],
  exports: [
    LoginWithCredentialsUseCase,
    RefreshTokenUseCase,
    PERMISSION_OPTIONS_TOKEN,
    JwtAuthGuard,
    SuperUserGuard,
    PermissionGuard,
  ],
})
export class AuthModule {}
