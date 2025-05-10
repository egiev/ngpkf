export abstract class GenericRepository<T> {
  abstract find(query?: Partial<T>): Promise<T[]>;

  abstract findOne(id: string): Promise<T | null>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T): Promise<T | null>;

  abstract delete(id: string): Promise<boolean>;
}
