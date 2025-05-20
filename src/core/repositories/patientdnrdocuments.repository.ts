import { GenericRepository } from '@core/abstracts';
import { GlScannedDocumentEntity } from '@core/entities';

export abstract class PatientDnrDocumentsRepository extends GenericRepository<GlScannedDocumentEntity> {}
