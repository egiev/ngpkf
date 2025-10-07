import { UserEntity } from '@/modules/user/core/entities';

export type AuthPayload = {
  user: UserEntity;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};
