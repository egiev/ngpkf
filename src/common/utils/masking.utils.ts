/* eslint-disable @typescript-eslint/no-unsafe-return */
// TODO: fix linting
import { maskEmail2, maskPhone } from 'maskdata';

export function maskEmail(email?: string | null): string {
  if (!email) return '';

  return maskEmail2(email, {
    maskWith: '*',
    unmaskedStartCharactersBeforeAt: 2,
    unmaskedEndCharactersAfterAt: 20,
    maskAtTheRate: false,
  });
}

export function maskMobile(mobile?: string | null): string {
  if (!mobile) return '';

  return maskPhone(mobile, {
    maskWith: '*',
    unmaskedStartDigits: 4,
    unmaskedEndDigits: 2,
  });
}
