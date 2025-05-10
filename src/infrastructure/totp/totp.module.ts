import { Module } from '@nestjs/common';
import { Totp } from '@core/abstracts';
import { totpProvider } from './totp.provider';

@Module({
  providers: [...totpProvider],
  exports: [Totp],
})
export class TotpModule {}
