import { AuthUser } from '@/auth-user/domain/entities';

export abstract class AuthUserRepositoryPort {
  abstract save(user: AuthUser): Promise<void>;
  abstract getAll(): Promise<AuthUser[]>;
  abstract getOneById(id: string): Promise<AuthUser | null>;
  abstract getOneByUsername(id: string): Promise<AuthUser | null>;
  abstract delete(id: string): Promise<void>;
  abstract existByUsername(username: string): Promise<boolean>;
}
