import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
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
    throw new Error('Method not implemented.');
  }

  async findOne(id: string): Promise<PatientEntity | null> {
    const em = this.em.fork();
    const patient = await em.findOne(PatientOrmEntity, { mrn: id });
    if (!patient) return null;
    return {
      ...patient,
      id: patient._id.toHexString(),
    };
  }

  async create(item: PatientEntity): Promise<PatientEntity> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, item: PatientEntity): Promise<PatientEntity | null> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
