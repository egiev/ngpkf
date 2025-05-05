import { Injectable } from '@nestjs/common';
import { EntityManager, wrap } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { Database } from '../database';
import { User } from '../database/postgres/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager(Database.Postgres) private readonly em: EntityManager,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.em.findAll(User, {});
  }

  async findOne(dto: UpdateUserDto): Promise<User | null> {
    return await this.em.findOne(User, dto);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const entity = this.em.create(User, dto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const entity = await this.em.findOne(User, id);

    if (!entity) {
      throw new Error('Entity not found');
    }

    wrap(entity).assign(dto);
    await this.em.flush();
    return entity;
  }

  async remove(id: string): Promise<void> {
    const entity = await this.em.findOne(User, id);

    if (!entity) {
      throw new Error('Entity not found');
    }

    await this.em.removeAndFlush(entity);
  }
}
