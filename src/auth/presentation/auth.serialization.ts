import { Expose, Transform, Type } from 'class-transformer';

export class UserSerialization {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  @Transform(({ obj }) => obj.groupNames || [])
  roles: string[];

  @Expose()
  isSuperUser: boolean;
}
export class AuthSerialization {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  expiresIn: string;

  @Expose()
  expirationTimestamp: number;

  @Expose()
  @Type(() => UserSerialization)
  user: UserSerialization;
}
