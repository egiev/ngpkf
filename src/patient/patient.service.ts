import { Injectable } from '@nestjs/common';
import { EntityManager, wrap } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { Database } from '../database';
import { Patient } from '../database/mongo/entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update.patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectEntityManager(Database.Mongo) private readonly em: EntityManager,
  ) {}

  async findAll(): Promise<Patient[]> {
    return await this.em.findAll(Patient, {});
  }

  async findOne(mrn: string): Promise<Patient> {
    return await this.em.findOneOrFail(Patient, { mrn });
  }

  async create(dto: CreatePatientDto): Promise<Patient> {
    const entity = this.em.create(Patient, dto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async update(id: string, dto: UpdatePatientDto): Promise<Patient> {
    const entity = await this.em.findOne(Patient, id);

    if (!entity) {
      throw new Error('Entity not found');
    }

    wrap(entity).assign(dto);
    await this.em.flush();
    return entity;
  }

  async remove(id: string): Promise<void> {
    const entity = await this.em.findOne(Patient, id);

    if (!entity) {
      throw new Error('Entity not found');
    }

    await this.em.removeAndFlush(entity);
  }
}
