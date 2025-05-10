import { SHA256 } from 'crypto-js';

export function generateUserId(mrn: string, secretKey: string): string {
  return SHA256(mrn + secretKey).toString();
}
