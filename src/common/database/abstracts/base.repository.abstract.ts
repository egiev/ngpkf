export abstract class BaseRepository<T> {
  abstract findAll(filter?: Partial<T>): Promise<T[]>;
  abstract findOne(filter: Partial<T>): Promise<T | null>;
  abstract create(data: Partial<T>): Promise<T>;
  abstract update(id: string | number, data: Partial<T>): Promise<T | null>;
  abstract delete(id: string | number): Promise<boolean>;
}
