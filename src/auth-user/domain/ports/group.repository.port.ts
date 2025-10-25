export abstract class GroupRepositoryPort {
  abstract existsByName(name: string): Promise<boolean>;
  abstract existsByNames(names: string[]): Promise<boolean[]>;
}
