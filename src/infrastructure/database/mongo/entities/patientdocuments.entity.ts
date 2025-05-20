import { Entity } from '@mikro-orm/core';
import { BaseDocumentOrmEntity } from './document';

@Entity({ collection: 'patientdocuments' })
export class PatientDocumentOrmEntity extends BaseDocumentOrmEntity {}
