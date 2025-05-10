import { maskEmail2, maskPhone } from 'maskdata';

export function maskEmail(email: string): string {
  return maskEmail2(email, {
    maskWith: '*',
    unmaskedStartCharactersBeforeAt: 2,
    unmaskedEndCharactersAfterAt: 20,
    maskAtTheRate: false,
  });
}

export function maskMobile(mobile: string) {
  return maskPhone(mobile, {
    maskWith: '*',
    unmaskedStartDigits: 4,
    unmaskedEndDigits: 2,
  });
}
