import { AuthUser } from '@/auth-user/domain/entities';
import { Token } from '@/common/helpers/ports';

export type LoginWithCredentialsResponse = Token & { user: AuthUser };
