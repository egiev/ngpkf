import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig, refreshJwtConfig } from '@/config';
import { UserCoreModule } from '@/modules/user/core';
import { AuthService } from './services';

@Module({
  imports: [
    UserCoreModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  providers: [AuthService],
  controllers: [],
})
export class AuthModule {}
