import { Injectable } from '@nestjs/common';
import { EntityManager, wrap } from '@mikro-orm/core';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<User[]> {
    return await this.em.findAll(User, {});
  }

  async findOne(id: string): Promise<User> {
    return await this.em.findOneOrFail(User, { id });
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
