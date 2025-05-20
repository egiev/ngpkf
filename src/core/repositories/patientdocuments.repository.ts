import { GenericRepository } from '@core/abstracts';
import { PatientDocumentEntity } from '@core/entities';

export abstract class PatientDocumentsRepository extends GenericRepository<PatientDocumentEntity> {}
