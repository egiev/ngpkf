import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginWithCredentialsUseCase } from '@/common/auth/application/login-with-credentials.use-case';
import { RefreshTokenUseCase } from '@/common/auth/application/refresh-token.use-case';
import { AuthInfrastructureModule } from '@/common/auth/infrastructure/auth.infrastructure.module';
import { JwtStrategy } from '@/common/auth/infrastructure/strategies/jwt.strategy';
import {
  PERMISSION_OPTIONS_TOKEN,
  PermissionOptions,
} from '@/common/auth/infrastructure/types/permission-options.type';
import { JwtAuthGuard } from '@/common/auth/presentation/guards/auth.guard';
import { PermissionGuard } from '@/common/auth/presentation/guards/permission.guard';
import { SuperUserGuard } from '@/common/auth/presentation/guards/super-admin.guard';
import { HelperModule } from '@/common/helpers/helper.module';
import { UserInfrastructureModule } from '@/iam/user/infrastructure/user.infrastructure.module';

@Module({
  imports: [UserInfrastructureModule, AuthInfrastructureModule, HelperModule],
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
