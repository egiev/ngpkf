import { Injectable } from '@nestjs/common';
import { authenticator, totp } from 'otplib';
import { TOTPPort } from '@/common/helpers/ports';

totp.options = {
  step: 300,
};

@Injectable()
export class OtpLibAdapter implements TOTPPort {
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
