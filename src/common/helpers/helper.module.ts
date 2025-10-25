import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BycryptHashingAdapter, JwtTokenAdapter, UUIDGeneratorAdapter } from '@/common/helpers/adapters';
import { HashingPort, IdGeneratorPort, TokenPort } from '@/common/helpers/ports';
import { jwtConfig, refreshJwtConfig } from '@/configs';

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
