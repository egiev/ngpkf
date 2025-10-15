import {
  EntityData,
  EntityRepository,
  FilterQuery,
  FindAllOptions,
  FindOneOptions,
  RequiredEntityData,
} from '@mikro-orm/core';
import { BaseRepository } from '@/common/database/abstracts';

export class MikroOrmRepository<T extends object>
  implements BaseRepository<T, RequiredEntityData<T>, EntityData<T>, any, any>
{
  constructor(
    protected readonly repository: EntityRepository<T>,
    private readonly defaultFindOneOptions?: FindOneOptions<T>,
    private readonly defaultFindAllOptions?: FindAllOptions<T>,
  ) {}

  async create(data: RequiredEntityData<T>): Promise<T> {
    const entity = this.repository.create(data);
    await this.repository.getEntityManager().persistAndFlush(entity);
    return entity;
  }

  async createMany(data: RequiredEntityData<T>[]): Promise<T[]> {
    const entities = data.map((d) => this.repository.create(d));
    await this.repository.getEntityManager().persistAndFlush(entities);
    return entities;
  }

  async update(id: string, data: EntityData<T>): Promise<T | null> {
    const entity = await this.repository.findOne({ id } as FilterQuery<T>);
    if (!entity) return null;

    this.repository.assign(entity, data as any);
    await this.repository.getEntityManager().flush();
    return entity;
  }
  async findOneById(id: string, options?: FindOneOptions<T>): Promise<T | null> {
    const entity = await this.repository.findOne({ id } as FilterQuery<T>, options ?? this.defaultFindOneOptions);
    return entity;
  }

  async findOne(filter: FilterQuery<T>, options?: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(filter, options ?? this.defaultFindOneOptions);
  }

  async findAll(options?: FindAllOptions<T>): Promise<T[]> {
    return this.repository.findAll(options ?? this.defaultFindAllOptions);
  }

  async remove(entity: T): Promise<T> {
    await this.repository.getEntityManager().removeAndFlush(entity);
    return entity;
  }

  async removeById(id: string): Promise<boolean> {
    const entity = await this.repository.findOne({ id } as FilterQuery<T>);
    if (!entity) return false;
    await this.repository.getEntityManager().removeAndFlush(entity);
    return true;
  }
}
