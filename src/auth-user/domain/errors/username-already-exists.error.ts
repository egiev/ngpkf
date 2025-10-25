export class UsernameAlreadyExistError extends Error {
  constructor(private readonly username: string) {
    super(`Username ${username} already exist`);
  }
}
