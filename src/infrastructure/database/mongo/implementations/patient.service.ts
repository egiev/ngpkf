import { Injectable } from '@nestjs/common';
import { EntityManager, wrap } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { PatientEntity } from '@core/entities';
import { PatientRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { PatientOrmEntity } from '../entities';

@Injectable()
export class PatientService implements PatientRepository {
  constructor(
    @InjectEntityManager(Database.Mongo) private readonly em: EntityManager,
  ) {}

  async find(
    query?: Partial<PatientEntity> | undefined,
  ): Promise<PatientEntity[]> {
    return await this.em.findAll(PatientEntity, {});
  }

  async findOne(id: string): Promise<PatientEntity | null> {
    return await this.em.findOne(PatientOrmEntity, { mrn: id });
  }

  async create(item: PatientEntity): Promise<PatientEntity> {
    const entity = this.em.create(PatientOrmEntity, item);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async update(id: string, item: PatientEntity): Promise<PatientEntity | null> {
    const entity = await this.em.findOne(PatientOrmEntity, id);

    if (!entity) return null;

    wrap(entity).assign(item);
    await this.em.flush();
    return entity;
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.em.findOne(PatientOrmEntity, id);
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
