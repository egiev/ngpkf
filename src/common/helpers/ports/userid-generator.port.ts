export abstract class UserIdGeneratorPort {
  abstract generate(plain: string): string;
}
