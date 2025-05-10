export abstract class Totp {
  abstract generateSecret(): string;
  abstract generate(secret: string): string;
  abstract verify(token: string, secret: string): boolean;
}
