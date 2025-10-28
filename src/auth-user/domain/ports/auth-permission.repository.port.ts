export abstract class AuthPermissionRepositoryPort {
  abstract existsByName(name: string): Promise<boolean>;
  abstract existsByNames(names: string[]): Promise<boolean[]>;
}
