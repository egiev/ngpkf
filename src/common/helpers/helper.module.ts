import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HashingPort, IdGeneratorPort } from '@/common/helpers/ports';
import { TokenPort } from '@/common/helpers/ports/token.port';
import { jwtConfig, refreshJwtConfig } from '@/configs';
import { BycryptHashingAdapter, JwtTokenAdapter, UUIDGeneratorAdapter } from '@/infra/helpers/adapters';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  providers: [
    { provide: IdGeneratorPort, useClass: UUIDGeneratorAdapter },
    { provide: HashingPort, useClass: BycryptHashingAdapter },
    { provide: TokenPort, useClass: JwtTokenAdapter },
  ],
  exports: [IdGeneratorPort, HashingPort, TokenPort],
})
export class HelperModule {}
