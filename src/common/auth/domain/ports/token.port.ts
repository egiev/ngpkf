import { AuthTokenVO } from '@/common/auth/domain/value-objects/auth-token.vo';
import { User } from '@/iam/user/domain/entities';

export abstract class TokenPort {
  abstract createToken(user: User): Promise<AuthTokenVO>;
  abstract refreshToken(refreshToken: string): Promise<AuthTokenVO>;
}
