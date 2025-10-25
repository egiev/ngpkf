import { BaseVO } from '@/common/ddd';

export type AuthTokenProps = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expirationTimestamp: number;
};

export class AuthTokenVO extends BaseVO<AuthTokenProps> {
  protected ensureInvariants(): void {
    const { accessToken, refreshToken, expiresIn, expirationTimestamp } = this.value;

    if (!accessToken) {
      throw new Error('Access token is empty');
    }

    if (!refreshToken) {
      throw new Error('Refresh token is empty');
    }

    if (!expiresIn || !Number.isInteger(expiresIn)) {
      throw new Error('ExpiresIn is invalid or empty');
    }

    if (!expirationTimestamp || !Number.isInteger(expirationTimestamp)) {
      throw new Error('ExpiresIn is invalid or empty');
    }
  }
}
