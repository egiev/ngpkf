import { SHA256 } from 'crypto-js';

export const generateUserId = (mrn: string, secretKey): string => {
  return SHA256(mrn + secretKey).toString();
};
