import { Entity } from '@mikro-orm/core';
import { BaseDocumentOrmEntity } from './document';

@Entity({ collection: 'patientdnrdocuments' })
export class PatientDnrDocumentOrmEntity extends BaseDocumentOrmEntity {}
