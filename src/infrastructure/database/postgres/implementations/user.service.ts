import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { UserEntity } from '@core/entities';
import { UserRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { UserOrmEntity } from '../entities';

@Injectable()
export class UserService implements UserRepository {
  constructor(
    @InjectEntityManager(Database.Postgres) private readonly em: EntityManager,
  ) {}

  async find(query?: Partial<UserEntity> | undefined): Promise<UserEntity[]> {
    return await this.em.findAll(UserOrmEntity, {});
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return await this.em.findOne(UserOrmEntity, { userId: id });
  }

  async create(item: UserEntity): Promise<UserEntity> {
    const entity = this.em.create(UserOrmEntity, item);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async update(id: string, item: UserEntity): Promise<UserEntity | null> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
