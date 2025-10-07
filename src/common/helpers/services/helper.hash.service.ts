import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class HelperHashService {
  async hash(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async compare(plain: string, hashed: string) {
    return await bcrypt.compare(plain, hashed);
  }
}
