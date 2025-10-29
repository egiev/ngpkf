export abstract class AuthGroupRepositoryPort {
  abstract existsByName(name: string): Promise<boolean>;
  abstract existsByNames(names: string[]): Promise<boolean[]>;
}
