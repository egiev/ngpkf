import { Module } from '@nestjs/common';
import { totpProvider } from './totp.provider';

@Module({
  providers: [...totpProvider],
  exports: [...totpProvider],
})
export class TotpModule {}
