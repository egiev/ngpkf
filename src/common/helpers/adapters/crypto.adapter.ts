import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { UserIdGeneratorPort } from '@/common/helpers/ports';

@Injectable()
export class CryptoAdapter implements UserIdGeneratorPort {
  generate(plain: string): string {
    return createHash('sha256').update(plain).digest('hex');
  }
}
