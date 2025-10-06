import { UserEntity } from '@/modules/user/entities';

export type AuthPayload = {
  user: UserEntity;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};
