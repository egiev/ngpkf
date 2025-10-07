export type JwtPayload = {
  sub: string;
  username: string;
  permissions: string[];
  iat?: number;
  exp?: number;
};
