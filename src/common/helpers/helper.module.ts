import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  BycryptHashingAdapter,
  CryptoAdapter,
  DateFnsAdapter,
  EmailAdapter,
  JwtTokenAdapter,
  LocalStorageAdapter,
  MuhammaraAdapter,
  OtpLibAdapter,
  UUIDGeneratorAdapter,
} from '@/common/helpers/adapters';
import {
  DatePort,
  EmailPort,
  HashingPort,
  IdGeneratorPort,
  PdfPort,
  StoragePort,
  TokenPort,
  TOTPPort,
  UserIdGeneratorPort,
} from '@/common/helpers/ports';
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
    { provide: DatePort, useClass: DateFnsAdapter },
    { provide: UserIdGeneratorPort, useClass: CryptoAdapter },
    { provide: TOTPPort, useClass: OtpLibAdapter },
    { provide: EmailPort, useClass: EmailAdapter },
    { provide: StoragePort, useClass: LocalStorageAdapter },
    { provide: PdfPort, useClass: MuhammaraAdapter },
  ],
  exports: [
    IdGeneratorPort,
    HashingPort,
    TokenPort,
    DatePort,
    UserIdGeneratorPort,
    TOTPPort,
    EmailPort,
    StoragePort,
    PdfPort,
  ],
})
export class HelperModule {}
