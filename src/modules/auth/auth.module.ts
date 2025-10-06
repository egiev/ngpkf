import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig, refreshJwtConfig } from '@/config';
import { UserModule } from '@/modules/user/user.module';
import { AuthService } from './services';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    UserModule,
  ],
  providers: [AuthService],
  controllers: [],
})
export class AuthModule {}
