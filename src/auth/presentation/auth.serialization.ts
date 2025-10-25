import { Expose } from 'class-transformer';

export class AuthSerialization {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  expiresIn: string;

  @Expose()
  expirationTimestamp: number;
}
