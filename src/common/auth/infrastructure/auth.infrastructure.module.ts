import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenPort } from '@/common/auth/domain/ports/token.port';
import { JwtTokenAdapter } from '@/common/auth/infrastructure/adapters/jwt.token.adapter';
import { jwtConfig, refreshJwtConfig } from '@/configs';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  providers: [{ provide: TokenPort, useClass: JwtTokenAdapter }],
  exports: [TokenPort],
})
export class AuthInfrastructureModule {}
