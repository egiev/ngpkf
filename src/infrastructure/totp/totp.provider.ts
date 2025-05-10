import { Provider } from '@nestjs/common';
import { Totp } from '@core/abstracts';
import { TotpService } from './totp.service';

export const totpProvider: Provider[] = [
  {
    provide: Totp,
    useClass: TotpService,
  },
];
