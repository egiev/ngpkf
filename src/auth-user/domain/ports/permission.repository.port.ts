export abstract class PermissionRepositoryPort {
  abstract existsByName(name: string): Promise<boolean>;
  abstract existsByNames(names: string[]): Promise<boolean[]>;
}
