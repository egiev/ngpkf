import { User } from '@/auth-user/domain/entities';

export abstract class UserRepositoryPort {
  abstract save(user: User): Promise<void>;
  abstract getAll(): Promise<User[]>;
  abstract getOneById(id: string): Promise<User | null>;
  abstract getOneByUsername(id: string): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
  abstract existByUsername(username: string): Promise<boolean>;
}
