import { Injectable } from '@nestjs/common';
import { authenticator, totp } from 'otplib';
import { Totp } from '@core/abstracts';

totp.options = {
  step: 300,
};

@Injectable()
export class TotpService implements Totp {
  generateSecret(): string {
    return authenticator.generateSecret();
  }

  generate(secretKey: string): string {
    return totp.generate(secretKey);
  }

  verify(token: string, secret: string): boolean {
    return totp.verify({ token, secret });
  }
}
