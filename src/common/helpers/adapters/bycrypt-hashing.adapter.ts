import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingPort } from '@/common/helpers/ports';

@Injectable()
export class BycryptHashingAdapter implements HashingPort {
  async hash(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async compare(plain: string, hashed: string) {
    return await bcrypt.compare(plain, hashed);
  }
}
