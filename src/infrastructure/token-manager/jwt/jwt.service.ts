import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenManager } from '@core/abstracts';

@Injectable()
export class JwtService implements TokenManager {
  private readonly secretKey = process.env.SECRET_KEY || '';

  sign(config: any): string {
    return jwt.sign(config, this.secretKey, { expiresIn: '5m' });
  }

  verify(token: string): any {
    return jwt.verify(token, this.secretKey);
  }
}
