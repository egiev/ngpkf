export type BaseRepository<T extends object, C = Partial<T>, U = Partial<T>, F = any, O = any> = {
  create(data: C): Promise<T>;
  createMany(data: C[]): Promise<T[]>;
  update(id: string, data: U): Promise<T | null>;
  findOneById(id: string, options?: O): Promise<T | null>;
  findOne(filter: F, options?: O): Promise<T | null>;
  findAll(options?: O): Promise<T[]>;
  remove(entity: T): Promise<T>;
  removeById(id: string): Promise<boolean>;
};
