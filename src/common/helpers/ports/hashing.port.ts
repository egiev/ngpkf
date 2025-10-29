export abstract class HashingPort {
  abstract hash(password: string): Promise<string>;
  abstract compare(plain: string, hashed: string): Promise<boolean>;
}
