import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { BaseRepository } from '@/common/database/abstracts';

export class MikroOrmRepository<T extends object> implements BaseRepository<T> {
  constructor(protected readonly repository: EntityRepository<T>) {}

  async findAll(filter?: Partial<T>): Promise<T[]> {
    return await this.repository.findAll(filter);
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    return await this.repository.findOne(filter);
  }

  async create(data: T): Promise<T> {
    const entity = this.repository.create(data);
    await this.repository.getEntityManager().persistAndFlush(entity);
    return entity;
  }

  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    const entity = await this.repository.findOne({ id } as FilterQuery<T>);
    if (!entity) return null;

    wrap(entity).assign(data as any);
    await this.repository.getEntityManager().persistAndFlush(entity);
    return entity;
  }

  async delete(id: string | number): Promise<boolean> {
    const entity = await this.repository.findOne({ id } as FilterQuery<T>);
    if (!entity) return false;

    await this.repository.getEntityManager().removeAndFlush(entity);
    return true;
  }
}
