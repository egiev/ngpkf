export type CreateUserRequest = {
  readonly username: string;
  readonly password: string;
  readonly isSuperUser?: boolean;
  readonly permissions?: string[];
};
