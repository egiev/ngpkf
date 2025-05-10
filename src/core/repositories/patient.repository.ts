import { GenericRepository } from '@core/abstracts';
import { PatientEntity } from '@core/entities';

export abstract class PatientRepository extends GenericRepository<PatientEntity> {}
