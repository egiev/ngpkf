import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { PERMISSION_OPTIONS_TOKEN, PermissionOptions } from './permission-options.type';
import { PermissionGuard } from './permission.guard';
import { SuperUserGuard } from './super-admin.guard';

@Module({
  imports: [],
  providers: [
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
  exports: [PERMISSION_OPTIONS_TOKEN, JwtAuthGuard, SuperUserGuard, PermissionGuard],
})
export class GuardModule {}
