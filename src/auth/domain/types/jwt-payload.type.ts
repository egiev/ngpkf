export type JwtPayload = {
  id: string;
  username: string;
  permissions: string[];
  isSuperUser: boolean;
};
