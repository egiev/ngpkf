export type JwtPayload = {
  sub: string;
  username: string;
  permissions: string[];
  isSuperUser: boolean;
};
